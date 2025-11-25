import os
from dotenv import load_dotenv
load_dotenv()

def load_config():
    return {
        "OLLAMA_URL": os.getenv("OLLAMA_URL", "http://localhost:11434"),
        "MODEL": os.getenv("MODEL", "deepseek-r1"),
        "DEBUG": os.getenv("DEBUG", "0") == "1",
    }
