import { Button } from '@/components/ui/button'
import React from 'react'
import {  Link, useNavigate } from 'react-router-dom'
const Invertry = () => {
  const navigate = useNavigate()
  // const handleClick =()=>{
  //   navigate('edit-form')
  // }
  return (
    <div>
      <h1>INVENTRY</h1>
      <div className='p-10'>
       <Link to='/add-form'>  <Button >Add Equip</Button></Link>
      </div>
    </div>
  )
}

export default Invertry