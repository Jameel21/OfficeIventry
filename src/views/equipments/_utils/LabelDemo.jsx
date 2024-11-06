import React from 'react';
import { Label } from "@/components/ui/label"


const LabelDemo = ({label}) => {
  return (
    <div className=' md:text-md text-lg text-gray-600'>
      <Label >{label}</Label>
    </div>
  );
}

export default LabelDemo;