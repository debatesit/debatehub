from flask import Flask
from flask_cors import CORS
from .config import load_config
from .routes import bp as main_bp

def create_app():
    app = Flask(__name__, static_folder="static", template_folder="templates")
    app.config.from_mapping(load_config())
    # Maybe include CORS later
    app.register_blueprint(main_bp)
    return app
