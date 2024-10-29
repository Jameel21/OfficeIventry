import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const UiButton = ({ buttonName, variant, className, type }) => {
  return (
    <div>
      <Button
        variant={variant}
        type={type}
        className={cn(
          "w-24 h-8 text-sm rounded-lg text-slate-300 md:text-base lg:text-lg sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-36 lg:h-12 bg-secondary sm:rounded-xl",
          className
        )}
      >
        {buttonName}
      </Button>
    </div>
  );
};

export default UiButton;
