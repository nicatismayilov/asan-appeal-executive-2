import React, { useMemo, useRef } from "react";
import classnames from "classnames";

import Icon from "components/Icon";

import "./styles.scss";

interface Props {
	name: string;
	placeholder?: string;
	isRequired?: boolean;
	label?: string;
	labelPersist?: boolean;
	value?: number | undefined;
	error?: string;
	onChange?: (value: number | undefined) => void;
	readonly?: boolean;
	wrapperStyle?: React.CSSProperties;
	style?: React.CSSProperties;
	width?: number | string;
	loading?: boolean;
	loadingType?: "skeleton" | "border";
	hint?: string;
	maxLength?: number;
	min?: number;
	max?: number;
}

const NumberField: React.FC<Props> = (props) => {
	const {
		name,
		label,
		value,
		readonly = false,
		isRequired = false,
		error,
		wrapperStyle,
		style,
		width,
		loading = false,
		loadingType = "border",
		hint = "",
		maxLength = 1e19,
		min,
		max,
	} = props;
	const { onChange } = props;
	const inputRef = useRef<HTMLInputElement>(null);

	// inline styles
	const wrapperStyles = useMemo<React.CSSProperties>(() => {
		return { width, ...wrapperStyle };
	}, [width, wrapperStyle]);
	//

	// classes
	const inputSlotClass = useMemo(() => {
		return classnames({
			"nf-input-slot": true,
			"nf-input-slot--loading": loading,
			"nf-input-slot--readonly": readonly,
		});
	}, [loading, readonly]);

	const inputClass = useMemo(() => {
		return classnames({
			"nf-input": true,
			"nf-input--readonly": readonly,
			"nf-input--error": error,
			"nf-input--loading": loading,
		});
	}, [readonly, error, loading]);

	const hintClass = useMemo(() => {
		return classnames({
			"nf-hint": true,
			"nf-hint--visible": !!hint || !!error,
			"nf-hint--error": !!error,
		});
	}, [hint, error]);
	//

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			const { value } = e.target;

			if (value === "") {
				onChange(undefined);
				return;
			}

			if (min && +value < min) {
				onChange(min);
				return;
			}

			if (max && +value > max) {
				onChange(max);
				return;
			}

			onChange(+value);
		}
	};

	const handleIncrement = () => {
		if (onChange) {
			if (value !== undefined) {
				if (value === max) return;

				onChange(value + 1);
				return;
			}

			if (max && 0 > max) onChange(max);
			else if (min && 0 < min) onChange(min);
			else onChange(0);
		}
	};

	const handleDecrement = () => {
		if (onChange) {
			if (value !== undefined) {
				if (value === min) return;

				onChange(value - 1);
				return;
			}

			if (max && 0 > max) onChange(max);
			else if (min && 0 < min) onChange(min);
			else onChange(0);
		}
	};

	return (
		<div className='nf-wrapper' style={wrapperStyles}>
			{label && (
				<label htmlFor={name} className='nf-label'>
					{label} {isRequired && <span>*</span>}
				</label>
			)}

			<div className={inputSlotClass}>
				<input
					ref={inputRef}
					name={name}
					id={name}
					className={inputClass}
					value={!loading ? value || "" : ""}
					onChange={handleChange}
					readOnly={readonly}
					autoComplete='off'
					style={style}
					maxLength={maxLength}
					disabled={readonly}
					type='number'
					min={min}
					max={max}
				/>

				<div className='nf-btn-container'>
					<button
						type='button'
						className='nf-btn'
						disabled={value === max}
						onClick={handleIncrement}
					>
						<Icon icon='chevron-up' />
					</button>

					<button
						type='button'
						className='nf-btn'
						disabled={value === min}
						onClick={handleDecrement}
					>
						<Icon icon='chevron-down' />
					</button>
				</div>

				{loadingType === "border" && <span className='nf-loader' />}
			</div>

			<p className={hintClass}>{error || hint}</p>
		</div>
	);
};

export default NumberField;
