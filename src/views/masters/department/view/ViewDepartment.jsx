import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, } from "react";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useGetDepartment } from "@/store/hooks/MasterHooks";

const ViewDepartment = () => {
  const { id } = useParams(); 
  const { control, reset } = useForm({});
  const navigate = useNavigate();

  const {data: departmentData} = useGetDepartment(id)

  useEffect(() => {
    if (departmentData) {
      reset({
        department: departmentData?.department,
        createdAt: new Date(departmentData.createdAt).toLocaleDateString(
          "en-GB"
        ),
      });
    }
  }, [departmentData, reset]);

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
          View Department
        </h1>
      </div>
      <form className="mt-4">
        <InputWithLabel
          label="Department"
          type="text"
          id="department"
          control={control}
          name="department"
          placeholder="department"
          readOnly={true}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <InputWithLabel
          label="Created At"
          type="text"
          id="createdAt"
          control={control}
          name="createdAt"
          placeholder="created at"
          readOnly={true}
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
      </form>
    </div>
  );
};

export default ViewDepartment;
