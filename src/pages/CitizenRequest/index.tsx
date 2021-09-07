import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRect } from "@reach/rect";
import { motion, Transition } from "framer-motion";
import { useFormik } from "formik";
import { useInView } from "react-intersection-observer";

import { getRequest } from "store/requests/actions";
import { getJoinedRequests } from "store/requests/actions";

import {
	selectRequest,
	selectRequestLoading,
	selectJoinedRequests,
	selectJoinedRequestsLoading,
	selectJoinedRequestsTotalCount,
} from "store/requests/selectors";
import { selectActiveMenu } from "store/user/selectors";
import { selectMainContentHeight } from "store/layout/selectors";

import Spinner from "components/Spinner";
import Icon from "components/Icon";
import Map from "components/Map";
import MediaGallery from "layoutComponents/MediaGallery";
import MediaDisplay from "layoutComponents/MediaDisplay";
import NearRequestsTable from "layoutComponents/NearRequestsTable";
import Checkbox from "components/Checkbox";
import Table from "components/Table";

import HistoryItem from "./components/HistoryItem";
import TitleItem from "./components/TitleItem";
import Form from "./components/Form";

import { Request, RequestFile } from "types/requests";

import getRequestNumberString from "utils/getRequestNumberString";
import getFullName from "utils/getFullName";
import { computeDistanceIndicatorStyles } from "./utils";
import { validationSchema } from "./form";
import { requestsTableColumns } from "../Requests/tableColumns";

import "./styles.scss";

interface RouteParams {
	id: string;
}

const transition: Transition = { damping: 50, stiffness: 900, type: "spring" };

const RequestDetails: React.FC = () => {
	const params = useParams<RouteParams>();
	const history = useHistory();
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const requestLoading = useSelector(selectRequestLoading);
	const request = useSelector(selectRequest);
	const activeMenu = useSelector(selectActiveMenu);
	const mainContentHeight = useSelector(selectMainContentHeight);
	const joinedRequests = useSelector(selectJoinedRequests);
	const joinedRequestsLoading = useSelector(selectJoinedRequestsLoading);
	const joinedRequestsTotalCount = useSelector(selectJoinedRequestsTotalCount);
	const [historyActive, setHistoryActive] = useState(false);
	const [activeFile, setActiveFile] = useState<RequestFile>();
	const [activeFileIndex, setActiveFileIndex] = useState(-1);
	const [comparisonActive] = useState(false);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapContainerRect = useRect(mapContainerRef, { observe: true });
	const formik = useFormik({
		initialValues: request,
		onSubmit: handleFormikSubmit,
		enableReinitialize: true,
		validationSchema,
		validateOnBlur: false,
		validateOnChange: false,
	});
	const { values, setFieldValue } = formik;
	const { ref: joinedRequestsTableRef, inView: joinedRequestsTableInView } = useInView({
		triggerOnce: true,
	});

	function handleFormikSubmit(values: Request) {
		console.log(values);
	}

	const handleGoBack = () => {
		const parentUrl = match.url.split(`/${params.id}`)[0];
		history.push(parentUrl);
	};

	const handleActiveFileChange = useCallback((f: RequestFile | undefined, index: number) => {
		setActiveFile(f);
		setActiveFileIndex(index);
	}, []);

	const handleCheckboxChange = useCallback(
		(value: boolean | "indefinite") => {
			const { filesList = [] } = values;

			const newFilesList = filesList.map((f) => {
				if (f.path === activeFile?.path) return { ...f, sameAddress: !!value };
				else return f;
			});

			setFieldValue("filesList", newFilesList);
		},
		[activeFile?.path, setFieldValue, values]
	);

	const requestCoords = useMemo(() => {
		return { lat: request.latitude, lng: request.longitude };
	}, [request.latitude, request.longitude]);

	const activeFileCoords = useMemo(() => {
		return {
			lat: activeFile?.latitude || 0,
			lng: activeFile?.longitude || 0,
		};
	}, [activeFile?.latitude, activeFile?.longitude]);

	const nearRequestsTableColumns = useMemo(() => {
		return requestsTableColumns({ canEdit: true, buttonHandler: () => {} });
	}, []);

	useEffect(() => {
		const id = params.id;
		const key = activeMenu.url.split("/")[1];

		dispatch(getRequest({ id, key }));
	}, [activeMenu, activeMenu.name, dispatch, params.id]);

	useEffect(() => {
		if (activeFileIndex === -1 && values.filesList) {
			setActiveFile(values.filesList[0]);
			setActiveFileIndex(0);
		} else if (activeFileIndex === -1 && !values.filesList) {
			setActiveFile(undefined);
		} else if (activeFileIndex !== -1 && values.filesList) {
			setActiveFile(values.filesList[activeFileIndex]);
		}
	}, [activeFileIndex, values.filesList]);

	useEffect(() => {
		if (joinedRequestsTableInView) {
			const id = params.id;
			const key = activeMenu.url.split("/")[1];

			dispatch(getJoinedRequests({ limit: 15, offset: 0, id, key }));
		}
	}, [activeMenu.url, dispatch, joinedRequestsTableInView, params.id]);

	return (
		<div className='request-details-page main-bg-color'>
			<div className='px-10 py-6 d-flex align-center'>
				<button className='back-btn' onClick={handleGoBack}>
					<Icon icon='back' width={20} height={20} />
				</button>

				<h1 className='headline font-weight-medium grey-3--text'>Müraciət məlumatları</h1>
			</div>

			<div className='pa-10'>
				{requestLoading && (
					<div className='d-flex w-100 h-100vh justify-center align-center'>
						<Spinner size={50} />
					</div>
				)}

				{!requestLoading && (
					<>
						<div className='card py-6 px-10 mb-10'>
							<div className='row'>
								<div className='col-11'>
									<div className='row'>
										<div className='col-4'>
											<TitleItem
												label='Müraciətin nömrəsi'
												text={getRequestNumberString(request.number)}
											/>
										</div>

										<div className='col-4'>
											<TitleItem label='Müraciət edən' text={getFullName(request.citizen)} />
										</div>

										<div className='col-4'>
											<TitleItem label='Əlaqə nömrəsi' text={request.citizen.mobilePhoneNumber} />
										</div>
									</div>
								</div>

								<div
									className='col-1 d-flex align-center justify-center'
									style={{ height: "100% !important" }}
								>
									<button
										className='history-toggle'
										onClick={() => setHistoryActive((prev) => !prev)}
									>
										<Icon icon={historyActive ? "chevron-up" : "chevron-down"} />
									</button>
								</div>
							</div>

							{request.textHistory && (
								<motion.div
									animate={{ height: historyActive ? "auto" : 0 }}
									className='overflow-hidden'
									initial={false}
									transition={transition}
								>
									<div className='history-container'>
										<div className='px-10 py-6 headline grey-4--text font-weight-medium'>
											Tarixçə
										</div>

										<div className='pb-10 pr-10 pl-10 pt-4'>
											{request.textHistory.map((history, idx) => (
												<HistoryItem key={idx} history={history} />
											))}
										</div>
									</div>
								</motion.div>
							)}
						</div>

						<div className='mb-10'>
							<Form request={request} formik={formik} />
						</div>

						<div ref={mapContainerRef} className='mb-10'>
							<div className='card pa-10' style={{ borderRadius: 20 }}>
								<Map
									width='100%'
									height={Math.min((mapContainerRect?.width || 0) * 0.5, mainContentHeight)}
									longitude={request.longitude}
									latitude={request.latitude}
									center={requestCoords}
									zoom={15}
								/>
							</div>
						</div>

						<div className='mb-10 card pa-10'>
							<div className='mb-10'>
								<div className='row'>
									<div className='col-7'>
										<MediaDisplay file={activeFile} />
									</div>

									<div className='col-5'>
										<div className='px-10'>
											<div className='d-flex flex-column mb-15'>
												<div className='headline font-weight-medium grey-4--text text-left mb-5'>
													{activeFile && activeFile.longitude && activeFile.latitude
														? "Faylın xəritədə yeri"
														: "Fayla uyğun koordinat yoxdur"}
												</div>

												{activeFile && activeFile.longitude && activeFile.latitude && (
													<Map
														width='100%'
														height={300}
														longitude={activeFile.longitude}
														latitude={activeFile.latitude}
														center={activeFileCoords}
														zoom={15}
													/>
												)}
											</div>

											{activeFile && !comparisonActive && (
												<div className='d-flex flex-column mb-15'>
													<div className='headline font-weight-medium grey-4--text text-left mb-5'>
														Əsas yer ilə məsafəsi
													</div>

													<div
														className='distance-indicator'
														style={computeDistanceIndicatorStyles(
															+(activeFile.distance?.toFixed(1) || 0)
														)}
													>
														{activeFile.distance?.toFixed(1) || 0} metr
													</div>
												</div>
											)}

											{activeFile && !comparisonActive && (
												<div className='d-flex align-center'>
													<Checkbox
														value={activeFile.sameAddress}
														onChange={handleCheckboxChange}
														disabled={request.filesList ? request.filesList?.length <= 1 : true}
													/>

													<div className='grey-4--text text-subtitle-1 ml-5'>
														Eyni ünvan/Eyni müraciət
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>

							{values.filesList && (
								<MediaGallery
									files={values.filesList}
									activeFile={activeFile}
									activeIndex={activeFileIndex}
									onChange={handleActiveFileChange}
								/>
							)}
						</div>

						<div className='mb-10'>
							<div ref={joinedRequestsTableRef}>
								<Table
									data={joinedRequests}
									columns={requestsTableColumns({ canEdit: true, buttonHandler: () => {} })}
									totalCount={joinedRequestsTotalCount}
									onChange={() => {}}
									loading={joinedRequestsLoading}
									serverSide
									title='Qoşulmuş müraciətlər'
									checkable
								/>
							</div>
						</div>

						<div className='mb-10'>
							<NearRequestsTable
								checkable
								longitude={request.longitude}
								latitude={request.latitude}
								columns={nearRequestsTableColumns}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default RequestDetails;
