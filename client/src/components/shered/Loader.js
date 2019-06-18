import React from "react";
import { css } from "@emotion/core";
import { HashLoader, PacmanLoader } from "react-spinners";
import "./Loader.css";

const override = css`
	display: block;
	margin: 0 auto;
	z-index: 10000000;
`;

const Loader = () => {
	return <HashLoader color={"#123abc"} size={50} css={override} />;
};

export const WelcomeLoader = () => {
	return (
		<div className="WelcomeLoader">
			<div className="spinner">
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</div>
		</div>
	);
};
export const Pacman = () => {
	return (
		<div className="Pacman">
			<PacmanLoader color={"#123abc"} size={50} css={override} />;
		</div>
	);
};

export const InitialLoader = () => {
	return <div className="initialLoader" />;
};

export default Loader;
