import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogBox from "@/components/form-fields/_utils/DialogBox";
import { updatePasswordSchema } from "@/utils/validationSchema";

const PasswordDialogBox = ({onClick}) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = handleSubmit((data) => {
    onClick(data.password); 
    reset();
  });

  return (
    <DialogBox
      className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-52 lg:h-12"
      triggerName="Change password"
      dialogTitle="Enter new password"
      name="password"
      buttonName="Save"
      type="password"
      placeholder="new password"
      control={control}
      onSubmit={onSubmit}
    />
  );
};

export default PasswordDialogBox;
