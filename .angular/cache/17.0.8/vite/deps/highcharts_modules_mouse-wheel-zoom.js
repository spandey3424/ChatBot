import {
  __commonJS
} from "./chunk-KSCYWWKG.js";

// node_modules/highcharts/modules/mouse-wheel-zoom.js
var require_mouse_wheel_zoom = __commonJS({
  "node_modules/highcharts/modules/mouse-wheel-zoom.js"(exports, module) {
    !function(t) {
      "object" == typeof module && module.exports ? (t.default = t, module.exports = t) : "function" == typeof define && define.amd ? define("highcharts/modules/mouse-wheel-zoom", ["highcharts"], function(e) {
        return t(e), t.Highcharts = e, t;
      }) : t("undefined" != typeof Highcharts ? Highcharts : void 0);
    }(function(t) {
      "use strict";
      var e = t ? t._modules : {};
      function i(t2, e2, i2, n) {
        t2.hasOwnProperty(e2) || (t2[e2] = n.apply(null, i2), "function" == typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: e2, module: t2[e2] } })));
      }
      i(e, "Extensions/Annotations/NavigationBindingsUtilities.js", [e["Core/Utilities.js"]], function(t2) {
        let { defined: e2, isNumber: i2, pick: n } = t2, o = { backgroundColor: "string", borderColor: "string", borderRadius: "string", color: "string", fill: "string", fontSize: "string", labels: "string", name: "string", stroke: "string", title: "string" };
        return { annotationsFieldsTypes: o, getAssignedAxis: function(t3) {
          return t3.filter((t4) => {
            let e3 = t4.axis.getExtremes(), o2 = e3.min, s = e3.max, r = n(t4.axis.minPointOffset, 0);
            return i2(o2) && i2(s) && t4.value >= o2 - r && t4.value <= s + r && !t4.axis.options.isInternal;
          })[0];
        }, getFieldType: function(t3, i3) {
          let n2 = o[t3], s = typeof i3;
          return e2(n2) && (s = n2), { string: "text", number: "number", boolean: "checkbox" }[s];
        } };
      }), i(e, "Extensions/MouseWheelZoom/MouseWheelZoom.js", [e["Core/Utilities.js"], e["Extensions/Annotations/NavigationBindingsUtilities.js"]], function(t2, e2) {
        let i2, n, o;
        let { addEvent: s, isObject: r, pick: a, defined: l, merge: d, isNumber: u } = t2, { getAssignedAxis: m } = e2, g = [], c = { enabled: true, sensitivity: 1.1 }, h = (t3) => r(t3) ? d(c, t3) : d(c, { enabled: !l(t3) || t3 }), f = (t3, e3, i3, n2) => (i3 + n2 > t3 + e3 && (n2 > e3 ? (n2 = e3, i3 = t3) : i3 = t3 + e3 - n2), n2 > e3 && (n2 = e3), i3 < t3 && (i3 = t3), { rangeStart: i3, rangeWidth: n2 }), p = function(t3) {
          let e3 = t3.options;
          l(i2) && clearTimeout(i2), l(n) || (n = e3.startOnTick, o = e3.endOnTick), (n || o) && (e3.startOnTick = false, e3.endOnTick = false), i2 = setTimeout(() => {
            if (l(n) && l(o)) {
              e3.startOnTick = n, e3.endOnTick = o;
              let { min: i3, max: s2 } = t3.getExtremes();
              t3.forceRedraw = true, t3.setExtremes(i3, s2), n = o = void 0;
            }
          }, 400);
        }, x = function(t3, e3, i3) {
          if (!l(i3))
            return 0.5;
          let n2 = (i3 - e3.minPixelPadding - e3.pos) / (e3.len - 2 * e3.minPixelPadding), o2 = e3.isXAxis;
          return o2 && !e3.reversed != !t3.inverted || !o2 && e3.reversed ? 1 - n2 : n2;
        }, v = function(t3, e3, i3, n2, o2) {
          let s2 = e3.isXAxis, r2 = false;
          if (l(e3.max) && l(e3.min) && l(e3.dataMax) && l(e3.dataMin)) {
            s2 || p(e3);
            let d2 = e3.max - e3.min, m2 = u(o2) ? o2 : e3.min + d2 / 2, g2 = x(t3, e3, i3), c2 = d2 * n2, h2 = m2 - c2 * g2, v2 = a(e3.options.max, e3.dataMax) - a(e3.options.min, e3.dataMin), y2 = e3.options.min ? 0 : v2 * e3.options.minPadding, b2 = e3.options.max ? 0 : v2 * e3.options.maxPadding, E = a(e3.options.min, e3.dataMin) - y2, C = v2 + b2 + y2, M = f(E, C, h2, c2), w = M.rangeStart < a(e3.options.min, E) || M.rangeStart === e3.min && M.rangeWidth > C && M.rangeStart + M.rangeWidth < a(e3.options.max, Number.MIN_VALUE) || M.rangeWidth === e3.max - e3.min;
            l(n2) && !w ? (e3.setExtremes(M.rangeStart, M.rangeStart + M.rangeWidth, false), r2 = true) : e3.setExtremes(void 0, void 0, false);
          }
          return r2;
        }, y = function(t3, e3, i3, n2, o2, s2, r2) {
          let l2 = a(r2.type, t3.zooming.type, ""), d2 = /x/.test(l2), u2 = /y/.test(l2), m2 = i3.toValue(o2), g2 = n2.toValue(s2);
          if (t3.inverted) {
            let t4 = n2.pos + n2.len;
            m2 = i3.toValue(s2), g2 = n2.toValue(o2);
            let e4 = o2;
            o2 = s2, s2 = t4 - e4 + n2.pos;
          }
          let c2 = d2 && v(t3, i3, o2, e3, m2), h2 = u2 && v(t3, n2, s2, e3, g2), f2 = c2 || h2;
          return f2 && t3.redraw(false), f2;
        };
        function b() {
          let t3 = this, e3 = h(t3.zooming.mouseWheel);
          e3.enabled && s(this.container, "wheel", (i3) => {
            i3 = this.pointer.normalize(i3);
            let n2 = !t3.pointer.inClass(i3.target, "highcharts-no-mousewheel");
            if (t3.isInsidePlot(i3.chartX - t3.plotLeft, i3.chartY - t3.plotTop) && n2) {
              let n3 = e3.sensitivity || 1.1, o2 = i3.detail || (i3.deltaY || 0) / 120, s2 = m(this.pointer.getCoordinates(i3).xAxis), r2 = m(this.pointer.getCoordinates(i3).yAxis), a2 = y(t3, Math.pow(n3, o2), s2 ? s2.axis : t3.xAxis[0], r2 ? r2.axis : t3.yAxis[0], i3.chartX, i3.chartY, e3);
              a2 && i3.preventDefault && i3.preventDefault();
            }
          });
        }
        return { compose: function(t3) {
          -1 === g.indexOf(t3) && (g.push(t3), s(t3, "afterGetContainer", b));
        } };
      }), i(e, "masters/modules/mouse-wheel-zoom.src.js", [e["Core/Globals.js"], e["Extensions/MouseWheelZoom/MouseWheelZoom.js"]], function(t2, e2) {
        e2.compose(t2.Chart);
      });
    });
  }
});
export default require_mouse_wheel_zoom();
//# sourceMappingURL=highcharts_modules_mouse-wheel-zoom.js.map
