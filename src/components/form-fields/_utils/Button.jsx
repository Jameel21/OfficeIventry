import React from 'react';
import { Button } from '@/components/ui/button';

const Button = ({label,type}) => {
  return (
    <div>
       <Button variant="primary" type={type}>{label}</Button>
    </div>
  );
}

export default Button;
