import React  from 'react';
import { useController } from 'react-hook-form';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

 const SelectFieldDemo = ({name,control,option,placeholder ,label,className}) => {
     const {field} =useController({
       control,
       defaultValue:option[0].value,
       name
    })
  return (
    <div className={className}> 
     <Select name={name} onValueChange={field.onChange} >
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent {...field}>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {option.map((option,index)=>(
            <div key={index}>
          <SelectItem value={option.value}>{option.label}</SelectItem>
          </div>))}
        </SelectGroup>
      </SelectContent>
    </Select>

    </div>
  );
}

export default SelectFieldDemo;
 
