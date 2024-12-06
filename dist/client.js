#!/usr/bin/env node

// node_modules/@hey-api/client-fetch/dist/index.js
var T = /\{[^{}]+\}/g;
var h = ({ allowReserved: i, name: n, value: e }) => {
  if (e == null)
    return "";
  if (typeof e == "object")
    throw new Error("Deeply-nested arrays/objects aren’t supported. Provide your own `querySerializer()` to handle these.");
  return `${n}=${i ? e : encodeURIComponent(e)}`;
};
var U = (i) => {
  switch (i) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var $ = (i) => {
  switch (i) {
    case "form":
      return ",";
    case "pipeDelimited":
      return "|";
    case "spaceDelimited":
      return "%20";
    default:
      return ",";
  }
};
var D = (i) => {
  switch (i) {
    case "label":
      return ".";
    case "matrix":
      return ";";
    case "simple":
      return ",";
    default:
      return "&";
  }
};
var j = ({ allowReserved: i, explode: n, name: e, style: a, value: o }) => {
  if (!n) {
    let r = (i ? o : o.map((c) => encodeURIComponent(c))).join($(a));
    switch (a) {
      case "label":
        return `.${r}`;
      case "matrix":
        return `;${e}=${r}`;
      case "simple":
        return r;
      default:
        return `${e}=${r}`;
    }
  }
  let s = U(a), t = o.map((r) => a === "label" || a === "simple" ? i ? r : encodeURIComponent(r) : h({ allowReserved: i, name: e, value: r })).join(s);
  return a === "label" || a === "matrix" ? s + t : t;
};
var C = ({ allowReserved: i, explode: n, name: e, style: a, value: o }) => {
  if (o instanceof Date)
    return `${e}=${o.toISOString()}`;
  if (a !== "deepObject" && !n) {
    let r = [];
    Object.entries(o).forEach(([u, l]) => {
      r = [...r, u, i ? l : encodeURIComponent(l)];
    });
    let c = r.join(",");
    switch (a) {
      case "form":
        return `${e}=${c}`;
      case "label":
        return `.${c}`;
      case "matrix":
        return `;${e}=${c}`;
      default:
        return c;
    }
  }
  let s = D(a), t = Object.entries(o).map(([r, c]) => h({ allowReserved: i, name: a === "deepObject" ? `${e}[${r}]` : r, value: c })).join(s);
  return a === "label" || a === "matrix" ? s + t : t;
};
var _ = ({ path: i, url: n }) => {
  let e = n, a = n.match(T);
  if (a)
    for (let o of a) {
      let s = false, t = o.substring(1, o.length - 1), r = "simple";
      t.endsWith("*") && (s = true, t = t.substring(0, t.length - 1)), t.startsWith(".") ? (t = t.substring(1), r = "label") : t.startsWith(";") && (t = t.substring(1), r = "matrix");
      let c = i[t];
      if (c == null)
        continue;
      if (Array.isArray(c)) {
        e = e.replace(o, j({ explode: s, name: t, style: r, value: c }));
        continue;
      }
      if (typeof c == "object") {
        e = e.replace(o, C({ explode: s, name: t, style: r, value: c }));
        continue;
      }
      if (r === "matrix") {
        e = e.replace(o, `;${h({ name: t, value: c })}`);
        continue;
      }
      let u = encodeURIComponent(r === "label" ? `.${c}` : c);
      e = e.replace(o, u);
    }
  return e;
};
var b = ({ allowReserved: i, array: n, object: e } = {}) => (o) => {
  let s = [];
  if (o && typeof o == "object")
    for (let t in o) {
      let r = o[t];
      if (r != null) {
        if (Array.isArray(r)) {
          s = [...s, j({ allowReserved: i, explode: true, name: t, style: "form", value: r, ...n })];
          continue;
        }
        if (typeof r == "object") {
          s = [...s, C({ allowReserved: i, explode: true, name: t, style: "deepObject", value: r, ...e })];
          continue;
        }
        s = [...s, h({ allowReserved: i, name: t, value: r })];
      }
    }
  return s.join("&");
};
var A = (i) => {
  if (!i)
    return;
  let n = i.split(";")[0].trim();
  if (n.startsWith("application/json") || n.endsWith("+json"))
    return "json";
  if (n === "multipart/form-data")
    return "formData";
  if (["application/", "audio/", "image/", "video/"].some((e) => n.startsWith(e)))
    return "blob";
  if (n.startsWith("text/"))
    return "text";
};
var w = ({ baseUrl: i, path: n, query: e, querySerializer: a, url: o }) => {
  let s = o.startsWith("/") ? o : `/${o}`, t = i + s;
  n && (t = _({ path: n, url: t }));
  let r = e ? a(e) : "";
  return r.startsWith("?") && (r = r.substring(1)), r && (t += `?${r}`), t;
};
var R = (i, n) => {
  let e = { ...i, ...n };
  return e.baseUrl?.endsWith("/") && (e.baseUrl = e.baseUrl.substring(0, e.baseUrl.length - 1)), e.headers = O(i.headers, n.headers), e;
};
var O = (...i) => {
  let n = new Headers;
  for (let e of i) {
    if (!e || typeof e != "object")
      continue;
    let a = e instanceof Headers ? e.entries() : Object.entries(e);
    for (let [o, s] of a)
      if (s === null)
        n.delete(o);
      else if (Array.isArray(s))
        for (let t of s)
          n.append(o, t);
      else
        s !== undefined && n.set(o, typeof s == "object" ? JSON.stringify(s) : s);
  }
  return n;
};
var y = class {
  _fns;
  constructor() {
    this._fns = [];
  }
  clear() {
    this._fns = [];
  }
  exists(n) {
    return this._fns.indexOf(n) !== -1;
  }
  eject(n) {
    let e = this._fns.indexOf(n);
    e !== -1 && (this._fns = [...this._fns.slice(0, e), ...this._fns.slice(e + 1)]);
  }
  use(n) {
    this._fns = [...this._fns, n];
  }
};
var P = () => ({ error: new y, request: new y, response: new y });
var E = { bodySerializer: (i) => JSON.stringify(i) };
var W = b({ allowReserved: false, array: { explode: true, style: "form" }, object: { explode: true, style: "deepObject" } });
var B = { "Content-Type": "application/json" };
var x = (i = {}) => ({ ...E, baseUrl: "", fetch: globalThis.fetch, headers: B, parseAs: "auto", querySerializer: W, ...i });
var J = (i = {}) => {
  let n = R(x(), i), e = () => ({ ...n }), a = (t) => (n = R(n, t), e()), o = P(), s = async (t) => {
    let r = { ...n, ...t, headers: O(n.headers, t.headers) };
    r.body && r.bodySerializer && (r.body = r.bodySerializer(r.body)), r.body || r.headers.delete("Content-Type");
    let c = w({ baseUrl: r.baseUrl ?? "", path: r.path, query: r.query, querySerializer: typeof r.querySerializer == "function" ? r.querySerializer : b(r.querySerializer), url: r.url }), u = { redirect: "follow", ...r }, l = new Request(c, u);
    for (let f of o.request._fns)
      l = await f(l, r);
    let I = r.fetch, p = await I(l);
    for (let f of o.response._fns)
      p = await f(p, l, r);
    let g = { request: l, response: p };
    if (p.ok) {
      if (p.status === 204 || p.headers.get("Content-Length") === "0")
        return { data: {}, ...g };
      if (r.parseAs === "stream")
        return { data: p.body, ...g };
      let f = (r.parseAs === "auto" ? A(p.headers.get("Content-Type")) : r.parseAs) ?? "json", S = await p[f]();
      return f === "json" && r.responseTransformer && (S = await r.responseTransformer(S)), { data: S, ...g };
    }
    let m = await p.text();
    try {
      m = JSON.parse(m);
    } catch {
    }
    let d = m;
    for (let f of o.error._fns)
      d = await f(m, p, l, r);
    if (d = d || {}, r.throwOnError)
      throw d;
    return { error: d, ...g };
  };
  return { connect: (t) => s({ ...t, method: "CONNECT" }), delete: (t) => s({ ...t, method: "DELETE" }), get: (t) => s({ ...t, method: "GET" }), getConfig: e, head: (t) => s({ ...t, method: "HEAD" }), interceptors: o, options: (t) => s({ ...t, method: "OPTIONS" }), patch: (t) => s({ ...t, method: "PATCH" }), post: (t) => s({ ...t, method: "POST" }), put: (t) => s({ ...t, method: "PUT" }), request: s, setConfig: a, trace: (t) => s({ ...t, method: "TRACE" }) };
};

// client/sdk.gen.ts
var client = J(x());
var listMessages = (options) => {
  return (options?.client ?? client).get({
    ...options,
    url: "/threads/{threadId}/messages/"
  });
};
var createMessages = (options) => {
  return (options?.client ?? client).post({
    ...options,
    url: "/threads/{threadId}/messages/"
  });
};
var getMessage = (options) => {
  return (options?.client ?? client).get({
    ...options,
    url: "/threads/{threadId}/messages/{messageId}"
  });
};
var updateMessage = (options) => {
  return (options?.client ?? client).patch({
    ...options,
    url: "/threads/{threadId}/messages/{messageId}"
  });
};
var deleteMessage = (options) => {
  return (options?.client ?? client).delete({
    ...options,
    url: "/threads/{threadId}/messages/{messageId}"
  });
};
var getThread = (options) => {
  return (options?.client ?? client).get({
    ...options,
    url: "/threads/{threadId}/"
  });
};
var updateThread = (options) => {
  return (options?.client ?? client).patch({
    ...options,
    url: "/threads/{threadId}/"
  });
};
var deleteThread = (options) => {
  return (options?.client ?? client).delete({
    ...options,
    url: "/threads/{threadId}/"
  });
};
var listThreads = (options) => {
  return (options?.client ?? client).get({
    ...options,
    url: "/threads/"
  });
};
var createThread = (options) => {
  return (options?.client ?? client).post({
    ...options,
    url: "/threads/"
  });
};
// client/client.ts
var getThread2 = (threadId, includeMessages = true) => {
  return getThread({
    path: { threadId },
    query: { includeMessages }
  }).then((res) => res.data);
};
var listThreads2 = () => {
  return listThreads().then((res) => res.data);
};
var createThread2 = (data) => {
  return createThread({ body: data ?? {} }).then((res) => res.data);
};
var updateThread2 = (threadId, data) => {
  return updateThread({
    path: { threadId },
    body: data
  }).then((res) => res.data);
};
var deleteThread2 = (threadId) => {
  return deleteThread({
    path: { threadId }
  }).then((res) => res.data);
};
var getMessage2 = (threadId, messageId) => {
  return getMessage({
    path: { threadId, messageId }
  }).then((res) => res.data);
};
var listMessages2 = (threadId, options) => {
  return listMessages({
    path: { threadId },
    query: options
  }).then((res) => res.data);
};
var createMessages2 = (threadId, data) => {
  return createMessages({
    body: data,
    path: { threadId }
  }).then((res) => res.data);
};
var updateMessage2 = (threadId, messageId, data) => {
  return updateMessage({
    path: { threadId, messageId },
    body: data
  }).then((res) => res.data);
};
var deleteMessage2 = (threadId, messageId) => {
  return deleteMessage({
    path: { threadId, messageId }
  }).then((res) => res.data);
};
var createClient = (config) => {
  client.setConfig({
    baseUrl: config?.baseUrl ?? process.env.API_URL ?? "http://localhost:3003"
  });
  return {
    getThread: getThread2,
    listThreads: listThreads2,
    createThread: createThread2,
    updateThread: updateThread2,
    deleteThread: deleteThread2,
    getMessage: getMessage2,
    listMessages: listMessages2,
    createMessages: createMessages2,
    updateMessage: updateMessage2,
    deleteMessage: deleteMessage2
  };
};
export {
  createClient
};
