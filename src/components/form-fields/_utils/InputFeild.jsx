import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


  const InputWithLabel = ({label,type,id,placeholder}) =>{
   
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
       
            
      <Label>{label}</Label>

      <Input type={type} id={id} placeholder={placeholder} />
      </div>
   
  )
}
export default InputWithLabel;