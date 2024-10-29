import { useMutation } from "@tanstack/react-query";
import authServices from "@/services/authService";
import toast from "react-hot-toast";

export const useRegisterMutation = (reset) => {
  return useMutation({
    mutationFn: async (data) => {
      const token = await localStorage.getItem("authToken");
      return authServices.userRegister(data, token);
    },
    onSuccess: (response) => {
      console.log(response);
      const {role} = response.data.data;
      toast.success( `User created as role: ${role} successfully`)
      if(reset){
        reset();
      }
    },
    onError:(error) => {
      const errorMessage = error.response?.data?.message || "User registeration failed. Please try again";
      toast.error(errorMessage);
    }
  });
};
