import { useMutation } from "@tanstack/react-query";
import authService from "../services/AuthService";


export const useLoginUser = () => {
  return useMutation({
    mutationFn: authService.userLogin,
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: authService.resetPassword
  })
}

export const useForgotPassword = () => {
  return useMutation({
    mutationFn:authService.forgotPassword
  })
}

