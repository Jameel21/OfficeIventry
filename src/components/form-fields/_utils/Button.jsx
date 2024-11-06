import { Button } from "@/components/ui/button";
const Button = ({label,type}) => {
  return (
    <div>
      <Button
        variant={variant}
        type={type}
        className={className}
      >
        {buttonName}
      </Button>
      </div>
  );
};

export default UiButton;
