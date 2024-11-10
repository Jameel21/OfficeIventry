import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useController } from 'react-hook-form';

const InputWithLabel = ({ label, type, id, placeholder, className, labelClassName, inputClassName, control, name }) => {
  const { field, fieldState: { error } } = useController({
    control,
    name,
    defaultValue: '',
  });

  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      <Label className={cn("text-xs sm:text-sm md:text-base lg:text-lg text-slate-700", labelClassName)}>
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        {...field}
        placeholder={placeholder}
        className={cn("h-8 p-2 rounded-md sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 sm:rounded-lg lg:rounded-xl border border-gray-300 bg-ternary", inputClassName)}
      />
      <p className="h-1 text-sm text-left text-red-600 sm:w-64 md:w-72 lg:w-80">{error ? error.message : null}</p>
    </div>
  );
};

export default InputWithLabel;
