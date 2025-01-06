import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import DropDown from "@/components/form-fields/_utils/DropDown";
import { registerSchema } from "@/utils/validationSchema";
import { toast } from "react-hot-toast";
import { useAddUser } from "@/store/hooks/UserHooks";
import { useGetAllDepartment, useGetAllRole } from "@/store/hooks/MasterHooks";
import { useNavigate } from "react-router-dom";

const AddUserForm = () => {
  const refetch = useQueryClient();
  const navigate = useNavigate();

  const methods = useForm({
    resolver: yupResolver(registerSchema),
  });
  const { handleSubmit, reset, setFocus } = methods;

  const page = 1;
  const limit = 50;

  const { data: roleData } = useGetAllRole({ page, limit });
  const { data: departmentData } = useGetAllDepartment({ page, limit });

  const { mutateAsync } = useAddUser();

  const onSubmitForm = async (data) => {
    try {
      const response = await mutateAsync(data);
      const { roleId } = response.data.data;
      const userRole = roleId?.role;
      toast.success(
        response?.data?.message ||
          `User created as role: ${userRole} successfully`
      );
      reset();
      navigate("/admin/viewAllUser");
      refetch.refetchQueries({ queryKey: ["AllUsers"] });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "User registration failed. Please try again.";
      toast.error(errorMessage);
      if (errorMessage.toLowerCase().includes("user")) {
        setFocus("userName");
      } else if (errorMessage.toLowerCase().includes("email")) {
        setFocus("email");
      } else if (errorMessage.toLowerCase().includes("employeeid")) {
        setFocus("employeeId");
      }
    }
  };

  const roleOptions =
    roleData?.roles?.map((item) => ({
      label: item.role,
      value: item._id,
    })) || [];

  const departmentOptions =
    departmentData?.departments?.map((item) => ({
      label: item.department,
      value: item._id,
    })) || [];

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid grid-cols-1 gap-1 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <InputWithLabel
            label="Username"
            type="text"
            id="userName"
            name="userName"
            placeholder="username"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <InputWithLabel
            label="Email"
            type="text"
            id="email"
            name="email"
            placeholder="email"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <InputWithLabel
            label="Employee ID"
            type="text"
            id="employeeId"
            name="employeeId"
            placeholder="employee id"
            inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
          />
          <DropDown
            labelName="Role"
            name="roleId"
            options={roleOptions}
            placeholder="Select a role"
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <DropDown
            labelName="Department"
            name="departmentId"
            options={departmentOptions}
            placeholder="Select a department"
            dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
          />
          <InputWithLabel
            label="Password"
            type="password"
            id="password"
            name="password"
            placeholder="password"
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

export default AddUserForm;
