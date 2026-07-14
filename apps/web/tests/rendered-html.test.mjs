import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request("http://localhost/", { headers: { accept: "text/html" } }), {
    ASSETS: {
      fetch: async (request) => {
        const pathname = new URL(request.url).pathname;
        if (pathname === "/" || pathname === "/index.html") {
          return new Response(await readFile(new URL("../dist/client/index.html", import.meta.url)), {
            headers: { "content-type": "text/html; charset=utf-8" },
          });
        }
        return new Response("Not found", { status: 404 });
      },
    },
  }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the iGoal Manager Home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<html[^>]*lang="vi"/i);
  assert.match(html, /iGoal/);
  assert.match(html, /Manager Home|Chào buổi sáng/);
  assert.match(html, /Review Queue/);
  assert.match(html, /Risk Center/);
  assert.match(html, /AI weekly summary/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("serves the static app shell for client-side routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test-route", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const html = await readFile(new URL("../dist/client/index.html", import.meta.url));
  const response = await worker.fetch(new Request("http://localhost/review/RV-1042"), {
    ASSETS: {
      fetch: async (request) => new URL(request.url).pathname === "/index.html"
        ? new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } })
        : new Response("Not found", { status: 404 }),
    },
  });
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Review Queue/);
});
