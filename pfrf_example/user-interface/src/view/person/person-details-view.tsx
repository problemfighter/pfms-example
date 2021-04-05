import TRComponent from "tm-react/src/artifacts/component/tr-component";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {Box, Table, TableBody, TableCell, TableRow} from "react-mui-ui/ui/ui-component";
import PersonConfig from "./person-config";
import PersonUrlMapping from "./person-url-mapping";
import TRHTTResponse from "tm-react/src/artifacts/processor/http/tr-http-response";
import {ApiUtil} from "react-material-app/src/system/api-util";
import {AppConstant} from "react-material-app/src/system/app-constant";
import TrDetailsView from "react-mui-ui/ui/tr-details-view";


interface Props extends TRProps {
    route: any;
    classes?: any;
}

class State extends TRComponentState{}

export default class PersonDetailsView extends TRComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
        let id = ApiUtil.getParamsDataFromRouter(this.props.route, "id");
        if (id) {
            this.loadDetailsData(id);
        }else{
           this.failedRedirect(PersonUrlMapping.ui.list, "Invalid Request");
        }
    }

    loadDetailsData(id: any) {
        const _this = this;
        let message = PersonConfig.NAME_CONSTANT.INVALID_DATA;
        this.getToApi(PersonUrlMapping.API.DETAILS + id,
            {
                callback(response: TRHTTResponse): void {
                    let apiResponse = ApiUtil.processApiResponseAndShowError(response, _this);
                    if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS && !ApiUtil.isEmptyObject(apiResponse.data)) {
                        let data = apiResponse.data;
                        _this.setState({formData: data})
                    } else {
                        _this.failedRedirect(PersonUrlMapping.ui.list, message);
                    }
                }
            },
            {
                callback(response: TRHTTResponse): void {
                    _this.failedRedirect(PersonUrlMapping.ui.list, message);
                }
            }
        );
    }

    renderUI() {
        let definition = [
            {name: "firstName", displayName: "First Name"},
            {name: "lastName", displayName: "Last Name"},
            {name: "email", displayName: "Email"},
            {name: "identifier", displayName: "Identifier"},
            {name: "uuid", displayName: "UUID"},
        ]
        return (
            <Table>
                <TableBody>
                    <TrDetailsView formData={this.state.formData} definition={definition}/>
                </TableBody>
            </Table>
        )
    }

}