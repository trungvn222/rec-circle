import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";

// const
import { HOME_ROUTE } from "consts/route";

// components
const Home = lazy(() => import("containers/Home"));

function RootRoute() {
	return (
		<Switch>
			<Route path={HOME_ROUTE.path} exact component={Home} />
		</Switch>
	);
}

export default RootRoute;
