(() => {
  "use strict";
  var r,
    e = {},
    t = {};
  function o(r) {
    var n = t[r];
    if (void 0 !== n) return n.exports;
    var i = (t[r] = { id: r, loaded: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, o), (i.loaded = !0), i.exports;
  }
  (o.m = e),
    (r = []),
    (o.O = (e, t, n, i) => {
      if (!t) {
        var a = 1 / 0;
        for (p = 0; p < r.length; p++) {
          for (var [t, n, i] = r[p], l = !0, c = 0; c < t.length; c++)
            (!1 & i || a >= i) && Object.keys(o.O).every((r) => o.O[r](t[c]))
              ? t.splice(c--, 1)
              : ((l = !1), i < a && (a = i));
          if (l) {
            r.splice(p--, 1);
            var s = n();
            void 0 !== s && (e = s);
          }
        }
        return e;
      }
      i = i || 0;
      for (var p = r.length; p > 0 && r[p - 1][2] > i; p--) r[p] = r[p - 1];
      r[p] = [t, n, i];
    }),
    (o.n = (r) => {
      var e = r && r.__esModule ? () => r.default : () => r;
      return o.d(e, { a: e }), e;
    }),
    (o.d = (r, e) => {
      for (var t in e)
        o.o(e, t) &&
          !o.o(r, t) &&
          Object.defineProperty(r, t, { enumerable: !0, get: e[t] });
    }),
    (o.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (r) {
        if ("object" == typeof window) return window;
      }
    })()),
    (o.o = (r, e) => Object.prototype.hasOwnProperty.call(r, e)),
    (o.nmd = (r) => ((r.paths = []), r.children || (r.children = []), r)),
    (() => {
      var r;
      o.g.importScripts && (r = o.g.location + "");
      var e = o.g.document;
      if (!r && e && (e.currentScript && (r = e.currentScript.src), !r)) {
        var t = e.getElementsByTagName("script");
        if (t.length)
          for (var n = t.length - 1; n > -1 && (!r || !/^http(s?):/.test(r)); )
            r = t[n--].src;
      }
      if (!r)
        throw new Error(
          "Automatic publicPath is not supported in this browser",
        );
      (r = r
        .replace(/#.*$/, "")
        .replace(/\?.*$/, "")
        .replace(/\/[^\/]+$/, "/")),
        (o.p = r);
    })(),
    (() => {
      o.b = document.baseURI || self.location.href;
      var r = { 121: 0 };
      o.O.j = (e) => 0 === r[e];
      var e = (e, t) => {
          var n,
            i,
            [a, l, c] = t,
            s = 0;
          if (a.some((e) => 0 !== r[e])) {
            for (n in l) o.o(l, n) && (o.m[n] = l[n]);
            if (c) var p = c(o);
          }
          for (e && e(t); s < a.length; s++)
            (i = a[s]), o.o(r, i) && r[i] && r[i][0](), (r[i] = 0);
          return o.O(p);
        },
        t = (self.webpackChunkodin_todo_list =
          self.webpackChunkodin_todo_list || []);
      t.forEach(e.bind(null, 0)), (t.push = e.bind(null, t.push.bind(t)));
    })(),
    (o.nc = void 0);
})();
