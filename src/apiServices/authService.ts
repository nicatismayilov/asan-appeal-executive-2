import axios from "./index";

interface SignInPayload {
	username: string;
	password: string;
}

export const signIn = (payload: SignInPayload) => {
	const { username, password } = payload;

	return axios.post("/amurregistration/v1/auth/authenticate", { username, password });
};
