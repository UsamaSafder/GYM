# FitnessHub - Gym Fitness Website

A complete responsive gym fitness website built with **Flask + HTML/CSS/JavaScript** using static sample data (no database).

## Features

- 6 complete pages: Home, Workouts, Nutrition, Gym Finder, About, Contact
- Sticky responsive navbar + footer on all pages
- Modern dark UI theme (black/grey/white with red accent)
- Dynamic workout detail viewer
- Real-time gym finder search filter
- Contact form with backend validation + flash messages
- Optional extras included: BMI calculator, animated counters, FAQ, reveal animations
- Optional JSON API routes for static data

## Project Structure

```text
fitness-website/
├── app.py
├── requirements.txt
├── data/
│   └── sample_data.json
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
└── templates/
    ├── base.html
    ├── index.html
    ├── workouts.html
    ├── nutrition.html
    ├── gyms.html
    ├── about.html
    └── contact.html
```

## Run Locally

1. Open terminal in `fitness-website`.
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Start server:

```bash
python app.py
```

4. Open in browser:

```text
http://127.0.0.1:5000
```

## Gmail Contact Form Setup

The contact form can send real emails through Gmail SMTP.

1. Copy `.env.example` values into your environment variables.
2. Set these variables before running the app:

```powershell
$env:MAIL_SERVER="smtp.gmail.com"
$env:MAIL_PORT="587"
$env:MAIL_USERNAME="yourgmail@gmail.com"
$env:MAIL_PASSWORD="your_gmail_app_password"
$env:MAIL_TO="yourgmail@gmail.com"
```

3. Use a **Gmail App Password** (not your normal Gmail password).
4. Restart Flask server after setting variables.

If these variables are not set, the form still validates and logs the message in console, but email will not be delivered.

## Routes

- `/` Home
- `/workouts`
- `/nutrition`
- `/gyms`
- `/about`
- `/contact` (GET + POST)

Optional API routes:

- `/api/workouts`
- `/api/gyms`
- `/api/nutrition-tips`
