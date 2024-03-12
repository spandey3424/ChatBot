import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  Output,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-KO2DGYL5.js";
import {
  filter,
  interval,
  map
} from "./chunk-AFRS2OIU.js";
import {
  init,
  install2 as install,
  use
} from "./chunk-XVRN6OX4.js";
import "./chunk-KSCYWWKG.js";

// node_modules/echarts-for-angular/fesm2020/echarts-for-angular.mjs
var HtmlHelper = class {
  static elementIsFocusable(ele) {
    return ele.getAttribute("tabindex") != null;
  }
  static getWidthSensor(element, periodicityInMiliSeconds = 2e3) {
    let oldWidth = element.clientWidth;
    return interval(periodicityInMiliSeconds).pipe(filter((ignore) => {
      if (Math.abs(oldWidth - element.clientWidth) > 2) {
        oldWidth = element.clientWidth;
        return true;
      }
      return false;
    }), map((ignore) => element.clientWidth));
  }
  static getHeightSensor(element, periodicityInMiliSeconds = 2e3) {
    let oldHeight = element.clientHeight;
    return interval(periodicityInMiliSeconds).pipe(filter((ignore) => {
      if (Math.abs(oldHeight - element.clientHeight) > 2) {
        oldHeight = element.clientHeight;
        return true;
      }
      return false;
    }), map((ignore) => element.clientWidth));
  }
};
var EchartsDirective = class {
  constructor(_el) {
    this._el = _el;
    this.extentions = [];
    this.isResizable = true;
    this.defaultWidth = 400;
    this.defaultHeight = 400;
    this.periodicityInMiliSeconds = 2e3;
    this.theme = "";
    this.chartInit = new EventEmitter();
  }
  ngOnInit() {
    use([...this.extentions, install]);
    this._echartsInstance = init(this._el.nativeElement, this.theme, {
      width: this._el.nativeElement.clientWidth === this.defaultWidth ? 400 : void 0,
      height: this._el.nativeElement.clientHeight === 0 ? this.defaultHeight : void 0
    });
    this.chartInit.emit(this._echartsInstance);
    this._setParams();
    if (this.isResizable) {
      this._addResizbleFunctionality();
    }
  }
  ngOnChanges(changes) {
    if (changes.options && !changes.options.firstChange) {
      this._setParams();
    }
    if (changes.isResizable && !changes.isResizable.firstChange) {
      if (this.isResizable) {
        this._addResizbleFunctionality();
      } else {
        if (this._subscription != null)
          this._subscription.unsubscribe();
      }
    }
  }
  _addResizbleFunctionality() {
    if (this._subscription != null)
      this._subscription.unsubscribe();
    this._subscription = HtmlHelper.getWidthSensor(this._el.nativeElement).subscribe(() => {
      if (this._echartsInstance != null) {
        this._echartsInstance.resize();
      }
    });
  }
  _setParams() {
    if (this._echartsInstance != null && this.options != null) {
      this._echartsInstance.setOption(this.options, true);
    }
  }
  ngOnDestroy() {
    if (this._subscription != null)
      this._subscription.unsubscribe();
  }
};
EchartsDirective.ɵfac = function EchartsDirective_Factory(t) {
  return new (t || EchartsDirective)(ɵɵdirectiveInject(ElementRef));
};
EchartsDirective.ɵdir = ɵɵdefineDirective({
  type: EchartsDirective,
  selectors: [["", "echarts", ""]],
  inputs: {
    options: "options",
    extentions: "extentions",
    isResizable: "isResizable",
    defaultWidth: "defaultWidth",
    defaultHeight: "defaultHeight",
    periodicityInMiliSeconds: "periodicityInMiliSeconds",
    theme: "theme"
  },
  outputs: {
    chartInit: "chartInit"
  },
  features: [ɵɵNgOnChangesFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EchartsDirective, [{
    type: Directive,
    args: [{
      selector: "[echarts]"
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    options: [{
      type: Input
    }],
    extentions: [{
      type: Input
    }],
    isResizable: [{
      type: Input
    }],
    defaultWidth: [{
      type: Input
    }],
    defaultHeight: [{
      type: Input
    }],
    periodicityInMiliSeconds: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    chartInit: [{
      type: Output
    }]
  });
})();
var EchartsxModule = class {
};
EchartsxModule.ɵfac = function EchartsxModule_Factory(t) {
  return new (t || EchartsxModule)();
};
EchartsxModule.ɵmod = ɵɵdefineNgModule({
  type: EchartsxModule,
  declarations: [EchartsDirective],
  exports: [EchartsDirective]
});
EchartsxModule.ɵinj = ɵɵdefineInjector({});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(EchartsxModule, [{
    type: NgModule,
    args: [{
      declarations: [EchartsDirective],
      exports: [EchartsDirective]
    }]
  }], null, null);
})();
export {
  EchartsDirective,
  EchartsxModule
};
//# sourceMappingURL=echarts-for-angular.js.map
