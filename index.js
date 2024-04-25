import fs from "node:fs";
import path from "node:path";

function createVercelConfig({ main = "index.js", dest = "/", version = 2 }) {
	const filePath = path.resolve(process.cwd(), "vercel.json"); // Create in current working directory

	const config = {
		version: Number.parseFloat(version),
		builds: [
			{
				src: main,
				use: "@vercel/node", // Optional Node.js build
			},
		],
		routes: [
			{
				src: "/(.*)",
				dest: dest,
			},
		],
	};

	try {
		fs.writeFileSync(filePath, JSON.stringify(config, null, 2), "utf8"); // Pretty-printed JSON
		console.log("vercel.json created successfully!");
	} catch (error) {
		console.error("Error creating vercel.json:", error.message);
	}
}

function getArgValue(argName) {
	const argIndex = args.findIndex((command) => command === argName);

	if (argIndex !== -1 && args.length > argIndex + 1) {
		return args[argIndex + 1];
	}

	return;
}

const args = process.argv.slice(2);

createVercelConfig({
	main: getArgValue("--main"),
	dest: getArgValue("--dest"),
	version: getArgValue("--version"),
});
