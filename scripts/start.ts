#!/usr/bin/env bun

const main = async () => {
	console.log("Starting ctx-store services...");

	const dockerCompose = Bun.spawn(["docker-compose", "up", "-d"], {
		stderr: "inherit",
		stdout: "inherit",
		onExit(proc, exitCode, signalCode, error) {
			if (exitCode === 0) {
				console.log("ctx-store services are running!");
				console.log("API is available at: http://localhost:3003");
			}
		},
	});
};

main().catch((error) => {
	console.error("Error:", error);
	process.exit(1);
});
