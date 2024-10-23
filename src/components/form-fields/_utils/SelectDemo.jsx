import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  
const SelectDemo = ({value,selectitem,placeholder}) => {
  return (
    <div>
      <Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder={placeholder} />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value={value}>{selectitem}</SelectItem>
  </SelectContent>
</Select>
    </div>
  );
}

export default SelectDemo;
