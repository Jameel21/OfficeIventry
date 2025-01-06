import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";
import forgotPassword from "@assets/password.png";
import UiButton from "@/components/form-fields/_utils/Button";
import InputWithLabel from "@/components/form-fields/_utils/InputWithLabel";
import { useForgotPassword } from "@/store/hooks/AuthHooks";
import toast from "react-hot-toast";
import { forgotPasswordSchema } from "@/utils/validationSchema";

const ForgotPassword = () => {
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
  const { handleSubmit, reset } = methods;

  const { mutateAsync } = useForgotPassword();

  const onSubmitForm = async (data) => {
    try {
      const response = await mutateAsync(data);
      toast.success(response?.data?.message || "Email send sucessfully");
      reset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        `Failed to sent email. Please try again.`;
      toast.error(errorMessage);
    }
  };
  return (
    <div className="flex items-start w-full h-full">
      <div className="hidden h-screen sm:flex sm:justify-center sm:w-1/2 bg-secondary"></div>
      <div className="flex w-full h-screen sm:w-1/2">
        <div className="flex flex-col items-center justify-center w-full gap-4 space-y-4 sm:w-11/12 sm:gap-6 md:gap-8 sm:space-y-6">
          <div>
            <img
              src={forgotPassword}
              className="mb-4 w-14 h-14 sm:w-16 sm:h-16 sm:mb-0"
              alt="user-icon"
            />
          </div>
          <div>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-4 md:gap-6"
                onSubmit={handleSubmit(onSubmitForm)}
              >
                <InputWithLabel
                  label="Registered Username"
                  type="text"
                  id="userName"
                  name="userName"
                  placeholder="Enter your username"
                  inputClassName="w-56 h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
                />
                <InputWithLabel
                  label="Registered Email"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  inputClassName="w-56 h-10 md:h-12 lg:h-14 sm:w-64 md:w-72 lg:w-80"
                />
                <span className="text-xs text-right cursor-pointer sm:text-sm md:text-base">
                  <Link to={"/auth/login"}>Back to login?</Link>
                </span>
                <div className="flex justify-center mt-2">
                  <UiButton
                    variant="secondary"
                    type="submit"
                    buttonName="Save"
                    className="w-24 h-8 text-white sm:w-28 sm:h-8 md:w-32 md:h-10 lg:w-36 lg:h-12"
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className="hidden w-1/12 sm:block bg-secondary"></div>
      </div>
    </div>
  );
};

export default ForgotPassword;
