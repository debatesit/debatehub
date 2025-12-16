import os
from dotenv import load_dotenv
load_dotenv()

def load_config():
    return {
        "OLLAMA_URL": os.getenv("OLLAMA_URL", "http://127.0.0.1:11435"),
        "MODEL": os.getenv("MODEL", "llama3.1"),
        "DEBUG": os.getenv("DEBUG", "0") == "1",
    }
