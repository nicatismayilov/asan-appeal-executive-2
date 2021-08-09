import { Employee } from "types/employee";

/* Interface for Employees Reducer State */
export interface EmployeesReducerState {
	executors: Employee[];

	executorsLoading: boolean;

	executorsTotalCount: number;

	error: string;
}

/* Action type Enum */
export enum ActionTypes {
	GET_EXECUTORS = "GET_EXECUTORS",
	GET_EXECUTORS_SUCCESS = "GET_EXECUTORS_SUCCESS",
	GET_EXECUTORS_FAILURE = "GET_EXECUTORS_FAILURE",
}

/* Payload Interfaces */
export interface EmployeesPayload {
	entities: Employee[];
	totalCount: number;
}

/* Action Interfaces */
export interface GetExecutors {
	type: typeof ActionTypes.GET_EXECUTORS;
}

export interface GetExecutorsSuccess {
	type: typeof ActionTypes.GET_EXECUTORS_SUCCESS;
	payload: EmployeesPayload;
}

export interface GetExecutorsFailure {
	type: typeof ActionTypes.GET_EXECUTORS_FAILURE;
	payload: string;
}

/* Unified Action type for Employees Reducer */
export type Action = GetExecutors | GetExecutorsSuccess | GetExecutorsFailure;
