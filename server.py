from flask import Flask, render_template, redirect, request, url_for, jsonify
import db

app = Flask(__name__)
db.setup()   

@app.route("/")
def index():
    return render_template("index.html", step=1)

@app.route("/survey", methods=["GET", "POST"])
def survey():
    if request.method == "POST":
        full_name = request.form.get("name")  
        country = request.form.get("country") or None
        other_country = request.form.get("other_country") or None
        study_level = request.form.get("study_level") or None
        grad_year_raw = request.form.get("grad_year")
        graduation_year = int(grad_year_raw) if grad_year_raw else None
        why_chose_to_study = request.form.getlist("study_reason") or None
        missed_most = request.form.get("miss_most") or None
        best_experience = request.form.get("best_experience") or None
        perspective_change = bool(request.form.get("perspective_change"))
        what_changed = request.form.get("perspective_details") or None
        db.insert_survey_response(
            full_name, country, other_country, study_level,
            graduation_year, why_chose_to_study, missed_most,
            best_experience, perspective_change, what_changed )
        
        return redirect(url_for("thanks"))
    return render_template("survey.html", step=2)

@app.route("/decline")
def decline():
    return render_template("decline.html", step=1, step1_label="Declined")

@app.route("/thanks")
def thanks():
    return render_template("thanks.html", step=3)

@app.route("/admin/summary")
def admin_summary():
    data = db.fetch_summary()   
    return render_template("admin_summary.html", step=1, data=data, step1_label="Summary")

@app.route("/api/results")
def api_results():
    reverse = request.args.get("reverse", "false").lower() == "true"
    rows = db.fetch_all_results(reverse=reverse)
    return jsonify({"responses": rows})

if __name__ == "__main__":
    app.run(debug=True)
