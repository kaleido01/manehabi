const express = require("express");

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser());

const db = require("./config/keys").mongoURI;

mongoose
	.connect(db)
	.then(() => console.log("MongoDB Connected"))
	.catch(err => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
	console.log(`Server lithening on ${PORT}`);
});
