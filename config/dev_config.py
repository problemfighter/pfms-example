from application.config.base_config import BaseConfiguration


class DevConfiguration(BaseConfiguration):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root@localhost/bl'

