from pfrf_example.pfrf_example_registry import pfrf_example_registry

from pfrf.pfrf_app_config import PFRFAppConfigInterface


class AppConfig(PFRFAppConfigInterface):

    def register_controller(self, flask_app):
        pfrf_example_registry.register_controller(flask_app)

    def register_model(self, flask_app):
        pfrf_example_registry.register_model(flask_app)

    def register_env_config(self, env, flask_app) -> str:
        if env and str(env) == 'prod':
            return 'application.config.prod_config.ProdConfiguration'
        else:
            return 'application.config.dev_config.DevConfiguration'
