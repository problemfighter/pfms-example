from pfrf.pfrf_app_config import PFRFModuleConfigInterface
from pfrf_example.controller.person_controller import person_controller


class PFRFExampleRegistry(PFRFModuleConfigInterface):

    def register_controller(self, flask_app):
        flask_app.register_blueprint(person_controller)

    def register_model(self, flask_app):
        pass


pfrf_example_registry = PFRFExampleRegistry()
