"use client"

import { Checkbox } from "@/components/ui/checkbox"

const CheckboxField = ({labelName}) => {
  return (
    <div className="flex items-center space-x-2">
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {labelName}
      </label>
      <Checkbox id="terms" />
      
    </div>
  )
}

export default CheckboxField
