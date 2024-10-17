import React from 'react'
import { Button } from '../components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Sidebar from '@/components/Sidebar';

const Demo = () => {
  return (
    <div>
      <Sidebar/>
      <div className='bg-white w-[]'>
        <Form>
         <FormItem></FormItem>
        
          <Button>Add</Button>
        </Form>
        </div>
    </div>
  )
}

export default Demo
