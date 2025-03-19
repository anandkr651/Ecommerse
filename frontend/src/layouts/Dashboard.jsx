import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <section className='bg-white mx-auto lg:pt-20 pt-24'>
        <div className='container mx-auto p-2 md:grid md:grid-cols-[250px,1fr] gap-5 w-full '>
            {/* left part */}
            <div className='sticky top-20 max-h-[calc(100vh-120px)] overflow-auto hidden md:block border border-red-500 '>
               <UserMenu/>
            </div>
            {/* right part */}
            <div className="bg-white w-full border border-blue-400 min-h-[70vh] overflow-hidden z-10">
             <Outlet />
            </div>
        </div>
    </section>
  )
}

export default Dashboard
