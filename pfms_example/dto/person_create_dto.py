from pfms_example.dto.person_details_dto import PersonDetailsDto


class PersonCreateDto(PersonDetailsDto):

    class Meta:
        exclude = ("id", "created", "updated", "uuid")
