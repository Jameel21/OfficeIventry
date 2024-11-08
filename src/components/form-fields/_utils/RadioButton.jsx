import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useController } from "react-hook-form"
const  RadioGroupDemo= ({control,name,option }) =>{
       const {field} = useController(
        {control,
            name,
            defaultValue:option[0].value
        }
       )
       
  return (
    <RadioGroup {...field} name={name}
    onValueChange ={field.onChange}>
      <div className="flex items-center space-x-2">
        {option.map((option)=>(
          <div key={option.id}>
        <RadioGroupItem value={option.value} id={option.id}  />
        <Label>{option.label}</Label>
      </div>))}
      </div>
    </RadioGroup>
  )

}
export default RadioGroupDemo;