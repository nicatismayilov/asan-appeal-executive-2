import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useRect } from "@reach/rect";
import { motion, Transition } from "framer-motion";

import { getRequest } from "store/requests/actions";

import { selectRequest, selectRequestLoading } from "store/requests/selectors";
import { selectActiveMenu } from "store/user/selectors";
import { selectMainContentHeight } from "store/layout/selectors";

import Spinner from "components/Spinner";
import Icon from "components/Icon";
import Map from "components/Map";
import MediaGallery from "layoutComponents/MediaGallery";
import MediaDisplay from "layoutComponents/MediaDisplay";

import HistoryItem from "./components/HistoryItem";
import TitleItem from "./components/TitleItem";
import Form from "./components/Form";

import { RequestFile } from "types/requests";

import getRequestNumberString from "utils/getRequestNumberString";
import getFullName from "utils/getFullName";

import "./styles.scss";

import files from "./files";

interface RouteParams {
	id: string;
}

const transition: Transition = { damping: 50, stiffness: 900, type: "spring", bounce: 0 };

const RequestDetails: React.FC = () => {
	const params = useParams<RouteParams>();
	const history = useHistory();
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const requestLoading = useSelector(selectRequestLoading);
	const request = useSelector(selectRequest);
	const activeMenu = useSelector(selectActiveMenu);
	const mainContentHeight = useSelector(selectMainContentHeight);
	const [historyActive, setHistoryActive] = useState(false);
	const [activeFile, setActiveFile] = useState<RequestFile>();
	const mapContainerRef = useRef<HTMLDivElement>(null);
	const mapContainerRect = useRect(mapContainerRef, { observe: true });

	const handleGoBack = () => {
		const parentUrl = match.url.split(`/${params.id}`)[0];
		history.push(parentUrl);
	};

	const handleMediaGalleryChange = useCallback((f: RequestFile) => {
		setActiveFile(f);
	}, []);

	const requestCoords = useMemo(() => {
		return { lat: request.latitude, lng: request.longitude };
	}, [request.latitude, request.longitude]);

	const activeFileCoords = useMemo(() => {
		return {
			lat: activeFile?.latitude || 0,
			lng: activeFile?.longitude || 0,
		};
	}, [activeFile?.latitude, activeFile?.longitude]);

	useEffect(() => {
		const id = params.id;
		const key = activeMenu.url.split("/")[1];

		dispatch(getRequest({ id, key }));
	}, [activeMenu, activeMenu.name, dispatch, params.id]);

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
							<Form request={request} />
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
											<div className='d-flex flex-column'>
												<div className='headline font-weight-medium gray-3--text text-left mb-10'>
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
										</div>
									</div>
								</div>
							</div>

							<MediaGallery files={files} onChange={handleMediaGalleryChange} />
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default RequestDetails;
