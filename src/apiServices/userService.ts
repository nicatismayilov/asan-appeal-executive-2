import axios, { API_URL } from ".";

class UserService {
	private static instance: UserService;

	private constructor() {}

	static getInstance() {
		if (!UserService.instance) {
			UserService.instance = new UserService();
		}

		return UserService.instance;
	}

	public getUserData() {
		return axios.post(`/${API_URL.AMUR_REGISTRATION}/v1/users/me`, null, {
			params: {
				detailed: true,
			},
		});
	}
}

export default UserService.getInstance();
