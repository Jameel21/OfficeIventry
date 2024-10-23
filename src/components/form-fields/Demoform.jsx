import React from 'react'
import { Button } from '../ui/button'
import {
  Form,
} from "@/components/ui/form"
import SelectDemo from './_utils/SelectDemo'

const Demo = () => {
  return (
    <div className='md:w-[750px] lg:w-[1140px]'> 
      
       <Form>
          <div className='p-20 '>
            <h1>Equipment Type:</h1>
          <SelectDemo  options={[{label:"demo", value :"1"}]}/>
          <SelectDemo  options={[{label:"demo2", value :"2"}]}/>

          </div>
        
        <div>
        
          <Button size='lg' >Add</Button>
          </div>
        </Form>
        
    </div>
  )
}

export default Demo
