import { useRef, useMemo } from "react";
import classnames from "classnames";

import "./styles.scss";

interface Props {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	rows?: number;
	name: string;
	required?: boolean;
	label?: string;
	error?: string;
	readonly?: boolean;
	maxLength?: number;
	hint?: string;
}

const TextArea: React.FC<Props> = (props) => {
	const {
		value,
		onChange,
		rows = 1,
		name,
		required = false,
		label,
		error,
		readonly = false,
		maxLength = 1e19,
		hint = "",
	} = props;
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const textAreaClass = useMemo(() => {
		return classnames({
			textarea: true,
			"textarea--readonly": readonly,
			"textarea--error": error,
		});
	}, [readonly, error]);

	const hintClass = useMemo(() => {
		return classnames({
			"textarea-hint": true,
			"textarea-hint--visible": !!hint || !!error,
			"textarea-hint--error": !!error,
		});
	}, [hint, error]);

	return (
		<div className='textarea-wrapper'>
			{label && (
				<label htmlFor={name} className='textarea-label'>
					{label} {required && <span>*</span>}
				</label>
			)}

			<textarea
				ref={textAreaRef}
				name={name}
				required={required}
				onChange={onChange}
				value={value}
				className={textAreaClass}
				rows={rows}
				disabled={readonly}
				maxLength={maxLength}
				autoComplete='off'
			/>

			<p className={hintClass}>{error || hint}</p>
		</div>
	);
};

export default TextArea;
