import React from 'react';
import AppConfig from "react-material-app/src/config/app-config";


export default class PFRFConfig extends AppConfig {

    public getBaseURL(): string {
        return "http://127.0.0.1:5000/";
    }

}