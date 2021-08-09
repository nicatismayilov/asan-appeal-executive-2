import Select from "components/Select";
import Icon from "components/Icon";

import { Priority } from "types/requests";
import { priorities } from "types/utils";

type Value = Priority | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
}

const prioritydFromValue = (p: Priority) => p.name;

const priorityRender = (p: Priority) => {
	return (
		<div className='d-flex align-center'>
			<Icon icon='connection-status-on' fill={p.color} height={20} width={20} className='mr-2' />
			{p.title}
		</div>
	);
};

const PrioritySelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='Prioritet'
				options={priorities}
				value={value}
				idFromValue={prioritydFromValue}
				render={priorityRender}
				name='priority'
				onChange={onChange}
				clearable
				optionsEmptyText='Məlumat yoxdur'
			/>
		</div>
	);
};

export default PrioritySelect;
