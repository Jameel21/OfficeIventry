import React from 'react';
import { Label } from "@/components/ui/label"


const LabelDemo = ({label,htmlfor}) => {
  return (
    <div>
      <Label htmlFor={htmlfor} > {label}</Label>
    </div>
  );
}

export default LabelDemo;