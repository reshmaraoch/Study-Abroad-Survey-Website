# Study Abroad Survey Website

A full-stack web application that collects and visualizes study abroad experiences from students.

Link: https://study-abroad-survey.up.railway.app/

## About

Most surveys are boring - long, flat, and forgettable. This app makes sharing your study abroad story feel more like a conversation than a form. With a step-by-step flow, progress indicators, and a clean design, students are guided through sharing their experiences in a way that's actually enjoyable to fill out.

Responses are stored in a PostgreSQL database and visualized on an admin summary dashboard with charts and statistics.

## Features

- Multi-step survey form with progress indicators
- Multi-select checkbox questions stored as arrays in PostgreSQL
- Admin dashboard at `/admin/summary` with data visualizations
- JSON API endpoint at `/api/results` for raw data access
- Jinja2 templating for consistent page layouts

## Tech Stack

- **Backend:** Python, Flask
- **Database:** PostgreSQL
- **Frontend:** Jinja2, HTML/CSS, chart.js
- **Deployment:** Railway

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home / landing page |
| `/survey` | Multi-step survey form |
| `/admin/summary` | Admin dashboard with visualizations |
| `/api/results` | JSON API for all responses |

## Admin Dashboard

<img width="1117" height="796" alt="image" src="https://github.com/user-attachments/assets/2a704c2e-4a35-458b-9dae-bffc1b9a5f43" />


<img width="867" height="849" alt="image" src="https://github.com/user-attachments/assets/3cf398be-162b-4cb4-967b-4e8fc98a7b4e" />

## Running Locally

### Prerequisites
- Python 3.11+
- Pipenv
- PostgreSQL database (local or hosted)

### Steps

1. **Clone the repo**
```bash
   git clone https://github.com/reshmaraoch/Study-Abroad-Survey-Website.git
   cd Study-Abroad-Survey-Website
```

2. **Install dependencies**
```bash
   pipenv install
```

3. **Set up environment variables**
   
   Create a `.env` file in the root folder:
```
   DATABASE_URL=postgresql://your_db_url_here
```

4. **Set up the database**
   
   Run the schema to create the table:
```bash
   psql $DATABASE_URL -f schema.sql
```

5. **Run the app**
```bash
   pipenv run flask --app server run
```

6. **Visit the app**
   
   Open your browser and go to `http://127.0.0.1:5000`





