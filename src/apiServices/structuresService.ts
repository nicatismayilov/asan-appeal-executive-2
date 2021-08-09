import axios, { API_URL } from ".";

class StructuresService {
	private static instance: StructuresService;

	private constructor() {}

	static getInstance() {
		if (!StructuresService.instance) {
			StructuresService.instance = new StructuresService();
		}

		return StructuresService.instance;
	}

	public getExecutives(isAdmin?: boolean) {
		return axios.get(`/${API_URL.AMUR_REGISTRATION}/v1/structures/executives`, {
			params: { isAdmin },
		});
	}

	public getExecStructures() {
		return axios.get(`/${API_URL.AMUR_REGISTRATION}/v1/structures/execStructures`);
	}

	public getRepresentations(parentId: number) {
		return axios.get(`/${API_URL.AMUR_REGISTRATION}/v1/structures/representations`, {
			params: { parentId },
		});
	}

	public getSubOffices() {
		return axios.get(`/${API_URL.AMUR_REGISTRATION}/v1/structures/suboffices`);
	}

	public getSteps(structureId?: number) {
		return axios.get(`/${API_URL.EASY_APPEAL}/v1/steps`, { params: { structureId } });
	}
}

export default StructuresService.getInstance();
