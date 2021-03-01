from pf_sqlalchemy.crud.pfs_crud_service import PfsCrudService
from pfms.pfapi.rr.pfms_request_respons import PfRequestResponse
from pfms_example.dto.person_create_dto import PersonCreateDto
from pfms_example.dto.person_details_dto import PersonDetailsDto
from pfms_example.model import Person

pfs_crud = PfsCrudService()


class PersonService(PfRequestResponse):

    def create(self):
        person = self.json_request_process(PersonCreateDto())
        pfs_crud.save(person)
        return self.json_data_response(person, PersonDetailsDto())

    def get_by_id(self, id:int):
        return Person.query.filter_by(id=id).first()

    def details(self, id:int):
        person = self.get_by_id(id)
        return self.json_validate_and_data_response(person, PersonDetailsDto())

    def delete(self, id:int):
        person = self.get_by_id(id)
        self.check_empty_value_raise_exception(person, "Invalid Entity")
        pfs_crud.delete(person)
        return self.success("Successfully Deleted")
