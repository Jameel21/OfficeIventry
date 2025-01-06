import { useForm, FormProvider } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import DialogBox from "@/components/form-fields/_utils/DialogBox";
// import { rejectedSchema } from "@/utils/validationSchema";

const RequestDialogBox = ({ onReject }) => {
  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit((data) => {
    onReject(data.rejectedReason);
    reset();
  });

  return (
    <FormProvider {...methods}>
      <DialogBox
        className="w-24 h-8 mt-10 text-white sm:w-28 sm:h-8 md:w-28 md:h-10 lg:w-32 xl:w-52 lg:h-12"
        triggerName="Reject"
        dialogTitle="Reason for rejection"
        firstName="rejectedReason"
        firstButtonName="Save"
        type="text"
        firstPlaceholder="Rejected reason"
        onSubmit={onSubmit}
      />
    </FormProvider>
  );
};

export default RequestDialogBox;
