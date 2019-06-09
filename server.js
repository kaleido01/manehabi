const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
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

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

const corsOption = {
	origin: baseClientURL,
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	credentials: true
};

app.use(cors(corsOption));

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

app.get("/auth/twitter", passport.authenticate("twitter"));
app.get(
	"/auth/twitter/callback",
	passport.authenticate("twitter", {
		failureRedirect: `${baseClientURL}/signin`
	}),
	(req, res) => {
		console.log(req.user);

		const token = createToken(req.user, secret, "1hr");
		res.redirect(`${baseClientURL}/habits?token=${token}`);
	}
);

app.use(async (req, res, next) => {
	let token = null;
	let currentUser = null;

	try {
		token = req.headers["authorization"];
		if (token) {
			currentUser = await jwt.verify(token, secret);
			req.currentUser = currentUser;
		}
	} catch (err) {
		console.error(`Unable to authenticate user with token`);
	}
	next();
});

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
			}
		} catch (err) {
			console.error(`Unable to authenticate user with token`);
		}
		return { currentUser };
	}
	// playground: {
	//   endpoint: `http://localhost:4000/graphql`,
	//   settings: {
	//     'editor.theme': 'light'
	//   }
	// }
});

server.applyMiddleware({ app });

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server listhening on PORT ${PORT}`);
});
