import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import Card from '../components/Card'
import Table from '../components/Table'
import { useAtom } from 'jotai'
import { AddNew, CompanyData, DateData, JOBID, LinkData, PositionData, StatusData } from '../components/Atom'
import { Application } from '../components/Atom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Home() {
  const [addnew,setAddnew]=useAtom(AddNew)
  const [App,setApp]=useAtom(Application)
  const navigate=useNavigate()
  const [company,setCompany]=useAtom(CompanyData)
  const [position,setPosition]=useAtom(PositionData)
  const [link,setLink]=useAtom(LinkData)
  const [date,setDate]=useAtom(DateData)
  const [status,setStatus]=useAtom(StatusData)
  const [open,setOpen]=useState(false)
  const [jobsstored,setJobs]=useState([])
  const[searchjobs,setSearchJobs]=useState([])
  const [jobId,setjobId]=useAtom(JOBID)
  const [searchfilter,setSearchFilter]=useState("")
  const Options=["Applied","Rejected","Pending", "Selected"]
  const Boxref=useRef(null)
  const token=localStorage.getItem("token")
  const apiUrl= import.meta.env.VITE_API_URL
  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(!token){
      navigate("/login")
    }
  })
  useEffect(()=>{
    function ClickOutside(event){
      if (Boxref.current && !Boxref.current.contains(event.target)){
        setOpen(false)
      }

    }
    document.addEventListener('mousedown' , ClickOutside)
    return()=> {document.removeEventListener('mousedown',ClickOutside)}
  },[])

useEffect(() => {
  async function ReadJobs() {
    try {
      const jobs = await axios.get(`${apiUrl}jobs/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  }
  ReadJobs();
}, []);

useEffect(()=>{
  const delayedDebounce=setTimeout(()=>{
  async function ReadSearch(){
    if(searchfilter.trim===""){
      setSearchJobs([])
      return
    }
  const search=await axios.get(`${apiUrl}jobs/search?filter=${searchfilter}`,{
    headers:{
      authorization:`Bearer ${token}`
    }
  })
  setSearchJobs(search.data.job)
  }
  ReadSearch()
},300)
},[searchfilter])
  return (
    <div>
      {addnew &&
      <div className='flex w-fit  h-fit md:h-fit md:w-full justify-center items-center '>
    <div className='border-t border-t-gray-100 rounded-lg   shadow-lg bg-white m-10  p-10'>
      
        <div className='flex justify-between gap-16'>
          <p className='text-xl font-semibold '>{App} Application</p>   
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" onClick={()=>setAddnew(false)} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-7 hover:text-red-500">
  <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>

          </div>
        </div>
        <div className='pt-20 md:flex gap-10'>
          <div className='pb-5'>
          <label htmlFor="" className=''> Company Name</label>
          <input type="text" onChange={(e)=>setCompany(e.target.value)} value={company} className='focus:outline-gray-500 w-full mt-1 p-1 border rounded-lg border-gray-400'/>
          </div>
          <div className='pb-5'>

          <label htmlFor=""> Position Applied</label>
          <input type="text" onChange={(e)=>setPosition(e.target.value)} value={position} className='focus:outline-gray-500 w-full mt-1 p-1 border rounded-lg border-gray-400'/>
          </div>

        </div>
        <div className='md:flex  gap-10'>
        <div className='pb-5 ' >
            <label htmlFor="">Status</label>
            <div ref={Boxref}>
            <button  onClick={()=>setOpen(!open)} className='bg-transparent border-gray-400 gap-1 cursor-pointer border rounded-lg p-1 flex mt-2'>
              <p>{status}</p>
              <div  ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>
</div>
            </button>
            {open &&
            <div  className='absolute border border-gray-400 shadow-lg p-4 bg-white rounded-lg'>
              <ul>
                {Options.map((item,index)=> <li key={index} onClick={()=>{
                  console.log("selected item:"+item) 
                  setStatus(item)
                  setOpen(false)
                  }} className='p-1 font-semibold text-lg cursor-pointer'>{item}</li>)}
              </ul>
            </div>
            }
            </div>
          </div>

          <div className='pb-5' >
          <label htmlFor=""> Application Date</label>
          <input type="date" onChange={(e)=>setDate(e.target.value)} value={date}  className='w-2/3 p-1 cursor-pointer focus:outline-gray-500 mt-2 border rounded-lg border-gray-400'/>
          </div>

          
        </div>
        <label htmlFor="">Website Link</label>
        <input type="text" onChange={(e)=>setLink(e.target.value)} value={link} className='focus:outline-gray-500 w-full mt-1 p-1 border rounded-lg border-gray-400' name="" id="" />
        <div className='w-full flex justify-center pt-5'>
        <button onClick={async()=>{
          if(App==="Add"){
              const res=await axios.post(`${apiUrl}jobs/add`,{
                company,
                position,
                status,
                date,
                link
              },{
                headers:{
                  authorization:`Bearer ${token}`
                }
              })
              alert(res.data.msg)
              window.location.reload()

          }
          if(App==="Edit"){
            const res=await axios.put(`${apiUrl}jobs/edit?JobId=${jobId}`,{
                company,
                position,
                status,
                date,
                link
              },{
                headers:{
                  authorization:`Bearer ${token}`
                }
              })
              alert(res.data.msg)
              window.location.reload()

          }
          setCompany("")
          setPosition("")
          setDate("")
          setLink("")
          setStatus("Select")
          setAddnew(false)
        }} className='bg-gray-800 text-white relative bottom-0 p-3 rounded-lg cursor-pointer hover:bg-gray-600'> Submit</button>

        </div>
        </div>
        
    </div>
    

    }
     {!addnew && <div>
      <Header/>
    
    <p className=' relative top-14 left-7 font-bold text-lg text-gray-700 md:text-xl'>Dashboard</p>
    <div className='absolute p- left-7 pt-5 top-20 grid grid-cols-2 md:grid-cols-4 gap-4'>
      <Card text={"Applied"} number={jobsstored?.filter(job=>job.status=="Applied").length || 0}/>
      <Card text={"Rejected"} number={jobsstored?.filter(job=>job.status=="Rejected").length || 0}/>
      <Card text={"Pending"} number={jobsstored?.filter(job=>job.status=="Pending").length || 0}/>
      <Card text={"Selected"} number={jobsstored?.filter(job=>job.status=="Selected").length || 0}/>
    </div>
        <p className=' relative top-66 left-7 font-semibold md:text-lg text-gray-900 md:left-20'>All Applications</p>
        <div className='flex justify-center gap-3  '>
        <div className=' relative top-70  border border-gray-300 rounded-lg w-60 md:w-5/6 p-1  '><input onChange={(e)=>setSearchFilter(e.target.value)} type="text" value={searchfilter} className='p-1 w-full border-none focus:outline-none' placeholder='Search' /></div>
        <button onClick={()=>{setAddnew(true)
          setApp("Add")
          setCompany("")
          setPosition("")
          setDate("")
          setLink("")
          setStatus("Select")

        }} className='relative w-20 h-10 bg-gray-600 flex justify-center items-center rounded-lg top-70   hover:bg-gray-900 text-white'><div>+</div>Add Job</button>
        </div>
            
        <div className='p-4 mx:w-full md:mx-15'>
          <Table data={searchfilter.trim()===""?jobsstored:searchjobs} />
        </div>
        <div className=''>
        </div>
        </div>}
        
    </div>
  )
}

export default Home