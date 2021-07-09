import * as Yup from "yup";

enum Errors {
	USERNAME_REQUIRED = "Zəhmət olmasa istifadəçi adı daxil edin",
	PASSWORD_REQUIRED = "Zəhmət olmasa parol daxil edin",
}

interface LoginFormValues {
	username: string;
	password: string;
}

export const initialValues: LoginFormValues = {
	username: "",
	password: "",
};

export const validationSchema = Yup.object({
	username: Yup.string().required(Errors.USERNAME_REQUIRED),
	password: Yup.string().required(Errors.PASSWORD_REQUIRED),
});

export const validationTiming = {
	validateOnChange: false,
	validateOnBlur: false,
};
