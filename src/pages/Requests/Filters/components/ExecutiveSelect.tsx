import { useSelector } from "react-redux";

import { selectExecutives, selectExecutivesLoading } from "store/structures/selectors";

import Select from "components/Select";

import { Structure } from "types/structures";

type Value = Structure | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
}

const executiveIdFromValue = (s: Structure) => s.id.toString();

const executiveRender = (s: Structure) => s.name;

const ExecutiveSelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;
	const executives = useSelector(selectExecutives);
	const executivesLoading = useSelector(selectExecutivesLoading);

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='İcra orqanı'
				options={executives}
				loading={executivesLoading}
				value={value}
				idFromValue={executiveIdFromValue}
				render={executiveRender}
				name='executive'
				onChange={onChange}
				clearable
			/>
		</div>
	);
};

export default ExecutiveSelect;
