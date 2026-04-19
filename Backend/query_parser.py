INTENT_KEYWORDS = {
    "damage": [
        "damage", "destroyed", "flood", "collapsed", "burned", "ruined"
    ],
    "casualties": [
        "dead", "injured", "killed", "casualties", "deaths"
    ],
    "rescue": [
        "rescue", "help", "evacuate", "relief", "aid"
    ],
    "location": [
        "where", "location", "area", "place", "region"
    ],
    "timeline": [
        "when", "time", "date", "timeline", "started"
    ],
    "summary": [
        "summary", "explain", "overview", "what happened"
    ]
}

EVENT_KEYWORDS = {
    "srilanka_floods": ["sri lanka", "srilanka"],
    "mexico_earthquake": ["mexico"],
    "iraq_iran_earthquake": ["iraq", "iran"],
    "hurricane_maria": ["maria"],
    "hurricane_harvey": ["harvey"],
    "hurricane_irma": ["irma"],
    "california_wildfires": ["california", "wildfire"]
}

import re

def preprocess(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    return text

def detect_intent(query):
    scores = {intent: 0 for intent in INTENT_KEYWORDS}

    for intent, keywords in INTENT_KEYWORDS.items():
        for word in keywords:
            if word in query:
                scores[intent] += 1

    # pick best intent
    best_intent = max(scores, key=scores.get)

    # confidence
    total = sum(scores.values()) + 1e-5
    confidence = scores[best_intent] / total

    return best_intent, round(confidence, 2)

def detect_event(query):
    for event, keywords in EVENT_KEYWORDS.items():
        for word in keywords:
            if word in query:
                return event
    return "unknown"

def extract_keywords(query):
    words = query.split()
    important = []

    for word in words:
        if len(word) > 3:
            important.append(word)

    return important

def parse_query(query):

    clean_query = preprocess(query)

    intent, confidence = detect_intent(clean_query)

    event = detect_event(clean_query)

    keywords = extract_keywords(clean_query)

    return {
        "event": event,
        "intent": intent,
        "keywords": keywords,
        "confidence": confidence
    }
