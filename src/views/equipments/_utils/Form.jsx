import {Box , TextField } from '@mui/material'
import React from 'react'


const Demo = () => {
  return (
    <div className='gradient-custom m-4 p-5 h-[100%] '>
      <div className='bg-primary h-40'>
      <form>
        <input type="option" placeholder='Equipment type' />
        <input type="text" placeholder='Equipment Name'/>
        <input className='border border-gray-700' type="number" placeholder='Model' />
       <div> 
        <p>Purshase Date</p>
        <input type='date' />
        </div>
        <input type="text" placeholder='Waranty period' />
        <input type="text" placeholder='CurrentStatus' />
      </form>
      </div>
      </div>
  )
}

export default Demo
