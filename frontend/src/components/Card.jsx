import React from 'react'

function Card({text,number}) {
  return (
    <div className='border border-gray-100  shadow-lg rounded-lg  p-3 w-40 md:p-5   md:w-80 md:h-30'>
        <p className='md:text-lg'>{text}</p>
        <p className='font-semibold text-lg md:text-2xl'>{number}</p>
    </div>
  )
}

export default Card