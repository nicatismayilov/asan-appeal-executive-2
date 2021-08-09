import { Action, ActionTypes, GetExecutivesSuccessPayload } from "./types";
import { Step } from "types/user";

/* Action Creators for Executives */
export const getExecutives = (): Action => {
	return {
		type: ActionTypes.GET_EXECUTIVES,
	};
};

export const getExecutivesSuccess = (payload: GetExecutivesSuccessPayload): Action => {
	return {
		type: ActionTypes.GET_EXECUTIVES_SUCCESS,
		payload,
	};
};

export const getExecutivesFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_EXECUTIVES_FAILURE,
		payload,
	};
};

/* Action Creators for Exec Structures */
export const getExecStructures = (): Action => {
	return {
		type: ActionTypes.GET_EXEC_STRUCTURES,
	};
};

export const getExecStructuresSuccess = (payload: GetExecutivesSuccessPayload): Action => {
	return {
		type: ActionTypes.GET_EXEC_STRUCTURES_SUCCESS,
		payload,
	};
};

export const getExecStructuresFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_EXEC_STRUCTURES_FAILURE,
		payload,
	};
};

/* Action Creators for Representations */
export const getRepresentations = (payload: number): Action => {
	return {
		type: ActionTypes.GET_REPRESENTATIONS,
		payload,
	};
};

export const getRepresentationsSuccess = (payload: GetExecutivesSuccessPayload): Action => {
	return {
		type: ActionTypes.GET_REPRESENTATIONS_SUCCESS,
		payload,
	};
};

export const getRepresentationsFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_REPRESENTATIONS_FAILURE,
		payload,
	};
};

export const resetRepresentations = (): Action => {
	return {
		type: ActionTypes.RESET_REPRESENTATIONS,
	};
};

/* Action Creators for Sub Offices */
export const getSubOffices = (): Action => {
	return {
		type: ActionTypes.GET_SUB_OFFICES,
	};
};

export const getSubOfficesSuccess = (payload: GetExecutivesSuccessPayload): Action => {
	return {
		type: ActionTypes.GET_SUB_OFFICES_SUCCESS,
		payload,
	};
};

export const getSubOfficesFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_SUB_OFFICES_FAILURE,
		payload,
	};
};

/* Action Creators for Steps */
export const getSteps = (): Action => {
	return {
		type: ActionTypes.GET_STEPS,
	};
};

export const getStepsSuccess = (payload: Step[]): Action => {
	return {
		type: ActionTypes.GET_STEPS_SUCCESS,
		payload,
	};
};

export const getStepsFailure = (payload: string): Action => {
	return {
		type: ActionTypes.GET_STEPS_FAILURE,
		payload,
	};
};
