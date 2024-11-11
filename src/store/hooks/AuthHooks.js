import { useMutation } from "@tanstack/react-query";
import authService from "../services/AuthService";


export const useLoginUser = () => {
  return useMutation({
    mutationFn: authService.userLogin,
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: authService.userRegister  
  });
};
