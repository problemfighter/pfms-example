from flask import Blueprint

pfms_example = Blueprint("pfms_example", __name__, url_prefix="/api/v1/example")

@pfms_example.route("/create", methods=['POST'])
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



