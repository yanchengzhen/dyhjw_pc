/*
 Highcharts JS v6.1.0 (2018-04-13)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (T, K) {
    "object" === typeof module && module.exports ? module.exports = T.document ? K(T) : K : T.Highcharts = K(T)
})("undefined" !== typeof window ? window : this, function (T) {
    var K = function () {
        var a = "undefined" === typeof T ? window : T, C = a.document, F = a.navigator && a.navigator.userAgent || "",
            D = C && C.createElementNS && !!C.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
            r = /(edge|msie|trident)/i.test(F) && !a.opera, g = -1 !== F.indexOf("Firefox"),
            e = -1 !== F.indexOf("Chrome"), t = g && 4 > parseInt(F.split("Firefox/")[1],
            10);
        return a.Highcharts ? a.Highcharts.error(16, !0) : {
            product: "Highcharts",
            version: "6.1.0",
            deg2rad: 2 * Math.PI / 360,
            doc: C,
            hasBidiBug: t,
            hasTouch: C && void 0 !== C.documentElement.ontouchstart,
            isMS: r,
            isWebKit: -1 !== F.indexOf("AppleWebKit"),
            isFirefox: g,
            isChrome: e,
            isSafari: !e && -1 !== F.indexOf("Safari"),
            isTouchDevice: /(Mobile|Android|Windows Phone)/.test(F),
            SVG_NS: "http://www.w3.org/2000/svg",
            chartCount: 0,
            seriesTypes: {},
            symbolSizes: {},
            svg: D,
            win: a,
            marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"],
            noop: function () {
            },
            charts: []
        }
    }();
    (function (a) {
        a.timers = [];
        var C = a.charts, F = a.doc, D = a.win;
        a.error = function (r, g) {
            r = a.isNumber(r) ? "Highcharts error #" + r + ": www.highcharts.com/errors/" + r : r;
            if (g) throw Error(r);
            D.console && console.log(r)
        };
        a.Fx = function (a, g, e) {
            this.options = g;
            this.elem = a;
            this.prop = e
        };
        a.Fx.prototype = {
            dSetter: function () {
                var a = this.paths[0], g = this.paths[1], e = [], t = this.now, w = a.length, l;
                if (1 === t) e = this.toD; else if (w === g.length && 1 > t) for (; w--;) l = parseFloat(a[w]), e[w] = isNaN(l) ? g[w] : t * parseFloat(g[w] - l) + l; else e = g;
                this.elem.attr("d",
                    e, null, !0)
            }, update: function () {
                var a = this.elem, g = this.prop, e = this.now, t = this.options.step;
                if (this[g + "Setter"]) this[g + "Setter"](); else a.attr ? a.element && a.attr(g, e, null, !0) : a.style[g] = e + this.unit;
                t && t.call(a, e, this)
            }, run: function (r, g, e) {
                var t = this, w = t.options, l = function (a) {
                    return l.stopped ? !1 : t.step(a)
                }, u = D.requestAnimationFrame || function (a) {
                    setTimeout(a, 13)
                }, c = function () {
                    for (var d = 0; d < a.timers.length; d++) a.timers[d]() || a.timers.splice(d--, 1);
                    a.timers.length && u(c)
                };
                r !== g || this.elem["forceAnimate:" +
                this.prop] ? (this.startTime = +new Date, this.start = r, this.end = g, this.unit = e, this.now = this.start, this.pos = 0, l.elem = this.elem, l.prop = this.prop, l() && 1 === a.timers.push(l) && u(c)) : (delete w.curAnim[this.prop], w.complete && 0 === a.keys(w.curAnim).length && w.complete.call(this.elem))
            }, step: function (r) {
                var g = +new Date, e, t = this.options, w = this.elem, l = t.complete, u = t.duration, c = t.curAnim;
                w.attr && !w.element ? r = !1 : r || g >= u + this.startTime ? (this.now = this.end, this.pos = 1, this.update(), e = c[this.prop] = !0, a.objectEach(c, function (a) {
                    !0 !==
                    a && (e = !1)
                }), e && l && l.call(w), r = !1) : (this.pos = t.easing((g - this.startTime) / u), this.now = this.start + (this.end - this.start) * this.pos, this.update(), r = !0);
                return r
            }, initPath: function (r, g, e) {
                function t(a) {
                    var f, c;
                    for (b = a.length; b--;) f = "M" === a[b] || "L" === a[b], c = /[a-zA-Z]/.test(a[b + 3]), f && c && a.splice(b + 1, 0, a[b + 1], a[b + 2], a[b + 1], a[b + 2])
                }

                function w(a, f) {
                    for (; a.length < p;) {
                        a[0] = f[p - a.length];
                        var c = a.slice(0, x);
                        [].splice.apply(a, [0, 0].concat(c));
                        n && (c = a.slice(a.length - x), [].splice.apply(a, [a.length, 0].concat(c)), b--)
                    }
                    a[0] =
                        "M"
                }

                function l(a, b) {
                    for (var c = (p - a.length) / x; 0 < c && c--;) f = a.slice().splice(a.length / z - x, x * z), f[0] = b[p - x - c * x], k && (f[x - 6] = f[x - 2], f[x - 5] = f[x - 1]), [].splice.apply(a, [a.length / z, 0].concat(f)), n && c--
                }

                g = g || "";
                var u, c = r.startX, d = r.endX, k = -1 < g.indexOf("C"), x = k ? 7 : 3, p, f, b;
                g = g.split(" ");
                e = e.slice();
                var n = r.isArea, z = n ? 2 : 1, J;
                k && (t(g), t(e));
                if (c && d) {
                    for (b = 0; b < c.length; b++) if (c[b] === d[0]) {
                        u = b;
                        break
                    } else if (c[0] === d[d.length - c.length + b]) {
                        u = b;
                        J = !0;
                        break
                    }
                    void 0 === u && (g = [])
                }
                g.length && a.isNumber(u) && (p = e.length + u * z * x,
                    J ? (w(g, e), l(e, g)) : (w(e, g), l(g, e)));
                return [g, e]
            }
        };
        a.Fx.prototype.fillSetter = a.Fx.prototype.strokeSetter = function () {
            this.elem.attr(this.prop, a.color(this.start).tweenTo(a.color(this.end), this.pos), null, !0)
        };
        a.merge = function () {
            var r, g = arguments, e, t = {}, w = function (e, u) {
                "object" !== typeof e && (e = {});
                a.objectEach(u, function (c, d) {
                    !a.isObject(c, !0) || a.isClass(c) || a.isDOMElement(c) ? e[d] = u[d] : e[d] = w(e[d] || {}, c)
                });
                return e
            };
            !0 === g[0] && (t = g[1], g = Array.prototype.slice.call(g, 2));
            e = g.length;
            for (r = 0; r < e; r++) t = w(t,
                g[r]);
            return t
        };
        a.pInt = function (a, g) {
            return parseInt(a, g || 10)
        };
        a.isString = function (a) {
            return "string" === typeof a
        };
        a.isArray = function (a) {
            a = Object.prototype.toString.call(a);
            return "[object Array]" === a || "[object Array Iterator]" === a
        };
        a.isObject = function (r, g) {
            return !!r && "object" === typeof r && (!g || !a.isArray(r))
        };
        a.isDOMElement = function (r) {
            return a.isObject(r) && "number" === typeof r.nodeType
        };
        a.isClass = function (r) {
            var g = r && r.constructor;
            return !(!a.isObject(r, !0) || a.isDOMElement(r) || !g || !g.name || "Object" ===
                g.name)
        };
        a.isNumber = function (a) {
            return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a
        };
        a.erase = function (a, g) {
            for (var e = a.length; e--;) if (a[e] === g) {
                a.splice(e, 1);
                break
            }
        };
        a.defined = function (a) {
            return void 0 !== a && null !== a
        };
        a.attr = function (r, g, e) {
            var t;
            a.isString(g) ? a.defined(e) ? r.setAttribute(g, e) : r && r.getAttribute && ((t = r.getAttribute(g)) || "class" !== g || (t = r.getAttribute(g + "Name"))) : a.defined(g) && a.isObject(g) && a.objectEach(g, function (a, e) {
                r.setAttribute(e, a)
            });
            return t
        };
        a.splat = function (r) {
            return a.isArray(r) ?
                r : [r]
        };
        a.syncTimeout = function (a, g, e) {
            if (g) return setTimeout(a, g, e);
            a.call(0, e)
        };
        a.clearTimeout = function (r) {
            a.defined(r) && clearTimeout(r)
        };
        a.extend = function (a, g) {
            var e;
            a || (a = {});
            for (e in g) a[e] = g[e];
            return a
        };
        a.pick = function () {
            var a = arguments, g, e, t = a.length;
            for (g = 0; g < t; g++) if (e = a[g], void 0 !== e && null !== e) return e
        };
        a.css = function (r, g) {
            a.isMS && !a.svg && g && void 0 !== g.opacity && (g.filter = "alpha(opacity\x3d" + 100 * g.opacity + ")");
            a.extend(r.style, g)
        };
        a.createElement = function (r, g, e, t, w) {
            r = F.createElement(r);
            var l =
                a.css;
            g && a.extend(r, g);
            w && l(r, {padding: 0, border: "none", margin: 0});
            e && l(r, e);
            t && t.appendChild(r);
            return r
        };
        a.extendClass = function (r, g) {
            var e = function () {
            };
            e.prototype = new r;
            a.extend(e.prototype, g);
            return e
        };
        a.pad = function (a, g, e) {
            return Array((g || 2) + 1 - String(a).replace("-", "").length).join(e || 0) + a
        };
        a.relativeLength = function (a, g, e) {
            return /%$/.test(a) ? g * parseFloat(a) / 100 + (e || 0) : parseFloat(a)
        };
        a.wrap = function (a, g, e) {
            var t = a[g];
            a[g] = function () {
                var a = Array.prototype.slice.call(arguments), l = arguments, u = this;
                u.proceed = function () {
                    t.apply(u, arguments.length ? arguments : l)
                };
                a.unshift(t);
                a = e.apply(this, a);
                u.proceed = null;
                return a
            }
        };
        a.formatSingle = function (r, g, e) {
            var t = /\.([0-9])/, w = a.defaultOptions.lang;
            /f$/.test(r) ? (e = (e = r.match(t)) ? e[1] : -1, null !== g && (g = a.numberFormat(g, e, w.decimalPoint, -1 < r.indexOf(",") ? w.thousandsSep : ""))) : g = (e || a.time).dateFormat(r, g);
            return g
        };
        a.format = function (r, g, e) {
            for (var t = "{", w = !1, l, u, c, d, k = [], x; r;) {
                t = r.indexOf(t);
                if (-1 === t) break;
                l = r.slice(0, t);
                if (w) {
                    l = l.split(":");
                    u = l.shift().split(".");
                    d = u.length;
                    x = g;
                    for (c = 0; c < d; c++) x && (x = x[u[c]]);
                    l.length && (x = a.formatSingle(l.join(":"), x, e));
                    k.push(x)
                } else k.push(l);
                r = r.slice(t + 1);
                t = (w = !w) ? "}" : "{"
            }
            k.push(r);
            return k.join("")
        };
        a.getMagnitude = function (a) {
            return Math.pow(10, Math.floor(Math.log(a) / Math.LN10))
        };
        a.normalizeTickInterval = function (r, g, e, t, w) {
            var l, u = r;
            e = a.pick(e, 1);
            l = r / e;
            g || (g = w ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === t && (1 === e ? g = a.grep(g, function (a) {
                return 0 === a % 1
            }) : .1 >= e && (g = [1 / e])));
            for (t = 0; t < g.length && !(u = g[t], w && u * e >= r ||
            !w && l <= (g[t] + (g[t + 1] || g[t])) / 2); t++) ;
            return u = a.correctFloat(u * e, -Math.round(Math.log(.001) / Math.LN10))
        };
        a.stableSort = function (a, g) {
            var e = a.length, t, w;
            for (w = 0; w < e; w++) a[w].safeI = w;
            a.sort(function (a, e) {
                t = g(a, e);
                return 0 === t ? a.safeI - e.safeI : t
            });
            for (w = 0; w < e; w++) delete a[w].safeI
        };
        a.arrayMin = function (a) {
            for (var g = a.length, e = a[0]; g--;) a[g] < e && (e = a[g]);
            return e
        };
        a.arrayMax = function (a) {
            for (var g = a.length, e = a[0]; g--;) a[g] > e && (e = a[g]);
            return e
        };
        a.destroyObjectProperties = function (r, g) {
            a.objectEach(r, function (a,
                                      t) {
                a && a !== g && a.destroy && a.destroy();
                delete r[t]
            })
        };
        a.discardElement = function (r) {
            var g = a.garbageBin;
            g || (g = a.createElement("div"));
            r && g.appendChild(r);
            g.innerHTML = ""
        };
        a.correctFloat = function (a, g) {
            return parseFloat(a.toPrecision(g || 14))
        };
        a.setAnimation = function (r, g) {
            g.renderer.globalAnimation = a.pick(r, g.options.chart.animation, !0)
        };
        a.animObject = function (r) {
            return a.isObject(r) ? a.merge(r) : {duration: r ? 500 : 0}
        };
        a.timeUnits = {
            millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5,
            year: 314496E5
        };
        a.numberFormat = function (r, g, e, t) {
            r = +r || 0;
            g = +g;
            var w = a.defaultOptions.lang, l = (r.toString().split(".")[1] || "").split("e")[0].length, u, c,
                d = r.toString().split("e");
            -1 === g ? g = Math.min(l, 20) : a.isNumber(g) ? g && d[1] && 0 > d[1] && (u = g + +d[1], 0 <= u ? (d[0] = (+d[0]).toExponential(u).split("e")[0], g = u) : (d[0] = d[0].split(".")[0] || 0, r = 20 > g ? (d[0] * Math.pow(10, d[1])).toFixed(g) : 0, d[1] = 0)) : g = 2;
            c = (Math.abs(d[1] ? d[0] : r) + Math.pow(10, -Math.max(g, l) - 1)).toFixed(g);
            l = String(a.pInt(c));
            u = 3 < l.length ? l.length % 3 : 0;
            e = a.pick(e,
                w.decimalPoint);
            t = a.pick(t, w.thousandsSep);
            r = (0 > r ? "-" : "") + (u ? l.substr(0, u) + t : "");
            r += l.substr(u).replace(/(\d{3})(?=\d)/g, "$1" + t);
            g && (r += e + c.slice(-g));
            d[1] && 0 !== +r && (r += "e" + d[1]);
            return r
        };
        Math.easeInOutSine = function (a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        };
        a.getStyle = function (r, g, e) {
            if ("width" === g) return Math.min(r.offsetWidth, r.scrollWidth) - a.getStyle(r, "padding-left") - a.getStyle(r, "padding-right");
            if ("height" === g) return Math.min(r.offsetHeight, r.scrollHeight) - a.getStyle(r, "padding-top") - a.getStyle(r,
                "padding-bottom");
            D.getComputedStyle || a.error(27, !0);
            if (r = D.getComputedStyle(r, void 0)) r = r.getPropertyValue(g), a.pick(e, "opacity" !== g) && (r = a.pInt(r));
            return r
        };
        a.inArray = function (r, g, e) {
            return (a.indexOfPolyfill || Array.prototype.indexOf).call(g, r, e)
        };
        a.grep = function (r, g) {
            return (a.filterPolyfill || Array.prototype.filter).call(r, g)
        };
        a.find = Array.prototype.find ? function (a, g) {
            return a.find(g)
        } : function (a, g) {
            var e, t = a.length;
            for (e = 0; e < t; e++) if (g(a[e], e)) return a[e]
        };
        a.some = function (r, g, e) {
            return (a.somePolyfill ||
                Array.prototype.some).call(r, g, e)
        };
        a.map = function (a, g) {
            for (var e = [], t = 0, w = a.length; t < w; t++) e[t] = g.call(a[t], a[t], t, a);
            return e
        };
        a.keys = function (r) {
            return (a.keysPolyfill || Object.keys).call(void 0, r)
        };
        a.reduce = function (r, g, e) {
            return (a.reducePolyfill || Array.prototype.reduce).call(r, g, e)
        };
        a.offset = function (a) {
            var g = F.documentElement;
            a = a.parentElement ? a.getBoundingClientRect() : {top: 0, left: 0};
            return {
                top: a.top + (D.pageYOffset || g.scrollTop) - (g.clientTop || 0),
                left: a.left + (D.pageXOffset || g.scrollLeft) - (g.clientLeft ||
                    0)
            }
        };
        a.stop = function (r, g) {
            for (var e = a.timers.length; e--;) a.timers[e].elem !== r || g && g !== a.timers[e].prop || (a.timers[e].stopped = !0)
        };
        a.each = function (r, g, e) {
            return (a.forEachPolyfill || Array.prototype.forEach).call(r, g, e)
        };
        a.objectEach = function (a, g, e) {
            for (var t in a) a.hasOwnProperty(t) && g.call(e || a[t], a[t], t, a)
        };
        a.addEvent = function (r, g, e) {
            var t, w = r.addEventListener || a.addEventListenerPolyfill;
            t = "function" === typeof r && r.prototype ? r.prototype.protoEvents = r.prototype.protoEvents || {} : r.hcEvents = r.hcEvents ||
                {};
            w && w.call(r, g, e, !1);
            t[g] || (t[g] = []);
            t[g].push(e);
            return function () {
                a.removeEvent(r, g, e)
            }
        };
        a.removeEvent = function (r, g, e) {
            function t(c, d) {
                var k = r.removeEventListener || a.removeEventListenerPolyfill;
                k && k.call(r, c, d, !1)
            }

            function w(c) {
                var d, k;
                r.nodeName && (g ? (d = {}, d[g] = !0) : d = c, a.objectEach(d, function (a, d) {
                    if (c[d]) for (k = c[d].length; k--;) t(d, c[d][k])
                }))
            }

            var l, u;
            a.each(["protoEvents", "hcEvents"], function (c) {
                var d = r[c];
                d && (g ? (l = d[g] || [], e ? (u = a.inArray(e, l), -1 < u && (l.splice(u, 1), d[g] = l), t(g, e)) : (w(d), d[g] =
                    [])) : (w(d), r[c] = {}))
            })
        };
        a.fireEvent = function (r, g, e, t) {
            var w, l, u, c, d;
            e = e || {};
            F.createEvent && (r.dispatchEvent || r.fireEvent) ? (w = F.createEvent("Events"), w.initEvent(g, !0, !0), a.extend(w, e), r.dispatchEvent ? r.dispatchEvent(w) : r.fireEvent(g, w)) : a.each(["protoEvents", "hcEvents"], function (k) {
                if (r[k]) for (l = r[k][g] || [], u = l.length, e.target || a.extend(e, {
                    preventDefault: function () {
                        e.defaultPrevented = !0
                    }, target: r, type: g
                }), c = 0; c < u; c++) (d = l[c]) && !1 === d.call(r, e) && e.preventDefault()
            });
            t && !e.defaultPrevented && t.call(r,
                e)
        };
        a.animate = function (r, g, e) {
            var t, w = "", l, u, c;
            a.isObject(e) || (c = arguments, e = {duration: c[2], easing: c[3], complete: c[4]});
            a.isNumber(e.duration) || (e.duration = 400);
            e.easing = "function" === typeof e.easing ? e.easing : Math[e.easing] || Math.easeInOutSine;
            e.curAnim = a.merge(g);
            a.objectEach(g, function (c, k) {
                a.stop(r, k);
                u = new a.Fx(r, e, k);
                l = null;
                "d" === k ? (u.paths = u.initPath(r, r.d, g.d), u.toD = g.d, t = 0, l = 1) : r.attr ? t = r.attr(k) : (t = parseFloat(a.getStyle(r, k)) || 0, "opacity" !== k && (w = "px"));
                l || (l = c);
                l && l.match && l.match("px") &&
                (l = l.replace(/px/g, ""));
                u.run(t, l, w)
            })
        };
        a.seriesType = function (r, g, e, t, w) {
            var l = a.getOptions(), u = a.seriesTypes;
            l.plotOptions[r] = a.merge(l.plotOptions[g], e);
            u[r] = a.extendClass(u[g] || function () {
            }, t);
            u[r].prototype.type = r;
            w && (u[r].prototype.pointClass = a.extendClass(a.Point, w));
            return u[r]
        };
        a.uniqueKey = function () {
            var a = Math.random().toString(36).substring(2, 9), g = 0;
            return function () {
                return "highcharts-" + a + "-" + g++
            }
        }();
        D.jQuery && (D.jQuery.fn.highcharts = function () {
            var r = [].slice.call(arguments);
            if (this[0]) return r[0] ?
                (new (a[a.isString(r[0]) ? r.shift() : "Chart"])(this[0], r[0], r[1]), this) : C[a.attr(this[0], "data-highcharts-chart")]
        })
    })(K);
    (function (a) {
        var C = a.each, F = a.isNumber, D = a.map, r = a.merge, g = a.pInt;
        a.Color = function (e) {
            if (!(this instanceof a.Color)) return new a.Color(e);
            this.init(e)
        };
        a.Color.prototype = {
            parsers: [{
                regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
                parse: function (a) {
                    return [g(a[1]), g(a[2]), g(a[3]), parseFloat(a[4], 10)]
                }
            }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
                parse: function (a) {
                    return [g(a[1]), g(a[2]), g(a[3]), 1]
                }
            }], names: {none: "rgba(255,255,255,0)", white: "#ffffff", black: "#000000"}, init: function (e) {
                var g, w, l, u;
                if ((this.input = e = this.names[e && e.toLowerCase ? e.toLowerCase() : ""] || e) && e.stops) this.stops = D(e.stops, function (c) {
                    return new a.Color(c[1])
                }); else if (e && e.charAt && "#" === e.charAt() && (g = e.length, e = parseInt(e.substr(1), 16), 7 === g ? w = [(e & 16711680) >> 16, (e & 65280) >> 8, e & 255, 1] : 4 === g && (w = [(e & 3840) >> 4 | (e & 3840) >> 8, (e & 240) >> 4 | e & 240, (e & 15) << 4 | e & 15, 1])), !w) for (l = this.parsers.length; l-- &&
                !w;) u = this.parsers[l], (g = u.regex.exec(e)) && (w = u.parse(g));
                this.rgba = w || []
            }, get: function (a) {
                var e = this.input, g = this.rgba, l;
                this.stops ? (l = r(e), l.stops = [].concat(l.stops), C(this.stops, function (e, c) {
                    l.stops[c] = [l.stops[c][0], e.get(a)]
                })) : l = g && F(g[0]) ? "rgb" === a || !a && 1 === g[3] ? "rgb(" + g[0] + "," + g[1] + "," + g[2] + ")" : "a" === a ? g[3] : "rgba(" + g.join(",") + ")" : e;
                return l
            }, brighten: function (a) {
                var e, w = this.rgba;
                if (this.stops) C(this.stops, function (e) {
                    e.brighten(a)
                }); else if (F(a) && 0 !== a) for (e = 0; 3 > e; e++) w[e] += g(255 * a), 0 >
                w[e] && (w[e] = 0), 255 < w[e] && (w[e] = 255);
                return this
            }, setOpacity: function (a) {
                this.rgba[3] = a;
                return this
            }, tweenTo: function (a, g) {
                var e = this.rgba, l = a.rgba;
                l.length && e && e.length ? (a = 1 !== l[3] || 1 !== e[3], g = (a ? "rgba(" : "rgb(") + Math.round(l[0] + (e[0] - l[0]) * (1 - g)) + "," + Math.round(l[1] + (e[1] - l[1]) * (1 - g)) + "," + Math.round(l[2] + (e[2] - l[2]) * (1 - g)) + (a ? "," + (l[3] + (e[3] - l[3]) * (1 - g)) : "") + ")") : g = a.input || "none";
                return g
            }
        };
        a.color = function (e) {
            return new a.Color(e)
        }
    })(K);
    (function (a) {
        var C, F, D = a.addEvent, r = a.animate, g = a.attr, e = a.charts,
            t = a.color, w = a.css, l = a.createElement, u = a.defined, c = a.deg2rad, d = a.destroyObjectProperties,
            k = a.doc, x = a.each, p = a.extend, f = a.erase, b = a.grep, n = a.hasTouch, z = a.inArray, J = a.isArray,
            q = a.isFirefox, L = a.isMS, B = a.isObject, H = a.isString, m = a.isWebKit, E = a.merge, A = a.noop,
            M = a.objectEach, G = a.pick, h = a.pInt, v = a.removeEvent, Q = a.stop, P = a.svg, I = a.SVG_NS,
            O = a.symbolSizes, N = a.win;
        C = a.SVGElement = function () {
            return this
        };
        p(C.prototype, {
            opacity: 1,
            SVG_NS: I,
            textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline".split(" "),
            init: function (a, h) {
                this.element = "span" === h ? l(h) : k.createElementNS(this.SVG_NS, h);
                this.renderer = a
            },
            animate: function (y, h, b) {
                h = a.animObject(G(h, this.renderer.globalAnimation, !0));
                0 !== h.duration ? (b && (h.complete = b), r(this, y, h)) : (this.attr(y, null, b), h.step && h.step.call(this));
                return this
            },
            complexColor: function (y, h, b) {
                var f = this.renderer, v, c, d, m, I, p, A, n, k, R, q, z = [], P;
                a.fireEvent(this.renderer, "complexColor", {args: arguments}, function () {
                    y.radialGradient ? c = "radialGradient" : y.linearGradient && (c = "linearGradient");
                    c && (d = y[c], I = f.gradients, A = y.stops, R = b.radialReference, J(d) && (y[c] = d = {
                        x1: d[0],
                        y1: d[1],
                        x2: d[2],
                        y2: d[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === c && R && !u(d.gradientUnits) && (m = d, d = E(d, f.getRadialAttr(R, m), {gradientUnits: "userSpaceOnUse"})), M(d, function (a, y) {
                        "id" !== y && z.push(y, a)
                    }), M(A, function (a) {
                        z.push(a)
                    }), z = z.join(","), I[z] ? q = I[z].attr("id") : (d.id = q = a.uniqueKey(), I[z] = p = f.createElement(c).attr(d).add(f.defs), p.radAttr = m, p.stops = [], x(A, function (y) {
                        0 === y[1].indexOf("rgba") ? (v = a.color(y[1]),
                            n = v.get("rgb"), k = v.get("a")) : (n = y[1], k = 1);
                        y = f.createElement("stop").attr({offset: y[0], "stop-color": n, "stop-opacity": k}).add(p);
                        p.stops.push(y)
                    })), P = "url(" + f.url + "#" + q + ")", b.setAttribute(h, P), b.gradient = z, y.toString = function () {
                        return P
                    })
                })
            },
            applyTextOutline: function (y) {
                var h = this.element, b, v, c, d, m;
                -1 !== y.indexOf("contrast") && (y = y.replace(/contrast/g, this.renderer.getContrast(h.style.fill)));
                y = y.split(" ");
                v = y[y.length - 1];
                if ((c = y[0]) && "none" !== c && a.svg) {
                    this.fakeTS = !0;
                    y = [].slice.call(h.getElementsByTagName("tspan"));
                    this.ySetter = this.xSetter;
                    c = c.replace(/(^[\d\.]+)(.*?)$/g, function (a, y, h) {
                        return 2 * y + h
                    });
                    for (m = y.length; m--;) b = y[m], "highcharts-text-outline" === b.getAttribute("class") && f(y, h.removeChild(b));
                    d = h.firstChild;
                    x(y, function (a, y) {
                        0 === y && (a.setAttribute("x", h.getAttribute("x")), y = h.getAttribute("y"), a.setAttribute("y", y || 0), null === y && h.setAttribute("y", 0));
                        a = a.cloneNode(1);
                        g(a, {
                            "class": "highcharts-text-outline",
                            fill: v,
                            stroke: v,
                            "stroke-width": c,
                            "stroke-linejoin": "round"
                        });
                        h.insertBefore(a, d)
                    })
                }
            },
            attr: function (a,
                            h, b, c) {
                var y, f = this.element, v, d = this, m, I;
                "string" === typeof a && void 0 !== h && (y = a, a = {}, a[y] = h);
                "string" === typeof a ? d = (this[a + "Getter"] || this._defaultGetter).call(this, a, f) : (M(a, function (y, h) {
                    m = !1;
                    c || Q(this, h);
                    this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)$/.test(h) && (v || (this.symbolAttr(a), v = !0), m = !0);
                    !this.rotation || "x" !== h && "y" !== h || (this.doTransform = !0);
                    m || (I = this[h + "Setter"] || this._defaultSetter, I.call(this, y, h, f), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(h) &&
                    this.updateShadows(h, y, I))
                }, this), this.afterSetters());
                b && b.call(this);
                return d
            },
            afterSetters: function () {
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            },
            updateShadows: function (a, h, b) {
                for (var y = this.shadows, c = y.length; c--;) b.call(y[c], "height" === a ? Math.max(h - (y[c].cutHeight || 0), 0) : "d" === a ? this.d : h, a, y[c])
            },
            addClass: function (a, h) {
                var y = this.attr("class") || "";
                -1 === y.indexOf(a) && (h || (a = (y + (y ? " " : "") + a).replace("  ", " ")), this.attr("class", a));
                return this
            },
            hasClass: function (a) {
                return -1 !==
                    z(a, (this.attr("class") || "").split(" "))
            },
            removeClass: function (a) {
                return this.attr("class", (this.attr("class") || "").replace(a, ""))
            },
            symbolAttr: function (a) {
                var y = this;
                x("x y r start end width height innerR anchorX anchorY".split(" "), function (h) {
                    y[h] = G(a[h], y[h])
                });
                y.attr({d: y.renderer.symbols[y.symbolName](y.x, y.y, y.width, y.height, y)})
            },
            clip: function (a) {
                return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none")
            },
            crisp: function (a, h) {
                var y;
                h = h || a.strokeWidth || 0;
                y = Math.round(h) % 2 / 2;
                a.x = Math.floor(a.x || this.x || 0) + y;
                a.y = Math.floor(a.y || this.y || 0) + y;
                a.width = Math.floor((a.width || this.width || 0) - 2 * y);
                a.height = Math.floor((a.height || this.height || 0) - 2 * y);
                u(a.strokeWidth) && (a.strokeWidth = h);
                return a
            },
            css: function (a) {
                var y = this.styles, b = {}, c = this.element, f, v = "", d, m = !y,
                    I = ["textOutline", "textOverflow", "width"];
                a && a.color && (a.fill = a.color);
                y && M(a, function (a, h) {
                    a !== y[h] && (b[h] = a, m = !0)
                });
                m && (y && (a = p(y, b)), f = this.textWidth = a && a.width && "auto" !== a.width && "text" === c.nodeName.toLowerCase() && h(a.width),
                    this.styles = a, f && !P && this.renderer.forExport && delete a.width, c.namespaceURI === this.SVG_NS ? (d = function (a, y) {
                    return "-" + y.toLowerCase()
                }, M(a, function (a, y) {
                    -1 === z(y, I) && (v += y.replace(/([A-Z])/g, d) + ":" + a + ";")
                }), v && g(c, "style", v)) : w(c, a), this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline)));
                return this
            },
            strokeWidth: function () {
                return this["stroke-width"] || 0
            },
            on: function (a, h) {
                var y = this, b = y.element;
                n && "click" === a ? (b.ontouchstart =
                    function (a) {
                        y.touchEventFired = Date.now();
                        a.preventDefault();
                        h.call(b, a)
                    }, b.onclick = function (a) {
                    (-1 === N.navigator.userAgent.indexOf("Android") || 1100 < Date.now() - (y.touchEventFired || 0)) && h.call(b, a)
                }) : b["on" + a] = h;
                return this
            },
            setRadialReference: function (a) {
                var y = this.renderer.gradients[this.element.gradient];
                this.element.radialReference = a;
                y && y.radAttr && y.animate(this.renderer.getRadialAttr(a, y.radAttr));
                return this
            },
            translate: function (a, h) {
                return this.attr({translateX: a, translateY: h})
            },
            invert: function (a) {
                this.inverted =
                    a;
                this.updateTransform();
                return this
            },
            updateTransform: function () {
                var a = this.translateX || 0, h = this.translateY || 0, b = this.scaleX, c = this.scaleY,
                    v = this.inverted, f = this.rotation, d = this.matrix, m = this.element;
                v && (a += this.width, h += this.height);
                a = ["translate(" + a + "," + h + ")"];
                u(d) && a.push("matrix(" + d.join(",") + ")");
                v ? a.push("rotate(90) scale(-1,1)") : f && a.push("rotate(" + f + " " + G(this.rotationOriginX, m.getAttribute("x"), 0) + " " + G(this.rotationOriginY, m.getAttribute("y") || 0) + ")");
                (u(b) || u(c)) && a.push("scale(" + G(b, 1) +
                    " " + G(c, 1) + ")");
                a.length && m.setAttribute("transform", a.join(" "))
            },
            toFront: function () {
                var a = this.element;
                a.parentNode.appendChild(a);
                return this
            },
            align: function (a, h, b) {
                var y, c, v, d, m = {};
                c = this.renderer;
                v = c.alignedObjects;
                var I, p;
                if (a) {
                    if (this.alignOptions = a, this.alignByTranslate = h, !b || H(b)) this.alignTo = y = b || "renderer", f(v, this), v.push(this), b = null
                } else a = this.alignOptions, h = this.alignByTranslate, y = this.alignTo;
                b = G(b, c[y], c);
                y = a.align;
                c = a.verticalAlign;
                v = (b.x || 0) + (a.x || 0);
                d = (b.y || 0) + (a.y || 0);
                "right" ===
                y ? I = 1 : "center" === y && (I = 2);
                I && (v += (b.width - (a.width || 0)) / I);
                m[h ? "translateX" : "x"] = Math.round(v);
                "bottom" === c ? p = 1 : "middle" === c && (p = 2);
                p && (d += (b.height - (a.height || 0)) / p);
                m[h ? "translateY" : "y"] = Math.round(d);
                this[this.placed ? "animate" : "attr"](m);
                this.placed = !0;
                this.alignAttr = m;
                return this
            },
            getBBox: function (a, h) {
                var y, b = this.renderer, v, f = this.element, d = this.styles, m, I = this.textStr, A, n = b.cache,
                    k = b.cacheKeys, q;
                h = G(h, this.rotation);
                v = h * c;
                m = d && d.fontSize;
                u(I) && (q = I.toString(), -1 === q.indexOf("\x3c") && (q = q.replace(/[0-9]/g,
                    "0")), q += ["", h || 0, m, this.textWidth, d && d.textOverflow].join());
                q && !a && (y = n[q]);
                if (!y) {
                    if (f.namespaceURI === this.SVG_NS || b.forExport) {
                        try {
                            (A = this.fakeTS && function (a) {
                                x(f.querySelectorAll(".highcharts-text-outline"), function (y) {
                                    y.style.display = a
                                })
                            }) && A("none"), y = f.getBBox ? p({}, f.getBBox()) : {
                                width: f.offsetWidth,
                                height: f.offsetHeight
                            }, A && A("")
                        } catch (W) {
                        }
                        if (!y || 0 > y.width) y = {width: 0, height: 0}
                    } else y = this.htmlGetBBox();
                    b.isSVG && (a = y.width, b = y.height, d && "11px" === d.fontSize && 17 === Math.round(b) && (y.height = b =
                        14), h && (y.width = Math.abs(b * Math.sin(v)) + Math.abs(a * Math.cos(v)), y.height = Math.abs(b * Math.cos(v)) + Math.abs(a * Math.sin(v))));
                    if (q && 0 < y.height) {
                        for (; 250 < k.length;) delete n[k.shift()];
                        n[q] || k.push(q);
                        n[q] = y
                    }
                }
                return y
            },
            show: function (a) {
                return this.attr({visibility: a ? "inherit" : "visible"})
            },
            hide: function () {
                return this.attr({visibility: "hidden"})
            },
            fadeOut: function (a) {
                var y = this;
                y.animate({opacity: 0}, {
                    duration: a || 150, complete: function () {
                        y.attr({y: -9999})
                    }
                })
            },
            add: function (a) {
                var y = this.renderer, h = this.element,
                    b;
                a && (this.parentGroup = a);
                this.parentInverted = a && a.inverted;
                void 0 !== this.textStr && y.buildText(this);
                this.added = !0;
                if (!a || a.handleZ || this.zIndex) b = this.zIndexSetter();
                b || (a ? a.element : y.box).appendChild(h);
                if (this.onAdd) this.onAdd();
                return this
            },
            safeRemoveChild: function (a) {
                var y = a.parentNode;
                y && y.removeChild(a)
            },
            destroy: function () {
                var a = this, h = a.element || {}, b = a.renderer.isSVG && "SPAN" === h.nodeName && a.parentGroup,
                    c = h.ownerSVGElement, v = a.clipPath;
                h.onclick = h.onmouseout = h.onmouseover = h.onmousemove = h.point =
                    null;
                Q(a);
                v && c && (x(c.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) {
                    var h = a.getAttribute("clip-path"), y = v.element.id;
                    (-1 < h.indexOf("(#" + y + ")") || -1 < h.indexOf('("#' + y + '")')) && a.removeAttribute("clip-path")
                }), a.clipPath = v.destroy());
                if (a.stops) {
                    for (c = 0; c < a.stops.length; c++) a.stops[c] = a.stops[c].destroy();
                    a.stops = null
                }
                a.safeRemoveChild(h);
                for (a.destroyShadows(); b && b.div && 0 === b.div.childNodes.length;) h = b.parentGroup, a.safeRemoveChild(b.div), delete b.div, b = h;
                a.alignTo && f(a.renderer.alignedObjects,
                    a);
                M(a, function (h, y) {
                    delete a[y]
                });
                return null
            },
            shadow: function (a, h, b) {
                var y = [], c, v, f = this.element, d, m, I, p;
                if (!a) this.destroyShadows(); else if (!this.shadows) {
                    m = G(a.width, 3);
                    I = (a.opacity || .15) / m;
                    p = this.parentInverted ? "(-1,-1)" : "(" + G(a.offsetX, 1) + ", " + G(a.offsetY, 1) + ")";
                    for (c = 1; c <= m; c++) v = f.cloneNode(0), d = 2 * m + 1 - 2 * c, g(v, {
                        isShadow: "true",
                        stroke: a.color || "#000000",
                        "stroke-opacity": I * c,
                        "stroke-width": d,
                        transform: "translate" + p,
                        fill: "none"
                    }), b && (g(v, "height", Math.max(g(v, "height") - d, 0)), v.cutHeight = d), h ?
                        h.element.appendChild(v) : f.parentNode && f.parentNode.insertBefore(v, f), y.push(v);
                    this.shadows = y
                }
                return this
            },
            destroyShadows: function () {
                x(this.shadows || [], function (a) {
                    this.safeRemoveChild(a)
                }, this);
                this.shadows = void 0
            },
            xGetter: function (a) {
                "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy"));
                return this._defaultGetter(a)
            },
            _defaultGetter: function (a) {
                a = G(this[a + "Value"], this[a], this.element ? this.element.getAttribute(a) : null, 0);
                /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a));
                return a
            },
            dSetter: function (a,
                               h, b) {
                a && a.join && (a = a.join(" "));
                /(NaN| {2}|^$)/.test(a) && (a = "M 0 0");
                this[h] !== a && (b.setAttribute(h, a), this[h] = a)
            },
            dashstyleSetter: function (a) {
                var b, y = this["stroke-width"];
                "inherit" === y && (y = 1);
                if (a = a && a.toLowerCase()) {
                    a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(",");
                    for (b = a.length; b--;) a[b] = h(a[b]) * y;
                    a = a.join(",").replace(/NaN/g,
                        "none");
                    this.element.setAttribute("stroke-dasharray", a)
                }
            },
            alignSetter: function (a) {
                this.alignValue = a;
                this.element.setAttribute("text-anchor", {left: "start", center: "middle", right: "end"}[a])
            },
            opacitySetter: function (a, h, b) {
                this[h] = a;
                b.setAttribute(h, a)
            },
            titleSetter: function (a) {
                var h = this.element.getElementsByTagName("title")[0];
                h || (h = k.createElementNS(this.SVG_NS, "title"), this.element.appendChild(h));
                h.firstChild && h.removeChild(h.firstChild);
                h.appendChild(k.createTextNode(String(G(a), "").replace(/<[^>]*>/g,
                    "").replace(/&lt;/g, "\x3c").replace(/&gt;/g, "\x3e")))
            },
            textSetter: function (a) {
                a !== this.textStr && (delete this.bBox, this.textStr = a, this.added && this.renderer.buildText(this))
            },
            fillSetter: function (a, h, b) {
                "string" === typeof a ? b.setAttribute(h, a) : a && this.complexColor(a, h, b)
            },
            visibilitySetter: function (a, h, b) {
                "inherit" === a ? b.removeAttribute(h) : this[h] !== a && b.setAttribute(h, a);
                this[h] = a
            },
            zIndexSetter: function (a, b) {
                var c = this.renderer, v = this.parentGroup, y = (v || c).element || c.box, f, d = this.element, m, I,
                    c = y === c.box;
                f = this.added;
                var p;
                u(a) && (d.zIndex = a, a = +a, this[b] === a && (f = !1), this[b] = a);
                if (f) {
                    (a = this.zIndex) && v && (v.handleZ = !0);
                    b = y.childNodes;
                    for (p = b.length - 1; 0 <= p && !m; p--) if (v = b[p], f = v.zIndex, I = !u(f), v !== d) if (0 > a && I && !c && !p) y.insertBefore(d, b[p]), m = !0; else if (h(f) <= a || I && (!u(a) || 0 <= a)) y.insertBefore(d, b[p + 1] || null), m = !0;
                    m || (y.insertBefore(d, b[c ? 3 : 0] || null), m = !0)
                }
                return m
            },
            _defaultSetter: function (a, h, b) {
                b.setAttribute(h, a)
            }
        });
        C.prototype.yGetter = C.prototype.xGetter;
        C.prototype.translateXSetter = C.prototype.translateYSetter =
            C.prototype.rotationSetter = C.prototype.verticalAlignSetter = C.prototype.rotationOriginXSetter = C.prototype.rotationOriginYSetter = C.prototype.scaleXSetter = C.prototype.scaleYSetter = C.prototype.matrixSetter = function (a, h) {
                this[h] = a;
                this.doTransform = !0
            };
        C.prototype["stroke-widthSetter"] = C.prototype.strokeSetter = function (a, h, b) {
            this[h] = a;
            this.stroke && this["stroke-width"] ? (C.prototype.fillSetter.call(this, this.stroke, "stroke", b), b.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" ===
                h && 0 === a && this.hasStroke && (b.removeAttribute("stroke"), this.hasStroke = !1)
        };
        F = a.SVGRenderer = function () {
            this.init.apply(this, arguments)
        };
        p(F.prototype, {
            Element: C,
            SVG_NS: I,
            init: function (a, h, b, c, v, f) {
                var y;
                c = this.createElement("svg").attr({version: "1.1", "class": "highcharts-root"}).css(this.getStyle(c));
                y = c.element;
                a.appendChild(y);
                g(a, "dir", "ltr");
                -1 === a.innerHTML.indexOf("xmlns") && g(y, "xmlns", this.SVG_NS);
                this.isSVG = !0;
                this.box = y;
                this.boxWrapper = c;
                this.alignedObjects = [];
                this.url = (q || m) && k.getElementsByTagName("base").length ?
                    N.location.href.replace(/#.*?$/, "").replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "";
                this.createElement("desc").add().element.appendChild(k.createTextNode("Created with Highcharts 6.1.0"));
                this.defs = this.createElement("defs").add();
                this.allowHTML = f;
                this.forExport = v;
                this.gradients = {};
                this.cache = {};
                this.cacheKeys = [];
                this.imgCount = 0;
                this.setSize(h, b, !1);
                var d;
                q && a.getBoundingClientRect && (h = function () {
                    w(a, {left: 0, top: 0});
                    d = a.getBoundingClientRect();
                    w(a, {
                        left: Math.ceil(d.left) -
                        d.left + "px", top: Math.ceil(d.top) - d.top + "px"
                    })
                }, h(), this.unSubPixelFix = D(N, "resize", h))
            },
            getStyle: function (a) {
                return this.style = p({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, a)
            },
            setStyle: function (a) {
                this.boxWrapper.css(this.getStyle(a))
            },
            isHidden: function () {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function () {
                var a = this.defs;
                this.box = null;
                this.boxWrapper = this.boxWrapper.destroy();
                d(this.gradients || {});
                this.gradients = null;
                a && (this.defs = a.destroy());
                this.unSubPixelFix && this.unSubPixelFix();
                return this.alignedObjects = null
            },
            createElement: function (a) {
                var h = new this.Element;
                h.init(this, a);
                return h
            },
            draw: A,
            getRadialAttr: function (a, h) {
                return {cx: a[0] - a[2] / 2 + h.cx * a[2], cy: a[1] - a[2] / 2 + h.cy * a[2], r: h.r * a[2]}
            },
            getSpanWidth: function (a) {
                return a.getBBox(!0).width
            },
            applyEllipsis: function (a, h, b, c) {
                var v = a.rotation, f = b, d, y = 0, m = b.length, I = function (a) {
                    h.removeChild(h.firstChild);
                    a && h.appendChild(k.createTextNode(a))
                }, p;
                a.rotation = 0;
                f = this.getSpanWidth(a, h);
                if (p =
                    f > c) {
                    for (; y <= m;) d = Math.ceil((y + m) / 2), f = b.substring(0, d) + "\u2026", I(f), f = this.getSpanWidth(a, h), y === m ? y = m + 1 : f > c ? m = d - 1 : y = d;
                    0 === m && I("")
                }
                a.rotation = v;
                return p
            },
            escapes: {"\x26": "\x26amp;", "\x3c": "\x26lt;", "\x3e": "\x26gt;", "'": "\x26#39;", '"': "\x26quot;"},
            buildText: function (a) {
                var c = a.element, v = this, f = v.forExport, d = G(a.textStr, "").toString(),
                    y = -1 !== d.indexOf("\x3c"), m = c.childNodes, p, A = g(c, "x"), n = a.styles, q = a.textWidth,
                    E = n && n.lineHeight, e = n && n.textOutline, B = n && "ellipsis" === n.textOverflow,
                    Q = n && "nowrap" ===
                        n.whiteSpace, u = n && n.fontSize, l, O, H = m.length, n = q && !a.added && this.box,
                    J = function (a) {
                        var b;
                        b = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : u || v.style.fontSize || 12;
                        return E ? h(E) : v.fontMetrics(b, a.getAttribute("style") ? a : c).h
                    }, N = function (a, h) {
                        M(v.escapes, function (b, c) {
                            h && -1 !== z(b, h) || (a = a.toString().replace(new RegExp(b, "g"), c))
                        });
                        return a
                    }, t = function (a, h) {
                        var b;
                        b = a.indexOf("\x3c");
                        a = a.substring(b, a.indexOf("\x3e") - b);
                        b = a.indexOf(h + "\x3d");
                        if (-1 !== b && (b = b + h.length + 1, h = a.charAt(b), '"' === h || "'" ===
                        h)) return a = a.substring(b + 1), a.substring(0, a.indexOf(h))
                    };
                l = [d, B, Q, E, e, u, q].join();
                if (l !== a.textCache) {
                    for (a.textCache = l; H--;) c.removeChild(m[H]);
                    y || e || B || q || -1 !== d.indexOf(" ") ? (n && n.appendChild(c), d = y ? d.replace(/<(b|strong)>/g, '\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g, '\x3cspan style\x3d"font-style:italic"\x3e').replace(/<a/g, "\x3cspan").replace(/<\/(b|strong|i|em|a)>/g, "\x3c/span\x3e").split(/<br.*?>/g) : [d], d = b(d, function (a) {
                        return "" !== a
                    }), x(d, function (h, b) {
                        var d, y = 0;
                        h = h.replace(/^\s+|\s+$/g,
                            "").replace(/<span/g, "|||\x3cspan").replace(/<\/span>/g, "\x3c/span\x3e|||");
                        d = h.split("|||");
                        x(d, function (h) {
                            if ("" !== h || 1 === d.length) {
                                var m = {}, n = k.createElementNS(v.SVG_NS, "tspan"), E, z;
                                (E = t(h, "class")) && g(n, "class", E);
                                if (E = t(h, "style")) E = E.replace(/(;| |^)color([ :])/, "$1fill$2"), g(n, "style", E);
                                (z = t(h, "href")) && !f && (g(n, "onclick", 'location.href\x3d"' + z + '"'), g(n, "class", "highcharts-anchor"), w(n, {cursor: "pointer"}));
                                h = N(h.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " ");
                                if (" " !== h) {
                                    n.appendChild(k.createTextNode(h));
                                    y ? m.dx = 0 : b && null !== A && (m.x = A);
                                    g(n, m);
                                    c.appendChild(n);
                                    !y && O && (!P && f && w(n, {display: "block"}), g(n, "dy", J(n)));
                                    if (q) {
                                        m = h.replace(/([^\^])-/g, "$1- ").split(" ");
                                        z = 1 < d.length || b || 1 < m.length && !Q;
                                        var e = [], x, G = J(n), u = a.rotation;
                                        for (B && (p = v.applyEllipsis(a, n, h, q)); !B && z && (m.length || e.length);) a.rotation = 0, x = v.getSpanWidth(a, n), h = x > q, void 0 === p && (p = h), h && 1 !== m.length ? (n.removeChild(n.firstChild), e.unshift(m.pop())) : (m = e, e = [], m.length && !Q && (n = k.createElementNS(I, "tspan"), g(n, {
                                            dy: G,
                                            x: A
                                        }), E && g(n, "style", E), c.appendChild(n)),
                                        x > q && (q = x)), m.length && n.appendChild(k.createTextNode(m.join(" ").replace(/- /g, "-")));
                                        a.rotation = u
                                    }
                                    y++
                                }
                            }
                        });
                        O = O || c.childNodes.length
                    }), p && a.attr("title", N(a.textStr, ["\x26lt;", "\x26gt;"])), n && n.removeChild(c), e && a.applyTextOutline && a.applyTextOutline(e)) : c.appendChild(k.createTextNode(N(d)))
                }
            },
            getContrast: function (a) {
                a = t(a).rgba;
                return 510 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF"
            },
            button: function (a, h, b, c, v, f, d, m, I) {
                var y = this.label(a, h, b, I, null, null, null, null, "button"), n = 0;
                y.attr(E({padding: 8, r: 2}, v));
                var A,
                    k, q, z;
                v = E({
                    fill: "#f7f7f7",
                    stroke: "#cccccc",
                    "stroke-width": 1,
                    style: {color: "#333333", cursor: "pointer", fontWeight: "normal"}
                }, v);
                A = v.style;
                delete v.style;
                f = E(v, {fill: "#e6e6e6"}, f);
                k = f.style;
                delete f.style;
                d = E(v, {fill: "#e6ebf5", style: {color: "#000000", fontWeight: "bold"}}, d);
                q = d.style;
                delete d.style;
                m = E(v, {style: {color: "#cccccc"}}, m);
                z = m.style;
                delete m.style;
                D(y.element, L ? "mouseover" : "mouseenter", function () {
                    3 !== n && y.setState(1)
                });
                D(y.element, L ? "mouseout" : "mouseleave", function () {
                    3 !== n && y.setState(n)
                });
                y.setState =
                    function (a) {
                        1 !== a && (y.state = n = a);
                        y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]);
                        y.attr([v, f, d, m][a || 0]).css([A, k, q, z][a || 0])
                    };
                y.attr(v).css(p({cursor: "default"}, A));
                return y.on("click", function (a) {
                    3 !== n && c.call(y, a)
                })
            },
            crispLine: function (a, h) {
                a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - h % 2 / 2);
                a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) + h % 2 / 2);
                return a
            },
            path: function (a) {
                var h = {fill: "none"};
                J(a) ? h.d = a : B(a) && p(h,
                    a);
                return this.createElement("path").attr(h)
            },
            circle: function (a, h, b) {
                a = B(a) ? a : {x: a, y: h, r: b};
                h = this.createElement("circle");
                h.xSetter = h.ySetter = function (a, h, b) {
                    b.setAttribute("c" + h, a)
                };
                return h.attr(a)
            },
            arc: function (a, h, b, c, v, f) {
                B(a) ? (c = a, h = c.y, b = c.r, a = c.x) : c = {innerR: c, start: v, end: f};
                a = this.symbol("arc", a, h, b, b, c);
                a.r = b;
                return a
            },
            rect: function (a, h, b, c, v, f) {
                v = B(a) ? a.r : v;
                var d = this.createElement("rect");
                a = B(a) ? a : void 0 === a ? {} : {x: a, y: h, width: Math.max(b, 0), height: Math.max(c, 0)};
                void 0 !== f && (a.strokeWidth =
                    f, a = d.crisp(a));
                a.fill = "none";
                v && (a.r = v);
                d.rSetter = function (a, h, b) {
                    g(b, {rx: a, ry: a})
                };
                return d.attr(a)
            },
            setSize: function (a, h, b) {
                var c = this.alignedObjects, v = c.length;
                this.width = a;
                this.height = h;
                for (this.boxWrapper.animate({width: a, height: h}, {
                    step: function () {
                        this.attr({viewBox: "0 0 " + this.attr("width") + " " + this.attr("height")})
                    }, duration: G(b, !0) ? void 0 : 0
                }); v--;) c[v].align()
            },
            g: function (a) {
                var h = this.createElement("g");
                return a ? h.attr({"class": "highcharts-" + a}) : h
            },
            image: function (a, h, b, c, v, f) {
                var d = {preserveAspectRatio: "none"},
                    m, I = function (a, h) {
                        a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", h) : a.setAttribute("hc-svg-href", h)
                    };
                1 < arguments.length && p(d, {x: h, y: b, width: c, height: v});
                m = this.createElement("image").attr(d);
                f ? (I(m.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"), d = new N.Image, D(d, "load", function (h) {
                    I(m.element, a);
                    f.call(m, h)
                }), d.src = a) : I(m.element, a);
                return m
            },
            symbol: function (a, h, b, c, v, f) {
                var d = this, m, I = /^url\((.*?)\)$/, n = I.test(a), y = !n && (this.symbols[a] ?
                    a : "circle"), A = y && this.symbols[y],
                    q = u(h) && A && A.call(this.symbols, Math.round(h), Math.round(b), c, v, f), E, z;
                A ? (m = this.path(q), m.attr("fill", "none"), p(m, {
                    symbolName: y,
                    x: h,
                    y: b,
                    width: c,
                    height: v
                }), f && p(m, f)) : n && (E = a.match(I)[1], m = this.image(E), m.imgwidth = G(O[E] && O[E].width, f && f.width), m.imgheight = G(O[E] && O[E].height, f && f.height), z = function () {
                    m.attr({width: m.width, height: m.height})
                }, x(["width", "height"], function (a) {
                    m[a + "Setter"] = function (a, h) {
                        var b = {}, c = this["img" + h], v = "width" === h ? "translateX" : "translateY";
                        this[h] = a;
                        u(c) && (this.element && this.element.setAttribute(h, c), this.alignByTranslate || (b[v] = ((this[h] || 0) - c) / 2, this.attr(b)))
                    }
                }), u(h) && m.attr({
                    x: h,
                    y: b
                }), m.isImg = !0, u(m.imgwidth) && u(m.imgheight) ? z() : (m.attr({width: 0, height: 0}), l("img", {
                    onload: function () {
                        var a = e[d.chartIndex];
                        0 === this.width && (w(this, {position: "absolute", top: "-999em"}), k.body.appendChild(this));
                        O[E] = {width: this.width, height: this.height};
                        m.imgwidth = this.width;
                        m.imgheight = this.height;
                        m.element && z();
                        this.parentNode && this.parentNode.removeChild(this);
                        d.imgCount--;
                        if (!d.imgCount && a && a.onload) a.onload()
                    }, src: E
                }), this.imgCount++));
                return m
            },
            symbols: {
                circle: function (a, h, b, c) {
                    return this.arc(a + b / 2, h + c / 2, b / 2, c / 2, {start: 0, end: 2 * Math.PI, open: !1})
                }, square: function (a, h, b, c) {
                    return ["M", a, h, "L", a + b, h, a + b, h + c, a, h + c, "Z"]
                }, triangle: function (a, h, b, c) {
                    return ["M", a + b / 2, h, "L", a + b, h + c, a, h + c, "Z"]
                }, "triangle-down": function (a, h, b, c) {
                    return ["M", a, h, "L", a + b, h, a + b / 2, h + c, "Z"]
                }, diamond: function (a, h, b, c) {
                    return ["M", a + b / 2, h, "L", a + b, h + c / 2, a + b / 2, h + c, a, h + c / 2, "Z"]
                }, arc: function (a,
                                  h, b, c, v) {
                    var f = v.start, d = v.r || b, m = v.r || c || b, I = v.end - .001;
                    b = v.innerR;
                    c = G(v.open, .001 > Math.abs(v.end - v.start - 2 * Math.PI));
                    var n = Math.cos(f), p = Math.sin(f), y = Math.cos(I), I = Math.sin(I);
                    v = .001 > v.end - f - Math.PI ? 0 : 1;
                    d = ["M", a + d * n, h + m * p, "A", d, m, 0, v, 1, a + d * y, h + m * I];
                    u(b) && d.push(c ? "M" : "L", a + b * y, h + b * I, "A", b, b, 0, v, 0, a + b * n, h + b * p);
                    d.push(c ? "" : "Z");
                    return d
                }, callout: function (a, h, b, c, v) {
                    var f = Math.min(v && v.r || 0, b, c), d = f + 6, m = v && v.anchorX;
                    v = v && v.anchorY;
                    var I;
                    I = ["M", a + f, h, "L", a + b - f, h, "C", a + b, h, a + b, h, a + b, h + f, "L", a + b, h + c -
                    f, "C", a + b, h + c, a + b, h + c, a + b - f, h + c, "L", a + f, h + c, "C", a, h + c, a, h + c, a, h + c - f, "L", a, h + f, "C", a, h, a, h, a + f, h];
                    m && m > b ? v > h + d && v < h + c - d ? I.splice(13, 3, "L", a + b, v - 6, a + b + 6, v, a + b, v + 6, a + b, h + c - f) : I.splice(13, 3, "L", a + b, c / 2, m, v, a + b, c / 2, a + b, h + c - f) : m && 0 > m ? v > h + d && v < h + c - d ? I.splice(33, 3, "L", a, v + 6, a - 6, v, a, v - 6, a, h + f) : I.splice(33, 3, "L", a, c / 2, m, v, a, c / 2, a, h + f) : v && v > c && m > a + d && m < a + b - d ? I.splice(23, 3, "L", m + 6, h + c, m, h + c + 6, m - 6, h + c, a + f, h + c) : v && 0 > v && m > a + d && m < a + b - d && I.splice(3, 3, "L", m - 6, h, m, h - 6, m + 6, h, b - f, h);
                    return I
                }
            },
            clipRect: function (h, b, c,
                                v) {
                var f = a.uniqueKey(), d = this.createElement("clipPath").attr({id: f}).add(this.defs);
                h = this.rect(h, b, c, v, 0).add(d);
                h.id = f;
                h.clipPath = d;
                h.count = 0;
                return h
            },
            text: function (a, h, b, c) {
                var v = {};
                if (c && (this.allowHTML || !this.forExport)) return this.html(a, h, b);
                v.x = Math.round(h || 0);
                b && (v.y = Math.round(b));
                if (a || 0 === a) v.text = a;
                a = this.createElement("text").attr(v);
                c || (a.xSetter = function (a, h, b) {
                    var c = b.getElementsByTagName("tspan"), v, f = b.getAttribute(h), d;
                    for (d = 0; d < c.length; d++) v = c[d], v.getAttribute(h) === f && v.setAttribute(h,
                        a);
                    b.setAttribute(h, a)
                });
                return a
            },
            fontMetrics: function (a, b) {
                a = a || b && b.style && b.style.fontSize || this.style && this.style.fontSize;
                a = /px/.test(a) ? h(a) : /em/.test(a) ? parseFloat(a) * (b ? this.fontMetrics(null, b.parentNode).f : 16) : 12;
                b = 24 > a ? a + 3 : Math.round(1.2 * a);
                return {h: b, b: Math.round(.8 * b), f: a}
            },
            rotCorr: function (a, h, b) {
                var v = a;
                h && b && (v = Math.max(v * Math.cos(h * c), 4));
                return {x: -a / 3 * Math.sin(h * c), y: v}
            },
            label: function (h, b, c, f, d, m, I, n, A) {
                var k = this, q = k.g("button" !== A && "label"), z = q.text = k.text("", 0, 0, I).attr({zIndex: 1}),
                    y, e, P = 0, B = 3, Q = 0, g, G, l, O, H, J = {}, M, N, w = /^url\((.*?)\)$/.test(f), t = w, L, r,
                    R, U;
                A && q.addClass("highcharts-" + A);
                t = w;
                L = function () {
                    return (M || 0) % 2 / 2
                };
                r = function () {
                    var a = z.element.style, h = {};
                    e = (void 0 === g || void 0 === G || H) && u(z.textStr) && z.getBBox();
                    q.width = (g || e.width || 0) + 2 * B + Q;
                    q.height = (G || e.height || 0) + 2 * B;
                    N = B + k.fontMetrics(a && a.fontSize, z).b;
                    t && (y || (q.box = y = k.symbols[f] || w ? k.symbol(f) : k.rect(), y.addClass(("button" === A ? "" : "highcharts-label-box") + (A ? " highcharts-" + A + "-box" : "")), y.add(q), a = L(), h.x = a, h.y = (n ? -N :
                        0) + a), h.width = Math.round(q.width), h.height = Math.round(q.height), y.attr(p(h, J)), J = {})
                };
                R = function () {
                    var a = Q + B, h;
                    h = n ? 0 : N;
                    u(g) && e && ("center" === H || "right" === H) && (a += {center: .5, right: 1}[H] * (g - e.width));
                    if (a !== z.x || h !== z.y) z.attr("x", a), void 0 !== h && z.attr("y", h);
                    z.x = a;
                    z.y = h
                };
                U = function (a, h) {
                    y ? y.attr(a, h) : J[a] = h
                };
                q.onAdd = function () {
                    z.add(q);
                    q.attr({text: h || 0 === h ? h : "", x: b, y: c});
                    y && u(d) && q.attr({anchorX: d, anchorY: m})
                };
                q.widthSetter = function (h) {
                    g = a.isNumber(h) ? h : null
                };
                q.heightSetter = function (a) {
                    G = a
                };
                q["text-alignSetter"] =
                    function (a) {
                        H = a
                    };
                q.paddingSetter = function (a) {
                    u(a) && a !== B && (B = q.padding = a, R())
                };
                q.paddingLeftSetter = function (a) {
                    u(a) && a !== Q && (Q = a, R())
                };
                q.alignSetter = function (a) {
                    a = {left: 0, center: .5, right: 1}[a];
                    a !== P && (P = a, e && q.attr({x: l}))
                };
                q.textSetter = function (a) {
                    void 0 !== a && z.textSetter(a);
                    r();
                    R()
                };
                q["stroke-widthSetter"] = function (a, h) {
                    a && (t = !0);
                    M = this["stroke-width"] = a;
                    U(h, a)
                };
                q.strokeSetter = q.fillSetter = q.rSetter = function (a, h) {
                    "r" !== h && ("fill" === h && a && (t = !0), q[h] = a);
                    U(h, a)
                };
                q.anchorXSetter = function (a, h) {
                    d = q.anchorX =
                        a;
                    U(h, Math.round(a) - L() - l)
                };
                q.anchorYSetter = function (a, h) {
                    m = q.anchorY = a;
                    U(h, a - O)
                };
                q.xSetter = function (a) {
                    q.x = a;
                    P && (a -= P * ((g || e.width) + 2 * B), q["forceAnimate:x"] = !0);
                    l = Math.round(a);
                    q.attr("translateX", l)
                };
                q.ySetter = function (a) {
                    O = q.y = Math.round(a);
                    q.attr("translateY", O)
                };
                var S = q.css;
                return p(q, {
                    css: function (a) {
                        if (a) {
                            var h = {};
                            a = E(a);
                            x(q.textProps, function (b) {
                                void 0 !== a[b] && (h[b] = a[b], delete a[b])
                            });
                            z.css(h);
                            "width" in h && r()
                        }
                        return S.call(q, a)
                    }, getBBox: function () {
                        return {
                            width: e.width + 2 * B, height: e.height +
                            2 * B, x: e.x - B, y: e.y - B
                        }
                    }, shadow: function (a) {
                        a && (r(), y && y.shadow(a));
                        return q
                    }, destroy: function () {
                        v(q.element, "mouseenter");
                        v(q.element, "mouseleave");
                        z && (z = z.destroy());
                        y && (y = y.destroy());
                        C.prototype.destroy.call(q);
                        q = k = r = R = U = null
                    }
                })
            }
        });
        a.Renderer = F
    })(K);
    (function (a) {
        var C = a.attr, F = a.createElement, D = a.css, r = a.defined, g = a.each, e = a.extend, t = a.isFirefox,
            w = a.isMS, l = a.isWebKit, u = a.pick, c = a.pInt, d = a.SVGRenderer, k = a.win, x = a.wrap;
        e(a.SVGElement.prototype, {
            htmlCss: function (a) {
                var c = this.element;
                if (c = a && "SPAN" ===
                    c.tagName && a.width) delete a.width, this.textWidth = c, this.htmlUpdateTransform();
                a && "ellipsis" === a.textOverflow && (a.whiteSpace = "nowrap", a.overflow = "hidden");
                this.styles = e(this.styles, a);
                D(this.element, a);
                return this
            }, htmlGetBBox: function () {
                var a = this.element;
                return {x: a.offsetLeft, y: a.offsetTop, width: a.offsetWidth, height: a.offsetHeight}
            }, htmlUpdateTransform: function () {
                if (this.added) {
                    var a = this.renderer, f = this.element, b = this.translateX || 0, d = this.translateY || 0,
                        k = this.x || 0, e = this.y || 0, q = this.textAlign ||
                        "left", x = {left: 0, center: .5, right: 1}[q], B = this.styles, l = B && B.whiteSpace;
                    D(f, {marginLeft: b, marginTop: d});
                    this.shadows && g(this.shadows, function (a) {
                        D(a, {marginLeft: b + 1, marginTop: d + 1})
                    });
                    this.inverted && g(f.childNodes, function (b) {
                        a.invertChild(b, f)
                    });
                    if ("SPAN" === f.tagName) {
                        var B = this.rotation, m = this.textWidth && c(this.textWidth),
                            E = [B, q, f.innerHTML, this.textWidth, this.textAlign].join(), A;
                        (A = m !== this.oldTextWidth) && !(A = m > this.oldTextWidth) && ((A = this.textPxLength) || (D(f, {
                            width: "",
                            whiteSpace: l || "nowrap"
                        }), A =
                            f.offsetWidth), A = A > m);
                        A && /[ \-]/.test(f.textContent || f.innerText) && (D(f, {
                            width: m + "px",
                            display: "block",
                            whiteSpace: l || "normal"
                        }), this.oldTextWidth = m);
                        E !== this.cTT && (l = a.fontMetrics(f.style.fontSize).b, r(B) && B !== (this.oldRotation || 0) && this.setSpanRotation(B, x, l), this.getSpanCorrection(!r(B) && this.textPxLength || f.offsetWidth, l, x, B, q));
                        D(f, {left: k + (this.xCorr || 0) + "px", top: e + (this.yCorr || 0) + "px"});
                        this.cTT = E;
                        this.oldRotation = B
                    }
                } else this.alignOnAdd = !0
            }, setSpanRotation: function (a, c, b) {
                var f = {}, d = this.renderer.getTransformKey();
                f[d] = f.transform = "rotate(" + a + "deg)";
                f[d + (t ? "Origin" : "-origin")] = f.transformOrigin = 100 * c + "% " + b + "px";
                D(this.element, f)
            }, getSpanCorrection: function (a, c, b) {
                this.xCorr = -a * b;
                this.yCorr = -c
            }
        });
        e(d.prototype, {
            getTransformKey: function () {
                return w && !/Edge/.test(k.navigator.userAgent) ? "-ms-transform" : l ? "-webkit-transform" : t ? "MozTransform" : k.opera ? "-o-transform" : ""
            }, html: function (a, c, b) {
                var f = this.createElement("span"), d = f.element, p = f.renderer, q = p.isSVG, k = function (a, b) {
                    g(["opacity", "visibility"], function (c) {
                        x(a,
                            c + "Setter", function (a, c, f, d) {
                                a.call(this, c, f, d);
                                b[f] = c
                            })
                    });
                    a.addedSetters = !0
                };
                f.textSetter = function (a) {
                    a !== d.innerHTML && delete this.bBox;
                    this.textStr = a;
                    d.innerHTML = u(a, "");
                    f.doTransform = !0
                };
                q && k(f, f.element.style);
                f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (a, b) {
                    "align" === b && (b = "textAlign");
                    f[b] = a;
                    f.doTransform = !0
                };
                f.afterSetters = function () {
                    this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1)
                };
                f.attr({text: a, x: Math.round(c), y: Math.round(b)}).css({
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize, position: "absolute"
                });
                d.style.whiteSpace = "nowrap";
                f.css = f.htmlCss;
                q && (f.add = function (a) {
                    var b, c = p.box.parentNode, q = [];
                    if (this.parentGroup = a) {
                        if (b = a.div, !b) {
                            for (; a;) q.push(a), a = a.parentGroup;
                            g(q.reverse(), function (a) {
                                function d(h, b) {
                                    a[b] = h;
                                    "translateX" === b ? m.left = h + "px" : m.top = h + "px";
                                    a.doTransform = !0
                                }

                                var m, h = C(a.element, "class");
                                h && (h = {className: h});
                                b = a.div = a.div || F("div", h, {
                                    position: "absolute",
                                    left: (a.translateX || 0) + "px",
                                    top: (a.translateY || 0) + "px",
                                    display: a.display,
                                    opacity: a.opacity,
                                    pointerEvents: a.styles && a.styles.pointerEvents
                                }, b || c);
                                m = b.style;
                                e(a, {
                                    classSetter: function (a) {
                                        return function (h) {
                                            this.element.setAttribute("class", h);
                                            a.className = h
                                        }
                                    }(b), on: function () {
                                        q[0].div && f.on.apply({element: q[0].div}, arguments);
                                        return a
                                    }, translateXSetter: d, translateYSetter: d
                                });
                                a.addedSetters || k(a, m)
                            })
                        }
                    } else b = c;
                    b.appendChild(d);
                    f.added = !0;
                    f.alignOnAdd && f.htmlUpdateTransform();
                    return f
                });
                return f
            }
        })
    })(K);
    (function (a) {
        var C = a.defined, F = a.each, D = a.extend, r = a.merge, g = a.pick, e = a.timeUnits, t = a.win;
        a.Time = function (a) {
            this.update(a, !1)
        };
        a.Time.prototype = {
            defaultOptions: {}, update: function (e) {
                var l = g(e && e.useUTC, !0), u = this;
                this.options = e = r(!0, this.options || {}, e);
                this.Date = e.Date || t.Date;
                this.timezoneOffset = (this.useUTC = l) && e.timezoneOffset;
                this.getTimezoneOffset = this.timezoneOffsetFunction();
                (this.variableTimezone = !(l && !e.getTimezoneOffset && !e.timezone)) || this.timezoneOffset ? (this.get = function (a, d) {
                    var c = d.getTime(), e = c - u.getTimezoneOffset(d);
                    d.setTime(e);
                    a = d["getUTC" + a]();
                    d.setTime(c);
                    return a
                },
                    this.set = function (c, d, k) {
                        var e;
                        if (-1 !== a.inArray(c, ["Milliseconds", "Seconds", "Minutes"])) d["set" + c](k); else e = u.getTimezoneOffset(d), e = d.getTime() - e, d.setTime(e), d["setUTC" + c](k), c = u.getTimezoneOffset(d), e = d.getTime() + c, d.setTime(e)
                    }) : l ? (this.get = function (a, d) {
                    return d["getUTC" + a]()
                }, this.set = function (a, d, k) {
                    return d["setUTC" + a](k)
                }) : (this.get = function (a, d) {
                    return d["get" + a]()
                }, this.set = function (a, d, k) {
                    return d["set" + a](k)
                })
            }, makeTime: function (e, l, u, c, d, k) {
                var x, p, f;
                this.useUTC ? (x = this.Date.UTC.apply(0,
                    arguments), p = this.getTimezoneOffset(x), x += p, f = this.getTimezoneOffset(x), p !== f ? x += f - p : p - 36E5 !== this.getTimezoneOffset(x - 36E5) || a.isSafari || (x -= 36E5)) : x = (new this.Date(e, l, g(u, 1), g(c, 0), g(d, 0), g(k, 0))).getTime();
                return x
            }, timezoneOffsetFunction: function () {
                var e = this, g = this.options, u = t.moment;
                if (!this.useUTC) return function (a) {
                    return 6E4 * (new Date(a)).getTimezoneOffset()
                };
                if (g.timezone) {
                    if (u) return function (a) {
                        return 6E4 * -u.tz(a, g.timezone).utcOffset()
                    };
                    a.error(25)
                }
                return this.useUTC && g.getTimezoneOffset ?
                    function (a) {
                        return 6E4 * g.getTimezoneOffset(a)
                    } : function () {
                        return 6E4 * (e.timezoneOffset || 0)
                    }
            }, dateFormat: function (e, g, u) {
                if (!a.defined(g) || isNaN(g)) return a.defaultOptions.lang.invalidDate || "";
                e = a.pick(e, "%Y-%m-%d %H:%M:%S");
                var c = this, d = new this.Date(g), k = this.get("Hours", d), x = this.get("Day", d),
                    p = this.get("Date", d), f = this.get("Month", d), b = this.get("FullYear", d),
                    n = a.defaultOptions.lang, z = n.weekdays, l = n.shortWeekdays, q = a.pad, d = a.extend({
                        a: l ? l[x] : z[x].substr(0, 3),
                        A: z[x],
                        d: q(p),
                        e: q(p, 2, " "),
                        w: x,
                        b: n.shortMonths[f],
                        B: n.months[f],
                        m: q(f + 1),
                        y: b.toString().substr(2, 2),
                        Y: b,
                        H: q(k),
                        k: k,
                        I: q(k % 12 || 12),
                        l: k % 12 || 12,
                        M: q(c.get("Minutes", d)),
                        p: 12 > k ? "AM" : "PM",
                        P: 12 > k ? "am" : "pm",
                        S: q(d.getSeconds()),
                        L: q(Math.round(g % 1E3), 3)
                    }, a.dateFormats);
                a.objectEach(d, function (a, b) {
                    for (; -1 !== e.indexOf("%" + b);) e = e.replace("%" + b, "function" === typeof a ? a.call(c, g) : a)
                });
                return u ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            }, getTimeTicks: function (a, l, u, c) {
                var d = this, k = [], x = {}, p, f = new d.Date(l), b = a.unitRange, n = a.count || 1, z;
                if (C(l)) {
                    d.set("Milliseconds",
                        f, b >= e.second ? 0 : n * Math.floor(d.get("Milliseconds", f) / n));
                    b >= e.second && d.set("Seconds", f, b >= e.minute ? 0 : n * Math.floor(d.get("Seconds", f) / n));
                    b >= e.minute && d.set("Minutes", f, b >= e.hour ? 0 : n * Math.floor(d.get("Minutes", f) / n));
                    b >= e.hour && d.set("Hours", f, b >= e.day ? 0 : n * Math.floor(d.get("Hours", f) / n));
                    b >= e.day && d.set("Date", f, b >= e.month ? 1 : n * Math.floor(d.get("Date", f) / n));
                    b >= e.month && (d.set("Month", f, b >= e.year ? 0 : n * Math.floor(d.get("Month", f) / n)), p = d.get("FullYear", f));
                    b >= e.year && d.set("FullYear", f, p - p % n);
                    b === e.week &&
                    d.set("Date", f, d.get("Date", f) - d.get("Day", f) + g(c, 1));
                    p = d.get("FullYear", f);
                    c = d.get("Month", f);
                    var J = d.get("Date", f), q = d.get("Hours", f);
                    l = f.getTime();
                    d.variableTimezone && (z = u - l > 4 * e.month || d.getTimezoneOffset(l) !== d.getTimezoneOffset(u));
                    f = f.getTime();
                    for (l = 1; f < u;) k.push(f), f = b === e.year ? d.makeTime(p + l * n, 0) : b === e.month ? d.makeTime(p, c + l * n) : !z || b !== e.day && b !== e.week ? z && b === e.hour && 1 < n ? d.makeTime(p, c, J, q + l * n) : f + b * n : d.makeTime(p, c, J + l * n * (b === e.day ? 1 : 7)), l++;
                    k.push(f);
                    b <= e.hour && 1E4 > k.length && F(k, function (a) {
                        0 ===
                        a % 18E5 && "000000000" === d.dateFormat("%H%M%S%L", a) && (x[a] = "day")
                    })
                }
                k.info = D(a, {higherRanks: x, totalRange: b * n});
                return k
            }
        }
    })(K);
    (function (a) {
        var C = a.color, F = a.merge;
        a.defaultOptions = {
            colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January February March April May June July August September October November December".split(" "),
                shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
                decimalPoint: ".",
                numericSymbols: "kMGTPE".split(""),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: " "
            },
            global: {},
            time: a.Time.prototype.defaultOptions,
            chart: {
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                resetZoomButton: {theme: {zIndex: 6}, position: {align: "right", x: -10, y: 10}},
                width: null,
                height: null,
                borderColor: "#335cad",
                backgroundColor: "#ffffff",
                plotBorderColor: "#cccccc"
            },
            title: {text: "Chart title", align: "center", margin: 15, widthAdjust: -44},
            subtitle: {text: "", align: "center", widthAdjust: -44},
            plotOptions: {},
            labels: {style: {position: "absolute", color: "#333333"}},
            legend: {
                enabled: !0,
                align: "center",
                alignColumns: !0,
                layout: "horizontal",
                labelFormatter: function () {
                    return this.name
                },
                borderColor: "#999999",
                borderRadius: 0,
                navigation: {activeColor: "#003399", inactiveColor: "#cccccc"},
                itemStyle: {color: "#333333", fontSize: "12px", fontWeight: "bold", textOverflow: "ellipsis"},
                itemHoverStyle: {color: "#000000"},
                itemHiddenStyle: {color: "#cccccc"},
                shadow: !1,
                itemCheckboxStyle: {position: "absolute", width: "13px", height: "13px"},
                squareSymbol: !0,
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {style: {fontWeight: "bold"}}
            },
            loading: {
                labelStyle: {fontWeight: "bold", position: "relative", top: "45%"},
                style: {position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center"}
            },
            tooltip: {
                enabled: !0,
                animation: a.svg,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                footerFormat: "",
                padding: 8,
                snap: a.isTouchDevice ? 25 : 10,
                backgroundColor: C("#f7f7f7").setOpacity(.85).get(),
                borderWidth: 1,
                headerFormat: '\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',
                shadow: !0,
                style: {
                    color: "#333333", cursor: "default",
                    fontSize: "12px", pointerEvents: "none", whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                href: "http://www.highcharts.com",
                position: {align: "right", x: -10, verticalAlign: "bottom", y: -5},
                style: {cursor: "pointer", color: "#999999", fontSize: "9px"},
                text: "Highcharts.com"
            }
        };
        a.setOptions = function (C) {
            a.defaultOptions = F(!0, a.defaultOptions, C);
            a.time.update(F(a.defaultOptions.global, a.defaultOptions.time), !1);
            return a.defaultOptions
        };
        a.getOptions = function () {
            return a.defaultOptions
        };
        a.defaultPlotOptions = a.defaultOptions.plotOptions;
        a.time = new a.Time(F(a.defaultOptions.global, a.defaultOptions.time));
        a.dateFormat = function (C, r, g) {
            return a.time.dateFormat(C, r, g)
        }
    })(K);
    (function (a) {
        var C = a.correctFloat, F = a.defined, D = a.destroyObjectProperties, r = a.fireEvent, g = a.isNumber,
            e = a.merge, t = a.pick, w = a.deg2rad;
        a.Tick = function (a, e, c, d) {
            this.axis = a;
            this.pos = e;
            this.type = c || "";
            this.isNewLabel = this.isNew = !0;
            c || d || this.addLabel()
        };
        a.Tick.prototype = {
            addLabel: function () {
                var a = this.axis, g = a.options, c = a.chart, d = a.categories, k = a.names, x = this.pos,
                    p = g.labels,
                    f = a.tickPositions, b = x === f[0], n = x === f[f.length - 1], k = d ? t(d[x], k[x], x) : x,
                    d = this.label, f = f.info, z;
                a.isDatetimeAxis && f && (z = g.dateTimeLabelFormats[f.higherRanks[x] || f.unitName]);
                this.isFirst = b;
                this.isLast = n;
                g = a.labelFormatter.call({
                    axis: a,
                    chart: c,
                    isFirst: b,
                    isLast: n,
                    dateTimeLabelFormat: z,
                    value: a.isLog ? C(a.lin2log(k)) : k,
                    pos: x
                });
                if (F(d)) d && d.attr({text: g}); else {
                    if (this.label = d = F(g) && p.enabled ? c.renderer.text(g, 0, 0, p.useHTML).css(e(p.style)).add(a.labelGroup) : null) d.textPxLength = d.getBBox().width;
                    this.rotation =
                        0
                }
            }, getLabelSize: function () {
                return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0
            }, handleOverflow: function (a) {
                var e = this.axis, c = e.options.labels, d = a.x, k = e.chart.chartWidth, g = e.chart.spacing,
                    p = t(e.labelLeft, Math.min(e.pos, g[3])),
                    g = t(e.labelRight, Math.max(e.isRadial ? 0 : e.pos + e.len, k - g[1])), f = this.label,
                    b = this.rotation, n = {left: 0, center: .5, right: 1}[e.labelAlign || f.attr("align")],
                    z = f.getBBox().width, l = e.getSlotWidth(), q = l, L = 1, B, H = {};
                if (b || !1 === c.overflow) 0 > b && d - n * z < p ? B = Math.round(d /
                    Math.cos(b * w) - p) : 0 < b && d + n * z > g && (B = Math.round((k - d) / Math.cos(b * w))); else if (k = d + (1 - n) * z, d - n * z < p ? q = a.x + q * (1 - n) - p : k > g && (q = g - a.x + q * n, L = -1), q = Math.min(l, q), q < l && "center" === e.labelAlign && (a.x += L * (l - q - n * (l - Math.min(z, q)))), z > q || e.autoRotation && (f.styles || {}).width) B = q;
                B && (H.width = B, (c.style || {}).textOverflow || (H.textOverflow = "ellipsis"), f.css(H))
            }, getPosition: function (e, g, c, d) {
                var k = this.axis, x = k.chart, p = d && x.oldChartHeight || x.chartHeight;
                e = {
                    x: e ? a.correctFloat(k.translate(g + c, null, null, d) + k.transB) : k.left +
                        k.offset + (k.opposite ? (d && x.oldChartWidth || x.chartWidth) - k.right - k.left : 0),
                    y: e ? p - k.bottom + k.offset - (k.opposite ? k.height : 0) : a.correctFloat(p - k.translate(g + c, null, null, d) - k.transB)
                };
                r(this, "afterGetPosition", {pos: e});
                return e
            }, getLabelPosition: function (a, e, c, d, k, g, p, f) {
                var b = this.axis, n = b.transA, z = b.reversed, x = b.staggerLines, q = b.tickRotCorr || {x: 0, y: 0},
                    l = k.y, B = d || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1),
                    u = {};
                F(l) || (l = 0 === b.side ? c.rotation ? -8 : -c.getBBox().height : 2 === b.side ?
                    q.y + 8 : Math.cos(c.rotation * w) * (q.y - c.getBBox(!1, 0).height / 2));
                a = a + k.x + B + q.x - (g && d ? g * n * (z ? -1 : 1) : 0);
                e = e + l - (g && !d ? g * n * (z ? 1 : -1) : 0);
                x && (c = p / (f || 1) % x, b.opposite && (c = x - c - 1), e += b.labelOffset / x * c);
                u.x = a;
                u.y = Math.round(e);
                r(this, "afterGetLabelPosition", {pos: u});
                return u
            }, getMarkPath: function (a, e, c, d, k, g) {
                return g.crispLine(["M", a, e, "L", a + (k ? 0 : -c), e + (k ? c : 0)], d)
            }, renderGridLine: function (a, e, c) {
                var d = this.axis, k = d.options, g = this.gridLine, p = {}, f = this.pos, b = this.type,
                    n = d.tickmarkOffset, z = d.chart.renderer, l = b ? b + "Grid" :
                    "grid", q = k[l + "LineWidth"], u = k[l + "LineColor"], k = k[l + "LineDashStyle"];
                g || (p.stroke = u, p["stroke-width"] = q, k && (p.dashstyle = k), b || (p.zIndex = 1), a && (p.opacity = 0), this.gridLine = g = z.path().attr(p).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(d.gridGroup));
                if (!a && g && (a = d.getPlotLinePath(f + n, g.strokeWidth() * c, a, !0))) g[this.isNew ? "attr" : "animate"]({
                    d: a,
                    opacity: e
                })
            }, renderMark: function (a, e, c) {
                var d = this.axis, k = d.options, g = d.chart.renderer, p = this.type, f = p ? p + "Tick" : "tick",
                    b = d.tickSize(f), n = this.mark, z = !n,
                    l = a.x;
                a = a.y;
                var q = t(k[f + "Width"], !p && d.isXAxis ? 1 : 0), k = k[f + "Color"];
                b && (d.opposite && (b[0] = -b[0]), z && (this.mark = n = g.path().addClass("highcharts-" + (p ? p + "-" : "") + "tick").add(d.axisGroup), n.attr({
                    stroke: k,
                    "stroke-width": q
                })), n[z ? "attr" : "animate"]({
                    d: this.getMarkPath(l, a, b[0], n.strokeWidth() * c, d.horiz, g),
                    opacity: e
                }))
            }, renderLabel: function (a, e, c, d) {
                var k = this.axis, x = k.horiz, p = k.options, f = this.label, b = p.labels, n = b.step,
                    k = k.tickmarkOffset, z = !0, u = a.x;
                a = a.y;
                f && g(u) && (f.xy = a = this.getLabelPosition(u, a, f, x, b, k,
                    d, n), this.isFirst && !this.isLast && !t(p.showFirstLabel, 1) || this.isLast && !this.isFirst && !t(p.showLastLabel, 1) ? z = !1 : !x || b.step || b.rotation || e || 0 === c || this.handleOverflow(a), n && d % n && (z = !1), z && g(a.y) ? (a.opacity = c, f[this.isNewLabel ? "attr" : "animate"](a), this.isNewLabel = !1) : (f.attr("y", -9999), this.isNewLabel = !0))
            }, render: function (e, g, c) {
                var d = this.axis, k = d.horiz, x = this.getPosition(k, this.pos, d.tickmarkOffset, g), p = x.x,
                    f = x.y, d = k && p === d.pos + d.len || !k && f === d.pos ? -1 : 1;
                c = t(c, 1);
                this.isActive = !0;
                this.renderGridLine(g,
                    c, d);
                this.renderMark(x, c, d);
                this.renderLabel(x, g, c, e);
                this.isNew = !1;
                a.fireEvent(this, "afterRender")
            }, destroy: function () {
                D(this, this.axis)
            }
        }
    })(K);
    var V = function (a) {
        var C = a.addEvent, F = a.animObject, D = a.arrayMax, r = a.arrayMin, g = a.color, e = a.correctFloat,
            t = a.defaultOptions, w = a.defined, l = a.deg2rad, u = a.destroyObjectProperties, c = a.each, d = a.extend,
            k = a.fireEvent, x = a.format, p = a.getMagnitude, f = a.grep, b = a.inArray, n = a.isArray, z = a.isNumber,
            J = a.isString, q = a.merge, L = a.normalizeTickInterval, B = a.objectEach, H = a.pick, m =
                a.removeEvent, E = a.splat, A = a.syncTimeout, M = a.Tick, G = function () {
                this.init.apply(this, arguments)
            };
        a.extend(G.prototype, {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                labels: {enabled: !0, style: {color: "#666666", cursor: "default", fontSize: "11px"}, x: 0},
                maxPadding: .01,
                minorTickLength: 2,
                minorTickPosition: "outside",
                minPadding: .01,
                startOfWeek: 1,
                startOnTick: !1,
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                title: {align: "middle", style: {color: "#666666"}},
                type: "linear",
                minorGridLineColor: "#f2f2f2",
                minorGridLineWidth: 1,
                minorTickColor: "#999999",
                lineColor: "#ccd6eb",
                lineWidth: 1,
                gridLineColor: "#e6e6e6",
                tickColor: "#ccd6eb"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {x: -8},
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                title: {rotation: 270, text: "Values"},
                stackLabels: {
                    allowOverlap: !1, enabled: !1, formatter: function () {
                        return a.numberFormat(this.total,
                            -1)
                    }, style: {fontSize: "11px", fontWeight: "bold", color: "#000000", textOutline: "1px contrast"}
                },
                gridLineWidth: 1,
                lineWidth: 0
            },
            defaultLeftAxisOptions: {labels: {x: -15}, title: {rotation: 270}},
            defaultRightAxisOptions: {labels: {x: 15}, title: {rotation: 90}},
            defaultBottomAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            defaultTopAxisOptions: {labels: {autoRotation: [-45], x: 0}, title: {rotation: 0}},
            init: function (a, c) {
                var h = c.isX, v = this;
                v.chart = a;
                v.horiz = a.inverted && !v.isZAxis ? !h : h;
                v.isXAxis = h;
                v.coll = v.coll ||
                    (h ? "xAxis" : "yAxis");
                k(this, "init", {userOptions: c});
                v.opposite = c.opposite;
                v.side = c.side || (v.horiz ? v.opposite ? 0 : 2 : v.opposite ? 1 : 3);
                v.setOptions(c);
                var f = this.options, d = f.type;
                v.labelFormatter = f.labels.formatter || v.defaultLabelFormatter;
                v.userOptions = c;
                v.minPixelPadding = 0;
                v.reversed = f.reversed;
                v.visible = !1 !== f.visible;
                v.zoomEnabled = !1 !== f.zoomEnabled;
                v.hasNames = "category" === d || !0 === f.categories;
                v.categories = f.categories || v.hasNames;
                v.names || (v.names = [], v.names.keys = {});
                v.plotLinesAndBandsGroups = {};
                v.isLog =
                    "logarithmic" === d;
                v.isDatetimeAxis = "datetime" === d;
                v.positiveValuesOnly = v.isLog && !v.allowNegativeLog;
                v.isLinked = w(f.linkedTo);
                v.ticks = {};
                v.labelEdge = [];
                v.minorTicks = {};
                v.plotLinesAndBands = [];
                v.alternateBands = {};
                v.len = 0;
                v.minRange = v.userMinRange = f.minRange || f.maxZoom;
                v.range = f.range;
                v.offset = f.offset || 0;
                v.stacks = {};
                v.oldStacks = {};
                v.stacksTouched = 0;
                v.max = null;
                v.min = null;
                v.crosshair = H(f.crosshair, E(a.options.tooltip.crosshairs)[h ? 0 : 1], !1);
                c = v.options.events;
                -1 === b(v, a.axes) && (h ? a.axes.splice(a.xAxis.length,
                    0, v) : a.axes.push(v), a[v.coll].push(v));
                v.series = v.series || [];
                a.inverted && !v.isZAxis && h && void 0 === v.reversed && (v.reversed = !0);
                B(c, function (a, h) {
                    C(v, h, a)
                });
                v.lin2log = f.linearToLogConverter || v.lin2log;
                v.isLog && (v.val2lin = v.log2lin, v.lin2val = v.lin2log);
                k(this, "afterInit")
            },
            setOptions: function (a) {
                this.options = q(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side],
                    q(t[this.coll], a));
                k(this, "afterSetOptions", {userOptions: a})
            },
            defaultLabelFormatter: function () {
                var h = this.axis, b = this.value, c = h.chart.time, f = h.categories, d = this.dateTimeLabelFormat,
                    m = t.lang, q = m.numericSymbols, m = m.numericSymbolMagnitude || 1E3, p = q && q.length, n,
                    e = h.options.labels.format, h = h.isLog ? Math.abs(b) : h.tickInterval;
                if (e) n = x(e, this, c); else if (f) n = b; else if (d) n = c.dateFormat(d, b); else if (p && 1E3 <= h) for (; p-- && void 0 === n;) c = Math.pow(m, p + 1), h >= c && 0 === 10 * b % c && null !== q[p] && 0 !== b && (n = a.numberFormat(b / c,
                    -1) + q[p]);
                void 0 === n && (n = 1E4 <= Math.abs(b) ? a.numberFormat(b, -1) : a.numberFormat(b, -1, void 0, ""));
                return n
            },
            getSeriesExtremes: function () {
                var a = this, b = a.chart;
                k(this, "getSeriesExtremes", null, function () {
                    a.hasVisibleSeries = !1;
                    a.dataMin = a.dataMax = a.threshold = null;
                    a.softThreshold = !a.isXAxis;
                    a.buildStacks && a.buildStacks();
                    c(a.series, function (h) {
                        if (h.visible || !b.options.chart.ignoreHiddenSeries) {
                            var v = h.options, c = v.threshold, d;
                            a.hasVisibleSeries = !0;
                            a.positiveValuesOnly && 0 >= c && (c = null);
                            if (a.isXAxis) v = h.xData,
                            v.length && (h = r(v), d = D(v), z(h) || h instanceof Date || (v = f(v, z), h = r(v), d = D(v)), v.length && (a.dataMin = Math.min(H(a.dataMin, v[0], h), h), a.dataMax = Math.max(H(a.dataMax, v[0], d), d))); else if (h.getExtremes(), d = h.dataMax, h = h.dataMin, w(h) && w(d) && (a.dataMin = Math.min(H(a.dataMin, h), h), a.dataMax = Math.max(H(a.dataMax, d), d)), w(c) && (a.threshold = c), !v.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                        }
                    })
                });
                k(this, "afterGetSeriesExtremes")
            },
            translate: function (a, b, c, f, d, m) {
                var h = this.linkedParent || this, v = 1, I = 0, q = f ?
                    h.oldTransA : h.transA;
                f = f ? h.oldMin : h.min;
                var p = h.minPixelPadding;
                d = (h.isOrdinal || h.isBroken || h.isLog && d) && h.lin2val;
                q || (q = h.transA);
                c && (v *= -1, I = h.len);
                h.reversed && (v *= -1, I -= v * (h.sector || h.len));
                b ? (a = (a * v + I - p) / q + f, d && (a = h.lin2val(a))) : (d && (a = h.val2lin(a)), a = z(f) ? v * (a - f) * q + I + v * p + (z(m) ? q * m : 0) : void 0);
                return a
            },
            toPixels: function (a, b) {
                return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos)
            },
            toValue: function (a, b) {
                return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function (a,
                                       b, c, f, d) {
                var h = this.chart, v = this.left, m = this.top, I, q, p = c && h.oldChartHeight || h.chartHeight,
                    n = c && h.oldChartWidth || h.chartWidth, e;
                I = this.transB;
                var A = function (a, h, b) {
                    if (a < h || a > b) f ? a = Math.min(Math.max(h, a), b) : e = !0;
                    return a
                };
                d = H(d, this.translate(a, null, null, c));
                d = Math.min(Math.max(-1E5, d), 1E5);
                a = c = Math.round(d + I);
                I = q = Math.round(p - d - I);
                z(d) ? this.horiz ? (I = m, q = p - this.bottom, a = c = A(a, v, v + this.width)) : (a = v, c = n - this.right, I = q = A(I, m, m + this.height)) : (e = !0, f = !1);
                return e && !f ? null : h.renderer.crispLine(["M", a, I, "L",
                    c, q], b || 1)
            },
            getLinearTickPositions: function (a, b, c) {
                var h, v = e(Math.floor(b / a) * a);
                c = e(Math.ceil(c / a) * a);
                var f = [], d;
                e(v + a) === v && (d = 20);
                if (this.single) return [b];
                for (b = v; b <= c;) {
                    f.push(b);
                    b = e(b + a, d);
                    if (b === h) break;
                    h = b
                }
                return f
            },
            getMinorTickInterval: function () {
                var a = this.options;
                return !0 === a.minorTicks ? H(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval
            },
            getMinorTickPositions: function () {
                var a = this, b = a.options, f = a.tickPositions, d = a.minorTickInterval, m = [],
                    q = a.pointRangePadding || 0, p = a.min -
                    q, q = a.max + q, n = q - p;
                if (n && n / d < a.len / 3) if (a.isLog) c(this.paddedTicks, function (h, b, c) {
                    b && m.push.apply(m, a.getLogTickPositions(d, c[b - 1], c[b], !0))
                }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) m = m.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), p, q, b.startOfWeek)); else for (b = p + (f[0] - p) % d; b <= q && b !== m[0]; b += d) m.push(b);
                0 !== m.length && a.trimTicks(m);
                return m
            },
            adjustForMinRange: function () {
                var a = this.options, b = this.min, f = this.max, d, m, q, p, n, e, A, k;
                this.isXAxis && void 0 === this.minRange && !this.isLog &&
                (w(a.min) || w(a.max) ? this.minRange = null : (c(this.series, function (a) {
                    e = a.xData;
                    for (p = A = a.xIncrement ? 1 : e.length - 1; 0 < p; p--) if (n = e[p] - e[p - 1], void 0 === q || n < q) q = n
                }), this.minRange = Math.min(5 * q, this.dataMax - this.dataMin)));
                f - b < this.minRange && (m = this.dataMax - this.dataMin >= this.minRange, k = this.minRange, d = (k - f + b) / 2, d = [b - d, H(a.min, b - d)], m && (d[2] = this.isLog ? this.log2lin(this.dataMin) : this.dataMin), b = D(d), f = [b + k, H(a.max, b + k)], m && (f[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax), f = r(f), f - b < k && (d[0] = f - k, d[1] =
                    H(a.min, f - k), b = D(d)));
                this.min = b;
                this.max = f
            },
            getClosest: function () {
                var a;
                this.categories ? a = 1 : c(this.series, function (h) {
                    var b = h.closestPointRange, c = h.visible || !h.chart.options.chart.ignoreHiddenSeries;
                    !h.noSharedTooltip && w(b) && c && (a = w(a) ? Math.min(a, b) : b)
                });
                return a
            },
            nameToX: function (a) {
                var h = n(this.categories), c = h ? this.categories : this.names, f = a.options.x, d;
                a.series.requireSorting = !1;
                w(f) || (f = !1 === this.options.uniqueNames ? a.series.autoIncrement() : h ? b(a.name, c) : H(c.keys[a.name], -1));
                -1 === f ? h || (d = c.length) :
                    d = f;
                void 0 !== d && (this.names[d] = a.name, this.names.keys[a.name] = d);
                return d
            },
            updateNames: function () {
                var h = this, b = this.names;
                0 < b.length && (c(a.keys(b.keys), function (a) {
                    delete b.keys[a]
                }), b.length = 0, this.minRange = this.userMinRange, c(this.series || [], function (a) {
                    a.xIncrement = null;
                    if (!a.points || a.isDirtyData) a.processData(), a.generatePoints();
                    c(a.points, function (b, c) {
                        var f;
                        b.options && (f = h.nameToX(b), void 0 !== f && f !== b.x && (b.x = f, a.xData[c] = f))
                    })
                }))
            },
            setAxisTranslation: function (a) {
                var h = this, b = h.max - h.min, f =
                    h.axisPointRange || 0, d, m = 0, q = 0, p = h.linkedParent, n = !!h.categories, e = h.transA,
                    A = h.isXAxis;
                if (A || n || f) d = h.getClosest(), p ? (m = p.minPointOffset, q = p.pointRangePadding) : c(h.series, function (a) {
                    var b = n ? 1 : A ? H(a.options.pointRange, d, 0) : h.axisPointRange || 0;
                    a = a.options.pointPlacement;
                    f = Math.max(f, b);
                    h.single || (m = Math.max(m, J(a) ? 0 : b / 2), q = Math.max(q, "on" === a ? 0 : b))
                }), p = h.ordinalSlope && d ? h.ordinalSlope / d : 1, h.minPointOffset = m *= p, h.pointRangePadding = q *= p, h.pointRange = Math.min(f, b), A && (h.closestPointRange = d);
                a && (h.oldTransA =
                    e);
                h.translationSlope = h.transA = e = h.options.staticScale || h.len / (b + q || 1);
                h.transB = h.horiz ? h.left : h.bottom;
                h.minPixelPadding = e * m;
                k(this, "afterSetAxisTranslation")
            },
            minFromRange: function () {
                return this.max - this.range
            },
            setTickInterval: function (h) {
                var b = this, f = b.chart, d = b.options, m = b.isLog, q = b.isDatetimeAxis, n = b.isXAxis,
                    A = b.isLinked, E = d.maxPadding, g = d.minPadding, B = d.tickInterval, x = d.tickPixelInterval,
                    G = b.categories, u = z(b.threshold) ? b.threshold : null, l = b.softThreshold, t, J, M, r;
                q || G || A || this.getTickAmount();
                M = H(b.userMin, d.min);
                r = H(b.userMax, d.max);
                A ? (b.linkedParent = f[b.coll][d.linkedTo], f = b.linkedParent.getExtremes(), b.min = H(f.min, f.dataMin), b.max = H(f.max, f.dataMax), d.type !== b.linkedParent.options.type && a.error(11, 1)) : (!l && w(u) && (b.dataMin >= u ? (t = u, g = 0) : b.dataMax <= u && (J = u, E = 0)), b.min = H(M, t, b.dataMin), b.max = H(r, J, b.dataMax));
                m && (b.positiveValuesOnly && !h && 0 >= Math.min(b.min, H(b.dataMin, b.min)) && a.error(10, 1), b.min = e(b.log2lin(b.min), 15), b.max = e(b.log2lin(b.max), 15));
                b.range && w(b.max) && (b.userMin = b.min =
                    M = Math.max(b.dataMin, b.minFromRange()), b.userMax = r = b.max, b.range = null);
                k(b, "foundExtremes");
                b.beforePadding && b.beforePadding();
                b.adjustForMinRange();
                !(G || b.axisPointRange || b.usePercentage || A) && w(b.min) && w(b.max) && (f = b.max - b.min) && (!w(M) && g && (b.min -= f * g), !w(r) && E && (b.max += f * E));
                z(d.softMin) && !z(b.userMin) && (b.min = Math.min(b.min, d.softMin));
                z(d.softMax) && !z(b.userMax) && (b.max = Math.max(b.max, d.softMax));
                z(d.floor) && (b.min = Math.max(b.min, d.floor));
                z(d.ceiling) && (b.max = Math.min(b.max, d.ceiling));
                l && w(b.dataMin) &&
                (u = u || 0, !w(M) && b.min < u && b.dataMin >= u ? b.min = u : !w(r) && b.max > u && b.dataMax <= u && (b.max = u));
                b.tickInterval = b.min === b.max || void 0 === b.min || void 0 === b.max ? 1 : A && !B && x === b.linkedParent.options.tickPixelInterval ? B = b.linkedParent.tickInterval : H(B, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, G ? 1 : (b.max - b.min) * x / Math.max(b.len, x));
                n && !h && c(b.series, function (a) {
                    a.processData(b.min !== b.oldMin || b.max !== b.oldMax)
                });
                b.setAxisTranslation(!0);
                b.beforeSetTickPositions && b.beforeSetTickPositions();
                b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                b.pointRange && !B && (b.tickInterval = Math.max(b.pointRange, b.tickInterval));
                h = H(d.minTickInterval, b.isDatetimeAxis && b.closestPointRange);
                !B && b.tickInterval < h && (b.tickInterval = h);
                q || m || B || (b.tickInterval = L(b.tickInterval, null, p(b.tickInterval), H(d.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount));
                this.tickAmount || (b.tickInterval = b.unsquish());
                this.setTickPositions()
            },
            setTickPositions: function () {
                var a =
                    this.options, b, c = a.tickPositions;
                b = this.getMinorTickInterval();
                var f = a.tickPositioner, d = a.startOnTick, m = a.endOnTick;
                this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0;
                this.minorTickInterval = "auto" === b && this.tickInterval ? this.tickInterval / 5 : b;
                this.single = this.min === this.max && w(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals);
                this.tickPositions = b = c && c.slice();
                !b && (b = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,
                    a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), b.length > this.len && (b = [b[0], b.pop()], b[0] === b[1] && (b.length = 1)), this.tickPositions = b, f && (f = f.apply(this, [this.min, this.max]))) && (this.tickPositions = b = f);
                this.paddedTicks = b.slice(0);
                this.trimTicks(b, d, m);
                this.isLinked || (this.single && 2 > b.length && (this.min -= .5, this.max += .5), c ||
                f || this.adjustTickAmount());
                k(this, "afterSetTickPositions")
            },
            trimTicks: function (a, b, c) {
                var h = a[0], f = a[a.length - 1], d = this.minPointOffset || 0;
                if (!this.isLinked) {
                    if (b && -Infinity !== h) this.min = h; else for (; this.min - d > a[0];) a.shift();
                    if (c) this.max = f; else for (; this.max + d < a[a.length - 1];) a.pop();
                    0 === a.length && w(h) && !this.options.tickPositions && a.push((f + h) / 2)
                }
            },
            alignToOthers: function () {
                var a = {}, b, f = this.options;
                !1 === this.chart.options.chart.alignTicks || !1 === f.alignTicks || !1 === f.startOnTick || !1 === f.endOnTick ||
                this.isLog || c(this.chart[this.coll], function (h) {
                    var c = h.options, c = [h.horiz ? c.left : c.top, c.width, c.height, c.pane].join();
                    h.series.length && (a[c] ? b = !0 : a[c] = 1)
                });
                return b
            },
            getTickAmount: function () {
                var a = this.options, b = a.tickAmount, c = a.tickPixelInterval;
                !w(a.tickInterval) && this.len < c && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2);
                !b && this.alignToOthers() && (b = Math.ceil(this.len / c) + 1);
                4 > b && (this.finalTickAmt = b, b = 5);
                this.tickAmount = b
            },
            adjustTickAmount: function () {
                var a = this.tickInterval, b =
                        this.tickPositions, c = this.tickAmount, f = this.finalTickAmt, d = b && b.length,
                    m = H(this.threshold, this.softThreshold ? 0 : null);
                if (this.hasData()) {
                    if (d < c) {
                        for (; b.length < c;) b.length % 2 || this.min === m ? b.push(e(b[b.length - 1] + a)) : b.unshift(e(b[0] - a));
                        this.transA *= (d - 1) / (c - 1);
                        this.min = b[0];
                        this.max = b[b.length - 1]
                    } else d > c && (this.tickInterval *= 2, this.setTickPositions());
                    if (w(f)) {
                        for (a = c = b.length; a--;) (3 === f && 1 === a % 2 || 2 >= f && 0 < a && a < c - 1) && b.splice(a, 1);
                        this.finalTickAmt = void 0
                    }
                }
            },
            setScale: function () {
                var a, b;
                this.oldMin =
                    this.min;
                this.oldMax = this.max;
                this.oldAxisLength = this.len;
                this.setAxisSize();
                b = this.len !== this.oldAxisLength;
                c(this.series, function (b) {
                    if (b.isDirtyData || b.isDirty || b.xAxis.isDirty) a = !0
                });
                b || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty =
                    b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks();
                k(this, "afterSetScale")
            },
            setExtremes: function (a, b, f, m, q) {
                var h = this, p = h.chart;
                f = H(f, !0);
                c(h.series, function (a) {
                    delete a.kdTree
                });
                q = d(q, {min: a, max: b});
                k(h, "setExtremes", q, function () {
                    h.userMin = a;
                    h.userMax = b;
                    h.eventArgs = q;
                    f && p.redraw(m)
                })
            },
            zoom: function (a, b) {
                var h = this.dataMin, c = this.dataMax, f = this.options, d = Math.min(h, H(f.min, h)),
                    f = Math.max(c, H(f.max, c));
                if (a !== this.min || b !== this.max) this.allowZoomOutside || (w(h) &&
                (a < d && (a = d), a > f && (a = f)), w(c) && (b < d && (b = d), b > f && (b = f))), this.displayBtn = void 0 !== a || void 0 !== b, this.setExtremes(a, b, !1, void 0, {trigger: "zoom"});
                return !0
            },
            setAxisSize: function () {
                var b = this.chart, c = this.options, f = c.offsets || [0, 0, 0, 0], d = this.horiz,
                    m = this.width = Math.round(a.relativeLength(H(c.width, b.plotWidth - f[3] + f[1]), b.plotWidth)),
                    q = this.height = Math.round(a.relativeLength(H(c.height, b.plotHeight - f[0] + f[2]), b.plotHeight)),
                    p = this.top = Math.round(a.relativeLength(H(c.top, b.plotTop + f[0]), b.plotHeight, b.plotTop)),
                    c = this.left = Math.round(a.relativeLength(H(c.left, b.plotLeft + f[3]), b.plotWidth, b.plotLeft));
                this.bottom = b.chartHeight - q - p;
                this.right = b.chartWidth - m - c;
                this.len = Math.max(d ? m : q, 0);
                this.pos = d ? c : p
            },
            getExtremes: function () {
                var a = this.isLog;
                return {
                    min: a ? e(this.lin2log(this.min)) : this.min,
                    max: a ? e(this.lin2log(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function (a) {
                var b = this.isLog, h = b ? this.lin2log(this.min) : this.min, b = b ? this.lin2log(this.max) :
                    this.max;
                null === a || -Infinity === a ? a = h : Infinity === a ? a = b : h > a ? a = h : b < a && (a = b);
                return this.translate(a, 0, 1, 0, 1)
            },
            autoLabelAlign: function (a) {
                a = (H(a, 0) - 90 * this.side + 720) % 360;
                return 15 < a && 165 > a ? "right" : 195 < a && 345 > a ? "left" : "center"
            },
            tickSize: function (a) {
                var b = this.options, h = b[a + "Length"], c = H(b[a + "Width"], "tick" === a && this.isXAxis ? 1 : 0);
                if (c && h) return "inside" === b[a + "Position"] && (h = -h), [h, c]
            },
            labelMetrics: function () {
                var a = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
            },
            unsquish: function () {
                var a = this.options.labels, b = this.horiz, f = this.tickInterval, d = f,
                    m = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / f), q, p = a.rotation,
                    n = this.labelMetrics(), A, k = Number.MAX_VALUE, E, z = function (a) {
                        a /= m || 1;
                        a = 1 < a ? Math.ceil(a) : 1;
                        return e(a * f)
                    };
                b ? (E = !a.staggerLines && !a.step && (w(p) ? [p] : m < H(a.autoRotationLimit, 80) && a.autoRotation)) && c(E, function (a) {
                    var b;
                    if (a === p || a && -90 <= a && 90 >= a) A = z(Math.abs(n.h / Math.sin(l * a))), b =
                        A + Math.abs(a / 360), b < k && (k = b, q = a, d = A)
                }) : a.step || (d = z(n.h));
                this.autoRotation = E;
                this.labelRotation = H(q, p);
                return d
            },
            getSlotWidth: function () {
                var a = this.chart, b = this.horiz, c = this.options.labels,
                    f = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), d = a.margin[3];
                return b && 2 > (c.step || 0) && !c.rotation && (this.staggerLines || 1) * this.len / f || !b && (c.style && parseInt(c.style.width, 10) || d && d - a.spacing[3] || .33 * a.chartWidth)
            },
            renderUnsquish: function () {
                var a = this.chart, b = a.renderer, f = this.tickPositions, d = this.ticks,
                    m = this.options.labels, q = this.horiz, p = this.getSlotWidth(),
                    n = Math.max(1, Math.round(p - 2 * (m.padding || 5))), e = {}, A = this.labelMetrics(),
                    k = m.style && m.style.textOverflow, E, z, g = 0, B;
                J(m.rotation) || (e.rotation = m.rotation || 0);
                c(f, function (a) {
                    (a = d[a]) && a.label && a.label.textPxLength > g && (g = a.label.textPxLength)
                });
                this.maxLabelLength = g;
                if (this.autoRotation) g > n && g > A.h ? e.rotation = this.labelRotation : this.labelRotation = 0; else if (p && (E = n, !k)) for (z = "clip", n = f.length; !q && n--;) if (B = f[n], B = d[B].label) B.styles && "ellipsis" ===
                B.styles.textOverflow ? B.css({textOverflow: "clip"}) : B.textPxLength > p && B.css({width: p + "px"}), B.getBBox().height > this.len / f.length - (A.h - A.f) && (B.specificTextOverflow = "ellipsis");
                e.rotation && (E = g > .5 * a.chartHeight ? .33 * a.chartHeight : a.chartHeight, k || (z = "ellipsis"));
                if (this.labelAlign = m.align || this.autoLabelAlign(this.labelRotation)) e.align = this.labelAlign;
                c(f, function (a) {
                    var b = (a = d[a]) && a.label, h = {};
                    b && (b.attr(e), !E || m.style && m.style.width || !(E < b.textPxLength || "SPAN" === b.element.tagName) || (h.width = E, k ||
                    (h.textOverflow = b.specificTextOverflow || z), b.css(h)), delete b.specificTextOverflow, a.rotation = e.rotation)
                });
                this.tickRotCorr = b.rotCorr(A.b, this.labelRotation || 0, 0 !== this.side)
            },
            hasData: function () {
                return this.hasVisibleSeries || w(this.min) && w(this.max) && this.tickPositions && 0 < this.tickPositions.length
            },
            addTitle: function (a) {
                var b = this.chart.renderer, h = this.horiz, c = this.opposite, f = this.options.title, d;
                this.axisTitle || ((d = f.textAlign) || (d = (h ? {low: "left", middle: "center", high: "right"} : {
                    low: c ? "right" : "left",
                    middle: "center", high: c ? "left" : "right"
                })[f.align]), this.axisTitle = b.text(f.text, 0, 0, f.useHTML).attr({
                    zIndex: 7,
                    rotation: f.rotation || 0,
                    align: d
                }).addClass("highcharts-axis-title").css(q(f.style)).add(this.axisGroup), this.axisTitle.isNew = !0);
                f.style.width || this.isRadial || this.axisTitle.css({width: this.len});
                this.axisTitle[a ? "show" : "hide"](!0)
            },
            generateTick: function (a) {
                var b = this.ticks;
                b[a] ? b[a].addLabel() : b[a] = new M(this, a)
            },
            getOffset: function () {
                var a = this, b = a.chart, f = b.renderer, d = a.options, m = a.tickPositions,
                    q = a.ticks, p = a.horiz, n = a.side, e = b.inverted && !a.isZAxis ? [1, 0, 3, 2][n] : n, A, k,
                    E = 0, z, g = 0, x = d.title, G = d.labels, u = 0, l = b.axisOffset, b = b.clipOffset,
                    t = [-1, 1, 1, -1][n], J = d.className, M = a.axisParent, r = this.tickSize("tick");
                A = a.hasData();
                a.showAxis = k = A || H(d.showEmpty, !0);
                a.staggerLines = a.horiz && G.staggerLines;
                a.axisGroup || (a.gridGroup = f.g("grid").attr({zIndex: d.gridZIndex || 1}).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (J || "")).add(M), a.axisGroup = f.g("axis").attr({zIndex: d.zIndex || 2}).addClass("highcharts-" +
                    this.coll.toLowerCase() + " " + (J || "")).add(M), a.labelGroup = f.g("axis-labels").attr({zIndex: G.zIndex || 7}).addClass("highcharts-" + a.coll.toLowerCase() + "-labels " + (J || "")).add(M));
                A || a.isLinked ? (c(m, function (b, f) {
                    a.generateTick(b, f)
                }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === n || 2 === n || {
                    1: "left",
                    3: "right"
                }[n] === a.labelAlign, H(G.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && c(m, function (a) {
                    u = Math.max(q[a].getLabelSize(), u)
                }), a.staggerLines && (u *= a.staggerLines), a.labelOffset = u *
                    (a.opposite ? -1 : 1)) : B(q, function (a, b) {
                    a.destroy();
                    delete q[b]
                });
                x && x.text && !1 !== x.enabled && (a.addTitle(k), k && !1 !== x.reserveSpace && (a.titleOffset = E = a.axisTitle.getBBox()[p ? "height" : "width"], z = x.offset, g = w(z) ? 0 : H(x.margin, p ? 5 : 10)));
                a.renderLine();
                a.offset = t * H(d.offset, l[n]);
                a.tickRotCorr = a.tickRotCorr || {x: 0, y: 0};
                f = 0 === n ? -a.labelMetrics().h : 2 === n ? a.tickRotCorr.y : 0;
                g = Math.abs(u) + g;
                u && (g = g - f + t * (p ? H(G.y, a.tickRotCorr.y + 8 * t) : G.x));
                a.axisTitleMargin = H(z, g);
                l[n] = Math.max(l[n], a.axisTitleMargin + E + t * a.offset,
                    g, A && m.length && r ? r[0] + t * a.offset : 0);
                d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2);
                b[e] = Math.max(b[e], d)
            },
            getLinePath: function (a) {
                var b = this.chart, f = this.opposite, c = this.offset, h = this.horiz,
                    d = this.left + (f ? this.width : 0) + c,
                    c = b.chartHeight - this.bottom - (f ? this.height : 0) + c;
                f && (a *= -1);
                return b.renderer.crispLine(["M", h ? this.left : d, h ? c : this.top, "L", h ? b.chartWidth - this.right : d, h ? c : b.chartHeight - this.bottom], a)
            },
            renderLine: function () {
                this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                    this.axisLine.attr({
                        stroke: this.options.lineColor,
                        "stroke-width": this.options.lineWidth,
                        zIndex: 7
                    }))
            },
            getTitlePosition: function () {
                var a = this.horiz, b = this.left, f = this.top, c = this.len, d = this.options.title, m = a ? b : f,
                    q = this.opposite, p = this.offset, n = d.x || 0, e = d.y || 0, A = this.axisTitle,
                    k = this.chart.renderer.fontMetrics(d.style && d.style.fontSize, A),
                    A = Math.max(A.getBBox(null, 0).height - k.h - 1, 0),
                    c = {low: m + (a ? 0 : c), middle: m + c / 2, high: m + (a ? c : 0)}[d.align],
                    b = (a ? f + this.height : b) + (a ? 1 : -1) * (q ? -1 : 1) * this.axisTitleMargin + [-A,
                        A, k.f, -A][this.side];
                return {
                    x: a ? c + n : b + (q ? this.width : 0) + p + n,
                    y: a ? b + e - (q ? this.height : 0) + p : c + e
                }
            },
            renderMinorTick: function (a) {
                var b = this.chart.hasRendered && z(this.oldMin), f = this.minorTicks;
                f[a] || (f[a] = new M(this, a, "minor"));
                b && f[a].isNew && f[a].render(null, !0);
                f[a].render(null, !1, 1)
            },
            renderTick: function (a, b) {
                var f = this.isLinked, c = this.ticks, d = this.chart.hasRendered && z(this.oldMin);
                if (!f || a >= this.min && a <= this.max) c[a] || (c[a] = new M(this, a)), d && c[a].isNew && c[a].render(b, !0, .1), c[a].render(b)
            },
            render: function () {
                var b =
                        this, f = b.chart, d = b.options, m = b.isLog, q = b.isLinked, p = b.tickPositions, n = b.axisTitle,
                    e = b.ticks, E = b.minorTicks, g = b.alternateBands, x = d.stackLabels, G = d.alternateGridColor,
                    u = b.tickmarkOffset, l = b.axisLine, H = b.showAxis, t = F(f.renderer.globalAnimation), J, r;
                b.labelEdge.length = 0;
                b.overlap = !1;
                c([e, E, g], function (a) {
                    B(a, function (a) {
                        a.isActive = !1
                    })
                });
                if (b.hasData() || q) b.minorTickInterval && !b.categories && c(b.getMinorTickPositions(), function (a) {
                    b.renderMinorTick(a)
                }), p.length && (c(p, function (a, f) {
                    b.renderTick(a, f)
                }),
                u && (0 === b.min || b.single) && (e[-1] || (e[-1] = new M(b, -1, null, !0)), e[-1].render(-1))), G && c(p, function (c, d) {
                    r = void 0 !== p[d + 1] ? p[d + 1] + u : b.max - u;
                    0 === d % 2 && c < b.max && r <= b.max + (f.polar ? -u : u) && (g[c] || (g[c] = new a.PlotLineOrBand(b)), J = c + u, g[c].options = {
                        from: m ? b.lin2log(J) : J,
                        to: m ? b.lin2log(r) : r,
                        color: G
                    }, g[c].render(), g[c].isActive = !0)
                }), b._addedPlotLB || (c((d.plotLines || []).concat(d.plotBands || []), function (a) {
                    b.addPlotBandOrLine(a)
                }), b._addedPlotLB = !0);
                c([e, E, g], function (a) {
                    var b, c = [], d = t.duration;
                    B(a, function (a,
                                   b) {
                        a.isActive || (a.render(b, !1, 0), a.isActive = !1, c.push(b))
                    });
                    A(function () {
                        for (b = c.length; b--;) a[c[b]] && !a[c[b]].isActive && (a[c[b]].destroy(), delete a[c[b]])
                    }, a !== g && f.hasRendered && d ? d : 0)
                });
                l && (l[l.isPlaced ? "animate" : "attr"]({d: this.getLinePath(l.strokeWidth())}), l.isPlaced = !0, l[H ? "show" : "hide"](!0));
                n && H && (d = b.getTitlePosition(), z(d.y) ? (n[n.isNew ? "attr" : "animate"](d), n.isNew = !1) : (n.attr("y", -9999), n.isNew = !0));
                x && x.enabled && b.renderStackTotals();
                b.isDirty = !1;
                k(this, "afterRender")
            },
            redraw: function () {
                this.visible &&
                (this.render(), c(this.plotLinesAndBands, function (a) {
                    a.render()
                }));
                c(this.series, function (a) {
                    a.isDirty = !0
                })
            },
            keepProps: "extKey hcEvents names series userMax userMin".split(" "),
            destroy: function (a) {
                var f = this, d = f.stacks, h = f.plotLinesAndBands, q;
                k(this, "destroy", {keepEvents: a});
                a || m(f);
                B(d, function (a, b) {
                    u(a);
                    d[b] = null
                });
                c([f.ticks, f.minorTicks, f.alternateBands], function (a) {
                    u(a)
                });
                if (h) for (a = h.length; a--;) h[a].destroy();
                c("stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross".split(" "),
                    function (a) {
                        f[a] && (f[a] = f[a].destroy())
                    });
                for (q in f.plotLinesAndBandsGroups) f.plotLinesAndBandsGroups[q] = f.plotLinesAndBandsGroups[q].destroy();
                B(f, function (a, c) {
                    -1 === b(c, f.keepProps) && delete f[c]
                })
            },
            drawCrosshair: function (a, b) {
                var f, c = this.crosshair, d = H(c.snap, !0), h, m = this.cross;
                k(this, "drawCrosshair", {e: a, point: b});
                a || (a = this.cross && this.cross.e);
                if (this.crosshair && !1 !== (w(b) || !d)) {
                    d ? w(b) && (h = H(b.crosshairPos, this.isXAxis ? b.plotX : this.len - b.plotY)) : h = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY +
                        this.pos);
                    w(h) && (f = this.getPlotLinePath(b && (this.isXAxis ? b.x : H(b.stackY, b.y)), null, null, null, h) || null);
                    if (!w(f)) {
                        this.hideCrosshair();
                        return
                    }
                    d = this.categories && !this.isRadial;
                    m || (this.cross = m = this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" + (d ? "category " : "thin ") + c.className).attr({zIndex: H(c.zIndex, 2)}).add(), m.attr({
                        stroke: c.color || (d ? g("#ccd6eb").setOpacity(.25).get() : "#cccccc"),
                        "stroke-width": H(c.width, 1)
                    }).css({"pointer-events": "none"}), c.dashStyle && m.attr({dashstyle: c.dashStyle}));
                    m.show().attr({d: f});
                    d && !c.width && m.attr({"stroke-width": this.transA});
                    this.cross.e = a
                } else this.hideCrosshair();
                k(this, "afterDrawCrosshair", {e: a, point: b})
            },
            hideCrosshair: function () {
                this.cross && this.cross.hide()
            }
        });
        return a.Axis = G
    }(K);
    (function (a) {
        var C = a.Axis, F = a.getMagnitude, D = a.normalizeTickInterval, r = a.timeUnits;
        C.prototype.getTimeTicks = function () {
            return this.chart.time.getTimeTicks.apply(this.chart.time, arguments)
        };
        C.prototype.normalizeTimeTickInterval = function (a, e) {
            var g = e || [["millisecond", [1,
                2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1, 2]], ["month", [1, 2, 3, 4, 6]], ["year", null]];
            e = g[g.length - 1];
            var w = r[e[0]], l = e[1], u;
            for (u = 0; u < g.length && !(e = g[u], w = r[e[0]], l = e[1], g[u + 1] && a <= (w * l[l.length - 1] + r[g[u + 1][0]]) / 2); u++) ;
            w === r.year && a < 5 * w && (l = [1, 2, 5]);
            a = D(a / w, l, "year" === e[0] ? Math.max(F(a / w), 1) : 1);
            return {unitRange: w, count: a, unitName: e[0]}
        }
    })(K);
    (function (a) {
        var C = a.Axis, F = a.getMagnitude, D = a.map, r = a.normalizeTickInterval,
            g = a.pick;
        C.prototype.getLogTickPositions = function (a, t, w, l) {
            var e = this.options, c = this.len, d = [];
            l || (this._minorAutoInterval = null);
            if (.5 <= a) a = Math.round(a), d = this.getLinearTickPositions(a, t, w); else if (.08 <= a) for (var c = Math.floor(t), k, x, p, f, b, e = .3 < a ? [1, 2, 4] : .15 < a ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; c < w + 1 && !b; c++) for (x = e.length, k = 0; k < x && !b; k++) p = this.log2lin(this.lin2log(c) * e[k]), p > t && (!l || f <= w) && void 0 !== f && d.push(f), f > w && (b = !0), f = p; else t = this.lin2log(t), w = this.lin2log(w), a = l ? this.getMinorTickInterval() :
                e.tickInterval, a = g("auto" === a ? null : a, this._minorAutoInterval, e.tickPixelInterval / (l ? 5 : 1) * (w - t) / ((l ? c / this.tickPositions.length : c) || 1)), a = r(a, null, F(a)), d = D(this.getLinearTickPositions(a, t, w), this.log2lin), l || (this._minorAutoInterval = a / 5);
            l || (this.tickInterval = a);
            return d
        };
        C.prototype.log2lin = function (a) {
            return Math.log(a) / Math.LN10
        };
        C.prototype.lin2log = function (a) {
            return Math.pow(10, a)
        }
    })(K);
    (function (a, C) {
        var F = a.arrayMax, D = a.arrayMin, r = a.defined, g = a.destroyObjectProperties, e = a.each, t = a.erase, w =
            a.merge, l = a.pick;
        a.PlotLineOrBand = function (a, c) {
            this.axis = a;
            c && (this.options = c, this.id = c.id)
        };
        a.PlotLineOrBand.prototype = {
            render: function () {
                var e = this, c = e.axis, d = c.horiz, k = e.options, g = k.label, p = e.label, f = k.to, b = k.from,
                    n = k.value, z = r(b) && r(f), J = r(n), q = e.svgElem, t = !q, B = [], H = k.color,
                    m = l(k.zIndex, 0), E = k.events,
                    B = {"class": "highcharts-plot-" + (z ? "band " : "line ") + (k.className || "")}, A = {},
                    M = c.chart.renderer, G = z ? "bands" : "lines";
                c.isLog && (b = c.log2lin(b), f = c.log2lin(f), n = c.log2lin(n));
                J ? (B = {stroke: H, "stroke-width": k.width},
                k.dashStyle && (B.dashstyle = k.dashStyle)) : z && (H && (B.fill = H), k.borderWidth && (B.stroke = k.borderColor, B["stroke-width"] = k.borderWidth));
                A.zIndex = m;
                G += "-" + m;
                (H = c.plotLinesAndBandsGroups[G]) || (c.plotLinesAndBandsGroups[G] = H = M.g("plot-" + G).attr(A).add());
                t && (e.svgElem = q = M.path().attr(B).add(H));
                if (J) B = c.getPlotLinePath(n, q.strokeWidth()); else if (z) B = c.getPlotBandPath(b, f, k); else return;
                t && B && B.length ? (q.attr({d: B}), E && a.objectEach(E, function (a, b) {
                    q.on(b, function (a) {
                        E[b].apply(e, [a])
                    })
                })) : q && (B ? (q.show(),
                    q.animate({d: B})) : (q.hide(), p && (e.label = p = p.destroy())));
                g && r(g.text) && B && B.length && 0 < c.width && 0 < c.height && !B.flat ? (g = w({
                    align: d && z && "center",
                    x: d ? !z && 4 : 10,
                    verticalAlign: !d && z && "middle",
                    y: d ? z ? 16 : 10 : z ? 6 : -4,
                    rotation: d && !z && 90
                }, g), this.renderLabel(g, B, z, m)) : p && p.hide();
                return e
            }, renderLabel: function (a, c, d, e) {
                var k = this.label, p = this.axis.chart.renderer;
                k || (k = {
                    align: a.textAlign || a.align,
                    rotation: a.rotation,
                    "class": "highcharts-plot-" + (d ? "band" : "line") + "-label " + (a.className || "")
                }, k.zIndex = e, this.label = k =
                    p.text(a.text, 0, 0, a.useHTML).attr(k).add(), k.css(a.style));
                e = c.xBounds || [c[1], c[4], d ? c[6] : c[1]];
                c = c.yBounds || [c[2], c[5], d ? c[7] : c[2]];
                d = D(e);
                p = D(c);
                k.align(a, !1, {x: d, y: p, width: F(e) - d, height: F(c) - p});
                k.show()
            }, destroy: function () {
                t(this.axis.plotLinesAndBands, this);
                delete this.axis;
                g(this)
            }
        };
        a.extend(C.prototype, {
            getPlotBandPath: function (a, c) {
                var d = this.getPlotLinePath(c, null, null, !0), e = this.getPlotLinePath(a, null, null, !0), g = [],
                    p = this.horiz, f = 1, b;
                a = a < this.min && c < this.min || a > this.max && c > this.max;
                if (e &&
                    d) for (a && (b = e.toString() === d.toString(), f = 0), a = 0; a < e.length; a += 6) p && d[a + 1] === e[a + 1] ? (d[a + 1] += f, d[a + 4] += f) : p || d[a + 2] !== e[a + 2] || (d[a + 2] += f, d[a + 5] += f), g.push("M", e[a + 1], e[a + 2], "L", e[a + 4], e[a + 5], d[a + 4], d[a + 5], d[a + 1], d[a + 2], "z"), g.flat = b;
                return g
            }, addPlotBand: function (a) {
                return this.addPlotBandOrLine(a, "plotBands")
            }, addPlotLine: function (a) {
                return this.addPlotBandOrLine(a, "plotLines")
            }, addPlotBandOrLine: function (e, c) {
                var d = (new a.PlotLineOrBand(this, e)).render(), k = this.userOptions;
                d && (c && (k[c] = k[c] || [],
                    k[c].push(e)), this.plotLinesAndBands.push(d));
                return d
            }, removePlotBandOrLine: function (a) {
                for (var c = this.plotLinesAndBands, d = this.options, k = this.userOptions, g = c.length; g--;) c[g].id === a && c[g].destroy();
                e([d.plotLines || [], k.plotLines || [], d.plotBands || [], k.plotBands || []], function (c) {
                    for (g = c.length; g--;) c[g].id === a && t(c, c[g])
                })
            }, removePlotBand: function (a) {
                this.removePlotBandOrLine(a)
            }, removePlotLine: function (a) {
                this.removePlotBandOrLine(a)
            }
        })
    })(K, V);
    (function (a) {
        var C = a.each, F = a.extend, D = a.format, r = a.isNumber,
            g = a.map, e = a.merge, t = a.pick, w = a.splat, l = a.syncTimeout, u = a.timeUnits;
        a.Tooltip = function () {
            this.init.apply(this, arguments)
        };
        a.Tooltip.prototype = {
            init: function (a, d) {
                this.chart = a;
                this.options = d;
                this.crosshairs = [];
                this.now = {x: 0, y: 0};
                this.isHidden = !0;
                this.split = d.split && !a.inverted;
                this.shared = d.shared || this.split
            }, cleanSplit: function (a) {
                C(this.chart.series, function (c) {
                    var d = c && c.tt;
                    d && (!d.isActive || a ? c.tt = d.destroy() : d.isActive = !1)
                })
            }, getLabel: function () {
                var a = this.chart.renderer, d = this.options;
                this.label ||
                (this.split ? this.label = a.g("tooltip") : (this.label = a.label("", 0, 0, d.shape || "callout", null, null, d.useHTML, null, "tooltip").attr({
                    padding: d.padding,
                    r: d.borderRadius
                }), this.label.attr({
                    fill: d.backgroundColor,
                    "stroke-width": d.borderWidth
                }).css(d.style).shadow(d.shadow)), this.label.attr({zIndex: 8}).add());
                return this.label
            }, update: function (a) {
                this.destroy();
                e(!0, this.chart.options.tooltip.userOptions, a);
                this.init(this.chart, e(!0, this.options, a))
            }, destroy: function () {
                this.label && (this.label = this.label.destroy());
                this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy());
                a.clearTimeout(this.hideTimer);
                a.clearTimeout(this.tooltipTimeout)
            }, move: function (c, d, e, g) {
                var p = this, f = p.now,
                    b = !1 !== p.options.animation && !p.isHidden && (1 < Math.abs(c - f.x) || 1 < Math.abs(d - f.y)),
                    n = p.followPointer || 1 < p.len;
                F(f, {
                    x: b ? (2 * f.x + c) / 3 : c,
                    y: b ? (f.y + d) / 2 : d,
                    anchorX: n ? void 0 : b ? (2 * f.anchorX + e) / 3 : e,
                    anchorY: n ? void 0 : b ? (f.anchorY + g) / 2 : g
                });
                p.getLabel().attr(f);
                b && (a.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
                    p &&
                    p.move(c, d, e, g)
                }, 32))
            }, hide: function (c) {
                var d = this;
                a.clearTimeout(this.hideTimer);
                c = t(c, this.options.hideDelay, 500);
                this.isHidden || (this.hideTimer = l(function () {
                    d.getLabel()[c ? "fadeOut" : "hide"]();
                    d.isHidden = !0
                }, c))
            }, getAnchor: function (a, d) {
                var c, e = this.chart, p = e.inverted, f = e.plotTop, b = e.plotLeft, n = 0, z = 0, l, q;
                a = w(a);
                c = a[0].tooltipPos;
                this.followPointer && d && (void 0 === d.chartX && (d = e.pointer.normalize(d)), c = [d.chartX - e.plotLeft, d.chartY - f]);
                c || (C(a, function (a) {
                    l = a.series.yAxis;
                    q = a.series.xAxis;
                    n += a.plotX +
                        (!p && q ? q.left - b : 0);
                    z += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!p && l ? l.top - f : 0)
                }), n /= a.length, z /= a.length, c = [p ? e.plotWidth - z : n, this.shared && !p && 1 < a.length && d ? d.chartY - f : p ? e.plotHeight - n : z]);
                return g(c, Math.round)
            }, getPosition: function (a, d, e) {
                var c = this.chart, p = this.distance, f = {}, b = c.inverted && e.h || 0, n,
                    g = ["y", c.chartHeight, d, e.plotY + c.plotTop, c.plotTop, c.plotTop + c.plotHeight],
                    k = ["x", c.chartWidth, a, e.plotX + c.plotLeft, c.plotLeft, c.plotLeft + c.plotWidth],
                    q = !this.followPointer && t(e.ttBelow, !c.inverted ===
                        !!e.negative), l = function (a, c, d, m, h, e) {
                        var n = d < m - p, A = m + p + d < c, g = m - p - d;
                        m += p;
                        if (q && A) f[a] = m; else if (!q && n) f[a] = g; else if (n) f[a] = Math.min(e - d, 0 > g - b ? g : g - b); else if (A) f[a] = Math.max(h, m + b + d > c ? m : m + b); else return !1
                    }, B = function (a, b, c, d) {
                        var h;
                        d < p || d > b - p ? h = !1 : f[a] = d < c / 2 ? 1 : d > b - c / 2 ? b - c - 2 : d - c / 2;
                        return h
                    }, H = function (a) {
                        var b = g;
                        g = k;
                        k = b;
                        n = a
                    }, m = function () {
                        !1 !== l.apply(0, g) ? !1 !== B.apply(0, k) || n || (H(!0), m()) : n ? f.x = f.y = 0 : (H(!0), m())
                    };
                (c.inverted || 1 < this.len) && H();
                m();
                return f
            }, defaultFormatter: function (a) {
                var c = this.points ||
                    w(this), e;
                e = [a.tooltipFooterHeaderFormatter(c[0])];
                e = e.concat(a.bodyFormatter(c));
                e.push(a.tooltipFooterHeaderFormatter(c[0], !0));
                return e
            }, refresh: function (c, d) {
                var e, g = this.options, p, f = c, b, n = {}, z = [];
                e = g.formatter || this.defaultFormatter;
                var n = this.shared, l;
                g.enabled && (a.clearTimeout(this.hideTimer), this.followPointer = w(f)[0].series.tooltipOptions.followPointer, b = this.getAnchor(f, d), d = b[0], p = b[1], !n || f.series && f.series.noSharedTooltip ? n = f.getLabelConfig() : (C(f, function (a) {
                    a.setState("hover");
                    z.push(a.getLabelConfig())
                }),
                    n = {
                        x: f[0].category,
                        y: f[0].y
                    }, n.points = z, f = f[0]), this.len = z.length, n = e.call(n, this), l = f.series, this.distance = t(l.tooltipOptions.distance, 16), !1 === n ? this.hide() : (e = this.getLabel(), this.isHidden && e.attr({opacity: 1}).show(), this.split ? this.renderSplit(n, w(c)) : (g.style.width || e.css({width: this.chart.spacingBox.width}), e.attr({text: n && n.join ? n.join("") : n}), e.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + t(f.colorIndex, l.colorIndex)), e.attr({
                    stroke: g.borderColor || f.color || l.color ||
                    "#666666"
                }), this.updatePosition({
                    plotX: d,
                    plotY: p,
                    negative: f.negative,
                    ttBelow: f.ttBelow,
                    h: b[2] || 0
                })), this.isHidden = !1))
            }, renderSplit: function (c, d) {
                var e = this, g = [], p = this.chart, f = p.renderer, b = !0, n = this.options, z = 0,
                    l = this.getLabel();
                a.isString(c) && (c = [!1, c]);
                C(c.slice(0, d.length + 1), function (a, c) {
                    if (!1 !== a) {
                        c = d[c - 1] || {isHeader: !0, plotX: d[0].plotX};
                        var q = c.series || e, k = q.tt, m = c.series || {},
                            E = "highcharts-color-" + t(c.colorIndex, m.colorIndex, "none");
                        k || (q.tt = k = f.label(null, null, null, "callout", null, null, n.useHTML).addClass("highcharts-tooltip-box " +
                            E).attr({
                            padding: n.padding,
                            r: n.borderRadius,
                            fill: n.backgroundColor,
                            stroke: n.borderColor || c.color || m.color || "#333333",
                            "stroke-width": n.borderWidth
                        }).add(l));
                        k.isActive = !0;
                        k.attr({text: a});
                        k.css(n.style).shadow(n.shadow);
                        a = k.getBBox();
                        m = a.width + k.strokeWidth();
                        c.isHeader ? (z = a.height, m = Math.max(0, Math.min(c.plotX + p.plotLeft - m / 2, p.chartWidth - m))) : m = c.plotX + p.plotLeft - t(n.distance, 16) - m;
                        0 > m && (b = !1);
                        a = (c.series && c.series.yAxis && c.series.yAxis.pos) + (c.plotY || 0);
                        a -= p.plotTop;
                        g.push({
                            target: c.isHeader ? p.plotHeight +
                                z : a, rank: c.isHeader ? 1 : 0, size: q.tt.getBBox().height + 1, point: c, x: m, tt: k
                        })
                    }
                });
                this.cleanSplit();
                a.distribute(g, p.plotHeight + z);
                C(g, function (a) {
                    var c = a.point, f = c.series;
                    a.tt.attr({
                        visibility: void 0 === a.pos ? "hidden" : "inherit",
                        x: b || c.isHeader ? a.x : c.plotX + p.plotLeft + t(n.distance, 16),
                        y: a.pos + p.plotTop,
                        anchorX: c.isHeader ? c.plotX + p.plotLeft : c.plotX + f.xAxis.pos,
                        anchorY: c.isHeader ? a.pos + p.plotTop - 15 : c.plotY + f.yAxis.pos
                    })
                })
            }, updatePosition: function (a) {
                var c = this.chart, e = this.getLabel(), e = (this.options.positioner ||
                    this.getPosition).call(this, e.width, e.height, a);
                this.move(Math.round(e.x), Math.round(e.y || 0), a.plotX + c.plotLeft, a.plotY + c.plotTop)
            }, getDateFormat: function (a, d, e, g) {
                var c = this.chart.time, f = c.dateFormat("%m-%d %H:%M:%S.%L", d), b, n,
                    k = {millisecond: 15, second: 12, minute: 9, hour: 6, day: 3}, l = "millisecond";
                for (n in u) {
                    if (a === u.week && +c.dateFormat("%w", d) === e && "00:00:00.000" === f.substr(6)) {
                        n = "week";
                        break
                    }
                    if (u[n] > a) {
                        n = l;
                        break
                    }
                    if (k[n] && f.substr(k[n]) !== "01-01 00:00:00.000".substr(k[n])) break;
                    "week" !== n && (l = n)
                }
                n &&
                (b = g[n]);
                return b
            }, getXDateFormat: function (a, d, e) {
                d = d.dateTimeLabelFormats;
                var c = e && e.closestPointRange;
                return (c ? this.getDateFormat(c, a.x, e.options.startOfWeek, d) : d.day) || d.year
            }, tooltipFooterHeaderFormatter: function (a, d) {
                d = d ? "footer" : "header";
                var c = a.series, e = c.tooltipOptions, p = e.xDateFormat, f = c.xAxis,
                    b = f && "datetime" === f.options.type && r(a.key), n = e[d + "Format"];
                b && !p && (p = this.getXDateFormat(a, e, f));
                b && p && C(a.point && a.point.tooltipDateKeys || ["key"], function (a) {
                    n = n.replace("{point." + a + "}", "{point." +
                        a + ":" + p + "}")
                });
                return D(n, {point: a, series: c}, this.chart.time)
            }, bodyFormatter: function (a) {
                return g(a, function (a) {
                    var c = a.series.tooltipOptions;
                    return (c[(a.point.formatPrefix || "point") + "Formatter"] || a.point.tooltipFormatter).call(a.point, c[(a.point.formatPrefix || "point") + "Format"])
                })
            }
        }
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.attr, D = a.charts, r = a.color, g = a.css, e = a.defined, t = a.each, w = a.extend,
            l = a.find, u = a.fireEvent, c = a.isNumber, d = a.isObject, k = a.offset, x = a.pick, p = a.splat,
            f = a.Tooltip;
        a.Pointer = function (a,
                              c) {
            this.init(a, c)
        };
        a.Pointer.prototype = {
            init: function (a, c) {
                this.options = c;
                this.chart = a;
                this.runChartClick = c.chart.events && !!c.chart.events.click;
                this.pinchDown = [];
                this.lastValidTouch = {};
                f && (a.tooltip = new f(a, c.tooltip), this.followTouchMove = x(c.tooltip.followTouchMove, !0));
                this.setDOMEvents()
            }, zoomOption: function (a) {
                var b = this.chart, c = b.options.chart, f = c.zoomType || "", b = b.inverted;
                /touch/.test(a.type) && (f = x(c.pinchType, f));
                this.zoomX = a = /x/.test(f);
                this.zoomY = f = /y/.test(f);
                this.zoomHor = a && !b || f && b;
                this.zoomVert =
                    f && !b || a && b;
                this.hasZoom = a || f
            }, normalize: function (a, c) {
                var b;
                b = a.touches ? a.touches.length ? a.touches.item(0) : a.changedTouches[0] : a;
                c || (this.chartPosition = c = k(this.chart.container));
                return w(a, {chartX: Math.round(b.pageX - c.left), chartY: Math.round(b.pageY - c.top)})
            }, getCoordinates: function (a) {
                var b = {xAxis: [], yAxis: []};
                t(this.chart.axes, function (c) {
                    b[c.isXAxis ? "xAxis" : "yAxis"].push({axis: c, value: c.toValue(a[c.horiz ? "chartX" : "chartY"])})
                });
                return b
            }, findNearestKDPoint: function (a, c, f) {
                var b;
                t(a, function (a) {
                    var e =
                        !(a.noSharedTooltip && c) && 0 > a.options.findNearestPointBy.indexOf("y");
                    a = a.searchPoint(f, e);
                    if ((e = d(a, !0)) && !(e = !d(b, !0))) var e = b.distX - a.distX, p = b.dist - a.dist,
                        q = (a.series.group && a.series.group.zIndex) - (b.series.group && b.series.group.zIndex),
                        e = 0 < (0 !== e && c ? e : 0 !== p ? p : 0 !== q ? q : b.series.index > a.series.index ? -1 : 1);
                    e && (b = a)
                });
                return b
            }, getPointFromEvent: function (a) {
                a = a.target;
                for (var b; a && !b;) b = a.point, a = a.parentNode;
                return b
            }, getChartCoordinatesFromPoint: function (a, c) {
                var b = a.series, f = b.xAxis, b = b.yAxis, d =
                    x(a.clientX, a.plotX), e = a.shapeArgs;
                if (f && b) return c ? {
                    chartX: f.len + f.pos - d,
                    chartY: b.len + b.pos - a.plotY
                } : {chartX: d + f.pos, chartY: a.plotY + b.pos};
                if (e && e.x && e.y) return {chartX: e.x, chartY: e.y}
            }, getHoverData: function (b, c, f, e, p, g, k) {
                var q, m = [], n = k && k.isBoosting;
                e = !(!e || !b);
                k = c && !c.stickyTracking ? [c] : a.grep(f, function (a) {
                    return a.visible && !(!p && a.directTouch) && x(a.options.enableMouseTracking, !0) && a.stickyTracking
                });
                c = (q = e ? b : this.findNearestKDPoint(k, p, g)) && q.series;
                q && (p && !c.noSharedTooltip ? (k = a.grep(f, function (a) {
                    return a.visible &&
                        !(!p && a.directTouch) && x(a.options.enableMouseTracking, !0) && !a.noSharedTooltip
                }), t(k, function (a) {
                    var b = l(a.points, function (a) {
                        return a.x === q.x && !a.isNull
                    });
                    d(b) && (n && (b = a.getPoint(b)), m.push(b))
                })) : m.push(q));
                return {hoverPoint: q, hoverSeries: c, hoverPoints: m}
            }, runPointActions: function (b, c) {
                var f = this.chart, d = f.tooltip && f.tooltip.options.enabled ? f.tooltip : void 0,
                    e = d ? d.shared : !1, p = c || f.hoverPoint, n = p && p.series || f.hoverSeries,
                    n = this.getHoverData(p, n, f.series, !!c || n && n.directTouch && this.isDirectTouch, e,
                        b, {isBoosting: f.isBoosting}), g, p = n.hoverPoint;
                g = n.hoverPoints;
                c = (n = n.hoverSeries) && n.tooltipOptions.followPointer;
                e = e && n && !n.noSharedTooltip;
                if (p && (p !== f.hoverPoint || d && d.isHidden)) {
                    t(f.hoverPoints || [], function (b) {
                        -1 === a.inArray(b, g) && b.setState()
                    });
                    t(g || [], function (a) {
                        a.setState("hover")
                    });
                    if (f.hoverSeries !== n) n.onMouseOver();
                    f.hoverPoint && f.hoverPoint.firePointEvent("mouseOut");
                    if (!p.series) return;
                    p.firePointEvent("mouseOver");
                    f.hoverPoints = g;
                    f.hoverPoint = p;
                    d && d.refresh(e ? g : p, b)
                } else c && d && !d.isHidden &&
                (p = d.getAnchor([{}], b), d.updatePosition({plotX: p[0], plotY: p[1]}));
                this.unDocMouseMove || (this.unDocMouseMove = C(f.container.ownerDocument, "mousemove", function (b) {
                    var c = D[a.hoverChartIndex];
                    if (c) c.pointer.onDocumentMouseMove(b)
                }));
                t(f.axes, function (c) {
                    var f = x(c.crosshair.snap, !0), d = f ? a.find(g, function (a) {
                        return a.series[c.coll] === c
                    }) : void 0;
                    d || !f ? c.drawCrosshair(b, d) : c.hideCrosshair()
                })
            }, reset: function (a, c) {
                var b = this.chart, f = b.hoverSeries, d = b.hoverPoint, e = b.hoverPoints, n = b.tooltip,
                    g = n && n.shared ? e : d;
                a && g && t(p(g), function (b) {
                    b.series.isCartesian && void 0 === b.plotX && (a = !1)
                });
                if (a) n && g && (n.refresh(g), d && (d.setState(d.state, !0), t(b.axes, function (a) {
                    a.crosshair && a.drawCrosshair(null, d)
                }))); else {
                    if (d) d.onMouseOut();
                    e && t(e, function (a) {
                        a.setState()
                    });
                    if (f) f.onMouseOut();
                    n && n.hide(c);
                    this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove());
                    t(b.axes, function (a) {
                        a.hideCrosshair()
                    });
                    this.hoverX = b.hoverPoints = b.hoverPoint = null
                }
            }, scaleGroups: function (a, c) {
                var b = this.chart, f;
                t(b.series, function (d) {
                    f =
                        a || d.getPlotBox();
                    d.xAxis && d.xAxis.zoomEnabled && d.group && (d.group.attr(f), d.markerGroup && (d.markerGroup.attr(f), d.markerGroup.clip(c ? b.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(f))
                });
                b.clipRect.attr(c || b.clipBox)
            }, dragStart: function (a) {
                var b = this.chart;
                b.mouseIsDown = a.type;
                b.cancelClick = !1;
                b.mouseDownX = this.mouseDownX = a.chartX;
                b.mouseDownY = this.mouseDownY = a.chartY
            }, drag: function (a) {
                var b = this.chart, c = b.options.chart, f = a.chartX, d = a.chartY, e = this.zoomHor,
                    p = this.zoomVert, g = b.plotLeft,
                    m = b.plotTop, k = b.plotWidth, A = b.plotHeight, l, G = this.selectionMarker, h = this.mouseDownX,
                    v = this.mouseDownY, t = c.panKey && a[c.panKey + "Key"];
                G && G.touch || (f < g ? f = g : f > g + k && (f = g + k), d < m ? d = m : d > m + A && (d = m + A), this.hasDragged = Math.sqrt(Math.pow(h - f, 2) + Math.pow(v - d, 2)), 10 < this.hasDragged && (l = b.isInsidePlot(h - g, v - m), b.hasCartesianSeries && (this.zoomX || this.zoomY) && l && !t && !G && (this.selectionMarker = G = b.renderer.rect(g, m, e ? 1 : k, p ? 1 : A, 0).attr({
                    fill: c.selectionMarkerFill || r("#335cad").setOpacity(.25).get(),
                    "class": "highcharts-selection-marker",
                    zIndex: 7
                }).add()), G && e && (f -= h, G.attr({
                    width: Math.abs(f),
                    x: (0 < f ? 0 : f) + h
                })), G && p && (f = d - v, G.attr({
                    height: Math.abs(f),
                    y: (0 < f ? 0 : f) + v
                })), l && !G && c.panning && b.pan(a, c.panning)))
            }, drop: function (a) {
                var b = this, f = this.chart, d = this.hasPinched;
                if (this.selectionMarker) {
                    var p = {originalEvent: a, xAxis: [], yAxis: []}, k = this.selectionMarker,
                        B = k.attr ? k.attr("x") : k.x, l = k.attr ? k.attr("y") : k.y,
                        m = k.attr ? k.attr("width") : k.width, E = k.attr ? k.attr("height") : k.height, A;
                    if (this.hasDragged || d) t(f.axes, function (c) {
                        if (c.zoomEnabled && e(c.min) &&
                            (d || b[{xAxis: "zoomX", yAxis: "zoomY"}[c.coll]])) {
                            var f = c.horiz, h = "touchend" === a.type ? c.minPixelPadding : 0,
                                g = c.toValue((f ? B : l) + h), f = c.toValue((f ? B + m : l + E) - h);
                            p[c.coll].push({axis: c, min: Math.min(g, f), max: Math.max(g, f)});
                            A = !0
                        }
                    }), A && u(f, "selection", p, function (a) {
                        f.zoom(w(a, d ? {animation: !1} : null))
                    });
                    c(f.index) && (this.selectionMarker = this.selectionMarker.destroy());
                    d && this.scaleGroups()
                }
                f && c(f.index) && (g(f.container, {cursor: f._cursor}), f.cancelClick = 10 < this.hasDragged, f.mouseIsDown = this.hasDragged = this.hasPinched =
                    !1, this.pinchDown = [])
            }, onContainerMouseDown: function (a) {
                a = this.normalize(a);
                2 !== a.button && (this.zoomOption(a), a.preventDefault && a.preventDefault(), this.dragStart(a))
            }, onDocumentMouseUp: function (b) {
                D[a.hoverChartIndex] && D[a.hoverChartIndex].pointer.drop(b)
            }, onDocumentMouseMove: function (a) {
                var b = this.chart, c = this.chartPosition;
                a = this.normalize(a, c);
                !c || this.inClass(a.target, "highcharts-tracker") || b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) || this.reset()
            }, onContainerMouseLeave: function (b) {
                var c =
                    D[a.hoverChartIndex];
                c && (b.relatedTarget || b.toElement) && (c.pointer.reset(), c.pointer.chartPosition = null)
            }, onContainerMouseMove: function (b) {
                var c = this.chart;
                e(a.hoverChartIndex) && D[a.hoverChartIndex] && D[a.hoverChartIndex].mouseIsDown || (a.hoverChartIndex = c.index);
                b = this.normalize(b);
                b.returnValue = !1;
                "mousedown" === c.mouseIsDown && this.drag(b);
                !this.inClass(b.target, "highcharts-tracker") && !c.isInsidePlot(b.chartX - c.plotLeft, b.chartY - c.plotTop) || c.openMenu || this.runPointActions(b)
            }, inClass: function (a, c) {
                for (var b; a;) {
                    if (b =
                        F(a, "class")) {
                        if (-1 !== b.indexOf(c)) return !0;
                        if (-1 !== b.indexOf("highcharts-container")) return !1
                    }
                    a = a.parentNode
                }
            }, onTrackerMouseOut: function (a) {
                var b = this.chart.hoverSeries;
                a = a.relatedTarget || a.toElement;
                this.isDirectTouch = !1;
                if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut()
            }, onContainerClick: function (a) {
                var b = this.chart, c = b.hoverPoint, f = b.plotLeft, d = b.plotTop;
                a = this.normalize(a);
                b.cancelClick ||
                (c && this.inClass(a.target, "highcharts-tracker") ? (u(c.series, "click", w(a, {point: c})), b.hoverPoint && c.firePointEvent("click", a)) : (w(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - f, a.chartY - d) && u(b, "click", a)))
            }, setDOMEvents: function () {
                var b = this, c = b.chart.container, f = c.ownerDocument;
                c.onmousedown = function (a) {
                    b.onContainerMouseDown(a)
                };
                c.onmousemove = function (a) {
                    b.onContainerMouseMove(a)
                };
                c.onclick = function (a) {
                    b.onContainerClick(a)
                };
                this.unbindContainerMouseLeave = C(c, "mouseleave", b.onContainerMouseLeave);
                a.unbindDocumentMouseUp || (a.unbindDocumentMouseUp = C(f, "mouseup", b.onDocumentMouseUp));
                a.hasTouch && (c.ontouchstart = function (a) {
                    b.onContainerTouchStart(a)
                }, c.ontouchmove = function (a) {
                    b.onContainerTouchMove(a)
                }, a.unbindDocumentTouchEnd || (a.unbindDocumentTouchEnd = C(f, "touchend", b.onDocumentTouchEnd)))
            }, destroy: function () {
                var b = this;
                b.unDocMouseMove && b.unDocMouseMove();
                this.unbindContainerMouseLeave();
                a.chartCount || (a.unbindDocumentMouseUp && (a.unbindDocumentMouseUp = a.unbindDocumentMouseUp()), a.unbindDocumentTouchEnd &&
                (a.unbindDocumentTouchEnd = a.unbindDocumentTouchEnd()));
                clearInterval(b.tooltipTimeout);
                a.objectEach(b, function (a, c) {
                    b[c] = null
                })
            }
        }
    })(K);
    (function (a) {
        var C = a.charts, F = a.each, D = a.extend, r = a.map, g = a.noop, e = a.pick;
        D(a.Pointer.prototype, {
            pinchTranslate: function (a, e, g, r, c, d) {
                this.zoomHor && this.pinchTranslateDirection(!0, a, e, g, r, c, d);
                this.zoomVert && this.pinchTranslateDirection(!1, a, e, g, r, c, d)
            }, pinchTranslateDirection: function (a, e, g, r, c, d, k, x) {
                var p = this.chart, f = a ? "x" : "y", b = a ? "X" : "Y", n = "chart" + b, l = a ? "width" :
                    "height", t = p["plot" + (a ? "Left" : "Top")], q, u, B = x || 1, H = p.inverted,
                    m = p.bounds[a ? "h" : "v"], E = 1 === e.length, A = e[0][n], M = g[0][n], G = !E && e[1][n],
                    h = !E && g[1][n], v;
                g = function () {
                    !E && 20 < Math.abs(A - G) && (B = x || Math.abs(M - h) / Math.abs(A - G));
                    u = (t - M) / B + A;
                    q = p["plot" + (a ? "Width" : "Height")] / B
                };
                g();
                e = u;
                e < m.min ? (e = m.min, v = !0) : e + q > m.max && (e = m.max - q, v = !0);
                v ? (M -= .8 * (M - k[f][0]), E || (h -= .8 * (h - k[f][1])), g()) : k[f] = [M, h];
                H || (d[f] = u - t, d[l] = q);
                d = H ? 1 / B : B;
                c[l] = q;
                c[f] = e;
                r[H ? a ? "scaleY" : "scaleX" : "scale" + b] = B;
                r["translate" + b] = d * t + (M - d * A)
            }, pinch: function (a) {
                var t =
                        this, l = t.chart, u = t.pinchDown, c = a.touches, d = c.length, k = t.lastValidTouch,
                    x = t.hasZoom, p = t.selectionMarker, f = {},
                    b = 1 === d && (t.inClass(a.target, "highcharts-tracker") && l.runTrackerClick || t.runChartClick),
                    n = {};
                1 < d && (t.initiated = !0);
                x && t.initiated && !b && a.preventDefault();
                r(c, function (a) {
                    return t.normalize(a)
                });
                "touchstart" === a.type ? (F(c, function (a, b) {
                    u[b] = {chartX: a.chartX, chartY: a.chartY}
                }), k.x = [u[0].chartX, u[1] && u[1].chartX], k.y = [u[0].chartY, u[1] && u[1].chartY], F(l.axes, function (a) {
                    if (a.zoomEnabled) {
                        var b =
                                l.bounds[a.horiz ? "h" : "v"], c = a.minPixelPadding,
                            f = a.toPixels(e(a.options.min, a.dataMin)), d = a.toPixels(e(a.options.max, a.dataMax)),
                            p = Math.max(f, d);
                        b.min = Math.min(a.pos, Math.min(f, d) - c);
                        b.max = Math.max(a.pos + a.len, p + c)
                    }
                }), t.res = !0) : t.followTouchMove && 1 === d ? this.runPointActions(t.normalize(a)) : u.length && (p || (t.selectionMarker = p = D({
                    destroy: g,
                    touch: !0
                }, l.plotBox)), t.pinchTranslate(u, c, f, p, n, k), t.hasPinched = x, t.scaleGroups(f, n), t.res && (t.res = !1, this.reset(!1, 0)))
            }, touch: function (g, r) {
                var l = this.chart, t, c;
                if (l.index !== a.hoverChartIndex) this.onContainerMouseLeave({relatedTarget: !0});
                a.hoverChartIndex = l.index;
                1 === g.touches.length ? (g = this.normalize(g), (c = l.isInsidePlot(g.chartX - l.plotLeft, g.chartY - l.plotTop)) && !l.openMenu ? (r && this.runPointActions(g), "touchmove" === g.type && (r = this.pinchDown, t = r[0] ? 4 <= Math.sqrt(Math.pow(r[0].chartX - g.chartX, 2) + Math.pow(r[0].chartY - g.chartY, 2)) : !1), e(t, !0) && this.pinch(g)) : r && this.reset()) : 2 === g.touches.length && this.pinch(g)
            }, onContainerTouchStart: function (a) {
                this.zoomOption(a);
                this.touch(a, !0)
            }, onContainerTouchMove: function (a) {
                this.touch(a)
            }, onDocumentTouchEnd: function (e) {
                C[a.hoverChartIndex] && C[a.hoverChartIndex].pointer.drop(e)
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.charts, D = a.css, r = a.doc, g = a.extend, e = a.noop, t = a.Pointer,
            w = a.removeEvent, l = a.win, u = a.wrap;
        if (!a.hasTouch && (l.PointerEvent || l.MSPointerEvent)) {
            var c = {}, d = !!l.PointerEvent, k = function () {
                var d = [];
                d.item = function (a) {
                    return this[a]
                };
                a.objectEach(c, function (a) {
                    d.push({pageX: a.pageX, pageY: a.pageY, target: a.target})
                });
                return d
            }, x = function (c, f, b, d) {
                "touch" !== c.pointerType && c.pointerType !== c.MSPOINTER_TYPE_TOUCH || !F[a.hoverChartIndex] || (d(c), d = F[a.hoverChartIndex].pointer, d[f]({
                    type: b,
                    target: c.currentTarget,
                    preventDefault: e,
                    touches: k()
                }))
            };
            g(t.prototype, {
                onContainerPointerDown: function (a) {
                    x(a, "onContainerTouchStart", "touchstart", function (a) {
                        c[a.pointerId] = {pageX: a.pageX, pageY: a.pageY, target: a.currentTarget}
                    })
                }, onContainerPointerMove: function (a) {
                    x(a, "onContainerTouchMove", "touchmove", function (a) {
                        c[a.pointerId] = {
                            pageX: a.pageX,
                            pageY: a.pageY
                        };
                        c[a.pointerId].target || (c[a.pointerId].target = a.currentTarget)
                    })
                }, onDocumentPointerUp: function (a) {
                    x(a, "onDocumentTouchEnd", "touchend", function (a) {
                        delete c[a.pointerId]
                    })
                }, batchMSEvents: function (a) {
                    a(this.chart.container, d ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown);
                    a(this.chart.container, d ? "pointermove" : "MSPointerMove", this.onContainerPointerMove);
                    a(r, d ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            });
            u(t.prototype, "init", function (a, c, b) {
                a.call(this, c, b);
                this.hasZoom &&
                D(c.container, {"-ms-touch-action": "none", "touch-action": "none"})
            });
            u(t.prototype, "setDOMEvents", function (a) {
                a.apply(this);
                (this.hasZoom || this.followTouchMove) && this.batchMSEvents(C)
            });
            u(t.prototype, "destroy", function (a) {
                this.batchMSEvents(w);
                a.call(this)
            })
        }
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.css, D = a.discardElement, r = a.defined, g = a.each, e = a.fireEvent,
            t = a.isFirefox, w = a.marginNames, l = a.merge, u = a.pick, c = a.setAnimation, d = a.stableSort,
            k = a.win, x = a.wrap;
        a.Legend = function (a, c) {
            this.init(a, c)
        };
        a.Legend.prototype =
            {
                init: function (a, c) {
                    this.chart = a;
                    this.setOptions(c);
                    c.enabled && (this.render(), C(this.chart, "endResize", function () {
                        this.legend.positionCheckboxes()
                    }))
                }, setOptions: function (a) {
                    var c = u(a.padding, 8);
                    this.options = a;
                    this.itemStyle = a.itemStyle;
                    this.itemHiddenStyle = l(this.itemStyle, a.itemHiddenStyle);
                    this.itemMarginTop = a.itemMarginTop || 0;
                    this.padding = c;
                    this.initialItemY = c - 5;
                    this.symbolWidth = u(a.symbolWidth, 16);
                    this.pages = []
                }, update: function (a, c) {
                    var b = this.chart;
                    this.setOptions(l(!0, this.options, a));
                    this.destroy();
                    b.isDirtyLegend = b.isDirtyBox = !0;
                    u(c, !0) && b.redraw();
                    e(this, "afterUpdate")
                }, colorizeItem: function (a, c) {
                    a.legendGroup[c ? "removeClass" : "addClass"]("highcharts-legend-item-hidden");
                    var b = this.options, f = a.legendItem, d = a.legendLine, g = a.legendSymbol,
                        p = this.itemHiddenStyle.color, b = c ? b.itemStyle.color : p, k = c ? a.color || p : p,
                        B = a.options && a.options.marker, l = {fill: k};
                    f && f.css({fill: b, color: b});
                    d && d.attr({stroke: k});
                    g && (B && g.isMarker && (l = a.pointAttribs(), c || (l.stroke = l.fill = p)), g.attr(l));
                    e(this, "afterColorizeItem",
                        {item: a, visible: c})
                }, positionItem: function (a) {
                    var c = this.options, b = c.symbolPadding, c = !c.rtl, d = a._legendItemPos, e = d[0], d = d[1],
                        g = a.checkbox;
                    (a = a.legendGroup) && a.element && a.translate(c ? e : this.legendWidth - e - 2 * b - 4, d);
                    g && (g.x = e, g.y = d)
                }, destroyItem: function (a) {
                    var c = a.checkbox;
                    g(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function (b) {
                        a[b] && (a[b] = a[b].destroy())
                    });
                    c && D(a.checkbox)
                }, destroy: function () {
                    function a(a) {
                        this[a] && (this[a] = this[a].destroy())
                    }

                    g(this.getAllItems(), function (c) {
                        g(["legendItem",
                            "legendGroup"], a, c)
                    });
                    g("clipRect up down pager nav box title group".split(" "), a, this);
                    this.display = null
                }, positionCheckboxes: function () {
                    var a = this.group && this.group.alignAttr, c, b = this.clipHeight || this.legendHeight,
                        d = this.titleHeight;
                    a && (c = a.translateY, g(this.allItems, function (f) {
                        var e = f.checkbox, g;
                        e && (g = c + d + e.y + (this.scrollOffset || 0) + 3, F(e, {
                            left: a.translateX + f.checkboxOffset + e.x - 20 + "px",
                            top: g + "px",
                            display: g > c - 6 && g < c + b - 6 ? "" : "none"
                        }))
                    }, this))
                }, renderTitle: function () {
                    var a = this.options, c = this.padding,
                        b = a.title, d = 0;
                    b.text && (this.title || (this.title = this.chart.renderer.label(b.text, c - 3, c - 4, null, null, null, a.useHTML, null, "legend-title").attr({zIndex: 1}).css(b.style).add(this.group)), a = this.title.getBBox(), d = a.height, this.offsetWidth = a.width, this.contentGroup.attr({translateY: d}));
                    this.titleHeight = d
                }, setText: function (c) {
                    var d = this.options;
                    c.legendItem.attr({text: d.labelFormat ? a.format(d.labelFormat, c, this.chart.time) : d.labelFormatter.call(c)})
                }, renderItem: function (a) {
                    var c = this.chart, b = c.renderer, d =
                            this.options, e = this.symbolWidth, g = d.symbolPadding, q = this.itemStyle,
                        k = this.itemHiddenStyle, p = "horizontal" === d.layout ? u(d.itemDistance, 20) : 0, t = !d.rtl,
                        m = a.legendItem, E = !a.series, A = !E && a.series.drawLegendSymbol ? a.series : a,
                        x = A.options, x = this.createCheckboxForItem && x && x.showCheckbox,
                        p = e + g + p + (x ? 20 : 0), G = d.useHTML, h = a.options.className;
                    m || (a.legendGroup = b.g("legend-item").addClass("highcharts-" + A.type + "-series highcharts-color-" + a.colorIndex + (h ? " " + h : "") + (E ? " highcharts-series-" + a.index : "")).attr({zIndex: 1}).add(this.scrollGroup),
                        a.legendItem = m = b.text("", t ? e + g : -g, this.baseline || 0, G).css(l(a.visible ? q : k)).attr({
                            align: t ? "left" : "right",
                            zIndex: 2
                        }).add(a.legendGroup), this.baseline || (e = q.fontSize, this.fontMetrics = b.fontMetrics(e, m), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, m.attr("y", this.baseline)), this.symbolHeight = d.symbolHeight || this.fontMetrics.f, A.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, m, G), x && this.createCheckboxForItem(a));
                    this.colorizeItem(a, a.visible);
                    q.width || m.css({
                        width: (d.itemWidth ||
                            d.width || c.spacingBox.width) - p
                    });
                    this.setText(a);
                    c = m.getBBox();
                    a.itemWidth = a.checkboxOffset = d.itemWidth || a.legendItemWidth || c.width + p;
                    this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth);
                    this.totalItemWidth += a.itemWidth;
                    this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || c.height || this.symbolHeight)
                }, layoutItem: function (a) {
                    var c = this.options, b = this.padding, d = "horizontal" === c.layout, e = a.itemHeight,
                        g = c.itemMarginBottom || 0, q = this.itemMarginTop, k = d ? u(c.itemDistance, 20) : 0,
                        p = c.width, l = p || this.chart.spacingBox.width -
                        2 * b - c.x, c = c.alignColumns && this.totalItemWidth > l ? this.maxItemWidth : a.itemWidth;
                    d && this.itemX - b + c > l && (this.itemX = b, this.itemY += q + this.lastLineHeight + g, this.lastLineHeight = 0);
                    this.lastItemY = q + this.itemY + g;
                    this.lastLineHeight = Math.max(e, this.lastLineHeight);
                    a._legendItemPos = [this.itemX, this.itemY];
                    d ? this.itemX += c : (this.itemY += q + e + g, this.lastLineHeight = e);
                    this.offsetWidth = p || Math.max((d ? this.itemX - b - (a.checkbox ? 0 : k) : c) + b, this.offsetWidth)
                }, getAllItems: function () {
                    var a = [];
                    g(this.chart.series, function (c) {
                        var b =
                            c && c.options;
                        c && u(b.showInLegend, r(b.linkedTo) ? !1 : void 0, !0) && (a = a.concat(c.legendItems || ("point" === b.legendType ? c.data : c)))
                    });
                    e(this, "afterGetAllItems", {allItems: a});
                    return a
                }, getAlignment: function () {
                    var a = this.options;
                    return a.floating ? "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
                }, adjustMargins: function (a, c) {
                    var b = this.chart, d = this.options, f = this.getAlignment();
                    f && g([/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/], function (e, g) {
                        e.test(f) && !r(a[g]) && (b[w[g]] = Math.max(b[w[g]],
                            b.legend[(g + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][g] * d[g % 2 ? "x" : "y"] + u(d.margin, 12) + c[g] + (0 === g && void 0 !== b.options.title.margin ? b.titleOffset + b.options.title.margin : 0)))
                    })
                }, render: function () {
                    var a = this.chart, c = a.renderer, b = this.group, e, k, x, q, t = this.box, B = this.options,
                        r = this.padding;
                    this.itemX = r;
                    this.itemY = this.initialItemY;
                    this.lastItemY = this.offsetWidth = 0;
                    b || (this.group = b = c.g("legend").attr({zIndex: 7}).add(), this.contentGroup = c.g().attr({zIndex: 1}).add(b), this.scrollGroup = c.g().add(this.contentGroup));
                    this.renderTitle();
                    e = this.getAllItems();
                    d(e, function (a, b) {
                        return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0)
                    });
                    B.reversed && e.reverse();
                    this.allItems = e;
                    this.display = k = !!e.length;
                    this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0;
                    g(e, this.renderItem, this);
                    g(e, this.layoutItem, this);
                    x = (B.width || this.offsetWidth) + r;
                    q = this.lastItemY + this.lastLineHeight + this.titleHeight;
                    q = this.handleOverflow(q);
                    q += r;
                    t || (this.box = t = c.rect().addClass("highcharts-legend-box").attr({r: B.borderRadius}).add(b),
                        t.isNew = !0);
                    t.attr({
                        stroke: B.borderColor,
                        "stroke-width": B.borderWidth || 0,
                        fill: B.backgroundColor || "none"
                    }).shadow(B.shadow);
                    0 < x && 0 < q && (t[t.isNew ? "attr" : "animate"](t.crisp.call({}, {
                        x: 0,
                        y: 0,
                        width: x,
                        height: q
                    }, t.strokeWidth())), t.isNew = !1);
                    t[k ? "show" : "hide"]();
                    this.legendWidth = x;
                    this.legendHeight = q;
                    g(e, this.positionItem, this);
                    k && (c = a.spacingBox, /(lth|ct|rth)/.test(this.getAlignment()) && (c = l(c, {y: c.y + a.titleOffset + a.options.title.margin})), b.align(l(B, {
                        width: x,
                        height: q
                    }), !0, c));
                    a.isResizing || this.positionCheckboxes()
                },
                handleOverflow: function (a) {
                    var c = this, b = this.chart, d = b.renderer, e = this.options, k = e.y, q = this.padding,
                        b = b.spacingBox.height + ("top" === e.verticalAlign ? -k : k) - q, k = e.maxHeight, p,
                        l = this.clipRect, t = e.navigation, m = u(t.animation, !0), E = t.arrowSize || 12,
                        A = this.nav, x = this.pages, G, h = this.allItems, v = function (a) {
                            "number" === typeof a ? l.attr({height: a}) : l && (c.clipRect = l.destroy(), c.contentGroup.clip());
                            c.contentGroup.div && (c.contentGroup.div.style.clip = a ? "rect(" + q + "px,9999px," + (q + a) + "px,0)" : "auto")
                        };
                    "horizontal" !== e.layout ||
                    "middle" === e.verticalAlign || e.floating || (b /= 2);
                    k && (b = Math.min(b, k));
                    x.length = 0;
                    a > b && !1 !== t.enabled ? (this.clipHeight = p = Math.max(b - 20 - this.titleHeight - q, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = a, g(h, function (a, b) {
                        var c = a._legendItemPos[1], d = Math.round(a.legendItem.getBBox().height), f = x.length;
                        if (!f || c - x[f - 1] > p && (G || c) !== x[f - 1]) x.push(G || c), f++;
                        a.pageIx = f - 1;
                        G && (h[b - 1].pageIx = f - 1);
                        b === h.length - 1 && c + d - x[f - 1] > p && (x.push(c), a.pageIx = f);
                        c !== G && (G = c)
                    }), l || (l = c.clipRect = d.clipRect(0, q, 9999,
                        0), c.contentGroup.clip(l)), v(p), A || (this.nav = A = d.g().attr({zIndex: 1}).add(this.group), this.up = d.symbol("triangle", 0, 0, E, E).on("click", function () {
                        c.scroll(-1, m)
                    }).add(A), this.pager = d.text("", 15, 10).addClass("highcharts-legend-navigation").css(t.style).add(A), this.down = d.symbol("triangle-down", 0, 0, E, E).on("click", function () {
                        c.scroll(1, m)
                    }).add(A)), c.scroll(0), a = b) : A && (v(), this.nav = A.destroy(), this.scrollGroup.attr({translateY: 1}), this.clipHeight = 0);
                    return a
                }, scroll: function (a, d) {
                    var b = this.pages, f =
                        b.length;
                    a = this.currentPage + a;
                    var e = this.clipHeight, g = this.options.navigation, k = this.pager, p = this.padding;
                    a > f && (a = f);
                    0 < a && (void 0 !== d && c(d, this.chart), this.nav.attr({
                        translateX: p,
                        translateY: e + this.padding + 7 + this.titleHeight,
                        visibility: "visible"
                    }), this.up.attr({"class": 1 === a ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"}), k.attr({text: a + "/" + f}), this.down.attr({
                        x: 18 + this.pager.getBBox().width,
                        "class": a === f ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active"
                    }), this.up.attr({
                        fill: 1 ===
                        a ? g.inactiveColor : g.activeColor
                    }).css({cursor: 1 === a ? "default" : "pointer"}), this.down.attr({fill: a === f ? g.inactiveColor : g.activeColor}).css({cursor: a === f ? "default" : "pointer"}), this.scrollOffset = -b[a - 1] + this.initialItemY, this.scrollGroup.animate({translateY: this.scrollOffset}), this.currentPage = a, this.positionCheckboxes())
                }
            };
        a.LegendSymbolMixin = {
            drawRectangle: function (a, c) {
                var b = a.symbolHeight, d = a.options.squareSymbol;
                c.legendSymbol = this.chart.renderer.rect(d ? (a.symbolWidth - b) / 2 : 0, a.baseline - b + 1, d ? b : a.symbolWidth,
                    b, u(a.options.symbolRadius, b / 2)).addClass("highcharts-point").attr({zIndex: 3}).add(c.legendGroup)
            }, drawLineMarker: function (a) {
                var c = this.options, b = c.marker, d = a.symbolWidth, e = a.symbolHeight, g = e / 2,
                    k = this.chart.renderer, p = this.legendGroup;
                a = a.baseline - Math.round(.3 * a.fontMetrics.b);
                var B;
                B = {"stroke-width": c.lineWidth || 0};
                c.dashStyle && (B.dashstyle = c.dashStyle);
                this.legendLine = k.path(["M", 0, a, "L", d, a]).addClass("highcharts-graph").attr(B).add(p);
                b && !1 !== b.enabled && (c = Math.min(u(b.radius, g), g), 0 === this.symbol.indexOf("url") &&
                (b = l(b, {
                    width: e,
                    height: e
                }), c = 0), this.legendSymbol = b = k.symbol(this.symbol, d / 2 - c, a - c, 2 * c, 2 * c, b).addClass("highcharts-point").add(p), b.isMarker = !0)
            }
        };
        (/Trident\/7\.0/.test(k.navigator.userAgent) || t) && x(a.Legend.prototype, "positionItem", function (a, c) {
            var b = this, d = function () {
                c._legendItemPos && a.call(b, c)
            };
            d();
            setTimeout(d)
        })
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.animate, D = a.animObject, r = a.attr, g = a.doc, e = a.Axis, t = a.createElement,
            w = a.defaultOptions, l = a.discardElement, u = a.charts, c = a.css, d = a.defined, k = a.each,
            x = a.extend, p = a.find, f = a.fireEvent, b = a.grep, n = a.isNumber, z = a.isObject, J = a.isString,
            q = a.Legend, L = a.marginNames, B = a.merge, H = a.objectEach, m = a.Pointer, E = a.pick, A = a.pInt,
            M = a.removeEvent, G = a.seriesTypes, h = a.splat, v = a.syncTimeout, Q = a.win, P = a.Chart = function () {
                this.getArgs.apply(this, arguments)
            };
        a.chart = function (a, b, c) {
            return new P(a, b, c)
        };
        x(P.prototype, {
            callbacks: [], getArgs: function () {
                var a = [].slice.call(arguments);
                if (J(a[0]) || a[0].nodeName) this.renderTo = a.shift();
                this.init(a[0], a[1])
            }, init: function (b, c) {
                var d,
                    h, m = b.series, e = b.plotOptions || {};
                f(this, "init", {args: arguments}, function () {
                    b.series = null;
                    d = B(w, b);
                    for (h in d.plotOptions) d.plotOptions[h].tooltip = e[h] && B(e[h].tooltip) || void 0;
                    d.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip;
                    d.series = b.series = m;
                    this.userOptions = b;
                    var g = d.chart, k = g.events;
                    this.margin = [];
                    this.spacing = [];
                    this.bounds = {h: {}, v: {}};
                    this.labelCollectors = [];
                    this.callback = c;
                    this.isResizing = 0;
                    this.options = d;
                    this.axes = [];
                    this.series = [];
                    this.time = b.time && a.keys(b.time).length ?
                        new a.Time(b.time) : a.time;
                    this.hasCartesianSeries = g.showAxes;
                    var A = this;
                    A.index = u.length;
                    u.push(A);
                    a.chartCount++;
                    k && H(k, function (a, b) {
                        C(A, b, a)
                    });
                    A.xAxis = [];
                    A.yAxis = [];
                    A.pointCount = A.colorCounter = A.symbolCounter = 0;
                    f(A, "afterInit");
                    A.firstRender()
                })
            }, initSeries: function (b) {
                var c = this.options.chart;
                (c = G[b.type || c.type || c.defaultSeriesType]) || a.error(17, !0);
                c = new c;
                c.init(this, b);
                return c
            }, orderSeries: function (a) {
                var b = this.series;
                for (a = a || 0; a < b.length; a++) b[a] && (b[a].index = a, b[a].name = b[a].getName())
            },
            isInsidePlot: function (a, b, c) {
                var d = c ? b : a;
                a = c ? a : b;
                return 0 <= d && d <= this.plotWidth && 0 <= a && a <= this.plotHeight
            }, redraw: function (b) {
                f(this, "beforeRedraw");
                var c = this.axes, d = this.series, h = this.pointer, m = this.legend, e = this.isDirtyLegend, g, A,
                    q = this.hasCartesianSeries, p = this.isDirtyBox, E, v = this.renderer, n = v.isHidden(), l = [];
                this.setResponsive && this.setResponsive(!1);
                a.setAnimation(b, this);
                n && this.temporaryDisplay();
                this.layOutTitles();
                for (b = d.length; b--;) if (E = d[b], E.options.stacking && (g = !0, E.isDirty)) {
                    A = !0;
                    break
                }
                if (A) for (b = d.length; b--;) E = d[b], E.options.stacking && (E.isDirty = !0);
                k(d, function (a) {
                    a.isDirty && "point" === a.options.legendType && (a.updateTotals && a.updateTotals(), e = !0);
                    a.isDirtyData && f(a, "updatedData")
                });
                e && m.options.enabled && (m.render(), this.isDirtyLegend = !1);
                g && this.getStacks();
                q && k(c, function (a) {
                    a.updateNames();
                    a.setScale()
                });
                this.getMargins();
                q && (k(c, function (a) {
                    a.isDirty && (p = !0)
                }), k(c, function (a) {
                    var b = a.min + "," + a.max;
                    a.extKey !== b && (a.extKey = b, l.push(function () {
                        f(a, "afterSetExtremes", x(a.eventArgs,
                            a.getExtremes()));
                        delete a.eventArgs
                    }));
                    (p || g) && a.redraw()
                }));
                p && this.drawChartBox();
                f(this, "predraw");
                k(d, function (a) {
                    (p || a.isDirty) && a.visible && a.redraw();
                    a.isDirtyData = !1
                });
                h && h.reset(!0);
                v.draw();
                f(this, "redraw");
                f(this, "render");
                n && this.temporaryDisplay(!0);
                k(l, function (a) {
                    a.call()
                })
            }, get: function (a) {
                function b(b) {
                    return b.id === a || b.options && b.options.id === a
                }

                var c, d = this.series, f;
                c = p(this.axes, b) || p(this.series, b);
                for (f = 0; !c && f < d.length; f++) c = p(d[f].points || [], b);
                return c
            }, getAxes: function () {
                var a =
                    this, b = this.options, c = b.xAxis = h(b.xAxis || {}), b = b.yAxis = h(b.yAxis || {});
                f(this, "getAxes");
                k(c, function (a, b) {
                    a.index = b;
                    a.isX = !0
                });
                k(b, function (a, b) {
                    a.index = b
                });
                c = c.concat(b);
                k(c, function (b) {
                    new e(a, b)
                });
                f(this, "afterGetAxes")
            }, getSelectedPoints: function () {
                var a = [];
                k(this.series, function (c) {
                    a = a.concat(b(c.data || [], function (a) {
                        return a.selected
                    }))
                });
                return a
            }, getSelectedSeries: function () {
                return b(this.series, function (a) {
                    return a.selected
                })
            }, setTitle: function (a, b, c) {
                var d = this, f = d.options, h;
                h = f.title = B({
                    style: {
                        color: "#333333",
                        fontSize: f.isStock ? "16px" : "18px"
                    }
                }, f.title, a);
                f = f.subtitle = B({style: {color: "#666666"}}, f.subtitle, b);
                k([["title", a, h], ["subtitle", b, f]], function (a, b) {
                    var c = a[0], f = d[c], h = a[1];
                    a = a[2];
                    f && h && (d[c] = f = f.destroy());
                    a && !f && (d[c] = d.renderer.text(a.text, 0, 0, a.useHTML).attr({
                        align: a.align,
                        "class": "highcharts-" + c,
                        zIndex: a.zIndex || 4
                    }).add(), d[c].update = function (a) {
                        d.setTitle(!b && a, b && a)
                    }, d[c].css(a.style))
                });
                d.layOutTitles(c)
            }, layOutTitles: function (a) {
                var b = 0, c, d = this.renderer, f = this.spacingBox;
                k(["title", "subtitle"],
                    function (a) {
                        var c = this[a], h = this.options[a];
                        a = "title" === a ? -3 : h.verticalAlign ? 0 : b + 2;
                        var m;
                        c && (m = h.style.fontSize, m = d.fontMetrics(m, c).b, c.css({width: (h.width || f.width + h.widthAdjust) + "px"}).align(x({y: a + m}, h), !1, "spacingBox"), h.floating || h.verticalAlign || (b = Math.ceil(b + c.getBBox(h.useHTML).height)))
                    }, this);
                c = this.titleOffset !== b;
                this.titleOffset = b;
                !this.isDirtyBox && c && (this.isDirtyBox = this.isDirtyLegend = c, this.hasRendered && E(a, !0) && this.isDirtyBox && this.redraw())
            }, getChartSize: function () {
                var b = this.options.chart,
                    c = b.width, b = b.height, f = this.renderTo;
                d(c) || (this.containerWidth = a.getStyle(f, "width"));
                d(b) || (this.containerHeight = a.getStyle(f, "height"));
                this.chartWidth = Math.max(0, c || this.containerWidth || 600);
                this.chartHeight = Math.max(0, a.relativeLength(b, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
            }, temporaryDisplay: function (b) {
                var c = this.renderTo;
                if (b) for (; c && c.style;) c.hcOrigStyle && (a.css(c, c.hcOrigStyle), delete c.hcOrigStyle), c.hcOrigDetached && (g.body.removeChild(c), c.hcOrigDetached =
                    !1), c = c.parentNode; else for (; c && c.style;) {
                    g.body.contains(c) || c.parentNode || (c.hcOrigDetached = !0, g.body.appendChild(c));
                    if ("none" === a.getStyle(c, "display", !1) || c.hcOricDetached) c.hcOrigStyle = {
                        display: c.style.display,
                        height: c.style.height,
                        overflow: c.style.overflow
                    }, b = {
                        display: "block",
                        overflow: "hidden"
                    }, c !== this.renderTo && (b.height = 0), a.css(c, b), c.offsetWidth || c.style.setProperty("display", "block", "important");
                    c = c.parentNode;
                    if (c === g.body) break
                }
            }, setClassName: function (a) {
                this.container.className = "highcharts-container " +
                    (a || "")
            }, getContainer: function () {
                var b, c = this.options, d = c.chart, h, m;
                b = this.renderTo;
                var e = a.uniqueKey(), k;
                b || (this.renderTo = b = d.renderTo);
                J(b) && (this.renderTo = b = g.getElementById(b));
                b || a.error(13, !0);
                h = A(r(b, "data-highcharts-chart"));
                n(h) && u[h] && u[h].hasRendered && u[h].destroy();
                r(b, "data-highcharts-chart", this.index);
                b.innerHTML = "";
                d.skipClone || b.offsetWidth || this.temporaryDisplay();
                this.getChartSize();
                h = this.chartWidth;
                m = this.chartHeight;
                k = x({
                    position: "relative",
                    overflow: "hidden",
                    width: h + "px",
                    height: m +
                    "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, d.style);
                this.container = b = t("div", {id: e}, k, b);
                this._cursor = b.style.cursor;
                this.renderer = new (a[d.renderer] || a.Renderer)(b, h, m, null, d.forExport, c.exporting && c.exporting.allowHTML);
                this.setClassName(d.className);
                this.renderer.setStyle(d.style);
                this.renderer.chartIndex = this.index;
                f(this, "afterGetContainer")
            }, getMargins: function (a) {
                var b = this.spacing, c = this.margin, f = this.titleOffset;
                this.resetMargins();
                f &&
                !d(c[0]) && (this.plotTop = Math.max(this.plotTop, f + this.options.title.margin + b[0]));
                this.legend && this.legend.display && this.legend.adjustMargins(c, b);
                this.extraMargin && (this[this.extraMargin.type] = (this[this.extraMargin.type] || 0) + this.extraMargin.value);
                this.adjustPlotArea && this.adjustPlotArea();
                a || this.getAxisMargins()
            }, getAxisMargins: function () {
                var a = this, b = a.axisOffset = [0, 0, 0, 0], c = a.margin;
                a.hasCartesianSeries && k(a.axes, function (a) {
                    a.visible && a.getOffset()
                });
                k(L, function (f, h) {
                    d(c[h]) || (a[f] += b[h])
                });
                a.setChartSize()
            }, reflow: function (b) {
                var c = this, f = c.options.chart, h = c.renderTo, m = d(f.width) && d(f.height),
                    e = f.width || a.getStyle(h, "width"), f = f.height || a.getStyle(h, "height"),
                    h = b ? b.target : Q;
                if (!m && !c.isPrinting && e && f && (h === Q || h === g)) {
                    if (e !== c.containerWidth || f !== c.containerHeight) a.clearTimeout(c.reflowTimeout), c.reflowTimeout = v(function () {
                        c.container && c.setSize(void 0, void 0, !1)
                    }, b ? 100 : 0);
                    c.containerWidth = e;
                    c.containerHeight = f
                }
            }, setReflow: function (a) {
                var b = this;
                !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow &&
                    (this.unbindReflow = this.unbindReflow()) : (this.unbindReflow = C(Q, "resize", function (a) {
                    b.reflow(a)
                }), C(this, "destroy", this.unbindReflow))
            }, setSize: function (b, d, h) {
                var m = this, e = m.renderer;
                m.isResizing += 1;
                a.setAnimation(h, m);
                m.oldChartHeight = m.chartHeight;
                m.oldChartWidth = m.chartWidth;
                void 0 !== b && (m.options.chart.width = b);
                void 0 !== d && (m.options.chart.height = d);
                m.getChartSize();
                b = e.globalAnimation;
                (b ? F : c)(m.container, {width: m.chartWidth + "px", height: m.chartHeight + "px"}, b);
                m.setChartSize(!0);
                e.setSize(m.chartWidth,
                    m.chartHeight, h);
                k(m.axes, function (a) {
                    a.isDirty = !0;
                    a.setScale()
                });
                m.isDirtyLegend = !0;
                m.isDirtyBox = !0;
                m.layOutTitles();
                m.getMargins();
                m.redraw(h);
                m.oldChartHeight = null;
                f(m, "resize");
                v(function () {
                    m && f(m, "endResize", null, function () {
                        --m.isResizing
                    })
                }, D(b).duration)
            }, setChartSize: function (a) {
                var b = this.inverted, c = this.renderer, d = this.chartWidth, h = this.chartHeight,
                    m = this.options.chart, e = this.spacing, g = this.clipOffset, A, q, p, E;
                this.plotLeft = A = Math.round(this.plotLeft);
                this.plotTop = q = Math.round(this.plotTop);
                this.plotWidth = p = Math.max(0, Math.round(d - A - this.marginRight));
                this.plotHeight = E = Math.max(0, Math.round(h - q - this.marginBottom));
                this.plotSizeX = b ? E : p;
                this.plotSizeY = b ? p : E;
                this.plotBorderWidth = m.plotBorderWidth || 0;
                this.spacingBox = c.spacingBox = {x: e[3], y: e[0], width: d - e[3] - e[1], height: h - e[0] - e[2]};
                this.plotBox = c.plotBox = {x: A, y: q, width: p, height: E};
                d = 2 * Math.floor(this.plotBorderWidth / 2);
                b = Math.ceil(Math.max(d, g[3]) / 2);
                c = Math.ceil(Math.max(d, g[0]) / 2);
                this.clipBox = {
                    x: b, y: c, width: Math.floor(this.plotSizeX - Math.max(d,
                        g[1]) / 2 - b), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(d, g[2]) / 2 - c))
                };
                a || k(this.axes, function (a) {
                    a.setAxisSize();
                    a.setAxisTranslation()
                });
                f(this, "afterSetChartSize", {skipAxes: a})
            }, resetMargins: function () {
                var a = this, b = a.options.chart;
                k(["margin", "spacing"], function (c) {
                    var d = b[c], f = z(d) ? d : [d, d, d, d];
                    k(["Top", "Right", "Bottom", "Left"], function (d, h) {
                        a[c][h] = E(b[c + d], f[h])
                    })
                });
                k(L, function (b, c) {
                    a[b] = E(a.margin[c], a.spacing[c])
                });
                a.axisOffset = [0, 0, 0, 0];
                a.clipOffset = [0, 0, 0, 0]
            }, drawChartBox: function () {
                var a =
                        this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight,
                    h = this.chartBackground, m = this.plotBackground, e = this.plotBorder, g, A = this.plotBGImage,
                    k = a.backgroundColor, q = a.plotBackgroundColor, p = a.plotBackgroundImage, E, v = this.plotLeft,
                    n = this.plotTop, l = this.plotWidth, G = this.plotHeight, B = this.plotBox, x = this.clipRect,
                    t = this.clipBox, r = "animate";
                h || (this.chartBackground = h = b.rect().addClass("highcharts-background").add(), r = "attr");
                g = a.borderWidth || 0;
                E = g + (a.shadow ? 8 : 0);
                k = {fill: k || "none"};
                if (g || h["stroke-width"]) k.stroke =
                    a.borderColor, k["stroke-width"] = g;
                h.attr(k).shadow(a.shadow);
                h[r]({x: E / 2, y: E / 2, width: c - E - g % 2, height: d - E - g % 2, r: a.borderRadius});
                r = "animate";
                m || (r = "attr", this.plotBackground = m = b.rect().addClass("highcharts-plot-background").add());
                m[r](B);
                m.attr({fill: q || "none"}).shadow(a.plotShadow);
                p && (A ? A.animate(B) : this.plotBGImage = b.image(p, v, n, l, G).add());
                x ? x.animate({width: t.width, height: t.height}) : this.clipRect = b.clipRect(t);
                r = "animate";
                e || (r = "attr", this.plotBorder = e = b.rect().addClass("highcharts-plot-border").attr({zIndex: 1}).add());
                e.attr({stroke: a.plotBorderColor, "stroke-width": a.plotBorderWidth || 0, fill: "none"});
                e[r](e.crisp({x: v, y: n, width: l, height: G}, -e.strokeWidth()));
                this.isDirtyBox = !1;
                f(this, "afterDrawChartBox")
            }, propFromSeries: function () {
                var a = this, b = a.options.chart, c, d = a.options.series, f, h;
                k(["inverted", "angular", "polar"], function (m) {
                    c = G[b.type || b.defaultSeriesType];
                    h = b[m] || c && c.prototype[m];
                    for (f = d && d.length; !h && f--;) (c = G[d[f].type]) && c.prototype[m] && (h = !0);
                    a[m] = h
                })
            }, linkSeries: function () {
                var a = this, b = a.series;
                k(b, function (a) {
                    a.linkedSeries.length =
                        0
                });
                k(b, function (b) {
                    var c = b.options.linkedTo;
                    J(c) && (c = ":previous" === c ? a.series[b.index - 1] : a.get(c)) && c.linkedParent !== b && (c.linkedSeries.push(b), b.linkedParent = c, b.visible = E(b.options.visible, c.options.visible, b.visible))
                });
                f(this, "afterLinkSeries")
            }, renderSeries: function () {
                k(this.series, function (a) {
                    a.translate();
                    a.render()
                })
            }, renderLabels: function () {
                var a = this, b = a.options.labels;
                b.items && k(b.items, function (c) {
                    var d = x(b.style, c.style), f = A(d.left) + a.plotLeft, h = A(d.top) + a.plotTop + 12;
                    delete d.left;
                    delete d.top;
                    a.renderer.text(c.html, f, h).attr({zIndex: 2}).css(d).add()
                })
            }, render: function () {
                var a = this.axes, b = this.renderer, c = this.options, d, f, h;
                this.setTitle();
                this.legend = new q(this, c.legend);
                this.getStacks && this.getStacks();
                this.getMargins(!0);
                this.setChartSize();
                c = this.plotWidth;
                d = this.plotHeight = Math.max(this.plotHeight - 21, 0);
                k(a, function (a) {
                    a.setScale()
                });
                this.getAxisMargins();
                f = 1.1 < c / this.plotWidth;
                h = 1.05 < d / this.plotHeight;
                if (f || h) k(a, function (a) {
                    (a.horiz && f || !a.horiz && h) && a.setTickInterval(!0)
                }), this.getMargins();
                this.drawChartBox();
                this.hasCartesianSeries && k(a, function (a) {
                    a.visible && a.render()
                });
                this.seriesGroup || (this.seriesGroup = b.g("series-group").attr({zIndex: 3}).add());
                this.renderSeries();
                this.renderLabels();
                this.addCredits();
                this.setResponsive && this.setResponsive();
                this.hasRendered = !0
            }, addCredits: function (a) {
                var b = this;
                a = B(!0, this.options.credits, a);
                a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                    a.href &&
                    (Q.location.href = a.href)
                }).attr({
                    align: a.position.align,
                    zIndex: 8
                }).css(a.style).add().align(a.position), this.credits.update = function (a) {
                    b.credits = b.credits.destroy();
                    b.addCredits(a)
                })
            }, destroy: function () {
                var b = this, c = b.axes, d = b.series, h = b.container, m, e = h && h.parentNode;
                f(b, "destroy");
                b.renderer.forExport ? a.erase(u, b) : u[b.index] = void 0;
                a.chartCount--;
                b.renderTo.removeAttribute("data-highcharts-chart");
                M(b);
                for (m = c.length; m--;) c[m] = c[m].destroy();
                this.scroller && this.scroller.destroy && this.scroller.destroy();
                for (m = d.length; m--;) d[m] = d[m].destroy();
                k("title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" "), function (a) {
                    var c = b[a];
                    c && c.destroy && (b[a] = c.destroy())
                });
                h && (h.innerHTML = "", M(h), e && l(h));
                H(b, function (a, c) {
                    delete b[c]
                })
            }, firstRender: function () {
                var a = this, b = a.options;
                if (!a.isReadyToRender || a.isReadyToRender()) {
                    a.getContainer();
                    a.resetMargins();
                    a.setChartSize();
                    a.propFromSeries();
                    a.getAxes();
                    k(b.series || [], function (b) {
                        a.initSeries(b)
                    });
                    a.linkSeries();
                    f(a, "beforeRender");
                    m && (a.pointer = new m(a, b));
                    a.render();
                    if (!a.renderer.imgCount && a.onload) a.onload();
                    a.temporaryDisplay(!0)
                }
            }, onload: function () {
                k([this.callback].concat(this.callbacks), function (a) {
                    a && void 0 !== this.index && a.apply(this, [this])
                }, this);
                f(this, "load");
                f(this, "render");
                d(this.index) && this.setReflow(this.options.chart.reflow);
                this.onload = null
            }
        })
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.Chart, D = a.each;
        C(F, "afterSetChartSize", function (r) {
            var g =
                this.options.chart.scrollablePlotArea;
            if (g = g && g.minWidth) if (this.scrollablePixels = g = Math.max(0, g - this.chartWidth)) this.plotWidth += g, this.clipBox.width += g, r.skipAxes || D(this.axes, function (e) {
                1 === e.side ? e.getPlotLinePath = function () {
                    var g = this.right, r;
                    this.right = g - e.chart.scrollablePixels;
                    r = a.Axis.prototype.getPlotLinePath.apply(this, arguments);
                    this.right = g;
                    return r
                } : (e.setAxisSize(), e.setAxisTranslation())
            })
        });
        C(F, "render", function () {
            this.scrollablePixels ? (this.setUpScrolling && this.setUpScrolling(),
                this.applyFixed()) : this.fixedDiv && this.applyFixed()
        });
        F.prototype.setUpScrolling = function () {
            this.scrollingContainer = a.createElement("div", {className: "highcharts-scrolling"}, {
                overflowX: "auto",
                WebkitOverflowScrolling: "touch"
            }, this.renderTo);
            this.innerContainer = a.createElement("div", {className: "highcharts-inner-container"}, null, this.scrollingContainer);
            this.innerContainer.appendChild(this.container);
            this.setUpScrolling = null
        };
        F.prototype.applyFixed = function () {
            var r = this.container, g, e;
            this.fixedDiv || (this.fixedDiv =
                a.createElement("div", {className: "highcharts-fixed"}, {
                    position: "absolute",
                    overflow: "hidden",
                    pointerEvents: "none",
                    zIndex: 2
                }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.fixedRenderer = g = new a.Renderer(this.fixedDiv, 0, 0), this.scrollableMask = g.path().attr({
                fill: a.color(this.options.chart.backgroundColor || "#fff").setOpacity(.85).get(),
                zIndex: -1
            }).addClass("highcharts-scrollable-mask").add(), a.each([this.inverted ? ".highcharts-xaxis" : ".highcharts-yaxis", this.inverted ?
                ".highcharts-xaxis-labels" : ".highcharts-yaxis-labels", ".highcharts-contextbutton", ".highcharts-credits", ".highcharts-legend", ".highcharts-subtitle", ".highcharts-title"], function (e) {
                a.each(r.querySelectorAll(e), function (a) {
                    g.box.appendChild(a);
                    a.style.pointerEvents = "auto"
                })
            }));
            this.fixedRenderer.setSize(this.chartWidth, this.chartHeight);
            e = this.chartWidth + this.scrollablePixels;
            this.container.style.width = e + "px";
            this.renderer.boxWrapper.attr({
                width: e,
                height: this.chartHeight,
                viewBox: [0, 0, e, this.chartHeight].join(" ")
            });
            e = this.options.chart.scrollablePlotArea;
            e.scrollPositionX && (this.scrollingContainer.scrollLeft = this.scrollablePixels * e.scrollPositionX);
            var t = this.axisOffset;
            e = this.plotTop - t[0] - 1;
            var t = this.plotTop + this.plotHeight + t[2], w = this.plotLeft + this.plotWidth - this.scrollablePixels;
            this.scrollableMask.attr({d: this.scrollablePixels ? ["M", 0, e, "L", this.plotLeft - 1, e, "L", this.plotLeft - 1, t, "L", 0, t, "Z", "M", w, e, "L", this.chartWidth, e, "L", this.chartWidth, t, "L", w, t, "Z"] : ["M", 0, 0]})
        }
    })(K);
    (function (a) {
        var C, F = a.each, D =
                a.extend, r = a.erase, g = a.fireEvent, e = a.format, t = a.isArray, w = a.isNumber, l = a.pick,
            u = a.removeEvent;
        a.Point = C = function () {
        };
        a.Point.prototype = {
            init: function (a, d, e) {
                this.series = a;
                this.color = a.color;
                this.applyOptions(d, e);
                a.options.colorByPoint ? (d = a.options.colors || a.chart.options.colors, this.color = this.color || d[a.colorCounter], d = d.length, e = a.colorCounter, a.colorCounter++, a.colorCounter === d && (a.colorCounter = 0)) : e = a.colorIndex;
                this.colorIndex = l(this.colorIndex, e);
                a.chart.pointCount++;
                g(this, "afterInit");
                return this
            },
            applyOptions: function (a, d) {
                var c = this.series, e = c.options.pointValKey || c.pointValKey;
                a = C.prototype.optionsToObject.call(this, a);
                D(this, a);
                this.options = this.options ? D(this.options, a) : a;
                a.group && delete this.group;
                e && (this.y = this[e]);
                this.isNull = l(this.isValid && !this.isValid(), null === this.x || !w(this.y, !0));
                this.selected && (this.state = "select");
                "name" in this && void 0 === d && c.xAxis && c.xAxis.hasNames && (this.x = c.xAxis.nameToX(this));
                void 0 === this.x && c && (this.x = void 0 === d ? c.autoIncrement(this) : d);
                return this
            },
            setNestedProperty: function (c, d, e) {
                e = e.split(".");
                a.reduce(e, function (c, e, f, b) {
                    c[e] = b.length - 1 === f ? d : a.isObject(c[e], !0) ? c[e] : {};
                    return c[e]
                }, c);
                return c
            }, optionsToObject: function (c) {
                var d = {}, e = this.series, g = e.options.keys, p = g || e.pointArrayMap || ["y"], f = p.length, b = 0,
                    n = 0;
                if (w(c) || null === c) d[p[0]] = c; else if (t(c)) for (!g && c.length > f && (e = typeof c[0], "string" === e ? d.name = c[0] : "number" === e && (d.x = c[0]), b++); n < f;) g && void 0 === c[b] || (0 < p[n].indexOf(".") ? a.Point.prototype.setNestedProperty(d, c[b], p[n]) : d[p[n]] =
                    c[b]), b++, n++; else "object" === typeof c && (d = c, c.dataLabels && (e._hasPointLabels = !0), c.marker && (e._hasPointMarkers = !0));
                return d
            }, getClassName: function () {
                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + (void 0 !== this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative",
                    "") : "")
            }, getZone: function () {
                var a = this.series, d = a.zones, a = a.zoneAxis || "y", e = 0, g;
                for (g = d[e]; this[a] >= g.value;) g = d[++e];
                this.nonZonedColor || (this.nonZonedColor = this.color);
                this.color = g && g.color && !this.options.color ? g.color : this.nonZonedColor;
                return g
            }, destroy: function () {
                var a = this.series.chart, d = a.hoverPoints, e;
                a.pointCount--;
                d && (this.setState(), r(d, this), d.length || (a.hoverPoints = null));
                if (this === a.hoverPoint) this.onMouseOut();
                if (this.graphic || this.dataLabel) u(this), this.destroyElements();
                this.legendItem &&
                a.legend.destroyItem(this);
                for (e in this) this[e] = null
            }, destroyElements: function () {
                for (var a = ["graphic", "dataLabel", "dataLabelUpper", "connector", "shadowGroup"], d, e = 6; e--;) d = a[e], this[d] && (this[d] = this[d].destroy())
            }, getLabelConfig: function () {
                return {
                    x: this.category,
                    y: this.y,
                    color: this.color,
                    colorIndex: this.colorIndex,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            }, tooltipFormatter: function (a) {
                var c = this.series, g = c.tooltipOptions,
                    t = l(g.valueDecimals, ""), p = g.valuePrefix || "", f = g.valueSuffix || "";
                F(c.pointArrayMap || ["y"], function (b) {
                    b = "{point." + b;
                    if (p || f) a = a.replace(RegExp(b + "}", "g"), p + b + "}" + f);
                    a = a.replace(RegExp(b + "}", "g"), b + ":,." + t + "f}")
                });
                return e(a, {point: this, series: this.series}, c.chart.time)
            }, firePointEvent: function (a, d, e) {
                var c = this, k = this.series.options;
                (k.point.events[a] || c.options && c.options.events && c.options.events[a]) && this.importEvents();
                "click" === a && k.allowPointSelect && (e = function (a) {
                    c.select && c.select(null, a.ctrlKey ||
                        a.metaKey || a.shiftKey)
                });
                g(this, a, d, e)
            }, visible: !0
        }
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.animObject, D = a.arrayMax, r = a.arrayMin, g = a.correctFloat, e = a.defaultOptions,
            t = a.defaultPlotOptions, w = a.defined, l = a.each, u = a.erase, c = a.extend, d = a.fireEvent, k = a.grep,
            x = a.isArray, p = a.isNumber, f = a.isString, b = a.merge, n = a.objectEach, z = a.pick, J = a.removeEvent,
            q = a.splat, L = a.SVGElement, B = a.syncTimeout, H = a.win;
        a.Series = a.seriesType("line", null, {
            lineWidth: 2,
            allowPointSelect: !1,
            showCheckbox: !1,
            animation: {duration: 1E3},
            events: {},
            marker: {
                lineWidth: 0,
                lineColor: "#ffffff",
                enabledThreshold: 2,
                radius: 4,
                states: {
                    normal: {animation: !0},
                    hover: {animation: {duration: 50}, enabled: !0, radiusPlus: 2, lineWidthPlus: 1},
                    select: {fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2}
                }
            },
            point: {events: {}},
            dataLabels: {
                align: "center",
                formatter: function () {
                    return null === this.y ? "" : a.numberFormat(this.y, -1)
                },
                style: {fontSize: "11px", fontWeight: "bold", color: "contrast", textOutline: "1px contrast"},
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                padding: 5
            },
            cropThreshold: 300,
            pointRange: 0,
            softThreshold: !0,
            states: {
                normal: {animation: !0},
                hover: {animation: {duration: 50}, lineWidthPlus: 1, marker: {}, halo: {size: 10, opacity: .25}},
                select: {marker: {}}
            },
            stickyTracking: !0,
            turboThreshold: 1E3,
            findNearestPointBy: "x"
        }, {
            isCartesian: !0,
            pointClass: a.Point,
            sorted: !0,
            requireSorting: !0,
            directTouch: !1,
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            coll: "series",
            init: function (a, b) {
                var f = this, e, m = a.series, h;
                f.chart = a;
                f.options = b = f.setOptions(b);
                f.linkedSeries = [];
                f.bindAxes();
                c(f, {
                    name: b.name,
                    state: "", visible: !1 !== b.visible, selected: !0 === b.selected
                });
                e = b.events;
                n(e, function (a, b) {
                    C(f, b, a)
                });
                if (e && e.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect) a.runTrackerClick = !0;
                f.getColor();
                f.getSymbol();
                l(f.parallelArrays, function (a) {
                    f[a + "Data"] = []
                });
                f.setData(b.data, !1);
                f.isCartesian && (a.hasCartesianSeries = !0);
                m.length && (h = m[m.length - 1]);
                f._i = z(h && h._i, -1) + 1;
                a.orderSeries(this.insert(m));
                d(this, "afterInit")
            },
            insert: function (a) {
                var b = this.options.index, c;
                if (p(b)) {
                    for (c = a.length; c--;) if (b >=
                        z(a[c].options.index, a[c]._i)) {
                        a.splice(c + 1, 0, this);
                        break
                    }
                    -1 === c && a.unshift(this);
                    c += 1
                } else a.push(this);
                return z(c, a.length - 1)
            },
            bindAxes: function () {
                var b = this, c = b.options, d = b.chart, f;
                l(b.axisTypes || [], function (e) {
                    l(d[e], function (a) {
                        f = a.options;
                        if (c[e] === f.index || void 0 !== c[e] && c[e] === f.id || void 0 === c[e] && 0 === f.index) b.insert(a.series), b[e] = a, a.isDirty = !0
                    });
                    b[e] || b.optionalAxis === e || a.error(18, !0)
                })
            },
            updateParallelArrays: function (a, b) {
                var c = a.series, d = arguments, f = p(b) ? function (d) {
                    var f = "y" === d && c.toYData ?
                        c.toYData(a) : a[d];
                    c[d + "Data"][b] = f
                } : function (a) {
                    Array.prototype[b].apply(c[a + "Data"], Array.prototype.slice.call(d, 2))
                };
                l(c.parallelArrays, f)
            },
            autoIncrement: function () {
                var a = this.options, b = this.xIncrement, c, d = a.pointIntervalUnit, f = this.chart.time,
                    b = z(b, a.pointStart, 0);
                this.pointInterval = c = z(this.pointInterval, a.pointInterval, 1);
                d && (a = new f.Date(b), "day" === d ? f.set("Date", a, f.get("Date", a) + c) : "month" === d ? f.set("Month", a, f.get("Month", a) + c) : "year" === d && f.set("FullYear", a, f.get("FullYear", a) + c), c = a.getTime() -
                    b);
                this.xIncrement = b + c;
                return b
            },
            setOptions: function (a) {
                var c = this.chart, f = c.options, m = f.plotOptions, g = (c.userOptions || {}).plotOptions || {},
                    h = m[this.type];
                this.userOptions = a;
                c = b(h, m.series, a);
                this.tooltipOptions = b(e.tooltip, e.plotOptions.series && e.plotOptions.series.tooltip, e.plotOptions[this.type].tooltip, f.tooltip.userOptions, m.series && m.series.tooltip, m[this.type].tooltip, a.tooltip);
                this.stickyTracking = z(a.stickyTracking, g[this.type] && g[this.type].stickyTracking, g.series && g.series.stickyTracking,
                    this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : c.stickyTracking);
                null === h.marker && delete c.marker;
                this.zoneAxis = c.zoneAxis;
                a = this.zones = (c.zones || []).slice();
                !c.negativeColor && !c.negativeFillColor || c.zones || a.push({
                    value: c[this.zoneAxis + "Threshold"] || c.threshold || 0,
                    className: "highcharts-negative",
                    color: c.negativeColor,
                    fillColor: c.negativeFillColor
                });
                a.length && w(a[a.length - 1].value) && a.push({color: this.color, fillColor: this.fillColor});
                d(this, "afterSetOptions", {options: c});
                return c
            },
            getName: function () {
                return this.name ||
                    "Series " + (this.index + 1)
            },
            getCyclic: function (a, b, c) {
                var d, f = this.chart, h = this.userOptions, e = a + "Index", m = a + "Counter",
                    g = c ? c.length : z(f.options.chart[a + "Count"], f[a + "Count"]);
                b || (d = z(h[e], h["_" + e]), w(d) || (f.series.length || (f[m] = 0), h["_" + e] = d = f[m] % g, f[m] += 1), c && (b = c[d]));
                void 0 !== d && (this[e] = d);
                this[a] = b
            },
            getColor: function () {
                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || t[this.type].color, this.chart.options.colors)
            },
            getSymbol: function () {
                this.getCyclic("symbol",
                    this.options.marker.symbol, this.chart.options.symbols)
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawLineMarker,
            updateData: function (b) {
                var c = this.options, d = this.points, f = [], e, h, m, g = this.requireSorting;
                l(b, function (b) {
                    var h;
                    h = a.defined(b) && this.pointClass.prototype.optionsToObject.call({series: this}, b).x;
                    p(h) && (h = a.inArray(h, this.xData, m), -1 === h ? f.push(b) : b !== c.data[h] ? (d[h].update(b, !1, null, !1), d[h].touched = !0, g && (m = h)) : d[h] && (d[h].touched = !0), e = !0)
                }, this);
                if (e) for (b = d.length; b--;) h = d[b], h.touched || h.remove(!1),
                    h.touched = !1; else if (b.length === d.length) l(b, function (a, b) {
                    d[b].update && a !== c.data[b] && d[b].update(a, !1, null, !1)
                }); else return !1;
                l(f, function (a) {
                    this.addPoint(a, !1)
                }, this);
                return !0
            },
            setData: function (b, c, d, e) {
                var m = this, h = m.points, g = h && h.length || 0, q, k = m.options, A = m.chart, n = null,
                    E = m.xAxis, B = k.turboThreshold, t = this.xData, r = this.yData,
                    u = (q = m.pointArrayMap) && q.length, H;
                b = b || [];
                q = b.length;
                c = z(c, !0);
                !1 !== e && q && g && !m.cropped && !m.hasGroupedData && m.visible && (H = this.updateData(b));
                if (!H) {
                    m.xIncrement = null;
                    m.colorCounter =
                        0;
                    l(this.parallelArrays, function (a) {
                        m[a + "Data"].length = 0
                    });
                    if (B && q > B) {
                        for (d = 0; null === n && d < q;) n = b[d], d++;
                        if (p(n)) for (d = 0; d < q; d++) t[d] = this.autoIncrement(), r[d] = b[d]; else if (x(n)) if (u) for (d = 0; d < q; d++) n = b[d], t[d] = n[0], r[d] = n.slice(1, u + 1); else for (d = 0; d < q; d++) n = b[d], t[d] = n[0], r[d] = n[1]; else a.error(12)
                    } else for (d = 0; d < q; d++) void 0 !== b[d] && (n = {series: m}, m.pointClass.prototype.applyOptions.apply(n, [b[d]]), m.updateParallelArrays(n, d));
                    r && f(r[0]) && a.error(14, !0);
                    m.data = [];
                    m.options.data = m.userOptions.data =
                        b;
                    for (d = g; d--;) h[d] && h[d].destroy && h[d].destroy();
                    E && (E.minRange = E.userMinRange);
                    m.isDirty = A.isDirtyBox = !0;
                    m.isDirtyData = !!h;
                    d = !1
                }
                "point" === k.legendType && (this.processData(), this.generatePoints());
                c && A.redraw(d)
            },
            processData: function (b) {
                var c = this.xData, d = this.yData, f = c.length, e;
                e = 0;
                var h, m, g = this.xAxis, q, k = this.options;
                q = k.cropThreshold;
                var p = this.getExtremesFromAll || k.getExtremesFromAll, n = this.isCartesian, k = g && g.val2lin,
                    l = g && g.isLog, B = this.requireSorting, t, r;
                if (n && !this.isDirty && !g.isDirty && !this.yAxis.isDirty &&
                    !b) return !1;
                g && (b = g.getExtremes(), t = b.min, r = b.max);
                if (n && this.sorted && !p && (!q || f > q || this.forceCrop)) if (c[f - 1] < t || c[0] > r) c = [], d = []; else if (c[0] < t || c[f - 1] > r) e = this.cropData(this.xData, this.yData, t, r), c = e.xData, d = e.yData, e = e.start, h = !0;
                for (q = c.length || 1; --q;) f = l ? k(c[q]) - k(c[q - 1]) : c[q] - c[q - 1], 0 < f && (void 0 === m || f < m) ? m = f : 0 > f && B && (a.error(15), B = !1);
                this.cropped = h;
                this.cropStart = e;
                this.processedXData = c;
                this.processedYData = d;
                this.closestPointRange = m
            },
            cropData: function (a, b, c, d, f) {
                var h = a.length, e = 0, m = h, g;
                f =
                    z(f, this.cropShoulder, 1);
                for (g = 0; g < h; g++) if (a[g] >= c) {
                    e = Math.max(0, g - f);
                    break
                }
                for (c = g; c < h; c++) if (a[c] > d) {
                    m = c + f;
                    break
                }
                return {xData: a.slice(e, m), yData: b.slice(e, m), start: e, end: m}
            },
            generatePoints: function () {
                var a = this.options, b = a.data, c = this.data, d, f = this.processedXData, h = this.processedYData,
                    e = this.pointClass, g = f.length, k = this.cropStart || 0, p, n = this.hasGroupedData, a = a.keys,
                    l, B = [], t;
                c || n || (c = [], c.length = b.length, c = this.data = c);
                a && n && (this.options.keys = !1);
                for (t = 0; t < g; t++) p = k + t, n ? (l = (new e).init(this, [f[t]].concat(q(h[t]))),
                    l.dataGroup = this.groupMap[t]) : (l = c[p]) || void 0 === b[p] || (c[p] = l = (new e).init(this, b[p], f[t])), l && (l.index = p, B[t] = l);
                this.options.keys = a;
                if (c && (g !== (d = c.length) || n)) for (t = 0; t < d; t++) t !== k || n || (t += g), c[t] && (c[t].destroyElements(), c[t].plotX = void 0);
                this.data = c;
                this.points = B
            },
            getExtremes: function (a) {
                var b = this.yAxis, c = this.processedXData, d, f = [], h = 0;
                d = this.xAxis.getExtremes();
                var e = d.min, m = d.max, g, q, k = this.requireSorting ? 1 : 0, n, l;
                a = a || this.stackedYData || this.processedYData || [];
                d = a.length;
                for (l = 0; l < d; l++) if (q =
                    c[l], n = a[l], g = (p(n, !0) || x(n)) && (!b.positiveValuesOnly || n.length || 0 < n), q = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || (c[l + k] || q) >= e && (c[l - k] || q) <= m, g && q) if (g = n.length) for (; g--;) "number" === typeof n[g] && (f[h++] = n[g]); else f[h++] = n;
                this.dataMin = r(f);
                this.dataMax = D(f)
            },
            translate: function () {
                this.processedXData || this.processData();
                this.generatePoints();
                var a = this.options, b = a.stacking, c = this.xAxis, f = c.categories, e = this.yAxis, h = this.points,
                    q = h.length, k = !!this.modifyValue, n = a.pointPlacement,
                    l = "between" === n || p(n), t = a.threshold, B = a.startFromThreshold ? t : 0, r, x, u, H,
                    J = Number.MAX_VALUE;
                "between" === n && (n = .5);
                p(n) && (n *= z(a.pointRange || c.pointRange));
                for (a = 0; a < q; a++) {
                    var L = h[a], C = L.x, D = L.y;
                    x = L.low;
                    var F = b && e.stacks[(this.negStacks && D < (B ? 0 : t) ? "-" : "") + this.stackKey], K;
                    e.positiveValuesOnly && null !== D && 0 >= D && (L.isNull = !0);
                    L.plotX = r = g(Math.min(Math.max(-1E5, c.translate(C, 0, 0, 0, 1, n, "flags" === this.type)), 1E5));
                    b && this.visible && !L.isNull && F && F[C] && (H = this.getStackIndicator(H, C, this.index), K = F[C], D = K.points[H.key],
                        x = D[0], D = D[1], x === B && H.key === F[C].base && (x = z(p(t) && t, e.min)), e.positiveValuesOnly && 0 >= x && (x = null), L.total = L.stackTotal = K.total, L.percentage = K.total && L.y / K.total * 100, L.stackY = D, K.setOffset(this.pointXOffset || 0, this.barW || 0));
                    L.yBottom = w(x) ? Math.min(Math.max(-1E5, e.translate(x, 0, 1, 0, 1)), 1E5) : null;
                    k && (D = this.modifyValue(D, L));
                    L.plotY = x = "number" === typeof D && Infinity !== D ? Math.min(Math.max(-1E5, e.translate(D, 0, 1, 0, 1)), 1E5) : void 0;
                    L.isInside = void 0 !== x && 0 <= x && x <= e.len && 0 <= r && r <= c.len;
                    L.clientX = l ? g(c.translate(C,
                        0, 0, 0, 1, n)) : r;
                    L.negative = L.y < (t || 0);
                    L.category = f && void 0 !== f[L.x] ? f[L.x] : L.x;
                    L.isNull || (void 0 !== u && (J = Math.min(J, Math.abs(r - u))), u = r);
                    L.zone = this.zones.length && L.getZone()
                }
                this.closestPointRangePx = J;
                d(this, "afterTranslate")
            },
            getValidPoints: function (a, b) {
                var c = this.chart;
                return k(a || this.points || [], function (a) {
                    return b && !c.isInsidePlot(a.plotX, a.plotY, c.inverted) ? !1 : !a.isNull
                })
            },
            setClip: function (a) {
                var b = this.chart, c = this.options, d = b.renderer, f = b.inverted, h = this.clipBox,
                    e = h || b.clipBox, m = this.sharedClipKey ||
                    ["_sharedClip", a && a.duration, a && a.easing, e.height, c.xAxis, c.yAxis].join(), g = b[m],
                    q = b[m + "m"];
                g || (a && (e.width = 0, f && (e.x = b.plotSizeX), b[m + "m"] = q = d.clipRect(f ? b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[m] = g = d.clipRect(e), g.count = {length: 0});
                a && !g.count[this.index] && (g.count[this.index] = !0, g.count.length += 1);
                !1 !== c.clip && (this.group.clip(a || h ? g : b.clipRect), this.markerGroup.clip(q), this.sharedClipKey = m);
                a || (g.count[this.index] && (delete g.count[this.index], --g.count.length),
                0 === g.count.length && m && b[m] && (h || (b[m] = b[m].destroy()), b[m + "m"] && (b[m + "m"] = b[m + "m"].destroy())))
            },
            animate: function (a) {
                var b = this.chart, c = F(this.options.animation), d;
                a ? this.setClip(c) : (d = this.sharedClipKey, (a = b[d]) && a.animate({
                    width: b.plotSizeX,
                    x: 0
                }, c), b[d + "m"] && b[d + "m"].animate({width: b.plotSizeX + 99, x: 0}, c), this.animate = null)
            },
            afterAnimate: function () {
                this.setClip();
                d(this, "afterAnimate");
                this.finishedAnimating = !0
            },
            drawPoints: function () {
                var a = this.points, b = this.chart, c, d, f, h, e = this.options.marker,
                    g, q, k, p = this[this.specialGroup] || this.markerGroup, n,
                    l = z(e.enabled, this.xAxis.isRadial ? !0 : null, this.closestPointRangePx >= e.enabledThreshold * e.radius);
                if (!1 !== e.enabled || this._hasPointMarkers) for (c = 0; c < a.length; c++) d = a[c], h = d.graphic, g = d.marker || {}, q = !!d.marker, f = l && void 0 === g.enabled || g.enabled, k = d.isInside, f && !d.isNull ? (f = z(g.symbol, this.symbol), n = this.markerAttribs(d, d.selected && "select"), h ? h[k ? "show" : "hide"](!0).animate(n) : k && (0 < n.width || d.hasImage) && (d.graphic = h = b.renderer.symbol(f, n.x, n.y, n.width,
                    n.height, q ? g : e).add(p)), h && h.attr(this.pointAttribs(d, d.selected && "select")), h && h.addClass(d.getClassName(), !0)) : h && (d.graphic = h.destroy())
            },
            markerAttribs: function (a, b) {
                var c = this.options.marker, d = a.marker || {}, f = d.symbol || c.symbol, h = z(d.radius, c.radius);
                b && (c = c.states[b], b = d.states && d.states[b], h = z(b && b.radius, c && c.radius, h + (c && c.radiusPlus || 0)));
                a.hasImage = f && 0 === f.indexOf("url");
                a.hasImage && (h = 0);
                a = {x: Math.floor(a.plotX) - h, y: a.plotY - h};
                h && (a.width = a.height = 2 * h);
                return a
            },
            pointAttribs: function (a,
                                    b) {
                var c = this.options.marker, d = a && a.options, f = d && d.marker || {}, h = this.color,
                    e = d && d.color, g = a && a.color, d = z(f.lineWidth, c.lineWidth);
                a = a && a.zone && a.zone.color;
                h = e || a || g || h;
                a = f.fillColor || c.fillColor || h;
                h = f.lineColor || c.lineColor || h;
                b && (c = c.states[b], b = f.states && f.states[b] || {}, d = z(b.lineWidth, c.lineWidth, d + z(b.lineWidthPlus, c.lineWidthPlus, 0)), a = b.fillColor || c.fillColor || a, h = b.lineColor || c.lineColor || h);
                return {stroke: h, "stroke-width": d, fill: a}
            },
            destroy: function () {
                var b = this, c = b.chart, f = /AppleWebKit\/533/.test(H.navigator.userAgent),
                    e, g, h = b.data || [], q, k;
                d(b, "destroy");
                J(b);
                l(b.axisTypes || [], function (a) {
                    (k = b[a]) && k.series && (u(k.series, b), k.isDirty = k.forceRedraw = !0)
                });
                b.legendItem && b.chart.legend.destroyItem(b);
                for (g = h.length; g--;) (q = h[g]) && q.destroy && q.destroy();
                b.points = null;
                a.clearTimeout(b.animationTimeout);
                n(b, function (a, b) {
                    a instanceof L && !a.survive && (e = f && "group" === b ? "hide" : "destroy", a[e]())
                });
                c.hoverSeries === b && (c.hoverSeries = null);
                u(c.series, b);
                c.orderSeries();
                n(b, function (a, c) {
                    delete b[c]
                })
            },
            getGraphPath: function (a, b,
                                    c) {
                var d = this, f = d.options, h = f.step, e, g = [], m = [], q;
                a = a || d.points;
                (e = a.reversed) && a.reverse();
                (h = {right: 1, center: 2}[h] || h && 3) && e && (h = 4 - h);
                !f.connectNulls || b || c || (a = this.getValidPoints(a));
                l(a, function (e, k) {
                    var n = e.plotX, p = e.plotY, l = a[k - 1];
                    (e.leftCliff || l && l.rightCliff) && !c && (q = !0);
                    e.isNull && !w(b) && 0 < k ? q = !f.connectNulls : e.isNull && !b ? q = !0 : (0 === k || q ? k = ["M", e.plotX, e.plotY] : d.getPointSpline ? k = d.getPointSpline(a, e, k) : h ? (k = 1 === h ? ["L", l.plotX, p] : 2 === h ? ["L", (l.plotX + n) / 2, l.plotY, "L", (l.plotX + n) / 2, p] : ["L", n,
                        l.plotY], k.push("L", n, p)) : k = ["L", n, p], m.push(e.x), h && (m.push(e.x), 2 === h && m.push(e.x)), g.push.apply(g, k), q = !1)
                });
                g.xMap = m;
                return d.graphPath = g
            },
            drawGraph: function () {
                var a = this, b = this.options, c = (this.gappedPath || this.getGraphPath).call(this),
                    d = [["graph", "highcharts-graph", b.lineColor || this.color, b.dashStyle]],
                    d = a.getZonesGraphs(d);
                l(d, function (d, f) {
                    var e = d[0], h = a[e];
                    h ? (h.endX = a.preventGraphAnimation ? null : c.xMap, h.animate({d: c})) : c.length && (a[e] = a.chart.renderer.path(c).addClass(d[1]).attr({zIndex: 1}).add(a.group),
                        h = {
                            stroke: d[2],
                            "stroke-width": b.lineWidth,
                            fill: a.fillGraph && a.color || "none"
                        }, d[3] ? h.dashstyle = d[3] : "square" !== b.linecap && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), h = a[e].attr(h).shadow(2 > f && b.shadow));
                    h && (h.startX = c.xMap, h.isArea = c.isArea)
                })
            },
            getZonesGraphs: function (a) {
                l(this.zones, function (b, c) {
                    a.push(["zone-graph-" + c, "highcharts-graph highcharts-zone-graph-" + c + " " + (b.className || ""), b.color || this.color, b.dashStyle || this.options.dashStyle])
                }, this);
                return a
            },
            applyZones: function () {
                var a = this,
                    b = this.chart, c = b.renderer, d = this.zones, f, e, g = this.clips || [], q, k = this.graph,
                    n = this.area, p = Math.max(b.chartWidth, b.chartHeight), t = this[(this.zoneAxis || "y") + "Axis"],
                    B, r, x = b.inverted, u, H, w, L, J = !1;
                d.length && (k || n) && t && void 0 !== t.min && (r = t.reversed, u = t.horiz, k && !this.showLine && k.hide(), n && n.hide(), B = t.getExtremes(), l(d, function (d, h) {
                    f = r ? u ? b.plotWidth : 0 : u ? 0 : t.toPixels(B.min);
                    f = Math.min(Math.max(z(e, f), 0), p);
                    e = Math.min(Math.max(Math.round(t.toPixels(z(d.value, B.max), !0)), 0), p);
                    J && (f = e = t.toPixels(B.max));
                    H = Math.abs(f - e);
                    w = Math.min(f, e);
                    L = Math.max(f, e);
                    t.isXAxis ? (q = {
                        x: x ? L : w,
                        y: 0,
                        width: H,
                        height: p
                    }, u || (q.x = b.plotHeight - q.x)) : (q = {
                        x: 0,
                        y: x ? L : w,
                        width: p,
                        height: H
                    }, u && (q.y = b.plotWidth - q.y));
                    x && c.isVML && (q = t.isXAxis ? {
                        x: 0,
                        y: r ? w : L,
                        height: q.width,
                        width: b.chartWidth
                    } : {x: q.y - b.plotLeft - b.spacingBox.x, y: 0, width: q.height, height: b.chartHeight});
                    g[h] ? g[h].animate(q) : (g[h] = c.clipRect(q), k && a["zone-graph-" + h].clip(g[h]), n && a["zone-area-" + h].clip(g[h]));
                    J = d.value > B.max;
                    a.resetZones && 0 === e && (e = void 0)
                }), this.clips = g)
            },
            invertGroups: function (a) {
                function b() {
                    l(["group",
                        "markerGroup"], function (b) {
                        c[b] && (d.renderer.isVML && c[b].attr({
                            width: c.yAxis.len,
                            height: c.xAxis.len
                        }), c[b].width = c.yAxis.len, c[b].height = c.xAxis.len, c[b].invert(a))
                    })
                }

                var c = this, d = c.chart, f;
                c.xAxis && (f = C(d, "resize", b), C(c, "destroy", f), b(a), c.invertGroups = b)
            },
            plotGroup: function (a, b, c, d, f) {
                var e = this[a], g = !e;
                g && (this[a] = e = this.chart.renderer.g().attr({zIndex: d || .1}).add(f));
                e.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (w(this.colorIndex) ? "highcharts-color-" +
                    this.colorIndex + " " : "") + (this.options.className || "") + (e.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0);
                e.attr({visibility: c})[g ? "attr" : "animate"](this.getPlotBox());
                return e
            },
            getPlotBox: function () {
                var a = this.chart, b = this.xAxis, c = this.yAxis;
                a.inverted && (b = c, c = this.xAxis);
                return {translateX: b ? b.left : a.plotLeft, translateY: c ? c.top : a.plotTop, scaleX: 1, scaleY: 1}
            },
            render: function () {
                var a = this, b = a.chart, c, f = a.options,
                    e = !!a.animate && b.renderer.isSVG && F(f.animation).duration, h = a.visible ? "inherit" :
                    "hidden", g = f.zIndex, q = a.hasRendered, k = b.seriesGroup, n = b.inverted;
                c = a.plotGroup("group", "series", h, g, k);
                a.markerGroup = a.plotGroup("markerGroup", "markers", h, g, k);
                e && a.animate(!0);
                c.inverted = a.isCartesian ? n : !1;
                a.drawGraph && (a.drawGraph(), a.applyZones());
                a.drawDataLabels && a.drawDataLabels();
                a.visible && a.drawPoints();
                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker();
                a.invertGroups(n);
                !1 === f.clip || a.sharedClipKey || q || c.clip(b.clipRect);
                e && a.animate();
                q || (a.animationTimeout = B(function () {
                        a.afterAnimate()
                    },
                    e));
                a.isDirty = !1;
                a.hasRendered = !0;
                d(a, "afterRender")
            },
            redraw: function () {
                var a = this.chart, b = this.isDirty || this.isDirtyData, c = this.group, d = this.xAxis,
                    f = this.yAxis;
                c && (a.inverted && c.attr({
                    width: a.plotWidth,
                    height: a.plotHeight
                }), c.animate({translateX: z(d && d.left, a.plotLeft), translateY: z(f && f.top, a.plotTop)}));
                this.translate();
                this.render();
                b && delete this.kdTree
            },
            kdAxisArray: ["clientX", "plotY"],
            searchPoint: function (a, b) {
                var c = this.xAxis, d = this.yAxis, f = this.chart.inverted;
                return this.searchKDTree({
                    clientX: f ?
                        c.len - a.chartY + c.pos : a.chartX - c.pos,
                    plotY: f ? d.len - a.chartX + d.pos : a.chartY - d.pos
                }, b)
            },
            buildKDTree: function () {
                function a(c, d, f) {
                    var e, h;
                    if (h = c && c.length) return e = b.kdAxisArray[d % f], c.sort(function (a, b) {
                        return a[e] - b[e]
                    }), h = Math.floor(h / 2), {
                        point: c[h],
                        left: a(c.slice(0, h), d + 1, f),
                        right: a(c.slice(h + 1), d + 1, f)
                    }
                }

                this.buildingKdTree = !0;
                var b = this, c = -1 < b.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                delete b.kdTree;
                B(function () {
                    b.kdTree = a(b.getValidPoints(null, !b.directTouch), c, c);
                    b.buildingKdTree = !1
                }, b.options.kdNow ?
                    0 : 1)
            },
            searchKDTree: function (a, b) {
                function c(a, b, h, m) {
                    var q = b.point, k = d.kdAxisArray[h % m], n, p, l = q;
                    p = w(a[f]) && w(q[f]) ? Math.pow(a[f] - q[f], 2) : null;
                    n = w(a[e]) && w(q[e]) ? Math.pow(a[e] - q[e], 2) : null;
                    n = (p || 0) + (n || 0);
                    q.dist = w(n) ? Math.sqrt(n) : Number.MAX_VALUE;
                    q.distX = w(p) ? Math.sqrt(p) : Number.MAX_VALUE;
                    k = a[k] - q[k];
                    n = 0 > k ? "left" : "right";
                    p = 0 > k ? "right" : "left";
                    b[n] && (n = c(a, b[n], h + 1, m), l = n[g] < l[g] ? n : q);
                    b[p] && Math.sqrt(k * k) < l[g] && (a = c(a, b[p], h + 1, m), l = a[g] < l[g] ? a : l);
                    return l
                }

                var d = this, f = this.kdAxisArray[0], e = this.kdAxisArray[1],
                    g = b ? "distX" : "dist";
                b = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1;
                this.kdTree || this.buildingKdTree || this.buildKDTree();
                if (this.kdTree) return c(a, this.kdTree, b, b)
            }
        })
    })(K);
    (function (a) {
        var C = a.Axis, F = a.Chart, D = a.correctFloat, r = a.defined, g = a.destroyObjectProperties, e = a.each,
            t = a.format, w = a.objectEach, l = a.pick, u = a.Series;
        a.StackItem = function (a, d, e, g, p) {
            var c = a.chart.inverted;
            this.axis = a;
            this.isNegative = e;
            this.options = d;
            this.x = g;
            this.total = null;
            this.points = {};
            this.stack = p;
            this.rightCliff = this.leftCliff =
                0;
            this.alignOptions = {
                align: d.align || (c ? e ? "left" : "right" : "center"),
                verticalAlign: d.verticalAlign || (c ? "middle" : e ? "bottom" : "top"),
                y: l(d.y, c ? 4 : e ? 14 : -6),
                x: l(d.x, c ? e ? -6 : 6 : 0)
            };
            this.textAlign = d.textAlign || (c ? e ? "right" : "left" : "center")
        };
        a.StackItem.prototype = {
            destroy: function () {
                g(this, this.axis)
            }, render: function (a) {
                var c = this.axis.chart, e = this.options, g = e.format,
                    g = g ? t(g, this, c.time) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: g,
                    visibility: "hidden"
                }) : this.label = c.renderer.text(g, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation, visibility: "hidden"
                }).add(a)
            }, setOffset: function (a, d) {
                var c = this.axis, e = c.chart, g = c.translate(c.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    f = c.translate(0), f = Math.abs(g - f);
                a = e.xAxis[0].translate(this.x) + a;
                c = this.getStackBox(e, this, a, g, d, f, c);
                if (d = this.label) d.align(this.alignOptions, null, c), c = d.alignAttr, d[!1 === this.options.crop || e.isInsidePlot(c.x, c.y) ? "show" : "hide"](!0)
            }, getStackBox: function (a, d, e, g, p, f, b) {
                var c = d.axis.reversed, k = a.inverted;
                a = b.height + b.pos - a.plotTop;
                d = d.isNegative &&
                    !c || !d.isNegative && c;
                return {
                    x: k ? d ? g : g - f : e,
                    y: k ? a - e - p : d ? a - g - f : a - g,
                    width: k ? f : p,
                    height: k ? p : f
                }
            }
        };
        F.prototype.getStacks = function () {
            var a = this;
            e(a.yAxis, function (a) {
                a.stacks && a.hasVisibleSeries && (a.oldStacks = a.stacks)
            });
            e(a.series, function (c) {
                !c.options.stacking || !0 !== c.visible && !1 !== a.options.chart.ignoreHiddenSeries || (c.stackKey = c.type + l(c.options.stack, ""))
            })
        };
        C.prototype.buildStacks = function () {
            var a = this.series, d = l(this.options.reversedStacks, !0), e = a.length, g;
            if (!this.isXAxis) {
                this.usePercentage = !1;
                for (g = e; g--;) a[d ? g : e - g - 1].setStackedPoints();
                for (g = 0; g < e; g++) a[g].modifyStacks()
            }
        };
        C.prototype.renderStackTotals = function () {
            var a = this.chart, d = a.renderer, e = this.stacks, g = this.stackTotalGroup;
            g || (this.stackTotalGroup = g = d.g("stack-labels").attr({visibility: "visible", zIndex: 6}).add());
            g.translate(a.plotLeft, a.plotTop);
            w(e, function (a) {
                w(a, function (a) {
                    a.render(g)
                })
            })
        };
        C.prototype.resetStacks = function () {
            var a = this, d = a.stacks;
            a.isXAxis || w(d, function (c) {
                w(c, function (d, e) {
                    d.touched < a.stacksTouched ? (d.destroy(),
                        delete c[e]) : (d.total = null, d.cumulative = null)
                })
            })
        };
        C.prototype.cleanStacks = function () {
            var a;
            this.isXAxis || (this.oldStacks && (a = this.stacks = this.oldStacks), w(a, function (a) {
                w(a, function (a) {
                    a.cumulative = a.total
                })
            }))
        };
        u.prototype.setStackedPoints = function () {
            if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                var c = this.processedXData, d = this.processedYData, e = [], g = d.length, p = this.options,
                    f = p.threshold, b = l(p.startFromThreshold && f, 0), n = p.stack, p = p.stacking,
                    t = this.stackKey,
                    u = "-" + t, q = this.negStacks, w = this.yAxis, B = w.stacks, H = w.oldStacks, m, E, A, M, G, h, v;
                w.stacksTouched += 1;
                for (G = 0; G < g; G++) h = c[G], v = d[G], m = this.getStackIndicator(m, h, this.index), M = m.key, A = (E = q && v < (b ? 0 : f)) ? u : t, B[A] || (B[A] = {}), B[A][h] || (H[A] && H[A][h] ? (B[A][h] = H[A][h], B[A][h].total = null) : B[A][h] = new a.StackItem(w, w.options.stackLabels, E, h, n)), A = B[A][h], null !== v ? (A.points[M] = A.points[this.index] = [l(A.cumulative, b)], r(A.cumulative) || (A.base = M), A.touched = w.stacksTouched, 0 < m.index && !1 === this.singleStacks && (A.points[M][0] =
                    A.points[this.index + "," + h + ",0"][0])) : A.points[M] = A.points[this.index] = null, "percent" === p ? (E = E ? t : u, q && B[E] && B[E][h] ? (E = B[E][h], A.total = E.total = Math.max(E.total, A.total) + Math.abs(v) || 0) : A.total = D(A.total + (Math.abs(v) || 0))) : A.total = D(A.total + (v || 0)), A.cumulative = l(A.cumulative, b) + (v || 0), null !== v && (A.points[M].push(A.cumulative), e[G] = A.cumulative);
                "percent" === p && (w.usePercentage = !0);
                this.stackedYData = e;
                w.oldStacks = {}
            }
        };
        u.prototype.modifyStacks = function () {
            var a = this, d = a.stackKey, g = a.yAxis.stacks, l = a.processedXData,
                p, f = a.options.stacking;
            a[f + "Stacker"] && e([d, "-" + d], function (b) {
                for (var c = l.length, d, e; c--;) if (d = l[c], p = a.getStackIndicator(p, d, a.index, b), e = (d = g[b] && g[b][d]) && d.points[p.key]) a[f + "Stacker"](e, d, c)
            })
        };
        u.prototype.percentStacker = function (a, d, e) {
            d = d.total ? 100 / d.total : 0;
            a[0] = D(a[0] * d);
            a[1] = D(a[1] * d);
            this.stackedYData[e] = a[1]
        };
        u.prototype.getStackIndicator = function (a, d, e, g) {
            !r(a) || a.x !== d || g && a.key !== g ? a = {x: d, index: 0, key: g} : a.index++;
            a.key = [e, d, a.index].join();
            return a
        }
    })(K);
    (function (a) {
        var C = a.addEvent,
            F = a.animate, D = a.Axis, r = a.createElement, g = a.css, e = a.defined, t = a.each, w = a.erase,
            l = a.extend, u = a.fireEvent, c = a.inArray, d = a.isNumber, k = a.isObject, x = a.isArray, p = a.merge,
            f = a.objectEach, b = a.pick, n = a.Point, z = a.Series, J = a.seriesTypes, q = a.setAnimation, L = a.splat;
        l(a.Chart.prototype, {
            addSeries: function (a, c, d) {
                var f, e = this;
                a && (c = b(c, !0), u(e, "addSeries", {options: a}, function () {
                    f = e.initSeries(a);
                    e.isDirtyLegend = !0;
                    e.linkSeries();
                    u(e, "afterAddSeries");
                    c && e.redraw(d)
                }));
                return f
            },
            addAxis: function (a, c, d, f) {
                var e = c ? "xAxis" :
                    "yAxis", g = this.options;
                a = p(a, {index: this[e].length, isX: c});
                c = new D(this, a);
                g[e] = L(g[e] || {});
                g[e].push(a);
                b(d, !0) && this.redraw(f);
                return c
            },
            showLoading: function (a) {
                var b = this, c = b.options, d = b.loadingDiv, f = c.loading, e = function () {
                    d && g(d, {
                        left: b.plotLeft + "px",
                        top: b.plotTop + "px",
                        width: b.plotWidth + "px",
                        height: b.plotHeight + "px"
                    })
                };
                d || (b.loadingDiv = d = r("div", {className: "highcharts-loading highcharts-loading-hidden"}, null, b.container), b.loadingSpan = r("span", {className: "highcharts-loading-inner"}, null, d), C(b,
                    "redraw", e));
                d.className = "highcharts-loading";
                b.loadingSpan.innerHTML = a || c.lang.loading;
                g(d, l(f.style, {zIndex: 10}));
                g(b.loadingSpan, f.labelStyle);
                b.loadingShown || (g(d, {
                    opacity: 0,
                    display: ""
                }), F(d, {opacity: f.style.opacity || .5}, {duration: f.showDuration || 0}));
                b.loadingShown = !0;
                e()
            },
            hideLoading: function () {
                var a = this.options, b = this.loadingDiv;
                b && (b.className = "highcharts-loading highcharts-loading-hidden", F(b, {opacity: 0}, {
                    duration: a.loading.hideDuration || 100,
                    complete: function () {
                        g(b, {display: "none"})
                    }
                }));
                this.loadingShown = !1
            },
            propsRequireDirtyBox: "backgroundColor borderColor borderWidth margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
            propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),
            update: function (a, g, m, q) {
                var k = this, n = {
                    credits: "addCredits",
                    title: "setTitle", subtitle: "setSubtitle"
                }, l = a.chart, h, v, r = [];
                u(k, "update", {options: a});
                if (l) {
                    p(!0, k.options.chart, l);
                    "className" in l && k.setClassName(l.className);
                    "reflow" in l && k.setReflow(l.reflow);
                    if ("inverted" in l || "polar" in l) k.propFromSeries(), h = !0;
                    "alignTicks" in l && (h = !0);
                    f(l, function (a, b) {
                        -1 !== c("chart." + b, k.propsRequireUpdateSeries) && (v = !0);
                        -1 !== c(b, k.propsRequireDirtyBox) && (k.isDirtyBox = !0)
                    });
                    "style" in l && k.renderer.setStyle(l.style)
                }
                a.colors && (this.options.colors = a.colors);
                a.plotOptions &&
                p(!0, this.options.plotOptions, a.plotOptions);
                f(a, function (a, b) {
                    if (k[b] && "function" === typeof k[b].update) k[b].update(a, !1); else if ("function" === typeof k[n[b]]) k[n[b]](a);
                    "chart" !== b && -1 !== c(b, k.propsRequireUpdateSeries) && (v = !0)
                });
                t("xAxis yAxis zAxis series colorAxis pane".split(" "), function (b) {
                    a[b] && (t(L(a[b]), function (a, c) {
                        (c = e(a.id) && k.get(a.id) || k[b][c]) && c.coll === b && (c.update(a, !1), m && (c.touched = !0));
                        if (!c && m) if ("series" === b) k.addSeries(a, !1).touched = !0; else if ("xAxis" === b || "yAxis" === b) k.addAxis(a,
                            "xAxis" === b, !1).touched = !0
                    }), m && t(k[b], function (a) {
                        a.touched ? delete a.touched : r.push(a)
                    }))
                });
                t(r, function (a) {
                    a.remove(!1)
                });
                h && t(k.axes, function (a) {
                    a.update({}, !1)
                });
                v && t(k.series, function (a) {
                    a.update({}, !1)
                });
                a.loading && p(!0, k.options.loading, a.loading);
                h = l && l.width;
                l = l && l.height;
                d(h) && h !== k.chartWidth || d(l) && l !== k.chartHeight ? k.setSize(h, l, q) : b(g, !0) && k.redraw(q)
            },
            setSubtitle: function (a) {
                this.setTitle(void 0, a)
            }
        });
        l(n.prototype, {
            update: function (a, c, d, f) {
                function e() {
                    g.applyOptions(a);
                    null === g.y &&
                    h && (g.graphic = h.destroy());
                    k(a, !0) && (h && h.element && a && a.marker && void 0 !== a.marker.symbol && (g.graphic = h.destroy()), a && a.dataLabels && g.dataLabel && (g.dataLabel = g.dataLabel.destroy()), g.connector && (g.connector = g.connector.destroy()));
                    m = g.index;
                    q.updateParallelArrays(g, m);
                    p.data[m] = k(p.data[m], !0) || k(a, !0) ? g.options : b(a, p.data[m]);
                    q.isDirty = q.isDirtyData = !0;
                    !q.fixedBox && q.hasCartesianSeries && (n.isDirtyBox = !0);
                    "point" === p.legendType && (n.isDirtyLegend = !0);
                    c && n.redraw(d)
                }

                var g = this, q = g.series, h = g.graphic,
                    m, n = q.chart, p = q.options;
                c = b(c, !0);
                !1 === f ? e() : g.firePointEvent("update", {options: a}, e)
            }, remove: function (a, b) {
                this.series.removePoint(c(this, this.series.data), a, b)
            }
        });
        l(z.prototype, {
            addPoint: function (a, c, d, f) {
                var e = this.options, g = this.data, q = this.chart, h = this.xAxis, h = h && h.hasNames && h.names,
                    m = e.data, k, n, p = this.xData, l, t;
                c = b(c, !0);
                k = {series: this};
                this.pointClass.prototype.applyOptions.apply(k, [a]);
                t = k.x;
                l = p.length;
                if (this.requireSorting && t < p[l - 1]) for (n = !0; l && p[l - 1] > t;) l--;
                this.updateParallelArrays(k,
                    "splice", l, 0, 0);
                this.updateParallelArrays(k, l);
                h && k.name && (h[t] = k.name);
                m.splice(l, 0, a);
                n && (this.data.splice(l, 0, null), this.processData());
                "point" === e.legendType && this.generatePoints();
                d && (g[0] && g[0].remove ? g[0].remove(!1) : (g.shift(), this.updateParallelArrays(k, "shift"), m.shift()));
                this.isDirtyData = this.isDirty = !0;
                c && q.redraw(f)
            }, removePoint: function (a, c, d) {
                var f = this, e = f.data, g = e[a], m = f.points, h = f.chart, k = function () {
                    m && m.length === e.length && m.splice(a, 1);
                    e.splice(a, 1);
                    f.options.data.splice(a, 1);
                    f.updateParallelArrays(g ||
                        {series: f}, "splice", a, 1);
                    g && g.destroy();
                    f.isDirty = !0;
                    f.isDirtyData = !0;
                    c && h.redraw()
                };
                q(d, h);
                c = b(c, !0);
                g ? g.firePointEvent("remove", null, k) : k()
            }, remove: function (a, c, d) {
                function f() {
                    e.destroy();
                    g.isDirtyLegend = g.isDirtyBox = !0;
                    g.linkSeries();
                    b(a, !0) && g.redraw(c)
                }

                var e = this, g = e.chart;
                !1 !== d ? u(e, "remove", null, f) : f()
            }, update: function (d, f) {
                var e = this, g = e.chart, q = e.userOptions, k = e.oldType || e.type,
                    n = d.type || q.type || g.options.chart.type, h = J[k].prototype, r,
                    B = ["group", "markerGroup", "dataLabelsGroup"], x = ["navigatorSeries",
                        "baseSeries"], z = e.finishedAnimating && {animation: !1}, w = ["data", "name", "turboThreshold"],
                    H = a.keys(d), y = 0 < H.length;
                t(H, function (a) {
                    -1 === c(a, w) && (y = !1)
                });
                if (y) d.data && this.setData(d.data, !1), d.name && this.setName(d.name, !1); else {
                    x = B.concat(x);
                    t(x, function (a) {
                        x[a] = e[a];
                        delete e[a]
                    });
                    d = p(q, z, {index: e.index, pointStart: b(q.pointStart, e.xData[0])}, {data: e.options.data}, d);
                    e.remove(!1, null, !1);
                    for (r in h) e[r] = void 0;
                    J[n || k] ? l(e, J[n || k].prototype) : a.error(17, !0);
                    t(x, function (a) {
                        e[a] = x[a]
                    });
                    e.init(g, d);
                    d.zIndex !==
                    q.zIndex && t(B, function (a) {
                        e[a] && e[a].attr({zIndex: d.zIndex})
                    });
                    e.oldType = k;
                    g.linkSeries()
                }
                u(this, "afterUpdate");
                b(f, !0) && g.redraw(!1)
            }, setName: function (a) {
                this.name = this.options.name = this.userOptions.name = a;
                this.chart.isDirtyLegend = !0
            }
        });
        l(D.prototype, {
            update: function (a, c) {
                var d = this.chart;
                a = p(this.userOptions, a);
                d.options[this.coll].indexOf && (d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)] = a);
                this.destroy(!0);
                this.init(d, l(a, {events: void 0}));
                d.isDirtyBox = !0;
                b(c, !0) && d.redraw()
            },
            remove: function (a) {
                for (var c = this.chart, d = this.coll, f = this.series, e = f.length; e--;) f[e] && f[e].remove(!1);
                w(c.axes, this);
                w(c[d], this);
                x(c.options[d]) ? c.options[d].splice(this.options.index, 1) : delete c.options[d];
                t(c[d], function (a, b) {
                    a.options.index = a.userOptions.index = b
                });
                this.destroy();
                c.isDirtyBox = !0;
                b(a, !0) && c.redraw()
            }, setTitle: function (a, b) {
                this.update({title: a}, b)
            }, setCategories: function (a, b) {
                this.update({categories: a}, b)
            }
        })
    })(K);
    (function (a) {
        var C = a.color, F = a.each, D = a.map, r = a.pick, g = a.Series,
            e = a.seriesType;
        e("area", "line", {softThreshold: !1, threshold: 0}, {
            singleStacks: !1, getStackPoints: function (e) {
                var g = [], l = [], t = this.xAxis, c = this.yAxis, d = c.stacks[this.stackKey], k = {}, x = this.index,
                    p = c.series, f = p.length, b, n = r(c.options.reversedStacks, !0) ? 1 : -1, z;
                e = e || this.points;
                if (this.options.stacking) {
                    for (z = 0; z < e.length; z++) e[z].leftNull = e[z].rightNull = null, k[e[z].x] = e[z];
                    a.objectEach(d, function (a, b) {
                        null !== a.total && l.push(b)
                    });
                    l.sort(function (a, b) {
                        return a - b
                    });
                    b = D(p, function () {
                        return this.visible
                    });
                    F(l,
                        function (a, e) {
                            var q = 0, p, r;
                            if (k[a] && !k[a].isNull) g.push(k[a]), F([-1, 1], function (c) {
                                var g = 1 === c ? "rightNull" : "leftNull", q = 0, m = d[l[e + c]];
                                if (m) for (z = x; 0 <= z && z < f;) p = m.points[z], p || (z === x ? k[a][g] = !0 : b[z] && (r = d[a].points[z]) && (q -= r[1] - r[0])), z += n;
                                k[a][1 === c ? "rightCliff" : "leftCliff"] = q
                            }); else {
                                for (z = x; 0 <= z && z < f;) {
                                    if (p = d[a].points[z]) {
                                        q = p[1];
                                        break
                                    }
                                    z += n
                                }
                                q = c.translate(q, 0, 1, 0, 1);
                                g.push({isNull: !0, plotX: t.translate(a, 0, 0, 0, 1), x: a, plotY: q, yBottom: q})
                            }
                        })
                }
                return g
            }, getGraphPath: function (a) {
                var e = g.prototype.getGraphPath,
                    l = this.options, t = l.stacking, c = this.yAxis, d, k, x = [], p = [], f = this.index, b,
                    n = c.stacks[this.stackKey], z = l.threshold, J = c.getThreshold(l.threshold), q,
                    l = l.connectNulls || "percent" === t, L = function (d, e, g) {
                        var q = a[d];
                        d = t && n[q.x].points[f];
                        var k = q[g + "Null"] || 0;
                        g = q[g + "Cliff"] || 0;
                        var m, l, q = !0;
                        g || k ? (m = (k ? d[0] : d[1]) + g, l = d[0] + g, q = !!k) : !t && a[e] && a[e].isNull && (m = l = z);
                        void 0 !== m && (p.push({
                            plotX: b,
                            plotY: null === m ? J : c.getThreshold(m),
                            isNull: q,
                            isCliff: !0
                        }), x.push({plotX: b, plotY: null === l ? J : c.getThreshold(l), doCurve: !1}))
                    };
                a =
                    a || this.points;
                t && (a = this.getStackPoints(a));
                for (d = 0; d < a.length; d++) if (k = a[d].isNull, b = r(a[d].rectPlotX, a[d].plotX), q = r(a[d].yBottom, J), !k || l) l || L(d, d - 1, "left"), k && !t && l || (p.push(a[d]), x.push({
                    x: d,
                    plotX: b,
                    plotY: q
                })), l || L(d, d + 1, "right");
                d = e.call(this, p, !0, !0);
                x.reversed = !0;
                k = e.call(this, x, !0, !0);
                k.length && (k[0] = "L");
                k = d.concat(k);
                e = e.call(this, p, !1, l);
                k.xMap = d.xMap;
                this.areaPath = k;
                return e
            }, drawGraph: function () {
                this.areaPath = [];
                g.prototype.drawGraph.apply(this);
                var a = this, e = this.areaPath, l = this.options,
                    u = [["area", "highcharts-area", this.color, l.fillColor]];
                F(this.zones, function (c, d) {
                    u.push(["zone-area-" + d, "highcharts-area highcharts-zone-area-" + d + " " + c.className, c.color || a.color, c.fillColor || l.fillColor])
                });
                F(u, function (c) {
                    var d = c[0], g = a[d];
                    g ? (g.endX = a.preventGraphAnimation ? null : e.xMap, g.animate({d: e})) : (g = a[d] = a.chart.renderer.path(e).addClass(c[1]).attr({
                        fill: r(c[3], C(c[2]).setOpacity(r(l.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(a.group), g.isArea = !0);
                    g.startX = e.xMap;
                    g.shiftUnit = l.step ? 2 : 1
                })
            }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function (a) {
        var C = a.pick;
        a = a.seriesType;
        a("spline", "line", {}, {
            getPointSpline: function (a, D, r) {
                var g = D.plotX, e = D.plotY, t = a[r - 1];
                r = a[r + 1];
                var w, l, u, c;
                if (t && !t.isNull && !1 !== t.doCurve && !D.isCliff && r && !r.isNull && !1 !== r.doCurve && !D.isCliff) {
                    a = t.plotY;
                    u = r.plotX;
                    r = r.plotY;
                    var d = 0;
                    w = (1.5 * g + t.plotX) / 2.5;
                    l = (1.5 * e + a) / 2.5;
                    u = (1.5 * g + u) / 2.5;
                    c = (1.5 * e + r) / 2.5;
                    u !== w && (d = (c - l) * (u - g) / (u - w) + e - c);
                    l += d;
                    c += d;
                    l > a && l > e ? (l = Math.max(a, e), c = 2 * e - l) : l < a && l < e && (l = Math.min(a, e), c = 2 * e - l);
                    c > r && c > e ? (c = Math.max(r, e), l = 2 * e - c) : c < r && c < e &&
                        (c = Math.min(r, e), l = 2 * e - c);
                    D.rightContX = u;
                    D.rightContY = c
                }
                D = ["C", C(t.rightContX, t.plotX), C(t.rightContY, t.plotY), C(w, g), C(l, e), g, e];
                t.rightContX = t.rightContY = null;
                return D
            }
        })
    })(K);
    (function (a) {
        var C = a.seriesTypes.area.prototype, F = a.seriesType;
        F("areaspline", "spline", a.defaultPlotOptions.area, {
            getStackPoints: C.getStackPoints,
            getGraphPath: C.getGraphPath,
            drawGraph: C.drawGraph,
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle
        })
    })(K);
    (function (a) {
        var C = a.animObject, F = a.color, D = a.each, r = a.extend, g = a.isNumber,
            e = a.merge, t = a.pick, w = a.Series, l = a.seriesType, u = a.svg;
        l("column", "line", {
            borderRadius: 0,
            crisp: !0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {hover: {halo: !1, brightness: .1}, select: {color: "#cccccc", borderColor: "#000000"}},
            dataLabels: {align: null, verticalAlign: null, y: null},
            softThreshold: !1,
            startFromThreshold: !0,
            stickyTracking: !1,
            tooltip: {distance: 6},
            threshold: 0,
            borderColor: "#ffffff"
        }, {
            cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0, init: function () {
                w.prototype.init.apply(this, arguments);
                var a = this, d = a.chart;
                d.hasRendered && D(d.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                })
            }, getColumnMetrics: function () {
                var a = this, d = a.options, e = a.xAxis, g = a.yAxis, p = e.reversed, f, b = {}, n = 0;
                !1 === d.grouping ? n = 1 : D(a.chart.series, function (c) {
                    var d = c.options, e = c.yAxis, q;
                    c.type !== a.type || !c.visible && a.chart.options.chart.ignoreHiddenSeries || g.len !== e.len || g.pos !== e.pos || (d.stacking ? (f = c.stackKey, void 0 === b[f] && (b[f] = n++), q = b[f]) : !1 !== d.grouping &&
                        (q = n++), c.columnIndex = q)
                });
                var l = Math.min(Math.abs(e.transA) * (e.ordinalSlope || d.pointRange || e.closestPointRange || e.tickInterval || 1), e.len),
                    r = l * d.groupPadding, q = (l - 2 * r) / (n || 1),
                    d = Math.min(d.maxPointWidth || e.len, t(d.pointWidth, q * (1 - 2 * d.pointPadding)));
                a.columnMetrics = {
                    width: d,
                    offset: (q - d) / 2 + (r + ((a.columnIndex || 0) + (p ? 1 : 0)) * q - l / 2) * (p ? -1 : 1)
                };
                return a.columnMetrics
            }, crispCol: function (a, d, e, g) {
                var c = this.chart, f = this.borderWidth, b = -(f % 2 ? .5 : 0), f = f % 2 ? .5 : 1;
                c.inverted && c.renderer.isVML && (f += 1);
                this.options.crisp &&
                (e = Math.round(a + e) + b, a = Math.round(a) + b, e -= a);
                g = Math.round(d + g) + f;
                b = .5 >= Math.abs(d) && .5 < g;
                d = Math.round(d) + f;
                g -= d;
                b && g && (--d, g += 1);
                return {x: a, y: d, width: e, height: g}
            }, translate: function () {
                var a = this, d = a.chart, e = a.options, g = a.dense = 2 > a.closestPointRange * a.xAxis.transA,
                    g = a.borderWidth = t(e.borderWidth, g ? 0 : 1), p = a.yAxis, f = e.threshold,
                    b = a.translatedThreshold = p.getThreshold(f), n = t(e.minPointLength, 5), l = a.getColumnMetrics(),
                    r = l.width, q = a.barW = Math.max(r, 1 + 2 * g), u = a.pointXOffset = l.offset;
                d.inverted && (b -= .5);
                e.pointPadding &&
                (q = Math.ceil(q));
                w.prototype.translate.apply(a);
                D(a.points, function (c) {
                    var e = t(c.yBottom, b), g = 999 + Math.abs(e), g = Math.min(Math.max(-g, c.plotY), p.len + g),
                        k = c.plotX + u, l = q, x = Math.min(g, e), B, h = Math.max(g, e) - x;
                    n && Math.abs(h) < n && (h = n, B = !p.reversed && !c.negative || p.reversed && c.negative, c.y === f && a.dataMax <= f && p.min < f && (B = !B), x = Math.abs(x - b) > n ? e - n : b - (B ? n : 0));
                    c.barX = k;
                    c.pointWidth = r;
                    c.tooltipPos = d.inverted ? [p.len + p.pos - d.plotLeft - g, a.xAxis.len - k - l / 2, h] : [k + l / 2, g + p.pos - d.plotTop, h];
                    c.shapeType = "rect";
                    c.shapeArgs =
                        a.crispCol.apply(a, c.isNull ? [k, b, l, 0] : [k, x, l, h])
                })
            }, getSymbol: a.noop, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawGraph: function () {
                this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data")
            }, pointAttribs: function (a, d) {
                var c = this.options, g, p = this.pointAttrToOptions || {};
                g = p.stroke || "borderColor";
                var f = p["stroke-width"] || "borderWidth", b = a && a.color || this.color,
                    n = a && a[g] || c[g] || this.color || b, l = a && a[f] || c[f] || this[f] || 0, p = c.dashStyle;
                a && this.zones.length && (b = a.getZone(), b = a.options.color ||
                    b && b.color || this.color);
                d && (a = e(c.states[d], a.options.states && a.options.states[d] || {}), d = a.brightness, b = a.color || void 0 !== d && F(b).brighten(a.brightness).get() || b, n = a[g] || n, l = a[f] || l, p = a.dashStyle || p);
                g = {fill: b, stroke: n, "stroke-width": l};
                p && (g.dashstyle = p);
                return g
            }, drawPoints: function () {
                var a = this, d = this.chart, k = a.options, l = d.renderer, p = k.animationLimit || 250, f;
                D(a.points, function (b) {
                    var c = b.graphic, t = c && d.pointCount < p ? "animate" : "attr";
                    if (g(b.plotY) && null !== b.y) {
                        f = b.shapeArgs;
                        if (c) c[t](e(f)); else b.graphic =
                            c = l[b.shapeType](f).add(b.group || a.group);
                        k.borderRadius && c.attr({r: k.borderRadius});
                        c[t](a.pointAttribs(b, b.selected && "select")).shadow(k.shadow, null, k.stacking && !k.borderRadius);
                        c.addClass(b.getClassName(), !0)
                    } else c && (b.graphic = c.destroy())
                })
            }, animate: function (a) {
                var c = this, e = this.yAxis, g = c.options, p = this.chart.inverted, f = {},
                    b = p ? "translateX" : "translateY", n;
                u && (a ? (f.scaleY = .001, a = Math.min(e.pos + e.len, Math.max(e.pos, e.toPixels(g.threshold))), p ? f.translateX = a - e.len : f.translateY = a, c.group.attr(f)) :
                    (n = c.group.attr(b), c.group.animate({scaleY: 1}, r(C(c.options.animation), {
                        step: function (a, d) {
                            f[b] = n + d.pos * (e.pos - n);
                            c.group.attr(f)
                        }
                    })), c.animate = null))
            }, remove: function () {
                var a = this, d = a.chart;
                d.hasRendered && D(d.series, function (c) {
                    c.type === a.type && (c.isDirty = !0)
                });
                w.prototype.remove.apply(a, arguments)
            }
        })
    })(K);
    (function (a) {
        a = a.seriesType;
        a("bar", "column", null, {inverted: !0})
    })(K);
    (function (a) {
        var C = a.Series;
        a = a.seriesType;
        a("scatter", "line", {
            lineWidth: 0, findNearestPointBy: "xy", marker: {enabled: !0}, tooltip: {
                headerFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 0.85em"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',
                pointFormat: "x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"
            }
        }, {
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            drawGraph: function () {
                this.options.lineWidth && C.prototype.drawGraph.call(this)
            }
        })
    })(K);
    (function (a) {
        var C = a.deg2rad, F = a.isNumber, D = a.pick, r = a.relativeLength;
        a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, e = this.chart, t = 2 * (a.slicedOffset || 0), w = e.plotWidth - 2 * t,
                    e = e.plotHeight - 2 * t, l = a.center,
                    l = [D(l[0], "50%"), D(l[1], "50%"), a.size || "100%", a.innerSize || 0], u = Math.min(w, e), c, d;
                for (c = 0; 4 > c; ++c) d = l[c], a = 2 > c || 2 === c && /%$/.test(d), l[c] = r(d, [w, e, u, l[2]][c]) + (a ? t : 0);
                l[3] > l[2] && (l[3] = l[2]);
                return l
            }, getStartAndEndRadians: function (a, e) {
                a = F(a) ? a : 0;
                e = F(e) && e > a && 360 > e - a ? e : a + 360;
                return {start: C * (a + -90), end: C * (e + -90)}
            }
        }
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.CenteredSeriesMixin, D = a.defined, r = a.each, g = a.extend,
            e = F.getStartAndEndRadians, t = a.inArray, w = a.noop, l = a.pick, u = a.Point,
            c = a.Series, d = a.seriesType, k = a.setAnimation;
        d("pie", "line", {
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30, enabled: !0, formatter: function () {
                    return this.point.isNull ? void 0 : this.point.name
                }, x: 0
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            stickyTracking: !1,
            tooltip: {followPointer: !0},
            borderColor: "#ffffff",
            borderWidth: 1,
            states: {hover: {brightness: .1}}
        }, {
            isCartesian: !1,
            requireSorting: !1,
            directTouch: !0,
            noSharedTooltip: !0,
            trackerGroups: ["group",
                "dataLabelsGroup"],
            axisTypes: [],
            pointAttribs: a.seriesTypes.column.prototype.pointAttribs,
            animate: function (a) {
                var c = this, d = c.points, b = c.startAngleRad;
                a || (r(d, function (a) {
                    var d = a.graphic, f = a.shapeArgs;
                    d && (d.attr({r: a.startR || c.center[3] / 2, start: b, end: b}), d.animate({
                        r: f.r,
                        start: f.start,
                        end: f.end
                    }, c.options.animation))
                }), c.animate = null)
            },
            updateTotals: function () {
                var a, c = 0, d = this.points, b = d.length, e, g = this.options.ignoreHiddenPoint;
                for (a = 0; a < b; a++) e = d[a], c += g && !e.visible ? 0 : e.isNull ? 0 : e.y;
                this.total = c;
                for (a =
                         0; a < b; a++) e = d[a], e.percentage = 0 < c && (e.visible || !g) ? e.y / c * 100 : 0, e.total = c
            },
            generatePoints: function () {
                c.prototype.generatePoints.call(this);
                this.updateTotals()
            },
            translate: function (a) {
                this.generatePoints();
                var c = 0, d = this.options, b = d.slicedOffset, g = b + (d.borderWidth || 0), k, t, q,
                    r = e(d.startAngle, d.endAngle), u = this.startAngleRad = r.start,
                    r = (this.endAngleRad = r.end) - u, w = this.points, m, x = d.dataLabels.distance,
                    d = d.ignoreHiddenPoint, A, C = w.length, G;
                a || (this.center = a = this.getCenter());
                this.getX = function (b, c, d) {
                    q = Math.asin(Math.min((b -
                        a[1]) / (a[2] / 2 + d.labelDistance), 1));
                    return a[0] + (c ? -1 : 1) * Math.cos(q) * (a[2] / 2 + d.labelDistance)
                };
                for (A = 0; A < C; A++) {
                    G = w[A];
                    G.labelDistance = l(G.options.dataLabels && G.options.dataLabels.distance, x);
                    this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, G.labelDistance);
                    k = u + c * r;
                    if (!d || G.visible) c += G.percentage / 100;
                    t = u + c * r;
                    G.shapeType = "arc";
                    G.shapeArgs = {
                        x: a[0],
                        y: a[1],
                        r: a[2] / 2,
                        innerR: a[3] / 2,
                        start: Math.round(1E3 * k) / 1E3,
                        end: Math.round(1E3 * t) / 1E3
                    };
                    q = (t + k) / 2;
                    q > 1.5 * Math.PI ? q -= 2 * Math.PI : q < -Math.PI / 2 && (q += 2 * Math.PI);
                    G.slicedTranslation = {
                        translateX: Math.round(Math.cos(q) * b),
                        translateY: Math.round(Math.sin(q) * b)
                    };
                    t = Math.cos(q) * a[2] / 2;
                    m = Math.sin(q) * a[2] / 2;
                    G.tooltipPos = [a[0] + .7 * t, a[1] + .7 * m];
                    G.half = q < -Math.PI / 2 || q > Math.PI / 2 ? 1 : 0;
                    G.angle = q;
                    k = Math.min(g, G.labelDistance / 5);
                    G.labelPos = [a[0] + t + Math.cos(q) * G.labelDistance, a[1] + m + Math.sin(q) * G.labelDistance, a[0] + t + Math.cos(q) * k, a[1] + m + Math.sin(q) * k, a[0] + t, a[1] + m, 0 > G.labelDistance ? "center" : G.half ? "right" : "left", q]
                }
            },
            drawGraph: null,
            drawPoints: function () {
                var a = this, c = a.chart.renderer,
                    d, b, e, k, l = a.options.shadow;
                l && !a.shadowGroup && (a.shadowGroup = c.g("shadow").add(a.group));
                r(a.points, function (f) {
                    b = f.graphic;
                    if (f.isNull) b && (f.graphic = b.destroy()); else {
                        k = f.shapeArgs;
                        d = f.getTranslate();
                        var q = f.shadowGroup;
                        l && !q && (q = f.shadowGroup = c.g("shadow").add(a.shadowGroup));
                        q && q.attr(d);
                        e = a.pointAttribs(f, f.selected && "select");
                        b ? b.setRadialReference(a.center).attr(e).animate(g(k, d)) : (f.graphic = b = c[f.shapeType](k).setRadialReference(a.center).attr(d).add(a.group), f.visible || b.attr({visibility: "hidden"}),
                            b.attr(e).attr({"stroke-linejoin": "round"}).shadow(l, q));
                        b.addClass(f.getClassName())
                    }
                })
            },
            searchPoint: w,
            sortByAngle: function (a, c) {
                a.sort(function (a, b) {
                    return void 0 !== a.angle && (b.angle - a.angle) * c
                })
            },
            drawLegendSymbol: a.LegendSymbolMixin.drawRectangle,
            getCenter: F.getCenter,
            getSymbol: w
        }, {
            init: function () {
                u.prototype.init.apply(this, arguments);
                var a = this, c;
                a.name = l(a.name, "Slice");
                c = function (c) {
                    a.slice("select" === c.type)
                };
                C(a, "select", c);
                C(a, "unselect", c);
                return a
            }, isValid: function () {
                return a.isNumber(this.y,
                    !0) && 0 <= this.y
            }, setVisible: function (a, c) {
                var d = this, b = d.series, e = b.chart, g = b.options.ignoreHiddenPoint;
                c = l(c, g);
                a !== d.visible && (d.visible = d.options.visible = a = void 0 === a ? !d.visible : a, b.options.data[t(d, b.data)] = d.options, r(["graphic", "dataLabel", "connector", "shadowGroup"], function (b) {
                    if (d[b]) d[b][a ? "show" : "hide"](!0)
                }), d.legendItem && e.legend.colorizeItem(d, a), a || "hover" !== d.state || d.setState(""), g && (b.isDirty = !0), c && e.redraw())
            }, slice: function (a, c, d) {
                var b = this.series;
                k(d, b.chart);
                l(c, !0);
                this.sliced =
                    this.options.sliced = D(a) ? a : !this.sliced;
                b.options.data[t(this, b.data)] = this.options;
                this.graphic.animate(this.getTranslate());
                this.shadowGroup && this.shadowGroup.animate(this.getTranslate())
            }, getTranslate: function () {
                return this.sliced ? this.slicedTranslation : {translateX: 0, translateY: 0}
            }, haloPath: function (a) {
                var c = this.shapeArgs;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(c.x, c.y, c.r + a, c.r + a, {
                    innerR: this.shapeArgs.r - 1,
                    start: c.start,
                    end: c.end
                })
            }
        })
    })(K);
    (function (a) {
        var C =
                a.addEvent, F = a.arrayMax, D = a.defined, r = a.each, g = a.extend, e = a.format, t = a.map, w = a.merge,
            l = a.noop, u = a.pick, c = a.relativeLength, d = a.Series, k = a.seriesTypes, x = a.some, p = a.stableSort;
        a.distribute = function (c, b, d) {
            function e(a, b) {
                return a.target - b.target
            }

            var f, g = !0, k = c, l = [], n;
            n = 0;
            var m = k.reducedLen || b;
            for (f = c.length; f--;) n += c[f].size;
            if (n > m) {
                p(c, function (a, b) {
                    return (b.rank || 0) - (a.rank || 0)
                });
                for (n = f = 0; n <= m;) n += c[f].size, f++;
                l = c.splice(f - 1, c.length)
            }
            p(c, e);
            for (c = t(c, function (a) {
                return {
                    size: a.size, targets: [a.target],
                    align: u(a.align, .5)
                }
            }); g;) {
                for (f = c.length; f--;) g = c[f], n = (Math.min.apply(0, g.targets) + Math.max.apply(0, g.targets)) / 2, g.pos = Math.min(Math.max(0, n - g.size * g.align), b - g.size);
                f = c.length;
                for (g = !1; f--;) 0 < f && c[f - 1].pos + c[f - 1].size > c[f].pos && (c[f - 1].size += c[f].size, c[f - 1].targets = c[f - 1].targets.concat(c[f].targets), c[f - 1].align = .5, c[f - 1].pos + c[f - 1].size > b && (c[f - 1].pos = b - c[f - 1].size), c.splice(f, 1), g = !0)
            }
            k.push.apply(k, l);
            f = 0;
            x(c, function (c) {
                var e = 0;
                if (x(c.targets, function () {
                    k[f].pos = c.pos + e;
                    if (Math.abs(k[f].pos -
                        k[f].target) > d) return r(k.slice(0, f + 1), function (a) {
                        delete a.pos
                    }), k.reducedLen = (k.reducedLen || b) - .1 * b, k.reducedLen > .1 * b && a.distribute(k, b, d), !0;
                    e += k[f].size;
                    f++
                })) return !0
            });
            p(k, e)
        };
        d.prototype.drawDataLabels = function () {
            function c(a, b) {
                var c = b.filter;
                return c ? (b = c.operator, a = a[c.property], c = c.value, "\x3e" === b && a > c || "\x3c" === b && a < c || "\x3e\x3d" === b && a >= c || "\x3c\x3d" === b && a <= c || "\x3d\x3d" === b && a == c || "\x3d\x3d\x3d" === b && a === c ? !0 : !1) : !0
            }

            var b = this, d = b.chart, g = b.options, k = g.dataLabels, q = b.points, l, p, t =
                b.hasRendered || 0, m, x, A = u(k.defer, !!g.animation), F = d.renderer;
            if (k.enabled || b._hasPointLabels) b.dlProcessOptions && b.dlProcessOptions(k), x = b.plotGroup("dataLabelsGroup", "data-labels", A && !t ? "hidden" : "visible", k.zIndex || 6), A && (x.attr({opacity: +t}), t || C(b, "afterAnimate", function () {
                b.visible && x.show(!0);
                x[g.animation ? "animate" : "attr"]({opacity: 1}, {duration: 200})
            })), p = k, r(q, function (f) {
                var h, q = f.dataLabel, n, t, r = f.connector, B = !q, z;
                l = f.dlOptions || f.options && f.options.dataLabels;
                (h = u(l && l.enabled, p.enabled) &&
                    !f.isNull) && (h = !0 === c(f, l || k));
                h && (k = w(p, l), n = f.getLabelConfig(), z = k[f.formatPrefix + "Format"] || k.format, m = D(z) ? e(z, n, d.time) : (k[f.formatPrefix + "Formatter"] || k.formatter).call(n, k), z = k.style, n = k.rotation, z.color = u(k.color, z.color, b.color, "#000000"), "contrast" === z.color && (f.contrastColor = F.getContrast(f.color || b.color), z.color = k.inside || 0 > u(f.labelDistance, k.distance) || g.stacking ? f.contrastColor : "#000000"), g.cursor && (z.cursor = g.cursor), t = {
                    fill: k.backgroundColor, stroke: k.borderColor, "stroke-width": k.borderWidth,
                    r: k.borderRadius || 0, rotation: n, padding: k.padding, zIndex: 1
                }, a.objectEach(t, function (a, b) {
                    void 0 === a && delete t[b]
                }));
                !q || h && D(m) ? h && D(m) && (q ? t.text = m : (q = f.dataLabel = n ? F.text(m, 0, -9999).addClass("highcharts-data-label") : F.label(m, 0, -9999, k.shape, null, null, k.useHTML, null, "data-label"), q.addClass(" highcharts-data-label-color-" + f.colorIndex + " " + (k.className || "") + (k.useHTML ? "highcharts-tracker" : ""))), q.attr(t), q.css(z).shadow(k.shadow), q.added || q.add(x), b.alignDataLabel(f, q, k, null, B)) : (f.dataLabel = q = q.destroy(),
                r && (f.connector = r.destroy()))
            });
            a.fireEvent(this, "afterDrawDataLabels")
        };
        d.prototype.alignDataLabel = function (a, b, c, d, e) {
            var f = this.chart, k = f.inverted, l = u(a.dlBox && a.dlBox.centerX, a.plotX, -9999),
                n = u(a.plotY, -9999), m = b.getBBox(), p, t = c.rotation, r = c.align,
                w = this.visible && (a.series.forceDL || f.isInsidePlot(l, Math.round(n), k) || d && f.isInsidePlot(l, k ? d.x + 1 : d.y + d.height - 1, k)),
                h = "justify" === u(c.overflow, "justify");
            if (w && (p = c.style.fontSize, p = f.renderer.fontMetrics(p, b).b, d = g({
                x: k ? this.yAxis.len - n : l, y: Math.round(k ?
                    this.xAxis.len - l : n), width: 0, height: 0
            }, d), g(c, {
                width: m.width,
                height: m.height
            }), t ? (h = !1, l = f.renderer.rotCorr(p, t), l = {
                x: d.x + c.x + d.width / 2 + l.x,
                y: d.y + c.y + {top: 0, middle: .5, bottom: 1}[c.verticalAlign] * d.height
            }, b[e ? "attr" : "animate"](l).attr({align: r}), n = (t + 720) % 360, n = 180 < n && 360 > n, "left" === r ? l.y -= n ? m.height : 0 : "center" === r ? (l.x -= m.width / 2, l.y -= m.height / 2) : "right" === r && (l.x -= m.width, l.y -= n ? 0 : m.height), b.placed = !0, b.alignAttr = l) : (b.align(c, null, d), l = b.alignAttr), h ? a.isLabelJustified = this.justifyDataLabel(b, c,
                l, m, d, e) : u(c.crop, !0) && (w = f.isInsidePlot(l.x, l.y) && f.isInsidePlot(l.x + m.width, l.y + m.height)), c.shape && !t)) b[e ? "attr" : "animate"]({
                anchorX: k ? f.plotWidth - a.plotY : a.plotX,
                anchorY: k ? f.plotHeight - a.plotX : a.plotY
            });
            w || (b.attr({y: -9999}), b.placed = !1)
        };
        d.prototype.justifyDataLabel = function (a, b, c, d, e, g) {
            var f = this.chart, q = b.align, k = b.verticalAlign, m, l, n = a.box ? 0 : a.padding || 0;
            m = c.x + n;
            0 > m && ("right" === q ? b.align = "left" : b.x = -m, l = !0);
            m = c.x + d.width - n;
            m > f.plotWidth && ("left" === q ? b.align = "right" : b.x = f.plotWidth - m, l = !0);
            m = c.y + n;
            0 > m && ("bottom" === k ? b.verticalAlign = "top" : b.y = -m, l = !0);
            m = c.y + d.height - n;
            m > f.plotHeight && ("top" === k ? b.verticalAlign = "bottom" : b.y = f.plotHeight - m, l = !0);
            l && (a.placed = !g, a.align(b, null, e));
            return l
        };
        k.pie && (k.pie.prototype.drawDataLabels = function () {
            var c = this, b = c.data, e, g = c.chart, k = c.options.dataLabels, q = u(k.connectorPadding, 10),
                l = u(k.connectorWidth, 1), p = g.plotWidth, t = g.plotHeight, m = Math.round(g.chartWidth / 3), w,
                x = c.center, C = x[2] / 2, G = x[1], h, v, K, P, I = [[], []], O, N, y, R, S = [0, 0, 0, 0];
            c.visible && (k.enabled ||
                c._hasPointLabels) && (r(b, function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({width: "auto"}).css({
                    width: "auto",
                    textOverflow: "clip"
                }), a.dataLabel.shortened = !1)
            }), d.prototype.drawDataLabels.apply(c), r(b, function (a) {
                a.dataLabel && a.visible && (I[a.half].push(a), a.dataLabel._pos = null, !D(k.style.width) && !D(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > m && (a.dataLabel.css({width: .7 * m}), a.dataLabel.shortened = !0))
            }),
                r(I, function (b, d) {
                    var f, m, l = b.length, n = [], w;
                    if (l) for (c.sortByAngle(b, d - .5), 0 < c.maxLabelDistance && (f = Math.max(0, G - C - c.maxLabelDistance), m = Math.min(G + C + c.maxLabelDistance, g.plotHeight), r(b, function (a) {
                        0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, G - C - a.labelDistance), a.bottom = Math.min(G + C + a.labelDistance, g.plotHeight), w = a.dataLabel.getBBox().height || 21, a.positionsIndex = n.push({
                            target: a.labelPos[1] - a.top + w / 2,
                            size: w,
                            rank: a.y
                        }) - 1)
                    }), f = m + w - f, a.distribute(n, f, f / 5)), R = 0; R < l; R++) e = b[R], m = e.positionsIndex,
                        K = e.labelPos, h = e.dataLabel, y = !1 === e.visible ? "hidden" : "inherit", N = f = K[1], n && D(n[m]) && (void 0 === n[m].pos ? y = "hidden" : (P = n[m].size, N = e.top + n[m].pos)), delete e.positionIndex, O = k.justify ? x[0] + (d ? -1 : 1) * (C + e.labelDistance) : c.getX(N < e.top + 2 || N > e.bottom - 2 ? f : N, d, e), h._attr = {
                        visibility: y,
                        align: K[6]
                    }, h._pos = {
                        x: O + k.x + ({left: q, right: -q}[K[6]] || 0),
                        y: N + k.y - 10
                    }, K.x = O, K.y = N, u(k.crop, !0) && (v = h.getBBox().width, f = null, O - v < q && 1 === d ? (f = Math.round(v - O + q), S[3] = Math.max(f, S[3])) : O + v > p - q && 0 === d && (f = Math.round(O + v - p + q), S[1] =
                        Math.max(f, S[1])), 0 > N - P / 2 ? S[0] = Math.max(Math.round(-N + P / 2), S[0]) : N + P / 2 > t && (S[2] = Math.max(Math.round(N + P / 2 - t), S[2])), h.sideOverflow = f)
                }), 0 === F(S) || this.verifyDataLabelOverflow(S)) && (this.placeDataLabels(), l && r(this.points, function (a) {
                var b;
                w = a.connector;
                if ((h = a.dataLabel) && h._pos && a.visible && 0 < a.labelDistance) {
                    y = h._attr.visibility;
                    if (b = !w) a.connector = w = g.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(c.dataLabelsGroup),
                        w.attr({"stroke-width": l, stroke: k.connectorColor || a.color || "#666666"});
                    w[b ? "attr" : "animate"]({d: c.connectorPath(a.labelPos)});
                    w.attr("visibility", y)
                } else w && (a.connector = w.destroy())
            }))
        }, k.pie.prototype.connectorPath = function (a) {
            var b = a.x, c = a.y;
            return u(this.options.dataLabels.softConnector, !0) ? ["M", b + ("left" === a[6] ? 5 : -5), c, "C", b, c, 2 * a[2] - a[4], 2 * a[3] - a[5], a[2], a[3], "L", a[4], a[5]] : ["M", b + ("left" === a[6] ? 5 : -5), c, "L", a[2], a[3], "L", a[4], a[5]]
        }, k.pie.prototype.placeDataLabels = function () {
            r(this.points, function (a) {
                var b =
                    a.dataLabel;
                b && a.visible && ((a = b._pos) ? (b.sideOverflow && (b._attr.width = b.getBBox().width - b.sideOverflow, b.css({
                    width: b._attr.width + "px",
                    textOverflow: this.options.dataLabels.style.textOverflow || "ellipsis"
                }), b.shortened = !0), b.attr(b._attr), b[b.moved ? "animate" : "attr"](a), b.moved = !0) : b && b.attr({y: -9999}))
            }, this)
        }, k.pie.prototype.alignDataLabel = l, k.pie.prototype.verifyDataLabelOverflow = function (a) {
            var b = this.center, d = this.options, e = d.center, f = d.minSize || 80, g, k = null !== d.size;
            k || (null !== e[0] ? g = Math.max(b[2] -
                Math.max(a[1], a[3]), f) : (g = Math.max(b[2] - a[1] - a[3], f), b[0] += (a[3] - a[1]) / 2), null !== e[1] ? g = Math.max(Math.min(g, b[2] - Math.max(a[0], a[2])), f) : (g = Math.max(Math.min(g, b[2] - a[0] - a[2]), f), b[1] += (a[0] - a[2]) / 2), g < b[2] ? (b[2] = g, b[3] = Math.min(c(d.innerSize || 0, g), g), this.translate(b), this.drawDataLabels && this.drawDataLabels()) : k = !0);
            return k
        });
        k.column && (k.column.prototype.alignDataLabel = function (a, b, c, e, g) {
            var f = this.chart.inverted, k = a.series, l = a.dlBox || a.shapeArgs,
                p = u(a.below, a.plotY > u(this.translatedThreshold,
                    k.yAxis.len)), m = u(c.inside, !!this.options.stacking);
            l && (e = w(l), 0 > e.y && (e.height += e.y, e.y = 0), l = e.y + e.height - k.yAxis.len, 0 < l && (e.height -= l), f && (e = {
                x: k.yAxis.len - e.y - e.height,
                y: k.xAxis.len - e.x - e.width,
                width: e.height,
                height: e.width
            }), m || (f ? (e.x += p ? 0 : e.width, e.width = 0) : (e.y += p ? e.height : 0, e.height = 0)));
            c.align = u(c.align, !f || m ? "center" : p ? "right" : "left");
            c.verticalAlign = u(c.verticalAlign, f || m ? "middle" : p ? "top" : "bottom");
            d.prototype.alignDataLabel.call(this, a, b, c, e, g);
            a.isLabelJustified && a.contrastColor && a.dataLabel.css({color: a.contrastColor})
        })
    })(K);
    (function (a) {
        var C = a.Chart, F = a.each, D = a.objectEach, r = a.pick;
        a = a.addEvent;
        a(C, "render", function () {
            var a = [];
            F(this.labelCollectors || [], function (e) {
                a = a.concat(e())
            });
            F(this.yAxis || [], function (e) {
                e.options.stackLabels && !e.options.stackLabels.allowOverlap && D(e.stacks, function (e) {
                    D(e, function (e) {
                        a.push(e.label)
                    })
                })
            });
            F(this.series || [], function (e) {
                var g = e.options.dataLabels, w = e.dataLabelCollections || ["dataLabel"];
                (g.enabled || e._hasPointLabels) && !g.allowOverlap && e.visible && F(w, function (g) {
                    F(e.points, function (e) {
                        e[g] &&
                        (e[g].labelrank = r(e.labelrank, e.shapeArgs && e.shapeArgs.height), a.push(e[g]))
                    })
                })
            });
            this.hideOverlappingLabels(a)
        });
        C.prototype.hideOverlappingLabels = function (a) {
            var e = a.length, g, r, l, u, c, d, k, x, p, f = function (a, c, d, e, f, g, k, l) {
                return !(f > a + d || f + k < a || g > c + e || g + l < c)
            };
            for (r = 0; r < e; r++) if (g = a[r]) g.oldOpacity = g.opacity, g.newOpacity = 1, g.width || (l = g.getBBox(), g.width = l.width, g.height = l.height);
            a.sort(function (a, c) {
                return (c.labelrank || 0) - (a.labelrank || 0)
            });
            for (r = 0; r < e; r++) for (l = a[r], g = r + 1; g < e; ++g) if (u = a[g], l && u &&
            l !== u && l.placed && u.placed && 0 !== l.newOpacity && 0 !== u.newOpacity && (c = l.alignAttr, d = u.alignAttr, k = l.parentGroup, x = u.parentGroup, p = 2 * (l.box ? 0 : l.padding || 0), c = f(c.x + k.translateX, c.y + k.translateY, l.width - p, l.height - p, d.x + x.translateX, d.y + x.translateY, u.width - p, u.height - p))) (l.labelrank < u.labelrank ? l : u).newOpacity = 0;
            F(a, function (a) {
                var b, c;
                a && (c = a.newOpacity, a.oldOpacity !== c && a.placed && (c ? a.show(!0) : b = function () {
                    a.hide()
                }, a.alignAttr.opacity = c, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, b)), a.isOld = !0)
            })
        }
    })(K);
    (function (a) {
        var C = a.addEvent, F = a.Chart, D = a.createElement, r = a.css, g = a.defaultOptions, e = a.defaultPlotOptions,
            t = a.each, w = a.extend, l = a.fireEvent, u = a.hasTouch, c = a.inArray, d = a.isObject, k = a.Legend,
            x = a.merge, p = a.pick, f = a.Point, b = a.Series, n = a.seriesTypes, z = a.svg, J;
        J = a.TrackerMixin = {
            drawTrackerPoint: function () {
                var a = this, b = a.chart.pointer, c = function (a) {
                    var c = b.getPointFromEvent(a);
                    void 0 !== c && (b.isDirectTouch = !0, c.onMouseOver(a))
                };
                t(a.points, function (a) {
                    a.graphic && (a.graphic.element.point = a);
                    a.dataLabel &&
                    (a.dataLabel.div ? a.dataLabel.div.point = a : a.dataLabel.element.point = a)
                });
                a._hasTracking || (t(a.trackerGroups, function (d) {
                    if (a[d]) {
                        a[d].addClass("highcharts-tracker").on("mouseover", c).on("mouseout", function (a) {
                            b.onTrackerMouseOut(a)
                        });
                        if (u) a[d].on("touchstart", c);
                        a.options.cursor && a[d].css(r).css({cursor: a.options.cursor})
                    }
                }), a._hasTracking = !0);
                l(this, "afterDrawTracker")
            }, drawTrackerGraph: function () {
                var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath),
                    e = d.length, f = a.chart, g =
                        f.pointer, k = f.renderer, p = f.options.tooltip.snap, h = a.tracker, n, r = function () {
                        if (f.hoverSeries !== a) a.onMouseOver()
                    }, w = "rgba(192,192,192," + (z ? .0001 : .002) + ")";
                if (e && !c) for (n = e + 1; n--;) "M" === d[n] && d.splice(n + 1, 0, d[n + 1] - p, d[n + 2], "L"), (n && "M" === d[n] || n === e) && d.splice(n, 0, "L", d[n - 2] + p, d[n - 1]);
                h ? h.attr({d: d}) : a.graph && (a.tracker = k.path(d).attr({
                    "stroke-linejoin": "round",
                    visibility: a.visible ? "visible" : "hidden",
                    stroke: w,
                    fill: c ? w : "none",
                    "stroke-width": a.graph.strokeWidth() + (c ? 0 : 2 * p),
                    zIndex: 2
                }).add(a.group), t([a.tracker,
                    a.markerGroup], function (a) {
                    a.addClass("highcharts-tracker").on("mouseover", r).on("mouseout", function (a) {
                        g.onTrackerMouseOut(a)
                    });
                    b.cursor && a.css({cursor: b.cursor});
                    if (u) a.on("touchstart", r)
                }));
                l(this, "afterDrawTracker")
            }
        };
        n.column && (n.column.prototype.drawTracker = J.drawTrackerPoint);
        n.pie && (n.pie.prototype.drawTracker = J.drawTrackerPoint);
        n.scatter && (n.scatter.prototype.drawTracker = J.drawTrackerPoint);
        w(k.prototype, {
            setItemEvents: function (a, b, c) {
                var d = this, e = d.chart.renderer.boxWrapper, g = "highcharts-legend-" +
                    (a instanceof f ? "point" : "series") + "-active";
                (c ? b : a.legendGroup).on("mouseover", function () {
                    a.setState("hover");
                    e.addClass(g);
                    b.css(d.options.itemHoverStyle)
                }).on("mouseout", function () {
                    b.css(x(a.visible ? d.itemStyle : d.itemHiddenStyle));
                    e.removeClass(g);
                    a.setState()
                }).on("click", function (b) {
                    var c = function () {
                        a.setVisible && a.setVisible()
                    };
                    e.removeClass(g);
                    b = {browserEvent: b};
                    a.firePointEvent ? a.firePointEvent("legendItemClick", b, c) : l(a, "legendItemClick", b, c)
                })
            }, createCheckboxForItem: function (a) {
                a.checkbox =
                    D("input", {
                        type: "checkbox",
                        checked: a.selected,
                        defaultChecked: a.selected
                    }, this.options.itemCheckboxStyle, this.chart.container);
                C(a.checkbox, "click", function (b) {
                    l(a.series || a, "checkboxClick", {checked: b.target.checked, item: a}, function () {
                        a.select()
                    })
                })
            }
        });
        g.legend.itemStyle.cursor = "pointer";
        w(F.prototype, {
            showResetZoom: function () {
                function a() {
                    b.zoomOut()
                }

                var b = this, c = g.lang, d = b.options.chart.resetZoomButton, e = d.theme, f = e.states,
                    k = "chart" === d.relativeTo ? null : "plotBox";
                l(this, "beforeShowResetZoom", null,
                    function () {
                        b.resetZoomButton = b.renderer.button(c.resetZoom, null, null, a, e, f && f.hover).attr({
                            align: d.position.align,
                            title: c.resetZoomTitle
                        }).addClass("highcharts-reset-zoom").add().align(d.position, !1, k)
                    })
            }, zoomOut: function () {
                l(this, "selection", {resetSelection: !0}, this.zoom)
            }, zoom: function (a) {
                var b, c = this.pointer, e = !1, f;
                !a || a.resetSelection ? (t(this.axes, function (a) {
                    b = a.zoom()
                }), c.initiated = !1) : t(a.xAxis.concat(a.yAxis), function (a) {
                    var d = a.axis;
                    c[d.isXAxis ? "zoomX" : "zoomY"] && (b = d.zoom(a.min, a.max), d.displayBtn &&
                    (e = !0))
                });
                f = this.resetZoomButton;
                e && !f ? this.showResetZoom() : !e && d(f) && (this.resetZoomButton = f.destroy());
                b && this.redraw(p(this.options.chart.animation, a && a.animation, 100 > this.pointCount))
            }, pan: function (a, b) {
                var c = this, d = c.hoverPoints, e;
                d && t(d, function (a) {
                    a.setState()
                });
                t("xy" === b ? [1, 0] : [1], function (b) {
                    b = c[b ? "xAxis" : "yAxis"][0];
                    var d = b.horiz, f = a[d ? "chartX" : "chartY"], d = d ? "mouseDownX" : "mouseDownY", g = c[d],
                        h = (b.pointRange || 0) / 2,
                        k = b.reversed && !c.inverted || !b.reversed && c.inverted ? -1 : 1, l = b.getExtremes(),
                        m = b.toValue(g - f, !0) + h * k, k = b.toValue(g + b.len - f, !0) - h * k, q = k < m,
                        g = q ? k : m, m = q ? m : k,
                        k = Math.min(l.dataMin, h ? l.min : b.toValue(b.toPixels(l.min) - b.minPixelPadding)),
                        h = Math.max(l.dataMax, h ? l.max : b.toValue(b.toPixels(l.max) + b.minPixelPadding)),
                        q = k - g;
                    0 < q && (m += q, g = k);
                    q = m - h;
                    0 < q && (m = h, g -= q);
                    b.series.length && g !== l.min && m !== l.max && (b.setExtremes(g, m, !1, !1, {trigger: "pan"}), e = !0);
                    c[d] = f
                });
                e && c.redraw(!1);
                r(c.container, {cursor: "move"})
            }
        });
        w(f.prototype, {
            select: function (a, b) {
                var d = this, e = d.series, f = e.chart;
                a = p(a, !d.selected);
                d.firePointEvent(a ? "select" : "unselect", {accumulate: b}, function () {
                    d.selected = d.options.selected = a;
                    e.options.data[c(d, e.data)] = d.options;
                    d.setState(a && "select");
                    b || t(f.getSelectedPoints(), function (a) {
                        a.selected && a !== d && (a.selected = a.options.selected = !1, e.options.data[c(a, e.data)] = a.options, a.setState(""), a.firePointEvent("unselect"))
                    })
                })
            }, onMouseOver: function (a) {
                var b = this.series.chart, c = b.pointer;
                a = a ? c.normalize(a) : c.getChartCoordinatesFromPoint(this, b.inverted);
                c.runPointActions(a, this)
            }, onMouseOut: function () {
                var a =
                    this.series.chart;
                this.firePointEvent("mouseOut");
                t(a.hoverPoints || [], function (a) {
                    a.setState()
                });
                a.hoverPoints = a.hoverPoint = null
            }, importEvents: function () {
                if (!this.hasImportedEvents) {
                    var b = this, c = x(b.series.options.point, b.options).events;
                    b.events = c;
                    a.objectEach(c, function (a, c) {
                        C(b, c, a)
                    });
                    this.hasImportedEvents = !0
                }
            }, setState: function (a, b) {
                var c = Math.floor(this.plotX), d = this.plotY, f = this.series,
                    g = f.options.states[a || "normal"] || {}, k = e[f.type].marker && f.options.marker,
                    q = k && !1 === k.enabled, n = k && k.states &&
                    k.states[a || "normal"] || {}, h = !1 === n.enabled, r = f.stateMarkerGraphic,
                    t = this.marker || {}, u = f.chart, x = f.halo, z, C = k && f.markerAttribs;
                a = a || "";
                if (!(a === this.state && !b || this.selected && "select" !== a || !1 === g.enabled || a && (h || q && !1 === n.enabled) || a && t.states && t.states[a] && !1 === t.states[a].enabled)) {
                    C && (z = f.markerAttribs(this, a));
                    if (this.graphic) this.state && this.graphic.removeClass("highcharts-point-" + this.state), a && this.graphic.addClass("highcharts-point-" + a), this.graphic.animate(f.pointAttribs(this, a), p(u.options.chart.animation,
                        g.animation)), z && this.graphic.animate(z, p(u.options.chart.animation, n.animation, k.animation)), r && r.hide(); else {
                        if (a && n) {
                            k = t.symbol || f.symbol;
                            r && r.currentSymbol !== k && (r = r.destroy());
                            if (r) r[b ? "animate" : "attr"]({
                                x: z.x,
                                y: z.y
                            }); else k && (f.stateMarkerGraphic = r = u.renderer.symbol(k, z.x, z.y, z.width, z.height).add(f.markerGroup), r.currentSymbol = k);
                            r && r.attr(f.pointAttribs(this, a))
                        }
                        r && (r[a && u.isInsidePlot(c, d, u.inverted) ? "show" : "hide"](), r.element.point = this)
                    }
                    (c = g.halo) && c.size ? (x || (f.halo = x = u.renderer.path().add((this.graphic ||
                        r).parentGroup)), x.show()[b ? "animate" : "attr"]({d: this.haloPath(c.size)}), x.attr({"class": "highcharts-halo highcharts-color-" + p(this.colorIndex, f.colorIndex) + (this.className ? " " + this.className : "")}), x.point = this, x.attr(w({
                        fill: this.color || f.color,
                        "fill-opacity": c.opacity,
                        zIndex: -1
                    }, c.attributes))) : x && x.point && x.point.haloPath && x.animate({d: x.point.haloPath(0)}, null, x.hide);
                    this.state = a;
                    l(this, "afterSetState")
                }
            }, haloPath: function (a) {
                return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) -
                    a, this.plotY - a, 2 * a, 2 * a)
            }
        });
        w(b.prototype, {
            onMouseOver: function () {
                var a = this.chart, b = a.hoverSeries;
                if (b && b !== this) b.onMouseOut();
                this.options.events.mouseOver && l(this, "mouseOver");
                this.setState("hover");
                a.hoverSeries = this
            }, onMouseOut: function () {
                var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
                b.hoverSeries = null;
                if (d) d.onMouseOut();
                this && a.events.mouseOut && l(this, "mouseOut");
                !c || this.stickyTracking || c.shared && !this.noSharedTooltip || c.hide();
                this.setState()
            }, setState: function (a) {
                var b = this,
                    c = b.options, d = b.graph, e = c.states, f = c.lineWidth, c = 0;
                a = a || "";
                if (b.state !== a && (t([b.group, b.markerGroup, b.dataLabelsGroup], function (c) {
                    c && (b.state && c.removeClass("highcharts-series-" + b.state), a && c.addClass("highcharts-series-" + a))
                }), b.state = a, !e[a] || !1 !== e[a].enabled) && (a && (f = e[a].lineWidth || f + (e[a].lineWidthPlus || 0)), d && !d.dashstyle)) for (f = {"stroke-width": f}, d.animate(f, p(e[a || "normal"] && e[a || "normal"].animation, b.chart.options.chart.animation)); b["zone-graph-" + c];) b["zone-graph-" + c].attr(f), c += 1
            },
            setVisible: function (a, b) {
                var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, k = c.visible;
                f = (c.visible = a = c.options.visible = c.userOptions.visible = void 0 === a ? !k : a) ? "show" : "hide";
                t(["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"], function (a) {
                    if (c[a]) c[a][f]()
                });
                if (d.hoverSeries === c || (d.hoverPoint && d.hoverPoint.series) === c) c.onMouseOut();
                e && d.legend.colorizeItem(c, a);
                c.isDirty = !0;
                c.options.stacking && t(d.series, function (a) {
                    a.options.stacking && a.visible && (a.isDirty = !0)
                });
                t(c.linkedSeries,
                    function (b) {
                        b.setVisible(a, !1)
                    });
                g && (d.isDirtyBox = !0);
                !1 !== b && d.redraw();
                l(c, f)
            }, show: function () {
                this.setVisible(!0)
            }, hide: function () {
                this.setVisible(!1)
            }, select: function (a) {
                this.selected = a = void 0 === a ? !this.selected : a;
                this.checkbox && (this.checkbox.checked = a);
                l(this, a ? "select" : "unselect")
            }, drawTracker: J.drawTrackerGraph
        })
    })(K);
    (function (a) {
        var C = a.Chart, F = a.each, D = a.inArray, r = a.isArray, g = a.isObject, e = a.pick, t = a.splat;
        C.prototype.setResponsive = function (e) {
            var g = this.options.responsive, r = [], c = this.currentResponsive;
            g && g.rules && F(g.rules, function (c) {
                void 0 === c._id && (c._id = a.uniqueKey());
                this.matchResponsiveRule(c, r, e)
            }, this);
            var d = a.merge.apply(0, a.map(r, function (c) {
                return a.find(g.rules, function (a) {
                    return a._id === c
                }).chartOptions
            })), r = r.toString() || void 0;
            r !== (c && c.ruleIds) && (c && this.update(c.undoOptions, e), r ? (this.currentResponsive = {
                ruleIds: r,
                mergedOptions: d,
                undoOptions: this.currentOptions(d)
            }, this.update(d, e)) : this.currentResponsive = void 0)
        };
        C.prototype.matchResponsiveRule = function (a, g) {
            var l = a.condition;
            (l.callback || function () {
                return this.chartWidth <= e(l.maxWidth, Number.MAX_VALUE) && this.chartHeight <= e(l.maxHeight, Number.MAX_VALUE) && this.chartWidth >= e(l.minWidth, 0) && this.chartHeight >= e(l.minHeight, 0)
            }).call(this) && g.push(a._id)
        };
        C.prototype.currentOptions = function (e) {
            function l(c, d, e, u) {
                var k;
                a.objectEach(c, function (a, b) {
                    if (!u && -1 < D(b, ["series", "xAxis", "yAxis"])) for (a = t(a), e[b] = [], k = 0; k < a.length; k++) d[b][k] && (e[b][k] = {}, l(a[k], d[b][k], e[b][k], u + 1)); else g(a) ? (e[b] = r(a) ? [] : {}, l(a, d[b] || {}, e[b], u + 1)) :
                        e[b] = d[b] || null
                })
            }

            var u = {};
            l(e, this.options, u, 0);
            return u
        }
    })(K);
    return K
});