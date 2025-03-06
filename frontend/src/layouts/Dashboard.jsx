import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <section className='bg-white'>
        <div className='container max-auto p-3 grid lg:grid-cols-2'>
            {/* left part */}
            <div className='py-4 sticky top-24 overflow-auto hidden lg:block'>
               <UserMenu/>
            </div>
            {/* right part */}
            <div className="bg-white ">
             <Outlet/>
            </div>
        </div>
    </section>
  )
}

export default Dashboard
