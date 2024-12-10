import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { useGetDepartment, useUpdateDepartment } from "@/store/hooks/MasterHooks";
import toast from "react-hot-toast";


const EditDepartment = () => {
  const { id } = useParams();
  const { control, handleSubmit, reset } = useForm({});
  const navigate = useNavigate();

  const { data: departmentData } = useGetDepartment(id);
  const {mutate: updateDepartment} = useUpdateDepartment()

  useEffect(() => {
    if (departmentData) {
      reset({
        department: departmentData?.department,
      });
    }
  }, [departmentData, reset]);

  const onSubmit = (formData) => {
  const payload = {
    department: formData.department,
  };

  updateDepartment(
    { id, data: payload },
    {
      onSuccess: () => {
        toast.success("Department updated successfully");
        navigate("/admin/department"); 
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "Failed to update the department. Please try again.";
        toast.error(errorMessage); 
      },
    }
  );
  };
  const handlePreviousPage = () => {
    navigate("/admin/department");
  };
  return (
    <div>
      <div className="flex gap-4">
        <CircleArrowLeft
          className="w-4 h-4 mt-1 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          Edit Department
        </h1>
      </div>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <InputWithLabel
          label="Department"
          type="text"
          id="department"
          control={control}
          name="department"
          placeholder="department"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <UiButton
          variant="secondary"
          buttonName="save"
          className="w-20 h-8 mt-4 cursor-default sm:w-24 sm:h-7 md:w-28 md:h-8 lg:w-32 lg:h-10"
        ></UiButton>
      </form>
    </div>
  );
};

export default EditDepartment;
