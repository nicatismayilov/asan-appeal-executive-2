import { Route, Redirect } from "react-router-dom";

interface Props {
	component: React.FC;
	isAuth: boolean;
	isMain: boolean;
	path: string;
	exact?: boolean;
	redirect?: string;
}

const ProtectedRoute: React.FC<Props> = (props) => {
	const { component: Component, isAuth, isMain, path, exact = false, redirect = "/" } = props;

	if ((isMain && isAuth) || (!isMain && !isAuth))
		return <Route component={Component} exact={exact} path={path} />;
	else return <Redirect to={redirect} />;
};

export default ProtectedRoute;
