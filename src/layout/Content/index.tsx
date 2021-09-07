import { memo, Suspense, lazy } from "react";
import { Route, Redirect, useRouteMatch, Switch, useLocation, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PageLoader from "layout/PageLoader";
import Scrollbar from "components/Scrollbar";

const Requests = lazy(() => import("pages/Requests"));
const CitizenRequest = lazy(() => import("pages/CitizenRequest"));

interface RouteParams {
	menu: string;
}

const Request: React.FC = () => {
	const routeParams = useParams<RouteParams>();

	switch (routeParams.menu) {
		case "citrequest":
		case "cancelled":
		case "obscure":
		case "notbelong":
		case "citanswered":
		case "allreq":
			return <CitizenRequest />;

		default:
			return null;
	}
};

const Content: React.FC = () => {
	const match = useRouteMatch();
	const location = useLocation();

	return (
		<Scrollbar>
			<Suspense fallback={<PageLoader />}>
				<AnimatePresence exitBeforeEnter>
					<Switch location={location} key={location.pathname}>
						<Route exact path={`${match.path}/requests/:menu`} component={Requests} />
						<Route path={`${match.path}/requests/:menu/:id`} component={Request} />

						<Redirect to={`${match.path}`} />
					</Switch>
				</AnimatePresence>
			</Suspense>
		</Scrollbar>
	);
};

export default memo(Content);
