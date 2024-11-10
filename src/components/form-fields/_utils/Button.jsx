import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
const UiButton = ({ buttonName, variant, className, type }) => {
  return (
    <div>
      <Button
        variant={variant}
        type={type}
        className={cn(
          "text-sm rounded-lg text-slate-300 md:text-base lg:text-lg bg-secondary sm:rounded-xl",
          className
        )}
      >
        {buttonName}
      </Button>
    </div>
  );
};

export default UiButton;
