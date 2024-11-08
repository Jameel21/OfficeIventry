import React from 'react';
import { Button } from '@/components/ui/button';

const ButtonDemo = ({label,type,className,variant}) => {
  return (
    <div>
       <Button variant={variant}  className={className} type={type}>{label}</Button>
    </div>
  );
}

export default ButtonDemo;
