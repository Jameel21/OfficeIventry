import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import DialogBox from "@/components/form-fields/_utils/DialogBox";
// import { rejectedSchema } from "@/utils/validationSchema";

const RequestDialogBox = ({onReject}) => {
  const { control, handleSubmit, reset } = useForm({
    // resolver: yupResolver(rejectedSchema),
  });

  const onSubmit = handleSubmit((data) => {
    onReject(data.rejectedReason); 
    reset();
  });

  return (
    <DialogBox
      className="w-24 h-8 mt-9 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-52 lg:h-12"
      triggerName="Reject"
      dialogTitle="Reason for rejection"
      firstName="rejectedReason"
      buttonName="Save"
      type="text"
      firstPlaceholder="Rejected reason"
      control={control}
      onSubmit={onSubmit}
    />
  );
};

export default RequestDialogBox;
