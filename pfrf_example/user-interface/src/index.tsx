import ReactDOM from "react-dom";
import React from "react";
import TRPageManager from "tm-react/src/artifacts/manager/tr-page-manager";
import PFRFConfig from "./config/pfrf-config";
import PFRFUrlMapping from "./config/pfrf-url-mapping";
import {AppMessage} from "react-material-app/src/system/app-message";

const appConfig = new PFRFConfig();
const urlMapping = new PFRFUrlMapping();
AppMessage.appName = "PFRF Example";
AppMessage.loginLabel = "PFRF Example";
ReactDOM.render(<TRPageManager appConfig={appConfig} urlMapping={urlMapping}/>, document.getElementById('root'));
