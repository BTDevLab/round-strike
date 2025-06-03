package utils

import "github.com/go-playground/validator/v10"

func FormatLoginValidationErrors(ve validator.ValidationErrors) map[string]string {
	errs := make(map[string]string)
	for _, fe := range ve {
		field := fe.Field()
		switch field {
		case "Username":
			switch fe.Tag() {
			case "required":
				errs["username"] = "Username is required."
			case "min":
				errs["username"] = "Username must be at least 3 characters."
			case "max":
				errs["username"] = "Username must be at most 16 characters."
			default:
				errs["username"] = "Invalid username."
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
