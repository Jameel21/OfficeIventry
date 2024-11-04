import { Input } from '@/components/ui/input';
import React from 'react';
import { useController } from 'react-hook-form';
const InputField = ({type,control,name,placeholder }) => {
    const {field ,formState:{errors}} = useController({
        control,
        defaultValue:'',
        name
    })
  return (
    <div className='md:w-[400px] p-4 mx-16'>
      <Input type={type}  placeholder={placeholder}  {...field}  


      />
    </div>
  );
}

export default InputField;
