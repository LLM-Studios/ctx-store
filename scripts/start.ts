#!/usr/bin/env node

import { join } from "path";
import { existsSync } from "fs";
import { spawn } from "child_process";

const main = async () => {
	console.log("Starting ctx-store services...");

	// Get the directory where the package is installed
	const packageDir = new URL(".", import.meta.url).pathname;
	const dockerComposePath = join(packageDir, "..", "docker-compose.yaml");

	if (!existsSync(dockerComposePath)) {
		console.error("Error: docker-compose.yaml not found at", dockerComposePath);
		console.error("Make sure you have installed the package correctly.");
		process.exit(1);
	}

	const dockerCompose = spawn(
		"docker-compose",
		["-f", dockerComposePath, "up", "-d"],
		{
			stdio: "inherit",
		}
	);

	dockerCompose.on("error", (error) => {
		console.error("Failed to start services:", error.message);
		process.exit(1);
	});

	dockerCompose.on("exit", (code) => {
		if (code === 0) {
			console.log("ctx-store services are running!");
			console.log("API is available at: http://localhost:3003");
		} else {
			console.error("Failed to start services. Exit code:", code);
			process.exit(code ?? 1);
		}
	});
};

main().catch((error) => {
	console.error("Error:", error);
	process.exit(1);
});
