CREATE TABLE study_abroad_survey ( survey_id SERIAL PRIMARY KEY, 
                                   full_name TEXT NOT NULL, 
                                   country TEXT, 
                                   other_country TEXT, 
                                   study_level TEXT, 
                                   graduation_year INT, 
                                   why_chose_to_study TEXT[], 
                                   missed_most TEXT, 
                                   best_experience TEXT, 
                                   perspective_change BOOLEAN,
                                   what_changed TEXT, 
                                   submitted_at TIMESTAMPTZ DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'America/Chicago'));


select * from study_abroad_survey;

