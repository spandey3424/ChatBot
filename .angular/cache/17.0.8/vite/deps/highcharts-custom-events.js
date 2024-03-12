import {
  __commonJS
} from "./chunk-KSCYWWKG.js";

// node_modules/highcharts-custom-events/js/customEvents.js
var require_customEvents = __commonJS({
  "node_modules/highcharts-custom-events/js/customEvents.js"(exports, module) {
    (function(factory) {
      if (typeof module === "object" && module.exports) {
        factory["default"] = factory;
        module.exports = factory;
      } else if (typeof define === "function" && define.amd) {
        define("highcharts-custom-events", ["highcharts"], function(Highcharts2) {
          factory(Highcharts2);
          factory.Highcharts = Highcharts2;
          return factory;
        });
      } else {
        factory(Highcharts);
      }
    })(function(HC) {
      "use strict";
      var UNDEFINED, DBLCLICK = "dblclick", TOUCHSTART = "touchstart", CLICK = "click", pick = HC.pick, wrap = HC.wrap, merge = HC.merge, addEvent = HC.addEvent, isTouchDevice = HC.isTouchDevice, defaultOptions = HC.getOptions().plotOptions, axisProto = HC.Axis && HC.Axis.prototype, plotLineOrBandProto = HC.PlotLineOrBand && HC.PlotLineOrBand.prototype, seriesTypes = HC.seriesTypes, seriesProto = HC.Series && HC.Series.prototype, isObject, isNumber, isArray, objectEach, customEvents, proto, methods;
      isArray = HC.isArray || function(obj) {
        var str = Object.prototype.toString.call(obj);
        return str === "[object Array]" || str === "[object Array Iterator]";
      };
      objectEach = HC.objectEach || function(obj, fn, ctx) {
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            fn.call(ctx, obj[key], key, obj);
          }
        }
      };
      isNumber = HC.isNumber || function(n) {
        return typeof n === "number" && !isNaN(n);
      };
      isObject = HC.isObject || function(obj) {
        return obj && typeof obj === "object";
      };
      if (plotLineOrBandProto) {
        wrap(plotLineOrBandProto, "render", function(proceed) {
          var defaultEvents = this.options && this.options.events;
          if (defaultEvents) {
            defaultEvents = false;
          }
          return proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        });
      }
      if (seriesProto) {
        wrap(seriesProto, "init", function(proceed, chart, options) {
          var chartOptions = chart.options, plotOptions = chartOptions.plotOptions, seriesOptions = chartOptions.plotOptions.series, userOptions = merge(seriesOptions, plotOptions[this.type], options), userOptionsEvents = userOptions && userOptions.events, userOptionsPointEvents = userOptions && userOptions.point && userOptions.point.events;
          options.events = {};
          options.point = {
            events: {}
          };
          if (userOptionsEvents) {
            options.events = {
              legendItemClick: userOptionsEvents && userOptionsEvents.legendItemClick
            };
          }
          if (userOptionsPointEvents) {
            options.point.events = {
              legendItemClick: userOptionsPointEvents && userOptionsPointEvents.legendItemClick,
              select: userOptionsPointEvents && userOptionsPointEvents.select,
              unselect: userOptionsPointEvents && userOptionsPointEvents.unselect,
              click: userOptionsPointEvents && userOptionsPointEvents.click,
              mouseOut: userOptionsPointEvents && userOptionsPointEvents.mouseOut,
              mouseOver: userOptionsPointEvents && userOptionsPointEvents.mouseOver
            };
          }
          options.customEvents = {
            series: userOptionsEvents,
            point: userOptionsPointEvents
          };
          proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        });
      }
      HC.Chart.prototype.customEvent = {
        /**
         * @description Example: [HC.Series, ['drawPoints', 'drawDataLabels']]
         * @memberof customEvents
         * @returns {Array} array of pairs: prototype, array of methods to wrap
         **/
        getEventsProtoMethods: function() {
          var protoMethods = [
            [HC.Tick, ["addLabel"]],
            [HC.Axis, ["render"]],
            [HC.Axis, ["drawCrosshair"]],
            [HC.Chart, ["setTitle"]],
            [HC.Legend, ["renderItem"]],
            [HC.PlotLineOrBand, ["render"]],
            [HC.Series, ["drawPoints", "drawDataLabels"]]
          ];
          objectEach(seriesTypes, function(fn, seriesType) {
            protoMethods.push([
              seriesTypes[seriesType],
              ["drawPoints", "drawDataLabels"]
            ]);
          });
          return protoMethods;
        },
        /**
         * @description Init method, based on getEventsProtoMethods() array. Iterates on array of prototypes and methods to wrap
         * @memberof customEvents
         **/
        init: function() {
          var eventsProtoMethods = this.getEventsProtoMethods();
          eventsProtoMethods.forEach(function(protoMethod) {
            if (isArray(protoMethod)) {
              proto = protoMethod[0] && protoMethod[0].prototype;
              methods = protoMethod[1];
              if (proto) {
                methods.forEach(function(method) {
                  customEvents.attach(proto, method);
                });
              }
            }
          });
        },
        /**
         * @description Wraps methods i.e drawPoints to extract SVG element and set an event by calling customEvents.add()
         * @param {Object} proto Highcharts prototype i.e Highcharts.Series.prototype
         * @param {Object} hcMethod name of wrapped method i.e drawPoints
         * @memberof customEvents
         **/
        attach: function(proto2, hcMethod) {
          wrap(proto2, hcMethod, function(proceed, param) {
            var eventElement = {
              events: UNDEFINED,
              element: UNDEFINED
            }, proceedObject, len, j;
            proceedObject = proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            eventElement = customEvents.eventElement[hcMethod].call(this, param);
            if (!eventElement.events && !eventElement.eventsSubtitle && !eventElement.eventsPoint) {
              return proceedObject;
            }
            if (eventElement.eventsPoint) {
              len = eventElement.elementPoint.length;
              for (j = 0; j < len; j++) {
                if (eventElement.elementPoint[j]) {
                  var elemPoint = pick(eventElement.elementPoint[j].graphic, eventElement.elementPoint[j]);
                  if (elemPoint && elemPoint !== UNDEFINED) {
                    customEvents.add(elemPoint, eventElement.eventsPoint, eventElement.elementPoint[j], eventElement, true);
                  }
                }
              }
            }
            if (eventElement.eventsSubtitle) {
              customEvents.add(eventElement.elementSubtitle, eventElement.eventsSubtitle, eventElement, this);
            }
            if (eventElement.dataLabelsPoints) {
              var dataLabelsPoints = eventElement.dataLabelsPoints;
              len = dataLabelsPoints.length;
              for (j = 0; j < len; j++) {
                customEvents.add(
                  dataLabelsPoints[j].dataLabel,
                  eventElement.events,
                  {
                    dataLabel: dataLabelsPoints[j].dataLabel,
                    point: dataLabelsPoints[j]
                  },
                  this
                );
              }
            }
            if (eventElement.eventsStackLabel) {
              customEvents.add(eventElement.elementStackLabel, eventElement.eventsStackLabel, eventElement, this);
            }
            customEvents.add(eventElement.element, eventElement.events, eventElement, this);
            return proceedObject;
          });
        },
        /**
         * @description adds event on a SVG element
         * @param {Object} SVGelem graphic element
         * @param {Object} events object with all events
         * @param {Object} elemObj "this" object, which is available in the event
         * @param {Object} series chart series
         * @memberof customEvents
         **/
        add: function(SVGelem, events, elemObj, eventElement, isPoint) {
          var eventObject = eventElement.eventObject || elemObj.eventObject, isSeries = elemObj.isSeries || eventElement.isSeries;
          if (!SVGelem || !SVGelem.element) {
            return false;
          }
          for (var action in events) {
            (function(event) {
              if (events.hasOwnProperty(event) && !SVGelem[event]) {
                if (isTouchDevice && event === DBLCLICK) {
                  var tapped = false;
                  addEvent(SVGelem.element, TOUCHSTART, function(e) {
                    e.preventDefault();
                    if (isSeries) {
                      var chart = eventObject.chart, normalizedEvent = chart.pointer.normalize(e);
                      if (!eventObject.directTouch) {
                        elemObj = eventObject.searchPoint(normalizedEvent, eventObject.kdDimensions === 1);
                      }
                      e.point = elemObj;
                    }
                    if (eventObject && !isPoint || eventObject && isNumber(eventObject.value)) {
                      eventObject.value = elemObj.textStr;
                      elemObj = eventObject;
                    }
                    if (elemObj && elemObj.textStr) {
                      elemObj.value = elemObj.textStr;
                    }
                    if (elemObj && elemObj.drilldown) {
                      elemObj.doDrilldown(void 0, void 0, e);
                    }
                    if (!tapped) {
                      tapped = setTimeout(function() {
                        tapped = null;
                        if (events[CLICK] && elemObj && elemObj.drilldown === void 0) {
                          events[CLICK].call(elemObj, e);
                        }
                      }, 300);
                    } else {
                      clearTimeout(tapped);
                      tapped = null;
                      if (elemObj && elemObj.drilldown === void 0) {
                        events[event].call(elemObj, e);
                      }
                    }
                    return false;
                  });
                } else {
                  addEvent(SVGelem.element, event, function(e) {
                    e.stopPropagation();
                    if (isSeries) {
                      var chart = eventObject.chart, normalizedEvent = chart.pointer.normalize(e);
                      if (!eventObject.directTouch) {
                        elemObj = eventObject.searchPoint(normalizedEvent, eventObject.kdDimensions === 1);
                      }
                      e.point = elemObj;
                    }
                    if (eventObject && !isPoint || eventObject && isNumber(eventObject.value)) {
                      eventObject.value = elemObj.textStr || eventObject.value;
                      elemObj = eventObject;
                    }
                    if (elemObj && elemObj.textStr) {
                      elemObj.value = elemObj.textStr;
                    }
                    if (isPoint && event === "click" && elemObj.series && elemObj.series.options && elemObj.series.options.allowPointSelect) {
                      var defaultFunction = function(event2) {
                        if (elemObj.select) {
                          elemObj.select(null, e.ctrlKey || e.metaKey || e.shiftKey);
                        }
                      };
                      HC.fireEvent(elemObj, event, e, defaultFunction);
                    }
                    if (elemObj && elemObj.drilldown) {
                      elemObj.doDrilldown(void 0, void 0, e);
                    } else if (events && events[event]) {
                      events[event].call(elemObj, e);
                    }
                    return false;
                  });
                }
                SVGelem[event] = function() {
                  return true;
                };
              }
            })(action);
          }
        },
        eventElement: {
          /**
          * @typedef {Object} eventElement
          **/
          /**
           * @description Extracts SVG elements from points
           * @property {Object} eventsPoint events for point
           * @property {Array} elementPoint array of SVG point elements
           * @property {Object} eventObject object kept in this on i.e click
           * @return {Object} { events: object, element: object }
           * @memberof customEvents
           **/
          addLabel: function() {
            var parent = this.parent, axis = this.axis, axisOptions = axis.options, eventsPoint = axisOptions.labels && axisOptions.labels.events, elementPoint = [this.label], len, i;
            if (parent) {
              var step = this;
              while (step) {
                if (isArray(step)) {
                  len = step.length;
                  for (i = 0; i < len; i++) {
                    elementPoint.push(step[i].label);
                  }
                } else {
                  elementPoint.push(step.label);
                }
                step = step.parent;
              }
            }
            return {
              eventsPoint,
              elementPoint,
              eventObject: {
                axis,
                isFirst: this.isFirst,
                isLast: this.isLast,
                chart: axis.chart,
                dateTimeLabelFormat: axisOptions.dateTimeLabelFormats,
                value: this.pos,
                pos: this.pos
              }
            };
          },
          /**
           * @description Extracts SVG elements from title and subtitle
           * @property {Object} events events for title
           * @property {Array} elementPoint title SVG element
           * @property {Object} eventsSubtitle events for subtitle
           * @property {Array} elementSubtitle subtitle SVG element
           * @return {Object} {event: object, element: object, eventsSubtitle: object, elementSubtitle: object }
           * @memberof customEvents
           **/
          setTitle: function() {
            var events = this.options.title && this.options.title.events, element = this.title, eventsSubtitle = this.options.subtitle && this.options.subtitle.events, elementSubtitle = this.subtitle;
            return {
              events,
              element,
              eventsSubtitle,
              elementSubtitle
            };
          },
          /**
           * @description Extracts SVG elements from dataLabels
           * @property {Object} events events for dataLabels
           * @property {Array} element dataLabels SVG element
           * @return {Object} { events: object, element: object }
           * @memberof customEvents
           **/
          drawDataLabels: function() {
            var dataLabelsGroup = this.dataLabelsGroup, dataLabelEvents = dataLabelsGroup && this.options.dataLabels.events;
            return {
              events: dataLabelEvents,
              element: dataLabelsGroup,
              dataLabelsPoints: this.points
            };
          },
          /**
           * @description Extracts SVG elements from axis title and stackLabels
           * @property {Object} events events for axis title
           * @property {Array} element axis title SVG element
           * @property {Object} eventsPoint events for stacklabels
           * @property {Array} elementPoint stacklabels SVG element
           * @property {Object} eventsStackLabel events for stacklabels
           * @property {Array} elementStackLabel stacklabels group SVG element
           * @return {Object} { events: object, element: object, eventsPoint: object, elementPoint: object, eventsStackLabel: object, elementStackLabel: object }
           * @memberof customEvents
           **/
          render: function() {
            var stackLabels = this.options.stackLabels, events, element, eventsPoint, elementPoint, eventsStackLabel, elementStackLabel;
            if (this.axisTitle) {
              events = this.options.title.events;
              element = this.axisTitle;
            }
            if (stackLabels && stackLabels.enabled) {
              eventsPoint = stackLabels.events;
              elementPoint = this.stacks || this.stacking.stacks;
              eventsStackLabel = stackLabels.events;
              elementStackLabel = this.stackTotalGroup || this.stacking.stackTotalGroup;
            }
            return {
              events,
              element,
              eventsPoint,
              elementPoint,
              eventsStackLabel,
              elementStackLabel
            };
          },
          /**
           * @description Extracts SVG elements from series and series points
           * @property {Object} events events for series
           * @property {Array} element series SVG element
           * @property {Object} events events for series points
           * @property {Array} element series points SVG element
           * @return {Object} { events: object, element: object, eventsPoint: object, elementPoint: object }
           * @memberof customEvents
           **/
          drawPoints: function() {
            var op = this.options, type = this.type, events = op.customEvents ? op.customEvents.series : op.events, element = this.group, eventsPoint = op.customEvents ? op.customEvents.point : op.point.events, elementPoint;
            if (defaultOptions[type] && defaultOptions[type].marker && !this.bubblePadding) {
              elementPoint = [this.markerGroup];
            } else {
              elementPoint = this.points;
            }
            if (!this.kdTree && !this.buildingKdTree) {
              this.buildKDTree();
            }
            return {
              events,
              element,
              eventsPoint,
              elementPoint,
              eventObject: this,
              isSeries: true
            };
          },
          /**
           * @description Extracts SVG elements from legend item
           * @property {Object} events events for legend item
           * @property {Array} element legend item SVG element
           * @return {Object} { events: object, element: object }
           * @memberof customEvents
           **/
          renderItem: function(item) {
            return {
              events: this.options.itemEvents,
              element: item.legendGroup,
              eventObject: item
            };
          },
          /**
           * @description Extracts SVG elements from crosshair
           * @property {Object} events events for crosshair
           * @property {Array} element crosshair SVG element
           * @return {Object} { events: object, element: object }
           * @memberof customEvents
           **/
          drawCrosshair: function() {
            var cross = this.cross, crosshairOptions = this.options.crosshair;
            if (cross) {
              cross.css({
                "pointer-events": "auto"
              });
            }
            return {
              events: crosshairOptions && crosshairOptions.events,
              element: cross
            };
          }
        }
      };
      customEvents = HC.Chart.prototype.customEvent;
      customEvents.init();
    });
  }
});
export default require_customEvents();
//# sourceMappingURL=highcharts-custom-events.js.map
