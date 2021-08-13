import { format } from "date-fns";
import { az } from "date-fns/locale";

import getDateFormat from "./getDateFormat";

function getDateFormatString(date: string | number | Date, fmt: string): string {
	const dateObj = new Date(typeof date === "string" ? getDateFormat(date) : date);

	return format(dateObj, fmt, { locale: az });
}

export default getDateFormatString;
