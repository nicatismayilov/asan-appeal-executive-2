import { useCallback } from "react";
import { format, getHours, getMinutes, getSeconds } from "date-fns";
import classnames from "classnames";

import Scrollbar from "components/Scrollbar";

import { isHourDisabled, isMinuteDisabled, isSecondDisabled } from "./utils";

import "./styles.scss";

export interface Time {
	hours?: number;
	minutes?: number;
	seconds?: number;
	milliseconds?: number;
}

interface Props {
	range: Date[];
	onTimePick: (time: Time, dateType: "start" | "end") => void;
	minDate?: Date;
	maxDate?: Date;
}

const formatUnit = (u: number) => {
	if (u < 10) return `0${u}`;
	else return `${u}`;
};

const hours = Array(24)
	.fill(0)
	.map((_, i) => i);

const minutes = Array(60)
	.fill(0)
	.map((_, i) => i);

const seconds = Array(60)
	.fill(0)
	.map((_, i) => i);

const TimePicker: React.FC<Props> = (props) => {
	const { range, onTimePick, minDate, maxDate } = props;

	const handleHourClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const type = e.currentTarget.dataset["type"];
			const hour = e.currentTarget.dataset["hour"];

			if (type && hour) {
				onTimePick(
					{
						hours: +hour,
					},
					type === "start" ? "start" : "end"
				);
			}
		},
		[onTimePick]
	);

	const handleMinuteClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const type = e.currentTarget.dataset["type"];
			const minute = e.currentTarget.dataset["minute"];

			if (type && minute) {
				onTimePick(
					{
						minutes: +minute,
					},
					type === "start" ? "start" : "end"
				);
			}
		},
		[onTimePick]
	);

	const handleSecondClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const type = e.currentTarget.dataset["type"];
			const second = e.currentTarget.dataset["second"];

			if (type && second) {
				onTimePick(
					{
						seconds: +second,
					},
					type === "start" ? "start" : "end"
				);
			}
		},
		[onTimePick]
	);

	return (
		<div className='time-picker'>
			<div className='h-50 d-flex align-center'>
				<div className='d-flex align-center flex-column'>
					<span className='time-picker-label'>Başlama vaxtı</span>
					<div className='time-picker-slot'>{range[0] && format(range[0], "HH:mm:ss")}</div>
				</div>

				<div className='time-picker-selection flex-column justify-between d-flex h-100'>
					<div className='h-10 text-center font-weight-medium'>Vaxt seçimi</div>

					<div className='d-flex h-85 py-2'>
						<div className='time-picker-selection-slot h-100 mr-2'>
							<Scrollbar hide>
								{hours.map((h) => (
									<div
										key={h}
										data-hour={h}
										data-type='start'
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": range[0] && getHours(range[0]) === h,
											"time-picker-selection-item--disable": isHourDisabled(h, minDate, undefined),
										})}
										onClick={handleHourClick}
									>
										{formatUnit(h)}
									</div>
								))}
							</Scrollbar>
						</div>

						<div className='time-picker-selection-slot h-100 mr-2'>
							<Scrollbar hide>
								{minutes.map((m) => (
									<div
										key={m}
										data-minute={m}
										data-type='start'
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": range[0] && getMinutes(range[0]) === m,
											"time-picker-selection-item--disable": isMinuteDisabled(
												m,
												minDate,
												undefined
											),
										})}
										onClick={handleMinuteClick}
									>
										{formatUnit(m)}
									</div>
								))}
							</Scrollbar>
						</div>

						<div className='time-picker-selection-slot h-100'>
							<Scrollbar hide>
								{seconds.map((s) => (
									<div
										key={s}
										data-second={s}
										data-type='start'
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": range[0] && getSeconds(range[0]) === s,
											"time-picker-selection-item--disable": isSecondDisabled(
												s,
												minDate,
												undefined
											),
										})}
										onClick={handleSecondClick}
									>
										{formatUnit(s)}
									</div>
								))}
							</Scrollbar>
						</div>
					</div>
				</div>
			</div>

			<div className='h-50 d-flex align-center'>
				<div className='d-flex align-center flex-column'>
					<span className='time-picker-label'>Bitmə vaxtı</span>
					<div className='time-picker-slot'>{range[1] && format(range[1], "HH:mm:ss")}</div>
				</div>

				<div className='time-picker-selection flex-column justify-between d-flex h-100'>
					<div className='h-10 text-center font-weight-medium'>Vaxt seçimi</div>

					<div className='d-flex h-85 py-2'>
						<div className='time-picker-selection-slot h-100 mr-2'>
							<Scrollbar hide>
								{hours.map((h) => (
									<div
										key={h}
										data-hour={h}
										data-type='end'
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": range[1] && getHours(range[1]) === h,
											"time-picker-selection-item--disable": isHourDisabled(h, undefined, maxDate),
										})}
										onClick={handleHourClick}
									>
										{formatUnit(h)}
									</div>
								))}
							</Scrollbar>
						</div>

						<div className='time-picker-selection-slot h-100 mr-2'>
							<Scrollbar hide>
								{minutes.map((m) => (
									<div
										key={m}
										data-minute={m}
										data-type='end'
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": range[1] && getMinutes(range[1]) === m,
											"time-picker-selection-item--disable": isMinuteDisabled(
												m,
												undefined,
												maxDate
											),
										})}
										onClick={handleMinuteClick}
									>
										{formatUnit(m)}
									</div>
								))}
							</Scrollbar>
						</div>

						<div className='time-picker-selection-slot h-100'>
							<Scrollbar hide>
								{seconds.map((s) => (
									<div
										key={s}
										data-second={s}
										data-type='end'
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": range[1] && getSeconds(range[1]) === s,
											"time-picker-selection-item--disable": isSecondDisabled(
												s,
												undefined,
												maxDate
											),
										})}
										onClick={handleSecondClick}
									>
										{formatUnit(s)}
									</div>
								))}
							</Scrollbar>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TimePicker;
