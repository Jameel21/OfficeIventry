import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { loginSchema } from "@/utils/validationSchema";
import { useLoginUser } from "@/store/hooks/AuthHooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useLoginUser();

  const onSubmitForm = (data) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        const { username, token, role, id } = response.data.data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("userName", username);
        localStorage.setItem("userRole", role);
        localStorage.setItem("userId", id);
        toast.success(`Login Successful, welcome ${role}`);

        switch (role) {
          case "superadmin":
            navigate("/admin");
            break;
          case "admin":
            navigate("/");
            break;
          case "hr":
            navigate("/");
            break;
          case "employee":
            navigate("/viewEmployee");
            break;
          default:
            navigate("/auth/login");
        }
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message || `Login failed. Please try again.`;
        toast.error(errorMessage);
      },
    });
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
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
      />
      <InputWithLabel
        label="Password"
        type="password"
        id="password"
        control={control}
        name="password"
        placeholder="Enter your password"
        inputClassName="h-8 sm:h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
      />
      <span className="text-xs text-right cursor-pointer sm:text-sm md:text-base">
        Forgot Password?
      </span>
      <div className="flex justify-center mt-2">
        <UiButton
          variant="secondary"
          type="submit"
          buttonName="Login"
          className="w-24 h-8 sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-36 lg:h-12"
        />
      </div>
    </form>
  );
};

export default LoginForm;
