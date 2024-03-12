import {
  __commonJS
} from "./chunk-KSCYWWKG.js";

// node_modules/highcharts/modules/offline-exporting.js
var require_offline_exporting = __commonJS({
  "node_modules/highcharts/modules/offline-exporting.js"(exports, module) {
    !function(t) {
      "object" == typeof module && module.exports ? (t.default = t, module.exports = t) : "function" == typeof define && define.amd ? define("highcharts/modules/offline-exporting", ["highcharts", "highcharts/modules/exporting"], function(e) {
        return t(e), t.Highcharts = e, t;
      }) : t("undefined" != typeof Highcharts ? Highcharts : void 0);
    }(function(t) {
      "use strict";
      var e = t ? t._modules : {};
      function o(t2, e2, o2, n) {
        t2.hasOwnProperty(e2) || (t2[e2] = n.apply(null, o2), "function" == typeof CustomEvent && window.dispatchEvent(new CustomEvent("HighchartsModuleLoaded", { detail: { path: e2, module: t2[e2] } })));
      }
      o(e, "Extensions/DownloadURL.js", [e["Core/Globals.js"]], function(t2) {
        let { isSafari: e2, win: o2, win: { document: n } } = t2, i = o2.URL || o2.webkitURL || o2;
        function r(t3) {
          let e3 = t3.replace(/filename=.*;/, "").match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/);
          if (e3 && e3.length > 3 && o2.atob && o2.ArrayBuffer && o2.Uint8Array && o2.Blob && i.createObjectURL) {
            let t4 = o2.atob(e3[3]), n2 = new o2.ArrayBuffer(t4.length), r2 = new o2.Uint8Array(n2);
            for (let e4 = 0; e4 < r2.length; ++e4)
              r2[e4] = t4.charCodeAt(e4);
            return i.createObjectURL(new o2.Blob([r2], { type: e3[1] }));
          }
        }
        return { dataURLtoBlob: r, downloadURL: function(t3, i2) {
          let l = o2.navigator, a = n.createElement("a");
          if ("string" != typeof t3 && !(t3 instanceof String) && l.msSaveOrOpenBlob) {
            l.msSaveOrOpenBlob(t3, i2);
            return;
          }
          t3 = "" + t3;
          let s = /Edge\/\d+/.test(l.userAgent), c = e2 && "string" == typeof t3 && 0 === t3.indexOf("data:application/pdf");
          if ((c || s || t3.length > 2e6) && !(t3 = r(t3) || ""))
            throw Error("Failed to convert to blob");
          if (void 0 !== a.download)
            a.href = t3, a.download = i2, n.body.appendChild(a), a.click(), n.body.removeChild(a);
          else
            try {
              if (!o2.open(t3, "chart"))
                throw Error("Failed to open window");
            } catch {
              o2.location.href = t3;
            }
        } };
      }), o(e, "Extensions/OfflineExporting/OfflineExportingDefaults.js", [], function() {
        return { libURL: "https://code.highcharts.com/11.3.0/lib/", menuItemDefinitions: { downloadPNG: { textKey: "downloadPNG", onclick: function() {
          this.exportChartLocal();
        } }, downloadJPEG: { textKey: "downloadJPEG", onclick: function() {
          this.exportChartLocal({ type: "image/jpeg" });
        } }, downloadSVG: { textKey: "downloadSVG", onclick: function() {
          this.exportChartLocal({ type: "image/svg+xml" });
        } }, downloadPDF: { textKey: "downloadPDF", onclick: function() {
          this.exportChartLocal({ type: "application/pdf" });
        } } } };
      }), o(e, "Extensions/OfflineExporting/OfflineExporting.js", [e["Core/Renderer/HTML/AST.js"], e["Core/Chart/Chart.js"], e["Core/Defaults.js"], e["Extensions/DownloadURL.js"], e["Extensions/Exporting/Exporting.js"], e["Core/Globals.js"], e["Core/HttpUtilities.js"], e["Extensions/OfflineExporting/OfflineExportingDefaults.js"], e["Core/Utilities.js"]], function(t2, e2, o2, n, i, r, l, a, s) {
        var c;
        let { defaultOptions: d } = o2, { downloadURL: f } = n, { composed: g, doc: h, win: p } = r, { ajax: u } = l, { addEvent: m, error: y, extend: x, fireEvent: b, merge: w, pushUnique: v } = s;
        return t2.allowedAttributes.push("data-z-index", "fill-opacity", "filter", "rx", "ry", "stroke-dasharray", "stroke-linejoin", "stroke-opacity", "text-anchor", "transform", "version", "viewBox", "visibility", "xmlns", "xmlns:xlink"), t2.allowedTags.push("desc", "clippath", "g"), function(e3) {
          function o3(t3, o4) {
            let n3 = this, l3 = w(n3.options.exporting, t3), a2 = function(t4) {
              false === l3.fallbackToExportServer ? l3.error ? l3.error(l3, t4) : y(28, true) : n3.exportChart(l3);
            };
            if (r.isMS && n3.styledMode && !i.inlineAllowlist.length && i.inlineAllowlist.push(/^blockSize/, /^border/, /^caretColor/, /^color/, /^columnRule/, /^columnRuleColor/, /^cssFloat/, /^cursor/, /^fill$/, /^fillOpacity/, /^font/, /^inlineSize/, /^length/, /^lineHeight/, /^opacity/, /^outline/, /^parentRule/, /^rx$/, /^ry$/, /^stroke/, /^textAlign/, /^textAnchor/, /^textDecoration/, /^transform/, /^vectorEffect/, /^visibility/, /^x$/, /^y$/), r.isMS && ("application/pdf" === l3.type || n3.container.getElementsByTagName("image").length && "image/svg+xml" !== l3.type) || "application/pdf" === l3.type && [].some.call(n3.container.getElementsByTagName("image"), function(t4) {
              let e4 = t4.getAttribute("href");
              return "" !== e4 && "string" == typeof e4 && 0 !== e4.indexOf("data:");
            })) {
              a2(Error("Image type not supported for this chart/browser."));
              return;
            }
            n3.getSVGForLocalExport(l3, o4 || {}, a2, function(t4) {
              t4.indexOf("<foreignObject") > -1 && "image/svg+xml" !== l3.type && (r.isMS || "application/pdf" === l3.type) ? a2(Error("Image type not supported for charts with embedded HTML")) : e3.downloadSVGLocal(t4, x({ filename: n3.getFilename() }, l3), a2, () => b(n3, "exportChartLocalSuccess"));
            });
          }
          function n2(t3, e4) {
            let o4 = h.getElementsByTagName("head")[0], n3 = h.createElement("script");
            n3.type = "text/javascript", n3.src = t3, n3.onload = e4, n3.onerror = function() {
              y("Error loading script " + t3);
            }, o4.appendChild(n3);
          }
          function l2(t3, o4, n3, i2) {
            let r2 = this, l3 = (t4) => r2.sanitizeSVG(t4, f2), a2 = () => {
              h2 && u2 === p2 && i2(l3(d2.innerHTML));
            }, s3 = (t4, e4, o5) => {
              ++u2, o5.imageElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", t4), a2();
            }, c3, d2, f2, g2 = null, h2, p2 = 0, u2 = 0;
            r2.unbindGetSVG = m(r2, "getSVG", (t4) => {
              f2 = t4.chartCopy.options, p2 = (h2 = (d2 = t4.chartCopy.container.cloneNode(true)) && d2.getElementsByTagName("image") || []).length;
            }), r2.getSVGForExport(t3, o4);
            try {
              if (!h2 || !h2.length) {
                i2(l3(d2.innerHTML));
                return;
              }
              for (let o5 = 0; o5 < h2.length; o5++)
                (g2 = (c3 = h2[o5]).getAttributeNS("http://www.w3.org/1999/xlink", "href")) ? e3.imageToDataUrl(g2, "image/png", { imageElement: c3 }, t3.scale, s3, n3, n3, n3) : (u2++, c3.parentNode.removeChild(c3), o5--, a2());
            } catch (t4) {
              n3(t4);
            }
            r2.unbindGetSVG();
          }
          function s2(t3, o4, n3, i2, r2, l3, a2, s3, c3) {
            let d2 = new p.Image(), f2, g2 = () => {
              setTimeout(function() {
                let e4;
                let l4 = h.createElement("canvas"), s4 = l4.getContext && l4.getContext("2d");
                try {
                  if (s4) {
                    l4.height = d2.height * i2, l4.width = d2.width * i2, s4.drawImage(d2, 0, 0, l4.width, l4.height);
                    try {
                      e4 = l4.toDataURL(o4), r2(e4, o4, n3, i2);
                    } catch (e5) {
                      f2(t3, o4, n3, i2);
                    }
                  } else
                    a2(t3, o4, n3, i2);
                } finally {
                  c3 && c3(t3, o4, n3, i2);
                }
              }, e3.loadEventDeferDelay);
            }, u2 = () => {
              s3(t3, o4, n3, i2), c3 && c3(t3, o4, n3, i2);
            };
            f2 = () => {
              d2 = new p.Image(), f2 = l3, d2.crossOrigin = "Anonymous", d2.onload = g2, d2.onerror = u2, d2.src = t3;
            }, d2.onload = g2, d2.onerror = u2, d2.src = t3;
          }
          function c2(t3) {
            let o4 = p.navigator.userAgent, n3 = o4.indexOf("WebKit") > -1 && 0 > o4.indexOf("Chrome");
            try {
              if (!n3 && -1 === t3.indexOf("<foreignObject"))
                return e3.domurl.createObjectURL(new p.Blob([t3], { type: "image/svg+xml;charset-utf-16" }));
            } catch (t4) {
            }
            return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(t3);
          }
          function E(t3, e4, o4, n3) {
            let i2 = (Number(t3.getAttribute("width")) + 2 * e4) * o4, r2 = (Number(t3.getAttribute("height")) + 2 * e4) * o4, l3 = new p.jspdf.jsPDF(r2 > i2 ? "p" : "l", "pt", [i2, r2]);
            [].forEach.call(t3.querySelectorAll('*[visibility="hidden"]'), function(t4) {
              t4.parentNode.removeChild(t4);
            });
            let a2 = t3.querySelectorAll("linearGradient");
            for (let t4 = 0; t4 < a2.length; t4++) {
              let e5 = a2[t4], o5 = e5.querySelectorAll("stop"), n4 = 0;
              for (; n4 < o5.length && "0" === o5[n4].getAttribute("offset") && "0" === o5[n4 + 1].getAttribute("offset"); )
                o5[n4].remove(), n4++;
            }
            [].forEach.call(t3.querySelectorAll("tspan"), (t4) => {
              "​" === t4.textContent && (t4.textContent = " ", t4.setAttribute("dx", -5));
            }), l3.svg(t3, { x: 0, y: 0, width: i2, height: r2, removeInvalid: true }).then(() => n3(l3.output("datauristring")));
          }
          e3.CanVGRenderer = {}, e3.domurl = p.URL || p.webkitURL || p, e3.loadEventDeferDelay = r.isMS ? 150 : 0, e3.compose = function t3(e4) {
            if (v(g, t3)) {
              let t4 = e4.prototype;
              t4.getSVGForLocalExport = l2, t4.exportChartLocal = o3, w(true, d.exporting, a);
            }
            return e4;
          }, e3.downloadSVGLocal = function(o4, i2, r2, l3) {
            let a2 = h.createElement("div"), g2 = i2.type || "image/png", m2 = (i2.filename || "chart") + "." + ("image/svg+xml" === g2 ? "svg" : g2.split("/")[1]), y2 = i2.scale || 1, x2, b2, w2, v2 = i2.libURL || d.exporting.libURL, C = true, L = i2.pdfFont;
            v2 = "/" !== v2.slice(-1) ? v2 + "/" : v2;
            let S = (t3, e4) => {
              var o5;
              let n3;
              let i3 = (t4, e5) => {
                p.jspdf.jsPDF.API.events.push(["initialized", function() {
                  this.addFileToVFS(t4, e5), this.addFont(t4, "HighchartsFont", t4), this.getFontList().HighchartsFont || this.setFont("HighchartsFont");
                }]);
              };
              L && (o5 = t3.textContent || "", !/[^\u0000-\u007F\u200B]+/.test(o5)) && (L = void 0);
              let r3 = ["normal", "italic", "bold", "bolditalic"], l4 = () => {
                let t4 = r3.shift();
                if (!t4)
                  return e4();
                let o6 = L && L[t4];
                o6 ? u({ url: o6, responseType: "blob", success: (e5, o7) => {
                  let r4 = new FileReader();
                  r4.onloadend = function() {
                    if ("string" == typeof this.result) {
                      let e6 = this.result.split(",")[1];
                      i3(t4, e6), "normal" === t4 && (n3 = e6);
                    }
                    l4();
                  }, r4.readAsDataURL(o7.response);
                }, error: l4 }) : (n3 && i3(t4, n3), l4());
              };
              l4();
            }, j = () => {
              let e4, n3;
              t2.setElementHTML(a2, o4);
              let i3 = a2.getElementsByTagName("text"), s3 = function(t3, e5) {
                let o5 = t3;
                for (; o5 && o5 !== a2; ) {
                  if (o5.style[e5]) {
                    let n4 = o5.style[e5];
                    "fontSize" === e5 && /em$/.test(n4) && (n4 = Math.round(16 * parseFloat(n4)) + "px"), t3.style[e5] = n4;
                    break;
                  }
                  o5 = o5.parentNode;
                }
              };
              [].forEach.call(i3, function(t3) {
                for (["fontFamily", "fontSize"].forEach((e5) => {
                  s3(t3, e5);
                }), t3.style.fontFamily = L && L.normal ? "HighchartsFont" : String(t3.style.fontFamily && t3.style.fontFamily.split(" ").splice(-1)), e4 = t3.getElementsByTagName("title"), [].forEach.call(e4, function(e5) {
                  t3.removeChild(e5);
                }), n3 = t3.getElementsByClassName("highcharts-text-outline"); n3.length > 0; )
                  t3.removeChild(n3[0]);
              });
              let c3 = a2.querySelector("svg");
              c3 && S(c3, () => {
                E(c3, 0, y2, (t3) => {
                  try {
                    f(t3, m2), l3 && l3();
                  } catch (t4) {
                    r2(t4);
                  }
                });
              });
            };
            if ("image/svg+xml" === g2)
              try {
                void 0 !== p.MSBlobBuilder ? ((b2 = new p.MSBlobBuilder()).append(o4), x2 = b2.getBlob("image/svg+xml")) : x2 = c2(o4), f(x2, m2), l3 && l3();
              } catch (t3) {
                r2(t3);
              }
            else
              "application/pdf" === g2 ? p.jspdf && p.jspdf.jsPDF ? j() : (C = true, n2(v2 + "jspdf.js", function() {
                n2(v2 + "svg2pdf.js", j);
              })) : (x2 = c2(o4), w2 = function() {
                try {
                  e3.domurl.revokeObjectURL(x2);
                } catch (t3) {
                }
              }, s2(x2, g2, {}, y2, function(t3) {
                try {
                  f(t3, m2), l3 && l3();
                } catch (t4) {
                  r2(t4);
                }
              }, function() {
                let t3 = h.createElement("canvas"), e4 = t3.getContext("2d"), i3 = o4.match(/^<svg[^>]*width\s*=\s*\"?(\d+)\"?[^>]*>/)[1] * y2, a3 = o4.match(/^<svg[^>]*height\s*=\s*\"?(\d+)\"?[^>]*>/)[1] * y2, s3 = function() {
                  let n3 = p.canvg.Canvg.fromString(e4, o4);
                  n3.start();
                  try {
                    f(p.navigator.msSaveOrOpenBlob ? t3.msToBlob() : t3.toDataURL(g2), m2), l3 && l3();
                  } catch (t4) {
                    r2(t4);
                  } finally {
                    w2();
                  }
                };
                t3.width = i3, t3.height = a3, p.canvg ? s3() : (C = true, n2(v2 + "canvg.js", function() {
                  s3();
                }));
              }, r2, r2, function() {
                C && w2();
              }));
          }, e3.getScript = n2, e3.imageToDataUrl = s2, e3.svgToDataUrl = c2, e3.svgToPdf = E;
        }(c || (c = {})), c;
      }), o(e, "masters/modules/offline-exporting.src.js", [e["Core/Globals.js"], e["Extensions/DownloadURL.js"], e["Extensions/OfflineExporting/OfflineExporting.js"]], function(t2, e2, o2) {
        t2.dataURLtoBlob = e2.dataURLtoBlob, t2.downloadSVGLocal = o2.downloadSVGLocal, t2.downloadURL = e2.downloadURL, o2.compose(t2.Chart);
      });
    });
  }
});
export default require_offline_exporting();
//# sourceMappingURL=highcharts_modules_offline-exporting.js.map
