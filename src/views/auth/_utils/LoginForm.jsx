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
      

      //new one
      const dashboardPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Dashboard" && perm.view
      );
      const reuestPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "My Request" && perm.view
      );
      const departmentPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Department" && perm.view
      );
      const rolePage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Role" && perm.view
      );
      const brandPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Brand" && perm.view
      );
      const categoryPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Category" && perm.view
      );
      const equipmentPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Equipment" && perm.view
      );
      const userPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "User" && perm.view
      );
      const allRequestPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "All Request" && perm.view
      );
      const allocationLogPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Logs" && perm.view
      );
      const reuestLogPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Request Log" && perm.view
      );
      const notificationPage = menuPermission?.find(
        (perm) => perm.menu?.pageName === "Notification" && perm.view
      );

      let redirectPath = ""; 

      if (dashboardPage) {
        redirectPath = "/admin";
      } else if(reuestPage){
        redirectPath = "/viewMyRequest";
      }else if(departmentPage){
        redirectPath = "/admin/department";
      }else if(rolePage){
        redirectPath = "/admin/role";
      }else if(brandPage){
        redirectPath = "/admin/brand";
      }else if(categoryPage){
        redirectPath = "/admin/category";
      }else if(equipmentPage){
        redirectPath = "/admin/employeeequipment";
      }else if(userPage){
        redirectPath = "/admin/viewAllUser";
      }else if(allRequestPage){
        redirectPath = "/admin/requests";
      }else if(allocationLogPage){
        redirectPath = "/admin/allocationLog";
      }
      else if(reuestLogPage){
        redirectPath = "/admin/requestLog";
      }else if(notificationPage){
        redirectPath = "/notification";
      }
      navigate(redirectPath);
      toast.success(response?.data?.message || "Login Success");
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
          label="Username or Email"
          type="text"
          id="userName"
          name="usernameOrEmail"
          placeholder="Enter your username or email"
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
