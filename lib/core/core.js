  'use strict';

  /***
   * @package Core
   * @description Core method extension and restoration.
   ***/

  // The global to export.
  var Sugar = {};

  // An optimization for GCC.
  var object = Object;

  // The global context
  var globalContext = typeof global !== 'undefined' ? global : this;

  // No conflict mode
  var noConflict = false;

  // Internal hasOwnProperty
  var internalHasOwnProperty = object.prototype.hasOwnProperty;

  // defineProperty exists in IE8 but will error when trying to define a property on
  // native objects. IE8 does not have defineProperies, however, so this check saves a try/catch block.
  var definePropertySupport = object.defineProperty && object.defineProperties;

  // Natives by name.
  var natives = 'Boolean,Number,String,Array,Date,RegExp,Function'.split(',');

  // Proxy objects by class.
  var proxies = {};

  function initializeGlobal() {
    Sugar = {
      'noConflict': noConflict,
      'extend': extend,
      'revert': revert,
      'restore': restore,
      'iterate': iterateOverObject,
      'define': defineProperty,
      'global': globalContext,
      'natives': natives,
      'has': hasOwnProperty
    };
    globalContext['Sugar'] = Sugar;
  }

  function initializeNatives() {
    iterateOverObject(natives.concat('Object'), function(i, name) {
      proxies[globalContext[name]] = name;
      Sugar[name] = {};
    });
  }

  // Class extending methods

  function extend(klass, methods, instance, polyfill, override) {
    var extendee;
    instance = instance !== false;
    extendee = instance ? klass.prototype : klass;
    iterateOverObject(methods, function(name, prop) {
      var existing = checkGlobal('method', klass, name, extendee),
          original = checkGlobal('original', klass, name, extendee),
          existed  = name in extendee;
      if(typeof polyfill === 'function' && existing) {
        prop = wrapExisting(existing, prop, polyfill);
      }
      defineOnGlobal(klass, name, instance, original, prop, existed);
      if(canDefineOnNative(klass, polyfill, existing, override)) {
        defineProperty(extendee, name, prop);
      }
    });
  }

  function alias(klass, target, source) {
    var method = getProxy(klass)[source];
    var obj = {};
    obj[target] = method['method'];
    extend(klass, obj, method['instance']);
  }

  function restore(klass, methods) {
    return batchMethodExecute(klass, methods, function(target, name, m) {
      defineProperty(target, name, m.method);
    });
  }

  function revert(klass, methods) {
    return batchMethodExecute(klass, methods, function(target, name, m) {
      if(m['existed']) {
        defineProperty(target, name, m['original']);
      } else {
        delete target[name];
      }
    });
  }

  function batchMethodExecute(klass, methods, fn) {
    var all = !methods, changed = false;
    if(typeof methods === 'string') methods = [methods];
    iterateOverObject(getProxy(klass), function(name, m) {
      if(all || methods.indexOf(name) !== -1) {
        changed = true;
        fn(m['instance'] ? klass.prototype : klass, name, m);
      }
    });
    return changed;
  }

  function checkGlobal(type, klass, name, extendee) {
    var proxy = getProxy(klass), method;
    method = proxy && proxy[name];
    if(method) {
      return method[type];
    } else {
      return extendee[name];
    }
  }

  function canDefineOnNative(klass, polyfill, existing, override) {
    if(override) {
      return true;
    } else if(polyfill === true) {
      return !existing;
    }
    return !noConflict || !proxies[klass];
  }

  function wrapExisting(originalFn, extendedFn, condition) {
    return function(a) {
      return condition.apply(this, arguments) ?
             extendedFn.apply(this, arguments) :
             originalFn.apply(this, arguments);
    }
  }

  function wrapNoConflict(fn) {
    return function(native) {
      var args = arguments, newArgs = [], i;
      for(i = 1;i < args.length;i++) {
        newArgs.push(args[i]);
      }
      return fn.apply(native, newArgs);
    };
  }

  function defineOnGlobal(klass, name, instance, original, prop, existed) {
    var proxy = getProxy(klass), result;
    if(!proxy) return;
    result = instance ? wrapNoConflict(prop) : prop;
    defineProperty(proxy, name, result, true);
    if(typeof prop === 'function') {
      defineProperty(result, 'original', original);
      defineProperty(result, 'method', prop);
      defineProperty(result, 'existed', existed);
      defineProperty(result, 'instance', instance);
    }
  }

  function getProxy(klass) {
    return Sugar[proxies[klass]];
  }

  function defineProperty(target, name, property, enumerable) {
    if(definePropertySupport) {
      object.defineProperty(target, name, {
        'value': property,
        'enumerable': !!enumerable,
        'configurable': true,
        'writable': true
      });
    } else {
      target[name] = property;
    }
  }

  function iterateOverObject(obj, fn) {
    var key;
    for(key in obj) {
      if(!hasOwnProperty(obj, key)) continue;
      if(fn.call(obj, key, obj[key], obj) === false) break;
    }
  }

  function hasOwnProperty(obj, prop) {
    return !!obj && internalHasOwnProperty.call(obj, prop);
  }

  initializeGlobal();
  initializeNatives();
