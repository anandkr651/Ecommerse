import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <section className='bg-white'>
        <div className='container max-auto p-3 md:grid md:grid-cols-[250px,1fr]'>
            {/* left part */}
            <div className='py-4 sticky top-24 overflow-auto hidden md:block'>
               <UserMenu/>
            </div>
            {/* right part */}
            <div className="bg-white w-full">
             <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
