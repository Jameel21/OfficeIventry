import ButtonDemo from '@/components/form-fields/_utils/Button'
import Title from '@/components/form-fields/_utils/Title'
import { Building2 } from 'lucide-react';
import { TableProperties } from 'lucide-react';
import React from 'react'
import {  Link } from 'react-router-dom'
const Invertry = () => {
 
  
  return (
    <div className='container'>
      <div>
      <Title text1={'Equipment'} text2={'Management'}/>
      </div>
      <div className='bg-gray-300 md:w-[300px] md:h-[300px] rounded-lg m-4 flex flex-col '>
       
       <Building2 className="w-28 h-12 my-7 mx-20"/>
        
        <h1 className='text-lg font-semibold mx-12 mb-3'>ADD EQUIPMENT HERE</h1>
        <div className='bg-black h-1 mx-24 w-24'></div>
       <Link to='/add-form'><ButtonDemo  className={'my-12 mx-20'} label={'Go to Add Form'}/></Link>
      </div>
      <div className='bg-gray-400 md:w-[300px] md:h-[300px] rounded-lg m-4 flex flex-col '>
       
       <TableProperties className="w-28 h-12 my-7 mx-20"/>
        
        <h1 className='text-lg font-semibold mx-12 mb-3'>LIST OF EQUIPMENTS</h1>
        <div className='bg-black h-1 mx-24 w-24'></div>
       <Link to='/list'><ButtonDemo  className={'my-12 mx-20'} label={'CLICK TO VIEW LIST'}/></Link>
      </div>
    </div>
  )
}

export default Invertry