import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import DropDown from "@/components/form-fields/_utils/DropDown";
import { registerSchema } from "@/utils/validationSchema";
import { toast } from "react-hot-toast";
import { useAddUser } from "@/store/hooks/UserHooks";
import { useGetRoles } from "@/store/hooks/NameHooks";

const AddUserForm = () => {
  const refetch = useQueryClient();
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { data: roles } = useGetRoles();

  const registerMutation = useAddUser();

  const onSubmitForm = (data) => {
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        const { role } = response.data.data;
        toast.success(`User created as role: ${role} successfully`);
        if (reset) {
          reset();
        }
        refetch.refetchQueries({ queryKey: ["AllUsers"] });
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          "User registration failed. Please try again.";
        toast.error(errorMessage);
      },
    });
    reset();
  };

  const roleOptions =
    roles?.map((role) => ({
      label: role.role,
      value: role._id,
    })) || [];

  return (
    <form
      className="flex flex-col gap-2 sm:gap-2 md:gap-3"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <InputWithLabel
        label="Username"
        type="text"
        id="username"
        control={control}
        name="username"
        placeholder="username"
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-96"
      />
      <InputWithLabel
        label="Email"
        type="text"
        id="email"
        control={control}
        name="email"
        placeholder="email"
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-96"
      />
      <InputWithLabel
        label="Employee ID"
        type="text"
        id="employee_id"
        control={control}
        name="employee_id"
        placeholder="employee id"
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-96"
      />
      <DropDown
        labelName="Role"
        control={control}
        name="role"
        options={roleOptions}
        placeholder="Select a role"
        dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-96 hover:bg-accent hover:text-accent-foreground"
      />
      <InputWithLabel
        label="Password"
        type="password"
        id="password"
        control={control}
        name="password"
        placeholder="password"
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-96"
      />
      <div className="flex gap-6 mt-2 md:gap-10 lg:gap-24">
        <UiButton
          variant="secondary"
          type="submit"
          buttonName="Save"
          className="w-20 h-8 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-44 lg:h-12"
        />
      </div>
    </form>
  );
};

export default AddUserForm;
