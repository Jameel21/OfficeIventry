import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import DropDown from "@/components/form-fields/_utils/DropDown";
import { registerSchema } from "@/utils/validationSchema";
import { useRegisterMutation } from "./hooks/useRegisterMutation";

const RegisterForm = () => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(registerSchema),
  });
  
  const registerMutation = useRegisterMutation(reset);
  
  const onSubmitForm = (data) => {
    registerMutation.mutate(data);
    console.log(data)
    reset({role : ''})
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
      />
      <InputWithLabel
        label="Password"
        type="password"
        id="password"
        control={control}
        name="password"
        placeholder="password"
      />
      <div className="flex justify-center mt-2">
        <UiButton variant="secondary" type="submit" buttonName="Save" />
      </div>
    </form>
  );
};

export default RegisterForm;