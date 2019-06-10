import React from "react";

import { Query } from "react-apollo";
import { Redirect } from "react-router-dom";

import { GET_CURRENT_USER } from "../queries";
import Loader from "./shered/Loader";

const withAuth = conditionFunc => Component => props => (
	<Query query={GET_CURRENT_USER}>
		{({ data, loading, refetch }) => {
			if (loading) return <Loader />;

			return conditionFunc(data) ? (
				<Component {...props} />
			) : (
				<Redirect to="/" />
			);
		}}
	</Query>
);

export default withAuth;
