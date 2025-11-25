from flask import Blueprint, current_app, jsonify, request, Response, render_template
from .services.ollama_client import chat

bp = Blueprint("main", __name__)

@bp.get("/")
def index():
    return render_template("index.html")

@bp.post("/api/chat")
def api_chat():
    data = request.get_json(force=True)
    model = data.get("model") or current_app.config["MODEL"]
    messages = data.get("messages", [])

    r = chat(current_app.config["OLLAMA_URL"], model, messages)
    r.raise_for_status()
    return jsonify(r.json())
