import { FormProvider, useForm } from "react-hook-form";
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
  const methods = useForm({
    resolver: yupResolver(loginSchema),
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { mutateAsync } = useLoginUser();

  const onSubmitForm = async (data) => {
    try {
      const response = await mutateAsync(data);
      const { userName, token, _id, expiresIn } = response.data.data;
      const { roleId } = response.data.data;
      const userRole = roleId?.role;
      const menuPermission = roleId?.permissions
      const loginTime = Date.now();
      const userData = {
        userName,
        userRole,
        authToken: token,
        userId: _id,
        menuPermission,
        expiresIn,
        loginTime
      };
      setEncodedData("userData", userData);
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
          navigate("/viewMyRequest");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || `Login failed. Please try again.`;
      toast.error(errorMessage);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-4 md:gap-6"
        onSubmit={handleSubmit(onSubmitForm)}
      >
        <InputWithLabel
          label="Username"
          type="text"
          id="userName"
          name="userName"
          placeholder="Enter your username"
          inputClassName="w-56 h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
        />
        <InputWithLabel
          label="Password"
          type="password"
          id="password"
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
    </FormProvider>
  );
};

export default LoginForm;
