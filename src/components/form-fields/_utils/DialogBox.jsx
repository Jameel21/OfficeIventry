import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import UiButton from "./Button";
import InputWithLabel from "./InputWithLabel";

const DialogBox = ({
  className,
  triggerName,
  dialogTitle = "Title",
  onSubmit,
  firstName,
  firstPlaceholder,
  secondName,
  isSubmitting,
  secondPlaceholder,
  firstButtonName,
  secondButtonName,
  type,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={cn(
            "text-sm rounded-lg text-slate-300 md:text-sm lg:text-lg bg-secondary sm:rounded-xl",
            className
          )}
        >
          {triggerName}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          <div className="gap-4">
            {firstName && firstPlaceholder && (
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <InputWithLabel
                    type={type}
                    name={firstName}
                    placeholder={firstPlaceholder}
                    inputClassName=" h-8 md:h-10 lg:h-12 w-72 md:w-96"
                  />
                </div>
              </div>
            )}

            {secondName && secondPlaceholder && (
              <div className="flex items-center mt-4 space-x-2">
                <div className="grid flex-1 gap-2">
                  <InputWithLabel
                    type={type}
                    name={secondName}
                    placeholder={secondPlaceholder}
                    inputClassName="h-8 md:h-10 lg:h-12 w-72 md:w-96"
                  />
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="mt-2 md:mt-4 sm:justify-center">
            {firstButtonName && (
              <UiButton
                variant="secondary"
                type="submit"
                buttonName={firstButtonName}
                isSubmitting={isSubmitting}
                className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-28 lg:h-12"
              />
            )}

            {secondButtonName && (
              <UiButton
                variant="secondary"
                type="submit"
                buttonName={secondButtonName}
                className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-28 lg:h-12"
              />
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
