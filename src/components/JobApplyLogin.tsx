import React from 'react'

interface props {
    position : string,
    company : string,
}

const JobApplyLogin = ( {position, company} : props ) => {
  return (
    <div className='justify-center flex gap-1 flex-row align-middle sm:text-xl md:text-2xl lg:text-3xl'>
Applying for <span className='font-bold'> {position} </span> at <span className='font-extrabold'> {company} </span>  
    </div>
  )
}

export default JobApplyLogin


