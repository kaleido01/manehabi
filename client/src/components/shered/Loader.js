import React from "react";
import { css } from "@emotion/core";
import { HashLoader } from "react-spinners";
import "./Loader.css";

const override = css`
	display: block;
	margin: 0 auto;
`;

const Loader = () => {
	return <HashLoader color={"#123abc"} size={50} css={override} />;
};

export const InitialLoader = () => {
	return <div className="initialLoader" />;
};

export default Loader;
