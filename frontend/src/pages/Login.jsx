import React, { useEffect, useState } from 'react'
import logo from '../assets/briefcase.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [Login,setLogin]=useState(true)
  const [fullname,setFullName]=useState("")
  const [userId,setuserId]=useState("")
  const navigate=useNavigate()

  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(token){
      navigate("/")
    }
    
  },[])
 async function OnbuttonClick(){
  if (Login){
    const login=await axios.post("http://localhost:3000/user/signin",{
      email,
      password
    })
    navigate("/")
    if(login.data.token && login.data.userId){
      localStorage.setItem('token',login.data.token)
      setuserId(login.data.userId)
    }
  }
  else{
    const signup=await axios.post("http://localhost:3000/user/signup",{
      email,
      password,
      fullname
    })
    setLogin(true)
  }
 }

  return (
    <div className='bg-amber-50 min-h-screen min-w-screen'>
        <div className='grid grid-cols-2 h-screen w-screen items-center'>
          <div className='hidden md:col-span-1 md:flex md:justify-center '><img className='size-25 shadow-2xl rounded-full' src={logo} alt="" /></div>
          <img className='md:hidden fixed top-3 left-3 size-10 shadow-2xl rounded-full' src={logo} alt="" />
          <div className='col-span-1 border-0 md:border-l border-gray-200 md:pl-40 p-5'>
            <div className=' w-88 shadow-2xl rounded-lg bg-white h-auto md:w-100'>
                <p className='flex justify-center pt-10 text-2xl font-medium text-gray-700 pb-15' >{Login?"Login":"Signup"}</p>
                <div className='w-full items-center'>
                <input className='ml-8 flex justify-center border border-gray-400 text-gray-500 w-70 h-10 p-2 md:ml-15 mb-7 rounded-lg ' onChange={(e)=>setEmail(e.target.value)} value={email} type="text" name="username" placeholder='Username' id="" />
                <input className='ml-8 flex justify-center border border-gray-400 text-gray-500 w-70 h-10 p-2 md:ml-15 mb-10 rounded-lg' onChange={(e)=>setPassword(e.target.value)} value={password} type="text" name="password" placeholder='Password' id="" />
                {!Login &&

                <input className='ml-8 flex justify-center border border-gray-400 text-gray-500 w-70 h-10 p-2 md:ml-15 mb-5 rounded-lg' onChange={(e)=>setFullName(e.target.value)} value={fullname} type="text" name="fullname" placeholder='Full Name' id="" />
                
                }
                  <button onClick={OnbuttonClick} className='ml-35 md:ml-40 mt-10 w-20 h-10 flex justify-center items-center p-3 text bg-gray-900 text-white rounded-lg hover:cursor-pointer hover:bg-gray-600'>{Login?"Login":"Signup"}</button>

                  <div className='flex justify-center pt-10 pb-5'>{Login?'Create new account':'Already have an account'} <div onClick={()=>setLogin(!Login)} className=' pl-2 text-blue-600 underline cursor-pointer'>{Login? "Signup":"Login"}</div> </div>

                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Login