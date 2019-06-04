const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require("body-parser");

const User = require("./models/User");
const Habit = require("./models/Habit");
const HabitRecord = require("./models/HabitRecord");

const { typeDefs } = require("./typeDefs.graphql");
const { resolvers } = require("./resolvers");

const { ApolloServer } = require("apollo-server-express");

const app = express();

const db = require("./config/keys").mongoURI;
const secret = require("./config/keys").secret;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

app.use(cors("*"));

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

// app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

// GraphQL: Schema
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
		console.log("hi there");
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server listhening on PORT ${PORT}`);
});
