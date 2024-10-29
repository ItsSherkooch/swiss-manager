import { Outlet, useLocation } from 'react-router-dom'
import React from 'react'
import SideBar from '../components/SideBar'

export default function TournaumentLayout() {
  const location = useLocation()
  return (
    <>
      <header className='w-screen flex justify-center border-b-2 py-10'>
      </header>

      <div className='w-screen flex flex-col items-center justify-center my-5 px-2 ' style={{minHeight: 'calc(100vh - 160px)'}}>
        {
          location.pathname != '/' &&
          <SideBar /> 
        }
        <div className='flex flex-grow overflow-y-auto'>
          <Outlet />
        </div>
      </div>
      <footer className='flex justify-center border-t-2 py-10 mt-5'>
        Something Foolish
      </footer>
    </>
  )
}
