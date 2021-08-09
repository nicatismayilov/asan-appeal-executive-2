import { useEffect, useRef, useMemo } from "react";
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { useFormik } from "formik";

import { getRequest } from "store/requests/actions";
import { selectRequest, selectRequestLoading } from "store/requests/selectors";
import { selectActiveMenu } from "store/user/selectors";

import Spinner from "components/Spinner";
import Scrollbar from "components/Scrollbar";
import Icon from "components/Icon";
import Accordion, { AccordionData } from "components/Accordion";
// import Map from "components/Map";
// import TextArea from "components/TextArea";
import HistoryItem from "./components/HistoryItem";

import generateKey from "utils/generateKey";

import "./styles.scss";

interface RouteParams {
	id: string;
}

const RequestDetails: React.FC = () => {
	const params = useParams<RouteParams>();
	const history = useHistory();
	const match = useRouteMatch();
	const dispatch = useDispatch();
	const requestLoading = useSelector(selectRequestLoading);
	const request = useSelector(selectRequest);
	const activeMenu = useSelector(selectActiveMenu);
	const mapContainerRef = useRef<HTMLDivElement>(null);
	// const mapContainerRect = useRect(mapContainerRef, { observe: true });

	const accordionData = useMemo<AccordionData[]>(() => {
		return [
			{
				title: "Tarixçə",
				content: (
					<div className='d-flex flex-column'>
						{request.textHistory?.map((history) => (
							<HistoryItem key={generateKey()} history={history} />
						))}
					</div>
				),
			},
		];
	}, [request]);

	const handleGoBack = () => {
		const parentUrl = match.url.split(`/${params.id}`)[0];
		history.push(parentUrl);
	};

	useEffect(() => {
		dispatch(getRequest({ id: params.id, key: activeMenu.name }));
	}, [activeMenu.name, dispatch, params.id]);

	return (
		<div className='request-details-page main-bg-color'>
			<Scrollbar>
				<div className='px-10 py-6 d-flex align-center'>
					<button className='back-btn' onClick={handleGoBack}>
						<Icon icon='back' width={20} height={20} />
					</button>

					<h1 className='headline font-weight-medium grey-3--text'>Müraciət məlumatları</h1>
				</div>

				<div className='pa-10'>
					{requestLoading && (
						<div className='d-flex w-100 jutify-center'>
							<Spinner />
						</div>
					)}

					{!requestLoading && (
						<div className='row'>
							<div className='col-6 pr-2'>
								<div className='card mb-5 d-flex flex-column pa-4'>
									<div className='body-1'>Müraciətin nömrəsi: {request.number}</div>
									<div className='body-1'>
										Müraciət edən: {request.citizen.firstName} {request.citizen.lastName},{" "}
										{request.citizen.fatherName}
									</div>
									<div className='body-1'>Əlaqə nömrəsi: {request.citizen.mobilePhoneNumber}</div>
								</div>
								<Accordion data={accordionData} />

								<form className='row'></form>
							</div>

							<div ref={mapContainerRef} className='col-6 pl-2'>
								{/* {mapContainerRect && (
									<Map
										width='100%'
										height={mapContainerRect.width / 2}
										longitude={request.longitude}
										latitude={request.latitude}
										center={[request.latitude, request.longitude]}
										zoom={15}
									/>
								)} */}
							</div>
						</div>
					)}
				</div>
			</Scrollbar>
		</div>
	);
};

export default RequestDetails;
