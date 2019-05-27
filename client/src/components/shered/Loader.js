import React from "react";
import { css } from "@emotion/core";
import { HashLoader } from "react-spinners";

const override = css`
	display: block;
	margin: 0 auto;
`;

const Loader = () => {
	return <HashLoader color={"#123abc"} size={50} css={override} />;
};

export default Loader;
