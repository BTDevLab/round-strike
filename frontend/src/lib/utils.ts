import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validateRegisterAccountFields(formData: {
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms?: boolean;
}) {
  return {
    email:
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ? "Email not valid."
        : "",
    password:
      formData.password.length < 8
        ? "Password must be at least 8 characters."
        : formData.password.length > 16
        ? "Password must be at most 16 characters."
        : "",
    confirmPassword:
      formData.password.length >= 8 &&
      formData.password !== formData.confirmPassword
        ? "Passwords do not match."
        : "",
  };
}
