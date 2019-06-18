import React, { useState, useContext } from "react";
import { Message } from "semantic-ui-react";
import { MessageContext } from "../../index";

const ShowMessage = ({ open, success, message }) => {
	console.log(open, success, message);

	return open ? <Message success={success}>{message}</Message> : null;
};

export default ShowMessage;
