import Title from './_utils/Title'
import { Button } from '@/components/ui/button'

import React from 'react'
import {  Link } from 'react-router-dom'
const Invertry = () => {
 
  
  return (
    <div className='container'>
      <div>
      <Title text1={'Equipment'} text2={'Management'}/>
      </div>
      <div className='bg-purple-100 lg:w-[200px] lg:h-[200px] m-4'>
       
       <Link to='/add-form'><Button >Add Equip</Button></Link>
      </div>
    </div>
  )
}

export default Invertry