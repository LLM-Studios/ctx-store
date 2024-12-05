import { app } from "../src";
import { createClient } from "@hey-api/openapi-ts";

const docs = await app
	.handle(new Request("http://localhost/docs/json"))
	.then((res) => res.json());

console.log(JSON.stringify(docs, null, 2));

await Bun.write("openapi.json", JSON.stringify(docs, null, 2));

await createClient({
	client: "@hey-api/client-fetch",
	input: "openapi.json",
	output: "client",
});

process.exit(0);
