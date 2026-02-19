from dotenv import load_dotenv
load_dotenv()

from contextlib import contextmanager
import os

from psycopg2.pool import ThreadedConnectionPool
from psycopg2.extras import DictCursor

pool = None

def setup():
    
    global pool
    DATABASE_URL = os.environ["DATABASE_URL"]
    
    pool = ThreadedConnectionPool(1, 100, dsn=DATABASE_URL, sslmode="require")

@contextmanager
def get_db_connection():
    conn = pool.getconn()
    try:
        yield conn
    finally:
        pool.putconn(conn)

@contextmanager
def get_db_cursor(commit: bool = False):
    with get_db_connection() as conn:
        cur = conn.cursor(cursor_factory=DictCursor)
        try:
            yield cur
            if commit:
                conn.commit()
        finally:
            cur.close()



def insert_survey_response(
    full_name: str,
    country: str | None,
    other_country: str | None,
    study_level: str | None,
    graduation_year: int | None,
    why_chose_to_study: list[str] | None,   
    missed_most: str | None,
    best_experience: str | None,
    perspective_change: bool,
    what_changed: str | None,
):
    sql = """
        INSERT INTO study_abroad_survey
          (full_name, country, other_country, study_level, graduation_year,
           why_chose_to_study, missed_most, best_experience,
           perspective_change, what_changed)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """
    with get_db_cursor(commit=True) as cur:
        cur.execute(
            sql,
            (
                full_name, country, other_country, study_level, graduation_year,
                why_chose_to_study, missed_most, best_experience,
                perspective_change, what_changed
            ),
        )

def fetch_all_results(reverse: bool = False):
    order = "DESC" if reverse else "ASC"
    sql = f"""
        SELECT survey_id, full_name, country, other_country, study_level,
               graduation_year, why_chose_to_study, missed_most, best_experience,
               perspective_change, what_changed, submitted_at
        FROM study_abroad_survey
        ORDER BY survey_id {order}
    """
    with get_db_cursor() as cur:
        cur.execute(sql)
        rows = cur.fetchall()
        return [dict(r) for r in rows]
    
def fetch_summary():
    """
    Returns dict with:
      - country_counts: [{"label": "...", "count": N}, ...]
    """
    out = {}

    # total responses
    with get_db_cursor() as cur:
        cur.execute("SELECT COUNT(*)::int AS total FROM study_abroad_survey;")
        out["total_responses"] = cur.fetchone()["total"]

    # country (combining country and other_country)
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT 
                COALESCE(NULLIF(country, ''), other_country) AS label, 
                COUNT(*)::int AS count
            FROM study_abroad_survey
            WHERE COALESCE(NULLIF(country, ''), other_country) IS NOT NULL
            GROUP BY label
            ORDER BY count DESC;
        """)
        out["country_counts"] = [dict(r) for r in cur.fetchall()]

    # study_level
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT study_level AS label, COUNT(*)::int AS count
            FROM study_abroad_survey
            WHERE study_level IS NOT NULL AND study_level <> ''
            GROUP BY study_level
            ORDER BY count DESC;
        """)
        out["study_level_counts"] = [dict(r) for r in cur.fetchall()]

    # graduation_year
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT graduation_year::text AS label, COUNT(*)::int AS count
            FROM study_abroad_survey
            WHERE graduation_year IS NOT NULL
            GROUP BY graduation_year
            ORDER BY graduation_year ASC;
        """)
        out["graduation_year_counts"] = [dict(r) for r in cur.fetchall()]   
    
    # reasons (checkbox TEXT[]) -> unnest
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT reason AS label, COUNT(*)::int AS count
            FROM (
                SELECT UNNEST(why_chose_to_study) AS reason
                FROM study_abroad_survey
                WHERE why_chose_to_study IS NOT NULL
            ) t
            GROUP BY reason
            ORDER BY count DESC, reason ASC;
        """)
        out["reasons_counts"] = [dict(r) for r in cur.fetchall()]

    # missed_most (single select dropdown)
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT missed_most AS label, COUNT(*)::int AS count
            FROM study_abroad_survey
            WHERE missed_most IS NOT NULL AND missed_most <> ''
            GROUP BY missed_most
            ORDER BY count DESC;
        """)
        out["missed_most_counts"] = [dict(r) for r in cur.fetchall()]

    # best_experiences (text answers)
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT best_experience
            FROM study_abroad_survey
            WHERE best_experience IS NOT NULL AND TRIM(best_experience) <> ''
            ORDER BY survey_id DESC
            LIMIT 200;
        """)
        out["best_experiences"] = [r["best_experience"] for r in cur.fetchall()]

    # perspective_change (boolean Yes/No)
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT 
                CASE WHEN perspective_change THEN 'Yes' ELSE 'No' END AS label,
                COUNT(*)::int AS count
            FROM study_abroad_survey
            GROUP BY perspective_change
            ORDER BY perspective_change DESC;
        """)
        out["perspective_counts"] = [dict(r) for r in cur.fetchall()]

    # perspective_changes (text answers for those who said Yes)
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT what_changed
            FROM study_abroad_survey
            WHERE perspective_change = TRUE
              AND what_changed IS NOT NULL
              AND TRIM(what_changed) <> ''
            ORDER BY survey_id DESC
            LIMIT 200;
        """)
        out["perspective_changes"] = [r["what_changed"] for r in cur.fetchall()]
    
    # per-day count (time series)
    with get_db_cursor() as cur:
        cur.execute("""
            SELECT DATE(submitted_at) AS day, COUNT(*)::int AS count
            FROM study_abroad_survey
            GROUP BY DATE(submitted_at)
            ORDER BY day ASC;
        """)
        rows = cur.fetchall()
        out["per_day_counts"] = [{"day": r["day"].isoformat(), "count": r["count"]} for r in rows]

    return out
