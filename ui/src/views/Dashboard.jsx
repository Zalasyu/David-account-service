import React from 'react'
import Footer from '../components/Footer'
import VenueSideBar from '../components/VenueSidebar';
import '../static/css/Dashboard.css';


const Dashboard = () => {
  return (
      <>
      <div className='dashboard'>
      <div className='sidebar-container'>
     <VenueSideBar/>
     </div>
     <div className='content'>
     
      <h1>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestiae possimus assumenda reprehenderit voluptatibus at fugit atque! 
        Optio, minus aliquid vitae debitis inventore, veritatis ad non recusandae explicabo officia numquam eius. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio pariatur facere ullam minima cupiditate 
        repellat assumenda tempora magnam molestias? Praesentium error natus similique repellendus commodi, velit illum illo aperiam odio!</h1>
       
    <div className='page-wrapper'></div>
      <Footer />
      </div>
      </div>
      </>
  )
}

export default Dashboard