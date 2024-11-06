import React from 'react';
import { Label } from "@/components/ui/label"


const LabelDemo = ({label,htmlfor}) => {
  return (
    <div className=' md:text-md text-lg'>
      <Label htmlfor={htmlfor} >{label}</Label>
    </div>
  );
}

export default LabelDemo;