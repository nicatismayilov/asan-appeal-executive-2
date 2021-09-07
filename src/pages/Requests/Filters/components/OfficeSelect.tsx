import { useSelector } from "react-redux";

import { selectSubOffices, selectSubOfficesLoading } from "store/structures/selectors";

import Select from "components/Select";

import { Structure } from "types/structures";

type Value = Structure | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
}

const subOfficeIdFromValue = (s: Structure) => s.id.toString();

const subOfficeRender = (s: Structure) => s.name;

const OfficeSelect: React.FC<Props> = (props) => {
	const { value, onChange, active } = props;
	const subOffices = useSelector(selectSubOffices);
	const subOfficesLoading = useSelector(selectSubOfficesLoading);

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='Tabeli təşkilat'
				options={subOffices}
				loading={subOfficesLoading}
				value={value}
				idFromValue={subOfficeIdFromValue}
				render={subOfficeRender}
				name='officeId'
				onChange={onChange}
				clearable
				optionsEmptyText='Məlumat yoxdur'
			/>
		</div>
	);
};

export default OfficeSelect;
