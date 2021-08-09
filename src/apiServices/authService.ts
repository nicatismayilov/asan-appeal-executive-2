import axios, { API_URL } from ".";

class AuthService {
	private static instance: AuthService;

	private constructor() {}

	static getInstance() {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService();
		}

		return AuthService.instance;
	}

	public signIn(params: SignInParams) {
		const { username, password } = params;

		return axios.post(`/${API_URL.AMUR_REGISTRATION}/v1/auth/authenticate`, { username, password });
	}
}

/* Parameter Interfaces */
interface SignInParams {
	username: string;
	password: string;
}

export default AuthService.getInstance();
