import React from 'react';
import TRLayoutInfoData from "tm-react/src/artifacts/data/view/tr-layout-info-data";
import PrivateLayout from "react-material-app/src/view/layouts/private-layout";
import URLMapping from "react-material-app/src/config/url-mapping";


export default class PFRFUrlMapping extends URLMapping {

    public getLayoutsAndPages(): Array<TRLayoutInfoData> {
        let pageWithLayout: Array<TRLayoutInfoData> = super.getLayoutsAndPages();

        let privateLayoutInfo: TRLayoutInfoData = new TRLayoutInfoData();
        privateLayoutInfo = new TRLayoutInfoData();
        privateLayoutInfo.layout = PrivateLayout;

        pageWithLayout.push(privateLayoutInfo);
        return pageWithLayout
    }

}