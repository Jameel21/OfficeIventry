import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { toast } from "react-hot-toast";
import { useAddDepartment } from "@/store/hooks/MasterHooks";
import { departmentSchema } from "@/utils/validationSchema";
import { useNavigate } from "react-router-dom";

const AddDepartmentForm = () => {
  const refetch = useQueryClient();
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      department: "",
    },
  });
  const { handleSubmit, reset, formState: { isSubmitting }, } = methods;

  const { mutateAsync } = useAddDepartment();

  const onSubmitForm = async (data) => {
    try {
      const response = await mutateAsync(data);
      toast.success(
        response?.data?.message || "Department was created successfully"
      );
      refetch.refetchQueries({ queryKey: ["AllDepartment"] });
      navigate("/admin/department");
      reset();
    
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
            isSubmitting={isSubmitting}
            className="w-24 h-8 mt-4 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default AddDepartmentForm;
