import TRLayoutInfoData from "tm-react/src/artifacts/data/view/tr-layout-info-data";
import React from "react";


const ListView = React.lazy(() => import('./person-list-view'));
const CreateUpdateView = React.lazy(() => import('./person-create-edit-view'));
const DetailsView = React.lazy(() => import('./person-details-view'));

const UI_BASE_URL = "/person"
const API_BASE_URL = "api/v1/person/"

export default class PersonUrlMapping {


    public static readonly API_BASE_URL = "/person"

    public static readonly API = {
        LIST: API_BASE_URL + "list",
        CREATE: API_BASE_URL + "create",
        UPDATE: API_BASE_URL + "update",
        DELETE: API_BASE_URL + "delete/",
        DETAILS: API_BASE_URL + "details/",
        ACTIVE_INACTIVE: API_BASE_URL + "active-inactive",
    };


    public static readonly ui = {
        index: UI_BASE_URL,
        list: UI_BASE_URL + "/list",
        create: UI_BASE_URL + "/create",
        update: UI_BASE_URL + "/update",
        updateWithParams: UI_BASE_URL + "/update/:id",
        details: UI_BASE_URL + "/details",
        detailsWithParams: UI_BASE_URL + "/details/:id",
    };

    public static privateUrlMappings(privateLayoutInfo: TRLayoutInfoData): TRLayoutInfoData {
        privateLayoutInfo.addPageInstance(this.ui.index, ListView);
        privateLayoutInfo.addPageInstance(this.ui.list, ListView);
        privateLayoutInfo.addPageInstance(this.ui.create, CreateUpdateView);
        privateLayoutInfo.addPageInstance(this.ui.updateWithParams, CreateUpdateView);
        privateLayoutInfo.addPageInstance(this.ui.detailsWithParams, DetailsView);
        return privateLayoutInfo;
    }

    public static publicUrlMappings(publicLayoutInfo: TRLayoutInfoData): TRLayoutInfoData {
        return publicLayoutInfo;
    }
}