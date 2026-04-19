

from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["disaster_intelligence"]

posts_collection = db["posts"]
media_collection = db["media"]

# 🔥 Helper function
def fetch_data(event):
    data = {
        "posts": [],
        "videos": []
    }

    # Get posts
    posts = posts_collection.find({"event_name": event}).limit(3)
    for p in posts:
        data["posts"].append({
            "text": p.get("text", "No text"),
            "type": p.get("type", "general")
        })

    # Get videos
    videos = media_collection.find({
        "event_name": event,
        "media_type": "video"
    }).limit(2)

    for v in videos:
        data["videos"].append({
            "title": v.get("title"),
            "url": v.get("media_url")
        })

    return data


# 🚀 MAIN API
@app.route("/parse", methods=["POST"])
def parse():
    user_query = request.json.get("query", "")

    query_type = classify_query(user_query)
    event = extract_event(user_query)

    if not event:
        return jsonify({"error": "Event not found"})

    base_data = fetch_data(event)

    # Add damage info
    if query_type == "damage":
        damage = damage_info.get(event, {})
    else:
        damage = {}

    return jsonify({
        "type": query_type,
        "event": event,
        "damage": damage,
        "data": base_data
    })


if __name__ == "__main__":
    app.run(debug=True)

damage_info = {
    "hurricane_harvey": {
        "severity": "Critical",
        "summary": "Severe flooding in Houston, thousands displaced, major infrastructure damage."
    },
    "hurricane_maria": {
        "severity": "Critical",
        "summary": "Massive destruction in Puerto Rico, power grid collapse, humanitarian crisis."
    },
    "california_wildfires": {
        "severity": "High",
        "summary": "Large-scale forest destruction, homes burned, air quality crisis."
    },
    "iraq_iran_earthquake": {
        "severity": "High",
        "summary": "Hundreds dead, buildings collapsed, cross-border damage."
    },
    "mexico_earthquake": {
        "severity": "Critical",
        "summary": "Buildings collapsed in Mexico City, heavy casualties and infrastructure damage."
    },
    "sri_lanka_floods": {
        "severity": "High",
        "summary": "Flooding caused displacement, landslides, and infrastructure damage."
    }
}

def classify_query(query):
    q = query.lower()

    if "damage" in q or "severe" in q or "destroyed" in q:
        return "damage"

    elif "video" in q or "image" in q:
        return "media"

    elif "in" in q:
        return "location"

    else:
        return "event"
    
def extract_event(query):
    q = query.lower()

    if "harvey" in q:
        return "hurricane_harvey"
    elif "maria" in q:
        return "hurricane_maria"
    elif "california" in q:
        return "california_wildfires"
    elif "iraq" in q or "iran" in q:
        return "iraq_iran_earthquake"
    elif "mexico" in q:
        return "mexico_earthquake"
    elif "sri lanka" in q:
        return "sri_lanka_floods"

    return None
