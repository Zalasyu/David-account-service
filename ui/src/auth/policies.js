const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1A_SIGNUP_SIGNIN",
        forgotPassword: "B2C_1A_PASSWORDRESET",
        editProfile: "B2C_1A_PROFILEEDIT"
    },
    authorities: {
        signUpSignIn: {
            authority: "https://projectcentredavidev.b2clogin.com/projectcentredavidev.onmicrosoft.com/B2C_1A_SIGNUP_SIGNIN",
        },
        forgotPassword: {
            authority: "https://projectcentredavidev.b2clogin.com/projectcentredavidev.onmicrosoft.com/B2C_1A_PASSWORDRESET",
        },
        editProfile: {
            authority: "https://projectcentredavidev.b2clogin.com/projectcentredavidev.onmicrosoft.com/B2C_1A_PROFILEEDIT"
        }
    },
    authorityDomain: "projectcentredavidev.b2clogin.com"
}