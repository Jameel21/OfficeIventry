import { Label } from "@/components/ui/label";
import { useController, useFormContext } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isBefore, startOfDay, isSameDay, isAfter } from "date-fns";

const DatePickerDemo = ({
  name,
  placeholder,
  className,
  label,
  labelClassName,
  disableBeforeDate,
  disableAfterToday,
}) => {
  const { control } = useFormContext();
  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: "",
  });

  const disableDates = (date) => {
    const today = startOfDay(new Date());
    if (disableAfterToday) {
      return isAfter(date, today); // Disable dates after today (tomorrow onwards).
    }
    if (disableBeforeDate) {
      return isBefore(date, today) || // Disable dates before today.
             isSameDay(date, disableBeforeDate) ||   // Disable the exact disableBeforeDate (today).
             isBefore(date, disableBeforeDate); //Disable dates before disableBeforeDate
    }
    return isBefore(date, today);
  };

  return (
    <div className="flex flex-col">
      <Label
        className={cn(
          "text-xs sm:text-sm md:text-base lg:text-lg text-slate-700",
          labelClassName
        )}
      >
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal rounded-md sm:rounded-lg lg:rounded-xl text-sm transition-all focus:ring-1 focus:ring-ring border border-gray-300 focus:outline-none",
              !field.value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon />
            {field.value ? (
              format(field.value, "PPP")
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            {...field}
            selected={field.value}
            onSelect={field.onChange}
            initialFocus
            disabled={(date) => disableDates(date)}
          />
        </PopoverContent>
      </Popover>
      <p className="h-1 text-xs text-red-600 md:text-sm sm:w-64 md:w-72 lg:w-80">
        {error ? error.message : null}
      </p>
    </div>
  );
};

export default DatePickerDemo;
