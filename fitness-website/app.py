from __future__ import annotations

import json
from pathlib import Path
from typing import Any

from flask import Flask, jsonify, render_template


BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / "data" / "sample_data.json"


def load_sample_data() -> dict[str, Any]:
    with DATA_FILE.open("r", encoding="utf-8") as file:
        return json.load(file)


app = Flask(__name__)
app.config["SECRET_KEY"] = "fitness-hub-demo-secret-key"


@app.context_processor
def inject_year() -> dict[str, int]:
    from datetime import datetime

    return {"current_year": datetime.now().year}


@app.get("/")
def home() -> str:
    data = load_sample_data()
    return render_template(
        "index.html",
        categories=data["popular_categories"],
        stats=data["stats"],
        faqs=data["faqs"],
    )


@app.get("/workouts")
def workouts() -> str:
    data = load_sample_data()
    return render_template("workouts.html", workouts=data["workouts"])


@app.get("/nutrition")
def nutrition() -> str:
    data = load_sample_data()
    return render_template(
        "nutrition.html",
        nutrition_basics=data["nutrition_basics"],
        meal_plans=data["meal_plans"],
        nutrition_tips=data["nutrition_tips"],
        pre_workout=data["pre_workout"],
        post_workout=data["post_workout"],
        nutrition_details=data["nutrition_details"],
        goal_based_nutrition=data["goal_based_nutrition"],
    )


@app.get("/gyms")
def gyms() -> str:
    data = load_sample_data()
    return render_template("gyms.html", gyms=data["gyms"])


@app.get("/about")
def about() -> str:
    return render_template("about.html")


@app.get("/contact")
def contact() -> str:
    return render_template("contact.html")


@app.get("/api/workouts")
def api_workouts() -> Any:
    data = load_sample_data()
    return jsonify(data["workouts"])


@app.get("/api/gyms")
def api_gyms() -> Any:
    data = load_sample_data()
    return jsonify(data["gyms"])


@app.get("/api/nutrition-tips")
def api_nutrition_tips() -> Any:
    data = load_sample_data()
    return jsonify(data["nutrition_tips"])


if __name__ == "__main__":
    app.run(debug=True)
