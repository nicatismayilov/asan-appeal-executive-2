import { useCallback } from "react";
import { format, getHours, getMinutes, getSeconds } from "date-fns";
import classnames from "classnames";

import Scrollbar from "components/Scrollbar";

import "./styles.scss";

export interface Time {
	hours?: number;
	minutes?: number;
	seconds?: number;
	milliseconds?: number;
}

interface Props {
	date?: Date;
	onTimePick: (time: Time) => void;
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
	const { date, onTimePick } = props;

	const handleHourClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const hour = e.currentTarget.dataset["hour"];

			if (hour) {
				onTimePick({
					hours: +hour,
				});
			}
		},
		[onTimePick]
	);

	const handleMinuteClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const minute = e.currentTarget.dataset["minute"];

			if (minute) {
				onTimePick({
					minutes: +minute,
				});
			}
		},
		[onTimePick]
	);

	const handleSecondClick = useCallback(
		(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
			const second = e.currentTarget.dataset["second"];

			if (second) {
				onTimePick({
					seconds: +second,
				});
			}
		},
		[onTimePick]
	);

	return (
		<div className='time-picker'>
			<div className='h-100 d-flex align-center'>
				<div className='d-flex align-center flex-column'>
					<span className='time-picker-label'>Vaxt</span>
					<div className='time-picker-slot'>{date && format(date, "HH:mm:ss")}</div>
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
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": date && getHours(date) === h,
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
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": date && getMinutes(date) === m,
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
										className={classnames({
											"time-picker-selection-item": true,
											"time-picker-selection-item--active": date && getSeconds(date) === s,
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
