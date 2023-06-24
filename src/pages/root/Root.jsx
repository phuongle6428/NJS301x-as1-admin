import React, { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from '../../components/sidebar/SideBar';
import './root.css'
export default function Root() {
   const navigate = useNavigate()
   useEffect(() => {
      const admin = JSON.parse(localStorage.getItem('admin'))
      if (!admin) {
         navigate('/login')
      }
   }, [])

   return (
      <>
         <main className='main-content'>
            <h2 className='page-title'>Admin Page</h2>
            <div className='main-container'>
               <div className='sidenav'>
                  <SideBar />
               </div>
               <div className='content'>
                  <Outlet />
               </div>
            </div>
         </main>
      </>
   )
}
