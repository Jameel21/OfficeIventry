import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from '@/components/ui/label';

const RadioButton = ({radiolabel,defaultValue,radiovalue,radioid}) => {
  return (
    <div>
       <RadioGroup defaultValue={defaultValue}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={radiovalue} id={radioid} />
        <Label>{radiolabel}</Label>
      </div>
    </RadioGroup>
    </div>
  );
}

export default RadioButton;
