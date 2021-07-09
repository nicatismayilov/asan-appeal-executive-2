import { useState, useEffect } from "react";

import RadioButton, { RadioButtonValue } from "components/RadioButton";
import Button from "components/Button";

import "./styles.scss";

export interface RadioOption extends RadioButtonValue {}

interface Props {
	options: RadioOption[];
	onSelect: (selected: RadioButtonValue) => void;
	resettable?: boolean;
}

const RadioGroup: React.FC<Props> = (props) => {
	const { options, resettable = false } = props;
	const { onSelect } = props;
	const [selected, setSelected] = useState<RadioButtonValue>({ id: -1, text: "" });

	const handleRadioButtonClick = (v: RadioButtonValue): void => setSelected(v);

	const handleSelectedChangeEffect = (): void => onSelect(selected);

	useEffect(handleSelectedChangeEffect, [selected, onSelect]);

	return (
		<div className='radio-group'>
			{options.map((option) => (
				<RadioButton
					key={option.id}
					value={{ id: option.id, text: option.text }}
					onClick={handleRadioButtonClick}
					selected={selected}
					text={option.text}
				/>
			))}

			{resettable && <Button text='sıfırla' onClick={() => setSelected({ id: -1, text: "" })} />}
		</div>
	);
};

export default RadioGroup;
