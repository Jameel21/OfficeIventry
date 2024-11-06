import React from 'react';
//import { useController } from 'react-hook-form';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"

const Popover = ({heading,children}) => {
 
  return (
    <div>
      <Popover>
  <PopoverTrigger>{heading}</PopoverTrigger>
  <PopoverContent>{children}</PopoverContent>
</Popover>
    </div>
  );
}

export default Popover;
