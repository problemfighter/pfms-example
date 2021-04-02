import TRLayoutInfoData from "tm-react/src/artifacts/data/view/tr-layout-info-data";
import React from "react";


const ListView = React.lazy(() => import('./person-list-view'));
const CreateUpdateView = React.lazy(() => import('./person-create-edit-view'));

const UI_BASE_URL = "/person"
const API_BASE_URL = "/person"

export default class PersonUrlMapping {


    public static readonly API_BASE_URL = "/person"

    public static readonly API = {
        LIST: "XXXXXXXX",
        CREATE: "XXXXXXXX",
        UPDATE: "XXXXXXXX",
        DELETE: "XXXXXXXX",
        DETAILS: "XXXXXXXX",
        ACTIVE_INACTIVE: "XXXXXXXX",
    };


    public static readonly ui = {
        index: UI_BASE_URL,
        list: UI_BASE_URL + "/list",
        create: UI_BASE_URL + "/create",
        update: UI_BASE_URL + "/update",
        details: UI_BASE_URL + "/details",
    };

    public static privateUrlMappings(privateLayoutInfo: TRLayoutInfoData): TRLayoutInfoData {
        privateLayoutInfo.addPageInstance(this.ui.index, ListView);
        privateLayoutInfo.addPageInstance(this.ui.list, ListView);
        privateLayoutInfo.addPageInstance(this.ui.create, CreateUpdateView);
        return privateLayoutInfo;
    }

    public static publicUrlMappings(publicLayoutInfo: TRLayoutInfoData): TRLayoutInfoData {
        return publicLayoutInfo;
    }
}