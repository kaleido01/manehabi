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

app.use(async (req, res, next) => {});

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: async ({ req }) => {
		const token = req.headers["authorization"];
		if (token === null) {
			next();
		}
		try {
			const currentUser = await jwt.verify(token, secret);
			return { currentUser };
		} catch (err) {
			console.log(err);
		}
	}
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static("/client/build"));
}

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
