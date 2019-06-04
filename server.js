const express = require("express");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs.graphql");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser());

const db = require("./config/keys").mongoURI;
const secret = require("./config/keys").secret;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
	// Set static folder

	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		console.log("hi there");
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

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
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
