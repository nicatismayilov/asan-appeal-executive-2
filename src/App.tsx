import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Switch, Redirect } from "react-router-dom";

import { selectIsAuthenticated } from "store/auth/selectors";

import Alerts from "layout/Alerts";
import PageLoader from "layout/PageLoader";
import ProtectedRoute from "components/ProtectedRoute";

import "./index.scss";

const Login = lazy(() => import("views/Login"));
const Main = lazy(() => import("views/Main"));

const App: React.FC = () => {
	const isAuth = useSelector(selectIsAuthenticated);

	return (
		<div className='app'>
			<Suspense fallback={<PageLoader />}>
				<Switch>
					<ProtectedRoute
						isAuth={isAuth}
						component={Login}
						isMain={false}
						path='/signin'
						redirect='/main'
						exact={true}
					/>

					<ProtectedRoute
						isAuth={isAuth}
						component={Main}
						isMain={true}
						path='/main'
						exact={false}
						redirect='/signin'
					/>

					<Redirect to='/main' />
				</Switch>
			</Suspense>

			<Alerts />
		</div>
	);
};

export default App;
