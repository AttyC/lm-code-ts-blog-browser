import * as express from "express";
import { Express, json } from "express";
import { getAllPosts } from "./routes/get_posts";
import { getAllUsers } from "./routes/get_users";

export function initialiseRoutes(app: Express) {
	console.log("🏗️  Setting up routers...");

	addBaseRouter(app);

	addAPIRoutes(app);
}

function addBaseRouter(app: Express) {
	console.log("🛠️  Creating base router...");

	const baseRouter = express.Router();

	baseRouter.use((req, res, next) => {
		res.header("Access-Control-Allow-Methods", "GET");
		console.log(`📨 ${req.url}`);
		next();
	});

	console.log("🏠❤️‍🩹  Adding home health check route...");
	baseRouter.get("/", (req, res) => {
		res.status(200).send("👍 Okay! The server is responding! 🙌");
	});

	console.log("🛠️  Applying browseable router to Express server...");
	app.use("/", baseRouter);
}

// this function adds all the routes we can access by going to /api/[someRoute]
function addAPIRoutes(app: Express) {
	console.log("🛠️  Creating API router...");

	const apiRouter = express.Router();
	apiRouter.use((req, res, next) => {
		// we'll use this router to return specifically JSON
		res.setHeader("Content-Type", "application/json");
		next();
	});

	// this route allows the client to "send a message" to the server
	console.log("📨  Adding messaging route...");
	apiRouter.post("/send/", (req, res) => {
		const { body } = req;

		// we don't do anything with the message, but let's echo it back in the console
		console.log(`👋 Received "${body.message}"`);

		// reply with a success boolean
		res.status(200).send({ success: true });
	});

	// now we'll add some routes that let us browse some blog posts
	console.log("✍️  Adding blog post routes...");
	apiRouter.get("/posts/all", (req, res) => {
		res.status(200).send(JSON.stringify(getAllPosts()));
	});

	apiRouter.get("/posts/:id", (req, res) => {
		const post = getAllPosts().find((p) => p.id === req.params.id);
		if (post !== undefined)
			res.status(200).send(JSON.stringify({ postFound: true, ...post }));
		else res.status(200).send(JSON.stringify({ postFound: false }));
	});

	console.log("✍️  Adding user routes...");
	apiRouter.get("/users/all", (req, res) => {
		res.status(200).send(JSON.stringify(getAllUsers()));
	});

	// ❗ [1] See README

	apiRouter.get("/users/:id", (req, res) => {
		res
			.status(200)
			.send(
				JSON.stringify(getAllUsers().filter((u) => u.id === req.params.id))
			);
	});

	console.log("🛠️  Applying API router to Express server...");
	app.use("/api", apiRouter);
}
