from pfrf.pfrf_app_config import PFRFModuleConfigInterface


class PFRFExampleRegistry(PFRFModuleConfigInterface):

    def register_controller(self, flask_app):
        pass

    def register_model(self, flask_app):
        pass


pfrf_example_registry = PFRFExampleRegistry()
