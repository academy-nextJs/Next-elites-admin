import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import http from "../interceptor";
import { setItem } from "../services/local storage/storage.services";

/**
 * Login email by posting email and password to server.
 * @param params - The email and password
 * @returns Login user response
 */
export const LoginUser = async (params) => {
  return http.post("/auth/login", params);
};

/**
 * React Query hook for user login process.
 * Shows toast notifications and redirects on success.
 * @returns Mutation hook for checking email and password.
 */
export const useLoginUser = () => {
  // Hooks
  const navigate = useNavigate();
  return useMutation({
    mutationKey: ["LOGIN_USER"],
    mutationFn: (params) =>
      toast.promise(LoginUser(params), {
        pending: "درحال پردازش",
      }),
    onSuccess: async (response) => {
      toast.success("ورود با موفقیت انجام شد");
      setItem("accessToken", response.accessToken);
      setItem("refreshToken", response.refreshToken);
      navigate("/home");
    },
    onError: (error) => {
      if (error.response?.status === 400) {
        toast.error("ایمیل یا پسوورد اشتباه میباشد");
      } else if (error.response?.status && error.response.status >= 500) {
        console.log("server error");
      } else {
        console.log("generic error");
      }
    },
  });
};
