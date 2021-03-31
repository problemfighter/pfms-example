from marshmallow import fields
from pfms.pfapi.base.pfms_base_schema import PfDetailBaseSchema, common_exclude_append, update_exclude_append
from pfrf_example.model.person import Person


class PersonDetailsDto(PfDetailBaseSchema):

    class Meta:
        model = Person
        load_instance = True

    identifier = fields.String(required=True, error_messages={"required": "Please enter identifier."})
    password = fields.String(required=True, error_messages={"required": "Please enter password."})
    firstName = fields.String(required=True, error_messages={"required": "Please enter first name."})
    lastName = fields.String()
    email = fields.Email(required=True, error_messages={"required": "Please enter first name.", "invalid": "Please enter valid email address"})


class PersonCreateDto(PersonDetailsDto):
    class Meta:
        model = Person
        load_instance = True
        exclude = common_exclude_append()


class PersonUpdateDto(PersonDetailsDto):
    class Meta:
        model = Person
        load_instance = True
        exclude = update_exclude_append()

    id = fields.Integer(required=True, error_messages={"required": "Please enter id"})
