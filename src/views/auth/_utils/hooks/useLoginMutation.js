import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authServices.userLogin,
    onSuccess: (response) => {
      console.log(response);
      const { username, token, role } = response.data.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userName", username);
      localStorage.setItem("userRole", role);
      toast.success(`Login Successful, welcome ${role} `);
      switch (role) {
        case "superadmin":
          navigate("/admin/register");
          break;
        case "admin":
          navigate("/");
          break;
        case "hr":
          navigate("/");
          break;
        case "employee":
          navigate("/");
          break;
        default:
          navigate("/auth/login");
      }
    },
    onError: (error) => {
      console.log(error);
      const errorMessage = error.response?.data?.message || `Login failed. Please try again.`
      toast.error(errorMessage)
    }
  });
};
