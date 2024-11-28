import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UiButton from "./Button";
import { cn } from "@/lib/utils";
import InputWithLabel from "./InputWithLabel";
import { rejectedSchema } from "@/utils/validationSchema";

const PoPover = ({className,onClick}) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(rejectedSchema),
  });
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" className={cn(
          "text-sm rounded-lg text-slate-300 md:text-base lg:text-lg bg-secondary sm:rounded-xl",
          className
        )}>
          Reject
        </Button>
      </PopoverTrigger>
      <PopoverContent className="h-56 w-80 bg-primary">
        <div className="grid gap-4">
          <div className="grid gap-2 w-">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="gap-4">
                <InputWithLabel
                  label="Reason for rejection"
                  type="text"
                  name="rejected_reason"
                  placeholder="Rejected Reason"
                  control={control}
                  inputClassName="h-7 sm:h-8 md:h-10 lg:h-12 w-52 sm:w-64  md:w-72 lg:w-72"
                />
              </div>
              <div className="flex justify-center mt-6">
                <UiButton
                  variant="secondary"
                  type="submit"
                  buttonName="Save"
                  className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-28 lg:h-12"
                  onClick={onClick}
                />
              </div>
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PoPover;
