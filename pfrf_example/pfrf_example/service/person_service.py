from pf_sqlalchemy.crud.pfs_rest_helper_service import PfsRestHelperService
from pfrf_example.dto import PersonCreateDto, PersonUpdateDto, PersonDetailsDto
from pfrf_example.model import Person


pfs_rest_helper_service = PfsRestHelperService(Person)


class PersonService:

    def create(self):
        return pfs_rest_helper_service.rest_create(PersonCreateDto())

    def update(self):
        return pfs_rest_helper_service.rest_update(PersonUpdateDto())

    def details(self, model_id: int):
        return pfs_rest_helper_service.rest_details(model_id, PersonDetailsDto())

    def delete(self, model_id: int):
        return pfs_rest_helper_service.rest_delete(model_id)

    def restore(self, model_id: int):
        return pfs_rest_helper_service.rest_restore(model_id)

    def list(self):
        search = ["email", "firstName", "lastName", "identifier"]
        return pfs_rest_helper_service.rest_list(PersonDetailsDto(), search=search)
