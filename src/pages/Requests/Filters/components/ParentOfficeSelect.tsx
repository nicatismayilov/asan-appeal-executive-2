import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getExecStructures } from "store/structures/actions";
import { selectExecStructures, selectExecStructuresLoading } from "store/structures/selectors";

import Select from "components/Select";

import { Structure } from "types/structures";

type Value = Structure | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
}

const execStructureIdFromValue = (s: Structure) => s.id.toString();

const execStructureRender = (s: Structure) => s.name;

const ParentOfficeSelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;
	const dispatch = useDispatch();
	const execStructures = useSelector(selectExecStructures);
	const execStructuresLoading = useSelector(selectExecStructuresLoading);

	useEffect(() => {
		dispatch(getExecStructures());
	}, [dispatch]);

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='İcraçı təşkilat'
				options={execStructures}
				loading={execStructuresLoading}
				value={value}
				idFromValue={execStructureIdFromValue}
				render={execStructureRender}
				name='parentOfficeId'
				onChange={onChange}
				clearable
			/>
		</div>
	);
};

export default ParentOfficeSelect;
