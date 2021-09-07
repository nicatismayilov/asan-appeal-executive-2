import { useSelector } from "react-redux";

import { selectSteps, selectStepsLoading } from "store/structures/selectors";

import Select from "components/Select";

import { Step } from "types/user";

type Value = Step | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
}

const stepIdFromValue = (s: Step) => s.id.toString();

const stepRender = (s: Step) => s.name;

const StepSelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;
	const steps = useSelector(selectSteps);
	const stepsLoading = useSelector(selectStepsLoading);

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='Mərhələ'
				options={steps}
				loading={stepsLoading}
				value={value}
				idFromValue={stepIdFromValue}
				render={stepRender}
				name='stepId'
				onChange={onChange}
				clearable
				optionsEmptyText='Məlumat yoxdur'
			/>
		</div>
	);
};

export default StepSelect;
