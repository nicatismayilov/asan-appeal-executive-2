import { Structure } from "types/structures";
import { Step } from "types/user";

/* Interface for Structures Reducer */
export interface StructuresReducerState {
	executives: Structure[];
	execStructures: Structure[];
	representations: Structure[];
	subOffices: Structure[];
	steps: Step[];

	executivesLoading: boolean;
	execStructuresLoading: boolean;
	representationsLoading: boolean;
	subOfficesLoading: boolean;
	stepsLoading: boolean;

	executivesTotalCount: number;
	execStructuresTotalCount: number;
	representationsTotalCount: number;
	subOfficesTotalCount: number;

	error: string;
}

/* Action Types Enum */
export enum ActionTypes {
	GET_EXECUTIVES = "GET_EXECUTIVES",
	GET_EXECUTIVES_SUCCESS = "GET_EXECUTIVES_SUCCESS",
	GET_EXECUTIVES_FAILURE = "GET_EXECUTIVES_FAILURE",

	GET_EXEC_STRUCTURES = "GET_EXEC_STRUCTURES",
	GET_EXEC_STRUCTURES_SUCCESS = "GET_EXEC_STRUCTURES_SUCCESS",
	GET_EXEC_STRUCTURES_FAILURE = "GET_EXEC_STRUCTURES_FAILURE",

	GET_REPRESENTATIONS = "GET_REPRESENTATIONS",
	GET_REPRESENTATIONS_SUCCESS = "GET_REPRESENTATIONS_SUCCESS",
	GET_REPRESENTATIONS_FAILURE = "GET_REPRESENTATIONS_FAILURE",

	RESET_REPRESENTATIONS = "RESET_REPRESENTATIONS",

	GET_SUB_OFFICES = "GET_SUB_OFFICES",
	GET_SUB_OFFICES_SUCCESS = "GET_SUB_OFFICES_SUCCESS",
	GET_SUB_OFFICES_FAILURE = "GET_SUB_OFFICES_FAILURE",

	GET_STEPS = "GET_STEPS",
	GET_STEPS_SUCCESS = "GET_STEPS_SUCCESS",
	GET_STEPS_FAILURE = "GET_STEPS_FAILURE",
}

/* Payload Interfaces */
export interface GetExecutivesSuccessPayload {
	entities: Structure[];
	totalCount: number;
}

/* Action Interfaces */
export interface GetExecutives {
	type: typeof ActionTypes.GET_EXECUTIVES;
}

export interface GetExecutivesSuccess {
	type: typeof ActionTypes.GET_EXECUTIVES_SUCCESS;
	payload: GetExecutivesSuccessPayload;
}

export interface GetExecutivesFailure {
	type: typeof ActionTypes.GET_EXECUTIVES_FAILURE;
	payload: string;
}

export interface GetExecStructures {
	type: typeof ActionTypes.GET_EXEC_STRUCTURES;
}

export interface GetExecStructuresSuccess {
	type: typeof ActionTypes.GET_EXEC_STRUCTURES_SUCCESS;
	payload: GetExecutivesSuccessPayload;
}

export interface GetExecStructuresFailure {
	type: typeof ActionTypes.GET_EXEC_STRUCTURES_FAILURE;
	payload: string;
}

export interface GetRepresentations {
	type: typeof ActionTypes.GET_REPRESENTATIONS;
	payload: number;
}

export interface GetRepresentationsSuccess {
	type: typeof ActionTypes.GET_REPRESENTATIONS_SUCCESS;
	payload: GetExecutivesSuccessPayload;
}

export interface GetRepresentationsFailure {
	type: typeof ActionTypes.GET_REPRESENTATIONS_FAILURE;
	payload: string;
}

export interface ResetRepresentations {
	type: typeof ActionTypes.RESET_REPRESENTATIONS;
}

export interface GetSubOffices {
	type: typeof ActionTypes.GET_SUB_OFFICES;
}

export interface GetSubOfficesSuccess {
	type: typeof ActionTypes.GET_SUB_OFFICES_SUCCESS;
	payload: GetExecutivesSuccessPayload;
}

export interface GetSubOfficesFailure {
	type: typeof ActionTypes.GET_SUB_OFFICES_FAILURE;
	payload: string;
}

export interface GetSteps {
	type: typeof ActionTypes.GET_STEPS;
}

export interface GetStepsSuccess {
	type: typeof ActionTypes.GET_STEPS_SUCCESS;
	payload: Step[];
}

export interface GetStepsFailure {
	type: typeof ActionTypes.GET_STEPS_FAILURE;
	payload: string;
}

/* Unified Action type for Structures Reducer */
export type Action =
	| GetExecutives
	| GetExecutivesSuccess
	| GetExecutivesFailure
	| GetExecStructures
	| GetExecStructuresSuccess
	| GetExecStructuresFailure
	| GetRepresentations
	| GetRepresentationsSuccess
	| GetRepresentationsFailure
	| ResetRepresentations
	| GetSubOffices
	| GetSubOfficesSuccess
	| GetSubOfficesFailure
	| GetSteps
	| GetStepsSuccess
	| GetStepsFailure;
