import React from 'react';
import TRComponent from "tm-react/src/artifacts/component/tr-component";
import TRComponentState from "tm-react/src/artifacts/component/tr-component-state";
import {TRProps} from "tm-react/src/artifacts/model/tr-model";
import TRHTTResponse from "tm-react/src/artifacts/processor/http/tr-http-response";
import { Button, Paper, Table, TableBody, TableCell, TableRow, TextField, Typography, withStyles} from "react-mui-ui/ui/ui-component";
import TRTableHeader from "react-mui-ui/ui/tr-table-header";
import {Align, TRTableActionData, TRTableActionDataHelper, TRTableHeaderDataHelper} from "react-mui-ui/ui/tr-ui-data";
import {TrUtil} from "tm-react/src/artifacts/util/tr-util";
import TRPagination from "react-mui-ui/ui/tr-pagination";
import {ApiUtil} from "react-material-app/src/system/api-util";
import SystemConfig from "react-material-app/src/system/system-config";
import PersonUrlMapping from "./person-url-mapping";
import CaTableAction from "react-material-app/src/override/ca-table-action";
import {AppConstant} from "react-material-app/src/system/app-constant";
import {viewCommon} from "react-material-app/src/assets/style-jss";
import PersonConfig from "./person-config";
import TrLoadDataPrams from "tm-react/src/artifacts/component/tr-load-data-prams";



interface Props extends TRProps {
    route: any;
    classes: any;
    name: string;
    listViewData: { [key: string]: any };
}

const tableHeaderDefinition = TRTableHeaderDataHelper.init("First Name", "firstName", true, "First Name", Align.left);
tableHeaderDefinition.add( "Last Name", "lastName", true, "Last Name", Align.left);
tableHeaderDefinition.add( "Email", "email", true, "Email", Align.left);
tableHeaderDefinition.add( "Identifier", "identifier", true, "Identifier", Align.left);



class State extends TRComponentState {
    apiData: any;
    list: any = [];
}


class PersonListView extends TRComponent<Props, State> {

    state: State = new State().setMaxItem(SystemConfig.itemPerPage());

    componentDidMount() {
        this.showRedirectMessage();
        this.loadData();
    }

    public loadData(dataParams: TrLoadDataPrams = new TrLoadDataPrams()) {
        const _this = this;
        let commonConditions = ApiUtil.getSearchSortAndPaginationData(this.state, dataParams);
        this.getToApiByParams(PersonUrlMapping.API.LIST,  commonConditions,
            {
                callback(response: TRHTTResponse): void {
                    let apiResponse = ApiUtil.processApiResponseAndShowError(response, _this);
                    let list = [];
                    if (apiResponse && apiResponse.data) {
                        list = apiResponse.data;
                    }

                    console.log(apiResponse)

                    let totalItem = 0;
                    if (apiResponse && apiResponse.pagination && apiResponse.pagination.totalPage) {
                        totalItem = apiResponse.pagination.totalPage;
                    }
                    _this.setState({
                        list: list,
                        totalItem: totalItem,
                        apiData: apiResponse
                    });
                }
            },
            {
                callback(response: TRHTTResponse): void {
                    ApiUtil.processApiErrorResponse(response, _this);
                }
            }
        );
    }

    delete(uuid: string){
        let _this = this;
        let commonConditions = {
            where: {
                equal: {
                    uuid :  uuid
                }
            }
        };
        this.deleteJsonToApi(PersonUrlMapping.API.DELETE,  commonConditions,
            {
                callback(response: TRHTTResponse): void {
                    let apiResponse = ApiUtil.processApiResponse(response, _this);
                    if (apiResponse && apiResponse.status === AppConstant.STATUS_SUCCESS) {
                        _this.showSuccessFlash(PersonConfig.NAME_CONSTANT.DELETE_SUCCESS_MESSAGE);
                        _this.loadData();
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


    tableActions(component: any, rowData: any): Map<string, TRTableActionData> {
        let tableAction: TRTableActionDataHelper = TRTableActionDataHelper.start(PersonConfig.NAME_CONSTANT.DETAILS_BUTTON, "");
        tableAction.addAction(PersonConfig.NAME_CONSTANT.EDIT_BUTTON).setCallbackData(rowData).setAction({
            click(event: any, onClickData: any): void {
                component.redirectWithData(PersonUrlMapping.ui.create + "/" + onClickData.uuid, {})
            }
        });

        tableAction.addAction(PersonConfig.NAME_CONSTANT.DELETE_BUTTON).setCallbackData(rowData).setAction({
            click(event: any, onClickData: any): void {
                component.delete(onClickData.uuid)
            }
        }).addConfirmation();

        return tableAction.getMap()
    }

    renderUI() {
        const {classes} = this.props;
        const _this = this;
        return (
            <React.Fragment>
                <Paper className={classes.mainActionArea}>
                    <div>
                        <Typography variant="h5">{PersonConfig.NAME_CONSTANT.LIST}</Typography>
                    </div>
                    <div>
                        <div className={classes.displayInline}>
                            <TextField placeholder={PersonConfig.NAME_CONSTANT.SEARCH} name="search" onKeyUp={(event: any)=>{ApiUtil.search(event, _this)}}/>
                        </div>
                        <Button className={classes.marginToLeft}  variant="contained" color="primary" onClick={(event:any) => {TrUtil.gotoUrl(_this, PersonUrlMapping.ui.create)}}>{PersonConfig.NAME_CONSTANT.CREATE_BUTTON}</Button>
                        <Button className={classes.marginToLeft}  variant="contained" color="primary" onClick={(event:any) => {this.loadData(new TrLoadDataPrams().resetQuery())}} >{PersonConfig.NAME_CONSTANT.RELOAD_BUTTON}</Button>
                    </div>
                </Paper>
                <Paper>
                    <Table>
                        <TRTableHeader
                            clickForSortFunction={{click(event: any, onClickData: any): void {_this.sortItemAction(event, onClickData, () => {_this.loadData()})}}}
                            actionColumnAlign={Align.right}
                            headers={tableHeaderDefinition.getHeaders()}
                            orderBy={this.state.orderBy}
                            sortDirection={this.state.sortDirection}/>
                        <TableBody>
                            {this.state.list.map((row: any, index:any) => (
                                <TableRow key={index} hover tabIndex={-1}>
                                    <TableCell align="left">{row.firstName}</TableCell>
                                    <TableCell align="left">{row.lastName}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.identifier}</TableCell>
                                    <TableCell align="right">
                                        <CaTableAction actions={this.tableActions(_this, row)}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TRPagination {...ApiUtil.paginationManager(this, ()=>{_this.loadData()})}/>
                </Paper>
            </React.Fragment>);
    }
}
export default withStyles(viewCommon)(PersonListView);