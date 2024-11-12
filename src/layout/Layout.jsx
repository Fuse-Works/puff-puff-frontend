import React from 'react'
import Navigation from '../navigation/Navigation'
import Sidebar from '../Sidebar'
import { useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    const pathname = location.pathname
    console.log("pathname",pathname);


    let pathlistForNoLayout = ["/signin",]
    
  return (
    <div style={{ display: 'flex', gap: '14px',}}> 

    
    {
        !pathlistForNoLayout?.includes(pathname) &&  <Sidebar /> 
    }
       
    <Navigation/>
    </div>
  )
}

export default Layout