import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
const UiButton = ({
  buttonName,
  variant,
  className,
  type,
  onClick,
  isSubmitting,
}) => {
  return (
    <div>
      <Button
        onClick={onClick}
        variant={variant}
        type={type}
        className={cn(
          "text-sm rounded-lg text-slate-300 md:text-base lg:text-lg bg-secondary sm:rounded-xl",
          className
        )}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
          </span>
        ) : (
          buttonName
        )}
      </Button>
    </div>
  );
};

export default UiButton;
