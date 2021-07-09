import { getHours, getMinutes, getSeconds } from "date-fns";

export const isHourDisabled = (h: number, minDate?: Date, maxDate?: Date) => {
	if (minDate && maxDate) return h <= getHours(minDate) || h >= getHours(maxDate);
	else if (minDate) return h <= getHours(minDate);
	else if (maxDate) return h >= getHours(maxDate);
};

export const isMinuteDisabled = (m: number, minDate?: Date, maxDate?: Date) => {
	if (minDate && maxDate) return m <= getMinutes(minDate) || m >= getMinutes(maxDate);
	else if (minDate) return m <= getMinutes(minDate);
	else if (maxDate) return m >= getMinutes(maxDate);
};

export const isSecondDisabled = (s: number, minDate?: Date, maxDate?: Date) => {
	if (minDate && maxDate) return s <= getSeconds(minDate) || s >= getSeconds(maxDate);
	else if (minDate) return s <= getSeconds(minDate);
	else if (maxDate) return s >= getSeconds(maxDate);
};
