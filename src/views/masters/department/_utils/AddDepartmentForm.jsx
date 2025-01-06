import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { toast } from "react-hot-toast";
import { useAddDepartment } from "@/store/hooks/MasterHooks";

const AddDepartmentForm = () => {
  const refetch = useQueryClient();

  const methods = useForm();
  const { handleSubmit, reset } = methods;

  const { mutateAsync } = useAddDepartment();

  const onSubmitForm = async (data) => {
    try {
      const response = await mutateAsync(data);
      toast.success(
        response?.data?.message || "Department was created successfully"
      );
      reset();
      refetch.refetchQueries({ queryKey: ["AllDepartment"] });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Adding Department was failed. Please try again.";
      toast.error(errorMessage);
    }
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="flex flex-col gap-1 mt-4">
          <InputWithLabel
            label="Department"
            type="text"
            id="department"
            name="department"
            placeholder="enter a department"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <UiButton
            variant="secondary"
            type="submit"
            buttonName="Save"
            className="w-24 h-8 mt-3 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddDepartmentForm;
