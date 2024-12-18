import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const UiInput = ({ type, placeholder, inputClassName,value,onChange }) => {
  
  return (
    <div className="flex flex-col gap-3">
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "border sm:rounded-lg lg:rounded-xl  border-gray-300 p-2 text-sm transition-all focus:ring-1 focus:ring-ring focus:outline-none ",
          inputClassName
        )}
      />
    </div>
  );
};
export default UiInput;
