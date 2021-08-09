import { Category } from "types/category";
import { Priority } from "types/requests";
import { Employee } from "types/employee";
import { Region, Structure } from "types/structures";
import { Step } from "types/user";

export interface Filters {
	startDateStr?: Date;
	endDateStr?: Date;
	problemNum?: number;
	completed?: boolean;
	priority?: Priority;
	parentOfficeId?: Structure;
	officeId?: Structure;
	regionId?: Region;
	categoryId?: Category;
	requestNum?: number;
	executorUUID?: Employee;
	executiveId?: Structure;
	representationId?: Structure;
	stepId?: Step;
	verifiedDateStr?: Date;
	citizenUUID?: Employee;
}

export const initialValues: Filters = {};
