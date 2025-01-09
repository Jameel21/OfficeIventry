import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useController, useFormContext } from "react-hook-form";

const InputWithLabel = ({
  label,
  type,
  id,
  placeholder,
  className,
  labelClassName,
  inputClassName,
  name,
  readOnly,
  rules,
}) => {
  const {control} = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    rules,
    defaultValue: "",
  });

  return (
    <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
      <Label
        className={cn(
          "text-xs sm:text-sm md:text-base lg:text-lg text-slate-700",
          labelClassName
        )}
      >
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        {...field}
        readOnly={readOnly}
        placeholder={placeholder}
        className={cn(
          " p-2 rounded-md sm:rounded-lg lg:rounded-xl border border-gray-300 hover:bg-accent, hover:placeholder:text-accent-foreground",
          inputClassName
        )}
        onChange={(e) => {
          const value = e.target.value;
          if (type === "number" && value < 0) return; // Prevent negative values
          field.onChange(e);
        }}
      />
      <p className="h-1 text-xs text-left text-red-600 md:text-sm sm:w-64 md:w-72 lg:w-80">
        {error ? error.message : null}
      </p>
    </div>
  );
};

export default InputWithLabel;
