from flask import Blueprint, current_app, jsonify, request
from .services.ollama_client import chat

bp = Blueprint("main", __name__)

@bp.post("/api/chat")
def api_chat():
    
    data = request.get_json(force=True)
    model = data.get("model") or current_app.config["MODEL"]
    messages = data.get("messages", [])

    r = chat(current_app.config["OLLAMA_URL"], model, messages)
    if not r.ok:
        return jsonify({"error": "ollama_error", "status": r.status_code, "body": r.text}), 502
    r.raise_for_status()
    return jsonify(r.json())

@bp.get("/api/chat")
def ping():
    return jsonify({"status": "flask is alve"})

@bp.get("/api/debug/ollama")
def debug_ollama():
    return {
        "OLLAMA_URL": current_app.config["OLLAMA_URL"],
        "MODEL": current_app.config["MODEL"],
    }
