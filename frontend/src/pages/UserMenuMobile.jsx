import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoClose } from "react-icons/io5";
import {Link} from 'react-router-dom';

function UserMenuMobile() {
  return (
    <section className='bg-white h-full w-full'>
         {/* <button onClick={()=>window.history.back()} className='text-neutral-800 block w-fit ml-auto'> */}
         <Link to={"/"} className='text-neutral-800 block w-fit ml-auto'>
          <IoClose size={25}/>
        </Link>
     <div className='container px-3'>
     <UserMenu/>
     </div>
    </section>
  )
}

export default UserMenuMobile
