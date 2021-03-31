from pfrf.pfrf_app_config import PFRFAppConfigInterface


class AppConfig(PFRFAppConfigInterface):

    def register_controller(self, flask_app):
        pass

    def register_model(self, flask_app):
        pass

    def register_env_config(self, env) -> str:
        pass
