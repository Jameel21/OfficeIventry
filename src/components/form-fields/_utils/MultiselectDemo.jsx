import { MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger
   
   } from '@/components/ui/multiselector';
import React from 'react';
import { useController } from 'react-hook-form';

const MultiSelectors = ({name,control}) => {
  const {field}= useController({
       control,
       name})
  
       const option = [
           {
               value :'apple',
               label:'Apple'
           },
           {
               value :'orange',
               label:'Orange'
           },
           {
               value :'mango',
               label:'Mango'
           },
           {
               value :'banana',
               label:'Banana'
           }
       ]
 return (
   <div>
     <MultiSelector name={name} values={field.onChange}  > 
 <MultiSelectorTrigger>
   <MultiSelectorInput placeholder='Select the fruit' />
 </MultiSelectorTrigger>
 <MultiSelectorContent {...field}>
   
   <MultiSelectorList>
   {option.map((option)=>(
     
     <MultiSelectorItem key={option.value} value={option.value}>{option.label}</MultiSelectorItem>
   ))}
   </MultiSelectorList>
 </MultiSelectorContent>
</MultiSelector>

   </div>
 );
}

export default MultiSelectors;

