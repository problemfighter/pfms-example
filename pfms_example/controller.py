from flask import Blueprint
from pfms.swagger.pfms_swagger_decorator import pfms_create, pfms_details, pfms_delete
from pfms_example.dto.person_create_dto import PersonCreateDto
from pfms_example.dto.person_details_dto import PersonDetailsDto
from pfms_example.service import PersonService

pfms_example = Blueprint("pfms_example", __name__, url_prefix="/api/v1/example")
person_service = PersonService()


@pfms_example.route("/create", methods=['POST'])
@pfms_create(request_body=PersonCreateDto, response_obj=PersonDetailsDto)
def create():
    return person_service.create()


@pfms_example.route("/update/<int:id>", methods=['POST'])
@pfms_create(request_body=PersonCreateDto, response_obj=PersonDetailsDto)
def update(id:int):
    pass


@pfms_example.route("/list", methods=['GET'])
def list():
    pass


@pfms_example.route("/details/<int:id>", methods=['GET'])
@pfms_details(response_obj=PersonDetailsDto)
def details(id:int):
    return person_service.details(id)


@pfms_example.route("/delete/<int:id>", methods=['DELETE'])
@pfms_delete()
def delete(id:int):
    return person_service.delete(id)



