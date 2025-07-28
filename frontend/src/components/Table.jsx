import { useAtom } from 'jotai'
import React from 'react'
import { AddNew, Application, CompanyData, DateData, JOBID, LinkData, PositionData, StatusData } from './Atom'
import axios from 'axios'
function ApplicationStatus(status){
switch(status){
    case"Applied":
        return 'bg-gray-100 text-gray-500'
    case"Rejected":
        return 'bg-red-100 text-red-500'
    case"Selected":
        return 'bg-green-100 text-green-500'
    case"Pending":
        return  'bg-yellow-100 text-yellow-500'          
    default:
        return 'bg-gray-100 text-gray-500'
}
}
function Table({data}) {
      const [addnew,setAddnew]=useAtom(AddNew)
    const [App,setApp]=useAtom(Application)
    const [company,setCompany]=useAtom(CompanyData)
      const [position,setPosition]=useAtom(PositionData)
      const [link,setLink]=useAtom(LinkData)
      const [date,setDate]=useAtom(DateData)
      const [status,setStatus]=useAtom(StatusData)
      const [jobId,setjobId]=useAtom(JOBID)
      const token=localStorage.getItem("token")
  return (
    <div className=' w-auto md:w-300 absolute top-100 flex overflow-x-auto rounded-xl border border-gray-200 '>
        <table className=' w-auto md:w-full overflow-auto text-sm text-left text-gray-700   '>
            <thead className='bg-white font-semibold text-gray-600'>
                <tr className='border-b border-b-gray-200 overflow-y-scroll'>
                    <th className='px-1 md:px-4 md:py-3'>Company</th>
                    <th className='px-1 md:px-4 md:py-3'>Position</th>
                    <th className='px-1 md:px-4 md:py-3'>Application Date</th>
                    <th className='px-1 md:px-4 md:py-3'>Status</th>
                    <th className='px-1 md:px-4 md:py-3'>Action</th>
                </tr>
            </thead>
            <tbody>
                
                {data.map((e)=>
                    <tr key={e._id} className='border-b border-b-gray-200 overflow-visible'>
                        <td className='px-1 md:px-4 md:py-3'>{e.company}</td>
                        <td className='px-1 md:px-4 md:py-3'>{e.position}</td>
                        <td className='px-1 md:px-4 md:py-3'>{e.date}</td>
                        <td className='px-1 md:px-4 md:py-3'>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${ApplicationStatus(e.status)}`}>
                                {e.status}
                            </span>
                        </td>
                        <td className='px-1 md:px-4 md:py-3'>
                            <a className='hover:underline hover:text-gray-600' href={e.link.startsWith('https')?e.link:`https://${e.link}`} target="_blank" rel="noopener noreferrer">
                                View
                            </a>
                            <span>|</span>
                            <button className='cursor-pointer hover:underline hover:text-blue-600' onClick={()=>{
                                setjobId(e._id)
                                setAddnew(true)
                                setApp("Edit")
                                setCompany(e.company)
                                setPosition(e.position)
                                setDate(e.date)
                                setLink(e.link)
                                setStatus(e.status)
                                }}>Edit</button>
                            <span>|</span>
                            <button onClick={async()=>{
                                const res=await axios.delete(`http://localhost:3000/jobs/delete?JobId=${e._id}`,{
                                    headers:{
                                        Authorization:`Bearer ${token}`
                                    }
                                })
                                alert(res.data.msg)
                                window.location.reload()
                        }
                            } className='hover:underline hover:text-red-600 cursor-pointer'>Delete</button>


                        </td>
                        
                    </tr>

                )}

            </tbody>
        </table>
    </div>
  )
}

export default Table