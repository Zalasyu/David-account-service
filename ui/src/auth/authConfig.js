// Author: Alec Moldovan
// Description: Configuration object to be passed to MSAL instance
//              on creation.
//              Customizes the behaviour of our authentication flows.

// Using the Config object that can be passed into
// PublicClientApplication constructor.

export const msalConfig = {
    auth: {
        // App ID of your app
        clientId: "3be2544f-540f-43b7-a7a5-231fe8e7b3ca",

        // URI of the tenant to authenticate and authorize with
        authority: "https://login.microsoftonline.com/deb74ed9-329d-4a0b-8a37-c9cb058450a9",

        // An array of URIs that are known to be valid
        knownAuthorities: [],
        // A string containf the cloud discovery response.
        cloudDiscoveryMetadata: "",

        // URI where the authorization code reponse is sent back to.
        // Whatever the location is specified here it must have the MSAL
        // Library available to handle the response.
        redirectUri: "http://localhost:3000",

        // URI that is redirected to after logout() call is made
        postLogoutRedirectUri: "enter_postLogout_redirect_uri",

        // If true, will navigate back to the original request location
        // before processing he authorization code response.
        // If the reDirectUri is the same as the OG request location,
        //this flag should be set to false.
        navigateToLoginRequestUrl: true,

        // Array of capabilities to be added to all network requests
        // as part of the xms_cc claims request
        clientCapabilities: ["CP1"]
    },
    cache: {

        // Location of token cache in browser
        // NOTE: sessionStorage more secure but localStorage
        // enables you SSO between tabs.
        cacheLocation: "sessionStorage",

        // If true, stores cache items in cookies as well as 
        // browser cache. Should be set to true for use cases using IE
        storeAuthStateInCookie: false,

        // If true and storeAuthStateInCookies is also enabled
        // MSAL adds the secure flag to the browser cookie so it can
        // be sent over HTTPS.
        secureCookies: false
    },
    system: {

        // Config object for logger
        loggerOptions: {

            // Callback function which handles the logging of MSAL statemets.
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case msal.LogLevel.Error:
                        console.error(message);
                        return;
                    case msal.LogLevel.Info:
                        console.info(message);
                        return;
                    case msal.LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case msal.LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

// Scopes added here will be prompted for user consent during
// sign-in
// By default, MSAL.js will add OIDC scopes (openid, profile, email)
// to any login request.
export const loginRequest = {
    scopes: ["openid", ...apiConfig.b2cScopes]
}

// Scopes added here will be used to request a token from Azure AD B2C
// to be used for accessing a protected resource.
export const tokenRequest = {

    scopes: [...apiConfig.b2cScopes],

    // Set this to true to skip a cached token and go
    // to server to get a new token.
    forceRefresh: false

}