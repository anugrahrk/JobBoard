import React, { useState } from 'react'
import logo from '../assets/briefcase.png'
import { useNavigate } from 'react-router-dom'


function Header() {
  const [logout,setLogout]=useState(false)
  const navigate=useNavigate()
  return (
    <div>
        <div className='absolute top-0 left-0 w-screen h-10 border-b pt-1 border-b-gray-100 flex justify-between'> 
          <div className='flex justify-between p-1 pl-3'>
            <img className='size-7' src={logo} alt="" />
            <p className='font-medium text-md pl-2 text-gray-700'>Job Board</p>
          </div>
          <div className='p-1 pr-10 '>
            
            <svg onClick={()=>setLogout(!logout)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

          </div>

           </div>
           {logout && <div className='absolute items-center flex justify-center top-10 right-5   rounded-lg shadow-lg w-20 h-15 border border-gray-100'>
            <p onClick={()=>{ 
              localStorage.removeItem("token")
              navigate("/login")
              setLogout(false)
            }
            } className='w-full p-3  items-center flex justify-center hover:bg-gray-100 hover:cursor-pointer text-black hover:text-red-500 '>Logout</p>
           </div>}
    </div>
  )
}

export default Header