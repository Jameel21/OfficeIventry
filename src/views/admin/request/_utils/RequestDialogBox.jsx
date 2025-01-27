import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DialogBox from "@/components/form-fields/_utils/DialogBox";
import { rejectedSchema } from "@/utils/validationSchema";

const RequestDialogBox = ({ handleReject}) => {
  const methods = useForm({
    resolver: yupResolver(rejectedSchema),
  });
  const {
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    try {
      await handleReject(data.rejectedReason);
    } finally {
      reset();
    }
  };

  return (
    <FormProvider {...methods}>
      <DialogBox
        className="w-24 h-8 mt-10 text-white sm:w-28 sm:h-8 md:w-28 md:h-10 lg:w-32 xl:w-52 lg:h-12"
        triggerName="Reject"
        dialogTitle="Reason for rejection"
        firstName="rejectedReason"
        firstButtonName="Save"
        type="text"
        isSubmitting={isSubmitting}
        firstPlaceholder="Rejected reason"
        onSubmit={methods.handleSubmit(onSubmit)}
      />
    </FormProvider>
  );
};

export default RequestDialogBox;
