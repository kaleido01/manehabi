const express = require("express");
const { ApolloServer } = require("apollo-server");
const typeDefs = require("./typeDefs.graphql");
const resolvers = require("./resolvers");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser());

const db = require("./config/keys").mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

const server = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 4000;

server.listen({ port }).then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
