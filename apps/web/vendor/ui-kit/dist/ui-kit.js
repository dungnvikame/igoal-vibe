import { jsxs as y, jsx as a, Fragment as Ce } from "react/jsx-runtime";
import * as n from "react";
import { Slot as qr, DropdownMenu as _e, Popover as he, Checkbox as nr, RadioGroup as Xr, Switch as or, Dialog as ae, Tooltip as ft, Tabs as mt, Accordion as ht, ScrollArea as Ue, Slider as vt } from "radix-ui";
import { ChevronDown as Zr, X as bt, Check as ir, Info as lr, XCircle as Va, AlertTriangle as Ta, CheckCircle as La, ChevronRight as Et, Filter as Ea, ChevronsRight as Aa, ChevronsLeft as Pa, ChevronLeft as ja, Calendar as Fa, Clock as Oa, CalendarClock as $a, Upload as Ba, FileText as Ha, Trash2 as Ga } from "lucide-react";
import { Toaster as Wa } from "sonner";
import { toast as Nl } from "sonner";
import { useVirtualizer as Kt } from "@tanstack/react-virtual";
import { functionalUpdate as ct, useReactTable as Ua, getPaginationRowModel as Ka, getExpandedRowModel as Ya, getSortedRowModel as qa, getFilteredRowModel as Xa, getCoreRowModel as Za, flexRender as cr } from "@tanstack/react-table";
function Qr(e) {
  var t, r, s = "";
  if (typeof e == "string" || typeof e == "number") s += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = Qr(e[t])) && (s && (s += " "), s += r);
  } else for (r in e) e[r] && (s && (s += " "), s += r);
  return s;
}
function Jr() {
  for (var e, t, r = 0, s = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = Qr(e)) && (s && (s += " "), s += t);
  return s;
}
const dr = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ur = Jr, I = (e, t) => (r) => {
  var s;
  if (t?.variants == null) return ur(e, r?.class, r?.className);
  const { variants: i, defaultVariants: o } = t, l = Object.keys(i).map((u) => {
    const f = r?.[u], _ = o?.[u];
    if (f === null) return null;
    const b = dr(f) || dr(_);
    return i[u][b];
  }), d = r && Object.entries(r).reduce((u, f) => {
    let [_, b] = f;
    return b === void 0 || (u[_] = b), u;
  }, {}), c = t == null || (s = t.compoundVariants) === null || s === void 0 ? void 0 : s.reduce((u, f) => {
    let { class: _, className: b, ...g } = f;
    return Object.entries(g).every((k) => {
      let [w, N] = k;
      return Array.isArray(N) ? N.includes({
        ...o,
        ...d
      }[w]) : {
        ...o,
        ...d
      }[w] === N;
    }) ? [
      ...u,
      _,
      b
    ] : u;
  }, []);
  return ur(e, l, c, r?.class, r?.className);
}, Qa = (e, t) => {
  const r = new Array(e.length + t.length);
  for (let s = 0; s < e.length; s++)
    r[s] = e[s];
  for (let s = 0; s < t.length; s++)
    r[e.length + s] = t[s];
  return r;
}, Ja = (e, t) => ({
  classGroupId: e,
  validator: t
}), ea = (e = /* @__PURE__ */ new Map(), t = null, r) => ({
  nextPart: e,
  validators: t,
  classGroupId: r
}), Mt = "-", fr = [], es = "arbitrary..", ts = (e) => {
  const t = as(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: s
  } = e;
  return {
    getClassGroupId: (l) => {
      if (l.startsWith("[") && l.endsWith("]"))
        return rs(l);
      const d = l.split(Mt), c = d[0] === "" && d.length > 1 ? 1 : 0;
      return ta(d, c, t);
    },
    getConflictingClassGroupIds: (l, d) => {
      if (d) {
        const c = s[l], u = r[l];
        return c ? u ? Qa(u, c) : c : u || fr;
      }
      return r[l] || fr;
    }
  };
}, ta = (e, t, r) => {
  if (e.length - t === 0)
    return r.classGroupId;
  const i = e[t], o = r.nextPart.get(i);
  if (o) {
    const u = ta(e, t + 1, o);
    if (u) return u;
  }
  const l = r.validators;
  if (l === null)
    return;
  const d = t === 0 ? e.join(Mt) : e.slice(t).join(Mt), c = l.length;
  for (let u = 0; u < c; u++) {
    const f = l[u];
    if (f.validator(d))
      return f.classGroupId;
  }
}, rs = (e) => e.slice(1, -1).indexOf(":") === -1 ? void 0 : (() => {
  const t = e.slice(1, -1), r = t.indexOf(":"), s = t.slice(0, r);
  return s ? es + s : void 0;
})(), as = (e) => {
  const {
    theme: t,
    classGroups: r
  } = e;
  return ss(r, t);
}, ss = (e, t) => {
  const r = ea();
  for (const s in e) {
    const i = e[s];
    Yt(i, r, s, t);
  }
  return r;
}, Yt = (e, t, r, s) => {
  const i = e.length;
  for (let o = 0; o < i; o++) {
    const l = e[o];
    ns(l, t, r, s);
  }
}, ns = (e, t, r, s) => {
  if (typeof e == "string") {
    os(e, t, r);
    return;
  }
  if (typeof e == "function") {
    is(e, t, r, s);
    return;
  }
  ls(e, t, r, s);
}, os = (e, t, r) => {
  const s = e === "" ? t : ra(t, e);
  s.classGroupId = r;
}, is = (e, t, r, s) => {
  if (cs(e)) {
    Yt(e(s), t, r, s);
    return;
  }
  t.validators === null && (t.validators = []), t.validators.push(Ja(r, e));
}, ls = (e, t, r, s) => {
  const i = Object.entries(e), o = i.length;
  for (let l = 0; l < o; l++) {
    const [d, c] = i[l];
    Yt(c, ra(t, d), r, s);
  }
}, ra = (e, t) => {
  let r = e;
  const s = t.split(Mt), i = s.length;
  for (let o = 0; o < i; o++) {
    const l = s[o];
    let d = r.nextPart.get(l);
    d || (d = ea(), r.nextPart.set(l, d)), r = d;
  }
  return r;
}, cs = (e) => "isThemeGetter" in e && e.isThemeGetter === !0, ds = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ Object.create(null), s = /* @__PURE__ */ Object.create(null);
  const i = (o, l) => {
    r[o] = l, t++, t > e && (t = 0, s = r, r = /* @__PURE__ */ Object.create(null));
  };
  return {
    get(o) {
      let l = r[o];
      if (l !== void 0)
        return l;
      if ((l = s[o]) !== void 0)
        return i(o, l), l;
    },
    set(o, l) {
      o in r ? r[o] = l : i(o, l);
    }
  };
}, Ht = "!", mr = ":", us = [], pr = (e, t, r, s, i) => ({
  modifiers: e,
  hasImportantModifier: t,
  baseClassName: r,
  maybePostfixModifierPosition: s,
  isExternal: i
}), fs = (e) => {
  const {
    prefix: t,
    experimentalParseClassName: r
  } = e;
  let s = (i) => {
    const o = [];
    let l = 0, d = 0, c = 0, u;
    const f = i.length;
    for (let w = 0; w < f; w++) {
      const N = i[w];
      if (l === 0 && d === 0) {
        if (N === mr) {
          o.push(i.slice(c, w)), c = w + 1;
          continue;
        }
        if (N === "/") {
          u = w;
          continue;
        }
      }
      N === "[" ? l++ : N === "]" ? l-- : N === "(" ? d++ : N === ")" && d--;
    }
    const _ = o.length === 0 ? i : i.slice(c);
    let b = _, g = !1;
    _.endsWith(Ht) ? (b = _.slice(0, -1), g = !0) : (
      /**
       * In Tailwind CSS v3 the important modifier was at the start of the base class name. This is still supported for legacy reasons.
       * @see https://github.com/dcastil/tailwind-merge/issues/513#issuecomment-2614029864
       */
      _.startsWith(Ht) && (b = _.slice(1), g = !0)
    );
    const k = u && u > c ? u - c : void 0;
    return pr(o, g, b, k);
  };
  if (t) {
    const i = t + mr, o = s;
    s = (l) => l.startsWith(i) ? o(l.slice(i.length)) : pr(us, !1, l, void 0, !0);
  }
  if (r) {
    const i = s;
    s = (o) => r({
      className: o,
      parseClassName: i
    });
  }
  return s;
}, ms = (e) => {
  const t = /* @__PURE__ */ new Map();
  return e.orderSensitiveModifiers.forEach((r, s) => {
    t.set(r, 1e6 + s);
  }), (r) => {
    const s = [];
    let i = [];
    for (let o = 0; o < r.length; o++) {
      const l = r[o], d = l[0] === "[", c = t.has(l);
      d || c ? (i.length > 0 && (i.sort(), s.push(...i), i = []), s.push(l)) : i.push(l);
    }
    return i.length > 0 && (i.sort(), s.push(...i)), s;
  };
}, ps = (e) => ({
  cache: ds(e.cacheSize),
  parseClassName: fs(e),
  sortModifiers: ms(e),
  ...ts(e)
}), gs = /\s+/, hs = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: s,
    getConflictingClassGroupIds: i,
    sortModifiers: o
  } = t, l = [], d = e.trim().split(gs);
  let c = "";
  for (let u = d.length - 1; u >= 0; u -= 1) {
    const f = d[u], {
      isExternal: _,
      modifiers: b,
      hasImportantModifier: g,
      baseClassName: k,
      maybePostfixModifierPosition: w
    } = r(f);
    if (_) {
      c = f + (c.length > 0 ? " " + c : c);
      continue;
    }
    let N = !!w, x = s(N ? k.substring(0, w) : k);
    if (!x) {
      if (!N) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      if (x = s(k), !x) {
        c = f + (c.length > 0 ? " " + c : c);
        continue;
      }
      N = !1;
    }
    const h = b.length === 0 ? "" : b.length === 1 ? b[0] : o(b).join(":"), v = g ? h + Ht : h, j = v + x;
    if (l.indexOf(j) > -1)
      continue;
    l.push(j);
    const V = i(x, N);
    for (let O = 0; O < V.length; ++O) {
      const D = V[O];
      l.push(v + D);
    }
    c = f + (c.length > 0 ? " " + c : c);
  }
  return c;
}, bs = (...e) => {
  let t = 0, r, s, i = "";
  for (; t < e.length; )
    (r = e[t++]) && (s = aa(r)) && (i && (i += " "), i += s);
  return i;
}, aa = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let s = 0; s < e.length; s++)
    e[s] && (t = aa(e[s])) && (r && (r += " "), r += t);
  return r;
}, gr = (e, ...t) => {
  let r, s, i, o;
  const l = (c) => {
    const u = t.reduce((f, _) => _(f), e());
    return r = ps(u), s = r.cache.get, i = r.cache.set, o = d, d(c);
  }, d = (c) => {
    const u = s(c);
    if (u)
      return u;
    const f = hs(c, r);
    return i(c, f), f;
  };
  return o = l, (...c) => o(bs(...c));
}, _s = [], me = (e) => {
  const t = (r) => r[e] || _s;
  return t.isThemeGetter = !0, t;
}, sa = /^\[(?:(\w[\w-]*):)?(.+)\]$/i, na = /^\((?:(\w[\w-]*):)?(.+)\)$/i, ys = /^\d+\/\d+$/, xs = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, vs = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, ws = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/, ks = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ns = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Qe = (e) => ys.test(e), Z = (e) => !!e && !Number.isNaN(Number(e)), Ae = (e) => !!e && Number.isInteger(Number(e)), jt = (e) => e.endsWith("%") && Z(e.slice(0, -1)), Te = (e) => xs.test(e), Cs = () => !0, Ss = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  vs.test(e) && !ws.test(e)
), oa = () => !1, zs = (e) => ks.test(e), Rs = (e) => Ns.test(e), Ms = (e) => !L(e) && !E(e), Ds = (e) => tt(e, ca, oa), L = (e) => sa.test(e), Ke = (e) => tt(e, da, Ss), Ft = (e) => tt(e, Es, Z), hr = (e) => tt(e, ia, oa), Is = (e) => tt(e, la, Rs), wt = (e) => tt(e, ua, zs), E = (e) => na.test(e), dt = (e) => rt(e, da), Vs = (e) => rt(e, As), br = (e) => rt(e, ia), Ts = (e) => rt(e, ca), Ls = (e) => rt(e, la), kt = (e) => rt(e, ua, !0), tt = (e, t, r) => {
  const s = sa.exec(e);
  return s ? s[1] ? t(s[1]) : r(s[2]) : !1;
}, rt = (e, t, r = !1) => {
  const s = na.exec(e);
  return s ? s[1] ? t(s[1]) : r : !1;
}, ia = (e) => e === "position" || e === "percentage", la = (e) => e === "image" || e === "url", ca = (e) => e === "length" || e === "size" || e === "bg-size", da = (e) => e === "length", Es = (e) => e === "number", As = (e) => e === "family-name", ua = (e) => e === "shadow", _r = () => {
  const e = me("color"), t = me("font"), r = me("text"), s = me("font-weight"), i = me("tracking"), o = me("leading"), l = me("breakpoint"), d = me("container"), c = me("spacing"), u = me("radius"), f = me("shadow"), _ = me("inset-shadow"), b = me("text-shadow"), g = me("drop-shadow"), k = me("blur"), w = me("perspective"), N = me("aspect"), x = me("ease"), h = me("animate"), v = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], j = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-top",
    "top-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-top",
    "bottom-right",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "right-bottom",
    "bottom-left",
    // Deprecated since Tailwind CSS v4.1.0, see https://github.com/tailwindlabs/tailwindcss/pull/17378
    "left-bottom"
  ], V = () => [...j(), E, L], O = () => ["auto", "hidden", "clip", "visible", "scroll"], D = () => ["auto", "contain", "none"], T = () => [E, L, c], C = () => [Qe, "full", "auto", ...T()], U = () => [Ae, "none", "subgrid", E, L], K = () => ["auto", {
    span: ["full", Ae, E, L]
  }, Ae, E, L], Y = () => [Ae, "auto", E, L], se = () => ["auto", "min", "max", "fr", E, L], X = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"], R = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"], $ = () => ["auto", ...T()], Q = () => [Qe, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...T()], S = () => [e, E, L], ie = () => [...j(), br, hr, {
    position: [E, L]
  }], B = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }], H = () => ["auto", "cover", "contain", Ts, Ds, {
    size: [E, L]
  }], A = () => [jt, dt, Ke], P = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    "full",
    u,
    E,
    L
  ], q = () => ["", Z, dt, Ke], G = () => ["solid", "dashed", "dotted", "double"], J = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], W = () => [Z, jt, br, hr], de = () => [
    // Deprecated since Tailwind CSS v4.0.0
    "",
    "none",
    k,
    E,
    L
  ], oe = () => ["none", Z, E, L], ue = () => ["none", Z, E, L], pe = () => [Z, E, L], le = () => [Qe, "full", ...T()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [Te],
      breakpoint: [Te],
      color: [Cs],
      container: [Te],
      "drop-shadow": [Te],
      ease: ["in", "out", "in-out"],
      font: [Ms],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [Te],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [Te],
      shadow: [Te],
      spacing: ["px", Z],
      text: [Te],
      "text-shadow": [Te],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      // --------------
      // --- Layout ---
      // --------------
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", Qe, L, E, N]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       * @deprecated since Tailwind CSS v4.0.0
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [Z, L, E, d]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": v()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": v()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Screen Reader Only
       * @see https://tailwindcss.com/docs/display#screen-reader-only
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: V()
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: O()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": O()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": O()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: D()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": D()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": D()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: C()
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": C()
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": C()
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: C()
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: C()
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: C()
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: C()
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: C()
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: C()
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: [Ae, "auto", E, L]
      }],
      // ------------------------
      // --- Flexbox and Grid ---
      // ------------------------
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: [Qe, "full", "auto", d, ...T()]
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: [Z, Qe, "auto", "initial", "none", L]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: ["", Z, E, L]
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: ["", Z, E, L]
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: [Ae, "first", "last", "none", E, L]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": U()
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: K()
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": Y()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": Y()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": U()
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: K()
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": Y()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": Y()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": se()
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": se()
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: T()
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": T()
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": T()
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: [...X(), "normal"]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": [...R(), "normal"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", ...R()]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...X()]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: [...R(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", ...R(), {
          baseline: ["", "last"]
        }]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": X()
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": [...R(), "baseline"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", ...R()]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: T()
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: T()
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: T()
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: T()
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: T()
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: T()
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: T()
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: T()
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: T()
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: $()
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: $()
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: $()
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: $()
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: $()
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: $()
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: $()
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: $()
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: $()
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x": [{
        "space-x": T()
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y": [{
        "space-y": T()
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/margin#adding-space-between-children
       */
      "space-y-reverse": ["space-y-reverse"],
      // --------------
      // --- Sizing ---
      // --------------
      /**
       * Size
       * @see https://tailwindcss.com/docs/width#setting-both-width-and-height
       */
      size: [{
        size: Q()
      }],
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: [d, "screen", ...Q()]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [
          d,
          "screen",
          /** Deprecated. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "none",
          ...Q()
        ]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [
          d,
          "screen",
          "none",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          "prose",
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          {
            screen: [l]
          },
          ...Q()
        ]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: ["screen", "lh", ...Q()]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...Q()]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": ["screen", "lh", ...Q()]
      }],
      // ------------------
      // --- Typography ---
      // ------------------
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", r, dt, Ke]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: [s, E, Ft]
      }],
      /**
       * Font Stretch
       * @see https://tailwindcss.com/docs/font-stretch
       */
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", jt, L]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [Vs, L, t]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: [i, E, L]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": [Z, "none", E, Ft]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: [
          /** Deprecated since Tailwind CSS v4.0.0. @see https://github.com/tailwindlabs/tailwindcss.com/issues/2027#issuecomment-2620152757 */
          o,
          ...T()
        ]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", E, L]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["disc", "decimal", "none", E, L]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://v3.tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: S()
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: S()
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...G(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: [Z, "from-font", "auto", E, Ke]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: S()
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": [Z, "auto", E, L]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: T()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", E, L]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Overflow Wrap
       * @see https://tailwindcss.com/docs/overflow-wrap
       */
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", E, L]
      }],
      // -------------------
      // --- Backgrounds ---
      // -------------------
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: ie()
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: B()
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: H()
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, Ae, E, L],
          radial: ["", E, L],
          conic: [Ae, E, L]
        }, Ls, Is]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: S()
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: A()
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: A()
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: A()
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: S()
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: S()
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: S()
      }],
      // ---------------
      // --- Borders ---
      // ---------------
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: P()
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": P()
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": P()
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": P()
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": P()
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": P()
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": P()
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": P()
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": P()
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": P()
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": P()
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": P()
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": P()
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": P()
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": P()
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: q()
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": q()
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": q()
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": q()
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": q()
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": q()
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": q()
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": q()
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": q()
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x": [{
        "divide-x": q()
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y": [{
        "divide-y": q()
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/border-width#between-children
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...G(), "hidden", "none"]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/border-style#setting-the-divider-style
       */
      "divide-style": [{
        divide: [...G(), "hidden", "none"]
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: S()
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": S()
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": S()
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": S()
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": S()
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": S()
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": S()
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": S()
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": S()
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: S()
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: [...G(), "none", "hidden"]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Z, E, L]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: ["", Z, dt, Ke]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: S()
      }],
      // ---------------
      // --- Effects ---
      // ---------------
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          f,
          kt,
          wt
        ]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-shadow-color
       */
      "shadow-color": [{
        shadow: S()
      }],
      /**
       * Inset Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-shadow
       */
      "inset-shadow": [{
        "inset-shadow": ["none", _, kt, wt]
      }],
      /**
       * Inset Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-shadow-color
       */
      "inset-shadow-color": [{
        "inset-shadow": S()
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-a-ring
       */
      "ring-w": [{
        ring: q()
      }],
      /**
       * Ring Width Inset
       * @see https://v3.tailwindcss.com/docs/ring-width#inset-rings
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-ring-color
       */
      "ring-color": [{
        ring: S()
      }],
      /**
       * Ring Offset Width
       * @see https://v3.tailwindcss.com/docs/ring-offset-width
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-w": [{
        "ring-offset": [Z, Ke]
      }],
      /**
       * Ring Offset Color
       * @see https://v3.tailwindcss.com/docs/ring-offset-color
       * @deprecated since Tailwind CSS v4.0.0
       * @see https://github.com/tailwindlabs/tailwindcss/blob/v4.0.0/packages/tailwindcss/src/utilities.ts#L4158
       */
      "ring-offset-color": [{
        "ring-offset": S()
      }],
      /**
       * Inset Ring Width
       * @see https://tailwindcss.com/docs/box-shadow#adding-an-inset-ring
       */
      "inset-ring-w": [{
        "inset-ring": q()
      }],
      /**
       * Inset Ring Color
       * @see https://tailwindcss.com/docs/box-shadow#setting-the-inset-ring-color
       */
      "inset-ring-color": [{
        "inset-ring": S()
      }],
      /**
       * Text Shadow
       * @see https://tailwindcss.com/docs/text-shadow
       */
      "text-shadow": [{
        "text-shadow": ["none", b, kt, wt]
      }],
      /**
       * Text Shadow Color
       * @see https://tailwindcss.com/docs/text-shadow#setting-the-shadow-color
       */
      "text-shadow-color": [{
        "text-shadow": S()
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [Z, E, L]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...J(), "plus-darker", "plus-lighter"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": J()
      }],
      /**
       * Mask Clip
       * @see https://tailwindcss.com/docs/mask-clip
       */
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      /**
       * Mask Composite
       * @see https://tailwindcss.com/docs/mask-composite
       */
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image-linear-pos": [{
        "mask-linear": [Z]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": W()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": W()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": S()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": S()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": W()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": W()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": S()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": S()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": W()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": W()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": S()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": S()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": W()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": W()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": S()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": S()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": W()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": W()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": S()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": S()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": W()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": W()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": S()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": S()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": W()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": W()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": S()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": S()
      }],
      "mask-image-radial": [{
        "mask-radial": [E, L]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": W()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": W()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": S()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": S()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": j()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [Z]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": W()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": W()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": S()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": S()
      }],
      /**
       * Mask Mode
       * @see https://tailwindcss.com/docs/mask-mode
       */
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      /**
       * Mask Origin
       * @see https://tailwindcss.com/docs/mask-origin
       */
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      /**
       * Mask Position
       * @see https://tailwindcss.com/docs/mask-position
       */
      "mask-position": [{
        mask: ie()
      }],
      /**
       * Mask Repeat
       * @see https://tailwindcss.com/docs/mask-repeat
       */
      "mask-repeat": [{
        mask: B()
      }],
      /**
       * Mask Size
       * @see https://tailwindcss.com/docs/mask-size
       */
      "mask-size": [{
        mask: H()
      }],
      /**
       * Mask Type
       * @see https://tailwindcss.com/docs/mask-type
       */
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      /**
       * Mask Image
       * @see https://tailwindcss.com/docs/mask-image
       */
      "mask-image": [{
        mask: ["none", E, L]
      }],
      // ---------------
      // --- Filters ---
      // ---------------
      /**
       * Filter
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          E,
          L
        ]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: de()
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [Z, E, L]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [Z, E, L]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": [
          // Deprecated since Tailwind CSS v4.0.0
          "",
          "none",
          g,
          kt,
          wt
        ]
      }],
      /**
       * Drop Shadow Color
       * @see https://tailwindcss.com/docs/filter-drop-shadow#setting-the-shadow-color
       */
      "drop-shadow-color": [{
        "drop-shadow": S()
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: ["", Z, E, L]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [Z, E, L]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: ["", Z, E, L]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [Z, E, L]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: ["", Z, E, L]
      }],
      /**
       * Backdrop Filter
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": [
          // Deprecated since Tailwind CSS v3.0.0
          "",
          "none",
          E,
          L
        ]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": de()
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [Z, E, L]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [Z, E, L]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", Z, E, L]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [Z, E, L]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": ["", Z, E, L]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [Z, E, L]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [Z, E, L]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": ["", Z, E, L]
      }],
      // --------------
      // --- Tables ---
      // --------------
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": T()
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": T()
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": T()
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // ---------------------------------
      // --- Transitions and Animation ---
      // ---------------------------------
      /**
       * Transition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", E, L]
      }],
      /**
       * Transition Behavior
       * @see https://tailwindcss.com/docs/transition-behavior
       */
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: [Z, "initial", E, L]
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "initial", x, E, L]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: [Z, E, L]
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", h, E, L]
      }],
      // ------------------
      // --- Transforms ---
      // ------------------
      /**
       * Backface Visibility
       * @see https://tailwindcss.com/docs/backface-visibility
       */
      backface: [{
        backface: ["hidden", "visible"]
      }],
      /**
       * Perspective
       * @see https://tailwindcss.com/docs/perspective
       */
      perspective: [{
        perspective: [w, E, L]
      }],
      /**
       * Perspective Origin
       * @see https://tailwindcss.com/docs/perspective-origin
       */
      "perspective-origin": [{
        "perspective-origin": V()
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: oe()
      }],
      /**
       * Rotate X
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-x": [{
        "rotate-x": oe()
      }],
      /**
       * Rotate Y
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-y": [{
        "rotate-y": oe()
      }],
      /**
       * Rotate Z
       * @see https://tailwindcss.com/docs/rotate
       */
      "rotate-z": [{
        "rotate-z": oe()
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: ue()
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": ue()
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": ue()
      }],
      /**
       * Scale Z
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-z": [{
        "scale-z": ue()
      }],
      /**
       * Scale 3D
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-3d": ["scale-3d"],
      /**
       * Skew
       * @see https://tailwindcss.com/docs/skew
       */
      skew: [{
        skew: pe()
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": pe()
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": pe()
      }],
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: [E, L, "", "none", "gpu", "cpu"]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: V()
      }],
      /**
       * Transform Style
       * @see https://tailwindcss.com/docs/transform-style
       */
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      /**
       * Translate
       * @see https://tailwindcss.com/docs/translate
       */
      translate: [{
        translate: le()
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": le()
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": le()
      }],
      /**
       * Translate Z
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-z": [{
        "translate-z": le()
      }],
      /**
       * Translate None
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-none": ["translate-none"],
      // ---------------------
      // --- Interactivity ---
      // ---------------------
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: S()
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: S()
      }],
      /**
       * Color Scheme
       * @see https://tailwindcss.com/docs/color-scheme
       */
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", E, L]
      }],
      /**
       * Field Sizing
       * @see https://tailwindcss.com/docs/field-sizing
       */
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": T()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": T()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": T()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": T()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": T()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": T()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": T()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": T()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": T()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": T()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": T()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": T()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": T()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": T()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": T()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": T()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": T()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": T()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", E, L]
      }],
      // -----------
      // --- SVG ---
      // -----------
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: ["none", ...S()]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Z, dt, Ke, Ft]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: ["none", ...S()]
      }],
      // ---------------------
      // --- Accessibility ---
      // ---------------------
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
}, Ps = (e, {
  cacheSize: t,
  prefix: r,
  experimentalParseClassName: s,
  extend: i = {},
  override: o = {}
}) => (pt(e, "cacheSize", t), pt(e, "prefix", r), pt(e, "experimentalParseClassName", s), Nt(e.theme, o.theme), Nt(e.classGroups, o.classGroups), Nt(e.conflictingClassGroups, o.conflictingClassGroups), Nt(e.conflictingClassGroupModifiers, o.conflictingClassGroupModifiers), pt(e, "orderSensitiveModifiers", o.orderSensitiveModifiers), Ct(e.theme, i.theme), Ct(e.classGroups, i.classGroups), Ct(e.conflictingClassGroups, i.conflictingClassGroups), Ct(e.conflictingClassGroupModifiers, i.conflictingClassGroupModifiers), fa(e, i, "orderSensitiveModifiers"), e), pt = (e, t, r) => {
  r !== void 0 && (e[t] = r);
}, Nt = (e, t) => {
  if (t)
    for (const r in t)
      pt(e, r, t[r]);
}, Ct = (e, t) => {
  if (t)
    for (const r in t)
      fa(e, t, r);
}, fa = (e, t, r) => {
  const s = t[r];
  s !== void 0 && (e[r] = e[r] ? e[r].concat(s) : s);
}, js = (e, ...t) => typeof e == "function" ? gr(_r, e, ...t) : gr(() => Ps(_r(), e), ...t), Fs = (e) => e.startsWith("bg_"), Os = (e) => e.startsWith("border_"), $s = (e) => e.startsWith("text_") || e.startsWith("fg_") || e.startsWith("icon_"), Bs = js({
  extend: {
    classGroups: {
      "bg-color": [Fs],
      "border-color": [Os],
      "text-color": [$s]
    }
  }
});
function m(...e) {
  return Bs(Jr(e));
}
const Hs = I(
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap text-sm leading-[1.2] font-normal transition-colors duration-0 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 [&_svg]:text-current outline-none focus-visible:shadow-[var(--ds-outline-blue-focus)] border",
  {
    variants: {
      variant: {
        primary: "bg_button_primary fg_on_accent_primary border-transparent font-semibold hover:state_bg_button_primary_soft active:state_bg_button_primary_medium",
        primary2: "bg_accent_secondary fg_on_accent_secondary border-transparent font-semibold hover:state_bg_accent_secondary_soft active:state_bg_accent_secondary_medium",
        secondary: "bg_button_secondary border_secondary_button fg_accent_primary font-semibold hover:state_bg_button_secondary_subtle active:state_bg_button_secondary_soft",
        secondary2: "bg_accent_secondary_subtle border_accent_secondary fg_accent_secondary font-semibold hover:state_bg_accent_secondary_subtle_subtle active:state_bg_accent_secondary_subtle_soft",
        dim: "bg_button_tertiary border_dim_button text_primary hover:state_bg_button_tertiary_subtle active:state_bg_button_tertiary_soft",
        border: "bg-transparent border border_button text_primary hover:state_bg_button_tertiary_subtle active:state_bg_button_tertiary_soft",
        subtle: "bg-transparent border-transparent text_primary hover:state_bg_button_tertiary_subtle active:state_bg_button_tertiary_soft",
        borderlessSubtle: "bg-transparent border-transparent text_tertiary hover:state_bg_button_tertiary_subtle active:state_bg_button_tertiary_soft",
        danger: "bg_error border_error_button fg_error font-semibold hover:state_bg_error_soft active:state_bg_error_medium"
      },
      size: {
        xs: "h-6 radius_button_xs px-2 text-xs has-[>svg]:px-2 [&_svg:not([class*='size-'])]:h-3 [&_svg:not([class*='size-'])]:w-3",
        s: "h-7 radius_button_s px-2.5 text-xs has-[>svg]:px-2.5 [&_svg:not([class*='size-'])]:h-3.5 [&_svg:not([class*='size-'])]:w-3.5",
        m: "h-8 radius_button_m px-3 text-sm has-[>svg]:px-3 [&_svg:not([class*='size-'])]:h-4 [&_svg:not([class*='size-'])]:w-4",
        l: "h-10 radius_button_l px-4 text-sm has-[>svg]:px-4 [&_svg:not([class*='size-'])]:h-4.5 [&_svg:not([class*='size-'])]:w-4.5",
        xl: "h-12 radius_button_xl px-[18px] text-sm has-[>svg]:px-[18px] [&_svg:not([class*='size-'])]:h-5 [&_svg:not([class*='size-'])]:w-5",
        "icon-xs": "h-6 w-6 radius_button_xs p-0 [&_svg:not([class*='size-'])]:h-3 [&_svg:not([class*='size-'])]:w-3",
        "icon-s": "h-7 w-7 radius_button_s p-0 [&_svg:not([class*='size-'])]:h-3.5 [&_svg:not([class*='size-'])]:w-3.5",
        "icon-m": "h-8 w-8 radius_button_m p-0 [&_svg:not([class*='size-'])]:h-4 [&_svg:not([class*='size-'])]:w-4",
        "icon-l": "h-10 w-10 radius_button_l p-0 [&_svg:not([class*='size-'])]:h-4.5 [&_svg:not([class*='size-'])]:w-4.5",
        "icon-xl": "h-12 w-12 radius_button_xl p-0 [&_svg:not([class*='size-'])]:h-5 [&_svg:not([class*='size-'])]:w-5",
        "icon-mini-m": "h-5 w-5 radius_button_m p-0 [&_svg:not([class*='size-'])]:h-3 [&_svg:not([class*='size-'])]:w-3",
        "icon-mini-s": "h-[18px] w-[18px] radius_button_s p-0 [&_svg:not([class*='size-'])]:h-3 [&_svg:not([class*='size-'])]:w-3"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "m"
    }
  }
), Gs = I("animate-spin", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8"
    },
    variant: {
      default: "text_secondary",
      primary: "fg_accent_primary",
      white: "text-white",
      inherit: "text-current"
    }
  },
  defaultVariants: { size: "md", variant: "default" }
}), Dt = n.forwardRef(
  ({ className: e, size: t, variant: r, label: s = "Loading", ...i }, o) => /* @__PURE__ */ y(
    "svg",
    {
      ref: o,
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      role: "status",
      "aria-label": s,
      "data-slot": "spinner",
      "data-size": t,
      "data-variant": r,
      className: m(Gs({ size: t, variant: r }), e),
      ...i,
      children: [
        /* @__PURE__ */ a("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ a(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          }
        )
      ]
    }
  )
);
Dt.displayName = "Spinner";
const Ws = {
  sm: "s",
  default: "m",
  lg: "l",
  "icon-sm": "icon-s",
  "icon-md": "icon-m",
  "icon-lg": "icon-l"
}, Us = (e) => {
  if (e)
    return Ws[e] ?? e;
}, Me = n.forwardRef(
  ({
    className: e,
    variant: t = "primary",
    size: r = "m",
    asChild: s = !1,
    loading: i = !1,
    disabled: o,
    children: l,
    type: d,
    ...c
  }, u) => {
    const f = s ? qr.Root : "button", _ = Us(r), b = _?.startsWith("icon-") ?? !1, g = c["aria-label"];
    n.useEffect(() => {
    }, [b, g]);
    const k = i ? /* @__PURE__ */ y(Ce, { children: [
      /* @__PURE__ */ a("span", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ a(Dt, { variant: "inherit", size: "sm" }) }),
      !b && /* @__PURE__ */ a("span", { className: "opacity-0", "aria-hidden": "true", children: l })
    ] }) : l;
    return /* @__PURE__ */ a(
      f,
      {
        ref: u,
        "data-slot": "button",
        "data-variant": t,
        "data-size": _,
        "data-loading": i || void 0,
        type: d ?? (s ? void 0 : "button"),
        disabled: o || i,
        className: m(
          Hs({ variant: t, size: _ }),
          i && "relative",
          e
        ),
        "aria-busy": i,
        ...c,
        children: k
      }
    );
  }
);
Me.displayName = "Button";
const Ks = I(
  "inline-flex items-center justify-center shrink-0 overflow-hidden radius_round border border_secondary bg_button_tertiary text_secondary",
  {
    variants: {
      size: {
        xxs: "h-4 w-4 text-[8px]",
        xs: "h-6 w-6 text-[10px]",
        s: "h-8 w-8 text-xs",
        m: "h-10 w-10 text-sm",
        l: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg"
      },
      type: {
        image: "",
        icon: "icon_secondary",
        text: "font-semibold uppercase"
      }
    },
    defaultVariants: {
      size: "m",
      type: "image"
    }
  }
), qt = n.forwardRef(
  ({
    className: e,
    size: t = "m",
    type: r = "image",
    asChild: s = !1,
    src: i,
    alt: o,
    fallback: l,
    icon: d,
    imageProps: c,
    onClick: u,
    onKeyDown: f,
    ..._
  }, b) => {
    const [g, k] = n.useState(!1), w = o ?? l ?? "Avatar", x = r === "image" && !!i && !g ? "image" : d ? "icon" : "text", h = !!u, v = s ? qr.Root : "span", j = (D) => {
      k(!0), c?.onError?.(D);
    }, V = (D) => {
      (D.key === "Enter" || D.key === " ") && u && (D.preventDefault(), u(D)), f?.(D);
    }, O = () => x === "image" && i ? /* @__PURE__ */ a(
      "img",
      {
        src: i,
        alt: o ?? "Avatar image",
        className: "h-full w-full object-cover",
        onError: j,
        ...c
      }
    ) : x === "icon" ? /* @__PURE__ */ a("span", { className: "flex items-center justify-center", "aria-hidden": "true", children: d }) : /* @__PURE__ */ a("span", { "aria-hidden": "true", children: l ?? o?.slice(0, 2) ?? "?" });
    return /* @__PURE__ */ a(
      v,
      {
        ref: b,
        "data-slot": "avatar",
        "data-size": t,
        "data-type": x,
        className: m(Ks({ size: t, type: x }), e),
        role: h ? "button" : "img",
        "aria-label": w,
        tabIndex: h ? 0 : void 0,
        onClick: u,
        onKeyDown: V,
        ..._,
        children: O()
      }
    );
  }
);
qt.displayName = "Avatar";
const It = I(
  "w-full radius_6 border text-sm text_primary placeholder:text_tertiary bg-transparent transition-colors duration-0 outline-none focus-visible:border-[var(--ds-border-accent-secondary-contrast)] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      size: {
        xl: "h-14 px-5",
        l: "h-12 px-4",
        m: "h-10 px-4",
        s: "h-9 px-3",
        xs: "h-8 px-2.5"
      },
      variant: {
        light: "bg_input_light border_input",
        fill: "bg_input_fill border_input_opacity",
        dim: "bg_input_fill_dim_default border_input_opacity",
        borderless: "border_input_opacity px-0"
      },
      validation: {
        error: "border_error",
        success: "border_success"
      }
    },
    defaultVariants: {
      size: "m",
      variant: "light"
    }
  }
), Ys = (e) => e === !0 || e === "true", ma = n.forwardRef(
  ({
    className: e,
    variant: t = "light",
    size: r = "m",
    validation: s,
    type: i = "text",
    placeholder: o,
    leftIcon: l,
    rightIcon: d,
    unit: c,
    "aria-invalid": u,
    disabled: f,
    ..._
  }, b) => {
    const g = Ys(u) ? "error" : s, k = m(
      It({ variant: t, size: r, validation: g }),
      e
    );
    return !l && !d && !c ? /* @__PURE__ */ a(
      "input",
      {
        ref: b,
        "data-slot": "input",
        "data-variant": t,
        "data-size": r,
        type: i,
        placeholder: o,
        "aria-invalid": s === "error" ? !0 : u,
        disabled: f,
        className: k,
        ..._
      }
    ) : /* @__PURE__ */ y(
      "div",
      {
        "data-slot": "input",
        "data-variant": t,
        "data-size": r,
        "data-disabled": f || void 0,
        className: m(
          k,
          "flex items-center gap-2 focus-within:border-[var(--ds-border-accent-secondary-contrast)]",
          f && "pointer-events-none opacity-60"
        ),
        children: [
          l ? /* @__PURE__ */ a("span", { className: "inline-flex h-4 w-4 shrink-0 items-center justify-center icon_secondary", children: l }) : null,
          /* @__PURE__ */ a(
            "input",
            {
              ref: b,
              type: i,
              placeholder: o,
              "aria-invalid": s === "error" ? !0 : u,
              disabled: f,
              className: "min-w-0 flex-1 bg-transparent p-0 text_primary placeholder:text_tertiary outline-none",
              ..._
            }
          ),
          c ? /* @__PURE__ */ a("span", { className: "shrink-0 text_tertiary", children: c }) : null,
          d ? /* @__PURE__ */ a("span", { className: "inline-flex h-4 w-4 shrink-0 items-center justify-center icon_secondary", children: d }) : null
        ]
      }
    );
  }
);
ma.displayName = "Input";
const qs = (e, t) => [e, t].filter(Boolean).join(" ") || void 0, Xs = n.forwardRef(
  ({
    className: e,
    label: t,
    required: r = !1,
    supportingText: s,
    error: i,
    disabled: o = !1,
    htmlFor: l,
    children: d,
    ...c
  }, u) => {
    const f = n.useId(), _ = l ?? d.props.id ?? `${f}-control`, b = i || s ? `${f}-message` : void 0, g = qs(d.props["aria-describedby"], b), k = n.cloneElement(d, {
      id: _,
      disabled: o || d.props.disabled,
      required: r || d.props.required,
      "aria-describedby": g,
      "aria-invalid": i ? !0 : d.props["aria-invalid"]
    }), w = () => {
      document.getElementById(_)?.focus();
    };
    return /* @__PURE__ */ y(
      "div",
      {
        ref: u,
        "data-slot": "field",
        "data-disabled": o || void 0,
        "data-invalid": i ? !0 : void 0,
        className: m("flex w-full flex-col gap-1", e),
        ...c,
        children: [
          t ? /* @__PURE__ */ y("label", { htmlFor: _, onClick: w, className: "text-sm text_primary", children: [
            t,
            r ? /* @__PURE__ */ y("span", { "aria-hidden": "true", className: "fg_error", children: [
              " ",
              "*"
            ] }) : null
          ] }) : null,
          k,
          i || s ? /* @__PURE__ */ a(
            "p",
            {
              id: b,
              role: i ? "alert" : void 0,
              className: m("text-sm", i ? "fg_error" : "text_tertiary"),
              children: i ?? s
            }
          ) : null
        ]
      }
    );
  }
);
Xs.displayName = "Field";
const Zs = I(
  "relative inline-flex cursor-pointer items-center gap-2",
  {
    variants: {
      size: {
        s: "gap-1.5",
        m: "gap-2",
        l: "gap-2.5"
      }
    },
    defaultVariants: {
      size: "m"
    }
  }
), Qs = I(
  "relative flex shrink-0 items-center justify-center border border_input bg-transparent text-center font-mono tabular-nums text_tertiary transition-colors duration-0 select-none",
  {
    variants: {
      variant: {
        light: "bg_input_light",
        fill: "bg_input_fill",
        dim: "bg_input_fill_dim_default"
      },
      size: {
        s: "h-8 w-8 radius_4 text-sm",
        m: "h-10 w-10 radius_6 text-base",
        l: "h-12 w-12 radius_8 text-lg"
      }
    },
    defaultVariants: {
      variant: "light",
      size: "m"
    }
  }
), Js = 6, en = "-", tn = "•", Ot = (e, t, r) => (r ? e.replace(/\D+/g, "") : e).slice(0, t), rn = (e) => e === "s" ? "text-xs" : e === "l" ? "text-base" : "text-sm", an = n.forwardRef(
  ({
    className: e,
    length: t = Js,
    value: r,
    onChange: s,
    onComplete: i,
    numericOnly: o = !0,
    mask: l = !1,
    disabled: d = !1,
    placeholder: c = en,
    variant: u = "light",
    size: f = "m",
    separatorAfter: _,
    autoFocus: b = !1,
    onBlur: g,
    onFocus: k,
    "aria-invalid": w,
    "aria-label": N,
    "aria-labelledby": x,
    ...h
  }, v) => {
    const j = n.useRef(null), V = n.useRef(!1), [O, D] = n.useState(""), [T, C] = n.useState(!1), U = r !== void 0, K = Ot(
      U ? r ?? "" : O,
      t,
      o
    ), Y = K.length >= t ? t - 1 : K.length, se = _ ?? [], X = T && !d && K.length < t;
    n.useEffect(() => {
      if (V.current || typeof document > "u") return;
      V.current = !0;
      const H = document.createElement("style");
      return H.textContent = `
@keyframes pin-caret-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}`, document.head.appendChild(H), () => {
        document.head.removeChild(H), V.current = !1;
      };
    }, []), n.useEffect(() => {
      if (U) return;
      const H = Ot(O, t, o);
      H !== O && D(H);
    }, [O, U, t, o]);
    const R = n.useCallback(
      (H) => {
        j.current = H, typeof v == "function" ? v(H) : v && (v.current = H);
      },
      [v]
    ), $ = () => {
      d || j.current?.focus();
    }, Q = (H) => {
      H !== K && (U || D(H), s?.(H), H.length === t && i?.(H));
    }, S = (H) => {
      const A = Ot(H.target.value, t, o);
      Q(A);
    }, ie = (H) => {
      C(!0), k?.(H);
    }, B = (H) => {
      C(!1), g?.(H);
    };
    return /* @__PURE__ */ y(
      "div",
      {
        "data-slot": "input-pin-code",
        "data-variant": u,
        "data-size": f,
        "data-disabled": d ? "true" : void 0,
        "data-invalid": w ? "true" : void 0,
        className: m(Zs({ size: f }), e),
        onClick: $,
        children: [
          /* @__PURE__ */ a(
            "input",
            {
              ...h,
              ref: R,
              "data-slot": "input-pin-code-input",
              type: "text",
              value: K,
              disabled: d,
              autoFocus: b,
              maxLength: t,
              autoComplete: "one-time-code",
              inputMode: o ? "numeric" : void 0,
              pattern: o ? "[0-9]*" : void 0,
              "aria-invalid": w,
              "aria-label": N ?? (x ? void 0 : "Pin code input"),
              "aria-labelledby": x,
              spellCheck: !1,
              className: "pointer-events-none absolute inset-0 h-full w-full opacity-0 outline-none",
              onChange: S,
              onFocus: ie,
              onBlur: B
            }
          ),
          Array.from({ length: t }, (H, A) => {
            const P = K[A], q = P !== void 0, G = T && Y === A, J = A < t - 1 && se.includes(A + 1), W = q ? l ? tn : P : c, de = !!W && !(X && G && !q);
            return /* @__PURE__ */ y(n.Fragment, { children: [
              /* @__PURE__ */ y(
                "div",
                {
                  "data-slot": "input-pin-code-slot",
                  "data-active": G ? "true" : void 0,
                  "data-filled": q ? "true" : void 0,
                  "data-disabled": d ? "true" : void 0,
                  "data-invalid": w ? "true" : void 0,
                  className: m(
                    Qs({ variant: u, size: f }),
                    q ? "text_primary font-medium" : "text_tertiary",
                    d && "pointer-events-none opacity-60",
                    w && "border_error",
                    G && !w && "border-[var(--ds-bg-accent-secondary)] shadow-[var(--ds-outline-blue-focus)]"
                  ),
                  children: [
                    de ? /* @__PURE__ */ a("span", { "aria-hidden": "true", children: W }) : null,
                    X && G && !q ? /* @__PURE__ */ a(
                      "span",
                      {
                        "aria-hidden": "true",
                        className: "absolute top-1/2 h-5 w-px -translate-y-1/2 bg-[var(--ds-bg-accent-secondary)] animate-[pin-caret-blink_1s_infinite]"
                      }
                    ) : null
                  ]
                }
              ),
              J ? /* @__PURE__ */ a(
                "span",
                {
                  "aria-hidden": "true",
                  className: m("select-none text_tertiary", rn(f)),
                  children: "-"
                }
              ) : null
            ] }, A);
          })
        ]
      }
    );
  }
);
an.displayName = "InputPinCode";
const sn = I(
  "w-full radius_6 border text-sm text_primary placeholder:text_tertiary bg-transparent transition-colors duration-0 outline-none focus-visible:shadow-[var(--ds-outline-blue-focus)] disabled:pointer-events-none disabled:opacity-60 resize-none",
  {
    variants: {
      variant: {
        light: "bg_input_light border_input",
        fill: "bg_input_fill border_input_opacity",
        dim: "bg_input_fill_dim_default border_input_opacity",
        borderless: "border_input_opacity"
      },
      size: {
        xl: "py-3 px-4 text-base",
        l: "py-2.5 px-3.5",
        m: "py-2 px-3",
        s: "py-1.5 px-2.5 text-xs",
        xs: "py-1 px-2 text-xs"
      }
    },
    defaultVariants: {
      variant: "light",
      size: "m"
    }
  }
), nn = n.forwardRef(
  ({
    className: e,
    variant: t = "light",
    size: r = "m",
    autosize: s = !1,
    minRows: i = 3,
    maxRows: o,
    defaultValue: l,
    value: d,
    onChange: c,
    ...u
  }, f) => {
    const _ = n.useRef(null), b = n.useCallback(
      (w) => {
        _.current = w, typeof f == "function" ? f(w) : f && (f.current = w);
      },
      [f]
    ), g = n.useCallback(() => {
      const w = _.current;
      if (!w || !s) return;
      w.style.height = "auto";
      let N = w.scrollHeight;
      if (o) {
        const x = getComputedStyle(w), h = parseFloat(x.lineHeight) || 20, v = parseFloat(x.paddingTop) || 0, j = parseFloat(x.paddingBottom) || 0, V = h * o + v + j;
        N = Math.min(N, V);
      }
      w.style.height = `${N}px`;
    }, [s, o]);
    n.useLayoutEffect(() => {
      g();
    }, [g, l, d]);
    const k = n.useCallback(
      (w) => {
        g(), c?.(w);
      },
      [g, c]
    );
    return /* @__PURE__ */ a(
      "textarea",
      {
        ref: b,
        "data-slot": "textarea",
        rows: i,
        className: m(sn({ variant: t, size: r }), e),
        defaultValue: l,
        value: d,
        onChange: k,
        ...u
      }
    );
  }
);
nn.displayName = "Textarea";
const on = I(
  "inline-flex items-center justify-center gap-1 font-medium border transition-colors duration-0",
  {
    variants: {
      variant: {
        default: "bg_button_tertiary text_secondary border_secondary",
        primary: "bg_accent_primary fg_on_accent_primary border-transparent",
        success: "bg_success fg_success border-transparent",
        warning: "bg_warning fg_warning border-transparent",
        error: "bg_error fg_error border-transparent",
        info: "bg_info fg_info border-transparent",
        outline: "bg-transparent text_primary border_primary"
      },
      size: {
        xs: "h-[18px] px-1.5 text-[10px]",
        s: "h-5 px-[7px] text-xs",
        m: "h-6 px-2 text-xs",
        l: "h-7 px-3 text-sm",
        xl: "h-8 px-3.5 text-sm"
      },
      color: {
        light: "bg_primary fg_gray_strong",
        white: "bg_primary fg_gray_strong",
        gray: "bg_gray_subtle fg_gray_strong",
        orange: "bg_orange_subtle fg_orange_strong",
        amber: "bg_amber_subtle fg_amber_strong",
        yellow: "bg_yellow_subtle fg_yellow_strong",
        lime: "bg_lime_subtle fg_lime_strong",
        green: "bg_green_subtle fg_green_strong",
        emerald: "bg_emerald_subtle fg_emerald_strong",
        teal: "bg_teal_subtle fg_teal_strong",
        cyan: "bg_cyan_subtle fg_cyan_strong",
        sky: "bg_sky_subtle fg_sky_strong",
        blue: "bg_blue_subtle fg_blue_strong",
        indigo: "bg_indigo_subtle fg_indigo_strong",
        violet: "bg_violet_subtle fg_violet_strong",
        purple: "bg_purple_subtle fg_purple_strong",
        fuchsia: "bg_fuchsia_subtle fg_fuchsia_strong",
        pink: "bg_pink_subtle fg_pink_strong",
        red: "bg_red_subtle fg_red_strong"
      },
      bordered: {
        true: "",
        false: "border-transparent"
      },
      rounded: {
        true: "radius_round",
        false: ""
      }
    },
    compoundVariants: [
      { rounded: !1, size: "xs", class: "radius_4" },
      { rounded: !1, size: "s", class: "radius_4" },
      { rounded: !1, size: "m", class: "radius_4" },
      { rounded: !1, size: "l", class: "radius_4" },
      { rounded: !1, size: "xl", class: "radius_4" },
      { color: "light", bordered: !0, class: "border_gray" },
      { color: "white", bordered: !0, class: "border_gray" },
      { color: "gray", bordered: !0, class: "border_gray" },
      { color: "orange", bordered: !0, class: "border_orange" },
      { color: "amber", bordered: !0, class: "border_amber" },
      { color: "yellow", bordered: !0, class: "border_yellow" },
      { color: "lime", bordered: !0, class: "border_lime" },
      { color: "green", bordered: !0, class: "border_green" },
      { color: "emerald", bordered: !0, class: "border_emerald" },
      { color: "teal", bordered: !0, class: "border_teal" },
      { color: "cyan", bordered: !0, class: "border_cyan" },
      { color: "sky", bordered: !0, class: "border_sky" },
      { color: "blue", bordered: !0, class: "border_blue" },
      { color: "indigo", bordered: !0, class: "border_indigo" },
      { color: "violet", bordered: !0, class: "border_violet" },
      { color: "purple", bordered: !0, class: "border_purple" },
      { color: "fuchsia", bordered: !0, class: "border_fuchsia" },
      { color: "pink", bordered: !0, class: "border_pink" },
      { color: "red", bordered: !0, class: "border_red" }
    ],
    defaultVariants: { variant: "default", size: "m", bordered: !0, rounded: !0 }
  }
), ln = (e) => {
  if (e)
    return e === "sm" ? "s" : e === "md" ? "m" : e === "lg" ? "l" : e;
}, cn = (e) => {
  if (e)
    return e === "white" ? "light" : e;
}, dn = n.forwardRef(
  ({
    className: e,
    variant: t,
    size: r,
    color: s,
    bordered: i,
    rounded: o,
    dot: l,
    iconLeft: d,
    iconRight: c,
    children: u,
    ...f
  }, _) => {
    const b = ln(r), g = cn(s), k = "inline-flex h-3 w-3 shrink-0 items-center justify-center text-current [&_svg:not([class*='size-'])]:h-3 [&_svg:not([class*='size-'])]:w-3";
    return n.useEffect(() => {
    }, [s]), /* @__PURE__ */ y(
      "span",
      {
        ref: _,
        "data-slot": "badge",
        "data-variant": t,
        "data-size": b,
        className: m(
          on({ variant: t, size: b, color: g, bordered: i, rounded: o }),
          e
        ),
        ...f,
        children: [
          l && /* @__PURE__ */ a("span", { className: "h-1.5 w-1.5 radius_round bg-current flex-shrink-0", "aria-hidden": !0 }),
          d ? /* @__PURE__ */ a("span", { className: k, children: d }) : null,
          u,
          c ? /* @__PURE__ */ a("span", { className: k, children: c }) : null
        ]
      }
    );
  }
);
dn.displayName = "Badge";
const un = I(
  "inline-flex items-center justify-center radius_round fg_on_contrast font-semibold leading-none",
  {
    variants: {
      size: {
        l: "h-6 min-w-6 px-1.5 text-sm",
        m: "h-4 min-w-4 px-1 text-[10px]",
        s: "h-2 w-2 min-w-0 p-0 text-[0px]"
      },
      color: {
        red: "bg_red_contrast",
        gray: "bg_gray_medium",
        orange: "bg_orange_contrast",
        amber: "bg_amber_contrast",
        yellow: "bg_yellow_contrast",
        lime: "bg_lime_contrast",
        green: "bg_green_contrast",
        emerald: "bg_emerald_contrast",
        teal: "bg_teal_contrast",
        cyan: "bg_cyan_contrast",
        sky: "bg_sky_contrast",
        blue: "bg_blue_contrast",
        indigo: "bg_indigo_contrast",
        violet: "bg_violet_contrast",
        purple: "bg_purple_contrast",
        fuchsia: "bg_fuchsia_contrast",
        pink: "bg_pink_contrast"
      }
    },
    defaultVariants: {
      size: "l",
      color: "red"
    }
  }
), fn = (e, t, r) => {
  if (e !== void 0)
    return e > t ? r ?? `${t}+` : e;
}, mn = n.forwardRef(
  ({
    className: e,
    size: t = "l",
    color: r = "red",
    count: s,
    max: i = 99,
    overflowLabel: o,
    children: l,
    ...d
  }, c) => {
    const u = t === "s" ? null : l ?? fn(s, i, o);
    return /* @__PURE__ */ a(
      "span",
      {
        ref: c,
        "data-slot": "noti-badge",
        "data-size": t,
        "data-color": r,
        className: m(un({ size: t, color: r }), e),
        ...d,
        children: u
      }
    );
  }
);
mn.displayName = "NotiBadge";
const pn = I(
  "z-50 min-w-[8rem] overflow-hidden border border_secondary bg_primary p-1 radius_8 shadow_l"
), Xt = I(
  "relative flex w-full cursor-pointer select-none items-center gap-2 px-2 py-1.5 text-sm text_primary radius_6 outline-none transition-colors duration-0 hover:state_bg_button_tertiary_soft active:state_bg_button_tertiary_soft focus:state_bg_button_tertiary_soft data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
), gn = I("-mx-1 my-1 h-px bg_tertiary"), hn = I("px-2 py-1.5 text-xs font-medium text_secondary"), bn = I("ml-auto text-xs text_tertiary tracking-widest"), _n = I(
  "flex w-full cursor-pointer select-none items-center gap-2 px-2 py-1.5 text-sm text_primary radius_6 outline-none transition-colors duration-0 hover:state_bg_button_tertiary_soft focus:state_bg_button_tertiary_soft data-[state=open]:state_bg_button_tertiary_soft"
), yn = I(
  "z-50 min-w-[8rem] overflow-hidden border border_secondary bg_primary p-1 radius_8 shadow_l"
), Zt = ({
  children: e,
  ...t
}) => /* @__PURE__ */ a(_e.Root, { "data-slot": "dropdown-menu", ...t, children: e }), Qt = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  _e.Trigger,
  {
    ref: r,
    "data-slot": "dropdown-menu-trigger",
    className: e,
    ...t
  }
)), Jt = n.forwardRef(({ className: e, side: t = "bottom", align: r = "start", sideOffset: s = 8, ...i }, o) => /* @__PURE__ */ a(_e.Portal, { children: /* @__PURE__ */ a(
  _e.Content,
  {
    ref: o,
    side: t,
    align: r,
    sideOffset: s,
    "data-slot": "dropdown-menu-content",
    className: m(pn(), e),
    ...i
  }
) })), xn = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  _e.Item,
  {
    ref: r,
    "data-slot": "dropdown-menu-item",
    className: m(Xt(), e),
    ...t
  }
)), vn = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  _e.Separator,
  {
    ref: r,
    "data-slot": "dropdown-menu-separator",
    className: m(gn(), e),
    ...t
  }
)), wn = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  _e.Label,
  {
    ref: r,
    "data-slot": "dropdown-menu-label",
    className: m(hn(), e),
    ...t
  }
)), kn = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "span",
  {
    ref: r,
    "data-slot": "dropdown-menu-shortcut",
    className: m(bn(), e),
    ...t
  }
)), Nn = n.forwardRef(({ ...e }, t) => /* @__PURE__ */ a(_e.Group, { ref: t, "data-slot": "dropdown-menu-group", ...e })), Cn = ({
  children: e,
  ...t
}) => /* @__PURE__ */ a(_e.Sub, { "data-slot": "dropdown-menu-sub", ...t, children: e }), Sn = () => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: "ml-auto h-4 w-4 text-current",
    children: /* @__PURE__ */ a(
      "path",
      {
        d: "M6 4L10 8L6 12",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), zn = () => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: "h-4 w-4",
    children: /* @__PURE__ */ a(
      "path",
      {
        d: "M12.5 4.5L6.5 10.5L3.5 7.5",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), Rn = () => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: "h-2.5 w-2.5",
    children: /* @__PURE__ */ a("circle", { cx: "8", cy: "8", r: "5", fill: "currentColor" })
  }
), Mn = n.forwardRef(({ className: e, children: t, ...r }, s) => /* @__PURE__ */ y(
  _e.SubTrigger,
  {
    ref: s,
    "data-slot": "dropdown-menu-sub-trigger",
    className: m(_n(), e),
    ...r,
    children: [
      t,
      /* @__PURE__ */ a(Sn, {})
    ]
  }
)), Dn = n.forwardRef(({ className: e, sideOffset: t = 8, ...r }, s) => /* @__PURE__ */ a(_e.Portal, { children: /* @__PURE__ */ a(
  _e.SubContent,
  {
    ref: s,
    sideOffset: t,
    "data-slot": "dropdown-menu-sub-content",
    className: m(yn(), e),
    ...r
  }
) })), In = n.forwardRef(({ className: e, children: t, ...r }, s) => /* @__PURE__ */ y(
  _e.CheckboxItem,
  {
    ref: s,
    "data-slot": "dropdown-menu-checkbox-item",
    className: m(Xt(), e),
    ...r,
    children: [
      /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "flex h-4 w-4 items-center justify-center text-current", children: /* @__PURE__ */ a(_e.ItemIndicator, { children: /* @__PURE__ */ a(zn, {}) }) }),
      t
    ]
  }
)), Vn = ({
  children: e,
  ...t
}) => /* @__PURE__ */ a(_e.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t, children: e }), Tn = n.forwardRef(({ className: e, children: t, ...r }, s) => /* @__PURE__ */ y(
  _e.RadioItem,
  {
    ref: s,
    "data-slot": "dropdown-menu-radio-item",
    className: m(Xt(), e),
    ...r,
    children: [
      /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "flex h-4 w-4 items-center justify-center text-current", children: /* @__PURE__ */ a(_e.ItemIndicator, { children: /* @__PURE__ */ a(Rn, {}) }) }),
      t
    ]
  }
));
Zt.displayName = "DropdownMenu";
Qt.displayName = "DropdownMenuTrigger";
Jt.displayName = "DropdownMenuContent";
xn.displayName = "DropdownMenuItem";
vn.displayName = "DropdownMenuSeparator";
wn.displayName = "DropdownMenuLabel";
kn.displayName = "DropdownMenuShortcut";
Nn.displayName = "DropdownMenuGroup";
Cn.displayName = "DropdownMenuSub";
Mn.displayName = "DropdownMenuSubTrigger";
Dn.displayName = "DropdownMenuSubContent";
In.displayName = "DropdownMenuCheckboxItem";
Vn.displayName = "DropdownMenuRadioGroup";
Tn.displayName = "DropdownMenuRadioItem";
const Ln = {
  primary1: "primary",
  primary2: "primary2",
  secondary1: "secondary",
  secondary2: "secondary2",
  outline: "border",
  border: "border"
}, En = {
  outline: "border_accent_secondary fg_accent_secondary hover:state_bg_accent_secondary_subtle_subtle active:state_bg_accent_secondary_subtle_soft"
}, An = n.forwardRef(
  ({
    label: e,
    children: t,
    variant: r = "primary1",
    size: s = "m",
    disabled: i,
    className: o,
    contentClassName: l,
    side: d,
    align: c,
    sideOffset: u,
    open: f,
    onOpenChange: _,
    ...b
  }, g) => {
    const [k, w] = n.useState(!1), N = f ?? k, x = n.useCallback(
      (h) => {
        w(h), _?.(h);
      },
      [_]
    );
    return /* @__PURE__ */ y(Zt, { open: N, onOpenChange: x, ...b, children: [
      /* @__PURE__ */ a(Qt, { asChild: !0, disabled: i, children: /* @__PURE__ */ y(
        Me,
        {
          ref: g,
          variant: Ln[r],
          size: s,
          disabled: i,
          "data-dropdown-button-variant": r,
          className: m(En[r], o),
          children: [
            e,
            /* @__PURE__ */ a(
              Zr,
              {
                "aria-hidden": "true",
                className: m("h-4 w-4 shrink-0 transition-transform duration-0", N && "rotate-180")
              }
            )
          ]
        }
      ) }),
      /* @__PURE__ */ a(
        Jt,
        {
          side: d,
          align: c,
          sideOffset: u,
          className: l,
          children: t
        }
      )
    ] });
  }
);
An.displayName = "DropdownButton";
const pa = I(
  "inline-flex shrink-0 cursor-pointer items-center justify-center border p-0 text_primary transition-colors duration-0 outline-none focus-visible:shadow-[var(--ds-outline-blue-focus)] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        dim: "bg_interactive_secondary border_dim_button hover:state_bg_interactive_secondary_subtle active:state_bg_interactive_secondary_soft",
        border: "bg-transparent border_secondary hover:state_neutral_subtle active:state_neutral_soft",
        borderless: "bg-transparent border-transparent hover:state_neutral_subtle active:state_neutral_soft",
        borderlessSubtle: "bg-transparent border-transparent text_tertiary hover:state_neutral_subtle active:state_neutral_soft"
      },
      size: {
        xs: "h-[var(--ds-size-xs-size-button)] w-[var(--ds-size-xs-size-button)] rounded-[var(--ds-size-xs-size-button-border-radius)]",
        s: "h-[var(--ds-size-s-size-button)] w-[var(--ds-size-s-size-button)] rounded-[var(--ds-size-s-size-button-border-radius)]",
        m: "h-[var(--ds-size-m-size-button)] w-[var(--ds-size-m-size-button)] rounded-[var(--ds-size-m-size-button-border-radius)]",
        l: "h-[var(--ds-size-l-size-button)] w-[var(--ds-size-l-size-button)] rounded-[var(--ds-size-l-size-button-border-radius)]",
        xl: "h-[var(--ds-size-xl-size-button)] w-[var(--ds-size-xl-size-button)] rounded-[var(--ds-size-xl-size-button-border-radius)]"
      },
      active: {
        true: "state_neutral_soft",
        false: ""
      }
    },
    defaultVariants: {
      variant: "dim",
      size: "m",
      active: !1
    }
  }
), Pn = n.forwardRef(
  ({
    className: e,
    variant: t = "dim",
    size: r = "m",
    pressed: s,
    defaultPressed: i = !1,
    onPressedChange: o,
    disabled: l,
    type: d,
    onClick: c,
    ...u
  }, f) => {
    const [_, b] = n.useState(i), g = s ?? _, k = (w) => {
      if (c?.(w), w.defaultPrevented || l) return;
      const N = !g;
      s === void 0 && b(N), o?.(N);
    };
    return /* @__PURE__ */ a(
      "button",
      {
        ref: f,
        type: d ?? "button",
        "data-slot": "icon-toggle",
        "data-variant": t,
        "data-size": r,
        "data-pressed": g || void 0,
        "aria-pressed": g,
        disabled: l,
        className: m(
          pa({ variant: t, size: r, active: g }),
          l && t === "dim" && "bg_button_tertiary",
          e
        ),
        onClick: k,
        ...u
      }
    );
  }
);
Pn.displayName = "IconToggle";
const jn = n.forwardRef(
  ({
    icon: e,
    children: t,
    variant: r = "dim",
    size: s = "m",
    active: i,
    disabled: o,
    className: l,
    contentClassName: d,
    side: c,
    align: u,
    sideOffset: f,
    open: _,
    onOpenChange: b,
    "aria-label": g,
    ...k
  }, w) => {
    const [N, x] = n.useState(!1), h = _ ?? N, v = i ?? h, j = n.useCallback(
      (V) => {
        x(V), b?.(V);
      },
      [b]
    );
    return /* @__PURE__ */ y(Zt, { open: h, onOpenChange: j, ...k, children: [
      /* @__PURE__ */ a(Qt, { asChild: !0, disabled: o, children: /* @__PURE__ */ a(
        "button",
        {
          ref: w,
          type: "button",
          "data-slot": "icon-dropdown",
          "data-variant": r,
          "data-size": s,
          "data-active": v || void 0,
          disabled: o,
          "aria-label": g,
          className: m(
            pa({ variant: r, size: s, active: v }),
            o && r === "dim" && "bg_button_tertiary",
            l
          ),
          children: e
        }
      ) }),
      /* @__PURE__ */ a(
        Jt,
        {
          side: c,
          align: u,
          sideOffset: f,
          className: d,
          children: t
        }
      )
    ] });
  }
);
jn.displayName = "IconDropdown";
const Fn = "22px", On = 68, $n = n.forwardRef(
  ({
    className: e,
    value: t,
    defaultValue: r = "",
    onValueChange: s,
    onSubmit: i,
    actionIcons: o,
    avatar: l,
    placeholder: d = "Write a comment...",
    disabled: c,
    onFocus: u,
    onBlur: f,
    onKeyDown: _,
    ...b
  }, g) => {
    const k = n.useRef(null), [w, N] = n.useState(!1), [x, h] = n.useState(r), v = t ?? x, j = w || v.length > 0, V = v.length > 0 ? "typed" : w ? "focus" : "default", O = n.useCallback(
      (C) => {
        k.current = C, typeof g == "function" ? g(C) : g && (g.current = C);
      },
      [g]
    );
    n.useLayoutEffect(() => {
      const C = k.current;
      if (C) {
        if (!j) {
          C.style.height = Fn;
          return;
        }
        C.style.height = "auto", C.style.height = `${Math.min(C.scrollHeight, On)}px`;
      }
    }, [v, j]);
    const D = (C) => {
      const U = C.target.value;
      t === void 0 && h(U), s?.(U);
    }, T = (C) => {
      _?.(C), !C.defaultPrevented && C.key === "Enter" && (C.metaKey || C.ctrlKey) && (C.preventDefault(), i?.(v, C));
    };
    return /* @__PURE__ */ y(
      "div",
      {
        "data-slot": "comment-input-root",
        "data-state": V,
        "data-expanded": j || void 0,
        "data-disabled": c || void 0,
        className: m("flex w-full items-start gap-2", c && "opacity-60"),
        children: [
          l ? /* @__PURE__ */ a("span", { "data-slot": "comment-input-avatar", className: "shrink-0", children: l }) : null,
          /* @__PURE__ */ y(
            "div",
            {
              "data-slot": "comment-input",
              className: m(
                "flex w-full items-start gap-2 overflow-hidden border bg_input_fill border_input_opacity radius_6 px-4 py-2 transition-[height] duration-0",
                j ? "h-[94px] py-3" : "h-10",
                c && "pointer-events-none",
                e
              ),
              children: [
                /* @__PURE__ */ a(
                  "textarea",
                  {
                    ref: O,
                    value: v,
                    placeholder: d,
                    disabled: c,
                    rows: 1,
                    "data-slot": "comment-input-textarea",
                    className: "min-w-0 flex-1 resize-none bg-transparent p-0 text-sm leading-[22px] text_primary placeholder:text_tertiary outline-none disabled:pointer-events-none",
                    onChange: D,
                    onFocus: (C) => {
                      N(!0), u?.(C);
                    },
                    onBlur: (C) => {
                      N(!1), f?.(C);
                    },
                    onKeyDown: T,
                    ...b
                  }
                ),
                o ? /* @__PURE__ */ a(
                  "span",
                  {
                    "data-slot": "comment-input-actions",
                    className: "flex shrink-0 items-center gap-1 [&_[data-slot=button]]:h-[var(--ds-size-s-size-button)] [&_[data-slot=button]]:w-[var(--ds-size-s-size-button)] [&_svg]:size-4",
                    children: o
                  }
                ) : null
              ]
            }
          )
        ]
      }
    );
  }
);
$n.displayName = "CommentInput";
const ga = n.forwardRef(
  ({ className: e, side: t = "bottom", align: r = "start", sideOffset: s = 8, portal: i = !0, ...o }, l) => {
    const d = /* @__PURE__ */ a(
      he.Content,
      {
        ref: l,
        side: t,
        align: r,
        sideOffset: s,
        "data-slot": "popover-content",
        className: m("z-50 border border_secondary bg_primary p-2 radius_8 shadow_l", e),
        ...o
      }
    );
    return i ? /* @__PURE__ */ a(he.Portal, { children: d }) : d;
  }
), er = ({
  trigger: e,
  children: t,
  open: r,
  onOpenChange: s,
  side: i = "bottom",
  align: o = "start",
  sideOffset: l = 8,
  portal: d = !0,
  className: c
}) => /* @__PURE__ */ y(he.Root, { "data-slot": "popover", open: r, onOpenChange: s, children: [
  /* @__PURE__ */ a(he.Trigger, { asChild: !0, children: e }),
  /* @__PURE__ */ a(
    ga,
    {
      side: i,
      align: o,
      sideOffset: l,
      portal: d,
      className: c,
      children: t
    }
  )
] });
er.displayName = "Popover";
ga.displayName = "PopoverContent";
const Bn = he.Trigger;
Bn.displayName = "PopoverTrigger";
const Hn = he.Close;
Hn.displayName = "PopoverClose";
const ha = I(
  "inline-flex items-center border select-none",
  {
    variants: {
      variant: {
        tag: "cursor-default bg_button_tertiary border_secondary font-medium text-sm text_secondary",
        selector: "cursor-pointer transition-colors duration-0 bg_interactive_secondary border_secondary font-normal text-xs text_secondary hover:state_bg_interactive_secondary_subtle active:state_bg_interactive_secondary_soft",
        check: "cursor-pointer transition-colors duration-0 bg_interactive_secondary border_secondary font-normal text-xs text_secondary hover:state_bg_interactive_secondary_subtle active:state_bg_interactive_secondary_soft"
      },
      size: {
        xs: "h_chip_xs px_chip_xs gap-1",
        s: "h_chip_s px_chip_s gap-1",
        m: "h_chip_m px_chip_m gap-1.5",
        l: "h_chip_l px_chip_l gap-1.5",
        xl: "h_chip_xl px_chip_xl gap-2"
      },
      chipType: {
        borderFill: "",
        borderLight: "",
        borderless: ""
      },
      color: {
        transparent: "bg-transparent",
        white: "bg_primary fg_gray_strong",
        gray: "bg_gray_subtle fg_gray_strong",
        orange: "bg_orange_subtle fg_orange_strong",
        amber: "bg_amber_subtle fg_amber_strong",
        yellow: "bg_yellow_subtle fg_yellow_strong",
        lime: "bg_lime_subtle fg_lime_strong",
        green: "bg_green_subtle fg_green_strong",
        emerald: "bg_emerald_subtle fg_emerald_strong",
        teal: "bg_teal_subtle fg_teal_strong",
        cyan: "bg_cyan_subtle fg_cyan_strong",
        sky: "bg_sky_subtle fg_sky_strong",
        blue: "bg_blue_subtle fg_blue_strong",
        indigo: "bg_indigo_subtle fg_indigo_strong",
        violet: "bg_violet_subtle fg_violet_strong",
        purple: "bg_purple_subtle fg_purple_strong",
        fuchsia: "bg_fuchsia_subtle fg_fuchsia_strong",
        pink: "bg_pink_subtle fg_pink_strong",
        red: "bg_red_subtle fg_red_strong"
      },
      bordered: {
        true: "",
        false: "border-transparent"
      },
      pill: {
        true: "radius_round",
        false: "radius_4"
      },
      selected: {
        true: "",
        false: ""
      }
    },
    compoundVariants: [
      {
        variant: ["check", "selector"],
        selected: !1,
        chipType: "borderLight",
        class: "bg_interactive_primary border_secondary text_secondary hover:state_bg_interactive_primary_subtle active:state_bg_interactive_primary_soft"
      },
      {
        variant: ["check", "selector"],
        selected: !1,
        chipType: "borderless",
        class: "bg_interactive_primary border-transparent text_secondary hover:state_bg_interactive_primary_subtle active:state_bg_interactive_primary_soft"
      },
      {
        variant: "check",
        selected: !0,
        class: "bg_accent_secondary_subtle border_accent_secondary_contrast fg_accent_secondary hover:state_bg_accent_secondary_subtle_soft"
      },
      {
        variant: "selector",
        selected: !0,
        class: "bg_accent_secondary_subtle border_accent_secondary_contrast fg_accent_secondary hover:state_bg_accent_secondary_subtle_soft"
      },
      { variant: "tag", color: "white", bordered: !0, class: "border_secondary" },
      { variant: "tag", color: "gray", bordered: !0, class: "border_gray" },
      { variant: "tag", color: "orange", bordered: !0, class: "border_orange" },
      { variant: "tag", color: "amber", bordered: !0, class: "border_amber" },
      { variant: "tag", color: "yellow", bordered: !0, class: "border_yellow" },
      { variant: "tag", color: "lime", bordered: !0, class: "border_lime" },
      { variant: "tag", color: "green", bordered: !0, class: "border_green" },
      { variant: "tag", color: "emerald", bordered: !0, class: "border_emerald" },
      { variant: "tag", color: "teal", bordered: !0, class: "border_teal" },
      { variant: "tag", color: "cyan", bordered: !0, class: "border_cyan" },
      { variant: "tag", color: "sky", bordered: !0, class: "border_sky" },
      { variant: "tag", color: "blue", bordered: !0, class: "border_blue" },
      { variant: "tag", color: "indigo", bordered: !0, class: "border_indigo" },
      { variant: "tag", color: "violet", bordered: !0, class: "border_violet" },
      { variant: "tag", color: "purple", bordered: !0, class: "border_purple" },
      { variant: "tag", color: "fuchsia", bordered: !0, class: "border_fuchsia" },
      { variant: "tag", color: "pink", bordered: !0, class: "border_pink" },
      { variant: "tag", color: "red", bordered: !0, class: "border_red" }
    ],
    defaultVariants: {
      variant: "tag",
      size: "m",
      chipType: "borderFill",
      bordered: !0,
      pill: !1,
      selected: !1
    }
  }
), St = "size-5 flex-shrink-0", $t = "size-3.5 flex-shrink-0", At = "size-5 flex-shrink-0", ba = "size-3", tr = {
  xs: "h_chip_xs px_chip_xs gap-1",
  s: "h_chip_s px_chip_s gap-1",
  m: "h_chip_m px_chip_m gap-1.5",
  l: "h_chip_l px_chip_l gap-1.5",
  xl: "h_chip_xl px_chip_xl gap-2"
}, Gn = {
  xs: "w_chip_xs",
  s: "w_chip_s",
  m: "w_chip_m",
  l: "w_chip_l",
  xl: "w_chip_xl"
}, Ye = {
  xs: {
    left: "pl_chip_icon_xs",
    right: "pr_chip_icon_xs"
  },
  s: {
    left: "pl_chip_icon_s",
    right: "pr_chip_icon_s"
  },
  m: {
    left: "pl_chip_icon_m",
    right: "pr_chip_icon_m"
  },
  l: {
    left: "pl_chip_icon_l",
    right: "pr_chip_icon_l"
  },
  xl: {
    left: "pl_chip_icon_xl",
    right: "pr_chip_icon_xl"
  }
}, Gt = (e, t) => e ?? (t === !1 ? "borderless" : "borderFill"), Wn = {
  xs: "xxs",
  s: "xxs",
  m: "xs",
  l: "xs",
  xl: "s"
}, yr = (e, t, r) => {
  if (e.length === 0) return -1;
  for (let s = 1; s <= e.length; s += 1) {
    const i = (t + s * r + e.length) % e.length;
    if (!e[i]?.disabled) return i;
  }
  return -1;
}, xr = (e) => e.findIndex((t) => !t.disabled), Un = (e) => {
  for (let t = e.length - 1; t >= 0; t -= 1)
    if (!e[t]?.disabled) return t;
  return -1;
}, Kn = n.forwardRef(
  ({
    className: e,
    variant: t = "tag",
    size: r = "m",
    color: s,
    chipType: i,
    bordered: o,
    pill: l = !1,
    selected: d = !1,
    options: c,
    value: u,
    onValueChange: f,
    searchable: _ = !1,
    clearable: b = !1,
    labelMode: g = "replace",
    placeholder: k = "Select...",
    icon: w,
    onRemove: N,
    children: x,
    ...h
  }, v) => {
    const [j, V] = n.useState(!1), [O, D] = n.useState(""), [T, C] = n.useState(!1), U = t === "selector" ? !!u : d, K = b && t === "selector" && !!u && T, Y = n.useMemo(
      () => c?.find((B) => B.value === u)?.label,
      [c, u]
    ), se = n.useMemo(() => {
      if (!c) return [];
      if (!_ || !O) return c;
      const B = O.toLowerCase();
      return c.filter((H) => H.label.toLowerCase().includes(B));
    }, [c, _, O]);
    let X = w;
    t === "check" && d && (X = /* @__PURE__ */ a(ir, { className: St, "aria-hidden": !0 }));
    const R = Gt(i, o), $ = !!X, Q = t === "selector" || !!N, S = m(
      ha({
        variant: t,
        size: r,
        color: s,
        chipType: R,
        bordered: o,
        pill: t === "check" || t === "selector" ? !0 : l,
        selected: U
      }),
      $ && Ye[r].left,
      Q && Ye[r].right,
      e
    ), ie = /* @__PURE__ */ y(Ce, { children: [
      X && /* @__PURE__ */ a("span", { className: m(St, "flex items-center justify-center [&>svg]:size-5"), "aria-hidden": !0, children: X }),
      /* @__PURE__ */ a("span", { children: t === "selector" ? Y ? g === "append" ? `${k}: ${Y}` : Y : k : x }),
      t === "selector" && (K ? /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onPointerDown: (B) => {
            f?.(""), B.preventDefault(), B.stopPropagation();
          },
          onKeyDown: (B) => {
            B.key !== "Enter" && B.key !== " " || (f?.(""), B.preventDefault(), B.stopPropagation());
          },
          onClick: (B) => {
            B.preventDefault(), B.stopPropagation();
          },
          className: m(St, "flex items-center justify-center cursor-pointer"),
          "aria-label": "Clear",
          children: /* @__PURE__ */ a(bt, { className: $t, "aria-hidden": !0 })
        }
      ) : /* @__PURE__ */ a("span", { className: m(St, "flex items-center justify-center"), "aria-hidden": !0, children: /* @__PURE__ */ a(Zr, { className: $t, "aria-hidden": !0 }) })),
      N && /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          onClick: (B) => {
            B.stopPropagation(), N();
          },
          className: "size-5 flex-shrink-0 flex items-center justify-center rounded-full opacity-60 hover:opacity-100 cursor-pointer",
          "aria-label": "Remove",
          children: /* @__PURE__ */ a(bt, { className: $t, "aria-hidden": !0 })
        }
      )
    ] });
    return t === "selector" ? /* @__PURE__ */ a(
      er,
      {
        trigger: /* @__PURE__ */ a(
          "span",
          {
            ref: v,
            "data-slot": "chip",
            "data-variant": t,
            "data-size": r,
            "data-selected": U || void 0,
            "data-chip-type": R,
            className: S,
            onMouseEnter: () => C(!0),
            onMouseLeave: () => C(!1),
            ...h,
            children: ie
          }
        ),
        open: j,
        onOpenChange: (B) => {
          V(B), B || D("");
        },
        align: "start",
        sideOffset: 4,
        children: /* @__PURE__ */ y("div", { className: "flex flex-col gap-0.5", children: [
          _ && /* @__PURE__ */ a(
            "input",
            {
              type: "text",
              autoFocus: !0,
              value: O,
              onChange: (B) => D(B.target.value),
              placeholder: "Search...",
              className: "w-full px-2 py-1.5 text-sm text_primary bg_primary border border_secondary radius_6 outline-none mb-1 focus:border_accent transition-colors duration-0"
            }
          ),
          /* @__PURE__ */ a("div", { className: "max-h-[240px] overflow-y-auto flex flex-col gap-0.5", children: se.length === 0 ? /* @__PURE__ */ a("p", { className: "px-2 py-1.5 text-sm text_tertiary", children: "No options" }) : se.map((B) => /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              onClick: () => {
                f?.(B.value), V(!1), D("");
              },
              className: m(
                "flex w-full items-center gap-2 px-2 py-1.5 text-sm radius_6 text-left cursor-pointer focus:outline-none hover:state_primary_subtle",
                B.value === u ? "fg_accent_secondary" : "text_primary"
              ),
              children: [
                B.label,
                B.value === u && /* @__PURE__ */ a(ir, { className: "w-3.5 h-3.5 flex-shrink-0 ml-auto", "aria-hidden": !0 })
              ]
            },
            B.value
          )) })
        ] })
      }
    ) : /* @__PURE__ */ a(
      "span",
      {
        ref: v,
        "data-slot": "chip",
        "data-variant": t,
        "data-size": r,
        "data-selected": U || void 0,
        "data-chip-type": R,
        className: S,
        ...h,
        children: ie
      }
    );
  }
);
Kn.displayName = "Chip";
const _a = n.forwardRef(
  ({
    className: e,
    value: t,
    selected: r = !1,
    size: s = "m",
    bordered: i = !0,
    chipType: o,
    icon: l,
    children: d,
    type: c,
    ...u
  }, f) => /* @__PURE__ */ y(
    "button",
    {
      ref: f,
      type: c ?? "button",
      role: "radio",
      "aria-checked": r,
      "data-slot": "filter-chip-radio",
      "data-size": s,
      "data-selected": r || void 0,
      "data-chip-type": Gt(o, i),
      value: t,
      className: m(
        ha({
          variant: "check",
          size: s,
          chipType: Gt(o, i),
          bordered: i,
          pill: !0,
          selected: r
        }),
        l && Ye[s].left,
        "outline-none focus-visible:shadow-[var(--ds-outline-blue-focus)] disabled:pointer-events-none disabled:opacity-60",
        e
      ),
      ...u,
      children: [
        l && /* @__PURE__ */ a(
          "span",
          {
            className: m(At, "flex items-center justify-center [&>svg]:size-5"),
            "aria-hidden": !0,
            children: l
          }
        ),
        /* @__PURE__ */ a("span", { children: d })
      ]
    }
  )
), Yn = n.forwardRef(
  ({
    className: e,
    options: t,
    value: r,
    defaultValue: s,
    onValueChange: i,
    size: o = "m",
    bordered: l = !0,
    chipType: d,
    onKeyDown: c,
    ...u
  }, f) => {
    const _ = xr(t), b = _ >= 0 ? t[_]?.value : void 0, [g, k] = n.useState(
      () => s ?? b
    ), w = r ?? g, [N, x] = n.useState(() => w ?? b), h = n.useRef(/* @__PURE__ */ new Map());
    n.useEffect(() => {
      w && x(w);
    }, [w]);
    const v = n.useCallback(
      (C) => {
        r === void 0 && k(C), i?.(C);
      },
      [i, r]
    ), j = n.useCallback(
      (C) => {
        const U = t[C];
        !U || U.disabled || (x(U.value), v(U.value), h.current.get(U.value)?.focus());
      },
      [t, v]
    ), V = t.findIndex((C) => C.value === w), O = t.findIndex((C) => C.value === N), D = O >= 0 && !t[O]?.disabled ? O : V >= 0 && !t[V]?.disabled ? V : _, T = (C) => {
      if (c?.(C), C.defaultPrevented) return;
      let U = -1;
      C.key === "ArrowRight" || C.key === "ArrowDown" ? U = yr(t, D, 1) : C.key === "ArrowLeft" || C.key === "ArrowUp" ? U = yr(t, D, -1) : C.key === "Home" ? U = xr(t) : C.key === "End" && (U = Un(t)), U >= 0 && (C.preventDefault(), j(U));
    };
    return /* @__PURE__ */ a(
      "div",
      {
        ref: f,
        role: "radiogroup",
        "data-slot": "filter-chip-radio-group",
        className: m("flex flex-wrap items-center gap-2", e),
        onKeyDown: T,
        ...u,
        children: t.map((C, U) => /* @__PURE__ */ a(
          _a,
          {
            ref: (K) => {
              K ? h.current.set(C.value, K) : h.current.delete(C.value);
            },
            value: C.value,
            size: o,
            bordered: l,
            chipType: d,
            selected: w === C.value,
            disabled: C.disabled,
            tabIndex: U === D ? 0 : -1,
            icon: C.icon,
            onFocus: () => x(C.value),
            onClick: () => {
              C.disabled || (x(C.value), v(C.value));
            },
            children: C.label
          },
          C.value
        ))
      }
    );
  }
), qn = n.forwardRef(
  ({
    className: e,
    active: t = !1,
    display: r = "full",
    color: s = "subtle",
    size: i = "m",
    pill: o = !0,
    icon: l,
    children: d,
    type: c,
    ...u
  }, f) => /* @__PURE__ */ y(
    "button",
    {
      ref: f,
      type: c ?? "button",
      "aria-pressed": t,
      "data-slot": "tab-chip",
      "data-size": i,
      "data-active": t || void 0,
      "data-display": r,
      "data-color": s,
      className: m(
        "inline-flex cursor-pointer items-center justify-center border font-normal text-sm transition-colors duration-0 outline-none focus-visible:shadow-[var(--ds-outline-blue-focus)] disabled:pointer-events-none disabled:opacity-60",
        tr[i],
        o ? "radius_round" : "radius_4",
        r === "iconOnly" ? Gn[i] : "",
        t ? "bg_accent_secondary_subtle border_accent_secondary_contrast fg_accent_secondary hover:state_bg_accent_secondary_subtle_subtle active:state_bg_accent_secondary_subtle_soft" : s === "fill" ? "bg_interactive_secondary border_secondary text_primary hover:state_bg_interactive_secondary_subtle active:state_bg_interactive_secondary_soft" : "bg-transparent border_secondary text_primary hover:state_primary_subtle active:state_primary_soft",
        e
      ),
      ...u,
      children: [
        l && /* @__PURE__ */ a(
          "span",
          {
            className: m(At, "flex items-center justify-center [&>svg]:size-5"),
            "aria-hidden": !0,
            children: l
          }
        ),
        r === "full" && /* @__PURE__ */ a("span", { children: d })
      ]
    }
  )
), Xn = n.forwardRef(
  ({
    className: e,
    variant: t = "fill",
    size: r = "m",
    icon: s,
    showClose: i,
    closeAriaLabel: o = "Close",
    onClose: l,
    children: d,
    ...c
  }, u) => {
    const f = i ?? !!l;
    return /* @__PURE__ */ y(
      "div",
      {
        ref: u,
        "data-slot": "info-chip",
        "data-size": r,
        "data-variant": t,
        className: m(
          "inline-flex items-center border select-none radius_4",
          tr[r],
          "font-normal text-sm text_secondary transition-colors duration-0",
          t === "fill" ? "bg_interactive_secondary border_secondary hover:state_bg_interactive_secondary_subtle active:state_bg_interactive_secondary_soft" : "bg_interactive_primary border_secondary hover:state_bg_interactive_primary_subtle active:state_bg_interactive_primary_soft",
          s && Ye[r].left,
          f && Ye[r].right,
          e
        ),
        ...c,
        children: [
          s && /* @__PURE__ */ a(
            "span",
            {
              className: m(At, "flex items-center justify-center icon_secondary [&>svg]:size-5"),
              "aria-hidden": !0,
              children: s
            }
          ),
          /* @__PURE__ */ a("span", { children: d }),
          f && /* @__PURE__ */ a(
            Me,
            {
              type: "button",
              variant: "borderlessSubtle",
              size: "icon-mini-m",
              "aria-label": o,
              onClick: (_) => {
                _.stopPropagation(), l?.();
              },
              children: /* @__PURE__ */ a(bt, { className: ba, "aria-hidden": !0 })
            }
          )
        ]
      }
    );
  }
), Zn = n.forwardRef(
  ({
    className: e,
    type: t = "value",
    size: r = "m",
    icon: s,
    avatar: i,
    avatarProps: o,
    showClose: l,
    closeAriaLabel: d = "Remove",
    onRemove: c,
    children: u,
    ...f
  }, _) => {
    const b = l ?? !!c;
    return /* @__PURE__ */ y(
      "div",
      {
        ref: _,
        "data-slot": "input-chip",
        "data-size": r,
        "data-type": t,
        className: m(
          "inline-flex items-center border select-none radius_4",
          tr[r],
          "bg_interactive_secondary border_secondary font-normal text-sm text_secondary transition-colors duration-0 hover:state_bg_interactive_secondary_subtle active:state_bg_interactive_secondary_soft",
          (t === "avatar" || s) && Ye[r].left,
          b && Ye[r].right,
          e
        ),
        ...f,
        children: [
          t === "avatar" ? i ?? /* @__PURE__ */ a(
            qt,
            {
              alt: typeof u == "string" ? u : "Input chip avatar",
              size: o?.size ?? Wn[r],
              ...o
            }
          ) : s ? /* @__PURE__ */ a(
            "span",
            {
              className: m(At, "flex items-center justify-center icon_secondary [&>svg]:size-5"),
              "aria-hidden": !0,
              children: s
            }
          ) : null,
          /* @__PURE__ */ a("span", { children: u }),
          b && /* @__PURE__ */ a(
            Me,
            {
              type: "button",
              variant: "borderlessSubtle",
              size: "icon-mini-m",
              "aria-label": d,
              onClick: (g) => {
                g.stopPropagation(), c?.();
              },
              children: /* @__PURE__ */ a(bt, { className: ba, "aria-hidden": !0 })
            }
          )
        ]
      }
    );
  }
);
_a.displayName = "FilterChipRadio";
Yn.displayName = "FilterChipRadioGroup";
qn.displayName = "TabChip";
Xn.displayName = "InfoChip";
Zn.displayName = "InputChip";
const Qn = I(
  "peer inline-flex shrink-0 items-center justify-center border border_input bg_primary radius_4 text-transparent transition-colors duration-0 outline-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=checked]:bg-[var(--ds-bg-accent-primary)] data-[state=checked]:text-[var(--ds-fg-on-accent)] data-[state=checked]:border-transparent data-[state=indeterminate]:bg-[var(--ds-bg-accent-primary)] data-[state=indeterminate]:text-[var(--ds-fg-on-accent)] data-[state=indeterminate]:border-transparent",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
), Jn = I("flex items-center justify-center text-current", {
  variants: {
    size: {
      sm: "h-3 w-3",
      md: "h-3.5 w-3.5",
      lg: "h-4 w-4"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), Vt = n.forwardRef(
  ({ label: e, description: t, size: r = "md", className: s, id: i, onFocus: o, onBlur: l, ...d }, c) => {
    const u = n.useId(), f = i ?? u, [_, b] = n.useState(!1);
    return /* @__PURE__ */ y("div", { className: m("flex items-start gap-2", s), children: [
      /* @__PURE__ */ a(
        nr.Root,
        {
          ref: c,
          id: f,
          "data-slot": "checkbox",
          "data-size": r,
          className: m(Qn({ size: r }), _ && "outline_blue_focus"),
          onFocus: (g) => {
            b(!0), o?.(g);
          },
          onBlur: (g) => {
            b(!1), l?.(g);
          },
          ...d,
          children: /* @__PURE__ */ a(
            nr.Indicator,
            {
              "data-slot": "checkbox-indicator",
              className: m(Jn({ size: r })),
              children: /* @__PURE__ */ a(
                "svg",
                {
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  "aria-hidden": "true",
                  className: "h-full w-full",
                  children: /* @__PURE__ */ a(
                    "path",
                    {
                      d: "M12.5 4.5L6.5 10.5L3.5 7.5",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }
                  )
                }
              )
            }
          )
        }
      ),
      (e || t) && /* @__PURE__ */ y("div", { className: "flex flex-col", children: [
        e && /* @__PURE__ */ a("label", { htmlFor: f, className: "cursor-pointer text_primary text-sm", children: e }),
        t && /* @__PURE__ */ a("span", { className: "text_tertiary text-sm", children: t })
      ] })
    ] });
  }
);
Vt.displayName = "Checkbox";
const eo = I("grid gap-2", {
  variants: {
    orientation: {
      vertical: "grid-flow-row",
      horizontal: "grid-flow-col auto-cols-max items-start"
    }
  },
  defaultVariants: {
    orientation: "vertical"
  }
}), ya = I(
  "peer relative box-border inline-flex shrink-0 items-center justify-center border border_contrast_secondary bg_primary p-0 radius_round outline-none cursor-pointer transition-[border-color,border-width,box-shadow] duration-150 focus-visible:shadow-[var(--ds-outline-blue-focus)] disabled:opacity-50 disabled:cursor-not-allowed data-[state=unchecked]:hover:border-[var(--ds-border-accent-primary)] data-[state=checked]:border-[var(--ds-bg-accent-primary)]",
  {
    variants: {
      size: {
        sm: "h-4 w-4 data-[state=checked]:border-[5px]",
        md: "h-5 w-5 data-[state=checked]:border-[6px]",
        lg: "h-6 w-6 data-[state=checked]:border-[8px]"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
), to = n.forwardRef(({ className: e, orientation: t = "vertical", ...r }, s) => /* @__PURE__ */ a(
  Xr.Root,
  {
    ref: s,
    orientation: t,
    "data-slot": "radio-group",
    "data-orientation": t,
    className: m(eo({ orientation: t }), e),
    ...r
  }
)), ro = n.forwardRef(({ className: e, label: t, description: r, size: s = "md", id: i, ...o }, l) => {
  const d = n.useId(), c = i ?? d;
  return /* @__PURE__ */ y("div", { className: "flex items-start gap-2", children: [
    /* @__PURE__ */ a(
      Xr.Item,
      {
        ref: l,
        id: c,
        "data-slot": "radio-group-item",
        "data-size": s,
        className: m(ya({ size: s }), e),
        ...o
      }
    ),
    (t || r) && /* @__PURE__ */ y("div", { className: "flex flex-col", children: [
      t && /* @__PURE__ */ a("label", { htmlFor: c, className: "cursor-pointer text_primary text-sm", children: t }),
      r && /* @__PURE__ */ a("span", { className: "text_tertiary text-sm", children: r })
    ] })
  ] });
});
to.displayName = "RadioGroup";
ro.displayName = "RadioGroupItem";
const ao = I(
  "peer inline-flex shrink-0 cursor-pointer items-center border border-transparent radius_round bg_button_tertiary transition-colors duration-0 outline-none focus-visible:shadow-[var(--ds-outline-blue-focus)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--ds-bg-accent-primary)]",
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
), so = I(
  // bg-white is intentional: white thumb provides contrast on both unchecked (tertiary) and checked (accent) backgrounds
  "pointer-events-none block radius_round bg-white transition-transform",
  {
    variants: {
      size: {
        sm: "h-3 w-3 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-3",
        md: "h-4 w-4 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-4",
        lg: "h-5 w-5 data-[state=unchecked]:translate-x-0.5 data-[state=checked]:translate-x-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
), no = n.forwardRef(
  ({ label: e, description: t, size: r = "md", labelPosition: s = "right", className: i, id: o, ...l }, d) => {
    const c = n.useId(), u = o ?? c;
    return /* @__PURE__ */ y(
      "div",
      {
        "data-slot": "switch-wrapper",
        "data-label-position": s,
        className: m(
          "flex items-center gap-2",
          s === "left" && "flex-row-reverse justify-end",
          i
        ),
        children: [
          /* @__PURE__ */ a(
            or.Root,
            {
              ref: d,
              id: u,
              "data-slot": "switch",
              "data-size": r,
              className: m(ao({ size: r })),
              ...l,
              children: /* @__PURE__ */ a(
                or.Thumb,
                {
                  "data-slot": "switch-thumb",
                  className: m(so({ size: r }))
                }
              )
            }
          ),
          (e || t) && /* @__PURE__ */ y("div", { className: "flex flex-col", children: [
            e && /* @__PURE__ */ a("label", { htmlFor: u, className: "cursor-pointer text_primary text-sm", children: e }),
            t && /* @__PURE__ */ a("span", { className: "text_tertiary text-sm", children: t })
          ] })
        ]
      }
    );
  }
);
no.displayName = "Switch";
const oo = I(
  "fixed left-1/2 z-50 w-[calc(100vw-32px)] -translate-x-1/2 bg_primary radius_12 shadow_xl outline-none",
  {
    variants: {
      variant: {
        default: "top-1/2 -translate-y-1/2 p-6",
        spotlight: "top-[10vh] p-0 h-[75vh]"
      },
      size: {
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-2xl",
        "2xl": "max-w-[62vw]",
        full: "max-w-[calc(100vw-32px)]"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md"
    }
  }
), io = ({
  open: e,
  onOpenChange: t,
  trigger: r,
  title: s,
  description: i,
  children: o,
  footer: l,
  size: d = "md",
  showCloseButton: c = !0,
  closeOnOverlayClick: u = !0,
  "aria-label": f,
  className: _,
  bodyClassName: b,
  variant: g = "default"
}) => (n.useEffect(() => {
}, [s, f]), /* @__PURE__ */ y(ae.Root, { "data-slot": "modal", open: e, onOpenChange: t, children: [
  r ? /* @__PURE__ */ a(ae.Trigger, { asChild: !0, children: r }) : null,
  /* @__PURE__ */ y(ae.Portal, { children: [
    g !== "spotlight" && /* @__PURE__ */ a(ae.Overlay, { "data-slot": "modal-overlay", className: "fixed inset-0 z-50 bg_backdrop" }),
    /* @__PURE__ */ y(
      ae.Content,
      {
        "data-slot": "modal-content",
        "data-size": d,
        "aria-label": f,
        className: m(oo({ variant: g, size: d }), _),
        onPointerDownOutside: (k) => {
          u || k.preventDefault();
        },
        children: [
          s || i || c ? /* @__PURE__ */ y("div", { className: "mb-4 flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ y("div", { className: "flex flex-col gap-1", children: [
              /* @__PURE__ */ a(
                ae.Title,
                {
                  className: m("text-base font-semibold text_primary", !s && "sr-only"),
                  children: s ?? "Modal"
                }
              ),
              /* @__PURE__ */ a(
                ae.Description,
                {
                  className: m("text-sm text_secondary", !i && "sr-only"),
                  children: i ?? "Dialog content"
                }
              )
            ] }),
            c ? /* @__PURE__ */ a(ae.Close, { asChild: !0, children: /* @__PURE__ */ a(Me, { type: "button", variant: "subtle", size: "icon-s", "aria-label": "Close modal", children: /* @__PURE__ */ a(
              "svg",
              {
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                "aria-hidden": "true",
                className: "h-4 w-4",
                children: /* @__PURE__ */ a(
                  "path",
                  {
                    d: "M4 4L12 12M12 4L4 12",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round"
                  }
                )
              }
            ) }) }) : null
          ] }) : /* @__PURE__ */ y("div", { className: "sr-only", children: [
            /* @__PURE__ */ a(ae.Title, { children: "Modal" }),
            /* @__PURE__ */ a(ae.Description, { children: "Dialog content" })
          ] }),
          /* @__PURE__ */ a("div", { className: m("text_primary", b), children: o }),
          l ? /* @__PURE__ */ a("div", { className: "mt-4 flex items-center justify-end gap-2", children: l }) : null
        ]
      }
    )
  ] })
] }));
io.displayName = "Modal";
const lo = ae.Trigger;
lo.displayName = "ModalTrigger";
function hl({
  position: e = "top-right",
  expand: t,
  richColors: r = !0,
  closeButton: s = !0,
  duration: i = 4e3,
  className: o
}) {
  return /* @__PURE__ */ a(
    Wa,
    {
      position: e,
      expand: t,
      richColors: r,
      closeButton: s,
      duration: i,
      className: o,
      toastOptions: {
        classNames: {
          toast: m("bg_primary border_secondary shadow_m radius_8"),
          title: "text_primary",
          description: "text_secondary",
          closeButton: "bg_secondary border_secondary"
        }
      }
    }
  );
}
const co = ({
  title: e,
  content: t,
  children: r,
  side: s = "top",
  align: i = "center",
  delayDuration: o = 400,
  avoidCollisions: l = !1,
  open: d,
  onOpenChange: c,
  disabled: u = !1,
  className: f
}) => u ? /* @__PURE__ */ a(Ce, { children: r }) : /* @__PURE__ */ y(ft.Root, { open: d, onOpenChange: c, delayDuration: o, children: [
  /* @__PURE__ */ a(ft.Trigger, { asChild: !0, children: r }),
  /* @__PURE__ */ a(ft.Portal, { children: /* @__PURE__ */ y(
    ft.Content,
    {
      "data-slot": "tooltip-content",
      side: s,
      align: i,
      avoidCollisions: l,
      className: m(
        "z-50 bg_primary border border_primary radius_12 shadow_xs px-3 py-2 max-w-[240px]",
        f
      ),
      children: [
        e ? /* @__PURE__ */ a("p", { className: "text-sm font-semibold text_primary leading-snug", children: e }) : null,
        /* @__PURE__ */ a("div", { className: m("text-xs font-normal text_tertiary leading-snug", e && "mt-0.5"), children: t })
      ]
    }
  ) })
] });
co.displayName = "Tooltip";
const uo = ft.Provider;
uo.displayName = "TooltipProvider";
const fo = I("inline-flex items-center", {
  variants: {
    variant: {
      default: "bg_tertiary p-1 radius_8",
      underline: "border-b border_secondary gap-1 w-full",
      borderless: "border-b border-transparent gap-1 w-full"
    }
  },
  defaultVariants: { variant: "default" }
}), mo = I(
  "inline-flex h-[var(--ui-tabs-trigger-height,2rem)] items-center justify-center whitespace-nowrap px-3 text-sm font-medium transition-colors duration-0",
  {
    variants: {
      variant: {
        default: [
          "bg-transparent py-1.5 text_secondary radius_6",
          "hover:state_bg_button_tertiary_soft",
          "data-[state=active]:bg-[var(--ds-bg-primary)] data-[state=active]:text-[var(--ds-text-primary)] data-[state=active]:shadow-[var(--ds-shadow-s)]"
        ].join(" "),
        underline: [
          "border-b-2 border-transparent py-2 text_tertiary -mb-[2px]",
          "hover:text_primary"
        ].join(" "),
        borderless: [
          "border-b-2 border-transparent py-2 text_tertiary -mb-[2px]",
          "hover:text_primary"
        ].join(" ")
      },
      color: {
        orange: "",
        primary: ""
      }
    },
    compoundVariants: [
      {
        variant: "underline",
        color: "orange",
        class: "data-[state=active]:border-[var(--ds-border-accent-primary)] data-[state=active]:text-[var(--ds-fg-accent-primary)]"
      },
      {
        variant: "borderless",
        color: "orange",
        class: "data-[state=active]:border-[var(--ds-border-accent-primary)] data-[state=active]:text-[var(--ds-fg-accent-primary)]"
      },
      {
        variant: "underline",
        color: "primary",
        class: "data-[state=active]:border-[var(--ds-text-primary)] data-[state=active]:text-[var(--ds-text-primary)]"
      },
      {
        variant: "borderless",
        color: "primary",
        class: "data-[state=active]:border-[var(--ds-text-primary)] data-[state=active]:text-[var(--ds-text-primary)]"
      }
    ],
    defaultVariants: {
      variant: "default",
      color: "orange"
    }
  }
), po = I("mt-4"), go = (e) => {
  if (e !== void 0)
    return typeof e == "number" ? `${e}px` : e;
}, ho = (e, t) => {
  const r = go(t);
  if (!r) return e;
  const s = { ...e ?? {} };
  return s["--ui-tabs-trigger-height"] = r, s;
}, bo = n.forwardRef(
  ({
    items: e,
    variant: t = "default",
    color: r = "orange",
    tabHeight: s,
    tabsListClassName: i,
    triggerClassName: o,
    contentClassName: l,
    value: d,
    defaultValue: c,
    style: u,
    ...f
  }, _) => {
    const b = n.useMemo(
      () => e?.find((k) => !k.disabled)?.value,
      [e]
    ), g = d === void 0 ? c ?? b : void 0;
    return /* @__PURE__ */ y(
      mt.Root,
      {
        ref: _,
        "data-slot": "tabs",
        value: d,
        defaultValue: g,
        style: ho(u, s),
        ...f,
        children: [
          /* @__PURE__ */ a(
            mt.List,
            {
              "data-slot": "tabs-list",
              "data-variant": t,
              "data-color": r,
              className: m(fo({ variant: t }), i),
              children: e.map((k) => /* @__PURE__ */ a(
                mt.Trigger,
                {
                  "data-slot": "tabs-trigger",
                  "data-variant": t,
                  "data-color": r,
                  value: k.value,
                  disabled: k.disabled,
                  className: m(
                    mo({ variant: t, color: r }),
                    o,
                    k.triggerClassName
                  ),
                  children: k.label
                },
                k.value
              ))
            }
          ),
          e.map(
            (k) => k.content === void 0 ? null : /* @__PURE__ */ a(
              mt.Content,
              {
                "data-slot": "tabs-content",
                value: k.value,
                className: m(po(), l, k.contentClassName),
                children: k.content
              },
              k.value
            )
          )
        ]
      }
    );
  }
);
bo.displayName = mt.Root.displayName;
const _o = {
  none: "shadow-none",
  xs: "shadow_xs",
  sm: "shadow_xxs",
  md: "shadow_m",
  lg: "shadow_l",
  xl: "shadow_xl"
}, yo = n.forwardRef(
  ({ className: e, shadow: t = "xs", hoverable: r = !1, ...s }, i) => /* @__PURE__ */ a(
    "div",
    {
      ref: i,
      "data-slot": "card",
      "data-shadow": t,
      "data-hoverable": r,
      className: m(
        "flex flex-col border border_secondary bg_primary radius_12",
        _o[t],
        r && "transition-shadow hover:shadow-[var(--ds-shadow-l)]",
        e
      ),
      ...s
    }
  )
), xo = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      "data-slot": "card-header",
      className: m("flex flex-col gap-1.5 p-6 border-b border_secondary", e),
      ...t
    }
  )
), vo = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "h3",
    {
      ref: r,
      "data-slot": "card-title",
      className: m("text-base font-semibold text_primary", e),
      ...t
    }
  )
), wo = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  "p",
  {
    ref: r,
    "data-slot": "card-description",
    className: m("text-sm text_secondary", e),
    ...t
  }
)), ko = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a("div", { ref: r, "data-slot": "card-content", className: m("flex-1 p-6", e), ...t })
), No = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      "data-slot": "card-footer",
      className: m("flex items-center gap-2 border-t border_secondary p-6", e),
      ...t
    }
  )
);
yo.displayName = "Card";
xo.displayName = "CardHeader";
vo.displayName = "CardTitle";
wo.displayName = "CardDescription";
ko.displayName = "CardContent";
No.displayName = "CardFooter";
const Co = I("", {
  variants: {
    variant: {
      default: "border-b border_secondary",
      card: "rounded-[var(--conner-8,8px)] bg-bg_primary shadow-xs border border_primary mb-2 last:mb-0"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), So = I(
  "group flex w-full items-center justify-between px-4 py-5 text-left text-sm font-semibold text_primary transition-colors duration-0 hover:text_primary cursor-pointer"
), zo = I(
  "overflow-hidden text-sm font-normal text_primary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
), Ro = I(
  "h-4 w-4 icon_primary transition-transform duration-200 group-data-[state=open]:rotate-180"
), xa = n.createContext("default"), Mo = n.forwardRef(({ className: e, variant: t = "default", ...r }, s) => /* @__PURE__ */ a(xa.Provider, { value: t, children: /* @__PURE__ */ a(
  ht.Root,
  {
    ref: s,
    "data-slot": "accordion",
    className: m("w-full", e),
    ...r
  }
) })), Do = n.forwardRef(({ className: e, ...t }, r) => {
  const s = n.useContext(xa);
  return /* @__PURE__ */ a(
    ht.Item,
    {
      ref: r,
      "data-slot": "accordion-item",
      className: m(Co({ variant: s }), e),
      ...t
    }
  );
}), Io = n.forwardRef(({ className: e, children: t, ...r }, s) => /* @__PURE__ */ a(ht.Header, { "data-slot": "accordion-header", className: "flex", children: /* @__PURE__ */ y(
  ht.Trigger,
  {
    ref: s,
    "data-slot": "accordion-trigger",
    className: m(So(), e),
    ...r,
    children: [
      t,
      /* @__PURE__ */ a(
        "svg",
        {
          viewBox: "0 0 16 16",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          "aria-hidden": "true",
          className: m(Ro()),
          children: /* @__PURE__ */ a(
            "path",
            {
              d: "M4 6L8 10L12 6",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            }
          )
        }
      )
    ]
  }
) })), Vo = n.forwardRef(({ className: e, children: t, ...r }, s) => /* @__PURE__ */ a(
  ht.Content,
  {
    ref: s,
    "data-slot": "accordion-content",
    className: m(zo(), e),
    ...r,
    children: /* @__PURE__ */ a("div", { className: "px-4 pb-5", children: t })
  }
));
Mo.displayName = "Accordion";
Do.displayName = "AccordionItem";
Io.displayName = "AccordionTrigger";
Vo.displayName = "AccordionContent";
const To = I("relative flex w-full items-start gap-3 border radius_8 p-4", {
  variants: {
    variant: {
      default: "bg_secondary border_secondary text_primary",
      success: "bg_success border-transparent fg_success",
      warning: "bg_warning border-transparent fg_warning",
      error: "bg_error border-transparent fg_error",
      info: "bg_info border-transparent fg_info"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Lo = I("h-4 w-4 shrink-0", {
  variants: {
    variant: {
      default: "text_primary",
      success: "fg_success",
      warning: "fg_warning",
      error: "fg_error",
      info: "fg_info"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Eo = {
  default: lr,
  success: La,
  warning: Ta,
  error: Va,
  info: lr
}, Ao = n.forwardRef(
  ({
    className: e,
    variant: t = "default",
    title: r,
    description: s,
    icon: i,
    onClose: o,
    action: l,
    children: d,
    ...c
  }, u) => {
    const f = Eo[t], _ = i ?? /* @__PURE__ */ a(f, { "aria-hidden": "true", className: m(Lo({ variant: t })) });
    return /* @__PURE__ */ y(
      "div",
      {
        ref: u,
        role: "status",
        "data-slot": "alert",
        "data-variant": t,
        className: m(To({ variant: t }), e),
        ...c,
        children: [
          /* @__PURE__ */ a("div", { "data-slot": "alert-icon", className: "pt-0.5", children: _ }),
          /* @__PURE__ */ y("div", { className: "flex flex-1 flex-col gap-1", children: [
            r ? /* @__PURE__ */ a("div", { className: "font-semibold text-sm", children: r }) : null,
            s ? /* @__PURE__ */ a("p", { className: m("text-sm", t === "default" ? "text_secondary" : "text-current"), children: s }) : null,
            d,
            l ? /* @__PURE__ */ a("div", { className: "mt-2", children: l }) : null
          ] }),
          o ? /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: o,
              "aria-label": "Close alert",
              className: "inline-flex h-6 w-6 items-center justify-center radius_4 text_secondary hover:state_bg_button_tertiary_soft",
              children: /* @__PURE__ */ a(bt, { className: "h-4 w-4", "aria-hidden": "true" })
            }
          ) : null
        ]
      }
    );
  }
);
Ao.displayName = "Alert";
const Po = /* @__PURE__ */ a(Et, { className: "h-3.5 w-3.5", "aria-hidden": "true" }), jo = n.forwardRef(
  ({ items: e, separator: t = Po, className: r, maxItems: s }, i) => {
    const o = s !== void 0 && e.length > s ? e.slice(1, e.length - 1) : [], l = s !== void 0 && e.length > s ? [e[0], { label: "...", _ellipsis: !0 }, e[e.length - 1]] : e;
    return /* @__PURE__ */ a("nav", { ref: i, "data-slot": "breadcrumb", "aria-label": "Breadcrumb", className: r, children: /* @__PURE__ */ a("ol", { className: m("flex flex-wrap items-center gap-1"), children: l.map((d, c) => {
      const u = c === l.length - 1, f = `${d.label}-${c}`, _ = !!d._ellipsis;
      return /* @__PURE__ */ y("li", { className: "inline-flex items-center", children: [
        _ ? /* @__PURE__ */ y(he.Root, { children: [
          /* @__PURE__ */ a(he.Trigger, { asChild: !0, children: /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "inline-flex items-center px-1 py-0.5 text-sm icon_tertiary hover:state_fg_tertiary_neutral_max radius_4 transition-colors cursor-pointer",
              "aria-label": "Show hidden items",
              children: "..."
            }
          ) }),
          /* @__PURE__ */ a(he.Portal, { children: /* @__PURE__ */ a(
            he.Content,
            {
              side: "bottom",
              align: "start",
              sideOffset: 6,
              className: "z-50 min-w-36 bg_primary border border_secondary radius_8 shadow_l p-1",
              children: o.map(
                (b, g) => b.href ? /* @__PURE__ */ y(
                  "a",
                  {
                    href: b.href,
                    className: "flex items-center gap-2 px-3 py-1.5 text-sm text_tertiary hover:state_fg_tertiary_neutral_max radius_6 transition-colors cursor-pointer",
                    children: [
                      b.icon,
                      b.label
                    ]
                  },
                  `${b.label}-${g}`
                ) : /* @__PURE__ */ y(
                  "span",
                  {
                    className: "flex items-center gap-2 px-3 py-1.5 text-sm text_tertiary radius_6",
                    children: [
                      b.icon,
                      b.label
                    ]
                  },
                  `${b.label}-${g}`
                )
              )
            }
          ) })
        ] }) : u || !d.href ? /* @__PURE__ */ y(
          "span",
          {
            "aria-current": u ? "page" : void 0,
            className: m(
              "inline-flex items-center gap-1",
              u ? "font-normal text_primary" : "text_tertiary"
            ),
            children: [
              d.icon,
              d.label
            ]
          }
        ) : /* @__PURE__ */ y(
          "a",
          {
            href: d.href,
            className: "inline-flex items-center gap-1 px-1 py-0.5 text_tertiary transition-colors hover:state_fg_tertiary_neutral_max radius_4",
            children: [
              d.icon,
              d.label
            ]
          }
        ),
        u ? null : /* @__PURE__ */ a("span", { className: "mx-1 inline-flex items-center icon_tertiary", "aria-hidden": "true", children: t })
      ] }, f);
    }) }) });
  }
);
jo.displayName = "Breadcrumb";
const Fo = I(
  "flex w-full items-center justify-between gap-2 text-left outline-none focus-visible:border-[var(--ds-border-accent-secondary-contrast)] disabled:cursor-not-allowed"
), Oo = I(
  "z-50 border border_secondary bg_primary p-1 radius_8 shadow_l"
), $o = I(
  "flex w-full items-center gap-2 px-3 py-2 text-sm text_primary radius_6 transition-colors duration-0 hover:state_bg_button_tertiary_soft",
  {
    variants: {
      selected: {
        true: "font-medium",
        false: ""
      },
      focused: {
        true: "state_bg_button_tertiary_soft",
        false: ""
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "cursor-pointer"
      }
    },
    defaultVariants: {
      selected: !1,
      focused: !1,
      disabled: !1
    }
  }
), Bo = I(
  "inline-flex items-center gap-1 bg_secondary pl-2 pr-1.5 py-0.5 text-xs text_primary radius_4"
), vr = (e) => e.findIndex((t) => !t.disabled), Ho = (e) => {
  for (let t = e.length - 1; t >= 0; t -= 1)
    if (!e[t]?.disabled) return t;
  return -1;
}, Go = ({ open: e }) => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: m("h-4 w-4 icon_secondary transition-transform", e && "rotate-180"),
    children: /* @__PURE__ */ a(
      "path",
      {
        d: "M4 6L8 10L12 6",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), Wo = () => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: "h-4 w-4",
    children: /* @__PURE__ */ a(
      "path",
      {
        d: "M12.5 4.5L6.5 10.5L3.5 7.5",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), Uo = {
  xs: "min-h-8",
  s: "min-h-9",
  m: "min-h-10",
  l: "min-h-12",
  xl: "min-h-14"
}, Ko = (e) => e === !0 || e === "true", va = n.forwardRef(
  ({
    options: e,
    groups: t,
    value: r,
    defaultValue: s,
    onValueChange: i,
    multiple: o = !1,
    searchable: l,
    clearable: d = !1,
    disabled: c = !1,
    required: u = !1,
    name: f,
    placeholder: _ = "Select...",
    searchPlaceholder: b = "Search...",
    emptyMessage: g = "No options found",
    loadingMessage: k = "Loading...",
    preparingMessage: w = "Preparing options...",
    onSearch: N,
    maxDisplayedTags: x,
    loading: h = !1,
    overflowLabel: v = (se) => `+${se} more`,
    size: j = "m",
    variant: V = "light",
    validation: O,
    portalContainer: D = null,
    id: T,
    "aria-describedby": C,
    "aria-invalid": U,
    className: K
  }, Y) => {
    const se = r !== void 0, [X, R] = n.useState(!1), [$, Q] = n.useState(""), [S, ie] = n.useState(-1), [B, H] = n.useState(
      s ?? (o ? [] : "")
    ), [A, P] = n.useState(), [q, G] = n.useState([]), [J, W] = n.useState(!1), de = n.useRef(null), oe = n.useRef(null), ue = n.useRef(null), pe = n.useRef(null), le = n.useId(), xe = n.useCallback(
      (p) => {
        oe.current = p, typeof Y == "function" ? Y(p) : Y && (Y.current = p);
      },
      [Y]
    ), ce = N != null || (l ?? e.length > 10), be = se ? r : B, fe = n.useMemo(
      () => o ? Array.isArray(be) ? be : be ? [be] : [] : [],
      [o, be]
    ), ke = n.useMemo(
      () => o ? "" : Array.isArray(be) ? be[0] ?? "" : be ?? "",
      [o, be]
    ), ye = o ? fe.length > 0 : !!ke, Pe = n.useMemo(
      () => new Map(e.map((p) => [p.value, p])),
      [e]
    ), qe = o ? fe.map((p) => Pe.get(p)).filter((p) => !!p) : [], Xe = o ? void 0 : Pe.get(ke), at = x !== void 0 ? qe.slice(0, x) : qe, _t = x !== void 0 ? Math.max(0, qe.length - x) : 0, Ie = n.useMemo(() => {
      if (N)
        return $.trim() ? q : e;
      const p = $.trim().toLowerCase();
      return p ? e.filter((F) => F.label.toLowerCase().includes(p)) : e;
    }, [N, $, q, e]), ee = n.useMemo(() => {
      if (!t || t.length === 0)
        return Ie;
      const p = new Set(t.map((te) => te.key)), F = t.flatMap(
        (te) => Ie.filter((ze) => ze.group === te.key)
      ), re = Ie.filter(
        (te) => !te.group || !p.has(te.group)
      );
      return [...F, ...re];
    }, [Ie, t]), st = n.useMemo(
      () => new Map(ee.map((p, F) => [p.value, F])),
      [ee]
    ), Ve = ee.length > 100 && !(t && t.length > 0), je = Kt({
      count: Ve ? ee.length : 0,
      getScrollElement: () => pe.current,
      estimateSize: (p) => ee[p]?.description ? 64 : 48,
      overscan: 8
    }), Ne = n.useCallback(
      (p) => {
        se || H(p), i?.(p);
      },
      [se, i]
    ), yt = n.useCallback(() => {
      Ne(o ? [] : ""), Q("");
    }, [o, Ne]), Ze = n.useCallback(
      (p) => {
        if (!p.disabled) {
          if (o) {
            const F = fe.includes(p.value) ? fe.filter((re) => re !== p.value) : [...fe, p.value];
            Ne(F);
            return;
          }
          Ne(p.value), R(!1);
        }
      },
      [o, fe, Ne]
    ), Fe = n.useCallback(
      (p) => {
        if (!ee.length) return;
        let F = S;
        for (let re = 0; re < ee.length; re += 1)
          if (F = (F + p + ee.length) % ee.length, !ee[F]?.disabled) {
            ie(F);
            break;
          }
      },
      [ee, S]
    ), nt = n.useCallback(() => {
      ie(vr(ee));
    }, [ee]), ot = n.useCallback(() => {
      ie(Ho(ee));
    }, [ee]), Oe = n.useCallback(() => {
      !o || fe.length === 0 || Ne(fe.slice(0, -1));
    }, [o, fe, Ne]), $e = n.useCallback(
      (p) => {
        Ne(fe.filter((F) => F !== p));
      },
      [fe, Ne]
    );
    n.useEffect(() => {
      if (!X) {
        Q("");
        return;
      }
      P(oe.current?.getBoundingClientRect().width), ie(vr(ee)), ce && requestAnimationFrame(() => {
        ue.current?.focus();
      });
    }, [ee, ce, X]), n.useEffect(() => {
      if (!X || !Ve) return;
      let p = 0, F = 0;
      return p = requestAnimationFrame(() => {
        je.measure(), F = requestAnimationFrame(() => {
          je.measure();
        });
      }), () => {
        cancelAnimationFrame(p), cancelAnimationFrame(F);
      };
    }, [X, je, Ve, ee.length]), n.useEffect(() => {
      if (!N) return;
      if (de.current && clearTimeout(de.current), !$.trim()) {
        G([]), W(!1);
        return;
      }
      W(!0);
      let p = !1;
      return de.current = setTimeout(() => {
        N($).then((F) => {
          p || G(F);
        }).catch(() => {
          p || G([]);
        }).finally(() => {
          p || W(!1);
        });
      }, 300), () => {
        p = !0, de.current && clearTimeout(de.current);
      };
    }, [$, N]);
    const xt = (p) => {
      if (!c) {
        if ((p.key === "Tab" || p.key === "Enter" || p.key === " ") && !X) {
          p.key !== "Tab" && p.preventDefault(), R(!0);
          return;
        }
        if (p.key === "ArrowDown") {
          if (p.preventDefault(), !X) {
            R(!0);
            return;
          }
          Fe(1);
          return;
        }
        if (p.key === "ArrowUp") {
          if (p.preventDefault(), !X) {
            R(!0);
            return;
          }
          Fe(-1);
          return;
        }
        if (p.key === "Home" && X) {
          p.preventDefault(), nt();
          return;
        }
        if (p.key === "End" && X) {
          p.preventDefault(), ot();
          return;
        }
        if (p.key === "Enter" && X && S >= 0) {
          p.preventDefault();
          const F = ee[S];
          F && Ze(F);
          return;
        }
        if (p.key === "Escape" && X) {
          p.preventDefault(), R(!1);
          return;
        }
        p.key === "Backspace" && o && $.length === 0 && Oe();
      }
    }, Pt = (p) => {
      if (p.key === "ArrowDown") {
        p.preventDefault(), Fe(1);
        return;
      }
      if (p.key === "Home") {
        p.preventDefault(), nt();
        return;
      }
      if (p.key === "End") {
        p.preventDefault(), ot();
        return;
      }
      if (p.key === "ArrowUp") {
        p.preventDefault(), Fe(-1);
        return;
      }
      if (p.key === "Enter" && S >= 0) {
        p.preventDefault();
        const F = ee[S];
        F && Ze(F);
        return;
      }
      p.key === "Escape" && (p.preventDefault(), R(!1));
    }, Se = (p, F) => {
      const re = o ? fe.includes(p.value) : ke === p.value, te = F === S, ze = `${le}-${p.value}`;
      return /* @__PURE__ */ y(
        "div",
        {
          id: ze,
          role: "option",
          "aria-selected": re,
          "data-focused": te,
          "data-disabled": p.disabled,
          onMouseEnter: () => ie(F),
          onMouseDown: (He) => {
            He.preventDefault(), Ze(p);
          },
          className: m(
            $o({
              selected: re,
              focused: te,
              disabled: !!p.disabled
            })
          ),
          children: [
            p.icon,
            /* @__PURE__ */ y("span", { className: "flex flex-col", children: [
              /* @__PURE__ */ a("span", { children: p.label }),
              p.description ? /* @__PURE__ */ a("span", { className: "text-xs text_tertiary", children: p.description }) : null
            ] }),
            re ? /* @__PURE__ */ a("span", { className: "ml-auto icon_secondary", "aria-hidden": "true", children: /* @__PURE__ */ a(Wo, {}) }) : null
          ]
        },
        p.value
      );
    }, Be = () => {
      if (h || J)
        return /* @__PURE__ */ y("div", { className: "flex items-center gap-2 px-3 py-2 text-sm text_secondary", children: [
          /* @__PURE__ */ a(Dt, { size: "sm" }),
          /* @__PURE__ */ a("span", { children: k })
        ] });
      if (!ee.length)
        return /* @__PURE__ */ a("div", { className: "px-3 py-2 text-sm text_secondary", children: g });
      if (Ve) {
        const p = je.getVirtualItems();
        return p.length === 0 && ee.length > 0 ? /* @__PURE__ */ y("div", { className: "flex items-center gap-2 px-3 py-2 text-sm text_secondary", children: [
          /* @__PURE__ */ a(Dt, { size: "sm" }),
          /* @__PURE__ */ a("span", { children: w })
        ] }) : /* @__PURE__ */ a("div", { style: { height: `${je.getTotalSize()}px`, position: "relative" }, children: p.map((F) => {
          const re = ee[F.index];
          return re ? /* @__PURE__ */ a(
            "div",
            {
              style: {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${F.start}px)`
              },
              children: Se(re, F.index)
            },
            re.value
          ) : null;
        }) });
      }
      if (t && t.length > 0) {
        const p = t.map((te) => ({
          group: te,
          options: Ie.filter((ze) => ze.group === te.key)
        })).filter((te) => te.options.length > 0), F = new Set(t.map((te) => te.key)), re = Ie.filter(
          (te) => !te.group || !F.has(te.group)
        );
        return /* @__PURE__ */ y(Ce, { children: [
          p.map(({ group: te, options: ze }) => /* @__PURE__ */ y("div", { children: [
            /* @__PURE__ */ a("div", { className: "px-3 pb-1 pt-2 text-xs font-semibold text_tertiary", children: te.label }),
            ze.map((He) => Se(He, st.get(He.value) ?? -1))
          ] }, te.key)),
          re.length > 0 ? /* @__PURE__ */ a("div", { children: re.map((te) => Se(te, st.get(te.value) ?? -1)) }) : null
        ] });
      }
      return ee.map((p, F) => Se(p, F));
    }, it = S >= 0 && ee[S] ? `${le}-${ee[S]?.value}` : void 0, Ee = O === "error" || Ko(U) ? "error" : void 0;
    return /* @__PURE__ */ y(Ce, { children: [
      f ? /* @__PURE__ */ a(
        "input",
        {
          type: "hidden",
          name: f,
          required: u,
          value: o ? fe.join(",") : ke
        }
      ) : null,
      /* @__PURE__ */ y(he.Root, { open: X, onOpenChange: (p) => !c && R(p), children: [
        /* @__PURE__ */ a(he.Trigger, { asChild: !0, children: /* @__PURE__ */ y(
          "div",
          {
            ref: xe,
            id: T,
            role: "combobox",
            tabIndex: c ? -1 : 0,
            "aria-expanded": X,
            "aria-haspopup": "listbox",
            "aria-controls": `${le}-listbox`,
            "aria-activedescendant": ce ? void 0 : it,
            "aria-describedby": C,
            "aria-invalid": O === "error" ? !0 : U || void 0,
            "aria-disabled": c || void 0,
            "data-slot": "select-trigger",
            "data-size": j,
            "data-variant": V,
            "data-open": X,
            onKeyDown: xt,
            className: m(
              It({ variant: V, size: j, validation: Ee }),
              Fo(),
              o && [Uo[j ?? "m"], "h-auto"],
              ye ? "text_primary" : "text_tertiary",
              K
            ),
            children: [
              /* @__PURE__ */ a("span", { className: "flex flex-1 flex-wrap items-center gap-1 py-1", children: o ? qe.length > 0 ? /* @__PURE__ */ y(Ce, { children: [
                at.map((p) => /* @__PURE__ */ y("span", { className: m(Bo()), children: [
                  p.icon && /* @__PURE__ */ a("span", { className: "flex-shrink-0", children: p.icon }),
                  /* @__PURE__ */ a("span", { children: p.label }),
                  c ? null : /* @__PURE__ */ a(
                    "span",
                    {
                      role: "button",
                      tabIndex: 0,
                      "aria-label": `Remove ${p.label}`,
                      onMouseDown: (F) => {
                        F.preventDefault(), F.stopPropagation(), $e(p.value);
                      },
                      onKeyDown: (F) => {
                        (F.key === "Enter" || F.key === " ") && (F.preventDefault(), F.stopPropagation(), $e(p.value));
                      },
                      className: "inline-flex cursor-pointer items-center justify-center text_tertiary hover:text_primary",
                      children: "×"
                    }
                  )
                ] }, p.value)),
                _t > 0 ? /* @__PURE__ */ a("span", { className: "text-xs text_secondary", children: v(_t) }) : null
              ] }) : /* @__PURE__ */ a("span", { className: "truncate", children: _ }) : Xe ? /* @__PURE__ */ a("span", { className: "truncate", children: Xe.label }) : /* @__PURE__ */ a("span", { className: "truncate", children: _ }) }),
              d && ye && !c ? /* @__PURE__ */ a(
                "span",
                {
                  role: "button",
                  tabIndex: 0,
                  "aria-label": "Clear selection",
                  onMouseDown: (p) => {
                    p.preventDefault(), p.stopPropagation(), yt();
                  },
                  onKeyDown: (p) => {
                    (p.key === "Enter" || p.key === " ") && (p.preventDefault(), p.stopPropagation(), yt());
                  },
                  className: "inline-flex h-4 w-4 items-center justify-center text_secondary hover:text_primary",
                  children: "×"
                }
              ) : null,
              /* @__PURE__ */ a(Go, { open: X })
            ]
          }
        ) }),
        /* @__PURE__ */ a(he.Portal, { container: D ?? void 0, children: /* @__PURE__ */ y(
          he.Content,
          {
            align: "start",
            sideOffset: 8,
            onOpenAutoFocus: (p) => p.preventDefault(),
            onCloseAutoFocus: (p) => {
              p.preventDefault(), oe.current?.focus();
            },
            style: { width: A },
            className: m(Oo()),
            children: [
              ce ? /* @__PURE__ */ a("div", { className: "p-1", children: /* @__PURE__ */ a(
                "input",
                {
                  ref: ue,
                  "aria-label": b,
                  role: "combobox",
                  "aria-expanded": X,
                  "aria-controls": `${le}-listbox`,
                  "aria-activedescendant": it,
                  value: $,
                  onChange: (p) => Q(p.target.value),
                  onKeyDown: (p) => {
                    if (p.key === "ArrowDown" || p.key === "ArrowUp") {
                      p.preventDefault(), Fe(p.key === "ArrowDown" ? 1 : -1);
                      return;
                    }
                    if (p.key === "Home") {
                      p.preventDefault(), nt();
                      return;
                    }
                    if (p.key === "End") {
                      p.preventDefault(), ot();
                      return;
                    }
                    if (p.key === "Enter" && S >= 0) {
                      p.preventDefault();
                      const F = ee[S];
                      F && Ze(F);
                      return;
                    }
                    if (p.key === "Escape") {
                      p.preventDefault(), R(!1);
                      return;
                    }
                    p.key === "Backspace" && $.length === 0 && Oe();
                  },
                  placeholder: b,
                  className: m(It({ variant: V, size: "s" }))
                }
              ) }) : null,
              /* @__PURE__ */ a(
                "div",
                {
                  id: `${le}-listbox`,
                  ref: pe,
                  role: "listbox",
                  "aria-multiselectable": o || void 0,
                  tabIndex: -1,
                  onKeyDown: Pt,
                  className: "max-h-60 overflow-auto p-1",
                  children: Be()
                }
              )
            ]
          }
        ) })
      ] })
    ] });
  }
);
va.displayName = "Select";
const Yo = I("flex flex-wrap items-center gap-3"), qo = I("flex items-center gap-1"), Xo = I("px-2 text-sm text_secondary"), Zo = I("text-sm text_secondary"), Qo = (e, t, r) => {
  const s = [];
  if (e <= 0) return s;
  const i = 0, o = e - 1, l = Math.max(t - r, i), d = Math.min(t + r, o);
  s.push(i), l > i + 1 && s.push("ellipsis");
  for (let c = l; c <= d; c += 1)
    c !== i && c !== o && s.push(c);
  return d < o - 1 && s.push("ellipsis"), o !== i && s.push(o), s;
}, Jo = () => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: "h-4 w-4",
    children: /* @__PURE__ */ a(
      "path",
      {
        d: "M10 4L6 8L10 12",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), ei = () => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: "h-4 w-4",
    children: /* @__PURE__ */ a(
      "path",
      {
        d: "M6 4L10 8L6 12",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
), wa = ({
  total: e,
  pageSize: t,
  pageIndex: r,
  onPageChange: s,
  onPageSizeChange: i,
  pageSizeSuffix: o = "",
  pageSizeOptions: l = [10, 20, 50, 100],
  showSizeSelector: d,
  showTotal: c = !0,
  siblingCount: u = 1,
  renderTotal: f,
  className: _
}) => {
  const b = Math.max(1, Math.ceil(e / t)), g = Math.min(Math.max(r, 0), b - 1), k = d ?? !!i, w = Qo(b, g, u), N = e === 0 ? 0 : g * t + 1, x = e === 0 ? 0 : Math.min(e, (g + 1) * t);
  return /* @__PURE__ */ y("div", { "data-slot": "pagination", className: m(Yo(), _), children: [
    c ? /* @__PURE__ */ a("span", { className: m(Zo()), children: f ? f(N, x, e) : `Showing ${N}-${x} of ${e}` }) : null,
    /* @__PURE__ */ y("div", { className: m(qo()), children: [
      /* @__PURE__ */ a(
        Me,
        {
          variant: "subtle",
          size: "s",
          "aria-label": "Previous page",
          disabled: g === 0,
          onClick: () => s(g - 1),
          children: /* @__PURE__ */ a(Jo, {})
        }
      ),
      w.map(
        (h, v) => h === "ellipsis" ? /* @__PURE__ */ a("span", { className: m(Xo()), children: "..." }, `ellipsis-${v}`) : /* @__PURE__ */ a(
          Me,
          {
            variant: "subtle",
            size: "s",
            "aria-label": `Page ${h + 1}`,
            "aria-current": h === g ? "page" : void 0,
            onClick: () => s(h),
            className: m(h === g && "bg_quaternary text_primary font-semibold"),
            children: h + 1
          },
          h
        )
      ),
      /* @__PURE__ */ a(
        Me,
        {
          variant: "subtle",
          size: "s",
          "aria-label": "Next page",
          disabled: g === b - 1,
          onClick: () => s(g + 1),
          children: /* @__PURE__ */ a(ei, {})
        }
      )
    ] }),
    k && i ? /* @__PURE__ */ a(
      va,
      {
        options: l.map((h) => ({
          value: String(h),
          label: o ? `${h} ${o}` : String(h)
        })),
        value: String(t),
        onValueChange: (h) => {
          if (Array.isArray(h)) return;
          const v = Number(h);
          Number.isNaN(v) || i(v);
        },
        placeholder: "Size",
        size: "s",
        className: "w-auto min-w-[72px]"
      }
    ) : null
  ] });
};
wa.displayName = "Pagination";
const ka = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      "data-slot": "skeleton",
      className: m("animate-pulse state_bg_primary_medium radius_6", e),
      ...t
    }
  )
);
ka.displayName = "Skeleton";
const ti = I("relative w-full", {
  variants: {
    bordered: {
      true: "overflow-hidden border border_secondary radius_8",
      false: ""
    }
  },
  defaultVariants: {
    bordered: !1
  }
}), ri = I("w-full overflow-auto"), ai = I("w-full border-collapse text-sm"), si = I("bg_primary", {
  variants: {
    sticky: {
      true: "sticky top-0 z-20",
      false: ""
    }
  },
  defaultVariants: {
    sticky: !1
  }
}), ni = I(
  "border-b border_secondary text-xs font-semibold uppercase text_secondary",
  {
    variants: {
      size: {
        default: "px-4 py-3",
        compact: "px-3 py-1.5"
      },
      bordered: {
        true: "border-x border_secondary",
        false: ""
      },
      pinned: {
        false: "",
        left: "sticky left-0 z-[3] bg_primary shadow-[inset_-1px_0_0_0_var(--border-secondary)]",
        right: "sticky right-0 z-[3] bg_primary shadow-[inset_1px_0_0_0_var(--border-secondary)]"
      },
      resizable: {
        true: "relative",
        false: ""
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right"
      }
    },
    defaultVariants: {
      size: "default",
      bordered: !1,
      pinned: !1,
      resizable: !1,
      align: "left"
    }
  }
), zt = I("bg_primary hover:state_bg_primary_soft", {
  variants: {
    striped: {
      true: "bg_canvas_primary",
      false: ""
    },
    selected: {
      true: "bg_accent_primary/10",
      false: ""
    }
  },
  defaultVariants: {
    striped: !1,
    selected: !1
  }
}), Rt = I("border-b border_secondary text_primary", {
  variants: {
    size: {
      default: "px-4 py-3",
      compact: "px-3 py-1.5"
    },
    bordered: {
      true: "border-x border_secondary",
      false: ""
    },
    pinned: {
      false: "",
      left: "sticky left-0 z-[2] shadow-[inset_-1px_0_0_0_var(--border-secondary)]",
      right: "sticky right-0 z-[2] shadow-[inset_1px_0_0_0_var(--border-secondary)]"
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    }
  },
  defaultVariants: {
    size: "default",
    bordered: !1,
    pinned: !1,
    align: "left"
  }
}), wr = I(
  "border-t border_secondary bg_secondary text_primary",
  {
    variants: {
      size: {
        default: "px-4 py-3",
        compact: "px-3 py-1.5"
      },
      bordered: {
        true: "border-x border_secondary",
        false: ""
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right"
      }
    },
    defaultVariants: {
      size: "default",
      bordered: !1,
      align: "left"
    }
  }
), oi = I("flex w-full items-center justify-end", {
  variants: {
    position: {
      top: "mb-3",
      bottom: "mt-3"
    }
  },
  defaultVariants: {
    position: "bottom"
  }
});
function kr(e) {
  return typeof e == "string" ? e : "";
}
function Nr(e) {
  return Array.isArray(e) ? e.filter((t) => typeof t == "string") : [];
}
function ii({
  columnId: e,
  filterType: t = "text",
  options: r,
  value: s,
  onApply: i,
  onReset: o
}) {
  const [l, d] = n.useState(!1), [c, u] = n.useState(() => kr(s)), [f, _] = n.useState(() => Nr(s));
  n.useEffect(() => {
    if (t === "text") {
      u(kr(s));
      return;
    }
    _(Nr(s));
  }, [t, s]);
  const b = n.useMemo(() => t === "text" ? c.trim().length > 0 ? 1 : 0 : f.length, [f.length, c, t]), g = n.useCallback(() => {
    if (t === "text") {
      const w = c.trim();
      u(w), i(w);
    } else
      i(f);
    d(!1);
  }, [f, c, t, i]), k = n.useCallback((w, N) => {
    _((x) => w ? x.includes(N) ? x : [...x, N] : x.filter((h) => h !== N));
  }, []);
  return /* @__PURE__ */ a(
    er,
    {
      open: l,
      onOpenChange: d,
      trigger: /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          "aria-label": `Filter ${e}`,
          className: "relative inline-flex cursor-pointer items-center justify-center rounded-sm p-1 text_secondary hover:bg_secondary hover:text_primary",
          children: [
            /* @__PURE__ */ a(Ea, { className: "h-3.5 w-3.5" }),
            b > 0 ? /* @__PURE__ */ a("span", { className: "absolute -right-1 -top-1 inline-flex min-w-4 items-center justify-center rounded-full bg_accent_primary px-1 text-[10px] font-semibold leading-none text_primary", children: b }) : null
          ]
        }
      ),
      align: "start",
      sideOffset: 10,
      className: "w-64 p-3",
      children: /* @__PURE__ */ y("div", { "data-slot": "data-table-filter-dropdown", className: "flex flex-col gap-3", children: [
        t === "text" ? /* @__PURE__ */ a(
          ma,
          {
            size: "s",
            value: c,
            placeholder: `Filter ${e}`,
            onChange: (w) => {
              u(w.target.value);
            }
          }
        ) : /* @__PURE__ */ y("div", { className: "max-h-48 space-y-2 overflow-auto pr-1", children: [
          r?.map((w) => /* @__PURE__ */ a(
            Vt,
            {
              size: "sm",
              label: w.label,
              checked: f.includes(w.value),
              onCheckedChange: (N) => {
                k(N === !0, w.value);
              }
            },
            w.value
          )),
          r?.length ? null : /* @__PURE__ */ a("p", { className: "text-xs text_secondary", children: "No filters" })
        ] }),
        /* @__PURE__ */ y("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ a(
            Me,
            {
              size: "s",
              variant: "subtle",
              onClick: () => {
                t === "text" ? u("") : _([]), o(), d(!1);
              },
              children: "Reset"
            }
          ),
          /* @__PURE__ */ a(Me, { size: "s", variant: "primary", onClick: g, children: "Apply" })
        ] })
      ] })
    }
  );
}
const li = ({ state: e, className: t }) => e === "asc" ? /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: m("h-4 w-4 icon_secondary", t),
    children: /* @__PURE__ */ a("path", { d: "M8 4L12 8H4L8 4Z", fill: "currentColor" })
  }
) : e === "desc" ? /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: m("h-4 w-4 icon_secondary", t),
    children: /* @__PURE__ */ a("path", { d: "M8 12L4 8H12L8 12Z", fill: "currentColor" })
  }
) : /* @__PURE__ */ y(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: m("h-4 w-4 icon_tertiary", t),
    children: [
      /* @__PURE__ */ a("path", { d: "M8 3L11 6H5L8 3Z", fill: "currentColor" }),
      /* @__PURE__ */ a("path", { d: "M8 13L5 10H11L8 13Z", fill: "currentColor" })
    ]
  }
);
function ci(e) {
  const t = e[0];
  return t ? {
    key: t.id,
    direction: t.desc ? "desc" : "asc"
  } : null;
}
function Cr(e) {
  return typeof e == "number" ? `${e}px` : e;
}
function Sr(e) {
  const t = {};
  if (!e?.length)
    return t;
  for (const r of e)
    t[r] = !0;
  return t;
}
function di(e) {
  return e?.length ? Object.fromEntries(e.map((t) => [t, !0])) : {};
}
function ui(e, t) {
  return e === !0 ? t : Object.keys(e).filter((r) => e[r]);
}
function Na(e, t, r, s) {
  return s ? s(e, t) : r ? `${r}.${t}` : String(t);
}
function fi(e, t, r) {
  const s = /* @__PURE__ */ new Map(), i = (o, l) => {
    for (let d = 0; d < o.length; d += 1) {
      const c = o[d], u = Na(c, d, l, t);
      if (s.set(u, c), !r)
        continue;
      const f = r(c);
      f?.length && i(f, u);
    }
  };
  return i(e, void 0), s;
}
function zr(e, t) {
  return typeof e == "function" ? e({ column: t }) : e;
}
function Rr(e) {
  return e === "left" ? "left" : e === "right" ? "right" : !1;
}
function mi(e) {
  const t = {
    left: [],
    right: []
  }, r = (s) => {
    for (const i of s) {
      if (i.columns?.length) {
        r(i.columns);
        continue;
      }
      i.pin === "left" && (t.left ??= []).push(i.id), i.pin === "right" && (t.right ??= []).push(i.id);
    }
  };
  return r(e), t;
}
function Ca(e) {
  return e.some((t) => t.resizable === !0 ? !0 : t.columns?.length ? Ca(t.columns) : !1);
}
function Sa(e) {
  return e.map((t) => {
    if (t.columns?.length)
      return {
        id: t.id,
        header: ({ column: s }) => zr(t.header, s),
        columns: Sa(t.columns),
        meta: {
          align: "center",
          groupBorder: t.groupBorder
        }
      };
    const r = t.accessorKey;
    return {
      id: t.id,
      accessorFn: r ? (s) => s[r] : void 0,
      size: t.width,
      minSize: t.minWidth,
      maxSize: t.maxWidth,
      enableSorting: t.sortable ?? !1,
      enableColumnFilter: t.filterable ?? !1,
      enableResizing: t.resizable ?? !1,
      filterFn: (s, i, o) => {
        const l = s.getValue(i);
        if (t.filterType === "select") {
          const c = Array.isArray(o) ? o.filter((u) => typeof u == "string") : [];
          return c.length === 0 ? !0 : c.includes(String(l ?? ""));
        }
        const d = typeof o == "string" ? o.trim().toLowerCase() : "";
        return d ? String(l ?? "").toLowerCase().includes(d) : !0;
      },
      header: ({ column: s }) => {
        const i = zr(t.header, s), o = t.sortable ?? !1, l = t.filterable ?? !1, d = o ? /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            onClick: s.getToggleSortingHandler(),
            className: "inline-flex cursor-pointer items-center gap-1",
            children: [
              /* @__PURE__ */ a("span", { children: i }),
              /* @__PURE__ */ a(li, { state: s.getIsSorted(), className: "shrink-0" })
            ]
          }
        ) : /* @__PURE__ */ a("span", { children: i });
        return l ? /* @__PURE__ */ y("div", { className: "inline-flex items-center gap-2", children: [
          d,
          /* @__PURE__ */ a(
            ii,
            {
              columnId: s.id,
              filterType: t.filterType,
              options: t.filters,
              value: s.getFilterValue(),
              onApply: (c) => {
                if (typeof c == "string" && c.length === 0 || Array.isArray(c) && c.length === 0) {
                  s.setFilterValue(void 0);
                  return;
                }
                s.setFilterValue(c);
              },
              onReset: () => {
                s.setFilterValue(void 0);
              }
            }
          )
        ] }) : d;
      },
      cell: ({ row: s }) => {
        const i = r ? s.original[r] : s.getValue(t.id), o = {
          value: i,
          row: s.original,
          depth: s.depth,
          isExpanded: s.getIsExpanded(),
          canExpand: s.getCanExpand(),
          toggleExpand: () => {
            s.toggleExpanded();
          },
          rowIndex: s.index
        }, l = t.cell ? t.cell(s.original, o) : i;
        return t.expandTrigger ? /* @__PURE__ */ y("div", { className: "flex items-center gap-1.5", style: { paddingLeft: `${s.depth * 20}px` }, children: [
          s.getCanExpand() ? /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              className: "inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-sm hover:bg_secondary",
              "aria-label": s.getIsExpanded() ? "Collapse row" : "Expand row",
              onClick: s.getToggleExpandedHandler(),
              children: /* @__PURE__ */ a(
                Et,
                {
                  className: m(
                    "h-3.5 w-3.5 icon_tertiary transition-transform duration-150",
                    s.getIsExpanded() && "rotate-90"
                  )
                }
              )
            }
          ) : /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "inline-block h-5 w-5" }),
          /* @__PURE__ */ a("span", { children: l })
        ] }) : l;
      },
      meta: {
        align: t.align ?? "left",
        width: t.width,
        minWidth: t.minWidth,
        maxWidth: t.maxWidth,
        pin: t.pin,
        groupBorder: t.groupBorder,
        resizable: t.resizable
      }
    };
  });
}
function bl(e) {
  const {
    data: t,
    columns: r,
    getRowKey: s,
    loading: i = !1,
    emptyMessage: o = "No data",
    bordered: l = !1,
    striped: d = !1,
    size: c = "default",
    stickyHeader: u = !1,
    scroll: f,
    className: _,
    defaultSort: b,
    sort: g,
    onSortChange: k,
    multiSort: w = !1,
    onMultiSortChange: N,
    onFilterChange: x,
    rowSelection: h,
    expandable: v,
    getSubRows: j,
    defaultExpanded: V = !1,
    defaultExpandedRowIds: O,
    pagination: D,
    columnVisibility: T,
    onColumnVisibilityChange: C,
    summary: U,
    onRow: K,
    virtual: Y = !1
  } = e, se = h?.type ?? "checkbox", X = !!j, R = !!v?.expandedRowRender && !X, $ = D !== !1 && D !== void 0, Q = $ ? D.position ?? "bottom" : "bottom", S = n.useRef(null), [ie, B] = n.useState(() => b ? [
    {
      id: b.key,
      desc: b.direction === "desc"
    }
  ] : []), [H, A] = n.useState([]), [P, q] = n.useState(
    () => Sr(h?.defaultSelectedRowKeys)
  ), [G, J] = n.useState(() => {
    if (V)
      return !0;
    const z = /* @__PURE__ */ new Set();
    if (O?.length)
      for (const M of O)
        z.add(M);
    if (v?.defaultExpandedRowKeys?.length)
      for (const M of v.defaultExpandedRowKeys)
        z.add(M);
    return z.size > 0 ? Object.fromEntries(Array.from(z).map((M) => [M, !0])) : {};
  }), [W, de] = n.useState(
    () => T ?? {}
  ), oe = g !== void 0, ue = h?.selectedRowKeys !== void 0, pe = v?.expandedRowKeys !== void 0, le = T !== void 0, xe = n.useMemo(() => oe ? g ? [
    {
      id: g.key,
      desc: g.direction === "desc"
    }
  ] : [] : ie, [ie, oe, g]), ce = n.useMemo(() => ue ? Sr(h?.selectedRowKeys) : P, [P, ue, h?.selectedRowKeys]), be = n.useMemo(() => pe ? di(v?.expandedRowKeys) : G, [v?.expandedRowKeys, G, pe]), fe = n.useMemo(() => le ? T ?? {} : W, [T, W, le]), ke = n.useMemo(
    () => fi(t, s, j),
    [t, s, j]
  ), ye = n.useMemo(() => Array.from(ke.keys()), [ke]), Pe = n.useMemo(() => Sa(r), [r]), qe = n.useMemo(() => mi(r), [r]), Xe = n.useMemo(() => {
    if (!h)
      return null;
    const z = h.columnWidth ?? 48;
    return se === "radio" ? {
      id: "__select",
      header: () => null,
      cell: ({ row: M }) => /* @__PURE__ */ a("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          role: "radio",
          "aria-checked": M.getIsSelected(),
          "aria-label": `Select row ${M.id}`,
          disabled: !M.getCanSelect(),
          "data-state": M.getIsSelected() ? "checked" : "unchecked",
          className: m(ya({ size: "sm" }), "cursor-pointer"),
          onClick: M.getCanSelect() ? () => M.toggleSelected(!0) : void 0
        }
      ) }),
      size: z,
      minSize: z,
      maxSize: z,
      enableSorting: !1,
      enableColumnFilter: !1,
      enableResizing: !1,
      meta: {
        align: "center",
        width: z,
        minWidth: z,
        maxWidth: z
      }
    } : {
      id: "__select",
      header: ({ table: M }) => /* @__PURE__ */ a("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ a(
        Vt,
        {
          size: "sm",
          "aria-label": "Select all rows",
          checked: M.getIsAllRowsSelected() ? !0 : M.getIsSomeRowsSelected() ? "indeterminate" : !1,
          onCheckedChange: (ne) => {
            M.toggleAllRowsSelected(ne === !0);
          }
        }
      ) }),
      cell: ({ row: M }) => /* @__PURE__ */ a("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ a(
        Vt,
        {
          size: "sm",
          "aria-label": `Select row ${M.id}`,
          checked: M.getIsSelected(),
          disabled: !M.getCanSelect(),
          onCheckedChange: (ne) => {
            M.toggleSelected(ne === !0);
          }
        }
      ) }),
      size: z,
      minSize: z,
      maxSize: z,
      enableSorting: !1,
      enableColumnFilter: !1,
      enableResizing: !1,
      meta: {
        align: "center",
        width: z,
        minWidth: z,
        maxWidth: z
      }
    };
  }, [h, se]), at = n.useMemo(() => {
    if (!R)
      return null;
    const z = v?.expandColumnWidth ?? 48;
    return {
      id: "__expand",
      header: () => null,
      cell: ({ row: M }) => M.getCanExpand() ? /* @__PURE__ */ a("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          className: "inline-flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm hover:bg_secondary",
          "aria-label": M.getIsExpanded() ? "Collapse row" : "Expand row",
          onClick: M.getToggleExpandedHandler(),
          children: /* @__PURE__ */ a(
            Et,
            {
              className: m(
                "h-3.5 w-3.5 icon_tertiary transition-transform duration-150",
                M.getIsExpanded() && "rotate-90"
              )
            }
          )
        }
      ) }) : null,
      size: z,
      minSize: z,
      maxSize: z,
      enableSorting: !1,
      enableColumnFilter: !1,
      enableResizing: !1,
      meta: {
        align: "center",
        width: z,
        minWidth: z,
        maxWidth: z
      }
    };
  }, [v?.expandColumnWidth, R]), _t = n.useMemo(() => {
    const z = [...Pe];
    return at && z.unshift(at), Xe && z.unshift(Xe), z;
  }, [Pe, at, Xe]), Ie = n.useMemo(
    () => Object.fromEntries(H.map((z) => [z.id, z.value])),
    [H]
  ), ee = n.useRef(x);
  n.useLayoutEffect(() => {
    ee.current = x;
  });
  const st = n.useRef(!1), Ve = n.useMemo(() => {
    if (!(!$ || !D))
      return {
        pageIndex: D.pageIndex,
        pageSize: D.pageSize
      };
  }, [$, D]), je = $ && !!D && D.manual === !0, Ne = n.useMemo(() => Ca(r), [r]);
  n.useEffect(() => {
    if (!st.current) {
      st.current = !0;
      return;
    }
    ee.current?.(Ie);
  }, [Ie]);
  const yt = n.useCallback(
    (z) => {
      const M = ct(z, xe), ne = w ? M : M.length > 0 ? [M[0]] : [];
      oe || B(ne), k?.(ci(ne)), N?.(
        ne.map((we) => ({
          key: we.id,
          direction: we.desc ? "desc" : "asc"
        }))
      );
    },
    [oe, w, N, k, xe]
  ), Ze = n.useCallback(
    (z) => {
      const M = ct(z, ce);
      if (ue || q(M), !h?.onChange)
        return;
      const ne = Object.keys(M).filter((ge) => M[ge]), we = ne.map((ge) => ke.get(ge)).filter((ge) => ge !== void 0);
      h.onChange(ne, we);
    },
    [ue, ke, h, ce]
  ), Fe = n.useCallback(
    (z) => {
      const M = ct(z, be);
      pe || J(M), v?.onExpandedRowsChange?.(ui(M, ye));
    },
    [ye, v, be, pe]
  ), nt = n.useCallback(
    (z) => {
      if (!D || !Ve)
        return;
      const M = ct(z, Ve);
      D.onChange(M.pageIndex, M.pageSize);
    },
    [D, Ve]
  ), ot = n.useCallback(
    (z) => {
      const M = ct(z, fe);
      le || de(M), C?.(M);
    },
    [fe, le, C]
  ), Oe = Ua({
    data: t,
    columns: _t,
    state: {
      sorting: xe,
      columnFilters: H,
      rowSelection: ce,
      expanded: be,
      columnPinning: qe,
      pagination: Ve,
      columnVisibility: fe
    },
    onSortingChange: yt,
    onColumnFiltersChange: A,
    onRowSelectionChange: h ? Ze : void 0,
    onExpandedChange: R || X ? Fe : void 0,
    onPaginationChange: $ ? nt : void 0,
    onColumnVisibilityChange: ot,
    enableSortingRemoval: !0,
    enableMultiSort: w,
    isMultiSortEvent: (z) => !w || !z || typeof z != "object" ? !1 : "shiftKey" in z && !!z.shiftKey,
    enableColumnResizing: Ne,
    columnResizeMode: "onChange",
    enableRowSelection: h ? (z) => h.getCheckboxProps?.(z.original)?.disabled !== !0 : !1,
    enableMultiRowSelection: se !== "radio",
    getRowCanExpand: R || X ? (z) => X ? (j?.(z.original)?.length ?? 0) > 0 : v?.rowExpandable ? v.rowExpandable(z.original) : R : void 0,
    getCoreRowModel: Za(),
    getFilteredRowModel: Xa(),
    getSortedRowModel: qa(),
    getExpandedRowModel: Ya(),
    getPaginationRowModel: $ ? Ka() : void 0,
    getSubRows: j ? (z) => j(z) : void 0,
    getRowId: (z, M, ne) => Na(z, M, ne?.id, s),
    manualPagination: je,
    pageCount: $ && D ? Math.max(1, Math.ceil(D.total / D.pageSize)) : void 0
  }), $e = Oe.getRowModel().rows, xt = Oe.getHeaderGroups(), Pt = xt.length, Se = Oe.getVisibleLeafColumns().length, Be = Y && f?.y !== void 0 && !R, it = Kt({
    count: $e.length,
    getScrollElement: () => S.current,
    estimateSize: () => c === "compact" ? 36 : 48,
    overscan: 5,
    enabled: Be
  }), Ee = Be ? it.getVirtualItems() : [], p = Be && Ee.length > 0 ? Ee[0].start : 0, F = Be && Ee.length > 0 ? it.getTotalSize() - Ee[Ee.length - 1].end : 0;
  let re = null;
  try {
    re = U?.(t);
  } catch {
  }
  const te = {}, ze = {};
  f?.x !== void 0 && (ze.minWidth = Cr(f.x)), f?.y !== void 0 && (te.maxHeight = Cr(f.y), te.overflowY = "auto");
  const He = (z) => !$ || !D || !(Q === z || Q === "both") ? null : /* @__PURE__ */ a(
    "div",
    {
      "data-slot": "data-table-pagination",
      className: m(oi({ position: z })),
      children: /* @__PURE__ */ a(
        wa,
        {
          total: D.total,
          pageSize: D.pageSize,
          pageIndex: D.pageIndex,
          onPageChange: (M) => {
            D.onChange(M, D.pageSize);
          },
          onPageSizeChange: (M) => {
            D.onChange(0, M);
          },
          pageSizeOptions: D.pageSizeOptions,
          showSizeSelector: D.showSizeSelector,
          showTotal: D.showTotal
        }
      )
    }
  ), sr = (z, M) => {
    const ne = K?.(z.original), we = d && M % 2 === 1;
    return /* @__PURE__ */ y(n.Fragment, { children: [
      /* @__PURE__ */ a(
        "tr",
        {
          "data-slot": "data-table-row",
          className: m(
            zt({
              striped: we,
              selected: z.getIsSelected()
            }),
            ne?.onClick && "cursor-pointer"
          ),
          ...ne,
          children: z.getVisibleCells().map((ge) => {
            const Ge = Rr(ge.column.getIsPinned()), lt = ge.column.columnDef.meta ?? {}, Re = ge.column.getSize(), We = {
              width: Re,
              minWidth: Re
            };
            Ge === "left" && (We.position = "sticky", We.left = ge.column.getStart("left"), We.zIndex = 2), Ge === "right" && (We.position = "sticky", We.right = ge.column.getAfter("right"), We.zIndex = 2);
            const Ia = Ge ? z.getIsSelected() ? "bg_accent_primary/10" : we ? "bg_canvas_primary" : "bg_primary" : "";
            return /* @__PURE__ */ a(
              "td",
              {
                "data-slot": "data-table-cell",
                className: m(
                  Rt({
                    size: c,
                    bordered: l,
                    align: lt.align ?? "left",
                    pinned: Ge
                  }),
                  Ia,
                  lt.groupBorder && "border-r border_secondary"
                ),
                style: We,
                children: cr(ge.column.columnDef.cell, ge.getContext())
              },
              ge.id
            );
          })
        }
      ),
      R && z.getIsExpanded() && v?.expandedRowRender ? /* @__PURE__ */ a("tr", { "data-slot": "data-table-row", className: m(zt()), children: /* @__PURE__ */ a(
        "td",
        {
          "data-slot": "data-table-cell",
          colSpan: Se || 1,
          className: m(Rt({ size: c, bordered: l })),
          children: v.expandedRowRender(z.original, z.depth)
        }
      ) }) : null
    ] }, z.id);
  };
  return /* @__PURE__ */ y("div", { "data-slot": "data-table", className: m(ti({ bordered: l }), _), children: [
    He("top"),
    /* @__PURE__ */ a(
      "div",
      {
        ref: S,
        "data-slot": "data-table-scroll-container",
        className: m(ri()),
        style: te,
        children: /* @__PURE__ */ y("table", { className: m(ai()), style: ze, children: [
          /* @__PURE__ */ a("thead", { className: m(si({ sticky: u })), children: xt.map((z) => /* @__PURE__ */ a("tr", { children: z.headers.map((M) => {
            if (M.isPlaceholder)
              return null;
            const ne = M.subHeaders.length > 0, we = ne ? void 0 : Math.max(Pt - M.depth, 1), ge = Rr(M.column.getIsPinned()), Ge = M.column.columnDef.meta ?? {}, lt = M.getSize(), Re = {
              width: lt,
              minWidth: lt
            };
            return ge === "left" && (Re.position = "sticky", Re.left = M.column.getStart("left"), Re.zIndex = u ? 5 : 3), ge === "right" && (Re.position = "sticky", Re.right = M.column.getAfter("right"), Re.zIndex = u ? 5 : 3), /* @__PURE__ */ y(
              "th",
              {
                "data-slot": "data-table-header-cell",
                colSpan: M.colSpan > 1 ? M.colSpan : void 0,
                rowSpan: we && we > 1 ? we : void 0,
                className: m(
                  ni({
                    size: c,
                    bordered: l,
                    align: ne ? "center" : Ge.align ?? "left",
                    pinned: ge,
                    resizable: M.column.getCanResize() && !ne
                  }),
                  ne && "border-x border_secondary",
                  Ge.groupBorder && "border-r border_secondary"
                ),
                style: Re,
                children: [
                  cr(M.column.columnDef.header, M.getContext()),
                  M.column.getCanResize() && !ne ? /* @__PURE__ */ a(
                    "div",
                    {
                      onMouseDown: M.getResizeHandler(),
                      onTouchStart: M.getResizeHandler(),
                      className: m(
                        "absolute right-0 top-0 h-full w-1 cursor-col-resize select-none touch-none bg_accent_primary opacity-0 hover:opacity-100",
                        M.column.getIsResizing() && "opacity-100"
                      )
                    }
                  ) : null
                ]
              },
              M.id
            );
          }) }, z.id)) }),
          /* @__PURE__ */ a("tbody", { children: i ? Array.from(
            { length: $ && D ? D.pageSize : 5 },
            (z, M) => /* @__PURE__ */ a(
              "tr",
              {
                "data-slot": "data-table-row",
                className: m(zt()),
                children: Oe.getVisibleLeafColumns().map((ne) => {
                  const we = ne.columnDef.meta ?? {};
                  return /* @__PURE__ */ a(
                    "td",
                    {
                      "data-slot": "data-table-cell",
                      className: m(
                        Rt({ size: c, bordered: l, align: we.align ?? "left" })
                      ),
                      children: /* @__PURE__ */ a(ka, { className: "h-4 w-full" })
                    },
                    ne.id
                  );
                })
              },
              `skeleton-${M}`
            )
          ) : $e.length === 0 ? /* @__PURE__ */ a("tr", { "data-slot": "data-table-row", className: m(zt()), children: /* @__PURE__ */ a(
            "td",
            {
              "data-slot": "data-table-empty",
              colSpan: Se || 1,
              className: m(
                Rt({ size: c, bordered: l }),
                "text-center text_secondary"
              ),
              children: o
            }
          ) }) : Be ? /* @__PURE__ */ y(Ce, { children: [
            p > 0 ? /* @__PURE__ */ a("tr", { "data-slot": "data-table-row", children: /* @__PURE__ */ a(
              "td",
              {
                "data-slot": "data-table-cell",
                colSpan: Se || 1,
                style: { height: p },
                className: "border-0 p-0"
              }
            ) }) : null,
            Ee.map(
              (z) => sr($e[z.index], z.index)
            ),
            F > 0 ? /* @__PURE__ */ a("tr", { "data-slot": "data-table-row", children: /* @__PURE__ */ a(
              "td",
              {
                "data-slot": "data-table-cell",
                colSpan: Se || 1,
                style: { height: F },
                className: "border-0 p-0"
              }
            ) }) : null
          ] }) : $e.map((z, M) => sr(z, M)) }),
          re ? /* @__PURE__ */ a("tfoot", { "data-slot": "data-table-summary", children: Array.isArray(re) ? /* @__PURE__ */ a("tr", { "data-slot": "data-table-row", children: re.map((z, M) => /* @__PURE__ */ a(
            "td",
            {
              "data-slot": "data-table-cell",
              className: m(wr({ size: c, bordered: l })),
              children: z
            },
            `summary-${M}`
          )) }) : n.isValidElement(re) ? re : /* @__PURE__ */ a("tr", { "data-slot": "data-table-row", children: /* @__PURE__ */ a(
            "td",
            {
              "data-slot": "data-table-cell",
              colSpan: Se || 1,
              className: m(wr({ size: c, bordered: l })),
              children: re
            }
          ) }) }) : null
        ] })
      }
    ),
    He("bottom")
  ] });
}
const pi = I("flex-1 overflow-hidden bg_canvas_tertiary radius_round", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3"
    }
  },
  defaultVariants: {
    size: "md"
  }
}), gi = I(
  "h-full radius_round transition-[width] duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg_accent_primary",
        success: "bg_success_contrast",
        warning: "bg_warning_contrast",
        error: "bg_error_contrast"
      },
      indeterminate: {
        true: "w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite]",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      indeterminate: !1
    }
  }
), hi = (e, t, r) => Math.min(Math.max(e, t), r), bi = n.forwardRef(
  ({
    className: e,
    value: t,
    max: r = 100,
    indeterminate: s = !1,
    size: i = "md",
    variant: o = "default",
    showLabel: l = !1,
    label: d,
    ...c
  }, u) => {
    const f = r <= 0 ? 100 : r, _ = s ? 0 : hi(t ?? 0, 0, f), b = _ / f * 100, g = d ?? `${Math.round(b)}%`;
    return /* @__PURE__ */ y(
      "div",
      {
        ref: u,
        "data-slot": "progress",
        className: m("flex items-center gap-2", e),
        ...c,
        children: [
          /* @__PURE__ */ a(
            "div",
            {
              "data-slot": "progress-track",
              role: "progressbar",
              "aria-valuemin": 0,
              "aria-valuemax": f,
              "aria-valuenow": s ? void 0 : _,
              "aria-label": l ? g : "Progress",
              className: m(pi({ size: i })),
              children: /* @__PURE__ */ a(
                "div",
                {
                  "data-slot": "progress-fill",
                  className: m(gi({ variant: o, indeterminate: s })),
                  style: s ? void 0 : { width: `${b}%` }
                }
              )
            }
          ),
          l ? /* @__PURE__ */ a("span", { className: "text-sm text_secondary", children: g }) : null
        ]
      }
    );
  }
);
bi.displayName = "Progress";
const _i = I("relative overflow-hidden"), Mr = I(
  "flex touch-none select-none transition-colors duration-0",
  {
    variants: {
      orientation: {
        vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",
        horizontal: "h-2.5 flex-col border-t border-t-transparent p-[1px]"
      }
    },
    defaultVariants: { orientation: "vertical" }
  }
), Dr = I(
  "relative flex-1 radius_round bg_quaternary hover:bg_tertiary transition-colors duration-0"
), Tt = n.forwardRef(({ className: e, children: t, orientation: r = "vertical", viewportClassName: s, ...i }, o) => /* @__PURE__ */ y(
  Ue.Root,
  {
    ref: o,
    "data-slot": "scroll-area",
    className: m(_i(), e),
    ...i,
    children: [
      /* @__PURE__ */ a(
        Ue.Viewport,
        {
          "data-slot": "scroll-area-viewport",
          className: m("h-full w-full rounded-[inherit]", s),
          children: t
        }
      ),
      (r === "vertical" || r === "both") && /* @__PURE__ */ a(
        Ue.Scrollbar,
        {
          orientation: "vertical",
          className: Mr({ orientation: "vertical" }),
          children: /* @__PURE__ */ a(Ue.Thumb, { className: Dr() })
        }
      ),
      (r === "horizontal" || r === "both") && /* @__PURE__ */ a(
        Ue.Scrollbar,
        {
          orientation: "horizontal",
          className: Mr({ orientation: "horizontal" }),
          children: /* @__PURE__ */ a(Ue.Thumb, { className: Dr() })
        }
      ),
      /* @__PURE__ */ a(Ue.Corner, {})
    ]
  }
));
Tt.displayName = "ScrollArea";
const yi = I(
  "flex h-[34px] items-center w-full radius_6 body_s font-normal transition-colors duration-0 cursor-pointer focus-visible:outline_orange_focus focus-visible:outline-none",
  {
    variants: {
      active: {
        true: "state_bg_sidebar_primary_soft fg_sidebar_primary",
        false: "fg_sidebar_secondary hover:state_bg_sidebar_primary_subtle"
      }
    },
    defaultVariants: {
      active: !1
    }
  }
), Ir = I(
  "flex h-[34px] items-center w-full pl-8 pr-1.5 gap-2 radius_6 body_s font-normal transition-colors duration-0 cursor-pointer focus-visible:outline_orange_focus focus-visible:outline-none",
  {
    variants: {
      active: {
        true: "state_bg_sidebar_primary_soft fg_sidebar_primary",
        false: "fg_sidebar_secondary hover:state_bg_sidebar_primary_subtle"
      }
    },
    defaultVariants: {
      active: !1
    }
  }
), xi = "232px", vi = "56px", De = n.createContext({
  collapsed: !1,
  toggle: () => {
  },
  collapseMode: "collapse"
}), rr = n.forwardRef(
  ({ isHideWhenSidebarOpen: e = !1, className: t, icon: r }, s) => {
    const { collapsed: i, toggle: o } = n.useContext(De);
    return e && !i ? null : /* @__PURE__ */ a(
      "button",
      {
        ref: s,
        type: "button",
        "data-slot": "sidebar-trigger",
        onClick: o,
        "aria-label": i ? "Expand sidebar" : "Collapse sidebar",
        "aria-expanded": !i,
        className: m(
          "inline-flex items-center justify-center w-6 h-6 radius_6 flex-shrink-0",
          "text_tertiary hover:text_primary hover:state_bg_button_tertiary_soft",
          "transition-colors duration-150 cursor-pointer",
          t
        ),
        children: r ?? (i ? /* @__PURE__ */ a(Aa, { className: "w-4 h-4" }) : /* @__PURE__ */ a(Pa, { className: "w-4 h-4" }))
      }
    );
  }
), za = n.forwardRef(
  ({
    defaultCollapsed: e = !1,
    collapsed: t,
    onCollapsedChange: r,
    collapseMode: s = "collapse",
    className: i,
    style: o,
    children: l,
    ...d
  }, c) => {
    const [u, f] = n.useState(e), _ = t !== void 0, b = _ ? t : u, g = n.useCallback(() => {
      const k = !b;
      _ || f(k), r?.(k);
    }, [b, _, r]);
    return /* @__PURE__ */ a(De.Provider, { value: { collapsed: b, toggle: g, collapseMode: s }, children: /* @__PURE__ */ a(
      "aside",
      {
        ref: c,
        "data-slot": "sidebar",
        "data-collapsed": b,
        style: {
          "--sidebar-width": xi,
          "--sidebar-collapsed-width": vi,
          width: b && s === "hide" ? 0 : b ? "var(--sidebar-collapsed-width)" : "var(--sidebar-width)",
          ...o
        },
        className: m(
          "shrink-0 flex flex-col h-screen sticky top-0",
          "bg_sidebar_primary border-r border_primary",
          "transition-all duration-200 overflow-hidden",
          b && s === "hide" ? "border-r-0" : "",
          i
        ),
        ...d,
        children: l
      }
    ) });
  }
), wi = n.forwardRef(
  ({ logo: e, title: t, className: r, children: s, ...i }, o) => {
    const { collapsed: l } = n.useContext(De);
    return /* @__PURE__ */ a(
      "div",
      {
        ref: o,
        "data-slot": "sidebar-header",
        className: m(
          "shrink-0 flex h-11 items-center py-0",
          "hover:state_bg_sidebar_primary_subtle radius_6 cursor-pointer transition-colors",
          l ? "justify-center px-0 gap-0" : "gap-2 pl-5 pr-3",
          r
        ),
        ...i,
        children: s ?? /* @__PURE__ */ y(Ce, { children: [
          e && !l && /* @__PURE__ */ a("span", { className: "shrink-0 flex items-center justify-center", children: e }),
          /* @__PURE__ */ a(
            "div",
            {
              className: m(
                "overflow-hidden transition-all duration-200",
                l ? "w-0 opacity-0" : "flex-1 opacity-100"
              ),
              children: t && /* @__PURE__ */ a("p", { className: "text_primary body_s font_semibold truncate", children: t })
            }
          ),
          /* @__PURE__ */ a(rr, {})
        ] })
      }
    );
  }
), ki = n.forwardRef(
  ({ className: e, children: t, dir: r, ...s }, i) => {
    const { collapsed: o } = n.useContext(De), l = r;
    return o ? /* @__PURE__ */ a(
      Tt,
      {
        ref: i,
        "data-slot": "sidebar-content",
        className: m("flex-1", e),
        dir: l,
        ...s,
        children: /* @__PURE__ */ a("nav", { "aria-label": "Sidebar navigation", className: "p-2 space-y-3", children: t })
      }
    ) : /* @__PURE__ */ a(
      Tt,
      {
        ref: i,
        "data-slot": "sidebar-content",
        className: m("flex-1", e),
        dir: l,
        ...s,
        children: /* @__PURE__ */ a("nav", { "aria-label": "Sidebar navigation", className: "p-3 space-y-6", children: t })
      }
    );
  }
), Ra = n.forwardRef(
  ({ label: e, panel: t = !1, className: r, children: s, ...i }, o) => {
    const { collapsed: l } = n.useContext(De);
    return /* @__PURE__ */ y(
      "div",
      {
        ref: o,
        "data-slot": "sidebar-section",
        className: m("space-y-0.5", t && "bg_sidebar_secondary radius_8", r),
        ...i,
        children: [
          e && (l ? /* @__PURE__ */ a("hr", { className: "border_secondary my-1" }) : /* @__PURE__ */ a("p", { className: "fg_sidebar_secondary text-[10px] font-semibold uppercase tracking-wider px-2 mb-1", children: e })),
          s
        ]
      }
    );
  }
), Wt = n.forwardRef(
  ({
    icon: e,
    label: t,
    href: r,
    badge: s,
    dot: i = !1,
    active: o = !1,
    defaultOpen: l = !1,
    open: d,
    onOpenChange: c,
    alwaysOpen: u = !1,
    className: f,
    onClick: _,
    disabled: b,
    children: g,
    ...k
  }, w) => {
    const { collapsed: N } = n.useContext(De), x = n.Children.count(g) > 0, [h, v] = n.useState(u || l), j = d !== void 0, V = u ? !0 : j ? d : h, O = !e && N ? /* @__PURE__ */ a("span", { className: "inline-flex h-4 w-4 items-center justify-center radius_4 border border_secondary bg_primary text-[10px] font-semibold leading-none text_secondary", children: (t ?? "?").slice(0, 1).toUpperCase() }) : null, D = e ?? O, T = r ? "a" : "button", U = {
      ref: w,
      ...r ? {
        href: b ? void 0 : r,
        "aria-disabled": b || void 0,
        tabIndex: b ? -1 : void 0
      } : { type: "button", disabled: b },
      "data-slot": "sidebar-item",
      "data-active": o,
      title: N ? t : void 0,
      "aria-current": o ? "page" : void 0,
      "aria-expanded": x && !N ? V : void 0,
      onClick: (K) => {
        if (b) {
          K.preventDefault(), K.stopPropagation();
          return;
        }
        if (x && !N && !u) {
          const Y = !V;
          j || v(Y), c?.(Y);
        }
        _?.(K);
      },
      className: m(
        yi({ active: o }),
        N ? "justify-center px-0 w-10 h-10 mx-auto" : "pl-3 pr-1.5 gap-2",
        f
      ),
      ...k
    };
    return /* @__PURE__ */ y("div", { "data-slot": "sidebar-item-wrapper", children: [
      n.createElement(
        T,
        U,
        /* @__PURE__ */ y(Ce, { children: [
          D && /* @__PURE__ */ y(
            "span",
            {
              className: m(
                "shrink-0 flex items-center justify-center w-4 h-4",
                N && i ? "relative" : "",
                e ? o ? "fg_sidebar_primary" : "fg_sidebar_secondary" : ""
              ),
              "aria-hidden": "true",
              children: [
                D,
                N && i && /* @__PURE__ */ a("span", { className: "absolute -top-0.5 -right-0.5 w-1.5 h-1.5 radius_round bg_error flex-shrink-0" })
              ]
            }
          ),
          !N && /* @__PURE__ */ y(Ce, { children: [
            /* @__PURE__ */ a("span", { className: "flex-1 text-left truncate", children: t }),
            s ? /* @__PURE__ */ a("span", { className: "flex-shrink-0", children: s }) : null,
            i ? /* @__PURE__ */ a("span", { className: "w-1.5 h-1.5 radius_round bg_error flex-shrink-0" }) : null,
            x && !u && /* @__PURE__ */ a(
              "svg",
              {
                viewBox: "0 0 16 16",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                "aria-hidden": "true",
                className: m(
                  "w-3.5 h-3.5 shrink-0 transition-transform duration-200",
                  V ? "rotate-180" : ""
                ),
                children: /* @__PURE__ */ a(
                  "path",
                  {
                    d: "M4 6L8 10L12 6",
                    stroke: "currentColor",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              }
            )
          ] })
        ] })
      ),
      x && /* @__PURE__ */ a(
        "div",
        {
          className: m(
            "grid transition-all duration-200",
            V && !N ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          ),
          "aria-label": t ? `${t} submenu` : void 0,
          children: /* @__PURE__ */ a("div", { className: "min-h-0 overflow-hidden pt-0.5 space-y-0.5", children: g })
        }
      )
    ] });
  }
), Ma = n.forwardRef(
  ({ icon: e, label: t, href: r, active: s = !1, disabled: i, className: o, onClick: l, ...d }, c) => {
    const { collapsed: u } = n.useContext(De);
    if (u) return null;
    const f = (_) => {
      if (i) {
        _.preventDefault(), _.stopPropagation();
        return;
      }
      l?.(_);
    };
    return r ? /* @__PURE__ */ y(
      "a",
      {
        ref: c,
        href: i ? void 0 : r,
        "data-slot": "sidebar-subitem",
        "data-active": s,
        "aria-current": s ? "page" : void 0,
        "aria-disabled": i || void 0,
        tabIndex: i ? -1 : void 0,
        onClick: f,
        className: m(Ir({ active: s }), o),
        children: [
          e && /* @__PURE__ */ a(
            "span",
            {
              className: m(
                "shrink-0 flex items-center justify-center w-4 h-4",
                s ? "fg_sidebar_primary" : "fg_sidebar_secondary"
              ),
              "aria-hidden": "true",
              children: e
            }
          ),
          /* @__PURE__ */ a("span", { className: "flex-1 text-left truncate", children: t })
        ]
      }
    ) : /* @__PURE__ */ y(
      "button",
      {
        ref: c,
        type: "button",
        disabled: i,
        "data-slot": "sidebar-subitem",
        "data-active": s,
        "aria-current": s ? "page" : void 0,
        onClick: f,
        className: m(Ir({ active: s }), o),
        ...d,
        children: [
          e && /* @__PURE__ */ a(
            "span",
            {
              className: m(
                "shrink-0 flex items-center justify-center w-4 h-4",
                s ? "fg_sidebar_primary" : "fg_sidebar_secondary"
              ),
              "aria-hidden": "true",
              children: e
            }
          ),
          /* @__PURE__ */ a("span", { className: "flex-1 text-left truncate", children: t })
        ]
      }
    );
  }
), Ni = n.forwardRef(
  ({ avatarSrc: e, avatarFallback: t, name: r, role: s, className: i, children: o, ...l }, d) => {
    const { collapsed: c } = n.useContext(De);
    return /* @__PURE__ */ a(
      "div",
      {
        ref: d,
        "data-slot": "sidebar-footer",
        className: m(
          "shrink-0 h-16",
          c ? "flex items-center justify-center p-3" : "flex items-center gap-1.5 px-4 pt-5 pb-3",
          i
        ),
        ...l,
        children: o ?? /* @__PURE__ */ y(Ce, { children: [
          /* @__PURE__ */ a(
            qt,
            {
              src: e,
              fallback: t,
              size: "s",
              type: e ? "image" : "text",
              className: "shrink-0"
            }
          ),
          !c && (r || s) && /* @__PURE__ */ y("div", { className: "flex-1 overflow-hidden", children: [
            r && /* @__PURE__ */ a("p", { className: "text_primary body_s font_semibold truncate", children: r }),
            s && /* @__PURE__ */ a("p", { className: "text_tertiary body_xs truncate", children: s })
          ] })
        ] })
      }
    );
  }
), Ci = ({ header: e }) => {
  const { collapsed: t } = n.useContext(De);
  return /* @__PURE__ */ y(
    "div",
    {
      "data-slot": "sidebar-header",
      className: m(
        "shrink-0 flex h-11 items-center gap-2 py-0",
        "hover:state_bg_sidebar_primary_subtle radius_6 cursor-pointer transition-colors",
        t ? "justify-center px-0" : "pl-5 pr-3"
      ),
      children: [
        e && !t ? /* @__PURE__ */ a("div", { className: "flex-1 overflow-hidden", children: e }) : null,
        /* @__PURE__ */ a(rr, { className: t ? "" : "ml-auto" })
      ]
    }
  );
}, Si = ({ children: e }) => {
  const { collapsed: t } = n.useContext(De);
  return /* @__PURE__ */ a(Tt, { "data-slot": "sidebar-content", className: "flex-1", children: /* @__PURE__ */ a(
    "nav",
    {
      "aria-label": "Sidebar navigation",
      className: m(t ? "p-2 space-y-3" : "p-3 space-y-6"),
      children: e
    }
  ) });
}, zi = ({ children: e }) => /* @__PURE__ */ a(
  "nav",
  {
    "data-slot": "sidebar-footer-groups",
    "aria-label": "Sidebar footer navigation",
    className: "shrink-0 bg_sidebar_secondary px-3 pb-2 space-y-4 pt-3",
    children: e
  }
), Ri = n.forwardRef(
  ({
    groups: e,
    footerGroups: t,
    onNavigate: r,
    activeId: s,
    header: i,
    footer: o,
    defaultCollapsed: l = !1,
    collapsed: d,
    onCollapsedChange: c,
    collapseMode: u = "collapse",
    children: f,
    className: _,
    contentClassName: b
  }, g) => {
    const k = n.useCallback(
      (N, x, h) => {
        r && (N.preventDefault(), r(x, h));
      },
      [r]
    ), w = n.useCallback(
      (N, x = !1) => /* @__PURE__ */ a(Ra, { label: x ? void 0 : N.label, children: N.items.map(
        (h) => h.children?.length ? /* @__PURE__ */ a(
          Wt,
          {
            icon: h.icon,
            label: h.label,
            href: h.href,
            active: s === h.id,
            badge: h.badge,
            dot: h.dot,
            disabled: h.disabled,
            defaultOpen: h.defaultOpen ?? h.children.some((v) => v.id === s),
            alwaysOpen: h.alwaysOpen,
            onClick: (v) => k(v, h.id, h.href),
            children: h.children.map((v) => /* @__PURE__ */ a(
              Ma,
              {
                icon: v.icon,
                label: v.label,
                href: v.href,
                active: s === v.id,
                disabled: v.disabled,
                onClick: (j) => k(j, v.id, v.href)
              },
              v.id
            ))
          },
          h.id
        ) : /* @__PURE__ */ a(
          Wt,
          {
            icon: h.icon,
            label: h.label,
            href: h.href,
            active: s === h.id,
            badge: h.badge,
            dot: h.dot,
            disabled: h.disabled,
            onClick: (v) => k(v, h.id, h.href)
          },
          h.id
        )
      ) }, N.id),
      [s, k]
    );
    return /* @__PURE__ */ y(
      "div",
      {
        ref: g,
        "data-slot": "block-sidebar-layout",
        className: m("flex h-screen overflow-hidden", _),
        children: [
          /* @__PURE__ */ y(
            za,
            {
              defaultCollapsed: l,
              collapsed: d,
              onCollapsedChange: c,
              collapseMode: u,
              className: "h-full",
              children: [
                /* @__PURE__ */ a(Ci, { header: i }),
                /* @__PURE__ */ a(Si, { children: e.map((N) => w(N)) }),
                t && t.length > 0 ? /* @__PURE__ */ a(zi, { children: t.map((N) => w(N, !0)) }) : null,
                o ? /* @__PURE__ */ a("div", { "data-slot": "sidebar-footer", className: "shrink-0 h-16 px-4 pt-5 pb-3", children: o }) : null
              ]
            }
          ),
          /* @__PURE__ */ a("div", { className: m("flex-1 overflow-auto", b), children: f })
        ]
      }
    );
  }
);
za.displayName = "Sidebar";
rr.displayName = "SidebarTrigger";
wi.displayName = "SidebarHeader";
ki.displayName = "SidebarContent";
Ra.displayName = "SidebarSection";
Wt.displayName = "SidebarItem";
Ma.displayName = "SidebarSubItem";
Ni.displayName = "SidebarFooter";
Ri.displayName = "BlockSidebarLayout";
const Mi = I(
  "flex items-center w-full radius_6 text-sm transition-colors duration-0 cursor-pointer [&_svg]:text-current",
  {
    variants: {
      active: {
        true: "state_neutral_soft text_primary font-medium",
        false: "text_secondary hover:state_neutral_soft"
      }
    },
    defaultVariants: {
      active: !1
    }
  }
), Di = n.forwardRef(
  ({
    groups: e,
    activeId: t,
    onNavigate: r,
    header: s,
    footer: i,
    alwaysExpanded: o = !1,
    expandedWidth: l = 200,
    collapsedWidth: d = 56,
    className: c,
    style: u,
    onMouseEnter: f,
    onMouseLeave: _,
    "aria-label": b = "Simple sidebar",
    ...g
  }, k) => {
    const [w, N] = n.useState(!1), x = n.useRef(null), h = o || w;
    return n.useEffect(() => () => {
      x.current && clearTimeout(x.current);
    }, []), n.useEffect(() => {
      o && (x.current && (clearTimeout(x.current), x.current = null), N(!1));
    }, [o]), /* @__PURE__ */ y(
      "aside",
      {
        ref: k,
        "data-slot": "simple-sidebar",
        "data-expanded": h,
        "aria-label": b,
        onMouseEnter: (v) => {
          x.current && (clearTimeout(x.current), x.current = null), f?.(v), !o && N(!0);
        },
        onMouseLeave: (v) => {
          _?.(v), x.current && (clearTimeout(x.current), x.current = null), !o && (x.current = setTimeout(() => {
            N(!1), x.current = null;
          }, 100));
        },
        style: {
          ...u,
          width: h ? l : d
        },
        className: m(
          "absolute left-0 top-0 h-full flex flex-col z-40",
          "bg-transparent",
          "transition-all duration-200 overflow-hidden",
          c
        ),
        ...g,
        children: [
          s ? /* @__PURE__ */ a(
            "div",
            {
              "data-slot": "simple-sidebar-header",
              className: "shrink-0 flex items-center justify-center overflow-hidden p-2",
              style: { width: d },
              children: s
            }
          ) : null,
          /* @__PURE__ */ a("div", { "data-slot": "simple-sidebar-content", className: "flex-1 overflow-y-auto flex flex-col", children: /* @__PURE__ */ a("div", { className: "px-2 space-y-1 my-auto", children: e.map((v, j) => /* @__PURE__ */ y("div", { "data-slot": "simple-sidebar-group", className: "space-y-1", children: [
            j > 0 ? /* @__PURE__ */ a(
              "hr",
              {
                "data-slot": "simple-sidebar-separator",
                className: "border_secondary my-1 mx-2"
              }
            ) : null,
            v.items.map((V) => {
              const O = t === V.id;
              return /* @__PURE__ */ y(
                "button",
                {
                  type: "button",
                  "data-slot": "simple-sidebar-item",
                  "data-active": O,
                  "aria-label": h ? void 0 : V.label,
                  "aria-current": O ? "page" : void 0,
                  disabled: V.disabled,
                  title: h ? void 0 : V.label,
                  onClick: () => r?.(V.id, V.href),
                  className: m(
                    Mi({ active: O }),
                    "h-10 px-2",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  ),
                  children: [
                    /* @__PURE__ */ a(
                      "span",
                      {
                        "data-slot": "simple-sidebar-item-icon",
                        className: "shrink-0 flex items-center justify-center w-6 h-6",
                        "aria-hidden": "true",
                        children: O && V.activeIcon ? V.activeIcon : V.icon
                      }
                    ),
                    /* @__PURE__ */ a(
                      "span",
                      {
                        "data-slot": "simple-sidebar-item-label",
                        "aria-hidden": !h,
                        className: m(
                          "text-left truncate overflow-hidden whitespace-nowrap transition-all duration-200 min-w-0 pl-2",
                          h ? "opacity-100 w-auto flex-1" : "opacity-0 w-0"
                        ),
                        children: V.label
                      }
                    )
                  ]
                },
                V.id
              );
            })
          ] }, v.id)) }) }),
          i ? /* @__PURE__ */ a(
            "div",
            {
              "data-slot": "simple-sidebar-footer",
              className: "shrink-0 flex items-center justify-center overflow-hidden p-2",
              style: { width: d },
              children: i
            }
          ) : null
        ]
      }
    );
  }
);
Di.displayName = "SimpleSidebar";
const Ii = I(
  "fixed inset-0 z-50 bg_backdrop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
), Vi = I(
  "fixed z-50 bg_primary flex flex-col transition ease-in-out duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        right: "inset-y-0 right-0 h-full border-l border_secondary data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
        left: "inset-y-0 left-0 h-full border-r border_secondary data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left",
        top: "inset-x-0 top-0 w-full border-b border_secondary data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 w-full border-t border_secondary data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom"
      },
      size: {
        s: "",
        m: "",
        l: ""
      }
    },
    compoundVariants: [
      { side: "left", size: "s", class: "w-full sm:w-80" },
      { side: "left", size: "m", class: "w-full sm:w-1/3 sm:min-w-80" },
      { side: "left", size: "l", class: "w-full sm:w-1/2 sm:min-w-80" },
      { side: "right", size: "s", class: "w-full sm:w-80" },
      { side: "right", size: "m", class: "w-full sm:w-1/3 sm:min-w-80" },
      { side: "right", size: "l", class: "w-full sm:w-1/2 sm:min-w-80" },
      { side: "bottom", size: "s", class: "h-auto" },
      { side: "bottom", size: "m", class: "h-1/3 min-h-40" },
      { side: "bottom", size: "l", class: "h-1/2 min-h-40" },
      { side: "top", size: "s", class: "h-auto" },
      { side: "top", size: "m", class: "h-auto" },
      { side: "top", size: "l", class: "h-auto" }
    ],
    defaultVariants: { side: "left", size: "m" }
  }
), _l = ae.Root, Ti = ae.Portal, Li = n.forwardRef(({ children: e, asChild: t = !0, ...r }, s) => /* @__PURE__ */ a(ae.Trigger, { ref: s, "data-slot": "drawer-trigger", asChild: t, ...r, children: e })), Ei = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(ae.Close, { ref: r, "data-slot": "drawer-close", className: m(e), ...t })), Da = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ae.Overlay,
  {
    ref: r,
    "data-slot": "drawer-overlay",
    className: m(Ii(), e),
    ...t
  }
)), Ai = n.forwardRef(
  ({ className: e, children: t, side: r = "left", size: s = "m", ...i }, o) => /* @__PURE__ */ y(Ti, { children: [
    /* @__PURE__ */ a(Da, {}),
    /* @__PURE__ */ a(
      ae.Content,
      {
        ref: o,
        "data-slot": "drawer-content",
        "data-side": r,
        className: m(Vi({ side: r, size: s }), e),
        ...i,
        children: t
      }
    )
  ] })
), Pi = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      "data-slot": "drawer-header",
      className: m(
        "flex items-center justify-between px-6 py-4 border-b border_secondary",
        e
      ),
      ...t
    }
  )
), ji = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ae.Title,
  {
    ref: r,
    "data-slot": "drawer-title",
    className: m("text-lg font-semibold text_primary", e),
    ...t
  }
)), Fi = n.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ a(
  ae.Description,
  {
    ref: r,
    "data-slot": "drawer-description",
    className: m("text-sm text_tertiary mt-1", e),
    ...t
  }
)), Oi = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      "data-slot": "drawer-body",
      className: m("flex-1 overflow-y-auto px-6 py-4", e),
      ...t
    }
  )
), $i = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ a(
    "div",
    {
      ref: r,
      "data-slot": "drawer-footer",
      className: m(
        "flex items-center justify-end gap-2 px-6 py-4 border-t border_secondary mt-auto",
        e
      ),
      ...t
    }
  )
);
Li.displayName = ae.Trigger.displayName;
Ei.displayName = ae.Close.displayName;
Da.displayName = ae.Overlay.displayName;
Ai.displayName = ae.Content.displayName;
Pi.displayName = "DrawerHeader";
ji.displayName = ae.Title.displayName;
Fi.displayName = ae.Description.displayName;
Oi.displayName = "DrawerBody";
$i.displayName = "DrawerFooter";
const Bi = I(
  "inline-flex w-fit items-center bg_tertiary p-0.5 radius_8"
), Hi = I(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors duration-0 cursor-pointer select-none",
  {
    variants: {
      size: {
        xs: "h_segmented_button px_segmented_button text-xs radius_6",
        s: "h_segmented_button px_segmented_button text-xs radius_6",
        m: "h_segmented_button px_segmented_button text-sm radius_6",
        l: "h_segmented_button px_segmented_button text-sm radius_6"
      },
      active: {
        true: "bg_primary text_primary shadow_s font-medium",
        false: "bg-transparent text_secondary hover:state_bg_button_tertiary_soft"
      },
      disabled: {
        true: "cursor-not-allowed opacity-50 pointer-events-none",
        false: ""
      }
    },
    defaultVariants: { size: "m", active: !1, disabled: !1 }
  }
), Gi = (e, t) => t !== void 0 ? t : e.find((r) => !r.disabled)?.value, Wi = n.forwardRef(
  ({ options: e, value: t, defaultValue: r, onValueChange: s, size: i = "m", disabled: o = !1, className: l }, d) => {
    const c = t !== void 0, [u, f] = n.useState(
      () => Gi(e, r)
    ), _ = c ? t : u, b = n.useCallback(
      (g) => {
        c || f(g), s?.(g);
      },
      [c, s]
    );
    return /* @__PURE__ */ a(
      "div",
      {
        ref: d,
        "data-slot": "segmented-control",
        role: "radiogroup",
        "aria-disabled": o || void 0,
        className: m(Bi(), l),
        children: e.map((g) => {
          const k = g.value === _, w = o || !!g.disabled;
          return /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              "data-slot": "segmented-control-item",
              role: "radio",
              "aria-checked": k,
              "aria-disabled": w || void 0,
              disabled: w,
              onClick: () => {
                w || k || b(g.value);
              },
              className: m(
                Hi({
                  size: i,
                  active: k,
                  disabled: w
                })
              ),
              children: [
                g.icon,
                g.label
              ]
            },
            g.value
          );
        })
      }
    );
  }
);
Wi.displayName = "SegmentedControl";
const Vr = I("inline-flex flex-shrink-0 items-center justify-center", {
  variants: {
    status: {
      completed: "bg_accent_primary fg_on_accent_primary border-transparent",
      current: "bg_primary border_accent_primary fg_accent_primary",
      upcoming: "bg_secondary border-transparent text_tertiary"
    },
    variant: {
      number: "h-8 w-8 radius_round border-2 text-sm font-semibold",
      icon: "h-8 w-8 radius_round border-2 text-sm font-semibold",
      dot: "h-3 w-3 radius_round"
    }
  },
  compoundVariants: [
    // dot upcoming: show a visible border
    { variant: "dot", status: "upcoming", class: "border border_secondary" },
    // dot current: slightly larger with ring
    {
      variant: "dot",
      status: "current",
      class: "h-3.5 w-3.5 ring-2 ring-[var(--ds-border-accent-primary)] ring-offset-2"
    }
  ],
  defaultVariants: { variant: "number" }
}), Tr = I("", {
  variants: {
    status: {
      completed: "bg_accent_primary",
      upcoming: "bg_secondary"
    },
    orientation: {
      horizontal: "h-[2px] flex-1 mx-3",
      vertical: "w-[2px] flex-1 self-center"
    },
    variant: {
      number: "",
      icon: "",
      dot: ""
    }
  },
  compoundVariants: [
    // Horizontal: top margin to align connector with center of indicator
    { orientation: "horizontal", variant: "number", class: "mt-4" },
    { orientation: "horizontal", variant: "icon", class: "mt-4" },
    { orientation: "horizontal", variant: "dot", class: "mt-[7px] mx-2" },
    // Vertical: space between indicators
    { orientation: "vertical", variant: "number", class: "my-1" },
    { orientation: "vertical", variant: "icon", class: "my-1" },
    { orientation: "vertical", variant: "dot", class: "my-0.5" }
  ],
  defaultVariants: { orientation: "horizontal", variant: "number" }
}), Lr = () => /* @__PURE__ */ a(
  "svg",
  {
    viewBox: "0 0 16 16",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": "true",
    className: "h-4 w-4",
    children: /* @__PURE__ */ a(
      "path",
      {
        d: "M12.5 4.5L6.5 10.5L3.5 7.5",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }
    )
  }
);
function Er(e, t, r, s) {
  return s === "dot" ? null : s === "icon" ? t === "completed" ? /* @__PURE__ */ a(Lr, {}) : e.icon ?? /* @__PURE__ */ a("span", { children: r + 1 }) : t === "completed" ? /* @__PURE__ */ a(Lr, {}) : /* @__PURE__ */ a("span", { children: r + 1 });
}
function Ar(e, t) {
  return typeof e.content == "string" || typeof e.content == "number" ? e.content : typeof e.secondaryContent == "string" || typeof e.secondaryContent == "number" ? e.secondaryContent : t;
}
const Ui = n.forwardRef(
  ({ steps: e, currentStep: t, orientation: r = "horizontal", variant: s = "number", className: i }, o) => {
    const l = (c) => c < t ? "completed" : c === t ? "current" : "upcoming";
    if (r === "vertical") {
      const c = e.some((u) => u.secondaryContent !== void 0);
      return /* @__PURE__ */ a("div", { ref: o, "data-slot": "steps", className: m("flex flex-col", i), children: e.map((u, f) => {
        const _ = l(f), b = f === e.length - 1;
        return /* @__PURE__ */ a(n.Fragment, { children: /* @__PURE__ */ y("div", { "data-slot": "steps-item", className: "flex items-start gap-0", children: [
          c ? /* @__PURE__ */ a("div", { className: "flex-shrink-0 w-20 pr-3 flex flex-col justify-center text-right", children: u.secondaryContent }) : null,
          /* @__PURE__ */ y("div", { className: "flex flex-col items-center flex-shrink-0 self-stretch", children: [
            /* @__PURE__ */ a(
              "div",
              {
                "data-slot": "steps-indicator",
                className: Vr({ status: _, variant: s }),
                children: Er(u, _, f, s)
              }
            ),
            b ? null : /* @__PURE__ */ a(
              "div",
              {
                "data-slot": "steps-connector",
                className: Tr({
                  status: f < t ? "completed" : "upcoming",
                  orientation: "vertical",
                  variant: s
                })
              }
            )
          ] }),
          /* @__PURE__ */ a(
            "div",
            {
              className: m(
                "flex flex-col justify-center pl-3",
                !b && (s === "dot" ? "pb-4" : "pb-6")
              ),
              children: u.content
            }
          )
        ] }) }, Ar(u, f));
      }) });
    }
    const d = e.some((c) => c.secondaryContent !== void 0);
    return /* @__PURE__ */ a("div", { ref: o, "data-slot": "steps", className: m("flex items-start w-full", i), children: e.map((c, u) => {
      const f = l(u), _ = u === e.length - 1;
      return /* @__PURE__ */ y(n.Fragment, { children: [
        /* @__PURE__ */ y("div", { "data-slot": "steps-item", className: "flex flex-col items-center min-w-0", children: [
          d ? /* @__PURE__ */ a("div", { className: "mb-2 text-center min-h-[1.25rem]", children: c.secondaryContent }) : null,
          /* @__PURE__ */ a(
            "div",
            {
              "data-slot": "steps-indicator",
              className: Vr({ status: f, variant: s }),
              children: Er(c, f, u, s)
            }
          ),
          c.content ? /* @__PURE__ */ a("div", { className: "mt-2 text-center", children: c.content }) : null
        ] }),
        _ ? null : /* @__PURE__ */ a(
          "div",
          {
            "data-slot": "steps-connector",
            className: Tr({
              status: u < t ? "completed" : "upcoming",
              orientation: "horizontal",
              variant: s
            })
          }
        )
      ] }, Ar(c, u));
    }) });
  }
);
Ui.displayName = "Steps";
const Ki = I(
  "relative flex h-1 w-full grow overflow-hidden radius_round bg_secondary"
), Yi = I("absolute h-full bg_accent_primary"), qi = I(
  "block h-[18px] w-[18px] radius_round border-2 border_accent_primary bg_primary shadow_xs transition-colors duration-0 focus-visible:outline-none focus-visible:shadow-[var(--ds-outline-blue-focus)] disabled:pointer-events-none disabled:opacity-50"
), Xi = n.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ y(
    vt.Root,
    {
      ref: r,
      "data-slot": "slider",
      className: m("relative flex w-full touch-none select-none items-center", e),
      ...t,
      children: [
        /* @__PURE__ */ a(vt.Track, { "data-slot": "slider-track", className: m(Ki()), children: /* @__PURE__ */ a(vt.Range, { "data-slot": "slider-range", className: m(Yi()) }) }),
        (t.defaultValue ?? t.value ?? [0]).map((s, i) => /* @__PURE__ */ a(
          vt.Thumb,
          {
            "data-slot": "slider-thumb",
            className: m(qi())
          },
          i
        ))
      ]
    }
  )
);
Xi.displayName = "Slider";
const Pr = I(
  "inline-flex h-8 w-8 items-center justify-center text-sm radius_6 transition-colors duration-0 cursor-pointer select-none",
  {
    variants: {
      status: {
        default: "text_primary hover:state_bg_button_tertiary_soft",
        selected: "bg_accent_secondary fg_on_accent_secondary font-medium",
        today: "bg_accent_secondary_subtle fg_accent_secondary font-medium",
        outside: "text_tertiary opacity-50 hover:state_bg_button_tertiary_soft",
        disabled: "text_tertiary opacity-40 cursor-not-allowed pointer-events-none",
        "range-middle": "fg_accent_secondary font-medium",
        "range-hover": "fg_accent_secondary font-medium"
      }
    },
    defaultVariants: { status: "default" }
  }
), Zi = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun"
], ve = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()), jr = (e, t) => new Date(e, t + 1, 0).getDate(), Qi = (e, t) => {
  const r = new Date(e, t, 1).getDay();
  return r === 0 ? 6 : r - 1;
}, Le = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate(), gt = (e) => e.display ?? "below", Ut = (e, t) => {
  const r = ve(t);
  switch (e.type) {
    case "range": {
      const s = ve(e.from).getTime(), i = ve(e.to).getTime(), o = Math.min(s, i), l = Math.max(s, i), d = r.getTime();
      return d >= o && d <= l;
    }
    case "weekly":
      return e.weekdays.includes(r.getDay());
    case "yearly":
      return r.getMonth() === e.month && r.getDate() === e.day;
  }
}, Fr = (e) => e === "default" || e === "outside" || e === "today", ut = (e) => new Date(e.getFullYear(), e.getMonth(), 1), Ji = (e, t) => {
  const r = jr(e, t), s = Qi(e, t), i = jr(e, t - 1);
  return Array.from({ length: 42 }, (o, l) => {
    if (l < s) {
      const c = i - s + l + 1;
      return { date: new Date(e, t - 1, c), outside: !0 };
    }
    if (l >= s + r) {
      const c = l - (s + r) + 1;
      return { date: new Date(e, t + 1, c), outside: !0 };
    }
    const d = l - s + 1;
    return { date: new Date(e, t, d), outside: !1 };
  });
}, Bt = ({
  year: e,
  month: t,
  showPrevButton: r,
  showNextButton: s,
  onPrev: i,
  onNext: o,
  dayDecorators: l,
  weekDayLabels: d,
  renderDay: c
}) => {
  const u = `${String(t + 1).padStart(2, "0")}/${e}`, f = n.useMemo(() => Ji(e, t), [t, e]), _ = n.useMemo(() => l?.length ? f.some(
    ({ date: b }) => l.some((g) => gt(g) === "below" && Ut(g, b))
  ) : !1, [l, f]);
  return /* @__PURE__ */ y("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ y("div", { className: "flex items-center justify-between gap-2", children: [
      r ? /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          "data-slot": "calendar-prev",
          onClick: i,
          className: "inline-flex items-center justify-center h-8 w-8 radius_6 hover:state_bg_button_tertiary_soft text_secondary cursor-pointer",
          "aria-label": "Previous month",
          children: /* @__PURE__ */ a(ja, { className: "h-4 w-4" })
        }
      ) : /* @__PURE__ */ a("span", { className: "h-8 w-8", "aria-hidden": "true" }),
      /* @__PURE__ */ a("p", { className: "text-sm font-semibold text_primary capitalize", children: u }),
      s ? /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          "data-slot": "calendar-next",
          onClick: o,
          className: "inline-flex items-center justify-center h-8 w-8 radius_6 hover:state_bg_button_tertiary_soft text_secondary cursor-pointer",
          "aria-label": "Next month",
          children: /* @__PURE__ */ a(Et, { className: "h-4 w-4" })
        }
      ) : /* @__PURE__ */ a("span", { className: "h-8 w-8", "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ a("div", { className: "grid grid-cols-7 gap-1", children: d.map((b) => /* @__PURE__ */ a(
      "div",
      {
        className: "h-8 w-8 inline-flex items-center justify-center text-xs text_tertiary",
        children: b
      },
      b
    )) }),
    /* @__PURE__ */ a("div", { className: "grid grid-cols-7 gap-1", children: f.map(({ date: b, outside: g }) => c(b, g, _)) })
  ] });
}, Lt = n.forwardRef((e, t) => {
  const { minDate: r, maxDate: s, disabledDates: i, dayDecorators: o, weekDayLabels: l, className: d } = e, c = l ?? Zi, u = e.mode === "range" ? void 0 : e, f = e.mode === "range" ? e : void 0, _ = !!f, [b, g] = n.useState(
    u?.defaultValue
  ), [k, w] = n.useState(
    f?.defaultValue ?? {}
  ), N = !_ && u?.value !== void 0, x = _ && f?.value !== void 0, h = _ ? void 0 : N ? u?.value : b, v = n.useMemo(
    () => _ ? x ? f?.value ?? {} : k : void 0,
    [k, x, _, f?.value]
  ), [j, V] = n.useState(() => {
    if (_) {
      const A = f?.value?.from ?? f?.defaultValue?.from ?? f?.value?.to ?? f?.defaultValue?.to ?? /* @__PURE__ */ new Date();
      return ut(A);
    }
    return ut(u?.value ?? u?.defaultValue ?? /* @__PURE__ */ new Date());
  });
  n.useEffect(() => {
    if (_) {
      const A = f?.value?.from ?? f?.value?.to;
      A && V(ut(A));
      return;
    }
    u?.value && V(ut(u.value));
  }, [_, f?.value, u?.value]);
  const [O, D] = n.useState(() => {
    const A = f?.value ?? f?.defaultValue;
    return A?.from && !A?.to ? "selecting" : "idle";
  }), [T, C] = n.useState(null);
  n.useEffect(() => {
    if (!_) {
      D("idle"), C(null);
      return;
    }
    const A = x ? f?.value ?? {} : k;
    D(A.from && !A.to ? "selecting" : "idle");
  }, [k, x, _, f?.value]);
  const U = n.useMemo(
    () => r ? ve(r) : void 0,
    [r]
  ), K = n.useMemo(
    () => s ? ve(s) : void 0,
    [s]
  ), Y = n.useCallback(
    (A) => {
      const P = ve(A);
      return U && P.getTime() < U.getTime() || K && P.getTime() > K.getTime() ? !0 : Array.isArray(i) ? i.some(
        (q) => Le(ve(q), P)
      ) : typeof i == "function" ? i(P) : !1;
    },
    [i, K, U]
  ), se = n.useMemo(() => ve(/* @__PURE__ */ new Date()), []), X = n.useCallback(
    (A) => {
      Y(A) || (N || g(A), u?.onValueChange?.(A), V(ut(A)));
    },
    [Y, N, u]
  ), R = n.useCallback(
    (A) => {
      if (Y(A)) return;
      const P = x ? f?.value ?? {} : k;
      if (O === "idle" || P.from && P.to) {
        D("selecting"), C(null);
        const J = { from: A, to: void 0 };
        x ? f?.onValueChange?.(J) : w(J);
        return;
      }
      D("idle");
      const q = ve(P.from), G = A < q ? { from: A, to: q } : { from: q, to: A };
      x || w(G), f?.onValueChange?.(G);
    },
    [k, Y, x, O, f]
  ), $ = n.useCallback(
    (A, P, q, G, J) => {
      if (Y(A)) return "disabled";
      const W = q ?? (P && G && G >= P ? G : void 0);
      return P && Le(A, P) || W && Le(A, W) ? "selected" : P && W && A > P && A < W ? "range-middle" : !q && P && G && A > P && A < G ? "range-hover" : J ? "outside" : Le(A, se) ? "today" : "default";
    },
    [Y, se]
  ), Q = n.useCallback(
    (A, P, q) => {
      const G = ve(A), J = G.toISOString(), W = Y(G), de = !!h && Le(ve(h), G), oe = Le(se, G), ue = o?.filter((ce) => Ut(ce, G)) ?? [], pe = ue.filter(
        (ce) => gt(ce) === "below" && ce.icon
      );
      let le;
      for (const ce of ue)
        gt(ce) === "background" && ce.backgroundClass && (le = ce.backgroundClass);
      let xe = "default";
      return W ? xe = "disabled" : de ? xe = "selected" : oe ? xe = "today" : P && (xe = "outside"), /* @__PURE__ */ y(
        "button",
        {
          type: "button",
          "data-slot": "calendar-day",
          disabled: W,
          onClick: () => X(G),
          className: m(
            Pr({ status: xe }),
            q && "h-10",
            pe.length > 0 && "flex-col gap-0",
            Fr(xe) && le
          ),
          children: [
            /* @__PURE__ */ a("span", { children: G.getDate() }),
            pe.length > 0 ? /* @__PURE__ */ a("span", { className: "mt-0.5 flex h-3 items-center justify-center gap-0.5", children: pe.map((ce, be) => /* @__PURE__ */ a(
              "span",
              {
                className: "inline-flex h-3 w-3 items-center justify-center",
                children: ce.icon
              },
              `${J}-decorator-${be}`
            )) }) : null
          ]
        },
        J
      );
    },
    [o, X, Y, h, se]
  ), S = T ? ve(T) : null, ie = n.useCallback(
    (A, P, q) => {
      const G = ve(A), J = G.toISOString(), W = v?.from ? ve(v.from) : void 0, de = v?.to ? ve(v.to) : void 0, oe = $(G, W, de, S, P), ue = de ?? (W && S && S >= W ? S : void 0), pe = o?.filter((ye) => Ut(ye, G)) ?? [], le = pe.filter(
        (ye) => gt(ye) === "below" && ye.icon
      );
      let xe;
      for (const ye of pe)
        gt(ye) === "background" && ye.backgroundClass && (xe = ye.backgroundClass);
      const ce = !!W && Le(G, W), be = !!ue && Le(G, ue), fe = oe === "range-middle" || oe === "range-hover", ke = ce && (!W || !ue || Le(W, ue));
      return /* @__PURE__ */ y("div", { className: "relative flex items-center justify-center", children: [
        fe ? /* @__PURE__ */ a("div", { className: "absolute inset-y-0.5 left-[-2px] right-[-2px] bg_accent_secondary_subtle" }) : null,
        ce && !ke ? /* @__PURE__ */ a("div", { className: "absolute inset-y-0.5 left-1/2 right-[-2px] bg_accent_secondary_subtle" }) : null,
        be && !ke ? /* @__PURE__ */ a("div", { className: "absolute inset-y-0.5 left-[-2px] right-1/2 bg_accent_secondary_subtle" }) : null,
        /* @__PURE__ */ y(
          "button",
          {
            type: "button",
            "data-slot": "calendar-day",
            disabled: oe === "disabled",
            onClick: () => R(G),
            onMouseEnter: () => C(G),
            onMouseLeave: () => C(null),
            className: m(
              "relative z-10",
              Pr({ status: oe }),
              q && "h-10",
              le.length > 0 && "flex-col gap-0",
              Fr(oe) && xe
            ),
            children: [
              /* @__PURE__ */ a("span", { children: G.getDate() }),
              le.length > 0 ? /* @__PURE__ */ a("span", { className: "mt-0.5 flex h-3 items-center justify-center gap-0.5", children: le.map((ye, Pe) => /* @__PURE__ */ a(
                "span",
                {
                  className: "inline-flex h-3 w-3 items-center justify-center",
                  children: ye.icon
                },
                `${J}-decorator-${Pe}`
              )) }) : null
            ]
          }
        )
      ] }, J);
    },
    [o, $, R, S, v]
  ), B = j.getFullYear(), H = j.getMonth();
  if (_) {
    const A = H === 11 ? B + 1 : B, P = H === 11 ? 0 : H + 1;
    return /* @__PURE__ */ y(
      "div",
      {
        ref: t,
        "data-slot": "calendar",
        className: m(
          "inline-flex gap-6 p-3 bg_primary border border_secondary radius_8 shadow_xs",
          d
        ),
        children: [
          /* @__PURE__ */ a(
            Bt,
            {
              year: B,
              month: H,
              showPrevButton: !0,
              showNextButton: !1,
              onPrev: () => V(new Date(B, H - 1, 1)),
              onNext: () => {
              },
              dayDecorators: o,
              weekDayLabels: c,
              renderDay: ie
            }
          ),
          /* @__PURE__ */ a(
            Bt,
            {
              year: A,
              month: P,
              showPrevButton: !1,
              showNextButton: !0,
              onPrev: () => {
              },
              onNext: () => V(new Date(B, H + 1, 1)),
              dayDecorators: o,
              weekDayLabels: c,
              renderDay: ie
            }
          )
        ]
      }
    );
  }
  return /* @__PURE__ */ a(
    "div",
    {
      ref: t,
      "data-slot": "calendar",
      className: m(
        "inline-flex p-3 bg_primary border border_secondary radius_8 shadow_xs",
        d
      ),
      children: /* @__PURE__ */ a(
        Bt,
        {
          year: B,
          month: H,
          showPrevButton: !0,
          showNextButton: !0,
          onPrev: () => V(new Date(B, H - 1, 1)),
          onNext: () => V(new Date(B, H + 1, 1)),
          dayDecorators: o,
          weekDayLabels: c,
          renderDay: Q
        }
      )
    }
  );
});
Lt.displayName = "Calendar";
const el = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()), Je = (e, t) => new Date(e.getFullYear(), e.getMonth(), e.getDate() - t), Or = (e) => new Date(e.getFullYear(), e.getMonth(), 1), $r = (e) => new Date(e.getFullYear(), e.getMonth() + 1, 0), Br = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate(), tl = n.forwardRef(
  ({
    value: e,
    defaultValue: t,
    onValueChange: r,
    presets: s,
    showPresets: i = !0,
    minDate: o,
    maxDate: l,
    disabledDates: d,
    className: c
  }, u) => {
    const [f, _] = n.useState(t ?? {}), b = e !== void 0, g = b ? e ?? {} : f, k = n.useCallback(
      (x) => {
        b || _(x), r?.(x);
      },
      [b, r]
    ), w = n.useMemo(() => {
      const x = el(/* @__PURE__ */ new Date()), h = new Date(x.getFullYear(), x.getMonth() - 1, 1);
      return [
        { label: "Today", range: { from: x, to: x } },
        { label: "Yesterday", range: { from: Je(x, 1), to: Je(x, 1) } },
        { label: "Last 7 days", range: { from: Je(x, 6), to: x } },
        { label: "Last 14 days", range: { from: Je(x, 13), to: x } },
        { label: "Last 30 days", range: { from: Je(x, 29), to: x } },
        { label: "This month", range: { from: Or(x), to: $r(x) } },
        {
          label: "Last month",
          range: { from: Or(h), to: $r(h) }
        },
        { label: "Last 90 days", range: { from: Je(x, 89), to: x } }
      ];
    }, []), N = n.useCallback(
      (x) => !!(g.from && g.to && x.range.from && x.range.to && Br(g.from, x.range.from) && Br(g.to, x.range.to)),
      [g.from, g.to]
    );
    return /* @__PURE__ */ y(
      "div",
      {
        ref: u,
        role: "group",
        "aria-label": "Date range picker",
        "data-slot": "date-range-picker",
        className: m(
          "inline-flex bg_primary border border_secondary radius_8 shadow_xs overflow-hidden",
          c
        ),
        children: [
          i && /* @__PURE__ */ a("div", { className: "w-40 shrink-0 border-r border_secondary py-2 flex flex-col gap-0.5 px-1", children: (s ?? w).map((x) => /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              onClick: () => k(x.range),
              className: m(
                "w-full text-left text-sm px-3 py-1.5 radius_6 transition-colors cursor-pointer whitespace-nowrap",
                N(x) ? "text_primary state_bg_button_tertiary_soft font-medium" : "text_secondary hover:text_primary hover:state_bg_button_tertiary_soft"
              ),
              children: x.label
            },
            x.label
          )) }),
          /* @__PURE__ */ a("div", { className: "p-4", children: /* @__PURE__ */ a(
            Lt,
            {
              mode: "range",
              value: g,
              onValueChange: k,
              minDate: o,
              maxDate: l,
              disabledDates: d,
              className: "border-none shadow-none"
            }
          ) })
        ]
      }
    );
  }
);
tl.displayName = "DateRangePicker";
const et = (e) => String(e).padStart(2, "0"), Hr = (e) => `${et(e.getDate())}/${et(e.getMonth() + 1)}/${e.getFullYear()}`, Gr = (e) => `${et(e.getHours())}:${et(e.getMinutes())}`, Wr = (e) => new Date(e.getFullYear(), e.getMonth(), e.getDate()), rl = Array.from({ length: 24 }, (e, t) => t), al = Array.from({ length: 12 }, (e, t) => t * 5), Ur = ({ date: e, onHourChange: t, onMinuteChange: r }) => {
  const s = e?.getHours() ?? -1, i = e?.getMinutes() ?? -1, o = n.useRef(null), l = n.useRef(null);
  return n.useEffect(() => {
    o.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [s]), n.useEffect(() => {
    l.current?.querySelector('[data-selected="true"]')?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [i]), /* @__PURE__ */ y("div", { className: "flex h-[280px]", children: [
    /* @__PURE__ */ a(
      "div",
      {
        ref: o,
        className: "flex w-14 flex-col gap-0.5 overflow-y-auto border-r border_secondary p-1",
        children: rl.map((d) => {
          const c = d === s;
          return /* @__PURE__ */ a(
            "button",
            {
              type: "button",
              "data-selected": c,
              onClick: () => t(d),
              className: m(
                "h-8 w-full shrink-0 radius_6 text-center text-sm transition-colors cursor-pointer",
                c ? "bg_accent_secondary fg_on_accent_secondary font-medium" : "text_secondary hover:state_bg_button_tertiary_soft"
              ),
              children: et(d)
            },
            d
          );
        })
      }
    ),
    /* @__PURE__ */ a("div", { ref: l, className: "flex w-14 flex-col gap-0.5 overflow-y-auto p-1", children: al.map((d) => {
      const c = d === i;
      return /* @__PURE__ */ a(
        "button",
        {
          type: "button",
          "data-selected": c,
          onClick: () => r(d),
          className: m(
            "h-8 w-full shrink-0 radius_6 text-center text-sm transition-colors cursor-pointer",
            c ? "bg_accent_secondary fg_on_accent_secondary font-medium" : "text_secondary hover:state_bg_button_tertiary_soft"
          ),
          children: et(d)
        },
        d
      );
    }) })
  ] });
}, sl = n.forwardRef(
  ({
    mode: e = "date",
    value: t,
    defaultValue: r,
    onValueChange: s,
    placeholder: i,
    minDate: o,
    maxDate: l,
    disabledDates: d,
    disabled: c = !1,
    size: u = "m",
    variant: f = "light",
    className: _
  }, b) => {
    const g = t !== void 0, [k, w] = n.useState(r ?? null), [N, x] = n.useState(!1), h = g ? t ?? null : k, v = n.useCallback(
      (K) => {
        g || w(K), s?.(K);
      },
      [g, s]
    ), j = i ?? (e === "date" ? "Select date" : e === "time" ? "Select time" : "Select date & time"), V = h ? e === "date" ? Hr(h) : e === "time" ? Gr(h) : `${Hr(h)} ${Gr(h)}` : null, O = n.useCallback(
      (K) => {
        const Y = h ? new Date(h) : Wr(/* @__PURE__ */ new Date());
        Y.setHours(K), v(Y);
      },
      [h, v]
    ), D = n.useCallback(
      (K) => {
        const Y = h ? new Date(h) : Wr(/* @__PURE__ */ new Date());
        Y.setMinutes(K), v(Y);
      },
      [h, v]
    ), T = n.useCallback(
      (K) => {
        v(K), x(!1);
      },
      [v]
    ), C = n.useCallback(
      (K) => {
        const Y = h ? new Date(h) : new Date(K);
        Y.setFullYear(K.getFullYear(), K.getMonth(), K.getDate()), v(Y);
      },
      [h, v]
    ), U = e === "date" ? Fa : e === "time" ? Oa : $a;
    return /* @__PURE__ */ y(he.Root, { open: N, onOpenChange: c ? void 0 : x, children: [
      /* @__PURE__ */ a(he.Trigger, { asChild: !0, children: /* @__PURE__ */ y(
        "button",
        {
          ref: b,
          type: "button",
          disabled: c,
          "data-slot": "date-picker-trigger",
          className: m(
            It({ variant: f, size: u }),
            "flex items-center justify-between gap-2 cursor-pointer",
            !V && "text_tertiary",
            _
          ),
          children: [
            /* @__PURE__ */ a("span", { className: "truncate", children: V ?? j }),
            /* @__PURE__ */ a(U, { className: "h-4 w-4 flex-shrink-0 icon_secondary", "aria-hidden": "true" })
          ]
        }
      ) }),
      /* @__PURE__ */ a(he.Portal, { children: /* @__PURE__ */ a(
        he.Content,
        {
          align: "start",
          sideOffset: 8,
          onOpenAutoFocus: (K) => K.preventDefault(),
          className: "z-50 bg_primary border border_secondary radius_8 shadow_md overflow-hidden",
          children: e === "date" ? /* @__PURE__ */ a(
            Lt,
            {
              mode: "single",
              value: h ?? void 0,
              onValueChange: T,
              minDate: o,
              maxDate: l,
              disabledDates: d
            }
          ) : e === "time" ? /* @__PURE__ */ a(
            Ur,
            {
              date: h,
              onHourChange: O,
              onMinuteChange: D
            }
          ) : /* @__PURE__ */ y("div", { className: "flex", children: [
            /* @__PURE__ */ a(
              Lt,
              {
                mode: "single",
                value: h ?? void 0,
                onValueChange: C,
                minDate: o,
                maxDate: l,
                disabledDates: d
              }
            ),
            /* @__PURE__ */ a("div", { className: "border-l border_secondary", children: /* @__PURE__ */ a(
              Ur,
              {
                date: h,
                onHourChange: O,
                onMinuteChange: D
              }
            ) })
          ] })
        }
      ) })
    ] });
  }
);
sl.displayName = "DatePicker";
function nl({
  items: e,
  estimateSize: t,
  renderItem: r,
  overscan: s = 5,
  className: i,
  getItemKey: o
}) {
  const l = n.useRef(null), d = n.useCallback(
    (u) => typeof t == "number" ? t : t(u),
    [t]
  ), c = Kt({
    count: e.length,
    getScrollElement: () => l.current,
    estimateSize: d,
    overscan: s,
    getItemKey: o ? (u) => o(e[u], u) : void 0
  });
  return /* @__PURE__ */ a(
    "div",
    {
      ref: l,
      "data-slot": "virtual-list",
      role: "list",
      className: m("overflow-auto", i),
      children: /* @__PURE__ */ a("div", { style: { height: c.getTotalSize(), position: "relative" }, children: c.getVirtualItems().map((u) => /* @__PURE__ */ a(
        "div",
        {
          role: "listitem",
          "data-index": u.index,
          ref: c.measureElement,
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            transform: `translateY(${u.start}px)`
          },
          children: r(e[u.index], u.index)
        },
        u.key
      )) })
    }
  );
}
nl.displayName = "VirtualList";
const Kr = (e) => e < 1024 ? `${e} B` : e < 1024 * 1024 ? `${(e / 1024).toFixed(0)} KB` : `${(e / (1024 * 1024)).toFixed(1)} MB`, ol = (e, t) => {
  const r = t?.split(",").map((o) => o.trim().toLowerCase()).filter(Boolean);
  if (!r?.length)
    return !0;
  const s = e.name.toLowerCase(), i = e.type.toLowerCase();
  return r.some((o) => o.startsWith(".") ? s.endsWith(o) : o.endsWith("/*") ? i.startsWith(o.slice(0, -1)) : i === o);
}, il = n.forwardRef(
  ({
    accept: e,
    multiple: t = !1,
    maxSize: r,
    maxFiles: s,
    files: i,
    onFilesChange: o,
    onFileAdd: l,
    onFileRemove: d,
    placeholder: c = "Upload a file",
    description: u,
    disabled: f = !1,
    className: _
  }, b) => {
    const g = i !== void 0, [k, w] = n.useState([]), [N, x] = n.useState(!1), h = n.useRef(null), v = n.useRef(/* @__PURE__ */ new Set());
    n.useEffect(() => {
      const R = v.current;
      return () => {
        R.forEach(($) => URL.revokeObjectURL($)), R.clear();
      };
    }, []);
    const j = n.useRef([]);
    n.useEffect(() => {
      const R = i ?? k, $ = new Set(R.map((Q) => Q.preview).filter(Boolean));
      for (const Q of j.current)
        Q.preview && !$.has(Q.preview) && v.current.has(Q.preview) && (URL.revokeObjectURL(Q.preview), v.current.delete(Q.preview));
      j.current = R;
    }, [i, k]);
    const V = g ? i : k, O = n.useRef(V);
    n.useLayoutEffect(() => {
      O.current = V;
    }, [V]);
    const D = n.useCallback(
      (R) => {
        O.current = R, g || w(R), o?.(R);
      },
      [g, o]
    ), T = n.useCallback(
      (R) => {
        if (f) return;
        const $ = Array.from(R), Q = [], S = [];
        for (const J of $) {
          if (!ol(J, e)) {
            S.push({
              id: crypto.randomUUID(),
              name: J.name,
              size: J.size,
              status: "error",
              error: "File type is not accepted"
            });
            continue;
          }
          if (r && J.size > r) {
            S.push({
              id: crypto.randomUUID(),
              name: J.name,
              size: J.size,
              status: "error",
              error: `File exceeds ${Kr(r)} limit`
            });
            continue;
          }
          Q.push(J);
        }
        const ie = O.current, B = ie.filter((J) => J.status !== "error").length, H = !g && s !== void 0 ? Math.max(0, s - B) : Q.length, A = Q.slice(0, H), P = Q.length - A.length, q = [];
        for (const J of A) {
          const de = J.type.startsWith("image/") ? URL.createObjectURL(J) : void 0;
          de && v.current.add(de);
          const oe = {
            id: crypto.randomUUID(),
            name: J.name,
            size: J.size,
            status: "uploading",
            progress: 0,
            preview: de
          };
          q.push(oe);
        }
        P > 0 && S.push({
          id: crypto.randomUUID(),
          name: `${P} file${P === 1 ? "" : "s"} not added`,
          size: 0,
          status: "error",
          error: `Maximum ${s} file${s === 1 ? "" : "s"} allowed`
        });
        const G = [...ie, ...q, ...S];
        O.current = G, g || w(G), o?.(G), A.length > 0 && l?.(A);
      },
      [e, f, g, s, r, l, o]
    ), C = n.useCallback(
      (R) => {
        const $ = V.find((Q) => Q.id === R);
        $?.preview && v.current.has($.preview) && (URL.revokeObjectURL($.preview), v.current.delete($.preview)), D(V.filter((Q) => Q.id !== R)), d?.(R);
      },
      [V, D, d]
    ), U = n.useCallback(
      (R) => {
        R.preventDefault(), x(!1), !f && T(R.dataTransfer.files);
      },
      [T, f]
    ), K = (R) => {
      R.preventDefault(), f || x(!0);
    }, Y = () => x(!1), se = (R) => {
      R.target.files && T(R.target.files), R.target.value = "";
    }, X = () => {
      f || h.current?.click();
    };
    return /* @__PURE__ */ y("div", { ref: b, "data-slot": "file-upload", className: m("flex flex-col gap-3", _), children: [
      /* @__PURE__ */ y(
        "div",
        {
          role: "button",
          tabIndex: f ? -1 : 0,
          "aria-label": "Upload area",
          onClick: X,
          onKeyDown: (R) => {
            (R.key === "Enter" || R.key === " ") && (R.preventDefault(), X());
          },
          onDrop: U,
          onDragOver: K,
          onDragLeave: Y,
          className: m(
            "flex flex-col items-center justify-center gap-2 p-8 border-2 border-dashed radius_8 transition-colors cursor-pointer select-none",
            N ? "border_accent_primary bg_accent_primary/5" : "border_secondary hover:state_border_accent_primary_soft bg_secondary",
            f && "pointer-events-none opacity-60"
          ),
          children: [
            /* @__PURE__ */ a("div", { className: "flex h-10 w-10 items-center justify-center radius_round bg_primary border border_secondary", children: /* @__PURE__ */ a(Ba, { className: "h-5 w-5 icon_secondary", "aria-hidden": "true" }) }),
            /* @__PURE__ */ y("div", { className: "text-center", children: [
              /* @__PURE__ */ a("p", { className: "text-sm font-medium text_primary", children: c }),
              u ? /* @__PURE__ */ a("p", { className: "text-xs text_tertiary mt-0.5", children: u }) : null
            ] })
          ]
        }
      ),
      /* @__PURE__ */ a(
        "input",
        {
          ref: h,
          type: "file",
          accept: e,
          multiple: t,
          className: "sr-only",
          onChange: se,
          "aria-hidden": "true",
          tabIndex: -1
        }
      ),
      V.length > 0 ? /* @__PURE__ */ a("div", { className: "flex flex-col gap-2", children: V.map((R) => /* @__PURE__ */ y(
        "div",
        {
          "data-slot": "file-upload-item",
          className: "flex items-center gap-3 p-3 border border_secondary radius_8 bg_primary",
          children: [
            /* @__PURE__ */ a("div", { className: "h-10 w-10 flex-shrink-0 radius_6 overflow-hidden bg_secondary flex items-center justify-center", children: R.preview ? /* @__PURE__ */ a(
              "img",
              {
                src: R.preview,
                alt: R.name,
                className: "h-full w-full object-cover"
              }
            ) : /* @__PURE__ */ a(Ha, { className: "h-5 w-5 icon_tertiary", "aria-hidden": "true" }) }),
            /* @__PURE__ */ y("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ y("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ a("p", { className: "text-sm font-medium text_primary truncate", children: R.name }),
                /* @__PURE__ */ a("p", { className: "text-xs text_tertiary flex-shrink-0", children: Kr(R.size) })
              ] }),
              R.status === "error" ? /* @__PURE__ */ a("p", { role: "alert", className: "text-xs fg_error mt-0.5", children: R.error ?? "Upload failed" }) : R.progress !== void 0 && R.progress < 100 ? /* @__PURE__ */ y("div", { className: "mt-1.5 flex items-center gap-2", children: [
                /* @__PURE__ */ a(
                  "div",
                  {
                    role: "progressbar",
                    "aria-valuenow": R.progress,
                    "aria-valuemin": 0,
                    "aria-valuemax": 100,
                    "aria-label": `Upload progress for ${R.name}`,
                    className: "flex-1 h-1.5 bg_secondary radius_round overflow-hidden",
                    children: /* @__PURE__ */ a(
                      "div",
                      {
                        className: "h-full bg_accent_primary radius_round transition-all duration-300",
                        style: { width: `${R.progress}%` }
                      }
                    )
                  }
                ),
                /* @__PURE__ */ y("span", { className: "text-xs text_tertiary flex-shrink-0", children: [
                  R.progress,
                  "%"
                ] })
              ] }) : null
            ] }),
            /* @__PURE__ */ a(
              "button",
              {
                type: "button",
                "aria-label": `Remove ${R.name}`,
                onClick: () => C(R.id),
                className: "flex-shrink-0 flex h-7 w-7 items-center justify-center radius_6 transition-colors hover:state_bg_button_tertiary_subtle text_tertiary hover:text_primary",
                children: /* @__PURE__ */ a(Ga, { className: "h-4 w-4", "aria-hidden": "true" })
              }
            )
          ]
        },
        R.id
      )) }) : null
    ] });
  }
);
il.displayName = "FileUpload";
const yl = I("flex items-center gap-2 cursor-pointer text-left", {
  variants: {}
});
function xl(e = {}) {
  const { storageKey: t = "ui-kit-dark-mode", defaultValue: r } = e, [s, i] = n.useState(() => {
    if (typeof window > "u") return r ?? !1;
    const l = localStorage.getItem(t);
    return l !== null ? l === "true" : r !== void 0 ? r : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  n.useEffect(() => {
    const l = document.documentElement;
    l.classList.remove(
      "theme-high-contrast-light",
      "theme-olive",
      "theme-deep-forest",
      "theme-sunset"
    ), l.classList.toggle("dark", s), l.dataset.theme = s ? "dark" : "light", localStorage.setItem(t, String(s));
  }, [s, t]), n.useEffect(() => {
    const l = window.matchMedia("(prefers-color-scheme: dark)"), d = (c) => {
      localStorage.getItem(t) === null && i(c.matches);
    };
    return l.addEventListener("change", d), () => l.removeEventListener("change", d);
  }, [t]);
  const o = n.useCallback(() => i((l) => !l), []);
  return { isDark: s, setIsDark: i, toggle: o };
}
const ar = [
  "light",
  "high-contrast-light",
  "olive",
  "dark",
  "deep-forest",
  "sunset"
], ll = ar.filter((e) => e !== "light" && e !== "dark").map((e) => `theme-${e}`), Yr = (e) => ar.includes(e), cl = () => typeof window < "u" && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
function vl(e = {}) {
  const { storageKey: t = "ui-kit-theme", defaultValue: r } = e, [s, i] = n.useState(() => {
    if (typeof window > "u") return r ?? "light";
    const o = localStorage.getItem(t);
    return Yr(o) ? o : r ?? cl();
  });
  return n.useEffect(() => {
    const o = document.documentElement;
    o.classList.remove("dark", ...ll), s === "dark" && o.classList.add("dark"), s !== "light" && s !== "dark" && o.classList.add(`theme-${s}`), o.dataset.theme = s, localStorage.setItem(t, s);
  }, [s, t]), n.useEffect(() => {
    const o = window.matchMedia("(prefers-color-scheme: dark)"), l = (d) => {
      const c = localStorage.getItem(t);
      Yr(c) || i(d.matches ? "dark" : "light");
    };
    return o.addEventListener("change", l), () => o.removeEventListener("change", l);
  }, [t]), { theme: s, setTheme: i, themes: ar };
}
export {
  Mo as Accordion,
  Vo as AccordionContent,
  Do as AccordionItem,
  Io as AccordionTrigger,
  Ao as Alert,
  qt as Avatar,
  dn as Badge,
  Ri as BlockSidebarLayout,
  jo as Breadcrumb,
  Me as Button,
  Lt as Calendar,
  yo as Card,
  ko as CardContent,
  wo as CardDescription,
  No as CardFooter,
  xo as CardHeader,
  vo as CardTitle,
  Vt as Checkbox,
  Kn as Chip,
  $n as CommentInput,
  bl as DataTable,
  sl as DatePicker,
  tl as DateRangePicker,
  _l as Drawer,
  Oi as DrawerBody,
  Ei as DrawerClose,
  Ai as DrawerContent,
  Fi as DrawerDescription,
  $i as DrawerFooter,
  Pi as DrawerHeader,
  Da as DrawerOverlay,
  Ti as DrawerPortal,
  ji as DrawerTitle,
  Li as DrawerTrigger,
  An as DropdownButton,
  Zt as DropdownMenu,
  In as DropdownMenuCheckboxItem,
  Jt as DropdownMenuContent,
  Nn as DropdownMenuGroup,
  xn as DropdownMenuItem,
  wn as DropdownMenuLabel,
  Vn as DropdownMenuRadioGroup,
  Tn as DropdownMenuRadioItem,
  vn as DropdownMenuSeparator,
  kn as DropdownMenuShortcut,
  Cn as DropdownMenuSub,
  Dn as DropdownMenuSubContent,
  Mn as DropdownMenuSubTrigger,
  Qt as DropdownMenuTrigger,
  Xs as Field,
  il as FileUpload,
  _a as FilterChipRadio,
  Yn as FilterChipRadioGroup,
  jn as IconDropdown,
  Pn as IconToggle,
  Xn as InfoChip,
  ma as Input,
  Zn as InputChip,
  an as InputPinCode,
  io as Modal,
  lo as ModalTrigger,
  mn as NotiBadge,
  wa as Pagination,
  er as Popover,
  Hn as PopoverClose,
  ga as PopoverContent,
  Bn as PopoverTrigger,
  bi as Progress,
  to as RadioGroup,
  ro as RadioGroupItem,
  Tt as ScrollArea,
  Wi as SegmentedControl,
  va as Select,
  za as Sidebar,
  ki as SidebarContent,
  Ni as SidebarFooter,
  wi as SidebarHeader,
  Wt as SidebarItem,
  Ra as SidebarSection,
  Ma as SidebarSubItem,
  rr as SidebarTrigger,
  Di as SimpleSidebar,
  ka as Skeleton,
  Xi as Slider,
  Dt as Spinner,
  Ui as Steps,
  no as Switch,
  qn as TabChip,
  bo as Tabs,
  nn as Textarea,
  hl as Toaster,
  co as Tooltip,
  uo as TooltipProvider,
  nl as VirtualList,
  Ro as accordionChevronVariants,
  zo as accordionContentVariants,
  Co as accordionItemVariants,
  So as accordionTriggerVariants,
  Lo as alertIconVariants,
  To as alertVariants,
  Ks as avatarVariants,
  on as badgeVariants,
  Hs as buttonVariants,
  Pr as calendarDayVariants,
  Jn as checkboxIndicatorVariants,
  Qn as checkboxVariants,
  ha as chipVariants,
  m as cn,
  Rt as dataTableCellVariants,
  si as dataTableHeadVariants,
  ni as dataTableHeaderCellVariants,
  oi as dataTablePaginationWrapperVariants,
  zt as dataTableRowVariants,
  ri as dataTableScrollContainerVariants,
  wr as dataTableSummaryCellVariants,
  ai as dataTableVariants,
  ti as dataTableWrapperVariants,
  yl as datePickerTriggerVariants,
  Vi as drawerContentVariants,
  Ii as drawerOverlayVariants,
  pn as dropdownMenuContentVariants,
  Xt as dropdownMenuItemVariants,
  hn as dropdownMenuLabelVariants,
  gn as dropdownMenuSeparatorVariants,
  bn as dropdownMenuShortcutVariants,
  yn as dropdownMenuSubContentVariants,
  _n as dropdownMenuSubTriggerVariants,
  pa as iconToggleVariants,
  Zs as inputPinCodeContainerVariants,
  Qs as inputPinCodeSlotVariants,
  It as inputVariants,
  oo as modalVariants,
  un as notiBadgeVariants,
  qo as paginationControlsVariants,
  Xo as paginationEllipsisVariants,
  Zo as paginationTotalVariants,
  Yo as paginationVariants,
  gi as progressFillVariants,
  pi as progressTrackVariants,
  ya as radioGroupItemVariants,
  eo as radioGroupVariants,
  _i as scrollAreaRootVariants,
  Mr as scrollAreaScrollbarVariants,
  Dr as scrollAreaThumbVariants,
  Hi as segmentedControlItemVariants,
  Bi as segmentedControlVariants,
  Oo as selectContentVariants,
  $o as selectOptionVariants,
  Bo as selectTagVariants,
  Fo as selectTriggerVariants,
  yi as sidebarItemVariants,
  Ir as sidebarSubItemVariants,
  Mi as simpleSidebarItemVariants,
  Yi as sliderRangeVariants,
  qi as sliderThumbVariants,
  Ki as sliderTrackVariants,
  Gs as spinnerVariants,
  Tr as stepsConnectorVariants,
  Vr as stepsIndicatorVariants,
  so as switchThumbVariants,
  ao as switchVariants,
  po as tabsContentVariants,
  fo as tabsListVariants,
  mo as tabsTriggerVariants,
  sn as textareaVariants,
  ar as themes,
  Nl as toast,
  xl as useDarkMode,
  vl as useTheme
};
//# sourceMappingURL=ui-kit.js.map
