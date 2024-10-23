import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const User = () => {
  return (
    <div>
      <div className='text-primary flex flex-row items-center my-5 justify-start '>
          <Avatar className='ml-7 mt-3'>
            <AvatarImage></AvatarImage>
            <AvatarFallback>Hii</AvatarFallback>
          </Avatar>
          <h1 className='text-xl font-medium mt-3 mx-5'>Hi ,User</h1>
          
      </div>
      <div className='h-hl mt-3 mx-20 justify-center bg-primary w-1/2'></div>
    </div>
  )
}

export default User
