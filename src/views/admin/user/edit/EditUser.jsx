import { CircleArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import DropDown from "@/components/form-fields/_utils/DropDown";
import UiButton from "@/components/form-fields/_utils/Button";
import { useGetSingleUser, useUpdateUser } from "@/store/hooks/UserHooks";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useGetAllDepartment, useGetAllRole } from "@/store/hooks/MasterHooks";

const EditUser = () => {
  const { id } = useParams();
  const refetch = useQueryClient();
  const navigate = useNavigate();

  const page = 1;
  const limit = 50;

  const { data: userData } = useGetSingleUser(id);
  const { data: roleData } = useGetAllRole({ page, limit });
  const { data: departmentData } = useGetAllDepartment({ page, limit });

  const methods = useForm();
  const { handleSubmit, reset } = methods;
  const { mutateAsync } = useUpdateUser();

  useEffect(() => {
    if (userData) {
      const formattedData = {
        ...userData,
        roleId: userData?.roleId?._id,
        departmentId: userData?.departmentId?._id,
      };
      reset(formattedData);
    }
  }, [userData, reset]);

  const onSubmit = async (formData) => {
    const updatedData = {};

    if (formData.userName !== userData.userName) {
      updatedData.userName = formData.userName;
    }
    if (formData.email !== userData.email) {
      updatedData.email = formData.email;
    }
    if (formData.employeeId !== userData.employeeId) {
      updatedData.employeeId = formData.employeeId;
    }

    if (formData.roleId !== userData.roleId._id) {
      updatedData.roleId = formData.roleId;
    }
    if (formData.departmentId !== userData.departmentId._id) {
      updatedData.departmentId = formData.departmentId;
    }

    try {
      const response = await mutateAsync({ id, data: updatedData });
      toast.success(response?.data?.message || "User updated successfully");
      refetch.refetchQueries(["SingleUser", id]);
      navigate("/admin/viewAllUser");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Updating Role failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handlePreviousPage = () => {
    navigate("/admin/viewAllUser");
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
    <div className="flex flex-col w-full h-full lg:items-start lg:justify-start">
      <div>
        <CircleArrowLeft
          className="w-4 h-4 cursor-pointer md:w-5 md:h-5 hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div className="mt-5">
        <h1 className="text-lg font-medium text-center sm:text-start text-slate-700">
          Edit User
        </h1>
      </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid grid-cols-1 gap-4 mt-4 lg:gap-8 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
              <InputWithLabel
                type="text"
                label="Username"
                id="userName"
                name="userName"
                placeholder="Username"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                label="Email"
                id="email"
                name="email"
                placeholder="Email"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <InputWithLabel
                type="text"
                label="Employee ID"
                id="employeeId"
                name="employeeId"
                placeholder="Employee id"
                inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
              />
              <DropDown
                name="roleId"
                labelName="Role"
                options={roleOptions}
                placeholder={userData?.roleId.role}
                dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
                dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
              />
              <DropDown
                name="departmentId"
                labelName="Department"
                options={departmentOptions}
                placeholder={userData?.departmentId.department}
                dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
                dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
              />
                <UiButton
                  variant="secondary"
                  buttonName="save"
                   className="w-24 h-8 mt-3 lg:mt-9 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-80 lg:h-12"
                ></UiButton>
            </div>
          </form>
        </FormProvider>
    </div>
  );
};

export default EditUser;
