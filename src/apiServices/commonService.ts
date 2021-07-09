import axios from "./index";

export const getMenus = () => {
	return axios.get("/easyappeal/v1/common/menus");
};

export const getMenuCounts = () => {
	return axios.get("/easyappeal/v1/problems/counts");
};

export const fetchRelatedRoles = (companyId: number) => {
	return axios.get(`/easyappeal/v1/common/roles`, {
		params: {
			companyId,
		},
	});
};
