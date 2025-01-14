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
    <div className="w-full ">
      <div>
        <CircleArrowLeft
          className="fixed w-4 cursor-pointer sm:w-auto hover:opacity-90"
          onClick={handlePreviousPage}
        />
      </div>
      <div>
        <div className="flex flex-col">
          <div className="mt-24 ml-12 sm:mt-12 md:ml-16 lg:ml-18">
            <UiButton
              variant="secondary"
              buttonName="Edit Profile"
              className="h-8 cursor-default w-28 sm:w-28 sm:h-8 md:w-36 md:h-10 lg:w-52 lg:h-12"
            ></UiButton>
          </div>
        </div>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3 mt-8 sm:gap-2 md:gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputWithLabel
              type="text"
              id="userName"
              name="userName"
              placeholder="username"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
            />
            <InputWithLabel
              type="text"
              id="email"
              name="email"
              placeholder="email"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
            />
            <InputWithLabel
              type="text"
              id="employeeId"
              name="employeeId"
              placeholder="employee id"
              inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
            />
            <DropDown
              name="roleId"
              options={roleOptions}
              placeholder={userData?.roleId.role}
              dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
            />
            <DropDown
              name="departmentId"
              options={departmentOptions}
              placeholder={userData?.departmentId.department}
              dropDownMenuClassName={"sm:w-64 md:w-72 lg:w-80"}
              dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80 hover:bg-accent hover:text-accent-foreground"
            />
            <div className="ml-16 md:ml-16 lg:ml-24">
              <UiButton
                variant="secondary"
                buttonName="save"
                className="w-20 h-8 cursor-default sm:w-24 sm:h-7 md:w-28 md:h-8 lg:w-32 lg:h-10"
              ></UiButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default EditUser;
