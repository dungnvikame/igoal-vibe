import { readFile, rm, writeFile } from "node:fs/promises";

const serverEntry = new URL("../dist/server/index.js", import.meta.url);
const clientIndex = new URL("../dist/client/index.html", import.meta.url);
const wranglerConfig = new URL("../dist/server/wrangler.json", import.meta.url);
const obsoleteServerArtifacts = [
  new URL("../dist/server/.vite", import.meta.url),
  new URL("../dist/server/.wrangler", import.meta.url),
  new URL("../dist/server/assets", import.meta.url),
  new URL("../dist/server/ssr", import.meta.url),
  new URL("../dist/server/__vite_rsc_assets_manifest.js", import.meta.url),
  new URL("../dist/server/image-config.json", import.meta.url),
  new URL("../dist/server/vinext-externals.json", import.meta.url),
  new URL("../dist/server/vinext-server.json", import.meta.url),
];

const moduleUrl = new URL(serverEntry.href);
moduleUrl.searchParams.set("static-build", Date.now().toString());
const { default: appWorker } = await import(moduleUrl.href);

const response = await appWorker.fetch(
  new Request("https://igoal-vibe-h2.ikame-global-8100.chatgpt.site/", {
    headers: { accept: "text/html" },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Unable to prerender iGoal: ${response.status}`);
}

const html = await response.text();
if (!html.includes("iGoal") || !html.includes("Review Queue")) {
  throw new Error("Prerendered iGoal shell is incomplete");
}

await writeFile(clientIndex, html, "utf8");

const staticWorker = `const INDEX_PATH = "/index.html";

function copyRequest(request, url) {
  return new Request(url, {
    method: request.method === "HEAD" ? "GET" : request.method,
    headers: request.headers,
    redirect: "follow",
  });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isDocument = request.method === "GET" || request.method === "HEAD";

    if (isDocument && (url.pathname === "/" || url.pathname === INDEX_PATH)) {
      const response = await env.ASSETS.fetch(copyRequest(request, new URL(INDEX_PATH, url)));
      return request.method === "HEAD"
        ? new Response(null, { status: response.status, headers: response.headers })
        : response;
    }

    const assetResponse = await env.ASSETS.fetch(request);
    if (assetResponse.status !== 404 || !isDocument) return assetResponse;

    const fallback = await env.ASSETS.fetch(copyRequest(request, new URL(INDEX_PATH, url)));
    return request.method === "HEAD"
      ? new Response(null, { status: fallback.status, headers: fallback.headers })
      : fallback;
  },
};
`;

await writeFile(serverEntry, staticWorker, "utf8");

const wrangler = JSON.parse(await readFile(wranglerConfig, "utf8"));
wrangler.assets = {
  ...(wrangler.assets ?? {}),
  directory: "../client",
  binding: "ASSETS",
  run_worker_first: true,
};
wrangler.compatibility_flags = [];
wrangler.rules = [];
await writeFile(wranglerConfig, JSON.stringify(wrangler), "utf8");

await Promise.all(
  obsoleteServerArtifacts.map((path) => rm(path, { recursive: true, force: true })),
);

const writtenHtml = await readFile(clientIndex, "utf8");
if (!writtenHtml.includes("/_next/") && !writtenHtml.includes("/assets/")) {
  throw new Error("Prerendered page has no client assets");
}
