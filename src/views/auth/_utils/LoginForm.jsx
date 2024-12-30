import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { loginSchema } from "@/utils/validationSchema";
import { useLoginUser } from "@/store/hooks/AuthHooks";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { setEncodedData } from "@/utils/encryptDecrypt";

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useLoginUser();

  const onSubmitForm = async (data) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      const { userName, token, _id } = response.data.data;
      const { roleId } = response.data.data;
      const userRole = roleId?.role;

      setEncodedData("authToken", token);
      setEncodedData("userName", userName);
      setEncodedData("userRole", userRole);
      setEncodedData("userId", _id);
      toast.success(response?.data?.message || "Login Success");

      switch (userRole) {
        case "SuperAdmin":
          navigate("/admin");
          break;
        case "Admin":
          navigate("/admin");
          break;
        case "HR":
          navigate("/admin");
          break;
        case "Employee":
          navigate("/viewMyRequest");
          break;
        default:
          navigate("/auth/login");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || `Login failed. Please try again.`;
      toast.error(errorMessage);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 md:gap-6"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <InputWithLabel
        label="Username"
        type="text"
        id="userName"
        control={control}
        name="userName"
        placeholder="Enter your username"
        inputClassName="w-56 h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
      />
      <InputWithLabel
        label="Password"
        type="password"
        id="password"
        control={control}
        name="password"
        placeholder="Enter your password"
        inputClassName="w-56 h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
      />
      <span className="text-xs text-right cursor-pointer sm:text-sm md:text-base">
        <Link to={"/auth/forgotPassword"}>Forgot Password?</Link>
      </span>
      <div className="flex justify-center mt-2">
        <UiButton
          variant="secondary"
          type="submit"
          buttonName="Login"
          isSubmitting={isSubmitting}
          className="w-24 h-8 text-white sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-36 lg:h-12"
        />
      </div>
    </form>
  );
};

export default LoginForm;
