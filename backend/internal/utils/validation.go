package utils

import "github.com/go-playground/validator/v10"

func FormatCreateUserValidationErrors(ve validator.ValidationErrors) map[string]string {
	errs := make(map[string]string)
	for _, fe := range ve {
		field := fe.Field()
		switch field {
		case "Email":
			switch fe.Tag() {
			case "required":
				errs["email"] = "Email is required."
			case "email":
				errs["email"] = "Email must be a valid email address."
			default:
				errs["email"] = "Invalid email."
			}
		case "Password":
			switch fe.Tag() {
			case "required":
				errs["password"] = "Password is required."
			case "min":
				errs["password"] = "Password must be at least 8 characters."
			case "max":
				errs["password"] = "Password must be at most 16 characters."
			default:
				errs["password"] = "Invalid password."
			}
		}
	}
	return errs
}
