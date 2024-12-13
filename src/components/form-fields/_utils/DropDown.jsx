import { cn } from "@/lib/utils";
import { useController } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { ChevronUp } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuCheckboxItem
} from "@/components/ui/dropdown-menu";

const DropDown = ({
  labelName,
  control,
  name,
  options = [],
  placeholder,
  labelClassName,
  dropDownClassName,
  isReadOnly,
  isMultiSelect = false,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: isMultiSelect ? [] : "",
  });

  const isPlaceholder = isMultiSelect ? field.value.length === 0 : !field.value;
  const selectedLabel = isMultiSelect
    ? options
        .filter((option) => field.value.includes(option.value))
        .map((option) => option.label)
        .join(", ") || placeholder
    : options.find((option) => option.value === field.value)?.label ||
      placeholder;

  const handleSelect = (value) => {
    if (isReadOnly) return;

    if (isMultiSelect) {
      // Toggle multi-select value
      const newValue = field.value.includes(value)
        ? field.value.filter((item) => item !== value)
        : [...field.value, value];
      field.onChange(newValue);
    } else {
      // Single select
      field.onChange(value);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        className={cn(
          "text-xs sm:text-sm md:text-base lg:text-lg text-slate-700",
          labelClassName
        )}
      >
        {labelName}
      </Label>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "rounded-md sm:rounded-lg lg:rounded-xl text-left text-sm transition-all focus:ring-1 focus:ring-ring border border-gray-300 focus:outline-none flex items-center justify-between",
              isPlaceholder ? "text-muted-foreground" : "text-foreground",
              dropDownClassName
            )}
            disabled={isReadOnly}
          >
            <span>{selectedLabel || placeholder}</span>
            <ChevronUp className="w-4 h-4 mr-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="z-50 w-64 overflow-y-auto rounded-md shadow-lg bg-primary max-h-40">
          {isMultiSelect ? (
            options.map((option, index) => (
              <DropdownMenuCheckboxItem
                key={index}
                checked={field.value.includes(option.value)}
                onCheckedChange={() => handleSelect(option.value)}
              >
                {option.label}
              </DropdownMenuCheckboxItem>
            ))
          ) : (
            <DropdownMenuRadioGroup
              value={field.value}
              onValueChange={handleSelect}
            >
              {options.map((option, index) => (
                <DropdownMenuRadioItem key={index} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      <p className="h-1 text-sm text-red-600 sm:w-64 md:w-72 lg:w-80">
        {error ? error.message : null}
      </p>
    </div>
  );
};

export default DropDown;
