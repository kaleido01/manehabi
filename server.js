const express = require("express");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs.graphql");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser());

const db = require("./config/keys").mongoURI;
const secret = require("./config/keys").secret;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

app.use(async (req, res, next) => {});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const token = req.headers["authorization"];
		console.log(token);
		if (token === null) {
			next();
		}
		try {
			const currentUser = await jwt.verify(token, secret);
			console.log(currentUser);
			return { currentUser };
		} catch (err) {
			console.log(err);
		}
	}
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
