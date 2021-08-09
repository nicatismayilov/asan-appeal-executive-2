import axios, { API_URL } from ".";

class CategoriesService {
	private static instance: CategoriesService;

	private constructor() {}

	static getInstance() {
		if (!CategoriesService.instance) {
			CategoriesService.instance = new CategoriesService();
		}

		return CategoriesService.instance;
	}

	public getCategories() {
		return axios.get(`/${API_URL.EASY_APPEAL}/v1/categories`);
	}
}

export default CategoriesService.getInstance();
