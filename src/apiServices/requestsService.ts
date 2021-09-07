import { PriorityName } from "types/requests";
import axios, { API_URL } from ".";

class RequestsService {
	private static instance: RequestsService;

	private constructor() {}

	static getInstance() {
		if (!RequestsService.instance) {
			RequestsService.instance = new RequestsService();
		}

		return RequestsService.instance;
	}

	public getRequests(params: GetRequestsParams, menuType: string) {
		return axios.get(`/${API_URL.EASY_APPEAL}/v1/${menuType}s`, { params });
	}

	public getRequest(params: GetRequestParams) {
		const { key, id } = params;

		return axios.get(`/${API_URL.EASY_APPEAL}/v1/requests/${id}`, {
			params: { key },
		});
	}

	public getNearRequests(params: GetNearRequestsParams) {
		const { longitude, latitude, distance, sameStatus, key, completed = false } = params;

		return axios.get(`/${API_URL.EASY_APPEAL}/v1/requests/nearRequests`, {
			params: { longitude, latitude, distance, sameStatus, key, completed },
		});
	}

	public getJoinedRequests(params: GetJoinedRequestsParams) {
		const { limit, offset, key, id } = params;

		return axios.get(`/${API_URL.EASY_APPEAL}/v1/requests/${id}/joinedRequests`, {
			params: { limit, offset, key },
		});
	}

	public getActions(params: GetActionsParams) {
		const { id, menuUrl } = params;

		return axios.get(`/${API_URL.EASY_APPEAL}/v1/requests/${id}/actions`, {
			params: { menuUrl },
		});
	}
}

/* Parameter Interfaces */
export interface GetRequestsParams {
	menu: string;
	max?: number;
	offset: number;
	sort_by?: string;
	order?: "asc" | "desc";
	startDateStr?: string;
	endDateStr?: string;
	problemNum?: number;
	completed?: boolean;
	priority?: PriorityName;
	parentOfficeId?: number;
	officeId?: number;
	regionId?: number;
	requestNum?: number;
	executorUUID?: string;
	executiveId?: number;
	representationId?: number;
	stepId?: number;
}

export interface GetRequestParams {
	key: string;
	id: string;
}

export interface GetNearRequestsParams {
	longitude: number;
	latitude: number;
	distance: number;
	sameStatus: boolean;
	key: string;
	completed?: boolean;
}

export interface GetJoinedRequestsParams {
	limit: number;
	offset: number;
	key: string;
	id: string;
}

export interface GetActionsParams {
	id: string;
	menuUrl: string;
}

export default RequestsService.getInstance();
