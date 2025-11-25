import requests

def chat(ollama_url, model, messages, stream=False, **params):
    payload = {"model": model, "messages": messages, "stream": stream, **params}
    return requests.post(f"{ollama_url}/api/chat", json=payload, timeout=600)
