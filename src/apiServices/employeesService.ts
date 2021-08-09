import axios, { API_URL } from ".";

class EmployeesService {
	private static instance: EmployeesService;

	private constructor() {}

	static getInstance() {
		if (!EmployeesService.instance) {
			EmployeesService.instance = new EmployeesService();
		}

		return EmployeesService.instance;
	}

	public getExecutors() {
		return axios.get(`/${API_URL.EASY_APPEAL}/v1/executors`);
	}
}

export default EmployeesService.getInstance();
