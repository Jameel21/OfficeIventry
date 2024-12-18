import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogBox from "@/components/form-fields/_utils/DialogBox";
import { updatePasswordSchema } from "@/utils/validationSchema";

const PasswordDialogBox = ({onClick}) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });

  const onSubmit = handleSubmit((data) => {
    onClick(data); 
    reset();
  });

  return (
    <DialogBox
      className="w-32 h-8 mt-3 text-white sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-52 lg:h-12"
      triggerName="Change password"
      dialogTitle="Change Password"
      firstName="currentPassword"
      secondName="newPassword"
      firstPlaceholder="current password"
      secondPlaceholder="new password"
      firstButtonName="Save"
      type="password"
      control={control}
      onSubmit={onSubmit}
    />
  );
};

export default PasswordDialogBox;
