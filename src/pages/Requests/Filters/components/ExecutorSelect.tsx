import { useSelector } from "react-redux";

import { selectExecutors, selectExecutorsLoading } from "store/employees/selectors";

import Select from "components/Select";

import { Employee } from "types/employee";

type Value = Employee | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
}

const executorIdFromValue = (e: Employee) => e.uuid.toString();

const executorRender = (e: Employee) => {
	return `${e.firstName} ${e.lastName} (${e.taskCount} tapşırıq)`;
};

const ExecutorSelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;
	const executors = useSelector(selectExecutors);
	const executorsLoading = useSelector(selectExecutorsLoading);

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='İcraçı'
				options={executors}
				loading={executorsLoading}
				value={value}
				idFromValue={executorIdFromValue}
				render={executorRender}
				name='executorUUID'
				onChange={onChange}
				clearable
				optionsEmptyText='Məlumat yoxdur'
			/>
		</div>
	);
};

export default ExecutorSelect;
