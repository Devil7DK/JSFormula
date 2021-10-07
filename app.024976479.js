(function() {
  var f = window.__fuse = window.__fuse || {};
  var modules = f.modules = f.modules || {}; f.dt = function (x) { return x && x.__esModule ? x : { "default": x }; };

  f.bundle = function(collection, fn) {
    for (var num in collection) {
      modules[num] = collection[num];
    }
    fn ? fn() : void 0;
  };
  f.c = {};
  f.r = function(id) {
    var cached = f.c[id];
    if (cached) return cached.m.exports;
    var module = modules[id];
    if (!module) {
      
      throw new Error('Module ' + id + ' was not found');
    }
    cached = f.c[id] = {};
    cached.exports = {};
    cached.m = { exports: cached.exports };
    module(f.r, cached.exports, cached.m);
    return cached.m.exports;
  }; 
})();
__fuse.bundle({
1: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(2);
var react_1d = __fuse.dt(react_1);
var react_dom_1 = __fusereq(3);
var react_dom_1d = __fuse.dt(react_dom_1);
var App_1 = __fusereq(4);
react_dom_1d.default.render(react_1d.default.createElement(App_1.App, null), document.getElementById('root'));

},
4: function(__fusereq, exports, module){
exports.__esModule = true;
var react_1 = __fusereq(2);
var react_1d = __fuse.dt(react_1);
exports.App = () => {
  return react_1d.default.createElement("div", null, "Hello World");
};

}
})
//# sourceMappingURL=app.024976479.js.map