
import {
    FileUploader,
    FileInput,
    FileUploaderContent,
    FileUploaderItem,
  } from "@/components/ui/fileupload";
  import { useController } from "react-hook-form";
  import React from "react";
  
  const FileUpload= ({control,name,placeholder}) => {
    const {field} = useController({
      control,
      name,
      defaultValue:'',
    });
  
    const dropzone = {
      accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
      },
      multiple: true,
      maxFiles: 4,
      maxSize: 1 * 1024 * 1024,
    };
   const files = []
    return (
      <FileUploader
         {...field}
        onValueChange={()=>field.onChange}
        dropzoneOptions={dropzone}
      >
        <FileInput>
          <div className="flex items-center justify-center h-32 w-full border bg-background rounded-md">
            <p className="text-gray-400">{placeholder}</p>
          </div>
        </FileInput>
        <FileUploaderContent className="flex items-center flex-row gap-2">
          {files?.map((file, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="size-20 p-0 rounded-md overflow-hidden"
              aria-roledescription={`file ${i + 1} containing ${file.name}`}
            >
              
            </FileUploaderItem>
          ))}
        </FileUploaderContent>
      </FileUploader>
    );
  };
  
  export default FileUpload