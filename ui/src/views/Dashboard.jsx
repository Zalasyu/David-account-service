// In-built Libraries
import React, { useState, useEffect } from 'react'

// Third-party Libraries
import { MsalAuthenticationTemplate, useMsal, useAccount } from '@azure/msal-react';
import { InteractionType, InteractionStatus, InteractionRequiredAuthError } from '@azure/msal-browser';
import { loginRequest } from '../auth/authConfig';

// Components
import Footer from '../components/ForAll/Footer'
import VenueSideBar from '../components/Venue/VenueSidebar';

// Styles
import '../styles/Dashboard.css';


export const Dashboard = () => {

  // A hook that returns the PublicClientApplication instance,
  // an array of all accounts currently signed in and
  // an inProgress value that tells us what msal is currently doing.
  const  { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const [apiData, setApiData] = useState(null);

  // useEffect: Anything which is passed to useEffect will run after
  //            the render is committed to the screen
  // WE will make an API call once the component has completed rendering
  useEffect(() => {
    if (!apiData && account && inProgress === InteractionStatus.None){

      // Add info. to request.
      const request = { ...loginRequest, account: account };

      // Make a silent token request
      instance.acquireTokenSilent(request).then((response) => {
        setApiData(response)
      }).catch((err) => {
        if ( err instanceof InteractionRequiredAuthError){
          instance.acquireTokenRedirect(request);
        }
      });
    }
  }, [account, inProgress, instance, apiData]);
  return (
      <>
      <div className='dashboard'>
      <div className='sidebar-container'>
     <VenueSideBar />
     </div>
     <div className='content'>
     
      <h1>
        This area will be populated by containers.
        Each container will communicate with a different service.
        A subset of data will be communicated from the service.
        Then each container will display some data visualization
        and/or some summary of what this service is about.
        In addition, when a user clicks on a container they will
        enter into that very service that will have a different UI.
      </h1>
      <h2>
        apiData
      </h2>
      
       
    <div className='page-wrapper'></div>
      <Footer />
      </div>
      </div>
      </>
  )
}

export default Dashboard;