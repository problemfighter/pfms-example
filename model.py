from db.orm import database, Base


class Person(Base):
    identifier = database.Column(database.String(250), nullable=False, unique=True)
    password = database.Column(database.String(500), nullable=False)
    firstName = database.Column(database.String(250))
    lastName = database.Column(database.String(250))
    email = database.Column(database.String(250))

