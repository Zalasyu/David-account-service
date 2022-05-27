import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_signupsignin1",
        forgotPassword: "B2C_1_resetPassword1",
        editProfile: "B2C_1_editProfile1"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://projectcentredavidev.b2clogin.com/projectcentredavidev.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_SIGNUP_SIGNIN",
        },
        forgotPassword: {
            authority: " https://projectcentredavidev.b2clogin.com/projectcentredavidev.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_PASSWORDRESET ",
        },
        editProfile: {
            authority: " https://projectcentredavidev.b2clogin.com/projectcentredavidev.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1A_PROFILEEDIT "
        }
    },
    authorityDomain: "projectcentredavidev.b2clogin.com"
}

/**
 * Configuration object to be passed to MSAL instance on creation. 
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md 
 */
export const msalConfig = {
    auth: {
        clientId: "3be2544f-540f-43b7-a7a5-231fe8e7b3ca", // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Use a sign-up/sign-in user-flow as a default directory
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark our B2C tenant's domain as trusted.
        redirectUri: "/", // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                }
            }
        }
    }
};

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
    apiDashboard: {
        endpoint: "http://localhost:3080/dashboard",
        scopes: ["https://projectcentredavidev.onmicrosoft.com/dashboard/dash.previewRead"], // e.g. api://xxxxxx/access_as_user
    },
}

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequest = {
    scopes: [...protectedResources.apiHello.scopes]
}