import {
  __commonJS,
  __spreadValues
} from "./chunk-KSCYWWKG.js";

// node_modules/highcharts/modules/exporting.js
var require_exporting = __commonJS({
  "node_modules/highcharts/modules/exporting.js"(exports, module) {
    !function(e) {
      "object" == typeof module && module.exports ? (e.default = e, module.exports = e) : "function" == typeof define && define.amd ? define("highcharts/modules/exporting", ["highcharts"], function(t) {
        return e(t), e.Highcharts = t, e;
      }) : e("undefined" != typeof Highcharts ? Highcharts : void 0);
    }(function(e) {
      "use strict";
      var t = e ? e._modules : {};
      function n(e2, t2, n2, i) {
        e2.hasOwnProperty(t2) || (e2[t2] = i.apply(null, n2), "function" == typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: t2, module: e2[t2] } })));
      }
      n(t, "Core/Chart/ChartNavigationComposition.js", [], function() {
        var e2;
        return function(e3) {
          e3.compose = function(e4) {
            return e4.navigation || (e4.navigation = new t2(e4)), e4;
          };
          class t2 {
            constructor(e4) {
              this.updates = [], this.chart = e4;
            }
            addUpdate(e4) {
              this.chart.navigation.updates.push(e4);
            }
            update(e4, t3) {
              this.updates.forEach((n2) => {
                n2.call(this.chart, e4, t3);
              });
            }
          }
          e3.Additions = t2;
        }(e2 || (e2 = {})), e2;
      }), n(t, "Extensions/Exporting/ExportingDefaults.js", [t["Core/Globals.js"]], function(e2) {
        let { isTouchDevice: t2 } = e2;
        return { exporting: { allowTableSorting: true, type: "image/png", url: "https://export.highcharts.com/", pdfFont: { normal: void 0, bold: void 0, bolditalic: void 0, italic: void 0 }, printMaxWidth: 780, scale: 2, buttons: { contextButton: { className: "highcharts-contextbutton", menuClassName: "highcharts-contextmenu", symbol: "menu", titleKey: "contextButtonTitle", menuItems: ["viewFullscreen", "printChart", "separator", "downloadPNG", "downloadJPEG", "downloadPDF", "downloadSVG"] } }, menuItemDefinitions: { viewFullscreen: { textKey: "viewFullscreen", onclick: function() {
          this.fullscreen && this.fullscreen.toggle();
        } }, printChart: { textKey: "printChart", onclick: function() {
          this.print();
        } }, separator: { separator: true }, downloadPNG: { textKey: "downloadPNG", onclick: function() {
          this.exportChart();
        } }, downloadJPEG: { textKey: "downloadJPEG", onclick: function() {
          this.exportChart({ type: "image/jpeg" });
        } }, downloadPDF: { textKey: "downloadPDF", onclick: function() {
          this.exportChart({ type: "application/pdf" });
        } }, downloadSVG: { textKey: "downloadSVG", onclick: function() {
          this.exportChart({ type: "image/svg+xml" });
        } } } }, lang: { viewFullscreen: "View in full screen", exitFullscreen: "Exit from full screen", printChart: "Print chart", downloadPNG: "Download PNG image", downloadJPEG: "Download JPEG image", downloadPDF: "Download PDF document", downloadSVG: "Download SVG vector image", contextButtonTitle: "Chart context menu" }, navigation: { buttonOptions: { symbolSize: 14, symbolX: 14.5, symbolY: 13.5, align: "right", buttonSpacing: 3, height: 28, verticalAlign: "top", width: 28, symbolFill: "#666666", symbolStroke: "#666666", symbolStrokeWidth: 3, theme: { padding: 5 } }, menuStyle: { border: "none", borderRadius: "3px", background: "#ffffff", padding: "0.5em" }, menuItemStyle: { background: "none", borderRadius: "3px", color: "#333333", padding: "0.5em", fontSize: t2 ? "0.9em" : "0.8em", transition: "background 250ms, color 250ms" }, menuItemHoverStyle: { background: "#f2f2f2" } } };
      }), n(t, "Extensions/Exporting/ExportingSymbols.js", [], function() {
        var e2;
        return function(e3) {
          let t2 = [];
          function n2(e4, t3, n3, i2) {
            return [["M", e4, t3 + 2.5], ["L", e4 + n3, t3 + 2.5], ["M", e4, t3 + i2 / 2 + 0.5], ["L", e4 + n3, t3 + i2 / 2 + 0.5], ["M", e4, t3 + i2 - 1.5], ["L", e4 + n3, t3 + i2 - 1.5]];
          }
          function i(e4, t3, n3, i2) {
            let o = i2 / 3 - 2;
            return [].concat(this.circle(n3 - o, t3, o, o), this.circle(n3 - o, t3 + o + 4, o, o), this.circle(n3 - o, t3 + 2 * (o + 4), o, o));
          }
          e3.compose = function(e4) {
            if (-1 === t2.indexOf(e4)) {
              t2.push(e4);
              let o = e4.prototype.symbols;
              o.menu = n2, o.menuball = i.bind(o);
            }
          };
        }(e2 || (e2 = {})), e2;
      }), n(t, "Extensions/Exporting/Fullscreen.js", [t["Core/Renderer/HTML/AST.js"], t["Core/Globals.js"], t["Core/Utilities.js"]], function(e2, t2, n2) {
        let { composed: i } = t2, { addEvent: o, fireEvent: r, pushUnique: s } = n2;
        function l() {
          this.fullscreen = new a(this);
        }
        class a {
          static compose(e3) {
            s(i, this.compose) && o(e3, "beforeRender", l);
          }
          constructor(e3) {
            this.chart = e3, this.isOpen = false;
            let t3 = e3.renderTo;
            !this.browserProps && ("function" == typeof t3.requestFullscreen ? this.browserProps = { fullscreenChange: "fullscreenchange", requestFullscreen: "requestFullscreen", exitFullscreen: "exitFullscreen" } : t3.mozRequestFullScreen ? this.browserProps = { fullscreenChange: "mozfullscreenchange", requestFullscreen: "mozRequestFullScreen", exitFullscreen: "mozCancelFullScreen" } : t3.webkitRequestFullScreen ? this.browserProps = { fullscreenChange: "webkitfullscreenchange", requestFullscreen: "webkitRequestFullScreen", exitFullscreen: "webkitExitFullscreen" } : t3.msRequestFullscreen && (this.browserProps = { fullscreenChange: "MSFullscreenChange", requestFullscreen: "msRequestFullscreen", exitFullscreen: "msExitFullscreen" }));
          }
          close() {
            let e3 = this, t3 = e3.chart, n3 = t3.options.chart;
            r(t3, "fullscreenClose", null, function() {
              e3.isOpen && e3.browserProps && t3.container.ownerDocument instanceof Document && t3.container.ownerDocument[e3.browserProps.exitFullscreen](), e3.unbindFullscreenEvent && (e3.unbindFullscreenEvent = e3.unbindFullscreenEvent()), t3.setSize(e3.origWidth, e3.origHeight, false), e3.origWidth = void 0, e3.origHeight = void 0, n3.width = e3.origWidthOption, n3.height = e3.origHeightOption, e3.origWidthOption = void 0, e3.origHeightOption = void 0, e3.isOpen = false, e3.setButtonText();
            });
          }
          open() {
            let e3 = this, t3 = e3.chart, n3 = t3.options.chart;
            r(t3, "fullscreenOpen", null, function() {
              if (n3 && (e3.origWidthOption = n3.width, e3.origHeightOption = n3.height), e3.origWidth = t3.chartWidth, e3.origHeight = t3.chartHeight, e3.browserProps) {
                let n4 = o(t3.container.ownerDocument, e3.browserProps.fullscreenChange, function() {
                  e3.isOpen ? (e3.isOpen = false, e3.close()) : (t3.setSize(null, null, false), e3.isOpen = true, e3.setButtonText());
                }), i2 = o(t3, "destroy", n4);
                e3.unbindFullscreenEvent = () => {
                  n4(), i2();
                };
                let r2 = t3.renderTo[e3.browserProps.requestFullscreen]();
                r2 && r2.catch(function() {
                  alert("Full screen is not supported inside a frame.");
                });
              }
            });
          }
          setButtonText() {
            let t3 = this.chart, n3 = t3.exportDivElements, i2 = t3.options.exporting, o2 = i2 && i2.buttons && i2.buttons.contextButton.menuItems, r2 = t3.options.lang;
            if (i2 && i2.menuItemDefinitions && r2 && r2.exitFullscreen && r2.viewFullscreen && o2 && n3) {
              let t4 = n3[o2.indexOf("viewFullscreen")];
              t4 && e2.setElementHTML(t4, this.isOpen ? r2.exitFullscreen : i2.menuItemDefinitions.viewFullscreen.text || r2.viewFullscreen);
            }
          }
          toggle() {
            this.isOpen ? this.close() : this.open();
          }
        }
        return a;
      }), n(t, "Core/HttpUtilities.js", [t["Core/Globals.js"], t["Core/Utilities.js"]], function(e2, t2) {
        let { doc: n2, win: i } = e2, { createElement: o, discardElement: r, merge: s, objectEach: l } = t2, a = { ajax: function(e3) {
          let t3 = { json: "application/json", xml: "application/xml", text: "text/plain", octet: "application/octet-stream" }, n3 = new XMLHttpRequest();
          function i2(t4, n4) {
            e3.error && e3.error(t4, n4);
          }
          if (!e3.url)
            return false;
          n3.open((e3.type || "get").toUpperCase(), e3.url, true), e3.headers && e3.headers["Content-Type"] || n3.setRequestHeader("Content-Type", t3[e3.dataType || "json"] || t3.text), l(e3.headers, function(e4, t4) {
            n3.setRequestHeader(t4, e4);
          }), e3.responseType && (n3.responseType = e3.responseType), n3.onreadystatechange = function() {
            let t4;
            if (4 === n3.readyState) {
              if (200 === n3.status) {
                if ("blob" !== e3.responseType && (t4 = n3.responseText, "json" === e3.dataType))
                  try {
                    t4 = JSON.parse(t4);
                  } catch (e4) {
                    if (e4 instanceof Error)
                      return i2(n3, e4);
                  }
                return e3.success && e3.success(t4, n3);
              }
              i2(n3, n3.responseText);
            }
          }, e3.data && "string" != typeof e3.data && (e3.data = JSON.stringify(e3.data)), n3.send(e3.data);
        }, getJSON: function(e3, t3) {
          a.ajax({ url: e3, success: t3, dataType: "json", headers: { "Content-Type": "text/plain" } });
        }, post: function(e3, t3, n3) {
          let o2 = new i.FormData();
          l(t3, function(e4, t4) {
            o2.append(t4, e4);
          }), o2.append("b64", "true");
          let { filename: s2, type: a2 } = t3;
          return i.fetch(e3, __spreadValues({ method: "POST", body: o2 }, n3)).then((e4) => {
            e4.ok && e4.text().then((e5) => {
              let t4 = document.createElement("a");
              t4.href = `data:${a2};base64,${e5}`, t4.download = s2, t4.click(), r(t4);
            });
          });
        } };
        return a;
      }), n(t, "Extensions/Exporting/Exporting.js", [t["Core/Renderer/HTML/AST.js"], t["Core/Chart/Chart.js"], t["Core/Chart/ChartNavigationComposition.js"], t["Core/Defaults.js"], t["Extensions/Exporting/ExportingDefaults.js"], t["Extensions/Exporting/ExportingSymbols.js"], t["Extensions/Exporting/Fullscreen.js"], t["Core/Globals.js"], t["Core/HttpUtilities.js"], t["Core/Utilities.js"]], function(e2, t2, n2, i, o, r, s, l, a, c) {
        var p;
        let { defaultOptions: u, setOptions: h } = i, { composed: d, doc: g, SVG_NS: f, win: m } = l, { addEvent: x, css: y, createElement: b, discardElement: v, extend: w, find: E, fireEvent: C, isObject: S, merge: T, objectEach: F, pick: O, pushUnique: k, removeEvent: M, uniqueKey: P } = c;
        return function(t3) {
          let i2;
          let p2 = [/-/, /^(clipPath|cssText|d|height|width)$/, /^font$/, /[lL]ogical(Width|Height)$/, /^parentRule$/, /^(cssRules|ownerRules)$/, /perspective/, /TapHighlightColor/, /^transition/, /^length$/, /^[0-9]+$/], h2 = ["fill", "stroke", "strokeLinecap", "strokeLinejoin", "strokeWidth", "textAnchor", "x", "y"];
          t3.inlineAllowlist = [];
          let N = ["clipPath", "defs", "desc"];
          function j(e3) {
            let t4, n3;
            let i3 = this, o2 = i3.renderer, r2 = T(i3.options.navigation.buttonOptions, e3), s2 = r2.onclick, l2 = r2.menuItems, a2 = r2.symbolSize || 12;
            if (i3.btnCount || (i3.btnCount = 0), i3.exportDivElements || (i3.exportDivElements = [], i3.exportSVGElements = []), false === r2.enabled || !r2.theme)
              return;
            let c2 = r2.theme;
            i3.styledMode || (c2.fill = O(c2.fill, "#ffffff"), c2.stroke = O(c2.stroke, "none")), s2 ? n3 = function(e4) {
              e4 && e4.stopPropagation(), s2.call(i3, e4);
            } : l2 && (n3 = function(e4) {
              e4 && e4.stopPropagation(), i3.contextMenu(p3.menuClassName, l2, p3.translateX || 0, p3.translateY || 0, p3.width || 0, p3.height || 0, p3), p3.setState(2);
            }), r2.text && r2.symbol ? c2.paddingLeft = O(c2.paddingLeft, 30) : r2.text || w(c2, { width: r2.width, height: r2.height, padding: 0 }), i3.styledMode || (c2["stroke-linecap"] = "round", c2.fill = O(c2.fill, "#ffffff"), c2.stroke = O(c2.stroke, "none"));
            let p3 = o2.button(r2.text, 0, 0, n3, c2, void 0, void 0, void 0, void 0, r2.useHTML).addClass(e3.className).attr({ title: O(i3.options.lang[r2._titleKey || r2.titleKey], "") });
            p3.menuClassName = e3.menuClassName || "highcharts-menu-" + i3.btnCount++, r2.symbol && (t4 = o2.symbol(r2.symbol, r2.symbolX - a2 / 2, r2.symbolY - a2 / 2, a2, a2, { width: a2, height: a2 }).addClass("highcharts-button-symbol").attr({ zIndex: 1 }).add(p3), i3.styledMode || t4.attr({ stroke: r2.symbolStroke, fill: r2.symbolFill, "stroke-width": r2.symbolStrokeWidth || 1 })), p3.add(i3.exportingGroup).align(w(r2, { width: p3.width, x: O(r2.x, i3.buttonOffset) }), true, "spacingBox"), i3.buttonOffset += ((p3.width || 0) + r2.buttonSpacing) * ("right" === r2.align ? -1 : 1), i3.exportSVGElements.push(p3, t4);
          }
          function H() {
            if (!this.printReverseInfo)
              return;
            let { childNodes: e3, origDisplay: t4, resetParams: n3 } = this.printReverseInfo;
            this.moveContainers(this.renderTo), [].forEach.call(e3, function(e4, n4) {
              1 === e4.nodeType && (e4.style.display = t4[n4] || "");
            }), this.isPrinting = false, n3 && this.setSize.apply(this, n3), delete this.printReverseInfo, i2 = void 0, C(this, "afterPrint");
          }
          function D() {
            let e3 = g.body, t4 = this.options.exporting.printMaxWidth, n3 = { childNodes: e3.childNodes, origDisplay: [], resetParams: void 0 };
            this.isPrinting = true, this.pointer.reset(null, 0), C(this, "beforePrint");
            let i3 = t4 && this.chartWidth > t4;
            i3 && (n3.resetParams = [this.options.chart.width, void 0, false], this.setSize(t4, void 0, false)), [].forEach.call(n3.childNodes, function(e4, t5) {
              1 === e4.nodeType && (n3.origDisplay[t5] = e4.style.display, e4.style.display = "none");
            }), this.moveContainers(e3), this.printReverseInfo = n3;
          }
          function G(e3) {
            e3.renderExporting(), x(e3, "redraw", e3.renderExporting), x(e3, "destroy", e3.destroyExport);
          }
          function W(t4, n3, i3, o2, r2, s2, l2) {
            let a2 = this, p3 = a2.options.navigation, u2 = a2.chartWidth, h3 = a2.chartHeight, d2 = "cache-" + t4, f2 = Math.max(r2, s2), v2, E2 = a2[d2];
            E2 || (a2.exportContextMenu = a2[d2] = E2 = b("div", { className: t4 }, __spreadValues({ position: "absolute", zIndex: 1e3, padding: f2 + "px", pointerEvents: "auto" }, a2.renderer.style), a2.fixedDiv || a2.container), v2 = b("ul", { className: "highcharts-menu" }, a2.styledMode ? {} : { listStyle: "none", margin: 0, padding: 0 }, E2), a2.styledMode || y(v2, w({ MozBoxShadow: "3px 3px 10px #888", WebkitBoxShadow: "3px 3px 10px #888", boxShadow: "3px 3px 10px #888" }, p3.menuStyle)), E2.hideMenu = function() {
              y(E2, { display: "none" }), l2 && l2.setState(0), a2.openMenu = false, y(a2.renderTo, { overflow: "hidden" }), y(a2.container, { overflow: "hidden" }), c.clearTimeout(E2.hideTimer), C(a2, "exportMenuHidden");
            }, a2.exportEvents.push(x(E2, "mouseleave", function() {
              E2.hideTimer = m.setTimeout(E2.hideMenu, 500);
            }), x(E2, "mouseenter", function() {
              c.clearTimeout(E2.hideTimer);
            }), x(g, "mouseup", function(e3) {
              a2.pointer.inClass(e3.target, t4) || E2.hideMenu();
            }), x(E2, "click", function() {
              a2.openMenu && E2.hideMenu();
            })), n3.forEach(function(t5) {
              if ("string" == typeof t5 && (t5 = a2.options.exporting.menuItemDefinitions[t5]), S(t5, true)) {
                let n4;
                t5.separator ? n4 = b("hr", void 0, void 0, v2) : ("viewData" === t5.textKey && a2.isDataTableVisible && (t5.textKey = "hideData"), n4 = b("li", { className: "highcharts-menu-item", onclick: function(e3) {
                  e3 && e3.stopPropagation(), E2.hideMenu(), "string" != typeof t5 && t5.onclick && t5.onclick.apply(a2, arguments);
                } }, void 0, v2), e2.setElementHTML(n4, t5.text || a2.options.lang[t5.textKey]), a2.styledMode || (n4.onmouseover = function() {
                  y(this, p3.menuItemHoverStyle);
                }, n4.onmouseout = function() {
                  y(this, p3.menuItemStyle);
                }, y(n4, w({ cursor: "pointer" }, p3.menuItemStyle || {})))), a2.exportDivElements.push(n4);
              }
            }), a2.exportDivElements.push(v2, E2), a2.exportMenuWidth = E2.offsetWidth, a2.exportMenuHeight = E2.offsetHeight);
            let T2 = { display: "block" };
            i3 + a2.exportMenuWidth > u2 ? T2.right = u2 - i3 - r2 - f2 + "px" : T2.left = i3 - f2 + "px", o2 + s2 + a2.exportMenuHeight > h3 && "top" !== l2.alignOptions.verticalAlign ? T2.bottom = h3 - o2 - f2 + "px" : T2.top = o2 + s2 - f2 + "px", y(E2, T2), y(a2.renderTo, { overflow: "" }), y(a2.container, { overflow: "" }), a2.openMenu = true, C(a2, "exportMenuShown");
          }
          function I(e3) {
            let t4;
            let n3 = e3 ? e3.target : this, i3 = n3.exportSVGElements, o2 = n3.exportDivElements, r2 = n3.exportEvents;
            i3 && (i3.forEach((e4, o3) => {
              e4 && (e4.onclick = e4.ontouchstart = null, n3[t4 = "cache-" + e4.menuClassName] && delete n3[t4], i3[o3] = e4.destroy());
            }), i3.length = 0), n3.exportingGroup && (n3.exportingGroup.destroy(), delete n3.exportingGroup), o2 && (o2.forEach(function(e4, t5) {
              e4 && (c.clearTimeout(e4.hideTimer), M(e4, "mouseleave"), o2[t5] = e4.onmouseout = e4.onmouseover = e4.ontouchstart = e4.onclick = null, v(e4));
            }), o2.length = 0), r2 && (r2.forEach(function(e4) {
              e4();
            }), r2.length = 0);
          }
          function R(e3, t4) {
            let n3 = this.getSVGForExport(e3, t4);
            e3 = T(this.options.exporting, e3), a.post(e3.url, { filename: e3.filename ? e3.filename.replace(/\//g, "-") : this.getFilename(), type: e3.type, width: e3.width, scale: e3.scale, svg: n3 }, e3.fetchOptions);
          }
          function L() {
            return this.styledMode && this.inlineStyles(), this.container.innerHTML;
          }
          function $() {
            let e3 = this.userOptions.title && this.userOptions.title.text, t4 = this.options.exporting.filename;
            return t4 ? t4.replace(/\//g, "-") : ("string" == typeof e3 && (t4 = e3.toLowerCase().replace(/<\/?[^>]+(>|$)/g, "").replace(/[\s_]+/g, "-").replace(/[^a-z0-9\-]/g, "").replace(/^[\-]+/g, "").replace(/[\-]+/g, "-").substr(0, 24).replace(/[\-]+$/g, "")), (!t4 || t4.length < 5) && (t4 = "chart"), t4);
          }
          function q(e3) {
            let t4, n3, i3 = T(this.options, e3);
            i3.plotOptions = T(this.userOptions.plotOptions, e3 && e3.plotOptions), i3.time = T(this.userOptions.time, e3 && e3.time);
            let o2 = b("div", null, { position: "absolute", top: "-9999em", width: this.chartWidth + "px", height: this.chartHeight + "px" }, g.body), r2 = this.renderTo.style.width, s2 = this.renderTo.style.height, l2 = i3.exporting.sourceWidth || i3.chart.width || /px$/.test(r2) && parseInt(r2, 10) || (i3.isGantt ? 800 : 600), a2 = i3.exporting.sourceHeight || i3.chart.height || /px$/.test(s2) && parseInt(s2, 10) || 400;
            w(i3.chart, { animation: false, renderTo: o2, forExport: true, renderer: "SVGRenderer", width: l2, height: a2 }), i3.exporting.enabled = false, delete i3.data, i3.series = [], this.series.forEach(function(e4) {
              (n3 = T(e4.userOptions, { animation: false, enableMouseTracking: false, showCheckbox: false, visible: e4.visible })).isInternal || i3.series.push(n3);
            });
            let c2 = {};
            this.axes.forEach(function(e4) {
              e4.userOptions.internalKey || (e4.userOptions.internalKey = P()), e4.options.isInternal || (c2[e4.coll] || (c2[e4.coll] = true, i3[e4.coll] = []), i3[e4.coll].push(T(e4.userOptions, { visible: e4.visible })));
            }), i3.colorAxis = this.userOptions.colorAxis;
            let p3 = new this.constructor(i3, this.callback);
            return e3 && ["xAxis", "yAxis", "series"].forEach(function(t5) {
              let n4 = {};
              e3[t5] && (n4[t5] = e3[t5], p3.update(n4));
            }), this.axes.forEach(function(e4) {
              let t5 = E(p3.axes, function(t6) {
                return t6.options.internalKey === e4.userOptions.internalKey;
              }), n4 = e4.getExtremes(), i4 = n4.userMin, o3 = n4.userMax;
              t5 && (void 0 !== i4 && i4 !== t5.min || void 0 !== o3 && o3 !== t5.max) && t5.setExtremes(i4, o3, true, false);
            }), t4 = p3.getChartHTML(), C(this, "getSVG", { chartCopy: p3 }), t4 = this.sanitizeSVG(t4, i3), i3 = null, p3.destroy(), v(o2), t4;
          }
          function z(e3, t4) {
            let n3 = this.options.exporting;
            return this.getSVG(T({ chart: { borderRadius: 0 } }, n3.chartOptions, t4, { exporting: { sourceWidth: e3 && e3.sourceWidth || n3.sourceWidth, sourceHeight: e3 && e3.sourceHeight || n3.sourceHeight } }));
          }
          function V() {
            let e3;
            let n3 = t3.inlineAllowlist, i3 = {}, o2 = g.createElement("iframe");
            y(o2, { width: "1px", height: "1px", visibility: "hidden" }), g.body.appendChild(o2);
            let r2 = o2.contentWindow && o2.contentWindow.document;
            r2 && r2.body.appendChild(r2.createElementNS(f, "svg")), function t4(o3) {
              let s2, a2, c2, u2, d2, g2;
              let f2 = {};
              if (r2 && 1 === o3.nodeType && -1 === N.indexOf(o3.nodeName)) {
                if (s2 = m.getComputedStyle(o3, null), a2 = "svg" === o3.nodeName ? {} : m.getComputedStyle(o3.parentNode, null), !i3[o3.nodeName]) {
                  e3 = r2.getElementsByTagName("svg")[0], c2 = r2.createElementNS(o3.namespaceURI, o3.nodeName), e3.appendChild(c2);
                  let t5 = m.getComputedStyle(c2, null), n4 = {};
                  for (let e4 in t5)
                    "string" != typeof t5[e4] || /^[0-9]+$/.test(e4) || (n4[e4] = t5[e4]);
                  i3[o3.nodeName] = n4, "text" === o3.nodeName && delete i3.text.fill, e3.removeChild(c2);
                }
                for (let e4 in s2)
                  (l.isFirefox || l.isMS || l.isSafari || Object.hasOwnProperty.call(s2, e4)) && function(e5, t5) {
                    if (u2 = d2 = false, n3.length) {
                      for (g2 = n3.length; g2-- && !d2; )
                        d2 = n3[g2].test(t5);
                      u2 = !d2;
                    }
                    for ("transform" === t5 && "none" === e5 && (u2 = true), g2 = p2.length; g2-- && !u2; )
                      u2 = p2[g2].test(t5) || "function" == typeof e5;
                    !u2 && (a2[t5] !== e5 || "svg" === o3.nodeName) && i3[o3.nodeName][t5] !== e5 && (h2 && -1 === h2.indexOf(t5) ? f2[t5] = e5 : e5 && o3.setAttribute(t5.replace(/([A-Z])/g, function(e6, t6) {
                      return "-" + t6.toLowerCase();
                    }), e5));
                  }(s2[e4], e4);
                if (y(o3, f2), "svg" === o3.nodeName && o3.setAttribute("stroke-width", "1px"), "text" === o3.nodeName)
                  return;
                [].forEach.call(o3.children || o3.childNodes, t4);
              }
            }(this.container.querySelector("svg")), e3.parentNode.removeChild(e3), o2.parentNode.removeChild(o2);
          }
          function K(e3) {
            (this.fixedDiv ? [this.fixedDiv, this.scrollingContainer] : [this.container]).forEach(function(t4) {
              e3.appendChild(t4);
            });
          }
          function A() {
            let e3 = this, t4 = (t5, n3, i3) => {
              e3.isDirtyExporting = true, T(true, e3.options[t5], n3), O(i3, true) && e3.redraw();
            };
            e3.exporting = { update: function(e4, n3) {
              t4("exporting", e4, n3);
            } }, n2.compose(e3).navigation.addUpdate((e4, n3) => {
              t4("navigation", e4, n3);
            });
          }
          function B() {
            let e3 = this;
            e3.isPrinting || (i2 = e3, l.isSafari || e3.beforePrint(), setTimeout(() => {
              m.focus(), m.print(), l.isSafari || setTimeout(() => {
                e3.afterPrint();
              }, 1e3);
            }, 1));
          }
          function U() {
            let e3 = this, t4 = e3.options.exporting, n3 = t4.buttons, i3 = e3.isDirtyExporting || !e3.exportSVGElements;
            e3.buttonOffset = 0, e3.isDirtyExporting && e3.destroyExport(), i3 && false !== t4.enabled && (e3.exportEvents = [], e3.exportingGroup = e3.exportingGroup || e3.renderer.g("exporting-group").attr({ zIndex: 3 }).add(), F(n3, function(t5) {
              e3.addButton(t5);
            }), e3.isDirtyExporting = false);
          }
          function J(e3, t4) {
            let n3 = e3.indexOf("</svg>") + 6, i3 = e3.substr(n3);
            return e3 = e3.substr(0, n3), t4 && t4.exporting && t4.exporting.allowHTML && i3 && (i3 = '<foreignObject x="0" y="0" width="' + t4.chart.width + '" height="' + t4.chart.height + '"><body xmlns="http://www.w3.org/1999/xhtml">' + i3.replace(/(<(?:img|br).*?(?=\>))>/g, "$1 />") + "</body></foreignObject>", e3 = e3.replace("</svg>", i3 + "</svg>")), e3 = e3.replace(/zIndex="[^"]+"/g, "").replace(/symbolName="[^"]+"/g, "").replace(/jQuery[0-9]+="[^"]+"/g, "").replace(/url\(("|&quot;)(.*?)("|&quot;)\;?\)/g, "url($2)").replace(/url\([^#]+#/g, "url(#").replace(/<svg /, '<svg xmlns:xlink="http://www.w3.org/1999/xlink" ').replace(/ (|NS[0-9]+\:)href=/g, " xlink:href=").replace(/\n/, " ").replace(/(fill|stroke)="rgba\(([ 0-9]+,[ 0-9]+,[ 0-9]+),([ 0-9\.]+)\)"/g, '$1="rgb($2)" $1-opacity="$3"').replace(/&nbsp;/g, " ").replace(/&shy;/g, "­");
          }
          t3.compose = function e3(t4, n3) {
            if (r.compose(n3), s.compose(t4), k(d, e3)) {
              let e4 = t4.prototype;
              e4.afterPrint = H, e4.exportChart = R, e4.inlineStyles = V, e4.print = B, e4.sanitizeSVG = J, e4.getChartHTML = L, e4.getSVG = q, e4.getSVGForExport = z, e4.getFilename = $, e4.moveContainers = K, e4.beforePrint = D, e4.contextMenu = W, e4.addButton = j, e4.destroyExport = I, e4.renderExporting = U, e4.callbacks.push(G), x(t4, "init", A), l.isSafari && m.matchMedia("print").addListener(function(e5) {
                i2 && (e5.matches ? i2.beforePrint() : i2.afterPrint());
              }), u.exporting = T(o.exporting, u.exporting), u.lang = T(o.lang, u.lang), u.navigation = T(o.navigation, u.navigation);
            }
          };
        }(p || (p = {})), p;
      }), n(t, "masters/modules/exporting.src.js", [t["Core/Globals.js"], t["Extensions/Exporting/Exporting.js"], t["Core/HttpUtilities.js"]], function(e2, t2, n2) {
        e2.HttpUtilities = n2, e2.ajax = n2.ajax, e2.getJSON = n2.getJSON, e2.post = n2.post, t2.compose(e2.Chart, e2.Renderer);
      });
    });
  }
});
export default require_exporting();
//# sourceMappingURL=highcharts_modules_exporting.js.map
