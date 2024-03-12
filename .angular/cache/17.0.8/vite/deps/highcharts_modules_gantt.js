import {
  __commonJS,
  __objRest
} from "./chunk-KSCYWWKG.js";

// node_modules/highcharts/modules/gantt.js
var require_gantt = __commonJS({
  "node_modules/highcharts/modules/gantt.js"(exports, module) {
    !function(t) {
      "object" == typeof module && module.exports ? (t.default = t, module.exports = t) : "function" == typeof define && define.amd ? define("highcharts/modules/gantt", ["highcharts"], function(e) {
        return t(e), t.Highcharts = e, t;
      }) : t("undefined" != typeof Highcharts ? Highcharts : void 0);
    }(function(t) {
      "use strict";
      var e = t ? t._modules : {};
      function i(t2, e2, i2, s) {
        t2.hasOwnProperty(e2) || (t2[e2] = s.apply(null, i2), "function" == typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: e2, module: t2[e2] } })));
      }
      i(e, "Extensions/ArrowSymbols.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { composed: i2 } = t2, { pushUnique: s } = e2;
        function o(t3, e3, i3, s2) {
          return [["M", t3, e3 + s2 / 2], ["L", t3 + i3, e3], ["L", t3, e3 + s2 / 2], ["L", t3 + i3, e3 + s2]];
        }
        function r(t3, e3, i3, s2) {
          return o(t3, e3, i3 / 2, s2);
        }
        function n(t3, e3, i3, s2) {
          return [["M", t3 + i3, e3], ["L", t3, e3 + s2 / 2], ["L", t3 + i3, e3 + s2], ["Z"]];
        }
        function a(t3, e3, i3, s2) {
          return n(t3, e3, i3 / 2, s2);
        }
        return { compose: function t3(e3) {
          if (s(i2, t3)) {
            let t4 = e3.prototype.symbols;
            t4.arrow = o, t4["arrow-filled"] = n, t4["arrow-filled-half"] = a, t4["arrow-half"] = r, t4["triangle-left"] = n, t4["triangle-left-half"] = a;
          }
        } };
      }), i(e, "Gantt/Connection.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { defined: i2, error: s, merge: o, objectEach: r } = e2, n = t2.deg2rad, a = Math.max, l = Math.min;
        return class {
          constructor(t3, e3, i3) {
            this.init(t3, e3, i3);
          }
          init(t3, e3, i3) {
            this.fromPoint = t3, this.toPoint = e3, this.options = i3, this.chart = t3.series.chart, this.pathfinder = this.chart.pathfinder;
          }
          renderPath(t3, e3) {
            let i3 = this.chart, s2 = i3.styledMode, o2 = this.pathfinder, r2 = {}, n2 = this.graphics && this.graphics.path;
            o2.group || (o2.group = i3.renderer.g().addClass("highcharts-pathfinder-group").attr({ zIndex: -1 }).add(i3.seriesGroup)), o2.group.translate(i3.plotLeft, i3.plotTop), n2 && n2.renderer || (n2 = i3.renderer.path().add(o2.group), s2 || n2.attr({ opacity: 0 })), n2.attr(e3), r2.d = t3, s2 || (r2.opacity = 1), n2.animate(r2), this.graphics = this.graphics || {}, this.graphics.path = n2;
          }
          addMarker(t3, e3, i3) {
            let s2, o2, r2, a2, l2, h, d, c;
            let p = this.fromPoint.series.chart, u = p.pathfinder, g = p.renderer, x = "start" === t3 ? this.fromPoint : this.toPoint, f = x.getPathfinderAnchorPoint(e3);
            e3.enabled && ((c = "start" === t3 ? i3[1] : i3[i3.length - 2]) && "M" === c[0] || "L" === c[0]) && (d = { x: c[1], y: c[2] }, o2 = x.getRadiansToVector(d, f), s2 = x.getMarkerVector(o2, e3.radius, f), r2 = -o2 / n, e3.width && e3.height ? (l2 = e3.width, h = e3.height) : l2 = h = 2 * e3.radius, this.graphics = this.graphics || {}, a2 = { x: s2.x - l2 / 2, y: s2.y - h / 2, width: l2, height: h, rotation: r2, rotationOriginX: s2.x, rotationOriginY: s2.y }, this.graphics[t3] ? this.graphics[t3].animate(a2) : (this.graphics[t3] = g.symbol(e3.symbol).addClass("highcharts-point-connecting-path-" + t3 + "-marker highcharts-color-" + this.fromPoint.colorIndex).attr(a2).add(u.group), g.styledMode || this.graphics[t3].attr({ fill: e3.color || this.fromPoint.color, stroke: e3.lineColor, "stroke-width": e3.lineWidth, opacity: 0 }).animate({ opacity: 1 }, x.series.options.animation)));
          }
          getPath(t3) {
            let e3 = this.pathfinder, i3 = this.chart, r2 = e3.algorithms[t3.type], n2 = e3.chartObstacles;
            return "function" != typeof r2 ? (s('"' + t3.type + '" is not a Pathfinder algorithm.'), { path: [], obstacles: [] }) : (r2.requiresObstacles && !n2 && (n2 = e3.chartObstacles = e3.getChartObstacles(t3), i3.options.connectors.algorithmMargin = t3.algorithmMargin, e3.chartObstacleMetrics = e3.getObstacleMetrics(n2)), r2(this.fromPoint.getPathfinderAnchorPoint(t3.startMarker), this.toPoint.getPathfinderAnchorPoint(t3.endMarker), o({ chartObstacles: n2, lineObstacles: e3.lineObstacles || [], obstacleMetrics: e3.chartObstacleMetrics, hardBounds: { xMin: 0, xMax: i3.plotWidth, yMin: 0, yMax: i3.plotHeight }, obstacleOptions: { margin: t3.algorithmMargin }, startDirectionX: e3.getAlgorithmStartDirection(t3.startMarker) }, t3)));
          }
          render() {
            let t3 = this.fromPoint, e3 = t3.series, s2 = e3.chart, r2 = s2.pathfinder, n2 = {}, h = o(s2.options.connectors, e3.options.connectors, t3.options.connectors, this.options);
            !s2.styledMode && (n2.stroke = h.lineColor || t3.color, n2["stroke-width"] = h.lineWidth, h.dashStyle && (n2.dashstyle = h.dashStyle)), n2.class = "highcharts-point-connecting-path highcharts-color-" + t3.colorIndex, i2((h = o(n2, h)).marker.radius) || (h.marker.radius = l(a(Math.ceil((h.algorithmMargin || 8) / 2) - 1, 1), 5));
            let d = this.getPath(h), c = d.path;
            d.obstacles && (r2.lineObstacles = r2.lineObstacles || [], r2.lineObstacles = r2.lineObstacles.concat(d.obstacles)), this.renderPath(c, n2), this.addMarker("start", o(h.marker, h.startMarker), c), this.addMarker("end", o(h.marker, h.endMarker), c);
          }
          destroy() {
            this.graphics && (r(this.graphics, function(t3) {
              t3.destroy();
            }), delete this.graphics);
          }
        };
      }), i(e, "Extensions/CurrentDateIndication.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { composed: i2 } = t2, { addEvent: s, merge: o, pushUnique: r, wrap: n } = e2, a = { color: "#ccd3ff", width: 2, label: { format: "%a, %b %d %Y, %H:%M", formatter: function(t3, e3) {
          return this.axis.chart.time.dateFormat(e3 || "", t3);
        }, rotation: 0, style: { fontSize: "0.7em" } } };
        function l() {
          let t3 = this.options, e3 = t3.currentDateIndicator;
          if (e3) {
            let i3 = "object" == typeof e3 ? o(a, e3) : o(a);
            i3.value = Date.now(), i3.className = "highcharts-current-date-indicator", t3.plotLines || (t3.plotLines = []), t3.plotLines.push(i3);
          }
        }
        function h() {
          this.label && this.label.attr({ text: this.getLabelText(this.options.label) });
        }
        function d(t3, e3) {
          let i3 = this.options;
          return i3 && i3.className && -1 !== i3.className.indexOf("highcharts-current-date-indicator") && i3.label && "function" == typeof i3.label.formatter ? (i3.value = Date.now(), i3.label.formatter.call(this, i3.value, i3.label.format)) : t3.call(this, e3);
        }
        return { compose: function t3(e3, o2) {
          r(i2, t3) && (s(e3, "afterSetOptions", l), s(o2, "render", h), n(o2.prototype, "getLabelText", d));
        } };
      }), i(e, "Core/Chart/GanttChart.js", [e["Core/Chart/Chart.js"], e["Core/Defaults.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        var s;
        let { defaultOptions: o } = e2, { isArray: r, merge: n, splat: a } = i2;
        class l extends t2 {
          init(t3, e3) {
            let i3;
            let s2 = t3.xAxis, l2 = t3.yAxis;
            t3.xAxis = t3.yAxis = void 0;
            let h = n(true, { chart: { type: "gantt" }, title: { text: "" }, legend: { enabled: false }, navigator: { series: { type: "gantt" }, yAxis: { type: "category" } } }, t3, { isGantt: true });
            t3.xAxis = s2, t3.yAxis = l2, h.xAxis = (r(t3.xAxis) ? t3.xAxis : [t3.xAxis || {}, {}]).map((t4, e4) => (1 === e4 && (i3 = 0), n({ grid: { borderColor: "#cccccc", enabled: true }, opposite: o.xAxis?.opposite ?? t4.opposite ?? true, linkedTo: i3 }, t4, { type: "datetime" }))), h.yAxis = a(t3.yAxis || {}).map((t4) => n({ grid: { borderColor: "#cccccc", enabled: true }, staticScale: 50, reversed: true, type: t4.categories ? t4.type : "treegrid" }, t4)), super.init(h, e3);
          }
        }
        return (s = l || (l = {})).ganttChart = function(t3, e3, i3) {
          return new s(t3, e3, i3);
        }, l;
      }), i(e, "Core/Axis/NavigatorAxisComposition.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { composed: i2, isTouchDevice: s } = t2, { addEvent: o, correctFloat: r, defined: n, isNumber: a, pick: l, pushUnique: h } = e2;
        function d() {
          this.navigatorAxis || (this.navigatorAxis = new p(this));
        }
        function c(t3) {
          let e3 = this.chart, i3 = e3.options, o2 = i3.navigator, r2 = this.navigatorAxis, a2 = e3.zooming.pinchType, l2 = i3.rangeSelector, h2 = e3.zooming.type;
          if (this.isXAxis && (o2 && o2.enabled || l2 && l2.enabled)) {
            if ("y" === h2)
              t3.zoomed = false;
            else if ((!s && "xy" === h2 || s && "xy" === a2) && this.options.range) {
              let e4 = r2.previousZoom;
              n(t3.newMin) ? r2.previousZoom = [this.min, this.max] : e4 && (t3.newMin = e4[0], t3.newMax = e4[1], r2.previousZoom = void 0);
            }
          }
          void 0 !== t3.zoomed && t3.preventDefault();
        }
        class p {
          static compose(t3) {
            h(i2, this.compose) && (t3.keepProps.push("navigatorAxis"), o(t3, "init", d), o(t3, "zoom", c));
          }
          constructor(t3) {
            this.axis = t3;
          }
          destroy() {
            this.axis = void 0;
          }
          toFixedRange(t3, e3, i3, s2) {
            let o2 = this.axis, h2 = o2.chart, d2 = l(i3, o2.translate(t3, true, !o2.horiz)), c2 = l(s2, o2.translate(e3, true, !o2.horiz)), p2 = h2 && h2.fixedRange, u = (o2.pointRange || 0) / 2;
            return n(i3) || (d2 = r(d2 + u)), n(s2) || (c2 = r(c2 - u)), p2 && o2.dataMin && o2.dataMax && (c2 >= o2.dataMax && (d2 = r(o2.dataMax - p2)), d2 <= o2.dataMin && (c2 = r(o2.dataMin + p2))), a(d2) && a(c2) || (d2 = c2 = void 0), { min: d2, max: c2 };
          }
        }
        return p;
      }), i(e, "Stock/Navigator/NavigatorDefaults.js", [e["Core/Color/Color.js"], e["Core/Series/SeriesRegistry.js"]], function(t2, e2) {
        let { parse: i2 } = t2, { seriesTypes: s } = e2, o = { height: 40, margin: 25, maskInside: true, handles: { width: 7, height: 15, symbols: ["navigator-handle", "navigator-handle"], enabled: true, lineWidth: 1, backgroundColor: "#f2f2f2", borderColor: "#999999" }, maskFill: i2("#667aff").setOpacity(0.3).get(), outlineColor: "#999999", outlineWidth: 1, series: { type: void 0 === s.areaspline ? "line" : "areaspline", fillOpacity: 0.05, lineWidth: 1, compare: null, sonification: { enabled: false }, dataGrouping: { approximation: "average", enabled: true, groupPixelWidth: 2, firstAnchor: "firstPoint", anchor: "middle", lastAnchor: "lastPoint", units: [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2, 3, 4]], ["week", [1, 2, 3]], ["month", [1, 3, 6]], ["year", null]] }, dataLabels: { enabled: false, zIndex: 2 }, id: "highcharts-navigator-series", className: "highcharts-navigator-series", lineColor: null, marker: { enabled: false }, threshold: null }, xAxis: { overscroll: 0, className: "highcharts-navigator-xaxis", tickLength: 0, lineWidth: 0, gridLineColor: "#e6e6e6", gridLineWidth: 1, tickPixelInterval: 200, labels: { align: "left", style: { color: "#000000", fontSize: "0.7em", opacity: 0.6, textOutline: "2px contrast" }, x: 3, y: -4 }, crosshair: false }, yAxis: { className: "highcharts-navigator-yaxis", gridLineWidth: 0, startOnTick: false, endOnTick: false, minPadding: 0.1, maxPadding: 0.1, labels: { enabled: false }, crosshair: false, title: { text: null }, tickLength: 0, tickWidth: 0 } };
        return o;
      }), i(e, "Stock/Navigator/NavigatorSymbols.js", [], function() {
        return { "navigator-handle": function(t2, e2, i2, s, o = {}) {
          let r = o.width ? o.width / 2 : i2, n = Math.round(r / 3) + 0.5;
          return [["M", -r - 1, 0.5], ["L", r, 0.5], ["L", r, (s = o.height || s) + 0.5], ["L", -r - 1, s + 0.5], ["L", -r - 1, 0.5], ["M", -n, 4], ["L", -n, s - 3], ["M", n - 1, 4], ["L", n - 1, s - 3]];
        } };
      }), i(e, "Stock/Navigator/NavigatorComposition.js", [e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Axis/NavigatorAxisComposition.js"], e["Stock/Navigator/NavigatorDefaults.js"], e["Stock/Navigator/NavigatorSymbols.js"], e["Core/Renderer/RendererRegistry.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, o, r, n) {
        let a;
        let { defaultOptions: l, setOptions: h } = t2, { composed: d, isTouchDevice: c } = e2, { getRendererType: p } = r, { addEvent: u, extend: g, merge: x, pick: f, pushUnique: m } = n;
        function b() {
          this.navigator && this.navigator.setBaseSeries(null, false);
        }
        function y() {
          let t3, e3, i3;
          let s2 = this.legend, o2 = this.navigator;
          if (o2) {
            t3 = s2 && s2.options, e3 = o2.xAxis, i3 = o2.yAxis;
            let { scrollbarHeight: r2, scrollButtonSize: n2 } = o2;
            this.inverted ? (o2.left = o2.opposite ? this.chartWidth - r2 - o2.height : this.spacing[3] + r2, o2.top = this.plotTop + n2) : (o2.left = f(e3.left, this.plotLeft + n2), o2.top = o2.navigatorOptions.top || this.chartHeight - o2.height - r2 - (this.scrollbar?.options.margin || 0) - this.spacing[2] - (this.rangeSelector && this.extraBottomMargin ? this.rangeSelector.getHeight() : 0) - (t3 && "bottom" === t3.verticalAlign && "proximate" !== t3.layout && t3.enabled && !t3.floating ? s2.legendHeight + f(t3.margin, 10) : 0) - (this.titleOffset ? this.titleOffset[2] : 0)), e3 && i3 && (this.inverted ? e3.options.left = i3.options.left = o2.left : e3.options.top = i3.options.top = o2.top, e3.setAxisSize(), i3.setAxisSize());
          }
        }
        function M(t3) {
          !this.navigator && !this.scroller && (this.options.navigator.enabled || this.options.scrollbar.enabled) && (this.scroller = this.navigator = new a(this), f(t3.redraw, true) && this.redraw(t3.animation));
        }
        function v() {
          let t3 = this.options;
          (t3.navigator.enabled || t3.scrollbar.enabled) && (this.scroller = this.navigator = new a(this));
        }
        function k() {
          let t3 = this.options, e3 = t3.navigator, i3 = t3.rangeSelector;
          if ((e3 && e3.enabled || i3 && i3.enabled) && (!c && "x" === this.zooming.type || c && "x" === this.zooming.pinchType))
            return false;
        }
        function A(t3) {
          let e3 = t3.navigator;
          if (e3 && t3.xAxis[0]) {
            let i3 = t3.xAxis[0].getExtremes();
            e3.render(i3.min, i3.max);
          }
        }
        function S(t3) {
          let e3 = t3.options.navigator || {}, i3 = t3.options.scrollbar || {};
          !this.navigator && !this.scroller && (e3.enabled || i3.enabled) && (x(true, this.options.navigator, e3), x(true, this.options.scrollbar, i3), delete t3.options.navigator, delete t3.options.scrollbar);
        }
        function C() {
          this.chart.navigator && !this.options.isInternal && this.chart.navigator.setBaseSeries(null, false);
        }
        return { compose: function t3(e3, r2, n2, h2) {
          if (i2.compose(e3), a = n2, m(d, t3)) {
            let t4 = r2.prototype;
            t4.callbacks.push(A), u(r2, "afterAddSeries", b), u(r2, "afterSetChartSize", y), u(r2, "afterUpdate", M), u(r2, "beforeRender", v), u(r2, "beforeShowResetZoom", k), u(r2, "update", S), u(h2, "afterUpdate", C), g(p().prototype.symbols, o), g(l, { navigator: s });
          }
        } };
      }), i(e, "Core/Axis/ScrollbarAxis.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        var i2;
        let { composed: s } = t2, { addEvent: o, defined: r, pick: n, pushUnique: a } = e2;
        return function(t3) {
          let e3;
          function i3(t4) {
            let e4 = n(t4.options && t4.options.min, t4.min), i4 = n(t4.options && t4.options.max, t4.max);
            return { axisMin: e4, axisMax: i4, scrollMin: r(t4.dataMin) ? Math.min(e4, t4.min, t4.dataMin, n(t4.threshold, 1 / 0)) : e4, scrollMax: r(t4.dataMax) ? Math.max(i4, t4.max, t4.dataMax, n(t4.threshold, -1 / 0)) : i4 };
          }
          function l() {
            let t4 = this.scrollbar, e4 = t4 && !t4.options.opposite, i4 = this.horiz ? 2 : e4 ? 3 : 1;
            t4 && (this.chart.scrollbarsOffsets = [0, 0], this.chart.axisOffset[i4] += t4.size + (t4.options.margin || 0));
          }
          function h() {
            let t4 = this;
            t4.options && t4.options.scrollbar && t4.options.scrollbar.enabled && (t4.options.scrollbar.vertical = !t4.horiz, t4.options.startOnTick = t4.options.endOnTick = false, t4.scrollbar = new e3(t4.chart.renderer, t4.options.scrollbar, t4.chart), o(t4.scrollbar, "changed", function(e4) {
              let s2, o2;
              let { axisMin: n2, axisMax: a2, scrollMin: l2, scrollMax: h2 } = i3(t4), d2 = h2 - l2;
              if (r(n2) && r(a2)) {
                if (t4.horiz && !t4.reversed || !t4.horiz && t4.reversed ? (s2 = l2 + d2 * this.to, o2 = l2 + d2 * this.from) : (s2 = l2 + d2 * (1 - this.from), o2 = l2 + d2 * (1 - this.to)), this.shouldUpdateExtremes(e4.DOMType)) {
                  let i4 = "mousemove" !== e4.DOMType && "touchmove" !== e4.DOMType && void 0;
                  t4.setExtremes(o2, s2, true, i4, e4);
                } else
                  this.setRange(this.from, this.to);
              }
            }));
          }
          function d() {
            let t4, e4, s2;
            let { scrollMin: o2, scrollMax: n2 } = i3(this), a2 = this.scrollbar, l2 = this.axisTitleMargin + (this.titleOffset || 0), h2 = this.chart.scrollbarsOffsets, d2 = this.options.margin || 0;
            if (a2 && h2) {
              if (this.horiz)
                this.opposite || (h2[1] += l2), a2.position(this.left, this.top + this.height + 2 + h2[1] - (this.opposite ? d2 : 0), this.width, this.height), this.opposite || (h2[1] += d2), t4 = 1;
              else {
                let e5;
                this.opposite && (h2[0] += l2), e5 = a2.options.opposite ? this.left + this.width + 2 + h2[0] - (this.opposite ? 0 : d2) : this.opposite ? 0 : d2, a2.position(e5, this.top, this.width, this.height), this.opposite && (h2[0] += d2), t4 = 0;
              }
              h2[t4] += a2.size + (a2.options.margin || 0), isNaN(o2) || isNaN(n2) || !r(this.min) || !r(this.max) || this.min === this.max ? a2.setRange(0, 1) : (e4 = (this.min - o2) / (n2 - o2), s2 = (this.max - o2) / (n2 - o2), this.horiz && !this.reversed || !this.horiz && this.reversed ? a2.setRange(e4, s2) : a2.setRange(1 - s2, 1 - e4));
            }
          }
          t3.compose = function t4(i4, r2) {
            a(s, t4) && (e3 = r2, o(i4, "afterGetOffset", l), o(i4, "afterInit", h), o(i4, "afterRender", d));
          };
        }(i2 || (i2 = {})), i2;
      }), i(e, "Stock/Scrollbar/ScrollbarDefaults.js", [e["Core/Globals.js"]], function(t2) {
        let { isTouchDevice: e2 } = t2;
        return { height: 10, barBorderRadius: 5, buttonBorderRadius: 0, buttonsEnabled: false, liveRedraw: void 0, margin: void 0, minWidth: 6, opposite: true, step: 0.2, zIndex: 3, barBackgroundColor: "#cccccc", barBorderWidth: 0, barBorderColor: "#cccccc", buttonArrowColor: "#333333", buttonBackgroundColor: "#e6e6e6", buttonBorderColor: "#cccccc", buttonBorderWidth: 1, rifleColor: "none", trackBackgroundColor: "rgba(255, 255, 255, 0.001)", trackBorderColor: "#cccccc", trackBorderRadius: 5, trackBorderWidth: 1 };
      }), i(e, "Stock/Scrollbar/Scrollbar.js", [e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Axis/ScrollbarAxis.js"], e["Stock/Scrollbar/ScrollbarDefaults.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, o) {
        let { defaultOptions: r } = t2, { addEvent: n, correctFloat: a, defined: l, destroyObjectProperties: h, fireEvent: d, merge: c, pick: p, removeEvent: u } = o;
        class g {
          static compose(t3) {
            i2.compose(t3, g);
          }
          static swapXY(t3, e3) {
            return e3 && t3.forEach((t4) => {
              let e4;
              let i3 = t4.length;
              for (let s2 = 0; s2 < i3; s2 += 2)
                "number" == typeof (e4 = t4[s2 + 1]) && (t4[s2 + 1] = t4[s2 + 2], t4[s2 + 2] = e4);
            }), t3;
          }
          constructor(t3, e3, i3) {
            this._events = [], this.chartX = 0, this.chartY = 0, this.from = 0, this.scrollbarButtons = [], this.scrollbarLeft = 0, this.scrollbarStrokeWidth = 1, this.scrollbarTop = 0, this.size = 0, this.to = 0, this.trackBorderWidth = 1, this.x = 0, this.y = 0, this.init(t3, e3, i3);
          }
          addEvents() {
            let t3 = this.options.inverted ? [1, 0] : [0, 1], i3 = this.scrollbarButtons, s2 = this.scrollbarGroup.element, o2 = this.track.element, r2 = this.mouseDownHandler.bind(this), a2 = this.mouseMoveHandler.bind(this), l2 = this.mouseUpHandler.bind(this), h2 = [[i3[t3[0]].element, "click", this.buttonToMinClick.bind(this)], [i3[t3[1]].element, "click", this.buttonToMaxClick.bind(this)], [o2, "click", this.trackClick.bind(this)], [s2, "mousedown", r2], [s2.ownerDocument, "mousemove", a2], [s2.ownerDocument, "mouseup", l2]];
            e2.hasTouch && h2.push([s2, "touchstart", r2], [s2.ownerDocument, "touchmove", a2], [s2.ownerDocument, "touchend", l2]), h2.forEach(function(t4) {
              n.apply(null, t4);
            }), this._events = h2;
          }
          buttonToMaxClick(t3) {
            let e3 = (this.to - this.from) * p(this.options.step, 0.2);
            this.updatePosition(this.from + e3, this.to + e3), d(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: t3 });
          }
          buttonToMinClick(t3) {
            let e3 = a(this.to - this.from) * p(this.options.step, 0.2);
            this.updatePosition(a(this.from - e3), a(this.to - e3)), d(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: t3 });
          }
          cursorToScrollbarPosition(t3) {
            let e3 = this.options, i3 = e3.minWidth > this.calculatedWidth ? e3.minWidth : 0;
            return { chartX: (t3.chartX - this.x - this.xOffset) / (this.barWidth - i3), chartY: (t3.chartY - this.y - this.yOffset) / (this.barWidth - i3) };
          }
          destroy() {
            let t3 = this, e3 = t3.chart.scroller;
            t3.removeEvents(), ["track", "scrollbarRifles", "scrollbar", "scrollbarGroup", "group"].forEach(function(e4) {
              t3[e4] && t3[e4].destroy && (t3[e4] = t3[e4].destroy());
            }), e3 && t3 === e3.scrollbar && (e3.scrollbar = null, h(e3.scrollbarButtons));
          }
          drawScrollbarButton(t3) {
            let e3 = this.renderer, i3 = this.scrollbarButtons, s2 = this.options, o2 = this.size, r2 = e3.g().add(this.group);
            if (i3.push(r2), s2.buttonsEnabled) {
              let n2 = e3.rect().addClass("highcharts-scrollbar-button").add(r2);
              this.chart.styledMode || n2.attr({ stroke: s2.buttonBorderColor, "stroke-width": s2.buttonBorderWidth, fill: s2.buttonBackgroundColor }), n2.attr(n2.crisp({ x: -0.5, y: -0.5, width: o2 + 1, height: o2 + 1, r: s2.buttonBorderRadius }, n2.strokeWidth()));
              let a2 = e3.path(g.swapXY([["M", o2 / 2 + (t3 ? -1 : 1), o2 / 2 - 3], ["L", o2 / 2 + (t3 ? -1 : 1), o2 / 2 + 3], ["L", o2 / 2 + (t3 ? 2 : -2), o2 / 2]], s2.vertical)).addClass("highcharts-scrollbar-arrow").add(i3[t3]);
              this.chart.styledMode || a2.attr({ fill: s2.buttonArrowColor });
            }
          }
          init(t3, e3, i3) {
            this.scrollbarButtons = [], this.renderer = t3, this.userOptions = e3, this.options = c(s, r.scrollbar, e3), this.options.margin = p(this.options.margin, 10), this.chart = i3, this.size = p(this.options.size, this.options.height), e3.enabled && (this.render(), this.addEvents());
          }
          mouseDownHandler(t3) {
            let e3 = this.chart.pointer.normalize(t3), i3 = this.cursorToScrollbarPosition(e3);
            this.chartX = i3.chartX, this.chartY = i3.chartY, this.initPositions = [this.from, this.to], this.grabbedCenter = true;
          }
          mouseMoveHandler(t3) {
            let e3;
            let i3 = this.chart.pointer.normalize(t3), s2 = this.options, o2 = s2.vertical ? "chartY" : "chartX", r2 = this.initPositions || [];
            this.grabbedCenter && (!t3.touches || 0 !== t3.touches[0][o2]) && (e3 = this.cursorToScrollbarPosition(i3)[o2] - this[o2], this.hasDragged = true, this.updatePosition(r2[0] + e3, r2[1] + e3), this.hasDragged && d(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: t3.type, DOMEvent: t3 }));
          }
          mouseUpHandler(t3) {
            this.hasDragged && d(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMType: t3.type, DOMEvent: t3 }), this.grabbedCenter = this.hasDragged = this.chartX = this.chartY = null;
          }
          position(t3, e3, i3, s2) {
            let o2 = this.options, { buttonsEnabled: r2, margin: n2 = 0, vertical: a2 } = o2, l2 = this.rendered ? "animate" : "attr", h2 = s2, d2 = 0;
            this.group.show(), this.x = t3, this.y = e3 + this.trackBorderWidth, this.width = i3, this.height = s2, this.xOffset = h2, this.yOffset = d2, a2 ? (this.width = this.yOffset = i3 = d2 = this.size, this.xOffset = h2 = 0, this.yOffset = d2 = r2 ? this.size : 0, this.barWidth = s2 - (r2 ? 2 * i3 : 0), this.x = t3 += n2) : (this.height = s2 = this.size, this.xOffset = h2 = r2 ? this.size : 0, this.barWidth = i3 - (r2 ? 2 * s2 : 0), this.y = this.y + n2), this.group[l2]({ translateX: t3, translateY: this.y }), this.track[l2]({ width: i3, height: s2 }), this.scrollbarButtons[1][l2]({ translateX: a2 ? 0 : i3 - h2, translateY: a2 ? s2 - d2 : 0 });
          }
          removeEvents() {
            this._events.forEach(function(t3) {
              u.apply(null, t3);
            }), this._events.length = 0;
          }
          render() {
            let t3 = this.renderer, e3 = this.options, i3 = this.size, s2 = this.chart.styledMode, o2 = t3.g("scrollbar").attr({ zIndex: e3.zIndex }).hide().add();
            this.group = o2, this.track = t3.rect().addClass("highcharts-scrollbar-track").attr({ r: e3.trackBorderRadius || 0, height: i3, width: i3 }).add(o2), s2 || this.track.attr({ fill: e3.trackBackgroundColor, stroke: e3.trackBorderColor, "stroke-width": e3.trackBorderWidth });
            let r2 = this.trackBorderWidth = this.track.strokeWidth();
            this.track.attr({ x: -r2 % 2 / 2, y: -r2 % 2 / 2 }), this.scrollbarGroup = t3.g().add(o2), this.scrollbar = t3.rect().addClass("highcharts-scrollbar-thumb").attr({ height: i3 - r2, width: i3 - r2, r: e3.barBorderRadius || 0 }).add(this.scrollbarGroup), this.scrollbarRifles = t3.path(g.swapXY([["M", -3, i3 / 4], ["L", -3, 2 * i3 / 3], ["M", 0, i3 / 4], ["L", 0, 2 * i3 / 3], ["M", 3, i3 / 4], ["L", 3, 2 * i3 / 3]], e3.vertical)).addClass("highcharts-scrollbar-rifles").add(this.scrollbarGroup), s2 || (this.scrollbar.attr({ fill: e3.barBackgroundColor, stroke: e3.barBorderColor, "stroke-width": e3.barBorderWidth }), this.scrollbarRifles.attr({ stroke: e3.rifleColor, "stroke-width": 1 })), this.scrollbarStrokeWidth = this.scrollbar.strokeWidth(), this.scrollbarGroup.translate(-this.scrollbarStrokeWidth % 2 / 2, -this.scrollbarStrokeWidth % 2 / 2), this.drawScrollbarButton(0), this.drawScrollbarButton(1);
          }
          setRange(t3, e3) {
            let i3, s2;
            let o2 = this.options, r2 = o2.vertical, n2 = o2.minWidth, h2 = this.barWidth, d2 = !this.rendered || this.hasDragged || this.chart.navigator && this.chart.navigator.hasDragged ? "attr" : "animate";
            if (!l(h2))
              return;
            let c2 = h2 * Math.min(e3, 1);
            i3 = Math.ceil(h2 * (t3 = Math.max(t3, 0))), this.calculatedWidth = s2 = a(c2 - i3), s2 < n2 && (i3 = (h2 - n2 + s2) * t3, s2 = n2);
            let p2 = Math.floor(i3 + this.xOffset + this.yOffset), u2 = s2 / 2 - 0.5;
            this.from = t3, this.to = e3, r2 ? (this.scrollbarGroup[d2]({ translateY: p2 }), this.scrollbar[d2]({ height: s2 }), this.scrollbarRifles[d2]({ translateY: u2 }), this.scrollbarTop = p2, this.scrollbarLeft = 0) : (this.scrollbarGroup[d2]({ translateX: p2 }), this.scrollbar[d2]({ width: s2 }), this.scrollbarRifles[d2]({ translateX: u2 }), this.scrollbarLeft = p2, this.scrollbarTop = 0), s2 <= 12 ? this.scrollbarRifles.hide() : this.scrollbarRifles.show(), false === o2.showFull && (t3 <= 0 && e3 >= 1 ? this.group.hide() : this.group.show()), this.rendered = true;
          }
          shouldUpdateExtremes(t3) {
            return p(this.options.liveRedraw, e2.svg && !e2.isTouchDevice && !this.chart.boosted) || "mouseup" === t3 || "touchend" === t3 || !l(t3);
          }
          trackClick(t3) {
            let e3 = this.chart.pointer.normalize(t3), i3 = this.to - this.from, s2 = this.y + this.scrollbarTop, o2 = this.x + this.scrollbarLeft;
            this.options.vertical && e3.chartY > s2 || !this.options.vertical && e3.chartX > o2 ? this.updatePosition(this.from + i3, this.to + i3) : this.updatePosition(this.from - i3, this.to - i3), d(this, "changed", { from: this.from, to: this.to, trigger: "scrollbar", DOMEvent: t3 });
          }
          update(t3) {
            this.destroy(), this.init(this.chart.renderer, c(true, this.options, t3), this.chart);
          }
          updatePosition(t3, e3) {
            e3 > 1 && (t3 = a(1 - a(e3 - t3)), e3 = 1), t3 < 0 && (e3 = a(e3 - t3), t3 = 0), this.from = t3, this.to = e3;
          }
        }
        return g.defaultOptions = s, r.scrollbar = c(true, g.defaultOptions, r.scrollbar), g;
      }), i(e, "Stock/Navigator/Navigator.js", [e["Core/Axis/Axis.js"], e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Axis/NavigatorAxisComposition.js"], e["Stock/Navigator/NavigatorComposition.js"], e["Stock/Scrollbar/Scrollbar.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, o, r, n) {
        let { defaultOptions: a } = e2, { hasTouch: l, isTouchDevice: h } = i2, { addEvent: d, clamp: c, correctFloat: p, defined: u, destroyObjectProperties: g, erase: x, extend: f, find: m, fireEvent: b, isArray: y, isNumber: M, merge: v, pick: k, removeEvent: A, splat: S } = n;
        function C(t3, ...e3) {
          let i3 = [].filter.call(e3, M);
          if (i3.length)
            return Math[t3].apply(0, i3);
        }
        class w {
          static compose(t3, e3, i3) {
            o.compose(t3, e3, w, i3);
          }
          constructor(t3) {
            this.scrollbarHeight = 0, this.init(t3);
          }
          drawHandle(t3, e3, i3, s2) {
            let o2 = this.navigatorOptions.handles.height;
            this.handles[e3][s2](i3 ? { translateX: Math.round(this.left + this.height / 2), translateY: Math.round(this.top + parseInt(t3, 10) + 0.5 - o2) } : { translateX: Math.round(this.left + parseInt(t3, 10)), translateY: Math.round(this.top + this.height / 2 - o2 / 2 - 1) });
          }
          drawOutline(t3, e3, i3, s2) {
            let o2 = this.navigatorOptions.maskInside, r2 = this.outline.strokeWidth(), n2 = r2 / 2, a2 = r2 % 2 / 2, l2 = this.scrollButtonSize, h2 = this.size, d2 = this.top, c2 = this.height, p2 = d2 - n2, u2 = d2 + c2, g2 = this.left, x2, f2;
            i3 ? (x2 = d2 + e3 + a2, e3 = d2 + t3 + a2, f2 = [["M", g2 + c2, d2 - l2 - a2], ["L", g2 + c2, x2], ["L", g2, x2], ["M", g2, e3], ["L", g2 + c2, e3], ["L", g2 + c2, d2 + h2 + l2]], o2 && f2.push(["M", g2 + c2, x2 - n2], ["L", g2 + c2, e3 + n2])) : (g2 -= l2, t3 += g2 + l2 - a2, e3 += g2 + l2 - a2, f2 = [["M", g2, p2], ["L", t3, p2], ["L", t3, u2], ["M", e3, u2], ["L", e3, p2], ["L", g2 + h2 + 2 * l2, d2 + n2]], o2 && f2.push(["M", t3 - n2, p2], ["L", e3 + n2, p2])), this.outline[s2]({ d: f2 });
          }
          drawMasks(t3, e3, i3, s2) {
            let o2, r2, n2, a2;
            let l2 = this.left, h2 = this.top, d2 = this.height;
            i3 ? (n2 = [l2, l2, l2], a2 = [h2, h2 + t3, h2 + e3], r2 = [d2, d2, d2], o2 = [t3, e3 - t3, this.size - e3]) : (n2 = [l2, l2 + t3, l2 + e3], a2 = [h2, h2, h2], r2 = [t3, e3 - t3, this.size - e3], o2 = [d2, d2, d2]), this.shades.forEach((t4, e4) => {
              t4[s2]({ x: n2[e4], y: a2[e4], width: r2[e4], height: o2[e4] });
            });
          }
          renderElements() {
            let t3 = this, e3 = t3.navigatorOptions, i3 = e3.maskInside, s2 = t3.chart, o2 = s2.inverted, r2 = s2.renderer, n2 = { cursor: o2 ? "ns-resize" : "ew-resize" }, a2 = t3.navigatorGroup = r2.g("navigator").attr({ zIndex: 8, visibility: "hidden" }).add();
            if ([!i3, i3, !i3].forEach((i4, o3) => {
              let l2 = r2.rect().addClass("highcharts-navigator-mask" + (1 === o3 ? "-inside" : "-outside")).add(a2);
              s2.styledMode || (l2.attr({ fill: i4 ? e3.maskFill : "rgba(0,0,0,0)" }), 1 === o3 && l2.css(n2)), t3.shades[o3] = l2;
            }), t3.outline = r2.path().addClass("highcharts-navigator-outline").add(a2), s2.styledMode || t3.outline.attr({ "stroke-width": e3.outlineWidth, stroke: e3.outlineColor }), e3.handles && e3.handles.enabled) {
              let i4 = e3.handles, { height: o3, width: l2 } = i4;
              [0, 1].forEach((e4) => {
                t3.handles[e4] = r2.symbol(i4.symbols[e4], -l2 / 2 - 1, 0, l2, o3, i4), s2.inverted && t3.handles[e4].attr({ rotation: 90, rotationOriginX: Math.floor(-l2 / 2), rotationOriginY: (o3 + l2) / 2 }), t3.handles[e4].attr({ zIndex: 7 - e4 }).addClass("highcharts-navigator-handle highcharts-navigator-handle-" + ["left", "right"][e4]).add(a2), s2.styledMode || t3.handles[e4].attr({ fill: i4.backgroundColor, stroke: i4.borderColor, "stroke-width": i4.lineWidth }).css(n2);
              });
            }
          }
          update(t3) {
            (this.series || []).forEach((t4) => {
              t4.baseSeries && delete t4.baseSeries.navigatorSeries;
            }), this.destroy();
            let e3 = this.chart.options;
            v(true, e3.navigator, t3), this.init(this.chart);
          }
          render(t3, e3, i3, s2) {
            let o2 = this.chart, r2 = this.xAxis, n2 = r2.pointRange || 0, a2 = r2.navigatorAxis.fake ? o2.xAxis[0] : r2, l2 = this.navigatorEnabled, h2 = this.rendered, d2 = o2.inverted, g2 = o2.xAxis[0].minRange, x2 = o2.xAxis[0].options.maxRange, f2 = this.scrollButtonSize, m2, y2, v2, A2 = this.scrollbarHeight, S2, C2;
            if (this.hasDragged && !u(i3))
              return;
            if (t3 = p(t3 - n2 / 2), e3 = p(e3 + n2 / 2), !M(t3) || !M(e3)) {
              if (!h2)
                return;
              i3 = 0, s2 = k(r2.width, a2.width);
            }
            this.left = k(r2.left, o2.plotLeft + f2 + (d2 ? o2.plotWidth : 0));
            let w2 = this.size = S2 = k(r2.len, (d2 ? o2.plotHeight : o2.plotWidth) - 2 * f2);
            m2 = d2 ? A2 : S2 + 2 * f2, i3 = k(i3, r2.toPixels(t3, true)), s2 = k(s2, r2.toPixels(e3, true)), M(i3) && Math.abs(i3) !== 1 / 0 || (i3 = 0, s2 = m2);
            let B = r2.toValue(i3, true), P = r2.toValue(s2, true), T = Math.abs(p(P - B));
            T < g2 ? this.grabbedLeft ? i3 = r2.toPixels(P - g2 - n2, true) : this.grabbedRight && (s2 = r2.toPixels(B + g2 + n2, true)) : u(x2) && p(T - n2) > x2 && (this.grabbedLeft ? i3 = r2.toPixels(P - x2 - n2, true) : this.grabbedRight && (s2 = r2.toPixels(B + x2 + n2, true))), this.zoomedMax = c(Math.max(i3, s2), 0, w2), this.zoomedMin = c(this.fixedWidth ? this.zoomedMax - this.fixedWidth : Math.min(i3, s2), 0, w2), this.range = this.zoomedMax - this.zoomedMin, w2 = Math.round(this.zoomedMax);
            let E = Math.round(this.zoomedMin);
            l2 && (this.navigatorGroup.attr({ visibility: "inherit" }), C2 = h2 && !this.hasDragged ? "animate" : "attr", this.drawMasks(E, w2, d2, C2), this.drawOutline(E, w2, d2, C2), this.navigatorOptions.handles.enabled && (this.drawHandle(E, 0, d2, C2), this.drawHandle(w2, 1, d2, C2))), this.scrollbar && (d2 ? (v2 = this.top - f2, y2 = this.left - A2 + (l2 || !a2.opposite ? 0 : (a2.titleOffset || 0) + a2.axisTitleMargin), A2 = S2 + 2 * f2) : (v2 = this.top + (l2 ? this.height : -A2), y2 = this.left - f2), this.scrollbar.position(y2, v2, m2, A2), this.scrollbar.setRange(this.zoomedMin / (S2 || 1), this.zoomedMax / (S2 || 1))), this.rendered = true, b(this, "afterRender");
          }
          addMouseEvents() {
            let t3 = this, e3 = t3.chart, i3 = e3.container, s2 = [], o2, r2;
            t3.mouseMoveHandler = o2 = function(e4) {
              t3.onMouseMove(e4);
            }, t3.mouseUpHandler = r2 = function(e4) {
              t3.onMouseUp(e4);
            }, (s2 = t3.getPartsEvents("mousedown")).push(d(e3.renderTo, "mousemove", o2), d(i3.ownerDocument, "mouseup", r2)), l && (s2.push(d(e3.renderTo, "touchmove", o2), d(i3.ownerDocument, "touchend", r2)), s2.concat(t3.getPartsEvents("touchstart"))), t3.eventsToUnbind = s2, t3.series && t3.series[0] && s2.push(d(t3.series[0].xAxis, "foundExtremes", function() {
              e3.navigator.modifyNavigatorAxisExtremes();
            }));
          }
          getPartsEvents(t3) {
            let e3 = this, i3 = [];
            return ["shades", "handles"].forEach(function(s2) {
              e3[s2].forEach(function(o2, r2) {
                i3.push(d(o2.element, t3, function(t4) {
                  e3[s2 + "Mousedown"](t4, r2);
                }));
              });
            }), i3;
          }
          shadesMousedown(t3, e3) {
            t3 = this.chart.pointer.normalize(t3);
            let i3 = this.chart, s2 = this.xAxis, o2 = this.zoomedMin, r2 = this.size, n2 = this.range, a2 = this.left, l2 = t3.chartX, h2, d2, c2, p2;
            i3.inverted && (l2 = t3.chartY, a2 = this.top), 1 === e3 ? (this.grabbedCenter = l2, this.fixedWidth = n2, this.dragOffset = l2 - o2) : (p2 = l2 - a2 - n2 / 2, 0 === e3 ? p2 = Math.max(0, p2) : 2 === e3 && p2 + n2 >= r2 && (p2 = r2 - n2, this.reversedExtremes ? (p2 -= n2, d2 = this.getUnionExtremes().dataMin) : h2 = this.getUnionExtremes().dataMax), p2 !== o2 && (this.fixedWidth = n2, u((c2 = s2.navigatorAxis.toFixedRange(p2, p2 + n2, d2, h2)).min) && i3.xAxis[0].setExtremes(Math.min(c2.min, c2.max), Math.max(c2.min, c2.max), true, null, { trigger: "navigator" })));
          }
          handlesMousedown(t3, e3) {
            t3 = this.chart.pointer.normalize(t3);
            let i3 = this.chart, s2 = i3.xAxis[0], o2 = this.reversedExtremes;
            0 === e3 ? (this.grabbedLeft = true, this.otherHandlePos = this.zoomedMax, this.fixedExtreme = o2 ? s2.min : s2.max) : (this.grabbedRight = true, this.otherHandlePos = this.zoomedMin, this.fixedExtreme = o2 ? s2.max : s2.min), i3.fixedRange = null;
          }
          onMouseMove(t3) {
            let e3 = this, i3 = e3.chart, s2 = e3.navigatorSize, o2 = e3.range, r2 = e3.dragOffset, n2 = i3.inverted, a2 = e3.left, l2;
            (!t3.touches || 0 !== t3.touches[0].pageX) && (l2 = (t3 = i3.pointer.normalize(t3)).chartX, n2 && (a2 = e3.top, l2 = t3.chartY), e3.grabbedLeft ? (e3.hasDragged = true, e3.render(0, 0, l2 - a2, e3.otherHandlePos)) : e3.grabbedRight ? (e3.hasDragged = true, e3.render(0, 0, e3.otherHandlePos, l2 - a2)) : e3.grabbedCenter && (e3.hasDragged = true, l2 < r2 ? l2 = r2 : l2 > s2 + r2 - o2 && (l2 = s2 + r2 - o2), e3.render(0, 0, l2 - r2, l2 - r2 + o2)), e3.hasDragged && e3.scrollbar && k(e3.scrollbar.options.liveRedraw, !h && !this.chart.boosted) && (t3.DOMType = t3.type, setTimeout(function() {
              e3.onMouseUp(t3);
            }, 0)));
          }
          onMouseUp(t3) {
            let e3, i3, s2, o2, r2, n2;
            let a2 = this.chart, l2 = this.xAxis, h2 = this.scrollbar, d2 = t3.DOMEvent || t3, c2 = a2.inverted, p2 = this.rendered && !this.hasDragged ? "animate" : "attr";
            (this.hasDragged && (!h2 || !h2.hasDragged) || "scrollbar" === t3.trigger) && (s2 = this.getUnionExtremes(), this.zoomedMin === this.otherHandlePos ? o2 = this.fixedExtreme : this.zoomedMax === this.otherHandlePos && (r2 = this.fixedExtreme), this.zoomedMax === this.size && (r2 = this.reversedExtremes ? s2.dataMin : s2.dataMax), 0 === this.zoomedMin && (o2 = this.reversedExtremes ? s2.dataMax : s2.dataMin), u((n2 = l2.navigatorAxis.toFixedRange(this.zoomedMin, this.zoomedMax, o2, r2)).min) && a2.xAxis[0].setExtremes(Math.min(n2.min, n2.max), Math.max(n2.min, n2.max), true, !this.hasDragged && null, { trigger: "navigator", triggerOp: "navigator-drag", DOMEvent: d2 })), "mousemove" !== t3.DOMType && "touchmove" !== t3.DOMType && (this.grabbedLeft = this.grabbedRight = this.grabbedCenter = this.fixedWidth = this.fixedExtreme = this.otherHandlePos = this.hasDragged = this.dragOffset = null), this.navigatorEnabled && M(this.zoomedMin) && M(this.zoomedMax) && (i3 = Math.round(this.zoomedMin), e3 = Math.round(this.zoomedMax), this.shades && this.drawMasks(i3, e3, c2, p2), this.outline && this.drawOutline(i3, e3, c2, p2), this.navigatorOptions.handles.enabled && Object.keys(this.handles).length === this.handles.length && (this.drawHandle(i3, 0, c2, p2), this.drawHandle(e3, 1, c2, p2)));
          }
          removeEvents() {
            this.eventsToUnbind && (this.eventsToUnbind.forEach(function(t3) {
              t3();
            }), this.eventsToUnbind = void 0), this.removeBaseSeriesEvents();
          }
          removeBaseSeriesEvents() {
            let t3 = this.baseSeries || [];
            this.navigatorEnabled && t3[0] && (false !== this.navigatorOptions.adaptToUpdatedData && t3.forEach(function(t4) {
              A(t4, "updatedData", this.updatedDataHandler);
            }, this), t3[0].xAxis && A(t3[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes));
          }
          init(e3) {
            let i3 = e3.options, o2 = i3.navigator || {}, n2 = o2.enabled, a2 = i3.scrollbar || {}, l2 = a2.enabled, h2 = n2 && o2.height || 0, c2 = l2 && a2.height || 0, p2 = a2.buttonsEnabled && c2 || 0;
            this.handles = [], this.shades = [], this.chart = e3, this.setBaseSeries(), this.height = h2, this.scrollbarHeight = c2, this.scrollButtonSize = p2, this.scrollbarEnabled = l2, this.navigatorEnabled = n2, this.navigatorOptions = o2, this.scrollbarOptions = a2, this.opposite = k(o2.opposite, !!(!n2 && e3.inverted));
            let u2 = this, g2 = u2.baseSeries, x2 = e3.xAxis.length, f2 = e3.yAxis.length, m2 = g2 && g2[0] && g2[0].xAxis || e3.xAxis[0] || { options: {} };
            if (e3.isDirtyBox = true, u2.navigatorEnabled ? (u2.xAxis = new t2(e3, v({ breaks: m2.options.breaks, ordinal: m2.options.ordinal }, o2.xAxis, { id: "navigator-x-axis", yAxis: "navigator-y-axis", type: "datetime", index: x2, isInternal: true, offset: 0, keepOrdinalPadding: true, startOnTick: false, endOnTick: false, minPadding: 0, maxPadding: 0, zoomEnabled: false }, e3.inverted ? { offsets: [p2, 0, -p2, 0], width: h2 } : { offsets: [0, -p2, 0, p2], height: h2 }), "xAxis"), u2.yAxis = new t2(e3, v(o2.yAxis, { id: "navigator-y-axis", alignTicks: false, offset: 0, index: f2, isInternal: true, reversed: k(o2.yAxis && o2.yAxis.reversed, e3.yAxis[0] && e3.yAxis[0].reversed, false), zoomEnabled: false }, e3.inverted ? { width: h2 } : { height: h2 }), "yAxis"), g2 || o2.series.data ? u2.updateNavigatorSeries(false) : 0 === e3.series.length && (u2.unbindRedraw = d(e3, "beforeRedraw", function() {
              e3.series.length > 0 && !u2.series && (u2.setBaseSeries(), u2.unbindRedraw());
            })), u2.reversedExtremes = e3.inverted && !u2.xAxis.reversed || !e3.inverted && u2.xAxis.reversed, u2.renderElements(), u2.addMouseEvents()) : (u2.xAxis = { chart: e3, navigatorAxis: { fake: true }, translate: function(t3, i4) {
              let s2 = e3.xAxis[0], o3 = s2.getExtremes(), r2 = s2.len - 2 * p2, n3 = C("min", s2.options.min, o3.dataMin), a3 = C("max", s2.options.max, o3.dataMax) - n3;
              return i4 ? t3 * a3 / r2 + n3 : r2 * (t3 - n3) / a3;
            }, toPixels: function(t3) {
              return this.translate(t3);
            }, toValue: function(t3) {
              return this.translate(t3, true);
            } }, u2.xAxis.navigatorAxis.axis = u2.xAxis, u2.xAxis.navigatorAxis.toFixedRange = s.prototype.toFixedRange.bind(u2.xAxis.navigatorAxis)), e3.options.scrollbar.enabled) {
              let t3 = v(e3.options.scrollbar, { vertical: e3.inverted });
              !M(t3.margin) && u2.navigatorEnabled && (t3.margin = e3.inverted ? -3 : 3), e3.scrollbar = u2.scrollbar = new r(e3.renderer, t3, e3), d(u2.scrollbar, "changed", function(t4) {
                let e4 = u2.size, i4 = e4 * this.to, s2 = e4 * this.from;
                u2.hasDragged = u2.scrollbar.hasDragged, u2.render(0, 0, s2, i4), this.shouldUpdateExtremes(t4.DOMType) && setTimeout(function() {
                  u2.onMouseUp(t4);
                });
              });
            }
            u2.addBaseSeriesEvents(), u2.addChartEvents();
          }
          getUnionExtremes(t3) {
            let e3;
            let i3 = this.chart.xAxis[0], s2 = this.xAxis, o2 = s2.options, r2 = i3.options;
            return t3 && null === i3.dataMin || (e3 = { dataMin: k(o2 && o2.min, C("min", r2.min, i3.dataMin, s2.dataMin, s2.min)), dataMax: k(o2 && o2.max, C("max", r2.max, i3.dataMax, s2.dataMax, s2.max)) }), e3;
          }
          setBaseSeries(t3, e3) {
            let i3 = this.chart, s2 = this.baseSeries = [];
            t3 = t3 || i3.options && i3.options.navigator.baseSeries || (i3.series.length ? m(i3.series, (t4) => !t4.options.isInternal).index : 0), (i3.series || []).forEach((e4, i4) => {
              !e4.options.isInternal && (e4.options.showInNavigator || (i4 === t3 || e4.options.id === t3) && false !== e4.options.showInNavigator) && s2.push(e4);
            }), this.xAxis && !this.xAxis.navigatorAxis.fake && this.updateNavigatorSeries(true, e3);
          }
          updateNavigatorSeries(t3, e3) {
            let i3 = this, s2 = i3.chart, o2 = i3.baseSeries, r2 = { enableMouseTracking: false, index: null, linkedTo: null, group: "nav", padXAxis: false, xAxis: "navigator-x-axis", yAxis: "navigator-y-axis", showInLegend: false, stacking: void 0, isInternal: true, states: { inactive: { opacity: 1 } } }, n2 = i3.series = (i3.series || []).filter((t4) => {
              let e4 = t4.baseSeries;
              return !(0 > o2.indexOf(e4)) || (e4 && (A(e4, "updatedData", i3.updatedDataHandler), delete e4.navigatorSeries), t4.chart && t4.destroy(), false);
            }), l2, h2, d2 = i3.navigatorOptions.series, c2;
            o2 && o2.length && o2.forEach((t4) => {
              let p2 = t4.navigatorSeries, u2 = f({ color: t4.color, visible: t4.visible }, y(d2) ? a.navigator.series : d2);
              if (p2 && false === i3.navigatorOptions.adaptToUpdatedData)
                return;
              r2.name = "Navigator " + o2.length, c2 = (l2 = t4.options || {}).navigatorOptions || {}, u2.dataLabels = S(u2.dataLabels), (h2 = v(l2, r2, u2, c2)).pointRange = k(u2.pointRange, c2.pointRange, a.plotOptions[h2.type || "line"].pointRange);
              let g2 = c2.data || u2.data;
              i3.hasNavigatorData = i3.hasNavigatorData || !!g2, h2.data = g2 || l2.data && l2.data.slice(0), p2 && p2.options ? p2.update(h2, e3) : (t4.navigatorSeries = s2.initSeries(h2), t4.navigatorSeries.baseSeries = t4, n2.push(t4.navigatorSeries));
            }), (d2.data && !(o2 && o2.length) || y(d2)) && (i3.hasNavigatorData = false, (d2 = S(d2)).forEach((t4, e4) => {
              r2.name = "Navigator " + (n2.length + 1), (h2 = v(a.navigator.series, { color: s2.series[e4] && !s2.series[e4].options.isInternal && s2.series[e4].color || s2.options.colors[e4] || s2.options.colors[0] }, r2, t4)).data = t4.data, h2.data && (i3.hasNavigatorData = true, n2.push(s2.initSeries(h2)));
            })), t3 && this.addBaseSeriesEvents();
          }
          addBaseSeriesEvents() {
            let t3 = this, e3 = t3.baseSeries || [];
            e3[0] && e3[0].xAxis && e3[0].eventsToUnbind.push(d(e3[0].xAxis, "foundExtremes", this.modifyBaseAxisExtremes)), e3.forEach((e4) => {
              e4.eventsToUnbind.push(d(e4, "show", function() {
                this.navigatorSeries && this.navigatorSeries.setVisible(true, false);
              })), e4.eventsToUnbind.push(d(e4, "hide", function() {
                this.navigatorSeries && this.navigatorSeries.setVisible(false, false);
              })), false !== this.navigatorOptions.adaptToUpdatedData && e4.xAxis && e4.eventsToUnbind.push(d(e4, "updatedData", this.updatedDataHandler)), e4.eventsToUnbind.push(d(e4, "remove", function() {
                this.navigatorSeries && (x(t3.series, this.navigatorSeries), u(this.navigatorSeries.options) && this.navigatorSeries.remove(false), delete this.navigatorSeries);
              }));
            });
          }
          getBaseSeriesMin(t3) {
            return this.baseSeries.reduce(function(t4, e3) {
              return Math.min(t4, e3.xData && e3.xData.length ? e3.xData[0] : t4);
            }, t3);
          }
          modifyNavigatorAxisExtremes() {
            let t3 = this.xAxis;
            if (void 0 !== t3.getExtremes) {
              let e3 = this.getUnionExtremes(true);
              e3 && (e3.dataMin !== t3.min || e3.dataMax !== t3.max) && (t3.min = e3.dataMin, t3.max = e3.dataMax);
            }
          }
          modifyBaseAxisExtremes() {
            let t3, e3;
            let i3 = this.chart.navigator, s2 = this.getExtremes(), o2 = s2.min, r2 = s2.max, n2 = s2.dataMin, a2 = s2.dataMax, l2 = r2 - o2, h2 = i3.stickToMin, d2 = i3.stickToMax, c2 = k(this.options.overscroll, 0), p2 = i3.series && i3.series[0], u2 = !!this.setExtremes, g2 = this.eventArgs && "rangeSelectorButton" === this.eventArgs.trigger;
            !g2 && (h2 && (t3 = (e3 = n2) + l2), d2 && (t3 = a2 + c2, h2 || (e3 = Math.max(n2, t3 - l2, i3.getBaseSeriesMin(p2 && p2.xData ? p2.xData[0] : -Number.MAX_VALUE)))), u2 && (h2 || d2) && M(e3) && (this.min = this.userMin = e3, this.max = this.userMax = t3)), i3.stickToMin = i3.stickToMax = null;
          }
          updatedDataHandler() {
            let t3 = this.chart.navigator, e3 = this.navigatorSeries, i3 = t3.reversedExtremes ? 0 === Math.round(t3.zoomedMin) : Math.round(t3.zoomedMax) >= Math.round(t3.size);
            t3.stickToMax = k(this.chart.options.navigator && this.chart.options.navigator.stickToMax, i3), t3.stickToMin = t3.shouldStickToMin(this, t3), e3 && !t3.hasNavigatorData && (e3.options.pointStart = this.xData[0], e3.setData(this.options.data, false, null, false));
          }
          shouldStickToMin(t3, e3) {
            let i3 = e3.getBaseSeriesMin(t3.xData[0]), s2 = t3.xAxis, o2 = s2.max, r2 = s2.min, n2 = s2.options.range;
            return !!(M(o2) && M(r2)) && (n2 && o2 - i3 > 0 ? o2 - i3 < n2 : r2 <= i3);
          }
          addChartEvents() {
            this.eventsToUnbind || (this.eventsToUnbind = []), this.eventsToUnbind.push(d(this.chart, "redraw", function() {
              let t3 = this.navigator, e3 = t3 && (t3.baseSeries && t3.baseSeries[0] && t3.baseSeries[0].xAxis || this.xAxis[0]);
              e3 && t3.render(e3.min, e3.max);
            }), d(this.chart, "getMargins", function() {
              let t3 = this.navigator, e3 = t3.opposite ? "plotTop" : "marginBottom";
              this.inverted && (e3 = t3.opposite ? "marginRight" : "plotLeft"), this[e3] = (this[e3] || 0) + (t3.navigatorEnabled || !this.inverted ? t3.height + t3.scrollbarHeight : 0) + t3.navigatorOptions.margin;
            }));
          }
          destroy() {
            this.removeEvents(), this.xAxis && (x(this.chart.xAxis, this.xAxis), x(this.chart.axes, this.xAxis)), this.yAxis && (x(this.chart.yAxis, this.yAxis), x(this.chart.axes, this.yAxis)), (this.series || []).forEach((t3) => {
              t3.destroy && t3.destroy();
            }), ["series", "xAxis", "yAxis", "shades", "outline", "scrollbarTrack", "scrollbarRifles", "scrollbarGroup", "scrollbar", "navigatorGroup", "rendered"].forEach((t3) => {
              this[t3] && this[t3].destroy && this[t3].destroy(), this[t3] = null;
            }), [this.handles].forEach((t3) => {
              g(t3);
            });
          }
        }
        return w;
      }), i(e, "Series/PathUtilities.js", [], function() {
        function t2(t3, e2) {
          let i2 = [];
          for (let s = 0; s < t3.length; s++) {
            let o = t3[s][1], r = t3[s][2];
            if ("number" == typeof o && "number" == typeof r) {
              if (0 === s)
                i2.push(["M", o, r]);
              else if (s === t3.length - 1)
                i2.push(["L", o, r]);
              else if (e2) {
                let n = t3[s - 1], a = t3[s + 1];
                if (n && a) {
                  let t4 = n[1], s2 = n[2], l = a[1], h = a[2];
                  if ("number" == typeof t4 && "number" == typeof l && "number" == typeof s2 && "number" == typeof h && t4 !== l && s2 !== h) {
                    let n2 = t4 < l ? 1 : -1, a2 = s2 < h ? 1 : -1;
                    i2.push(["L", o - n2 * Math.min(Math.abs(o - t4), e2), r - a2 * Math.min(Math.abs(r - s2), e2)], ["C", o, r, o, r, o + n2 * Math.min(Math.abs(o - l), e2), r + a2 * Math.min(Math.abs(r - h), e2)]);
                  }
                }
              } else
                i2.push(["L", o, r]);
            }
          }
          return i2;
        }
        return { applyRadius: t2, getLinkPath: { default: function(e2) {
          let { x1: i2, y1: s, x2: o, y2: r, width: n = 0, inverted: a = false, radius: l, parentVisible: h } = e2, d = [["M", i2, s], ["L", i2, s], ["C", i2, s, i2, r, i2, r], ["L", i2, r], ["C", i2, s, i2, r, i2, r], ["L", i2, r]];
          return h ? t2([["M", i2, s], ["L", i2 + n * (a ? -0.5 : 0.5), s], ["L", i2 + n * (a ? -0.5 : 0.5), r], ["L", o, r]], l) : d;
        }, straight: function(t3) {
          let { x1: e2, y1: i2, x2: s, y2: o, width: r = 0, inverted: n = false, parentVisible: a } = t3;
          return a ? [["M", e2, i2], ["L", e2 + r * (n ? -1 : 1), o], ["L", s, o]] : [["M", e2, i2], ["L", e2, o], ["L", e2, o]];
        }, curved: function(t3) {
          let { x1: e2, y1: i2, x2: s, y2: o, offset: r = 0, width: n = 0, inverted: a = false, parentVisible: l } = t3;
          return l ? [["M", e2, i2], ["C", e2 + r, i2, e2 - r + n * (a ? -1 : 1), o, e2 + n * (a ? -1 : 1), o], ["L", s, o]] : [["M", e2, i2], ["C", e2, i2, e2, o, e2, o], ["L", s, o]];
        } } };
      }), i(e, "Gantt/PathfinderAlgorithms.js", [e["Series/PathUtilities.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { pick: i2 } = e2, { min: s, max: o, abs: r } = Math;
        function n(t3, e3, i3) {
          let s2 = e3 - 1e-7, o2 = i3 || 0, r2 = t3.length - 1, n2, a2;
          for (; o2 <= r2; )
            if ((a2 = s2 - t3[n2 = r2 + o2 >> 1].xMin) > 0)
              o2 = n2 + 1;
            else {
              if (!(a2 < 0))
                return n2;
              r2 = n2 - 1;
            }
          return o2 > 0 ? o2 - 1 : 0;
        }
        function a(t3, e3) {
          let i3 = n(t3, e3.x + 1) + 1;
          for (; i3--; ) {
            var s2;
            if (t3[i3].xMax >= e3.x && (s2 = t3[i3], e3.x <= s2.xMax && e3.x >= s2.xMin && e3.y <= s2.yMax && e3.y >= s2.yMin))
              return i3;
          }
          return -1;
        }
        function l(t3) {
          let e3 = [];
          if (t3.length) {
            e3.push(["M", t3[0].start.x, t3[0].start.y]);
            for (let i3 = 0; i3 < t3.length; ++i3)
              e3.push(["L", t3[i3].end.x, t3[i3].end.y]);
          }
          return e3;
        }
        function h(t3, e3) {
          t3.yMin = o(t3.yMin, e3.yMin), t3.yMax = s(t3.yMax, e3.yMax), t3.xMin = o(t3.xMin, e3.xMin), t3.xMax = s(t3.xMax, e3.xMax);
        }
        let d = function(e3, s2, o2) {
          let n2 = [], h2 = o2.chartObstacles, d2 = a(h2, e3), c2 = a(h2, s2), p, u = i2(o2.startDirectionX, r(s2.x - e3.x) > r(s2.y - e3.y)) ? "x" : "y", g, x, f, m;
          function b(t3, e4, i3, s3, o3) {
            let r2 = { x: t3.x, y: t3.y };
            return r2[e4] = i3[s3 || e4] + (o3 || 0), r2;
          }
          function y(t3, e4, i3) {
            let s3 = r(e4[i3] - t3[i3 + "Min"]) > r(e4[i3] - t3[i3 + "Max"]);
            return b(e4, i3, t3, i3 + (s3 ? "Max" : "Min"), s3 ? 1 : -1);
          }
          c2 > -1 ? (p = { start: x = y(h2[c2], s2, u), end: s2 }, m = x) : m = s2, d2 > -1 && (x = y(g = h2[d2], e3, u), n2.push({ start: e3, end: x }), x[u] >= e3[u] == x[u] >= m[u] && (f = e3[u = "y" === u ? "x" : "y"] < s2[u], n2.push({ start: x, end: b(x, u, g, u + (f ? "Max" : "Min"), f ? 1 : -1) }), u = "y" === u ? "x" : "y"));
          let M = n2.length ? n2[n2.length - 1].end : e3;
          x = b(M, u, m), n2.push({ start: M, end: x }), u = "y" === u ? "x" : "y";
          let v = b(x, u, m);
          n2.push({ start: x, end: v }), n2.push(p);
          let k = t2.applyRadius(l(n2), o2.radius);
          return { path: k, obstacles: n2 };
        };
        function c(t3, e3, d2) {
          let c2 = i2(d2.startDirectionX, r(e3.x - t3.x) > r(e3.y - t3.y)), p = c2 ? "x" : "y", u = [], g = d2.obstacleMetrics, x = s(t3.x, e3.x) - g.maxWidth - 10, f = o(t3.x, e3.x) + g.maxWidth + 10, m = s(t3.y, e3.y) - g.maxHeight - 10, b = o(t3.y, e3.y) + g.maxHeight + 10, y, M, v, k = false, A = d2.chartObstacles, S = n(A, f), C = n(A, x);
          function w(t4, e4, i3) {
            let o2, r2, a2, l2;
            let h2 = t4.x < e4.x ? 1 : -1;
            t4.x < e4.x ? (o2 = t4, r2 = e4) : (o2 = e4, r2 = t4), t4.y < e4.y ? (l2 = t4, a2 = e4) : (l2 = e4, a2 = t4);
            let d3 = h2 < 0 ? s(n(A, r2.x), A.length - 1) : 0;
            for (; A[d3] && (h2 > 0 && A[d3].xMin <= r2.x || h2 < 0 && A[d3].xMax >= o2.x); ) {
              if (A[d3].xMin <= r2.x && A[d3].xMax >= o2.x && A[d3].yMin <= a2.y && A[d3].yMax >= l2.y) {
                if (i3)
                  return { y: t4.y, x: t4.x < e4.x ? A[d3].xMin - 1 : A[d3].xMax + 1, obstacle: A[d3] };
                return { x: t4.x, y: t4.y < e4.y ? A[d3].yMin - 1 : A[d3].yMax + 1, obstacle: A[d3] };
              }
              d3 += h2;
            }
            return e4;
          }
          function B(t4, e4, i3, s2, o2) {
            let n2 = o2.soft, a2 = o2.hard, l2 = s2 ? "x" : "y", h2 = { x: e4.x, y: e4.y }, d3 = { x: e4.x, y: e4.y }, c3 = t4[l2 + "Max"] >= n2[l2 + "Max"], p2 = t4[l2 + "Min"] <= n2[l2 + "Min"], u2 = t4[l2 + "Max"] >= a2[l2 + "Max"], g2 = t4[l2 + "Min"] <= a2[l2 + "Min"], x2 = r(t4[l2 + "Min"] - e4[l2]), f2 = r(t4[l2 + "Max"] - e4[l2]), m2 = 10 > r(x2 - f2) ? e4[l2] < i3[l2] : f2 < x2;
            d3[l2] = t4[l2 + "Min"], h2[l2] = t4[l2 + "Max"];
            let b2 = w(e4, d3, s2)[l2] !== d3[l2], y2 = w(e4, h2, s2)[l2] !== h2[l2];
            return m2 = b2 ? !y2 || m2 : !y2 && m2, m2 = p2 ? !c3 || m2 : !c3 && m2, m2 = g2 ? !u2 || m2 : !u2 && m2;
          }
          for ((S = a(A = A.slice(C, S + 1), e3)) > -1 && (v = function(t4, e4, i3) {
            let o2 = s(t4.xMax - e4.x, e4.x - t4.xMin) < s(t4.yMax - e4.y, e4.y - t4.yMin), r2 = { soft: d2.hardBounds, hard: d2.hardBounds }, n2 = B(t4, e4, i3, o2, r2);
            return o2 ? { y: e4.y, x: t4[n2 ? "xMax" : "xMin"] + (n2 ? 1 : -1) } : { x: e4.x, y: t4[n2 ? "yMax" : "yMin"] + (n2 ? 1 : -1) };
          }(A[S], e3, t3), u.push({ end: e3, start: v }), e3 = v); (S = a(A, e3)) > -1; )
            M = e3[p] - t3[p] < 0, (v = { x: e3.x, y: e3.y })[p] = A[S][M ? p + "Max" : p + "Min"] + (M ? 1 : -1), u.push({ end: e3, start: v }), e3 = v;
          return { path: l(y = (y = function t4(e4, i3, r2) {
            let n2, l2, c3, p2, u2, g2, y2;
            if (e4.x === i3.x && e4.y === i3.y)
              return [];
            let M2 = r2 ? "x" : "y", v2 = d2.obstacleOptions.margin, S2 = { soft: { xMin: x, xMax: f, yMin: m, yMax: b }, hard: d2.hardBounds };
            return (u2 = a(A, e4)) > -1 ? (p2 = B(u2 = A[u2], e4, i3, r2, S2), h(u2, d2.hardBounds), y2 = r2 ? { y: e4.y, x: u2[p2 ? "xMax" : "xMin"] + (p2 ? 1 : -1) } : { x: e4.x, y: u2[p2 ? "yMax" : "yMin"] + (p2 ? 1 : -1) }, (g2 = a(A, y2)) > -1 && (h(g2 = A[g2], d2.hardBounds), y2[M2] = p2 ? o(u2[M2 + "Max"] - v2 + 1, (g2[M2 + "Min"] + u2[M2 + "Max"]) / 2) : s(u2[M2 + "Min"] + v2 - 1, (g2[M2 + "Max"] + u2[M2 + "Min"]) / 2), e4.x === y2.x && e4.y === y2.y ? (k && (y2[M2] = p2 ? o(u2[M2 + "Max"], g2[M2 + "Max"]) + 1 : s(u2[M2 + "Min"], g2[M2 + "Min"]) - 1), k = !k) : k = false), l2 = [{ start: e4, end: y2 }]) : (n2 = w(e4, { x: r2 ? i3.x : e4.x, y: r2 ? e4.y : i3.y }, r2), l2 = [{ start: e4, end: { x: n2.x, y: n2.y } }], n2[r2 ? "x" : "y"] !== i3[r2 ? "x" : "y"] && (p2 = B(n2.obstacle, n2, i3, !r2, S2), h(n2.obstacle, d2.hardBounds), c3 = { x: r2 ? n2.x : n2.obstacle[p2 ? "xMax" : "xMin"] + (p2 ? 1 : -1), y: r2 ? n2.obstacle[p2 ? "yMax" : "yMin"] + (p2 ? 1 : -1) : n2.y }, r2 = !r2, l2 = l2.concat(t4({ x: n2.x, y: n2.y }, c3, r2)))), l2 = l2.concat(t4(l2[l2.length - 1].end, i3, !r2));
          }(t3, e3, c2)).concat(u.reverse())), obstacles: y };
        }
        return d.requiresObstacles = true, c.requiresObstacles = true, { fastAvoid: c, straight: function(t3, e3) {
          return { path: [["M", t3.x, t3.y], ["L", e3.x, e3.y]], obstacles: [{ start: t3, end: e3 }] };
        }, simpleConnect: d };
      }), i(e, "Gantt/ConnectorsDefaults.js", [], function() {
        return { connectors: { type: "straight", radius: 0, lineWidth: 1, marker: { enabled: false, align: "center", verticalAlign: "middle", inside: false, lineWidth: 1 }, startMarker: { symbol: "diamond" }, endMarker: { symbol: "arrow-filled" } } };
      }), i(e, "Gantt/PathfinderComposition.js", [e["Gantt/ConnectorsDefaults.js"], e["Core/Defaults.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s) {
        var o;
        let { setOptions: r } = e2, { composed: n } = i2, { defined: a, error: l, merge: h, pushUnique: d } = s;
        function c(t3) {
          let e3 = t3.shapeArgs;
          if (e3)
            return { xMin: e3.x || 0, xMax: (e3.x || 0) + (e3.width || 0), yMin: e3.y || 0, yMax: (e3.y || 0) + (e3.height || 0) };
          let i3 = t3.graphic && t3.graphic.getBBox();
          return i3 ? { xMin: t3.plotX - i3.width / 2, xMax: t3.plotX + i3.width / 2, yMin: t3.plotY - i3.height / 2, yMax: t3.plotY + i3.height / 2 } : null;
        }
        return function(e3) {
          function i3(t3) {
            let e4, i4;
            let s3 = c(this);
            switch (t3.align) {
              case "right":
                e4 = "xMax";
                break;
              case "left":
                e4 = "xMin";
            }
            switch (t3.verticalAlign) {
              case "top":
                i4 = "yMin";
                break;
              case "bottom":
                i4 = "yMax";
            }
            return { x: e4 ? s3[e4] : (s3.xMin + s3.xMax) / 2, y: i4 ? s3[i4] : (s3.yMin + s3.yMax) / 2 };
          }
          function s2(t3, e4) {
            let i4;
            return !a(e4) && (i4 = c(this)) && (e4 = { x: (i4.xMin + i4.xMax) / 2, y: (i4.yMin + i4.yMax) / 2 }), Math.atan2(e4.y - t3.y, t3.x - e4.x);
          }
          function o2(t3, e4, i4) {
            let s3 = 2 * Math.PI, o3 = c(this), r2 = o3.xMax - o3.xMin, n2 = o3.yMax - o3.yMin, a2 = Math.atan2(n2, r2), l2 = r2 / 2, h2 = n2 / 2, d2 = o3.xMin + l2, p = o3.yMin + h2, u = { x: d2, y: p }, g = t3, x = 1, f = false, m = 1, b = 1;
            for (; g < -Math.PI; )
              g += s3;
            for (; g > Math.PI; )
              g -= s3;
            return x = Math.tan(g), g > -a2 && g <= a2 ? (b = -1, f = true) : g > a2 && g <= Math.PI - a2 ? b = -1 : g > Math.PI - a2 || g <= -(Math.PI - a2) ? (m = -1, f = true) : m = -1, f ? (u.x += m * l2, u.y += b * l2 * x) : (u.x += m * (n2 / (2 * x)), u.y += b * h2), i4.x !== d2 && (u.x = i4.x), i4.y !== p && (u.y = i4.y), { x: u.x + e4 * Math.cos(g), y: u.y - e4 * Math.sin(g) };
          }
          e3.compose = function e4(a2, c2, p) {
            if (d(n, e4)) {
              let e5 = p.prototype;
              a2.prototype.callbacks.push(function(t3) {
                let e6 = t3.options;
                false !== e6.connectors.enabled && ((t3.options.pathfinder || t3.series.reduce(function(t4, e7) {
                  return e7.options && h(true, e7.options.connectors = e7.options.connectors || {}, e7.options.pathfinder), t4 || e7.options && e7.options.pathfinder;
                }, false)) && (h(true, t3.options.connectors = t3.options.connectors || {}, t3.options.pathfinder), l('WARNING: Pathfinder options have been renamed. Use "chart.connectors" or "series.connectors" instead.')), this.pathfinder = new c2(this), this.pathfinder.update(true));
              }), e5.getMarkerVector = o2, e5.getPathfinderAnchorPoint = i3, e5.getRadiansToVector = s2, r(t2);
            }
          };
        }(o || (o = {})), o;
      }), i(e, "Gantt/Pathfinder.js", [e["Gantt/Connection.js"], e["Gantt/PathfinderAlgorithms.js"], e["Gantt/PathfinderComposition.js"], e["Core/Series/Point.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, o) {
        let { addEvent: r, defined: n, pick: a, splat: l } = o, h = Math.max, d = Math.min;
        class c {
          static compose(t3, e3) {
            i2.compose(t3, c, e3);
          }
          constructor(t3) {
            this.init(t3);
          }
          init(t3) {
            this.chart = t3, this.connections = [], r(t3, "redraw", function() {
              this.pathfinder.update();
            });
          }
          update(e3) {
            let i3 = this.chart, o2 = this, r2 = o2.connections;
            o2.connections = [], i3.series.forEach(function(e4) {
              e4.visible && !e4.options.isInternal && e4.points.forEach(function(e5) {
                let r3;
                let n2 = e5.options;
                n2 && n2.dependency && (n2.connect = n2.dependency);
                let a2 = e5.options?.connect && l(e5.options.connect);
                e5.visible && false !== e5.isInside && a2 && a2.forEach(function(n3) {
                  (r3 = i3.get("string" == typeof n3 ? n3 : n3.to)) instanceof s && r3.series.visible && r3.visible && false !== r3.isInside && o2.connections.push(new t2(e5, r3, "string" == typeof n3 ? {} : n3));
                });
              });
            });
            for (let t3 = 0, e4, i4, s2 = r2.length, n2 = o2.connections.length; t3 < s2; ++t3) {
              i4 = false;
              let s3 = r2[t3];
              for (e4 = 0; e4 < n2; ++e4) {
                let t4 = o2.connections[e4];
                if ((s3.options && s3.options.type) === (t4.options && t4.options.type) && s3.fromPoint === t4.fromPoint && s3.toPoint === t4.toPoint) {
                  t4.graphics = s3.graphics, i4 = true;
                  break;
                }
              }
              i4 || s3.destroy();
            }
            delete this.chartObstacles, delete this.lineObstacles, o2.renderConnections(e3);
          }
          renderConnections(t3) {
            t3 ? this.chart.series.forEach(function(t4) {
              let e3 = function() {
                let e4 = t4.chart.pathfinder, i3 = e4 && e4.connections || [];
                i3.forEach(function(e5) {
                  e5.fromPoint && e5.fromPoint.series === t4 && e5.render();
                }), t4.pathfinderRemoveRenderEvent && (t4.pathfinderRemoveRenderEvent(), delete t4.pathfinderRemoveRenderEvent);
              };
              false === t4.options.animation ? e3() : t4.pathfinderRemoveRenderEvent = r(t4, "afterAnimate", e3);
            }) : this.connections.forEach(function(t4) {
              t4.render();
            });
          }
          getChartObstacles(t3) {
            let e3 = this.chart.series, i3 = a(t3.algorithmMargin, 0), s2 = [], o2;
            for (let t4 = 0, o3 = e3.length; t4 < o3; ++t4)
              if (e3[t4].visible && !e3[t4].options.isInternal)
                for (let o4 = 0, r2 = e3[t4].points.length, n2, a2; o4 < r2; ++o4)
                  (a2 = e3[t4].points[o4]).visible && (n2 = function(t5) {
                    let e4 = t5.shapeArgs;
                    if (e4)
                      return { xMin: e4.x || 0, xMax: (e4.x || 0) + (e4.width || 0), yMin: e4.y || 0, yMax: (e4.y || 0) + (e4.height || 0) };
                    let i4 = t5.graphic && t5.graphic.getBBox();
                    return i4 ? { xMin: t5.plotX - i4.width / 2, xMax: t5.plotX + i4.width / 2, yMin: t5.plotY - i4.height / 2, yMax: t5.plotY + i4.height / 2 } : null;
                  }(a2)) && s2.push({ xMin: n2.xMin - i3, xMax: n2.xMax + i3, yMin: n2.yMin - i3, yMax: n2.yMax + i3 });
            return s2 = s2.sort(function(t4, e4) {
              return t4.xMin - e4.xMin;
            }), n(t3.algorithmMargin) || (o2 = t3.algorithmMargin = function(t4) {
              let e4;
              let i4 = t4.length, s3 = [];
              for (let o3 = 0; o3 < i4; ++o3)
                for (let r2 = o3 + 1; r2 < i4; ++r2)
                  (e4 = function t5(e5, i5, s4) {
                    let o4 = a(s4, 10), r3 = e5.yMax + o4 > i5.yMin - o4 && e5.yMin - o4 < i5.yMax + o4, n2 = e5.xMax + o4 > i5.xMin - o4 && e5.xMin - o4 < i5.xMax + o4, l2 = r3 ? e5.xMin > i5.xMax ? e5.xMin - i5.xMax : i5.xMin - e5.xMax : 1 / 0, h2 = n2 ? e5.yMin > i5.yMax ? e5.yMin - i5.yMax : i5.yMin - e5.yMax : 1 / 0;
                    return n2 && r3 ? o4 ? t5(e5, i5, Math.floor(o4 / 2)) : 1 / 0 : d(l2, h2);
                  }(t4[o3], t4[r2])) < 80 && s3.push(e4);
              return s3.push(80), h(Math.floor(s3.sort(function(t5, e5) {
                return t5 - e5;
              })[Math.floor(s3.length / 10)] / 2 - 1), 1);
            }(s2), s2.forEach(function(t4) {
              t4.xMin -= o2, t4.xMax += o2, t4.yMin -= o2, t4.yMax += o2;
            })), s2;
          }
          getObstacleMetrics(t3) {
            let e3 = 0, i3 = 0, s2, o2, r2 = t3.length;
            for (; r2--; )
              s2 = t3[r2].xMax - t3[r2].xMin, o2 = t3[r2].yMax - t3[r2].yMin, e3 < s2 && (e3 = s2), i3 < o2 && (i3 = o2);
            return { maxHeight: i3, maxWidth: e3 };
          }
          getAlgorithmStartDirection(t3) {
            let e3 = "left" !== t3.align && "right" !== t3.align, i3 = "top" !== t3.verticalAlign && "bottom" !== t3.verticalAlign;
            return e3 ? !!i3 && void 0 : !!i3 || void 0;
          }
        }
        return c.prototype.algorithms = e2, c;
      }), i(e, "Stock/RangeSelector/RangeSelectorDefaults.js", [], function() {
        return { lang: { rangeSelectorZoom: "Zoom", rangeSelectorFrom: "", rangeSelectorTo: "→" }, rangeSelector: { allButtonsEnabled: false, buttons: void 0, buttonSpacing: 5, dropdown: "responsive", enabled: void 0, verticalAlign: "top", buttonTheme: { width: 28, height: 18, padding: 2, zIndex: 7 }, floating: false, x: 0, y: 0, height: void 0, inputBoxBorderColor: "none", inputBoxHeight: 17, inputBoxWidth: void 0, inputDateFormat: "%e %b %Y", inputDateParser: void 0, inputEditDateFormat: "%Y-%m-%d", inputEnabled: true, inputPosition: { align: "right", x: 0, y: 0 }, inputSpacing: 5, selected: void 0, buttonPosition: { align: "left", x: 0, y: 0 }, inputStyle: { color: "#334eff", cursor: "pointer", fontSize: "0.8em" }, labelStyle: { color: "#666666", fontSize: "0.8em" } } };
      }), i(e, "Stock/RangeSelector/RangeSelectorComposition.js", [e["Core/Defaults.js"], e["Core/Globals.js"], e["Stock/RangeSelector/RangeSelectorDefaults.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s) {
        let o;
        let { defaultOptions: r } = t2, { composed: n } = e2, { addEvent: a, defined: l, extend: h, find: d, isNumber: c, merge: p, pick: u, pushUnique: g } = s, x = [];
        function f() {
          let t3, e3;
          let i3 = this.range, s2 = i3.type, o2 = this.max, r2 = this.chart.time, n2 = function(t4, e4) {
            let i4 = "year" === s2 ? "FullYear" : "Month", o3 = new r2.Date(t4), n3 = r2.get(i4, o3);
            return r2.set(i4, o3, n3 + e4), n3 === r2.get(i4, o3) && r2.set("Date", o3, 0), o3.getTime() - t4;
          };
          c(i3) ? (t3 = o2 - i3, e3 = i3) : i3 && (t3 = o2 + n2(o2, -(i3.count || 1)), this.chart && (this.chart.fixedRange = o2 - t3));
          let a2 = u(this.dataMin, Number.MIN_VALUE);
          return c(t3) || (t3 = a2), t3 <= a2 && (t3 = a2, void 0 === e3 && (e3 = n2(t3, i3.count)), this.newMax = Math.min(t3 + e3, u(this.dataMax, Number.MAX_VALUE))), c(o2) ? !c(i3) && i3 && i3._offsetMin && (t3 += i3._offsetMin) : t3 = void 0, t3;
        }
        function m() {
          this.options.rangeSelector && this.options.rangeSelector.enabled && (this.rangeSelector = new o(this));
        }
        function b() {
          let t3 = this.axes, e3 = this.rangeSelector;
          if (e3) {
            c(e3.deferredYTDClick) && (e3.clickButton(e3.deferredYTDClick), delete e3.deferredYTDClick), t3.forEach((t4) => {
              t4.updateNames(), t4.setScale();
            }), this.getAxisMargins(), e3.render();
            let i3 = e3.options.verticalAlign;
            e3.options.floating || ("bottom" === i3 ? this.extraBottomMargin = true : "middle" === i3 || (this.extraTopMargin = true));
          }
        }
        function y(t3) {
          let e3, i3, s2, o2;
          let r2 = t3.rangeSelector, n2 = () => {
            r2 && (e3 = t3.xAxis[0].getExtremes(), i3 = t3.legend, o2 = r2 && r2.options.verticalAlign, c(e3.min) && r2.render(e3.min, e3.max), i3.display && "top" === o2 && o2 === i3.options.verticalAlign && (s2 = p(t3.spacingBox), "vertical" === i3.options.layout ? s2.y = t3.plotTop : s2.y += r2.getHeight(), i3.group.placed = false, i3.align(s2)));
          };
          if (r2) {
            let e4 = d(x, (e5) => e5[0] === t3);
            e4 || x.push([t3, [a(t3.xAxis[0], "afterSetExtremes", function(t4) {
              r2 && r2.render(t4.min, t4.max);
            }), a(t3, "redraw", n2)]]), n2();
          }
        }
        function M() {
          for (let t3 = 0, e3 = x.length; t3 < e3; ++t3) {
            let e4 = x[t3];
            if (e4[0] === this) {
              e4[1].forEach((t4) => t4()), x.splice(t3, 1);
              return;
            }
          }
        }
        function v() {
          let t3 = this.rangeSelector;
          if (t3) {
            let e3 = t3.getHeight();
            this.extraTopMargin && (this.plotTop += e3), this.extraBottomMargin && (this.marginBottom += e3);
          }
        }
        function k() {
          let t3 = this.rangeSelector;
          if (t3 && !t3.options.floating) {
            t3.render();
            let e3 = t3.options.verticalAlign;
            "bottom" === e3 ? this.extraBottomMargin = true : "middle" !== e3 && (this.extraTopMargin = true);
          }
        }
        function A(t3) {
          let e3 = t3.options, i3 = e3.rangeSelector, s2 = this.extraBottomMargin, r2 = this.extraTopMargin, n2 = this.rangeSelector;
          if (i3 && i3.enabled && !l(n2) && this.options.rangeSelector && (this.options.rangeSelector.enabled = true, this.rangeSelector = n2 = new o(this)), this.extraBottomMargin = false, this.extraTopMargin = false, n2) {
            y(this);
            let t4 = i3 && i3.verticalAlign || n2.options && n2.options.verticalAlign;
            n2.options.floating || ("bottom" === t4 ? this.extraBottomMargin = true : "middle" === t4 || (this.extraTopMargin = true)), (this.extraBottomMargin !== s2 || this.extraTopMargin !== r2) && (this.isDirtyBox = true);
          }
        }
        return { compose: function t3(e3, s2, l2) {
          if (o = l2, g(n, t3)) {
            let t4 = s2.prototype;
            e3.prototype.minFromRange = f, a(s2, "afterGetContainer", m), a(s2, "beforeRender", b), a(s2, "destroy", M), a(s2, "getMargins", v), a(s2, "render", k), a(s2, "update", A), t4.callbacks.push(y), h(r, { rangeSelector: i2.rangeSelector }), h(r.lang, i2.lang);
          }
        } };
      }), i(e, "Stock/RangeSelector/RangeSelector.js", [e["Core/Axis/Axis.js"], e["Core/Defaults.js"], e["Core/Globals.js"], e["Stock/RangeSelector/RangeSelectorComposition.js"], e["Core/Renderer/SVG/SVGElement.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, o, r) {
        let { defaultOptions: n } = e2, { addEvent: a, createElement: l, css: h, defined: d, destroyObjectProperties: c, discardElement: p, extend: u, fireEvent: g, isNumber: x, merge: f, objectEach: m, pad: b, pick: y, pInt: M, splat: v } = r;
        class k {
          static compose(t3, e3) {
            s.compose(t3, e3, k);
          }
          constructor(t3) {
            this.buttonOptions = k.prototype.defaultButtons, this.initialButtonGroupWidth = 0, this.chart = t3, this.init(t3);
          }
          clickButton(e3, i3) {
            let s2 = this.chart, o2 = this.buttonOptions[e3], r2 = s2.xAxis[0], n2 = s2.scroller && s2.scroller.getUnionExtremes() || r2 || {}, l2 = o2.type, h2 = o2.dataGrouping, c2 = n2.dataMin, p2 = n2.dataMax, u2, f2 = r2 && Math.round(Math.min(r2.max, y(p2, r2.max))), m2, b2 = o2._range, M2, k2, A, S, C, w = true;
            if (null !== c2 && null !== p2) {
              if (s2.fixedRange = b2, this.setSelected(e3), h2 && (this.forcedDataGrouping = true, t2.prototype.setDataGrouping.call(r2 || { chart: this.chart }, h2, false), this.frozenStates = o2.preserveDataGrouping), "month" === l2 || "year" === l2)
                r2 ? (S = { range: o2, max: f2, chart: s2, dataMin: c2, dataMax: p2 }, u2 = r2.minFromRange.call(S), x(S.newMax) && (f2 = S.newMax), w = false) : b2 = o2;
              else if (b2)
                f2 = Math.min((u2 = Math.max(f2 - b2, c2)) + b2, p2), w = false;
              else if ("ytd" === l2) {
                if (r2)
                  (void 0 === p2 || void 0 === c2) && (c2 = Number.MAX_VALUE, p2 = Number.MIN_VALUE, s2.series.forEach((t3) => {
                    let e4 = t3.xData;
                    e4 && (c2 = Math.min(e4[0], c2), p2 = Math.max(e4[e4.length - 1], p2));
                  }), i3 = false), u2 = M2 = (C = this.getYTDExtremes(p2, c2, s2.time.useUTC)).min, f2 = C.max;
                else {
                  this.deferredYTDClick = e3;
                  return;
                }
              } else
                "all" === l2 && r2 && (s2.navigator && s2.navigator.baseSeries[0] && (s2.navigator.baseSeries[0].xAxis.options.range = void 0), u2 = c2, f2 = p2);
              w && o2._offsetMin && d(u2) && (u2 += o2._offsetMin), o2._offsetMax && d(f2) && (f2 += o2._offsetMax), this.dropdown && (this.dropdown.selectedIndex = e3 + 1), r2 ? r2.setExtremes(u2, f2, y(i3, true), void 0, { trigger: "rangeSelectorButton", rangeSelectorButton: o2 }) : (A = (m2 = v(s2.options.xAxis)[0]).range, m2.range = b2, k2 = m2.min, m2.min = M2, a(s2, "load", function() {
                m2.range = A, m2.min = k2;
              })), g(this, "afterBtnClick");
            }
          }
          setSelected(t3) {
            this.selected = this.options.selected = t3;
          }
          init(t3) {
            let e3 = this, i3 = t3.options.rangeSelector, s2 = i3.buttons || e3.defaultButtons.slice(), o2 = i3.selected, r2 = function() {
              let t4 = e3.minInput, i4 = e3.maxInput;
              t4 && t4.blur && g(t4, "blur"), i4 && i4.blur && g(i4, "blur");
            };
            e3.chart = t3, e3.options = i3, e3.buttons = [], e3.buttonOptions = s2, this.eventsToUnbind = [], this.eventsToUnbind.push(a(t3.container, "mousedown", r2)), this.eventsToUnbind.push(a(t3, "resize", r2)), s2.forEach(e3.computeButtonRange), void 0 !== o2 && s2[o2] && this.clickButton(o2, false), this.eventsToUnbind.push(a(t3, "load", function() {
              t3.xAxis && t3.xAxis[0] && a(t3.xAxis[0], "setExtremes", function(i4) {
                this.max - this.min !== t3.fixedRange && "rangeSelectorButton" !== i4.trigger && "updatedData" !== i4.trigger && e3.forcedDataGrouping && !e3.frozenStates && this.setDataGrouping(false, false);
              });
            }));
          }
          updateButtonStates() {
            let t3 = this, e3 = this.chart, i3 = this.dropdown, s2 = e3.xAxis[0], o2 = Math.round(s2.max - s2.min), r2 = !s2.hasVisibleSeries, n2 = 24 * 36e5, a2 = e3.scroller && e3.scroller.getUnionExtremes() || s2, l2 = a2.dataMin, h2 = a2.dataMax, c2 = t3.getYTDExtremes(h2, l2, e3.time.useUTC), p2 = c2.min, u2 = c2.max, g2 = t3.selected, f2 = t3.options.allButtonsEnabled, m2 = t3.buttons, b2 = x(g2), y2 = false;
            t3.buttonOptions.forEach((e4, a3) => {
              let c3 = e4._range, x2 = e4.type, M2 = e4.count || 1, v2 = m2[a3], k2 = e4._offsetMax - e4._offsetMin, A = a3 === g2, S = c3 > h2 - l2, C = c3 < s2.minRange, w = 0, B = false, P = false, T = c3 === o2;
              A && S && (y2 = true), ("month" === x2 || "year" === x2) && o2 + 36e5 >= { month: 28, year: 365 }[x2] * n2 * M2 - k2 && o2 - 36e5 <= { month: 31, year: 366 }[x2] * n2 * M2 + k2 ? T = true : "ytd" === x2 ? (T = u2 - p2 + k2 === o2, B = !A) : "all" === x2 && (T = s2.max - s2.min >= h2 - l2, P = !A && b2 && T);
              let E = !f2 && !(y2 && "all" === x2) && (S || C || P || r2), O = y2 && "all" === x2 || A && T || T && !b2 && !B || A && t3.frozenStates;
              E ? w = 3 : O && (b2 = true, w = 2), v2.state !== w && (v2.setState(w), i3 && (i3.options[a3 + 1].disabled = E, 2 === w && (i3.selectedIndex = a3 + 1)), 0 === w && g2 === a3 ? t3.setSelected() : (2 === w && !d(g2) || y2) && t3.setSelected(a3));
            });
          }
          computeButtonRange(t3) {
            let e3 = t3.type, i3 = t3.count || 1, s2 = { millisecond: 1, second: 1e3, minute: 6e4, hour: 36e5, day: 864e5, week: 6048e5 };
            s2[e3] ? t3._range = s2[e3] * i3 : ("month" === e3 || "year" === e3) && (t3._range = 24 * { month: 30, year: 365 }[e3] * 36e5 * i3), t3._offsetMin = y(t3.offsetMin, 0), t3._offsetMax = y(t3.offsetMax, 0), t3._range += t3._offsetMax - t3._offsetMin;
          }
          getInputValue(t3) {
            let e3 = "min" === t3 ? this.minInput : this.maxInput, i3 = this.chart.options.rangeSelector, s2 = this.chart.time;
            return e3 ? ("text" === e3.type && i3.inputDateParser || this.defaultInputDateParser)(e3.value, s2.useUTC, s2) : 0;
          }
          setInputValue(t3, e3) {
            let i3 = this.options, s2 = this.chart.time, o2 = "min" === t3 ? this.minInput : this.maxInput, r2 = "min" === t3 ? this.minDateBox : this.maxDateBox;
            if (o2) {
              let t4 = o2.getAttribute("data-hc-time"), n2 = d(t4) ? Number(t4) : void 0;
              if (d(e3)) {
                let t5 = n2;
                d(t5) && o2.setAttribute("data-hc-time-previous", t5), o2.setAttribute("data-hc-time", e3), n2 = e3;
              }
              o2.value = s2.dateFormat(this.inputTypeFormats[o2.type] || i3.inputEditDateFormat, n2), r2 && r2.attr({ text: s2.dateFormat(i3.inputDateFormat, n2) });
            }
          }
          setInputExtremes(t3, e3, i3) {
            let s2 = "min" === t3 ? this.minInput : this.maxInput;
            if (s2) {
              let t4 = this.inputTypeFormats[s2.type], o2 = this.chart.time;
              if (t4) {
                let r2 = o2.dateFormat(t4, e3);
                s2.min !== r2 && (s2.min = r2);
                let n2 = o2.dateFormat(t4, i3);
                s2.max !== n2 && (s2.max = n2);
              }
            }
          }
          showInput(t3) {
            let e3 = "min" === t3 ? this.minDateBox : this.maxDateBox, i3 = "min" === t3 ? this.minInput : this.maxInput;
            if (i3 && e3 && this.inputGroup) {
              let t4 = "text" === i3.type, { translateX: s2 = 0, translateY: o2 = 0 } = this.inputGroup, { x: r2 = 0, width: n2 = 0, height: a2 = 0 } = e3, { inputBoxWidth: l2 } = this.options;
              h(i3, { width: t4 ? n2 + (l2 ? -2 : 20) + "px" : "auto", height: a2 - 2 + "px", border: "2px solid silver" }), t4 && l2 ? h(i3, { left: s2 + r2 + "px", top: o2 + "px" }) : h(i3, { left: Math.min(Math.round(r2 + s2 - (i3.offsetWidth - n2) / 2), this.chart.chartWidth - i3.offsetWidth) + "px", top: o2 - (i3.offsetHeight - a2) / 2 + "px" });
            }
          }
          hideInput(t3) {
            let e3 = "min" === t3 ? this.minInput : this.maxInput;
            e3 && h(e3, { top: "-9999em", border: 0, width: "1px", height: "1px" });
          }
          defaultInputDateParser(t3, e3, s2) {
            let o2 = t3.split("/").join("-").split(" ").join("T");
            if (-1 === o2.indexOf("T") && (o2 += "T00:00"), e3)
              o2 += "Z";
            else {
              var r2;
              if (i2.isSafari && (!((r2 = o2).length > 6) || r2.lastIndexOf("-") !== r2.length - 6 && r2.lastIndexOf("+") !== r2.length - 6)) {
                let t4 = new Date(o2).getTimezoneOffset() / 60;
                o2 += t4 <= 0 ? `+${b(-t4)}:00` : `-${b(t4)}:00`;
              }
            }
            let n2 = Date.parse(o2);
            if (!x(n2)) {
              let e4 = t3.split("-");
              n2 = Date.UTC(M(e4[0]), M(e4[1]) - 1, M(e4[2]));
            }
            return s2 && e3 && x(n2) && (n2 += s2.getTimezoneOffset(n2)), n2;
          }
          drawInput(t3) {
            let { chart: e3, div: s2, inputGroup: o2 } = this, r2 = this, a2 = e3.renderer.style || {}, d2 = e3.renderer, c2 = e3.options.rangeSelector, p2 = n.lang, g2 = "min" === t3;
            function m2() {
              let { maxInput: i3, minInput: s3 } = r2, o3 = e3.xAxis[0], n2 = e3.scroller && e3.scroller.getUnionExtremes() || o3, a3 = n2.dataMin, l2 = n2.dataMax, h2 = r2.getInputValue(t3);
              h2 !== Number(v2.getAttribute("data-hc-time-previous")) && x(h2) && (v2.setAttribute("data-hc-time-previous", h2), g2 && i3 && x(a3) ? h2 > Number(i3.getAttribute("data-hc-time")) ? h2 = void 0 : h2 < a3 && (h2 = a3) : s3 && x(l2) && (h2 < Number(s3.getAttribute("data-hc-time")) ? h2 = void 0 : h2 > l2 && (h2 = l2)), void 0 !== h2 && o3.setExtremes(g2 ? h2 : o3.min, g2 ? o3.max : h2, void 0, void 0, { trigger: "rangeSelectorInput" }));
            }
            let b2 = p2[g2 ? "rangeSelectorFrom" : "rangeSelectorTo"] || "", y2 = d2.label(b2, 0).addClass("highcharts-range-label").attr({ padding: b2 ? 2 : 0, height: b2 ? c2.inputBoxHeight : 0 }).add(o2), M2 = d2.label("", 0).addClass("highcharts-range-input").attr({ padding: 2, width: c2.inputBoxWidth, height: c2.inputBoxHeight, "text-align": "center" }).on("click", function() {
              r2.showInput(t3), r2[t3 + "Input"].focus();
            });
            e3.styledMode || M2.attr({ stroke: c2.inputBoxBorderColor, "stroke-width": 1 }), M2.add(o2);
            let v2 = l("input", { name: t3, className: "highcharts-range-selector" }, void 0, s2);
            v2.setAttribute("type", function(t4) {
              let e4 = -1 !== t4.indexOf("%L");
              if (e4)
                return "text";
              let i3 = ["a", "A", "d", "e", "w", "b", "B", "m", "o", "y", "Y"].some((e5) => -1 !== t4.indexOf("%" + e5)), s3 = ["H", "k", "I", "l", "M", "S"].some((e5) => -1 !== t4.indexOf("%" + e5));
              return i3 && s3 ? "datetime-local" : i3 ? "date" : s3 ? "time" : "text";
            }(c2.inputDateFormat || "%e %b %Y")), e3.styledMode || (y2.css(f(a2, c2.labelStyle)), M2.css(f({ color: "#333333" }, a2, c2.inputStyle)), h(v2, u({ position: "absolute", border: 0, boxShadow: "0 0 15px rgba(0,0,0,0.3)", width: "1px", height: "1px", padding: 0, textAlign: "center", fontSize: a2.fontSize, fontFamily: a2.fontFamily, top: "-9999em" }, c2.inputStyle))), v2.onfocus = () => {
              r2.showInput(t3);
            }, v2.onblur = () => {
              v2 === i2.doc.activeElement && m2(), r2.hideInput(t3), r2.setInputValue(t3), v2.blur();
            };
            let k2 = false;
            return v2.onchange = () => {
              k2 || (m2(), r2.hideInput(t3), v2.blur());
            }, v2.onkeypress = (t4) => {
              13 === t4.keyCode && m2();
            }, v2.onkeydown = (t4) => {
              k2 = true, (38 === t4.keyCode || 40 === t4.keyCode) && m2();
            }, v2.onkeyup = () => {
              k2 = false;
            }, { dateBox: M2, input: v2, label: y2 };
          }
          getPosition() {
            let t3 = this.chart, e3 = t3.options.rangeSelector, i3 = "top" === e3.verticalAlign ? t3.plotTop - t3.axisOffset[0] : 0;
            return { buttonTop: i3 + e3.buttonPosition.y, inputTop: i3 + e3.inputPosition.y - 10 };
          }
          getYTDExtremes(t3, e3, i3) {
            let s2 = this.chart.time, o2 = new s2.Date(t3), r2 = s2.get("FullYear", o2), n2 = i3 ? s2.Date.UTC(r2, 0, 1) : +new s2.Date(r2, 0, 1), a2 = o2.getTime();
            return { max: Math.min(t3 || a2, a2), min: Math.max(e3, n2) };
          }
          render(t3, e3) {
            let i3 = this.chart, s2 = i3.renderer, o2 = i3.container, r2 = i3.options, n2 = r2.rangeSelector, a2 = y(r2.chart.style && r2.chart.style.zIndex, 0) + 1, h2 = n2.inputEnabled, c2 = this.rendered;
            if (false !== n2.enabled) {
              if (!c2 && (this.group = s2.g("range-selector-group").attr({ zIndex: 7 }).add(), this.div = l("div", void 0, { position: "relative", height: 0, zIndex: a2 }), this.buttonOptions.length && this.renderButtons(), o2.parentNode && o2.parentNode.insertBefore(this.div, o2), h2)) {
                this.inputGroup = s2.g("input-group").add(this.group);
                let t4 = this.drawInput("min");
                this.minDateBox = t4.dateBox, this.minLabel = t4.label, this.minInput = t4.input;
                let e4 = this.drawInput("max");
                this.maxDateBox = e4.dateBox, this.maxLabel = e4.label, this.maxInput = e4.input;
              }
              if (h2) {
                this.setInputValue("min", t3), this.setInputValue("max", e3);
                let s3 = i3.scroller && i3.scroller.getUnionExtremes() || i3.xAxis[0] || {};
                if (d(s3.dataMin) && d(s3.dataMax)) {
                  let t4 = i3.xAxis[0].minRange || 0;
                  this.setInputExtremes("min", s3.dataMin, Math.min(s3.dataMax, this.getInputValue("max")) - t4), this.setInputExtremes("max", Math.max(s3.dataMin, this.getInputValue("min")) + t4, s3.dataMax);
                }
                if (this.inputGroup) {
                  let t4 = 0;
                  [this.minLabel, this.minDateBox, this.maxLabel, this.maxDateBox].forEach((e4) => {
                    if (e4) {
                      let { width: i4 } = e4.getBBox();
                      i4 && (e4.attr({ x: t4 }), t4 += i4 + n2.inputSpacing);
                    }
                  });
                }
              }
              this.alignElements(), this.rendered = true;
            }
          }
          renderButtons() {
            let { buttons: t3, chart: e3, options: s2 } = this, o2 = n.lang, r2 = e3.renderer, h2 = f(s2.buttonTheme), d2 = h2 && h2.states, c2 = h2.width || 28;
            delete h2.width, delete h2.states, this.buttonGroup = r2.g("range-selector-buttons").add(this.group);
            let p2 = this.dropdown = l("select", void 0, { position: "absolute", width: "1px", height: "1px", padding: 0, border: 0, top: "-9999em", cursor: "pointer", opacity: 1e-4 }, this.div);
            a(p2, "touchstart", () => {
              p2.style.fontSize = "16px";
            }), [[i2.isMS ? "mouseover" : "mouseenter"], [i2.isMS ? "mouseout" : "mouseleave"], ["change", "click"]].forEach(([e4, i3]) => {
              a(p2, e4, () => {
                let s3 = t3[this.currentButtonIndex()];
                s3 && g(s3.element, i3 || e4);
              });
            }), this.zoomText = r2.label(o2 && o2.rangeSelectorZoom || "", 0).attr({ padding: s2.buttonTheme.padding, height: s2.buttonTheme.height, paddingLeft: 0, paddingRight: 0 }).add(this.buttonGroup), this.chart.styledMode || (this.zoomText.css(s2.labelStyle), h2["stroke-width"] = y(h2["stroke-width"], 0)), l("option", { textContent: this.zoomText.textStr, disabled: true }, void 0, p2), this.buttonOptions.forEach((e4, i3) => {
              l("option", { textContent: e4.title || e4.text }, void 0, p2), t3[i3] = r2.button(e4.text, 0, 0, (t4) => {
                let s3;
                let o3 = e4.events && e4.events.click;
                o3 && (s3 = o3.call(e4, t4)), false !== s3 && this.clickButton(i3), this.isActive = true;
              }, h2, d2 && d2.hover, d2 && d2.select, d2 && d2.disabled).attr({ "text-align": "center", width: c2 }).add(this.buttonGroup), e4.title && t3[i3].attr("title", e4.title);
            });
          }
          alignElements() {
            let { buttonGroup: t3, buttons: e3, chart: i3, group: s2, inputGroup: o2, options: r2, zoomText: n2 } = this, a2 = i3.options, l2 = a2.exporting && false !== a2.exporting.enabled && a2.navigation && a2.navigation.buttonOptions, { buttonPosition: h2, inputPosition: d2, verticalAlign: c2 } = r2, p2 = (t4, e4) => l2 && this.titleCollision(i3) && "top" === c2 && "right" === e4.align && e4.y - t4.getBBox().height - 12 < (l2.y || 0) + (l2.height || 0) + i3.spacing[0] ? -40 : 0, u2 = i3.plotLeft;
            if (s2 && h2 && d2) {
              let a3 = h2.x - i3.spacing[3];
              if (t3) {
                if (this.positionButtons(), !this.initialButtonGroupWidth) {
                  let t4 = 0;
                  n2 && (t4 += n2.getBBox().width + 5), e3.forEach((i4, s3) => {
                    t4 += i4.width || 0, s3 !== e3.length - 1 && (t4 += r2.buttonSpacing);
                  }), this.initialButtonGroupWidth = t4;
                }
                u2 -= i3.spacing[3], this.updateButtonStates();
                let o3 = p2(t3, h2);
                this.alignButtonGroup(o3), s2.placed = t3.placed = i3.hasLoaded;
              }
              let l3 = 0;
              o2 && (l3 = p2(o2, d2), "left" === d2.align ? a3 = u2 : "right" === d2.align && (a3 = -Math.max(i3.axisOffset[1], -l3)), o2.align({ y: d2.y, width: o2.getBBox().width, align: d2.align, x: d2.x + a3 - 2 }, true, i3.spacingBox), o2.placed = i3.hasLoaded), this.handleCollision(l3), s2.align({ verticalAlign: c2 }, true, i3.spacingBox);
              let g2 = s2.alignAttr.translateY, x2 = s2.getBBox().height + 20, f2 = 0;
              if ("bottom" === c2) {
                let t4 = i3.legend && i3.legend.options, e4 = t4 && "bottom" === t4.verticalAlign && t4.enabled && !t4.floating ? i3.legend.legendHeight + y(t4.margin, 10) : 0;
                f2 = g2 - (x2 = x2 + e4 - 20) - (r2.floating ? 0 : r2.y) - (i3.titleOffset ? i3.titleOffset[2] : 0) - 10;
              }
              "top" === c2 ? (r2.floating && (f2 = 0), i3.titleOffset && i3.titleOffset[0] && (f2 = i3.titleOffset[0]), f2 += i3.margin[0] - i3.spacing[0] || 0) : "middle" === c2 && (d2.y === h2.y ? f2 = g2 : (d2.y || h2.y) && (d2.y < 0 || h2.y < 0 ? f2 -= Math.min(d2.y, h2.y) : f2 = g2 - x2)), s2.translate(r2.x, r2.y + Math.floor(f2));
              let { minInput: m2, maxInput: b2, dropdown: M2 } = this;
              r2.inputEnabled && m2 && b2 && (m2.style.marginTop = s2.translateY + "px", b2.style.marginTop = s2.translateY + "px"), M2 && (M2.style.marginTop = s2.translateY + "px");
            }
          }
          alignButtonGroup(t3, e3) {
            let { chart: i3, options: s2, buttonGroup: o2, buttons: r2 } = this, { buttonPosition: n2 } = s2, a2 = i3.plotLeft - i3.spacing[3], l2 = n2.x - i3.spacing[3];
            "right" === n2.align ? l2 += t3 - a2 : "center" === n2.align && (l2 -= a2 / 2), o2 && o2.align({ y: n2.y, width: y(e3, this.initialButtonGroupWidth), align: n2.align, x: l2 }, true, i3.spacingBox);
          }
          positionButtons() {
            let { buttons: t3, chart: e3, options: i3, zoomText: s2 } = this, o2 = e3.hasLoaded ? "animate" : "attr", { buttonPosition: r2 } = i3, n2 = e3.plotLeft, a2 = n2;
            s2 && "hidden" !== s2.visibility && (s2[o2]({ x: y(n2 + r2.x, n2) }), a2 += r2.x + s2.getBBox().width + 5);
            for (let e4 = 0, s3 = this.buttonOptions.length; e4 < s3; ++e4)
              "hidden" !== t3[e4].visibility ? (t3[e4][o2]({ x: a2 }), a2 += (t3[e4].width || 0) + i3.buttonSpacing) : t3[e4][o2]({ x: n2 });
          }
          handleCollision(t3) {
            let { chart: e3, buttonGroup: i3, inputGroup: s2 } = this, { buttonPosition: o2, dropdown: r2, inputPosition: n2 } = this.options, a2 = () => {
              let t4 = 0;
              return this.buttons.forEach((e4) => {
                let i4 = e4.getBBox();
                i4.width > t4 && (t4 = i4.width);
              }), t4;
            }, l2 = (e4) => {
              if (s2 && i3) {
                let r3 = s2.alignAttr.translateX + s2.alignOptions.x - t3 + s2.getBBox().x + 2, a3 = s2.alignOptions.width, l3 = i3.alignAttr.translateX + i3.getBBox().x;
                return l3 + e4 > r3 && r3 + a3 > l3 && o2.y < n2.y + s2.getBBox().height;
              }
              return false;
            }, h2 = () => {
              s2 && i3 && s2.attr({ translateX: s2.alignAttr.translateX + (e3.axisOffset[1] >= -t3 ? 0 : -t3), translateY: s2.alignAttr.translateY + i3.getBBox().height + 10 });
            };
            if (i3) {
              if ("always" === r2) {
                this.collapseButtons(t3), l2(a2()) && h2();
                return;
              }
              "never" === r2 && this.expandButtons();
            }
            s2 && i3 ? n2.align === o2.align || l2(this.initialButtonGroupWidth + 20) ? "responsive" === r2 ? (this.collapseButtons(t3), l2(a2()) && h2()) : h2() : "responsive" === r2 && this.expandButtons() : i3 && "responsive" === r2 && (this.initialButtonGroupWidth > e3.plotWidth ? this.collapseButtons(t3) : this.expandButtons());
          }
          collapseButtons(t3) {
            let { buttons: e3, buttonOptions: i3, chart: s2, dropdown: o2, options: r2, zoomText: n2 } = this;
            if (true === this.isCollapsed)
              return;
            this.isCollapsed = true;
            let a2 = s2.userOptions.rangeSelector && s2.userOptions.rangeSelector.buttonTheme || {}, l2 = (t4) => ({ text: t4 ? `${t4} ▾` : "▾", width: "auto", paddingLeft: y(r2.buttonTheme.paddingLeft, a2.padding, 8), paddingRight: y(r2.buttonTheme.paddingRight, a2.padding, 8) });
            n2 && n2.hide();
            let h2 = false;
            i3.forEach((t4, i4) => {
              let s3 = e3[i4];
              2 !== s3.state ? s3.hide() : (s3.show(), s3.attr(l2(t4.text)), h2 = true);
            }), h2 || (o2 && (o2.selectedIndex = 0), e3[0].show(), e3[0].attr(l2(this.zoomText && this.zoomText.textStr)));
            let { align: d2 } = r2.buttonPosition;
            this.positionButtons(), ("right" === d2 || "center" === d2) && this.alignButtonGroup(t3, e3[this.currentButtonIndex()].getBBox().width), this.showDropdown();
          }
          expandButtons() {
            let { buttons: t3, buttonOptions: e3, options: i3, zoomText: s2 } = this;
            this.hideDropdown(), false !== this.isCollapsed && (this.isCollapsed = false, s2 && s2.show(), e3.forEach((e4, s3) => {
              let o2 = t3[s3];
              o2.show(), o2.attr({ text: e4.text, width: i3.buttonTheme.width || 28, paddingLeft: y(i3.buttonTheme.paddingLeft, "unset"), paddingRight: y(i3.buttonTheme.paddingRight, "unset") }), o2.state < 2 && o2.setState(0);
            }), this.positionButtons());
          }
          currentButtonIndex() {
            let { dropdown: t3 } = this;
            return t3 && t3.selectedIndex > 0 ? t3.selectedIndex - 1 : 0;
          }
          showDropdown() {
            let { buttonGroup: t3, buttons: e3, chart: i3, dropdown: s2 } = this;
            if (t3 && s2) {
              let { translateX: o2 = 0, translateY: r2 = 0 } = t3, n2 = e3[this.currentButtonIndex()].getBBox();
              h(s2, { left: i3.plotLeft + o2 + "px", top: r2 + 0.5 + "px", width: n2.width + "px", height: n2.height + "px" }), this.hasVisibleDropdown = true;
            }
          }
          hideDropdown() {
            let { dropdown: t3 } = this;
            t3 && (h(t3, { top: "-9999em", width: "1px", height: "1px" }), this.hasVisibleDropdown = false);
          }
          getHeight() {
            let t3 = this.options, e3 = this.group, i3 = t3.inputPosition, s2 = t3.buttonPosition, o2 = t3.y, r2 = s2.y, n2 = i3.y, a2 = 0;
            return t3.height ? t3.height : (this.alignElements(), a2 = e3 ? e3.getBBox(true).height + 13 + o2 : 0, (n2 < 0 && r2 < 0 || n2 > 0 && r2 > 0) && (a2 += Math.abs(Math.min(n2, r2))), a2);
          }
          titleCollision(t3) {
            return !(t3.options.title.text || t3.options.subtitle.text);
          }
          update(t3) {
            let e3 = this.chart;
            f(true, e3.options.rangeSelector, t3), this.destroy(), this.init(e3), this.render();
          }
          destroy() {
            let t3 = this, e3 = t3.minInput, i3 = t3.maxInput;
            t3.eventsToUnbind && (t3.eventsToUnbind.forEach((t4) => t4()), t3.eventsToUnbind = void 0), c(t3.buttons), e3 && (e3.onfocus = e3.onblur = e3.onchange = null), i3 && (i3.onfocus = i3.onblur = i3.onchange = null), m(t3, function(e4, i4) {
              e4 && "chart" !== i4 && (e4 instanceof o ? e4.destroy() : e4 instanceof window.HTMLElement && p(e4)), e4 !== k.prototype[i4] && (t3[i4] = null);
            }, this);
          }
        }
        return u(k.prototype, { defaultButtons: [{ type: "month", count: 1, text: "1m", title: "View 1 month" }, { type: "month", count: 3, text: "3m", title: "View 3 months" }, { type: "month", count: 6, text: "6m", title: "View 6 months" }, { type: "ytd", text: "YTD", title: "View year to date" }, { type: "year", count: 1, text: "1y", title: "View 1 year" }, { type: "all", text: "All", title: "View all" }], inputTypeFormats: { "datetime-local": "%Y-%m-%dT%H:%M:%S", date: "%Y-%m-%d", time: "%H:%M:%S" } }), k;
      }), i(e, "Extensions/StaticScale.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { composed: i2 } = t2, { addEvent: s, defined: o, isNumber: r, pick: n, pushUnique: a } = e2;
        function l() {
          let t3 = this.chart.options.chart;
          !this.horiz && r(this.options.staticScale) && (!t3.height || t3.scrollablePlotArea && t3.scrollablePlotArea.minHeight) && (this.staticScale = this.options.staticScale);
        }
        function h() {
          if ("adjustHeight" !== this.redrawTrigger) {
            for (let t3 of this.axes || []) {
              let e3 = t3.chart, i3 = !!e3.initiatedScale && e3.options.animation, s2 = t3.options.staticScale;
              if (t3.staticScale && o(t3.min)) {
                let o2 = n(t3.brokenAxis && t3.brokenAxis.unitLength, t3.max + t3.tickInterval - t3.min) * s2, r2 = (o2 = Math.max(o2, s2)) - e3.plotHeight;
                !e3.scrollablePixelsY && Math.abs(r2) >= 1 && (e3.plotHeight = o2, e3.redrawTrigger = "adjustHeight", e3.setSize(void 0, e3.chartHeight + r2, i3)), t3.series.forEach(function(t4) {
                  let i4 = t4.sharedClipKey && e3.sharedClips[t4.sharedClipKey];
                  i4 && i4.attr(e3.inverted ? { width: e3.plotHeight } : { height: e3.plotHeight });
                });
              }
            }
            this.initiatedScale = true;
          }
          this.redrawTrigger = null;
        }
        return { compose: function t3(e3, o2) {
          if (a(i2, t3)) {
            let t4 = o2.prototype;
            s(e3, "afterSetOptions", l), t4.adjustHeight = h, s(o2, "render", t4.adjustHeight);
          }
        } };
      }), i(e, "Series/XRange/XRangeSeriesDefaults.js", [e["Core/Utilities.js"]], function(t2) {
        let { correctFloat: e2, isNumber: i2, isObject: s } = t2;
        return { colorByPoint: true, dataLabels: { formatter: function() {
          let t3 = this.point.partialFill;
          if (s(t3) && (t3 = t3.amount), i2(t3) && t3 > 0)
            return e2(100 * t3) + "%";
        }, inside: true, verticalAlign: "middle", style: { whiteSpace: "nowrap" } }, tooltip: { headerFormat: '<span style="font-size: 0.8em">{point.x} - {point.x2}</span><br/>', pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.yCategory}</b><br/>' }, borderRadius: 3, pointRange: 0 };
      }), i(e, "Series/XRange/XRangePoint.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { column: { prototype: { pointClass: i2 } } } = t2.seriesTypes, { extend: s } = e2;
        class o extends i2 {
          static getColorByCategory(t3, e3) {
            let i3 = t3.options.colors || t3.chart.options.colors, s2 = i3 ? i3.length : t3.chart.options.chart.colorCount, o2 = e3.y % s2, r = i3 && i3[o2];
            return { colorIndex: o2, color: r };
          }
          resolveColor() {
            let t3 = this.series;
            if (t3.options.colorByPoint && !this.options.color) {
              let e3 = o.getColorByCategory(t3, this);
              t3.chart.styledMode || (this.color = e3.color), this.options.colorIndex || (this.colorIndex = e3.colorIndex);
            } else
              this.color || (this.color = t3.color);
          }
          constructor(t3, e3) {
            super(t3, e3), this.y || (this.y = 0);
          }
          setState() {
            super.setState.apply(this, arguments), this.series.drawPoint(this, this.series.getAnimationVerb());
          }
          getLabelConfig() {
            let t3 = super.getLabelConfig.call(this), e3 = this.series.yAxis.categories;
            return t3.x2 = this.x2, t3.yCategory = this.yCategory = e3 && e3[this.y], t3.key = this.category || this.name, t3;
          }
          isValid() {
            return "number" == typeof this.x && "number" == typeof this.x2;
          }
        }
        return s(o.prototype, { ttBelow: false, tooltipDateKeys: ["x", "x2"] }), o;
      }), i(e, "Series/XRange/XRangeSeries.js", [e["Core/Globals.js"], e["Core/Color/Color.js"], e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"], e["Series/XRange/XRangeSeriesDefaults.js"], e["Series/XRange/XRangePoint.js"]], function(t2, e2, i2, s, o, r) {
        let { composed: n, noop: a } = t2, { parse: l } = e2, { column: h } = i2.seriesTypes, { addEvent: d, clamp: c, defined: p, extend: u, find: g, isNumber: x, isObject: f, merge: m, pick: b, pushUnique: y, relativeLength: M } = s;
        function v() {
          let t3, e3;
          if (this.isXAxis) {
            for (let i3 of (t3 = b(this.dataMax, -Number.MAX_VALUE), this.series))
              if (i3.x2Data)
                for (let s2 of i3.x2Data)
                  s2 && s2 > t3 && (t3 = s2, e3 = true);
            e3 && (this.dataMax = t3);
          }
        }
        class k extends h {
          static compose(t3) {
            y(n, this.compose) && d(t3, "afterGetSeriesExtremes", v);
          }
          init() {
            super.init.apply(this, arguments), this.options.stacking = void 0;
          }
          getColumnMetrics() {
            let t3 = () => {
              for (let t4 of this.chart.series) {
                let e4 = t4.xAxis;
                t4.xAxis = t4.yAxis, t4.yAxis = e4;
              }
            };
            t3();
            let e3 = super.getColumnMetrics();
            return t3(), e3;
          }
          cropData(t3, e3, i3, s2) {
            let o2 = super.cropData(this.x2Data, e3, i3, s2);
            return o2.xData = t3.slice(o2.start, o2.end), o2;
          }
          findPointIndex(t3) {
            let e3;
            let { cropStart: i3, points: s2 } = this, { id: o2 } = t3;
            if (o2) {
              let t4 = g(s2, (t5) => t5.id === o2);
              e3 = t4 ? t4.index : void 0;
            }
            if (void 0 === e3) {
              let i4 = g(s2, (e4) => e4.x === t3.x && e4.x2 === t3.x2 && !e4.touched);
              e3 = i4 ? i4.index : void 0;
            }
            return this.cropped && x(e3) && x(i3) && e3 >= i3 && (e3 -= i3), e3;
          }
          alignDataLabel(t3) {
            let e3 = t3.plotX;
            t3.plotX = b(t3.dlBox && t3.dlBox.centerX, t3.plotX), t3.dataLabel && t3.shapeArgs?.width && t3.dataLabel.css({ width: `${t3.shapeArgs.width}px` }), super.alignDataLabel.apply(this, arguments), t3.plotX = e3;
          }
          translatePoint(t3) {
            let e3 = this.xAxis, i3 = this.yAxis, s2 = this.columnMetrics, o2 = this.options, r2 = o2.minPointLength || 0, n2 = (t3.shapeArgs && t3.shapeArgs.width || 0) / 2, a2 = this.pointXOffset = s2.offset, l2 = b(t3.x2, t3.x + (t3.len || 0)), h2 = o2.borderRadius, d2 = this.chart.plotTop, u2 = this.chart.plotLeft, g2 = t3.plotX, y2 = e3.translate(l2, 0, 0, 0, 1), v2 = Math.abs(y2 - g2), k2 = this.chart.inverted, A = b(o2.borderWidth, 1), S = A % 2 / 2, C, w, B = s2.offset, P = Math.round(s2.width), T, E, O, D;
            r2 && ((C = r2 - v2) < 0 && (C = 0), g2 -= C / 2, y2 += C / 2), g2 = Math.max(g2, -10), y2 = c(y2, -10, e3.len + 10), p(t3.options.pointWidth) && (B -= (Math.ceil(t3.options.pointWidth) - P) / 2, P = Math.ceil(t3.options.pointWidth)), o2.pointPlacement && x(t3.plotY) && i3.categories && (t3.plotY = i3.translate(t3.y, 0, 1, 0, 1, o2.pointPlacement));
            let G = Math.floor(Math.min(g2, y2)) + S, I = Math.floor(Math.max(g2, y2)) + S, L = I - G, j = Math.min(M("object" == typeof h2 ? h2.radius : h2 || 0, P), Math.min(L, P) / 2), R = { x: G, y: Math.floor(t3.plotY + B) + S, width: L, height: P, r: j };
            t3.shapeArgs = R, k2 ? t3.tooltipPos[1] += a2 + n2 : t3.tooltipPos[0] -= n2 + a2 - R.width / 2, E = (T = R.x) + R.width, T < 0 || E > e3.len ? (T = c(T, 0, e3.len), O = (E = c(E, 0, e3.len)) - T, t3.dlBox = m(R, { x: T, width: E - T, centerX: O ? O / 2 : null })) : t3.dlBox = null;
            let z = t3.tooltipPos, N = k2 ? 1 : 0, W = k2 ? 0 : 1, U = this.columnMetrics ? this.columnMetrics.offset : -s2.width / 2;
            k2 ? z[N] += R.width / 2 : z[N] = c(z[N] + (e3.reversed ? -1 : 0) * R.width, e3.left - u2, e3.left + e3.len - u2 - 1), z[W] = c(z[W] + (k2 ? -1 : 1) * U, i3.top - d2, i3.top + i3.len - d2 - 1), (w = t3.partialFill) && (f(w) && (w = w.amount), x(w) || (w = 0), t3.partShapeArgs = m(R), D = Math.max(Math.round(v2 * w + t3.plotX - g2), 0), t3.clipRectArgs = { x: e3.reversed ? R.x + v2 - D : R.x, y: R.y, width: D, height: R.height });
          }
          translate() {
            for (let t3 of (super.translate.apply(this, arguments), this.points))
              this.translatePoint(t3);
          }
          drawPoint(t3, e3) {
            let i3 = this.options, s2 = this.chart.renderer, o2 = t3.shapeType, r2 = t3.shapeArgs, n2 = t3.partShapeArgs, a2 = t3.clipRectArgs, h2 = t3.state, d2 = i3.states[h2 || "normal"] || {}, c2 = void 0 === h2 ? "attr" : e3, p2 = this.pointAttribs(t3, h2), u2 = b(this.chart.options.chart.animation, d2.animation), g2 = t3.graphic, x2 = t3.partialFill;
            if (t3.isNull || false === t3.visible)
              g2 && (t3.graphic = g2.destroy());
            else if (g2 ? g2.rect[e3](r2) : (t3.graphic = g2 = s2.g("point").addClass(t3.getClassName()).add(t3.group || this.group), g2.rect = s2[o2](m(r2)).addClass(t3.getClassName()).addClass("highcharts-partfill-original").add(g2)), n2 && (g2.partRect ? (g2.partRect[e3](m(n2)), g2.partialClipRect[e3](m(a2))) : (g2.partialClipRect = s2.clipRect(a2.x, a2.y, a2.width, a2.height), g2.partRect = s2[o2](n2).addClass("highcharts-partfill-overlay").add(g2).clip(g2.partialClipRect))), !this.chart.styledMode && (g2.rect[e3](p2, u2).shadow(i3.shadow), n2)) {
              f(x2) || (x2 = {}), f(i3.partialFill) && (x2 = m(i3.partialFill, x2));
              let e4 = x2.fill || l(p2.fill).brighten(-0.3).get() || l(t3.color || this.color).brighten(-0.3).get();
              p2.fill = e4, g2.partRect[c2](p2, u2).shadow(i3.shadow);
            }
          }
          drawPoints() {
            let t3 = this.getAnimationVerb();
            for (let e3 of this.points)
              this.drawPoint(e3, t3);
          }
          getAnimationVerb() {
            return this.chart.pointCount < (this.options.animationLimit || 250) ? "animate" : "attr";
          }
          isPointInside(t3) {
            let e3 = t3.shapeArgs, i3 = t3.plotX, s2 = t3.plotY;
            if (!e3)
              return super.isPointInside.apply(this, arguments);
            let o2 = void 0 !== i3 && void 0 !== s2 && s2 >= 0 && s2 <= this.yAxis.len && (e3.x || 0) + (e3.width || 0) >= 0 && i3 <= this.xAxis.len;
            return o2;
          }
        }
        return k.defaultOptions = m(h.defaultOptions, o), u(k.prototype, { pointClass: r, pointArrayMap: ["x2", "y"], getExtremesFromAll: true, parallelArrays: ["x", "x2", "y"], requireSorting: false, type: "xrange", animate: i2.series.prototype.animate, autoIncrement: a, buildKDTree: a }), i2.registerSeriesType("xrange", k), k;
      }), i(e, "Series/Gantt/GanttPoint.js", [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { xrange: { prototype: { pointClass: i2 } } } = t2.seriesTypes, { pick: s } = e2;
        class o extends i2 {
          static setGanttPointAliases(t3) {
            function e3(e4, i3) {
              void 0 !== i3 && (t3[e4] = i3);
            }
            e3("x", s(t3.start, t3.x)), e3("x2", s(t3.end, t3.x2)), e3("partialFill", s(t3.completed, t3.partialFill));
          }
          applyOptions(t3, e3) {
            let i3 = super.applyOptions(t3, e3);
            return o.setGanttPointAliases(i3), i3;
          }
          isValid() {
            return ("number" == typeof this.start || "number" == typeof this.x) && ("number" == typeof this.end || "number" == typeof this.x2 || this.milestone);
          }
        }
        return o;
      }), i(e, "Series/Gantt/GanttSeriesDefaults.js", [e["Core/Utilities.js"]], function(t2) {
        let { isNumber: e2 } = t2;
        return { grouping: false, dataLabels: { enabled: true }, tooltip: { headerFormat: '<span style="font-size: 0.8em">{series.name}</span><br/>', pointFormat: null, pointFormatter: function() {
          let t3 = this.series, i2 = t3.xAxis, s = t3.tooltipOptions.dateTimeLabelFormats, o = i2.options.startOfWeek, r = t3.tooltipOptions, n = this.options.milestone, a = r.xDateFormat, l = "<b>" + (this.name || this.yCategory) + "</b>";
          if (r.pointFormat)
            return this.tooltipFormatter(r.pointFormat);
          !a && e2(this.start) && (a = t3.chart.time.getDateFormat(i2.closestPointRange, this.start, o, s || {}));
          let h = t3.chart.time.dateFormat(a, this.start), d = t3.chart.time.dateFormat(a, this.end);
          return l += "<br/>", n ? l += h + "<br/>" : l += "Start: " + h + "<br/>End: " + d + "<br/>", l;
        } }, connectors: { type: "simpleConnect", animation: { reversed: true }, radius: 0, startMarker: { enabled: true, symbol: "arrow-filled", radius: 4, fill: "#fa0", align: "left" }, endMarker: { enabled: false, align: "right" } } };
      }), i(e, "Core/Axis/BrokenAxis.js", [e["Core/Globals.js"], e["Core/Axis/Stacking/StackItem.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        var s;
        let { composed: o } = t2, { addEvent: r, find: n, fireEvent: a, isArray: l, isNumber: h, pick: d, pushUnique: c } = i2;
        return function(t3) {
          function i3() {
            void 0 !== this.brokenAxis && this.brokenAxis.setBreaks(this.options.breaks, false);
          }
          function s2() {
            this.brokenAxis?.hasBreaks && (this.options.ordinal = false);
          }
          function p() {
            let t4 = this.brokenAxis;
            if (t4?.hasBreaks) {
              let e3 = this.tickPositions, i4 = this.tickPositions.info, s3 = [];
              for (let i5 = 0; i5 < e3.length; i5++)
                t4.isInAnyBreak(e3[i5]) || s3.push(e3[i5]);
              this.tickPositions = s3, this.tickPositions.info = i4;
            }
          }
          function u() {
            this.brokenAxis || (this.brokenAxis = new b(this));
          }
          function g() {
            let { isDirty: t4, options: { connectNulls: e3 }, points: i4, xAxis: s3, yAxis: o2 } = this;
            if (t4) {
              let t5 = i4.length;
              for (; t5--; ) {
                let r2 = i4[t5], n2 = null === r2.y && false === e3, a2 = !n2 && (s3?.brokenAxis?.isInAnyBreak(r2.x, true) || o2?.brokenAxis?.isInAnyBreak(r2.y, true));
                r2.visible = !a2 && false !== r2.options.visible;
              }
            }
          }
          function x() {
            this.drawBreaks(this.xAxis, ["x"]), this.drawBreaks(this.yAxis, d(this.pointArrayMap, ["y"]));
          }
          function f(t4, e3) {
            let i4, s3, o2;
            let r2 = this, n2 = r2.points;
            if (t4?.brokenAxis?.hasBreaks) {
              let l2 = t4.brokenAxis;
              e3.forEach(function(e4) {
                i4 = l2?.breakArray || [], s3 = t4.isXAxis ? t4.min : d(r2.options.threshold, t4.min);
                let c2 = t4?.options?.breaks?.filter(function(t5) {
                  let e5 = true;
                  for (let s4 = 0; s4 < i4.length; s4++) {
                    let o3 = i4[s4];
                    if (o3.from === t5.from && o3.to === t5.to) {
                      e5 = false;
                      break;
                    }
                  }
                  return e5;
                });
                n2.forEach(function(r3) {
                  o2 = d(r3["stack" + e4.toUpperCase()], r3[e4]), i4.forEach(function(e5) {
                    if (h(s3) && h(o2)) {
                      let i5 = "";
                      s3 < e5.from && o2 > e5.to || s3 > e5.from && o2 < e5.from ? i5 = "pointBreak" : (s3 < e5.from && o2 > e5.from && o2 < e5.to || s3 > e5.from && o2 > e5.to && o2 < e5.from) && (i5 = "pointInBreak"), i5 && a(t4, i5, { point: r3, brk: e5 });
                    }
                  }), c2?.forEach(function(e5) {
                    a(t4, "pointOutsideOfBreak", { point: r3, brk: e5 });
                  });
                });
              });
            }
          }
          function m() {
            let t4 = this.currentDataGrouping, i4 = t4?.gapSize, s3 = this.points.slice(), o2 = this.yAxis, r2 = this.options.gapSize, n2 = s3.length - 1;
            if (r2 && n2 > 0) {
              let t5, a2;
              for ("value" !== this.options.gapUnit && (r2 *= this.basePointRange), i4 && i4 > r2 && i4 >= this.basePointRange && (r2 = i4); n2--; )
                if (a2 && false !== a2.visible || (a2 = s3[n2 + 1]), t5 = s3[n2], false !== a2.visible && false !== t5.visible) {
                  if (a2.x - t5.x > r2) {
                    let i5 = (t5.x + a2.x) / 2;
                    s3.splice(n2 + 1, 0, { isNull: true, x: i5 }), o2.stacking && this.options.stacking && ((o2.stacking.stacks[this.stackKey][i5] = new e2(o2, o2.options.stackLabels, false, i5, this.stack)).total = 0);
                  }
                  a2 = t5;
                }
            }
            return this.getGraphPath(s3);
          }
          t3.compose = function t4(e3, n2) {
            if (c(o, t4)) {
              e3.keepProps.push("brokenAxis"), r(e3, "init", u), r(e3, "afterInit", i3), r(e3, "afterSetTickPositions", p), r(e3, "afterSetOptions", s2);
              let t5 = n2.prototype;
              t5.drawBreaks = f, t5.gappedPath = m, r(n2, "afterGeneratePoints", g), r(n2, "afterRender", x);
            }
            return e3;
          };
          class b {
            static isInBreak(t4, e3) {
              let i4 = t4.repeat || 1 / 0, s3 = t4.from, o2 = t4.to - t4.from, r2 = e3 >= s3 ? (e3 - s3) % i4 : i4 - (s3 - e3) % i4;
              return t4.inclusive ? r2 <= o2 : r2 < o2 && 0 !== r2;
            }
            static lin2Val(t4) {
              let e3 = this.brokenAxis, i4 = e3 && e3.breakArray;
              if (!i4 || !h(t4))
                return t4;
              let s3 = t4, o2, r2;
              for (r2 = 0; r2 < i4.length && !((o2 = i4[r2]).from >= s3); r2++)
                o2.to < s3 ? s3 += o2.len : b.isInBreak(o2, s3) && (s3 += o2.len);
              return s3;
            }
            static val2Lin(t4) {
              let e3 = this.brokenAxis, i4 = e3 && e3.breakArray;
              if (!i4 || !h(t4))
                return t4;
              let s3 = t4, o2, r2;
              for (r2 = 0; r2 < i4.length; r2++)
                if ((o2 = i4[r2]).to <= t4)
                  s3 -= o2.len;
                else if (o2.from >= t4)
                  break;
                else if (b.isInBreak(o2, t4)) {
                  s3 -= t4 - o2.from;
                  break;
                }
              return s3;
            }
            constructor(t4) {
              this.hasBreaks = false, this.axis = t4;
            }
            findBreakAt(t4, e3) {
              return n(e3, function(e4) {
                return e4.from < t4 && t4 < e4.to;
              });
            }
            isInAnyBreak(t4, e3) {
              let i4 = this.axis, s3 = i4.options.breaks || [], o2 = s3.length, r2, n2, a2;
              if (o2 && h(t4)) {
                for (; o2--; )
                  b.isInBreak(s3[o2], t4) && (r2 = true, n2 || (n2 = d(s3[o2].showPoints, !i4.isXAxis)));
                a2 = r2 && e3 ? r2 && !n2 : r2;
              }
              return a2;
            }
            setBreaks(t4, e3) {
              let i4 = this, s3 = i4.axis, o2 = l(t4) && !!t4.length && !!Object.keys(t4[0]).length;
              s3.isDirty = i4.hasBreaks !== o2, i4.hasBreaks = o2, t4 !== s3.options.breaks && (s3.options.breaks = s3.userOptions.breaks = t4), s3.forceRedraw = true, s3.series.forEach(function(t5) {
                t5.isDirty = true;
              }), o2 || s3.val2lin !== b.val2Lin || (delete s3.val2lin, delete s3.lin2val), o2 && (s3.userOptions.ordinal = false, s3.lin2val = b.lin2Val, s3.val2lin = b.val2Lin, s3.setExtremes = function(t5, e4, o3, r2, n2) {
                if (i4.hasBreaks) {
                  let s4;
                  let o4 = this.options.breaks || [];
                  for (; s4 = i4.findBreakAt(t5, o4); )
                    t5 = s4.to;
                  for (; s4 = i4.findBreakAt(e4, o4); )
                    e4 = s4.from;
                  e4 < t5 && (e4 = t5);
                }
                s3.constructor.prototype.setExtremes.call(this, t5, e4, o3, r2, n2);
              }, s3.setAxisTranslation = function() {
                if (s3.constructor.prototype.setAxisTranslation.call(this), i4.unitLength = void 0, i4.hasBreaks) {
                  let t5 = s3.options.breaks || [], e4 = [], o3 = [], r2 = d(s3.pointRangePadding, 0), n2 = 0, l2, c2, p2 = s3.userMin || s3.min, u2 = s3.userMax || s3.max, g2, x2;
                  t5.forEach(function(t6) {
                    c2 = t6.repeat || 1 / 0, h(p2) && h(u2) && (b.isInBreak(t6, p2) && (p2 += t6.to % c2 - p2 % c2), b.isInBreak(t6, u2) && (u2 -= u2 % c2 - t6.from % c2));
                  }), t5.forEach(function(t6) {
                    if (g2 = t6.from, c2 = t6.repeat || 1 / 0, h(p2) && h(u2)) {
                      for (; g2 - c2 > p2; )
                        g2 -= c2;
                      for (; g2 < p2; )
                        g2 += c2;
                      for (x2 = g2; x2 < u2; x2 += c2)
                        e4.push({ value: x2, move: "in" }), e4.push({ value: x2 + t6.to - t6.from, move: "out", size: t6.breakSize });
                    }
                  }), e4.sort(function(t6, e5) {
                    return t6.value === e5.value ? ("in" === t6.move ? 0 : 1) - ("in" === e5.move ? 0 : 1) : t6.value - e5.value;
                  }), l2 = 0, g2 = p2, e4.forEach(function(t6) {
                    1 === (l2 += "in" === t6.move ? 1 : -1) && "in" === t6.move && (g2 = t6.value), 0 === l2 && h(g2) && (o3.push({ from: g2, to: t6.value, len: t6.value - g2 - (t6.size || 0) }), n2 += t6.value - g2 - (t6.size || 0));
                  }), i4.breakArray = o3, h(p2) && h(u2) && h(s3.min) && (i4.unitLength = u2 - p2 - n2 + r2, a(s3, "afterBreaks"), s3.staticScale ? s3.transA = s3.staticScale : i4.unitLength && (s3.transA *= (u2 - s3.min + r2) / i4.unitLength), r2 && (s3.minPixelPadding = s3.transA * (s3.minPointOffset || 0)), s3.min = p2, s3.max = u2);
                }
              }), d(e3, true) && s3.chart.redraw();
            }
          }
          t3.Additions = b;
        }(s || (s = {})), s;
      }), i(e, "Core/Axis/GridAxis.js", [e["Core/Axis/Axis.js"], e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2, i2) {
        var s, o;
        let { composed: r, dateFormats: n } = e2, { addEvent: a, defined: l, erase: h, find: d, isArray: c, isNumber: p, merge: u, pick: g, pushUnique: x, timeUnits: f, wrap: m } = i2;
        function b(t3) {
          return i2.isObject(t3, true);
        }
        function y(t3, e3) {
          let i3 = { width: 0, height: 0 };
          if (e3.forEach(function(e4) {
            let s2 = t3[e4], o2 = 0, r2 = 0, n2;
            b(s2) && (o2 = (n2 = b(s2.label) ? s2.label : {}).getBBox ? n2.getBBox().height : 0, n2.textStr && !p(n2.textPxLength) && (n2.textPxLength = n2.getBBox().width), r2 = p(n2.textPxLength) ? Math.round(n2.textPxLength) : 0, n2.textStr && (r2 = Math.round(n2.getBBox().width)), i3.height = Math.max(o2, i3.height), i3.width = Math.max(r2, i3.width));
          }), "treegrid" === this.options.type && this.treeGrid && this.treeGrid.mapOfPosToGridNode) {
            let t4 = this.treeGrid.mapOfPosToGridNode[-1].height || 0;
            i3.width += this.options.labels.indentation * (t4 - 1);
          }
          return i3;
        }
        function M(t3) {
          let { grid: e3 } = this, i3 = 3 === this.side;
          if (i3 || t3.apply(this), !e3?.isColumn) {
            let t4 = e3?.columns || [];
            i3 && (t4 = t4.slice().reverse()), t4.forEach((t5) => {
              t5.getOffset();
            });
          }
          i3 && t3.apply(this);
        }
        function v(t3) {
          let e3 = this.options, i3 = e3.grid || {};
          if (true === i3.enabled) {
            let { axisTitle: e4, height: i4, horiz: o2, left: r2, offset: n2, opposite: a2, options: l2, top: h2, width: d2 } = this, c2 = this.tickSize(), p2 = e4 && e4.getBBox().width, u2 = l2.title.x, x2 = l2.title.y, f2 = g(l2.title.margin, o2 ? 5 : 10), m2 = e4 ? this.chart.renderer.fontMetrics(e4).f : 0, b2 = c2 ? c2[0] / 2 : 0, y2 = (o2 ? h2 + i4 : r2) + (o2 ? 1 : -1) * (a2 ? -1 : 1) * b2 + (this.side === s.bottom ? m2 : 0);
            t3.titlePosition.x = o2 ? r2 - (p2 || 0) / 2 - f2 + u2 : y2 + (a2 ? d2 : 0) + n2 + u2, t3.titlePosition.y = o2 ? y2 - (a2 ? i4 : 0) + (a2 ? m2 : -m2) / 2 + n2 + x2 : h2 - f2 + x2;
          }
        }
        function k() {
          let { chart: e3, options: { grid: i3 = {} }, userOptions: s2 } = this;
          if (i3.enabled && function(t3) {
            let e4 = t3.options;
            e4.labels.align = g(e4.labels.align, "center"), t3.categories || (e4.showLastLabel = false), t3.labelRotation = 0, e4.labels.rotation = 0, e4.minTickInterval = 1;
          }(this), i3.columns) {
            let o2 = this.grid.columns = [], r2 = this.grid.columnIndex = 0;
            for (; ++r2 < i3.columns.length; ) {
              let n2 = u(s2, i3.columns[r2], { isInternal: true, linkedTo: 0, scrollbar: { enabled: false } }, { grid: { columns: void 0 } }), a2 = new t2(this.chart, n2, "yAxis");
              a2.grid.isColumn = true, a2.grid.columnIndex = r2, h(e3.axes, a2), h(e3[this.coll] || [], a2), o2.push(a2);
            }
          }
        }
        function A() {
          let { axisTitle: t3, grid: e3, options: i3 } = this, o2 = i3.grid || {};
          if (true === o2.enabled) {
            let o3 = this.min || 0, r2 = this.max || 0, n2 = this.ticks[this.tickPositions[0]];
            if (t3 && !this.chart.styledMode && n2?.slotWidth && !this.options.title.style.width && t3.css({ width: `${n2.slotWidth}px` }), this.maxLabelDimensions = this.getMaxLabelDimensions(this.ticks, this.tickPositions), this.rightWall && this.rightWall.destroy(), this.grid && this.grid.isOuterAxis() && this.axisLine) {
              let t4 = i3.lineWidth;
              if (t4) {
                let e4 = this.getLinePath(t4), n3 = e4[0], a2 = e4[1], l2 = (this.tickSize("tick") || [1])[0], h2 = (l2 - 1) * (this.side === s.top || this.side === s.left ? -1 : 1);
                if ("M" === n3[0] && "L" === a2[0] && (this.horiz ? (n3[2] += h2, a2[2] += h2) : (n3[1] += h2, a2[1] += h2)), !this.horiz && this.chart.marginRight) {
                  let t5 = ["L", this.left, n3[2] || 0], e5 = [n3, t5], s2 = ["L", this.chart.chartWidth - this.chart.marginRight, this.toPixels(r2 + this.tickmarkOffset)], l3 = ["M", a2[1] || 0, this.toPixels(r2 + this.tickmarkOffset)], h3 = [l3, s2];
                  this.grid.upperBorder || o3 % 1 == 0 || (this.grid.upperBorder = this.grid.renderBorder(e5)), this.grid.upperBorder && (this.grid.upperBorder.attr({ stroke: i3.lineColor, "stroke-width": i3.lineWidth }), this.grid.upperBorder.animate({ d: e5 })), this.grid.lowerBorder || r2 % 1 == 0 || (this.grid.lowerBorder = this.grid.renderBorder(h3)), this.grid.lowerBorder && (this.grid.lowerBorder.attr({ stroke: i3.lineColor, "stroke-width": i3.lineWidth }), this.grid.lowerBorder.animate({ d: h3 }));
                }
                this.grid.axisLineExtra ? (this.grid.axisLineExtra.attr({ stroke: i3.lineColor, "stroke-width": i3.lineWidth }), this.grid.axisLineExtra.animate({ d: e4 })) : this.grid.axisLineExtra = this.grid.renderBorder(e4), this.axisLine[this.showAxis ? "show" : "hide"]();
              }
            }
            if ((e3 && e3.columns || []).forEach((t4) => t4.render()), !this.horiz && this.chart.hasRendered && (this.scrollbar || this.linkedParent && this.linkedParent.scrollbar) && this.tickPositions.length) {
              let t4, e4;
              let i4 = this.tickmarkOffset, s2 = this.tickPositions[this.tickPositions.length - 1], n3 = this.tickPositions[0];
              for (; (t4 = this.hiddenLabels.pop()) && t4.element; )
                t4.show();
              for (; (e4 = this.hiddenMarks.pop()) && e4.element; )
                e4.show();
              (t4 = this.ticks[n3].label) && (o3 - n3 > i4 ? this.hiddenLabels.push(t4.hide()) : t4.show()), (t4 = this.ticks[s2].label) && (s2 - r2 > i4 ? this.hiddenLabels.push(t4.hide()) : t4.show());
              let a2 = this.ticks[s2].mark;
              a2 && s2 - r2 < i4 && s2 - r2 > 0 && this.ticks[s2].isLast && this.hiddenMarks.push(a2.hide());
            }
          }
        }
        function S() {
          let t3 = this.tickPositions && this.tickPositions.info, e3 = this.options, i3 = e3.grid || {}, s2 = this.userOptions.labels || {};
          i3.enabled && (this.horiz ? (this.series.forEach((t4) => {
            t4.options.pointRange = 0;
          }), t3 && e3.dateTimeLabelFormats && e3.labels && !l(s2.align) && (false === e3.dateTimeLabelFormats[t3.unitName].range || t3.count > 1) && (e3.labels.align = "left", l(s2.x) || (e3.labels.x = 3))) : "treegrid" !== this.options.type && this.grid && this.grid.columns && (this.minPointOffset = this.tickInterval));
        }
        function C(t3) {
          let e3;
          let i3 = this.options, s2 = t3.userOptions, o2 = i3 && b(i3.grid) ? i3.grid : {};
          true === o2.enabled && (e3 = u(true, { className: "highcharts-grid-axis " + (s2.className || ""), dateTimeLabelFormats: { hour: { list: ["%H:%M", "%H"] }, day: { list: ["%A, %e. %B", "%a, %e. %b", "%E"] }, week: { list: ["Week %W", "W%W"] }, month: { list: ["%B", "%b", "%o"] } }, grid: { borderWidth: 1 }, labels: { padding: 2, style: { fontSize: "0.9em" } }, margin: 0, title: { text: null, reserveSpace: false, rotation: 0, style: { textOverflow: "ellipsis" } }, units: [["millisecond", [1, 10, 100]], ["second", [1, 10]], ["minute", [1, 5, 15]], ["hour", [1, 6]], ["day", [1]], ["week", [1]], ["month", [1]], ["year", null]] }, s2), "xAxis" !== this.coll || (l(s2.linkedTo) && !l(s2.tickPixelInterval) && (e3.tickPixelInterval = 350), !(!l(s2.tickPixelInterval) && l(s2.linkedTo)) || l(s2.tickPositioner) || l(s2.tickInterval) || l(s2.units) || (e3.tickPositioner = function(t4, i4) {
            let s3 = this.linkedParent && this.linkedParent.tickPositions && this.linkedParent.tickPositions.info;
            if (s3) {
              let o3 = e3.units || [], r2, n2 = 1, a2 = "year";
              for (let t5 = 0; t5 < o3.length; t5++) {
                let e4 = o3[t5];
                if (e4 && e4[0] === s3.unitName) {
                  r2 = t5;
                  break;
                }
              }
              let l2 = p(r2) && o3[r2 + 1];
              if (l2) {
                a2 = l2[0] || "year";
                let t5 = l2[1];
                n2 = t5 && t5[0] || 1;
              } else
                "year" === s3.unitName && (n2 = 10 * s3.count);
              let h2 = f[a2];
              return this.tickInterval = h2 * n2, this.chart.time.getTimeTicks({ unitRange: h2, count: n2, unitName: a2 }, t4, i4, this.options.startOfWeek);
            }
          })), u(true, this.options, e3), this.horiz && (i3.minPadding = g(s2.minPadding, 0), i3.maxPadding = g(s2.maxPadding, 0)), p(i3.grid.borderWidth) && (i3.tickWidth = i3.lineWidth = o2.borderWidth));
        }
        function w(t3) {
          let e3 = t3.userOptions, i3 = e3 && e3.grid || {}, s2 = i3.columns;
          i3.enabled && s2 && u(true, this.options, s2[0]);
        }
        function B() {
          (this.grid.columns || []).forEach((t3) => t3.setScale());
        }
        function P(t3) {
          let { horiz: e3, maxLabelDimensions: i3, options: { grid: s2 = {} } } = this;
          if (s2.enabled && i3) {
            let o2 = 2 * this.options.labels.distance, r2 = e3 ? s2.cellHeight || o2 + i3.height : o2 + i3.width;
            c(t3.tickSize) ? t3.tickSize[0] = r2 : t3.tickSize = [r2, 0];
          }
        }
        function T() {
          this.axes.forEach((t3) => {
            (t3.grid && t3.grid.columns || []).forEach((t4) => {
              t4.setAxisSize(), t4.setAxisTranslation();
            });
          });
        }
        function E(t3) {
          let { grid: e3 } = this;
          (e3.columns || []).forEach((e4) => e4.destroy(t3.keepEvents)), e3.columns = void 0;
        }
        function O(t3) {
          let e3 = t3.userOptions || {}, i3 = e3.grid || {};
          i3.enabled && l(i3.borderColor) && (e3.tickColor = e3.lineColor = i3.borderColor), this.grid || (this.grid = new j(this)), this.hiddenLabels = [], this.hiddenMarks = [];
        }
        function D(t3) {
          let e3 = this.label, i3 = this.axis, o2 = i3.reversed, r2 = i3.chart, n2 = i3.options, a2 = n2.grid || {}, l2 = i3.options.labels, h2 = l2.align, d2 = s[i3.side], c2 = t3.tickmarkOffset, u2 = i3.tickPositions, g2 = this.pos - c2, x2 = p(u2[t3.index + 1]) ? u2[t3.index + 1] - c2 : (i3.max || 0) + c2, f2 = i3.tickSize("tick"), m2 = f2 ? f2[0] : 0, b2 = f2 ? f2[1] / 2 : 0;
          if (true === a2.enabled) {
            let s2, n3, a3, c3;
            if ("top" === d2 ? n3 = (s2 = i3.top + i3.offset) - m2 : "bottom" === d2 ? s2 = (n3 = r2.chartHeight - i3.bottom + i3.offset) + m2 : (s2 = i3.top + i3.len - (i3.translate(o2 ? x2 : g2) || 0), n3 = i3.top + i3.len - (i3.translate(o2 ? g2 : x2) || 0)), "right" === d2 ? c3 = (a3 = r2.chartWidth - i3.right + i3.offset) + m2 : "left" === d2 ? a3 = (c3 = i3.left + i3.offset) - m2 : (a3 = Math.round(i3.left + (i3.translate(o2 ? x2 : g2) || 0)) - b2, c3 = Math.min(Math.round(i3.left + (i3.translate(o2 ? g2 : x2) || 0)) - b2, i3.left + i3.len)), this.slotWidth = c3 - a3, t3.pos.x = "left" === h2 ? a3 : "right" === h2 ? c3 : a3 + (c3 - a3) / 2, t3.pos.y = n3 + (s2 - n3) / 2, e3) {
              let i4 = r2.renderer.fontMetrics(e3), s3 = e3.getBBox().height;
              if (l2.useHTML)
                t3.pos.y += i4.b + -(s3 / 2);
              else {
                let e4 = Math.round(s3 / i4.h);
                t3.pos.y += (i4.b - (i4.h - i4.f)) / 2 + -((e4 - 1) * i4.h / 2);
              }
            }
            t3.pos.x += i3.horiz && l2.x || 0;
          }
        }
        function G(t3) {
          let { axis: i3, value: s2 } = t3;
          if (i3.options.grid && i3.options.grid.enabled) {
            let o2;
            let r2 = i3.tickPositions, n2 = (i3.linkedParent || i3).series[0], a2 = s2 === r2[0], l2 = s2 === r2[r2.length - 1], h2 = n2 && d(n2.options.data, function(t4) {
              return t4[i3.isXAxis ? "x" : "y"] === s2;
            });
            h2 && n2.is("gantt") && (o2 = u(h2), e2.seriesTypes.gantt.prototype.pointClass.setGanttPointAliases(o2)), t3.isFirst = a2, t3.isLast = l2, t3.point = o2;
          }
        }
        function I() {
          this.chart;
          let t3 = this.options, e3 = t3.grid || {}, i3 = this.categories, s2 = this.tickPositions, o2 = s2[0], r2 = s2[1], n2 = s2[s2.length - 1], a2 = s2[s2.length - 2], l2 = this.linkedParent && this.linkedParent.min, h2 = this.linkedParent && this.linkedParent.max, d2 = l2 || this.min, c2 = h2 || this.max, u2 = this.tickInterval, g2 = p(d2) && d2 >= o2 + u2 && d2 < r2, x2 = p(d2) && o2 < d2 && o2 + u2 > d2, f2 = p(c2) && n2 > c2 && n2 - u2 < c2, m2 = p(c2) && c2 <= n2 - u2 && c2 > a2;
          true === e3.enabled && !i3 && (this.isXAxis || this.isLinked) && ((x2 || g2) && !t3.startOnTick && (s2[0] = d2), (f2 || m2) && !t3.endOnTick && (s2[s2.length - 1] = c2));
        }
        function L(t3) {
          var e3;
          let { options: { grid: i3 = {} } } = this;
          return true === i3.enabled && this.categories ? this.tickInterval : t3.apply(this, (e3 = arguments, Array.prototype.slice.call(e3, 1)));
        }
        (o = s || (s = {}))[o.top = 0] = "top", o[o.right = 1] = "right", o[o.bottom = 2] = "bottom", o[o.left = 3] = "left";
        class j {
          constructor(t3) {
            this.axis = t3;
          }
          isOuterAxis() {
            let t3 = this.axis, e3 = t3.chart, i3 = t3.grid.columnIndex, s2 = t3.linkedParent?.grid.columns || t3.grid.columns || [], o2 = i3 ? t3.linkedParent : t3, r2 = -1, n2 = 0;
            return 3 === t3.side && !e3.inverted && s2.length ? !t3.linkedParent : ((e3[t3.coll] || []).forEach((e4, i4) => {
              e4.side !== t3.side || e4.options.isInternal || (n2 = i4, e4 !== o2 || (r2 = i4));
            }), n2 === r2 && (!p(i3) || s2.length === i3));
          }
          renderBorder(t3) {
            let e3 = this.axis, i3 = e3.chart.renderer, s2 = e3.options, o2 = i3.path(t3).addClass("highcharts-axis-line").add(e3.axisGroup);
            return i3.styledMode || o2.attr({ stroke: s2.lineColor, "stroke-width": s2.lineWidth, zIndex: 7 }), o2;
          }
        }
        return n.E = function(t3) {
          return this.dateFormat("%a", t3, true).charAt(0);
        }, n.W = function(t3) {
          let e3 = this, i3 = new this.Date(t3);
          ["Hours", "Milliseconds", "Minutes", "Seconds"].forEach(function(t4) {
            e3.set(t4, i3, 0);
          });
          let s2 = (this.get("Day", i3) + 6) % 7, o2 = new this.Date(i3.valueOf());
          this.set("Date", o2, this.get("Date", i3) - s2 + 3);
          let r2 = new this.Date(this.get("FullYear", o2), 0, 1);
          return 4 !== this.get("Day", r2) && (this.set("Month", i3, 0), this.set("Date", i3, 1 + (11 - this.get("Day", r2)) % 7)), (1 + Math.floor((o2.valueOf() - r2.valueOf()) / 6048e5)).toString();
        }, { compose: function t3(e3, i3, s2) {
          return x(r, t3) && (e3.keepProps.push("grid"), e3.prototype.getMaxLabelDimensions = y, m(e3.prototype, "unsquish", L), m(e3.prototype, "getOffset", M), a(e3, "init", O), a(e3, "afterGetTitlePosition", v), a(e3, "afterInit", k), a(e3, "afterRender", A), a(e3, "afterSetAxisTranslation", S), a(e3, "afterSetOptions", C), a(e3, "afterSetOptions", w), a(e3, "afterSetScale", B), a(e3, "afterTickSize", P), a(e3, "trimTicks", I), a(e3, "destroy", E), a(i3, "afterSetChartSize", T), a(s2, "afterGetLabelPosition", D), a(s2, "labelFormat", G)), e3;
        } };
      }), i(e, "Gantt/Tree.js", [e["Core/Utilities.js"]], function(t2) {
        let { extend: e2, isNumber: i2, pick: s } = t2;
        function o(t3, r, n, a, l, h) {
          let d = h && h.after, c = h && h.before, p = { data: a, depth: n - 1, id: t3, level: n, parent: r || "" }, u = 0, g = 0, x, f;
          "function" == typeof c && c(p, h);
          let m = (l[t3] || []).map((e3) => {
            let s2 = o(e3.id, t3, n + 1, e3, l, h), r2 = e3.start || NaN, a2 = true === e3.milestone ? r2 : e3.end || NaN;
            return x = !i2(x) || r2 < x ? r2 : x, f = !i2(f) || a2 > f ? a2 : f, u = u + 1 + s2.descendants, g = Math.max(s2.height + 1, g), s2;
          });
          return a && (a.start = s(a.start, x), a.end = s(a.end, f)), e2(p, { children: m, descendants: u, height: g }), "function" == typeof d && d(p, h), p;
        }
        return { getNode: o, getTree: function(t3, e3) {
          return o("", null, 1, null, function(t4) {
            let e4 = [], i3 = t4.reduce((t5, i4) => {
              let { parent: s2 = "", id: o2 } = i4;
              return void 0 === t5[s2] && (t5[s2] = []), t5[s2].push(i4), o2 && e4.push(o2), t5;
            }, {});
            return Object.keys(i3).forEach((t5) => {
              if ("" !== t5 && -1 === e4.indexOf(t5)) {
                let e5 = i3[t5].map(function(t6) {
                  let _a = t6, { parent: e6 } = _a, i4 = __objRest(_a, ["parent"]);
                  return i4;
                });
                i3[""].push(...e5), delete i3[t5];
              }
            }), i3;
          }(t3), e3);
        } };
      }), i(e, "Core/Axis/TreeGrid/TreeGridTick.js", [e["Core/Globals.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { composed: i2 } = t2, { addEvent: s, removeEvent: o, isObject: r, isNumber: n, pick: a, pushUnique: l, wrap: h } = e2;
        function d() {
          this.treeGrid || (this.treeGrid = new u(this));
        }
        function c(t3, e3, i3, s2, o2, l2, h2, d2, c2) {
          let p2, u2, g;
          let x = a(this.options && this.options.labels, l2), f = this.pos, m = this.axis, b = m.options, y = "treegrid" === b.type, M = t3.apply(this, [e3, i3, s2, o2, x, h2, d2, c2]);
          if (y) {
            let { width: t4 = 0, padding: e4 = m.linkedParent ? 0 : 5 } = x && r(x.symbol, true) ? x.symbol : {}, i4 = x && n(x.indentation) ? x.indentation : 0;
            g = (u2 = (p2 = m.treeGrid.mapOfPosToGridNode) && p2[f]) && u2.depth || 1, M.x += t4 + 2 * e4 + (g - 1) * i4;
          }
          return M;
        }
        function p(t3) {
          let e3;
          let { pos: i3, axis: l2, label: h2, treeGrid: d2, options: c2 } = this, p2 = d2?.labelIcon, u2 = h2?.element, { treeGrid: g, options: x, chart: f, tickPositions: m } = l2, b = g.mapOfPosToGridNode, y = a(c2?.labels, x?.labels), M = y && r(y.symbol, true) ? y.symbol : {}, v = b && b[i3], { descendants: k, depth: A } = v || {}, S = v && k && k > 0, C = "treegrid" === x.type && u2, w = m.indexOf(i3) > -1, B = "highcharts-treegrid-node-", P = B + "level-", T = f.styledMode;
          (C && v && h2.removeClass(RegExp(P + ".*")).addClass(P + A), t3.apply(this, Array.prototype.slice.call(arguments, 1)), C && S) ? (e3 = g.isCollapsed(v), function(t4, e4) {
            let i4 = t4.treeGrid, s2 = !i4.labelIcon, o2 = e4.renderer, r2 = e4.xy, l3 = e4.options, h3 = l3.width || 0, d3 = l3.height || 0, c3 = l3.padding ?? t4.axis.linkedParent ? 0 : 5, p3 = { x: r2.x - h3 / 2 - c3, y: r2.y - d3 / 2 }, u3 = e4.collapsed ? 90 : 180, g2 = e4.show && n(p3.y), x2 = i4.labelIcon;
            x2 || (i4.labelIcon = x2 = o2.path(o2.symbols[l3.type](l3.x || 0, l3.y || 0, h3, d3)).addClass("highcharts-label-icon").add(e4.group)), x2[g2 ? "show" : "hide"](), o2.styledMode || x2.attr({ cursor: "pointer", fill: a(e4.color, "#666666"), "stroke-width": 1, stroke: l3.lineColor, strokeWidth: l3.lineWidth || 0 }), x2[s2 ? "attr" : "animate"]({ translateX: p3.x, translateY: p3.y, rotation: u3 });
          }(this, { color: !T && h2.styles && h2.styles.color || "", collapsed: e3, group: h2.parentGroup, options: M, renderer: h2.renderer, show: w, xy: h2.xy }), h2.addClass(B + (e3 ? "collapsed" : "expanded")).removeClass(B + (e3 ? "expanded" : "collapsed")), T || h2.css({ cursor: "pointer" }), [h2, p2].forEach((t4) => {
            t4 && !t4.attachedTreeGridEvents && (s(t4.element, "mouseover", function() {
              h2.addClass("highcharts-treegrid-node-active"), h2.renderer.styledMode || h2.css({ textDecoration: "underline" });
            }), s(t4.element, "mouseout", function() {
              !function(t5, e4) {
                let i4 = r(e4.style) ? e4.style : {};
                t5.removeClass("highcharts-treegrid-node-active"), t5.renderer.styledMode || t5.css({ textDecoration: i4.textDecoration || "none" });
              }(h2, y);
            }), s(t4.element, "click", function() {
              d2.toggleCollapse();
            }), t4.attachedTreeGridEvents = true);
          })) : p2 && (o(u2), h2?.css({ cursor: "default" }), p2.destroy());
        }
        class u {
          static compose(t3) {
            if (l(i2, this.compose)) {
              let e3 = t3.prototype;
              s(t3, "init", d), h(e3, "getLabelPosition", c), h(e3, "renderLabel", p), e3.collapse = function(t4) {
                this.treeGrid.collapse(t4);
              }, e3.expand = function(t4) {
                this.treeGrid.expand(t4);
              }, e3.toggleCollapse = function(t4) {
                this.treeGrid.toggleCollapse(t4);
              };
            }
          }
          constructor(t3) {
            this.tick = t3;
          }
          collapse(t3) {
            let e3 = this.tick, i3 = e3.axis, s2 = i3.brokenAxis;
            if (s2 && i3.treeGrid.mapOfPosToGridNode) {
              let o2 = e3.pos, r2 = i3.treeGrid.mapOfPosToGridNode[o2], n2 = i3.treeGrid.collapse(r2);
              s2.setBreaks(n2, a(t3, true));
            }
          }
          destroy() {
            this.labelIcon && this.labelIcon.destroy();
          }
          expand(t3) {
            let { pos: e3, axis: i3 } = this.tick, { treeGrid: s2, brokenAxis: o2 } = i3, r2 = s2.mapOfPosToGridNode;
            if (o2 && r2) {
              let i4 = r2[e3], n2 = s2.expand(i4);
              o2.setBreaks(n2, a(t3, true));
            }
          }
          toggleCollapse(t3) {
            let e3 = this.tick, i3 = e3.axis, s2 = i3.brokenAxis;
            if (s2 && i3.treeGrid.mapOfPosToGridNode) {
              let o2 = e3.pos, r2 = i3.treeGrid.mapOfPosToGridNode[o2], n2 = i3.treeGrid.toggleCollapse(r2);
              s2.setBreaks(n2, a(t3, true));
            }
          }
        }
        return u;
      }), i(e, "Series/TreeUtilities.js", [e["Core/Color/Color.js"], e["Core/Utilities.js"]], function(t2, e2) {
        let { extend: i2, isArray: s, isNumber: o, isObject: r, merge: n, pick: a } = e2;
        return { getColor: function(e3, i3) {
          let s2, o2, r2, n2, l, h;
          let d = i3.index, c = i3.mapOptionsToLevel, p = i3.parentColor, u = i3.parentColorIndex, g = i3.series, x = i3.colors, f = i3.siblings, m = g.points, b = g.chart.options.chart;
          return e3 && (s2 = m[e3.i], o2 = c[e3.level] || {}, s2 && o2.colorByPoint && (n2 = s2.index % (x ? x.length : b.colorCount), r2 = x && x[n2]), g.chart.styledMode || (l = a(s2 && s2.options.color, o2 && o2.color, r2, p && ((e4) => {
            let i4 = o2 && o2.colorVariation;
            return i4 && "brightness" === i4.key && d && f ? t2.parse(e4).brighten(i4.to * (d / f)).get() : e4;
          })(p), g.color)), h = a(s2 && s2.options.colorIndex, o2 && o2.colorIndex, n2, u, i3.colorIndex)), { color: l, colorIndex: h };
        }, getLevelOptions: function(t3) {
          let e3 = {}, i3, l, h, d, c, p;
          if (r(t3))
            for (d = o(t3.from) ? t3.from : 1, p = t3.levels, l = {}, i3 = r(t3.defaults) ? t3.defaults : {}, s(p) && (l = p.reduce((t4, e4) => {
              let s2, l2, h2;
              return r(e4) && o(e4.level) && (l2 = a((h2 = n({}, e4)).levelIsConstant, i3.levelIsConstant), delete h2.levelIsConstant, delete h2.level, r(t4[s2 = e4.level + (l2 ? 0 : d - 1)]) ? n(true, t4[s2], h2) : t4[s2] = h2), t4;
            }, {})), c = o(t3.to) ? t3.to : 1, h = 0; h <= c; h++)
              e3[h] = n({}, i3, r(l[h]) ? l[h] : {});
          return e3;
        }, setTreeValues: function t3(e3, s2) {
          let o2 = s2.before, r2 = s2.idRoot, n2 = s2.mapIdToNode, l = n2[r2], h = false !== s2.levelIsConstant, d = s2.points, c = d[e3.i], p = c && c.options || {}, u = [], g = 0;
          e3.levelDynamic = e3.level - (h ? 0 : l.level), e3.name = a(c && c.name, ""), e3.visible = r2 === e3.id || true === s2.visible, "function" == typeof o2 && (e3 = o2(e3, s2)), e3.children.forEach((o3, r3) => {
            let n3 = i2({}, s2);
            i2(n3, { index: r3, siblings: e3.children.length, visible: e3.visible }), o3 = t3(o3, n3), u.push(o3), o3.visible && (g += o3.val);
          });
          let x = a(p.value, g);
          return e3.visible = x >= 0 && (g > 0 || e3.visible), e3.children = u, e3.childrenTotal = g, e3.isLeaf = e3.visible && !g, e3.val = x, e3;
        }, updateRootId: function(t3) {
          let e3, i3;
          return r(t3) && (i3 = r(t3.options) ? t3.options : {}, e3 = a(t3.rootNode, i3.rootId, ""), r(t3.userOptions) && (t3.userOptions.rootId = e3), t3.rootNode = e3), e3;
        } };
      }), i(e, "Core/Axis/TreeGrid/TreeGridAxis.js", [e["Core/Axis/BrokenAxis.js"], e["Core/Axis/GridAxis.js"], e["Core/Globals.js"], e["Gantt/Tree.js"], e["Core/Axis/TreeGrid/TreeGridTick.js"], e["Series/TreeUtilities.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, o, r, n) {
        let a;
        let { composed: l } = i2, { getLevelOptions: h } = r, { addEvent: d, find: c, fireEvent: p, isArray: u, isObject: g, isString: x, merge: f, pick: m, pushUnique: b, removeEvent: y, wrap: M } = n;
        function v(t3, e3) {
          let i3 = t3.collapseEnd || 0, s2 = t3.collapseStart || 0;
          return i3 >= e3 && (s2 -= 0.5), { from: s2, to: i3, showPoints: false };
        }
        function k(t3, e3, i3) {
          let o2 = [], r2 = [], n2 = {}, a2 = "boolean" == typeof e3 && e3, l2 = {}, h2 = -1, d2 = s.getTree(t3, { after: function(t4) {
            let e4 = l2[t4.pos], i4 = 0, s2 = 0;
            e4.children.forEach(function(t5) {
              s2 += (t5.descendants || 0) + 1, i4 = Math.max((t5.height || 0) + 1, i4);
            }), e4.descendants = s2, e4.height = i4, e4.collapsed && r2.push(e4);
          }, before: function(t4) {
            let e4, i4;
            let s2 = g(t4.data, true) ? t4.data : {}, r3 = x(s2.name) ? s2.name : "", d3 = n2[t4.parent], p2 = g(d3, true) ? l2[d3.pos] : null;
            a2 && g(p2, true) && (e4 = c(p2.children, function(t5) {
              return t5.name === r3;
            })) ? (i4 = e4.pos, e4.nodes.push(t4)) : i4 = h2++, !l2[i4] && (l2[i4] = e4 = { depth: p2 ? p2.depth + 1 : 0, name: r3, id: s2.id, nodes: [t4], children: [], pos: i4 }, -1 !== i4 && o2.push(r3), g(p2, true) && p2.children.push(e4)), x(t4.id) && (n2[t4.id] = t4), e4 && true === s2.collapsed && (e4.collapsed = true), t4.pos = i4;
          } });
          return { categories: o2, mapOfIdToNode: n2, mapOfPosToGridNode: l2 = function(t4, e4) {
            let i4 = function(t5, s2, o3) {
              let r3 = t5.nodes, n3 = s2 + (-1 === s2 ? 0 : e4 - 1), a3 = (n3 - s2) / 2, l3 = s2 + a3;
              return r3.forEach(function(t6) {
                let e5 = t6.data;
                g(e5, true) && (e5.y = s2 + (e5.seriesIndex || 0), delete e5.seriesIndex), t6.pos = l3;
              }), o3[l3] = t5, t5.pos = l3, t5.tickmarkOffset = a3 + 0.5, t5.collapseStart = n3 + 0.5, t5.children.forEach(function(t6) {
                i4(t6, n3 + 1, o3), n3 = (t6.collapseEnd || 0) - 0.5;
              }), t5.collapseEnd = n3 + 0.5, o3;
            };
            return i4(t4["-1"], -1, {});
          }(l2, i3), collapsedNodes: r2, tree: d2 };
        }
        function A(t3) {
          let e3 = t3.target, i3 = e3.axes;
          i3.filter(function(t4) {
            return "treegrid" === t4.options.type;
          }).forEach(function(e4) {
            let i4 = e4.options || {}, s2 = i4.labels, o2 = i4.uniqueNames, r2 = i4.max, n2 = !e4.treeGrid.mapOfPosToGridNode || e4.series.some(function(t4) {
              return !t4.hasRendered || t4.isDirtyData || t4.isDirty;
            }), a2 = 0, l2, d2;
            if (n2) {
              if (l2 = e4.series.reduce(function(t4, e5) {
                return e5.visible && ((e5.options.data || []).forEach(function(i5) {
                  e5.options.keys && e5.options.keys.length && (i5 = e5.pointClass.prototype.optionsToObject.call({ series: e5 }, i5), e5.pointClass.setGanttPointAliases(i5)), g(i5, true) && (i5.seriesIndex = a2, t4.push(i5));
                }), true === o2 && a2++), t4;
              }, []), r2 && l2.length < r2)
                for (let t4 = l2.length; t4 <= r2; t4++)
                  l2.push({ name: t4 + "​" });
              d2 = k(l2, o2 || false, true === o2 ? a2 : 1), e4.categories = d2.categories, e4.treeGrid.mapOfPosToGridNode = d2.mapOfPosToGridNode, e4.hasNames = true, e4.treeGrid.tree = d2.tree, e4.series.forEach(function(t4) {
                let e5 = (t4.options.data || []).map(function(e6) {
                  return u(e6) && t4.options.keys && t4.options.keys.length && l2.forEach(function(t5) {
                    e6.indexOf(t5.x) >= 0 && e6.indexOf(t5.x2) >= 0 && (e6 = t5);
                  }), g(e6, true) ? f(e6) : e6;
                });
                t4.visible && t4.setData(e5, false);
              }), e4.treeGrid.mapOptionsToLevel = h({ defaults: s2, from: 1, levels: s2 && s2.levels, to: e4.treeGrid.tree && e4.treeGrid.tree.height }), "beforeRender" === t3.type && (e4.treeGrid.collapsedNodes = d2.collapsedNodes);
            }
          });
        }
        function S(t3, e3) {
          let i3 = this.treeGrid.mapOptionsToLevel || {}, s2 = "treegrid" === this.options.type, o2 = this.ticks, r2 = o2[e3], n2, l2, h2;
          s2 && this.treeGrid.mapOfPosToGridNode ? ((n2 = i3[(h2 = this.treeGrid.mapOfPosToGridNode[e3]).depth]) && (l2 = { labels: n2 }), !r2 && a ? o2[e3] = r2 = new a(this, e3, void 0, void 0, { category: h2.name, tickmarkOffset: h2.tickmarkOffset, options: l2 }) : (r2.parameters.category = h2.name, r2.options = l2, r2.addLabel())) : t3.apply(this, Array.prototype.slice.call(arguments, 1));
        }
        function C(t3, e3, i3, s2) {
          let o2 = this, r2 = "treegrid" === i3.type;
          o2.treeGrid || (o2.treeGrid = new P(o2)), r2 && (d(e3, "beforeRender", A), d(e3, "beforeRedraw", A), d(e3, "addSeries", function(t4) {
            if (t4.options.data) {
              let e4 = k(t4.options.data, i3.uniqueNames || false, 1);
              o2.treeGrid.collapsedNodes = (o2.treeGrid.collapsedNodes || []).concat(e4.collapsedNodes);
            }
          }), d(o2, "foundExtremes", function() {
            o2.treeGrid.collapsedNodes && o2.treeGrid.collapsedNodes.forEach(function(t4) {
              let e4 = o2.treeGrid.collapse(t4);
              o2.brokenAxis && (o2.brokenAxis.setBreaks(e4, false), o2.treeGrid.collapsedNodes && (o2.treeGrid.collapsedNodes = o2.treeGrid.collapsedNodes.filter((e5) => t4.collapseStart !== e5.collapseStart || t4.collapseEnd !== e5.collapseEnd)));
            });
          }), d(o2, "afterBreaks", function() {
            "yAxis" === o2.coll && !o2.staticScale && o2.chart.options.chart.height && (o2.isDirty = true);
          }), i3 = f({ grid: { enabled: true }, labels: { align: "left", levels: [{ level: void 0 }, { level: 1, style: { fontWeight: "bold" } }], symbol: { type: "triangle", x: -5, y: -5, height: 10, width: 10 } }, uniqueNames: false }, i3, { reversed: true })), t3.apply(o2, [e3, i3, s2]), r2 && (o2.hasNames = true, o2.options.showLastLabel = true);
        }
        function w(t3) {
          let e3 = this.options, i3 = "number" == typeof e3.linkedTo ? this.chart[this.coll]?.[e3.linkedTo] : void 0, s2 = "treegrid" === e3.type;
          if (s2) {
            if (this.min = m(this.userMin, e3.min, this.dataMin), this.max = m(this.userMax, e3.max, this.dataMax), p(this, "foundExtremes"), this.setAxisTranslation(), this.tickInterval = 1, this.tickmarkOffset = 0.5, this.tickPositions = this.treeGrid.mapOfPosToGridNode ? this.treeGrid.getTickPositions() : [], i3) {
              let t4 = i3.getExtremes();
              this.min = m(t4.min, t4.dataMin), this.max = m(t4.max, t4.dataMax), this.tickPositions = i3.tickPositions;
            }
            this.linkedParent = i3;
          } else
            t3.apply(this, Array.prototype.slice.call(arguments, 1));
        }
        function B(t3) {
          let e3 = this, i3 = e3.options, s2 = "treegrid" === i3.type;
          s2 && e3.visible && e3.tickPositions.forEach(function(t4) {
            let i4 = e3.ticks[t4];
            i4.label && i4.label.attachedTreeGridEvents && (y(i4.label.element), i4.label.attachedTreeGridEvents = false);
          }), t3.apply(e3, Array.prototype.slice.call(arguments, 1));
        }
        class P {
          static compose(i3, r2, n2, h2) {
            if (b(l, this.compose)) {
              let t3 = i3.prototype;
              -1 === i3.keepProps.indexOf("treeGrid") && i3.keepProps.push("treeGrid"), M(t3, "generateTick", S), M(t3, "init", C), M(t3, "setTickInterval", w), M(t3, "redraw", B), t3.utils = { getNode: s.getNode }, a || (a = h2);
            }
            return e2.compose(i3, r2, h2), t2.compose(i3, n2), o.compose(h2), i3;
          }
          constructor(t3) {
            this.axis = t3;
          }
          setCollapsedStatus(t3) {
            let e3 = this.axis, i3 = e3.chart;
            e3.series.forEach(function(e4) {
              let s2 = e4.options.data;
              if (t3.id && s2) {
                let o2 = i3.get(t3.id), r2 = s2[e4.data.indexOf(o2)];
                o2 && r2 && (o2.collapsed = t3.collapsed, r2.collapsed = t3.collapsed);
              }
            });
          }
          collapse(t3) {
            let e3 = this.axis, i3 = e3.options.breaks || [], s2 = v(t3, e3.max);
            return i3.push(s2), t3.collapsed = true, e3.treeGrid.setCollapsedStatus(t3), i3;
          }
          expand(t3) {
            let e3 = this.axis, i3 = e3.options.breaks || [], s2 = v(t3, e3.max);
            return t3.collapsed = false, e3.treeGrid.setCollapsedStatus(t3), i3.reduce(function(t4, e4) {
              return (e4.to !== s2.to || e4.from !== s2.from) && t4.push(e4), t4;
            }, []);
          }
          getTickPositions() {
            let t3 = this.axis, e3 = Math.floor(t3.min / t3.tickInterval) * t3.tickInterval, i3 = Math.ceil(t3.max / t3.tickInterval) * t3.tickInterval;
            return Object.keys(t3.treeGrid.mapOfPosToGridNode || {}).reduce(function(s2, o2) {
              let r2 = +o2;
              return r2 >= e3 && r2 <= i3 && !(t3.brokenAxis && t3.brokenAxis.isInAnyBreak(r2)) && s2.push(r2), s2;
            }, []);
          }
          isCollapsed(t3) {
            let e3 = this.axis, i3 = e3.options.breaks || [], s2 = v(t3, e3.max);
            return i3.some(function(t4) {
              return t4.from === s2.from && t4.to === s2.to;
            });
          }
          toggleCollapse(t3) {
            return this.isCollapsed(t3) ? this.expand(t3) : this.collapse(t3);
          }
        }
        return P;
      }), i(e, "Series/Gantt/GanttSeries.js", [e["Series/Gantt/GanttPoint.js"], e["Series/Gantt/GanttSeriesDefaults.js"], e["Gantt/Pathfinder.js"], e["Core/Series/SeriesRegistry.js"], e["Extensions/StaticScale.js"], e["Core/Axis/TreeGrid/TreeGridAxis.js"], e["Core/Utilities.js"]], function(t2, e2, i2, s, o, r, n) {
        let { series: a, seriesTypes: { xrange: l } } = s, { extend: h, isNumber: d, merge: c } = n;
        class p extends l {
          static compose(t3, e3, s2, n2) {
            l.compose(t3), e3 && (o.compose(t3, e3), s2) && (i2.compose(e3, s2.prototype.pointClass), n2 && r.compose(t3, e3, s2, n2));
          }
          drawPoint(t3, e3) {
            let i3 = this.options, s2 = this.chart.renderer, o2 = t3.shapeArgs, r2 = t3.plotY, n2 = t3.selected && "select", a2 = i3.stacking && !i3.borderRadius, l2 = t3.graphic, h2;
            t3.options.milestone ? d(r2) && null !== t3.y && false !== t3.visible ? (h2 = s2.symbols.diamond(o2.x || 0, o2.y || 0, o2.width || 0, o2.height || 0), l2 ? l2[e3]({ d: h2 }) : t3.graphic = l2 = s2.path(h2).addClass(t3.getClassName(), true).add(t3.group || this.group), this.chart.styledMode || t3.graphic.attr(this.pointAttribs(t3, n2)).shadow(i3.shadow, null, a2)) : l2 && (t3.graphic = l2.destroy()) : super.drawPoint(t3, e3);
          }
          translatePoint(t3) {
            let e3, i3;
            super.translatePoint(t3), t3.options.milestone && (i3 = (e3 = t3.shapeArgs).height || 0, t3.shapeArgs = { x: (e3.x || 0) - i3 / 2, y: e3.y, width: i3, height: i3 });
          }
        }
        return p.defaultOptions = c(l.defaultOptions, e2), h(p.prototype, { pointArrayMap: ["start", "end", "y"], pointClass: t2, setData: a.prototype.setData }), s.registerSeriesType("gantt", p), p;
      }), i(e, "masters/modules/gantt.src.js", [e["Core/Globals.js"], e["Extensions/ArrowSymbols.js"], e["Gantt/Connection.js"], e["Extensions/CurrentDateIndication.js"], e["Core/Chart/GanttChart.js"], e["Stock/Navigator/Navigator.js"], e["Gantt/Pathfinder.js"], e["Stock/RangeSelector/RangeSelector.js"], e["Stock/Scrollbar/Scrollbar.js"], e["Extensions/StaticScale.js"], e["Series/XRange/XRangeSeries.js"], e["Series/Gantt/GanttSeries.js"]], function(t2, e2, i2, s, o, r, n, a, l, h, d, c) {
        t2.Connection = i2, t2.GanttChart = o, t2.ganttChart = o.ganttChart, t2.Navigator = r, t2.Pathfinder = n, t2.RangeSelector = a, t2.Scrollbar = l, e2.compose(t2.SVGRenderer), s.compose(t2.Axis, t2.PlotLineOrBand), c.compose(t2.Axis, t2.Chart, t2.Series, t2.Tick), r.compose(t2.Axis, t2.Chart, t2.Series), n.compose(t2.Chart, t2.Point), a.compose(t2.Axis, t2.Chart), l.compose(t2.Axis), d.compose(t2.Axis), h.compose(t2.Axis, t2.Chart);
      });
    });
  }
});
export default require_gantt();
//# sourceMappingURL=highcharts_modules_gantt.js.map
