import { useState, useCallback, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { useFormik } from "formik";

import {
	getExecutives,
	getSubOffices,
	getExecStructures,
	getRepresentations,
	resetRepresentations,
	getSteps,
} from "store/structures/actions";
import { getCategories } from "store/categories/actions";
import { getExecutors } from "store/employees/actions";

import { selectActiveStep, selectActiveMenu } from "store/user/selectors";

import Button from "components/Button";
import Icon from "components/Icon";
import DateRangePicker from "components/DateRangePicker";
import NumberField from "components/NumberField";
import Badge from "components/Badge";
// import DatePicker from "components/DatePicker";

import ExecutiveSelect from "./components/ExecutiveSelect";
import ParentOfficeSelect from "./components/ParentOfficeSelect";
import RepresentationSelect from "./components/RepresentationSelect";
import OfficeSelect from "./components/OfficeSelect";
import ExecutorSelect from "./components/ExecutorSelect";
import StepSelect from "./components/StepSelect";
import PrioritySelect from "./components/PrioritySelect";
import StatusSelect from "./components/StatusSelect";
import CategorySelect from "./components/CategorySelect";

import { Structure } from "types/structures";
import { Employee } from "types/employee";
import { Step } from "types/user";
import { Priority } from "types/requests";
import { Category } from "types/category";

import { Filters as FiltersType, initialValues } from "./form";

import "./styles.scss";

interface Props {
	onSearch: (filters: FiltersType) => void;
}

const animationVariants: Variants = {
	animate: { y: 0 },
	initial: { y: "-100%" },
	exit: { y: "-100%" },
};

const animationTransition: Transition = {
	type: "spring",
	stiffness: 200,
	damping: 26,
	mass: 1,
};

const formId = "searchFilters";

const Filters: React.FC<Props> = (props) => {
	const { onSearch } = props;
	const dispatch = useDispatch();
	const activeMenu = useSelector(selectActiveMenu);
	const activeStep = useSelector(selectActiveStep);
	const [active, setActive] = useState(false);
	const formik = useFormik({
		initialValues,
		onSubmit: handleFormikSubmit,
		onReset: handleFormikReset,
	});
	const { values, setFieldValue, handleSubmit, handleReset, dirty } = formik;

	function handleFormikSubmit(values: FiltersType) {
		onSearch(values);
	}

	function handleFormikReset() {
		onSearch({});
	}

	const handleExecutiveChange = useCallback(
		async (value: Structure | undefined) => {
			await setFieldValue("executiveId", value);
		},
		[setFieldValue]
	);

	const handleParentOfficeChange = useCallback(
		async (value: Structure | undefined) => {
			await setFieldValue("parentOfficeId", value);
		},
		[setFieldValue]
	);

	const handleRepresentationChange = useCallback(
		async (value: Structure | undefined) => {
			await setFieldValue("representationId", value);
		},
		[setFieldValue]
	);

	const handleOfficeChange = useCallback(
		async (value: Structure | undefined) => {
			await setFieldValue("officeId", value);
		},
		[setFieldValue]
	);

	const handleExecutorChange = useCallback(
		async (value: Employee | undefined) => {
			await setFieldValue("executorUUID", value);
		},
		[setFieldValue]
	);

	const handleStepChange = useCallback(
		async (value: Step | undefined) => {
			await setFieldValue("stepId", value);
		},
		[setFieldValue]
	);

	const handlePriorityChange = useCallback(
		async (value: Priority | undefined) => {
			await setFieldValue("priority", value);
		},
		[setFieldValue]
	);

	const handleDateRangeChange = useCallback(
		async (value: Date[]) => {
			setFieldValue("startDateStr", value[0]);
			setFieldValue("endDateStr", value[1]);
		},
		[setFieldValue]
	);

	const handleStatusChange = useCallback(
		async (value: boolean | undefined) => {
			await setFieldValue("completed", value);
		},
		[setFieldValue]
	);

	const handleCategoryChange = useCallback(
		async (value: Category | undefined) => {
			await setFieldValue("categoryId", value);
		},
		[setFieldValue]
	);

	const handleRequestNumChange = useCallback(
		async (value: number | undefined) => {
			await setFieldValue("requestNum", value);
		},
		[setFieldValue]
	);

	const handleProblemNumChange = useCallback(
		async (value: number | undefined) => {
			await setFieldValue("problemNum", value);
		},
		[setFieldValue]
	);

	// const handleVerifiedDateChange = useCallback(
	// 	async (value: Date | undefined) => {
	// 		await setFieldValue("verifiedDateStr", value);
	// 	},
	// 	[setFieldValue]
	// );

	const dateRange = useMemo<Date[]>(() => {
		let range: Date[] = [];

		if (values.startDateStr) range.push(values.startDateStr);
		if (values.endDateStr) range.push(values.endDateStr);

		return range;
	}, [values.endDateStr, values.startDateStr]);

	useEffect(() => {
		dispatch(getExecutives());
		dispatch(getCategories());
		dispatch(getExecutors());
		dispatch(getSubOffices());
		dispatch(getExecStructures());
		dispatch(getSteps());
	}, [dispatch]);

	useEffect(() => {
		if (values.executiveId?.id) dispatch(getRepresentations(values.executiveId?.id));
		else dispatch(resetRepresentations());
	}, [dispatch, values.executiveId?.id]);

	return (
		<div className='p-relative' style={{ position: "relative" }}>
			<div className='px-10 py-6 d-flex justify-between align-center'>
				<h1 className='headline font-weight-medium grey-3--text'>
					{activeMenu.type === "PROBLEM" ? "Şikayətlər" : "Müraciətlər"}
				</h1>

				<Badge
					text={Object.keys(values).length}
					disabled={Object.keys(values).length === 0}
					distanceX={10}
					distanceY={10}
				>
					<Button onClick={() => setActive(true)}>
						Axtarış filtrləri <Icon icon='filter' className='ml-5' />
					</Button>
				</Badge>
			</div>

			<AnimatePresence>
				{active && (
					<motion.div
						initial='initial'
						animate='animate'
						exit='exit'
						variants={animationVariants}
						transition={animationTransition}
						className='overflow-hidden w-100 filters-container'
					>
						<div className='pa-10'>
							<form id={formId} onSubmit={handleSubmit} onReset={handleReset}>
								<div className='row'>
									<ExecutiveSelect
										active={activeMenu.label === "all" && activeStep.canSearchByExecutive}
										value={values.executiveId}
										onChange={handleExecutiveChange}
									/>

									<RepresentationSelect
										active={activeMenu.label === "all" && activeStep.canSearchByRepresentation}
										parentId={values.executiveId?.id}
										value={values.representationId}
										onChange={handleRepresentationChange}
									/>

									<ParentOfficeSelect
										active={activeMenu.label === "all" && activeStep.canSearchByParentOffice}
										value={values.parentOfficeId}
										onChange={handleParentOfficeChange}
									/>

									<OfficeSelect
										active={activeMenu.label === "all" && activeStep.canSearchBySuboffice}
										value={values.officeId}
										onChange={handleOfficeChange}
									/>

									<ExecutorSelect
										active={activeMenu.label === "all"}
										value={values.executorUUID}
										onChange={handleExecutorChange}
									/>

									<StepSelect
										active={activeMenu.label === "all"}
										value={values.stepId}
										onChange={handleStepChange}
									/>

									<PrioritySelect
										active={activeMenu.label === "all"}
										value={values.priority}
										onChange={handlePriorityChange}
									/>

									<div className='col-12 col-md-6 col-lg-3'>
										<DateRangePicker
											dateRange={dateRange}
											onDateSelect={handleDateRangeChange}
											label='Tarix aralığı'
										/>
									</div>

									<StatusSelect
										active={activeMenu.label === "all"}
										value={values.completed}
										onChange={handleStatusChange}
									/>

									<CategorySelect
										active={activeMenu.label === "all" && activeStep.canSearchByCategory}
										value={values.categoryId}
										onChange={handleCategoryChange}
									/>

									<div className='col-12 col-md-6 col-lg-3'>
										<NumberField
											label='Müraciət nömrəsi'
											name='requestNum'
											value={values.requestNum}
											onChange={handleRequestNumChange}
											min={1}
											max={999999}
										/>
									</div>

									{activeMenu.type === "PROBLEM" && (
										<div className='col-12 col-md-6 col-lg-3'>
											<NumberField
												label='Şikayət nömrəsi'
												name='problemNub'
												value={values.problemNum}
												onChange={handleProblemNumChange}
												min={1}
												max={999999}
											/>
										</div>
									)}

									{/* {activeMenu.type === "PROBLEM" && activeStep.canSearchByVerifiedDate && (
									<div className='col-12 col-md-6 col-lg-3'>
										<DatePicker
											date={values.verifiedDateStr}
											onDateSelect={handleVerifiedDateChange}
											label='Təsdiqləmə tarixi'
										/>
									</div>
								)} */}
								</div>
							</form>
						</div>

						<div className='px-10 py-6 d-flex justify-end'>
							<Button type='submit' form={formId}>
								<Icon icon='search' className='mr-2' />
								Axtar
							</Button>

							<div className='ml-6'>
								<Button type='reset' form={formId} disabled={!dirty}>
									<Icon icon='broom' className='mr-2' />
									Təmizlə
								</Button>
							</div>

							<div className='ml-6'>
								<Button onClick={() => setActive(false)}>Bağla</Button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Filters;
