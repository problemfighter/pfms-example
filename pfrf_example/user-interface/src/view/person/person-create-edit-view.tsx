import React from "react";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import TRHTTResponse from "tm-react/src/artifacts/processor/http/tr-http-response";
import {ApiUtil} from "react-material-app/src/system/api-util";
import {AppConstant} from "react-material-app/src/system/app-constant";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from "react-mui-ui/ui/ui-component";
import {TrUtil} from "tm-react/src/artifacts/util/tr-util";
import PersonUrlMapping from "./person-url-mapping";
import PersonConfig from "./person-config";
import {TrFormDefinitionData} from "tm-react/src/artifacts/data/tr-form-definition-data";


interface Props extends TRProps {
    route: any;
    classes?: any;
}

class State extends TRComponentState{
    isEdit: boolean = false;
    submitUrl: string = PersonUrlMapping.API.CREATE;
    formHeading: string = PersonConfig.NAME_CONSTANT.CREATE;
    buttonLabel: string = PersonConfig.NAME_CONSTANT.SAVE_BUTTON;
}

export default  class PersonCreateEditView extends TRComponent<Props, State> {

    state: State = new State();

    constructor(props: Props) {
        super(props);
        this.addFormDefinition("identifier", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter Username",
        }));
        this.addFormDefinition("password", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter Password",
        }));
        this.addFormDefinition("firstName", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter First Name",
        }));
        this.addFormDefinition("email", new TrFormDefinitionData({
            required: true,
            errorMessage: "Please Enter Email",
        }));
    }

    componentDidMount() {
        this.showRedirectMessage();
        let uuid = ApiUtil.getParamsDataFromRouter(this.props.route, "uuid");
        if (uuid){
            this.setState({
                isEdit: true,
                formHeading: PersonConfig.NAME_CONSTANT.UPDATE,
                buttonLabel: PersonConfig.NAME_CONSTANT.UPDATE_BUTTON,
            });
            this.state.submitUrl = PersonUrlMapping.API.UPDATE;
            this.loadFormData(uuid);
        }
    }


    loadFormData(uuid: any) {
        const _this = this;
        let filter = {
            where: {
                equal: {"uuid": uuid}
            }
        };
        let message = PersonConfig.NAME_CONSTANT.INVALID_DATA;
        this.postJsonToApi(PersonUrlMapping.API.DETAILS, filter,
            {
                callback(response: TRHTTResponse): void {
                    let apiResponse = ApiUtil.processApiResponseAndShowError(response, _this);
                    if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS && !ApiUtil.isEmptyObject(apiResponse.data)) {
                        let data = apiResponse.data;
                        data["where"] = filter.where;
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


    onSubmit (event: any){
        event.preventDefault();
        const _this = this;
        if (this.validateFormInput()) {
            this.postJsonDataToApi(this.state.submitUrl, this.state.formData,
                {
                    callback(response: TRHTTResponse): void {
                        let apiResponse = ApiUtil.processApiResponse(response, _this);
                        console.log(response)
                        console.log(apiResponse)
                        if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS) {
                            _this.successRedirect(PersonUrlMapping.ui.list, apiResponse.message);
                        }else{
                            ApiUtil.processApiResponseError(apiResponse, _this);
                        }
                    }
                },
                {
                    callback(response: TRHTTResponse): void {
                        ApiUtil.processApiErrorResponse(response, _this);
                    }
                }
            );
        }
    }


    renderUI() {
        let _this = this;
        return (
            <React.Fragment>
                <Card>
                    <CardHeader title={this.state.formHeading}/>
                    <Divider />
                    <form onSubmit={(event: any) => { this.onSubmit(event)}} noValidate autoComplete="off">
                        <CardContent>
                            <Grid  container spacing={4}>
                                <Grid item xs={6} ><TextField {...this.handleInputDataChange("firstName")}  label="First Name" fullWidth /></Grid>
                                <Grid item xs={6} ><TextField {...this.handleInputDataChange("lastName")}  label="Last Name" fullWidth /></Grid>
                                <Grid item xs={6} ><TextField {...this.handleInputDataChange("email")} type="email"  label="Email" fullWidth /></Grid>
                                <Grid item xs={6} ><TextField {...this.handleInputDataChange("identifier")}  label="Username" fullWidth /></Grid>
                                <Grid item xs={6} ><TextField {...this.handleInputDataChange("password")} type="password"  label="Password" fullWidth /></Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container spacing={1}  justify="flex-end">
                                <Grid  item xs={1}>
                                    <Button size="small" color="primary" type="submit" fullWidth variant="contained" children={this.state.buttonLabel}/></Grid>
                                <Grid  item xs={1}>
                                    <Button color="secondary" size="small" fullWidth variant="contained" children={PersonConfig.NAME_CONSTANT.CANCEL_BUTTON} onClick={(event:any) => {TrUtil.gotoUrl(_this, PersonUrlMapping.ui.list)}}/></Grid>
                            </Grid>
                        </CardActions>
                    </form>
                </Card>
            </React.Fragment>
        )
    }
}