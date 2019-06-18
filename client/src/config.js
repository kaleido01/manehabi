export const API_URL =
	process.env.NODE_ENV === "production"
		? "https://manehabi.herokuapp.com"
		: "http://127.0.0.1:4000";
