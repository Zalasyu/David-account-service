// Create the main myMSALObj instance
// Configuration paameters are located at authConfig.js

const myMSALObj = new msal.PublicClientApplication(msalConfig);

let accountId ="";
let idTokenObject = "";
let accessToken = null;


