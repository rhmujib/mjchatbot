from flask import Flask

def create_app():
    app = Flask(__name__)
    
    with app.app_context():
        from .main import main as main_blueprint
        app.register_blueprint(main_blueprint)

    return app