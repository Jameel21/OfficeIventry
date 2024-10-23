import React from 'react';
import { Button } from '@/components/ui/button';
const Button = (click) => {
  return (
    <div>
       <Button variant="primary">{click}</Button>
    </div>
  );
}

export default Button;
