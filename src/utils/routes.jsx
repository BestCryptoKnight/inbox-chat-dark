import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import Inbox from '../pages/Inbox';


export const PublicRoutes = () => {
	return (
		<Switch>
			<Route exact path="/inbox" component={Inbox} />
			<Route exact path="/" component={Dashboard} />
			<Route render={() => <Redirect to="/inbox" />} />
		</Switch>
	);
};
