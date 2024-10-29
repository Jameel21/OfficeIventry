import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import UiButton from "@/components/form-fields/_utils/Button";
import { registerSchema } from "@/utils/validationSchema";
import { useRegisterMutation } from "./hooks/useRegisterMutation";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerMutation = useRegisterMutation(reset);

  const onSubmitForm = (data) => {
    registerMutation.mutate(data);
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-3 sm:gap-6 md:gap-8"
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
      <InputWithLabel
        label="Role"
        type="text"
        id="role"
        control={control}
        name="role"
        placeholder="role"
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
