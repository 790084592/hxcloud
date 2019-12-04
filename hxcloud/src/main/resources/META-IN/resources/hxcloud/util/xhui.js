/**
 * XHUI对象 1.基础函数 2.类扩展函数extendObj { isArray isNumber 、、、等 }
 */
+function(namespace, name) {
	"use strict";

	function isArray(target) {
		return Object.prototype.toString.call(target) === "[object Array]"
	}
	;

	function isBoolean(target) {
		return Object.prototype.toString.call(target) === "[object Boolean]"
	}
	;

	function isFunction(target) {
		return Object.prototype.toString.call(target) === "[object Function]"
	}
	;

	function isPlainObject(obj) {
		if (!obj || typeof (obj) !== "object" || obj.nodeType
				|| obj.window === obj) {
			return false;
		}
		try {
			if (obj.constructor
					&& !obj.hasOwnProperty("constructor")
					&& !obj.constructor.prototype
							.hasOwnProperty("isPrototypeOf")) {
				return false;
			}
		} catch (e) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}
		for ( var key in obj) {
			if (!obj.hasOwnProperty(key))
				return false;
		}
		return true;
	}

	function extendObj() {
		var target = arguments[0], i = 1, deep = false, len = arguments.length;
		if (isBoolean(target)) {
			deep = target;
			target = arguments[1] || {};
			i = 2;
		}
		if (i === len) {
			target = isArray(target) ? [] : {};
			i--;
		} else if (typeof target !== 'object' && !isFunction(target)) {
			target = {};
		}
		var options = null, name = null, src = null, copy = null, clone = null, copyIsArray = false;
		for (; i < len; i++) {
			if ((options = arguments[i]) == null)
				continue;
			for (name in options) {
				src = target[name];
				copy = options[name];
				if (src === copy)
					continue;
				if (deep
						&& copy
						&& (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
					if (copyIsArray) {
						copyIsArray = false;
						clone = isArray(src) ? src : [];
					} else {
						clone = isPlainObject(src) ? src : {};
					}
					target[name] = extendObj(deep, clone, copy);
				} else if (copy !== undefined) {
					target[name] = copy;
				}
			}
		}
		return target;
	}
	;

	/**
	 * 全局命名空间对象
	 */
	var XHUI = null;

	XHUI = namespace[name] = {};
	extendObj(XHUI, {
		/**
		 * 扩展对象, 对象克隆
		 * 
		 * @param {Boolean}
		 *            [deep] 是否递归克隆
		 * @param {Object}
		 *            target 待修改的对象
		 * @param {Object}
		 *            object1 待合并到target的对象
		 * @returns {Object} 被修改后的target
		 * @example //复制属性 var c = XHUI.extendObj({a: 1}, {d: 2, b: 2});
		 *          console.log(c.a);//1 console.log(c.b);//2
		 *          console.log(c.d);//2
		 * 
		 * //深递归合并 var b = {f: 3} c = XHUI.extendObj(true, {a: 1}, {d: 2, b:
		 * b}); console.log(c.a);//1 console.log(c.b === b); //false
		 * console.log(c.d);//2
		 */
		extendObj : extendObj,
		/**
		 * 获取上下文根路径，开头结尾带/
		 */
		getContextPath : function(wnd) {
			wnd = wnd || window;
			if (wnd) {
				var relpath = wnd["$contextPath"];
				if (relpath) return relpath;
			}
			debugger
			var local = (wnd || window).location,
				pathname = local.pathname;
			if (!pathname || pathname == "" || pathname == "null") {
				return "/";
			}
			var base = /\/([^\/]+)\//.exec(pathname);
			if(base && base[1]){
				base = "/" + base[1] + "/";
				return base;
			}
			return "";
		},
		/**
		 * 判断是否是一个空的JSON对象
		 * 
		 * @param {Object}
		 *            obj
		 * @returns {Boolean}
		 */
		isEmptyObject : function(obj) {
			if (!isPlainObject(obj))
				return false;
			for ( var key in obj) {
				return false;
			}
			return true;
		},
		/**
		 * 格式化JSON字符串
		 * 
		 * @param {String}
		 *            data 需要被格式化的数据
		 * @returns {Object}
		 */
		parseJson : function(data) {
			if (!data)
				return;
			try {
				if (XHUI.isString(data)) {
					return JSON.parse(data);
				}
				return (XHUI.isObject(data) || XHUI.isArray(data)) ? data
						: null;
			} catch (e) {
				try {
					return eval(data);
				} catch (e) {
				}
			}
		},
		/**
		 * 判断Boolean类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isBoolean : isBoolean,
		/**
		 * 判断Number类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isNumber : function(obj) {
			return Object.prototype.toString.call(obj) === "[object Number]";
		},
		/**
		 * 判断String类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isString : function(obj) {
			return Object.prototype.toString.call(obj) === "[object String]";
		},
		/**
		 * 判断Function类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isFunction : isFunction,
		/**
		 * 判断Array类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isArray : isArray,
		/**
		 * 判断Date类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isDate : function(obj) {
			return Object.prototype.toString.call(obj) === "[object Date]";
		},
		/**
		 * 判断RegExp类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isRegExp : function(obj) {
			return Object.prototype.toString.call(obj) === "[object RegExp]";
		},
		/**
		 * 判断Object类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isObject : function(obj) {
			return Object.prototype.toString.call(obj) === "[object Object]";
		},
		/**
		 * 判断对象是不是html元素
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isHtmlElement : function(obj) {
			var type = Object.prototype.toString.call(obj);
			// 每种类型的html元素就会在HTML Element中间带上标签名， 利用正则判断
			return /[object HTML[A-Za-z]*Element]/.test(type);
		},
		/**
		 * 判断undefined类型
		 * 
		 * @param {*}
		 *            obj 需要被判断类型的值
		 * @returns {Boolean}
		 */
		isUndefined : function(obj) {
			return ((obj == undefined) && (typeof (obj) == "undefined"));
		},
		/**
		 * 是否是app打开
		 */
		isApp : function() {
			return "undefined" != typeof JsInterface;
		},
		/**
		 * post请求后台 { url: "127.0.0.1:8080", (默认为当前访问地址) action: "/excel/import" ,
		 * datas: {}, async: false, (是否异步，默认为同步,false) callback: function(){},
		 * error: function(){} }
		 */
		post : function(querydata) {
			var url = (querydata.url || "") + querydata.action;
			var datas = querydata.datas;
			var async = querydata.async || false;
			var callback = querydata.callback;
			var error = querydata.error;
			var form = new FormData();
			for ( var dkey in datas) {
				form.append(dkey, datas[dkey]);
			}
			var xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
			xhr.open("post", url, async); // post方式，url为服务器请求地址，true
											// 该参数规定请求是否异步处理。
			if (isFunction(callback)) { // 请求完成
				xhr.onload = callback;
			}
			if (isFunction(error)) {
				xhr.onerror = error;
			}
			xhr.send(form); // 开始上传，发送form数据
		}
	});

}(window, "XHUI");
