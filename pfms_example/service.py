from pf_sqlalchemy.crud.pfs_crud_service import PfsCrudService
from pfms.pfapi.rr.pfms_request_respons import PfRequestResponse
from pfms_example.dto.person_create_dto import PersonCreateDto

pfs_crud = PfsCrudService()


class PersonService(PfRequestResponse):

    def create(self):
        person = self.json_request_process(PersonCreateDto())
        pfs_crud.save(person)
        return self.json_data_response(person, PersonCreateDto())
