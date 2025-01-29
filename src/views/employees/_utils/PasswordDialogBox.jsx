import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogBox from "@/components/form-fields/_utils/DialogBox";
import { updatePasswordSchema } from "@/utils/validationSchema";

const PasswordDialogBox = ({ onClick }) => {
  const methods = useForm({
    resolver: yupResolver(updatePasswordSchema),
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit((data) => {
    onClick(data);
    reset();
  });

  return (
    <FormProvider {...methods}>
      <DialogBox
        className="w-32 h-8 mt-3 text-white sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-52 lg:h-12"
        triggerName="Change password"
        dialogTitle="Change Password"
        firstName="currentPassword"
        secondName="newPassword"
        firstPlaceholder="Current password"
        secondPlaceholder="New password"
        firstButtonName="Save"
        type="password"
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default PasswordDialogBox;
