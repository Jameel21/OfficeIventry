import React, { useState } from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import GroupIcon from '@mui/icons-material/Group';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LogoutIcon from '@mui/icons-material/Logout';
import {Link} from 'react-router-dom'
import { Avatar} from '@mui/material';
import ArrowBackwardIcon from '@mui/icons-material/ArrowForward';
import { Button } from './ui/button';
const Sidebar = () => {

{/*const [isOpen,setIsOpen] = useState('false');
const toggleDropdown = ()=>{
     setIsOpen(!isOpen);
}*/}

  return (
    <div className='gradient-custom md:w-2/4 lg:w-1/4 sm:w-full border-r-2 rounded-xl m-3 h-screen'>
      <div className='text-primary flex flex-row items-center justify-evenly p-5'>
{/*<img src={<UserIcon/>} alt="" />
          <UserName/>*/}
          <Avatar>
          </Avatar>
          <h1 className='text-xl'>Hi ,User</h1>
          <ArrowBackwardIcon className='text-primary m-4'/>
      </div>
      <div className='h-hl mt-3 mx-20 justify-center bg-primary w-1/2'></div>
{/*-------------------------------- side bar menu ------------------------ */}

      <div>
        <ul className='p-9'>
        
          <div className='pt-6 flex flex-row justify-start items-center text-primary hover:text-black text-xl'>
              <BusinessIcon className='text-3xl mx-3'/> 
              <li className=' text-xl mx-3 '>Inventry Management</li>
          </div>
                 
          {/*<div className='flex flex-row items-center justify-start p-2'>
               <ComputerIcon className='text-primary hover:text-black mx-3' /> 
               <li className=' text-xl mx-3 '>Emloyees Management</li>
          </div>*/}
              
          <div className='pt-6 flex flex-row justify-start items-center text-primary hover:text-black text-xl' >
               <GroupIcon className='text-3xl mx-3'/>
               <li className=' text-xl mx-3 '>Employees  Management</li>
          </div>

           <div className='pt-6 flex flex-row justify-start items-center  text-primary hover:text-black text-xl' >
               <RecentActorsIcon className='text-3xl mx-3'/>
              <Link to='/Logs'><li className='mx-3'>Logs</li></Link> 
            </div>

            <div  className='pt-6 flex flex-row justify-start items-center  text-primary hover:text-black text-xl '>
               <NotificationsActiveIcon className='font-bold mx-3 '/> 
                <li className=' text-xl mx-3'>Notification</li>
             </div>
        </ul>
        <LogoutIcon className='mx-12 text-xl'/>
        <Button className='p-5 mx-18  text-md' >Logout</Button> 
      </div>
    </div>
  );
}

export default Sidebar