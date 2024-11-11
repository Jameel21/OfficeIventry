import { cn } from "@/lib/utils";
import { useController } from 'react-hook-form';
import { Label } from "@/components/ui/label";
import { ChevronUp } from "lucide-react";
import { DropdownMenu,DropdownMenuTrigger, DropdownMenuContent, DropdownMenuRadioItem, DropdownMenuRadioGroup} from "@/components/ui/dropdown-menu";


const DropDown = ({ label, control, name, options, placeholder, labelClassName, dropDownClassName }) => {
  const { field, fieldState: { error } } = useController({
    control,
    name,
    defaultValue:'',
  });

  const handleSelect = (value) => {
    field.onChange(value);
  };

  const isPlaceholder = !field.value;


  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label className={cn("text-xs sm:text-sm md:text-base lg:text-lg text-slate-700",  labelClassName)}>
        {label}
      </Label>
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className={cn("rounded-md sm:rounded-lg lg:rounded-xl text-left text-sm transition-all focus:ring-1 focus:ring-ring border bg-ternary border-gray-300 focus:outline-none flex items-center justify-between",  isPlaceholder ? "text-muted-foreground"  : "text-foreground", dropDownClassName)}>
          <span>{field.value || placeholder}</span>
          <ChevronUp className="w-4 h-4 mr-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50 w-full rounded-md shadow-lg bg-primary">
          <DropdownMenuRadioGroup value={field.value} onValueChange={handleSelect}>
            {options.map((option, index) => (
              <DropdownMenuRadioItem key={index} value={option}>
                {option}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>

      </DropdownMenu>
      <p className="h-1 text-sm text-red-600 sm:w-64 md:w-72 lg:w-80">{error ? error.message : null}</p>
    </div>
  );
};

export default DropDown;
