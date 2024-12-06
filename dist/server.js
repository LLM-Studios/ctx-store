#!/usr/bin/env bun
// @bun
var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/cookie/dist/index.js
var require_dist = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.parse = parse2;
  exports.serialize = serialize;
  var cookieNameRegExp = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/;
  var cookieValueRegExp = /^[\u0021-\u003A\u003C-\u007E]*$/;
  var domainValueRegExp = /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i;
  var pathValueRegExp = /^[\u0020-\u003A\u003D-\u007E]*$/;
  var __toString = Object.prototype.toString;
  var NullObject = /* @__PURE__ */ (() => {
    const C = function() {
    };
    C.prototype = Object.create(null);
    return C;
  })();
  function parse2(str, options) {
    const obj = new NullObject;
    const len = str.length;
    if (len < 2)
      return obj;
    const dec = options?.decode || decode2;
    let index = 0;
    do {
      const eqIdx = str.indexOf("=", index);
      if (eqIdx === -1)
        break;
      const colonIdx = str.indexOf(";", index);
      const endIdx = colonIdx === -1 ? len : colonIdx;
      if (eqIdx > endIdx) {
        index = str.lastIndexOf(";", eqIdx - 1) + 1;
        continue;
      }
      const keyStartIdx = startIndex(str, index, eqIdx);
      const keyEndIdx = endIndex(str, eqIdx, keyStartIdx);
      const key = str.slice(keyStartIdx, keyEndIdx);
      if (obj[key] === undefined) {
        let valStartIdx = startIndex(str, eqIdx + 1, endIdx);
        let valEndIdx = endIndex(str, endIdx, valStartIdx);
        const value2 = dec(str.slice(valStartIdx, valEndIdx));
        obj[key] = value2;
      }
      index = endIdx + 1;
    } while (index < len);
    return obj;
  }
  function startIndex(str, index, max) {
    do {
      const code = str.charCodeAt(index);
      if (code !== 32 && code !== 9)
        return index;
    } while (++index < max);
    return max;
  }
  function endIndex(str, index, min) {
    while (index > min) {
      const code = str.charCodeAt(--index);
      if (code !== 32 && code !== 9)
        return index + 1;
    }
    return min;
  }
  function serialize(name, val, options) {
    const enc = options?.encode || encodeURIComponent;
    if (!cookieNameRegExp.test(name)) {
      throw new TypeError(`argument name is invalid: ${name}`);
    }
    const value2 = enc(val);
    if (!cookieValueRegExp.test(value2)) {
      throw new TypeError(`argument val is invalid: ${val}`);
    }
    let str = name + "=" + value2;
    if (!options)
      return str;
    if (options.maxAge !== undefined) {
      if (!Number.isInteger(options.maxAge)) {
        throw new TypeError(`option maxAge is invalid: ${options.maxAge}`);
      }
      str += "; Max-Age=" + options.maxAge;
    }
    if (options.domain) {
      if (!domainValueRegExp.test(options.domain)) {
        throw new TypeError(`option domain is invalid: ${options.domain}`);
      }
      str += "; Domain=" + options.domain;
    }
    if (options.path) {
      if (!pathValueRegExp.test(options.path)) {
        throw new TypeError(`option path is invalid: ${options.path}`);
      }
      str += "; Path=" + options.path;
    }
    if (options.expires) {
      if (!isDate(options.expires) || !Number.isFinite(options.expires.valueOf())) {
        throw new TypeError(`option expires is invalid: ${options.expires}`);
      }
      str += "; Expires=" + options.expires.toUTCString();
    }
    if (options.httpOnly) {
      str += "; HttpOnly";
    }
    if (options.secure) {
      str += "; Secure";
    }
    if (options.partitioned) {
      str += "; Partitioned";
    }
    if (options.priority) {
      const priority = typeof options.priority === "string" ? options.priority.toLowerCase() : undefined;
      switch (priority) {
        case "low":
          str += "; Priority=Low";
          break;
        case "medium":
          str += "; Priority=Medium";
          break;
        case "high":
          str += "; Priority=High";
          break;
        default:
          throw new TypeError(`option priority is invalid: ${options.priority}`);
      }
    }
    if (options.sameSite) {
      const sameSite = typeof options.sameSite === "string" ? options.sameSite.toLowerCase() : options.sameSite;
      switch (sameSite) {
        case true:
        case "strict":
          str += "; SameSite=Strict";
          break;
        case "lax":
          str += "; SameSite=Lax";
          break;
        case "none":
          str += "; SameSite=None";
          break;
        default:
          throw new TypeError(`option sameSite is invalid: ${options.sameSite}`);
      }
    }
    return str;
  }
  function decode2(str) {
    if (str.indexOf("%") === -1)
      return str;
    try {
      return decodeURIComponent(str);
    } catch (e) {
      return str;
    }
  }
  function isDate(val) {
    return __toString.call(val) === "[object Date]";
  }
});

// node_modules/fast-decode-uri-component/index.js
var require_fast_decode_uri_component = __commonJS((exports, module) => {
  var UTF8_ACCEPT = 12;
  var UTF8_REJECT = 0;
  var UTF8_DATA = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    3,
    4,
    4,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    5,
    6,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    7,
    8,
    7,
    7,
    10,
    9,
    9,
    9,
    11,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    12,
    0,
    0,
    0,
    0,
    24,
    36,
    48,
    60,
    72,
    84,
    96,
    0,
    12,
    12,
    12,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    24,
    24,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    48,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    127,
    63,
    63,
    63,
    0,
    31,
    15,
    15,
    15,
    7,
    7,
    7
  ];
  function decodeURIComponent2(uri) {
    var percentPosition = uri.indexOf("%");
    if (percentPosition === -1)
      return uri;
    var length = uri.length;
    var decoded = "";
    var last = 0;
    var codepoint = 0;
    var startOfOctets = percentPosition;
    var state = UTF8_ACCEPT;
    while (percentPosition > -1 && percentPosition < length) {
      var high = hexCodeToInt(uri[percentPosition + 1], 4);
      var low = hexCodeToInt(uri[percentPosition + 2], 0);
      var byte = high | low;
      var type3 = UTF8_DATA[byte];
      state = UTF8_DATA[256 + state + type3];
      codepoint = codepoint << 6 | byte & UTF8_DATA[364 + type3];
      if (state === UTF8_ACCEPT) {
        decoded += uri.slice(last, startOfOctets);
        decoded += codepoint <= 65535 ? String.fromCharCode(codepoint) : String.fromCharCode(55232 + (codepoint >> 10), 56320 + (codepoint & 1023));
        codepoint = 0;
        last = percentPosition + 3;
        percentPosition = startOfOctets = uri.indexOf("%", last);
      } else if (state === UTF8_REJECT) {
        return null;
      } else {
        percentPosition += 3;
        if (percentPosition < length && uri.charCodeAt(percentPosition) === 37)
          continue;
        return null;
      }
    }
    return decoded + uri.slice(last);
  }
  var HEX = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    a: 10,
    A: 10,
    b: 11,
    B: 11,
    c: 12,
    C: 12,
    d: 13,
    D: 13,
    e: 14,
    E: 14,
    f: 15,
    F: 15
  };
  function hexCodeToInt(c, shift) {
    var i = HEX[c];
    return i === undefined ? 255 : i << shift;
  }
  module.exports = decodeURIComponent2;
});

// node_modules/@prisma/client/runtime/index-browser.js
var require_index_browser = __commonJS((exports, module) => {
  var de = Object.defineProperty;
  var We = Object.getOwnPropertyDescriptor;
  var Ge = Object.getOwnPropertyNames;
  var Je = Object.prototype.hasOwnProperty;
  var Me = (e, n) => {
    for (var i in n)
      de(e, i, { get: n[i], enumerable: true });
  };
  var Xe = (e, n, i, t2) => {
    if (n && typeof n == "object" || typeof n == "function")
      for (let r of Ge(n))
        !Je.call(e, r) && r !== i && de(e, r, { get: () => n[r], enumerable: !(t2 = We(n, r)) || t2.enumerable });
    return e;
  };
  var Ke = (e) => Xe(de({}, "__esModule", { value: true }), e);
  var Xn = {};
  Me(Xn, { Decimal: () => je, Public: () => he, getRuntime: () => be, makeStrictEnum: () => Pe, objectEnumValues: () => Oe });
  module.exports = Ke(Xn);
  var he = {};
  Me(he, { validator: () => Ce });
  function Ce(...e) {
    return (n) => n;
  }
  var ne = Symbol();
  var pe = new WeakMap;
  var ge = class {
    constructor(n) {
      n === ne ? pe.set(this, "Prisma.".concat(this._getName())) : pe.set(this, "new Prisma.".concat(this._getNamespace(), ".").concat(this._getName(), "()"));
    }
    _getName() {
      return this.constructor.name;
    }
    toString() {
      return pe.get(this);
    }
  };
  var G = class extends ge {
    _getNamespace() {
      return "NullTypes";
    }
  };
  var J = class extends G {
  };
  me(J, "DbNull");
  var X = class extends G {
  };
  me(X, "JsonNull");
  var K = class extends G {
  };
  me(K, "AnyNull");
  var Oe = { classes: { DbNull: J, JsonNull: X, AnyNull: K }, instances: { DbNull: new J(ne), JsonNull: new X(ne), AnyNull: new K(ne) } };
  function me(e, n) {
    Object.defineProperty(e, "name", { value: n, configurable: true });
  }
  var xe = new Set(["toJSON", "$$typeof", "asymmetricMatch", Symbol.iterator, Symbol.toStringTag, Symbol.isConcatSpreadable, Symbol.toPrimitive]);
  function Pe(e) {
    return new Proxy(e, { get(n, i) {
      if (i in n)
        return n[i];
      if (!xe.has(i))
        throw new TypeError("Invalid enum value: ".concat(String(i)));
    } });
  }
  var Qe = "Cloudflare-Workers";
  var Ye = "node";
  function Re() {
    var e, n, i;
    return typeof Netlify == "object" ? "netlify" : typeof EdgeRuntime == "string" ? "edge-light" : ((e = globalThis.navigator) == null ? undefined : e.userAgent) === Qe ? "workerd" : globalThis.Deno ? "deno" : globalThis.__lagon__ ? "lagon" : ((i = (n = globalThis.process) == null ? undefined : n.release) == null ? undefined : i.name) === Ye ? "node" : globalThis.Bun ? "bun" : globalThis.fastly ? "fastly" : "unknown";
  }
  var ze = { node: "Node.js", workerd: "Cloudflare Workers", deno: "Deno and Deno Deploy", netlify: "Netlify Edge Functions", "edge-light": "Edge Runtime (Vercel Edge Functions, Vercel Edge Middleware, Next.js (Pages Router) Edge API Routes, Next.js (App Router) Edge Route Handlers or Next.js Middleware)" };
  function be() {
    let e = Re();
    return { id: e, prettyName: ze[e] || e, isEdge: ["workerd", "deno", "netlify", "edge-light"].includes(e) };
  }
  var H = 9000000000000000;
  var $ = 1e9;
  var we = "0123456789abcdef";
  var te = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058";
  var re = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789";
  var Ne = { precision: 20, rounding: 4, modulo: 1, toExpNeg: -7, toExpPos: 21, minE: -H, maxE: H, crypto: false };
  var Te;
  var Z;
  var w = true;
  var oe = "[DecimalError] ";
  var V = oe + "Invalid argument: ";
  var Le = oe + "Precision limit exceeded";
  var De = oe + "crypto unavailable";
  var Fe = "[object Decimal]";
  var b = Math.floor;
  var C = Math.pow;
  var ye = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i;
  var en = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i;
  var nn = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i;
  var Ie = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;
  var D = 1e7;
  var m = 7;
  var tn = 9007199254740991;
  var rn = te.length - 1;
  var ve = re.length - 1;
  var h = { toStringTag: Fe };
  h.absoluteValue = h.abs = function() {
    var e = new this.constructor(this);
    return e.s < 0 && (e.s = 1), p(e);
  };
  h.ceil = function() {
    return p(new this.constructor(this), this.e + 1, 2);
  };
  h.clampedTo = h.clamp = function(e, n) {
    var i, t2 = this, r = t2.constructor;
    if (e = new r(e), n = new r(n), !e.s || !n.s)
      return new r(NaN);
    if (e.gt(n))
      throw Error(V + n);
    return i = t2.cmp(e), i < 0 ? e : t2.cmp(n) > 0 ? n : new r(t2);
  };
  h.comparedTo = h.cmp = function(e) {
    var n, i, t2, r, s = this, o = s.d, u = (e = new s.constructor(e)).d, l = s.s, f = e.s;
    if (!o || !u)
      return !l || !f ? NaN : l !== f ? l : o === u ? 0 : !o ^ l < 0 ? 1 : -1;
    if (!o[0] || !u[0])
      return o[0] ? l : u[0] ? -f : 0;
    if (l !== f)
      return l;
    if (s.e !== e.e)
      return s.e > e.e ^ l < 0 ? 1 : -1;
    for (t2 = o.length, r = u.length, n = 0, i = t2 < r ? t2 : r;n < i; ++n)
      if (o[n] !== u[n])
        return o[n] > u[n] ^ l < 0 ? 1 : -1;
    return t2 === r ? 0 : t2 > r ^ l < 0 ? 1 : -1;
  };
  h.cosine = h.cos = function() {
    var e, n, i = this, t2 = i.constructor;
    return i.d ? i.d[0] ? (e = t2.precision, n = t2.rounding, t2.precision = e + Math.max(i.e, i.sd()) + m, t2.rounding = 1, i = sn(t2, $e(t2, i)), t2.precision = e, t2.rounding = n, p(Z == 2 || Z == 3 ? i.neg() : i, e, n, true)) : new t2(1) : new t2(NaN);
  };
  h.cubeRoot = h.cbrt = function() {
    var e, n, i, t2, r, s, o, u, l, f, c = this, a = c.constructor;
    if (!c.isFinite() || c.isZero())
      return new a(c);
    for (w = false, s = c.s * C(c.s * c, 1 / 3), !s || Math.abs(s) == 1 / 0 ? (i = O(c.d), e = c.e, (s = (e - i.length + 1) % 3) && (i += s == 1 || s == -2 ? "0" : "00"), s = C(i, 1 / 3), e = b((e + 1) / 3) - (e % 3 == (e < 0 ? -1 : 2)), s == 1 / 0 ? i = "5e" + e : (i = s.toExponential(), i = i.slice(0, i.indexOf("e") + 1) + e), t2 = new a(i), t2.s = c.s) : t2 = new a(s.toString()), o = (e = a.precision) + 3;; )
      if (u = t2, l = u.times(u).times(u), f = l.plus(c), t2 = S(f.plus(c).times(u), f.plus(l), o + 2, 1), O(u.d).slice(0, o) === (i = O(t2.d)).slice(0, o))
        if (i = i.slice(o - 3, o + 1), i == "9999" || !r && i == "4999") {
          if (!r && (p(u, e + 1, 0), u.times(u).times(u).eq(c))) {
            t2 = u;
            break;
          }
          o += 4, r = 1;
        } else {
          (!+i || !+i.slice(1) && i.charAt(0) == "5") && (p(t2, e + 1, 1), n = !t2.times(t2).times(t2).eq(c));
          break;
        }
    return w = true, p(t2, e, a.rounding, n);
  };
  h.decimalPlaces = h.dp = function() {
    var e, n = this.d, i = NaN;
    if (n) {
      if (e = n.length - 1, i = (e - b(this.e / m)) * m, e = n[e], e)
        for (;e % 10 == 0; e /= 10)
          i--;
      i < 0 && (i = 0);
    }
    return i;
  };
  h.dividedBy = h.div = function(e) {
    return S(this, new this.constructor(e));
  };
  h.dividedToIntegerBy = h.divToInt = function(e) {
    var n = this, i = n.constructor;
    return p(S(n, new i(e), 0, 1, 1), i.precision, i.rounding);
  };
  h.equals = h.eq = function(e) {
    return this.cmp(e) === 0;
  };
  h.floor = function() {
    return p(new this.constructor(this), this.e + 1, 3);
  };
  h.greaterThan = h.gt = function(e) {
    return this.cmp(e) > 0;
  };
  h.greaterThanOrEqualTo = h.gte = function(e) {
    var n = this.cmp(e);
    return n == 1 || n === 0;
  };
  h.hyperbolicCosine = h.cosh = function() {
    var e, n, i, t2, r, s = this, o = s.constructor, u = new o(1);
    if (!s.isFinite())
      return new o(s.s ? 1 / 0 : NaN);
    if (s.isZero())
      return u;
    i = o.precision, t2 = o.rounding, o.precision = i + Math.max(s.e, s.sd()) + 4, o.rounding = 1, r = s.d.length, r < 32 ? (e = Math.ceil(r / 3), n = (1 / fe(4, e)).toString()) : (e = 16, n = "2.3283064365386962890625e-10"), s = j(o, 1, s.times(n), new o(1), true);
    for (var l, f = e, c = new o(8);f--; )
      l = s.times(s), s = u.minus(l.times(c.minus(l.times(c))));
    return p(s, o.precision = i, o.rounding = t2, true);
  };
  h.hyperbolicSine = h.sinh = function() {
    var e, n, i, t2, r = this, s = r.constructor;
    if (!r.isFinite() || r.isZero())
      return new s(r);
    if (n = s.precision, i = s.rounding, s.precision = n + Math.max(r.e, r.sd()) + 4, s.rounding = 1, t2 = r.d.length, t2 < 3)
      r = j(s, 2, r, r, true);
    else {
      e = 1.4 * Math.sqrt(t2), e = e > 16 ? 16 : e | 0, r = r.times(1 / fe(5, e)), r = j(s, 2, r, r, true);
      for (var o, u = new s(5), l = new s(16), f = new s(20);e--; )
        o = r.times(r), r = r.times(u.plus(o.times(l.times(o).plus(f))));
    }
    return s.precision = n, s.rounding = i, p(r, n, i, true);
  };
  h.hyperbolicTangent = h.tanh = function() {
    var e, n, i = this, t2 = i.constructor;
    return i.isFinite() ? i.isZero() ? new t2(i) : (e = t2.precision, n = t2.rounding, t2.precision = e + 7, t2.rounding = 1, S(i.sinh(), i.cosh(), t2.precision = e, t2.rounding = n)) : new t2(i.s);
  };
  h.inverseCosine = h.acos = function() {
    var e, n = this, i = n.constructor, t2 = n.abs().cmp(1), r = i.precision, s = i.rounding;
    return t2 !== -1 ? t2 === 0 ? n.isNeg() ? L(i, r, s) : new i(0) : new i(NaN) : n.isZero() ? L(i, r + 4, s).times(0.5) : (i.precision = r + 6, i.rounding = 1, n = n.asin(), e = L(i, r + 4, s).times(0.5), i.precision = r, i.rounding = s, e.minus(n));
  };
  h.inverseHyperbolicCosine = h.acosh = function() {
    var e, n, i = this, t2 = i.constructor;
    return i.lte(1) ? new t2(i.eq(1) ? 0 : NaN) : i.isFinite() ? (e = t2.precision, n = t2.rounding, t2.precision = e + Math.max(Math.abs(i.e), i.sd()) + 4, t2.rounding = 1, w = false, i = i.times(i).minus(1).sqrt().plus(i), w = true, t2.precision = e, t2.rounding = n, i.ln()) : new t2(i);
  };
  h.inverseHyperbolicSine = h.asinh = function() {
    var e, n, i = this, t2 = i.constructor;
    return !i.isFinite() || i.isZero() ? new t2(i) : (e = t2.precision, n = t2.rounding, t2.precision = e + 2 * Math.max(Math.abs(i.e), i.sd()) + 6, t2.rounding = 1, w = false, i = i.times(i).plus(1).sqrt().plus(i), w = true, t2.precision = e, t2.rounding = n, i.ln());
  };
  h.inverseHyperbolicTangent = h.atanh = function() {
    var e, n, i, t2, r = this, s = r.constructor;
    return r.isFinite() ? r.e >= 0 ? new s(r.abs().eq(1) ? r.s / 0 : r.isZero() ? r : NaN) : (e = s.precision, n = s.rounding, t2 = r.sd(), Math.max(t2, e) < 2 * -r.e - 1 ? p(new s(r), e, n, true) : (s.precision = i = t2 - r.e, r = S(r.plus(1), new s(1).minus(r), i + e, 1), s.precision = e + 4, s.rounding = 1, r = r.ln(), s.precision = e, s.rounding = n, r.times(0.5))) : new s(NaN);
  };
  h.inverseSine = h.asin = function() {
    var e, n, i, t2, r = this, s = r.constructor;
    return r.isZero() ? new s(r) : (n = r.abs().cmp(1), i = s.precision, t2 = s.rounding, n !== -1 ? n === 0 ? (e = L(s, i + 4, t2).times(0.5), e.s = r.s, e) : new s(NaN) : (s.precision = i + 6, s.rounding = 1, r = r.div(new s(1).minus(r.times(r)).sqrt().plus(1)).atan(), s.precision = i, s.rounding = t2, r.times(2)));
  };
  h.inverseTangent = h.atan = function() {
    var e, n, i, t2, r, s, o, u, l, f = this, c = f.constructor, a = c.precision, d = c.rounding;
    if (f.isFinite()) {
      if (f.isZero())
        return new c(f);
      if (f.abs().eq(1) && a + 4 <= ve)
        return o = L(c, a + 4, d).times(0.25), o.s = f.s, o;
    } else {
      if (!f.s)
        return new c(NaN);
      if (a + 4 <= ve)
        return o = L(c, a + 4, d).times(0.5), o.s = f.s, o;
    }
    for (c.precision = u = a + 10, c.rounding = 1, i = Math.min(28, u / m + 2 | 0), e = i;e; --e)
      f = f.div(f.times(f).plus(1).sqrt().plus(1));
    for (w = false, n = Math.ceil(u / m), t2 = 1, l = f.times(f), o = new c(f), r = f;e !== -1; )
      if (r = r.times(l), s = o.minus(r.div(t2 += 2)), r = r.times(l), o = s.plus(r.div(t2 += 2)), o.d[n] !== undefined)
        for (e = n;o.d[e] === s.d[e] && e--; )
          ;
    return i && (o = o.times(2 << i - 1)), w = true, p(o, c.precision = a, c.rounding = d, true);
  };
  h.isFinite = function() {
    return !!this.d;
  };
  h.isInteger = h.isInt = function() {
    return !!this.d && b(this.e / m) > this.d.length - 2;
  };
  h.isNaN = function() {
    return !this.s;
  };
  h.isNegative = h.isNeg = function() {
    return this.s < 0;
  };
  h.isPositive = h.isPos = function() {
    return this.s > 0;
  };
  h.isZero = function() {
    return !!this.d && this.d[0] === 0;
  };
  h.lessThan = h.lt = function(e) {
    return this.cmp(e) < 0;
  };
  h.lessThanOrEqualTo = h.lte = function(e) {
    return this.cmp(e) < 1;
  };
  h.logarithm = h.log = function(e) {
    var n, i, t2, r, s, o, u, l, f = this, c = f.constructor, a = c.precision, d = c.rounding, g = 5;
    if (e == null)
      e = new c(10), n = true;
    else {
      if (e = new c(e), i = e.d, e.s < 0 || !i || !i[0] || e.eq(1))
        return new c(NaN);
      n = e.eq(10);
    }
    if (i = f.d, f.s < 0 || !i || !i[0] || f.eq(1))
      return new c(i && !i[0] ? -1 / 0 : f.s != 1 ? NaN : i ? 0 : 1 / 0);
    if (n)
      if (i.length > 1)
        s = true;
      else {
        for (r = i[0];r % 10 === 0; )
          r /= 10;
        s = r !== 1;
      }
    if (w = false, u = a + g, o = B(f, u), t2 = n ? se(c, u + 10) : B(e, u), l = S(o, t2, u, 1), x(l.d, r = a, d))
      do
        if (u += 10, o = B(f, u), t2 = n ? se(c, u + 10) : B(e, u), l = S(o, t2, u, 1), !s) {
          +O(l.d).slice(r + 1, r + 15) + 1 == 100000000000000 && (l = p(l, a + 1, 0));
          break;
        }
      while (x(l.d, r += 10, d));
    return w = true, p(l, a, d);
  };
  h.minus = h.sub = function(e) {
    var n, i, t2, r, s, o, u, l, f, c, a, d, g = this, v = g.constructor;
    if (e = new v(e), !g.d || !e.d)
      return !g.s || !e.s ? e = new v(NaN) : g.d ? e.s = -e.s : e = new v(e.d || g.s !== e.s ? g : NaN), e;
    if (g.s != e.s)
      return e.s = -e.s, g.plus(e);
    if (f = g.d, d = e.d, u = v.precision, l = v.rounding, !f[0] || !d[0]) {
      if (d[0])
        e.s = -e.s;
      else if (f[0])
        e = new v(g);
      else
        return new v(l === 3 ? -0 : 0);
      return w ? p(e, u, l) : e;
    }
    if (i = b(e.e / m), c = b(g.e / m), f = f.slice(), s = c - i, s) {
      for (a = s < 0, a ? (n = f, s = -s, o = d.length) : (n = d, i = c, o = f.length), t2 = Math.max(Math.ceil(u / m), o) + 2, s > t2 && (s = t2, n.length = 1), n.reverse(), t2 = s;t2--; )
        n.push(0);
      n.reverse();
    } else {
      for (t2 = f.length, o = d.length, a = t2 < o, a && (o = t2), t2 = 0;t2 < o; t2++)
        if (f[t2] != d[t2]) {
          a = f[t2] < d[t2];
          break;
        }
      s = 0;
    }
    for (a && (n = f, f = d, d = n, e.s = -e.s), o = f.length, t2 = d.length - o;t2 > 0; --t2)
      f[o++] = 0;
    for (t2 = d.length;t2 > s; ) {
      if (f[--t2] < d[t2]) {
        for (r = t2;r && f[--r] === 0; )
          f[r] = D - 1;
        --f[r], f[t2] += D;
      }
      f[t2] -= d[t2];
    }
    for (;f[--o] === 0; )
      f.pop();
    for (;f[0] === 0; f.shift())
      --i;
    return f[0] ? (e.d = f, e.e = ue(f, i), w ? p(e, u, l) : e) : new v(l === 3 ? -0 : 0);
  };
  h.modulo = h.mod = function(e) {
    var n, i = this, t2 = i.constructor;
    return e = new t2(e), !i.d || !e.s || e.d && !e.d[0] ? new t2(NaN) : !e.d || i.d && !i.d[0] ? p(new t2(i), t2.precision, t2.rounding) : (w = false, t2.modulo == 9 ? (n = S(i, e.abs(), 0, 3, 1), n.s *= e.s) : n = S(i, e, 0, t2.modulo, 1), n = n.times(e), w = true, i.minus(n));
  };
  h.naturalExponential = h.exp = function() {
    return Ee(this);
  };
  h.naturalLogarithm = h.ln = function() {
    return B(this);
  };
  h.negated = h.neg = function() {
    var e = new this.constructor(this);
    return e.s = -e.s, p(e);
  };
  h.plus = h.add = function(e) {
    var n, i, t2, r, s, o, u, l, f, c, a = this, d = a.constructor;
    if (e = new d(e), !a.d || !e.d)
      return !a.s || !e.s ? e = new d(NaN) : a.d || (e = new d(e.d || a.s === e.s ? a : NaN)), e;
    if (a.s != e.s)
      return e.s = -e.s, a.minus(e);
    if (f = a.d, c = e.d, u = d.precision, l = d.rounding, !f[0] || !c[0])
      return c[0] || (e = new d(a)), w ? p(e, u, l) : e;
    if (s = b(a.e / m), t2 = b(e.e / m), f = f.slice(), r = s - t2, r) {
      for (r < 0 ? (i = f, r = -r, o = c.length) : (i = c, t2 = s, o = f.length), s = Math.ceil(u / m), o = s > o ? s + 1 : o + 1, r > o && (r = o, i.length = 1), i.reverse();r--; )
        i.push(0);
      i.reverse();
    }
    for (o = f.length, r = c.length, o - r < 0 && (r = o, i = c, c = f, f = i), n = 0;r; )
      n = (f[--r] = f[r] + c[r] + n) / D | 0, f[r] %= D;
    for (n && (f.unshift(n), ++t2), o = f.length;f[--o] == 0; )
      f.pop();
    return e.d = f, e.e = ue(f, t2), w ? p(e, u, l) : e;
  };
  h.precision = h.sd = function(e) {
    var n, i = this;
    if (e !== undefined && e !== !!e && e !== 1 && e !== 0)
      throw Error(V + e);
    return i.d ? (n = Ze(i.d), e && i.e + 1 > n && (n = i.e + 1)) : n = NaN, n;
  };
  h.round = function() {
    var e = this, n = e.constructor;
    return p(new n(e), e.e + 1, n.rounding);
  };
  h.sine = h.sin = function() {
    var e, n, i = this, t2 = i.constructor;
    return i.isFinite() ? i.isZero() ? new t2(i) : (e = t2.precision, n = t2.rounding, t2.precision = e + Math.max(i.e, i.sd()) + m, t2.rounding = 1, i = un(t2, $e(t2, i)), t2.precision = e, t2.rounding = n, p(Z > 2 ? i.neg() : i, e, n, true)) : new t2(NaN);
  };
  h.squareRoot = h.sqrt = function() {
    var e, n, i, t2, r, s, o = this, u = o.d, l = o.e, f = o.s, c = o.constructor;
    if (f !== 1 || !u || !u[0])
      return new c(!f || f < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
    for (w = false, f = Math.sqrt(+o), f == 0 || f == 1 / 0 ? (n = O(u), (n.length + l) % 2 == 0 && (n += "0"), f = Math.sqrt(n), l = b((l + 1) / 2) - (l < 0 || l % 2), f == 1 / 0 ? n = "5e" + l : (n = f.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + l), t2 = new c(n)) : t2 = new c(f.toString()), i = (l = c.precision) + 3;; )
      if (s = t2, t2 = s.plus(S(o, s, i + 2, 1)).times(0.5), O(s.d).slice(0, i) === (n = O(t2.d)).slice(0, i))
        if (n = n.slice(i - 3, i + 1), n == "9999" || !r && n == "4999") {
          if (!r && (p(s, l + 1, 0), s.times(s).eq(o))) {
            t2 = s;
            break;
          }
          i += 4, r = 1;
        } else {
          (!+n || !+n.slice(1) && n.charAt(0) == "5") && (p(t2, l + 1, 1), e = !t2.times(t2).eq(o));
          break;
        }
    return w = true, p(t2, l, c.rounding, e);
  };
  h.tangent = h.tan = function() {
    var e, n, i = this, t2 = i.constructor;
    return i.isFinite() ? i.isZero() ? new t2(i) : (e = t2.precision, n = t2.rounding, t2.precision = e + 10, t2.rounding = 1, i = i.sin(), i.s = 1, i = S(i, new t2(1).minus(i.times(i)).sqrt(), e + 10, 0), t2.precision = e, t2.rounding = n, p(Z == 2 || Z == 4 ? i.neg() : i, e, n, true)) : new t2(NaN);
  };
  h.times = h.mul = function(e) {
    var n, i, t2, r, s, o, u, l, f, c = this, a = c.constructor, d = c.d, g = (e = new a(e)).d;
    if (e.s *= c.s, !d || !d[0] || !g || !g[0])
      return new a(!e.s || d && !d[0] && !g || g && !g[0] && !d ? NaN : !d || !g ? e.s / 0 : e.s * 0);
    for (i = b(c.e / m) + b(e.e / m), l = d.length, f = g.length, l < f && (s = d, d = g, g = s, o = l, l = f, f = o), s = [], o = l + f, t2 = o;t2--; )
      s.push(0);
    for (t2 = f;--t2 >= 0; ) {
      for (n = 0, r = l + t2;r > t2; )
        u = s[r] + g[t2] * d[r - t2 - 1] + n, s[r--] = u % D | 0, n = u / D | 0;
      s[r] = (s[r] + n) % D | 0;
    }
    for (;!s[--o]; )
      s.pop();
    return n ? ++i : s.shift(), e.d = s, e.e = ue(s, i), w ? p(e, a.precision, a.rounding) : e;
  };
  h.toBinary = function(e, n) {
    return ke(this, 2, e, n);
  };
  h.toDecimalPlaces = h.toDP = function(e, n) {
    var i = this, t2 = i.constructor;
    return i = new t2(i), e === undefined ? i : (_(e, 0, $), n === undefined ? n = t2.rounding : _(n, 0, 8), p(i, e + i.e + 1, n));
  };
  h.toExponential = function(e, n) {
    var i, t2 = this, r = t2.constructor;
    return e === undefined ? i = F(t2, true) : (_(e, 0, $), n === undefined ? n = r.rounding : _(n, 0, 8), t2 = p(new r(t2), e + 1, n), i = F(t2, true, e + 1)), t2.isNeg() && !t2.isZero() ? "-" + i : i;
  };
  h.toFixed = function(e, n) {
    var i, t2, r = this, s = r.constructor;
    return e === undefined ? i = F(r) : (_(e, 0, $), n === undefined ? n = s.rounding : _(n, 0, 8), t2 = p(new s(r), e + r.e + 1, n), i = F(t2, false, e + t2.e + 1)), r.isNeg() && !r.isZero() ? "-" + i : i;
  };
  h.toFraction = function(e) {
    var n, i, t2, r, s, o, u, l, f, c, a, d, g = this, v = g.d, N = g.constructor;
    if (!v)
      return new N(g);
    if (f = i = new N(1), t2 = l = new N(0), n = new N(t2), s = n.e = Ze(v) - g.e - 1, o = s % m, n.d[0] = C(10, o < 0 ? m + o : o), e == null)
      e = s > 0 ? n : f;
    else {
      if (u = new N(e), !u.isInt() || u.lt(f))
        throw Error(V + u);
      e = u.gt(n) ? s > 0 ? n : f : u;
    }
    for (w = false, u = new N(O(v)), c = N.precision, N.precision = s = v.length * m * 2;a = S(u, n, 0, 1, 1), r = i.plus(a.times(t2)), r.cmp(e) != 1; )
      i = t2, t2 = r, r = f, f = l.plus(a.times(r)), l = r, r = n, n = u.minus(a.times(r)), u = r;
    return r = S(e.minus(i), t2, 0, 1, 1), l = l.plus(r.times(f)), i = i.plus(r.times(t2)), l.s = f.s = g.s, d = S(f, t2, s, 1).minus(g).abs().cmp(S(l, i, s, 1).minus(g).abs()) < 1 ? [f, t2] : [l, i], N.precision = c, w = true, d;
  };
  h.toHexadecimal = h.toHex = function(e, n) {
    return ke(this, 16, e, n);
  };
  h.toNearest = function(e, n) {
    var i = this, t2 = i.constructor;
    if (i = new t2(i), e == null) {
      if (!i.d)
        return i;
      e = new t2(1), n = t2.rounding;
    } else {
      if (e = new t2(e), n === undefined ? n = t2.rounding : _(n, 0, 8), !i.d)
        return e.s ? i : e;
      if (!e.d)
        return e.s && (e.s = i.s), e;
    }
    return e.d[0] ? (w = false, i = S(i, e, 0, n, 1).times(e), w = true, p(i)) : (e.s = i.s, i = e), i;
  };
  h.toNumber = function() {
    return +this;
  };
  h.toOctal = function(e, n) {
    return ke(this, 8, e, n);
  };
  h.toPower = h.pow = function(e) {
    var n, i, t2, r, s, o, u = this, l = u.constructor, f = +(e = new l(e));
    if (!u.d || !e.d || !u.d[0] || !e.d[0])
      return new l(C(+u, f));
    if (u = new l(u), u.eq(1))
      return u;
    if (t2 = l.precision, s = l.rounding, e.eq(1))
      return p(u, t2, s);
    if (n = b(e.e / m), n >= e.d.length - 1 && (i = f < 0 ? -f : f) <= tn)
      return r = Ue(l, u, i, t2), e.s < 0 ? new l(1).div(r) : p(r, t2, s);
    if (o = u.s, o < 0) {
      if (n < e.d.length - 1)
        return new l(NaN);
      if (e.d[n] & 1 || (o = 1), u.e == 0 && u.d[0] == 1 && u.d.length == 1)
        return u.s = o, u;
    }
    return i = C(+u, f), n = i == 0 || !isFinite(i) ? b(f * (Math.log("0." + O(u.d)) / Math.LN10 + u.e + 1)) : new l(i + "").e, n > l.maxE + 1 || n < l.minE - 1 ? new l(n > 0 ? o / 0 : 0) : (w = false, l.rounding = u.s = 1, i = Math.min(12, (n + "").length), r = Ee(e.times(B(u, t2 + i)), t2), r.d && (r = p(r, t2 + 5, 1), x(r.d, t2, s) && (n = t2 + 10, r = p(Ee(e.times(B(u, n + i)), n), n + 5, 1), +O(r.d).slice(t2 + 1, t2 + 15) + 1 == 100000000000000 && (r = p(r, t2 + 1, 0)))), r.s = o, w = true, l.rounding = s, p(r, t2, s));
  };
  h.toPrecision = function(e, n) {
    var i, t2 = this, r = t2.constructor;
    return e === undefined ? i = F(t2, t2.e <= r.toExpNeg || t2.e >= r.toExpPos) : (_(e, 1, $), n === undefined ? n = r.rounding : _(n, 0, 8), t2 = p(new r(t2), e, n), i = F(t2, e <= t2.e || t2.e <= r.toExpNeg, e)), t2.isNeg() && !t2.isZero() ? "-" + i : i;
  };
  h.toSignificantDigits = h.toSD = function(e, n) {
    var i = this, t2 = i.constructor;
    return e === undefined ? (e = t2.precision, n = t2.rounding) : (_(e, 1, $), n === undefined ? n = t2.rounding : _(n, 0, 8)), p(new t2(i), e, n);
  };
  h.toString = function() {
    var e = this, n = e.constructor, i = F(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
    return e.isNeg() && !e.isZero() ? "-" + i : i;
  };
  h.truncated = h.trunc = function() {
    return p(new this.constructor(this), this.e + 1, 1);
  };
  h.valueOf = h.toJSON = function() {
    var e = this, n = e.constructor, i = F(e, e.e <= n.toExpNeg || e.e >= n.toExpPos);
    return e.isNeg() ? "-" + i : i;
  };
  function O(e) {
    var n, i, t2, r = e.length - 1, s = "", o = e[0];
    if (r > 0) {
      for (s += o, n = 1;n < r; n++)
        t2 = e[n] + "", i = m - t2.length, i && (s += U(i)), s += t2;
      o = e[n], t2 = o + "", i = m - t2.length, i && (s += U(i));
    } else if (o === 0)
      return "0";
    for (;o % 10 === 0; )
      o /= 10;
    return s + o;
  }
  function _(e, n, i) {
    if (e !== ~~e || e < n || e > i)
      throw Error(V + e);
  }
  function x(e, n, i, t2) {
    var r, s, o, u;
    for (s = e[0];s >= 10; s /= 10)
      --n;
    return --n < 0 ? (n += m, r = 0) : (r = Math.ceil((n + 1) / m), n %= m), s = C(10, m - n), u = e[r] % s | 0, t2 == null ? n < 3 ? (n == 0 ? u = u / 100 | 0 : n == 1 && (u = u / 10 | 0), o = i < 4 && u == 99999 || i > 3 && u == 49999 || u == 50000 || u == 0) : o = (i < 4 && u + 1 == s || i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 100 | 0) == C(10, n - 2) - 1 || (u == s / 2 || u == 0) && (e[r + 1] / s / 100 | 0) == 0 : n < 4 ? (n == 0 ? u = u / 1000 | 0 : n == 1 ? u = u / 100 | 0 : n == 2 && (u = u / 10 | 0), o = (t2 || i < 4) && u == 9999 || !t2 && i > 3 && u == 4999) : o = ((t2 || i < 4) && u + 1 == s || !t2 && i > 3 && u + 1 == s / 2) && (e[r + 1] / s / 1000 | 0) == C(10, n - 3) - 1, o;
  }
  function ie(e, n, i) {
    for (var t2, r = [0], s, o = 0, u = e.length;o < u; ) {
      for (s = r.length;s--; )
        r[s] *= n;
      for (r[0] += we.indexOf(e.charAt(o++)), t2 = 0;t2 < r.length; t2++)
        r[t2] > i - 1 && (r[t2 + 1] === undefined && (r[t2 + 1] = 0), r[t2 + 1] += r[t2] / i | 0, r[t2] %= i);
    }
    return r.reverse();
  }
  function sn(e, n) {
    var i, t2, r;
    if (n.isZero())
      return n;
    t2 = n.d.length, t2 < 32 ? (i = Math.ceil(t2 / 3), r = (1 / fe(4, i)).toString()) : (i = 16, r = "2.3283064365386962890625e-10"), e.precision += i, n = j(e, 1, n.times(r), new e(1));
    for (var s = i;s--; ) {
      var o = n.times(n);
      n = o.times(o).minus(o).times(8).plus(1);
    }
    return e.precision -= i, n;
  }
  var S = function() {
    function e(t2, r, s) {
      var o, u = 0, l = t2.length;
      for (t2 = t2.slice();l--; )
        o = t2[l] * r + u, t2[l] = o % s | 0, u = o / s | 0;
      return u && t2.unshift(u), t2;
    }
    function n(t2, r, s, o) {
      var u, l;
      if (s != o)
        l = s > o ? 1 : -1;
      else
        for (u = l = 0;u < s; u++)
          if (t2[u] != r[u]) {
            l = t2[u] > r[u] ? 1 : -1;
            break;
          }
      return l;
    }
    function i(t2, r, s, o) {
      for (var u = 0;s--; )
        t2[s] -= u, u = t2[s] < r[s] ? 1 : 0, t2[s] = u * o + t2[s] - r[s];
      for (;!t2[0] && t2.length > 1; )
        t2.shift();
    }
    return function(t2, r, s, o, u, l) {
      var f, c, a, d, g, v, N, A, M, q, E, P, Y, I, le, z, W, ce, T, y, ee = t2.constructor, ae = t2.s == r.s ? 1 : -1, R = t2.d, k = r.d;
      if (!R || !R[0] || !k || !k[0])
        return new ee(!t2.s || !r.s || (R ? k && R[0] == k[0] : !k) ? NaN : R && R[0] == 0 || !k ? ae * 0 : ae / 0);
      for (l ? (g = 1, c = t2.e - r.e) : (l = D, g = m, c = b(t2.e / g) - b(r.e / g)), T = k.length, W = R.length, M = new ee(ae), q = M.d = [], a = 0;k[a] == (R[a] || 0); a++)
        ;
      if (k[a] > (R[a] || 0) && c--, s == null ? (I = s = ee.precision, o = ee.rounding) : u ? I = s + (t2.e - r.e) + 1 : I = s, I < 0)
        q.push(1), v = true;
      else {
        if (I = I / g + 2 | 0, a = 0, T == 1) {
          for (d = 0, k = k[0], I++;(a < W || d) && I--; a++)
            le = d * l + (R[a] || 0), q[a] = le / k | 0, d = le % k | 0;
          v = d || a < W;
        } else {
          for (d = l / (k[0] + 1) | 0, d > 1 && (k = e(k, d, l), R = e(R, d, l), T = k.length, W = R.length), z = T, E = R.slice(0, T), P = E.length;P < T; )
            E[P++] = 0;
          y = k.slice(), y.unshift(0), ce = k[0], k[1] >= l / 2 && ++ce;
          do
            d = 0, f = n(k, E, T, P), f < 0 ? (Y = E[0], T != P && (Y = Y * l + (E[1] || 0)), d = Y / ce | 0, d > 1 ? (d >= l && (d = l - 1), N = e(k, d, l), A = N.length, P = E.length, f = n(N, E, A, P), f == 1 && (d--, i(N, T < A ? y : k, A, l))) : (d == 0 && (f = d = 1), N = k.slice()), A = N.length, A < P && N.unshift(0), i(E, N, P, l), f == -1 && (P = E.length, f = n(k, E, T, P), f < 1 && (d++, i(E, T < P ? y : k, P, l))), P = E.length) : f === 0 && (d++, E = [0]), q[a++] = d, f && E[0] ? E[P++] = R[z] || 0 : (E = [R[z]], P = 1);
          while ((z++ < W || E[0] !== undefined) && I--);
          v = E[0] !== undefined;
        }
        q[0] || q.shift();
      }
      if (g == 1)
        M.e = c, Te = v;
      else {
        for (a = 1, d = q[0];d >= 10; d /= 10)
          a++;
        M.e = a + c * g - 1, p(M, u ? s + M.e + 1 : s, o, v);
      }
      return M;
    };
  }();
  function p(e, n, i, t2) {
    var r, s, o, u, l, f, c, a, d, g = e.constructor;
    e:
      if (n != null) {
        if (a = e.d, !a)
          return e;
        for (r = 1, u = a[0];u >= 10; u /= 10)
          r++;
        if (s = n - r, s < 0)
          s += m, o = n, c = a[d = 0], l = c / C(10, r - o - 1) % 10 | 0;
        else if (d = Math.ceil((s + 1) / m), u = a.length, d >= u)
          if (t2) {
            for (;u++ <= d; )
              a.push(0);
            c = l = 0, r = 1, s %= m, o = s - m + 1;
          } else
            break e;
        else {
          for (c = u = a[d], r = 1;u >= 10; u /= 10)
            r++;
          s %= m, o = s - m + r, l = o < 0 ? 0 : c / C(10, r - o - 1) % 10 | 0;
        }
        if (t2 = t2 || n < 0 || a[d + 1] !== undefined || (o < 0 ? c : c % C(10, r - o - 1)), f = i < 4 ? (l || t2) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (i == 4 || t2 || i == 6 && (s > 0 ? o > 0 ? c / C(10, r - o) : 0 : a[d - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), n < 1 || !a[0])
          return a.length = 0, f ? (n -= e.e + 1, a[0] = C(10, (m - n % m) % m), e.e = -n || 0) : a[0] = e.e = 0, e;
        if (s == 0 ? (a.length = d, u = 1, d--) : (a.length = d + 1, u = C(10, m - s), a[d] = o > 0 ? (c / C(10, r - o) % C(10, o) | 0) * u : 0), f)
          for (;; )
            if (d == 0) {
              for (s = 1, o = a[0];o >= 10; o /= 10)
                s++;
              for (o = a[0] += u, u = 1;o >= 10; o /= 10)
                u++;
              s != u && (e.e++, a[0] == D && (a[0] = 1));
              break;
            } else {
              if (a[d] += u, a[d] != D)
                break;
              a[d--] = 0, u = 1;
            }
        for (s = a.length;a[--s] === 0; )
          a.pop();
      }
    return w && (e.e > g.maxE ? (e.d = null, e.e = NaN) : e.e < g.minE && (e.e = 0, e.d = [0])), e;
  }
  function F(e, n, i) {
    if (!e.isFinite())
      return Ve(e);
    var t2, r = e.e, s = O(e.d), o = s.length;
    return n ? (i && (t2 = i - o) > 0 ? s = s.charAt(0) + "." + s.slice(1) + U(t2) : o > 1 && (s = s.charAt(0) + "." + s.slice(1)), s = s + (e.e < 0 ? "e" : "e+") + e.e) : r < 0 ? (s = "0." + U(-r - 1) + s, i && (t2 = i - o) > 0 && (s += U(t2))) : r >= o ? (s += U(r + 1 - o), i && (t2 = i - r - 1) > 0 && (s = s + "." + U(t2))) : ((t2 = r + 1) < o && (s = s.slice(0, t2) + "." + s.slice(t2)), i && (t2 = i - o) > 0 && (r + 1 === o && (s += "."), s += U(t2))), s;
  }
  function ue(e, n) {
    var i = e[0];
    for (n *= m;i >= 10; i /= 10)
      n++;
    return n;
  }
  function se(e, n, i) {
    if (n > rn)
      throw w = true, i && (e.precision = i), Error(Le);
    return p(new e(te), n, 1, true);
  }
  function L(e, n, i) {
    if (n > ve)
      throw Error(Le);
    return p(new e(re), n, i, true);
  }
  function Ze(e) {
    var n = e.length - 1, i = n * m + 1;
    if (n = e[n], n) {
      for (;n % 10 == 0; n /= 10)
        i--;
      for (n = e[0];n >= 10; n /= 10)
        i++;
    }
    return i;
  }
  function U(e) {
    for (var n = "";e--; )
      n += "0";
    return n;
  }
  function Ue(e, n, i, t2) {
    var r, s = new e(1), o = Math.ceil(t2 / m + 4);
    for (w = false;; ) {
      if (i % 2 && (s = s.times(n), _e(s.d, o) && (r = true)), i = b(i / 2), i === 0) {
        i = s.d.length - 1, r && s.d[i] === 0 && ++s.d[i];
        break;
      }
      n = n.times(n), _e(n.d, o);
    }
    return w = true, s;
  }
  function Ae(e) {
    return e.d[e.d.length - 1] & 1;
  }
  function Be(e, n, i) {
    for (var t2, r = new e(n[0]), s = 0;++s < n.length; )
      if (t2 = new e(n[s]), t2.s)
        r[i](t2) && (r = t2);
      else {
        r = t2;
        break;
      }
    return r;
  }
  function Ee(e, n) {
    var i, t2, r, s, o, u, l, f = 0, c = 0, a = 0, d = e.constructor, g = d.rounding, v = d.precision;
    if (!e.d || !e.d[0] || e.e > 17)
      return new d(e.d ? e.d[0] ? e.s < 0 ? 0 : 1 / 0 : 1 : e.s ? e.s < 0 ? 0 : e : NaN);
    for (n == null ? (w = false, l = v) : l = n, u = new d(0.03125);e.e > -2; )
      e = e.times(u), a += 5;
    for (t2 = Math.log(C(2, a)) / Math.LN10 * 2 + 5 | 0, l += t2, i = s = o = new d(1), d.precision = l;; ) {
      if (s = p(s.times(e), l, 1), i = i.times(++c), u = o.plus(S(s, i, l, 1)), O(u.d).slice(0, l) === O(o.d).slice(0, l)) {
        for (r = a;r--; )
          o = p(o.times(o), l, 1);
        if (n == null)
          if (f < 3 && x(o.d, l - t2, g, f))
            d.precision = l += 10, i = s = u = new d(1), c = 0, f++;
          else
            return p(o, d.precision = v, g, w = true);
        else
          return d.precision = v, o;
      }
      o = u;
    }
  }
  function B(e, n) {
    var i, t2, r, s, o, u, l, f, c, a, d, g = 1, v = 10, N = e, A = N.d, M = N.constructor, q = M.rounding, E = M.precision;
    if (N.s < 0 || !A || !A[0] || !N.e && A[0] == 1 && A.length == 1)
      return new M(A && !A[0] ? -1 / 0 : N.s != 1 ? NaN : A ? 0 : N);
    if (n == null ? (w = false, c = E) : c = n, M.precision = c += v, i = O(A), t2 = i.charAt(0), Math.abs(s = N.e) < 1500000000000000) {
      for (;t2 < 7 && t2 != 1 || t2 == 1 && i.charAt(1) > 3; )
        N = N.times(e), i = O(N.d), t2 = i.charAt(0), g++;
      s = N.e, t2 > 1 ? (N = new M("0." + i), s++) : N = new M(t2 + "." + i.slice(1));
    } else
      return f = se(M, c + 2, E).times(s + ""), N = B(new M(t2 + "." + i.slice(1)), c - v).plus(f), M.precision = E, n == null ? p(N, E, q, w = true) : N;
    for (a = N, l = o = N = S(N.minus(1), N.plus(1), c, 1), d = p(N.times(N), c, 1), r = 3;; ) {
      if (o = p(o.times(d), c, 1), f = l.plus(S(o, new M(r), c, 1)), O(f.d).slice(0, c) === O(l.d).slice(0, c))
        if (l = l.times(2), s !== 0 && (l = l.plus(se(M, c + 2, E).times(s + ""))), l = S(l, new M(g), c, 1), n == null)
          if (x(l.d, c - v, q, u))
            M.precision = c += v, f = o = N = S(a.minus(1), a.plus(1), c, 1), d = p(N.times(N), c, 1), r = u = 1;
          else
            return p(l, M.precision = E, q, w = true);
        else
          return M.precision = E, l;
      l = f, r += 2;
    }
  }
  function Ve(e) {
    return String(e.s * e.s / 0);
  }
  function Se(e, n) {
    var i, t2, r;
    for ((i = n.indexOf(".")) > -1 && (n = n.replace(".", "")), (t2 = n.search(/e/i)) > 0 ? (i < 0 && (i = t2), i += +n.slice(t2 + 1), n = n.substring(0, t2)) : i < 0 && (i = n.length), t2 = 0;n.charCodeAt(t2) === 48; t2++)
      ;
    for (r = n.length;n.charCodeAt(r - 1) === 48; --r)
      ;
    if (n = n.slice(t2, r), n) {
      if (r -= t2, e.e = i = i - t2 - 1, e.d = [], t2 = (i + 1) % m, i < 0 && (t2 += m), t2 < r) {
        for (t2 && e.d.push(+n.slice(0, t2)), r -= m;t2 < r; )
          e.d.push(+n.slice(t2, t2 += m));
        n = n.slice(t2), t2 = m - n.length;
      } else
        t2 -= r;
      for (;t2--; )
        n += "0";
      e.d.push(+n), w && (e.e > e.constructor.maxE ? (e.d = null, e.e = NaN) : e.e < e.constructor.minE && (e.e = 0, e.d = [0]));
    } else
      e.e = 0, e.d = [0];
    return e;
  }
  function on(e, n) {
    var i, t2, r, s, o, u, l, f, c;
    if (n.indexOf("_") > -1) {
      if (n = n.replace(/(\d)_(?=\d)/g, "$1"), Ie.test(n))
        return Se(e, n);
    } else if (n === "Infinity" || n === "NaN")
      return +n || (e.s = NaN), e.e = NaN, e.d = null, e;
    if (en.test(n))
      i = 16, n = n.toLowerCase();
    else if (ye.test(n))
      i = 2;
    else if (nn.test(n))
      i = 8;
    else
      throw Error(V + n);
    for (s = n.search(/p/i), s > 0 ? (l = +n.slice(s + 1), n = n.substring(2, s)) : n = n.slice(2), s = n.indexOf("."), o = s >= 0, t2 = e.constructor, o && (n = n.replace(".", ""), u = n.length, s = u - s, r = Ue(t2, new t2(i), s, s * 2)), f = ie(n, i, D), c = f.length - 1, s = c;f[s] === 0; --s)
      f.pop();
    return s < 0 ? new t2(e.s * 0) : (e.e = ue(f, c), e.d = f, w = false, o && (e = S(e, r, u * 4)), l && (e = e.times(Math.abs(l) < 54 ? C(2, l) : Q.pow(2, l))), w = true, e);
  }
  function un(e, n) {
    var i, t2 = n.d.length;
    if (t2 < 3)
      return n.isZero() ? n : j(e, 2, n, n);
    i = 1.4 * Math.sqrt(t2), i = i > 16 ? 16 : i | 0, n = n.times(1 / fe(5, i)), n = j(e, 2, n, n);
    for (var r, s = new e(5), o = new e(16), u = new e(20);i--; )
      r = n.times(n), n = n.times(s.plus(r.times(o.times(r).minus(u))));
    return n;
  }
  function j(e, n, i, t2, r) {
    var s, o, u, l, f = 1, c = e.precision, a = Math.ceil(c / m);
    for (w = false, l = i.times(i), u = new e(t2);; ) {
      if (o = S(u.times(l), new e(n++ * n++), c, 1), u = r ? t2.plus(o) : t2.minus(o), t2 = S(o.times(l), new e(n++ * n++), c, 1), o = u.plus(t2), o.d[a] !== undefined) {
        for (s = a;o.d[s] === u.d[s] && s--; )
          ;
        if (s == -1)
          break;
      }
      s = u, u = t2, t2 = o, o = s, f++;
    }
    return w = true, o.d.length = a + 1, o;
  }
  function fe(e, n) {
    for (var i = e;--n; )
      i *= e;
    return i;
  }
  function $e(e, n) {
    var i, t2 = n.s < 0, r = L(e, e.precision, 1), s = r.times(0.5);
    if (n = n.abs(), n.lte(s))
      return Z = t2 ? 4 : 1, n;
    if (i = n.divToInt(r), i.isZero())
      Z = t2 ? 3 : 2;
    else {
      if (n = n.minus(i.times(r)), n.lte(s))
        return Z = Ae(i) ? t2 ? 2 : 3 : t2 ? 4 : 1, n;
      Z = Ae(i) ? t2 ? 1 : 4 : t2 ? 3 : 2;
    }
    return n.minus(r).abs();
  }
  function ke(e, n, i, t2) {
    var r, s, o, u, l, f, c, a, d, g = e.constructor, v = i !== undefined;
    if (v ? (_(i, 1, $), t2 === undefined ? t2 = g.rounding : _(t2, 0, 8)) : (i = g.precision, t2 = g.rounding), !e.isFinite())
      c = Ve(e);
    else {
      for (c = F(e), o = c.indexOf("."), v ? (r = 2, n == 16 ? i = i * 4 - 3 : n == 8 && (i = i * 3 - 2)) : r = n, o >= 0 && (c = c.replace(".", ""), d = new g(1), d.e = c.length - o, d.d = ie(F(d), 10, r), d.e = d.d.length), a = ie(c, 10, r), s = l = a.length;a[--l] == 0; )
        a.pop();
      if (!a[0])
        c = v ? "0p+0" : "0";
      else {
        if (o < 0 ? s-- : (e = new g(e), e.d = a, e.e = s, e = S(e, d, i, t2, 0, r), a = e.d, s = e.e, f = Te), o = a[i], u = r / 2, f = f || a[i + 1] !== undefined, f = t2 < 4 ? (o !== undefined || f) && (t2 === 0 || t2 === (e.s < 0 ? 3 : 2)) : o > u || o === u && (t2 === 4 || f || t2 === 6 && a[i - 1] & 1 || t2 === (e.s < 0 ? 8 : 7)), a.length = i, f)
          for (;++a[--i] > r - 1; )
            a[i] = 0, i || (++s, a.unshift(1));
        for (l = a.length;!a[l - 1]; --l)
          ;
        for (o = 0, c = "";o < l; o++)
          c += we.charAt(a[o]);
        if (v) {
          if (l > 1)
            if (n == 16 || n == 8) {
              for (o = n == 16 ? 4 : 3, --l;l % o; l++)
                c += "0";
              for (a = ie(c, r, n), l = a.length;!a[l - 1]; --l)
                ;
              for (o = 1, c = "1.";o < l; o++)
                c += we.charAt(a[o]);
            } else
              c = c.charAt(0) + "." + c.slice(1);
          c = c + (s < 0 ? "p" : "p+") + s;
        } else if (s < 0) {
          for (;++s; )
            c = "0" + c;
          c = "0." + c;
        } else if (++s > l)
          for (s -= l;s--; )
            c += "0";
        else
          s < l && (c = c.slice(0, s) + "." + c.slice(s));
      }
      c = (n == 16 ? "0x" : n == 2 ? "0b" : n == 8 ? "0o" : "") + c;
    }
    return e.s < 0 ? "-" + c : c;
  }
  function _e(e, n) {
    if (e.length > n)
      return e.length = n, true;
  }
  function fn(e) {
    return new this(e).abs();
  }
  function ln(e) {
    return new this(e).acos();
  }
  function cn(e) {
    return new this(e).acosh();
  }
  function an(e, n) {
    return new this(e).plus(n);
  }
  function dn(e) {
    return new this(e).asin();
  }
  function hn(e) {
    return new this(e).asinh();
  }
  function pn(e) {
    return new this(e).atan();
  }
  function gn(e) {
    return new this(e).atanh();
  }
  function mn(e, n) {
    e = new this(e), n = new this(n);
    var i, t2 = this.precision, r = this.rounding, s = t2 + 4;
    return !e.s || !n.s ? i = new this(NaN) : !e.d && !n.d ? (i = L(this, s, 1).times(n.s > 0 ? 0.25 : 0.75), i.s = e.s) : !n.d || e.isZero() ? (i = n.s < 0 ? L(this, t2, r) : new this(0), i.s = e.s) : !e.d || n.isZero() ? (i = L(this, s, 1).times(0.5), i.s = e.s) : n.s < 0 ? (this.precision = s, this.rounding = 1, i = this.atan(S(e, n, s, 1)), n = L(this, s, 1), this.precision = t2, this.rounding = r, i = e.s < 0 ? i.minus(n) : i.plus(n)) : i = this.atan(S(e, n, s, 1)), i;
  }
  function wn(e) {
    return new this(e).cbrt();
  }
  function Nn(e) {
    return p(e = new this(e), e.e + 1, 2);
  }
  function vn(e, n, i) {
    return new this(e).clamp(n, i);
  }
  function En(e) {
    if (!e || typeof e != "object")
      throw Error(oe + "Object expected");
    var n, i, t2, r = e.defaults === true, s = ["precision", 1, $, "rounding", 0, 8, "toExpNeg", -H, 0, "toExpPos", 0, H, "maxE", 0, H, "minE", -H, 0, "modulo", 0, 9];
    for (n = 0;n < s.length; n += 3)
      if (i = s[n], r && (this[i] = Ne[i]), (t2 = e[i]) !== undefined)
        if (b(t2) === t2 && t2 >= s[n + 1] && t2 <= s[n + 2])
          this[i] = t2;
        else
          throw Error(V + i + ": " + t2);
    if (i = "crypto", r && (this[i] = Ne[i]), (t2 = e[i]) !== undefined)
      if (t2 === true || t2 === false || t2 === 0 || t2 === 1)
        if (t2)
          if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
            this[i] = true;
          else
            throw Error(De);
        else
          this[i] = false;
      else
        throw Error(V + i + ": " + t2);
    return this;
  }
  function Sn(e) {
    return new this(e).cos();
  }
  function kn(e) {
    return new this(e).cosh();
  }
  function He(e) {
    var n, i, t2;
    function r(s) {
      var o, u, l, f = this;
      if (!(f instanceof r))
        return new r(s);
      if (f.constructor = r, qe(s)) {
        f.s = s.s, w ? !s.d || s.e > r.maxE ? (f.e = NaN, f.d = null) : s.e < r.minE ? (f.e = 0, f.d = [0]) : (f.e = s.e, f.d = s.d.slice()) : (f.e = s.e, f.d = s.d ? s.d.slice() : s.d);
        return;
      }
      if (l = typeof s, l === "number") {
        if (s === 0) {
          f.s = 1 / s < 0 ? -1 : 1, f.e = 0, f.d = [0];
          return;
        }
        if (s < 0 ? (s = -s, f.s = -1) : f.s = 1, s === ~~s && s < 1e7) {
          for (o = 0, u = s;u >= 10; u /= 10)
            o++;
          w ? o > r.maxE ? (f.e = NaN, f.d = null) : o < r.minE ? (f.e = 0, f.d = [0]) : (f.e = o, f.d = [s]) : (f.e = o, f.d = [s]);
          return;
        } else if (s * 0 !== 0) {
          s || (f.s = NaN), f.e = NaN, f.d = null;
          return;
        }
        return Se(f, s.toString());
      } else if (l !== "string")
        throw Error(V + s);
      return (u = s.charCodeAt(0)) === 45 ? (s = s.slice(1), f.s = -1) : (u === 43 && (s = s.slice(1)), f.s = 1), Ie.test(s) ? Se(f, s) : on(f, s);
    }
    if (r.prototype = h, r.ROUND_UP = 0, r.ROUND_DOWN = 1, r.ROUND_CEIL = 2, r.ROUND_FLOOR = 3, r.ROUND_HALF_UP = 4, r.ROUND_HALF_DOWN = 5, r.ROUND_HALF_EVEN = 6, r.ROUND_HALF_CEIL = 7, r.ROUND_HALF_FLOOR = 8, r.EUCLID = 9, r.config = r.set = En, r.clone = He, r.isDecimal = qe, r.abs = fn, r.acos = ln, r.acosh = cn, r.add = an, r.asin = dn, r.asinh = hn, r.atan = pn, r.atanh = gn, r.atan2 = mn, r.cbrt = wn, r.ceil = Nn, r.clamp = vn, r.cos = Sn, r.cosh = kn, r.div = Mn, r.exp = Cn, r.floor = On, r.hypot = Pn, r.ln = Rn, r.log = bn, r.log10 = _n, r.log2 = An, r.max = qn, r.min = Tn, r.mod = Ln, r.mul = Dn, r.pow = Fn, r.random = In, r.round = Zn, r.sign = Un, r.sin = Bn, r.sinh = Vn, r.sqrt = $n, r.sub = Hn, r.sum = jn, r.tan = Wn, r.tanh = Gn, r.trunc = Jn, e === undefined && (e = {}), e && e.defaults !== true)
      for (t2 = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"], n = 0;n < t2.length; )
        e.hasOwnProperty(i = t2[n++]) || (e[i] = this[i]);
    return r.config(e), r;
  }
  function Mn(e, n) {
    return new this(e).div(n);
  }
  function Cn(e) {
    return new this(e).exp();
  }
  function On(e) {
    return p(e = new this(e), e.e + 1, 3);
  }
  function Pn() {
    var e, n, i = new this(0);
    for (w = false, e = 0;e < arguments.length; )
      if (n = new this(arguments[e++]), n.d)
        i.d && (i = i.plus(n.times(n)));
      else {
        if (n.s)
          return w = true, new this(1 / 0);
        i = n;
      }
    return w = true, i.sqrt();
  }
  function qe(e) {
    return e instanceof Q || e && e.toStringTag === Fe || false;
  }
  function Rn(e) {
    return new this(e).ln();
  }
  function bn(e, n) {
    return new this(e).log(n);
  }
  function An(e) {
    return new this(e).log(2);
  }
  function _n(e) {
    return new this(e).log(10);
  }
  function qn() {
    return Be(this, arguments, "lt");
  }
  function Tn() {
    return Be(this, arguments, "gt");
  }
  function Ln(e, n) {
    return new this(e).mod(n);
  }
  function Dn(e, n) {
    return new this(e).mul(n);
  }
  function Fn(e, n) {
    return new this(e).pow(n);
  }
  function In(e) {
    var n, i, t2, r, s = 0, o = new this(1), u = [];
    if (e === undefined ? e = this.precision : _(e, 1, $), t2 = Math.ceil(e / m), this.crypto)
      if (crypto.getRandomValues)
        for (n = crypto.getRandomValues(new Uint32Array(t2));s < t2; )
          r = n[s], r >= 4290000000 ? n[s] = crypto.getRandomValues(new Uint32Array(1))[0] : u[s++] = r % 1e7;
      else if (crypto.randomBytes) {
        for (n = crypto.randomBytes(t2 *= 4);s < t2; )
          r = n[s] + (n[s + 1] << 8) + (n[s + 2] << 16) + ((n[s + 3] & 127) << 24), r >= 2140000000 ? crypto.randomBytes(4).copy(n, s) : (u.push(r % 1e7), s += 4);
        s = t2 / 4;
      } else
        throw Error(De);
    else
      for (;s < t2; )
        u[s++] = Math.random() * 1e7 | 0;
    for (t2 = u[--s], e %= m, t2 && e && (r = C(10, m - e), u[s] = (t2 / r | 0) * r);u[s] === 0; s--)
      u.pop();
    if (s < 0)
      i = 0, u = [0];
    else {
      for (i = -1;u[0] === 0; i -= m)
        u.shift();
      for (t2 = 1, r = u[0];r >= 10; r /= 10)
        t2++;
      t2 < m && (i -= m - t2);
    }
    return o.e = i, o.d = u, o;
  }
  function Zn(e) {
    return p(e = new this(e), e.e + 1, this.rounding);
  }
  function Un(e) {
    return e = new this(e), e.d ? e.d[0] ? e.s : 0 * e.s : e.s || NaN;
  }
  function Bn(e) {
    return new this(e).sin();
  }
  function Vn(e) {
    return new this(e).sinh();
  }
  function $n(e) {
    return new this(e).sqrt();
  }
  function Hn(e, n) {
    return new this(e).sub(n);
  }
  function jn() {
    var e = 0, n = arguments, i = new this(n[e]);
    for (w = false;i.s && ++e < n.length; )
      i = i.plus(n[e]);
    return w = true, p(i, this.precision, this.rounding);
  }
  function Wn(e) {
    return new this(e).tan();
  }
  function Gn(e) {
    return new this(e).tanh();
  }
  function Jn(e) {
    return p(e = new this(e), e.e + 1, 1);
  }
  h[Symbol.for("nodejs.util.inspect.custom")] = h.toString;
  h[Symbol.toStringTag] = "Decimal";
  var Q = h.constructor = He(Ne);
  te = new Q(te);
  re = new Q(re);
  var je = Q;
  /*! Bundled license information:
  
  decimal.js/decimal.mjs:
    (*!
     *  decimal.js v10.4.3
     *  An arbitrary-precision Decimal type for JavaScript.
     *  https://github.com/MikeMcl/decimal.js
     *  Copyright (c) 2022 Michael Mclaughlin <M8ch88l@gmail.com>
     *  MIT Licence
     *)
  */
});

// node_modules/.prisma/client/index-browser.js
var require_index_browser2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", { value: true });
  var {
    Decimal: Decimal2,
    objectEnumValues: objectEnumValues2,
    makeStrictEnum: makeStrictEnum2,
    Public: Public2,
    getRuntime: getRuntime2,
    skip
  } = require_index_browser();
  var Prisma = {};
  exports.Prisma = Prisma;
  exports.$Enums = {};
  Prisma.prismaVersion = {
    client: "5.22.0",
    engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
  };
  Prisma.PrismaClientKnownRequestError = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.PrismaClientUnknownRequestError = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.PrismaClientRustPanicError = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.PrismaClientInitializationError = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.PrismaClientValidationError = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.NotFoundError = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.Decimal = Decimal2;
  Prisma.sql = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.empty = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.join = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.raw = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.validator = Public2.validator;
  Prisma.getExtensionContext = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.defineExtension = () => {
    const runtimeName = getRuntime2().prettyName;
    throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`);
  };
  Prisma.DbNull = objectEnumValues2.instances.DbNull;
  Prisma.JsonNull = objectEnumValues2.instances.JsonNull;
  Prisma.AnyNull = objectEnumValues2.instances.AnyNull;
  Prisma.NullTypes = {
    DbNull: objectEnumValues2.classes.DbNull,
    JsonNull: objectEnumValues2.classes.JsonNull,
    AnyNull: objectEnumValues2.classes.AnyNull
  };
  exports.Prisma.TransactionIsolationLevel = makeStrictEnum2({
    ReadUncommitted: "ReadUncommitted",
    ReadCommitted: "ReadCommitted",
    RepeatableRead: "RepeatableRead",
    Serializable: "Serializable"
  });
  exports.Prisma.ThreadScalarFieldEnum = {
    id: "id",
    title: "title",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    metadata: "metadata"
  };
  exports.Prisma.MessageScalarFieldEnum = {
    id: "id",
    threadId: "threadId",
    role: "role",
    content: "content",
    metadata: "metadata",
    createdAt: "createdAt",
    updatedAt: "updatedAt"
  };
  exports.Prisma.SortOrder = {
    asc: "asc",
    desc: "desc"
  };
  exports.Prisma.NullableJsonNullValueInput = {
    DbNull: Prisma.DbNull,
    JsonNull: Prisma.JsonNull
  };
  exports.Prisma.JsonNullValueInput = {
    JsonNull: Prisma.JsonNull
  };
  exports.Prisma.QueryMode = {
    default: "default",
    insensitive: "insensitive"
  };
  exports.Prisma.JsonNullValueFilter = {
    DbNull: Prisma.DbNull,
    JsonNull: Prisma.JsonNull,
    AnyNull: Prisma.AnyNull
  };
  exports.Prisma.NullsOrder = {
    first: "first",
    last: "last"
  };
  exports.MessageRole = exports.$Enums.MessageRole = {
    function: "function",
    user: "user",
    system: "system",
    assistant: "assistant",
    data: "data",
    tool: "tool"
  };
  exports.Prisma.ModelName = {
    Thread: "Thread",
    Message: "Message"
  };

  class PrismaClient {
    constructor() {
      return new Proxy(this, {
        get(target, prop) {
          let message;
          const runtime = getRuntime2();
          if (runtime.isEdge) {
            message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
          } else {
            message = "PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `" + runtime.prettyName + "`).";
          }
          message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`;
          throw new Error(message);
        }
      });
    }
  }
  exports.PrismaClient = PrismaClient;
  Object.assign(exports, Prisma);
});

// node_modules/@prisma/client/index-browser.js
var require_index_browser3 = __commonJS((exports, module) => {
  var prisma = require_index_browser2();
  module.exports = prisma;
});

// node_modules/@sinclair/typebox/build/esm/value/guard/guard.mjs
function IsAsyncIterator(value) {
  return IsObject(value) && Symbol.asyncIterator in value;
}
function IsIterator(value) {
  return IsObject(value) && Symbol.iterator in value;
}
function IsStandardObject(value) {
  return IsObject(value) && (Object.getPrototypeOf(value) === Object.prototype || Object.getPrototypeOf(value) === null);
}
function IsPromise(value) {
  return value instanceof Promise;
}
function IsDate(value) {
  return value instanceof Date && Number.isFinite(value.getTime());
}
function IsTypedArray(value) {
  return ArrayBuffer.isView(value);
}
function IsUint8Array(value) {
  return value instanceof globalThis.Uint8Array;
}
function HasPropertyKey(value, key) {
  return key in value;
}
function IsObject(value) {
  return value !== null && typeof value === "object";
}
function IsArray(value) {
  return Array.isArray(value) && !ArrayBuffer.isView(value);
}
function IsUndefined(value) {
  return value === undefined;
}
function IsNull(value) {
  return value === null;
}
function IsBoolean(value) {
  return typeof value === "boolean";
}
function IsNumber(value) {
  return typeof value === "number";
}
function IsInteger(value) {
  return Number.isInteger(value);
}
function IsBigInt(value) {
  return typeof value === "bigint";
}
function IsString(value) {
  return typeof value === "string";
}
function IsFunction(value) {
  return typeof value === "function";
}
function IsSymbol(value) {
  return typeof value === "symbol";
}
function IsValueType(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNull(value) || IsNumber(value) || IsString(value) || IsSymbol(value) || IsUndefined(value);
}
// node_modules/@sinclair/typebox/build/esm/system/policy.mjs
var TypeSystemPolicy;
(function(TypeSystemPolicy2) {
  TypeSystemPolicy2.ExactOptionalPropertyTypes = false;
  TypeSystemPolicy2.AllowArrayObject = false;
  TypeSystemPolicy2.AllowNaN = false;
  TypeSystemPolicy2.AllowNullVoid = false;
  function IsExactOptionalProperty(value, key) {
    return TypeSystemPolicy2.ExactOptionalPropertyTypes ? key in value : value[key] !== undefined;
  }
  TypeSystemPolicy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value) {
    const isObject = IsObject(value);
    return TypeSystemPolicy2.AllowArrayObject ? isObject : isObject && !IsArray(value);
  }
  TypeSystemPolicy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value) {
    return IsObjectLike(value) && !(value instanceof Date) && !(value instanceof Uint8Array);
  }
  TypeSystemPolicy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value) {
    return TypeSystemPolicy2.AllowNaN ? IsNumber(value) : Number.isFinite(value);
  }
  TypeSystemPolicy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value) {
    const isUndefined = IsUndefined(value);
    return TypeSystemPolicy2.AllowNullVoid ? isUndefined || value === null : isUndefined;
  }
  TypeSystemPolicy2.IsVoidLike = IsVoidLike;
})(TypeSystemPolicy || (TypeSystemPolicy = {}));
// node_modules/@sinclair/typebox/build/esm/type/registry/format.mjs
var exports_format = {};
__export(exports_format, {
  Set: () => Set2,
  Has: () => Has,
  Get: () => Get,
  Entries: () => Entries,
  Delete: () => Delete,
  Clear: () => Clear
});
var map = new Map;
function Entries() {
  return new Map(map);
}
function Clear() {
  return map.clear();
}
function Delete(format) {
  return map.delete(format);
}
function Has(format) {
  return map.has(format);
}
function Set2(format, func) {
  map.set(format, func);
}
function Get(format) {
  return map.get(format);
}
// node_modules/@sinclair/typebox/build/esm/type/registry/type.mjs
var exports_type = {};
__export(exports_type, {
  Set: () => Set3,
  Has: () => Has2,
  Get: () => Get2,
  Entries: () => Entries2,
  Delete: () => Delete2,
  Clear: () => Clear2
});
var map2 = new Map;
function Entries2() {
  return new Map(map2);
}
function Clear2() {
  return map2.clear();
}
function Delete2(kind) {
  return map2.delete(kind);
}
function Has2(kind) {
  return map2.has(kind);
}
function Set3(kind, func) {
  map2.set(kind, func);
}
function Get2(kind) {
  return map2.get(kind);
}
// node_modules/@sinclair/typebox/build/esm/type/symbols/symbols.mjs
var TransformKind = Symbol.for("TypeBox.Transform");
var ReadonlyKind = Symbol.for("TypeBox.Readonly");
var OptionalKind = Symbol.for("TypeBox.Optional");
var Hint = Symbol.for("TypeBox.Hint");
var Kind = Symbol.for("TypeBox.Kind");
// node_modules/@sinclair/typebox/build/esm/type/unsafe/unsafe.mjs
function Unsafe(options = {}) {
  return {
    ...options,
    [Kind]: options[Kind] ?? "Unsafe"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/error/error.mjs
class TypeBoxError extends Error {
  constructor(message) {
    super(message);
  }
}
// node_modules/@sinclair/typebox/build/esm/system/system.mjs
class TypeSystemDuplicateTypeKind extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate type kind '${kind}' detected`);
  }
}

class TypeSystemDuplicateFormat extends TypeBoxError {
  constructor(kind) {
    super(`Duplicate string format '${kind}' detected`);
  }
}
var TypeSystem;
(function(TypeSystem2) {
  function Type(kind, check) {
    if (exports_type.Has(kind))
      throw new TypeSystemDuplicateTypeKind(kind);
    exports_type.Set(kind, check);
    return (options = {}) => Unsafe({ ...options, [Kind]: kind });
  }
  TypeSystem2.Type = Type;
  function Format(format, check) {
    if (exports_format.Has(format))
      throw new TypeSystemDuplicateFormat(format);
    exports_format.Set(format, check);
    return format;
  }
  TypeSystem2.Format = Format;
})(TypeSystem || (TypeSystem = {}));
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped-result.mjs
function MappedResult(properties) {
  return {
    [Kind]: "MappedResult",
    properties
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/value.mjs
var exports_value = {};
__export(exports_value, {
  IsUndefined: () => IsUndefined2,
  IsUint8Array: () => IsUint8Array2,
  IsSymbol: () => IsSymbol2,
  IsString: () => IsString2,
  IsRegExp: () => IsRegExp,
  IsObject: () => IsObject2,
  IsNumber: () => IsNumber2,
  IsNull: () => IsNull2,
  IsIterator: () => IsIterator2,
  IsFunction: () => IsFunction2,
  IsDate: () => IsDate2,
  IsBoolean: () => IsBoolean2,
  IsBigInt: () => IsBigInt2,
  IsAsyncIterator: () => IsAsyncIterator2,
  IsArray: () => IsArray2
});
function IsAsyncIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.asyncIterator in value;
}
function IsArray2(value) {
  return Array.isArray(value);
}
function IsBigInt2(value) {
  return typeof value === "bigint";
}
function IsBoolean2(value) {
  return typeof value === "boolean";
}
function IsDate2(value) {
  return value instanceof globalThis.Date;
}
function IsFunction2(value) {
  return typeof value === "function";
}
function IsIterator2(value) {
  return IsObject2(value) && !IsArray2(value) && !IsUint8Array2(value) && Symbol.iterator in value;
}
function IsNull2(value) {
  return value === null;
}
function IsNumber2(value) {
  return typeof value === "number";
}
function IsObject2(value) {
  return typeof value === "object" && value !== null;
}
function IsRegExp(value) {
  return value instanceof globalThis.RegExp;
}
function IsString2(value) {
  return typeof value === "string";
}
function IsSymbol2(value) {
  return typeof value === "symbol";
}
function IsUint8Array2(value) {
  return value instanceof globalThis.Uint8Array;
}
function IsUndefined2(value) {
  return value === undefined;
}

// node_modules/@sinclair/typebox/build/esm/type/clone/value.mjs
function ArrayType(value) {
  return value.map((value2) => Visit(value2));
}
function DateType(value) {
  return new Date(value.getTime());
}
function Uint8ArrayType(value) {
  return new Uint8Array(value);
}
function RegExpType(value) {
  return new RegExp(value.source, value.flags);
}
function ObjectType(value) {
  const result = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    result[key] = Visit(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    result[key] = Visit(value[key]);
  }
  return result;
}
function Visit(value) {
  return IsArray2(value) ? ArrayType(value) : IsDate2(value) ? DateType(value) : IsUint8Array2(value) ? Uint8ArrayType(value) : IsRegExp(value) ? RegExpType(value) : IsObject2(value) ? ObjectType(value) : value;
}
function Clone(value) {
  return Visit(value);
}

// node_modules/@sinclair/typebox/build/esm/type/clone/type.mjs
function CloneRest(schemas) {
  return schemas.map((schema) => CloneType(schema));
}
function CloneType(schema, options = {}) {
  return { ...Clone(schema), ...options };
}

// node_modules/@sinclair/typebox/build/esm/type/discard/discard.mjs
function DiscardKey(value, key) {
  const { [key]: _, ...rest } = value;
  return rest;
}
function Discard(value, keys) {
  return keys.reduce((acc, key) => DiscardKey(acc, key), value);
}
// node_modules/@sinclair/typebox/build/esm/type/array/array.mjs
function Array2(schema, options = {}) {
  return {
    ...options,
    [Kind]: "Array",
    type: "array",
    items: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/async-iterator/async-iterator.mjs
function AsyncIterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "AsyncIterator",
    type: "AsyncIterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/constructor/constructor.mjs
function Constructor(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Constructor",
    type: "Constructor",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/function/function.mjs
function Function2(parameters, returns, options) {
  return {
    ...options,
    [Kind]: "Function",
    type: "Function",
    parameters: CloneRest(parameters),
    returns: CloneType(returns)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/never/never.mjs
function Never(options = {}) {
  return {
    ...options,
    [Kind]: "Never",
    not: {}
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/kind.mjs
function IsReadonly(value) {
  return IsObject2(value) && value[ReadonlyKind] === "Readonly";
}
function IsOptional(value) {
  return IsObject2(value) && value[OptionalKind] === "Optional";
}
function IsAny(value) {
  return IsKindOf(value, "Any");
}
function IsArray3(value) {
  return IsKindOf(value, "Array");
}
function IsAsyncIterator3(value) {
  return IsKindOf(value, "AsyncIterator");
}
function IsBigInt3(value) {
  return IsKindOf(value, "BigInt");
}
function IsBoolean3(value) {
  return IsKindOf(value, "Boolean");
}
function IsConstructor(value) {
  return IsKindOf(value, "Constructor");
}
function IsDate3(value) {
  return IsKindOf(value, "Date");
}
function IsFunction3(value) {
  return IsKindOf(value, "Function");
}
function IsInteger2(value) {
  return IsKindOf(value, "Integer");
}
function IsIntersect(value) {
  return IsKindOf(value, "Intersect");
}
function IsIterator3(value) {
  return IsKindOf(value, "Iterator");
}
function IsKindOf(value, kind) {
  return IsObject2(value) && Kind in value && value[Kind] === kind;
}
function IsLiteral(value) {
  return IsKindOf(value, "Literal");
}
function IsMappedKey(value) {
  return IsKindOf(value, "MappedKey");
}
function IsMappedResult(value) {
  return IsKindOf(value, "MappedResult");
}
function IsNever(value) {
  return IsKindOf(value, "Never");
}
function IsNot(value) {
  return IsKindOf(value, "Not");
}
function IsNull3(value) {
  return IsKindOf(value, "Null");
}
function IsNumber3(value) {
  return IsKindOf(value, "Number");
}
function IsObject3(value) {
  return IsKindOf(value, "Object");
}
function IsPromise2(value) {
  return IsKindOf(value, "Promise");
}
function IsRecord(value) {
  return IsKindOf(value, "Record");
}
function IsRef(value) {
  return IsKindOf(value, "Ref");
}
function IsRegExp2(value) {
  return IsKindOf(value, "RegExp");
}
function IsString3(value) {
  return IsKindOf(value, "String");
}
function IsSymbol3(value) {
  return IsKindOf(value, "Symbol");
}
function IsTemplateLiteral(value) {
  return IsKindOf(value, "TemplateLiteral");
}
function IsThis(value) {
  return IsKindOf(value, "This");
}
function IsTransform(value) {
  return IsObject2(value) && TransformKind in value;
}
function IsTuple(value) {
  return IsKindOf(value, "Tuple");
}
function IsUndefined3(value) {
  return IsKindOf(value, "Undefined");
}
function IsUnion(value) {
  return IsKindOf(value, "Union");
}
function IsUint8Array3(value) {
  return IsKindOf(value, "Uint8Array");
}
function IsUnknown(value) {
  return IsKindOf(value, "Unknown");
}
function IsUnsafe(value) {
  return IsKindOf(value, "Unsafe");
}
function IsVoid(value) {
  return IsKindOf(value, "Void");
}
function IsKind(value) {
  return IsObject2(value) && Kind in value && IsString2(value[Kind]);
}
function IsSchema(value) {
  return IsAny(value) || IsArray3(value) || IsBoolean3(value) || IsBigInt3(value) || IsAsyncIterator3(value) || IsConstructor(value) || IsDate3(value) || IsFunction3(value) || IsInteger2(value) || IsIntersect(value) || IsIterator3(value) || IsLiteral(value) || IsMappedKey(value) || IsMappedResult(value) || IsNever(value) || IsNot(value) || IsNull3(value) || IsNumber3(value) || IsObject3(value) || IsPromise2(value) || IsRecord(value) || IsRef(value) || IsRegExp2(value) || IsString3(value) || IsSymbol3(value) || IsTemplateLiteral(value) || IsThis(value) || IsTuple(value) || IsUndefined3(value) || IsUnion(value) || IsUint8Array3(value) || IsUnknown(value) || IsUnsafe(value) || IsVoid(value) || IsKind(value);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional.mjs
function RemoveOptional(schema) {
  return Discard(CloneType(schema), [OptionalKind]);
}
function AddOptional(schema) {
  return { ...CloneType(schema), [OptionalKind]: "Optional" };
}
function OptionalWithFlag(schema, F) {
  return F === false ? RemoveOptional(schema) : AddOptional(schema);
}
function Optional(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? OptionalFromMappedResult(schema, F) : OptionalWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/optional/optional-from-mapped-result.mjs
function FromProperties(P, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Optional(P[K2], F);
  return Acc;
}
function FromMappedResult(R, F) {
  return FromProperties(R.properties, F);
}
function OptionalFromMappedResult(R, F) {
  const P = FromMappedResult(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-create.mjs
function IntersectCreate(T, options) {
  const allObjects = T.every((schema) => IsObject3(schema));
  const clonedUnevaluatedProperties = IsSchema(options.unevaluatedProperties) ? { unevaluatedProperties: CloneType(options.unevaluatedProperties) } : {};
  return options.unevaluatedProperties === false || IsSchema(options.unevaluatedProperties) || allObjects ? { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", type: "object", allOf: CloneRest(T) } : { ...options, ...clonedUnevaluatedProperties, [Kind]: "Intersect", allOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect-evaluated.mjs
function IsIntersectOptional(T) {
  return T.every((L) => IsOptional(L));
}
function RemoveOptionalFromType(T) {
  return Discard(T, [OptionalKind]);
}
function RemoveOptionalFromRest(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType(L) : L);
}
function ResolveIntersect(T, options) {
  return IsIntersectOptional(T) ? Optional(IntersectCreate(RemoveOptionalFromRest(T), options)) : IntersectCreate(RemoveOptionalFromRest(T), options);
}
function IntersectEvaluated(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return ResolveIntersect(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/intersect/intersect.mjs
function Intersect(T, options = {}) {
  if (T.length === 0)
    return Never(options);
  if (T.length === 1)
    return CloneType(T[0], options);
  if (T.some((schema) => IsTransform(schema)))
    throw new Error("Cannot intersect transform types");
  return IntersectCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union-create.mjs
function UnionCreate(T, options) {
  return { ...options, [Kind]: "Union", anyOf: CloneRest(T) };
}

// node_modules/@sinclair/typebox/build/esm/type/union/union-evaluated.mjs
function IsUnionOptional(T) {
  return T.some((L) => IsOptional(L));
}
function RemoveOptionalFromRest2(T) {
  return T.map((L) => IsOptional(L) ? RemoveOptionalFromType2(L) : L);
}
function RemoveOptionalFromType2(T) {
  return Discard(T, [OptionalKind]);
}
function ResolveUnion(T, options) {
  return IsUnionOptional(T) ? Optional(UnionCreate(RemoveOptionalFromRest2(T), options)) : UnionCreate(RemoveOptionalFromRest2(T), options);
}
function UnionEvaluated(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : ResolveUnion(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/union/union.mjs
function Union(T, options = {}) {
  return T.length === 0 ? Never(options) : T.length === 1 ? CloneType(T[0], options) : UnionCreate(T, options);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/parse.mjs
class TemplateLiteralParserError extends TypeBoxError {
}
function Unescape(pattern) {
  return pattern.replace(/\\\$/g, "$").replace(/\\\*/g, "*").replace(/\\\^/g, "^").replace(/\\\|/g, "|").replace(/\\\(/g, "(").replace(/\\\)/g, ")");
}
function IsNonEscaped(pattern, index, char) {
  return pattern[index] === char && pattern.charCodeAt(index - 1) !== 92;
}
function IsOpenParen(pattern, index) {
  return IsNonEscaped(pattern, index, "(");
}
function IsCloseParen(pattern, index) {
  return IsNonEscaped(pattern, index, ")");
}
function IsSeparator(pattern, index) {
  return IsNonEscaped(pattern, index, "|");
}
function IsGroup(pattern) {
  if (!(IsOpenParen(pattern, 0) && IsCloseParen(pattern, pattern.length - 1)))
    return false;
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (count === 0 && index !== pattern.length - 1)
      return false;
  }
  return true;
}
function InGroup(pattern) {
  return pattern.slice(1, pattern.length - 1);
}
function IsPrecedenceOr(pattern) {
  let count = 0;
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0)
      return true;
  }
  return false;
}
function IsPrecedenceAnd(pattern) {
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      return true;
  }
  return false;
}
function Or(pattern) {
  let [count, start] = [0, 0];
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index))
      count += 1;
    if (IsCloseParen(pattern, index))
      count -= 1;
    if (IsSeparator(pattern, index) && count === 0) {
      const range2 = pattern.slice(start, index);
      if (range2.length > 0)
        expressions.push(TemplateLiteralParse(range2));
      start = index + 1;
    }
  }
  const range = pattern.slice(start);
  if (range.length > 0)
    expressions.push(TemplateLiteralParse(range));
  if (expressions.length === 0)
    return { type: "const", const: "" };
  if (expressions.length === 1)
    return expressions[0];
  return { type: "or", expr: expressions };
}
function And(pattern) {
  function Group(value, index) {
    if (!IsOpenParen(value, index))
      throw new TemplateLiteralParserError(`TemplateLiteralParser: Index must point to open parens`);
    let count = 0;
    for (let scan = index;scan < value.length; scan++) {
      if (IsOpenParen(value, scan))
        count += 1;
      if (IsCloseParen(value, scan))
        count -= 1;
      if (count === 0)
        return [index, scan];
    }
    throw new TemplateLiteralParserError(`TemplateLiteralParser: Unclosed group parens in expression`);
  }
  function Range(pattern2, index) {
    for (let scan = index;scan < pattern2.length; scan++) {
      if (IsOpenParen(pattern2, scan))
        return [index, scan];
    }
    return [index, pattern2.length];
  }
  const expressions = [];
  for (let index = 0;index < pattern.length; index++) {
    if (IsOpenParen(pattern, index)) {
      const [start, end] = Group(pattern, index);
      const range = pattern.slice(start, end + 1);
      expressions.push(TemplateLiteralParse(range));
      index = end;
    } else {
      const [start, end] = Range(pattern, index);
      const range = pattern.slice(start, end);
      if (range.length > 0)
        expressions.push(TemplateLiteralParse(range));
      index = end - 1;
    }
  }
  return expressions.length === 0 ? { type: "const", const: "" } : expressions.length === 1 ? expressions[0] : { type: "and", expr: expressions };
}
function TemplateLiteralParse(pattern) {
  return IsGroup(pattern) ? TemplateLiteralParse(InGroup(pattern)) : IsPrecedenceOr(pattern) ? Or(pattern) : IsPrecedenceAnd(pattern) ? And(pattern) : { type: "const", const: Unescape(pattern) };
}
function TemplateLiteralParseExact(pattern) {
  return TemplateLiteralParse(pattern.slice(1, pattern.length - 1));
}

// node_modules/@sinclair/typebox/build/esm/type/template-literal/finite.mjs
class TemplateLiteralFiniteError extends TypeBoxError {
}
function IsNumberExpression(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "0" && expression.expr[1].type === "const" && expression.expr[1].const === "[1-9][0-9]*";
}
function IsBooleanExpression(expression) {
  return expression.type === "or" && expression.expr.length === 2 && expression.expr[0].type === "const" && expression.expr[0].const === "true" && expression.expr[1].type === "const" && expression.expr[1].const === "false";
}
function IsStringExpression(expression) {
  return expression.type === "const" && expression.const === ".*";
}
function IsTemplateLiteralExpressionFinite(expression) {
  return IsNumberExpression(expression) || IsStringExpression(expression) ? false : IsBooleanExpression(expression) ? true : expression.type === "and" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "or" ? expression.expr.every((expr) => IsTemplateLiteralExpressionFinite(expr)) : expression.type === "const" ? true : (() => {
    throw new TemplateLiteralFiniteError(`Unknown expression type`);
  })();
}
function IsTemplateLiteralFinite(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/generate.mjs
class TemplateLiteralGenerateError extends TypeBoxError {
}
function* GenerateReduce(buffer) {
  if (buffer.length === 1)
    return yield* buffer[0];
  for (const left of buffer[0]) {
    for (const right of GenerateReduce(buffer.slice(1))) {
      yield `${left}${right}`;
    }
  }
}
function* GenerateAnd(expression) {
  return yield* GenerateReduce(expression.expr.map((expr) => [...TemplateLiteralExpressionGenerate(expr)]));
}
function* GenerateOr(expression) {
  for (const expr of expression.expr)
    yield* TemplateLiteralExpressionGenerate(expr);
}
function* GenerateConst(expression) {
  return yield expression.const;
}
function* TemplateLiteralExpressionGenerate(expression) {
  return expression.type === "and" ? yield* GenerateAnd(expression) : expression.type === "or" ? yield* GenerateOr(expression) : expression.type === "const" ? yield* GenerateConst(expression) : (() => {
    throw new TemplateLiteralGenerateError("Unknown expression");
  })();
}
function TemplateLiteralGenerate(schema) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  return IsTemplateLiteralExpressionFinite(expression) ? [...TemplateLiteralExpressionGenerate(expression)] : [];
}
// node_modules/@sinclair/typebox/build/esm/type/literal/literal.mjs
function Literal(value, options = {}) {
  return {
    ...options,
    [Kind]: "Literal",
    const: value,
    type: typeof value
  };
}
// node_modules/@sinclair/typebox/build/esm/type/boolean/boolean.mjs
function Boolean2(options = {}) {
  return {
    ...options,
    [Kind]: "Boolean",
    type: "boolean"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/bigint/bigint.mjs
function BigInt2(options = {}) {
  return {
    ...options,
    [Kind]: "BigInt",
    type: "bigint"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/number/number.mjs
function Number2(options = {}) {
  return {
    ...options,
    [Kind]: "Number",
    type: "number"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/string/string.mjs
function String2(options = {}) {
  return { ...options, [Kind]: "String", type: "string" };
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/syntax.mjs
function* FromUnion(syntax) {
  const trim = syntax.trim().replace(/"|'/g, "");
  return trim === "boolean" ? yield Boolean2() : trim === "number" ? yield Number2() : trim === "bigint" ? yield BigInt2() : trim === "string" ? yield String2() : yield (() => {
    const literals = trim.split("|").map((literal2) => Literal(literal2.trim()));
    return literals.length === 0 ? Never() : literals.length === 1 ? literals[0] : UnionEvaluated(literals);
  })();
}
function* FromTerminal(syntax) {
  if (syntax[1] !== "{") {
    const L = Literal("$");
    const R = FromSyntax(syntax.slice(1));
    return yield* [L, ...R];
  }
  for (let i = 2;i < syntax.length; i++) {
    if (syntax[i] === "}") {
      const L = FromUnion(syntax.slice(2, i));
      const R = FromSyntax(syntax.slice(i + 1));
      return yield* [...L, ...R];
    }
  }
  yield Literal(syntax);
}
function* FromSyntax(syntax) {
  for (let i = 0;i < syntax.length; i++) {
    if (syntax[i] === "$") {
      const L = Literal(syntax.slice(0, i));
      const R = FromTerminal(syntax.slice(i));
      return yield* [L, ...R];
    }
  }
  yield Literal(syntax);
}
function TemplateLiteralSyntax(syntax) {
  return [...FromSyntax(syntax)];
}
// node_modules/@sinclair/typebox/build/esm/type/patterns/patterns.mjs
var PatternBoolean = "(true|false)";
var PatternNumber = "(0|[1-9][0-9]*)";
var PatternString = "(.*)";
var PatternBooleanExact = `^${PatternBoolean}$`;
var PatternNumberExact = `^${PatternNumber}$`;
var PatternStringExact = `^${PatternString}$`;
// node_modules/@sinclair/typebox/build/esm/type/template-literal/pattern.mjs
class TemplateLiteralPatternError extends TypeBoxError {
}
function Escape(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function Visit2(schema, acc) {
  return IsTemplateLiteral(schema) ? schema.pattern.slice(1, schema.pattern.length - 1) : IsUnion(schema) ? `(${schema.anyOf.map((schema2) => Visit2(schema2, acc)).join("|")})` : IsNumber3(schema) ? `${acc}${PatternNumber}` : IsInteger2(schema) ? `${acc}${PatternNumber}` : IsBigInt3(schema) ? `${acc}${PatternNumber}` : IsString3(schema) ? `${acc}${PatternString}` : IsLiteral(schema) ? `${acc}${Escape(schema.const.toString())}` : IsBoolean3(schema) ? `${acc}${PatternBoolean}` : (() => {
    throw new TemplateLiteralPatternError(`Unexpected Kind '${schema[Kind]}'`);
  })();
}
function TemplateLiteralPattern(kinds) {
  return `^${kinds.map((schema) => Visit2(schema, "")).join("")}$`;
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/union.mjs
function TemplateLiteralToUnion(schema) {
  const R = TemplateLiteralGenerate(schema);
  const L = R.map((S) => Literal(S));
  return UnionEvaluated(L);
}
// node_modules/@sinclair/typebox/build/esm/type/template-literal/template-literal.mjs
function TemplateLiteral(unresolved, options = {}) {
  const pattern = IsString2(unresolved) ? TemplateLiteralPattern(TemplateLiteralSyntax(unresolved)) : TemplateLiteralPattern(unresolved);
  return { ...options, [Kind]: "TemplateLiteral", type: "string", pattern };
}
// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-property-keys.mjs
function FromTemplateLiteral(T) {
  const R = TemplateLiteralGenerate(T);
  return R.map((S) => S.toString());
}
function FromUnion2(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexPropertyKeys(L));
  return Acc;
}
function FromLiteral(T) {
  return [T.toString()];
}
function IndexPropertyKeys(T) {
  return [...new Set(IsTemplateLiteral(T) ? FromTemplateLiteral(T) : IsUnion(T) ? FromUnion2(T.anyOf) : IsLiteral(T) ? FromLiteral(T.const) : IsNumber3(T) ? ["[number]"] : IsInteger2(T) ? ["[number]"] : [])];
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-result.mjs
function FromProperties2(T, P, options) {
  const Acc = {};
  for (const K2 of Object.getOwnPropertyNames(P)) {
    Acc[K2] = Index(T, IndexPropertyKeys(P[K2]), options);
  }
  return Acc;
}
function FromMappedResult2(T, R, options) {
  return FromProperties2(T, R.properties, options);
}
function IndexFromMappedResult(T, R, options) {
  const P = FromMappedResult2(T, R, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed.mjs
function FromRest(T, K) {
  return T.map((L) => IndexFromPropertyKey(L, K));
}
function FromIntersectRest(T) {
  return T.filter((L) => !IsNever(L));
}
function FromIntersect(T, K) {
  return IntersectEvaluated(FromIntersectRest(FromRest(T, K)));
}
function FromUnionRest(T) {
  return T.some((L) => IsNever(L)) ? [] : T;
}
function FromUnion3(T, K) {
  return UnionEvaluated(FromUnionRest(FromRest(T, K)));
}
function FromTuple(T, K) {
  return K in T ? T[K] : K === "[number]" ? UnionEvaluated(T) : Never();
}
function FromArray(T, K) {
  return K === "[number]" ? T : Never();
}
function FromProperty(T, K) {
  return K in T ? T[K] : Never();
}
function IndexFromPropertyKey(T, K) {
  return IsIntersect(T) ? FromIntersect(T.allOf, K) : IsUnion(T) ? FromUnion3(T.anyOf, K) : IsTuple(T) ? FromTuple(T.items ?? [], K) : IsArray3(T) ? FromArray(T.items, K) : IsObject3(T) ? FromProperty(T.properties, K) : Never();
}
function IndexFromPropertyKeys(T, K) {
  return K.map((L) => IndexFromPropertyKey(T, L));
}
function FromSchema(T, K) {
  return UnionEvaluated(IndexFromPropertyKeys(T, K));
}
function Index(T, K, options = {}) {
  return IsMappedResult(K) ? CloneType(IndexFromMappedResult(T, K, options)) : IsMappedKey(K) ? CloneType(IndexFromMappedKey(T, K, options)) : IsSchema(K) ? CloneType(FromSchema(T, IndexPropertyKeys(K)), options) : CloneType(FromSchema(T, K), options);
}

// node_modules/@sinclair/typebox/build/esm/type/indexed/indexed-from-mapped-key.mjs
function MappedIndexPropertyKey(T, K, options) {
  return { [K]: Index(T, [K], options) };
}
function MappedIndexPropertyKeys(T, K, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIndexPropertyKey(T, L, options) };
  }, {});
}
function MappedIndexProperties(T, K, options) {
  return MappedIndexPropertyKeys(T, K.keys, options);
}
function IndexFromMappedKey(T, K, options) {
  const P = MappedIndexProperties(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/iterator/iterator.mjs
function Iterator(items, options = {}) {
  return {
    ...options,
    [Kind]: "Iterator",
    type: "Iterator",
    items: CloneType(items)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/object/object.mjs
function _Object(properties, options = {}) {
  const propertyKeys = globalThis.Object.getOwnPropertyNames(properties);
  const optionalKeys = propertyKeys.filter((key) => IsOptional(properties[key]));
  const requiredKeys = propertyKeys.filter((name) => !optionalKeys.includes(name));
  const clonedAdditionalProperties = IsSchema(options.additionalProperties) ? { additionalProperties: CloneType(options.additionalProperties) } : {};
  const clonedProperties = {};
  for (const key of propertyKeys)
    clonedProperties[key] = CloneType(properties[key]);
  return requiredKeys.length > 0 ? { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties, required: requiredKeys } : { ...options, ...clonedAdditionalProperties, [Kind]: "Object", type: "object", properties: clonedProperties };
}
var Object2 = _Object;
// node_modules/@sinclair/typebox/build/esm/type/promise/promise.mjs
function Promise2(item, options = {}) {
  return {
    ...options,
    [Kind]: "Promise",
    type: "Promise",
    item: CloneType(item)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly.mjs
function RemoveReadonly(schema) {
  return Discard(CloneType(schema), [ReadonlyKind]);
}
function AddReadonly(schema) {
  return { ...CloneType(schema), [ReadonlyKind]: "Readonly" };
}
function ReadonlyWithFlag(schema, F) {
  return F === false ? RemoveReadonly(schema) : AddReadonly(schema);
}
function Readonly(schema, enable) {
  const F = enable ?? true;
  return IsMappedResult(schema) ? ReadonlyFromMappedResult(schema, F) : ReadonlyWithFlag(schema, F);
}

// node_modules/@sinclair/typebox/build/esm/type/readonly/readonly-from-mapped-result.mjs
function FromProperties3(K, F) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Readonly(K[K2], F);
  return Acc;
}
function FromMappedResult3(R, F) {
  return FromProperties3(R.properties, F);
}
function ReadonlyFromMappedResult(R, F) {
  const P = FromMappedResult3(R, F);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/tuple/tuple.mjs
function Tuple(items, options = {}) {
  const [additionalItems, minItems, maxItems] = [false, items.length, items.length];
  return items.length > 0 ? { ...options, [Kind]: "Tuple", type: "array", items: CloneRest(items), additionalItems, minItems, maxItems } : { ...options, [Kind]: "Tuple", type: "array", minItems, maxItems };
}
// node_modules/@sinclair/typebox/build/esm/type/sets/set.mjs
function SetIncludes(T, S) {
  return T.includes(S);
}
function SetDistinct(T) {
  return [...new Set(T)];
}
function SetIntersect(T, S) {
  return T.filter((L) => S.includes(L));
}
function SetIntersectManyResolve(T, Init) {
  return T.reduce((Acc, L) => {
    return SetIntersect(Acc, L);
  }, Init);
}
function SetIntersectMany(T) {
  return T.length === 1 ? T[0] : T.length > 1 ? SetIntersectManyResolve(T.slice(1), T[0]) : [];
}
function SetUnionMany(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...L);
  return Acc;
}
// node_modules/@sinclair/typebox/build/esm/type/mapped/mapped.mjs
function FromMappedResult4(K, P) {
  return K in P ? FromSchemaType(K, P[K]) : MappedResult(P);
}
function MappedKeyToKnownMappedResultProperties(K) {
  return { [K]: Literal(K) };
}
function MappedKeyToUnknownMappedResultProperties(P) {
  const Acc = {};
  for (const L of P)
    Acc[L] = Literal(L);
  return Acc;
}
function MappedKeyToMappedResultProperties(K, P) {
  return SetIncludes(P, K) ? MappedKeyToKnownMappedResultProperties(K) : MappedKeyToUnknownMappedResultProperties(P);
}
function FromMappedKey(K, P) {
  const R = MappedKeyToMappedResultProperties(K, P);
  return FromMappedResult4(K, R);
}
function FromRest2(K, T) {
  return T.map((L) => FromSchemaType(K, L));
}
function FromProperties4(K, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(T))
    Acc[K2] = FromSchemaType(K, T[K2]);
  return Acc;
}
function FromSchemaType(K, T) {
  return IsOptional(T) ? Optional(FromSchemaType(K, Discard(T, [OptionalKind]))) : IsReadonly(T) ? Readonly(FromSchemaType(K, Discard(T, [ReadonlyKind]))) : IsMappedResult(T) ? FromMappedResult4(K, T.properties) : IsMappedKey(T) ? FromMappedKey(K, T.keys) : IsConstructor(T) ? Constructor(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsFunction3(T) ? Function2(FromRest2(K, T.parameters), FromSchemaType(K, T.returns)) : IsAsyncIterator3(T) ? AsyncIterator(FromSchemaType(K, T.items)) : IsIterator3(T) ? Iterator(FromSchemaType(K, T.items)) : IsIntersect(T) ? Intersect(FromRest2(K, T.allOf)) : IsUnion(T) ? Union(FromRest2(K, T.anyOf)) : IsTuple(T) ? Tuple(FromRest2(K, T.items ?? [])) : IsObject3(T) ? Object2(FromProperties4(K, T.properties)) : IsArray3(T) ? Array2(FromSchemaType(K, T.items)) : IsPromise2(T) ? Promise2(FromSchemaType(K, T.item)) : T;
}
function MappedFunctionReturnType(K, T) {
  const Acc = {};
  for (const L of K)
    Acc[L] = FromSchemaType(L, T);
  return Acc;
}
function Mapped(key, map3, options = {}) {
  const K = IsSchema(key) ? IndexPropertyKeys(key) : key;
  const RT = map3({ [Kind]: "MappedKey", keys: K });
  const R = MappedFunctionReturnType(K, RT);
  return CloneType(Object2(R), options);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-keys.mjs
function FromRest3(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(KeyOfPropertyKeys(L));
  return Acc;
}
function FromIntersect2(T) {
  const C = FromRest3(T);
  const R = SetUnionMany(C);
  return R;
}
function FromUnion4(T) {
  const C = FromRest3(T);
  const R = SetIntersectMany(C);
  return R;
}
function FromTuple2(T) {
  return T.map((_, I) => I.toString());
}
function FromArray2(_) {
  return ["[number]"];
}
function FromProperties5(T) {
  return globalThis.Object.getOwnPropertyNames(T);
}
function FromPatternProperties(patternProperties) {
  if (!includePatternProperties)
    return [];
  const patternPropertyKeys = globalThis.Object.getOwnPropertyNames(patternProperties);
  return patternPropertyKeys.map((key) => {
    return key[0] === "^" && key[key.length - 1] === "$" ? key.slice(1, key.length - 1) : key;
  });
}
function KeyOfPropertyKeys(T) {
  return IsIntersect(T) ? FromIntersect2(T.allOf) : IsUnion(T) ? FromUnion4(T.anyOf) : IsTuple(T) ? FromTuple2(T.items ?? []) : IsArray3(T) ? FromArray2(T.items) : IsObject3(T) ? FromProperties5(T.properties) : IsRecord(T) ? FromPatternProperties(T.patternProperties) : [];
}
var includePatternProperties = false;
function KeyOfPattern(schema) {
  includePatternProperties = true;
  const keys = KeyOfPropertyKeys(schema);
  includePatternProperties = false;
  const pattern2 = keys.map((key) => `(${key})`);
  return `^(${pattern2.join("|")})$`;
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof.mjs
function KeyOfPropertyKeysToRest(T) {
  return T.map((L) => L === "[number]" ? Number2() : Literal(L));
}
function KeyOf(T, options = {}) {
  if (IsMappedResult(T)) {
    return KeyOfFromMappedResult(T, options);
  } else {
    const K = KeyOfPropertyKeys(T);
    const S = KeyOfPropertyKeysToRest(K);
    const U = UnionEvaluated(S);
    return CloneType(U, options);
  }
}

// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-from-mapped-result.mjs
function FromProperties6(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = KeyOf(K[K2], options);
  return Acc;
}
function FromMappedResult5(R, options) {
  return FromProperties6(R.properties, options);
}
function KeyOfFromMappedResult(R, options) {
  const P = FromMappedResult5(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/keyof/keyof-property-entries.mjs
function KeyOfPropertyEntries(schema) {
  const keys = KeyOfPropertyKeys(schema);
  const schemas = IndexFromPropertyKeys(schema, keys);
  return keys.map((_, index) => [keys[index], schemas[index]]);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-undefined.mjs
function Intersect2(schema) {
  return schema.allOf.every((schema2) => ExtendsUndefinedCheck(schema2));
}
function Union2(schema) {
  return schema.anyOf.some((schema2) => ExtendsUndefinedCheck(schema2));
}
function Not(schema) {
  return !ExtendsUndefinedCheck(schema.not);
}
function ExtendsUndefinedCheck(schema) {
  return schema[Kind] === "Intersect" ? Intersect2(schema) : schema[Kind] === "Union" ? Union2(schema) : schema[Kind] === "Not" ? Not(schema) : schema[Kind] === "Undefined" ? true : false;
}

// node_modules/@sinclair/typebox/build/esm/errors/function.mjs
function DefaultErrorFunction(error2) {
  switch (error2.errorType) {
    case ValueErrorType.ArrayContains:
      return "Expected array to contain at least one matching value";
    case ValueErrorType.ArrayMaxContains:
      return `Expected array to contain no more than ${error2.schema.maxContains} matching values`;
    case ValueErrorType.ArrayMinContains:
      return `Expected array to contain at least ${error2.schema.minContains} matching values`;
    case ValueErrorType.ArrayMaxItems:
      return `Expected array length to be less or equal to ${error2.schema.maxItems}`;
    case ValueErrorType.ArrayMinItems:
      return `Expected array length to be greater or equal to ${error2.schema.minItems}`;
    case ValueErrorType.ArrayUniqueItems:
      return "Expected array elements to be unique";
    case ValueErrorType.Array:
      return "Expected array";
    case ValueErrorType.AsyncIterator:
      return "Expected AsyncIterator";
    case ValueErrorType.BigIntExclusiveMaximum:
      return `Expected bigint to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.BigIntExclusiveMinimum:
      return `Expected bigint to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.BigIntMaximum:
      return `Expected bigint to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.BigIntMinimum:
      return `Expected bigint to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.BigIntMultipleOf:
      return `Expected bigint to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.BigInt:
      return "Expected bigint";
    case ValueErrorType.Boolean:
      return "Expected boolean";
    case ValueErrorType.DateExclusiveMinimumTimestamp:
      return `Expected Date timestamp to be greater than ${error2.schema.exclusiveMinimumTimestamp}`;
    case ValueErrorType.DateExclusiveMaximumTimestamp:
      return `Expected Date timestamp to be less than ${error2.schema.exclusiveMaximumTimestamp}`;
    case ValueErrorType.DateMinimumTimestamp:
      return `Expected Date timestamp to be greater or equal to ${error2.schema.minimumTimestamp}`;
    case ValueErrorType.DateMaximumTimestamp:
      return `Expected Date timestamp to be less or equal to ${error2.schema.maximumTimestamp}`;
    case ValueErrorType.DateMultipleOfTimestamp:
      return `Expected Date timestamp to be a multiple of ${error2.schema.multipleOfTimestamp}`;
    case ValueErrorType.Date:
      return "Expected Date";
    case ValueErrorType.Function:
      return "Expected function";
    case ValueErrorType.IntegerExclusiveMaximum:
      return `Expected integer to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.IntegerExclusiveMinimum:
      return `Expected integer to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.IntegerMaximum:
      return `Expected integer to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.IntegerMinimum:
      return `Expected integer to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.IntegerMultipleOf:
      return `Expected integer to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.Integer:
      return "Expected integer";
    case ValueErrorType.IntersectUnevaluatedProperties:
      return "Unexpected property";
    case ValueErrorType.Intersect:
      return "Expected all values to match";
    case ValueErrorType.Iterator:
      return "Expected Iterator";
    case ValueErrorType.Literal:
      return `Expected ${typeof error2.schema.const === "string" ? `'${error2.schema.const}'` : error2.schema.const}`;
    case ValueErrorType.Never:
      return "Never";
    case ValueErrorType.Not:
      return "Value should not match";
    case ValueErrorType.Null:
      return "Expected null";
    case ValueErrorType.NumberExclusiveMaximum:
      return `Expected number to be less than ${error2.schema.exclusiveMaximum}`;
    case ValueErrorType.NumberExclusiveMinimum:
      return `Expected number to be greater than ${error2.schema.exclusiveMinimum}`;
    case ValueErrorType.NumberMaximum:
      return `Expected number to be less or equal to ${error2.schema.maximum}`;
    case ValueErrorType.NumberMinimum:
      return `Expected number to be greater or equal to ${error2.schema.minimum}`;
    case ValueErrorType.NumberMultipleOf:
      return `Expected number to be a multiple of ${error2.schema.multipleOf}`;
    case ValueErrorType.Number:
      return "Expected number";
    case ValueErrorType.Object:
      return "Expected object";
    case ValueErrorType.ObjectAdditionalProperties:
      return "Unexpected property";
    case ValueErrorType.ObjectMaxProperties:
      return `Expected object to have no more than ${error2.schema.maxProperties} properties`;
    case ValueErrorType.ObjectMinProperties:
      return `Expected object to have at least ${error2.schema.minProperties} properties`;
    case ValueErrorType.ObjectRequiredProperty:
      return "Required property";
    case ValueErrorType.Promise:
      return "Expected Promise";
    case ValueErrorType.RegExp:
      return "Expected string to match regular expression";
    case ValueErrorType.StringFormatUnknown:
      return `Unknown format '${error2.schema.format}'`;
    case ValueErrorType.StringFormat:
      return `Expected string to match '${error2.schema.format}' format`;
    case ValueErrorType.StringMaxLength:
      return `Expected string length less or equal to ${error2.schema.maxLength}`;
    case ValueErrorType.StringMinLength:
      return `Expected string length greater or equal to ${error2.schema.minLength}`;
    case ValueErrorType.StringPattern:
      return `Expected string to match '${error2.schema.pattern}'`;
    case ValueErrorType.String:
      return "Expected string";
    case ValueErrorType.Symbol:
      return "Expected symbol";
    case ValueErrorType.TupleLength:
      return `Expected tuple to have ${error2.schema.maxItems || 0} elements`;
    case ValueErrorType.Tuple:
      return "Expected tuple";
    case ValueErrorType.Uint8ArrayMaxByteLength:
      return `Expected byte length less or equal to ${error2.schema.maxByteLength}`;
    case ValueErrorType.Uint8ArrayMinByteLength:
      return `Expected byte length greater or equal to ${error2.schema.minByteLength}`;
    case ValueErrorType.Uint8Array:
      return "Expected Uint8Array";
    case ValueErrorType.Undefined:
      return "Expected undefined";
    case ValueErrorType.Union:
      return "Expected union value";
    case ValueErrorType.Void:
      return "Expected void";
    case ValueErrorType.Kind:
      return `Expected kind '${error2.schema[Kind]}'`;
    default:
      return "Unknown error type";
  }
}
var errorFunction = DefaultErrorFunction;
function GetErrorFunction() {
  return errorFunction;
}

// node_modules/@sinclair/typebox/build/esm/value/deref/deref.mjs
class TypeDereferenceError extends TypeBoxError {
  constructor(schema) {
    super(`Unable to dereference schema with $id '${schema.$id}'`);
    this.schema = schema;
  }
}
function Resolve(schema, references) {
  const target = references.find((target2) => target2.$id === schema.$ref);
  if (target === undefined)
    throw new TypeDereferenceError(schema);
  return Deref(target, references);
}
function Deref(schema, references) {
  return schema[Kind] === "This" || schema[Kind] === "Ref" ? Resolve(schema, references) : schema;
}
// node_modules/@sinclair/typebox/build/esm/value/hash/hash.mjs
class ValueHashError extends TypeBoxError {
  constructor(value) {
    super(`Unable to hash value`);
    this.value = value;
  }
}
var ByteMarker;
(function(ByteMarker2) {
  ByteMarker2[ByteMarker2["Undefined"] = 0] = "Undefined";
  ByteMarker2[ByteMarker2["Null"] = 1] = "Null";
  ByteMarker2[ByteMarker2["Boolean"] = 2] = "Boolean";
  ByteMarker2[ByteMarker2["Number"] = 3] = "Number";
  ByteMarker2[ByteMarker2["String"] = 4] = "String";
  ByteMarker2[ByteMarker2["Object"] = 5] = "Object";
  ByteMarker2[ByteMarker2["Array"] = 6] = "Array";
  ByteMarker2[ByteMarker2["Date"] = 7] = "Date";
  ByteMarker2[ByteMarker2["Uint8Array"] = 8] = "Uint8Array";
  ByteMarker2[ByteMarker2["Symbol"] = 9] = "Symbol";
  ByteMarker2[ByteMarker2["BigInt"] = 10] = "BigInt";
})(ByteMarker || (ByteMarker = {}));
var Accumulator = BigInt("14695981039346656037");
var [Prime, Size] = [BigInt("1099511628211"), BigInt("2") ** BigInt("64")];
var Bytes = Array.from({ length: 256 }).map((_, i) => BigInt(i));
var F64 = new Float64Array(1);
var F64In = new DataView(F64.buffer);
var F64Out = new Uint8Array(F64.buffer);
function* NumberToBytes(value) {
  const byteCount = value === 0 ? 1 : Math.ceil(Math.floor(Math.log2(value) + 1) / 8);
  for (let i = 0;i < byteCount; i++) {
    yield value >> 8 * (byteCount - 1 - i) & 255;
  }
}
function ArrayType2(value) {
  FNV1A64(ByteMarker.Array);
  for (const item of value) {
    Visit3(item);
  }
}
function BooleanType(value) {
  FNV1A64(ByteMarker.Boolean);
  FNV1A64(value ? 1 : 0);
}
function BigIntType(value) {
  FNV1A64(ByteMarker.BigInt);
  F64In.setBigInt64(0, value);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
}
function DateType2(value) {
  FNV1A64(ByteMarker.Date);
  Visit3(value.getTime());
}
function NullType(value) {
  FNV1A64(ByteMarker.Null);
}
function NumberType(value) {
  FNV1A64(ByteMarker.Number);
  F64In.setFloat64(0, value);
  for (const byte of F64Out) {
    FNV1A64(byte);
  }
}
function ObjectType2(value) {
  FNV1A64(ByteMarker.Object);
  for (const key of globalThis.Object.getOwnPropertyNames(value).sort()) {
    Visit3(key);
    Visit3(value[key]);
  }
}
function StringType(value) {
  FNV1A64(ByteMarker.String);
  for (let i = 0;i < value.length; i++) {
    for (const byte of NumberToBytes(value.charCodeAt(i))) {
      FNV1A64(byte);
    }
  }
}
function SymbolType(value) {
  FNV1A64(ByteMarker.Symbol);
  Visit3(value.description);
}
function Uint8ArrayType2(value) {
  FNV1A64(ByteMarker.Uint8Array);
  for (let i = 0;i < value.length; i++) {
    FNV1A64(value[i]);
  }
}
function UndefinedType(value) {
  return FNV1A64(ByteMarker.Undefined);
}
function Visit3(value) {
  if (IsArray(value))
    return ArrayType2(value);
  if (IsBoolean(value))
    return BooleanType(value);
  if (IsBigInt(value))
    return BigIntType(value);
  if (IsDate(value))
    return DateType2(value);
  if (IsNull(value))
    return NullType(value);
  if (IsNumber(value))
    return NumberType(value);
  if (IsStandardObject(value))
    return ObjectType2(value);
  if (IsString(value))
    return StringType(value);
  if (IsSymbol(value))
    return SymbolType(value);
  if (IsUint8Array(value))
    return Uint8ArrayType2(value);
  if (IsUndefined(value))
    return UndefinedType(value);
  throw new ValueHashError(value);
}
function FNV1A64(byte) {
  Accumulator = Accumulator ^ Bytes[byte];
  Accumulator = Accumulator * Prime % Size;
}
function Hash(value) {
  Accumulator = BigInt("14695981039346656037");
  Visit3(value);
  return Accumulator;
}
// node_modules/@sinclair/typebox/build/esm/errors/errors.mjs
var ValueErrorType;
(function(ValueErrorType2) {
  ValueErrorType2[ValueErrorType2["ArrayContains"] = 0] = "ArrayContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxContains"] = 1] = "ArrayMaxContains";
  ValueErrorType2[ValueErrorType2["ArrayMaxItems"] = 2] = "ArrayMaxItems";
  ValueErrorType2[ValueErrorType2["ArrayMinContains"] = 3] = "ArrayMinContains";
  ValueErrorType2[ValueErrorType2["ArrayMinItems"] = 4] = "ArrayMinItems";
  ValueErrorType2[ValueErrorType2["ArrayUniqueItems"] = 5] = "ArrayUniqueItems";
  ValueErrorType2[ValueErrorType2["Array"] = 6] = "Array";
  ValueErrorType2[ValueErrorType2["AsyncIterator"] = 7] = "AsyncIterator";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMaximum"] = 8] = "BigIntExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["BigIntExclusiveMinimum"] = 9] = "BigIntExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMaximum"] = 10] = "BigIntMaximum";
  ValueErrorType2[ValueErrorType2["BigIntMinimum"] = 11] = "BigIntMinimum";
  ValueErrorType2[ValueErrorType2["BigIntMultipleOf"] = 12] = "BigIntMultipleOf";
  ValueErrorType2[ValueErrorType2["BigInt"] = 13] = "BigInt";
  ValueErrorType2[ValueErrorType2["Boolean"] = 14] = "Boolean";
  ValueErrorType2[ValueErrorType2["DateExclusiveMaximumTimestamp"] = 15] = "DateExclusiveMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateExclusiveMinimumTimestamp"] = 16] = "DateExclusiveMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMaximumTimestamp"] = 17] = "DateMaximumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMinimumTimestamp"] = 18] = "DateMinimumTimestamp";
  ValueErrorType2[ValueErrorType2["DateMultipleOfTimestamp"] = 19] = "DateMultipleOfTimestamp";
  ValueErrorType2[ValueErrorType2["Date"] = 20] = "Date";
  ValueErrorType2[ValueErrorType2["Function"] = 21] = "Function";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMaximum"] = 22] = "IntegerExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["IntegerExclusiveMinimum"] = 23] = "IntegerExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMaximum"] = 24] = "IntegerMaximum";
  ValueErrorType2[ValueErrorType2["IntegerMinimum"] = 25] = "IntegerMinimum";
  ValueErrorType2[ValueErrorType2["IntegerMultipleOf"] = 26] = "IntegerMultipleOf";
  ValueErrorType2[ValueErrorType2["Integer"] = 27] = "Integer";
  ValueErrorType2[ValueErrorType2["IntersectUnevaluatedProperties"] = 28] = "IntersectUnevaluatedProperties";
  ValueErrorType2[ValueErrorType2["Intersect"] = 29] = "Intersect";
  ValueErrorType2[ValueErrorType2["Iterator"] = 30] = "Iterator";
  ValueErrorType2[ValueErrorType2["Kind"] = 31] = "Kind";
  ValueErrorType2[ValueErrorType2["Literal"] = 32] = "Literal";
  ValueErrorType2[ValueErrorType2["Never"] = 33] = "Never";
  ValueErrorType2[ValueErrorType2["Not"] = 34] = "Not";
  ValueErrorType2[ValueErrorType2["Null"] = 35] = "Null";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMaximum"] = 36] = "NumberExclusiveMaximum";
  ValueErrorType2[ValueErrorType2["NumberExclusiveMinimum"] = 37] = "NumberExclusiveMinimum";
  ValueErrorType2[ValueErrorType2["NumberMaximum"] = 38] = "NumberMaximum";
  ValueErrorType2[ValueErrorType2["NumberMinimum"] = 39] = "NumberMinimum";
  ValueErrorType2[ValueErrorType2["NumberMultipleOf"] = 40] = "NumberMultipleOf";
  ValueErrorType2[ValueErrorType2["Number"] = 41] = "Number";
  ValueErrorType2[ValueErrorType2["ObjectAdditionalProperties"] = 42] = "ObjectAdditionalProperties";
  ValueErrorType2[ValueErrorType2["ObjectMaxProperties"] = 43] = "ObjectMaxProperties";
  ValueErrorType2[ValueErrorType2["ObjectMinProperties"] = 44] = "ObjectMinProperties";
  ValueErrorType2[ValueErrorType2["ObjectRequiredProperty"] = 45] = "ObjectRequiredProperty";
  ValueErrorType2[ValueErrorType2["Object"] = 46] = "Object";
  ValueErrorType2[ValueErrorType2["Promise"] = 47] = "Promise";
  ValueErrorType2[ValueErrorType2["RegExp"] = 48] = "RegExp";
  ValueErrorType2[ValueErrorType2["StringFormatUnknown"] = 49] = "StringFormatUnknown";
  ValueErrorType2[ValueErrorType2["StringFormat"] = 50] = "StringFormat";
  ValueErrorType2[ValueErrorType2["StringMaxLength"] = 51] = "StringMaxLength";
  ValueErrorType2[ValueErrorType2["StringMinLength"] = 52] = "StringMinLength";
  ValueErrorType2[ValueErrorType2["StringPattern"] = 53] = "StringPattern";
  ValueErrorType2[ValueErrorType2["String"] = 54] = "String";
  ValueErrorType2[ValueErrorType2["Symbol"] = 55] = "Symbol";
  ValueErrorType2[ValueErrorType2["TupleLength"] = 56] = "TupleLength";
  ValueErrorType2[ValueErrorType2["Tuple"] = 57] = "Tuple";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMaxByteLength"] = 58] = "Uint8ArrayMaxByteLength";
  ValueErrorType2[ValueErrorType2["Uint8ArrayMinByteLength"] = 59] = "Uint8ArrayMinByteLength";
  ValueErrorType2[ValueErrorType2["Uint8Array"] = 60] = "Uint8Array";
  ValueErrorType2[ValueErrorType2["Undefined"] = 61] = "Undefined";
  ValueErrorType2[ValueErrorType2["Union"] = 62] = "Union";
  ValueErrorType2[ValueErrorType2["Void"] = 63] = "Void";
})(ValueErrorType || (ValueErrorType = {}));

class ValueErrorsUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super("Unknown type");
    this.schema = schema;
  }
}
function EscapeKey(key) {
  return key.replace(/~/g, "~0").replace(/\//g, "~1");
}
function IsDefined(value) {
  return value !== undefined;
}

class ValueErrorIterator {
  constructor(iterator2) {
    this.iterator = iterator2;
  }
  [Symbol.iterator]() {
    return this.iterator;
  }
  First() {
    const next = this.iterator.next();
    return next.done ? undefined : next.value;
  }
}
function Create(errorType, schema, path, value) {
  return { type: errorType, schema, path, value, message: GetErrorFunction()({ errorType, path, schema, value }) };
}
function* FromAny(schema, references, path, value) {
}
function* FromArray3(schema, references, path, value) {
  if (!IsArray(value)) {
    return yield Create(ValueErrorType.Array, schema, path, value);
  }
  if (IsDefined(schema.minItems) && !(value.length >= schema.minItems)) {
    yield Create(ValueErrorType.ArrayMinItems, schema, path, value);
  }
  if (IsDefined(schema.maxItems) && !(value.length <= schema.maxItems)) {
    yield Create(ValueErrorType.ArrayMaxItems, schema, path, value);
  }
  for (let i = 0;i < value.length; i++) {
    yield* Visit4(schema.items, references, `${path}/${i}`, value[i]);
  }
  if (schema.uniqueItems === true && !function() {
    const set3 = new Set;
    for (const element of value) {
      const hashed = Hash(element);
      if (set3.has(hashed)) {
        return false;
      } else {
        set3.add(hashed);
      }
    }
    return true;
  }()) {
    yield Create(ValueErrorType.ArrayUniqueItems, schema, path, value);
  }
  if (!(IsDefined(schema.contains) || IsDefined(schema.minContains) || IsDefined(schema.maxContains))) {
    return;
  }
  const containsSchema = IsDefined(schema.contains) ? schema.contains : Never();
  const containsCount = value.reduce((acc, value2, index) => Visit4(containsSchema, references, `${path}${index}`, value2).next().done === true ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    yield Create(ValueErrorType.ArrayContains, schema, path, value);
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    yield Create(ValueErrorType.ArrayMinContains, schema, path, value);
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    yield Create(ValueErrorType.ArrayMaxContains, schema, path, value);
  }
}
function* FromAsyncIterator(schema, references, path, value) {
  if (!IsAsyncIterator(value))
    yield Create(ValueErrorType.AsyncIterator, schema, path, value);
}
function* FromBigInt(schema, references, path, value) {
  if (!IsBigInt(value))
    return yield Create(ValueErrorType.BigInt, schema, path, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.BigIntExclusiveMaximum, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.BigIntExclusiveMinimum, schema, path, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.BigIntMaximum, schema, path, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.BigIntMinimum, schema, path, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
    yield Create(ValueErrorType.BigIntMultipleOf, schema, path, value);
  }
}
function* FromBoolean(schema, references, path, value) {
  if (!IsBoolean(value))
    yield Create(ValueErrorType.Boolean, schema, path, value);
}
function* FromConstructor(schema, references, path, value) {
  yield* Visit4(schema.returns, references, path, value.prototype);
}
function* FromDate(schema, references, path, value) {
  if (!IsDate(value))
    return yield Create(ValueErrorType.Date, schema, path, value);
  if (IsDefined(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMaximumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
    yield Create(ValueErrorType.DateExclusiveMinimumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
    yield Create(ValueErrorType.DateMaximumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
    yield Create(ValueErrorType.DateMinimumTimestamp, schema, path, value);
  }
  if (IsDefined(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
    yield Create(ValueErrorType.DateMultipleOfTimestamp, schema, path, value);
  }
}
function* FromFunction(schema, references, path, value) {
  if (!IsFunction(value))
    yield Create(ValueErrorType.Function, schema, path, value);
}
function* FromInteger(schema, references, path, value) {
  if (!IsInteger(value))
    return yield Create(ValueErrorType.Integer, schema, path, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.IntegerExclusiveMaximum, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.IntegerExclusiveMinimum, schema, path, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.IntegerMaximum, schema, path, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.IntegerMinimum, schema, path, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.IntegerMultipleOf, schema, path, value);
  }
}
function* FromIntersect3(schema, references, path, value) {
  for (const inner of schema.allOf) {
    const next = Visit4(inner, references, path, value).next();
    if (!next.done) {
      yield Create(ValueErrorType.Intersect, schema, path, value);
      yield next.value;
    }
  }
  if (schema.unevaluatedProperties === false) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value)) {
      if (!keyCheck.test(valueKey)) {
        yield Create(ValueErrorType.IntersectUnevaluatedProperties, schema, `${path}/${valueKey}`, value);
      }
    }
  }
  if (typeof schema.unevaluatedProperties === "object") {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    for (const valueKey of Object.getOwnPropertyNames(value)) {
      if (!keyCheck.test(valueKey)) {
        const next = Visit4(schema.unevaluatedProperties, references, `${path}/${valueKey}`, value[valueKey]).next();
        if (!next.done)
          yield next.value;
      }
    }
  }
}
function* FromIterator(schema, references, path, value) {
  if (!IsIterator(value))
    yield Create(ValueErrorType.Iterator, schema, path, value);
}
function* FromLiteral2(schema, references, path, value) {
  if (!(value === schema.const))
    yield Create(ValueErrorType.Literal, schema, path, value);
}
function* FromNever(schema, references, path, value) {
  yield Create(ValueErrorType.Never, schema, path, value);
}
function* FromNot(schema, references, path, value) {
  if (Visit4(schema.not, references, path, value).next().done === true)
    yield Create(ValueErrorType.Not, schema, path, value);
}
function* FromNull(schema, references, path, value) {
  if (!IsNull(value))
    yield Create(ValueErrorType.Null, schema, path, value);
}
function* FromNumber(schema, references, path, value) {
  if (!TypeSystemPolicy.IsNumberLike(value))
    return yield Create(ValueErrorType.Number, schema, path, value);
  if (IsDefined(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    yield Create(ValueErrorType.NumberExclusiveMaximum, schema, path, value);
  }
  if (IsDefined(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    yield Create(ValueErrorType.NumberExclusiveMinimum, schema, path, value);
  }
  if (IsDefined(schema.maximum) && !(value <= schema.maximum)) {
    yield Create(ValueErrorType.NumberMaximum, schema, path, value);
  }
  if (IsDefined(schema.minimum) && !(value >= schema.minimum)) {
    yield Create(ValueErrorType.NumberMinimum, schema, path, value);
  }
  if (IsDefined(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    yield Create(ValueErrorType.NumberMultipleOf, schema, path, value);
  }
}
function* FromObject(schema, references, path, value) {
  if (!TypeSystemPolicy.IsObjectLike(value))
    return yield Create(ValueErrorType.Object, schema, path, value);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
  }
  const requiredKeys = Array.isArray(schema.required) ? schema.required : [];
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  const unknownKeys = Object.getOwnPropertyNames(value);
  for (const requiredKey of requiredKeys) {
    if (unknownKeys.includes(requiredKey))
      continue;
    yield Create(ValueErrorType.ObjectRequiredProperty, schema.properties[requiredKey], `${path}/${EscapeKey(requiredKey)}`, undefined);
  }
  if (schema.additionalProperties === false) {
    for (const valueKey of unknownKeys) {
      if (!knownKeys.includes(valueKey)) {
        yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(valueKey)}`, value[valueKey]);
      }
    }
  }
  if (typeof schema.additionalProperties === "object") {
    for (const valueKey of unknownKeys) {
      if (knownKeys.includes(valueKey))
        continue;
      yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(valueKey)}`, value[valueKey]);
    }
  }
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value[knownKey]);
      if (ExtendsUndefinedCheck(schema) && !(knownKey in value)) {
        yield Create(ValueErrorType.ObjectRequiredProperty, property, `${path}/${EscapeKey(knownKey)}`, undefined);
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value, knownKey)) {
        yield* Visit4(property, references, `${path}/${EscapeKey(knownKey)}`, value[knownKey]);
      }
    }
  }
}
function* FromPromise(schema, references, path, value) {
  if (!IsPromise(value))
    yield Create(ValueErrorType.Promise, schema, path, value);
}
function* FromRecord(schema, references, path, value) {
  if (!TypeSystemPolicy.IsRecordLike(value))
    return yield Create(ValueErrorType.Object, schema, path, value);
  if (IsDefined(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    yield Create(ValueErrorType.ObjectMinProperties, schema, path, value);
  }
  if (IsDefined(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    yield Create(ValueErrorType.ObjectMaxProperties, schema, path, value);
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  for (const [propertyKey, propertyValue] of Object.entries(value)) {
    if (regex.test(propertyKey))
      yield* Visit4(patternSchema, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
  }
  if (typeof schema.additionalProperties === "object") {
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (!regex.test(propertyKey))
        yield* Visit4(schema.additionalProperties, references, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
  if (schema.additionalProperties === false) {
    for (const [propertyKey, propertyValue] of Object.entries(value)) {
      if (regex.test(propertyKey))
        continue;
      return yield Create(ValueErrorType.ObjectAdditionalProperties, schema, `${path}/${EscapeKey(propertyKey)}`, propertyValue);
    }
  }
}
function* FromRef(schema, references, path, value) {
  yield* Visit4(Deref(schema, references), references, path, value);
}
function* FromRegExp(schema, references, path, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path, value);
  if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value);
  }
  if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value);
  }
  const regex = new RegExp(schema.source, schema.flags);
  if (!regex.test(value)) {
    return yield Create(ValueErrorType.RegExp, schema, path, value);
  }
}
function* FromString(schema, references, path, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path, value);
  if (IsDefined(schema.minLength) && !(value.length >= schema.minLength)) {
    yield Create(ValueErrorType.StringMinLength, schema, path, value);
  }
  if (IsDefined(schema.maxLength) && !(value.length <= schema.maxLength)) {
    yield Create(ValueErrorType.StringMaxLength, schema, path, value);
  }
  if (IsString(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value)) {
      yield Create(ValueErrorType.StringPattern, schema, path, value);
    }
  }
  if (IsString(schema.format)) {
    if (!exports_format.Has(schema.format)) {
      yield Create(ValueErrorType.StringFormatUnknown, schema, path, value);
    } else {
      const format = exports_format.Get(schema.format);
      if (!format(value)) {
        yield Create(ValueErrorType.StringFormat, schema, path, value);
      }
    }
  }
}
function* FromSymbol(schema, references, path, value) {
  if (!IsSymbol(value))
    yield Create(ValueErrorType.Symbol, schema, path, value);
}
function* FromTemplateLiteral2(schema, references, path, value) {
  if (!IsString(value))
    return yield Create(ValueErrorType.String, schema, path, value);
  const regex = new RegExp(schema.pattern);
  if (!regex.test(value)) {
    yield Create(ValueErrorType.StringPattern, schema, path, value);
  }
}
function* FromThis(schema, references, path, value) {
  yield* Visit4(Deref(schema, references), references, path, value);
}
function* FromTuple3(schema, references, path, value) {
  if (!IsArray(value))
    return yield Create(ValueErrorType.Tuple, schema, path, value);
  if (schema.items === undefined && !(value.length === 0)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value);
  }
  if (!(value.length === schema.maxItems)) {
    return yield Create(ValueErrorType.TupleLength, schema, path, value);
  }
  if (!schema.items) {
    return;
  }
  for (let i = 0;i < schema.items.length; i++) {
    yield* Visit4(schema.items[i], references, `${path}/${i}`, value[i]);
  }
}
function* FromUndefined(schema, references, path, value) {
  if (!IsUndefined(value))
    yield Create(ValueErrorType.Undefined, schema, path, value);
}
function* FromUnion5(schema, references, path, value) {
  let count = 0;
  for (const subschema of schema.anyOf) {
    const errors = [...Visit4(subschema, references, path, value)];
    if (errors.length === 0)
      return;
    count += errors.length;
  }
  if (count > 0) {
    yield Create(ValueErrorType.Union, schema, path, value);
  }
}
function* FromUint8Array(schema, references, path, value) {
  if (!IsUint8Array(value))
    return yield Create(ValueErrorType.Uint8Array, schema, path, value);
  if (IsDefined(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMaxByteLength, schema, path, value);
  }
  if (IsDefined(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
    yield Create(ValueErrorType.Uint8ArrayMinByteLength, schema, path, value);
  }
}
function* FromUnknown(schema, references, path, value) {
}
function* FromVoid(schema, references, path, value) {
  if (!TypeSystemPolicy.IsVoidLike(value))
    yield Create(ValueErrorType.Void, schema, path, value);
}
function* FromKind(schema, references, path, value) {
  const check = exports_type.Get(schema[Kind]);
  if (!check(schema, value))
    yield Create(ValueErrorType.Kind, schema, path, value);
}
function* Visit4(schema, references, path, value) {
  const references_ = IsDefined(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return yield* FromAny(schema_, references_, path, value);
    case "Array":
      return yield* FromArray3(schema_, references_, path, value);
    case "AsyncIterator":
      return yield* FromAsyncIterator(schema_, references_, path, value);
    case "BigInt":
      return yield* FromBigInt(schema_, references_, path, value);
    case "Boolean":
      return yield* FromBoolean(schema_, references_, path, value);
    case "Constructor":
      return yield* FromConstructor(schema_, references_, path, value);
    case "Date":
      return yield* FromDate(schema_, references_, path, value);
    case "Function":
      return yield* FromFunction(schema_, references_, path, value);
    case "Integer":
      return yield* FromInteger(schema_, references_, path, value);
    case "Intersect":
      return yield* FromIntersect3(schema_, references_, path, value);
    case "Iterator":
      return yield* FromIterator(schema_, references_, path, value);
    case "Literal":
      return yield* FromLiteral2(schema_, references_, path, value);
    case "Never":
      return yield* FromNever(schema_, references_, path, value);
    case "Not":
      return yield* FromNot(schema_, references_, path, value);
    case "Null":
      return yield* FromNull(schema_, references_, path, value);
    case "Number":
      return yield* FromNumber(schema_, references_, path, value);
    case "Object":
      return yield* FromObject(schema_, references_, path, value);
    case "Promise":
      return yield* FromPromise(schema_, references_, path, value);
    case "Record":
      return yield* FromRecord(schema_, references_, path, value);
    case "Ref":
      return yield* FromRef(schema_, references_, path, value);
    case "RegExp":
      return yield* FromRegExp(schema_, references_, path, value);
    case "String":
      return yield* FromString(schema_, references_, path, value);
    case "Symbol":
      return yield* FromSymbol(schema_, references_, path, value);
    case "TemplateLiteral":
      return yield* FromTemplateLiteral2(schema_, references_, path, value);
    case "This":
      return yield* FromThis(schema_, references_, path, value);
    case "Tuple":
      return yield* FromTuple3(schema_, references_, path, value);
    case "Undefined":
      return yield* FromUndefined(schema_, references_, path, value);
    case "Union":
      return yield* FromUnion5(schema_, references_, path, value);
    case "Uint8Array":
      return yield* FromUint8Array(schema_, references_, path, value);
    case "Unknown":
      return yield* FromUnknown(schema_, references_, path, value);
    case "Void":
      return yield* FromVoid(schema_, references_, path, value);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueErrorsUnknownTypeError(schema);
      return yield* FromKind(schema_, references_, path, value);
  }
}
function Errors(...args) {
  const iterator2 = args.length === 3 ? Visit4(args[0], args[1], "", args[2]) : Visit4(args[0], [], "", args[1]);
  return new ValueErrorIterator(iterator2);
}
// node_modules/@sinclair/typebox/build/esm/type/any/any.mjs
function Any(options = {}) {
  return { ...options, [Kind]: "Any" };
}
// node_modules/@sinclair/typebox/build/esm/type/unknown/unknown.mjs
function Unknown(options = {}) {
  return {
    ...options,
    [Kind]: "Unknown"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/guard/type.mjs
var exports_type2 = {};
__export(exports_type2, {
  TypeGuardUnknownTypeError: () => TypeGuardUnknownTypeError,
  IsVoid: () => IsVoid2,
  IsUnsafe: () => IsUnsafe2,
  IsUnknown: () => IsUnknown2,
  IsUnionLiteral: () => IsUnionLiteral,
  IsUnion: () => IsUnion2,
  IsUndefined: () => IsUndefined4,
  IsUint8Array: () => IsUint8Array4,
  IsTuple: () => IsTuple2,
  IsTransform: () => IsTransform2,
  IsThis: () => IsThis2,
  IsTemplateLiteral: () => IsTemplateLiteral2,
  IsSymbol: () => IsSymbol4,
  IsString: () => IsString4,
  IsSchema: () => IsSchema2,
  IsRegExp: () => IsRegExp3,
  IsRef: () => IsRef2,
  IsRecursive: () => IsRecursive,
  IsRecord: () => IsRecord2,
  IsReadonly: () => IsReadonly2,
  IsProperties: () => IsProperties,
  IsPromise: () => IsPromise3,
  IsOptional: () => IsOptional2,
  IsObject: () => IsObject4,
  IsNumber: () => IsNumber4,
  IsNull: () => IsNull4,
  IsNot: () => IsNot2,
  IsNever: () => IsNever2,
  IsMappedResult: () => IsMappedResult2,
  IsMappedKey: () => IsMappedKey2,
  IsLiteralValue: () => IsLiteralValue,
  IsLiteralString: () => IsLiteralString,
  IsLiteralNumber: () => IsLiteralNumber,
  IsLiteralBoolean: () => IsLiteralBoolean,
  IsLiteral: () => IsLiteral2,
  IsKindOf: () => IsKindOf2,
  IsKind: () => IsKind2,
  IsIterator: () => IsIterator4,
  IsIntersect: () => IsIntersect2,
  IsInteger: () => IsInteger3,
  IsFunction: () => IsFunction4,
  IsDate: () => IsDate4,
  IsConstructor: () => IsConstructor2,
  IsBoolean: () => IsBoolean4,
  IsBigInt: () => IsBigInt4,
  IsAsyncIterator: () => IsAsyncIterator4,
  IsArray: () => IsArray4,
  IsAny: () => IsAny2
});
class TypeGuardUnknownTypeError extends TypeBoxError {
}
var KnownTypes = [
  "Any",
  "Array",
  "AsyncIterator",
  "BigInt",
  "Boolean",
  "Constructor",
  "Date",
  "Enum",
  "Function",
  "Integer",
  "Intersect",
  "Iterator",
  "Literal",
  "MappedKey",
  "MappedResult",
  "Not",
  "Null",
  "Number",
  "Object",
  "Promise",
  "Record",
  "Ref",
  "RegExp",
  "String",
  "Symbol",
  "TemplateLiteral",
  "This",
  "Tuple",
  "Undefined",
  "Union",
  "Uint8Array",
  "Unknown",
  "Void"
];
function IsPattern(value) {
  try {
    new RegExp(value);
    return true;
  } catch {
    return false;
  }
}
function IsControlCharacterFree(value) {
  if (!IsString2(value))
    return false;
  for (let i = 0;i < value.length; i++) {
    const code = value.charCodeAt(i);
    if (code >= 7 && code <= 13 || code === 27 || code === 127) {
      return false;
    }
  }
  return true;
}
function IsAdditionalProperties(value) {
  return IsOptionalBoolean(value) || IsSchema2(value);
}
function IsOptionalBigInt(value) {
  return IsUndefined2(value) || IsBigInt2(value);
}
function IsOptionalNumber(value) {
  return IsUndefined2(value) || IsNumber2(value);
}
function IsOptionalBoolean(value) {
  return IsUndefined2(value) || IsBoolean2(value);
}
function IsOptionalString(value) {
  return IsUndefined2(value) || IsString2(value);
}
function IsOptionalPattern(value) {
  return IsUndefined2(value) || IsString2(value) && IsControlCharacterFree(value) && IsPattern(value);
}
function IsOptionalFormat(value) {
  return IsUndefined2(value) || IsString2(value) && IsControlCharacterFree(value);
}
function IsOptionalSchema(value) {
  return IsUndefined2(value) || IsSchema2(value);
}
function IsReadonly2(value) {
  return IsObject2(value) && value[ReadonlyKind] === "Readonly";
}
function IsOptional2(value) {
  return IsObject2(value) && value[OptionalKind] === "Optional";
}
function IsAny2(value) {
  return IsKindOf2(value, "Any") && IsOptionalString(value.$id);
}
function IsArray4(value) {
  return IsKindOf2(value, "Array") && value.type === "array" && IsOptionalString(value.$id) && IsSchema2(value.items) && IsOptionalNumber(value.minItems) && IsOptionalNumber(value.maxItems) && IsOptionalBoolean(value.uniqueItems) && IsOptionalSchema(value.contains) && IsOptionalNumber(value.minContains) && IsOptionalNumber(value.maxContains);
}
function IsAsyncIterator4(value) {
  return IsKindOf2(value, "AsyncIterator") && value.type === "AsyncIterator" && IsOptionalString(value.$id) && IsSchema2(value.items);
}
function IsBigInt4(value) {
  return IsKindOf2(value, "BigInt") && value.type === "bigint" && IsOptionalString(value.$id) && IsOptionalBigInt(value.exclusiveMaximum) && IsOptionalBigInt(value.exclusiveMinimum) && IsOptionalBigInt(value.maximum) && IsOptionalBigInt(value.minimum) && IsOptionalBigInt(value.multipleOf);
}
function IsBoolean4(value) {
  return IsKindOf2(value, "Boolean") && value.type === "boolean" && IsOptionalString(value.$id);
}
function IsConstructor2(value) {
  return IsKindOf2(value, "Constructor") && value.type === "Constructor" && IsOptionalString(value.$id) && IsArray2(value.parameters) && value.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value.returns);
}
function IsDate4(value) {
  return IsKindOf2(value, "Date") && value.type === "Date" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximumTimestamp) && IsOptionalNumber(value.exclusiveMinimumTimestamp) && IsOptionalNumber(value.maximumTimestamp) && IsOptionalNumber(value.minimumTimestamp) && IsOptionalNumber(value.multipleOfTimestamp);
}
function IsFunction4(value) {
  return IsKindOf2(value, "Function") && value.type === "Function" && IsOptionalString(value.$id) && IsArray2(value.parameters) && value.parameters.every((schema) => IsSchema2(schema)) && IsSchema2(value.returns);
}
function IsInteger3(value) {
  return IsKindOf2(value, "Integer") && value.type === "integer" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
function IsProperties(value) {
  return IsObject2(value) && Object.entries(value).every(([key, schema]) => IsControlCharacterFree(key) && IsSchema2(schema));
}
function IsIntersect2(value) {
  return IsKindOf2(value, "Intersect") && (IsString2(value.type) && value.type !== "object" ? false : true) && IsArray2(value.allOf) && value.allOf.every((schema) => IsSchema2(schema) && !IsTransform2(schema)) && IsOptionalString(value.type) && (IsOptionalBoolean(value.unevaluatedProperties) || IsOptionalSchema(value.unevaluatedProperties)) && IsOptionalString(value.$id);
}
function IsIterator4(value) {
  return IsKindOf2(value, "Iterator") && value.type === "Iterator" && IsOptionalString(value.$id) && IsSchema2(value.items);
}
function IsKindOf2(value, kind) {
  return IsObject2(value) && Kind in value && value[Kind] === kind;
}
function IsLiteralString(value) {
  return IsLiteral2(value) && IsString2(value.const);
}
function IsLiteralNumber(value) {
  return IsLiteral2(value) && IsNumber2(value.const);
}
function IsLiteralBoolean(value) {
  return IsLiteral2(value) && IsBoolean2(value.const);
}
function IsLiteral2(value) {
  return IsKindOf2(value, "Literal") && IsOptionalString(value.$id) && IsLiteralValue(value.const);
}
function IsLiteralValue(value) {
  return IsBoolean2(value) || IsNumber2(value) || IsString2(value);
}
function IsMappedKey2(value) {
  return IsKindOf2(value, "MappedKey") && IsArray2(value.keys) && value.keys.every((key) => IsNumber2(key) || IsString2(key));
}
function IsMappedResult2(value) {
  return IsKindOf2(value, "MappedResult") && IsProperties(value.properties);
}
function IsNever2(value) {
  return IsKindOf2(value, "Never") && IsObject2(value.not) && Object.getOwnPropertyNames(value.not).length === 0;
}
function IsNot2(value) {
  return IsKindOf2(value, "Not") && IsSchema2(value.not);
}
function IsNull4(value) {
  return IsKindOf2(value, "Null") && value.type === "null" && IsOptionalString(value.$id);
}
function IsNumber4(value) {
  return IsKindOf2(value, "Number") && value.type === "number" && IsOptionalString(value.$id) && IsOptionalNumber(value.exclusiveMaximum) && IsOptionalNumber(value.exclusiveMinimum) && IsOptionalNumber(value.maximum) && IsOptionalNumber(value.minimum) && IsOptionalNumber(value.multipleOf);
}
function IsObject4(value) {
  return IsKindOf2(value, "Object") && value.type === "object" && IsOptionalString(value.$id) && IsProperties(value.properties) && IsAdditionalProperties(value.additionalProperties) && IsOptionalNumber(value.minProperties) && IsOptionalNumber(value.maxProperties);
}
function IsPromise3(value) {
  return IsKindOf2(value, "Promise") && value.type === "Promise" && IsOptionalString(value.$id) && IsSchema2(value.item);
}
function IsRecord2(value) {
  return IsKindOf2(value, "Record") && value.type === "object" && IsOptionalString(value.$id) && IsAdditionalProperties(value.additionalProperties) && IsObject2(value.patternProperties) && ((schema) => {
    const keys = Object.getOwnPropertyNames(schema.patternProperties);
    return keys.length === 1 && IsPattern(keys[0]) && IsObject2(schema.patternProperties) && IsSchema2(schema.patternProperties[keys[0]]);
  })(value);
}
function IsRecursive(value) {
  return IsObject2(value) && Hint in value && value[Hint] === "Recursive";
}
function IsRef2(value) {
  return IsKindOf2(value, "Ref") && IsOptionalString(value.$id) && IsString2(value.$ref);
}
function IsRegExp3(value) {
  return IsKindOf2(value, "RegExp") && IsOptionalString(value.$id) && IsString2(value.source) && IsString2(value.flags) && IsOptionalNumber(value.maxLength) && IsOptionalNumber(value.minLength);
}
function IsString4(value) {
  return IsKindOf2(value, "String") && value.type === "string" && IsOptionalString(value.$id) && IsOptionalNumber(value.minLength) && IsOptionalNumber(value.maxLength) && IsOptionalPattern(value.pattern) && IsOptionalFormat(value.format);
}
function IsSymbol4(value) {
  return IsKindOf2(value, "Symbol") && value.type === "symbol" && IsOptionalString(value.$id);
}
function IsTemplateLiteral2(value) {
  return IsKindOf2(value, "TemplateLiteral") && value.type === "string" && IsString2(value.pattern) && value.pattern[0] === "^" && value.pattern[value.pattern.length - 1] === "$";
}
function IsThis2(value) {
  return IsKindOf2(value, "This") && IsOptionalString(value.$id) && IsString2(value.$ref);
}
function IsTransform2(value) {
  return IsObject2(value) && TransformKind in value;
}
function IsTuple2(value) {
  return IsKindOf2(value, "Tuple") && value.type === "array" && IsOptionalString(value.$id) && IsNumber2(value.minItems) && IsNumber2(value.maxItems) && value.minItems === value.maxItems && (IsUndefined2(value.items) && IsUndefined2(value.additionalItems) && value.minItems === 0 || IsArray2(value.items) && value.items.every((schema) => IsSchema2(schema)));
}
function IsUndefined4(value) {
  return IsKindOf2(value, "Undefined") && value.type === "undefined" && IsOptionalString(value.$id);
}
function IsUnionLiteral(value) {
  return IsUnion2(value) && value.anyOf.every((schema) => IsLiteralString(schema) || IsLiteralNumber(schema));
}
function IsUnion2(value) {
  return IsKindOf2(value, "Union") && IsOptionalString(value.$id) && IsObject2(value) && IsArray2(value.anyOf) && value.anyOf.every((schema) => IsSchema2(schema));
}
function IsUint8Array4(value) {
  return IsKindOf2(value, "Uint8Array") && value.type === "Uint8Array" && IsOptionalString(value.$id) && IsOptionalNumber(value.minByteLength) && IsOptionalNumber(value.maxByteLength);
}
function IsUnknown2(value) {
  return IsKindOf2(value, "Unknown") && IsOptionalString(value.$id);
}
function IsUnsafe2(value) {
  return IsKindOf2(value, "Unsafe");
}
function IsVoid2(value) {
  return IsKindOf2(value, "Void") && value.type === "void" && IsOptionalString(value.$id);
}
function IsKind2(value) {
  return IsObject2(value) && Kind in value && IsString2(value[Kind]) && !KnownTypes.includes(value[Kind]);
}
function IsSchema2(value) {
  return IsObject2(value) && (IsAny2(value) || IsArray4(value) || IsBoolean4(value) || IsBigInt4(value) || IsAsyncIterator4(value) || IsConstructor2(value) || IsDate4(value) || IsFunction4(value) || IsInteger3(value) || IsIntersect2(value) || IsIterator4(value) || IsLiteral2(value) || IsMappedKey2(value) || IsMappedResult2(value) || IsNever2(value) || IsNot2(value) || IsNull4(value) || IsNumber4(value) || IsObject4(value) || IsPromise3(value) || IsRecord2(value) || IsRef2(value) || IsRegExp3(value) || IsString4(value) || IsSymbol4(value) || IsTemplateLiteral2(value) || IsThis2(value) || IsTuple2(value) || IsUndefined4(value) || IsUnion2(value) || IsUint8Array4(value) || IsUnknown2(value) || IsUnsafe2(value) || IsVoid2(value) || IsKind2(value));
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-check.mjs
class ExtendsResolverError extends TypeBoxError {
}
var ExtendsResult;
(function(ExtendsResult2) {
  ExtendsResult2[ExtendsResult2["Union"] = 0] = "Union";
  ExtendsResult2[ExtendsResult2["True"] = 1] = "True";
  ExtendsResult2[ExtendsResult2["False"] = 2] = "False";
})(ExtendsResult || (ExtendsResult = {}));
function IntoBooleanResult(result) {
  return result === ExtendsResult.False ? result : ExtendsResult.True;
}
function Throw(message) {
  throw new ExtendsResolverError(message);
}
function IsStructuralRight(right) {
  return exports_type2.IsNever(right) || exports_type2.IsIntersect(right) || exports_type2.IsUnion(right) || exports_type2.IsUnknown(right) || exports_type2.IsAny(right);
}
function StructuralRight(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : Throw("StructuralRight");
}
function FromAnyRight(left, right) {
  return ExtendsResult.True;
}
function FromAny2(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) && right.anyOf.some((schema) => exports_type2.IsAny(schema) || exports_type2.IsUnknown(schema)) ? ExtendsResult.True : exports_type2.IsUnion(right) ? ExtendsResult.Union : exports_type2.IsUnknown(right) ? ExtendsResult.True : exports_type2.IsAny(right) ? ExtendsResult.True : ExtendsResult.Union;
}
function FromArrayRight(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromArray4(left, right) {
  return exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsArray(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromAsyncIterator2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsAsyncIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromBigInt2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBigInt(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromBooleanRight(left, right) {
  return exports_type2.IsLiteralBoolean(left) ? ExtendsResult.True : exports_type2.IsBoolean(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromBoolean2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsBoolean(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromConstructor2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsConstructor(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
}
function FromDate2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsDate(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromFunction2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsFunction(right) ? ExtendsResult.False : left.parameters.length > right.parameters.length ? ExtendsResult.False : !left.parameters.every((schema, index) => IntoBooleanResult(Visit5(right.parameters[index], schema)) === ExtendsResult.True) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.returns, right.returns));
}
function FromIntegerRight(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsNumber(left.const) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromInteger2(left, right) {
  return exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : ExtendsResult.False;
}
function FromIntersectRight(left, right) {
  return right.allOf.every((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromIntersect4(left, right) {
  return left.allOf.some((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromIterator2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : !exports_type2.IsIterator(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.items, right.items));
}
function FromLiteral3(left, right) {
  return exports_type2.IsLiteral(right) && right.const === left.const ? ExtendsResult.True : IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : ExtendsResult.False;
}
function FromNeverRight(left, right) {
  return ExtendsResult.False;
}
function FromNever2(left, right) {
  return ExtendsResult.True;
}
function UnwrapTNot(schema) {
  let [current, depth] = [schema, 0];
  while (true) {
    if (!exports_type2.IsNot(current))
      break;
    current = current.not;
    depth += 1;
  }
  return depth % 2 === 0 ? current : Unknown();
}
function FromNot2(left, right) {
  return exports_type2.IsNot(left) ? Visit5(UnwrapTNot(left), right) : exports_type2.IsNot(right) ? Visit5(left, UnwrapTNot(right)) : Throw("Invalid fallthrough for Not");
}
function FromNull2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsNull(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromNumberRight(left, right) {
  return exports_type2.IsLiteralNumber(left) ? ExtendsResult.True : exports_type2.IsNumber(left) || exports_type2.IsInteger(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromNumber2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsInteger(right) || exports_type2.IsNumber(right) ? ExtendsResult.True : ExtendsResult.False;
}
function IsObjectPropertyCount(schema, count) {
  return Object.getOwnPropertyNames(schema.properties).length === count;
}
function IsObjectStringLike(schema) {
  return IsObjectArrayLike(schema);
}
function IsObjectSymbolLike(schema) {
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "description" in schema.properties && exports_type2.IsUnion(schema.properties.description) && schema.properties.description.anyOf.length === 2 && (exports_type2.IsString(schema.properties.description.anyOf[0]) && exports_type2.IsUndefined(schema.properties.description.anyOf[1]) || exports_type2.IsString(schema.properties.description.anyOf[1]) && exports_type2.IsUndefined(schema.properties.description.anyOf[0]));
}
function IsObjectNumberLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectBooleanLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectBigIntLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectDateLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectUint8ArrayLike(schema) {
  return IsObjectArrayLike(schema);
}
function IsObjectFunctionLike(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
}
function IsObjectConstructorLike(schema) {
  return IsObjectPropertyCount(schema, 0);
}
function IsObjectArrayLike(schema) {
  const length = Number2();
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "length" in schema.properties && IntoBooleanResult(Visit5(schema.properties["length"], length)) === ExtendsResult.True;
}
function IsObjectPromiseLike(schema) {
  const then = Function2([Any()], Any());
  return IsObjectPropertyCount(schema, 0) || IsObjectPropertyCount(schema, 1) && "then" in schema.properties && IntoBooleanResult(Visit5(schema.properties["then"], then)) === ExtendsResult.True;
}
function Property(left, right) {
  return Visit5(left, right) === ExtendsResult.False ? ExtendsResult.False : exports_type2.IsOptional(left) && !exports_type2.IsOptional(right) ? ExtendsResult.False : ExtendsResult.True;
}
function FromObjectRight(left, right) {
  return exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : exports_type2.IsNever(left) || exports_type2.IsLiteralString(left) && IsObjectStringLike(right) || exports_type2.IsLiteralNumber(left) && IsObjectNumberLike(right) || exports_type2.IsLiteralBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsBigInt(left) && IsObjectBigIntLike(right) || exports_type2.IsString(left) && IsObjectStringLike(right) || exports_type2.IsSymbol(left) && IsObjectSymbolLike(right) || exports_type2.IsNumber(left) && IsObjectNumberLike(right) || exports_type2.IsInteger(left) && IsObjectNumberLike(right) || exports_type2.IsBoolean(left) && IsObjectBooleanLike(right) || exports_type2.IsUint8Array(left) && IsObjectUint8ArrayLike(right) || exports_type2.IsDate(left) && IsObjectDateLike(right) || exports_type2.IsConstructor(left) && IsObjectConstructorLike(right) || exports_type2.IsFunction(left) && IsObjectFunctionLike(right) ? ExtendsResult.True : exports_type2.IsRecord(left) && exports_type2.IsString(RecordKey(left)) ? (() => {
    return right[Hint] === "Record" ? ExtendsResult.True : ExtendsResult.False;
  })() : exports_type2.IsRecord(left) && exports_type2.IsNumber(RecordKey(left)) ? (() => {
    return IsObjectPropertyCount(right, 0) ? ExtendsResult.True : ExtendsResult.False;
  })() : ExtendsResult.False;
}
function FromObject2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : !exports_type2.IsObject(right) ? ExtendsResult.False : (() => {
    for (const key of Object.getOwnPropertyNames(right.properties)) {
      if (!(key in left.properties) && !exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.False;
      }
      if (exports_type2.IsOptional(right.properties[key])) {
        return ExtendsResult.True;
      }
      if (Property(left.properties[key], right.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })();
}
function FromPromise2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectPromiseLike(right) ? ExtendsResult.True : !exports_type2.IsPromise(right) ? ExtendsResult.False : IntoBooleanResult(Visit5(left.item, right.item));
}
function RecordKey(schema) {
  return PatternNumberExact in schema.patternProperties ? Number2() : (PatternStringExact in schema.patternProperties) ? String2() : Throw("Unknown record key pattern");
}
function RecordValue(schema) {
  return PatternNumberExact in schema.patternProperties ? schema.patternProperties[PatternNumberExact] : (PatternStringExact in schema.patternProperties) ? schema.patternProperties[PatternStringExact] : Throw("Unable to get record value schema");
}
function FromRecordRight(left, right) {
  const [Key, Value] = [RecordKey(right), RecordValue(right)];
  return exports_type2.IsLiteralString(left) && exports_type2.IsNumber(Key) && IntoBooleanResult(Visit5(left, Value)) === ExtendsResult.True ? ExtendsResult.True : exports_type2.IsUint8Array(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsString(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsArray(left) && exports_type2.IsNumber(Key) ? Visit5(left, Value) : exports_type2.IsObject(left) ? (() => {
    for (const key of Object.getOwnPropertyNames(left.properties)) {
      if (Property(Value, left.properties[key]) === ExtendsResult.False) {
        return ExtendsResult.False;
      }
    }
    return ExtendsResult.True;
  })() : ExtendsResult.False;
}
function FromRecord2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : !exports_type2.IsRecord(right) ? ExtendsResult.False : Visit5(RecordValue(left), RecordValue(right));
}
function FromRegExp2(left, right) {
  const L = exports_type2.IsRegExp(left) ? String2() : left;
  const R = exports_type2.IsRegExp(right) ? String2() : right;
  return Visit5(L, R);
}
function FromStringRight(left, right) {
  return exports_type2.IsLiteral(left) && exports_value.IsString(left.const) ? ExtendsResult.True : exports_type2.IsString(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromString2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsString(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromSymbol2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsSymbol(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromTemplateLiteral3(left, right) {
  return exports_type2.IsTemplateLiteral(left) ? Visit5(TemplateLiteralToUnion(left), right) : exports_type2.IsTemplateLiteral(right) ? Visit5(left, TemplateLiteralToUnion(right)) : Throw("Invalid fallthrough for TemplateLiteral");
}
function IsArrayOfTuple(left, right) {
  return exports_type2.IsArray(right) && left.items !== undefined && left.items.every((schema) => Visit5(schema, right.items) === ExtendsResult.True);
}
function FromTupleRight(left, right) {
  return exports_type2.IsNever(left) ? ExtendsResult.True : exports_type2.IsUnknown(left) ? ExtendsResult.False : exports_type2.IsAny(left) ? ExtendsResult.Union : ExtendsResult.False;
}
function FromTuple4(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) && IsObjectArrayLike(right) ? ExtendsResult.True : exports_type2.IsArray(right) && IsArrayOfTuple(left, right) ? ExtendsResult.True : !exports_type2.IsTuple(right) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) || !exports_value.IsUndefined(left.items) && exports_value.IsUndefined(right.items) ? ExtendsResult.False : exports_value.IsUndefined(left.items) && !exports_value.IsUndefined(right.items) ? ExtendsResult.True : left.items.every((schema, index) => Visit5(schema, right.items[index]) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUint8Array2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsUint8Array(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUndefined2(left, right) {
  return IsStructuralRight(right) ? StructuralRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsRecord(right) ? FromRecordRight(left, right) : exports_type2.IsVoid(right) ? FromVoidRight(left, right) : exports_type2.IsUndefined(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUnionRight(left, right) {
  return right.anyOf.some((schema) => Visit5(left, schema) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUnion6(left, right) {
  return left.anyOf.every((schema) => Visit5(schema, right) === ExtendsResult.True) ? ExtendsResult.True : ExtendsResult.False;
}
function FromUnknownRight(left, right) {
  return ExtendsResult.True;
}
function FromUnknown2(left, right) {
  return exports_type2.IsNever(right) ? FromNeverRight(left, right) : exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsString(right) ? FromStringRight(left, right) : exports_type2.IsNumber(right) ? FromNumberRight(left, right) : exports_type2.IsInteger(right) ? FromIntegerRight(left, right) : exports_type2.IsBoolean(right) ? FromBooleanRight(left, right) : exports_type2.IsArray(right) ? FromArrayRight(left, right) : exports_type2.IsTuple(right) ? FromTupleRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsUnknown(right) ? ExtendsResult.True : ExtendsResult.False;
}
function FromVoidRight(left, right) {
  return exports_type2.IsUndefined(left) ? ExtendsResult.True : exports_type2.IsUndefined(left) ? ExtendsResult.True : ExtendsResult.False;
}
function FromVoid2(left, right) {
  return exports_type2.IsIntersect(right) ? FromIntersectRight(left, right) : exports_type2.IsUnion(right) ? FromUnionRight(left, right) : exports_type2.IsUnknown(right) ? FromUnknownRight(left, right) : exports_type2.IsAny(right) ? FromAnyRight(left, right) : exports_type2.IsObject(right) ? FromObjectRight(left, right) : exports_type2.IsVoid(right) ? ExtendsResult.True : ExtendsResult.False;
}
function Visit5(left, right) {
  return exports_type2.IsTemplateLiteral(left) || exports_type2.IsTemplateLiteral(right) ? FromTemplateLiteral3(left, right) : exports_type2.IsRegExp(left) || exports_type2.IsRegExp(right) ? FromRegExp2(left, right) : exports_type2.IsNot(left) || exports_type2.IsNot(right) ? FromNot2(left, right) : exports_type2.IsAny(left) ? FromAny2(left, right) : exports_type2.IsArray(left) ? FromArray4(left, right) : exports_type2.IsBigInt(left) ? FromBigInt2(left, right) : exports_type2.IsBoolean(left) ? FromBoolean2(left, right) : exports_type2.IsAsyncIterator(left) ? FromAsyncIterator2(left, right) : exports_type2.IsConstructor(left) ? FromConstructor2(left, right) : exports_type2.IsDate(left) ? FromDate2(left, right) : exports_type2.IsFunction(left) ? FromFunction2(left, right) : exports_type2.IsInteger(left) ? FromInteger2(left, right) : exports_type2.IsIntersect(left) ? FromIntersect4(left, right) : exports_type2.IsIterator(left) ? FromIterator2(left, right) : exports_type2.IsLiteral(left) ? FromLiteral3(left, right) : exports_type2.IsNever(left) ? FromNever2(left, right) : exports_type2.IsNull(left) ? FromNull2(left, right) : exports_type2.IsNumber(left) ? FromNumber2(left, right) : exports_type2.IsObject(left) ? FromObject2(left, right) : exports_type2.IsRecord(left) ? FromRecord2(left, right) : exports_type2.IsString(left) ? FromString2(left, right) : exports_type2.IsSymbol(left) ? FromSymbol2(left, right) : exports_type2.IsTuple(left) ? FromTuple4(left, right) : exports_type2.IsPromise(left) ? FromPromise2(left, right) : exports_type2.IsUint8Array(left) ? FromUint8Array2(left, right) : exports_type2.IsUndefined(left) ? FromUndefined2(left, right) : exports_type2.IsUnion(left) ? FromUnion6(left, right) : exports_type2.IsUnknown(left) ? FromUnknown2(left, right) : exports_type2.IsVoid(left) ? FromVoid2(left, right) : Throw(`Unknown left type operand '${left[Kind]}'`);
}
function ExtendsCheck(left, right) {
  return Visit5(left, right);
}
// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-result.mjs
function FromProperties7(P, Right, True, False, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extends(P[K2], Right, True, False, options);
  return Acc;
}
function FromMappedResult6(Left, Right, True, False, options) {
  return FromProperties7(Left.properties, Right, True, False, options);
}
function ExtendsFromMappedResult(Left, Right, True, False, options) {
  const P = FromMappedResult6(Left, Right, True, False, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends.mjs
function ExtendsResolve(left, right, trueType, falseType) {
  const R = ExtendsCheck(left, right);
  return R === ExtendsResult.Union ? Union([trueType, falseType]) : R === ExtendsResult.True ? trueType : falseType;
}
function Extends(L, R, T, F, options = {}) {
  return IsMappedResult(L) ? ExtendsFromMappedResult(L, R, T, F, options) : IsMappedKey(L) ? CloneType(ExtendsFromMappedKey(L, R, T, F, options)) : CloneType(ExtendsResolve(L, R, T, F), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extends/extends-from-mapped-key.mjs
function FromPropertyKey(K, U, L, R, options) {
  return {
    [K]: Extends(Literal(K), U, L, R, options)
  };
}
function FromPropertyKeys(K, U, L, R, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey(LK, U, L, R, options) };
  }, {});
}
function FromMappedKey2(K, U, L, R, options) {
  return FromPropertyKeys(K.keys, U, L, R, options);
}
function ExtendsFromMappedKey(T, U, L, R, options) {
  const P = FromMappedKey2(T, U, L, R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/value/check/check.mjs
class ValueCheckUnknownTypeError extends TypeBoxError {
  constructor(schema) {
    super(`Unknown type`);
    this.schema = schema;
  }
}
function IsAnyOrUnknown(schema) {
  return schema[Kind] === "Any" || schema[Kind] === "Unknown";
}
function IsDefined2(value) {
  return value !== undefined;
}
function FromAny3(schema, references, value) {
  return true;
}
function FromArray5(schema, references, value) {
  if (!IsArray(value))
    return false;
  if (IsDefined2(schema.minItems) && !(value.length >= schema.minItems)) {
    return false;
  }
  if (IsDefined2(schema.maxItems) && !(value.length <= schema.maxItems)) {
    return false;
  }
  if (!value.every((value2) => Visit6(schema.items, references, value2))) {
    return false;
  }
  if (schema.uniqueItems === true && !function() {
    const set3 = new Set;
    for (const element of value) {
      const hashed = Hash(element);
      if (set3.has(hashed)) {
        return false;
      } else {
        set3.add(hashed);
      }
    }
    return true;
  }()) {
    return false;
  }
  if (!(IsDefined2(schema.contains) || IsNumber(schema.minContains) || IsNumber(schema.maxContains))) {
    return true;
  }
  const containsSchema = IsDefined2(schema.contains) ? schema.contains : Never();
  const containsCount = value.reduce((acc, value2) => Visit6(containsSchema, references, value2) ? acc + 1 : acc, 0);
  if (containsCount === 0) {
    return false;
  }
  if (IsNumber(schema.minContains) && containsCount < schema.minContains) {
    return false;
  }
  if (IsNumber(schema.maxContains) && containsCount > schema.maxContains) {
    return false;
  }
  return true;
}
function FromAsyncIterator3(schema, references, value) {
  return IsAsyncIterator(value);
}
function FromBigInt3(schema, references, value) {
  if (!IsBigInt(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === BigInt(0))) {
    return false;
  }
  return true;
}
function FromBoolean3(schema, references, value) {
  return IsBoolean(value);
}
function FromConstructor3(schema, references, value) {
  return Visit6(schema.returns, references, value.prototype);
}
function FromDate3(schema, references, value) {
  if (!IsDate(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximumTimestamp) && !(value.getTime() < schema.exclusiveMaximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimumTimestamp) && !(value.getTime() > schema.exclusiveMinimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.maximumTimestamp) && !(value.getTime() <= schema.maximumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.minimumTimestamp) && !(value.getTime() >= schema.minimumTimestamp)) {
    return false;
  }
  if (IsDefined2(schema.multipleOfTimestamp) && !(value.getTime() % schema.multipleOfTimestamp === 0)) {
    return false;
  }
  return true;
}
function FromFunction3(schema, references, value) {
  return IsFunction(value);
}
function FromInteger3(schema, references, value) {
  if (!IsInteger(value)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
function FromIntersect5(schema, references, value) {
  const check1 = schema.allOf.every((schema2) => Visit6(schema2, references, value));
  if (schema.unevaluatedProperties === false) {
    const keyPattern = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value).every((key) => keyPattern.test(key));
    return check1 && check2;
  } else if (IsSchema2(schema.unevaluatedProperties)) {
    const keyCheck = new RegExp(KeyOfPattern(schema));
    const check2 = Object.getOwnPropertyNames(value).every((key) => keyCheck.test(key) || Visit6(schema.unevaluatedProperties, references, value[key]));
    return check1 && check2;
  } else {
    return check1;
  }
}
function FromIterator3(schema, references, value) {
  return IsIterator(value);
}
function FromLiteral4(schema, references, value) {
  return value === schema.const;
}
function FromNever3(schema, references, value) {
  return false;
}
function FromNot3(schema, references, value) {
  return !Visit6(schema.not, references, value);
}
function FromNull3(schema, references, value) {
  return IsNull(value);
}
function FromNumber3(schema, references, value) {
  if (!TypeSystemPolicy.IsNumberLike(value))
    return false;
  if (IsDefined2(schema.exclusiveMaximum) && !(value < schema.exclusiveMaximum)) {
    return false;
  }
  if (IsDefined2(schema.exclusiveMinimum) && !(value > schema.exclusiveMinimum)) {
    return false;
  }
  if (IsDefined2(schema.minimum) && !(value >= schema.minimum)) {
    return false;
  }
  if (IsDefined2(schema.maximum) && !(value <= schema.maximum)) {
    return false;
  }
  if (IsDefined2(schema.multipleOf) && !(value % schema.multipleOf === 0)) {
    return false;
  }
  return true;
}
function FromObject3(schema, references, value) {
  if (!TypeSystemPolicy.IsObjectLike(value))
    return false;
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    return false;
  }
  const knownKeys = Object.getOwnPropertyNames(schema.properties);
  for (const knownKey of knownKeys) {
    const property = schema.properties[knownKey];
    if (schema.required && schema.required.includes(knownKey)) {
      if (!Visit6(property, references, value[knownKey])) {
        return false;
      }
      if ((ExtendsUndefinedCheck(property) || IsAnyOrUnknown(property)) && !(knownKey in value)) {
        return false;
      }
    } else {
      if (TypeSystemPolicy.IsExactOptionalProperty(value, knownKey) && !Visit6(property, references, value[knownKey])) {
        return false;
      }
    }
  }
  if (schema.additionalProperties === false) {
    const valueKeys = Object.getOwnPropertyNames(value);
    if (schema.required && schema.required.length === knownKeys.length && valueKeys.length === knownKeys.length) {
      return true;
    } else {
      return valueKeys.every((valueKey) => knownKeys.includes(valueKey));
    }
  } else if (typeof schema.additionalProperties === "object") {
    const valueKeys = Object.getOwnPropertyNames(value);
    return valueKeys.every((key) => knownKeys.includes(key) || Visit6(schema.additionalProperties, references, value[key]));
  } else {
    return true;
  }
}
function FromPromise3(schema, references, value) {
  return IsPromise(value);
}
function FromRecord3(schema, references, value) {
  if (!TypeSystemPolicy.IsRecordLike(value)) {
    return false;
  }
  if (IsDefined2(schema.minProperties) && !(Object.getOwnPropertyNames(value).length >= schema.minProperties)) {
    return false;
  }
  if (IsDefined2(schema.maxProperties) && !(Object.getOwnPropertyNames(value).length <= schema.maxProperties)) {
    return false;
  }
  const [patternKey, patternSchema] = Object.entries(schema.patternProperties)[0];
  const regex = new RegExp(patternKey);
  const check1 = Object.entries(value).every(([key, value2]) => {
    return regex.test(key) ? Visit6(patternSchema, references, value2) : true;
  });
  const check2 = typeof schema.additionalProperties === "object" ? Object.entries(value).every(([key, value2]) => {
    return !regex.test(key) ? Visit6(schema.additionalProperties, references, value2) : true;
  }) : true;
  const check3 = schema.additionalProperties === false ? Object.getOwnPropertyNames(value).every((key) => {
    return regex.test(key);
  }) : true;
  return check1 && check2 && check3;
}
function FromRef2(schema, references, value) {
  return Visit6(Deref(schema, references), references, value);
}
function FromRegExp3(schema, references, value) {
  const regex = new RegExp(schema.source, schema.flags);
  if (IsDefined2(schema.minLength)) {
    if (!(value.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value.length <= schema.maxLength))
      return false;
  }
  return regex.test(value);
}
function FromString3(schema, references, value) {
  if (!IsString(value)) {
    return false;
  }
  if (IsDefined2(schema.minLength)) {
    if (!(value.length >= schema.minLength))
      return false;
  }
  if (IsDefined2(schema.maxLength)) {
    if (!(value.length <= schema.maxLength))
      return false;
  }
  if (IsDefined2(schema.pattern)) {
    const regex = new RegExp(schema.pattern);
    if (!regex.test(value))
      return false;
  }
  if (IsDefined2(schema.format)) {
    if (!exports_format.Has(schema.format))
      return false;
    const func = exports_format.Get(schema.format);
    return func(value);
  }
  return true;
}
function FromSymbol3(schema, references, value) {
  return IsSymbol(value);
}
function FromTemplateLiteral4(schema, references, value) {
  return IsString(value) && new RegExp(schema.pattern).test(value);
}
function FromThis2(schema, references, value) {
  return Visit6(Deref(schema, references), references, value);
}
function FromTuple5(schema, references, value) {
  if (!IsArray(value)) {
    return false;
  }
  if (schema.items === undefined && !(value.length === 0)) {
    return false;
  }
  if (!(value.length === schema.maxItems)) {
    return false;
  }
  if (!schema.items) {
    return true;
  }
  for (let i = 0;i < schema.items.length; i++) {
    if (!Visit6(schema.items[i], references, value[i]))
      return false;
  }
  return true;
}
function FromUndefined3(schema, references, value) {
  return IsUndefined(value);
}
function FromUnion7(schema, references, value) {
  return schema.anyOf.some((inner) => Visit6(inner, references, value));
}
function FromUint8Array3(schema, references, value) {
  if (!IsUint8Array(value)) {
    return false;
  }
  if (IsDefined2(schema.maxByteLength) && !(value.length <= schema.maxByteLength)) {
    return false;
  }
  if (IsDefined2(schema.minByteLength) && !(value.length >= schema.minByteLength)) {
    return false;
  }
  return true;
}
function FromUnknown3(schema, references, value) {
  return true;
}
function FromVoid3(schema, references, value) {
  return TypeSystemPolicy.IsVoidLike(value);
}
function FromKind2(schema, references, value) {
  if (!exports_type.Has(schema[Kind]))
    return false;
  const func = exports_type.Get(schema[Kind]);
  return func(schema, value);
}
function Visit6(schema, references, value) {
  const references_ = IsDefined2(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny3(schema_, references_, value);
    case "Array":
      return FromArray5(schema_, references_, value);
    case "AsyncIterator":
      return FromAsyncIterator3(schema_, references_, value);
    case "BigInt":
      return FromBigInt3(schema_, references_, value);
    case "Boolean":
      return FromBoolean3(schema_, references_, value);
    case "Constructor":
      return FromConstructor3(schema_, references_, value);
    case "Date":
      return FromDate3(schema_, references_, value);
    case "Function":
      return FromFunction3(schema_, references_, value);
    case "Integer":
      return FromInteger3(schema_, references_, value);
    case "Intersect":
      return FromIntersect5(schema_, references_, value);
    case "Iterator":
      return FromIterator3(schema_, references_, value);
    case "Literal":
      return FromLiteral4(schema_, references_, value);
    case "Never":
      return FromNever3(schema_, references_, value);
    case "Not":
      return FromNot3(schema_, references_, value);
    case "Null":
      return FromNull3(schema_, references_, value);
    case "Number":
      return FromNumber3(schema_, references_, value);
    case "Object":
      return FromObject3(schema_, references_, value);
    case "Promise":
      return FromPromise3(schema_, references_, value);
    case "Record":
      return FromRecord3(schema_, references_, value);
    case "Ref":
      return FromRef2(schema_, references_, value);
    case "RegExp":
      return FromRegExp3(schema_, references_, value);
    case "String":
      return FromString3(schema_, references_, value);
    case "Symbol":
      return FromSymbol3(schema_, references_, value);
    case "TemplateLiteral":
      return FromTemplateLiteral4(schema_, references_, value);
    case "This":
      return FromThis2(schema_, references_, value);
    case "Tuple":
      return FromTuple5(schema_, references_, value);
    case "Undefined":
      return FromUndefined3(schema_, references_, value);
    case "Union":
      return FromUnion7(schema_, references_, value);
    case "Uint8Array":
      return FromUint8Array3(schema_, references_, value);
    case "Unknown":
      return FromUnknown3(schema_, references_, value);
    case "Void":
      return FromVoid3(schema_, references_, value);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCheckUnknownTypeError(schema_);
      return FromKind2(schema_, references_, value);
  }
}
function Check(...args) {
  return args.length === 3 ? Visit6(args[0], args[1], args[2]) : Visit6(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/clone/clone.mjs
function ObjectType3(value) {
  const Acc = {};
  for (const key of Object.getOwnPropertyNames(value)) {
    Acc[key] = Clone2(value[key]);
  }
  for (const key of Object.getOwnPropertySymbols(value)) {
    Acc[key] = Clone2(value[key]);
  }
  return Acc;
}
function ArrayType3(value) {
  return value.map((element) => Clone2(element));
}
function TypedArrayType(value) {
  return value.slice();
}
function DateType3(value) {
  return new Date(value.toISOString());
}
function ValueType(value) {
  return value;
}
function Clone2(value) {
  if (IsArray(value))
    return ArrayType3(value);
  if (IsDate(value))
    return DateType3(value);
  if (IsStandardObject(value))
    return ObjectType3(value);
  if (IsTypedArray(value))
    return TypedArrayType(value);
  if (IsValueType(value))
    return ValueType(value);
  throw new Error("ValueClone: Unable to clone value");
}
// node_modules/@sinclair/typebox/build/esm/value/create/create.mjs
class ValueCreateError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
function FromDefault(value) {
  return typeof value === "function" ? value : Clone2(value);
}
function FromAny4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
function FromArray6(schema, references) {
  if (schema.uniqueItems === true && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the uniqueItems constraint requires a default value");
  } else if ("contains" in schema && !HasPropertyKey(schema, "default")) {
    throw new ValueCreateError(schema, "Array with the contains constraint requires a default value");
  } else if ("default" in schema) {
    return FromDefault(schema.default);
  } else if (schema.minItems !== undefined) {
    return Array.from({ length: schema.minItems }).map((item) => {
      return Visit7(schema.items, references);
    });
  } else {
    return [];
  }
}
function FromAsyncIterator4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return async function* () {
    }();
  }
}
function FromBigInt4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return BigInt(0);
  }
}
function FromBoolean4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return false;
  }
}
function FromConstructor4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value = Visit7(schema.returns, references);
    if (typeof value === "object" && !Array.isArray(value)) {
      return class {
        constructor() {
          for (const [key, val] of Object.entries(value)) {
            const self = this;
            self[key] = val;
          }
        }
      };
    } else {
      return class {
      };
    }
  }
}
function FromDate4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimumTimestamp !== undefined) {
    return new Date(schema.minimumTimestamp);
  } else {
    return new Date;
  }
}
function FromFunction4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return () => Visit7(schema.returns, references);
  }
}
function FromInteger4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
function FromIntersect6(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const value = schema.allOf.reduce((acc, schema2) => {
      const next = Visit7(schema2, references);
      return typeof next === "object" ? { ...acc, ...next } : next;
    }, {});
    if (!Check(schema, references, value))
      throw new ValueCreateError(schema, "Intersect produced invalid value. Consider using a default value.");
    return value;
  }
}
function FromIterator4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return function* () {
    }();
  }
}
function FromLiteral5(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return schema.const;
  }
}
function FromNever4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Never types cannot be created. Consider using a default value.");
  }
}
function FromNot4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "Not types must have a default value");
  }
}
function FromNull4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return null;
  }
}
function FromNumber4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minimum !== undefined) {
    return schema.minimum;
  } else {
    return 0;
  }
}
function FromObject4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    const required = new Set(schema.required);
    const Acc = {};
    for (const [key, subschema] of Object.entries(schema.properties)) {
      if (!required.has(key))
        continue;
      Acc[key] = Visit7(subschema, references);
    }
    return Acc;
  }
}
function FromPromise4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Promise.resolve(Visit7(schema.item, references));
  }
}
function FromRecord4(schema, references) {
  const [keyPattern, valueSchema] = Object.entries(schema.patternProperties)[0];
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (!(keyPattern === PatternStringExact || keyPattern === PatternNumberExact)) {
    const propertyKeys = keyPattern.slice(1, keyPattern.length - 1).split("|");
    const Acc = {};
    for (const key of propertyKeys)
      Acc[key] = Visit7(valueSchema, references);
    return Acc;
  } else {
    return {};
  }
}
function FromRef3(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
function FromRegExp4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new ValueCreateError(schema, "RegExp types cannot be created. Consider using a default value.");
  }
}
function FromString4(schema, references) {
  if (schema.pattern !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with patterns must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else if (schema.format !== undefined) {
    if (!HasPropertyKey(schema, "default")) {
      throw new ValueCreateError(schema, "String types with formats must specify a default value");
    } else {
      return FromDefault(schema.default);
    }
  } else {
    if (HasPropertyKey(schema, "default")) {
      return FromDefault(schema.default);
    } else if (schema.minLength !== undefined) {
      return Array.from({ length: schema.minLength }).map(() => " ").join("");
    } else {
      return "";
    }
  }
}
function FromSymbol4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if ("value" in schema) {
    return Symbol.for(schema.value);
  } else {
    return Symbol();
  }
}
function FromTemplateLiteral5(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (!IsTemplateLiteralFinite(schema))
    throw new ValueCreateError(schema, "Can only create template literals that produce a finite variants. Consider using a default value.");
  const generated = TemplateLiteralGenerate(schema);
  return generated[0];
}
function FromThis3(schema, references) {
  if (recursiveDepth++ > recursiveMaxDepth)
    throw new ValueCreateError(schema, "Cannot create recursive type as it appears possibly infinite. Consider using a default.");
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return Visit7(Deref(schema, references), references);
  }
}
function FromTuple6(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  }
  if (schema.items === undefined) {
    return [];
  } else {
    return Array.from({ length: schema.minItems }).map((_, index) => Visit7(schema.items[index], references));
  }
}
function FromUndefined4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
}
function FromUnion8(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.anyOf.length === 0) {
    throw new Error("ValueCreate.Union: Cannot create Union with zero variants");
  } else {
    return Visit7(schema.anyOf[0], references);
  }
}
function FromUint8Array4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else if (schema.minByteLength !== undefined) {
    return new Uint8Array(schema.minByteLength);
  } else {
    return new Uint8Array(0);
  }
}
function FromUnknown4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return {};
  }
}
function FromVoid4(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    return;
  }
}
function FromKind3(schema, references) {
  if (HasPropertyKey(schema, "default")) {
    return FromDefault(schema.default);
  } else {
    throw new Error("User defined types must specify a default value");
  }
}
function Visit7(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Any":
      return FromAny4(schema_, references_);
    case "Array":
      return FromArray6(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator4(schema_, references_);
    case "BigInt":
      return FromBigInt4(schema_, references_);
    case "Boolean":
      return FromBoolean4(schema_, references_);
    case "Constructor":
      return FromConstructor4(schema_, references_);
    case "Date":
      return FromDate4(schema_, references_);
    case "Function":
      return FromFunction4(schema_, references_);
    case "Integer":
      return FromInteger4(schema_, references_);
    case "Intersect":
      return FromIntersect6(schema_, references_);
    case "Iterator":
      return FromIterator4(schema_, references_);
    case "Literal":
      return FromLiteral5(schema_, references_);
    case "Never":
      return FromNever4(schema_, references_);
    case "Not":
      return FromNot4(schema_, references_);
    case "Null":
      return FromNull4(schema_, references_);
    case "Number":
      return FromNumber4(schema_, references_);
    case "Object":
      return FromObject4(schema_, references_);
    case "Promise":
      return FromPromise4(schema_, references_);
    case "Record":
      return FromRecord4(schema_, references_);
    case "Ref":
      return FromRef3(schema_, references_);
    case "RegExp":
      return FromRegExp4(schema_, references_);
    case "String":
      return FromString4(schema_, references_);
    case "Symbol":
      return FromSymbol4(schema_, references_);
    case "TemplateLiteral":
      return FromTemplateLiteral5(schema_, references_);
    case "This":
      return FromThis3(schema_, references_);
    case "Tuple":
      return FromTuple6(schema_, references_);
    case "Undefined":
      return FromUndefined4(schema_, references_);
    case "Union":
      return FromUnion8(schema_, references_);
    case "Uint8Array":
      return FromUint8Array4(schema_, references_);
    case "Unknown":
      return FromUnknown4(schema_, references_);
    case "Void":
      return FromVoid4(schema_, references_);
    default:
      if (!exports_type.Has(schema_[Kind]))
        throw new ValueCreateError(schema_, "Unknown type");
      return FromKind3(schema_, references_);
  }
}
var recursiveMaxDepth = 512;
var recursiveDepth = 0;
function Create2(...args) {
  recursiveDepth = 0;
  return args.length === 2 ? Visit7(args[0], args[1]) : Visit7(args[0], []);
}
// node_modules/@sinclair/typebox/build/esm/value/cast/cast.mjs
class ValueCastError extends TypeBoxError {
  constructor(schema, message) {
    super(message);
    this.schema = schema;
  }
}
function ScoreUnion(schema, references, value) {
  if (schema[Kind] === "Object" && typeof value === "object" && !IsNull(value)) {
    const object2 = schema;
    const keys = Object.getOwnPropertyNames(value);
    const entries = Object.entries(object2.properties);
    const [point, max] = [1 / entries.length, entries.length];
    return entries.reduce((acc, [key, schema2]) => {
      const literal2 = schema2[Kind] === "Literal" && schema2.const === value[key] ? max : 0;
      const checks = Check(schema2, references, value[key]) ? point : 0;
      const exists = keys.includes(key) ? point : 0;
      return acc + (literal2 + checks + exists);
    }, 0);
  } else {
    return Check(schema, references, value) ? 1 : 0;
  }
}
function SelectUnion(union3, references, value) {
  const schemas = union3.anyOf.map((schema) => Deref(schema, references));
  let [select, best] = [schemas[0], 0];
  for (const schema of schemas) {
    const score = ScoreUnion(schema, references, value);
    if (score > best) {
      select = schema;
      best = score;
    }
  }
  return select;
}
function CastUnion(union3, references, value) {
  if ("default" in union3) {
    return typeof value === "function" ? union3.default : Clone2(union3.default);
  } else {
    const schema = SelectUnion(union3, references, value);
    return Cast(schema, references, value);
  }
}
function DefaultClone(schema, references, value) {
  return Check(schema, references, value) ? Clone2(value) : Create2(schema, references);
}
function Default(schema, references, value) {
  return Check(schema, references, value) ? value : Create2(schema, references);
}
function FromArray7(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  const created = IsArray(value) ? Clone2(value) : Create2(schema, references);
  const minimum = IsNumber(schema.minItems) && created.length < schema.minItems ? [...created, ...Array.from({ length: schema.minItems - created.length }, () => null)] : created;
  const maximum = IsNumber(schema.maxItems) && minimum.length > schema.maxItems ? minimum.slice(0, schema.maxItems) : minimum;
  const casted = maximum.map((value2) => Visit8(schema.items, references, value2));
  if (schema.uniqueItems !== true)
    return casted;
  const unique = [...new Set(casted)];
  if (!Check(schema, references, unique))
    throw new ValueCastError(schema, "Array cast produced invalid data due to uniqueItems constraint");
  return unique;
}
function FromConstructor5(schema, references, value) {
  if (Check(schema, references, value))
    return Create2(schema, references);
  const required = new Set(schema.returns.required || []);
  const result = function() {
  };
  for (const [key, property] of Object.entries(schema.returns.properties)) {
    if (!required.has(key) && value.prototype[key] === undefined)
      continue;
    result.prototype[key] = Visit8(property, references, value.prototype[key]);
  }
  return result;
}
function FromIntersect7(schema, references, value) {
  const created = Create2(schema, references);
  const mapped2 = IsStandardObject(created) && IsStandardObject(value) ? { ...created, ...value } : value;
  return Check(schema, references, mapped2) ? mapped2 : Create2(schema, references);
}
function FromNever5(schema, references, value) {
  throw new ValueCastError(schema, "Never types cannot be cast");
}
function FromObject5(schema, references, value) {
  if (Check(schema, references, value))
    return value;
  if (value === null || typeof value !== "object")
    return Create2(schema, references);
  const required = new Set(schema.required || []);
  const result = {};
  for (const [key, property] of Object.entries(schema.properties)) {
    if (!required.has(key) && value[key] === undefined)
      continue;
    result[key] = Visit8(property, references, value[key]);
  }
  if (typeof schema.additionalProperties === "object") {
    const propertyNames = Object.getOwnPropertyNames(schema.properties);
    for (const propertyName of Object.getOwnPropertyNames(value)) {
      if (propertyNames.includes(propertyName))
        continue;
      result[propertyName] = Visit8(schema.additionalProperties, references, value[propertyName]);
    }
  }
  return result;
}
function FromRecord5(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  if (value === null || typeof value !== "object" || Array.isArray(value) || value instanceof Date)
    return Create2(schema, references);
  const subschemaPropertyName = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const subschema = schema.patternProperties[subschemaPropertyName];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value)) {
    result[propKey] = Visit8(subschema, references, propValue);
  }
  return result;
}
function FromRef4(schema, references, value) {
  return Visit8(Deref(schema, references), references, value);
}
function FromThis4(schema, references, value) {
  return Visit8(Deref(schema, references), references, value);
}
function FromTuple7(schema, references, value) {
  if (Check(schema, references, value))
    return Clone2(value);
  if (!IsArray(value))
    return Create2(schema, references);
  if (schema.items === undefined)
    return [];
  return schema.items.map((schema2, index) => Visit8(schema2, references, value[index]));
}
function FromUnion9(schema, references, value) {
  return Check(schema, references, value) ? Clone2(value) : CastUnion(schema, references, value);
}
function Visit8(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray7(schema_, references_, value);
    case "Constructor":
      return FromConstructor5(schema_, references_, value);
    case "Intersect":
      return FromIntersect7(schema_, references_, value);
    case "Never":
      return FromNever5(schema_, references_, value);
    case "Object":
      return FromObject5(schema_, references_, value);
    case "Record":
      return FromRecord5(schema_, references_, value);
    case "Ref":
      return FromRef4(schema_, references_, value);
    case "This":
      return FromThis4(schema_, references_, value);
    case "Tuple":
      return FromTuple7(schema_, references_, value);
    case "Union":
      return FromUnion9(schema_, references_, value);
    case "Date":
    case "Symbol":
    case "Uint8Array":
      return DefaultClone(schema, references, value);
    default:
      return Default(schema_, references_, value);
  }
}
function Cast(...args) {
  return args.length === 3 ? Visit8(args[0], args[1], args[2]) : Visit8(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/clean/clean.mjs
function IsCheckable(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
}
function FromArray8(schema, references, value) {
  if (!IsArray(value))
    return value;
  return value.map((value2) => Visit9(schema.items, references, value2));
}
function FromIntersect8(schema, references, value) {
  const unevaluatedProperties = schema.unevaluatedProperties;
  const intersections = schema.allOf.map((schema2) => Visit9(schema2, references, Clone2(value)));
  const composite = intersections.reduce((acc, value2) => IsObject(value2) ? { ...acc, ...value2 } : value2, {});
  if (!IsObject(value) || !IsObject(composite) || !IsSchema2(unevaluatedProperties))
    return composite;
  const knownkeys = KeyOfPropertyKeys(schema);
  for (const key of Object.getOwnPropertyNames(value)) {
    if (knownkeys.includes(key))
      continue;
    if (Check(unevaluatedProperties, references, value[key])) {
      composite[key] = Visit9(unevaluatedProperties, references, value[key]);
    }
  }
  return composite;
}
function FromObject6(schema, references, value) {
  if (!IsObject(value) || IsArray(value))
    return value;
  const additionalProperties = schema.additionalProperties;
  for (const key of Object.getOwnPropertyNames(value)) {
    if (key in schema.properties) {
      value[key] = Visit9(schema.properties[key], references, value[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value[key])) {
      value[key] = Visit9(additionalProperties, references, value[key]);
      continue;
    }
    delete value[key];
  }
  return value;
}
function FromRecord6(schema, references, value) {
  if (!IsObject(value))
    return value;
  const additionalProperties = schema.additionalProperties;
  const propertyKeys = Object.getOwnPropertyNames(value);
  const [propertyKey, propertySchema] = Object.entries(schema.patternProperties)[0];
  const propertyKeyTest = new RegExp(propertyKey);
  for (const key of propertyKeys) {
    if (propertyKeyTest.test(key)) {
      value[key] = Visit9(propertySchema, references, value[key]);
      continue;
    }
    if (IsSchema2(additionalProperties) && Check(additionalProperties, references, value[key])) {
      value[key] = Visit9(additionalProperties, references, value[key]);
      continue;
    }
    delete value[key];
  }
  return value;
}
function FromRef5(schema, references, value) {
  return Visit9(Deref(schema, references), references, value);
}
function FromThis5(schema, references, value) {
  return Visit9(Deref(schema, references), references, value);
}
function FromTuple8(schema, references, value) {
  if (!IsArray(value))
    return value;
  if (IsUndefined(schema.items))
    return [];
  const length = Math.min(value.length, schema.items.length);
  for (let i = 0;i < length; i++) {
    value[i] = Visit9(schema.items[i], references, value[i]);
  }
  return value.length > length ? value.slice(0, length) : value;
}
function FromUnion10(schema, references, value) {
  for (const inner of schema.anyOf) {
    if (IsCheckable(inner) && Check(inner, references, value)) {
      return Visit9(inner, references, value);
    }
  }
  return value;
}
function Visit9(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray8(schema_, references_, value);
    case "Intersect":
      return FromIntersect8(schema_, references_, value);
    case "Object":
      return FromObject6(schema_, references_, value);
    case "Record":
      return FromRecord6(schema_, references_, value);
    case "Ref":
      return FromRef5(schema_, references_, value);
    case "This":
      return FromThis5(schema_, references_, value);
    case "Tuple":
      return FromTuple8(schema_, references_, value);
    case "Union":
      return FromUnion10(schema_, references_, value);
    default:
      return value;
  }
}
function Clean(...args) {
  return args.length === 3 ? Visit9(args[0], args[1], args[2]) : Visit9(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/convert/convert.mjs
function IsStringNumeric(value) {
  return IsString(value) && !isNaN(value) && !isNaN(parseFloat(value));
}
function IsValueToString(value) {
  return IsBigInt(value) || IsBoolean(value) || IsNumber(value);
}
function IsValueTrue(value) {
  return value === true || IsNumber(value) && value === 1 || IsBigInt(value) && value === BigInt("1") || IsString(value) && (value.toLowerCase() === "true" || value === "1");
}
function IsValueFalse(value) {
  return value === false || IsNumber(value) && (value === 0 || Object.is(value, -0)) || IsBigInt(value) && value === BigInt("0") || IsString(value) && (value.toLowerCase() === "false" || value === "0" || value === "-0");
}
function IsTimeStringWithTimeZone(value) {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
}
function IsTimeStringWithoutTimeZone(value) {
  return IsString(value) && /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
}
function IsDateTimeStringWithTimeZone(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i.test(value);
}
function IsDateTimeStringWithoutTimeZone(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)?$/i.test(value);
}
function IsDateString(value) {
  return IsString(value) && /^\d\d\d\d-[0-1]\d-[0-3]\d$/i.test(value);
}
function TryConvertLiteralString(value, target) {
  const conversion = TryConvertString(value);
  return conversion === target ? conversion : value;
}
function TryConvertLiteralNumber(value, target) {
  const conversion = TryConvertNumber(value);
  return conversion === target ? conversion : value;
}
function TryConvertLiteralBoolean(value, target) {
  const conversion = TryConvertBoolean(value);
  return conversion === target ? conversion : value;
}
function TryConvertLiteral(schema, value) {
  return IsString(schema.const) ? TryConvertLiteralString(value, schema.const) : IsNumber(schema.const) ? TryConvertLiteralNumber(value, schema.const) : IsBoolean(schema.const) ? TryConvertLiteralBoolean(value, schema.const) : Clone2(value);
}
function TryConvertBoolean(value) {
  return IsValueTrue(value) ? true : IsValueFalse(value) ? false : value;
}
function TryConvertBigInt(value) {
  return IsStringNumeric(value) ? BigInt(parseInt(value)) : IsNumber(value) ? BigInt(value | 0) : IsValueFalse(value) ? BigInt(0) : IsValueTrue(value) ? BigInt(1) : value;
}
function TryConvertString(value) {
  return IsValueToString(value) ? value.toString() : IsSymbol(value) && value.description !== undefined ? value.description.toString() : value;
}
function TryConvertNumber(value) {
  return IsStringNumeric(value) ? parseFloat(value) : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
}
function TryConvertInteger(value) {
  return IsStringNumeric(value) ? parseInt(value) : IsNumber(value) ? value | 0 : IsValueTrue(value) ? 1 : IsValueFalse(value) ? 0 : value;
}
function TryConvertNull(value) {
  return IsString(value) && value.toLowerCase() === "null" ? null : value;
}
function TryConvertUndefined(value) {
  return IsString(value) && value === "undefined" ? undefined : value;
}
function TryConvertDate(value) {
  return IsDate(value) ? value : IsNumber(value) ? new Date(value) : IsValueTrue(value) ? new Date(1) : IsValueFalse(value) ? new Date(0) : IsStringNumeric(value) ? new Date(parseInt(value)) : IsTimeStringWithoutTimeZone(value) ? new Date(`1970-01-01T${value}.000Z`) : IsTimeStringWithTimeZone(value) ? new Date(`1970-01-01T${value}`) : IsDateTimeStringWithoutTimeZone(value) ? new Date(`${value}.000Z`) : IsDateTimeStringWithTimeZone(value) ? new Date(value) : IsDateString(value) ? new Date(`${value}T00:00:00.000Z`) : value;
}
function Default2(value) {
  return value;
}
function FromArray9(schema, references, value) {
  const elements = IsArray(value) ? value : [value];
  return elements.map((element) => Visit10(schema.items, references, element));
}
function FromBigInt5(schema, references, value) {
  return TryConvertBigInt(value);
}
function FromBoolean5(schema, references, value) {
  return TryConvertBoolean(value);
}
function FromDate5(schema, references, value) {
  return TryConvertDate(value);
}
function FromInteger5(schema, references, value) {
  return TryConvertInteger(value);
}
function FromIntersect9(schema, references, value) {
  return schema.allOf.reduce((value2, schema2) => Visit10(schema2, references, value2), value);
}
function FromLiteral6(schema, references, value) {
  return TryConvertLiteral(schema, value);
}
function FromNull5(schema, references, value) {
  return TryConvertNull(value);
}
function FromNumber5(schema, references, value) {
  return TryConvertNumber(value);
}
function FromObject7(schema, references, value) {
  const isConvertable = IsObject(value);
  if (!isConvertable)
    return value;
  const result = {};
  for (const key of Object.keys(value)) {
    result[key] = HasPropertyKey(schema.properties, key) ? Visit10(schema.properties[key], references, value[key]) : value[key];
  }
  return result;
}
function FromRecord7(schema, references, value) {
  const propertyKey = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[propertyKey];
  const result = {};
  for (const [propKey, propValue] of Object.entries(value)) {
    result[propKey] = Visit10(property, references, propValue);
  }
  return result;
}
function FromRef6(schema, references, value) {
  return Visit10(Deref(schema, references), references, value);
}
function FromString5(schema, references, value) {
  return TryConvertString(value);
}
function FromSymbol5(schema, references, value) {
  return IsString(value) || IsNumber(value) ? Symbol(value) : value;
}
function FromThis6(schema, references, value) {
  return Visit10(Deref(schema, references), references, value);
}
function FromTuple9(schema, references, value) {
  const isConvertable = IsArray(value) && !IsUndefined(schema.items);
  if (!isConvertable)
    return value;
  return value.map((value2, index) => {
    return index < schema.items.length ? Visit10(schema.items[index], references, value2) : value2;
  });
}
function FromUndefined5(schema, references, value) {
  return TryConvertUndefined(value);
}
function FromUnion11(schema, references, value) {
  for (const subschema of schema.anyOf) {
    const converted = Visit10(subschema, references, value);
    if (!Check(subschema, references, converted))
      continue;
    return converted;
  }
  return value;
}
function Visit10(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray9(schema_, references_, value);
    case "BigInt":
      return FromBigInt5(schema_, references_, value);
    case "Boolean":
      return FromBoolean5(schema_, references_, value);
    case "Date":
      return FromDate5(schema_, references_, value);
    case "Integer":
      return FromInteger5(schema_, references_, value);
    case "Intersect":
      return FromIntersect9(schema_, references_, value);
    case "Literal":
      return FromLiteral6(schema_, references_, value);
    case "Null":
      return FromNull5(schema_, references_, value);
    case "Number":
      return FromNumber5(schema_, references_, value);
    case "Object":
      return FromObject7(schema_, references_, value);
    case "Record":
      return FromRecord7(schema_, references_, value);
    case "Ref":
      return FromRef6(schema_, references_, value);
    case "String":
      return FromString5(schema_, references_, value);
    case "Symbol":
      return FromSymbol5(schema_, references_, value);
    case "This":
      return FromThis6(schema_, references_, value);
    case "Tuple":
      return FromTuple9(schema_, references_, value);
    case "Undefined":
      return FromUndefined5(schema_, references_, value);
    case "Union":
      return FromUnion11(schema_, references_, value);
    default:
      return Default2(value);
  }
}
function Convert(...args) {
  return args.length === 3 ? Visit10(args[0], args[1], args[2]) : Visit10(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/default/default.mjs
function ValueOrDefault(schema, value) {
  return value === undefined && "default" in schema ? Clone2(schema.default) : value;
}
function IsCheckable2(schema) {
  return IsSchema2(schema) && schema[Kind] !== "Unsafe";
}
function IsDefaultSchema(value) {
  return IsSchema2(value) && "default" in value;
}
function FromArray10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsArray(defaulted))
    return defaulted;
  for (let i = 0;i < defaulted.length; i++) {
    defaulted[i] = Visit11(schema.items, references, defaulted[i]);
  }
  return defaulted;
}
function FromIntersect10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  return schema.allOf.reduce((acc, schema2) => {
    const next = Visit11(schema2, references, defaulted);
    return IsObject(next) ? { ...acc, ...next } : next;
  }, {});
}
function FromObject8(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const knownPropertyKeys = Object.getOwnPropertyNames(schema.properties);
  for (const key of knownPropertyKeys) {
    if (!IsDefaultSchema(schema.properties[key]))
      continue;
    defaulted[key] = Visit11(schema.properties[key], references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKeys.includes(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
}
function FromRecord8(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsObject(defaulted))
    return defaulted;
  const additionalPropertiesSchema = schema.additionalProperties;
  const [propertyKeyPattern, propertySchema] = Object.entries(schema.patternProperties)[0];
  const knownPropertyKey = new RegExp(propertyKeyPattern);
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (!(knownPropertyKey.test(key) && IsDefaultSchema(propertySchema)))
      continue;
    defaulted[key] = Visit11(propertySchema, references, defaulted[key]);
  }
  if (!IsDefaultSchema(additionalPropertiesSchema))
    return defaulted;
  for (const key of Object.getOwnPropertyNames(defaulted)) {
    if (knownPropertyKey.test(key))
      continue;
    defaulted[key] = Visit11(additionalPropertiesSchema, references, defaulted[key]);
  }
  return defaulted;
}
function FromRef7(schema, references, value) {
  return Visit11(Deref(schema, references), references, ValueOrDefault(schema, value));
}
function FromThis7(schema, references, value) {
  return Visit11(Deref(schema, references), references, value);
}
function FromTuple10(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  if (!IsArray(defaulted) || IsUndefined(schema.items))
    return defaulted;
  const [items, max] = [schema.items, Math.max(schema.items.length, defaulted.length)];
  for (let i = 0;i < max; i++) {
    if (i < items.length)
      defaulted[i] = Visit11(items[i], references, defaulted[i]);
  }
  return defaulted;
}
function FromUnion12(schema, references, value) {
  const defaulted = ValueOrDefault(schema, value);
  for (const inner of schema.anyOf) {
    const result = Visit11(inner, references, defaulted);
    if (IsCheckable2(inner) && Check(inner, result)) {
      return result;
    }
  }
  return defaulted;
}
function Visit11(schema, references, value) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema_[Kind]) {
    case "Array":
      return FromArray10(schema_, references_, value);
    case "Intersect":
      return FromIntersect10(schema_, references_, value);
    case "Object":
      return FromObject8(schema_, references_, value);
    case "Record":
      return FromRecord8(schema_, references_, value);
    case "Ref":
      return FromRef7(schema_, references_, value);
    case "This":
      return FromThis7(schema_, references_, value);
    case "Tuple":
      return FromTuple10(schema_, references_, value);
    case "Union":
      return FromUnion12(schema_, references_, value);
    default:
      return ValueOrDefault(schema_, value);
  }
}
function Default3(...args) {
  return args.length === 3 ? Visit11(args[0], args[1], args[2]) : Visit11(args[0], [], args[1]);
}
// node_modules/@sinclair/typebox/build/esm/value/pointer/pointer.mjs
var exports_pointer = {};
__export(exports_pointer, {
  ValuePointerRootSetError: () => ValuePointerRootSetError,
  ValuePointerRootDeleteError: () => ValuePointerRootDeleteError,
  Set: () => Set4,
  Has: () => Has3,
  Get: () => Get3,
  Format: () => Format,
  Delete: () => Delete3
});
class ValuePointerRootSetError extends TypeBoxError {
  constructor(value, path, update) {
    super("Cannot set root value");
    this.value = value;
    this.path = path;
    this.update = update;
  }
}

class ValuePointerRootDeleteError extends TypeBoxError {
  constructor(value, path) {
    super("Cannot delete root value");
    this.value = value;
    this.path = path;
  }
}
function Escape2(component) {
  return component.indexOf("~") === -1 ? component : component.replace(/~1/g, "/").replace(/~0/g, "~");
}
function* Format(pointer) {
  if (pointer === "")
    return;
  let [start, end] = [0, 0];
  for (let i = 0;i < pointer.length; i++) {
    const char = pointer.charAt(i);
    if (char === "/") {
      if (i === 0) {
        start = i + 1;
      } else {
        end = i;
        yield Escape2(pointer.slice(start, end));
        start = i + 1;
      }
    } else {
      end = i;
    }
  }
  yield Escape2(pointer.slice(start));
}
function Set4(value, pointer, update) {
  if (pointer === "")
    throw new ValuePointerRootSetError(value, pointer, update);
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      next[component] = {};
    owner = next;
    next = next[component];
    key = component;
  }
  owner[key] = update;
}
function Delete3(value, pointer) {
  if (pointer === "")
    throw new ValuePointerRootDeleteError(value, pointer);
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined || next[component] === null)
      return;
    owner = next;
    next = next[component];
    key = component;
  }
  if (Array.isArray(owner)) {
    const index = parseInt(key);
    owner.splice(index, 1);
  } else {
    delete owner[key];
  }
}
function Has3(value, pointer) {
  if (pointer === "")
    return true;
  let [owner, next, key] = [null, value, ""];
  for (const component of Format(pointer)) {
    if (next[component] === undefined)
      return false;
    owner = next;
    next = next[component];
    key = component;
  }
  return Object.getOwnPropertyNames(owner).includes(key);
}
function Get3(value, pointer) {
  if (pointer === "")
    return value;
  let current = value;
  for (const component of Format(pointer)) {
    if (current[component] === undefined)
      return;
    current = current[component];
  }
  return current;
}
// node_modules/@sinclair/typebox/build/esm/value/delta/delta.mjs
var Insert = Object2({
  type: Literal("insert"),
  path: String2(),
  value: Unknown()
});
var Update = Object2({
  type: Literal("update"),
  path: String2(),
  value: Unknown()
});
var Delete4 = Object2({
  type: Literal("delete"),
  path: String2()
});
var Edit = Union([Insert, Update, Delete4]);

class ValueDeltaError extends TypeBoxError {
  constructor(value, message) {
    super(message);
    this.value = value;
  }
}

class ValueDeltaSymbolError extends ValueDeltaError {
  constructor(value) {
    super(value, "Cannot diff objects with symbol keys");
    this.value = value;
  }
}
function CreateUpdate(path, value) {
  return { type: "update", path, value };
}
function CreateInsert(path, value) {
  return { type: "insert", path, value };
}
function CreateDelete(path) {
  return { type: "delete", path };
}
function* ObjectType4(path, current, next) {
  if (!IsStandardObject(next))
    return yield CreateUpdate(path, next);
  const currentKeys = [...globalThis.Object.keys(current), ...globalThis.Object.getOwnPropertySymbols(current)];
  const nextKeys = [...globalThis.Object.keys(next), ...globalThis.Object.getOwnPropertySymbols(next)];
  for (const key of currentKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && nextKeys.includes(key))
      yield CreateUpdate(`${path}/${globalThis.String(key)}`, undefined);
  }
  for (const key of nextKeys) {
    if (IsUndefined(current[key]) || IsUndefined(next[key]))
      continue;
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    yield* Visit12(`${path}/${globalThis.String(key)}`, current[key], next[key]);
  }
  for (const key of nextKeys) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(current[key]))
      yield CreateInsert(`${path}/${globalThis.String(key)}`, next[key]);
  }
  for (const key of currentKeys.reverse()) {
    if (IsSymbol(key))
      throw new ValueDeltaSymbolError(key);
    if (IsUndefined(next[key]) && !nextKeys.includes(key))
      yield CreateDelete(`${path}/${globalThis.String(key)}`);
  }
}
function* ArrayType4(path, current, next) {
  if (!IsArray(next))
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
  for (let i = 0;i < next.length; i++) {
    if (i < current.length)
      continue;
    yield CreateInsert(`${path}/${i}`, next[i]);
  }
  for (let i = current.length - 1;i >= 0; i--) {
    if (i < next.length)
      continue;
    yield CreateDelete(`${path}/${i}`);
  }
}
function* TypedArrayType2(path, current, next) {
  if (!IsTypedArray(next) || current.length !== next.length || globalThis.Object.getPrototypeOf(current).constructor.name !== globalThis.Object.getPrototypeOf(next).constructor.name)
    return yield CreateUpdate(path, next);
  for (let i = 0;i < Math.min(current.length, next.length); i++) {
    yield* Visit12(`${path}/${i}`, current[i], next[i]);
  }
}
function* ValueType2(path, current, next) {
  if (current === next)
    return;
  yield CreateUpdate(path, next);
}
function* Visit12(path, current, next) {
  if (IsStandardObject(current))
    return yield* ObjectType4(path, current, next);
  if (IsArray(current))
    return yield* ArrayType4(path, current, next);
  if (IsTypedArray(current))
    return yield* TypedArrayType2(path, current, next);
  if (IsValueType(current))
    return yield* ValueType2(path, current, next);
  throw new ValueDeltaError(current, "Unable to create diff edits for unknown value");
}
function Diff(current, next) {
  return [...Visit12("", current, next)];
}
function IsRootUpdate(edits) {
  return edits.length > 0 && edits[0].path === "" && edits[0].type === "update";
}
function IsIdentity(edits) {
  return edits.length === 0;
}
function Patch(current, edits) {
  if (IsRootUpdate(edits)) {
    return Clone2(edits[0].value);
  }
  if (IsIdentity(edits)) {
    return Clone2(current);
  }
  const clone2 = Clone2(current);
  for (const edit of edits) {
    switch (edit.type) {
      case "insert": {
        exports_pointer.Set(clone2, edit.path, edit.value);
        break;
      }
      case "update": {
        exports_pointer.Set(clone2, edit.path, edit.value);
        break;
      }
      case "delete": {
        exports_pointer.Delete(clone2, edit.path);
        break;
      }
    }
  }
  return clone2;
}
// node_modules/@sinclair/typebox/build/esm/value/equal/equal.mjs
function ObjectType5(left, right) {
  if (!IsStandardObject(right))
    return false;
  const leftKeys = [...Object.keys(left), ...Object.getOwnPropertySymbols(left)];
  const rightKeys = [...Object.keys(right), ...Object.getOwnPropertySymbols(right)];
  if (leftKeys.length !== rightKeys.length)
    return false;
  return leftKeys.every((key) => Equal(left[key], right[key]));
}
function DateType4(left, right) {
  return IsDate(right) && left.getTime() === right.getTime();
}
function ArrayType5(left, right) {
  if (!IsArray(right) || left.length !== right.length)
    return false;
  return left.every((value, index) => Equal(value, right[index]));
}
function TypedArrayType3(left, right) {
  if (!IsTypedArray(right) || left.length !== right.length || Object.getPrototypeOf(left).constructor.name !== Object.getPrototypeOf(right).constructor.name)
    return false;
  return left.every((value, index) => Equal(value, right[index]));
}
function ValueType3(left, right) {
  return left === right;
}
function Equal(left, right) {
  if (IsStandardObject(left))
    return ObjectType5(left, right);
  if (IsDate(left))
    return DateType4(left, right);
  if (IsTypedArray(left))
    return TypedArrayType3(left, right);
  if (IsArray(left))
    return ArrayType5(left, right);
  if (IsValueType(left))
    return ValueType3(left, right);
  throw new Error("ValueEquals: Unable to compare value");
}
// node_modules/@sinclair/typebox/build/esm/value/mutate/mutate.mjs
class ValueMutateError extends TypeBoxError {
  constructor(message) {
    super(message);
  }
}
function ObjectType6(root, path, current, next) {
  if (!IsStandardObject(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    const currentKeys = Object.getOwnPropertyNames(current);
    const nextKeys = Object.getOwnPropertyNames(next);
    for (const currentKey of currentKeys) {
      if (!nextKeys.includes(currentKey)) {
        delete current[currentKey];
      }
    }
    for (const nextKey of nextKeys) {
      if (!currentKeys.includes(nextKey)) {
        current[nextKey] = null;
      }
    }
    for (const nextKey of nextKeys) {
      Visit13(root, `${path}/${nextKey}`, current[nextKey], next[nextKey]);
    }
  }
}
function ArrayType6(root, path, current, next) {
  if (!IsArray(current)) {
    exports_pointer.Set(root, path, Clone2(next));
  } else {
    for (let index = 0;index < next.length; index++) {
      Visit13(root, `${path}/${index}`, current[index], next[index]);
    }
    current.splice(next.length);
  }
}
function TypedArrayType4(root, path, current, next) {
  if (IsTypedArray(current) && current.length === next.length) {
    for (let i = 0;i < current.length; i++) {
      current[i] = next[i];
    }
  } else {
    exports_pointer.Set(root, path, Clone2(next));
  }
}
function ValueType4(root, path, current, next) {
  if (current === next)
    return;
  exports_pointer.Set(root, path, next);
}
function Visit13(root, path, current, next) {
  if (IsArray(next))
    return ArrayType6(root, path, current, next);
  if (IsTypedArray(next))
    return TypedArrayType4(root, path, current, next);
  if (IsStandardObject(next))
    return ObjectType6(root, path, current, next);
  if (IsValueType(next))
    return ValueType4(root, path, current, next);
}
function IsNonMutableValue(value) {
  return IsTypedArray(value) || IsValueType(value);
}
function IsMismatchedValue(current, next) {
  return IsStandardObject(current) && IsArray(next) || IsArray(current) && IsStandardObject(next);
}
function Mutate(current, next) {
  if (IsNonMutableValue(current) || IsNonMutableValue(next))
    throw new ValueMutateError("Only object and array types can be mutated at the root level");
  if (IsMismatchedValue(current, next))
    throw new ValueMutateError("Cannot assign due type mismatch of assignable values");
  Visit13(current, "", current, next);
}
// node_modules/@sinclair/typebox/build/esm/value/transform/decode.mjs
class TransformDecodeCheckError extends TypeBoxError {
  constructor(schema, value, error2) {
    super(`Unable to decode value as it does not match the expected schema`);
    this.schema = schema;
    this.value = value;
    this.error = error2;
  }
}

class TransformDecodeError extends TypeBoxError {
  constructor(schema, path, value, error2) {
    super(error2 instanceof Error ? error2.message : "Unknown error");
    this.schema = schema;
    this.path = path;
    this.value = value;
    this.error = error2;
  }
}
function Default4(schema, path, value) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Decode(value) : value;
  } catch (error2) {
    throw new TransformDecodeError(schema, path, value, error2);
  }
}
function FromArray11(schema, references, path, value) {
  return IsArray(value) ? Default4(schema, path, value.map((value2, index) => Visit14(schema.items, references, `${path}/${index}`, value2))) : Default4(schema, path, value);
}
function FromIntersect11(schema, references, path, value) {
  if (!IsStandardObject(value) || IsValueType(value))
    return Default4(schema, path, value);
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...value };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit14(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(unevaluatedProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
}
function FromNot5(schema, references, path, value) {
  return Default4(schema, path, Visit14(schema.not, references, path, value));
}
function FromObject9(schema, references, path, value) {
  if (!IsStandardObject(value))
    return Default4(schema, path, value);
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...value };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit14(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
}
function FromRecord9(schema, references, path, value) {
  if (!IsStandardObject(value))
    return Default4(schema, path, value);
  const pattern2 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern2);
  const knownProperties = { ...value };
  for (const key of Object.getOwnPropertyNames(value))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit14(schema.patternProperties[pattern2], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default4(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const unknownProperties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      unknownProperties[key] = Default4(additionalProperties, `${path}/${key}`, unknownProperties[key]);
    }
  return Default4(schema, path, unknownProperties);
}
function FromRef8(schema, references, path, value) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value));
}
function FromThis8(schema, references, path, value) {
  const target = Deref(schema, references);
  return Default4(schema, path, Visit14(target, references, path, value));
}
function FromTuple11(schema, references, path, value) {
  return IsArray(value) && IsArray(schema.items) ? Default4(schema, path, schema.items.map((schema2, index) => Visit14(schema2, references, `${path}/${index}`, value[index]))) : Default4(schema, path, value);
}
function FromUnion13(schema, references, path, value) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value))
      continue;
    const decoded = Visit14(subschema, references, path, value);
    return Default4(schema, path, decoded);
  }
  return Default4(schema, path, value);
}
function Visit14(schema, references, path, value) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray11(schema_, references_, path, value);
    case "Intersect":
      return FromIntersect11(schema_, references_, path, value);
    case "Not":
      return FromNot5(schema_, references_, path, value);
    case "Object":
      return FromObject9(schema_, references_, path, value);
    case "Record":
      return FromRecord9(schema_, references_, path, value);
    case "Ref":
      return FromRef8(schema_, references_, path, value);
    case "Symbol":
      return Default4(schema_, path, value);
    case "This":
      return FromThis8(schema_, references_, path, value);
    case "Tuple":
      return FromTuple11(schema_, references_, path, value);
    case "Union":
      return FromUnion13(schema_, references_, path, value);
    default:
      return Default4(schema_, path, value);
  }
}
function TransformDecode(schema, references, value) {
  return Visit14(schema, references, "", value);
}
// node_modules/@sinclair/typebox/build/esm/value/transform/encode.mjs
class TransformEncodeCheckError extends TypeBoxError {
  constructor(schema, value, error2) {
    super(`The encoded value does not match the expected schema`);
    this.schema = schema;
    this.value = value;
    this.error = error2;
  }
}

class TransformEncodeError extends TypeBoxError {
  constructor(schema, path, value, error2) {
    super(`${error2 instanceof Error ? error2.message : "Unknown error"}`);
    this.schema = schema;
    this.path = path;
    this.value = value;
    this.error = error2;
  }
}
function Default5(schema, path, value) {
  try {
    return IsTransform2(schema) ? schema[TransformKind].Encode(value) : value;
  } catch (error2) {
    throw new TransformEncodeError(schema, path, value, error2);
  }
}
function FromArray12(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  return IsArray(defaulted) ? defaulted.map((value2, index) => Visit15(schema.items, references, `${path}/${index}`, value2)) : defaulted;
}
function FromIntersect12(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  if (!IsStandardObject(value) || IsValueType(value))
    return defaulted;
  const knownEntries = KeyOfPropertyEntries(schema);
  const knownKeys = knownEntries.map((entry) => entry[0]);
  const knownProperties = { ...defaulted };
  for (const [knownKey, knownSchema] of knownEntries)
    if (knownKey in knownProperties) {
      knownProperties[knownKey] = Visit15(knownSchema, references, `${path}/${knownKey}`, knownProperties[knownKey]);
    }
  if (!IsTransform2(schema.unevaluatedProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const unevaluatedProperties = schema.unevaluatedProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(unevaluatedProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
}
function FromNot6(schema, references, path, value) {
  return Default5(schema.not, path, Default5(schema, path, value));
}
function FromObject10(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  if (!IsStandardObject(defaulted))
    return defaulted;
  const knownKeys = KeyOfPropertyKeys(schema);
  const knownProperties = { ...defaulted };
  for (const key of knownKeys)
    if (key in knownProperties) {
      knownProperties[key] = Visit15(schema.properties[key], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return knownProperties;
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.includes(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
}
function FromRecord10(schema, references, path, value) {
  const defaulted = Default5(schema, path, value);
  if (!IsStandardObject(value))
    return defaulted;
  const pattern2 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const knownKeys = new RegExp(pattern2);
  const knownProperties = { ...defaulted };
  for (const key of Object.getOwnPropertyNames(value))
    if (knownKeys.test(key)) {
      knownProperties[key] = Visit15(schema.patternProperties[pattern2], references, `${path}/${key}`, knownProperties[key]);
    }
  if (!IsSchema2(schema.additionalProperties)) {
    return Default5(schema, path, knownProperties);
  }
  const unknownKeys = Object.getOwnPropertyNames(knownProperties);
  const additionalProperties = schema.additionalProperties;
  const properties = { ...knownProperties };
  for (const key of unknownKeys)
    if (!knownKeys.test(key)) {
      properties[key] = Default5(additionalProperties, `${path}/${key}`, properties[key]);
    }
  return properties;
}
function FromRef9(schema, references, path, value) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value);
  return Default5(schema, path, resolved);
}
function FromThis9(schema, references, path, value) {
  const target = Deref(schema, references);
  const resolved = Visit15(target, references, path, value);
  return Default5(schema, path, resolved);
}
function FromTuple12(schema, references, path, value) {
  const value1 = Default5(schema, path, value);
  return IsArray(schema.items) ? schema.items.map((schema2, index) => Visit15(schema2, references, `${path}/${index}`, value1[index])) : [];
}
function FromUnion14(schema, references, path, value) {
  for (const subschema of schema.anyOf) {
    if (!Check(subschema, references, value))
      continue;
    const value1 = Visit15(subschema, references, path, value);
    return Default5(schema, path, value1);
  }
  for (const subschema of schema.anyOf) {
    const value1 = Visit15(subschema, references, path, value);
    if (!Check(schema, references, value1))
      continue;
    return Default5(schema, path, value1);
  }
  return Default5(schema, path, value);
}
function Visit15(schema, references, path, value) {
  const references_ = typeof schema.$id === "string" ? [...references, schema] : references;
  const schema_ = schema;
  switch (schema[Kind]) {
    case "Array":
      return FromArray12(schema_, references_, path, value);
    case "Intersect":
      return FromIntersect12(schema_, references_, path, value);
    case "Not":
      return FromNot6(schema_, references_, path, value);
    case "Object":
      return FromObject10(schema_, references_, path, value);
    case "Record":
      return FromRecord10(schema_, references_, path, value);
    case "Ref":
      return FromRef9(schema_, references_, path, value);
    case "This":
      return FromThis9(schema_, references_, path, value);
    case "Tuple":
      return FromTuple12(schema_, references_, path, value);
    case "Union":
      return FromUnion14(schema_, references_, path, value);
    default:
      return Default5(schema_, path, value);
  }
}
function TransformEncode(schema, references, value) {
  return Visit15(schema, references, "", value);
}
// node_modules/@sinclair/typebox/build/esm/value/transform/has.mjs
function FromArray13(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromAsyncIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromConstructor6(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
}
function FromFunction5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.returns, references) || schema.parameters.some((schema2) => Visit16(schema2, references));
}
function FromIntersect13(schema, references) {
  return IsTransform2(schema) || IsTransform2(schema.unevaluatedProperties) || schema.allOf.some((schema2) => Visit16(schema2, references));
}
function FromIterator5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.items, references);
}
function FromNot7(schema, references) {
  return IsTransform2(schema) || Visit16(schema.not, references);
}
function FromObject11(schema, references) {
  return IsTransform2(schema) || Object.values(schema.properties).some((schema2) => Visit16(schema2, references)) || IsSchema2(schema.additionalProperties) && Visit16(schema.additionalProperties, references);
}
function FromPromise5(schema, references) {
  return IsTransform2(schema) || Visit16(schema.item, references);
}
function FromRecord11(schema, references) {
  const pattern2 = Object.getOwnPropertyNames(schema.patternProperties)[0];
  const property = schema.patternProperties[pattern2];
  return IsTransform2(schema) || Visit16(property, references) || IsSchema2(schema.additionalProperties) && IsTransform2(schema.additionalProperties);
}
function FromRef10(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
}
function FromThis10(schema, references) {
  if (IsTransform2(schema))
    return true;
  return Visit16(Deref(schema, references), references);
}
function FromTuple13(schema, references) {
  return IsTransform2(schema) || !IsUndefined(schema.items) && schema.items.some((schema2) => Visit16(schema2, references));
}
function FromUnion15(schema, references) {
  return IsTransform2(schema) || schema.anyOf.some((schema2) => Visit16(schema2, references));
}
function Visit16(schema, references) {
  const references_ = IsString(schema.$id) ? [...references, schema] : references;
  const schema_ = schema;
  if (schema.$id && visited.has(schema.$id))
    return false;
  if (schema.$id)
    visited.add(schema.$id);
  switch (schema[Kind]) {
    case "Array":
      return FromArray13(schema_, references_);
    case "AsyncIterator":
      return FromAsyncIterator5(schema_, references_);
    case "Constructor":
      return FromConstructor6(schema_, references_);
    case "Function":
      return FromFunction5(schema_, references_);
    case "Intersect":
      return FromIntersect13(schema_, references_);
    case "Iterator":
      return FromIterator5(schema_, references_);
    case "Not":
      return FromNot7(schema_, references_);
    case "Object":
      return FromObject11(schema_, references_);
    case "Promise":
      return FromPromise5(schema_, references_);
    case "Record":
      return FromRecord11(schema_, references_);
    case "Ref":
      return FromRef10(schema_, references_);
    case "This":
      return FromThis10(schema_, references_);
    case "Tuple":
      return FromTuple13(schema_, references_);
    case "Union":
      return FromUnion15(schema_, references_);
    default:
      return IsTransform2(schema);
  }
}
var visited = new Set;
function HasTransform(schema, references) {
  visited.clear();
  return Visit16(schema, references);
}
// node_modules/@sinclair/typebox/build/esm/value/value/value.mjs
var exports_value2 = {};
__export(exports_value2, {
  Patch: () => Patch2,
  Mutate: () => Mutate2,
  Hash: () => Hash2,
  Errors: () => Errors2,
  Equal: () => Equal2,
  Encode: () => Encode,
  Diff: () => Diff2,
  Default: () => Default6,
  Decode: () => Decode,
  Create: () => Create3,
  Convert: () => Convert2,
  Clone: () => Clone3,
  Clean: () => Clean2,
  Check: () => Check2,
  Cast: () => Cast2
});
function Cast2(...args) {
  return Cast.apply(Cast, args);
}
function Create3(...args) {
  return Create2.apply(Create2, args);
}
function Check2(...args) {
  return Check.apply(Check, args);
}
function Clean2(...args) {
  return Clean.apply(Clean, args);
}
function Convert2(...args) {
  return Convert.apply(Convert, args);
}
function Clone3(value) {
  return Clone2(value);
}
function Decode(...args) {
  const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  if (!Check2(schema, references, value))
    throw new TransformDecodeCheckError(schema, value, Errors2(schema, references, value).First());
  return HasTransform(schema, references) ? TransformDecode(schema, references, value) : value;
}
function Default6(...args) {
  return Default3.apply(Default3, args);
}
function Encode(...args) {
  const [schema, references, value] = args.length === 3 ? [args[0], args[1], args[2]] : [args[0], [], args[1]];
  const encoded = HasTransform(schema, references) ? TransformEncode(schema, references, value) : value;
  if (!Check2(schema, references, encoded))
    throw new TransformEncodeCheckError(schema, encoded, Errors2(schema, references, encoded).First());
  return encoded;
}
function Errors2(...args) {
  return Errors.apply(Errors, args);
}
function Equal2(left, right) {
  return Equal(left, right);
}
function Diff2(current, next) {
  return Diff(current, next);
}
function Hash2(value) {
  return Hash(value);
}
function Patch2(current, edits) {
  return Patch(current, edits);
}
function Mutate2(current, next) {
  Mutate(current, next);
}
// node_modules/@sinclair/typebox/build/esm/type/awaited/awaited.mjs
function FromRest4(T) {
  return T.map((L) => AwaitedResolve(L));
}
function FromIntersect14(T) {
  return Intersect(FromRest4(T));
}
function FromUnion16(T) {
  return Union(FromRest4(T));
}
function FromPromise6(T) {
  return AwaitedResolve(T);
}
function AwaitedResolve(T) {
  return IsIntersect(T) ? FromIntersect14(T.allOf) : IsUnion(T) ? FromUnion16(T.anyOf) : IsPromise2(T) ? FromPromise6(T.item) : T;
}
function Awaited(T, options = {}) {
  return CloneType(AwaitedResolve(T), options);
}
// node_modules/@sinclair/typebox/build/esm/type/composite/composite.mjs
function CompositeKeys(T) {
  const Acc = [];
  for (const L of T)
    Acc.push(...KeyOfPropertyKeys(L));
  return SetDistinct(Acc);
}
function FilterNever(T) {
  return T.filter((L) => !IsNever(L));
}
function CompositeProperty(T, K) {
  const Acc = [];
  for (const L of T)
    Acc.push(...IndexFromPropertyKeys(L, [K]));
  return FilterNever(Acc);
}
function CompositeProperties(T, K) {
  const Acc = {};
  for (const L of K) {
    Acc[L] = IntersectEvaluated(CompositeProperty(T, L));
  }
  return Acc;
}
function Composite(T, options = {}) {
  const K = CompositeKeys(T);
  const P = CompositeProperties(T, K);
  const R = Object2(P, options);
  return R;
}
// node_modules/@sinclair/typebox/build/esm/type/date/date.mjs
function Date2(options = {}) {
  return {
    ...options,
    [Kind]: "Date",
    type: "Date"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/null/null.mjs
function Null(options = {}) {
  return {
    ...options,
    [Kind]: "Null",
    type: "null"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/symbol/symbol.mjs
function Symbol2(options) {
  return { ...options, [Kind]: "Symbol", type: "symbol" };
}
// node_modules/@sinclair/typebox/build/esm/type/undefined/undefined.mjs
function Undefined(options = {}) {
  return { ...options, [Kind]: "Undefined", type: "undefined" };
}
// node_modules/@sinclair/typebox/build/esm/type/uint8array/uint8array.mjs
function Uint8Array2(options = {}) {
  return { ...options, [Kind]: "Uint8Array", type: "Uint8Array" };
}
// node_modules/@sinclair/typebox/build/esm/type/const/const.mjs
function FromArray14(T) {
  return T.map((L) => FromValue(L, false));
}
function FromProperties8(value2) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(value2))
    Acc[K] = Readonly(FromValue(value2[K], false));
  return Acc;
}
function ConditionalReadonly(T, root) {
  return root === true ? T : Readonly(T);
}
function FromValue(value2, root) {
  return IsAsyncIterator2(value2) ? ConditionalReadonly(Any(), root) : IsIterator2(value2) ? ConditionalReadonly(Any(), root) : IsArray2(value2) ? Readonly(Tuple(FromArray14(value2))) : IsUint8Array2(value2) ? Uint8Array2() : IsDate2(value2) ? Date2() : IsObject2(value2) ? ConditionalReadonly(Object2(FromProperties8(value2)), root) : IsFunction2(value2) ? ConditionalReadonly(Function2([], Unknown()), root) : IsUndefined2(value2) ? Undefined() : IsNull2(value2) ? Null() : IsSymbol2(value2) ? Symbol2() : IsBigInt2(value2) ? BigInt2() : IsNumber2(value2) ? Literal(value2) : IsBoolean2(value2) ? Literal(value2) : IsString2(value2) ? Literal(value2) : Object2({});
}
function Const(T, options = {}) {
  return CloneType(FromValue(T, true), options);
}
// node_modules/@sinclair/typebox/build/esm/type/constructor-parameters/constructor-parameters.mjs
function ConstructorParameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/deref/deref.mjs
function FromRest5(schema, references) {
  return schema.map((schema2) => Deref2(schema2, references));
}
function FromProperties9(properties, references) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(properties)) {
    Acc[K] = Deref2(properties[K], references);
  }
  return Acc;
}
function FromConstructor7(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
function FromFunction6(schema, references) {
  schema.parameters = FromRest5(schema.parameters, references);
  schema.returns = Deref2(schema.returns, references);
  return schema;
}
function FromIntersect15(schema, references) {
  schema.allOf = FromRest5(schema.allOf, references);
  return schema;
}
function FromUnion17(schema, references) {
  schema.anyOf = FromRest5(schema.anyOf, references);
  return schema;
}
function FromTuple14(schema, references) {
  if (IsUndefined2(schema.items))
    return schema;
  schema.items = FromRest5(schema.items, references);
  return schema;
}
function FromArray15(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromObject12(schema, references) {
  schema.properties = FromProperties9(schema.properties, references);
  return schema;
}
function FromPromise7(schema, references) {
  schema.item = Deref2(schema.item, references);
  return schema;
}
function FromAsyncIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromIterator6(schema, references) {
  schema.items = Deref2(schema.items, references);
  return schema;
}
function FromRef11(schema, references) {
  const target = references.find((remote) => remote.$id === schema.$ref);
  if (target === undefined)
    throw Error(`Unable to dereference schema with $id ${schema.$ref}`);
  const discard2 = Discard(target, ["$id"]);
  return Deref2(discard2, references);
}
function DerefResolve(schema, references) {
  return IsConstructor(schema) ? FromConstructor7(schema, references) : IsFunction3(schema) ? FromFunction6(schema, references) : IsIntersect(schema) ? FromIntersect15(schema, references) : IsUnion(schema) ? FromUnion17(schema, references) : IsTuple(schema) ? FromTuple14(schema, references) : IsArray3(schema) ? FromArray15(schema, references) : IsObject3(schema) ? FromObject12(schema, references) : IsPromise2(schema) ? FromPromise7(schema, references) : IsAsyncIterator3(schema) ? FromAsyncIterator6(schema, references) : IsIterator3(schema) ? FromIterator6(schema, references) : IsRef(schema) ? FromRef11(schema, references) : schema;
}
function Deref2(schema, references) {
  return DerefResolve(CloneType(schema), CloneRest(references));
}
// node_modules/@sinclair/typebox/build/esm/type/enum/enum.mjs
function Enum(item, options = {}) {
  if (IsUndefined2(item))
    throw new Error("Enum undefined or empty");
  const values1 = globalThis.Object.getOwnPropertyNames(item).filter((key) => isNaN(key)).map((key) => item[key]);
  const values2 = [...new Set(values1)];
  const anyOf = values2.map((value2) => Literal(value2));
  return Union(anyOf, { ...options, [Hint]: "Enum" });
}
// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-template-literal.mjs
function ExcludeFromTemplateLiteral(L, R) {
  return Exclude(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude.mjs
function ExcludeRest(L, R) {
  const excluded = L.filter((inner) => ExtendsCheck(inner, R) === ExtendsResult.False);
  return excluded.length === 1 ? excluded[0] : Union(excluded);
}
function Exclude(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExcludeFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExcludeFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExcludeRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? Never() : L, options);
}

// node_modules/@sinclair/typebox/build/esm/type/exclude/exclude-from-mapped-result.mjs
function FromProperties10(P, U) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Exclude(P[K2], U);
  return Acc;
}
function FromMappedResult7(R, T) {
  return FromProperties10(R.properties, T);
}
function ExcludeFromMappedResult(R, T) {
  const P = FromMappedResult7(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-template-literal.mjs
function ExtractFromTemplateLiteral(L, R) {
  return Extract(TemplateLiteralToUnion(L), R);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract.mjs
function ExtractRest(L, R) {
  const extracted = L.filter((inner) => ExtendsCheck(inner, R) !== ExtendsResult.False);
  return extracted.length === 1 ? extracted[0] : Union(extracted);
}
function Extract(L, R, options = {}) {
  if (IsTemplateLiteral(L))
    return CloneType(ExtractFromTemplateLiteral(L, R), options);
  if (IsMappedResult(L))
    return CloneType(ExtractFromMappedResult(L, R), options);
  return CloneType(IsUnion(L) ? ExtractRest(L.anyOf, R) : ExtendsCheck(L, R) !== ExtendsResult.False ? L : Never(), options);
}

// node_modules/@sinclair/typebox/build/esm/type/extract/extract-from-mapped-result.mjs
function FromProperties11(P, T) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Extract(P[K2], T);
  return Acc;
}
function FromMappedResult8(R, T) {
  return FromProperties11(R.properties, T);
}
function ExtractFromMappedResult(R, T) {
  const P = FromMappedResult8(R, T);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/instance-type/instance-type.mjs
function InstanceType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/integer/integer.mjs
function Integer(options = {}) {
  return {
    ...options,
    [Kind]: "Integer",
    type: "integer"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic-from-mapped-key.mjs
function MappedIntrinsicPropertyKey(K, M, options) {
  return {
    [K]: Intrinsic(Literal(K), M, options)
  };
}
function MappedIntrinsicPropertyKeys(K, M, options) {
  return K.reduce((Acc, L) => {
    return { ...Acc, ...MappedIntrinsicPropertyKey(L, M, options) };
  }, {});
}
function MappedIntrinsicProperties(T, M, options) {
  return MappedIntrinsicPropertyKeys(T["keys"], M, options);
}
function IntrinsicFromMappedKey(T, M, options) {
  const P = MappedIntrinsicProperties(T, M, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/intrinsic.mjs
function ApplyUncapitalize(value2) {
  const [first, rest] = [value2.slice(0, 1), value2.slice(1)];
  return [first.toLowerCase(), rest].join("");
}
function ApplyCapitalize(value2) {
  const [first, rest] = [value2.slice(0, 1), value2.slice(1)];
  return [first.toUpperCase(), rest].join("");
}
function ApplyUppercase(value2) {
  return value2.toUpperCase();
}
function ApplyLowercase(value2) {
  return value2.toLowerCase();
}
function FromTemplateLiteral6(schema, mode, options) {
  const expression = TemplateLiteralParseExact(schema.pattern);
  const finite2 = IsTemplateLiteralExpressionFinite(expression);
  if (!finite2)
    return { ...schema, pattern: FromLiteralValue(schema.pattern, mode) };
  const strings = [...TemplateLiteralExpressionGenerate(expression)];
  const literals = strings.map((value2) => Literal(value2));
  const mapped2 = FromRest6(literals, mode);
  const union3 = Union(mapped2);
  return TemplateLiteral([union3], options);
}
function FromLiteralValue(value2, mode) {
  return typeof value2 === "string" ? mode === "Uncapitalize" ? ApplyUncapitalize(value2) : mode === "Capitalize" ? ApplyCapitalize(value2) : mode === "Uppercase" ? ApplyUppercase(value2) : mode === "Lowercase" ? ApplyLowercase(value2) : value2 : value2.toString();
}
function FromRest6(T, M) {
  return T.map((L) => Intrinsic(L, M));
}
function Intrinsic(schema, mode, options = {}) {
  return IsMappedKey(schema) ? IntrinsicFromMappedKey(schema, mode, options) : IsTemplateLiteral(schema) ? FromTemplateLiteral6(schema, mode, schema) : IsUnion(schema) ? Union(FromRest6(schema.anyOf, mode), options) : IsLiteral(schema) ? Literal(FromLiteralValue(schema.const, mode), options) : schema;
}

// node_modules/@sinclair/typebox/build/esm/type/intrinsic/capitalize.mjs
function Capitalize(T, options = {}) {
  return Intrinsic(T, "Capitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/lowercase.mjs
function Lowercase(T, options = {}) {
  return Intrinsic(T, "Lowercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uncapitalize.mjs
function Uncapitalize(T, options = {}) {
  return Intrinsic(T, "Uncapitalize", options);
}
// node_modules/@sinclair/typebox/build/esm/type/intrinsic/uppercase.mjs
function Uppercase(T, options = {}) {
  return Intrinsic(T, "Uppercase", options);
}
// node_modules/@sinclair/typebox/build/esm/type/not/not.mjs
function Not2(schema, options) {
  return {
    ...options,
    [Kind]: "Not",
    not: CloneType(schema)
  };
}
// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-result.mjs
function FromProperties12(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Omit(P[K2], K, options);
  return Acc;
}
function FromMappedResult9(R, K, options) {
  return FromProperties12(R.properties, K, options);
}
function OmitFromMappedResult(R, K, options) {
  const P = FromMappedResult9(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit.mjs
function FromIntersect16(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
function FromUnion18(T, K) {
  return T.map((T2) => OmitResolve(T2, K));
}
function FromProperty2(T, K) {
  const { [K]: _, ...R } = T;
  return R;
}
function FromProperties13(T, K) {
  return K.reduce((T2, K2) => FromProperty2(T2, K2), T);
}
function OmitResolve(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect16(T.allOf, K)) : IsUnion(T) ? Union(FromUnion18(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties13(T.properties, K)) : Object2({});
}
function Omit(T, K, options = {}) {
  if (IsMappedKey(K))
    return OmitFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return OmitFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(OmitResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/omit/omit-from-mapped-key.mjs
function FromPropertyKey2(T, K, options) {
  return {
    [K]: Omit(T, [K], options)
  };
}
function FromPropertyKeys2(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey2(T, LK, options) };
  }, {});
}
function FromMappedKey3(T, K, options) {
  return FromPropertyKeys2(T, K.keys, options);
}
function OmitFromMappedKey(T, K, options) {
  const P = FromMappedKey3(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/parameters/parameters.mjs
function Parameters(schema, options = {}) {
  return Tuple(CloneRest(schema.parameters), { ...options });
}
// node_modules/@sinclair/typebox/build/esm/type/partial/partial.mjs
function FromRest7(T) {
  return T.map((L) => PartialResolve(L));
}
function FromProperties14(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Optional(T[K]);
  return Acc;
}
function PartialResolve(T) {
  return IsIntersect(T) ? Intersect(FromRest7(T.allOf)) : IsUnion(T) ? Union(FromRest7(T.anyOf)) : IsObject3(T) ? Object2(FromProperties14(T.properties)) : Object2({});
}
function Partial(T, options = {}) {
  if (IsMappedResult(T))
    return PartialFromMappedResult(T, options);
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PartialResolve(T), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/partial/partial-from-mapped-result.mjs
function FromProperties15(K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(K))
    Acc[K2] = Partial(K[K2], options);
  return Acc;
}
function FromMappedResult10(R, options) {
  return FromProperties15(R.properties, options);
}
function PartialFromMappedResult(R, options) {
  const P = FromMappedResult10(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-result.mjs
function FromProperties16(P, K, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Pick(P[K2], K, options);
  return Acc;
}
function FromMappedResult11(R, K, options) {
  return FromProperties16(R.properties, K, options);
}
function PickFromMappedResult(R, K, options) {
  const P = FromMappedResult11(R, K, options);
  return MappedResult(P);
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick.mjs
function FromIntersect17(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
function FromUnion19(T, K) {
  return T.map((T2) => PickResolve(T2, K));
}
function FromProperties17(T, K) {
  const Acc = {};
  for (const K2 of K)
    if (K2 in T)
      Acc[K2] = T[K2];
  return Acc;
}
function PickResolve(T, K) {
  return IsIntersect(T) ? Intersect(FromIntersect17(T.allOf, K)) : IsUnion(T) ? Union(FromUnion19(T.anyOf, K)) : IsObject3(T) ? Object2(FromProperties17(T.properties, K)) : Object2({});
}
function Pick(T, K, options = {}) {
  if (IsMappedKey(K))
    return PickFromMappedKey(T, K, options);
  if (IsMappedResult(T))
    return PickFromMappedResult(T, K, options);
  const I = IsSchema(K) ? IndexPropertyKeys(K) : K;
  const D = Discard(T, [TransformKind, "$id", "required"]);
  const R = CloneType(PickResolve(T, I), options);
  return { ...D, ...R };
}

// node_modules/@sinclair/typebox/build/esm/type/pick/pick-from-mapped-key.mjs
function FromPropertyKey3(T, K, options) {
  return {
    [K]: Pick(T, [K], options)
  };
}
function FromPropertyKeys3(T, K, options) {
  return K.reduce((Acc, LK) => {
    return { ...Acc, ...FromPropertyKey3(T, LK, options) };
  }, {});
}
function FromMappedKey4(T, K, options) {
  return FromPropertyKeys3(T, K.keys, options);
}
function PickFromMappedKey(T, K, options) {
  const P = FromMappedKey4(T, K, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/readonly-optional/readonly-optional.mjs
function ReadonlyOptional(schema) {
  return Readonly(Optional(schema));
}
// node_modules/@sinclair/typebox/build/esm/type/record/record.mjs
function RecordCreateFromPattern(pattern2, T, options) {
  return {
    ...options,
    [Kind]: "Record",
    type: "object",
    patternProperties: { [pattern2]: CloneType(T) }
  };
}
function RecordCreateFromKeys(K, T, options) {
  const Acc = {};
  for (const K2 of K)
    Acc[K2] = CloneType(T);
  return Object2(Acc, { ...options, [Hint]: "Record" });
}
function FromTemplateLiteralKey(K, T, options) {
  return IsTemplateLiteralFinite(K) ? RecordCreateFromKeys(IndexPropertyKeys(K), T, options) : RecordCreateFromPattern(K.pattern, T, options);
}
function FromUnionKey(K, T, options) {
  return RecordCreateFromKeys(IndexPropertyKeys(Union(K)), T, options);
}
function FromLiteralKey(K, T, options) {
  return RecordCreateFromKeys([K.toString()], T, options);
}
function FromRegExpKey(K, T, options) {
  return RecordCreateFromPattern(K.source, T, options);
}
function FromStringKey(K, T, options) {
  const pattern2 = IsUndefined2(K.pattern) ? PatternStringExact : K.pattern;
  return RecordCreateFromPattern(pattern2, T, options);
}
function FromIntegerKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
function FromNumberKey(_, T, options) {
  return RecordCreateFromPattern(PatternNumberExact, T, options);
}
function Record(K, T, options = {}) {
  return IsUnion(K) ? FromUnionKey(K.anyOf, T, options) : IsTemplateLiteral(K) ? FromTemplateLiteralKey(K, T, options) : IsLiteral(K) ? FromLiteralKey(K.const, T, options) : IsInteger2(K) ? FromIntegerKey(K, T, options) : IsNumber3(K) ? FromNumberKey(K, T, options) : IsRegExp2(K) ? FromRegExpKey(K, T, options) : IsString3(K) ? FromStringKey(K, T, options) : Never(options);
}
// node_modules/@sinclair/typebox/build/esm/type/recursive/recursive.mjs
var Ordinal = 0;
function Recursive(callback, options = {}) {
  if (IsUndefined2(options.$id))
    options.$id = `T${Ordinal++}`;
  const thisType = callback({ [Kind]: "This", $ref: `${options.$id}` });
  thisType.$id = options.$id;
  return CloneType({ ...options, [Hint]: "Recursive", ...thisType });
}
// node_modules/@sinclair/typebox/build/esm/type/ref/ref.mjs
function Ref(unresolved, options = {}) {
  if (IsString2(unresolved))
    return { ...options, [Kind]: "Ref", $ref: unresolved };
  if (IsUndefined2(unresolved.$id))
    throw new Error("Reference target type must specify an $id");
  return {
    ...options,
    [Kind]: "Ref",
    $ref: unresolved.$id
  };
}
// node_modules/@sinclair/typebox/build/esm/type/regexp/regexp.mjs
function RegExp2(unresolved, options = {}) {
  const expr = IsString2(unresolved) ? new globalThis.RegExp(unresolved) : unresolved;
  return { ...options, [Kind]: "RegExp", type: "RegExp", source: expr.source, flags: expr.flags };
}
// node_modules/@sinclair/typebox/build/esm/type/required/required.mjs
function FromRest8(T) {
  return T.map((L) => RequiredResolve(L));
}
function FromProperties18(T) {
  const Acc = {};
  for (const K of globalThis.Object.getOwnPropertyNames(T))
    Acc[K] = Discard(T[K], [OptionalKind]);
  return Acc;
}
function RequiredResolve(T) {
  return IsIntersect(T) ? Intersect(FromRest8(T.allOf)) : IsUnion(T) ? Union(FromRest8(T.anyOf)) : IsObject3(T) ? Object2(FromProperties18(T.properties)) : Object2({});
}
function Required(T, options = {}) {
  if (IsMappedResult(T)) {
    return RequiredFromMappedResult(T, options);
  } else {
    const D = Discard(T, [TransformKind, "$id", "required"]);
    const R = CloneType(RequiredResolve(T), options);
    return { ...D, ...R };
  }
}

// node_modules/@sinclair/typebox/build/esm/type/required/required-from-mapped-result.mjs
function FromProperties19(P, options) {
  const Acc = {};
  for (const K2 of globalThis.Object.getOwnPropertyNames(P))
    Acc[K2] = Required(P[K2], options);
  return Acc;
}
function FromMappedResult12(R, options) {
  return FromProperties19(R.properties, options);
}
function RequiredFromMappedResult(R, options) {
  const P = FromMappedResult12(R, options);
  return MappedResult(P);
}
// node_modules/@sinclair/typebox/build/esm/type/rest/rest.mjs
function RestResolve(T) {
  return IsIntersect(T) ? CloneRest(T.allOf) : IsUnion(T) ? CloneRest(T.anyOf) : IsTuple(T) ? CloneRest(T.items ?? []) : [];
}
function Rest(T) {
  return CloneRest(RestResolve(T));
}
// node_modules/@sinclair/typebox/build/esm/type/return-type/return-type.mjs
function ReturnType(schema, options = {}) {
  return CloneType(schema.returns, options);
}
// node_modules/@sinclair/typebox/build/esm/type/strict/strict.mjs
function Strict(schema2) {
  return JSON.parse(JSON.stringify(schema2));
}
// node_modules/@sinclair/typebox/build/esm/type/transform/transform.mjs
class TransformDecodeBuilder {
  constructor(schema2) {
    this.schema = schema2;
  }
  Decode(decode2) {
    return new TransformEncodeBuilder(this.schema, decode2);
  }
}

class TransformEncodeBuilder {
  constructor(schema2, decode2) {
    this.schema = schema2;
    this.decode = decode2;
  }
  EncodeTransform(encode2, schema2) {
    const Encode2 = (value2) => schema2[TransformKind].Encode(encode2(value2));
    const Decode2 = (value2) => this.decode(schema2[TransformKind].Decode(value2));
    const Codec = { Encode: Encode2, Decode: Decode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  EncodeSchema(encode2, schema2) {
    const Codec = { Decode: this.decode, Encode: encode2 };
    return { ...schema2, [TransformKind]: Codec };
  }
  Encode(encode2) {
    const schema2 = CloneType(this.schema);
    return IsTransform(schema2) ? this.EncodeTransform(encode2, schema2) : this.EncodeSchema(encode2, schema2);
  }
}
function Transform(schema2) {
  return new TransformDecodeBuilder(schema2);
}
// node_modules/@sinclair/typebox/build/esm/type/void/void.mjs
function Void(options = {}) {
  return {
    ...options,
    [Kind]: "Void",
    type: "void"
  };
}
// node_modules/@sinclair/typebox/build/esm/type/type/type.mjs
var exports_type3 = {};
__export(exports_type3, {
  Void: () => Void,
  Uppercase: () => Uppercase,
  Unsafe: () => Unsafe,
  Unknown: () => Unknown,
  Union: () => Union,
  Undefined: () => Undefined,
  Uncapitalize: () => Uncapitalize,
  Uint8Array: () => Uint8Array2,
  Tuple: () => Tuple,
  Transform: () => Transform,
  TemplateLiteral: () => TemplateLiteral,
  Symbol: () => Symbol2,
  String: () => String2,
  Strict: () => Strict,
  ReturnType: () => ReturnType,
  Rest: () => Rest,
  Required: () => Required,
  RegExp: () => RegExp2,
  Ref: () => Ref,
  Recursive: () => Recursive,
  Record: () => Record,
  ReadonlyOptional: () => ReadonlyOptional,
  Readonly: () => Readonly,
  Promise: () => Promise2,
  Pick: () => Pick,
  Partial: () => Partial,
  Parameters: () => Parameters,
  Optional: () => Optional,
  Omit: () => Omit,
  Object: () => Object2,
  Number: () => Number2,
  Null: () => Null,
  Not: () => Not2,
  Never: () => Never,
  Mapped: () => Mapped,
  Lowercase: () => Lowercase,
  Literal: () => Literal,
  KeyOf: () => KeyOf,
  Iterator: () => Iterator,
  Intersect: () => Intersect,
  Integer: () => Integer,
  InstanceType: () => InstanceType,
  Index: () => Index,
  Function: () => Function2,
  Extract: () => Extract,
  Extends: () => Extends,
  Exclude: () => Exclude,
  Enum: () => Enum,
  Deref: () => Deref2,
  Date: () => Date2,
  ConstructorParameters: () => ConstructorParameters,
  Constructor: () => Constructor,
  Const: () => Const,
  Composite: () => Composite,
  Capitalize: () => Capitalize,
  Boolean: () => Boolean2,
  BigInt: () => BigInt2,
  Awaited: () => Awaited,
  AsyncIterator: () => AsyncIterator,
  Array: () => Array2,
  Any: () => Any
});

// node_modules/@sinclair/typebox/build/esm/type/type/index.mjs
var Type = exports_type3;
// node_modules/@sinclair/typebox/build/esm/compiler/compiler.mjs
class TypeCheck {
  constructor(schema3, references, checkFunc, code) {
    this.schema = schema3;
    this.references = references;
    this.checkFunc = checkFunc;
    this.code = code;
    this.hasTransform = HasTransform(schema3, references);
  }
  Code() {
    return this.code;
  }
  Errors(value2) {
    return Errors(this.schema, this.references, value2);
  }
  Check(value2) {
    return this.checkFunc(value2);
  }
  Decode(value2) {
    if (!this.checkFunc(value2))
      throw new TransformDecodeCheckError(this.schema, value2, this.Errors(value2).First());
    return this.hasTransform ? TransformDecode(this.schema, this.references, value2) : value2;
  }
  Encode(value2) {
    const encoded = this.hasTransform ? TransformEncode(this.schema, this.references, value2) : value2;
    if (!this.checkFunc(encoded))
      throw new TransformEncodeCheckError(this.schema, value2, this.Errors(value2).First());
    return encoded;
  }
}
var Character;
(function(Character2) {
  function DollarSign(code) {
    return code === 36;
  }
  Character2.DollarSign = DollarSign;
  function IsUnderscore(code) {
    return code === 95;
  }
  Character2.IsUnderscore = IsUnderscore;
  function IsAlpha(code) {
    return code >= 65 && code <= 90 || code >= 97 && code <= 122;
  }
  Character2.IsAlpha = IsAlpha;
  function IsNumeric(code) {
    return code >= 48 && code <= 57;
  }
  Character2.IsNumeric = IsNumeric;
})(Character || (Character = {}));
var MemberExpression;
(function(MemberExpression2) {
  function IsFirstCharacterNumeric(value2) {
    if (value2.length === 0)
      return false;
    return Character.IsNumeric(value2.charCodeAt(0));
  }
  function IsAccessor(value2) {
    if (IsFirstCharacterNumeric(value2))
      return false;
    for (let i = 0;i < value2.length; i++) {
      const code = value2.charCodeAt(i);
      const check3 = Character.IsAlpha(code) || Character.IsNumeric(code) || Character.DollarSign(code) || Character.IsUnderscore(code);
      if (!check3)
        return false;
    }
    return true;
  }
  function EscapeHyphen(key) {
    return key.replace(/'/g, "\\'");
  }
  function Encode2(object3, key) {
    return IsAccessor(key) ? `${object3}.${key}` : `${object3}['${EscapeHyphen(key)}']`;
  }
  MemberExpression2.Encode = Encode2;
})(MemberExpression || (MemberExpression = {}));
var Identifier;
(function(Identifier2) {
  function Encode2($id) {
    const buffer = [];
    for (let i = 0;i < $id.length; i++) {
      const code = $id.charCodeAt(i);
      if (Character.IsNumeric(code) || Character.IsAlpha(code)) {
        buffer.push($id.charAt(i));
      } else {
        buffer.push(`_${code}_`);
      }
    }
    return buffer.join("").replace(/__/g, "_");
  }
  Identifier2.Encode = Encode2;
})(Identifier || (Identifier = {}));
var LiteralString;
(function(LiteralString2) {
  function Escape3(content) {
    return content.replace(/'/g, "\\'");
  }
  LiteralString2.Escape = Escape3;
})(LiteralString || (LiteralString = {}));

class TypeCompilerUnknownTypeError extends TypeBoxError {
  constructor(schema3) {
    super("Unknown type");
    this.schema = schema3;
  }
}

class TypeCompilerTypeGuardError extends TypeBoxError {
  constructor(schema3) {
    super("Preflight validation check failed to guard for the given schema");
    this.schema = schema3;
  }
}
var Policy;
(function(Policy2) {
  function IsExactOptionalProperty(value2, key, expression) {
    return TypeSystemPolicy.ExactOptionalPropertyTypes ? `('${key}' in ${value2} ? ${expression} : true)` : `(${MemberExpression.Encode(value2, key)} !== undefined ? ${expression} : true)`;
  }
  Policy2.IsExactOptionalProperty = IsExactOptionalProperty;
  function IsObjectLike(value2) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value2} === 'object' && ${value2} !== null && !Array.isArray(${value2}))` : `(typeof ${value2} === 'object' && ${value2} !== null)`;
  }
  Policy2.IsObjectLike = IsObjectLike;
  function IsRecordLike(value2) {
    return !TypeSystemPolicy.AllowArrayObject ? `(typeof ${value2} === 'object' && ${value2} !== null && !Array.isArray(${value2}) && !(${value2} instanceof Date) && !(${value2} instanceof Uint8Array))` : `(typeof ${value2} === 'object' && ${value2} !== null && !(${value2} instanceof Date) && !(${value2} instanceof Uint8Array))`;
  }
  Policy2.IsRecordLike = IsRecordLike;
  function IsNumberLike(value2) {
    return TypeSystemPolicy.AllowNaN ? `typeof ${value2} === 'number'` : `Number.isFinite(${value2})`;
  }
  Policy2.IsNumberLike = IsNumberLike;
  function IsVoidLike(value2) {
    return TypeSystemPolicy.AllowNullVoid ? `(${value2} === undefined || ${value2} === null)` : `${value2} === undefined`;
  }
  Policy2.IsVoidLike = IsVoidLike;
})(Policy || (Policy = {}));
var TypeCompiler;
(function(TypeCompiler2) {
  function IsAnyOrUnknown2(schema3) {
    return schema3[Kind] === "Any" || schema3[Kind] === "Unknown";
  }
  function* FromAny5(schema3, references, value2) {
    yield "true";
  }
  function* FromArray16(schema3, references, value2) {
    yield `Array.isArray(${value2})`;
    const [parameter, accumulator] = [CreateParameter("value", "any"), CreateParameter("acc", "number")];
    if (IsNumber(schema3.maxItems))
      yield `${value2}.length <= ${schema3.maxItems}`;
    if (IsNumber(schema3.minItems))
      yield `${value2}.length >= ${schema3.minItems}`;
    const elementExpression = CreateExpression(schema3.items, references, "value");
    yield `${value2}.every((${parameter}) => ${elementExpression})`;
    if (IsSchema2(schema3.contains) || IsNumber(schema3.minContains) || IsNumber(schema3.maxContains)) {
      const containsSchema = IsSchema2(schema3.contains) ? schema3.contains : Never();
      const checkExpression = CreateExpression(containsSchema, references, "value");
      const checkMinContains = IsNumber(schema3.minContains) ? [`(count >= ${schema3.minContains})`] : [];
      const checkMaxContains = IsNumber(schema3.maxContains) ? [`(count <= ${schema3.maxContains})`] : [];
      const checkCount = `const count = value.reduce((${accumulator}, ${parameter}) => ${checkExpression} ? acc + 1 : acc, 0)`;
      const check3 = [`(count > 0)`, ...checkMinContains, ...checkMaxContains].join(" && ");
      yield `((${parameter}) => { ${checkCount}; return ${check3}})(${value2})`;
    }
    if (schema3.uniqueItems === true) {
      const check3 = `const hashed = hash(element); if(set.has(hashed)) { return false } else { set.add(hashed) } } return true`;
      const block = `const set = new Set(); for(const element of value) { ${check3} }`;
      yield `((${parameter}) => { ${block} )(${value2})`;
    }
  }
  function* FromAsyncIterator7(schema3, references, value2) {
    yield `(typeof value === 'object' && Symbol.asyncIterator in ${value2})`;
  }
  function* FromBigInt6(schema3, references, value2) {
    yield `(typeof ${value2} === 'bigint')`;
    if (IsBigInt(schema3.exclusiveMaximum))
      yield `${value2} < BigInt(${schema3.exclusiveMaximum})`;
    if (IsBigInt(schema3.exclusiveMinimum))
      yield `${value2} > BigInt(${schema3.exclusiveMinimum})`;
    if (IsBigInt(schema3.maximum))
      yield `${value2} <= BigInt(${schema3.maximum})`;
    if (IsBigInt(schema3.minimum))
      yield `${value2} >= BigInt(${schema3.minimum})`;
    if (IsBigInt(schema3.multipleOf))
      yield `(${value2} % BigInt(${schema3.multipleOf})) === 0`;
  }
  function* FromBoolean6(schema3, references, value2) {
    yield `(typeof ${value2} === 'boolean')`;
  }
  function* FromConstructor8(schema3, references, value2) {
    yield* Visit17(schema3.returns, references, `${value2}.prototype`);
  }
  function* FromDate6(schema3, references, value2) {
    yield `(${value2} instanceof Date) && Number.isFinite(${value2}.getTime())`;
    if (IsNumber(schema3.exclusiveMaximumTimestamp))
      yield `${value2}.getTime() < ${schema3.exclusiveMaximumTimestamp}`;
    if (IsNumber(schema3.exclusiveMinimumTimestamp))
      yield `${value2}.getTime() > ${schema3.exclusiveMinimumTimestamp}`;
    if (IsNumber(schema3.maximumTimestamp))
      yield `${value2}.getTime() <= ${schema3.maximumTimestamp}`;
    if (IsNumber(schema3.minimumTimestamp))
      yield `${value2}.getTime() >= ${schema3.minimumTimestamp}`;
    if (IsNumber(schema3.multipleOfTimestamp))
      yield `(${value2}.getTime() % ${schema3.multipleOfTimestamp}) === 0`;
  }
  function* FromFunction7(schema3, references, value2) {
    yield `(typeof ${value2} === 'function')`;
  }
  function* FromInteger6(schema3, references, value2) {
    yield `Number.isInteger(${value2})`;
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value2} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value2} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value2} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value2} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value2} % ${schema3.multipleOf}) === 0`;
  }
  function* FromIntersect18(schema3, references, value2) {
    const check1 = schema3.allOf.map((schema4) => CreateExpression(schema4, references, value2)).join(" && ");
    if (schema3.unevaluatedProperties === false) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value2}).every(key => ${keyCheck}.test(key))`;
      yield `(${check1} && ${check22})`;
    } else if (IsSchema2(schema3.unevaluatedProperties)) {
      const keyCheck = CreateVariable(`${new RegExp(KeyOfPattern(schema3))};`);
      const check22 = `Object.getOwnPropertyNames(${value2}).every(key => ${keyCheck}.test(key) || ${CreateExpression(schema3.unevaluatedProperties, references, `${value2}[key]`)})`;
      yield `(${check1} && ${check22})`;
    } else {
      yield `(${check1})`;
    }
  }
  function* FromIterator7(schema3, references, value2) {
    yield `(typeof value === 'object' && Symbol.iterator in ${value2})`;
  }
  function* FromLiteral7(schema3, references, value2) {
    if (typeof schema3.const === "number" || typeof schema3.const === "boolean") {
      yield `(${value2} === ${schema3.const})`;
    } else {
      yield `(${value2} === '${LiteralString.Escape(schema3.const)}')`;
    }
  }
  function* FromNever6(schema3, references, value2) {
    yield `false`;
  }
  function* FromNot8(schema3, references, value2) {
    const expression = CreateExpression(schema3.not, references, value2);
    yield `(!${expression})`;
  }
  function* FromNull6(schema3, references, value2) {
    yield `(${value2} === null)`;
  }
  function* FromNumber6(schema3, references, value2) {
    yield Policy.IsNumberLike(value2);
    if (IsNumber(schema3.exclusiveMaximum))
      yield `${value2} < ${schema3.exclusiveMaximum}`;
    if (IsNumber(schema3.exclusiveMinimum))
      yield `${value2} > ${schema3.exclusiveMinimum}`;
    if (IsNumber(schema3.maximum))
      yield `${value2} <= ${schema3.maximum}`;
    if (IsNumber(schema3.minimum))
      yield `${value2} >= ${schema3.minimum}`;
    if (IsNumber(schema3.multipleOf))
      yield `(${value2} % ${schema3.multipleOf}) === 0`;
  }
  function* FromObject13(schema3, references, value2) {
    yield Policy.IsObjectLike(value2);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value2}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value2}).length <= ${schema3.maxProperties}`;
    const knownKeys = Object.getOwnPropertyNames(schema3.properties);
    for (const knownKey of knownKeys) {
      const memberExpression = MemberExpression.Encode(value2, knownKey);
      const property = schema3.properties[knownKey];
      if (schema3.required && schema3.required.includes(knownKey)) {
        yield* Visit17(property, references, memberExpression);
        if (ExtendsUndefinedCheck(property) || IsAnyOrUnknown2(property))
          yield `('${knownKey}' in ${value2})`;
      } else {
        const expression = CreateExpression(property, references, memberExpression);
        yield Policy.IsExactOptionalProperty(value2, knownKey, expression);
      }
    }
    if (schema3.additionalProperties === false) {
      if (schema3.required && schema3.required.length === knownKeys.length) {
        yield `Object.getOwnPropertyNames(${value2}).length === ${knownKeys.length}`;
      } else {
        const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
        yield `Object.getOwnPropertyNames(${value2}).every(key => ${keys}.includes(key))`;
      }
    }
    if (typeof schema3.additionalProperties === "object") {
      const expression = CreateExpression(schema3.additionalProperties, references, `${value2}[key]`);
      const keys = `[${knownKeys.map((key) => `'${key}'`).join(", ")}]`;
      yield `(Object.getOwnPropertyNames(${value2}).every(key => ${keys}.includes(key) || ${expression}))`;
    }
  }
  function* FromPromise8(schema3, references, value2) {
    yield `(typeof value === 'object' && typeof ${value2}.then === 'function')`;
  }
  function* FromRecord12(schema3, references, value2) {
    yield Policy.IsRecordLike(value2);
    if (IsNumber(schema3.minProperties))
      yield `Object.getOwnPropertyNames(${value2}).length >= ${schema3.minProperties}`;
    if (IsNumber(schema3.maxProperties))
      yield `Object.getOwnPropertyNames(${value2}).length <= ${schema3.maxProperties}`;
    const [patternKey, patternSchema] = Object.entries(schema3.patternProperties)[0];
    const variable = CreateVariable(`${new RegExp(patternKey)}`);
    const check1 = CreateExpression(patternSchema, references, "value");
    const check22 = IsSchema2(schema3.additionalProperties) ? CreateExpression(schema3.additionalProperties, references, value2) : schema3.additionalProperties === false ? "false" : "true";
    const expression = `(${variable}.test(key) ? ${check1} : ${check22})`;
    yield `(Object.entries(${value2}).every(([key, value]) => ${expression}))`;
  }
  function* FromRef12(schema3, references, value2) {
    const target = Deref(schema3, references);
    if (state.functions.has(schema3.$ref))
      return yield `${CreateFunctionName(schema3.$ref)}(${value2})`;
    yield* Visit17(target, references, value2);
  }
  function* FromRegExp5(schema3, references, value2) {
    const variable = CreateVariable(`${new RegExp(schema3.source, schema3.flags)};`);
    yield `(typeof ${value2} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value2}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value2}.length >= ${schema3.minLength}`;
    yield `${variable}.test(${value2})`;
  }
  function* FromString6(schema3, references, value2) {
    yield `(typeof ${value2} === 'string')`;
    if (IsNumber(schema3.maxLength))
      yield `${value2}.length <= ${schema3.maxLength}`;
    if (IsNumber(schema3.minLength))
      yield `${value2}.length >= ${schema3.minLength}`;
    if (schema3.pattern !== undefined) {
      const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
      yield `${variable}.test(${value2})`;
    }
    if (schema3.format !== undefined) {
      yield `format('${schema3.format}', ${value2})`;
    }
  }
  function* FromSymbol6(schema3, references, value2) {
    yield `(typeof ${value2} === 'symbol')`;
  }
  function* FromTemplateLiteral7(schema3, references, value2) {
    yield `(typeof ${value2} === 'string')`;
    const variable = CreateVariable(`${new RegExp(schema3.pattern)};`);
    yield `${variable}.test(${value2})`;
  }
  function* FromThis11(schema3, references, value2) {
    yield `${CreateFunctionName(schema3.$ref)}(${value2})`;
  }
  function* FromTuple15(schema3, references, value2) {
    yield `Array.isArray(${value2})`;
    if (schema3.items === undefined)
      return yield `${value2}.length === 0`;
    yield `(${value2}.length === ${schema3.maxItems})`;
    for (let i = 0;i < schema3.items.length; i++) {
      const expression = CreateExpression(schema3.items[i], references, `${value2}[${i}]`);
      yield `${expression}`;
    }
  }
  function* FromUndefined6(schema3, references, value2) {
    yield `${value2} === undefined`;
  }
  function* FromUnion20(schema3, references, value2) {
    const expressions = schema3.anyOf.map((schema4) => CreateExpression(schema4, references, value2));
    yield `(${expressions.join(" || ")})`;
  }
  function* FromUint8Array5(schema3, references, value2) {
    yield `${value2} instanceof Uint8Array`;
    if (IsNumber(schema3.maxByteLength))
      yield `(${value2}.length <= ${schema3.maxByteLength})`;
    if (IsNumber(schema3.minByteLength))
      yield `(${value2}.length >= ${schema3.minByteLength})`;
  }
  function* FromUnknown5(schema3, references, value2) {
    yield "true";
  }
  function* FromVoid5(schema3, references, value2) {
    yield Policy.IsVoidLike(value2);
  }
  function* FromKind4(schema3, references, value2) {
    const instance = state.instances.size;
    state.instances.set(instance, schema3);
    yield `kind('${schema3[Kind]}', ${instance}, ${value2})`;
  }
  function* Visit17(schema3, references, value2, useHoisting = true) {
    const references_ = IsString(schema3.$id) ? [...references, schema3] : references;
    const schema_ = schema3;
    if (useHoisting && IsString(schema3.$id)) {
      const functionName = CreateFunctionName(schema3.$id);
      if (state.functions.has(functionName)) {
        return yield `${functionName}(${value2})`;
      } else {
        const functionCode = CreateFunction(functionName, schema3, references, "value", false);
        state.functions.set(functionName, functionCode);
        return yield `${functionName}(${value2})`;
      }
    }
    switch (schema_[Kind]) {
      case "Any":
        return yield* FromAny5(schema_, references_, value2);
      case "Array":
        return yield* FromArray16(schema_, references_, value2);
      case "AsyncIterator":
        return yield* FromAsyncIterator7(schema_, references_, value2);
      case "BigInt":
        return yield* FromBigInt6(schema_, references_, value2);
      case "Boolean":
        return yield* FromBoolean6(schema_, references_, value2);
      case "Constructor":
        return yield* FromConstructor8(schema_, references_, value2);
      case "Date":
        return yield* FromDate6(schema_, references_, value2);
      case "Function":
        return yield* FromFunction7(schema_, references_, value2);
      case "Integer":
        return yield* FromInteger6(schema_, references_, value2);
      case "Intersect":
        return yield* FromIntersect18(schema_, references_, value2);
      case "Iterator":
        return yield* FromIterator7(schema_, references_, value2);
      case "Literal":
        return yield* FromLiteral7(schema_, references_, value2);
      case "Never":
        return yield* FromNever6(schema_, references_, value2);
      case "Not":
        return yield* FromNot8(schema_, references_, value2);
      case "Null":
        return yield* FromNull6(schema_, references_, value2);
      case "Number":
        return yield* FromNumber6(schema_, references_, value2);
      case "Object":
        return yield* FromObject13(schema_, references_, value2);
      case "Promise":
        return yield* FromPromise8(schema_, references_, value2);
      case "Record":
        return yield* FromRecord12(schema_, references_, value2);
      case "Ref":
        return yield* FromRef12(schema_, references_, value2);
      case "RegExp":
        return yield* FromRegExp5(schema_, references_, value2);
      case "String":
        return yield* FromString6(schema_, references_, value2);
      case "Symbol":
        return yield* FromSymbol6(schema_, references_, value2);
      case "TemplateLiteral":
        return yield* FromTemplateLiteral7(schema_, references_, value2);
      case "This":
        return yield* FromThis11(schema_, references_, value2);
      case "Tuple":
        return yield* FromTuple15(schema_, references_, value2);
      case "Undefined":
        return yield* FromUndefined6(schema_, references_, value2);
      case "Union":
        return yield* FromUnion20(schema_, references_, value2);
      case "Uint8Array":
        return yield* FromUint8Array5(schema_, references_, value2);
      case "Unknown":
        return yield* FromUnknown5(schema_, references_, value2);
      case "Void":
        return yield* FromVoid5(schema_, references_, value2);
      default:
        if (!exports_type.Has(schema_[Kind]))
          throw new TypeCompilerUnknownTypeError(schema3);
        return yield* FromKind4(schema_, references_, value2);
    }
  }
  const state = {
    language: "javascript",
    functions: new Map,
    variables: new Map,
    instances: new Map
  };
  function CreateExpression(schema3, references, value2, useHoisting = true) {
    return `(${[...Visit17(schema3, references, value2, useHoisting)].join(" && ")})`;
  }
  function CreateFunctionName($id) {
    return `check_${Identifier.Encode($id)}`;
  }
  function CreateVariable(expression) {
    const variableName = `local_${state.variables.size}`;
    state.variables.set(variableName, `const ${variableName} = ${expression}`);
    return variableName;
  }
  function CreateFunction(name, schema3, references, value2, useHoisting = true) {
    const [newline, pad] = [`
`, (length) => "".padStart(length, " ")];
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const expression = [...Visit17(schema3, references, value2, useHoisting)].map((expression2) => `${pad(4)}${expression2}`).join(` &&${newline}`);
    return `function ${name}(${parameter})${returns} {${newline}${pad(2)}return (${newline}${expression}${newline}${pad(2)})
}`;
  }
  function CreateParameter(name, type3) {
    const annotation = state.language === "typescript" ? `: ${type3}` : "";
    return `${name}${annotation}`;
  }
  function CreateReturns(type3) {
    return state.language === "typescript" ? `: ${type3}` : "";
  }
  function Build(schema3, references, options) {
    const functionCode = CreateFunction("check", schema3, references, "value");
    const parameter = CreateParameter("value", "any");
    const returns = CreateReturns("boolean");
    const functions = [...state.functions.values()];
    const variables = [...state.variables.values()];
    const checkFunction = IsString(schema3.$id) ? `return function check(${parameter})${returns} {
  return ${CreateFunctionName(schema3.$id)}(value)
}` : `return ${functionCode}`;
    return [...variables, ...functions, checkFunction].join(`
`);
  }
  function Code(...args) {
    const defaults = { language: "javascript" };
    const [schema3, references, options] = args.length === 2 && IsArray(args[1]) ? [args[0], args[1], defaults] : args.length === 2 && !IsArray(args[1]) ? [args[0], [], args[1]] : args.length === 3 ? [args[0], args[1], args[2]] : args.length === 1 ? [args[0], [], defaults] : [null, [], defaults];
    state.language = options.language;
    state.variables.clear();
    state.functions.clear();
    state.instances.clear();
    if (!IsSchema2(schema3))
      throw new TypeCompilerTypeGuardError(schema3);
    for (const schema4 of references)
      if (!IsSchema2(schema4))
        throw new TypeCompilerTypeGuardError(schema4);
    return Build(schema3, references, options);
  }
  TypeCompiler2.Code = Code;
  function Compile(schema3, references = []) {
    const generatedCode = Code(schema3, references, { language: "javascript" });
    const compiledFunction = globalThis.Function("kind", "format", "hash", generatedCode);
    const instances = new Map(state.instances);
    function typeRegistryFunction(kind, instance, value2) {
      if (!exports_type.Has(kind) || !instances.has(instance))
        return false;
      const checkFunc = exports_type.Get(kind);
      const schema4 = instances.get(instance);
      return checkFunc(schema4, value2);
    }
    function formatRegistryFunction(format, value2) {
      if (!exports_format.Has(format))
        return false;
      const checkFunc = exports_format.Get(format);
      return checkFunc(value2);
    }
    function hashFunction(value2) {
      return Hash(value2);
    }
    const checkFunction = compiledFunction(typeRegistryFunction, formatRegistryFunction, hashFunction);
    return new TypeCheck(schema3, references, checkFunction, generatedCode);
  }
  TypeCompiler2.Compile = Compile;
})(TypeCompiler || (TypeCompiler = {}));
// node_modules/elysia/dist/index.mjs
var import_cookie = __toESM(require_dist(), 1);
var import_cookie2 = __toESM(require_dist(), 1);
var import_fast_decode_uri_component = __toESM(require_fast_decode_uri_component(), 1);
var import_fast_decode_uri_component2 = __toESM(require_fast_decode_uri_component(), 1);
var import_fast_decode_uri_component3 = __toESM(require_fast_decode_uri_component(), 1);
var createNode = (part, inert) => {
  const inertMap = inert?.length ? {} : null;
  if (inertMap)
    for (const child of inert)
      inertMap[child.part.charCodeAt(0)] = child;
  return {
    part,
    store: null,
    inert: inertMap,
    params: null,
    wildcardStore: null
  };
};
var cloneNode = (node, part) => ({
  ...node,
  part
});
var createParamNode = (name) => ({
  name,
  store: null,
  inert: null
});
var Memoirist = class _Memoirist {
  root = {};
  history = [];
  static regex = {
    static: /:.+?(?=\/|$)/,
    params: /:.+?(?=\/|$)/g,
    optionalParams: /:.+?\?(?=\/|$)/g
  };
  add(method, path, store, {
    ignoreError = false,
    ignoreHistory = false
  } = {}) {
    if (typeof path !== "string")
      throw new TypeError("Route path must be a string");
    if (path === "")
      path = "/";
    else if (path[0] !== "/")
      path = `/${path}`;
    const isWildcard = path[path.length - 1] === "*";
    const optionalParams = path.match(_Memoirist.regex.optionalParams);
    if (optionalParams) {
      const originalPath = path.replaceAll("?", "");
      this.add(method, originalPath, store, {
        ignoreError
      });
      for (let i = 0;i < optionalParams.length; i++) {
        let newPath = path.replace("/" + optionalParams[i], "");
        this.add(method, newPath, store, {
          ignoreError: true
        });
      }
      return store;
    }
    if (optionalParams)
      path = path.replaceAll("?", "");
    if (this.history.find(([m, p, s]) => m === method && p === path))
      return store;
    if (isWildcard || optionalParams && path.charCodeAt(path.length - 1) === 63)
      path = path.slice(0, -1);
    if (!ignoreHistory)
      this.history.push([method, path, store]);
    const inertParts = path.split(_Memoirist.regex.static);
    const paramParts = path.match(_Memoirist.regex.params) || [];
    if (inertParts[inertParts.length - 1] === "")
      inertParts.pop();
    let node;
    if (!this.root[method])
      node = this.root[method] = createNode("/");
    else
      node = this.root[method];
    let paramPartsIndex = 0;
    for (let i = 0;i < inertParts.length; ++i) {
      let part = inertParts[i];
      if (i > 0) {
        const param = paramParts[paramPartsIndex++].slice(1);
        if (node.params === null)
          node.params = createParamNode(param);
        else if (node.params.name !== param) {
          if (ignoreError)
            return store;
          else
            throw new Error(`Cannot create route "${path}" with parameter "${param}" because a route already exists with a different parameter name ("${node.params.name}") in the same location`);
        }
        const params = node.params;
        if (params.inert === null) {
          node = params.inert = createNode(part);
          continue;
        }
        node = params.inert;
      }
      for (let j = 0;; ) {
        if (j === part.length) {
          if (j < node.part.length) {
            const childNode = cloneNode(node, node.part.slice(j));
            Object.assign(node, createNode(part, [childNode]));
          }
          break;
        }
        if (j === node.part.length) {
          if (node.inert === null)
            node.inert = {};
          const inert = node.inert[part.charCodeAt(j)];
          if (inert) {
            node = inert;
            part = part.slice(j);
            j = 0;
            continue;
          }
          const childNode = createNode(part.slice(j));
          node.inert[part.charCodeAt(j)] = childNode;
          node = childNode;
          break;
        }
        if (part[j] !== node.part[j]) {
          const existingChild = cloneNode(node, node.part.slice(j));
          const newChild = createNode(part.slice(j));
          Object.assign(node, createNode(node.part.slice(0, j), [
            existingChild,
            newChild
          ]));
          node = newChild;
          break;
        }
        ++j;
      }
    }
    if (paramPartsIndex < paramParts.length) {
      const param = paramParts[paramPartsIndex];
      const name = param.slice(1);
      if (node.params === null)
        node.params = createParamNode(name);
      else if (node.params.name !== name) {
        if (ignoreError)
          return store;
        else
          throw new Error(`Cannot create route "${path}" with parameter "${name}" because a route already exists with a different parameter name ("${node.params.name}") in the same location`);
      }
      if (node.params.store === null)
        node.params.store = store;
      return node.params.store;
    }
    if (isWildcard) {
      if (node.wildcardStore === null)
        node.wildcardStore = store;
      return node.wildcardStore;
    }
    if (node.store === null)
      node.store = store;
    return node.store;
  }
  find(method, url) {
    const root = this.root[method];
    if (!root)
      return null;
    return matchRoute(url, url.length, root, 0);
  }
};
var matchRoute = (url, urlLength, node, startIndex) => {
  const part = node.part;
  const length = part.length;
  const endIndex = startIndex + length;
  if (length > 1) {
    if (endIndex > urlLength)
      return null;
    if (length < 15) {
      for (let i = 1, j = startIndex + 1;i < length; ++i, ++j)
        if (part.charCodeAt(i) !== url.charCodeAt(j))
          return null;
    } else if (url.slice(startIndex, endIndex) !== part)
      return null;
  }
  if (endIndex === urlLength) {
    if (node.store !== null)
      return {
        store: node.store,
        params: {}
      };
    if (node.wildcardStore !== null)
      return {
        store: node.wildcardStore,
        params: { "*": "" }
      };
    return null;
  }
  if (node.inert !== null) {
    const inert = node.inert[url.charCodeAt(endIndex)];
    if (inert !== undefined) {
      const route = matchRoute(url, urlLength, inert, endIndex);
      if (route !== null)
        return route;
    }
  }
  if (node.params !== null) {
    const { store, name, inert } = node.params;
    const slashIndex = url.indexOf("/", endIndex);
    if (slashIndex !== endIndex) {
      if (slashIndex === -1 || slashIndex >= urlLength) {
        if (store !== null) {
          const params = {};
          params[name] = url.substring(endIndex, urlLength);
          return {
            store,
            params
          };
        }
      } else if (inert !== null) {
        const route = matchRoute(url, urlLength, inert, slashIndex);
        if (route !== null) {
          route.params[name] = url.substring(endIndex, slashIndex);
          return route;
        }
      }
    }
  }
  if (node.wildcardStore !== null)
    return {
      store: node.wildcardStore,
      params: {
        "*": url.substring(endIndex, urlLength)
      }
    };
  return null;
};
var hasReturn = (fn) => {
  const fnLiteral = typeof fn === "object" ? fn.fn.toString() : typeof fn === "string" ? fn.toString() : fn;
  const parenthesisEnd = fnLiteral.indexOf(")");
  if (fnLiteral.charCodeAt(parenthesisEnd + 2) === 61 && fnLiteral.charCodeAt(parenthesisEnd + 5) !== 123) {
    return true;
  }
  return fnLiteral.includes("return");
};
var separateFunction = (code) => {
  if (code.startsWith("async"))
    code = code.slice(5);
  code = code.trimStart();
  let index = -1;
  if (code.charCodeAt(0) === 40) {
    index = code.indexOf("=>", code.indexOf(")"));
    if (index !== -1) {
      let bracketEndIndex = index;
      while (bracketEndIndex > 0)
        if (code.charCodeAt(--bracketEndIndex) === 41)
          break;
      let body = code.slice(index + 2);
      if (body.charCodeAt(0) === 32)
        body = body.trimStart();
      return [
        code.slice(1, bracketEndIndex),
        body,
        {
          isArrowReturn: body.charCodeAt(0) !== 123
        }
      ];
    }
  }
  if (code.startsWith("function")) {
    index = code.indexOf("(");
    const end = code.indexOf(")");
    return [
      code.slice(index + 1, end),
      code.slice(end + 2),
      {
        isArrowReturn: false
      }
    ];
  }
  const start = code.indexOf("(");
  if (start !== -1) {
    const sep = code.indexOf(`
`, 2);
    const parameter = code.slice(0, sep);
    const end = parameter.lastIndexOf(")") + 1;
    const body = code.slice(sep + 1);
    return [
      parameter.slice(start, end),
      "{" + body,
      {
        isArrowReturn: false
      }
    ];
  }
  const x = code.split(`
`, 2);
  return [x[0], x[1], { isArrowReturn: false }];
};
var bracketPairRange = (parameter) => {
  const start = parameter.indexOf("{");
  if (start === -1)
    return [-1, 0];
  let end = start + 1;
  let deep = 1;
  for (;end < parameter.length; end++) {
    const char = parameter.charCodeAt(end);
    if (char === 123)
      deep++;
    else if (char === 125)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [0, parameter.length];
  return [start, end + 1];
};
var bracketPairRangeReverse = (parameter) => {
  const end = parameter.lastIndexOf("}");
  if (end === -1)
    return [-1, 0];
  let start = end - 1;
  let deep = 1;
  for (;start >= 0; start--) {
    const char = parameter.charCodeAt(start);
    if (char === 125)
      deep++;
    else if (char === 123)
      deep--;
    if (deep === 0)
      break;
  }
  if (deep !== 0)
    return [-1, 0];
  return [start, end + 1];
};
var removeColonAlias = (parameter) => {
  while (true) {
    const start = parameter.indexOf(":");
    if (start === -1)
      break;
    let end = parameter.indexOf(",", start);
    if (end === -1)
      end = parameter.indexOf("}", start) - 1;
    if (end === -2)
      end = parameter.length;
    parameter = parameter.slice(0, start) + parameter.slice(end);
  }
  return parameter;
};
var retrieveRootParamters = (parameter) => {
  let hasParenthesis = false;
  if (parameter.charCodeAt(0) === 40)
    parameter = parameter.slice(1, -1);
  if (parameter.charCodeAt(0) === 123) {
    hasParenthesis = true;
    parameter = parameter.slice(1, -1);
  }
  parameter = parameter.replace(/( |\t|\n)/g, "").trim();
  let parameters3 = [];
  while (true) {
    let [start, end] = bracketPairRange(parameter);
    if (start === -1)
      break;
    parameters3.push(parameter.slice(0, start - 1));
    if (parameter.charCodeAt(end) === 44)
      end++;
    parameter = parameter.slice(end);
  }
  parameter = removeColonAlias(parameter);
  if (parameter)
    parameters3 = parameters3.concat(parameter.split(","));
  const newParameters = [];
  for (const p of parameters3) {
    if (p.indexOf(",") === -1) {
      newParameters.push(p);
      continue;
    }
    for (const q of p.split(","))
      newParameters.push(q.trim());
  }
  parameters3 = newParameters;
  return {
    hasParenthesis,
    parameters: parameters3
  };
};
var findParameterReference = (parameter, inference) => {
  const { parameters: parameters3, hasParenthesis } = retrieveRootParamters(parameter);
  if (!inference.query && parameters3.includes("query"))
    inference.query = true;
  if (!inference.headers && parameters3.includes("headers"))
    inference.headers = true;
  if (!inference.body && parameters3.includes("body"))
    inference.body = true;
  if (!inference.cookie && parameters3.includes("cookie"))
    inference.cookie = true;
  if (!inference.set && parameters3.includes("set"))
    inference.set = true;
  if (!inference.server && parameters3.includes("server"))
    inference.server = true;
  if (hasParenthesis)
    return `{ ${parameters3.join(", ")} }`;
  return parameters3.join(", ");
};
var findEndIndex = (type3, content, index) => {
  const newLineIndex = content.indexOf(type3 + `
`, index);
  const newTabIndex = content.indexOf(type3 + "\t", index);
  const commaIndex = content.indexOf(type3 + ",", index);
  const semicolonIndex = content.indexOf(type3 + ";", index);
  const emptyIndex = content.indexOf(type3 + " ", index);
  return [newLineIndex, newTabIndex, commaIndex, semicolonIndex, emptyIndex].filter((i) => i > 0).sort((a, b) => a - b)[0] || -1;
};
var findAlias = (type3, body, depth = 0) => {
  if (depth > 5)
    return [];
  const aliases = [];
  let content = body;
  while (true) {
    let index = findEndIndex(" = " + type3, content);
    if (index === -1) {
      const lastIndex = content.indexOf(" = " + type3);
      if (lastIndex + 3 + type3.length !== content.length)
        break;
      index = lastIndex;
    }
    const part = content.slice(0, index);
    let variable = part.slice(part.lastIndexOf(" ") + 1);
    if (variable === "}") {
      const [start, end] = bracketPairRangeReverse(part);
      aliases.push(removeColonAlias(content.slice(start, end)));
      content = content.slice(index + 3 + type3.length);
      continue;
    }
    while (variable.charCodeAt(0) === 44)
      variable = variable.slice(1);
    while (variable.charCodeAt(0) === 9)
      variable = variable.slice(1);
    if (!variable.includes("("))
      aliases.push(variable);
    content = content.slice(index + 3 + type3.length);
  }
  for (const alias of aliases) {
    if (alias.charCodeAt(0) === 123)
      continue;
    const deepAlias = findAlias(alias, body);
    if (deepAlias.length > 0)
      aliases.push(...deepAlias);
  }
  return aliases;
};
var extractMainParameter = (parameter) => {
  if (!parameter)
    return;
  if (parameter.charCodeAt(0) !== 123)
    return parameter;
  parameter = parameter.slice(2, -2);
  const hasComma = parameter.includes(",");
  if (!hasComma) {
    if (parameter.includes("..."))
      return parameter.slice(parameter.indexOf("...") + 3);
    return;
  }
  const spreadIndex = parameter.indexOf("...");
  if (spreadIndex === -1)
    return;
  return parameter.slice(spreadIndex + 3).trimEnd();
};
var inferBodyReference = (code, aliases, inference) => {
  const access = (type3, alias) => code.includes(alias + "." + type3) || code.includes(alias + '["' + type3 + '"]') || code.includes(alias + "['" + type3 + "']");
  for (const alias of aliases) {
    if (!alias)
      continue;
    if (alias.charCodeAt(0) === 123) {
      const parameters3 = retrieveRootParamters(alias).parameters;
      if (!inference.query && parameters3.includes("query"))
        inference.query = true;
      if (!inference.headers && parameters3.includes("headers"))
        inference.headers = true;
      if (!inference.body && parameters3.includes("body"))
        inference.body = true;
      if (!inference.cookie && parameters3.includes("cookie"))
        inference.cookie = true;
      if (!inference.set && parameters3.includes("set"))
        inference.set = true;
      if (!inference.query && parameters3.includes("server"))
        inference.server = true;
      continue;
    }
    if (!inference.query && access("query", alias))
      inference.query = true;
    if (code.includes("return " + alias) || code.includes("return " + alias + ".query"))
      inference.query = true;
    if (!inference.headers && access("headers", alias))
      inference.headers = true;
    if (!inference.body && access("body", alias))
      inference.body = true;
    if (!inference.cookie && access("cookie", alias))
      inference.cookie = true;
    if (!inference.set && access("set", alias))
      inference.set = true;
    if (!inference.server && access("server", alias))
      inference.server = true;
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set && inference.server)
      break;
  }
  return aliases;
};
var isContextPassToFunction = (context, body, inference) => {
  try {
    const captureFunction = new RegExp(`(?:\\w)\\((?:.*)?${context}`, "gs");
    captureFunction.test(body);
    const nextChar = body.charCodeAt(captureFunction.lastIndex);
    if (nextChar === 41 || nextChar === 44) {
      inference.query = true;
      inference.headers = true;
      inference.body = true;
      inference.cookie = true;
      inference.set = true;
      inference.server = true;
      return true;
    }
    return false;
  } catch (error22) {
    console.log("[Sucrose] warning: unexpected isContextPassToFunction error, you may continue development as usual but please report the following to maintainers:");
    console.log("--- body ---");
    console.log(body);
    console.log("--- context ---");
    console.log(context);
    return true;
  }
};
var sucrose = (lifeCycle, inference = {
  query: false,
  headers: false,
  body: false,
  cookie: false,
  set: false,
  server: false
}) => {
  const events = [];
  if (lifeCycle.handler && typeof lifeCycle.handler === "function")
    events.push(lifeCycle.handler);
  if (lifeCycle.request?.length)
    events.push(...lifeCycle.request);
  if (lifeCycle.beforeHandle?.length)
    events.push(...lifeCycle.beforeHandle);
  if (lifeCycle.parse?.length)
    events.push(...lifeCycle.parse);
  if (lifeCycle.error?.length)
    events.push(...lifeCycle.error);
  if (lifeCycle.transform?.length)
    events.push(...lifeCycle.transform);
  if (lifeCycle.afterHandle?.length)
    events.push(...lifeCycle.afterHandle);
  if (lifeCycle.mapResponse?.length)
    events.push(...lifeCycle.mapResponse);
  if (lifeCycle.afterResponse?.length)
    events.push(...lifeCycle.afterResponse);
  for (const e of events) {
    if (!e)
      continue;
    const event = "fn" in e ? e.fn : e;
    const [parameter, body, { isArrowReturn }] = separateFunction(event.toString());
    const rootParameters = findParameterReference(parameter, inference);
    const mainParameter = extractMainParameter(rootParameters);
    if (mainParameter) {
      const aliases = findAlias(mainParameter, body);
      aliases.splice(0, -1, mainParameter);
      if (!isContextPassToFunction(mainParameter, body, inference))
        inferBodyReference(body, aliases, inference);
      if (!inference.query && body.includes("return " + mainParameter + ".query"))
        inference.query = true;
    }
    if (inference.query && inference.headers && inference.body && inference.cookie && inference.set && inference.server)
      break;
  }
  return inference;
};
var fullFormats = {
  date: date3,
  time: getTime(true),
  "date-time": getDateTime(true),
  "iso-time": getTime(false),
  "iso-date-time": getDateTime(false),
  duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
  uri,
  "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
  "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
  url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
  email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
  regex,
  uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
  "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
  "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  byte,
  int32: { type: "number", validate: validateInt32 },
  int64: { type: "number", validate: validateInt64 },
  float: { type: "number", validate: validateNumber },
  double: { type: "number", validate: validateNumber },
  password: true,
  binary: true
};
function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}
var DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function date3(str) {
  const matches = DATE.exec(str);
  if (!matches)
    return false;
  const year = +matches[1];
  const month = +matches[2];
  const day = +matches[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
var TIME = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
function getTime(strictTimeZone) {
  return function time(str) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hr = +matches[1];
    const min = +matches[2];
    const sec = +matches[3];
    const tz = matches[4];
    const tzSign = matches[5] === "-" ? -1 : 1;
    const tzH = +(matches[6] || 0);
    const tzM = +(matches[7] || 0);
    if (tzH > 23 || tzM > 59 || strictTimeZone && !tz)
      return false;
    if (hr <= 23 && min <= 59 && sec < 60)
      return true;
    const utcMin = min - tzM * tzSign;
    const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
    return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1) && sec < 61;
  };
}
var DATE_TIME_SEPARATOR = /t|\s/i;
function getDateTime(strictTimeZone) {
  const time = getTime(strictTimeZone);
  return function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date3(dateTime[0]) && time(dateTime[1]);
  };
}
var NOT_URI_FRAGMENT = /\/|:/;
var URI = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function uri(str) {
  return NOT_URI_FRAGMENT.test(str) && URI.test(str);
}
var BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
function byte(str) {
  BYTE.lastIndex = 0;
  return BYTE.test(str);
}
var MIN_INT32 = -(2 ** 31);
var MAX_INT32 = 2 ** 31 - 1;
function validateInt32(value2) {
  return Number.isInteger(value2) && value2 <= MAX_INT32 && value2 >= MIN_INT32;
}
function validateInt64(value2) {
  return Number.isInteger(value2);
}
function validateNumber() {
  return true;
}
var Z_ANCHOR = /[^\\]\\Z/;
function regex(str) {
  if (Z_ANCHOR.test(str))
    return false;
  try {
    new RegExp(str);
    return true;
  } catch (e) {
    return false;
  }
}
var isISO8601 = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/;
var isFormalDate = /(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\s(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{2}\s\d{4}\s\d{2}:\d{2}:\d{2}\sGMT(?:\+|-)\d{4}\s\([^)]+\)/;
var isShortenDate = /^(?:(?:(?:(?:0?[1-9]|[12][0-9]|3[01])[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:19|20)\d{2})|(?:(?:19|20)\d{2}[/\s-](?:0?[1-9]|1[0-2])[/\s-](?:0?[1-9]|[12][0-9]|3[01]))))(?:\s(?:1[012]|0?[1-9]):[0-5][0-9](?::[0-5][0-9])?(?:\s[AP]M)?)?$/;
var _validateDate = fullFormats.date;
var _validateDateTime = fullFormats["date-time"];
if (!exports_format.Has("date"))
  TypeSystem.Format("date", (value2) => {
    const temp = value2.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDate(temp)) {
      const date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
if (!exports_format.Has("date-time"))
  TypeSystem.Format("date-time", (value2) => {
    const temp = value2.replace(/"/g, "");
    if (isISO8601.test(temp) || isFormalDate.test(temp) || isShortenDate.test(temp) || _validateDateTime(temp)) {
      const date22 = new Date(temp);
      if (!Number.isNaN(date22.getTime()))
        return true;
    }
    return false;
  });
Object.entries(fullFormats).forEach((formatEntry) => {
  const [formatName, formatValue] = formatEntry;
  if (!exports_format.Has(formatName)) {
    if (formatValue instanceof RegExp)
      TypeSystem.Format(formatName, (value2) => formatValue.test(value2));
    else if (typeof formatValue === "function")
      TypeSystem.Format(formatName, formatValue);
  }
});
var t = Object.assign({}, Type);
var parseFileUnit = (size) => {
  if (typeof size === "string")
    switch (size.slice(-1)) {
      case "k":
        return +size.slice(0, size.length - 1) * 1024;
      case "m":
        return +size.slice(0, size.length - 1) * 1048576;
      default:
        return +size;
    }
  return size;
};
var validateFile = (options, value2) => {
  if (!(value2 instanceof Blob))
    return false;
  if (options.minSize && value2.size < parseFileUnit(options.minSize))
    return false;
  if (options.maxSize && value2.size > parseFileUnit(options.maxSize))
    return false;
  if (options.extension)
    if (typeof options.extension === "string") {
      if (!value2.type.startsWith(options.extension))
        return false;
    } else {
      for (let i = 0;i < options.extension.length; i++)
        if (value2.type.startsWith(options.extension[i]))
          return true;
      return false;
    }
  return true;
};
var File2 = exports_type.Get("Files") ?? TypeSystem.Type("File", validateFile);
var Files = exports_type.Get("Files") ?? TypeSystem.Type("Files", (options, value2) => {
  if (!Array.isArray(value2))
    return validateFile(options, value2);
  if (options.minItems && value2.length < options.minItems)
    return false;
  if (options.maxItems && value2.length > options.maxItems)
    return false;
  for (let i = 0;i < value2.length; i++)
    if (!validateFile(options, value2[i]))
      return false;
  return true;
});
if (!exports_format.Has("numeric"))
  exports_format.Set("numeric", (value2) => !!value2 && !isNaN(+value2));
if (!exports_format.Has("boolean"))
  exports_format.Set("boolean", (value2) => value2 === "true" || value2 === "false");
if (!exports_format.Has("ObjectString"))
  exports_format.Set("ObjectString", (value2) => {
    let start = value2.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value2.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value2);
      return true;
    } catch {
      return false;
    }
  });
if (!exports_format.Has("ArrayString"))
  exports_format.Set("ArrayString", (value2) => {
    let start = value2.charCodeAt(0);
    if (start === 9 || start === 10 || start === 32)
      start = value2.trimStart().charCodeAt(0);
    if (start !== 123 && start !== 91)
      return false;
    try {
      JSON.parse(value2);
      return true;
    } catch {
      return false;
    }
  });
exports_type.Set("UnionEnum", (schema3, value2) => {
  return (typeof value2 === "number" || typeof value2 === "string" || value2 === null) && schema3.enum.includes(value2);
});
var ElysiaType = {
  Numeric: (property) => {
    const schema3 = Type.Number(property);
    return t.Transform(t.Union([
      t.String({
        format: "numeric",
        default: 0
      }),
      t.Number(property)
    ], property)).Decode((value2) => {
      const number3 = +value2;
      if (isNaN(number3))
        return value2;
      if (property && !exports_value2.Check(schema3, number3))
        throw new ValidationError("property", schema3, number3);
      return number3;
    }).Encode((value2) => value2);
  },
  Date: (property) => {
    const schema3 = Type.Date(property);
    return t.Transform(t.Union([
      Type.Date(property),
      t.String({
        format: "date",
        default: (/* @__PURE__ */ new Date()).toISOString()
      }),
      t.String({
        format: "date-time",
        default: (/* @__PURE__ */ new Date()).toISOString()
      })
    ], property)).Decode((value2) => {
      if (value2 instanceof Date)
        return value2;
      const date22 = new Date(value2);
      if (!exports_value2.Check(schema3, date22))
        throw new ValidationError("property", schema3, date22);
      return date22;
    }).Encode((value2) => {
      if (typeof value2 === "string")
        return new Date(value2);
      return value2;
    });
  },
  BooleanString: (property) => {
    const schema3 = Type.Boolean(property);
    return t.Transform(t.Union([
      t.Boolean(property),
      t.String({
        format: "boolean",
        default: false
      })
    ], property)).Decode((value2) => {
      if (typeof value2 === "string")
        return value2 === "true";
      if (property && !exports_value2.Check(schema3, value2))
        throw new ValidationError("property", schema3, value2);
      return value2;
    }).Encode((value2) => value2);
  },
  ObjectString: (properties, options) => {
    const schema3 = t.Object(properties, options);
    const defaultValue = JSON.stringify(exports_value2.Create(schema3));
    let compiler2;
    try {
      compiler2 = TypeCompiler.Compile(schema3);
    } catch {
    }
    return t.Transform(t.Union([
      t.String({
        format: "ObjectString",
        default: defaultValue
      }),
      schema3
    ])).Decode((value2) => {
      if (typeof value2 === "string") {
        if (value2.charCodeAt(0) !== 123)
          throw new ValidationError("property", schema3, value2);
        try {
          value2 = JSON.parse(value2);
        } catch {
          throw new ValidationError("property", schema3, value2);
        }
        if (compiler2) {
          if (!compiler2.Check(value2))
            throw new ValidationError("property", schema3, value2);
          return compiler2.Decode(value2);
        }
        if (!exports_value2.Check(schema3, value2))
          throw new ValidationError("property", schema3, value2);
        return exports_value2.Decode(schema3, value2);
      }
      return value2;
    }).Encode((value2) => {
      if (typeof value2 === "string")
        try {
          value2 = JSON.parse(value2);
        } catch {
          throw new ValidationError("property", schema3, value2);
        }
      if (!exports_value2.Check(schema3, value2))
        throw new ValidationError("property", schema3, value2);
      return JSON.stringify(value2);
    });
  },
  ArrayString: (children = {}, options) => {
    const schema3 = t.Array(children, options);
    const defaultValue = JSON.stringify(exports_value2.Create(schema3));
    let compiler2;
    try {
      compiler2 = TypeCompiler.Compile(schema3);
    } catch {
    }
    return t.Transform(t.Union([
      t.String({
        format: "ArrayString",
        default: defaultValue
      }),
      schema3
    ])).Decode((value2) => {
      if (typeof value2 === "string") {
        if (value2.charCodeAt(0) !== 91)
          throw new ValidationError("property", schema3, value2);
        try {
          value2 = JSON.parse(value2);
        } catch {
          throw new ValidationError("property", schema3, value2);
        }
        if (compiler2) {
          if (!compiler2.Check(value2))
            throw new ValidationError("property", schema3, value2);
          return compiler2.Decode(value2);
        }
        if (!exports_value2.Check(schema3, value2))
          throw new ValidationError("property", schema3, value2);
        return exports_value2.Decode(schema3, value2);
      }
      return value2;
    }).Encode((value2) => {
      if (typeof value2 === "string")
        try {
          value2 = JSON.parse(value2);
        } catch {
          throw new ValidationError("property", schema3, value2);
        }
      if (!exports_value2.Check(schema3, value2))
        throw new ValidationError("property", schema3, value2);
      return JSON.stringify(value2);
    });
  },
  File: File2,
  Files: (options = {}) => t.Transform(Files(options)).Decode((value2) => {
    if (Array.isArray(value2))
      return value2;
    return [value2];
  }).Encode((value2) => value2),
  Nullable: (schema3) => t.Union([schema3, t.Null()]),
  MaybeEmpty: (schema3) => t.Union([schema3, t.Null(), t.Undefined()]),
  Cookie: (properties, {
    domain,
    expires,
    httpOnly,
    maxAge,
    path,
    priority,
    sameSite,
    secure,
    secrets,
    sign,
    ...options
  } = {}) => {
    const v = t.Object(properties, options);
    v.config = {
      domain,
      expires,
      httpOnly,
      maxAge,
      path,
      priority,
      sameSite,
      secure,
      secrets,
      sign
    };
    return v;
  },
  UnionEnum: (values, options = {}) => {
    const type3 = values.every((value2) => typeof value2 === "string") ? { type: "string" } : values.every((value2) => typeof value2 === "number") ? { type: "number" } : values.every((value2) => value2 === null) ? { type: "null" } : {};
    if (values.some((x) => typeof x === "object" && x !== null))
      throw new Error("This type does not support objects or arrays");
    return {
      default: values[0],
      ...options,
      [Kind]: "UnionEnum",
      ...type3,
      enum: values
    };
  }
};
t.BooleanString = ElysiaType.BooleanString;
t.ObjectString = ElysiaType.ObjectString;
t.ArrayString = ElysiaType.ArrayString;
t.Numeric = ElysiaType.Numeric;
t.File = (arg = {}) => ElysiaType.File({
  default: "File",
  ...arg,
  extension: arg?.type,
  type: "string",
  format: "binary"
});
t.Files = (arg = {}) => ElysiaType.Files({
  ...arg,
  elysiaMeta: "Files",
  default: "Files",
  extension: arg?.type,
  type: "array",
  items: {
    ...arg,
    default: "Files",
    type: "string",
    format: "binary"
  }
});
t.Nullable = (schema3) => ElysiaType.Nullable(schema3);
t.MaybeEmpty = ElysiaType.MaybeEmpty;
t.Cookie = ElysiaType.Cookie;
t.Date = ElysiaType.Date;
t.UnionEnum = ElysiaType.UnionEnum;
var Cookie = class {
  constructor(name, jar, initial = {}) {
    this.name = name;
    this.jar = jar;
    this.initial = initial;
  }
  get cookie() {
    return this.jar[this.name] ?? this.initial;
  }
  set cookie(jar) {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    this.jar[this.name] = jar;
  }
  get setCookie() {
    if (!(this.name in this.jar))
      this.jar[this.name] = this.initial;
    return this.jar[this.name];
  }
  set setCookie(jar) {
    this.cookie = jar;
  }
  get value() {
    return this.cookie.value;
  }
  set value(value2) {
    this.setCookie.value = value2;
  }
  get expires() {
    return this.cookie.expires;
  }
  set expires(expires) {
    this.setCookie.expires = expires;
  }
  get maxAge() {
    return this.cookie.maxAge;
  }
  set maxAge(maxAge) {
    this.setCookie.maxAge = maxAge;
  }
  get domain() {
    return this.cookie.domain;
  }
  set domain(domain) {
    this.setCookie.domain = domain;
  }
  get path() {
    return this.cookie.path;
  }
  set path(path) {
    this.setCookie.path = path;
  }
  get secure() {
    return this.cookie.secure;
  }
  set secure(secure) {
    this.setCookie.secure = secure;
  }
  get httpOnly() {
    return this.cookie.httpOnly;
  }
  set httpOnly(httpOnly) {
    this.setCookie.httpOnly = httpOnly;
  }
  get sameSite() {
    return this.cookie.sameSite;
  }
  set sameSite(sameSite) {
    this.setCookie.sameSite = sameSite;
  }
  get priority() {
    return this.cookie.priority;
  }
  set priority(priority) {
    this.setCookie.priority = priority;
  }
  get partitioned() {
    return this.cookie.partitioned;
  }
  set partitioned(partitioned) {
    this.setCookie.partitioned = partitioned;
  }
  get secrets() {
    return this.cookie.secrets;
  }
  set secrets(secrets) {
    this.setCookie.secrets = secrets;
  }
  update(config) {
    this.setCookie = Object.assign(this.cookie, typeof config === "function" ? config(this.cookie) : config);
    return this;
  }
  set(config) {
    this.setCookie = Object.assign({
      ...this.initial,
      value: this.value
    }, typeof config === "function" ? config(this.cookie) : config);
    return this;
  }
  remove() {
    if (this.value === undefined)
      return;
    this.set({
      expires: /* @__PURE__ */ new Date(0),
      maxAge: 0,
      value: ""
    });
    return this;
  }
  toString() {
    return typeof this.value === "object" ? JSON.stringify(this.value) : this.value?.toString() ?? "";
  }
};
var createCookieJar = (set22, store, initial) => {
  if (!set22.cookie)
    set22.cookie = {};
  return new Proxy(store, {
    get(_, key) {
      if (key in store)
        return new Cookie(key, set22.cookie, Object.assign({}, initial ?? {}, store[key]));
      return new Cookie(key, set22.cookie, Object.assign({}, initial));
    }
  });
};
var parseCookie = async (set22, cookieString, {
  secrets,
  sign,
  ...initial
} = {}) => {
  if (!cookieString)
    return createCookieJar(set22, {}, initial);
  const isStringKey = typeof secrets === "string";
  if (sign && sign !== true && !Array.isArray(sign))
    sign = [sign];
  const jar = {};
  const cookies = import_cookie2.parse(cookieString);
  for (const [name, v] of Object.entries(cookies)) {
    let value2 = import_fast_decode_uri_component.default(v);
    if (sign === true || sign?.includes(name)) {
      if (!secrets)
        throw new Error("No secret is provided to cookie plugin");
      if (isStringKey) {
        const temp = await unsignCookie(value2, secrets);
        if (temp === false)
          throw new InvalidCookieSignature(name);
        value2 = temp;
      } else {
        let decoded = true;
        for (let i = 0;i < secrets.length; i++) {
          const temp = await unsignCookie(value2, secrets[i]);
          if (temp !== false) {
            decoded = true;
            value2 = temp;
            break;
          }
        }
        if (!decoded)
          throw new InvalidCookieSignature(name);
      }
    }
    jar[name] = {
      value: value2
    };
  }
  return createCookieJar(set22, jar, initial);
};
var hasHeaderShorthand = "toJSON" in new Headers;
var isNotEmpty = (obj) => {
  if (!obj)
    return false;
  for (const x in obj)
    return true;
  return false;
};
var handleFile = (response, set22) => {
  const size = response.size;
  if (!set22 && size || size && set22 && set22.status !== 206 && set22.status !== 304 && set22.status !== 412 && set22.status !== 416) {
    if (set22 && isNotEmpty(set22.headers)) {
      if (set22.headers instanceof Headers) {
        if (hasHeaderShorthand)
          set22.headers = set22.headers.toJSON();
        else
          for (const [key, value2] of set22.headers.entries())
            if (key in set22.headers)
              set22.headers[key] = value2;
      }
      return new Response(response, {
        status: set22.status,
        headers: Object.assign({
          "accept-ranges": "bytes",
          "content-range": `bytes 0-${size - 1}/${size}`
        }, set22.headers)
      });
    }
    return new Response(response, {
      headers: {
        "accept-ranges": "bytes",
        "content-range": `bytes 0-${size - 1}/${size}`,
        "transfer-encoding": "chunked"
      }
    });
  }
  return new Response(response);
};
var parseSetCookies = (headers, setCookie) => {
  if (!headers)
    return headers;
  headers.delete("set-cookie");
  for (let i = 0;i < setCookie.length; i++) {
    const index = setCookie[i].indexOf("=");
    headers.append("set-cookie", `${setCookie[i].slice(0, index)}=${setCookie[i].slice(index + 1) || ""}`);
  }
  return headers;
};
var serializeCookie = (cookies) => {
  if (!cookies || !isNotEmpty(cookies))
    return;
  const set22 = [];
  for (const [key, property] of Object.entries(cookies)) {
    if (!key || !property)
      continue;
    const value2 = property.value;
    if (value2 === undefined || value2 === null)
      continue;
    set22.push(import_cookie.serialize(key, typeof value2 === "object" ? JSON.stringify(value2) : value2 + "", property));
  }
  if (set22.length === 0)
    return;
  if (set22.length === 1)
    return set22[0];
  return set22;
};
var handleStream = async (generator, set22, request) => {
  let init = generator.next();
  if (init instanceof Promise)
    init = await init;
  if (init.done) {
    if (set22)
      return mapResponse(init.value, set22, request);
    return mapCompactResponse(init.value, request);
  }
  return new Response(new ReadableStream({
    async start(controller) {
      let end = false;
      request?.signal.addEventListener("abort", () => {
        end = true;
        try {
          controller.close();
        } catch {
        }
      });
      if (init.value !== undefined && init.value !== null) {
        if (typeof init.value === "object")
          try {
            controller.enqueue(Buffer.from(JSON.stringify(init.value)));
          } catch {
            controller.enqueue(Buffer.from(init.value.toString()));
          }
        else
          controller.enqueue(Buffer.from(init.value.toString()));
      }
      for await (const chunk of generator) {
        if (end)
          break;
        if (chunk === undefined || chunk === null)
          continue;
        if (typeof chunk === "object")
          try {
            controller.enqueue(Buffer.from(JSON.stringify(chunk)));
          } catch {
            controller.enqueue(Buffer.from(chunk.toString()));
          }
        else
          controller.enqueue(Buffer.from(chunk.toString()));
        await new Promise((resolve) => setTimeout(() => resolve(), 0));
      }
      try {
        controller.close();
      } catch {
      }
    }
  }), {
    ...set22,
    headers: {
      "transfer-encoding": "chunked",
      "content-type": "text/event-stream; charset=utf-8",
      ...set22?.headers
    }
  });
};
async function* streamResponse(response) {
  const body = response.body;
  if (!body)
    return;
  const reader = body.getReader();
  const decoder = new TextDecoder;
  try {
    while (true) {
      const { done, value: value2 } = await reader.read();
      if (done)
        break;
      yield decoder.decode(value2);
    }
  } finally {
    reader.releaseLock();
  }
}
var mapResponse = (response, set22, request) => {
  if (isNotEmpty(set22.headers) || set22.status !== 200 || set22.redirect || set22.cookie) {
    if (typeof set22.status === "string")
      set22.status = StatusMap[set22.status];
    if (set22.redirect) {
      set22.headers.Location = set22.redirect;
      if (!set22.status || set22.status < 300 || set22.status >= 400)
        set22.status = 302;
    }
    if (set22.cookie && isNotEmpty(set22.cookie)) {
      const cookie = serializeCookie(set22.cookie);
      if (cookie)
        set22.headers["set-cookie"] = cookie;
    }
    if (set22.headers["set-cookie"] && Array.isArray(set22.headers["set-cookie"])) {
      set22.headers = parseSetCookies(new Headers(set22.headers), set22.headers["set-cookie"]);
    }
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set22);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response, set22);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        set22.status = response.code;
        return mapResponse(response.response, set22, request);
      case "ReadableStream":
        if (!set22.headers["content-type"]?.startsWith("text/event-stream"))
          set22.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, set22);
      case undefined:
        if (!response)
          return new Response("", set22);
        return Response.json(response, set22);
      case "Response":
        let isCookieSet = false;
        if (set22.headers instanceof Headers)
          for (const key of set22.headers.keys()) {
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (const cookie of set22.headers.getSetCookie()) {
                response.headers.append("set-cookie", cookie);
              }
            } else
              response.headers.append(key, set22.headers?.get(key) ?? "");
          }
        else
          for (const key in set22.headers)
            response.headers.append(key, set22.headers[key]);
        if (response.status !== set22.status)
          set22.status = response.status;
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response), set22, request);
        return response;
      case "Error":
        return errorToResponse(response, set22);
      case "Promise":
        return response.then((x) => mapResponse(x, set22));
      case "Function":
        return mapResponse(response(), set22);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set22);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      case "FormData":
        return new Response(response, set22);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set22.headers instanceof Headers)
            for (const key of set22.headers.keys()) {
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (const cookie of set22.headers.getSetCookie()) {
                  response.headers.append("set-cookie", cookie);
                }
              } else
                response.headers.append(key, set22.headers?.get(key) ?? "");
            }
          else
            for (const key in set22.headers)
              response.headers.append(key, set22.headers[key]);
          if (hasHeaderShorthand)
            set22.headers = response.headers.toJSON();
          else
            for (const [key, value2] of response.headers.entries())
              if (key in set22.headers)
                set22.headers[key] = value2;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse) {
          set22.status = response.code;
          return mapResponse(response.response, set22, request);
        }
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response, set22);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        set22.status = response.code;
        return mapResponse(response.response, set22, request);
      case "ReadableStream":
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response), set22, request);
        return response;
      case "Error":
        return errorToResponse(response, set22);
      case "Promise":
        return response.then((x) => {
          const r = mapCompactResponse(x, request);
          if (r !== undefined)
            return r;
          return new Response("");
        });
      case "Function":
        return mapCompactResponse(response(), request);
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      case "FormData":
        return new Response(response, set22);
      default:
        if (response instanceof Response)
          return response;
        if (response instanceof Promise)
          return response.then((x) => mapResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse) {
          set22.status = response.code;
          return mapResponse(response.response, set22, request);
        }
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response);
    }
};
var mapEarlyResponse = (response, set22, request) => {
  if (response === undefined || response === null)
    return;
  if (isNotEmpty(set22.headers) || set22.status !== 200 || set22.redirect || set22.cookie) {
    if (typeof set22.status === "string")
      set22.status = StatusMap[set22.status];
    if (set22.redirect) {
      set22.headers.Location = set22.redirect;
      if (!set22.status || set22.status < 300 || set22.status >= 400)
        set22.status = 302;
    }
    if (set22.cookie && isNotEmpty(set22.cookie)) {
      const cookie = serializeCookie(set22.cookie);
      if (cookie)
        set22.headers["set-cookie"] = cookie;
    }
    if (set22.headers["set-cookie"] && Array.isArray(set22.headers["set-cookie"]))
      set22.headers = parseSetCookies(new Headers(set22.headers), set22.headers["set-cookie"]);
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response, set22);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response, set22);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        set22.status = response.code;
        return mapEarlyResponse(response.response, set22, request);
      case "ReadableStream":
        if (!set22.headers["content-type"]?.startsWith("text/event-stream"))
          set22.headers["content-type"] = "text/event-stream; charset=utf-8";
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, set22);
      case undefined:
        if (!response)
          return;
        return Response.json(response, set22);
      case "Response":
        let isCookieSet = false;
        if (set22.headers instanceof Headers)
          for (const key of set22.headers.keys()) {
            if (key === "set-cookie") {
              if (isCookieSet)
                continue;
              isCookieSet = true;
              for (const cookie of set22.headers.getSetCookie()) {
                response.headers.append("set-cookie", cookie);
              }
            } else
              response.headers.append(key, set22.headers?.get(key) ?? "");
          }
        else
          for (const key in set22.headers)
            response.headers.append(key, set22.headers[key]);
        if (response.status !== set22.status)
          set22.status = response.status;
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response), set22, request);
        return response;
      case "Promise":
        return response.then((x) => {
          const r = mapEarlyResponse(x, set22);
          if (r !== undefined)
            return r;
        });
      case "Error":
        return errorToResponse(response, set22);
      case "Function":
        return mapEarlyResponse(response(), set22);
      case "Number":
      case "Boolean":
        return new Response(response.toString(), set22);
      case "FormData":
        return new Response(response);
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      default:
        if (response instanceof Response) {
          let isCookieSet2 = false;
          if (set22.headers instanceof Headers)
            for (const key of set22.headers.keys()) {
              if (key === "set-cookie") {
                if (isCookieSet2)
                  continue;
                isCookieSet2 = true;
                for (const cookie of set22.headers.getSetCookie()) {
                  response.headers.append("set-cookie", cookie);
                }
              } else
                response.headers.append(key, set22.headers?.get(key) ?? "");
            }
          else
            for (const key in set22.headers)
              response.headers.append(key, set22.headers[key]);
          if (response.status !== set22.status)
            set22.status = response.status;
          return response;
        }
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse) {
          set22.status = response.code;
          return mapEarlyResponse(response.response, set22, request);
        }
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapEarlyResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapEarlyResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response, set22);
    }
  } else
    switch (response?.constructor?.name) {
      case "String":
        return new Response(response);
      case "Blob":
        return handleFile(response, set22);
      case "Array":
        return Response.json(response);
      case "Object":
        return Response.json(response, set22);
      case "ElysiaCustomStatusResponse":
        set22.status = response.code;
        return mapEarlyResponse(response.response, set22, request);
      case "ReadableStream":
        request?.signal.addEventListener("abort", {
          handleEvent() {
            if (!request?.signal.aborted)
              response.cancel(request);
          }
        }, {
          once: true
        });
        return new Response(response, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8"
          }
        });
      case undefined:
        if (!response)
          return new Response("");
        return new Response(JSON.stringify(response), {
          headers: {
            "content-type": "application/json"
          }
        });
      case "Response":
        if (response.headers.get("transfer-encoding") === "chunked")
          return handleStream(streamResponse(response));
        return response;
      case "Promise":
        return response.then((x) => {
          const r = mapEarlyResponse(x, set22);
          if (r !== undefined)
            return r;
        });
      case "Error":
        return errorToResponse(response, set22);
      case "Function":
        return mapCompactResponse(response(), request);
      case "Number":
      case "Boolean":
        return new Response(response.toString());
      case "Cookie":
        if (response instanceof Cookie)
          return new Response(response.value, set22);
        return new Response(response?.toString(), set22);
      case "FormData":
        return new Response(response);
      default:
        if (response instanceof Response)
          return response;
        if (response instanceof Promise)
          return response.then((x) => mapEarlyResponse(x, set22));
        if (response instanceof Error)
          return errorToResponse(response, set22);
        if (response instanceof ElysiaCustomStatusResponse) {
          set22.status = response.code;
          return mapEarlyResponse(response.response, set22, request);
        }
        if (typeof response?.next === "function")
          return handleStream(response, set22, request);
        if (typeof response?.then === "function")
          return response.then((x) => mapEarlyResponse(x, set22));
        if (typeof response?.toResponse === "function")
          return mapEarlyResponse(response.toResponse(), set22);
        if ("charCodeAt" in response) {
          const code = response.charCodeAt(0);
          if (code === 123 || code === 91) {
            if (!set22.headers["Content-Type"])
              set22.headers["Content-Type"] = "application/json";
            return new Response(JSON.stringify(response), set22);
          }
        }
        return new Response(response);
    }
};
var mapCompactResponse = (response, request) => {
  switch (response?.constructor?.name) {
    case "String":
      return new Response(response);
    case "Blob":
      return handleFile(response);
    case "Array":
      return Response.json(response);
    case "Object":
      return Response.json(response);
    case "ElysiaCustomStatusResponse":
      return mapResponse(response.response, {
        status: response.code,
        headers: {}
      });
    case "ReadableStream":
      request?.signal.addEventListener("abort", {
        handleEvent() {
          if (!request?.signal.aborted)
            response.cancel(request);
        }
      }, {
        once: true
      });
      return new Response(response, {
        headers: {
          "Content-Type": "text/event-stream; charset=utf-8"
        }
      });
    case undefined:
      if (!response)
        return new Response("");
      return new Response(JSON.stringify(response), {
        headers: {
          "content-type": "application/json"
        }
      });
    case "Response":
      if (response.headers.get("transfer-encoding") === "chunked")
        return handleStream(streamResponse(response));
      return response;
    case "Error":
      return errorToResponse(response);
    case "Promise":
      return response.then((x) => mapCompactResponse(x, request));
    case "Function":
      return mapCompactResponse(response(), request);
    case "Number":
    case "Boolean":
      return new Response(response.toString());
    case "FormData":
      return new Response(response);
    default:
      if (response instanceof Response)
        return response;
      if (response instanceof Promise)
        return response.then((x) => mapCompactResponse(x, request));
      if (response instanceof Error)
        return errorToResponse(response);
      if (response instanceof ElysiaCustomStatusResponse)
        return mapResponse(response.response, {
          status: response.code,
          headers: {}
        });
      if (typeof response?.next === "function")
        return handleStream(response, undefined, request);
      if (typeof response?.then === "function")
        return response.then((x) => mapResponse(x, set));
      if (typeof response?.toResponse === "function")
        return mapCompactResponse(response.toResponse());
      if ("charCodeAt" in response) {
        const code = response.charCodeAt(0);
        if (code === 123 || code === 91) {
          return new Response(JSON.stringify(response), {
            headers: {
              "Content-Type": "application/json"
            }
          });
        }
      }
      return new Response(response);
  }
};
var errorToResponse = (error22, set22) => new Response(JSON.stringify({
  name: error22?.name,
  message: error22?.message,
  cause: error22?.cause
}), {
  status: set22?.status !== 200 ? set22?.status ?? 500 : 500,
  headers: set22?.headers
});
var createStaticHandler = (handle, hooks, setHeaders = {}) => {
  if (typeof handle === "function")
    return;
  const response = mapResponse(handle, {
    headers: setHeaders
  });
  if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0)
    return response.clone.bind(response);
};
var createNativeStaticHandler = (handle, hooks, setHeaders = {}) => {
  if (typeof handle === "function" || handle instanceof Blob)
    return;
  const response = mapResponse(handle, {
    headers: setHeaders
  });
  if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0) {
    if (!response.headers.has("content-type"))
      response.headers.append("content-type", "text/plain;charset=utf-8");
    return response.clone.bind(response);
  }
};
var replaceUrlPath = (url, pathname) => {
  const urlObject = new URL(url);
  urlObject.pathname = pathname;
  return urlObject.toString();
};
var isClass = (v) => typeof v === "function" && /^\s*class\s+/.test(v.toString()) || v.toString().startsWith("[object ") && v.toString() !== "[object Object]" || isNotEmpty(Object.getPrototypeOf(v));
var isObject = (item) => item && typeof item === "object" && !Array.isArray(item);
var mergeDeep = (target, source, {
  skipKeys,
  override = true
} = {}) => {
  if (!isObject(target) || !isObject(source))
    return target;
  for (const [key, value2] of Object.entries(source)) {
    if (skipKeys?.includes(key))
      continue;
    if (!isObject(value2) || !(key in target) || isClass(value2)) {
      if (override || !(key in target))
        target[key] = value2;
      continue;
    }
    target[key] = mergeDeep(target[key], value2, { skipKeys, override });
  }
  return target;
};
var mergeCookie = (a, b) => {
  const { properties: _, ...target } = a ?? {};
  const { properties: __, ...source } = b ?? {};
  return mergeDeep(target, source);
};
var mergeObjectArray = (a = [], b = []) => {
  if (!a)
    return [];
  if (!b)
    return a;
  const array3 = [];
  const checksums = [];
  if (!Array.isArray(a))
    a = [a];
  if (!Array.isArray(b))
    b = [b];
  for (const item of a) {
    array3.push(item);
    if (item.checksum)
      checksums.push(item.checksum);
  }
  for (const item of b)
    if (!checksums.includes(item.checksum))
      array3.push(item);
  return array3;
};
var primitiveHooks = [
  "start",
  "request",
  "parse",
  "transform",
  "resolve",
  "beforeHandle",
  "afterHandle",
  "mapResponse",
  "afterResponse",
  "trace",
  "error",
  "stop",
  "body",
  "headers",
  "params",
  "query",
  "response",
  "type",
  "detail"
];
var primitiveHookMap = primitiveHooks.reduce((acc, x) => (acc[x] = true, acc), {});
var mergeResponse = (a, b) => {
  const isRecordNumber = (x) => typeof x === "object" && Object.keys(x).every(isNumericString);
  if (isRecordNumber(a) && isRecordNumber(b))
    return { ...a, ...b };
  else if (a && !isRecordNumber(a) && isRecordNumber(b))
    return { 200: a, ...b };
  return b ?? a;
};
var mergeSchemaValidator = (a, b) => {
  return {
    body: b?.body ?? a?.body,
    headers: b?.headers ?? a?.headers,
    params: b?.params ?? a?.params,
    query: b?.query ?? a?.query,
    cookie: b?.cookie ?? a?.cookie,
    response: mergeResponse(a?.response, b?.response)
  };
};
var mergeHook = (a, b) => {
  return {
    ...a,
    ...b,
    body: b?.body ?? a?.body,
    headers: b?.headers ?? a?.headers,
    params: b?.params ?? a?.params,
    query: b?.query ?? a?.query,
    cookie: b?.cookie ?? a?.cookie,
    response: mergeResponse(a?.response, b?.response),
    type: a?.type || b?.type,
    detail: mergeDeep(b?.detail ?? {}, a?.detail ?? {}),
    parse: mergeObjectArray(a?.parse, b?.parse),
    transform: mergeObjectArray(a?.transform, b?.transform),
    beforeHandle: mergeObjectArray(a?.beforeHandle, b?.beforeHandle),
    afterHandle: mergeObjectArray(a?.afterHandle, b?.afterHandle),
    mapResponse: mergeObjectArray(a?.mapResponse, b?.mapResponse),
    afterResponse: mergeObjectArray(a?.afterResponse, b?.afterResponse),
    trace: mergeObjectArray(a?.trace, b?.trace),
    error: mergeObjectArray(a?.error, b?.error)
  };
};
var replaceSchemaType = (schema3, options, root = true) => {
  if (!Array.isArray(options))
    return _replaceSchemaType(schema3, options, root);
  for (const option of options)
    schema3 = _replaceSchemaType(schema3, option, root);
  return schema3;
};
var _replaceSchemaType = (schema3, options, root = true) => {
  if (!schema3)
    return schema3;
  if (options.untilObjectFound && !root && schema3.type === "object")
    return schema3;
  const fromSymbol = options.from[Kind];
  if (schema3.oneOf) {
    for (let i = 0;i < schema3.oneOf.length; i++)
      schema3.oneOf[i] = _replaceSchemaType(schema3.oneOf[i], options, root);
    return schema3;
  }
  if (schema3.anyOf) {
    for (let i = 0;i < schema3.anyOf.length; i++)
      schema3.anyOf[i] = _replaceSchemaType(schema3.anyOf[i], options, root);
    return schema3;
  }
  if (schema3.allOf) {
    for (let i = 0;i < schema3.allOf.length; i++)
      schema3.allOf[i] = _replaceSchemaType(schema3.allOf[i], options, root);
    return schema3;
  }
  if (schema3.not) {
    for (let i = 0;i < schema3.not.length; i++)
      schema3.not[i] = _replaceSchemaType(schema3.not[i], options, root);
    return schema3;
  }
  const isRoot = root && !!options.excludeRoot;
  if (schema3[Kind] === fromSymbol) {
    const { anyOf, oneOf, allOf, not: not3, properties: properties2, items, ...rest3 } = schema3;
    const to = options.to(rest3);
    let transform4;
    const composeProperties = (v) => {
      if (properties2 && v.type === "object") {
        const newProperties = {};
        for (const [key, value22] of Object.entries(properties2))
          newProperties[key] = _replaceSchemaType(value22, options, false);
        return {
          ...rest3,
          ...v,
          properties: newProperties
        };
      }
      if (items && v.type === "array")
        return {
          ...rest3,
          ...v,
          items: _replaceSchemaType(items, options, false)
        };
      const value2 = {
        ...rest3,
        ...v
      };
      delete value2["required"];
      if (properties2 && v.type === "string" && v.format === "ObjectString" && v.default === "{}") {
        transform4 = t.ObjectString(properties2, rest3);
        value2.default = JSON.stringify(exports_value2.Create(t.Object(properties2)));
        value2.properties = properties2;
      }
      if (items && v.type === "string" && v.format === "ArrayString" && v.default === "[]") {
        transform4 = t.ArrayString(items, rest3);
        value2.default = JSON.stringify(exports_value2.Create(t.Array(items)));
        value2.items = items;
      }
      return value2;
    };
    if (isRoot) {
      if (properties2) {
        const newProperties = {};
        for (const [key, value2] of Object.entries(properties2))
          newProperties[key] = _replaceSchemaType(value2, options, false);
        return {
          ...rest3,
          properties: newProperties
        };
      } else if (items?.map)
        return {
          ...rest3,
          items: items.map((v) => _replaceSchemaType(v, options, false))
        };
      return rest3;
    }
    if (to.anyOf)
      for (let i = 0;i < to.anyOf.length; i++)
        to.anyOf[i] = composeProperties(to.anyOf[i]);
    else if (to.oneOf)
      for (let i = 0;i < to.oneOf.length; i++)
        to.oneOf[i] = composeProperties(to.oneOf[i]);
    else if (to.allOf)
      for (let i = 0;i < to.allOf.length; i++)
        to.allOf[i] = composeProperties(to.allOf[i]);
    else if (to.not)
      for (let i = 0;i < to.not.length; i++)
        to.not[i] = composeProperties(to.not[i]);
    if (transform4)
      to[TransformKind] = transform4[TransformKind];
    if (to.anyOf || to.oneOf || to.allOf || to.not)
      return to;
    if (properties2) {
      const newProperties = {};
      for (const [key, value2] of Object.entries(properties2))
        newProperties[key] = _replaceSchemaType(value2, options, false);
      return {
        ...rest3,
        ...to,
        properties: newProperties
      };
    } else if (items?.map)
      return {
        ...rest3,
        ...to,
        items: items.map((v) => _replaceSchemaType(v, options, false))
      };
    return {
      ...rest3,
      ...to
    };
  }
  const properties = schema3?.properties;
  if (properties && root && options.rootOnly !== true)
    for (const [key, value2] of Object.entries(properties)) {
      switch (value2[Kind]) {
        case fromSymbol:
          const { anyOf, oneOf, allOf, not: not3, type: type3, ...rest3 } = value2;
          const to = options.to(rest3);
          if (to.anyOf)
            for (let i = 0;i < to.anyOf.length; i++)
              to.anyOf[i] = { ...rest3, ...to.anyOf[i] };
          else if (to.oneOf)
            for (let i = 0;i < to.oneOf.length; i++)
              to.oneOf[i] = { ...rest3, ...to.oneOf[i] };
          else if (to.allOf)
            for (let i = 0;i < to.allOf.length; i++)
              to.allOf[i] = { ...rest3, ...to.allOf[i] };
          else if (to.not)
            for (let i = 0;i < to.not.length; i++)
              to.not[i] = { ...rest3, ...to.not[i] };
          properties[key] = {
            ...rest3,
            ..._replaceSchemaType(rest3, options, false)
          };
          break;
        case "Object":
        case "Union":
          properties[key] = _replaceSchemaType(value2, options, false);
          break;
        default:
          if (value2.items)
            for (let i = 0;i < value2.items.length; i++) {
              value2.items[i] = _replaceSchemaType(value2.items[i], options, false);
            }
          else if (value2.anyOf || value2.oneOf || value2.allOf || value2.not)
            properties[key] = _replaceSchemaType(value2, options, false);
          break;
      }
    }
  return schema3;
};
var createCleaner = (schema3) => (value2) => {
  if (typeof value2 === "object")
    try {
      return exports_value2.Clean(schema3, structuredClone(value2));
    } catch {
      try {
        return exports_value2.Clean(schema3, value2);
      } catch {
        return value2;
      }
    }
  return value2;
};
var getSchemaValidator = (s, {
  models = {},
  dynamic = false,
  normalize = false,
  additionalProperties = false,
  coerce = false,
  additionalCoerce = []
} = {}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  let schema3 = typeof s === "string" ? models[s] : s;
  if (coerce || additionalCoerce) {
    if (coerce)
      schema3 = replaceSchemaType(schema3, [
        {
          from: t.Number(),
          to: (options) => t.Numeric(options),
          untilObjectFound: true
        },
        {
          from: t.Boolean(),
          to: (options) => t.BooleanString(options),
          untilObjectFound: true
        },
        ...Array.isArray(additionalCoerce) ? additionalCoerce : [additionalCoerce]
      ]);
    else {
      schema3 = replaceSchemaType(schema3, [
        ...Array.isArray(additionalCoerce) ? additionalCoerce : [additionalCoerce]
      ]);
    }
  }
  if (schema3.type === "object" && "additionalProperties" in schema3 === false)
    schema3.additionalProperties = additionalProperties;
  if (dynamic) {
    const validator = {
      schema: schema3,
      references: "",
      checkFunc: () => {
      },
      code: "",
      Check: (value2) => exports_value2.Check(schema3, value2),
      Errors: (value2) => exports_value2.Errors(schema3, value2),
      Code: () => "",
      Clean: createCleaner(schema3),
      Decode: (value2) => exports_value2.Decode(schema3, value2),
      Encode: (value2) => exports_value2.Encode(schema3, value2)
    };
    if (normalize && schema3.additionalProperties === false)
      validator.Clean = createCleaner(schema3);
    if (schema3.config) {
      validator.config = schema3.config;
      if (validator?.schema?.config)
        delete validator.schema.config;
    }
    validator.parse = (v) => {
      try {
        return validator.Decode(v);
      } catch (error22) {
        throw [...validator.Errors(v)].map(mapValueError);
      }
    };
    validator.safeParse = (v) => {
      try {
        return { success: true, data: validator.Decode(v), error: null };
      } catch (error22) {
        const errors2 = [...compiled.Errors(v)].map(mapValueError);
        return {
          success: false,
          data: null,
          error: errors2[0]?.summary,
          errors: errors2
        };
      }
    };
    return validator;
  }
  const compiled = TypeCompiler.Compile(schema3, Object.values(models));
  compiled.Clean = createCleaner(schema3);
  if (schema3.config) {
    compiled.config = schema3.config;
    if (compiled?.schema?.config)
      delete compiled.schema.config;
  }
  compiled.parse = (v) => {
    try {
      return compiled.Decode(v);
    } catch (error22) {
      throw [...compiled.Errors(v)].map(mapValueError);
    }
  };
  compiled.safeParse = (v) => {
    try {
      return { success: true, data: compiled.Decode(v), error: null };
    } catch (error22) {
      const errors2 = [...compiled.Errors(v)].map(mapValueError);
      return {
        success: false,
        data: null,
        error: errors2[0]?.summary,
        errors: errors2
      };
    }
  };
  return compiled;
};
var getResponseSchemaValidator = (s, {
  models = {},
  dynamic = false,
  normalize = false,
  additionalProperties = false
}) => {
  if (!s)
    return;
  if (typeof s === "string" && !(s in models))
    return;
  const maybeSchemaOrRecord = typeof s === "string" ? models[s] : s;
  const compile = (schema3, references) => {
    if (dynamic)
      return {
        schema: schema3,
        references: "",
        checkFunc: () => {
        },
        code: "",
        Check: (value2) => exports_value2.Check(schema3, value2),
        Errors: (value2) => exports_value2.Errors(schema3, value2),
        Code: () => "",
        Clean: createCleaner(schema3),
        Decode: (value2) => exports_value2.Decode(schema3, value2),
        Encode: (value2) => exports_value2.Encode(schema3, value2)
      };
    const compiledValidator = TypeCompiler.Compile(schema3, references);
    if (normalize && schema3.additionalProperties === false)
      compiledValidator.Clean = createCleaner(schema3);
    return compiledValidator;
  };
  if (Kind in maybeSchemaOrRecord) {
    if ("additionalProperties" in maybeSchemaOrRecord === false)
      maybeSchemaOrRecord.additionalProperties = additionalProperties;
    return {
      200: compile(maybeSchemaOrRecord, Object.values(models))
    };
  }
  const record3 = {};
  Object.keys(maybeSchemaOrRecord).forEach((status) => {
    const maybeNameOrSchema = maybeSchemaOrRecord[+status];
    if (typeof maybeNameOrSchema === "string") {
      if (maybeNameOrSchema in models) {
        const schema3 = models[maybeNameOrSchema];
        schema3.type === "object" && "additionalProperties" in schema3;
        record3[+status] = Kind in schema3 ? compile(schema3, Object.values(models)) : schema3;
      }
      return;
    }
    if (maybeNameOrSchema.type === "object" && "additionalProperties" in maybeNameOrSchema === false)
      maybeNameOrSchema.additionalProperties = additionalProperties;
    record3[+status] = Kind in maybeNameOrSchema ? compile(maybeNameOrSchema, Object.values(models)) : maybeNameOrSchema;
  });
  return record3;
};
var isBun = typeof Bun !== "undefined";
var hasHash = isBun && typeof Bun.hash === "function";
var checksum = (s) => {
  if (hasHash)
    return Bun.hash(s);
  let h = 9;
  for (let i = 0;i < s.length; )
    h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
  return h = h ^ h >>> 9;
};
var _stringToStructureCoercions;
var stringToStructureCoercions = () => {
  if (!_stringToStructureCoercions) {
    _stringToStructureCoercions = [
      {
        from: t.Object({}),
        to: () => t.ObjectString({}),
        excludeRoot: true
      },
      {
        from: t.Array(t.Any()),
        to: () => t.ArrayString(t.Any())
      }
    ];
  }
  return _stringToStructureCoercions;
};
var _coercePrimitiveRoot;
var coercePrimitiveRoot = () => {
  if (!_coercePrimitiveRoot)
    _coercePrimitiveRoot = [
      {
        from: t.Number(),
        to: (options) => t.Numeric(options),
        rootOnly: true
      },
      {
        from: t.Boolean(),
        to: (options) => t.BooleanString(options),
        rootOnly: true
      }
    ];
  return _coercePrimitiveRoot;
};
var getCookieValidator = ({
  validator,
  defaultConfig = {},
  config,
  dynamic,
  models
}) => {
  let cookieValidator = getSchemaValidator(validator, {
    dynamic,
    models,
    additionalProperties: true,
    coerce: true,
    additionalCoerce: stringToStructureCoercions()
  });
  if (isNotEmpty(defaultConfig)) {
    if (cookieValidator) {
      cookieValidator.config = mergeCookie(cookieValidator.config, config);
    } else {
      cookieValidator = getSchemaValidator(t.Cookie({}), {
        dynamic,
        models,
        additionalProperties: true
      });
      cookieValidator.config = defaultConfig;
    }
  }
  return cookieValidator;
};
var injectChecksum = (checksum2, x) => {
  if (!x)
    return;
  if (!Array.isArray(x)) {
    const fn = x;
    if (checksum2 && !fn.checksum)
      fn.checksum = checksum2;
    if (fn.scope === "scoped")
      fn.scope = "local";
    return fn;
  }
  const fns = [...x];
  for (const fn of fns) {
    if (checksum2 && !fn.checksum)
      fn.checksum = checksum2;
    if (fn.scope === "scoped")
      fn.scope = "local";
  }
  return fns;
};
var mergeLifeCycle = (a, b, checksum2) => {
  return {
    start: mergeObjectArray(a.start, injectChecksum(checksum2, b?.start)),
    request: mergeObjectArray(a.request, injectChecksum(checksum2, b?.request)),
    parse: mergeObjectArray(a.parse, injectChecksum(checksum2, b?.parse)),
    transform: mergeObjectArray(a.transform, injectChecksum(checksum2, b?.transform)),
    beforeHandle: mergeObjectArray(a.beforeHandle, injectChecksum(checksum2, b?.beforeHandle)),
    afterHandle: mergeObjectArray(a.afterHandle, injectChecksum(checksum2, b?.afterHandle)),
    mapResponse: mergeObjectArray(a.mapResponse, injectChecksum(checksum2, b?.mapResponse)),
    afterResponse: mergeObjectArray(a.afterResponse, injectChecksum(checksum2, b?.afterResponse)),
    trace: mergeObjectArray(a.trace, injectChecksum(checksum2, b?.trace)),
    error: mergeObjectArray(a.error, injectChecksum(checksum2, b?.error)),
    stop: mergeObjectArray(a.stop, injectChecksum(checksum2, b?.stop))
  };
};
var asHookType = (fn, inject, { skipIfHasType = false } = {}) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (skipIfHasType)
      fn.scope ??= inject;
    else
      fn.scope = inject;
    return fn;
  }
  for (const x of fn)
    if (skipIfHasType)
      x.scope ??= inject;
    else
      x.scope = inject;
  return fn;
};
var filterGlobal = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn))
    switch (fn.scope) {
      case "global":
      case "scoped":
        return { ...fn };
      default:
        return { fn };
    }
  const array3 = [];
  for (const x of fn)
    switch (x.scope) {
      case "global":
      case "scoped":
        array3.push({
          ...x
        });
        break;
    }
  return array3;
};
var filterGlobalHook = (hook) => {
  return {
    ...hook,
    type: hook?.type,
    detail: hook?.detail,
    parse: filterGlobal(hook?.parse),
    transform: filterGlobal(hook?.transform),
    beforeHandle: filterGlobal(hook?.beforeHandle),
    afterHandle: filterGlobal(hook?.afterHandle),
    mapResponse: filterGlobal(hook?.mapResponse),
    afterResponse: filterGlobal(hook?.afterResponse),
    error: filterGlobal(hook?.error),
    trace: filterGlobal(hook?.trace)
  };
};
var StatusMap = {
  Continue: 100,
  "Switching Protocols": 101,
  Processing: 102,
  "Early Hints": 103,
  OK: 200,
  Created: 201,
  Accepted: 202,
  "Non-Authoritative Information": 203,
  "No Content": 204,
  "Reset Content": 205,
  "Partial Content": 206,
  "Multi-Status": 207,
  "Already Reported": 208,
  "Multiple Choices": 300,
  "Moved Permanently": 301,
  Found: 302,
  "See Other": 303,
  "Not Modified": 304,
  "Temporary Redirect": 307,
  "Permanent Redirect": 308,
  "Bad Request": 400,
  Unauthorized: 401,
  "Payment Required": 402,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  "Not Acceptable": 406,
  "Proxy Authentication Required": 407,
  "Request Timeout": 408,
  Conflict: 409,
  Gone: 410,
  "Length Required": 411,
  "Precondition Failed": 412,
  "Payload Too Large": 413,
  "URI Too Long": 414,
  "Unsupported Media Type": 415,
  "Range Not Satisfiable": 416,
  "Expectation Failed": 417,
  "I'm a teapot": 418,
  "Misdirected Request": 421,
  "Unprocessable Content": 422,
  Locked: 423,
  "Failed Dependency": 424,
  "Too Early": 425,
  "Upgrade Required": 426,
  "Precondition Required": 428,
  "Too Many Requests": 429,
  "Request Header Fields Too Large": 431,
  "Unavailable For Legal Reasons": 451,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
  "Service Unavailable": 503,
  "Gateway Timeout": 504,
  "HTTP Version Not Supported": 505,
  "Variant Also Negotiates": 506,
  "Insufficient Storage": 507,
  "Loop Detected": 508,
  "Not Extended": 510,
  "Network Authentication Required": 511
};
var InvertedStatusMap = Object.fromEntries(Object.entries(StatusMap).map(([k, v]) => [v, k]));
function removeTrailingEquals(digest) {
  let trimmedDigest = digest;
  while (trimmedDigest.endsWith("=")) {
    trimmedDigest = trimmedDigest.slice(0, -1);
  }
  return trimmedDigest;
}
var encoder = new TextEncoder;
var signCookie = async (val, secret) => {
  if (typeof val !== "string")
    throw new TypeError("Cookie value must be provided as a string.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const secretKey = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const hmacBuffer = await crypto.subtle.sign("HMAC", secretKey, encoder.encode(val));
  return val + "." + removeTrailingEquals(Buffer.from(hmacBuffer).toString("base64"));
};
var unsignCookie = async (input, secret) => {
  if (typeof input !== "string")
    throw new TypeError("Signed cookie string must be provided.");
  if (secret === null)
    throw new TypeError("Secret key must be provided.");
  const tentativeValue = input.slice(0, input.lastIndexOf("."));
  const expectedInput = await signCookie(tentativeValue, secret);
  return expectedInput === input ? tentativeValue : false;
};
var traceBackMacro = (extension, property) => {
  if (!extension || typeof extension !== "object" || !property)
    return;
  for (const [key, value2] of Object.entries(property)) {
    if (key in primitiveHookMap || !(key in extension))
      continue;
    const v = extension[key];
    if (typeof v === "function") {
      v(value2);
      delete property[key];
    }
  }
};
var createMacroManager = ({
  globalHook,
  localHook
}) => (stackName) => (type3, fn) => {
  if (typeof type3 === "function")
    type3 = {
      fn: type3
    };
  if ("fn" in type3 || Array.isArray(type3)) {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (Array.isArray(type3))
      localHook[stackName] = localHook[stackName].concat(type3);
    else
      localHook[stackName].push(type3);
    return;
  }
  const { insert = "after", stack = "local" } = type3;
  if (typeof fn === "function")
    fn = { fn };
  if (stack === "global") {
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        globalHook[stackName].unshift(fn);
      } else {
        globalHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        globalHook[stackName] = fn.concat(globalHook[stackName]);
      } else {
        globalHook[stackName] = globalHook[stackName].concat(fn);
      }
    }
  } else {
    if (!localHook[stackName])
      localHook[stackName] = [];
    if (typeof localHook[stackName] === "function")
      localHook[stackName] = [localHook[stackName]];
    if (!Array.isArray(fn)) {
      if (insert === "before") {
        localHook[stackName].unshift(fn);
      } else {
        localHook[stackName].push(fn);
      }
    } else {
      if (insert === "before") {
        localHook[stackName] = fn.concat(localHook[stackName]);
      } else {
        localHook[stackName] = localHook[stackName].concat(fn);
      }
    }
  }
};
var parseNumericString = (message) => {
  if (typeof message === "number")
    return message;
  if (message.length < 16) {
    if (message.trim().length === 0)
      return null;
    const length = Number(message);
    if (Number.isNaN(length))
      return null;
    return length;
  }
  if (message.length === 16) {
    if (message.trim().length === 0)
      return null;
    const number3 = Number(message);
    if (Number.isNaN(number3) || number3.toString() !== message)
      return null;
    return number3;
  }
  return null;
};
var isNumericString = (message) => parseNumericString(message) !== null;
var PromiseGroup = class {
  constructor(onError = console.error) {
    this.onError = onError;
    this.root = null;
    this.promises = [];
  }
  get size() {
    return this.promises.length;
  }
  add(promise3) {
    this.promises.push(promise3);
    this.root ||= this.drain();
    return promise3;
  }
  async drain() {
    while (this.promises.length > 0) {
      try {
        await this.promises[0];
      } catch (error22) {
        this.onError(error22);
      }
      this.promises.shift();
    }
    this.root = null;
  }
  then(onfulfilled, onrejected) {
    return (this.root ?? Promise.resolve()).then(onfulfilled, onrejected);
  }
};
var fnToContainer = (fn) => {
  if (!fn)
    return fn;
  if (!Array.isArray(fn)) {
    if (typeof fn === "function")
      return { fn };
    else if ("fn" in fn)
      return fn;
  }
  const fns = [];
  for (const x of fn) {
    if (typeof x === "function")
      fns.push({ fn: x });
    else if ("fn" in x)
      fns.push(x);
  }
  return fns;
};
var localHookToLifeCycleStore = (a) => {
  return {
    ...a,
    start: fnToContainer(a?.start),
    request: fnToContainer(a?.request),
    parse: fnToContainer(a?.parse),
    transform: fnToContainer(a?.transform),
    beforeHandle: fnToContainer(a?.beforeHandle),
    afterHandle: fnToContainer(a?.afterHandle),
    mapResponse: fnToContainer(a?.mapResponse),
    afterResponse: fnToContainer(a?.afterResponse),
    trace: fnToContainer(a?.trace),
    error: fnToContainer(a?.error),
    stop: fnToContainer(a?.stop)
  };
};
var lifeCycleToFn = (a) => {
  return {
    ...a,
    start: a.start?.map((x) => x.fn),
    request: a.request?.map((x) => x.fn),
    parse: a.parse?.map((x) => x.fn),
    transform: a.transform?.map((x) => x.fn),
    beforeHandle: a.beforeHandle?.map((x) => x.fn),
    afterHandle: a.afterHandle?.map((x) => x.fn),
    afterResponse: a.afterResponse?.map((x) => x.fn),
    mapResponse: a.mapResponse?.map((x) => x.fn),
    trace: a.trace?.map((x) => x.fn),
    error: a.error?.map((x) => x.fn),
    stop: a.stop?.map((x) => x.fn)
  };
};
var cloneInference = (inference) => ({
  body: inference.body,
  cookie: inference.cookie,
  headers: inference.headers,
  query: inference.query,
  set: inference.set,
  server: inference.server
});
var redirect = (url, status = 302) => Response.redirect(url, status);
var ELYSIA_FORM_DATA = Symbol("ElysiaFormData");
var ELYSIA_REQUEST_ID = Symbol("ElysiaRequestId");
var randomId = () => crypto.getRandomValues(new Uint32Array(1))[0];
var deduplicateChecksum = (array3) => {
  const hashes = [];
  for (let i = 0;i < array3.length; i++) {
    const item = array3[i];
    if (item.checksum) {
      if (hashes.includes(item.checksum)) {
        array3.splice(i, 1);
        i--;
      }
      hashes.push(item.checksum);
    }
  }
  return array3;
};
var promoteEvent = (events, as = "scoped") => {
  if (as === "scoped") {
    for (const event of events)
      if ("scope" in event && event.scope === "local")
        event.scope = "scoped";
    return;
  }
  for (const event of events)
    if ("scope" in event)
      event.scope = "global";
};
var env = typeof Bun !== "undefined" ? Bun.env : typeof process !== "undefined" ? process?.env : undefined;
var ERROR_CODE = Symbol("ElysiaErrorCode");
var isProduction = (env?.NODE_ENV ?? env?.ENV) === "production";
var ElysiaCustomStatusResponse = class {
  constructor(code, response) {
    const res = response ?? (code in InvertedStatusMap ? InvertedStatusMap[code] : code);
    this.code = StatusMap[code] ?? code;
    this.response = res;
  }
};
var error3 = (code, response) => new ElysiaCustomStatusResponse(code, response);
var InternalServerError = class extends Error {
  constructor(message) {
    super(message ?? "INTERNAL_SERVER_ERROR");
    this.code = "INTERNAL_SERVER_ERROR";
    this.status = 500;
  }
};
var NotFoundError = class extends Error {
  constructor(message) {
    super(message ?? "NOT_FOUND");
    this.code = "NOT_FOUND";
    this.status = 404;
  }
};
var ParseError = class extends Error {
  constructor() {
    super("Failed to parse body");
    this.code = "PARSE";
    this.status = 400;
  }
};
var InvalidCookieSignature = class extends Error {
  constructor(key, message) {
    super(message ?? `"${key}" has invalid cookie signature`);
    this.key = key;
    this.code = "INVALID_COOKIE_SIGNATURE";
    this.status = 400;
  }
};
var mapValueError = (error22) => {
  if (!error22)
    return {
      summary: undefined
    };
  const { message, path, value: value2, type: type3 } = error22;
  const property = path.slice(1).replaceAll("/", ".");
  const isRoot = path === "";
  switch (type3) {
    case 42:
      return {
        ...error22,
        summary: isRoot ? `Value should not be provided` : `Property '${property}' should not be provided`
      };
    case 45:
      return {
        ...error22,
        summary: isRoot ? `Value is missing` : `Property '${property}' is missing`
      };
    case 50:
      const quoteIndex = message.indexOf("'");
      const format = message.slice(quoteIndex + 1, message.indexOf("'", quoteIndex + 1));
      return {
        ...error22,
        summary: isRoot ? `Value should be an email` : `Property '${property}' should be ${format}`
      };
    case 54:
      return {
        ...error22,
        summary: `${message.slice(0, 9)} property '${property}' to be ${message.slice(8)} but found: ${value2}`
      };
    case 62:
      const union4 = error22.schema.anyOf.map((x) => `'${x?.format ?? x.type}'`).join(", ");
      return {
        ...error22,
        summary: isRoot ? `Value should be one of ${union4}` : `Property '${property}' should be one of: ${union4}`
      };
    default:
      return { summary: message, ...error22 };
  }
};
var ValidationError = class _ValidationError extends Error {
  constructor(type3, validator, value2) {
    if (value2 && typeof value2 === "object" && value2 instanceof ElysiaCustomStatusResponse)
      value2 = value2.response;
    const error22 = isProduction ? undefined : ("Errors" in validator) ? validator.Errors(value2).First() : exports_value2.Errors(validator, value2).First();
    const customError = error22?.schema.error !== undefined ? typeof error22.schema.error === "function" ? error22.schema.error({
      type: type3,
      validator,
      value: value2,
      get errors() {
        return [...validator.Errors(value2)].map(mapValueError);
      }
    }) : error22.schema.error : undefined;
    const accessor = error22?.path || "root";
    let message = "";
    if (customError !== undefined) {
      message = typeof customError === "object" ? JSON.stringify(customError) : customError + "";
    } else if (isProduction) {
      message = JSON.stringify({
        type: "validation",
        on: type3,
        summary: mapValueError(error22).summary,
        message: error22?.message,
        found: value2
      });
    } else {
      const schema3 = validator?.schema ?? validator;
      const errors2 = "Errors" in validator ? [...validator.Errors(value2)].map(mapValueError) : [...exports_value2.Errors(validator, value2)].map(mapValueError);
      let expected;
      try {
        expected = exports_value2.Create(schema3);
      } catch (error32) {
        expected = {
          type: "Could not create expected value",
          message: error32?.message,
          error: error32
        };
      }
      message = JSON.stringify({
        type: "validation",
        on: type3,
        summary: errors2[0]?.summary,
        property: accessor,
        message: error22?.message,
        expected,
        found: value2,
        errors: errors2
      }, null, 2);
    }
    super(message);
    this.type = type3;
    this.validator = validator;
    this.value = value2;
    this.code = "VALIDATION";
    this.status = 422;
    Object.setPrototypeOf(this, _ValidationError.prototype);
  }
  get all() {
    return "Errors" in this.validator ? [...this.validator.Errors(this.value)].map(mapValueError) : [...exports_value2.Errors(this.validator, this.value)].map(mapValueError);
  }
  static simplifyModel(validator) {
    const model = "schema" in validator ? validator.schema : validator;
    try {
      return exports_value2.Create(model);
    } catch {
      return model;
    }
  }
  get model() {
    return _ValidationError.simplifyModel(this.validator);
  }
  toResponse(headers) {
    return new Response(this.message, {
      status: 400,
      headers: {
        ...headers,
        "content-type": "application/json"
      }
    });
  }
};
var websocket = {
  open(ws) {
    ws.data.open?.(ws);
  },
  message(ws, message) {
    ws.data.message?.(ws, message);
  },
  drain(ws) {
    ws.data.drain?.(ws);
  },
  close(ws, code, reason) {
    ws.data.close?.(ws, code, reason);
  }
};
var ElysiaWS = class {
  constructor(raw, data) {
    this.raw = raw;
    this.data = data;
    this.validator = raw.data.validator;
    if (raw.data.id) {
      this.id = raw.data.id;
    } else {
      this.id = randomId().toString();
    }
  }
  get id() {
    return this.raw.data.id;
  }
  set id(newID) {
    this.raw.data.id = newID;
  }
  get publish() {
    return (topic, data = undefined, compress) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.publish(topic, data, compress);
      return this;
    };
  }
  get send() {
    return (data) => {
      if (this.validator?.Check(data) === false)
        throw new ValidationError("message", this.validator, data);
      if (Buffer.isBuffer(data)) {
        this.raw.send(data);
        return this;
      }
      if (typeof data === "object")
        data = JSON.stringify(data);
      this.raw.send(data);
      return this;
    };
  }
  get subscribe() {
    return (room) => {
      this.raw.subscribe(room);
      return this;
    };
  }
  get unsubscribe() {
    return (room) => {
      this.raw.unsubscribe(room);
      return this;
    };
  }
  get cork() {
    return (callback) => {
      this.raw.cork(callback);
      return this;
    };
  }
  get close() {
    return () => {
      this.raw.close();
      return this;
    };
  }
  get terminate() {
    return this.raw.terminate.bind(this.raw);
  }
  get isSubscribed() {
    return this.raw.isSubscribed.bind(this.raw);
  }
  get remoteAddress() {
    return this.raw.remoteAddress;
  }
};
var version = "1.1.25";
var plusRegex = /\+/g;
function parseQueryFromURL(input) {
  const result = {};
  if (typeof input !== "string")
    return result;
  let key = "";
  let value2 = "";
  let startingIndex = -1;
  let equalityIndex = -1;
  let flags = 0;
  const l = input.length;
  for (let i = 0;i < l; i++) {
    switch (input.charCodeAt(i)) {
      case 38:
        const hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair)
          equalityIndex = i;
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (flags & 1)
            key = key.replace(plusRegex, " ");
          if (flags & 2)
            key = import_fast_decode_uri_component2.default(key) || key;
          if (!result[key]) {
            if (hasBothKeyValuePair) {
              value2 = input.slice(equalityIndex + 1, i);
              if (flags & 4)
                value2 = value2.replace(plusRegex, " ");
              if (flags & 8)
                value2 = import_fast_decode_uri_component2.default(value2) || value2;
            }
            result[key] = value2;
          }
        }
        key = "";
        value2 = "";
        startingIndex = i;
        equalityIndex = i;
        flags = 0;
        break;
      case 61:
        if (equalityIndex <= startingIndex)
          equalityIndex = i;
        else
          flags |= 8;
        break;
      case 43:
        if (equalityIndex > startingIndex)
          flags |= 4;
        else
          flags |= 1;
        break;
      case 37:
        if (equalityIndex > startingIndex)
          flags |= 8;
        else
          flags |= 2;
        break;
    }
  }
  if (startingIndex < l) {
    const hasBothKeyValuePair = equalityIndex > startingIndex;
    key = input.slice(startingIndex + 1, hasBothKeyValuePair ? equalityIndex : l);
    if (hasBothKeyValuePair || key.length > 0) {
      if (flags & 1)
        key = key.replace(plusRegex, " ");
      if (flags & 2)
        key = import_fast_decode_uri_component2.default(key) || key;
      if (!result[key]) {
        if (hasBothKeyValuePair) {
          value2 = input.slice(equalityIndex + 1, l);
          if (flags & 4)
            value2 = value2.replace(plusRegex, " ");
          if (flags & 8)
            value2 = import_fast_decode_uri_component2.default(value2) || value2;
        }
        result[key] = value2;
      }
    }
  }
  return result;
}
var parseQuery = (input) => {
  const result = {};
  if (typeof input !== "string")
    return result;
  const inputLength = input.length;
  let key = "";
  let value2 = "";
  let startingIndex = -1;
  let equalityIndex = -1;
  let shouldDecodeKey = false;
  let shouldDecodeValue = false;
  let keyHasPlus = false;
  let valueHasPlus = false;
  let hasBothKeyValuePair = false;
  let c = 0;
  for (let i = 0;i < inputLength + 1; i++) {
    if (i !== inputLength)
      c = input.charCodeAt(i);
    else
      c = 38;
    switch (c) {
      case 38: {
        hasBothKeyValuePair = equalityIndex > startingIndex;
        if (!hasBothKeyValuePair)
          equalityIndex = i;
        key = input.slice(startingIndex + 1, equalityIndex);
        if (hasBothKeyValuePair || key.length > 0) {
          if (keyHasPlus)
            key = key.replace(plusRegex, " ");
          if (shouldDecodeKey)
            key = import_fast_decode_uri_component2.default(key) || key;
          if (hasBothKeyValuePair) {
            value2 = input.slice(equalityIndex + 1, i);
            if (valueHasPlus)
              value2 = value2.replace(plusRegex, " ");
            if (shouldDecodeValue)
              value2 = import_fast_decode_uri_component2.default(value2) || value2;
          }
          const currentValue = result[key];
          if (currentValue === undefined)
            result[key] = value2;
          else {
            if (currentValue.pop)
              currentValue.push(value2);
            else
              result[key] = [currentValue, value2];
          }
        }
        value2 = "";
        startingIndex = i;
        equalityIndex = i;
        shouldDecodeKey = false;
        shouldDecodeValue = false;
        keyHasPlus = false;
        valueHasPlus = false;
        break;
      }
      case 61:
        if (equalityIndex <= startingIndex)
          equalityIndex = i;
        else
          shouldDecodeValue = true;
        break;
      case 43:
        if (equalityIndex > startingIndex)
          valueHasPlus = true;
        else
          keyHasPlus = true;
        break;
      case 37:
        if (equalityIndex > startingIndex)
          shouldDecodeValue = true;
        else
          shouldDecodeKey = true;
        break;
    }
  }
  return result;
};
var ELYSIA_TRACE = Symbol("ElysiaTrace");
var createProcess = () => {
  const { promise: promise3, resolve } = Promise.withResolvers();
  const { promise: end, resolve: resolveEnd } = Promise.withResolvers();
  const { promise: error22, resolve: resolveError } = Promise.withResolvers();
  const callbacks = [];
  const callbacksEnd = [];
  return [
    (callback) => {
      if (callback)
        callbacks.push(callback);
      return promise3;
    },
    (process2) => {
      const processes = [];
      const resolvers = [];
      let groupError = null;
      for (let i = 0;i < (process2.total ?? 0); i++) {
        const { promise: promise22, resolve: resolve2 } = Promise.withResolvers();
        const { promise: end2, resolve: resolveEnd2 } = Promise.withResolvers();
        const { promise: error32, resolve: resolveError2 } = Promise.withResolvers();
        const callbacks2 = [];
        const callbacksEnd2 = [];
        processes.push((callback) => {
          if (callback)
            callbacks2.push(callback);
          return promise22;
        });
        resolvers.push((process3) => {
          const result2 = {
            ...process3,
            end: end2,
            error: error32,
            index: i,
            onStop(callback) {
              if (callback)
                callbacksEnd2.push(callback);
              return end2;
            }
          };
          resolve2(result2);
          for (let i2 = 0;i2 < callbacks2.length; i2++)
            callbacks2[i2](result2);
          return (error4 = null) => {
            const end3 = performance.now();
            if (error4)
              groupError = error4;
            const detail = {
              end: end3,
              error: error4,
              get elapsed() {
                return end3 - process3.begin;
              }
            };
            for (let i2 = 0;i2 < callbacksEnd2.length; i2++)
              callbacksEnd2[i2](detail);
            resolveEnd2(end3);
            resolveError2(error4);
          };
        });
      }
      const result = {
        ...process2,
        end,
        error: error22,
        onEvent(callback) {
          for (let i = 0;i < processes.length; i++)
            processes[i](callback);
        },
        onStop(callback) {
          if (callback)
            callbacksEnd.push(callback);
          return end;
        }
      };
      resolve(result);
      for (let i = 0;i < callbacks.length; i++)
        callbacks[i](result);
      return {
        resolveChild: resolvers,
        resolve(error32 = null) {
          const end2 = performance.now();
          if (!error32 && groupError)
            error32 = groupError;
          const detail = {
            end: end2,
            error: error32,
            get elapsed() {
              return end2 - process2.begin;
            }
          };
          for (let i = 0;i < callbacksEnd.length; i++)
            callbacksEnd[i](detail);
          resolveEnd(end2);
          resolveError(error32);
        }
      };
    }
  ];
};
var createTracer = (traceListener) => {
  return (context) => {
    const [onRequest, resolveRequest] = createProcess();
    const [onParse, resolveParse] = createProcess();
    const [onTransform, resolveTransform] = createProcess();
    const [onBeforeHandle, resolveBeforeHandle] = createProcess();
    const [onHandle, resolveHandle] = createProcess();
    const [onAfterHandle, resolveAfterHandle] = createProcess();
    const [onError, resolveError] = createProcess();
    const [onMapResponse, resolveMapResponse] = createProcess();
    const [onAfterResponse, resolveAfterResponse] = createProcess();
    traceListener({
      id: context[ELYSIA_REQUEST_ID],
      context,
      set: context.set,
      onRequest,
      onParse,
      onTransform,
      onBeforeHandle,
      onHandle,
      onAfterHandle,
      onMapResponse,
      onAfterResponse,
      onError
    });
    return {
      request: resolveRequest,
      parse: resolveParse,
      transform: resolveTransform,
      beforeHandle: resolveBeforeHandle,
      handle: resolveHandle,
      afterHandle: resolveAfterHandle,
      error: resolveError,
      mapResponse: resolveMapResponse,
      afterResponse: resolveAfterResponse
    };
  };
};
var headersHasToJSON = new Headers().toJSON;
var TypeBoxSymbol = {
  optional: Symbol.for("TypeBox.Optional"),
  kind: Symbol.for("TypeBox.Kind")
};
var isOptional = (validator) => {
  if (!validator)
    return false;
  const schema3 = validator?.schema;
  return !!schema3 && TypeBoxSymbol.optional in schema3;
};
var hasAdditionalProperties = (_schema) => {
  if (!_schema)
    return false;
  const schema3 = _schema?.schema ?? _schema;
  if (schema3.anyOf)
    return schema3.anyOf.some(hasAdditionalProperties);
  if (schema3.someOf)
    return schema3.someOf.some(hasAdditionalProperties);
  if (schema3.allOf)
    return schema3.allOf.some(hasAdditionalProperties);
  if (schema3.not)
    return schema3.not.some(hasAdditionalProperties);
  if (schema3.type === "object") {
    const properties = schema3.properties;
    if ("additionalProperties" in schema3)
      return schema3.additionalProperties;
    if ("patternProperties" in schema3)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasAdditionalProperties(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasAdditionalProperties(property.anyOf[i]))
            return true;
      }
      return property.additionalProperties;
    }
    return false;
  }
  return false;
};
var createReport = ({
  context = "c",
  trace,
  addFn
}) => {
  if (!trace.length)
    return () => {
      return {
        resolveChild() {
          return () => {
          };
        },
        resolve() {
        }
      };
    };
  for (let i = 0;i < trace.length; i++)
    addFn(`let report${i}, reportChild${i}, reportErr${i}, reportErrChild${i}; let trace${i} = ${context}[ELYSIA_TRACE]?.[${i}] ?? trace[${i}](${context});
`);
  return (event, {
    name,
    total = 0
  } = {}) => {
    if (!name)
      name = "anonymous";
    const reporter = event === "error" ? "reportErr" : "report";
    for (let i = 0;i < trace.length; i++)
      addFn(`
${reporter}${i} = trace${i}.${event}({id,event: '${event}',name: '${name}',begin: performance.now(),total: ${total}})
`);
    return {
      resolve() {
        for (let i = 0;i < trace.length; i++)
          addFn(`
${reporter}${i}.resolve()
`);
      },
      resolveChild(name2) {
        for (let i = 0;i < trace.length; i++)
          addFn(`${reporter}Child${i} = ${reporter}${i}.resolveChild?.shift()?.({id,event: '${event}',name: '${name2}',begin: performance.now()})
`);
        return (binding) => {
          for (let i = 0;i < trace.length; i++) {
            if (binding)
              addFn(`
                             \tif (${binding} instanceof Error)
                    \t\t\t\t${reporter}Child${i}?.(${binding})
                           \t\telse
                             \t\t${reporter}Child${i}?.()
`);
            else
              addFn(`${reporter}Child${i}?.()
`);
          }
        };
      }
    };
  };
};
var composeValidationFactory = ({
  injectResponse = "",
  normalize = false,
  validator
}) => ({
  composeValidation: (type3, value2 = `c.${type3}`) => `c.set.status = 422; throw new ValidationError('${type3}', validator.${type3}, ${value2})`,
  composeResponseValidation: (name = "r") => {
    let code = `
` + injectResponse + `
`;
    code += `if(${name} instanceof ElysiaCustomStatusResponse) {
\t\t\tc.set.status = ${name}.code
\t\t\t${name} = ${name}.response
\t\t}

\t\tconst isResponse = ${name} instanceof Response

`;
    code += `switch(c.set.status) {
`;
    for (const [status, value2] of Object.entries(validator.response)) {
      code += `\tcase ${status}:
\t\t\t\tif (!isResponse) {
`;
      if (normalize && "Clean" in value2 && !hasAdditionalProperties(value2))
        code += `${name} = validator.response['${status}'].Clean(${name})
`;
      code += `if(validator.response['${status}'].Check(${name}) === false) {
\t\t\t\t\tc.set.status = 422

\t\t\t\t\tthrow new ValidationError('response', validator.response['${status}'], ${name})
\t\t\t\t}

\t\t\t\tc.set.status = ${status}
\t\t\t}

\t\t\tbreak

`;
    }
    code += `
}
`;
    return code;
  }
});
var KindSymbol = Symbol.for("TypeBox.Kind");
var hasProperty = (expectedProperty, schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object") {
    const properties = schema3.properties;
    if (!properties)
      return false;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (expectedProperty in property)
        return true;
      if (property.type === "object") {
        if (hasProperty(expectedProperty, property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++) {
          if (hasProperty(expectedProperty, property.anyOf[i]))
            return true;
        }
      }
    }
    return false;
  }
  return expectedProperty in schema3;
};
var TransformSymbol = Symbol.for("TypeBox.Transform");
var hasTransform = (schema3) => {
  if (!schema3)
    return;
  if (schema3.type === "object" && schema3.properties) {
    const properties = schema3.properties;
    for (const key of Object.keys(properties)) {
      const property = properties[key];
      if (property.type === "object") {
        if (hasTransform(property))
          return true;
      } else if (property.anyOf) {
        for (let i = 0;i < property.anyOf.length; i++)
          if (hasTransform(property.anyOf[i]))
            return true;
      }
      const hasTransformSymbol = TransformSymbol in property;
      if (hasTransformSymbol)
        return true;
    }
    return false;
  }
  return TransformSymbol in schema3 || schema3.properties && TransformSymbol in schema3.properties;
};
var matchFnReturn = /(?:return|=>) \S+\(/g;
var isAsyncName = (v) => {
  const fn = v?.fn ?? v;
  return fn.constructor.name === "AsyncFunction";
};
var isAsync = (v) => {
  const fn = v?.fn ?? v;
  if (fn.constructor.name === "AsyncFunction")
    return true;
  const literal3 = fn.toString();
  if (literal3.includes("=> response.clone("))
    return false;
  if (literal3.includes("await"))
    return true;
  if (literal3.includes("async"))
    return true;
  return !!literal3.match(matchFnReturn);
};
var isGenerator = (v) => {
  const fn = v?.fn ?? v;
  return fn.constructor.name === "AsyncGeneratorFunction" || fn.constructor.name === "GeneratorFunction";
};
var composeHandler = ({
  app,
  path,
  method,
  localHook,
  hooks,
  validator,
  handler,
  allowMeta = false,
  inference
}) => {
  const isHandleFn = typeof handler === "function";
  if (!isHandleFn) {
    handler = mapResponse(handler, {
      headers: app.setHeaders ?? {}
    });
    if (hooks.parse.length === 0 && hooks.transform.length === 0 && hooks.beforeHandle.length === 0 && hooks.afterHandle.length === 0)
      return Function("a", `return function () { return a.clone() }`)(handler);
  }
  const handle = isHandleFn ? `handler(c)` : `handler`;
  const hasAfterResponse = hooks.afterResponse.length > 0;
  const hasTrace = hooks.trace.length > 0;
  let fnLiteral = "";
  inference = sucrose(Object.assign(localHook, {
    handler
  }), inference);
  if (inference.server)
    fnLiteral += `
Object.defineProperty(c, 'server', {
\t\t\tget: function() { return getServer() }
\t\t})
`;
  if (inference.body)
    fnLiteral += `let isParsing = false
`;
  validator.createBody?.();
  validator.createQuery?.();
  validator.createHeaders?.();
  validator.createParams?.();
  validator.createCookie?.();
  validator.createResponse?.();
  const hasQuery = inference.query || !!validator.query;
  const hasBody = method !== "$INTERNALWS" && method !== "GET" && method !== "HEAD" && (inference.body || !!validator.body || hooks.parse.length);
  const defaultHeaders = app.setHeaders;
  const hasDefaultHeaders = defaultHeaders && !!Object.keys(defaultHeaders).length;
  const hasHeaders = inference.headers || validator.headers;
  const hasCookie = inference.cookie || !!validator.cookie;
  const cookieValidator = hasCookie ? getCookieValidator({
    validator: validator.cookie,
    defaultConfig: app.config.cookie,
    dynamic: !!app.config.aot,
    config: validator.cookie?.config ?? {},
    models: app.definitions.type
  }) : undefined;
  const cookieMeta = cookieValidator?.config;
  let encodeCookie = "";
  if (cookieMeta?.sign) {
    if (!cookieMeta.secrets)
      throw new Error(`t.Cookie required secret which is not set in (${method}) ${path}.`);
    const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
    encodeCookie += `const _setCookie = c.set.cookie
\t\tif(_setCookie) {`;
    if (cookieMeta.sign === true) {
      encodeCookie += `for(const [key, cookie] of Object.entries(_setCookie)) {
\t\t\t\tc.set.cookie[key].value = await signCookie(cookie.value, '${secret}')
\t\t\t}`;
    } else
      for (const name of cookieMeta.sign) {
        encodeCookie += `if(_setCookie['${name}']?.value) { c.set.cookie['${name}'].value = await signCookie(_setCookie['${name}'].value, '${secret}') }
`;
      }
    encodeCookie += `}
`;
  }
  const normalize = app.config.normalize;
  const { composeValidation, composeResponseValidation } = composeValidationFactory({
    normalize,
    validator
  });
  if (hasHeaders) {
    fnLiteral += headersHasToJSON ? `c.headers = c.request.headers.toJSON()
` : `c.headers = {}
                for (const [key, value] of c.request.headers.entries())
\t\t\t\t\tc.headers[key] = value
\t\t\t\t`;
  }
  if (hasCookie) {
    const get = (name, defaultValue) => {
      const value2 = cookieMeta?.[name] ?? defaultValue;
      if (!value2)
        return typeof defaultValue === "string" ? `${name}: "${defaultValue}",` : `${name}: ${defaultValue},`;
      if (typeof value2 === "string")
        return `${name}: '${value2}',`;
      if (value2 instanceof Date)
        return `${name}: new Date(${value2.getTime()}),`;
      return `${name}: ${value2},`;
    };
    const options = cookieMeta ? `{
\t\t\tsecrets: ${cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? `'${cookieMeta.secrets}'` : "[" + cookieMeta.secrets.reduce((a, b) => a + `'${b}',`, "") + "]" : "undefined"},
\t\t\tsign: ${cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? "[" + cookieMeta.sign.reduce((a, b) => a + `'${b}',`, "") + "]" : "undefined"},
\t\t\t${get("domain")}
\t\t\t${get("expires")}
\t\t\t${get("httpOnly")}
\t\t\t${get("maxAge")}
\t\t\t${get("path", "/")}
\t\t\t${get("priority")}
\t\t\t${get("sameSite")}
\t\t\t${get("secure")}
\t\t}` : "undefined";
    if (hasHeaders)
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.headers.cookie, ${options})
`;
    else
      fnLiteral += `
c.cookie = await parseCookie(c.set, c.request.headers.get('cookie'), ${options})
`;
  }
  if (hasQuery) {
    const destructured = [];
    if (validator.query && validator.query.schema.type === "object") {
      const properties = validator.query.schema.properties;
      if (!hasAdditionalProperties(validator.query))
        for (let [key, _value] of Object.entries(properties)) {
          let value2 = _value;
          if (value2 && TypeBoxSymbol.optional in value2 && value2.type === "array" && value2.items)
            value2 = value2.items;
          const { type: type3, anyOf } = value2;
          const isArray = type3 === "array" || anyOf?.some((v) => v.type === "string" && v.format === "ArrayString");
          destructured.push({
            key,
            isArray,
            isNestedObjectArray: isArray && value2.items?.type === "object" || !!value2.items?.anyOf?.some((x) => x.type === "object" || x.type === "array"),
            isObject: type3 === "object" || anyOf?.some((v) => v.type === "string" && v.format === "ArrayString"),
            anyOf: !!anyOf
          });
        }
    }
    if (!destructured.length) {
      fnLiteral += `if(c.qi === -1) {
\t\t\t\tc.query = {}
\t\t\t} else {
\t\t\t\tc.query = parseQueryFromURL(c.url.slice(c.qi + 1))
\t\t\t}`;
    } else {
      fnLiteral += `if(c.qi !== -1) {
\t\t\t\tlet url = '&' + c.url.slice(c.qi + 1)

\t\t\t\t${destructured.map(({
        key,
        isArray,
        isObject: isObject2,
        isNestedObjectArray,
        anyOf
      }, index) => {
        const init = `${index === 0 ? "let" : ""} memory = url.indexOf('&${key}=')
\t\t\t\t\t\t\tlet a${index}
`;
        if (isArray)
          return init + (isNestedObjectArray ? `while (memory !== -1) {
\t\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\t\tif(a${index} === undefined)
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = ''
\t\t\t\t\t\t\t\t\t\t\telse
\t\t\t\t\t\t\t\t\t\t\t\ta${index} += ','

\t\t\t\t\t\t\t\t\t\t\tlet temp

\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) temp = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\t\telse temp = decodeURIComponent(url.slice(start, memory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\tconst charCode = temp.charCodeAt(0)
\t\t\t\t\t\t\t\t\t\t\tif(charCode !== 91 && charCode !== 123)
\t\t\t\t\t\t\t\t\t\t\t\ttemp = '"' + temp + '"'

\t\t\t\t\t\t\t\t\t\t\ta${index} += temp

\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) break

\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&${key}=', memory)
\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) break
\t\t\t\t\t\t\t\t\t\t}

\t\t\t\t\t\t\t\t\t\ttry {
\t\t\t\t\t\t\t\t\t\t    if(a${index}.charCodeAt(0) === 91)
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = JSON.parse(a${index})
\t\t\t\t\t\t\t\t\t\t\telse
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = JSON.parse('[' + a${index} + ']')
\t\t\t\t\t\t\t\t\t\t} catch {}
` : `while (memory !== -1) {
\t\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\t\tif(a${index} === undefined)
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = []

\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) {
\t\t\t\t\t\t\t\t\t\t\t\ta${index}.push(decodeURIComponent(url.slice(start)).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\t\t\tbreak
\t\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t\t\telse a${index}.push(decodeURIComponent(url.slice(start, memory)).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&${key}=', memory)
\t\t\t\t\t\t\t\t\t\t\tif(memory === -1) break
\t\t\t\t\t\t\t\t\t\t}
`);
        if (isObject2)
          return init + `if (memory !== -1) {
\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\tif(memory === -1) a${index} = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\telse a${index} = decodeURIComponent(url.slice(start, memory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\tif (a${index} !== undefined) {
\t\t\t\t\t\t\t\t\t\t\ttry {
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = JSON.parse(a${index})
\t\t\t\t\t\t\t\t\t\t\t} catch {}
\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t}`;
        return init + `if (memory !== -1) {
\t\t\t\t\t\t\t\t\t\tconst start = memory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\tmemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\tif(memory === -1) a${index} = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\telse {
\t\t\t\t\t\t\t\t\t\t\ta${index} = decodeURIComponent(url.slice(start, memory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\t${anyOf ? `
\t\t\t\t\t\t\t\t\t\t\tlet deepMemory = url.indexOf('&${key}=', memory)

\t\t\t\t\t\t\t\t\t\t\tif(deepMemory !== -1) {
\t\t\t\t\t\t\t\t\t\t\t\ta${index} = [a${index}]
\t\t\t\t\t\t\t\t\t\t\t\tlet first = true

\t\t\t\t\t\t\t\t\t\t\t\twhile(true) {
\t\t\t\t\t\t\t\t\t\t\t\t\tconst start = deepMemory + ${key.length + 2}
\t\t\t\t\t\t\t\t\t\t\t\t\tif(first)
\t\t\t\t\t\t\t\t\t\t\t\t\t\tfirst = false
\t\t\t\t\t\t\t\t\t\t\t\t\telse
\t\t\t\t\t\t\t\t\t\t\t\t\t\tdeepMemory = url.indexOf('&', start)

\t\t\t\t\t\t\t\t\t\t\t\t\tlet value
\t\t\t\t\t\t\t\t\t\t\t\t\tif(deepMemory === -1) value = decodeURIComponent(url.slice(start).replace(/\\+/g, ' '))
\t\t\t\t\t\t\t\t\t\t\t\t\telse value = decodeURIComponent(url.slice(start, deepMemory).replace(/\\+/g, ' '))

\t\t\t\t\t\t\t\t\t\t\t\t\tconst vStart = value.charCodeAt(0)
\t\t\t\t\t\t\t\t\t\t\t\t\tconst vEnd = value.charCodeAt(value.length - 1)

\t\t\t\t\t\t\t\t\t\t\t\t\tif((vStart === 91 && vEnd === 93) || (vStart === 123 && vEnd === 125))
\t\t\t\t\t\t\t\t\t\t\t\t\t\ttry {
\t\t\t\t\t\t\t\t\t\t\t\t\t\t\ta${index}.push(JSON.parse(value))
\t\t\t\t\t\t\t\t\t\t\t\t\t\t} catch {
\t\t\t\t\t\t\t\t\t\t\t\t\t\t \ta${index}.push(value)
\t\t\t\t\t\t\t\t\t\t\t\t\t\t}

\t\t\t\t\t\t\t\t\t\t\t\t\tif(deepMemory === -1) break
\t\t\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t\t\t\t` : ""}
\t\t\t\t\t\t\t\t\t\t}
\t\t\t\t\t\t\t\t\t}`;
      }).join(`
`)}

\t\t\t\tc.query = {
\t\t\t\t\t${destructured.map(({ key }, index) => `'${key}': a${index}`).join(", ")}
\t\t\t\t}
\t\t\t} else {
\t\t\t\tc.query = {}
\t\t\t}`;
    }
  }
  if (hasTrace)
    fnLiteral += `
const id = c[ELYSIA_REQUEST_ID]
`;
  const report = createReport({
    trace: hooks.trace,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += `
try {
`;
  const isAsyncHandler = typeof handler === "function" && isAsync(handler);
  const saveResponse = hasTrace || hooks.afterResponse.length > 0 ? "c.response = " : "";
  const maybeAsync = hasCookie || hasBody || isAsyncHandler || hooks.parse.length > 0 || hooks.afterHandle.some(isAsync) || hooks.beforeHandle.some(isAsync) || hooks.transform.some(isAsync) || hooks.mapResponse.some(isAsync);
  const maybeStream = (typeof handler === "function" ? isGenerator(handler) : false) || hooks.beforeHandle.some(isGenerator) || hooks.afterHandle.some(isGenerator) || hooks.transform.some(isGenerator);
  const hasSet = inference.cookie || inference.set || hasHeaders || hasTrace || validator.response || isHandleFn && hasDefaultHeaders || maybeStream;
  const requestMapper = `, c.request`;
  fnLiteral += `c.route = \`${path}\`
`;
  const parseReporter = report("parse", {
    total: hooks.parse.length
  });
  if (hasBody) {
    const hasBodyInference = hooks.parse.length || inference.body || validator.body;
    fnLiteral += `isParsing = true
`;
    if (hooks.type && !hooks.parse.length) {
      switch (hooks.type) {
        case "json":
        case "application/json":
          if (isOptional(validator.body))
            fnLiteral += `try { c.body = await c.request.json() } catch {}`;
          else
            fnLiteral += `c.body = await c.request.json()`;
          break;
        case "text":
        case "text/plain":
          fnLiteral += `c.body = await c.request.text()
`;
          break;
        case "urlencoded":
        case "application/x-www-form-urlencoded":
          fnLiteral += `c.body = parseQuery(await c.request.text())
`;
          break;
        case "arrayBuffer":
        case "application/octet-stream":
          fnLiteral += `c.body = await c.request.arrayBuffer()
`;
          break;
        case "formdata":
        case "multipart/form-data":
          fnLiteral += `c.body = {}
`;
          if (isOptional(validator.body))
            fnLiteral += `let form; try { form = await c.request.formData() } catch {}`;
          else
            fnLiteral += `const form = await c.request.formData()`;
          fnLiteral += `
if(form)
\t\t\t\t\t\tfor (const key of form.keys()) {
\t\t\t\t\t\t\tif (c.body[key])
\t\t\t\t\t\t\t\tcontinue

\t\t\t\t\t\t\tconst value = form.getAll(key)
\t\t\t\t\t\t\tif (value.length === 1)
\t\t\t\t\t\t\t\tc.body[key] = value[0]
\t\t\t\t\t\t\telse c.body[key] = value
\t\t\t\t\t\t} else form = {}
`;
          break;
      }
    } else if (hasBodyInference) {
      fnLiteral += `
`;
      fnLiteral += hasHeaders ? `let contentType = c.headers['content-type']` : `let contentType = c.request.headers.get('content-type')`;
      fnLiteral += `
\t\t\t\tif (contentType) {
\t\t\t\t\tconst index = contentType.indexOf(';')
\t\t\t\t\tif (index !== -1) contentType = contentType.substring(0, index)

\t\t\t\t\tc.contentType = contentType
`;
      if (hooks.parse.length) {
        fnLiteral += `let used = false
`;
        const reporter = report("parse", {
          total: hooks.parse.length
        });
        for (let i = 0;i < hooks.parse.length; i++) {
          const endUnit = reporter.resolveChild(hooks.parse[i].fn.name);
          const name = `bo${i}`;
          if (i !== 0)
            fnLiteral += `if(!used) {
`;
          fnLiteral += `let ${name} = parse[${i}](c, contentType)
`;
          fnLiteral += `if(${name} instanceof Promise) ${name} = await ${name}
`;
          fnLiteral += `if(${name} !== undefined) { c.body = ${name}; used = true }
`;
          endUnit();
          if (i !== 0)
            fnLiteral += `}`;
        }
        reporter.resolve();
      }
      fnLiteral += `
delete c.contentType
`;
      if (hooks.parse.length)
        fnLiteral += `if (!used) {`;
      if (hooks.type && !Array.isArray(hooks.type)) {
        switch (hooks.type) {
          case "json":
          case "application/json":
            if (isOptional(validator.body))
              fnLiteral += `try { c.body = await c.request.json() } catch {}`;
            else
              fnLiteral += `c.body = await c.request.json()`;
            break;
          case "text":
          case "text/plain":
            fnLiteral += `c.body = await c.request.text()
`;
            break;
          case "urlencoded":
          case "application/x-www-form-urlencoded":
            fnLiteral += `c.body = parseQuery(await c.request.text())
`;
            break;
          case "arrayBuffer":
          case "application/octet-stream":
            fnLiteral += `c.body = await c.request.arrayBuffer()
`;
            break;
          case "formdata":
          case "multipart/form-data":
            fnLiteral += `c.body = {}

\t\t\t\t\t\t\tconst form = await c.request.formData()
\t\t\t\t\t\t\tfor (const key of form.keys()) {
\t\t\t\t\t\t\t\tif (c.body[key])
\t\t\t\t\t\t\t\t\tcontinue

\t\t\t\t\t\t\t\tconst value = form.getAll(key)
\t\t\t\t\t\t\t\tif (value.length === 1)
\t\t\t\t\t\t\t\t\tc.body[key] = value[0]
\t\t\t\t\t\t\t\telse c.body[key] = value
\t\t\t\t\t\t\t}
`;
            break;
        }
      } else {
        fnLiteral += `
\t\t\t\t\tswitch (contentType) {
\t\t\t\t\t\tcase 'application/json':
\t\t\t\t\t\t\t${isOptional(validator.body) ? "try { c.body = await c.request.json() } catch {}" : "c.body = await c.request.json()"}
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'text/plain':
\t\t\t\t\t\t\tc.body = await c.request.text()
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'application/x-www-form-urlencoded':
\t\t\t\t\t\t\tc.body = parseQuery(await c.request.text())
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'application/octet-stream':
\t\t\t\t\t\t\tc.body = await c.request.arrayBuffer();
\t\t\t\t\t\t\tbreak

\t\t\t\t\t\tcase 'multipart/form-data':
\t\t\t\t\t\t\tc.body = {}

\t\t\t\t\t\t\tconst form = await c.request.formData()
\t\t\t\t\t\t\tfor (const key of form.keys()) {
\t\t\t\t\t\t\t\tif (c.body[key])
\t\t\t\t\t\t\t\t\tcontinue

\t\t\t\t\t\t\t\tconst value = form.getAll(key)
\t\t\t\t\t\t\t\tif (value.length === 1)
\t\t\t\t\t\t\t\t\tc.body[key] = value[0]
\t\t\t\t\t\t\t\telse c.body[key] = value
\t\t\t\t\t\t\t}

\t\t\t\t\t\t\tbreak
\t\t\t\t\t}`;
      }
      if (hooks.parse.length)
        fnLiteral += `}`;
      fnLiteral += `}
`;
    }
    fnLiteral += `
isParsing = false
`;
  }
  parseReporter.resolve();
  if (hooks?.transform) {
    const reporter = report("transform", {
      total: hooks.transform.length
    });
    if (hooks.transform.length)
      fnLiteral += `
let transformed
`;
    for (let i = 0;i < hooks.transform.length; i++) {
      const transform4 = hooks.transform[i];
      const endUnit = reporter.resolveChild(transform4.fn.name);
      fnLiteral += isAsync(transform4) ? `transformed = await transform[${i}](c)
` : `transformed = transform[${i}](c)
`;
      if (transform4.subType === "mapDerive")
        fnLiteral += `if(transformed instanceof ElysiaCustomStatusResponse)
\t\t\t\t\tthrow transformed
\t\t\t\telse {
\t\t\t\t\ttransformed.request = c.request
\t\t\t\t\ttransformed.store = c.store
\t\t\t\t\ttransformed.qi = c.qi
\t\t\t\t\ttransformed.path = c.path
\t\t\t\t\ttransformed.url = c.url
\t\t\t\t\ttransformed.redirect = c.redirect
\t\t\t\t\ttransformed.set = c.set
\t\t\t\t\ttransformed.error = c.error

\t\t\t\t\tc = transformed
\t\t\t}`;
      else
        fnLiteral += `if(transformed instanceof ElysiaCustomStatusResponse)
\t\t\t\t\tthrow transformed
\t\t\t\telse
\t\t\t\t\tObject.assign(c, transformed)
`;
      endUnit();
    }
    reporter.resolve();
  }
  if (validator) {
    fnLiteral += `
`;
    if (validator.headers) {
      if (normalize && "Clean" in validator.headers && !hasAdditionalProperties(validator.headers))
        fnLiteral += `c.headers = validator.headers.Clean(c.headers);
`;
      if (hasProperty("default", validator.headers.schema))
        for (const [key, value2] of Object.entries(exports_value2.Default(validator.headers.schema, {}))) {
          const parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
          if (parsed !== undefined)
            fnLiteral += `c.headers['${key}'] ??= ${parsed}
`;
        }
      if (isOptional(validator.headers))
        fnLiteral += `if(isNotEmpty(c.headers)) {`;
      fnLiteral += `if(validator.headers.Check(c.headers) === false) {
\t\t\t\t${composeValidation("headers")}
\t\t\t}`;
      if (hasTransform(validator.headers.schema))
        fnLiteral += `c.headers = validator.headers.Decode(c.headers)
`;
      if (isOptional(validator.headers))
        fnLiteral += "}";
    }
    if (validator.params) {
      if (hasProperty("default", validator.params.schema))
        for (const [key, value2] of Object.entries(exports_value2.Default(validator.params.schema, {}))) {
          const parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
          if (parsed !== undefined)
            fnLiteral += `c.params['${key}'] ??= ${parsed}
`;
        }
      fnLiteral += `if(validator.params.Check(c.params) === false) {
\t\t\t\t${composeValidation("params")}
\t\t\t}`;
      if (hasTransform(validator.params.schema))
        fnLiteral += `
c.params = validator.params.Decode(c.params)
`;
    }
    if (validator.query) {
      if (normalize && "Clean" in validator.query && !hasAdditionalProperties(validator.query))
        fnLiteral += `c.query = validator.query.Clean(c.query);
`;
      if (hasProperty("default", validator.query.schema))
        for (const [key, value2] of Object.entries(exports_value2.Default(validator.query.schema, {}))) {
          const parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
          if (parsed !== undefined)
            fnLiteral += `if(c.query['${key}'] === undefined) c.query['${key}'] = ${parsed}
`;
        }
      if (isOptional(validator.query))
        fnLiteral += `if(isNotEmpty(c.query)) {`;
      fnLiteral += `if(validator.query.Check(c.query) === false) {
          \t\t${composeValidation("query")}
\t\t\t}`;
      if (hasTransform(validator.query.schema))
        fnLiteral += `
c.query = validator.query.Decode(Object.assign({}, c.query))
`;
      if (isOptional(validator.query))
        fnLiteral += `}`;
    }
    if (validator.body) {
      if (normalize && "Clean" in validator.body && !hasAdditionalProperties(validator.body))
        fnLiteral += `c.body = validator.body.Clean(c.body);
`;
      const doesHaveTransform = hasTransform(validator.body.schema);
      if (doesHaveTransform || isOptional(validator.body))
        fnLiteral += `
const isNotEmptyObject = c.body && (typeof c.body === "object" && isNotEmpty(c.body))
`;
      if (hasProperty("default", validator.body.schema)) {
        const value2 = exports_value2.Default(validator.body.schema, validator.body.schema.type === "object" ? {} : undefined);
        const parsed = typeof value2 === "object" ? JSON.stringify(value2) : typeof value2 === "string" ? `'${value2}'` : value2;
        fnLiteral += `if(validator.body.Check(c.body) === false) {
\t\t\t\t\tif (typeof c.body === 'object') {
\t\t\t\t\t\tc.body = Object.assign(${parsed}, c.body)
\t\t\t\t\t} else { c.body = ${parsed} }`;
        if (isOptional(validator.body))
          fnLiteral += `
\t\t\t\t\t    if(isNotEmptyObject && validator.body.Check(c.body) === false) {
            \t\t\t\t${composeValidation("body")}
             \t\t\t}
                    }`;
        else
          fnLiteral += `
    \t\t\t\tif(validator.body.Check(c.body) === false) {
        \t\t\t\t${composeValidation("body")}
         \t\t\t}
                }`;
      } else {
        if (isOptional(validator.body))
          fnLiteral += `if(isNotEmptyObject && validator.body.Check(c.body) === false) {
         \t\t\t${composeValidation("body")}
          \t\t}`;
        else
          fnLiteral += `if(validator.body.Check(c.body) === false) {
         \t\t\t${composeValidation("body")}
          \t\t}`;
      }
      if (doesHaveTransform)
        fnLiteral += `
if(isNotEmptyObject) c.body = validator.body.Decode(c.body)
`;
    }
    if (isNotEmpty(cookieValidator?.schema?.properties ?? cookieValidator?.schema?.schema ?? {})) {
      fnLiteral += `const cookieValue = {}
    \t\t\tfor(const [key, value] of Object.entries(c.cookie))
    \t\t\t\tcookieValue[key] = value.value
`;
      if (hasProperty("default", cookieValidator.schema))
        for (const [key, value2] of Object.entries(exports_value2.Default(cookieValidator.schema, {}))) {
          fnLiteral += `cookieValue['${key}'] = ${typeof value2 === "object" ? JSON.stringify(value2) : value2}
`;
        }
      if (isOptional(validator.cookie))
        fnLiteral += `if(isNotEmpty(c.cookie)) {`;
      fnLiteral += `if(validator.cookie.Check(cookieValue) === false) {
\t\t\t\t${composeValidation("cookie", "cookieValue")}
\t\t\t}`;
      if (hasTransform(validator.cookie.schema))
        fnLiteral += `
for(const [key, value] of Object.entries(validator.cookie.Decode(cookieValue)))
\t\t\t\t\tc.cookie[key].value = value
`;
      if (isOptional(validator.cookie))
        fnLiteral += `}`;
    }
  }
  if (hooks?.beforeHandle) {
    const reporter = report("beforeHandle", {
      total: hooks.beforeHandle.length
    });
    let hasResolve = false;
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      const beforeHandle = hooks.beforeHandle[i];
      const endUnit = reporter.resolveChild(beforeHandle.fn.name);
      const returning = hasReturn(beforeHandle);
      const isResolver = beforeHandle.subType === "resolve" || beforeHandle.subType === "mapResolve";
      if (isResolver) {
        if (!hasResolve) {
          hasResolve = true;
          fnLiteral += `
let resolved
`;
        }
        fnLiteral += isAsync(beforeHandle) ? `resolved = await beforeHandle[${i}](c);
` : `resolved = beforeHandle[${i}](c);
`;
        if (beforeHandle.subType === "mapResolve")
          fnLiteral += `if(resolved instanceof ElysiaCustomStatusResponse)
\t\t\t\t\t\tthrow resolved
\t\t\t\t\telse {
\t\t\t\t\t\tresolved.request = c.request
\t\t\t\t\t\tresolved.store = c.store
\t\t\t\t\t\tresolved.qi = c.qi
\t\t\t\t\t\tresolved.path = c.path
\t\t\t\t\t\tresolved.url = c.url
\t\t\t\t\t\tresolved.redirect = c.redirect
\t\t\t\t\t\tresolved.set = c.set
\t\t\t\t\t\tresolved.error = c.error

\t\t\t\t\t\tc = resolved
\t\t\t\t\t}`;
        else
          fnLiteral += `if(resolved instanceof ElysiaCustomStatusResponse)
\t\t\t\t\t\tthrow resolved
\t\t\t\t\telse
\t\t\t\t\t\tObject.assign(c, resolved)
`;
      } else if (!returning) {
        fnLiteral += isAsync(beforeHandle) ? `await beforeHandle[${i}](c);
` : `beforeHandle[${i}](c);
`;
        endUnit();
      } else {
        fnLiteral += isAsync(beforeHandle) ? `be = await beforeHandle[${i}](c);
` : `be = beforeHandle[${i}](c);
`;
        endUnit("be");
        fnLiteral += `if(be !== undefined) {
`;
        reporter.resolve();
        if (hooks.afterHandle?.length) {
          report("handle", {
            name: isHandleFn ? handler.name : undefined
          }).resolve();
          const reporter2 = report("afterHandle", {
            total: hooks.afterHandle.length
          });
          for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
            const hook = hooks.afterHandle[i2];
            const returning2 = hasReturn(hook);
            const endUnit2 = reporter2.resolveChild(hook.fn.name);
            fnLiteral += `c.response = be
`;
            if (!returning2) {
              fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i2}](c, be)
` : `afterHandle[${i2}](c, be)
`;
            } else {
              fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i2}](c)
` : `af = afterHandle[${i2}](c)
`;
              fnLiteral += `if(af !== undefined) { c.response = be = af }
`;
            }
            endUnit2("af");
          }
          reporter2.resolve();
        }
        if (validator.response)
          fnLiteral += composeResponseValidation("be");
        const mapResponseReporter = report("mapResponse", {
          total: hooks.mapResponse.length
        });
        if (hooks.mapResponse.length) {
          fnLiteral += `
c.response = be
`;
          for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
            const mapResponse2 = hooks.mapResponse[i2];
            const endUnit2 = mapResponseReporter.resolveChild(mapResponse2.fn.name);
            fnLiteral += `
if(mr === undefined) {
\t\t\t\t\t\t\tmr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](c)
\t\t\t\t\t\t\tif(mr !== undefined) be = c.response = mr
\t\t\t\t\t\t}
`;
            endUnit2();
          }
        }
        mapResponseReporter.resolve();
        fnLiteral += encodeCookie;
        fnLiteral += `return mapEarlyResponse(${saveResponse} be, c.set ${requestMapper})}
`;
      }
    }
    reporter.resolve();
  }
  if (hooks?.afterHandle.length) {
    const handleReporter = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (hooks.afterHandle.length)
      fnLiteral += isAsyncHandler ? `let r = c.response = await ${handle};
` : `let r = c.response = ${handle};
`;
    else
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
    handleReporter.resolve();
    const reporter = report("afterHandle", {
      total: hooks.afterHandle.length
    });
    for (let i = 0;i < hooks.afterHandle.length; i++) {
      const hook = hooks.afterHandle[i];
      const returning = hasReturn(hook);
      const endUnit = reporter.resolveChild(hook.fn.name);
      if (!returning) {
        fnLiteral += isAsync(hook.fn) ? `await afterHandle[${i}](c)
` : `afterHandle[${i}](c)
`;
        endUnit();
      } else {
        fnLiteral += isAsync(hook.fn) ? `af = await afterHandle[${i}](c)
` : `af = afterHandle[${i}](c)
`;
        endUnit("af");
        if (validator.response) {
          fnLiteral += `if(af !== undefined) {`;
          reporter.resolve();
          fnLiteral += composeResponseValidation("af");
          fnLiteral += `c.response = af }`;
        } else {
          fnLiteral += `if(af !== undefined) {`;
          reporter.resolve();
          fnLiteral += `c.response = af}
`;
        }
      }
    }
    reporter.resolve();
    fnLiteral += `r = c.response
`;
    if (validator.response)
      fnLiteral += composeResponseValidation();
    fnLiteral += encodeCookie;
    const mapResponseReporter = report("mapResponse", {
      total: hooks.mapResponse.length
    });
    if (hooks.mapResponse.length) {
      for (let i = 0;i < hooks.mapResponse.length; i++) {
        const mapResponse2 = hooks.mapResponse[i];
        const endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
        fnLiteral += `
mr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
\t\t\t\tif(mr !== undefined) r = c.response = mr
`;
        endUnit();
      }
    }
    mapResponseReporter.resolve();
    if (hasSet)
      fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
    else
      fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
  } else {
    const handleReporter = report("handle", {
      name: isHandleFn ? handler.name : undefined
    });
    if (validator.response || hooks.mapResponse.length) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      handleReporter.resolve();
      if (validator.response)
        fnLiteral += composeResponseValidation();
      report("afterHandle").resolve();
      const mapResponseReporter = report("mapResponse", {
        total: hooks.mapResponse.length
      });
      if (hooks.mapResponse.length) {
        fnLiteral += `
c.response = r
`;
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          const mapResponse2 = hooks.mapResponse[i];
          const endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
if(mr === undefined) {
\t\t\t\t\t\tmr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
    \t\t\t\t\tif(mr !== undefined) r = c.response = mr
\t\t\t\t\t}
`;
          endUnit();
        }
      }
      mapResponseReporter.resolve();
      fnLiteral += encodeCookie;
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
\t\t\t\t\tisNotEmpty(c.set.headers) ||
\t\t\t\t\tc.set.status !== 200 ||
\t\t\t\t\tc.set.redirect ||
\t\t\t\t\tc.set.cookie
\t\t\t\t)
\t\t\t\t\treturn mapResponse(${saveResponse} ${handle}.clone(), c.set ${requestMapper})
\t\t\t\telse
\t\t\t\t\treturn ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += `
`;
      } else if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
    } else if (hasCookie || hasTrace) {
      fnLiteral += isAsyncHandler ? `let r = await ${handle};
` : `let r = ${handle};
`;
      handleReporter.resolve();
      report("afterHandle").resolve();
      const mapResponseReporter = report("mapResponse", {
        total: hooks.mapResponse.length
      });
      if (hooks.mapResponse.length) {
        fnLiteral += `
c.response = r
`;
        for (let i = 0;i < hooks.mapResponse.length; i++) {
          const mapResponse2 = hooks.mapResponse[i];
          const endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
if(mr === undefined) {
\t\t\t\t\t\t\tmr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](c)
    \t\t\t\t\t\tif(mr !== undefined) r = c.response = mr
\t\t\t\t\t\t}
`;
          endUnit();
        }
      }
      mapResponseReporter.resolve();
      fnLiteral += encodeCookie;
      if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} r, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} r ${requestMapper})
`;
    } else {
      handleReporter.resolve();
      const handled = isAsyncHandler ? `await ${handle}` : handle;
      report("afterHandle").resolve();
      if (handler instanceof Response) {
        fnLiteral += inference.set ? `if(
\t\t\t\t\tisNotEmpty(c.set.headers) ||
\t\t\t\t\tc.set.status !== 200 ||
\t\t\t\t\tc.set.redirect ||
\t\t\t\t\tc.set.cookie
\t\t\t\t)
\t\t\t\t\treturn mapResponse(${saveResponse} ${handle}.clone(), c.set ${requestMapper})
\t\t\t\telse
\t\t\t\t\treturn ${handle}.clone()` : `return ${handle}.clone()`;
        fnLiteral += `
`;
      } else if (hasSet)
        fnLiteral += `return mapResponse(${saveResponse} ${handled}, c.set ${requestMapper})
`;
      else
        fnLiteral += `return mapCompactResponse(${saveResponse} ${handled} ${requestMapper})
`;
    }
  }
  fnLiteral += `
} catch(error) {`;
  if (hasBody)
    fnLiteral += `
if(isParsing) error = new ParseError()
`;
  if (!maybeAsync)
    fnLiteral += `
return (async () => {
`;
  fnLiteral += `
const set = c.set
if (!set.status || set.status < 300) set.status = error?.status || 500
`;
  if (hasTrace)
    for (let i = 0;i < hooks.trace.length; i++)
      fnLiteral += `report${i}?.resolve(error);reportChild${i}?.(error);
`;
  const errorReporter = report("error", {
    total: hooks.error.length
  });
  if (hooks.error.length) {
    fnLiteral += `
\t\t\t\tc.error = error
\t\t\t\tif(error instanceof TypeBoxError) {
\t\t\t\t\tc.code = "VALIDATION"
\t\t\t\t\tc.set.status = 422
\t\t\t\t} else
\t\t\t\t\tc.code = error.code ?? error[ERROR_CODE] ?? "UNKNOWN"
\t\t\t\tlet er
\t\t\t`;
    for (let i = 0;i < hooks.error.length; i++) {
      const endUnit = errorReporter.resolveChild(hooks.error[i].fn.name);
      if (isAsync(hooks.error[i]))
        fnLiteral += `
er = await handleErrors[${i}](c)
`;
      else
        fnLiteral += `
er = handleErrors[${i}](c)
if (er instanceof Promise) er = await er
`;
      endUnit();
      const mapResponseReporter = report("mapResponse", {
        total: hooks.mapResponse.length
      });
      if (hooks.mapResponse.length) {
        for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
          const mapResponse2 = hooks.mapResponse[i2];
          const endUnit2 = mapResponseReporter.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
c.response = er

\t\t\t\t\t\t\ter = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](c)
\t\t\t\t\t\t\tif(er instanceof Promise) er = await er
`;
          endUnit2();
        }
      }
      mapResponseReporter.resolve();
      fnLiteral += `er = mapEarlyResponse(er, set ${requestMapper})
`;
      fnLiteral += `if (er) {`;
      if (hasTrace) {
        for (let i2 = 0;i2 < hooks.trace.length; i2++)
          fnLiteral += `
report${i2}.resolve()
`;
        errorReporter.resolve();
      }
      fnLiteral += `return er
}
`;
    }
  }
  errorReporter.resolve();
  fnLiteral += `return handleError(c, error, true)
`;
  if (!maybeAsync)
    fnLiteral += "})()";
  fnLiteral += "}";
  if (hasAfterResponse || hasTrace) {
    fnLiteral += ` finally { `;
    if (!maybeAsync)
      fnLiteral += ";(async () => {";
    const reporter = report("afterResponse", {
      total: hooks.afterResponse.length
    });
    if (hasAfterResponse) {
      for (let i = 0;i < hooks.afterResponse.length; i++) {
        const endUnit = reporter.resolveChild(hooks.afterResponse[i].fn.name);
        fnLiteral += `
await afterResponse[${i}](c);
`;
        endUnit();
      }
    }
    reporter.resolve();
    if (!maybeAsync)
      fnLiteral += "})();";
    fnLiteral += `}`;
  }
  fnLiteral = `const {
\t\thandler,
\t\thandleError,
\t\thooks: {
\t\t\ttransform,
\t\t\tresolve,
\t\t\tbeforeHandle,
\t\t\tafterHandle,
\t\t\tmapResponse: onMapResponse,
\t\t\tparse,
\t\t\terror: handleErrors,
\t\t\tafterResponse,
\t\t\ttrace: _trace
\t\t},
\t\tvalidator,
\t\tutils: {
\t\t\tmapResponse,
\t\t\tmapCompactResponse,
\t\t\tmapEarlyResponse,
\t\t\tparseQuery,
\t\t\tparseQueryFromURL,
\t\t\tisNotEmpty
\t\t},
\t\terror: {
\t\t\tNotFoundError,
\t\t\tValidationError,
\t\t\tInternalServerError,
\t\t\tParseError
\t\t},
\t\tschema,
\t\tdefinitions,
\t\tERROR_CODE,
\t\tparseCookie,
\t\tsignCookie,
\t\tdecodeURIComponent,
\t\tElysiaCustomStatusResponse,
\t\tELYSIA_TRACE,
\t\tELYSIA_REQUEST_ID,
\t\tgetServer,
\t\tTypeBoxError
\t} = hooks

\tconst trace = _trace.map(x => typeof x === 'function' ? x : x.fn)

\treturn ${maybeAsync ? "async" : ""} function handle(c) {
\t\t${hooks.beforeHandle.length ? "let be" : ""}
\t\t${hooks.afterHandle.length ? "let af" : ""}
\t\t${hooks.mapResponse.length ? "let mr" : ""}

\t\t${allowMeta ? "c.schema = schema; c.defs = definitions" : ""}
\t\t${fnLiteral}
\t}`;
  try {
    return Function("hooks", fnLiteral)({
      handler,
      hooks: lifeCycleToFn(hooks),
      validator,
      handleError: app.handleError,
      utils: {
        mapResponse,
        mapCompactResponse,
        mapEarlyResponse,
        parseQuery,
        parseQueryFromURL,
        isNotEmpty
      },
      error: {
        NotFoundError,
        ValidationError,
        InternalServerError,
        ParseError
      },
      schema: app.router.history,
      definitions: app.definitions.type,
      ERROR_CODE,
      parseCookie,
      signCookie,
      decodeURIComponent: import_fast_decode_uri_component3.default,
      ElysiaCustomStatusResponse,
      ELYSIA_TRACE,
      ELYSIA_REQUEST_ID,
      getServer: () => app.getServer(),
      TypeBoxError
    });
  } catch {
    const debugHooks = lifeCycleToFn(hooks);
    console.log("[Composer] failed to generate optimized handler");
    console.log("Please report the following to SaltyAom privately as it may include sensitive information about your codebase:");
    console.log("---");
    console.log({
      handler: typeof handler === "function" ? handler.toString() : handler,
      hooks: {
        ...debugHooks,
        transform: debugHooks?.transform?.map?.((x) => x.toString()),
        resolve: debugHooks?.resolve?.map?.((x) => x.toString()),
        beforeHandle: debugHooks?.beforeHandle?.map?.((x) => x.toString()),
        afterHandle: debugHooks?.afterHandle?.map?.((x) => x.toString()),
        mapResponse: debugHooks?.mapResponse?.map?.((x) => x.toString()),
        parse: debugHooks?.parse?.map?.((x) => x.toString()),
        error: debugHooks?.error?.map?.((x) => x.toString()),
        afterResponse: debugHooks?.afterResponse?.map?.((x) => x.toString()),
        stop: debugHooks?.stop?.map?.((x) => x.toString())
      },
      validator,
      definitions: app.definitions.type
    });
    console.log("---");
    process.exit(1);
  }
};
var composeGeneralHandler = (app) => {
  const standardHostname = app.config.handler?.standardHostname ?? true;
  let decoratorsLiteral = "";
  let fnLiteral = "";
  const defaultHeaders = app.setHeaders;
  for (const key of Object.keys(app.singleton.decorator))
    decoratorsLiteral += `,${key}: app.singleton.decorator.${key}`;
  const router = app.router;
  const hasTrace = app.event.trace.length > 0;
  let findDynamicRoute = `
\tconst route = router.find(request.method, path) ${router.http.root.ALL ? '?? router.find("ALL", path)' : ""}

\tif (route === null)
\t\treturn ${app.event.error.length ? `app.handleError(ctx, notFound)` : app.event.request.length ? `new Response(error404Message, {
\t\t\t\t\tstatus: ctx.set.status === 200 ? 404 : ctx.set.status,
\t\t\t\t\theaders: ctx.set.headers
\t\t\t\t})` : `error404.clone()`}

\tctx.params = route.params
`;
  findDynamicRoute += `if(route.store.handler) return route.store.handler(ctx)
\treturn (route.store.handler = route.store.compile())(ctx)
`;
  let switchMap = ``;
  for (const [path, { code, all, static: staticFn }] of Object.entries(router.static.http.map)) {
    if (staticFn)
      switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
    switchMap += `case '${path}':
switch(request.method) {
${code}
${all ?? `default: break map`}}

`;
  }
  const maybeAsync = app.event.request.some(isAsync);
  fnLiteral += `const {
\t\tapp,
\t\tmapEarlyResponse,
\t\tNotFoundError,
\t\trandomId,
\t\thandleError,
\t\terror,
\t\tredirect,
\t\tELYSIA_TRACE,
\t\tELYSIA_REQUEST_ID,
\t\tgetServer
\t} = data

\tconst store = app.singleton.store
\tconst staticRouter = app.router.static.http
\tconst st = staticRouter.handlers
\tconst wsRouter = app.router.ws
\tconst router = app.router.http
\tconst trace = app.event.trace.map(x => typeof x === 'function' ? x : x.fn)

\tconst notFound = new NotFoundError()
\tconst hoc = app.extender.higherOrderFunctions.map(x => x.fn)

\t${app.event.request.length ? `const onRequest = app.event.request.map(x => x.fn)` : ""}
\t${app.event.error.length ? "" : `
const error404Message = notFound.message.toString()
\tconst error404 = new Response(error404Message, { status: 404 });
`}

\t${app.event.trace.length ? `const ${app.event.trace.map((_, i) => `tr${i} = app.event.trace[${i}].fn`).join(",")}` : ""}

\t${maybeAsync ? "async" : ""} function map(request) {
`;
  if (app.event.request.length)
    fnLiteral += `let re`;
  fnLiteral += `
const url = request.url
\t\tconst s = url.indexOf('/', ${standardHostname ? 11 : 7})
\t\tconst qi = url.indexOf('?', s + 1)
\t\tlet path
\t\tif(qi === -1)
\t\t\tpath = url.substring(s)
\t\telse
\t\t\tpath = url.substring(s, qi)
`;
  fnLiteral += `${hasTrace ? "const id = randomId()" : ""}
\t\tconst ctx = {
\t\t\trequest,
\t\t\tstore,
\t\t\tqi,
\t\t\tpath,
\t\t\turl,
\t\t\tredirect,
\t\t\tset: {
\t\t\t\theaders: ${Object.keys(defaultHeaders ?? {}).length ? "Object.assign({}, app.setHeaders)" : "{}"},
\t\t\t\tstatus: 200
\t\t\t},
\t\t\terror
\t\t\t${app.inference.server ? `, get server() {
\t\t\t\t\t\t\treturn getServer()
\t\t\t\t\t\t}` : ""}
\t\t\t${hasTrace ? ",[ELYSIA_REQUEST_ID]: id" : ""}
\t\t\t${decoratorsLiteral}
\t\t}
`;
  if (app.event.trace.length)
    fnLiteral += `
ctx[ELYSIA_TRACE] = [${app.event.trace.map((_, i) => `tr${i}(ctx)`).join(",")}]
`;
  const report = createReport({
    context: "ctx",
    trace: app.event.trace,
    addFn(word) {
      fnLiteral += word;
    }
  });
  const reporter = report("request", {
    attribute: "ctx",
    total: app.event.request.length
  });
  if (app.event.request.length) {
    fnLiteral += `
 try {
`;
    for (let i = 0;i < app.event.request.length; i++) {
      const hook = app.event.request[i];
      const withReturn = hasReturn(hook);
      const maybeAsync2 = isAsync(hook);
      const endUnit = reporter.resolveChild(app.event.request[i].fn.name);
      if (withReturn) {
        fnLiteral += `re = mapEarlyResponse(
\t\t\t\t\t${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx),
\t\t\t\t\tctx.set,
\t\t\t\t\trequest
\t\t\t\t)
`;
        endUnit("re");
        fnLiteral += `if(re !== undefined) return re
`;
      } else {
        fnLiteral += `${maybeAsync2 ? "await" : ""} onRequest[${i}](ctx)
`;
        endUnit();
      }
    }
    fnLiteral += `} catch (error) {
\t\t\treturn app.handleError(ctx, error)
\t\t}`;
  }
  reporter.resolve();
  const wsPaths = app.router.static.ws;
  const wsRouter = app.router.ws;
  if (Object.keys(wsPaths).length || wsRouter.history.length) {
    fnLiteral += `
\t\t\tif(request.method === 'GET') {
\t\t\t\tswitch(path) {`;
    for (const [path, index] of Object.entries(wsPaths)) {
      fnLiteral += `
\t\t\t\t\tcase '${path}':
\t\t\t\t\t\tif(request.headers.get('upgrade') === 'websocket')
\t\t\t\t\t\t\treturn st[${index}](ctx)

\t\t\t\t\t\tbreak`;
    }
    fnLiteral += `
\t\t\t\tdefault:
\t\t\t\t\tif(request.headers.get('upgrade') === 'websocket') {
\t\t\t\t\t\tconst route = wsRouter.find('ws', path)

\t\t\t\t\t\tif(route) {
\t\t\t\t\t\t\tctx.params = route.params

\t\t\t\t\t\t\tif(route.store.handler)
\t\t\t\t\t\t\t    return route.store.handler(ctx)

\t\t\t\t\t\t\treturn (route.store.handler = route.store.compile())(ctx)
\t\t\t\t\t\t}
\t\t\t\t\t}

\t\t\t\t\tbreak
\t\t\t}
\t\t}
`;
  }
  fnLiteral += `
\t\tmap: switch(path) {
\t\t\t${switchMap}

\t\t\tdefault:
\t\t\t\tbreak
\t\t}

\t\t${findDynamicRoute}
\t}
`;
  if (app.extender.higherOrderFunctions.length) {
    let handler = "map";
    for (let i = 0;i < app.extender.higherOrderFunctions.length; i++)
      handler = `hoc[${i}](${handler}, request)`;
    fnLiteral += `return function hocMap(request) { return ${handler}(request) }`;
  } else
    fnLiteral += `return map`;
  const handleError = composeErrorHandler(app);
  app.handleError = handleError;
  return Function("data", fnLiteral)({
    app,
    mapEarlyResponse,
    NotFoundError,
    randomId,
    handleError,
    error: error3,
    redirect,
    ELYSIA_TRACE,
    ELYSIA_REQUEST_ID,
    getServer: () => app.getServer()
  });
};
var composeErrorHandler = (app) => {
  const hooks = app.event;
  let fnLiteral = "";
  fnLiteral += `const {
\t\tapp: { event: { error: onErrorContainer, afterResponse: resContainer, mapResponse: _onMapResponse, trace: _trace } },
\t\tmapResponse,
\t\tERROR_CODE,
\t\tElysiaCustomStatusResponse,
\t\tELYSIA_TRACE,
\t\tELYSIA_REQUEST_ID
\t} = inject

\tconst trace = _trace.map(x => typeof x === 'function' ? x : x.fn)
\tconst onMapResponse = []

\tfor(let i = 0; i < _onMapResponse.length; i++)
\t\tonMapResponse.push(_onMapResponse[i].fn ?? _onMapResponse[i])

\tdelete _onMapResponse

\tconst onError = onErrorContainer.map(x => x.fn)
\tconst res = resContainer.map(x => x.fn)

\treturn ${app.event.error.find(isAsync) || app.event.mapResponse.find(isAsync) ? "async" : ""} function(context, error, skipGlobal) {`;
  const hasTrace = app.event.trace.length > 0;
  if (hasTrace)
    fnLiteral += `
const id = context[ELYSIA_REQUEST_ID]
`;
  const report = createReport({
    context: "context",
    trace: hooks.trace,
    addFn: (word) => {
      fnLiteral += word;
    }
  });
  fnLiteral += `
\t\tconst set = context.set
\t\tlet r

\t\tif(!context.code)
\t\t\tcontext.code = error.code ?? error[ERROR_CODE]

\t\tif(!(context.error instanceof Error))
\t\t\tcontext.error = error

\t\tif(error instanceof ElysiaCustomStatusResponse) {
\t\t\terror.status = error.code
\t\t\terror.message = error.response
\t\t}
`;
  const saveResponse = hasTrace || hooks.afterResponse.length > 0 || hooks.afterResponse.length > 0 ? "context.response = " : "";
  for (let i = 0;i < app.event.error.length; i++) {
    const handler = app.event.error[i];
    const response = `${isAsync(handler) ? "await " : ""}onError[${i}](context)`;
    fnLiteral += `
if(skipGlobal !== true) {
`;
    if (hasReturn(handler)) {
      fnLiteral += `r = ${response}; if(r !== undefined) {
\t\t\t\tif(r instanceof Response) return r

\t\t\t\tif(r instanceof ElysiaCustomStatusResponse) {
\t\t\t\t\terror.status = error.code
\t\t\t\t\terror.message = error.response
\t\t\t\t}

\t\t\t\tif(set.status === 200) set.status = error.status
`;
      const mapResponseReporter2 = report("mapResponse", {
        total: hooks.mapResponse.length,
        name: "context"
      });
      if (hooks.mapResponse.length) {
        for (let i2 = 0;i2 < hooks.mapResponse.length; i2++) {
          const mapResponse2 = hooks.mapResponse[i2];
          const endUnit = mapResponseReporter2.resolveChild(mapResponse2.fn.name);
          fnLiteral += `
context.response = r
\t\t\t\t\t\tr = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i2}](context)
`;
          endUnit();
        }
      }
      mapResponseReporter2.resolve();
      fnLiteral += `return mapResponse(${saveResponse} r, set, context.request)}
`;
    } else
      fnLiteral += response + `
`;
    fnLiteral += `
}
`;
  }
  fnLiteral += `if(error.constructor.name === "ValidationError" || error.constructor.name === "TransformDecodeError") {
\t    const reportedError = error.error ?? error
\t\tset.status = reportedError.status ?? 422
\t\treturn new Response(
\t\t\treportedError.message,
\t\t\t{
\t\t\t\theaders: Object.assign(
\t\t\t\t\t{ 'content-type': 'application/json'},
\t\t\t\t\tset.headers
\t\t\t\t),
\t\t\t\tstatus: set.status
\t\t\t}
\t\t)
\t} else {
\t\tif(error.code && typeof error.status === "number")
\t\t\treturn new Response(
\t\t\t\terror.message,
\t\t\t\t{ headers: set.headers, status: error.status }
\t\t\t)
`;
  const mapResponseReporter = report("mapResponse", {
    total: hooks.mapResponse.length,
    name: "context"
  });
  if (hooks.mapResponse.length) {
    for (let i = 0;i < hooks.mapResponse.length; i++) {
      const mapResponse2 = hooks.mapResponse[i];
      const endUnit = mapResponseReporter.resolveChild(mapResponse2.fn.name);
      fnLiteral += `
context.response = error
\t\t\terror = ${isAsyncName(mapResponse2) ? "await" : ""} onMapResponse[${i}](context)
`;
      endUnit();
    }
  }
  mapResponseReporter.resolve();
  fnLiteral += `
return mapResponse(${saveResponse} error, set, context.request)
}
}`;
  return Function("inject", fnLiteral)({
    app,
    mapResponse,
    ERROR_CODE,
    ElysiaCustomStatusResponse,
    ELYSIA_TRACE,
    ELYSIA_REQUEST_ID
  });
};
var createDynamicHandler = (app) => async (request) => {
  const url = request.url, s = url.indexOf("/", 11), qi = url.indexOf("?", s + 1), path = qi === -1 ? url.substring(s) : url.substring(s, qi);
  const set22 = {
    cookie: {},
    status: 200,
    headers: {}
  };
  const context = Object.assign({}, app.singleton.decorator, {
    set: set22,
    store: app.singleton.store,
    request,
    path,
    qi,
    redirect
  });
  try {
    for (let i = 0;i < app.event.request.length; i++) {
      const onRequest = app.event.request[i].fn;
      let response2 = onRequest(context);
      if (response2 instanceof Promise)
        response2 = await response2;
      response2 = mapEarlyResponse(response2, set22);
      if (response2)
        return context.response = response2;
    }
    const handler = app.router.dynamic.find(request.method, path) ?? app.router.dynamic.find("ALL", path);
    if (!handler)
      throw new NotFoundError;
    const { handle, hooks, validator, content } = handler.store;
    let body;
    if (request.method !== "GET" && request.method !== "HEAD") {
      if (content) {
        switch (content) {
          case "application/json":
            body = await request.json();
            break;
          case "text/plain":
            body = await request.text();
            break;
          case "application/x-www-form-urlencoded":
            body = parseQuery(await request.text());
            break;
          case "application/octet-stream":
            body = await request.arrayBuffer();
            break;
          case "multipart/form-data":
            body = {};
            const form2 = await request.formData();
            for (const key of form2.keys()) {
              if (body[key])
                continue;
              const value2 = form2.getAll(key);
              if (value2.length === 1)
                body[key] = value2[0];
              else
                body[key] = value2;
            }
            break;
        }
      } else {
        let contentType = request.headers.get("content-type");
        if (contentType) {
          const index = contentType.indexOf(";");
          if (index !== -1)
            contentType = contentType.slice(0, index);
          context.contentType = contentType;
          for (let i = 0;i < hooks.parse.length; i++) {
            const hook = hooks.parse[i].fn;
            let temp = hook(context, contentType);
            if (temp instanceof Promise)
              temp = await temp;
            if (temp) {
              body = temp;
              break;
            }
          }
          delete context.contentType;
          if (body === undefined) {
            switch (contentType) {
              case "application/json":
                body = await request.json();
                break;
              case "text/plain":
                body = await request.text();
                break;
              case "application/x-www-form-urlencoded":
                body = parseQuery(await request.text());
                break;
              case "application/octet-stream":
                body = await request.arrayBuffer();
                break;
              case "multipart/form-data":
                body = {};
                const form2 = await request.formData();
                for (const key of form2.keys()) {
                  if (body[key])
                    continue;
                  const value2 = form2.getAll(key);
                  if (value2.length === 1)
                    body[key] = value2[0];
                  else
                    body[key] = value2;
                }
                break;
            }
          }
        }
      }
    }
    context.body = body;
    context.params = handler?.params || undefined;
    context.query = qi === -1 ? {} : parseQueryFromURL(url.substring(qi + 1));
    context.headers = {};
    for (const [key, value2] of request.headers.entries())
      context.headers[key] = value2;
    const cookieMeta = Object.assign({}, app.config?.cookie, validator?.cookie?.config);
    const cookieHeaderValue = request.headers.get("cookie");
    context.cookie = await parseCookie(context.set, cookieHeaderValue, cookieMeta ? {
      secrets: cookieMeta.secrets !== undefined ? typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets.join(",") : undefined,
      sign: cookieMeta.sign === true ? true : cookieMeta.sign !== undefined ? typeof cookieMeta.sign === "string" ? cookieMeta.sign : cookieMeta.sign.join(",") : undefined
    } : undefined);
    for (let i = 0;i < hooks.transform.length; i++) {
      const hook = hooks.transform[i];
      const operation = hook.fn(context);
      if (hook.subType === "derive") {
        if (operation instanceof Promise)
          Object.assign(context, await operation);
        else
          Object.assign(context, operation);
      } else if (operation instanceof Promise)
        await operation;
    }
    if (validator) {
      if (validator.createHeaders?.()) {
        const _header = {};
        for (const key in request.headers)
          _header[key] = request.headers.get(key);
        if (validator.headers.Check(_header) === false)
          throw new ValidationError("header", validator.headers, _header);
      } else if (validator.headers?.Decode)
        context.headers = validator.headers.Decode(context.headers);
      if (validator.createParams?.()?.Check(context.params) === false) {
        throw new ValidationError("params", validator.params, context.params);
      } else if (validator.params?.Decode)
        context.params = validator.params.Decode(context.params);
      if (validator.createQuery?.()?.Check(context.query) === false)
        throw new ValidationError("query", validator.query, context.query);
      else if (validator.query?.Decode)
        context.query = validator.query.Decode(context.query);
      if (validator.createCookie?.()) {
        let cookieValue = {};
        for (const [key, value2] of Object.entries(context.cookie))
          cookieValue[key] = value2.value;
        if (validator.cookie.Check(cookieValue) === false)
          throw new ValidationError("cookie", validator.cookie, cookieValue);
        else if (validator.cookie?.Decode)
          cookieValue = validator.cookie.Decode(cookieValue);
      }
      if (validator.createBody?.()?.Check(body) === false)
        throw new ValidationError("body", validator.body, body);
      else if (validator.body?.Decode)
        context.body = validator.body.Decode(body);
    }
    for (let i = 0;i < hooks.beforeHandle.length; i++) {
      const hook = hooks.beforeHandle[i];
      let response2 = hook.fn(context);
      if (hook.subType === "resolve") {
        if (response2 instanceof ElysiaCustomStatusResponse) {
          const result = mapEarlyResponse(response2, context.set);
          if (result)
            return context.response = result;
        }
        if (response2 instanceof Promise)
          Object.assign(context, await response2);
        else
          Object.assign(context, response2);
        continue;
      } else if (response2 instanceof Promise)
        response2 = await response2;
      if (response2 !== undefined) {
        context.response = response2;
        for (let i2 = 0;i2 < hooks.afterHandle.length; i2++) {
          let newResponse = hooks.afterHandle[i2].fn(context);
          if (newResponse instanceof Promise)
            newResponse = await newResponse;
          if (newResponse)
            response2 = newResponse;
        }
        const result = mapEarlyResponse(response2, context.set);
        if (result)
          return context.response = result;
      }
    }
    let response = handle(context);
    if (response instanceof Promise)
      response = await response;
    if (!hooks.afterHandle.length) {
      const status = response instanceof ElysiaCustomStatusResponse ? response.code : set22.status ? typeof set22.status === "string" ? StatusMap[set22.status] : set22.status : 200;
      const responseValidator = validator?.createResponse?.()?.[status];
      if (responseValidator?.Check(response) === false)
        throw new ValidationError("response", responseValidator, response);
      else if (responseValidator?.Decode)
        response = responseValidator.Decode(response);
    } else {
      context.response = response;
      for (let i = 0;i < hooks.afterHandle.length; i++) {
        let newResponse = hooks.afterHandle[i].fn(context);
        if (newResponse instanceof Promise)
          newResponse = await newResponse;
        const result = mapEarlyResponse(newResponse, context.set);
        if (result !== undefined) {
          const responseValidator = validator?.response?.[result.status];
          if (responseValidator?.Check(result) === false)
            throw new ValidationError("response", responseValidator, result);
          else if (responseValidator?.Decode)
            response = responseValidator.Decode(response);
          return context.response = result;
        }
      }
    }
    if (context.set.cookie && cookieMeta?.sign) {
      const secret = !cookieMeta.secrets ? undefined : typeof cookieMeta.secrets === "string" ? cookieMeta.secrets : cookieMeta.secrets[0];
      if (cookieMeta.sign === true)
        for (const [key, cookie] of Object.entries(context.set.cookie))
          context.set.cookie[key].value = await signCookie(cookie.value, "${secret}");
      else {
        const properties = validator?.cookie?.schema?.properties;
        for (const name of cookieMeta.sign) {
          if (!(name in properties))
            continue;
          if (context.set.cookie[name]?.value) {
            context.set.cookie[name].value = await signCookie(context.set.cookie[name].value, secret);
          }
        }
      }
    }
    return context.response = mapResponse(response, context.set);
  } catch (error22) {
    const reportedError = error22 instanceof TransformDecodeError && error22.error ? error22.error : error22;
    if (reportedError.status)
      set22.status = reportedError.status;
    return app.handleError(context, reportedError);
  } finally {
    for (const afterResponse of app.event.afterResponse)
      await afterResponse.fn(context);
  }
};
var createDynamicErrorHandler = (app) => async (context, error22) => {
  const errorContext = Object.assign(context, { error: error22, code: error22.code });
  errorContext.set = context.set;
  for (let i = 0;i < app.event.error.length; i++) {
    const hook = app.event.error[i];
    let response = hook.fn(errorContext);
    if (response instanceof Promise)
      response = await response;
    if (response !== undefined && response !== null)
      return context.response = mapResponse(response, context.set);
  }
  return new Response(typeof error22.cause === "string" ? error22.cause : error22.message, {
    headers: context.set.headers,
    status: error22.status ?? 500
  });
};
var Elysia = class _Elysia {
  constructor(config = {}) {
    this.server = null;
    this.dependencies = {};
    this._routes = {};
    this._types = {
      Prefix: "",
      Scoped: false,
      Singleton: {},
      Definitions: {},
      Metadata: {}
    };
    this._ephemeral = {};
    this._volatile = {};
    this.version = version;
    this.singleton = {
      decorator: {},
      store: {},
      derive: {},
      resolve: {}
    };
    this.definitions = {
      type: {},
      error: {}
    };
    this.extender = {
      macros: [],
      higherOrderFunctions: []
    };
    this.validator = {
      global: null,
      scoped: null,
      local: null,
      getCandidate() {
        return mergeSchemaValidator(mergeSchemaValidator(this.global, this.scoped), this.local);
      }
    };
    this.event = {
      start: [],
      request: [],
      parse: [],
      transform: [],
      beforeHandle: [],
      afterHandle: [],
      mapResponse: [],
      afterResponse: [],
      trace: [],
      error: [],
      stop: []
    };
    this.telemetry = {
      stack: undefined
    };
    this.router = {
      http: new Memoirist,
      ws: new Memoirist,
      dynamic: new Memoirist,
      static: {
        http: {
          static: {},
          handlers: [],
          map: {},
          all: ""
        },
        ws: {}
      },
      history: []
    };
    this.routeTree = /* @__PURE__ */ new Map;
    this.inference = {
      body: false,
      cookie: false,
      headers: false,
      query: false,
      set: false,
      server: false
    };
    this.handle = async (request) => this.fetch(request);
    this.fetch = (request) => {
      return (this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this))(request);
    };
    this.handleError = async (context, error22) => (this.handleError = this.config.aot ? composeErrorHandler(this) : createDynamicErrorHandler(this))(context, error22);
    this.outerErrorHandler = (error22) => new Response(error22.message || error22.name || "Error", {
      status: error22?.status ?? 500
    });
    this.listen = (options, callback) => {
      if (typeof Bun === "undefined")
        throw new Error(".listen() is designed to run on Bun only. If you are running Elysia in other environment please use a dedicated plugin or export the handler via Elysia.fetch");
      this.compile();
      if (typeof options === "string") {
        if (!isNumericString(options))
          throw new Error("Port must be a numeric value");
        options = parseInt(options);
      }
      const fetch = this.fetch;
      const serve = typeof options === "object" ? {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        ...options || {},
        static: this.router.static.http.static,
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        fetch,
        error: this.outerErrorHandler
      } : {
        development: !isProduction,
        reusePort: true,
        ...this.config.serve || {},
        static: this.router.static.http.static,
        websocket: {
          ...this.config.websocket || {},
          ...websocket || {}
        },
        port: options,
        fetch,
        error: this.outerErrorHandler
      };
      this.server = Bun?.serve(serve);
      for (let i = 0;i < this.event.start.length; i++)
        this.event.start[i].fn(this);
      if (callback)
        callback(this.server);
      process.on("beforeExit", () => {
        if (this.server) {
          this.server.stop();
          this.server = null;
          for (let i = 0;i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
        }
      });
      this.promisedModules.then(() => {
        Bun?.gc(false);
      });
      return this;
    };
    this.stop = async (closeActiveConnections) => {
      if (!this.server)
        throw new Error("Elysia isn't running. Call `app.listen` to start the server.");
      if (this.server) {
        this.server.stop(closeActiveConnections);
        this.server = null;
        if (this.event.stop.length)
          for (let i = 0;i < this.event.stop.length; i++)
            this.event.stop[i].fn(this);
      }
    };
    if (config.tags) {
      if (!config.detail)
        config.detail = {
          tags: config.tags
        };
      else
        config.detail.tags = config.tags;
    }
    if (config.nativeStaticResponse === undefined)
      config.nativeStaticResponse = true;
    this.config = {};
    this.applyConfig(config ?? {});
    if (config?.analytic && (config?.name || config?.seed !== undefined))
      this.telemetry.stack = new Error().stack;
  }
  static {
    this.version = version;
  }
  get store() {
    return this.singleton.store;
  }
  get decorator() {
    return this.singleton.decorator;
  }
  get _scoped() {
    return this.config.scoped;
  }
  get routes() {
    return this.router.history;
  }
  getGlobalRoutes() {
    return this.router.history;
  }
  getServer() {
    return this.server;
  }
  get promisedModules() {
    if (!this._promisedModules)
      this._promisedModules = new PromiseGroup;
    return this._promisedModules;
  }
  env(model, env2 = Bun?.env ?? process.env) {
    const validator = getSchemaValidator(model, {
      dynamic: true,
      additionalProperties: true,
      coerce: true
    });
    if (validator.Check(env2) === false) {
      const error22 = new ValidationError("env", model, env2);
      throw new Error(error22.all.map((x) => x.summary).join(`
`));
    }
    return this;
  }
  wrap(fn) {
    this.extender.higherOrderFunctions.push({
      checksum: checksum(JSON.stringify({
        name: this.config.name,
        seed: this.config.seed,
        content: fn.toString()
      })),
      fn
    });
    return this;
  }
  applyMacro(localHook) {
    if (this.extender.macros.length) {
      const manage = createMacroManager({
        globalHook: this.event,
        localHook
      });
      const manager = {
        events: {
          global: this.event,
          local: localHook
        },
        onParse: manage("parse"),
        onTransform: manage("transform"),
        onBeforeHandle: manage("beforeHandle"),
        onAfterHandle: manage("afterHandle"),
        mapResponse: manage("mapResponse"),
        onAfterResponse: manage("afterResponse"),
        onError: manage("error")
      };
      for (const macro of this.extender.macros)
        traceBackMacro(macro.fn(manager), localHook);
    }
  }
  applyConfig(config) {
    this.config = {
      prefix: "",
      aot: true,
      strictPath: false,
      global: false,
      analytic: false,
      normalize: true,
      ...config,
      cookie: {
        path: "/",
        ...config?.cookie
      },
      experimental: config?.experimental ?? {},
      seed: config?.seed === undefined ? "" : config?.seed
    };
    return this;
  }
  get models() {
    const models = {};
    for (const [name, schema3] of Object.entries(this.definitions.type))
      models[name] = getSchemaValidator(schema3);
    return models;
  }
  add(method, path, handle, localHook, { allowMeta = false, skipPrefix = false } = {
    allowMeta: false,
    skipPrefix: false
  }) {
    localHook = localHookToLifeCycleStore(localHook);
    if (path !== "" && path.charCodeAt(0) !== 47)
      path = "/" + path;
    if (this.config.prefix && !skipPrefix && !this.config.scoped)
      path = this.config.prefix + path;
    if (localHook?.type)
      switch (localHook.type) {
        case "text":
          localHook.type = "text/plain";
          break;
        case "json":
          localHook.type = "application/json";
          break;
        case "formdata":
          localHook.type = "multipart/form-data";
          break;
        case "urlencoded":
          localHook.type = "application/x-www-form-urlencoded";
          break;
        case "arrayBuffer":
          localHook.type = "application/octet-stream";
          break;
        default:
          break;
      }
    const models = this.definitions.type;
    const dynamic = !this.config.aot;
    const instanceValidator = { ...this.validator.getCandidate() };
    const cloned = {
      body: localHook?.body ?? instanceValidator?.body,
      headers: localHook?.headers ?? instanceValidator?.headers,
      params: localHook?.params ?? instanceValidator?.params,
      query: localHook?.query ?? instanceValidator?.query,
      cookie: localHook?.cookie ?? instanceValidator?.cookie,
      response: localHook?.response ?? instanceValidator?.response
    };
    const cookieValidator = () => cloned.cookie ? getCookieValidator({
      validator: cloned.cookie,
      defaultConfig: this.config.cookie,
      config: cloned.cookie?.config ?? {},
      dynamic,
      models
    }) : undefined;
    const normalize = this.config.normalize;
    const validator = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.schema === true ? {
      body: getSchemaValidator(cloned.body, {
        dynamic,
        models,
        normalize,
        additionalCoerce: coercePrimitiveRoot()
      }),
      headers: getSchemaValidator(cloned.headers, {
        dynamic,
        models,
        additionalProperties: !this.config.normalize,
        coerce: true,
        additionalCoerce: stringToStructureCoercions()
      }),
      params: getSchemaValidator(cloned.params, {
        dynamic,
        models,
        coerce: true,
        additionalCoerce: stringToStructureCoercions()
      }),
      query: getSchemaValidator(cloned.query, {
        dynamic,
        models,
        normalize,
        coerce: true,
        additionalCoerce: stringToStructureCoercions()
      }),
      cookie: cookieValidator(),
      response: getResponseSchemaValidator(cloned.response, {
        dynamic,
        models,
        normalize
      })
    } : {
      createBody() {
        if (this.body)
          return this.body;
        return this.body = getSchemaValidator(cloned.body, {
          dynamic,
          models,
          normalize,
          additionalCoerce: coercePrimitiveRoot()
        });
      },
      createHeaders() {
        if (this.headers)
          return this.headers;
        return this.headers = getSchemaValidator(cloned.headers, {
          dynamic,
          models,
          additionalProperties: !normalize,
          coerce: true,
          additionalCoerce: stringToStructureCoercions()
        });
      },
      createParams() {
        if (this.params)
          return this.params;
        return this.params = getSchemaValidator(cloned.params, {
          dynamic,
          models,
          coerce: true,
          additionalCoerce: stringToStructureCoercions()
        });
      },
      createQuery() {
        if (this.query)
          return this.query;
        return this.query = getSchemaValidator(cloned.query, {
          dynamic,
          models,
          coerce: true,
          additionalCoerce: stringToStructureCoercions()
        });
      },
      createCookie() {
        if (this.cookie)
          return this.cookie;
        return this.cookie = cookieValidator();
      },
      createResponse() {
        if (this.response)
          return this.response;
        return this.response = getResponseSchemaValidator(cloned.response, {
          dynamic,
          models,
          normalize
        });
      }
    };
    const loosePath = path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
    localHook = mergeHook(localHook, instanceValidator);
    if (localHook.tags) {
      if (!localHook.detail)
        localHook.detail = {
          tags: localHook.tags
        };
      else
        localHook.detail.tags = localHook.tags;
    }
    if (isNotEmpty(this.config.detail))
      localHook.detail = mergeDeep(Object.assign({}, this.config.detail), localHook.detail);
    this.applyMacro(localHook);
    const hooks = mergeHook(this.event, localHook);
    if (this.config.aot === false) {
      this.router.dynamic.add(method, path, {
        validator,
        hooks,
        content: localHook?.type,
        handle
      });
      if (this.config.strictPath === false) {
        this.router.dynamic.add(method, loosePath, {
          validator,
          hooks,
          content: localHook?.type,
          handle
        });
      }
      this.router.history.push({
        method,
        path,
        composed: null,
        handler: handle,
        hooks
      });
      return;
    }
    const shouldPrecompile = this.config.precompile === true || typeof this.config.precompile === "object" && this.config.precompile.compose === true;
    const inference = cloneInference(this.inference);
    const staticHandler = typeof handle !== "function" ? createStaticHandler(handle, hooks, this.setHeaders) : undefined;
    const nativeStaticHandler = typeof handle !== "function" ? createNativeStaticHandler(handle, hooks, this.setHeaders) : undefined;
    if (this.config.nativeStaticResponse === true && nativeStaticHandler && (method === "GET" || method === "ALL"))
      this.router.static.http.static[path] = nativeStaticHandler();
    const compile = () => composeHandler({
      app: this,
      path,
      method,
      localHook: mergeHook(localHook),
      hooks,
      validator,
      handler: handle,
      allowMeta,
      inference
    });
    const mainHandler = shouldPrecompile ? compile() : (context) => {
      return compile()(context);
    };
    const routeIndex = this.router.history.length;
    if (this.routeTree.has(method + path))
      for (let i = 0;i < this.router.history.length; i++) {
        const route = this.router.history[i];
        if (route.path === path && route.method === method) {
          const removed = this.router.history.splice(i, 1)[0];
          if (removed && this.routeTree.has(removed?.method + removed?.path))
            this.routeTree.delete(removed.method + removed.path);
        }
      }
    else
      this.routeTree.set(method + path, routeIndex);
    this.router.history.push({
      method,
      path,
      composed: mainHandler,
      handler: handle,
      hooks
    });
    const staticRouter = this.router.static.http;
    const handler = {
      handler: shouldPrecompile ? mainHandler : undefined,
      compile
    };
    if (method === "$INTERNALWS") {
      const loose = this.config.strictPath ? undefined : path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
      if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
        const index = staticRouter.handlers.length;
        staticRouter.handlers.push((ctx) => (staticRouter.handlers[index] = compile())(ctx));
        this.router.static.ws[path] = index;
        if (loose)
          this.router.static.ws[loose] = index;
      } else {
        this.router.ws.add("ws", path, handler);
        if (loose)
          this.router.ws.add("ws", loose, handler);
      }
      return;
    }
    if (path.indexOf(":") === -1 && path.indexOf("*") === -1) {
      const index = staticRouter.handlers.length;
      staticRouter.handlers.push(staticHandler ?? ((ctx2) => (staticRouter.handlers[index] = compile())(ctx2)));
      if (!staticRouter.map[path])
        staticRouter.map[path] = {
          code: ""
        };
      const ctx = staticHandler ? "" : "ctx";
      if (method === "ALL")
        staticRouter.map[path].all = `default: return st[${index}](${ctx})
`;
      else
        staticRouter.map[path].code = `case '${method}': return st[${index}](${ctx})
${staticRouter.map[path].code}`;
      if (!this.config.strictPath) {
        if (!staticRouter.map[loosePath])
          staticRouter.map[loosePath] = {
            code: ""
          };
        if (this.config.nativeStaticResponse === true && nativeStaticHandler && (method === "GET" || method === "ALL"))
          this.router.static.http.static[loosePath] = nativeStaticHandler();
        if (method === "ALL")
          staticRouter.map[loosePath].all = `default: return st[${index}](${ctx})
`;
        else
          staticRouter.map[loosePath].code = `case '${method}': return st[${index}](${ctx})
${staticRouter.map[loosePath].code}`;
      }
    } else {
      this.router.http.add(method, path, handler);
      if (!this.config.strictPath) {
        const loosePath2 = path.endsWith("/") ? path.slice(0, path.length - 1) : path + "/";
        if (this.config.nativeStaticResponse === true && staticHandler && (method === "GET" || method === "ALL"))
          this.router.static.http.static[loosePath2] = staticHandler();
        this.router.http.add(method, loosePath2, handler);
      }
    }
  }
  headers(header) {
    if (!header)
      return this;
    if (!this.setHeaders)
      this.setHeaders = {};
    this.setHeaders = mergeDeep(this.setHeaders, header);
    return this;
  }
  onStart(handler) {
    this.on("start", handler);
    return this;
  }
  onRequest(handler) {
    this.on("request", handler);
    return this;
  }
  onParse(options, handler) {
    if (!handler)
      return this.on("parse", options);
    return this.on(options, "parse", handler);
  }
  onTransform(options, handler) {
    if (!handler)
      return this.on("transform", options);
    return this.on(options, "transform", handler);
  }
  resolve(optionsOrResolve, resolve) {
    if (!resolve) {
      resolve = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "resolve",
      fn: resolve
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  mapResolve(optionsOrResolve, mapper) {
    if (!mapper) {
      mapper = optionsOrResolve;
      optionsOrResolve = { as: "local" };
    }
    const hook = {
      subType: "mapResolve",
      fn: mapper
    };
    return this.onBeforeHandle(optionsOrResolve, hook);
  }
  onBeforeHandle(options, handler) {
    if (!handler)
      return this.on("beforeHandle", options);
    return this.on(options, "beforeHandle", handler);
  }
  onAfterHandle(options, handler) {
    if (!handler)
      return this.on("afterHandle", options);
    return this.on(options, "afterHandle", handler);
  }
  mapResponse(options, handler) {
    if (!handler)
      return this.on("mapResponse", options);
    return this.on(options, "mapResponse", handler);
  }
  onAfterResponse(options, handler) {
    if (!handler)
      return this.on("afterResponse", options);
    return this.on(options, "afterResponse", handler);
  }
  trace(options, handler) {
    if (!handler) {
      handler = options;
      options = { as: "local" };
    }
    if (!Array.isArray(handler))
      handler = [handler];
    for (const fn of handler)
      this.on(options, "trace", createTracer(fn));
    return this;
  }
  error(name, error22) {
    switch (typeof name) {
      case "string":
        error22.prototype[ERROR_CODE] = name;
        this.definitions.error[name] = error22;
        return this;
      case "function":
        this.definitions.error = name(this.definitions.error);
        return this;
    }
    for (const [code, error32] of Object.entries(name)) {
      error32.prototype[ERROR_CODE] = code;
      this.definitions.error[code] = error32;
    }
    return this;
  }
  onError(options, handler) {
    if (!handler)
      return this.on("error", options);
    return this.on(options, "error", handler);
  }
  onStop(handler) {
    this.on("stop", handler);
    return this;
  }
  on(optionsOrType, typeOrHandlers, handlers) {
    let type3;
    switch (typeof optionsOrType) {
      case "string":
        type3 = optionsOrType;
        handlers = typeOrHandlers;
        break;
      case "object":
        type3 = typeOrHandlers;
        if (!Array.isArray(typeOrHandlers) && typeof typeOrHandlers === "object")
          handlers = typeOrHandlers;
        break;
    }
    if (Array.isArray(handlers))
      handlers = fnToContainer(handlers);
    else {
      if (typeof handlers === "function")
        handlers = [
          {
            fn: handlers
          }
        ];
      else
        handlers = [handlers];
    }
    const handles = handlers;
    for (const handle of handles)
      handle.scope = typeof optionsOrType === "string" ? "local" : optionsOrType?.as ?? "local";
    if (type3 !== "trace")
      sucrose({
        [type3]: handles.map((x) => x.fn)
      }, this.inference);
    for (const handle of handles) {
      const fn = asHookType(handle, "global", { skipIfHasType: true });
      switch (type3) {
        case "start":
          this.event.start.push(fn);
          break;
        case "request":
          this.event.request.push(fn);
          break;
        case "parse":
          this.event.parse.push(fn);
          break;
        case "transform":
          this.event.transform.push(fn);
          break;
        case "beforeHandle":
          this.event.beforeHandle.push(fn);
          break;
        case "afterHandle":
          this.event.afterHandle.push(fn);
          break;
        case "mapResponse":
          this.event.mapResponse.push(fn);
          break;
        case "afterResponse":
          this.event.afterResponse.push(fn);
          break;
        case "trace":
          this.event.trace.push(fn);
          break;
        case "error":
          this.event.error.push(fn);
          break;
        case "stop":
          this.event.stop.push(fn);
          break;
      }
    }
    return this;
  }
  propagate() {
    promoteEvent(this.event.parse);
    promoteEvent(this.event.transform);
    promoteEvent(this.event.beforeHandle);
    promoteEvent(this.event.afterHandle);
    promoteEvent(this.event.mapResponse);
    promoteEvent(this.event.afterResponse);
    promoteEvent(this.event.trace);
    promoteEvent(this.event.error);
    return this;
  }
  as(type3) {
    const castType = { plugin: "scoped", global: "global" }[type3];
    promoteEvent(this.event.parse, castType);
    promoteEvent(this.event.transform, castType);
    promoteEvent(this.event.beforeHandle, castType);
    promoteEvent(this.event.afterHandle, castType);
    promoteEvent(this.event.mapResponse, castType);
    promoteEvent(this.event.afterResponse, castType);
    promoteEvent(this.event.trace, castType);
    promoteEvent(this.event.error, castType);
    if (type3 === "plugin") {
      this.validator.scoped = mergeSchemaValidator(this.validator.scoped, this.validator.local);
      this.validator.local = null;
    } else if (type3 === "global") {
      this.validator.global = mergeSchemaValidator(this.validator.global, mergeSchemaValidator(this.validator.scoped, this.validator.local));
      this.validator.scoped = null;
      this.validator.local = null;
    }
    return this;
  }
  group(prefix, schemaOrRun, run) {
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.getServer = () => this.getServer();
    instance.inference = cloneInference(this.inference);
    instance.extender = { ...this.extender };
    const isSchema = typeof schemaOrRun === "object";
    const sandbox = (isSchema ? run : schemaOrRun)(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.mapResponse.length)
      this.event.mapResponse = [
        ...this.event.mapResponse || [],
        ...sandbox.event.mapResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(({ method, path, handler, hooks }) => {
      path = (isSchema ? "" : this.config.prefix) + prefix + path;
      if (isSchema) {
        const hook = schemaOrRun;
        const localHook = hooks;
        this.add(method, path, handler, mergeHook(hook, {
          ...localHook || {},
          error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
            ...localHook.error || {},
            ...sandbox.event.error || {}
          ] : [
            localHook.error,
            ...sandbox.event.error || {}
          ]
        }));
      } else {
        this.add(method, path, handler, mergeHook(hooks, {
          error: sandbox.event.error
        }), {
          skipPrefix: true
        });
      }
    });
    return this;
  }
  guard(hook, run) {
    if (!run) {
      if (typeof hook === "object") {
        this.applyMacro(hook);
        const type3 = hook.as ?? "local";
        this.validator[type3] = {
          body: hook.body ?? this.validator[type3]?.body,
          headers: hook.headers ?? this.validator[type3]?.headers,
          params: hook.params ?? this.validator[type3]?.params,
          query: hook.query ?? this.validator[type3]?.query,
          response: hook.response ?? this.validator[type3]?.response,
          cookie: hook.cookie ?? this.validator[type3]?.cookie
        };
        if (hook.parse)
          this.on({ as: type3 }, "parse", hook.parse);
        if (hook.transform)
          this.on({ as: type3 }, "transform", hook.transform);
        if (hook.beforeHandle)
          this.on({ as: type3 }, "beforeHandle", hook.beforeHandle);
        if (hook.afterHandle)
          this.on({ as: type3 }, "afterHandle", hook.afterHandle);
        if (hook.mapResponse)
          this.on({ as: type3 }, "mapResponse", hook.mapResponse);
        if (hook.afterResponse)
          this.on({ as: type3 }, "afterResponse", hook.afterResponse);
        if (hook.error)
          this.on({ as: type3 }, "error", hook.error);
        if (hook.detail) {
          if (this.config.detail)
            this.config.detail = mergeDeep(Object.assign({}, this.config.detail), hook.detail);
          else
            this.config.detail = hook.detail;
        }
        if (hook?.tags) {
          if (!this.config.detail)
            this.config.detail = {
              tags: hook.tags
            };
          else
            this.config.detail.tags = hook.tags;
        }
        return this;
      }
      return this.guard({}, hook);
    }
    const instance = new _Elysia({
      ...this.config,
      prefix: ""
    });
    instance.singleton = { ...this.singleton };
    instance.definitions = { ...this.definitions };
    instance.inference = cloneInference(this.inference);
    instance.extender = { ...this.extender };
    const sandbox = run(instance);
    this.singleton = mergeDeep(this.singleton, instance.singleton);
    this.definitions = mergeDeep(this.definitions, instance.definitions);
    sandbox.getServer = () => this.server;
    if (sandbox.event.request.length)
      this.event.request = [
        ...this.event.request || [],
        ...sandbox.event.request || []
      ];
    if (sandbox.event.mapResponse.length)
      this.event.mapResponse = [
        ...this.event.mapResponse || [],
        ...sandbox.event.mapResponse || []
      ];
    this.model(sandbox.definitions.type);
    Object.values(instance.router.history).forEach(({ method, path, handler, hooks: localHook }) => {
      this.add(method, path, handler, mergeHook(hook, {
        ...localHook || {},
        error: !localHook.error ? sandbox.event.error : Array.isArray(localHook.error) ? [
          ...localHook.error || {},
          ...sandbox.event.error || []
        ] : [
          localHook.error,
          ...sandbox.event.error || []
        ]
      }));
    });
    return this;
  }
  use(plugin, options) {
    if (options?.scoped)
      return this.guard({}, (app) => app.use(plugin));
    if (Array.isArray(plugin)) {
      let current = this;
      for (const p of plugin)
        current = this.use(p);
      return current;
    }
    if (plugin instanceof Promise) {
      this.promisedModules.add(plugin.then((plugin2) => {
        if (typeof plugin2 === "function")
          return plugin2(this);
        if (plugin2 instanceof _Elysia)
          return this._use(plugin2).compile();
        if (typeof plugin2.default === "function")
          return plugin2.default(this);
        if (plugin2.default instanceof _Elysia)
          return this._use(plugin2.default);
        throw new Error('Invalid plugin type. Expected Elysia instance, function, or module with "default" as Elysia instance or function that returns Elysia instance.');
      }).then((x) => x.compile()));
      return this;
    }
    return this._use(plugin);
  }
  _use(plugin) {
    if (typeof plugin === "function") {
      const instance = plugin(this);
      if (instance instanceof Promise) {
        this.promisedModules.add(instance.then((plugin2) => {
          if (plugin2 instanceof _Elysia) {
            plugin2.getServer = () => this.getServer();
            plugin2.getGlobalRoutes = () => this.getGlobalRoutes();
            plugin2.model(this.definitions.type);
            plugin2.error(this.definitions.error);
            for (const {
              method,
              path,
              handler,
              hooks
            } of Object.values(plugin2.router.history)) {
              this.add(method, path, handler, mergeHook(hooks, {
                error: plugin2.event.error
              }));
            }
            plugin2.compile();
            return plugin2;
          }
          if (typeof plugin2 === "function")
            return plugin2(this);
          if (typeof plugin2.default === "function")
            return plugin2.default(this);
          return this._use(plugin2);
        }).then((x) => x.compile()));
        return this;
      }
      return instance;
    }
    const { name, seed } = plugin.config;
    plugin.getServer = () => this.getServer();
    plugin.getGlobalRoutes = () => this.getGlobalRoutes();
    plugin.model(this.definitions.type);
    plugin.error(this.definitions.error);
    const isScoped = plugin.config.scoped;
    if (isScoped) {
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.telemetry.stack,
          routes: plugin.router.history,
          decorators: plugin.singleton.decorator,
          store: plugin.singleton.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
            fn: x.fn.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x.subType === "derive").map((x) => ({
            fn: x.fn.toString(),
            stack: new Error().stack ?? ""
          }))
        });
      }
      plugin.extender.macros = this.extender.macros.concat(plugin.extender.macros);
      const macroHashes = [];
      for (let i = 0;i < plugin.extender.macros.length; i++) {
        const macro = this.extender.macros[i];
        if (macroHashes.includes(macro.checksum)) {
          plugin.extender.macros.splice(i, 1);
          i--;
        }
        macroHashes.push(macro.checksum);
      }
      plugin.onRequest((context) => {
        Object.assign(context, this.singleton.decorator);
        Object.assign(context.store, this.singleton.store);
      });
      if (plugin.event.trace.length)
        plugin.event.trace.push(...plugin.event.trace);
      if (!plugin.config.prefix)
        console.warn("It's recommended to use scoped instance with a prefix to prevent collision routing with other instance.");
      if (plugin.event.error.length)
        plugin.event.error.push(...this.event.error);
      if (plugin.config.aot)
        plugin.compile();
      if (isScoped === true && plugin.config.prefix) {
        this.mount(plugin.config.prefix + "/", plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length);
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      } else {
        this.mount(plugin.fetch);
        for (const route of plugin.router.history) {
          this.routeTree.set(route.method + `${plugin.config.prefix}${route.path}`, this.router.history.length);
          this.router.history.push({
            ...route,
            path: `${plugin.config.prefix}${route.path}`,
            hooks: mergeHook(route.hooks, {
              error: this.event.error
            })
          });
        }
      }
      return this;
    } else {
      this.headers(plugin.setHeaders);
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (!this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2)) {
          this.extender.macros = this.extender.macros.concat(plugin.extender.macros);
          this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(plugin.extender.higherOrderFunctions);
        }
      } else {
        this.extender.macros = this.extender.macros.concat(plugin.extender.macros);
        this.extender.higherOrderFunctions = this.extender.higherOrderFunctions.concat(plugin.extender.higherOrderFunctions);
      }
      deduplicateChecksum(this.extender.macros);
      deduplicateChecksum(this.extender.higherOrderFunctions);
      const hofHashes = [];
      for (let i = 0;i < this.extender.higherOrderFunctions.length; i++) {
        const hof = this.extender.higherOrderFunctions[i];
        if (hof.checksum) {
          if (hofHashes.includes(hof.checksum)) {
            this.extender.higherOrderFunctions.splice(i, 1);
            i--;
          }
          hofHashes.push(hof.checksum);
        }
      }
      this.inference = {
        body: this.inference.body || plugin.inference.body,
        cookie: this.inference.cookie || plugin.inference.cookie,
        headers: this.inference.headers || plugin.inference.headers,
        query: this.inference.query || plugin.inference.query,
        set: this.inference.set || plugin.inference.set,
        server: this.inference.server || plugin.inference.server
      };
    }
    this.decorate(plugin.singleton.decorator);
    this.state(plugin.singleton.store);
    this.model(plugin.definitions.type);
    this.error(plugin.definitions.error);
    plugin.extender.macros = this.extender.macros.concat(plugin.extender.macros);
    for (const { method, path, handler, hooks } of Object.values(plugin.router.history)) {
      this.add(method, path, handler, mergeHook(hooks, {
        error: plugin.event.error
      }));
    }
    if (!isScoped)
      if (name) {
        if (!(name in this.dependencies))
          this.dependencies[name] = [];
        const current = seed !== undefined ? checksum(name + JSON.stringify(seed)) : 0;
        if (this.dependencies[name].some(({ checksum: checksum2 }) => current === checksum2))
          return this;
        this.dependencies[name].push(!this.config?.analytic ? {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies
        } : {
          name: plugin.config.name,
          seed: plugin.config.seed,
          checksum: current,
          dependencies: plugin.dependencies,
          stack: plugin.telemetry.stack,
          routes: plugin.router.history,
          decorators: plugin.singleton,
          store: plugin.singleton.store,
          type: plugin.definitions.type,
          error: plugin.definitions.error,
          derive: plugin.event.transform.filter((x) => x?.subType === "derive").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          })),
          resolve: plugin.event.transform.filter((x) => x?.subType === "resolve").map((x) => ({
            fn: x.toString(),
            stack: new Error().stack ?? ""
          }))
        });
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event), current);
      } else {
        this.event = mergeLifeCycle(this.event, filterGlobalHook(plugin.event));
      }
    this.validator.global = mergeHook(this.validator.global, {
      ...plugin.validator.global
    });
    this.validator.local = mergeHook(this.validator.local, {
      ...plugin.validator.scoped
    });
    return this;
  }
  macro(macro) {
    const hook = {
      checksum: checksum(JSON.stringify({
        name: this.config.name,
        seed: this.config.seed,
        content: macro.toString()
      })),
      fn: macro
    };
    this.extender.macros.push(hook);
    return this;
  }
  mount(path, handle) {
    if (path instanceof _Elysia || typeof path === "function" || path.length === 0 || path === "/") {
      const run = typeof path === "function" ? path : path instanceof _Elysia ? path.compile().fetch : handle instanceof _Elysia ? handle.compile().fetch : handle;
      const handler2 = async ({ request, path: path2 }) => {
        if (request.method === "GET" || request.method === "HEAD" || !request.headers.get("content-type"))
          return run(new Request(replaceUrlPath(request.url, path2 || "/"), request));
        return run(new Request(replaceUrlPath(request.url, path2 || "/"), {
          ...request,
          body: await request.arrayBuffer()
        }));
      };
      this.all("/*", handler2, {
        type: "none"
      });
      return this;
    }
    const length = path.length;
    if (handle instanceof _Elysia)
      handle = handle.compile().fetch;
    const handler = async ({ request, path: path2 }) => {
      if (request.method === "GET" || request.method === "HEAD" || !request.headers.get("content-type"))
        return handle(new Request(replaceUrlPath(request.url, path2.slice(length) || "/"), request));
      return handle(new Request(replaceUrlPath(request.url, path2.slice(length) || "/"), {
        ...request,
        body: await request.arrayBuffer()
      }));
    };
    this.all(path, handler, {
      type: "none"
    });
    this.all(path + (path.endsWith("/") ? "*" : "/*"), handler, {
      type: "none"
    });
    return this;
  }
  get(path, handler, hook) {
    this.add("GET", path, handler, hook);
    return this;
  }
  post(path, handler, hook) {
    this.add("POST", path, handler, hook);
    return this;
  }
  put(path, handler, hook) {
    this.add("PUT", path, handler, hook);
    return this;
  }
  patch(path, handler, hook) {
    this.add("PATCH", path, handler, hook);
    return this;
  }
  delete(path, handler, hook) {
    this.add("DELETE", path, handler, hook);
    return this;
  }
  options(path, handler, hook) {
    this.add("OPTIONS", path, handler, hook);
    return this;
  }
  all(path, handler, hook) {
    this.add("ALL", path, handler, hook);
    return this;
  }
  head(path, handler, hook) {
    this.add("HEAD", path, handler, hook);
    return this;
  }
  connect(path, handler, hook) {
    this.add("CONNECT", path, handler, hook);
    return this;
  }
  route(method, path, handler, hook) {
    this.add(method.toUpperCase(), path, handler, hook, hook?.config);
    return this;
  }
  ws(path, options) {
    const transform4 = options.transformMessage ? Array.isArray(options.transformMessage) ? options.transformMessage : [options.transformMessage] : undefined;
    let server = null;
    const validateMessage = getSchemaValidator(options?.body, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const validateResponse = getSchemaValidator(options?.response, {
      models: this.definitions.type,
      normalize: this.config.normalize
    });
    const parseMessage = (message) => {
      if (typeof message === "string") {
        const start = message?.charCodeAt(0);
        if (start === 47 || start === 123)
          try {
            message = JSON.parse(message);
          } catch {
          }
        else if (isNumericString(message))
          message = +message;
      }
      if (transform4?.length)
        for (let i = 0;i < transform4.length; i++) {
          const temp = transform4[i](message);
          if (temp !== undefined)
            message = temp;
        }
      return message;
    };
    this.route("$INTERNALWS", path, (context) => {
      const { set: set22, path: path2, qi, headers, query, params } = context;
      if (server === null)
        server = this.getServer();
      if (server?.upgrade(context.request, {
        headers: typeof options.upgrade === "function" ? options.upgrade(context) : options.upgrade,
        data: {
          validator: validateResponse,
          open(ws) {
            options.open?.(new ElysiaWS(ws, context));
          },
          message: (ws, msg) => {
            const message = parseMessage(msg);
            if (validateMessage?.Check(message) === false)
              return void ws.send(new ValidationError("message", validateMessage, message).message);
            options.message?.(new ElysiaWS(ws, context), message);
          },
          drain(ws) {
            options.drain?.(new ElysiaWS(ws, context));
          },
          close(ws, code, reason) {
            options.close?.(new ElysiaWS(ws, context), code, reason);
          }
        }
      }))
        return;
      set22.status = 400;
      return "Expected a websocket connection";
    }, {
      beforeHandle: options.beforeHandle,
      transform: options.transform,
      headers: options.headers,
      params: options.params,
      query: options.query
    });
    return this;
  }
  state(options, name, value2) {
    if (name === undefined) {
      value2 = options;
      options = { as: "append" };
      name = "";
    } else if (value2 === undefined) {
      if (typeof options === "string") {
        value2 = name;
        name = options;
        options = { as: "append" };
      } else if (typeof options === "object") {
        value2 = name;
        name = "";
      }
    }
    const { as } = options;
    if (typeof name !== "string")
      return this;
    switch (typeof value2) {
      case "object":
        if (name) {
          if (name in this.singleton.store)
            this.singleton.store[name] = mergeDeep(this.singleton.store[name], value2, {
              override: as === "override"
            });
          else
            this.singleton.store[name] = value2;
          return this;
        }
        if (value2 === null)
          return this;
        this.singleton.store = mergeDeep(this.singleton.store, value2, {
          override: as === "override"
        });
        return this;
      case "function":
        if (name) {
          if (as === "override" || !(name in this.singleton.store))
            this.singleton.store[name] = value2;
        } else
          this.singleton.store = value2(this.singleton.store);
        return this;
      default:
        if (as === "override" || !(name in this.singleton.store))
          this.singleton.store[name] = value2;
        return this;
    }
  }
  decorate(options, name, value2) {
    if (name === undefined) {
      value2 = options;
      options = { as: "append" };
      name = "";
    } else if (value2 === undefined) {
      if (typeof options === "string") {
        value2 = name;
        name = options;
        options = { as: "append" };
      } else if (typeof options === "object") {
        value2 = name;
        name = "";
      }
    }
    const { as } = options;
    if (typeof name !== "string")
      return this;
    switch (typeof value2) {
      case "object":
        if (name) {
          if (name in this.singleton.decorator)
            this.singleton.decorator[name] = mergeDeep(this.singleton.decorator[name], value2, {
              override: as === "override"
            });
          else
            this.singleton.decorator[name] = value2;
          return this;
        }
        if (value2 === null)
          return this;
        this.singleton.decorator = mergeDeep(this.singleton.decorator, value2, {
          override: as === "override"
        });
        return this;
      case "function":
        if (name) {
          if (as === "override" || !(name in this.singleton.decorator))
            this.singleton.decorator[name] = value2;
        } else
          this.singleton.decorator = value2(this.singleton.decorator);
        return this;
      default:
        if (as === "override" || !(name in this.singleton.decorator))
          this.singleton.decorator[name] = value2;
        return this;
    }
  }
  derive(optionsOrTransform, transform4) {
    if (!transform4) {
      transform4 = optionsOrTransform;
      optionsOrTransform = { as: "local" };
    }
    const hook = {
      subType: "derive",
      fn: transform4
    };
    return this.onTransform(optionsOrTransform, hook);
  }
  model(name, model) {
    switch (typeof name) {
      case "object":
        Object.entries(name).forEach(([key, value2]) => {
          if (!(key in this.definitions.type))
            this.definitions.type[key] = value2;
        });
        return this;
      case "function":
        this.definitions.type = name(this.definitions.type);
        return this;
    }
    this.definitions.type[name] = model;
    return this;
  }
  mapDerive(optionsOrDerive, mapper) {
    if (!mapper) {
      mapper = optionsOrDerive;
      optionsOrDerive = { as: "local" };
    }
    const hook = {
      subType: "mapDerive",
      fn: mapper
    };
    return this.onTransform(optionsOrDerive, hook);
  }
  affix(base, type3, word) {
    if (word === "")
      return this;
    const delimieter = ["_", "-", " "];
    const capitalize2 = (word2) => word2[0].toUpperCase() + word2.slice(1);
    const joinKey = base === "prefix" ? (prefix, word2) => delimieter.includes(prefix.at(-1) ?? "") ? prefix + word2 : prefix + capitalize2(word2) : delimieter.includes(word.at(-1) ?? "") ? (suffix, word2) => word2 + suffix : (suffix, word2) => word2 + capitalize2(suffix);
    const remap = (type22) => {
      const store = {};
      switch (type22) {
        case "decorator":
          for (const key in this.singleton.decorator) {
            store[joinKey(word, key)] = this.singleton.decorator[key];
          }
          this.singleton.decorator = store;
          break;
        case "state":
          for (const key in this.singleton.store)
            store[joinKey(word, key)] = this.singleton.store[key];
          this.singleton.store = store;
          break;
        case "model":
          for (const key in this.definitions.type)
            store[joinKey(word, key)] = this.definitions.type[key];
          this.definitions.type = store;
          break;
        case "error":
          for (const key in this.definitions.error)
            store[joinKey(word, key)] = this.definitions.error[key];
          this.definitions.error = store;
          break;
      }
    };
    const types = Array.isArray(type3) ? type3 : [type3];
    for (const type22 of types.some((x) => x === "all") ? ["decorator", "state", "model", "error"] : types)
      remap(type22);
    return this;
  }
  prefix(type3, word) {
    return this.affix("prefix", type3, word);
  }
  suffix(type3, word) {
    return this.affix("suffix", type3, word);
  }
  compile() {
    this.fetch = this.config.aot ? composeGeneralHandler(this) : createDynamicHandler(this);
    if (typeof this.server?.reload === "function")
      this.server.reload({
        ...this.server || {},
        fetch: this.fetch
      });
    return this;
  }
  get modules() {
    return Promise.all(this.promisedModules.promises);
  }
};

// src/db.ts
var import_client = __toESM(require_index_browser3(), 1);
var db = new import_client.PrismaClient;
var MessageSchema = t.Object({
  id: t.String(),
  threadId: t.String(),
  content: t.Any(),
  role: t.Union([
    t.Literal("function"),
    t.Literal("user"),
    t.Literal("system"),
    t.Literal("assistant"),
    t.Literal("data"),
    t.Literal("tool")
  ]),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  metadata: t.Optional(t.Union([t.Any(), t.Null()]))
});
var ThreadSchema = t.Object({
  id: t.String(),
  title: t.Optional(t.Union([t.String(), t.Null()])),
  createdAt: t.Date(),
  updatedAt: t.Date(),
  metadata: t.Optional(t.Union([t.Any(), t.Null()]))
});
var ThreadWithMessagesSchema = t.Composite([
  ThreadSchema,
  t.Object({
    Messages: t.Array(MessageSchema)
  })
]);
var ThreadWithMessageCountSchema = t.Composite([
  ThreadSchema,
  t.Object({
    _count: t.Object({
      Messages: t.Number()
    })
  })
]);

// src/api/threads/messages/index.ts
var messages = new Elysia({ prefix: "/messages" }).get("/", async ({ query, params }) => {
  const { limit = 50, order = "desc", before, after } = query;
  const messages2 = await db.message.findMany({
    where: {
      threadId: params.threadId,
      ...before && { createdAt: { lt: new Date(before) } },
      ...after && { createdAt: { gt: new Date(after) } }
    },
    orderBy: {
      createdAt: order
    },
    take: limit
  });
  return messages2;
}, {
  query: t.Object({
    limit: t.Optional(t.Number({ description: "Number of messages to return" })),
    order: t.Optional(t.String({
      pattern: "asc|desc",
      description: "Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order."
    })),
    after: t.Optional(t.String({
      description: "A cursor for use in pagination. `after` is a message ID defining the start of the page."
    })),
    before: t.Optional(t.String({
      description: "A cursor for use in pagination. `before` is a message ID defining the end of the page."
    }))
  }),
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread to retrieve messages from."
    })
  }),
  detail: {
    tags: ["Messages"],
    summary: "List messages in thread",
    description: "Retrieves a paginated list of messages in a specific thread",
    operationId: "listMessages"
  },
  response: t.Array(MessageSchema)
}).get("/:messageId", async ({ params }) => {
  const message = await db.message.findUnique({
    where: {
      id: params.messageId,
      threadId: params.threadId
    }
  });
  if (!message)
    throw new Error("Message not found");
  return message;
}, {
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread to retrieve messages from."
    }),
    messageId: t.String({
      description: "The ID of the message to retrieve."
    })
  }),
  detail: {
    tags: ["Messages"],
    summary: "Get a specific message",
    description: "Retrieves a specific message from a thread by its ID. Returns a 404 error if the message is not found.",
    operationId: "getMessage"
  },
  response: MessageSchema
}).post("/", async ({ params, body }) => {
  const newMessagesCount = await db.message.createMany({
    data: body.map((message, i) => ({
      content: message.content,
      role: message.role,
      metadata: message.metadata,
      createdAt: new Date(Date.now() + i),
      threadId: params.threadId
    }))
  });
  const messages2 = await db.message.findMany({
    where: {
      threadId: params.threadId
    },
    orderBy: {
      createdAt: "desc"
    },
    take: newMessagesCount.count
  });
  return messages2;
}, {
  body: t.Array(t.Object({
    role: t.Union([
      t.Literal("function"),
      t.Literal("user"),
      t.Literal("system"),
      t.Literal("assistant"),
      t.Literal("data"),
      t.Literal("tool")
    ], {
      description: "The role of the message sender (function, user, system, assistant, data, tool)."
    }),
    content: t.Any({
      description: "The content of the message. Can be any valid JSON value (string, object, array, etc.)."
    }),
    metadata: t.Optional(t.Any({
      description: "Optional metadata associated with the message. Can be any valid JSON value."
    }))
  }), {
    description: "An array of message objects to create. Each message object must include a `role` and `content` property."
  }),
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread to create the message in."
    })
  }),
  detail: {
    tags: ["Messages"],
    summary: "Create messages",
    description: "Creates new messages in a specified thread with the provided content and metadata.",
    operationId: "createMessages"
  },
  response: t.Array(MessageSchema)
}).patch("/:messageId", async ({ params, body }) => {
  const message = await db.message.update({
    where: {
      id: params.messageId,
      threadId: params.threadId
    },
    data: body
  });
  return message;
}, {
  body: t.Object({
    content: t.Optional(t.Any({
      description: "New content to update the message with. Can be any valid JSON value."
    })),
    metadata: t.Optional(t.Any({
      description: "New metadata to update the message with. Can be any valid JSON value."
    }))
  }),
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread containing the message."
    }),
    messageId: t.String({
      description: "The ID of the message to update."
    })
  }),
  detail: {
    tags: ["Messages"],
    summary: "Update a message",
    description: "Updates the content and/or metadata of an existing message. Only the provided fields will be updated.",
    operationId: "updateMessage"
  },
  response: MessageSchema
}).delete("/:messageId", async ({ params }) => {
  await db.message.delete({
    where: {
      id: params.messageId,
      threadId: params.threadId
    }
  });
  return { success: true };
}, {
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread containing the message to delete."
    }),
    messageId: t.String({
      description: "The ID of the message to delete."
    })
  }),
  detail: {
    tags: ["Messages"],
    summary: "Delete a message",
    description: "Permanently deletes a message from a thread. This action cannot be undone.",
    operationId: "deleteMessage"
  },
  response: t.Object({
    success: t.Boolean()
  })
});

// src/api/threads/index.ts
var thread = new Elysia({ prefix: "/:threadId" }).use(messages).get("/", async ({ params, query }) => {
  const thread2 = await db.thread.findUnique({
    where: { id: params.threadId },
    include: {
      _count: {
        select: { Messages: true }
      },
      ...query.includeMessages && {
        Messages: {
          orderBy: {
            createdAt: "desc"
          },
          take: 50
        }
      }
    }
  });
  if (!thread2)
    throw new Error("Thread not found");
  return thread2;
}, {
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread to retrieve."
    })
  }),
  query: t.Object({
    includeMessages: t.Optional(t.Boolean({
      description: "Whether to include the most recent messages in the response."
    }))
  }),
  detail: {
    tags: ["Threads"],
    summary: "Get a specific thread",
    description: "Retrieves a thread by ID, optionally including its most recent messages.",
    operationId: "getThread"
  },
  response: ThreadWithMessagesSchema
}).patch("/", async ({ params, body }) => {
  const thread2 = await db.thread.update({
    where: { id: params.threadId },
    data: body
  });
  return thread2;
}, {
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread to update."
    })
  }),
  body: t.Object({
    title: t.Optional(t.String({
      description: "New title for the thread."
    })),
    metadata: t.Optional(t.Any({
      description: "Optional metadata associated with the thread. Can be any valid JSON value."
    }))
  }),
  detail: {
    tags: ["Threads"],
    summary: "Update a thread",
    description: "Updates a thread's title or metadata. Only the provided fields will be updated.",
    operationId: "updateThread"
  },
  response: ThreadSchema
}).delete("/", async ({ params }) => {
  await db.thread.delete({
    where: { id: params.threadId }
  });
  return { success: true };
}, {
  params: t.Object({
    threadId: t.String({
      description: "The ID of the thread to delete."
    })
  }),
  detail: {
    tags: ["Threads"],
    summary: "Delete a thread",
    description: "Permanently deletes a thread and all its associated messages. This action cannot be undone.",
    operationId: "deleteThread"
  },
  response: t.Object({
    success: t.Boolean()
  })
});
var threads = new Elysia({ prefix: "/threads" }).use(thread).get("/", async ({ query }) => {
  const { limit = 50, order = "desc", before, after } = query;
  const threads2 = await db.thread.findMany({
    where: {
      ...before && { createdAt: { lt: new Date(before) } },
      ...after && { createdAt: { gt: new Date(after) } }
    },
    orderBy: {
      createdAt: order
    },
    take: limit,
    include: {
      _count: {
        select: { Messages: true }
      }
    }
  });
  return threads2;
}, {
  query: t.Object({
    limit: t.Optional(t.Number({
      description: "Number of threads to return. Defaults to 50."
    })),
    order: t.Optional(t.Union([t.Literal("asc"), t.Literal("desc")], {
      description: "Sort order by creation timestamp. 'asc' for ascending order and 'desc' for descending order."
    })),
    before: t.Optional(t.String({
      description: "A cursor for pagination. Returns threads created before this timestamp."
    })),
    after: t.Optional(t.String({
      description: "A cursor for pagination. Returns threads created after this timestamp."
    }))
  }),
  detail: {
    tags: ["Threads"],
    summary: "List all threads",
    description: "Retrieves a paginated list of threads with their message counts.",
    operationId: "listThreads"
  },
  response: t.Array(ThreadWithMessageCountSchema)
}).post("/", async ({ body }) => {
  const thread2 = await db.thread.create({
    data: body
  });
  return thread2;
}, {
  body: t.Object({
    title: t.Optional(t.String({
      description: "Title of the thread."
    })),
    metadata: t.Optional(t.Any({
      description: "Optional metadata associated with the thread. Can be any valid JSON value."
    }))
  }),
  detail: {
    tags: ["Threads"],
    summary: "Create a thread",
    description: "Creates a new thread with the provided title and metadata.",
    operationId: "createThread"
  },
  response: ThreadSchema
});

// node_modules/pathe/dist/shared/pathe.ff20891b.mjs
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _UNC_REGEX = /^[/\\]{2}/;
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
var normalize = function(path) {
  if (path.length === 0) {
    return ".";
  }
  path = normalizeWindowsPath(path);
  const isUNCPath = path.match(_UNC_REGEX);
  const isPathAbsolute = isAbsolute(path);
  const trailingSeparator = path[path.length - 1] === "/";
  path = normalizeString(path, !isPathAbsolute);
  if (path.length === 0) {
    if (isPathAbsolute) {
      return "/";
    }
    return trailingSeparator ? "./" : ".";
  }
  if (trailingSeparator) {
    path += "/";
  }
  if (_DRIVE_LETTER_RE.test(path)) {
    path += "/";
  }
  if (isUNCPath) {
    if (!isPathAbsolute) {
      return `//./${path}`;
    }
    return `//${path}`;
  }
  return isPathAbsolute && !isAbsolute(path) ? `/${path}` : path;
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0;index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1)
        ;
      else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
// node_modules/@elysiajs/swagger/dist/index.mjs
function isSchemaObject(schema3) {
  return "type" in schema3 || "properties" in schema3 || "items" in schema3;
}
function isDateTimeProperty(key, schema3) {
  return (key === "createdAt" || key === "updatedAt") && "anyOf" in schema3 && Array.isArray(schema3.anyOf);
}
function transformDateProperties(schema3) {
  if (!isSchemaObject(schema3) || typeof schema3 !== "object" || schema3 === null) {
    return schema3;
  }
  const newSchema = { ...schema3 };
  Object.entries(newSchema).forEach(([key, value2]) => {
    if (isSchemaObject(value2)) {
      if (isDateTimeProperty(key, value2)) {
        const dateTimeFormat = value2.anyOf?.find((item) => isSchemaObject(item) && item.format === "date-time");
        if (dateTimeFormat) {
          const dateTimeSchema = {
            type: "string",
            format: "date-time",
            default: dateTimeFormat.default
          };
          newSchema[key] = dateTimeSchema;
        }
      } else {
        newSchema[key] = transformDateProperties(value2);
      }
    }
  });
  return newSchema;
}
var SwaggerUIRender = (info, version2, theme, stringifiedSwaggerOptions, autoDarkMode) => {
  const swaggerOptions = JSON.parse(stringifiedSwaggerOptions);
  if (swaggerOptions.components && swaggerOptions.components.schemas) {
    swaggerOptions.components.schemas = Object.fromEntries(Object.entries(swaggerOptions.components.schemas).map(([key, schema3]) => [
      key,
      transformDateProperties(schema3)
    ]));
  }
  const transformedStringifiedSwaggerOptions = JSON.stringify(swaggerOptions);
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${info.title}</title>
    <meta
        name="description"
        content="${info.description}"
    />
    <meta
        name="og:description"
        content="${info.description}"
    />
    ${autoDarkMode && typeof theme === "string" ? `
    <style>
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #222;
                color: #faf9a;
            }
            .swagger-ui {
                filter: invert(92%) hue-rotate(180deg);
            }

            .swagger-ui .microlight {
                filter: invert(100%) hue-rotate(180deg);
            }
        }
    </style>` : ""}
    ${typeof theme === "string" ? `<link rel="stylesheet" href="${theme}" />` : `<link rel="stylesheet" media="(prefers-color-scheme: light)" href="${theme.light}" />
<link rel="stylesheet" media="(prefers-color-scheme: dark)" href="${theme.dark}" />`}
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@${version2}/swagger-ui-bundle.js" crossorigin></script>
    <script>
        window.onload = () => {
            window.ui = SwaggerUIBundle(${transformedStringifiedSwaggerOptions});
        };
    </script>
</body>
</html>`;
};
var theme_default = `
/* basic theme */
.light-mode {
  --theme-color-1: #2a2f45;
  --theme-color-2: #757575;
  --theme-color-3: #8e8e8e;
  --theme-color-accent: #f06292;

  --theme-background-1: #fff;
  --theme-background-2: #f6f6f6;
  --theme-background-3: #e7e7e7;
  --theme-background-accent: #f062921f;

  --theme-border-color: rgba(0, 0, 0, 0.1);
}
.dark-mode {
  --theme-color-1: rgba(255, 255, 255, 0.9);
  --theme-color-2: rgba(156, 163, 175, 1);
  --theme-color-3: rgba(255, 255, 255, 0.44);
  --theme-color-accent: #f06292;

  --theme-background-1: #111728;
  --theme-background-2: #1e293b;
  --theme-background-3: #334155;
  --theme-background-accent: #f062921f;

  --theme-border-color: rgba(255, 255, 255, 0.1);
}
/* Document Sidebar */
.light-mode .sidebar,
.dark-mode .sidebar {
  --sidebar-background-1: var(--theme-background-1);
  --sidebar-item-hover-color: currentColor;
  --sidebar-item-hover-background: var(--theme-background-2);
  --sidebar-item-active-background: var(--theme-background-accent);
  --sidebar-border-color: transparent;
  --sidebar-color-1: var(--theme-color-1);
  --sidebar-color-2: var(--theme-color-2);
  --sidebar-color-active: var(--theme-color-accent);
  --sidebar-search-background: transparent;
  --sidebar-search-border-color: var(--theme-border-color);
  --sidebar-search--color: var(--theme-color-3);
}
/* Document header only shows on mobile*/
.dark-mode .t-doc__header,
.light-mode .t-doc__header {
  --header-background-1: rgba(255, 255, 255, 0.85);
  --header-border-color: transparent;
  --header-color-1: var(--theme-color-1);
  --header-color-2: var(--theme-color-2);
  --header-background-toggle: var(--theme-color-3);
  --header-call-to-action-color: var(--theme-color-accent);
}

.dark-mode .t-doc__header {
  --header-background-1: rgba(17, 23, 40, 0.75);
}

/* advanced */
.light-mode {
  --theme-button-1: rgb(49 53 56);
  --theme-button-1-color: #fff;
  --theme-button-1-hover: rgb(28 31 33);

  --theme-color-green: #069061;
  --theme-color-red: #ef0006;
  --theme-color-yellow: #edbe20;
  --theme-color-blue: #0082d0;
  --theme-color-orange: #fb892c;
  --theme-color-purple: #5203d1;

  --theme-scrollbar-color: rgba(0, 0, 0, 0.18);
  --theme-scrollbar-color-active: rgba(0, 0, 0, 0.36);
}
.dark-mode {
  --theme-button-1: #f6f6f6;
  --theme-button-1-color: #000;
  --theme-button-1-hover: #e7e7e7;

  --theme-color-green: #a3ffa9;
  --theme-color-red: #ffa3a3;
  --theme-color-yellow: #fffca3;
  --theme-color-blue: #a5d6ff;
  --theme-color-orange: #e2ae83;
  --theme-color-purple: #d2a8ff;

  --theme-scrollbar-color: rgba(255, 255, 255, 0.24);
  --theme-scrollbar-color-active: rgba(255, 255, 255, 0.48);
}
/* Elysia Specific */
.scalar-api-client__send-request-button,
.show-api-client-button {
  background: #3c82f6 !important;
}
.show-api-client-button:before {
  display: none;
}

.sidebar-search:hover {
  transition: all 0.15s ease-in-out;
  --sidebar-search-border-color: var(--theme-color-accent) !important;
  color: var(--sidebar-color-1) !important;
}
.scalar-api-client__container .sidebar {
  --sidebar-border-color: var(--theme-border-color);
}
@media (min-width: 1150px) {
  .section-container:has( ~ .footer):before,
  .tag-section-container:before {
    content: "";
    position: absolute;
    top: -5px;
    left: 0;
    width: 100%;
    height: 10px;
    background: linear-gradient(90deg, var(--theme-background-1) 3%,transparent 10%);
  }
}
.section-flare {
  position: absolute;
  width: 100vw;
  height: 300px;
  --stripes: repeating-linear-gradient(
    100deg,
    #fff 0%,
    #fff 7%,
    transparent 10%,
    transparent 12%,
    #fff 16%
  );
  --stripesDark: repeating-linear-gradient(
    100deg,
    #000 0%,
    #000 7%,
    transparent 10%,
    transparent 12%,
    #000 16%
  );
  --rainbow: repeating-linear-gradient(
    100deg,
    #60a5fa 10%,
    #e879f9 16%,
    #5eead4 22%,
    #60a5fa 30%
  );
  background-image: var(--stripes), var(--rainbow);
  background-size: 300%, 200%;
  background-position: 50% 50%, 50% 50%;
  filter: invert(100%);
  -webkit-mask-image: radial-gradient(
    ellipse at 100% 0%,
    black 40%,
    transparent 70%
  );
  mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
  pointer-events: none;
  opacity: 0.15;
}
.dark-mode .section-flare {
  background-image: var(--stripesDark), var(--rainbow);
  filter: opacity(50%) saturate(200%);
  opacity: 0.25;
}
.section-flare:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-image: var(--stripes), var(--rainbow);
  background-size: 200%, 100%;
  background-attachment: fixed;
  mix-blend-mode: difference;
}
.dark-mode .section-flare:after {
  background-image: var(--stripesDark), var(--rainbow);
}
@keyframes headerbackground {
  from {
    background: transparent;
    backdrop-filter: none;
  }
  to {
    background: var(--header-background-1);
    backdrop-filter: blur(12px);
  }
}
.light-mode .t-doc__header,
.dark-mode .t-doc__header {
  animation: headerbackground forwards;
  animation-timeline: scroll();
  animation-range: 0px 200px;
  --header-border-color: transparent;
}
`;
var ScalarRender = (info, version2, config, cdn) => `<!doctype html>
<html>
  <head>
    <title>${info.title}</title>
    <meta
        name="description"
        content="${info.description}"
    />
    <meta
        name="og:description"
        content="${info.description}"
    />
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1" />
    <style>
      body {
        margin: 0;
      }
    </style>
    <style>
      ${config.customCss ?? theme_default}
    </style>
  </head>
  <body>
    <script
      id="api-reference"
      data-url="${config.spec?.url}"
      data-configuration='${JSON.stringify(config)}'
    >
    </script>
    <script src="${cdn ? cdn : `https://cdn.jsdelivr.net/npm/@scalar/api-reference@${version2}/dist/browser/standalone.min.js`}" crossorigin></script>
  </body>
</html>`;
var TransformKind2 = Symbol.for("TypeBox.Transform");
var ReadonlyKind2 = Symbol.for("TypeBox.Readonly");
var OptionalKind2 = Symbol.for("TypeBox.Optional");
var Hint2 = Symbol.for("TypeBox.Hint");
var Kind2 = Symbol.for("TypeBox.Kind");
var PatternBoolean2 = "(true|false)";
var PatternNumber2 = "(0|[1-9][0-9]*)";
var PatternString2 = "(.*)";
var PatternBooleanExact2 = `^${PatternBoolean2}$`;
var PatternNumberExact2 = `^${PatternNumber2}$`;
var PatternStringExact2 = `^${PatternString2}$`;
var ExtendsResult2;
(function(ExtendsResult22) {
  ExtendsResult22[ExtendsResult22["Union"] = 0] = "Union";
  ExtendsResult22[ExtendsResult22["True"] = 1] = "True";
  ExtendsResult22[ExtendsResult22["False"] = 2] = "False";
})(ExtendsResult2 || (ExtendsResult2 = {}));
var toOpenAPIPath = (path2) => path2.split("/").map((x) => {
  if (x.startsWith(":")) {
    x = x.slice(1, x.length);
    if (x.endsWith("?"))
      x = x.slice(0, -1);
    x = `{${x}}`;
  }
  return x;
}).join("/");
var mapProperties = (name, schema3, models) => {
  if (schema3 === undefined)
    return [];
  if (typeof schema3 === "string")
    if (schema3 in models)
      schema3 = models[schema3];
    else
      throw new Error(`Can't find model ${schema3}`);
  return Object.entries(schema3?.properties ?? []).map(([key, value2]) => {
    const {
      type: valueType = undefined,
      description,
      examples,
      ...schemaKeywords
    } = value2;
    return {
      description,
      examples,
      schema: { type: valueType, ...schemaKeywords },
      in: name,
      name: key,
      required: schema3.required?.includes(key) ?? false
    };
  });
};
var mapTypesResponse = (types, schema3) => {
  if (typeof schema3 === "object" && ["void", "undefined", "null"].includes(schema3.type))
    return;
  const responses = {};
  for (const type3 of types) {
    responses[type3] = {
      schema: typeof schema3 === "string" ? {
        $ref: `#/components/schemas/${schema3}`
      } : { ...schema3 }
    };
  }
  return responses;
};
var capitalize2 = (word) => word.charAt(0).toUpperCase() + word.slice(1);
var generateOperationId = (method, paths) => {
  let operationId = method.toLowerCase();
  if (paths === "/")
    return operationId + "Index";
  for (const path2 of paths.split("/")) {
    if (path2.charCodeAt(0) === 123) {
      operationId += "By" + capitalize2(path2.slice(1, -1));
    } else {
      operationId += capitalize2(path2);
    }
  }
  return operationId;
};
var cloneHook = (hook) => {
  if (!hook)
    return;
  if (typeof hook === "string")
    return hook;
  if (Array.isArray(hook))
    return [...hook];
  return { ...hook };
};
var registerSchemaPath = ({
  schema: schema3,
  path: path2,
  method,
  hook,
  models
}) => {
  hook = cloneHook(hook);
  const contentType = hook?.type ?? [
    "application/json",
    "multipart/form-data",
    "text/plain"
  ];
  path2 = toOpenAPIPath(path2);
  const contentTypes = typeof contentType === "string" ? [contentType] : contentType ?? ["application/json"];
  const bodySchema = cloneHook(hook?.body);
  const paramsSchema = cloneHook(hook?.params);
  const headerSchema = cloneHook(hook?.headers);
  const querySchema = cloneHook(hook?.query);
  let responseSchema = cloneHook(hook?.response);
  if (typeof responseSchema === "object") {
    if (Kind2 in responseSchema) {
      const {
        type: type3,
        properties,
        required: required3,
        additionalProperties,
        patternProperties,
        ...rest3
      } = responseSchema;
      responseSchema = {
        "200": {
          ...rest3,
          description: rest3.description,
          content: mapTypesResponse(contentTypes, type3 === "object" || type3 === "array" ? {
            type: type3,
            properties,
            patternProperties,
            items: responseSchema.items,
            required: required3
          } : responseSchema)
        }
      };
    } else {
      Object.entries(responseSchema).forEach(([key, value2]) => {
        if (typeof value2 === "string") {
          if (!models[value2])
            return;
          const {
            type: type3,
            properties,
            required: required3,
            additionalProperties: _1,
            patternProperties: _2,
            ...rest3
          } = models[value2];
          responseSchema[key] = {
            ...rest3,
            description: rest3.description,
            content: mapTypesResponse(contentTypes, value2)
          };
        } else {
          const {
            type: type3,
            properties,
            required: required3,
            additionalProperties,
            patternProperties,
            ...rest3
          } = value2;
          responseSchema[key] = {
            ...rest3,
            description: rest3.description,
            content: mapTypesResponse(contentTypes, type3 === "object" || type3 === "array" ? {
              type: type3,
              properties,
              patternProperties,
              items: value2.items,
              required: required3
            } : value2)
          };
        }
      });
    }
  } else if (typeof responseSchema === "string") {
    if (!(responseSchema in models))
      return;
    const {
      type: type3,
      properties,
      required: required3,
      additionalProperties: _1,
      patternProperties: _2,
      ...rest3
    } = models[responseSchema];
    responseSchema = {
      "200": {
        ...rest3,
        content: mapTypesResponse(contentTypes, responseSchema)
      }
    };
  }
  const parameters3 = [
    ...mapProperties("header", headerSchema, models),
    ...mapProperties("path", paramsSchema, models),
    ...mapProperties("query", querySchema, models)
  ];
  schema3[path2] = {
    ...schema3[path2] ? schema3[path2] : {},
    [method.toLowerCase()]: {
      ...headerSchema || paramsSchema || querySchema || bodySchema ? { parameters: parameters3 } : {},
      ...responseSchema ? {
        responses: responseSchema
      } : {},
      operationId: hook?.detail?.operationId ?? generateOperationId(method, path2),
      ...hook?.detail,
      ...bodySchema ? {
        requestBody: {
          required: true,
          content: mapTypesResponse(contentTypes, typeof bodySchema === "string" ? {
            $ref: `#/components/schemas/${bodySchema}`
          } : bodySchema)
        }
      } : null
    }
  };
};
var filterPaths = (paths, docsPath, {
  excludeStaticFile = true,
  exclude: exclude3 = []
}) => {
  const newPaths = {};
  const excludePaths = [`/${docsPath}`, `/${docsPath}/json`].map((p) => normalize(p));
  for (const [key, value2] of Object.entries(paths))
    if (!exclude3.some((x) => {
      if (typeof x === "string")
        return key === x;
      return x.test(key);
    }) && !excludePaths.includes(key) && !key.includes("*") && (excludeStaticFile ? !key.includes(".") : true)) {
      Object.keys(value2).forEach((method) => {
        const schema3 = value2[method];
        if (key.includes("{")) {
          if (!schema3.parameters)
            schema3.parameters = [];
          schema3.parameters = [
            ...key.split("/").filter((x) => x.startsWith("{") && !schema3.parameters.find((params) => params.in === "path" && params.name === x.slice(1, x.length - 1))).map((x) => ({
              schema: { type: "string" },
              in: "path",
              name: x.slice(1, x.length - 1),
              required: true
            })),
            ...schema3.parameters
          ];
        }
        if (!schema3.responses)
          schema3.responses = {
            200: {}
          };
      });
      newPaths[key] = value2;
    }
  return newPaths;
};
var swagger = async ({
  provider = "scalar",
  scalarVersion = "latest",
  scalarCDN = "",
  scalarConfig = {},
  documentation = {},
  version: version2 = "5.9.0",
  excludeStaticFile = true,
  path: path2 = "/swagger",
  exclude: exclude3 = [],
  swaggerOptions = {},
  theme = `https://unpkg.com/swagger-ui-dist@${version2}/swagger-ui.css`,
  autoDarkMode = true,
  excludeMethods = ["OPTIONS"],
  excludeTags = []
} = {
  provider: "scalar",
  scalarVersion: "latest",
  scalarCDN: "",
  scalarConfig: {},
  documentation: {},
  version: "5.9.0",
  excludeStaticFile: true,
  path: "/swagger",
  exclude: [],
  swaggerOptions: {},
  autoDarkMode: true,
  excludeMethods: ["OPTIONS"],
  excludeTags: []
}) => {
  const schema3 = {};
  let totalRoutes = 0;
  if (!version2)
    version2 = `https://unpkg.com/swagger-ui-dist@${version2}/swagger-ui.css`;
  const info = {
    title: "Elysia Documentation",
    description: "Development documentation",
    version: "0.0.0",
    ...documentation.info
  };
  const relativePath = path2.startsWith("/") ? path2.slice(1) : path2;
  const app = new Elysia({ name: "@elysiajs/swagger" });
  app.get(path2, function documentation2() {
    const combinedSwaggerOptions = {
      url: `/${relativePath}/json`,
      dom_id: "#swagger-ui",
      ...swaggerOptions
    };
    const stringifiedSwaggerOptions = JSON.stringify(combinedSwaggerOptions, (key, value2) => {
      if (typeof value2 == "function")
        return;
      return value2;
    });
    const scalarConfiguration = {
      spec: {
        ...scalarConfig.spec,
        url: `/${relativePath}/json`
      },
      ...scalarConfig
    };
    return new Response(provider === "swagger-ui" ? SwaggerUIRender(info, version2, theme, stringifiedSwaggerOptions, autoDarkMode) : ScalarRender(info, scalarVersion, scalarConfiguration, scalarCDN), {
      headers: {
        "content-type": "text/html; charset=utf8"
      }
    });
  }).get(path2 === "/" ? "/json" : `${path2}/json`, function openAPISchema() {
    const routes = app.getGlobalRoutes();
    if (routes.length !== totalRoutes) {
      const ALLOWED_METHODS = ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD", "PATCH", "TRACE"];
      totalRoutes = routes.length;
      routes.forEach((route) => {
        if (route.hooks?.detail?.hide === true)
          return;
        if (excludeMethods.includes(route.method))
          return;
        if (ALLOWED_METHODS.includes(route.method) === false && route.method !== "ALL")
          return;
        if (route.method === "ALL") {
          ALLOWED_METHODS.forEach((method) => {
            registerSchemaPath({
              schema: schema3,
              hook: route.hooks,
              method,
              path: route.path,
              models: app.definitions?.type,
              contentType: route.hooks.type
            });
          });
          return;
        }
        registerSchemaPath({
          schema: schema3,
          hook: route.hooks,
          method: route.method,
          path: route.path,
          models: app.definitions?.type,
          contentType: route.hooks.type
        });
      });
    }
    return {
      openapi: "3.0.3",
      ...{
        ...documentation,
        tags: documentation.tags?.filter((tag) => !excludeTags?.includes(tag?.name)),
        info: {
          title: "Elysia Documentation",
          description: "Development documentation",
          version: "0.0.0",
          ...documentation.info
        }
      },
      paths: {
        ...filterPaths(schema3, relativePath, {
          excludeStaticFile,
          exclude: Array.isArray(exclude3) ? exclude3 : [exclude3]
        }),
        ...documentation.paths
      },
      components: {
        ...documentation.components,
        schemas: {
          ...app.definitions?.type,
          ...documentation.components?.schemas
        }
      }
    };
  });
  return app;
};

// src/index.ts
var app = new Elysia().use(swagger({
  documentation: {
    info: {
      title: "Context Store API",
      version: "1.0.0",
      description: "API for managing threads and messages"
    },
    tags: [
      { name: "Threads", description: "Thread management endpoints" },
      {
        name: "Messages",
        description: "Message management endpoints within threads"
      }
    ]
  },
  path: "/docs"
})).use(threads).onAfterResponse(({ request, response }) => {
  console.log(`${request.method} ${request.url} ${response.status}`);
}).listen(3003);
console.log(`\uD83E\uDD8A Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
export {
  app
};
