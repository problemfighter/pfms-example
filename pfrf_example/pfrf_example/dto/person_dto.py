from marshmallow import fields
from pfms.pfapi.base.pfms_base_schema import PfDetailBaseSchema, common_exclude_append, update_exclude_append
from pfrf_example.model import Person


class PersonDetailsDto(PfDetailBaseSchema):

    class Meta:
        model = Person
        load_instance = True


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
