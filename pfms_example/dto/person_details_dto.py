from marshmallow import fields
from marshmallow_sqlalchemy import auto_field
from pfms.pfapi.base.pfms_base_schema import PfBaseSchema
from pfms_example.model import Person


class PersonDetailsDto(PfBaseSchema):

    class Meta:
        model = Person

    id = auto_field()
    created = auto_field()
    updated = auto_field()
    uuid = auto_field()

    identifier = fields.String(required=True, error_messages={"required": "Please enter identifier."})
    password = fields.String(required=True, error_messages={"required": "Please enter password."})
    firstName = fields.String(required=True, error_messages={"required": "Please enter first name."})
    lastName = fields.String()
    email = fields.Email(required=True, error_messages={"required": "Please enter first name.", "invalid": "Please enter valid email."})


