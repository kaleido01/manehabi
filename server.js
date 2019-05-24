const express = require("express");

const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
	console.log(`Server lithening on ${PORT}`);
});
