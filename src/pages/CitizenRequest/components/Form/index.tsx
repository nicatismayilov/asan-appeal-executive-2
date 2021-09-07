import { useCallback, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormikProps } from "formik";

import { getExecutives, getExecStructures } from "store/structures/actions";
import { getCategories } from "store/categories/actions";
import { getActions } from "store/requests/actions";

import {
	selectExecutives,
	selectExecutivesLoading,
	selectExecStructures,
	selectExecStructuresLoading,
} from "store/structures/selectors";
import { selectCategories, selectCategoriesLoading } from "store/categories/selectors";
import { selectActions, selectActionLoading } from "store/requests/selectors";
import { selectActiveMenu } from "store/user/selectors";

import TextArea from "components/TextArea";
import Button from "components/Button";
import TextField from "components/TextField";
import Select from "components/Select";
// import TreeSelect from "components/TreeSelect";
import ComboBox from "components/ComboBox";
import Icon from "components/Icon";
import Spinner from "components/Spinner";

import { Request, RequestType } from "types/requests";
import { Structure } from "types/structures";
import { Category } from "types/category";
import { Priority } from "types/requests";

import { priorities, prioritiesMap } from "types/utils";

interface Props {
	request: Request;
	formik: FormikProps<Request>;
}

const types: RequestType[] = [
	{
		name: "COMPLAINT",
		title: "Şikayət",
	},
	{
		name: "OFFER",
		title: "Təklif",
	},
];

const executiveIdFromValue = (e: Structure) => e.id.toString();
const execStructureIdFromValue = (e: Structure) => e.id.toString();
const categoryIdFromValue = (c: Category) => c.id.toString();
const typeIdFromValue = (t: RequestType) => t.name;
const prioritydFromValue = (p: Priority) => p.name;

const executiveRender = (e: Structure) => e.name;
const execStructreRender = (e: Structure) => e.name;
const categoryRender = (c: Category) => c.name;
const typeRender = (t: RequestType) => t.title;
const priorityRender = (p: Priority) => {
	return (
		<div className='d-flex align-center'>
			<Icon icon='connection-status-on' fill={p.color} height={20} width={20} className='mr-2' />
			{p.title}
		</div>
	);
};

const Form: React.FC<Props> = (props) => {
	const { formik, request } = props;
	const dispatch = useDispatch();
	const executives = useSelector(selectExecutives);
	const execStructures = useSelector(selectExecStructures);
	const categories = useSelector(selectCategories);
	const actions = useSelector(selectActions);
	const executivesLoading = useSelector(selectExecutivesLoading);
	const execStructuresLoading = useSelector(selectExecStructuresLoading);
	const categoriesLoading = useSelector(selectCategoriesLoading);
	const actionsLoading = useSelector(selectActionLoading);
	const activeMenu = useSelector(selectActiveMenu);
	const { values, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = formik;

	const type = useMemo(() => {
		return types.find((t) => t.name === values.type);
	}, [values.type]);

	const handleExecutiveChange = useCallback(
		(value: Structure | undefined) => {
			setFieldValue("executive", value);
		},
		[setFieldValue]
	);

	const handleExecStructresChange = useCallback(
		(value: Structure[]) => {
			setFieldValue("execStructures", value);
		},
		[setFieldValue]
	);

	const handleCategoriesChange = useCallback(
		(value: Category[]) => {
			setFieldValue("categories", value);
		},
		[setFieldValue]
	);

	const handleTypeChange = useCallback(
		(value: RequestType | undefined) => {
			setFieldValue("type", value?.name);
		},
		[setFieldValue]
	);

	const handlePriorityLevelChange = useCallback(
		(value: Priority | undefined) => {
			setFieldValue("priorityLevel", value?.name);
		},
		[setFieldValue]
	);

	useEffect(() => {
		dispatch(getExecutives());
		dispatch(getExecStructures());
		dispatch(getCategories());
	}, [dispatch]);

	useEffect(() => {
		const { id } = request;
		const menuUrl = activeMenu.name;

		dispatch(getActions({ id, menuUrl }));
	}, [activeMenu.name, dispatch, request]);

	return (
		<div className='card p-relative'>
			<div className='pa-10'>
				<form className='row' id='requestForm' onSubmit={handleSubmit} noValidate>
					<div className='col-4'>
						<Select
							value={values.executive}
							onChange={handleExecutiveChange}
							render={executiveRender}
							idFromValue={executiveIdFromValue}
							name='executive'
							options={executives}
							loading={executivesLoading}
							label='Nəzarəq orqanı'
							required
							error={errors.executive}
						/>
					</div>

					<div className='col-4'>
						<Select
							value={type}
							options={types}
							onChange={handleTypeChange}
							render={typeRender}
							idFromValue={typeIdFromValue}
							name='type'
							label='Müraciətin növü'
							required
							clearable
							error={errors.type}
						/>
					</div>

					<div className='col-4'>
						<Select
							label='Prioritet'
							options={priorities}
							value={values.priorityLevel ? prioritiesMap[values.priorityLevel] : undefined}
							idFromValue={prioritydFromValue}
							render={priorityRender}
							name='priorityLevel'
							onChange={handlePriorityLevelChange}
							clearable
							optionsEmptyText='Məlumat yoxdur'
							required
							error={errors.priorityLevel}
						/>
					</div>

					<div className='col-12'>
						<TextField
							value={values.address}
							onChange={handleChange}
							onBlur={handleBlur}
							type='text'
							name='address'
							label='Müraciət ünvanı'
						/>
					</div>

					<div className='col-12'>
						<ComboBox
							values={values.execStructures || []}
							options={execStructures}
							loading={execStructuresLoading}
							render={execStructreRender}
							idFromValue={execStructureIdFromValue}
							name='execStructures'
							onChange={handleExecStructresChange}
							label='İcraçı təşkilatlar'
						/>
					</div>

					<div className='col-12'>
						<ComboBox
							values={values.categories || []}
							options={categories}
							loading={categoriesLoading}
							render={categoryRender}
							idFromValue={categoryIdFromValue}
							name='categories'
							onChange={handleCategoriesChange}
							label='Təsnifat'
						/>
					</div>

					<div className='col-12'>
						<TextArea
							value={values.title}
							onChange={handleChange}
							name='title'
							label='Qısa məzmun'
							rows={3}
							required
							error={errors.title}
						/>
					</div>
				</form>
			</div>

			<div className='px-10 py-6'>
				{request.lastOperation && (
					<div className='request-last-operation'>{request.lastOperation}</div>
				)}

				{actionsLoading ? (
					<div className='w-100 d-flex justify-center'>
						<Spinner />
					</div>
				) : (
					<div className='form-actions-container d-flex align-center justify-end'>
						{actions.map((action) => (
							<Button key={action.id} type='submit' form='requestForm'>
								{action.name}
							</Button>
						))}
					</div>
				)}

				{/* <div className='ml-6'>
					<Button type='submit' form='requestForm' backgroundColor='#4759e4' color='#fff'>
						Aydın deyil
					</Button>
				</div>

				<div className='ml-6'>
					<Button type='submit' form='requestForm'>
						Aid deyil
					</Button>
				</div> */}
			</div>
		</div>
	);
};

export default Form;
