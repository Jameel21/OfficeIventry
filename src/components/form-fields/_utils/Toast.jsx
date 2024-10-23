import React from 'react';
import { useToast } from "@/components/hooks/use-toast"

const ToastDemo = ({toastdescription}) => {
    const { toast } = useToast(describtion)
  return (
    <div>
       {toast({
          description: {toastdescription}
        })}
    </div>
  );
}

export default ToastDemo;
