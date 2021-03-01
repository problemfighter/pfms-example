from pfms_example.dto.person_details_dto import PersonDetailsDto
from pfms_example.model import Person


class PersonCreateDto(PersonDetailsDto):

    class Meta:
        model = Person
        load_instance = True
        exclude = ("id", "created", "updated", "uuid")
