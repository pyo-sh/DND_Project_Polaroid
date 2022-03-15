const dotenv = require("dotenv");
const express = require("express");
const http = require("http");
const passport = require("passport");
const cors = require("cors");
const apiRouter = require("./routes/index.js");

require("./config/passport");

// using environments
dotenv.config();

// setting express server
const app = express();
const server = http.createServer(app);
const FRONT_BASE_URL = process.env.FRONT_BASE_URL || "localhost";
const PORT = process.env.PORT || 5000;
app.set("port", PORT);
app.use(
	cors({
		origin: [FRONT_BASE_URL],
		credentials: true,
	})
);

// using body-parser built in express
// refs: https://expressjs.com/en/4x/api.html#express-json-middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport middleware
app.use(passport.initialize());

// uses api
app.use("/api", apiRouter);

server.listen(PORT);
server.on("listening", () => {
	const addr = server.address();
	const bind =
		typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
	console.log(bind);
});
