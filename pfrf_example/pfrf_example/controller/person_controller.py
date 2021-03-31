from flask import Blueprint
from pfms.swagger.pfms_swagger_decorator import pfms_create, pfms_details, pfms_pagination_sort_search_list, pfms_restore, pfms_delete
from pfrf_example.dto.person_dto import PersonCreateDto, PersonDetailsDto, PersonUpdateDto
from pfrf_example.service.person_service import PersonService


person_controller = Blueprint("person_controller", __name__, url_prefix="/api/v1/person")
person_service = PersonService()


@person_controller.route("/create", methods=['POST'])
@pfms_create(request_body=PersonCreateDto)
def create():
    return person_service.create()


@person_controller.route("/details/<int:id>", methods=['GET'])
@pfms_details(response_obj=PersonDetailsDto)
def details(id: int):
    return person_service.details(id)


@person_controller.route("/update", methods=['POST'])
@pfms_create(request_body=PersonUpdateDto)
def update():
    return person_service.update()


@person_controller.route("/delete/<int:id>", methods=['DELETE'])
@pfms_delete()
def delete(id: int):
    return person_service.delete(id)


@person_controller.route("/restore/<int:id>", methods=['GET'])
@pfms_restore()
def restore(id: int):
    return person_service.restore(id)


@person_controller.route("/list", methods=['GET'])
@pfms_pagination_sort_search_list(response_obj=PersonDetailsDto)
def list():
    return person_service.list()
