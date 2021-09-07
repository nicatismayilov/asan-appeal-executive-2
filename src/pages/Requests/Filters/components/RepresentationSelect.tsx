import { useSelector } from "react-redux";

import { selectRepresentations, selectRepresentationsLoading } from "store/structures/selectors";

import Select from "components/Select";

import { Structure } from "types/structures";

type Value = Structure | undefined;

interface Props {
	value: Value;
	onChange: (value: Value) => void;
	active: boolean;
	parentId?: number;
}

const representationIdFromValue = (s: Structure) => s.id.toString();

const representationRender = (s: Structure) => s.name;

const RepresentationSelect: React.FC<Props> = (props) => {
	const { value, onChange, active, parentId } = props;
	const representations = useSelector(selectRepresentations);
	const representationsLoading = useSelector(selectRepresentationsLoading);
	const optionsEmptyText = parentId ? "Məlumat yoxdur" : "İcra orqanı seçin";

	if (!active) return null;

	return (
		<div className='col-12 col-md-6 col-lg-3'>
			<Select
				label='Nəzarətçi'
				options={representations}
				loading={representationsLoading}
				value={value}
				idFromValue={representationIdFromValue}
				render={representationRender}
				name='representationId'
				onChange={onChange}
				clearable
				optionsEmptyText={optionsEmptyText}
			/>
		</div>
	);
};

export default RepresentationSelect;
