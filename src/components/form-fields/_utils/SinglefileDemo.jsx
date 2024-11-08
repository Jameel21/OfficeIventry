import { Input } from "@/components/ui/input"
import { useController } from "react-hook-form";
import Dropzone, { useDropzone } from "react-dropzone/.";
 const SingleFile = ({id ,className,name,control}) => {
    const {field}= useController({
        control,
        name
    })
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        disabled: true
      });
    

  return (
    <div  {...getRootProps({className: 'dropzone disabled'})} className={className}>
      
      <Input {...field}{...getInputProps} id={id} type='file'
      />
      <p>drag and drop the file</p>
    </div>
  )
}
export default SingleFile;