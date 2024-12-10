import { useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useGetSingleUser } from "@/store/hooks/UserHooks";
import { useEffect } from "react";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetSingleUser(id);
  const { control, reset } = useForm({});

  useEffect(() => {
    if (userData) {
      reset({
        ...userData,
        departmentId: userData?.departmentId.department,
        roleId: userData?.roleId.role,
      });
    }
  }, [userData, reset]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handlePreviousPage = () => {
    navigate("/admin/viewAllUser");
  };
  return (
    <div className="w-full">
      <div>
        <div>
          <CircleArrowLeft
            className="fixed cursor-pointer hover:opacity-90"
            onClick={handlePreviousPage}
          />
        </div>
        <div className="ml-8 text-lg font-medium text-slate-700">
          User Details
        </div>
      </div>

      <div >
        <form >
          <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <InputWithLabel
            type="text"
            id="userName"
            label="Username"
            control={control}
            readOnly={true}
            name="userName"
            placeholder="username"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="email"
            label="Email"
            control={control}
            readOnly={true}
            name="email"
            placeholder="email"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="employee_id"
            label="Employee ID"
            control={control}
            readOnly={true}
            name="employeeId"
            placeholder="employee id"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="role"
            label="Role"
            control={control}
            name="roleId"
            readOnly={true}
            placeholder="role"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="department"
            label="Department"
            control={control}
            name="departmentId"
            readOnly={true}
            placeholder="department"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            id="status"
            label="Status"
            control={control}
            name="status"
            readOnly={true}
            placeholder="status"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          </div>
         
        </form>
      </div>
    </div>
  );
};

export default ViewUser;
