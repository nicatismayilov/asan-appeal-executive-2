import { memo, Suspense, lazy } from "react";
import { Route, Redirect, useRouteMatch, Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PageLoader from "layout/PageLoader";

const Requests = lazy(() => import("pages/Requests"));
const RequestDetails = lazy(() => import("pages/RequestDetails"));

const Content: React.FC = () => {
	const match = useRouteMatch();
	const location = useLocation();

	return (
		<Suspense fallback={<PageLoader />}>
			<AnimatePresence exitBeforeEnter>
				<Switch location={location} key={location.pathname}>
					<Route exact path={`${match.path}/requests/:menu`} component={Requests} />
					<Route path={`${match.path}/requests/:menu/:id`} component={RequestDetails} />

					<Redirect to={`${match.path}`} />
				</Switch>
			</AnimatePresence>
		</Suspense>
	);
};

export default memo(Content);
