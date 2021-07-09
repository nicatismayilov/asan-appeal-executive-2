import axios from "./index";

export const loadDetails = () => {
	return axios.post("/amurregistration/v1/users/me", null, {
		params: {
			detailed: true,
		},
	});
};
