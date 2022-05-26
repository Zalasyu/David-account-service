import React from 'react'
import Footer from '../components/Footer'
import VenueSideBar from '../components/VenueSidebar';
import '../styles/Dashboard.css';


export const Dashboard = () => {
  return (
      <>
      <div className='dashboard'>
      <div className='sidebar-container'>
     <VenueSideBar/>
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
      
       
    <div className='page-wrapper'></div>
      <Footer />
      </div>
      </div>
      </>
  )
}

export default Dashboard