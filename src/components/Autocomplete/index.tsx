import React, { useState } from "react";

import "./styles.scss";

interface Props {
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	value: string;
}

const Autocomplete: React.FC<Props> = (props) => {
	const { value, onBlur, onChange } = props;
	const [suggestions, setSuggestions] = useState([]);

	return (
		<div className='autocomplete'>
			<input
				type='text'
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				className='autocomplete-input'
			/>
		</div>
	);
};

export default Autocomplete;
