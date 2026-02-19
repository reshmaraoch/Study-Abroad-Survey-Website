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




