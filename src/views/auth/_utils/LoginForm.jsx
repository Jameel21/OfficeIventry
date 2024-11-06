import { useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { loginSchema } from "@/utils/validationSchema";
import { useLoginMutation } from "./hooks/useLoginMutation";

const LoginForm = () => {
  const { control, handleSubmit, } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useLoginMutation();

  const onSubmitForm = (data) => {
    loginMutation.mutate(data);
    console.log(data);
  };

  return (
    <form
      className="flex flex-col gap-2 sm:gap-4 md:gap-6"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <InputWithLabel
        label="Username"
        type="text"
        id="username"
        control={control}
        name="username"
        placeholder="Enter your username"
      />
      <InputWithLabel
        label="Password"
        type="password"
        id="password"
        control={control}
        name="password"
        placeholder="Enter your password"
      />
      <span className="text-xs text-right cursor-pointer sm:text-sm md:text-base">
        Forgot Password?
      </span>
      <div className="flex justify-center mt-2">
        <UiButton variant="secondary" type="submit" buttonName="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
