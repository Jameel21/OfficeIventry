import { useForm } from "react-hook-form";
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

  const { control, reset } = useForm({});

  const { data, isLoading } = useGetSingleUser(id);
  const { mutate: updateUser } = useUpdateUser();

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

  const handleChangePassword = ({ currentPassword, newPassword }) => {
    const payload = {
      currentPassword,
      newPassword,
    };
    updateUser(
      { id, data: payload },
      {
        onSuccess: () => {
          toast.success("Password updated successfully");
          refetch.refetchQueries(["SingleUser", id]);
          navigate("/viewRequest");
        },
        onError: (error) => {
          const errorMessage =
            error.response?.data?.message || "Failed to update the user";
          toast.error(errorMessage);
        },
      }
    );
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
        <div className="text-lg font-medium lg:text-xl text-slate-700">User Details</div>
      </div>

      <form className="flex flex-col gap-1 mt-4 lg:gap-2">
        <InputWithLabel
          type="text"
          label="Username"
          id="userName"
          control={control}
          readOnly={true}
          name="userName"
          placeholder="username"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
        />
        <InputWithLabel
          type="text"
          label="Email"
          id="email"
          control={control}
          readOnly={true}
          name="email"
          placeholder="email"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
        />
        <InputWithLabel
          type="text"
          label="Employee Id"
          id="employeeId"
          control={control}
          readOnly={true}
          name="employeeId"
          placeholder="employee id"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
        />
        <InputWithLabel
          type="text"
          label="Role"
          id="roleId"
          control={control}
          name="roleId"
          readOnly={true}
          placeholder="role"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
        />
        <InputWithLabel
          type="text"
          label="Department"
          id="departmentId"
          control={control}
          name="departmentId"
          readOnly={true}
          placeholder="department"
          inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-60 lg:w-96"
        />
        <div className="flex items-center gap-4 text-white">
          <PasswordDialogBox onClick={handleChangePassword} />
        </div>
      </form>
    </div>
  );
};

export default ViewProfile;
