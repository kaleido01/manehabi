const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const cookieParser = require("cookie-parser"); // parse cookie header
const cookieSession = require("cookie-session");

require("./config/passport");

const { typeDefs } = require("./typeDefs.graphql");
const { resolvers } = require("./resolvers");

const { ApolloServer } = require("apollo-server-express");

const app = express();

const createToken = (user, secret, expiresIn) => {
	const { username, email } = user;
	const token = jwt.sign({ username, email }, secret, { expiresIn });
	return token;
};
const db = require("./config/keys").mongoURI;
const secret = require("./config/keys").secret;
const baseClientURL = require("./config/keys").baseClientURL;
const baseURL =
	process.env.NODE_ENV === "production"
		? "https://manehabi.herokuapp.com"
		: "http://localhost:3000";

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

const corsOption = {
	origin: ["https://manehabi.herokuapp.com"],
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true
};
app.use(cors("*"));

app.use(passport.initialize());

const cookieKeys = require("./config/keys").cookieKeys;
app.use(
	cookieSession({
		name: "session",
		keys: [cookieKeys],
		maxAge: 24 * 60 * 60 * 100
	})
);

app.use(cookieParser());
app.use(passport.session());

app.get("/return-json", (req, res, next) => {
	res.redirect("/signup");
});
app.get(`/auth/twitter`, passport.authenticate("twitter"));
app.get(
	"/auth/twitter/callback",
	passport.authenticate("twitter", {
		failureRedirect: "/signin"
	}),
	(req, res) => {
		console.log(req.user);

		const token = createToken(req.user, secret, "1hr");
		res.redirect(`${baseURL}/habits?token=${token}`);
	}
);

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		let token = null;
		let currentUser = null;

		try {
			token = req.headers["authorization"];
			if (token) {
				currentUser = await jwt.verify(token, secret);
				console.log("aaa");
			}
		} catch (err) {}
		return { currentUser };
	},
	// playground: {
	// 	endpoint: `http://localhost:4000/graphql`,
	// 	settings: {
	// 		"editor.theme": "light"
	// 	}
	// },
	formatError(err) {
		if (!err.originalError) {
			return err;
		}
		const data = err.originalError.data;
		const message = err.message || "何かエラーが発生しました。";
		const code = err.originalError.code;
		return { message, status: code, data };
	}
});

server.applyMiddleware({ app });

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server listhening on PORT ${PORT}`);
});
