import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import DropDown from "@/components/form-fields/_utils/DropDown";
import { registerSchema } from "@/utils/validationSchema";
import { useRegisterUser } from "@/store/hooks/AuthHooks";
import { toast } from "react-hot-toast";

const RegisterForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  
  const registerMutation = useRegisterUser();
  
  const onSubmitForm = (data) => {
    registerMutation.mutate(data, {onSuccess: (response) => {
      const { role } = response.data.data;
      toast.success(`User created as role: ${role} successfully`);
      if (reset) {
        reset();
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "User registration failed. Please try again.";
      toast.error(errorMessage);
    },});
    console.log(data)
    reset()
  };

  const roleOptions = ["superadmin", "admin", "hr", "employee"];

  return (
    <form
      className="flex flex-col gap-3 sm:gap-2 md:gap-5"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <InputWithLabel
        label="Username"
        type="text"
        id="username"
        control={control}
        name="username"
        placeholder="username"
      />
      <InputWithLabel
        label="Email"
        type="text"
        id="email"
        control={control}
        name="email"
        placeholder="email"
      />
      <DropDown
        label="Role"
        control={control}
        name="role"
        options={roleOptions}
        placeholder="Select a role"
        dropDownClassName="h-8 p-2 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
      />
      <InputWithLabel
        label="Password"
        type="password"
        id="password"
        control={control}
        name="password"
        placeholder="password"
      />
      <div className="flex justify-center mt-2 mr-8">
        <UiButton variant="secondary" type="submit" buttonName="Save" className="w-24 h-8 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-36 lg:h-12"/>
      </div>
    </form>
  );
};

export default RegisterForm;