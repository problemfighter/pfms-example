from flask import Blueprint
from pfms.swagger.pfms_swagger_decorator import pfms_create
from pfms_example.dto.person_create_dto import PersonCreateDto
from pfms_example.dto.person_details_dto import PersonDetailsDto

pfms_example = Blueprint("pfms_example", __name__, url_prefix="/api/v1/example")


@pfms_example.route("/create", methods=['POST'])
@pfms_create(request_body=PersonCreateDto, response_obj=PersonDetailsDto)
def create():
    pass


@pfms_example.route("/update/<int:id>", methods=['POST'])
def update(id:int):
    pass


@pfms_example.route("/list", methods=['GET'])
def list():
    pass


@pfms_example.route("/details/<int:id>", methods=['GET'])
def details(id:int):
    pass


@pfms_example.route("/delete/<int:id>", methods=['DELETE'])
def delete(id:int):
    pass



