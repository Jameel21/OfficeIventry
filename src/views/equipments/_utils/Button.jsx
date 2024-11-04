import React from 'react';
import { Button } from '@/components/ui/button';

const ButtonDemo = ({label,type}) => {
  return (
    <div>
       <div className='flex flex-col items-center my-6' >
       <Button  type={type}>{label}</Button>
       </div>
    </div>
  );
}

export default ButtonDemo;
