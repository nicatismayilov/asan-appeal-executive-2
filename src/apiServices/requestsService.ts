import axios from "./index";

export interface GetRequestsParams {
	menu: string;
	max?: number;
	offset: number;
	sort_by?: string;
	order?: "asc" | "desc";
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

// services

export const getRequests = (params: GetRequestsParams) => {
	return axios.get("/easyappeal/v1/requests", {
		params,
	});
};

export const getRequest = (params: GetRequestParams) => {
	const { key, id } = params;

	return axios.get(`/easyappeal/v1/requests/${id}`, {
		params: { key },
	});
};

export const getNearRequests = (params: GetNearRequestsParams) => {
	const { longitude, latitude, distance, sameStatus, key } = params;

	return axios.get("/easyappeal/v1/requests/nearRequests", {
		params: { longitude, latitude, distance, sameStatus, key },
	});
};

export const getJoinedRequests = (params: GetJoinedRequestsParams) => {
	const { limit, offset, key, id } = params;

	return axios.get(`/easyappeal/v1/requests/${id}/joinedRequets`, {
		params: { limit, offset, key },
	});
};

export const getActions = (params: GetActionsParams) => {
	const { id, menuUrl } = params;

	return axios.get(`/easyappeal/v1/requests/${id}/actions`, {
		params: { menuUrl },
	});
};
