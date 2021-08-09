import axios, { API_URL } from ".";

class CommonService {
	private static instance: CommonService;

	private constructor() {}

	static getInstance() {
		if (!CommonService.instance) {
			CommonService.instance = new CommonService();
		}

		return CommonService.instance;
	}

	public getMenus() {
		return axios.get(`/${API_URL.EASY_APPEAL}/v1/common/menus`);
	}

	public getMenuCount() {
		return axios.get(`/${API_URL.EASY_APPEAL}/v1/problems/counts`);
	}

	public getRelatedRoles(structureId: number) {
		return axios.get(`/${API_URL.EASY_APPEAL}/v1/common/roles`, { params: { structureId } });
	}
}

export default CommonService.getInstance();
