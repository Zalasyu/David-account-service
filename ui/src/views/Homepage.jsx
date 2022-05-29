// Description: This will be the root '/' for users. The Homepage.
// It will conditionallt render content using:
// AuthenticatedTemplate asn UnauthenticatedTemplate

// Third-Party Libraries
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";

// UI Components
import { Button } from "@mui/material";
import { ButtonGroup } from "@mui/material";
import { Typography } from "@mui/material";

// SPA links
import { Link } from "react-router-dom";

// TODO: Create a homepage that conditionally renders if the user is logged in or not.
export const Homepage = () => {
    <>
    <AuthenticatedTemplate>

        <Button component={Link} to="/dashboard">Your dashboard awaits</Button>

    </AuthenticatedTemplate>
    <UnauthenticatedTemplate>
        <Typography variant="h6">
            <center>
                Please login to see your Homepage.
            </center>
        </Typography>
    </UnauthenticatedTemplate>
    </>
}


export default Homepage;