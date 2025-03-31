import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <section className='bg-white mx-auto'>
        <div className='container mx-auto md:grid md:grid-cols-[250px,1fr] gap-5 w-full '>
            {/* left part */}
            <div className='top-20 border border-red-500 max-h-[calc(100vh-120px)] overflow-auto hidden md:block'>
               <UserMenu/>
            </div>
            {/* right part */}
            <div className="bg-white border border-blue-500 w-full min-h-[70vh] overflow-auto max-h-[75vh] scrollbar-none">
             <Outlet />
            </div>
        </div>
    </section>
  )
}

export default Dashboard
