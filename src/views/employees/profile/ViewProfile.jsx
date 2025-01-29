import { FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useNavigate, useParams } from "react-router-dom";
import { CircleArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useGetSingleUser, useUpdateUser } from "@/store/hooks/UserHooks";
import toast from "react-hot-toast";
import PasswordDialogBox from "../_utils/PasswordDialogBox";

const ViewProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const refetch = useQueryClient();

  const methods = useForm();
  const { reset } = methods;

  const { data, isLoading } = useGetSingleUser(id);
  const { mutateAsync } = useUpdateUser();

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        roleId: data?.roleId?.role,
        departmentId: data?.departmentId?.department,
      });
    }
  }, [data, reset]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = async ({ currentPassword, newPassword }) => {
    const payload = {
      currentPassword,
      newPassword,
    };
    try {
      await mutateAsync({ id, data: payload });
      toast.success("Password updated successfully");
      refetch.refetchQueries(["SingleUser", id]);
      navigate("/viewMyRequest");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update the user";
      toast.error(errorMessage);
    }
  };

  const handlePreviousPage = () => {
    navigate("/viewMyRequest");
  };

  return (
    <div className="w-full">
      <div className="flex gap-14 md:gap-16 lg:gap-32">
        <div>
          <CircleArrowLeft
            className="w-4 h-4 mt-1 cursor-pointer lg:mt-0 md:w-5 md:h-5 lg:w-6 lg:h-6 hover:opacity-90"
            onClick={handlePreviousPage}
          />
        </div>
        <div className="text-lg font-medium lg:text-xl text-slate-700">
          User Details
        </div>
      </div>

      <FormProvider {...methods}>
        <form className="flex flex-col gap-1 mt-4 lg:gap-2">
          <InputWithLabel
            type="text"
            label="Username"
            id="userName"
            readOnly={true}
            name="userName"
            placeholder="Username"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            label="Email"
            id="email"
            readOnly={true}
            name="email"
            placeholder="Email"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            label="Employee Id"
            id="employeeId"
            readOnly={true}
            name="employeeId"
            placeholder="Employee id"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            label="Role"
            id="roleId"
            name="roleId"
            readOnly={true}
            placeholder="Role"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <InputWithLabel
            type="text"
            label="Department"
            id="departmentId"
            name="departmentId"
            readOnly={true}
            placeholder="Department"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
          />
          <div className="flex items-center gap-4 text-white">
            <PasswordDialogBox onClick={handleChangePassword} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default ViewProfile;
