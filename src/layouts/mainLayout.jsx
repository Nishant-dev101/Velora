


import React from 'react'
import Navbar from '../components/navbar'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
     <main className="min-h-screen bg-[#141414]">
        <div className="sticky top-0 z-20">
              <Navbar/>
        </div>
                <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-10 sm:px-8">
                   <Outlet/>
                </div>
        
     </main>

  )
}

export default MainLayout