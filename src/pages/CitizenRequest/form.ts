import * as Yup from "yup";

enum ErrorMessages {
	TITLE_REQUIRED = "Qısa məzmun daxil edilməlidir",
	EXECUTIVE_REQUIRED = "Nəzarət orqanı seçilməldir",
	PRIORITY_REQUIRED = "Prioritet seçilməlidir",
	TYPE_REQUIRED = "Müraciət növü seçilməlidir",
}

export const validationSchema = Yup.object({
	title: Yup.string().required(ErrorMessages.TITLE_REQUIRED),
	executive: Yup.object().required(ErrorMessages.EXECUTIVE_REQUIRED),
	priorityLevel: Yup.string().required(ErrorMessages.PRIORITY_REQUIRED),
	type: Yup.object().required(ErrorMessages.TYPE_REQUIRED),
});
