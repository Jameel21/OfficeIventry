import { Button } from '@/components/ui/button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const handleClick = ()=>{
          navigate('/dashboard')
  }
  return (
    <div >
      <div>
      <h1 className='mx-28 my-10'>WELCOME TO LOGIN PAGE</h1>
      </div>
      <div className='mx-24 my-10'>
       <Button onClick={handleClick}>Login</Button>
       </div>
    </div>
  );
}

export default Login;
