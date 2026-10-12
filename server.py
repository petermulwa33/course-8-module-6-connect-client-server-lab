
from flask import Flask, request, jsonify

app = Flask(__name__)

# Sample event data stored in memory
events = [
    {"id": 1, "title": "Yoga in the Park"},
    {"id": 2, "title": "Lake 5K Run"}
]


# GET / - Return a welcome message
@app.route("/", methods=["GET"])
def welcome():
    return jsonify({"message": "Welcome!"}), 200


# GET /events - Return all events
@app.route("/events", methods=["GET"])
def get_events():
    return jsonify(events), 200


# POST /events - Add a new event
@app.route("/events", methods=["POST"])
def add_event():
    data = request.get_json(silent=True)

    # Validate the incoming JSON
    if not isinstance(data, dict):
        return jsonify({"error": "A JSON object is required"}), 400

    title = data.get("title")

    if not isinstance(title, str) or not title.strip():
        return jsonify({"error": "Event title is required"}), 400

    # Generate the next event ID
    new_id = max((event["id"] for event in events), default=0) + 1

    new_event = {
        "id": new_id,
        "title": title.strip()
    }

    # Store the event in the events list
    events.append(new_event)

    return jsonify(new_event), 201


if __name__ == "__main__":
    app.run(debug=True)
