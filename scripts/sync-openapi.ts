import { app } from "../src";
import { createClient } from "@hey-api/openapi-ts";

const docs = await app
	.handle(new Request("http://localhost/docs/json"))
	.then((res) => res.json());

await Bun.write("openapi.json", JSON.stringify(docs, null, 2));

await createClient({
	client: "@hey-api/client-fetch",
	input: "openapi.json",
	output: "client/generated",
});

process.exit(0);
