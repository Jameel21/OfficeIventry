import { FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useGetSingleUser } from "@/store/hooks/UserHooks";
import { useEffect } from "react";

const ViewUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: userData, isLoading } = useGetSingleUser(id);

  const methods = useForm();
  const { reset } = methods;

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

      <div>
        <FormProvider {...methods}>
          <form>
            <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              <InputWithLabel
                type="text"
                id="userName"
                label="Username"
                readOnly={true}
                name="userName"
                placeholder="Username"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="email"
                label="Email"
                readOnly={true}
                name="email"
                placeholder="Email"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="employee_id"
                label="Employee ID"
                readOnly={true}
                name="employeeId"
                placeholder="Employee id"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="role"
                label="Role"
                name="roleId"
                readOnly={true}
                placeholder="Role"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="department"
                label="Department"
                name="departmentId"
                readOnly={true}
                placeholder="Department"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                id="status"
                label="Status"
                name="status"
                readOnly={true}
                placeholder="Status"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ViewUser;
