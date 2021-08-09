import { Structure } from "./structures";
import { Role, Step } from "./user";

export interface Employee {
	uuid: string;
	pin: string;
	firstName: string;
	lastName: string;
	fatherName: string;
	email: string;
	address: string;
	structure: Structure;
	steps: Step[];
	photo: string;
	role: Role;
	gender: boolean;
	whatsapNumber: string;
	mobilePhoneNumber: string;
	taskCount: number;
}
