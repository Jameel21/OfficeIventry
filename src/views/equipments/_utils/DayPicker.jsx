import React from "react"
import { useController } from "react-hook-form"
import {  CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"



 const DatePickerDemo = ({control,name})=> {
     const {field,
    fieldState:{error}}= useController({
        control,
        name,    
       defaultValue:""
     })

 

  return (
    <div >
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
             !field.value && "text-muted-foreground"
          )}
        > 
          <CalendarIcon />
          {field.value ? format(field.value,"PPP"):<span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        
         <Calendar
         mode="single"
         {...field}
         selected={field.value}
         onSelect={field.onChange}
         initialFocus
       />
      </PopoverContent>
    </Popover>
    </div>
  )
}
export default  DatePickerDemo;
