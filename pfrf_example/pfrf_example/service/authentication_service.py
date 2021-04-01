from pfms.pfapi.rr.pfms_request_respons import PfRequestResponse
from pfrf_example.dto.authentication_dto import LoginDto


class AuthenticationService(PfRequestResponse):

    def navigation(self):
        return [
            self._make_nav("Dashboard", "dashboard", "dashboard", "/dashboard"),
            self._make_nav("Channel", "dashboard", "channel", "/channel"),
            self._make_nav("Site", "dashboard", "site", "/site"),
        ]

    def _make_nav(self, display_name, icon, name, url):
        return {
            "icon": icon,
            "name": name,
            "url": url,
            "displayName": display_name,
            "groupDisplayName": "",
            "groupName": "",
            "groupUrl": "",
        }

    def login(self):
        auth: LoginDto = self.json_request_process(LoginDto())
        if auth['identifier'] == "admin" and auth['password'] == "admin":
            data: dict = {
                "login": {
                    "accessToken": "accessToken",
                    "refreshToken": "refreshToken"
                },
                "user": {
                    "firstName": "Admin",
                    "lastName": "User",
                    "id": 1,
                },
                "navList": self.navigation()
            }
            return self.json_list_dic_data_response(data)
        return self.response().error("Invalid Identifier or Password")
