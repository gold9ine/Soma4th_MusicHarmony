var requirejs, require, define;
(function() {
    function isFunction(a) {
        return ostring.call(a) === "[object Function]"
    }

    function isArray(a) {
        return ostring.call(a) === "[object Array]"
    }

    function mixin(a, b, c) {
        for (var d in b)!(d in empty) && (!(d in a) || c) && (a[d] = b[d]);
        return req
    }

    function makeError(a, b, c) {
        var d = new Error(b + "\nhttp://requirejs.org/docs/errors.html#" + a);
        return c && (d.originalError = c), d
    }

    function configurePackageDir(a, b, c) {
        var d, e, f;
        for (d = 0; f = b[d]; d++) f = typeof f == "string" ? {
            name: f
        } : f, e = f.location, c && (!e || e.indexOf("/") !== 0 && e.indexOf(":") === -1) && (e = c + "/" + (e || f.name)), a[f.name] = {
            name: f.name,
            location: e || f.name,
            main: (f.main || "main").replace(currDirRegExp, "").replace(jsSuffixRegExp, "")
        }
    }

    function jQueryHoldReady(a, b) {
        a.holdReady ? a.holdReady(b) : b ? a.readyWait += 1 : a.ready(!0)
    }

    function newContext(a) {
        function s(a) {
            var b, c;
            for (b = 0; c = a[b]; b++)
                if (c === ".") a.splice(b, 1), b -= 1;
                else
            if (c === "..") {
                if (b === 1 && (a[2] === ".." || a[0] === "..")) break;
                b > 0 && (a.splice(b - 1, 2), b -= 2)
            }
        }

        function t(a, b) {
            var c, e;
            return a && a.charAt(0) === "." && (b ? (d.pkgs[b] ? b = [b] : (b = b.split("/"), b = b.slice(0, b.length - 1)), a = b.concat(a.split("/")), s(a), e = d.pkgs[c = a[0]], a = a.join("/"), e && a === c + "/" + e.main && (a = c)) : a.indexOf("./") === 0 && (a = a.substring(2))), a
        }

        function u(a, c) {
            var d = a ? a.indexOf("!") : -1,
                e = null,
                f = c ? c.name : null,
                i = a,
                j, k, l;
            return d !== -1 && (e = a.substring(0, d), a = a.substring(d + 1, a.length)), e && (e = t(e, f)), a && (e ? (l = h[e], l && l.normalize ? j = l.normalize(a, function(a) {
                return t(a, f)
            }) : j = t(a, f)) : (j = t(a, f), k = g[j], k || (k = b.nameToUrl(a, null, c), g[j] = k))), {
                prefix: e,
                name: j,
                parentMap: c,
                url: k,
                originalName: i,
                fullName: e ? e + "!" + (j || "") : j
            }
        }

        function v() {
            var a = !0,
                b = d.priorityWait,
                c, e;
            if (b) {
                for (e = 0; c = b[e]; e++)
                    if (!i[c]) {
                        a = !1;
                        break
                    }
                a && delete d.priorityWait
            }
            return a
        }

        function w(a, b, c) {
            return function() {
                var d = aps.call(arguments, 0),
                    e;
                return c && isFunction(e = d[d.length - 1]) && (e.__requireJsBuild = !0), d.push(b), a.apply(null, d)
            }
        }

        function x(a, c, d) {
            var e = w(d || b.require, a, c);
            return mixin(e, {
                nameToUrl: w(b.nameToUrl, a),
                toUrl: w(b.toUrl, a),
                defined: w(b.requireDefined, a),
                specified: w(b.requireSpecified, a),
                isBrowser: req.isBrowser
            }), e
        }

        function y(a) {
            b.paused.push(a)
        }

        function z(a) {
            var c, e, f, g, i, l = a.callback,
                m = a.map,
                o = m.fullName,
                r = a.deps,
                s = a.listeners,
                t;
            if (l && isFunction(l)) {
                if (d.catchError.define) try {
                    e = req.execCb(o, a.callback, r, h[o])
                } catch (v) {
                    f = v
                } else e = req.execCb(o, a.callback, r, h[o]);
                o && (t = a.cjsModule, t && t.exports !== undefined && t.exports !== h[o] ? e = h[o] = a.cjsModule.exports : e === undefined && a.usingExports ? e = h[o] : (h[o] = e, p[o] && (q[o] = !0)))
            } else o && (e = h[o] = l, p[o] && (q[o] = !0));
            j[a.id] && (delete j[a.id], a.isDone = !0, b.waitCount -= 1, b.waitCount === 0 && (k = [])), delete n[o], req.onResourceLoad && !a.placeholder && req.onResourceLoad(b, m, a.depArray);
            if (f) return g = (o ? u(o).url : "") || f.fileName || f.sourceURL, i = f.moduleTree, f = makeError("defineerror", 'Error evaluating module "' + o + '" at location "' + g + '":\n' + f + "\nfileName:" + g + "\nlineNumber: " + (f.lineNumber || f.line), f), f.moduleName = o, f.moduleTree = i, req.onError(f);
            for (c = 0; l = s[c]; c++) l(e);
            return undefined
        }

        function A(a, b) {
            return function(c) {
                a.depDone[b] || (a.depDone[b] = !0, a.deps[b] = c, a.depCount -= 1, a.depCount || z(a))
            }
        }

        function B(a, e) {
            var f = e.map,
                g = f.fullName,
                j = f.name,
                k = o[a] || (o[a] = h[a]),
                l;
            if (e.loading) return;
            e.loading = !0, l = function(a) {
                e.callback = function() {
                    return a
                }, z(e), i[e.id] = !0, c()
            }, l.fromText = function(a, c) {
                var d = useInteractive;
                i[a] = !1, b.scriptCount += 1, b.fake[a] = !0, d && (useInteractive = !1), req.exec(c), d && (useInteractive = !0), b.completeLoad(a)
            }, g in h ? l(h[g]) : k.load(j, x(f.parentMap, !0, function(a, c) {
                var d = [],
                    g, h, i;
                for (g = 0; h = a[g]; g++) i = u(h, f.parentMap), a[g] = i.fullName, i.prefix || d.push(a[g]);
                return e.moduleDeps = (e.moduleDeps || []).concat(d), b.require(a, c)
            }), l, d)
        }

        function C(a) {
            j[a.id] || (j[a.id] = a, k.push(a), b.waitCount += 1)
        }

        function D(a) {
            this.listeners.push(a)
        }

        function E(a, b) {
            var c = a.fullName,
                d = a.prefix,
                e = d ? o[d] || (o[d] = h[d]) : null,
                g, j, k, p;
            return c && (g = n[c]), g || (j = !0, g = {
                id: (d && !e ? m+++"__p@:" : "") + (c || "__r@" + m++),
                map: a,
                depCount: 0,
                depDone: [],
                depCallbacks: [],
                deps: [],
                listeners: [],
                add: D
            }, f[g.id] = !0, c && (!d || o[d]) && (n[c] = g)), d && !e ? (p = u(d), d in h && !h[d] && (delete h[d], delete l[p.url]), k = E(p, !0), k.add(function(b) {
                var c = u(a.originalName, a.parentMap),
                    d = E(c, !0);
                g.placeholder = !0, d.add(function(a) {
                    g.callback = function() {
                        return a
                    }, z(g)
                })
            })) : j && b && (i[g.id] = !1, y(g), C(g)), g
        }

        function F(a, c, e, g) {
            var k = u(a, g),
                m = k.name,
                n = k.fullName,
                o = E(k),
                r = o.id,
                s = o.deps,
                t, v, w, y, B;
            if (n) {
                if (n in h || i[r] === !0 || n === "jquery" && d.jQuery && d.jQuery !== e().fn.jquery) return;
                f[r] = !0, i[r] = !0, n === "jquery" && e && jQueryCheck(e())
            }
            o.depArray = c, o.callback = e;
            for (t = 0; t < c.length; t++) v = c[t], v && (v = u(v, m ? k : g), w = v.fullName, y = v.prefix, c[t] = w, w === "require" ? s[t] = x(k) : w === "exports" ? (s[t] = h[n] = {}, o.usingExports = !0) : w === "module" ? o.cjsModule = B = s[t] = {
                id: m,
                uri: m ? b.nameToUrl(m, null, g) : undefined,
                exports: h[n]
            } : !(w in h) || w in j || n in p && !(n in p && q[w]) ? (n in p && (p[w] = !0, delete h[w], l[v.url] = !1), o.depCount += 1, o.depCallbacks[t] = A(o, t), E(v, !0).add(o.depCallbacks[t])) : s[t] = h[w]);
            o.depCount ? C(o) : z(o)
        }

        function G(a) {
            F.apply(null, a)
        }

        function H(a, b) {
            var c = a.map.fullName,
                d = a.depArray,
                e = !0,
                f, g, h, k;
            if (a.isDone || !c || !i[c]) return k;
            if (b[c]) return a;
            b[c] = !0;
            if (d) {
                for (f = 0; f < d.length; f++) {
                    g = d[f];
                    if (!i[g] && !reservedDependencies[g]) {
                        e = !1;
                        break
                    }
                    h = j[g];
                    if (h && !h.isDone && i[g]) {
                        k = H(h, b);
                        if (k) break
                    }
                }
                e || (k = undefined, delete b[c])
            }
            return k
        }

        function I(a, b) {
            var c = a.map.fullName,
                d = a.depArray,
                e, f, g, k, l, m;
            if (a.isDone || !c || !i[c]) return undefined;
            if (c) {
                if (b[c]) return h[c];
                b[c] = !0
            }
            if (d)
                for (e = 0; e < d.length; e++) f = d[e], f && (k = u(f).prefix, k && (l = j[k]) && I(l, b), g = j[f], g && !g.isDone && i[f] && (m = I(g, b), a.depCallbacks[e](m)));
            return h[c]
        }

        function J() {
            var a = d.waitSeconds * 1e3,
                e = a && b.startTime + a < (new Date).getTime(),
                f = "",
                g = !1,
                h = !1,
                l = [],
                m, o, p, q, r, s;
            if (b.pausedCount > 0) return undefined;
            if (d.priorityWait) {
                if (!v()) return undefined;
                c()
            }
            for (o in i)
                if (!(o in empty)) {
                    g = !0;
                    if (!i[o])
                        if (e) f += o + " ";
                        else {
                            h = !0;
                            if (o.indexOf("!") === -1) {
                                l = [];
                                break
                            }
                            s = n[o] && n[o].moduleDeps, s && l.push.apply(l, s)
                        }
                }
            if (!g && !b.waitCount) return undefined;
            if (e && f) return p = makeError("timeout", "Load timeout for modules: " + f), p.requireType = "timeout", p.requireModules = f, p.contextName = b.contextName, req.onError(p);
            if (h && l.length)
                for (m = 0; q = j[l[m]]; m++)
                    if (r = H(q, {})) {
                        I(r, {});
                        break
                    }
            if (!e && (h || b.scriptCount)) return (isBrowser || isWebWorker) && !checkLoadedTimeoutId && (checkLoadedTimeoutId = setTimeout(function() {
                checkLoadedTimeoutId = 0, J()
            }, 50)), undefined;
            if (b.waitCount) {
                for (m = 0; q = k[m]; m++) I(q, {});
                b.paused.length && c(), checkLoadedDepth < 5 && (checkLoadedDepth += 1, J())
            }
            return checkLoadedDepth = 0, req.checkReadyState(), undefined
        }
        var b, c, d = {
                waitSeconds: 7,
                baseUrl: "./",
                paths: {},
                pkgs: {},
                catchError: {}
            }, e = [],
            f = {
                require: !0,
                exports: !0,
                module: !0
            }, g = {}, h = {}, i = {}, j = {}, k = [],
            l = {}, m = 0,
            n = {}, o = {}, p = {}, q = {}, r = 0;
        return jQueryCheck = function(a) {
            if (!b.jQuery) {
                var c = a || (typeof jQuery != "undefined" ? jQuery : null);
                if (c) {
                    if (d.jQuery && c.fn.jquery !== d.jQuery) return;
                    if ("holdReady" in c || "readyWait" in c) b.jQuery = c, G(["jquery", [],
                        function() {
                            return jQuery
                        }
                    ]), b.scriptCount && (jQueryHoldReady(c, !0), b.jQueryIncremented = !0)
                }
            }
        }, c = function() {
            var a, c, f, g, h, j, k;
            b.takeGlobalQueue(), r += 1, b.scriptCount <= 0 && (b.scriptCount = 0);
            while (e.length) {
                j = e.shift();
                if (j[0] === null) return req.onError(makeError("mismatch", "Mismatched anonymous define() module: " + j[j.length - 1]));
                G(j)
            }
            if (!d.priorityWait || v())
                while (b.paused.length) {
                    h = b.paused, b.pausedCount += h.length, b.paused = [];
                    for (g = 0; a = h[g]; g++) c = a.map, f = c.url, k = c.fullName, c.prefix ? B(c.prefix, a) : !l[f] && !i[k] && (req.load(b, k, f), f.indexOf("empty:") !== 0 && (l[f] = !0));
                    b.startTime = (new Date).getTime(), b.pausedCount -= h.length
                }
            return r === 1 && J(), r -= 1, undefined
        }, b = {
            contextName: a,
            config: d,
            defQueue: e,
            waiting: j,
            waitCount: 0,
            specified: f,
            loaded: i,
            urlMap: g,
            urlFetched: l,
            scriptCount: 0,
            defined: h,
            paused: [],
            pausedCount: 0,
            plugins: o,
            needFullExec: p,
            fake: {},
            fullExec: q,
            managerCallbacks: n,
            makeModuleMap: u,
            normalize: t,
            configure: function(a) {
                var e, f, g, h, i, j;
                a.baseUrl && a.baseUrl.charAt(a.baseUrl.length - 1) !== "/" && (a.baseUrl += "/"), e = d.paths, g = d.packages, h = d.pkgs, mixin(d, a, !0);
                if (a.paths) {
                    for (f in a.paths) f in empty || (e[f] = a.paths[f]);
                    d.paths = e
                }
                i = a.packagePaths;
                if (i || a.packages) {
                    if (i)
                        for (f in i) f in empty || configurePackageDir(h, i[f], f);
                    a.packages && configurePackageDir(h, a.packages), d.pkgs = h
                }
                a.priority && (j = b.requireWait, b.requireWait = !1, c(), b.require(a.priority), c(), b.requireWait = j, d.priorityWait = a.priority), (a.deps || a.callback) && b.require(a.deps || [], a.callback)
            },
            requireDefined: function(a, b) {
                return u(a, b).fullName in h
            },
            requireSpecified: function(a, b) {
                return u(a, b).fullName in f
            },
            require: function(d, e, f) {
                var g, i, j;
                if (typeof d == "string") return isFunction(e) ? req.onError(makeError("requireargs", "Invalid require call")) : req.get ? req.get(b, d, e) : (g = d, f = e, j = u(g, f), i = j.fullName, i in h ? h[i] : req.onError(makeError("notloaded", "Module name '" + j.fullName + "' has not been loaded yet for context: " + a)));
                (d && d.length || e) && F(null, d, e, f);
                if (!b.requireWait)
                    while (!b.scriptCount && b.paused.length) c();
                return b.require
            },
            takeGlobalQueue: function() {
                globalDefQueue.length && (apsp.apply(b.defQueue, [b.defQueue.length - 1, 0].concat(globalDefQueue)), globalDefQueue = [])
            },
            completeLoad: function(a) {
                var d;
                b.takeGlobalQueue();
                while (e.length) {
                    d = e.shift();
                    if (d[0] === null) {
                        d[0] = a;
                        break
                    }
                    if (d[0] === a) break;
                    G(d), d = null
                }
                d ? G(d) : G([a, [], a === "jquery" && typeof jQuery != "undefined" ? function() {
                    return jQuery
                } : null]), req.isAsync && (b.scriptCount -= 1), c(), req.isAsync || (b.scriptCount -= 1)
            },
            toUrl: function(a, c) {
                var d = a.lastIndexOf("."),
                    e = null;
                return d !== -1 && (e = a.substring(d, a.length), a = a.substring(0, d)), b.nameToUrl(a, e, c)
            },
            nameToUrl: function(a, c, d) {
                var e, f, g, h, i, j, k, l, m = b.config;
                a = t(a, d && d.fullName);
                if (req.jsExtRegExp.test(a)) l = a + (c ? c : "");
                else {
                    e = m.paths, f = m.pkgs, i = a.split("/");
                    for (j = i.length; j > 0; j--) {
                        k = i.slice(0, j).join("/");
                        if (e[k]) {
                            i.splice(0, j, e[k]);
                            break
                        }
                        if (g = f[k]) {
                            a === g.name ? h = g.location + "/" + g.main : h = g.location, i.splice(0, j, h);
                            break
                        }
                    }
                    l = i.join("/") + (c || ".js"), l = (l.charAt(0) === "/" || l.match(/^\w+:/) ? "" : m.baseUrl) + l
                }
                return m.urlArgs ? l + ((l.indexOf("?") === -1 ? "?" : "&") + m.urlArgs) : l
            }
        }, b.jQueryCheck = jQueryCheck, b.resume = c, b
    }

    function getInteractiveScript() {
        var a, b, c;
        if (interactiveScript && interactiveScript.readyState === "interactive") return interactiveScript;
        a = document.getElementsByTagName("script");
        for (b = a.length - 1; b > -1 && (c = a[b]); b--)
            if (c.readyState === "interactive") return interactiveScript = c;
        return null
    }
    var version = "1.0.7",
        commentRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,
        cjsRequireRegExp = /require\(\s*["']([^'"\s]+)["']\s*\)/g,
        currDirRegExp = /^\.\//,
        jsSuffixRegExp = /\.js$/,
        ostring = Object.prototype.toString,
        ap = Array.prototype,
        aps = ap.slice,
        apsp = ap.splice,
        isBrowser = typeof window != "undefined" && !! navigator && !! document,
        isWebWorker = !isBrowser && typeof importScripts != "undefined",
        readyRegExp = isBrowser && navigator.platform === "PLAYSTATION 3" ? /^complete$/ : /^(complete|loaded)$/,
        defContextName = "_",
        isOpera = typeof opera != "undefined" && opera.toString() === "[object Opera]",
        empty = {}, contexts = {}, globalDefQueue = [],
        interactiveScript = null,
        checkLoadedDepth = 0,
        useInteractive = !1,
        reservedDependencies = {
            require: !0,
            module: !0,
            exports: !0
        }, req, cfg = {}, currentlyAddingScript, s, head, baseElement, scripts, script, src, subPath, mainScript, dataMain, globalI, ctx, jQueryCheck, checkLoadedTimeoutId;
    if (typeof define != "undefined") return;
    if (typeof requirejs != "undefined") {
        if (isFunction(requirejs)) return;
        cfg = requirejs, requirejs = undefined
    }
    typeof require != "undefined" && !isFunction(require) && (cfg = require, require = undefined), req = requirejs = function(a, b) {
        var c = defContextName,
            d, e;
        return !isArray(a) && typeof a != "string" && (e = a, isArray(b) ? (a = b, b = arguments[2]) : a = []), e && e.context && (c = e.context), d = contexts[c] || (contexts[c] = newContext(c)), e && d.configure(e), d.require(a, b)
    }, req.config = function(a) {
        return req(a)
    }, require || (require = req), req.toUrl = function(a) {
        return contexts[defContextName].toUrl(a)
    }, req.version = version, req.jsExtRegExp = /^\/|:|\?|\.js$/, s = req.s = {
        contexts: contexts,
        skipAsync: {}
    }, req.isAsync = req.isBrowser = isBrowser, isBrowser && (head = s.head = document.getElementsByTagName("head")[0], baseElement = document.getElementsByTagName("base")[0], baseElement && (head = s.head = baseElement.parentNode)), req.onError = function(a) {
        throw a
    }, req.load = function(a, b, c) {
        req.resourcesReady(!1), a.scriptCount += 1, req.attach(c, a, b), a.jQuery && !a.jQueryIncremented && (jQueryHoldReady(a.jQuery, !0), a.jQueryIncremented = !0)
    }, define = function(a, b, c) {
        var d, e;
        return typeof a != "string" && (c = b, b = a, a = null), isArray(b) || (c = b, b = []), !b.length && isFunction(c) && c.length && (c.toString().replace(commentRegExp, "").replace(cjsRequireRegExp, function(a, c) {
            b.push(c)
        }), b = (c.length === 1 ? ["require"] : ["require", "exports", "module"]).concat(b)), useInteractive && (d = currentlyAddingScript || getInteractiveScript(), d && (a || (a = d.getAttribute("data-requiremodule")), e = contexts[d.getAttribute("data-requirecontext")])), (e ? e.defQueue : globalDefQueue).push([a, b, c]), undefined
    }, define.amd = {
        multiversion: !0,
        plugins: !0,
        jQuery: !0
    }, req.exec = function(text) {
        return eval(text)
    }, req.execCb = function(a, b, c, d) {
        return b.apply(d, c)
    }, req.addScriptToDom = function(a) {
        currentlyAddingScript = a, baseElement ? head.insertBefore(a, baseElement) : head.appendChild(a), currentlyAddingScript = null
    }, req.onScriptLoad = function(a) {
        var b = a.currentTarget || a.srcElement,
            c, d, e;
        if (a.type === "load" || b && readyRegExp.test(b.readyState)) interactiveScript = null, c = b.getAttribute("data-requirecontext"), d = b.getAttribute("data-requiremodule"), e = contexts[c], contexts[c].completeLoad(d), b.detachEvent && !isOpera ? b.detachEvent("onreadystatechange", req.onScriptLoad) : b.removeEventListener("load", req.onScriptLoad, !1)
    }, req.attach = function(a, b, c, d, e, f) {
        var g;
        return isBrowser ? (d = d || req.onScriptLoad, g = b && b.config && b.config.xhtml ? document.createElementNS("http://www.w3.org/1999/xhtml", "html:script") : document.createElement("script"), g.type = e || b && b.config.scriptType || "text/javascript", g.charset = "utf-8", g.async = !s.skipAsync[a], b && g.setAttribute("data-requirecontext", b.contextName), g.setAttribute("data-requiremodule", c), g.attachEvent && !isOpera ? (useInteractive = !0, f ? g.onreadystatechange = function(a) {
            g.readyState === "loaded" && (g.onreadystatechange = null, g.attachEvent("onreadystatechange", d), f(g))
        } : g.attachEvent("onreadystatechange", d)) : g.addEventListener("load", d, !1), g.src = a, f || req.addScriptToDom(g), g) : (isWebWorker && (importScripts(a), b.completeLoad(c)), null)
    };
    if (isBrowser) {
        scripts = document.getElementsByTagName("script");
        for (globalI = scripts.length - 1; globalI > -1 && (script = scripts[globalI]); globalI--) {
            head || (head = script.parentNode);
            if (dataMain = script.getAttribute("data-main")) {
                cfg.baseUrl || (src = dataMain.split("/"), mainScript = src.pop(), subPath = src.length ? src.join("/") + "/" : "./", cfg.baseUrl = subPath, dataMain = mainScript.replace(jsSuffixRegExp, "")), cfg.deps = cfg.deps ? cfg.deps.concat(dataMain) : [dataMain];
                break
            }
        }
    }
    req.checkReadyState = function() {
        var a = s.contexts,
            b;
        for (b in a)
            if (!(b in empty) && a[b].waitCount) return;
        req.resourcesReady(!0)
    }, req.resourcesReady = function(a) {
        var b, c, d;
        req.resourcesDone = a;
        if (req.resourcesDone) {
            b = s.contexts;
            for (d in b) d in empty || (c = b[d], c.jQueryIncremented && (jQueryHoldReady(c.jQuery, !1), c.jQueryIncremented = !1))
        }
    }, req.pageLoaded = function() {
        document.readyState !== "complete" && (document.readyState = "complete")
    }, isBrowser && document.addEventListener && (document.readyState || (document.readyState = "loading", window.addEventListener("load", req.pageLoaded, !1))), req(cfg), req.isAsync && typeof setTimeout != "undefined" && (ctx = s.contexts[cfg.context || defContextName], ctx.requireWait = !0, setTimeout(function() {
        ctx.requireWait = !1, ctx.scriptCount || ctx.resume(), req.checkReadyState()
    }, 0))
})(), define("requireLib", function() {}),
function(a, b) {
    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b
    }

    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d
                } catch (g) {}
                f.data(a, c, d)
            } else d = b
        }
        return d
    }

    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1
        }
        return !0
    }

    function n(a, b, c) {
        var d = b + "defer",
            e = b + "queue",
            g = b + "mark",
            h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire())
        }, 0)
    }

    function J() {
        return !1
    }

    function K() {
        return !0
    }

    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11
    }

    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function(a, d) {
            var e = !! b.call(a, d, a);
            return e === c
        });
        if (b.nodeType) return f.grep(a, function(a, d) {
            return a === b === c
        });
        if (typeof b == "string") {
            var d = f.grep(a, function(a) {
                return a.nodeType === 1
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d)
        }
        return f.grep(a, function(a, d) {
            return f.inArray(a, b) >= 0 === c
        })
    }

    function U(a) {
        var b = V.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            while (b.length) c.createElement(b.pop());
        return c
    }

    function ib(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function jb(a, b) {
        if (b.nodeType !== 1 || !f.hasData(a)) return;
        var c, d, e, g = f._data(a),
            h = f._data(b, g),
            i = g.events;
        if (i) {
            delete h.handle, h.events = {};
            for (c in i)
                for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data)
        }
        h.data && (h.data = f.extend({}, h.data))
    }

    function kb(a, b) {
        var c;
        if (b.nodeType !== 1) return;
        b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
        if (c === "object") b.outerHTML = a.outerHTML;
        else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
            if (c === "option") b.selected = a.defaultSelected;
            else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue
        } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
        b.removeAttribute(f.expando)
    }

    function lb(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : []
    }

    function mb(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked
    }

    function nb(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? mb(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), mb)
    }

    function ob(a) {
        var b = c.createElement("div");
        return hb.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild
    }

    function pb(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(fb, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b)
    }

    function Cb(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight,
            e = b === "width" ? xb : yb,
            g = 0,
            h = e.length;
        if (d > 0) {
            if (c !== "border")
                for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px"
        }
        d = zb(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c)
            for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px"
    }

    function Zb(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(Pb),
                    e = 0,
                    g = d.length,
                    h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c)
            }
        }
    }

    function $b(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f],
            i = 0,
            j = h ? h.length : 0,
            k = a === Tb,
            l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = $b(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = $b(a, c, d, e, "*", g)), l
    }

    function _b(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e)
    }

    function ac(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function(b, e) {
            c || Eb.test(a) ? d(a, e) : ac(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d)
        });
        else if (!c && b != null && typeof b == "object")
            for (var e in b) ac(a + "[" + e + "]", b[e], c, d);
        else d(a, b)
    }

    function bc(a, c, d) {
        var e = a.contents,
            f = a.dataTypes,
            g = a.responseFields,
            h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h)
            for (i in e)
                if (e[i] && e[i].test(h)) {
                    f.unshift(i);
                    break
                }
        if (f[0] in d) j = f[0];
        else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break
                }
                k || (k = i)
            }
            j = j || k
        } if (j) return j !== f[0] && f.unshift(j), d[j]
    }

    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes,
            e = {}, g, h, i = d.length,
            j, k = d[0],
            l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1)
                for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l;
            else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break
                            }
                        }
                    }
                }!n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)))
            }
        }
        return c
    }

    function ic() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function jc() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function sc() {
        return setTimeout(tc, 0), rc = f.now()
    }

    function tc() {
        rc = b
    }

    function uc(a, b) {
        var c = {};
        return f.each(qc.concat.apply([], qc.slice(0, b)), function() {
            c[this] = a
        }), c
    }

    function vc(a) {
        if (!kc[a]) {
            var b = c.body,
                d = f("<" + a + ">").appendTo(b),
                e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                lc || (lc = c.createElement("iframe"), lc.frameBorder = lc.width = lc.height = 0), b.appendChild(lc);
                if (!mc || !lc.createElement) mc = (lc.contentWindow || lc.contentDocument).document, mc.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), mc.close();
                d = mc.createElement(a), mc.body.appendChild(d), e = f.css(d, "display"), b.removeChild(lc)
            }
            kc[a] = e
        }
        return kc[a]
    }

    function yc(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1
    }
    var c = a.document,
        d = a.navigator,
        e = a.location,
        f = function() {
            function J() {
                if (e.isReady) return;
                try {
                    c.documentElement.doScroll("left")
                } catch (a) {
                    setTimeout(J, 1);
                    return
                }
                e.ready()
            }
            var e = function(a, b) {
                return new e.fn.init(a, b, h)
            }, f = a.jQuery,
                g = a.$,
                h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
                j = /\S/,
                k = /^\s+/,
                l = /\s+$/,
                m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
                n = /^[\],:{}\s]*$/,
                o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
                p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                q = /(?:^|:|,)(?:\s*\[)+/g,
                r = /(webkit)[ \/]([\w.]+)/,
                s = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                t = /(msie) ([\w.]+)/,
                u = /(mozilla)(?:.*? rv:([\w.]+))?/,
                v = /-([a-z]|[0-9])/ig,
                w = /^-ms-/,
                x = function(a, b) {
                    return (b + "").toUpperCase()
                }, y = d.userAgent,
                z, A, B, C = Object.prototype.toString,
                D = Object.prototype.hasOwnProperty,
                E = Array.prototype.push,
                F = Array.prototype.slice,
                G = String.prototype.trim,
                H = Array.prototype.indexOf,
                I = {};
            return e.fn = e.prototype = {
                constructor: e,
                init: function(a, d, f) {
                    var g, h, j, k;
                    if (!a) return this;
                    if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                    if (a === "body" && !d && c.body) return this.context = c, this[0] = c.body, this.selector = a, this.length = 1, this;
                    if (typeof a == "string") {
                        a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? g = [null, a, null] : g = i.exec(a);
                        if (g && (g[1] || !d)) {
                            if (g[1]) return d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [c.createElement(j[1])], e.fn.attr.call(a, d, !0)) : a = [k.createElement(j[1])] : (j = e.buildFragment([g[1]], [k]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes), e.merge(this, a);
                            h = c.getElementById(g[2]);
                            if (h && h.parentNode) {
                                if (h.id !== g[2]) return f.find(a);
                                this.length = 1, this[0] = h
                            }
                            return this.context = c, this.selector = a, this
                        }
                        return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a)
                    }
                    return e.isFunction(a) ? f.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), e.makeArray(a, this))
                },
                selector: "",
                jquery: "1.7.1",
                length: 0,
                size: function() {
                    return this.length
                },
                toArray: function() {
                    return F.call(this, 0)
                },
                get: function(a) {
                    return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a]
                },
                pushStack: function(a, b, c) {
                    var d = this.constructor();
                    return e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d
                },
                each: function(a, b) {
                    return e.each(this, a, b)
                },
                ready: function(a) {
                    return e.bindReady(), A.add(a), this
                },
                eq: function(a) {
                    return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1)
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                slice: function() {
                    return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","))
                },
                map: function(a) {
                    return this.pushStack(e.map(this, function(b, c) {
                        return a.call(b, c, b)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: E,
                sort: [].sort,
                splice: [].splice
            }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
                var a, c, d, f, g, h, i = arguments[0] || {}, j = 1,
                    k = arguments.length,
                    l = !1;
                typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
                for (; j < k; j++)
                    if ((a = arguments[j]) != null)
                        for (c in a) {
                            d = i[c], f = a[c];
                            if (i === f) continue;
                            l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f)
                        }
                return i
            }, e.extend({
                noConflict: function(b) {
                    return a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f), e
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(a) {
                    a ? e.readyWait++ : e.ready(!0)
                },
                ready: function(a) {
                    if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                        if (!c.body) return setTimeout(e.ready, 1);
                        e.isReady = !0;
                        if (a !== !0 && --e.readyWait > 0) return;
                        A.fireWith(c, [e]), e.fn.trigger && e(c).trigger("ready").off("ready")
                    }
                },
                bindReady: function() {
                    if (A) return;
                    A = e.Callbacks("once memory");
                    if (c.readyState === "complete") return setTimeout(e.ready, 1);
                    if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1);
                    else if (c.attachEvent) {
                        c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                        var b = !1;
                        try {
                            b = a.frameElement == null
                        } catch (d) {}
                        c.documentElement.doScroll && b && J()
                    }
                },
                isFunction: function(a) {
                    return e.type(a) === "function"
                },
                isArray: Array.isArray || function(a) {
                    return e.type(a) === "array"
                },
                isWindow: function(a) {
                    return a && typeof a == "object" && "setInterval" in a
                },
                isNumeric: function(a) {
                    return !isNaN(parseFloat(a)) && isFinite(a)
                },
                type: function(a) {
                    return a == null ? String(a) : I[C.call(a)] || "object"
                },
                isPlainObject: function(a) {
                    if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                    try {
                        if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (c) {
                        return !1
                    }
                    var d;
                    for (d in a);
                    return d === b || D.call(a, d)
                },
                isEmptyObject: function(a) {
                    for (var b in a) return !1;
                    return !0
                },
                error: function(a) {
                    throw new Error(a)
                },
                parseJSON: function(b) {
                    if (typeof b != "string" || !b) return null;
                    b = e.trim(b);
                    if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                    if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                    e.error("Invalid JSON: " + b)
                },
                parseXML: function(c) {
                    var d, f;
                    try {
                        a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c))
                    } catch (g) {
                        d = b
                    }
                    return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c), d
                },
                noop: function() {},
                globalEval: function(b) {
                    b && j.test(b) && (a.execScript || function(b) {
                        a.eval.call(a, b)
                    })(b)
                },
                camelCase: function(a) {
                    return a.replace(w, "ms-").replace(v, x)
                },
                nodeName: function(a, b) {
                    return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase()
                },
                each: function(a, c, d) {
                    var f, g = 0,
                        h = a.length,
                        i = h === b || e.isFunction(a);
                    if (d) {
                        if (i) {
                            for (f in a)
                                if (c.apply(a[f], d) === !1) break
                        } else
                            for (; g < h;)
                                if (c.apply(a[g++], d) === !1) break
                    } else if (i) {
                        for (f in a)
                            if (c.call(a[f], f, a[f]) === !1) break
                    } else
                        for (; g < h;)
                            if (c.call(a[g], g, a[g++]) === !1) break; return a
                },
                trim: G ? function(a) {
                    return a == null ? "" : G.call(a)
                } : function(a) {
                    return a == null ? "" : a.toString().replace(k, "").replace(l, "")
                },
                makeArray: function(a, b) {
                    var c = b || [];
                    if (a != null) {
                        var d = e.type(a);
                        a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a)
                    }
                    return c
                },
                inArray: function(a, b, c) {
                    var d;
                    if (b) {
                        if (H) return H.call(b, a, c);
                        d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                        for (; c < d; c++)
                            if (c in b && b[c] === a) return c
                    }
                    return -1
                },
                merge: function(a, c) {
                    var d = a.length,
                        e = 0;
                    if (typeof c.length == "number")
                        for (var f = c.length; e < f; e++) a[d++] = c[e];
                    else
                        while (c[e] !== b) a[d++] = c[e++];
                    return a.length = d, a
                },
                grep: function(a, b, c) {
                    var d = [],
                        e;
                    c = !! c;
                    for (var f = 0, g = a.length; f < g; f++) e = !! b(a[f], f), c !== e && d.push(a[f]);
                    return d
                },
                map: function(a, c, d) {
                    var f, g, h = [],
                        i = 0,
                        j = a.length,
                        k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                    if (k)
                        for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f);
                    else
                        for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                    return h.concat.apply([], h)
                },
                guid: 1,
                proxy: function(a, c) {
                    if (typeof c == "string") {
                        var d = a[c];
                        c = a, a = d
                    }
                    if (!e.isFunction(a)) return b;
                    var f = F.call(arguments, 2),
                        g = function() {
                            return a.apply(c, f.concat(F.call(arguments)))
                        };
                    return g.guid = a.guid = a.guid || g.guid || e.guid++, g
                },
                access: function(a, c, d, f, g, h) {
                    var i = a.length;
                    if (typeof c == "object") {
                        for (var j in c) e.access(a, j, c[j], f, g, d);
                        return a
                    }
                    if (d !== b) {
                        f = !h && f && e.isFunction(d);
                        for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                        return a
                    }
                    return i ? g(a[0], c) : b
                },
                now: function() {
                    return (new Date).getTime()
                },
                uaMatch: function(a) {
                    a = a.toLowerCase();
                    var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                    return {
                        browser: b[1] || "",
                        version: b[2] || "0"
                    }
                },
                sub: function() {
                    function a(b, c) {
                        return new a.fn.init(b, c)
                    }
                    e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
                        return f && f instanceof e && !(f instanceof a) && (f = a(f)), e.fn.init.call(this, d, f, b)
                    }, a.fn.init.prototype = a.fn;
                    var b = a(c);
                    return a
                },
                browser: {}
            }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
                I["[object " + b + "]"] = b.toLowerCase()
            }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
                c.removeEventListener("DOMContentLoaded", B, !1), e.ready()
            } : c.attachEvent && (B = function() {
                c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready())
            }), e
        }(),
        g = {};
    f.Callbacks = function(a) {
        a = a ? g[a] || h(a) : {};
        var c = [],
            d = [],
            e, i, j, k, l, m = function(b) {
                var d, e, g, h, i;
                for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g)
            }, n = function(b, f) {
                f = f || [], e = !a.memory || [b, f], i = !0, l = j || 0, j = 0, k = c.length;
                for (; c && l < k; l++)
                    if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                        e = !0;
                        break
                    }
                i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])))
            }, o = {
                add: function() {
                    if (c) {
                        var a = c.length;
                        m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]))
                    }
                    return this
                },
                remove: function() {
                    if (c) {
                        var b = arguments,
                            d = 0,
                            e = b.length;
                        for (; d < e; d++)
                            for (var f = 0; f < c.length; f++)
                                if (b[d] === c[f]) {
                                    i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                                    if (a.unique) break
                                }
                    }
                    return this
                },
                has: function(a) {
                    if (c) {
                        var b = 0,
                            d = c.length;
                        for (; b < d; b++)
                            if (a === c[b]) return !0
                    }
                    return !1
                },
                empty: function() {
                    return c = [], this
                },
                disable: function() {
                    return c = d = e = b, this
                },
                disabled: function() {
                    return !c
                },
                lock: function() {
                    return d = b, (!e || e === !0) && o.disable(), this
                },
                locked: function() {
                    return !d
                },
                fireWith: function(b, c) {
                    return d && (i ? a.once || d.push([b, c]) : (!a.once || !e) && n(b, c)), this
                },
                fire: function() {
                    return o.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!e
                }
            };
        return o
    };
    var i = [].slice;
    f.extend({
        Deferred: function(a) {
            var b = f.Callbacks("once memory"),
                c = f.Callbacks("once memory"),
                d = f.Callbacks("memory"),
                e = "pending",
                g = {
                    resolve: b,
                    reject: c,
                    notify: d
                }, h = {
                    done: b.add,
                    fail: c.add,
                    progress: d.add,
                    state: function() {
                        return e
                    },
                    isResolved: b.fired,
                    isRejected: c.fired,
                    then: function(a, b, c) {
                        return i.done(a).fail(b).progress(c), this
                    },
                    always: function() {
                        return i.done.apply(i, arguments).fail.apply(i, arguments), this
                    },
                    pipe: function(a, b, c) {
                        return f.Deferred(function(d) {
                            f.each({
                                done: [a, "resolve"],
                                fail: [b, "reject"],
                                progress: [c, "notify"]
                            }, function(a, b) {
                                var c = b[0],
                                    e = b[1],
                                    g;
                                f.isFunction(c) ? i[a](function() {
                                    g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [g])
                                }) : i[a](d[e])
                            })
                        }).promise()
                    },
                    promise: function(a) {
                        if (a == null) a = h;
                        else
                            for (var b in h) a[b] = h[b];
                        return a
                    }
                }, i = h.promise({}),
                j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            return i.done(function() {
                e = "resolved"
            }, c.disable, d.lock).fail(function() {
                e = "rejected"
            }, b.disable, d.lock), a && a.call(i, i), i
        },
        when: function(a) {
            function l(a) {
                return function(c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b)
                }
            }

            function m(a) {
                return function(b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e)
                }
            }
            var b = i.call(arguments, 0),
                c = 0,
                d = b.length,
                e = new Array(d),
                g = d,
                h = d,
                j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(),
                k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b)
            } else j !== a && j.resolveWith(j, d ? [a] : []);
            return k
        }
    }), f.support = function() {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"),
            r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !! q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !! e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !! c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test
        } catch (s) {
            b.deleteExpando = !1
        }!q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
            b.noCloneEvent = !1
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (q.attachEvent)
            for (o in {
                submit: 1,
                change: 1,
                focusin: 1
            }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        return k.removeChild(q), k = g = h = j = q = i = null, f(function() {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            if (!r) return;
            j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i)
        }), b
    }();
    var j = /^(?:\{.*\}|\[.*\])$/,
        k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando], !! a && !m(a)
        },
        data: function(a, c, d, e) {
            if (!f.acceptData(a)) return;
            var g, h, i, j = f.expando,
                k = typeof c == "string",
                l = a.nodeType,
                m = l ? f.cache : a,
                n = l ? a[j] : a[j] && j,
                o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            return g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d), o && !h[c] ? g.events : (k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h, i)
        },
        removeData: function(a, b, c) {
            if (!f.acceptData(a)) return;
            var d, e, g, h = f.expando,
                i = a.nodeType,
                j = i ? f.cache : a,
                k = i ? a[h] : h;
            if (!j[k]) return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [b] : (b = f.camelCase(b), b in d ? b = [b] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d)) return
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k])) return
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null)
        },
        _data: function(a, b, c) {
            return f.data(a, b, c, !0)
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b
            }
            return !0
        }
    }), f.fn.extend({
        data: function(a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0)
                    }
                }
                return h
            }
            return typeof a == "object" ? this.each(function() {
                f.data(this, a)
            }) : (d = a.split("."), d[1] = d[1] ? "." + d[1] : "", c === b ? (h = this.triggerHandler("getData" + d[1] + "!", [d[0]]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h)), h === b && d[1] ? this.data(d[0]) : h) : this.each(function() {
                var b = f(this),
                    e = [d[0], c];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e)
            }))
        },
        removeData: function(a) {
            return this.each(function() {
                f.removeData(this, a)
            })
        }
    }), f.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1))
        },
        _unmark: function(a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark",
                    e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"))
            }
        },
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c)), d || []
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = f.queue(a, b),
                d = c.shift(),
                e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
                f.dequeue(a, b)
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"))
        }
    }), f.fn.extend({
        queue: function(a, c) {
            return typeof a != "string" && (c = a, a = "fx"), c === b ? f.queue(this[0], a) : this.each(function() {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a)
            })
        },
        dequeue: function(a) {
            return this.each(function() {
                f.dequeue(this, a)
            })
        },
        delay: function(a, b) {
            return a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d)
                }
            })
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, c) {
            function m() {
                --h || d.resolveWith(e, [e])
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(),
                e = this,
                g = e.length,
                h = 1,
                i = a + "defer",
                j = a + "queue",
                k = a + "mark",
                l;
            while (g--)
                if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            return m(), d.promise()
        }
    });
    var o = /[\n\t\r]/g,
        p = /\s+/,
        q = /\r/g,
        r = /^(?:button|input)$/i,
        s = /^(?:button|input|object|select|textarea)$/i,
        t = /^a(?:rea)?$/i,
        u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
        v = f.support.getSetAttribute,
        w, x, y;
    f.fn.extend({
        attr: function(a, b) {
            return f.access(this, a, b, !0, f.attr)
        },
        removeAttr: function(a) {
            return this.each(function() {
                f.removeAttr(this, a)
            })
        },
        prop: function(a, b) {
            return f.access(this, a, b, !0, f.prop)
        },
        removeProp: function(a) {
            return a = f.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a]
                } catch (c) {}
            })
        },
        addClass: function(a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).addClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1)
                        if (!e.className && b.length === 1) e.className = a;
                        else {
                            g = " " + e.className + " ";
                            for (h = 0, i = b.length; h < i; h++)~ g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                            e.className = f.trim(g)
                        }
                }
            }
            return this
        },
        removeClass: function(a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).removeClass(a.call(this, b, this.className))
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className)
                        if (a) {
                            h = (" " + g.className + " ").replace(o, " ");
                            for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                            g.className = f.trim(h)
                        } else g.className = ""
                }
            }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a,
                d = typeof b == "boolean";
            return f.isFunction(a) ? this.each(function(c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b)
            }) : this.each(function() {
                if (c === "string") {
                    var e, g = 0,
                        h = f(this),
                        i = b,
                        j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e)
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || ""
            })
        },
        hasClass: function(a) {
            var b = " " + a + " ",
                c = 0,
                d = this.length;
            for (; c < d; c++)
                if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1
        },
        val: function(a) {
            var c, d, e, g = this[0];
            if (!arguments.length) {
                if (g) return c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, typeof d == "string" ? d.replace(q, "") : d == null ? "" : d);
                return
            }
            return e = f.isFunction(a), this.each(function(d) {
                var g = f(this),
                    h;
                if (this.nodeType !== 1) return;
                e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
                    return a == null ? "" : a + ""
                })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h
            })
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, g = a.selectedIndex,
                        h = [],
                        i = a.options,
                        j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b)
                        }
                    }
                    return j && !h.length && i.length ? f(i[g]).val() : h
                },
                set: function(a, b) {
                    var c = f.makeArray(b);
                    return f(a).find("option").each(function() {
                        this.selected = f.inArray(f(this).val(), c) >= 0
                    }), c.length || (a.selectedIndex = -1), c
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!a || j === 3 || j === 8 || j === 2) return;
            if (e && c in f.attrFn) return f(a)[c](d);
            if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return
                }
                return h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d)
            }
            return h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g)
        },
        removeAttr: function(a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1))
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed");
                    else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null
                },
                set: function(a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) return;
            return h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function(a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c
        }
    }, v || (y = {
        name: !0,
        id: !0
    }, w = f.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + ""
        }
    }, f.attrHooks.tabindex.set = w.set, f.each(["width", "height"], function(a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function(a, c) {
                if (c === "") return a.setAttribute(b, "auto"), c
            }
        })
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function(a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c)
        }
    }), f.support.hrefNormalized || f.each(["href", "src", "width", "height"], function(a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d
            }
        })
    }), f.support.style || (f.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b
        },
        set: function(a, b) {
            return a.style.cssText = "" + b
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value
            }
        }
    }), f.each(["radio", "checkbox"], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0
            }
        })
    });
    var z = /^(?:textarea|input|select)$/i,
        A = /^([^\.]*)?(?:\.(.+))?$/,
        B = /\bhover(\.\S+)?\b/,
        C = /^key/,
        D = /^(?:mouse|contextmenu)|click/,
        E = /^(?:focusinfocus|focusoutblur)$/,
        F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,
        G = function(a) {
            var b = F.exec(a);
            return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b
        }, H = function(a, b) {
            var c = a.attributes || {};
            return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value))
        }, I = function(a) {
            return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1")
        };
    f.event = {
        add: function(a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a))) return;
            d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
                return typeof f == "undefined" || !! a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments)
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                    type: m,
                    origType: l[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: g,
                    quick: G(g),
                    namespace: n.join(".")
                }, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i)
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0
            }
            a = null
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a),
                h, i, j, k, l, m, n, o, p, q, r, s;
            if (!g || !(o = g.events)) return;
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                    continue
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j])
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, ["events", "handle"], !0))
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c,
                    i = [],
                    j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [
                    [e, p.bindType || h]
                ];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([m, s]), n = m;
                    n && n === e.ownerDocument && r.push([n.defaultView || n.parentWindow || a, s])
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                return c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n)), c.result
            }
            return
        },
        dispatch: function(c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [],
                e = d.delegateCount,
                g = [].slice.call(arguments, 0),
                h = !c.exclusive && !c.namespace,
                i = [],
                j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                    q.length && i.push({
                        elem: l,
                        matches: q
                    })
                }
            }
            d.length > e && i.push({
                elem: this,
                matches: d.slice(e)
            });
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()))
                }
            }
            return c.result
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, d) {
                var e, f, g, h = d.button,
                    i = d.fromElement;
                return a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a
            }
        },
        fix: function(a) {
            if (a[f.expando]) return a;
            var d, e, g = a,
                h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d;) e = i[--d], a[e] = g[e];
            return a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), h.filter ? h.filter(a, g) : a
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c)
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault()
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    } : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c)
    }, f.Event = function(a, b) {
        if (!(this instanceof f.Event)) return new f.Event(a, b);
        a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0
    }, f.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            if (!a) return;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        },
        stopPropagation: function() {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            if (!a) return;
            a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = K, this.stopPropagation()
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c = this,
                    d = a.relatedTarget,
                    e = a.handleObj,
                    g = e.selector,
                    h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h
            }
        }
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target,
                    d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0)
                }), d._submit_attached = !0)
            })
        },
        teardown: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit")
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function() {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0)
                }), f.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0))
                });
                return !1
            }
            f.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0)
                }), b._change_attached = !0)
            })
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments)
        },
        teardown: function() {
            return f.event.remove(this, "._change"), z.test(this.nodeName)
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0,
            e = function(a) {
                f.event.simulate(b, a.target, f.event.fix(a), !0)
            };
        f.event.special[b] = {
            setup: function() {
                d++ === 0 && c.addEventListener(a, e, !0)
            },
            teardown: function() {
                --d === 0 && c.removeEventListener(a, e, !0)
            }
        }
    }), f.fn.extend({
        on: function(a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J;
            else if (!e) return this;
            return g === 1 && (h = e, e = function(a) {
                return f().off(a), h.apply(this, arguments)
            }, e.guid = h.guid || (h.guid = f.guid++)), this.each(function() {
                f.event.add(this, a, e, d, c)
            })
        },
        one: function(a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1)
        },
        off: function(a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                return f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler), this
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            return d === !1 && (d = J), this.each(function() {
                f.event.remove(this, a, d, c)
            })
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        live: function(a, b, c) {
            return f(this.context).on(a, this.selector, b, c), this
        },
        die: function(a, b) {
            return f(this.context).off(a, this.selector || "**", b), this
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c)
        },
        trigger: function(a, b) {
            return this.each(function() {
                f.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0)
        },
        toggle: function(a) {
            var b = arguments,
                c = a.guid || f.guid++,
                d = 0,
                e = function(c) {
                    var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                    return f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1
                };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e)
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        f.fn[b] = function(a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks)
    }),
    function() {
        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }

        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break
                                }
                            } else if (m.filter(b, [j]).length > 0) {
                                k = j;
                                break
                            }
                        }
                        j = j[a]
                    }
                    e[h] = k
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
            d = "sizcache" + (Math.random() + "").replace(".", ""),
            e = 0,
            g = Object.prototype.toString,
            h = !1,
            i = !0,
            j = /\\/g,
            k = /\r\n/g,
            l = /\W/;
        [0, 0].sort(function() {
                return i = !1, 0
            });
        var m = function(b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0,
                v = m.isXML(d),
                w = [],
                x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b))
                if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f);
                else {
                    j = o.relative[w[0]] ? [d] : m(w.shift(), d);
                    while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f)
                } else {
                    !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                    if (d) {
                        n = f ? {
                            expr: w.pop(),
                            set: s(f)
                        } : m.find(w.pop(), w.length !== 1 || w[0] !== "~" && w[0] !== "+" || !d.parentNode ? d : d.parentNode, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                        while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v)
                    } else k = w = []
                }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]")
                if (!u) e.push.apply(e, k);
                else
            if (d && d.nodeType === 1)
                for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]);
            else
                for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]);
            else s(k, e);
            return l && (m(l, h, e, f), m.uniqueSort(e)), e
        };
        m.uniqueSort = function(a) {
            if (u) {
                h = i, a.sort(u);
                if (h)
                    for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1)
            }
            return a
        }, m.matches = function(a, b) {
            return m(a, null, null, b)
        }, m.matchesSelector = function(a, b) {
            return m(b, null, null, [a]).length > 0
        }, m.find = function(a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break
                        }
                    }
                }
            }
            return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            }
        }, m.filter = function(a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a,
                r = [],
                s = c,
                t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter)
                    if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                        k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                        if (l.substr(l.length - 1) === "\\") continue;
                        s === r && (r = []);
                        if (o.preFilter[h]) {
                            f = o.preFilter[h](f, s, d, r, e, t);
                            if (!f) g = i = !0;
                            else if (f === !0) continue
                        }
                        if (f)
                            for (n = 0;
                                (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                        if (i !== b) {
                            d || (s = r), a = a.replace(o.match[h], "");
                            if (!g) return [];
                            break
                        }
                    }
                if (a === q) {
                    if (g != null) break;
                    m.error(a)
                }
                q = a
            }
            return s
        }, m.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        };
        var n = m.getText = function(a) {
            var b, c, d = a.nodeType,
                e = "";
            if (d) {
                if (d === 1 || d === 9) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a)
                } else if (d === 3 || d === 4) return a.nodeValue
            } else
                for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e
        }, o = m.selectors = {
                order: ["ID", "NAME", "TAG"],
                match: {
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                },
                leftMatch: {},
                attrMap: {
                    "class": "className",
                    "for": "htmlFor"
                },
                attrHandle: {
                    href: function(a) {
                        return a.getAttribute("href")
                    },
                    type: function(a) {
                        return a.getAttribute("type")
                    }
                },
                relative: {
                    "+": function(a, b) {
                        var c = typeof b == "string",
                            d = c && !l.test(b),
                            e = c && !d;
                        d && (b = b.toLowerCase());
                        for (var f = 0, g = a.length, h; f < g; f++)
                            if (h = a[f]) {
                                while ((h = h.previousSibling) && h.nodeType !== 1);
                                a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b
                            }
                        e && m.filter(b, a, !0)
                    },
                    ">": function(a, b) {
                        var c, d = typeof b == "string",
                            e = 0,
                            f = a.length;
                        if (d && !l.test(b)) {
                            b = b.toLowerCase();
                            for (; e < f; e++) {
                                c = a[e];
                                if (c) {
                                    var g = c.parentNode;
                                    a[e] = g.nodeName.toLowerCase() === b ? g : !1
                                }
                            }
                        } else {
                            for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                            d && m.filter(b, a, !0)
                        }
                    },
                    "": function(a, b, c) {
                        var d, f = e++,
                            g = x;
                        typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c)
                    },
                    "~": function(a, b, c) {
                        var d, f = e++,
                            g = x;
                        typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c)
                    }
                },
                find: {
                    ID: function(a, b, c) {
                        if (typeof b.getElementById != "undefined" && !c) {
                            var d = b.getElementById(a[1]);
                            return d && d.parentNode ? [d] : []
                        }
                    },
                    NAME: function(a, b) {
                        if (typeof b.getElementsByName != "undefined") {
                            var c = [],
                                d = b.getElementsByName(a[1]);
                            for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                            return c.length === 0 ? null : c
                        }
                    },
                    TAG: function(a, b) {
                        if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1])
                    }
                },
                preFilter: {
                    CLASS: function(a, b, c, d, e, f) {
                        a = " " + a[1].replace(j, "") + " ";
                        if (f) return a;
                        for (var g = 0, h;
                            (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                        return !1
                    },
                    ID: function(a) {
                        return a[1].replace(j, "")
                    },
                    TAG: function(a, b) {
                        return a[1].replace(j, "").toLowerCase()
                    },
                    CHILD: function(a) {
                        if (a[1] === "nth") {
                            a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                            var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                            a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0
                        } else a[2] && m.error(a[0]);
                        return a[0] = e++, a
                    },
                    ATTR: function(a, b, c, d, e, f) {
                        var g = a[1] = a[1].replace(j, "");
                        return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a
                    },
                    PSEUDO: function(b, c, d, e, f) {
                        if (b[1] === "not") {
                            if (!((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3]))) {
                                var g = m.filter(b[3], c, d, !0 ^ f);
                                return d || e.push.apply(e, g), !1
                            }
                            b[3] = m(b[3], null, null, c)
                        } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                        return b
                    },
                    POS: function(a) {
                        return a.unshift(!0), a
                    }
                },
                filters: {
                    enabled: function(a) {
                        return a.disabled === !1 && a.type !== "hidden"
                    },
                    disabled: function(a) {
                        return a.disabled === !0
                    },
                    checked: function(a) {
                        return a.checked === !0
                    },
                    selected: function(a) {
                        return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                    },
                    parent: function(a) {
                        return !!a.firstChild
                    },
                    empty: function(a) {
                        return !a.firstChild
                    },
                    has: function(a, b, c) {
                        return !!m(c[3], a).length
                    },
                    header: function(a) {
                        return /h\d/i.test(a.nodeName)
                    },
                    text: function(a) {
                        var b = a.getAttribute("type"),
                            c = a.type;
                        return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null)
                    },
                    radio: function(a) {
                        return a.nodeName.toLowerCase() === "input" && "radio" === a.type
                    },
                    checkbox: function(a) {
                        return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type
                    },
                    file: function(a) {
                        return a.nodeName.toLowerCase() === "input" && "file" === a.type
                    },
                    password: function(a) {
                        return a.nodeName.toLowerCase() === "input" && "password" === a.type
                    },
                    submit: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "submit" === a.type
                    },
                    image: function(a) {
                        return a.nodeName.toLowerCase() === "input" && "image" === a.type
                    },
                    reset: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return (b === "input" || b === "button") && "reset" === a.type
                    },
                    button: function(a) {
                        var b = a.nodeName.toLowerCase();
                        return b === "input" && "button" === a.type || b === "button"
                    },
                    input: function(a) {
                        return /input|select|textarea|button/i.test(a.nodeName)
                    },
                    focus: function(a) {
                        return a === a.ownerDocument.activeElement
                    }
                },
                setFilters: {
                    first: function(a, b) {
                        return b === 0
                    },
                    last: function(a, b, c, d) {
                        return b === d.length - 1
                    },
                    even: function(a, b) {
                        return b % 2 === 0
                    },
                    odd: function(a, b) {
                        return b % 2 === 1
                    },
                    lt: function(a, b, c) {
                        return b < c[3] - 0
                    },
                    gt: function(a, b, c) {
                        return b > c[3] - 0
                    },
                    nth: function(a, b, c) {
                        return c[3] - 0 === b
                    },
                    eq: function(a, b, c) {
                        return c[3] - 0 === b
                    }
                },
                filter: {
                    PSEUDO: function(a, b, c, d) {
                        var e = b[1],
                            f = o.filters[e];
                        if (f) return f(a, c, b, d);
                        if (e === "contains") return (a.textContent || a.innerText || n([a]) || "").indexOf(b[3]) >= 0;
                        if (e === "not") {
                            var g = b[3];
                            for (var h = 0, i = g.length; h < i; h++)
                                if (g[h] === a) return !1;
                            return !0
                        }
                        m.error(e)
                    },
                    CHILD: function(a, b) {
                        var c, e, f, g, h, i, j, k = b[1],
                            l = a;
                        switch (k) {
                            case "only":
                            case "first":
                                while (l = l.previousSibling)
                                    if (l.nodeType === 1) return !1;
                                if (k === "first") return !0;
                                l = a;
                            case "last":
                                while (l = l.nextSibling)
                                    if (l.nodeType === 1) return !1;
                                return !0;
                            case "nth":
                                c = b[2], e = b[3];
                                if (c === 1 && e === 0) return !0;
                                f = b[0], g = a.parentNode;
                                if (g && (g[d] !== f || !a.nodeIndex)) {
                                    i = 0;
                                    for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                                    g[d] = f
                                }
                                return j = a.nodeIndex - e, c === 0 ? j === 0 : j % c === 0 && j / c >= 0
                        }
                    },
                    ID: function(a, b) {
                        return a.nodeType === 1 && a.getAttribute("id") === b
                    },
                    TAG: function(a, b) {
                        return b === "*" && a.nodeType === 1 || !! a.nodeName && a.nodeName.toLowerCase() === b
                    },
                    CLASS: function(a, b) {
                        return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1
                    },
                    ATTR: function(a, b) {
                        var c = b[1],
                            d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c),
                            e = d + "",
                            f = b[2],
                            g = b[4];
                        return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1
                    },
                    POS: function(a, b, c, d) {
                        var e = b[2],
                            f = o.setFilters[e];
                        if (f) return f(a, c, b, d)
                    }
                }
            }, p = o.match.POS,
            q = function(a, b) {
                return "\\" + (b - 0 + 1)
            };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function(a, b) {
            return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType
        } catch (t) {
            s = function(a, b) {
                var c = 0,
                    d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a);
                else if (typeof a.length == "number")
                    for (var e = a.length; c < e; c++) d.push(a[c]);
                else
                    for (; a[c]; c++) d.push(a[c]);
                return d
            }
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function(a, b) {
            return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
        } : (u = function(a, b) {
            if (a === b) return h = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [],
                f = [],
                g = a.parentNode,
                i = b.parentNode,
                j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++)
                if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1)
        }, v = function(a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling
            }
            return 1
        }),
        function() {
            var a = c.createElement("div"),
                d = "script" + (new Date).getTime(),
                e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [e] : b : []
                }
            }, o.filter.ID = function(a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b
            }), e.removeChild(a), e = a = null
        }(),
        function() {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d
                }
                return c
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
                return a.getAttribute("href", 2)
            }), a = null
        }(), c.querySelectorAll && function() {
            var a = m,
                b = c.createElement("div"),
                d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (b.querySelectorAll && b.querySelectorAll(".TEST").length === 0) return;
            m = function(b, e, f, g) {
                e = e || c;
                if (!g && !m.isXML(e)) {
                    var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                    if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                        if (h[1]) return s(e.getElementsByTagName(b), f);
                        if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f)
                    }
                    if (e.nodeType === 9) {
                        if (b === "body" && e.body) return s([e.body], f);
                        if (h && h[3]) {
                            var i = e.getElementById(h[3]);
                            if (!i || !i.parentNode) return s([], f);
                            if (i.id === h[3]) return s([i], f)
                        }
                        try {
                            return s(e.querySelectorAll(b), f)
                        } catch (j) {}
                    } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                        var k = e,
                            l = e.getAttribute("id"),
                            n = l || d,
                            p = e.parentNode,
                            q = /^\s*[+~]/.test(b);
                        l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                        try {
                            if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f)
                        } catch (r) {} finally {
                            l || k.removeAttribute("id")
                        }
                    }
                }
                return a(b, e, f, g)
            };
            for (var e in a) m[e] = a[e];
            b = null
        }(),
        function() {
            var a = c.documentElement,
                b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"),
                    e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle")
                } catch (f) {
                    e = !0
                }
                m.matchesSelector = function(a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f
                        }
                    } catch (g) {}
                    return m(c, null, null, [a]).length > 0
                }
            }
        }(),
        function() {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return;
            a.lastChild.className = "e";
            if (a.getElementsByClassName("e").length === 1) return;
            o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
                if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1])
            }, a = null
        }(), c.documentElement.contains ? m.contains = function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0)
        } : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        } : m.contains = function() {
            return !1
        }, m.isXML = function(a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1
        };
        var y = function(a, b, c) {
            var d, e = [],
                f = "",
                g = b.nodeType ? [b] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e)
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains
    }();
    var L = /Until$/,
        M = /^(?:parents|prevUntil|prevAll)/,
        N = /,/,
        O = /^.[^:#\[\.,]*$/,
        P = Array.prototype.slice,
        Q = f.expr.match.POS,
        R = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    f.fn.extend({
        find: function(a) {
            var b = this,
                c, d;
            if (typeof a != "string") return f(a).filter(function() {
                for (c = 0, d = b.length; c < d; c++)
                    if (f.contains(b[c], this)) return !0
            });
            var e = this.pushStack("", "find", a),
                g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0)
                    for (h = g; h < e.length; h++)
                        for (i = 0; i < g; i++)
                            if (e[i] === e[h]) {
                                e.splice(h--, 1);
                                break
                            }
            }
            return e
        },
        has: function(a) {
            var b = f(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++)
                    if (f.contains(this, b[a])) return !0
            })
        },
        not: function(a) {
            return this.pushStack(T(this, a, !1), "not", a)
        },
        filter: function(a) {
            return this.pushStack(T(this, a, !0), "filter", a)
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0)
        },
        closest: function(a, b) {
            var c = [],
                d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++
                }
                return c
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break
                }
            }
            return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a)
        },
        index: function(a) {
            return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1
        },
        add: function(a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [a] : a),
                d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d))
        },
        andSelf: function() {
            return this.add(this.prevObject)
        }
    }), f.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null
        },
        parents: function(a) {
            return f.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return f.dir(a, "parentNode", c)
        },
        next: function(a) {
            return f.nth(a, 2, "nextSibling")
        },
        prev: function(a) {
            return f.nth(a, 2, "previousSibling")
        },
        nextAll: function(a) {
            return f.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return f.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return f.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return f.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return f.sibling(a.parentNode.firstChild, a)
        },
        children: function(a) {
            return f.sibling(a.firstChild)
        },
        contents: function(a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes)
        }
    }, function(a, b) {
        f.fn[a] = function(c, d) {
            var e = f.map(this, b, c);
            return L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","))
        }
    }), f.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? f.find.matchesSelector(b[0], a) ? [b[0]] : [] : f.find.matches(a, b)
        },
        dir: function(a, c, d) {
            var e = [],
                g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c])
                if (a.nodeType === 1 && ++e === b) break;
            return a
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
        W = / jQuery\d+="(?:\d+|null)"/g,
        X = /^\s+/,
        Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
        Z = /<([\w:]+)/,
        $ = /<tbody/i,
        _ = /<|&#?\w+;/,
        ab = /<(?:script|style)/i,
        bb = /<(?:script|object|embed|option|style)/i,
        cb = new RegExp("<(?:" + V + ")", "i"),
        db = /checked\s*(?:[^=]|=\s*.checked.)/i,
        eb = /\/(java|ecma)script/i,
        fb = /^\s*<!(?:\[CDATA\[|\-\-)/,
        gb = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            legend: [1, "<fieldset>", "</fieldset>"],
            thead: [1, "<table>", "</table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            area: [1, "<map>", "</map>"],
            _default: [0, "", ""]
        }, hb = U(c);
    gb.optgroup = gb.option, gb.tbody = gb.tfoot = gb.colgroup = gb.caption = gb.thead, gb.th = gb.td, f.support.htmlSerialize || (gb._default = [1, "div<div>", "</div>"]), f.fn.extend({
        text: function(a) {
            return f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()))
            }) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a)) : f.text(this)
        },
        wrapAll: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return f.isFunction(a) ? this.each(function(b) {
                f(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = f(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = f.isFunction(a);
            return this.each(function(c) {
                f(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes)
            }).end()
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.appendChild(a)
            })
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild)
            })
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this)
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments)
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling)
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, f.clean(arguments)), a
            }
        },
        remove: function(a, b) {
            for (var c = 0, d;
                (d = this[c]) != null; c++)
                if (!a || f.filter(a, [d]).length)!b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([d])), d.parentNode && d.parentNode.removeChild(d);
            return this
        },
        empty: function() {
            for (var a = 0, b;
                (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild)
            }
            return this
        },
        clone: function(a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                return f.clone(this, a, b)
            })
        },
        html: function(a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ab.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !gb[(Z.exec(a) || ["", ""])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a)
                } catch (e) {
                    this.empty().append(a)
                }
            } else f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()))
            }) : this.empty().append(a);
            return this
        },
        replaceWith: function(a) {
            return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function(b) {
                var c = f(this),
                    d = c.html();
                c.replaceWith(a.call(this, b, d))
            }) : (typeof a != "string" && (a = f(a).detach()), this.each(function() {
                var b = this.nextSibling,
                    c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a)
            })) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, c, d) {
            var e, g, h, i, j = a[0],
                k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && db.test(j)) return this.each(function() {
                f(this).domManip(a, c, d, !0)
            });
            if (f.isFunction(j)) return this.each(function(e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d)
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? ib(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h)
                }
                k.length && f.each(k, pb)
            }
            return this
        }
    }), f.buildFragment = function(a, b, d) {
        var e, g, h, i, j = a[0];
        return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !db.test(j)) && (f.support.html5Clone || !cb.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
            fragment: e,
            cacheable: g
        }
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        f.fn[a] = function(c) {
            var d = [],
                e = f(c),
                g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j)
            }
            return this.pushStack(d, a, e.selector)
        }
    }), f.extend({
        clone: function(a, b, c) {
            var d, e, g, h = f.support.html5Clone || !cb.test("<" + a.nodeName) ? a.cloneNode(!0) : ob(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                kb(a, h), d = lb(a), e = lb(h);
                for (g = 0; d[g]; ++g) e[g] && kb(d[g], e[g])
            }
            if (b) {
                jb(a, h);
                if (c) {
                    d = lb(a), e = lb(h);
                    for (g = 0; d[g]; ++g) jb(d[g], e[g])
                }
            }
            return d = e = null, h
        },
        clean: function(a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [],
                i;
            for (var j = 0, k;
                (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string")
                    if (!_.test(k)) k = b.createTextNode(k);
                    else {
                        k = k.replace(Y, "<$1></$2>");
                        var l = (Z.exec(k) || ["", ""])[1].toLowerCase(),
                            m = gb[l] || gb._default,
                            n = m[0],
                            o = b.createElement("div");
                        b === c ? hb.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                        while (n--) o = o.lastChild;
                        if (!f.support.tbody) {
                            var p = $.test(k),
                                q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                            for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i])
                        }!f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes
                    }
                var r;
                if (!f.support.appendChecked)
                    if (k[0] && typeof(r = k.length) == "number")
                        for (i = 0; i < r; i++) nb(k[i]);
                    else nb(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k)
            }
            if (d) {
                g = function(a) {
                    return !a.type || eb.test(a.type)
                };
                for (j = 0; h[j]; j++)
                    if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]);
                    else {
                        if (h[j].nodeType === 1) {
                            var s = f.grep(h[j].getElementsByTagName("script"), g);
                            h.splice.apply(h, [j + 1, 0].concat(s))
                        }
                        d.appendChild(h[j])
                    }
            }
            return h
        },
        cleanData: function(a) {
            var b, c, d = f.cache,
                e = f.event.special,
                g = f.support.deleteExpando;
            for (var h = 0, i;
                (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null)
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c]
                }
            }
        }
    });
    var qb = /alpha\([^)]*\)/i,
        rb = /opacity=([^)]*)/,
        sb = /([A-Z]|^ms)/g,
        tb = /^-?\d+(?:px)?$/i,
        ub = /^-?\d/,
        vb = /^([\-+])=([\-+.\de]+)/,
        wb = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }, xb = ["Left", "Right"],
        yb = ["Top", "Bottom"],
        zb, Ab, Bb;
    f.fn.css = function(a, c) {
        return arguments.length === 2 && c === b ? this : f.access(this, a, c, !0, function(a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c)
        })
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = zb(a, "opacity", "opacity");
                        return c === "" ? "1" : c
                    }
                    return a.style.opacity
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
            var g, h, i = f.camelCase(c),
                j = a.style,
                k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
            h = typeof d, h === "string" && (g = vb.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d)) return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                j[c] = d
            } catch (l) {}
        },
        css: function(a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (zb) return zb(a, c)
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e]
        }
    }), f.curCSS = f.css, f.each(["height", "width"], function(a, b) {
        f.cssHooks[b] = {
            get: function(a, c, d) {
                var e;
                if (c) return a.offsetWidth !== 0 ? Cb(a, b, d) : (f.swap(a, wb, function() {
                    e = Cb(a, b, d)
                }), e)
            },
            set: function(a, b) {
                if (!tb.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px"
            }
        }
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function(a, b) {
            return rb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "",
                g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(qb, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return
            }
            c.filter = qb.test(g) ? g.replace(qb, e) : g + " " + e
        }
    }), f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(a, b) {
                var c;
                return f.swap(a, {
                    display: "inline-block"
                }, function() {
                    b ? c = zb(a, "margin-right", "marginRight") : c = a.style.marginRight
                }), c
            }
        })
    }), c.defaultView && c.defaultView.getComputedStyle && (Ab = function(a, b) {
        var c, d, e;
        return b = b.replace(sb, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), c
    }), c.documentElement.currentStyle && (Bb = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b],
            g = a.style;
        return f === null && g && (e = g[b]) && (f = e), !tb.test(f) && ub.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f
    }), zb = Ab || Bb, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
        var b = a.offsetWidth,
            c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none"
    }, f.expr.filters.visible = function(a) {
        return !f.expr.filters.hidden(a)
    });
    var Db = /%20/g,
        Eb = /\[\]$/,
        Fb = /\r?\n/g,
        Gb = /#.*$/,
        Hb = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
        Ib = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
        Jb = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        Kb = /^(?:GET|HEAD)$/,
        Lb = /^\/\//,
        Mb = /\?/,
        Nb = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        Ob = /^(?:select|textarea)/i,
        Pb = /\s+/,
        Qb = /([?&])_=[^&]*/,
        Rb = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,
        Sb = f.fn.load,
        Tb = {}, Ub = {}, Vb, Wb, Xb = ["*/"] + ["*"];
    try {
        Vb = e.href
    } catch (Yb) {
        Vb = c.createElement("a"), Vb.href = "", Vb = Vb.href
    }
    Wb = Rb.exec(Vb.toLowerCase()) || [], f.fn.extend({
        load: function(a, c, d) {
            if (typeof a != "string" && Sb) return Sb.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e)
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            return f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function(a) {
                        c = a
                    }), i.html(g ? f("<div>").append(c.replace(Nb, "")).find(g) : c)), d && i.each(d, [c, b, a])
                }
            }), this
        },
        serialize: function() {
            return f.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || Ob.test(this.nodeName) || Ib.test(this.type))
            }).map(function(a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(Fb, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(Fb, "\r\n")
                }
            }).get()
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        f.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), f.each(["get", "post"], function(a, c) {
        f[c] = function(a, d, e, g) {
            return f.isFunction(d) && (g = g || e, e = d, d = b), f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            })
        }
    }), f.extend({
        getScript: function(a, c) {
            return f.get(a, b, c, "script")
        },
        getJSON: function(a, b, c) {
            return f.get(a, b, c, "json")
        },
        ajaxSetup: function(a, b) {
            return b ? _b(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), _b(a, b), a
        },
        ajaxSettings: {
            url: Vb,
            isLocal: Jb.test(Wb[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": Xb
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: Zb(Tb),
        ajaxTransport: Zb(Ub),
        ajax: function(a, c) {
            function w(a, c, l, m) {
                if (s === 2) return;
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c,
                    x = l ? bc(d, v, l) : b,
                    y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag")) f.etag[k] = z
                    }
                    if (a === 304) w = "notmodified", o = !0;
                    else try {
                        r = cc(d, x), w = "success", o = !0
                    } catch (A) {
                        w = "parsererror", u = A
                    }
                } else {
                    u = w;
                    if (!w || a) w = "error", a < 0 && (a = 0)
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [r, w, v]) : h.rejectWith(e, [v, w, u]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [v, d, o ? r : u]), i.fireWith(e, [v, w]), t && (g.trigger("ajaxComplete", [v, d]), --f.active || f.event.trigger("ajaxStop"))
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c),
                e = d.context || d,
                g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event,
                h = f.Deferred(),
                i = f.Callbacks("once memory"),
                j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0,
                t, u, v = {
                    readyState: 0,
                    setRequestHeader: function(a, b) {
                        if (!s) {
                            var c = a.toLowerCase();
                            a = m[c] = m[c] || a, l[a] = b
                        }
                        return this
                    },
                    getAllResponseHeaders: function() {
                        return s === 2 ? n : null
                    },
                    getResponseHeader: function(a) {
                        var c;
                        if (s === 2) {
                            if (!o) {
                                o = {};
                                while (c = Hb.exec(n)) o[c[1].toLowerCase()] = c[2]
                            }
                            c = o[a.toLowerCase()]
                        }
                        return c === b ? null : c
                    },
                    overrideMimeType: function(a) {
                        return s || (d.mimeType = a), this
                    },
                    abort: function(a) {
                        return a = a || "abort", p && p.abort(a), w(0, a), this
                    }
                };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
                if (a) {
                    var b;
                    if (s < 2)
                        for (b in a) j[b] = [j[b], a[b]];
                    else b = a[v.status], v.then(b, b)
                }
                return this
            }, d.url = ((a || d.url) + "").replace(Gb, "").replace(Lb, Wb[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(Pb), d.crossDomain == null && (r = Rb.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == Wb[1] && r[2] == Wb[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (Wb[3] || (Wb[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), $b(Tb, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !Kb.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (Mb.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(),
                        y = d.url.replace(Qb, "$1_=" + x);
                    d.url = y + (y === d.url ? (Mb.test(d.url) ? "&" : "?") + "_=" + x : "")
                }
            }(d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + Xb + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (!d.beforeSend || d.beforeSend.call(e, v, d) !== !1 && s !== 2) {
                for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](d[u]);
                p = $b(Ub, d, c, v);
                if (!p) w(-1, "No Transport");
                else {
                    v.readyState = 1, t && g.trigger("ajaxSend", [v, d]), d.async && d.timeout > 0 && (q = setTimeout(function() {
                        v.abort("timeout")
                    }, d.timeout));
                    try {
                        s = 1, p.send(l, w)
                    } catch (z) {
                        if (!(s < 2)) throw z;
                        w(-1, z)
                    }
                }
                return v
            }
            return v.abort(), !1
        },
        param: function(a, c) {
            var d = [],
                e = function(a, b) {
                    b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
                };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
                e(this.name, this.value)
            });
            else
                for (var g in a) ac(g, a[g], c, e);
            return d.join("&").replace(Db, "+")
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var dc = f.now(),
        ec = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return f.expando + "_" + dc++
        }
    }), f.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ec.test(b.url) || e && ec.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
                i = a[h],
                j = b.url,
                k = b.data,
                l = "$1" + h + "$2";
            return b.jsonp !== !1 && (j = j.replace(ec, l), b.url === j && (e && (k = k.replace(ec, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
                g = [a]
            }, d.always(function() {
                a[h] = i, g && f.isFunction(i) && a[h](g[0])
            }), b.converters["script json"] = function() {
                return g || f.error(h + " was not called"), g[0]
            }, b.dataTypes[0] = "json", "script"
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return f.globalEval(a), a
            }
        }
    }), f.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), f.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success")
                    }, e.insertBefore(d, e.firstChild)
                },
                abort: function() {
                    d && d.onload(0, 1)
                }
            }
        }
    });
    var fc = a.ActiveXObject ? function() {
            for (var a in hc) hc[a](0, 1)
        } : !1,
        gc = 0,
        hc;
    f.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && ic() || jc()
    } : ic,
    function(a) {
        f.extend(f.support, {
            ajax: !! a,
            cors: !! a && "withCredentials" in a
        })
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function(e, g) {
                    var h = c.xhr(),
                        i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields)
                        for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j])
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null), d = function(a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, fc && delete hc[i]);
                                if (e) h.readyState !== 4 && h.abort();
                                else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText
                                    } catch (o) {
                                        k = ""
                                    }!j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204)
                                }
                            }
                        } catch (p) {
                            e || g(-1, p)
                        }
                        m && g(j, k, m, l)
                    }, !c.async || h.readyState === 4 ? d() : (i = ++gc, fc && (hc || (hc = {}, f(a).unload(fc)), hc[i] = d), h.onreadystatechange = d)
                },
                abort: function() {
                    d && d(0, 1)
                }
            }
        }
    });
    var kc = {}, lc, mc, nc = /^(?:toggle|show|hide)$/,
        oc = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,
        pc, qc = [
            ["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"],
            ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"],
            ["opacity"]
        ],
        rc;
    f.fn.extend({
        show: function(a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(uc("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", vc(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || ""
                }
            }
            return this
        },
        hide: function(a, b, c) {
            if (a || a === 0) return this.animate(uc("hide", 3), a, b, c);
            var d, e, g = 0,
                h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this
        },
        _toggle: f.fn.toggle,
        toggle: function(a, b, c) {
            var d = typeof a == "boolean";
            return f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]()
            }) : this.animate(uc("toggle", 3), a, b, c), this
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e),
                    c = this.nodeType === 1,
                    d = c && f(this).is(":hidden"),
                    g, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [this.style.overflow, this.style.overflowX, this.style.overflowY], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || vc(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1))
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], nc.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = oc.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0
            }
            var e = f.speed(b, c, d);
            return f.isEmptyObject(a) ? this.each(e.complete, [!1]) : (a = f.extend({}, a), e.queue === !1 ? this.each(g) : this.queue(e.queue, g))
        },
        stop: function(a, c, d) {
            return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d)
                }
                var b, c = !1,
                    e = f.timers,
                    g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null)
                    for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b);
                else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--;) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a)
            })
        }
    }), f.each({
        slideDown: uc("show", 1),
        slideUp: uc("hide", 1),
        slideToggle: uc("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        f.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }), f.extend({
        speed: function(a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function(a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this)
            }, d
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {}
        }
    }), f.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this)
        },
        cur: function() {
            if (this.elem[this.prop] == null || !! this.elem.style && this.elem.style[this.prop] != null) {
                var a, b = f.css(this.elem, this.prop);
                return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a
            }
            return this.elem[this.prop]
        },
        custom: function(a, c, d) {
            function h(a) {
                return e.step(a)
            }
            var e = this,
                g = f.fx;
            this.startTime = rc || sc(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start)
            }, h() && f.timers.push(h) && !pc && (pc = setInterval(g.tick, g.interval))
        },
        show: function() {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show()
        },
        hide: function() {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0)
        },
        step: function(a) {
            var b, c, d, e = rc || sc(),
                g = !0,
                h = this.elem,
                i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each(["", "X", "Y"], function(a, b) {
                        h.style["overflow" + b] = i.overflow[a]
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show)
                        for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h))
                }
                return !1
            }
            return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0
        }
    }, f.extend(f.fx, {
        tick: function() {
            var a, b = f.timers,
                c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop()
        },
        interval: 13,
        stop: function() {
            clearInterval(pc), pc = null
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                f.style(a.elem, "opacity", a.now)
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now
            }
        }
    }), f.each(["width", "height"], function(a, b) {
        f.fx.step[b] = function(a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit)
        }
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
        return f.grep(f.timers, function(b) {
            return a === b.elem
        }).length
    });
    var wc = /^t(?:able|d|h)$/i,
        xc = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
        var b = this[0],
            c;
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect()
        } catch (d) {}
        var e = b.ownerDocument,
            g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = e.body,
            i = yc(e),
            j = g.clientTop || h.clientTop || 0,
            k = g.clientLeft || h.clientLeft || 0,
            l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop,
            m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft,
            n = c.top + l - j,
            o = c.left + m - k;
        return {
            top: n,
            left: o
        }
    } : f.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b)
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent,
            e = b,
            g = b.ownerDocument,
            h = g.documentElement,
            i = g.body,
            j = g.defaultView,
            k = j ? j.getComputedStyle(b, null) : b.currentStyle,
            l = b.offsetTop,
            m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !wc.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        return f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft)), {
            top: l,
            left: m
        }
    }, f.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop,
                c = a.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            }
        },
        setOffset: function(a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a),
                g = e.offset(),
                h = f.css(a, "top"),
                i = f.css(a, "left"),
                j = (d === "absolute" || d === "fixed") && f.inArray("auto", [h, i]) > -1,
                k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k)
        }
    }, f.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0],
                b = this.offsetParent(),
                c = this.offset(),
                d = xc.test(b[0].nodeName) ? {
                    top: 0,
                    left: 0
                } : b.offset();
            return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            }
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && !xc.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a
            })
        }
    }), f.each(["Left", "Top"], function(a, c) {
        var d = "scroll" + c;
        f.fn[d] = function(c) {
            var e, g;
            return c === b ? (e = this[0], e ? (g = yc(e), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]) : null) : this.each(function() {
                g = yc(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c
            })
        }
    }), f.each(["Height", "Width"], function(a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null
        }, f.fn["outer" + c] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null
        }, f.fn[d] = function(a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function(b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()))
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c],
                    h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d),
                    j = parseFloat(i);
                return f.isNumeric(j) ? j : i
            }
            return this.css(d, typeof a == "string" ? a : a + "px")
        }
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return f
    })
}(window),
function() {
    function a(b, c, d) {
        if (b === c) return b !== 0 || 1 / b == 1 / c;
        if (b == null || c == null) return b === c;
        b._chain && (b = b._wrapped), c._chain && (c = c._wrapped);
        if (v.isFunction(b.isEqual)) return b.isEqual(c);
        if (v.isFunction(c.isEqual)) return c.isEqual(b);
        var e = i.call(b);
        if (e != i.call(c)) return !1;
        switch (e) {
            case "[object String]":
                return String(b) == String(c);
            case "[object Number]":
                return b = +b, c = +c, b != b ? c != c : b == 0 ? 1 / b == 1 / c : b == c;
            case "[object Date]":
            case "[object Boolean]":
                return +b == +c;
            case "[object RegExp]":
                return b.source == c.source && b.global == c.global && b.multiline == c.multiline && b.ignoreCase == c.ignoreCase
        }
        if (typeof b != "object" || typeof c != "object") return !1;
        for (var f = d.length; f--;)
            if (d[f] == b) return !0;
        d.push(b);
        var f = 0,
            g = !0;
        if (e == "[object Array]") {
            if (f = b.length, g = f == c.length)
                for (; f--;)
                    if (!(g = f in b == f in c && a(b[f], c[f], d))) break
        } else {
            if ("constructor" in b != "constructor" in c || b.constructor != c.constructor) return !1;
            for (var h in b)
                if (j.call(b, h) && (f++, !(g = j.call(c, h) && a(b[h], c[h], d)))) break;
            if (g) {
                for (h in c)
                    if (j.call(c, h) && !(f--)) break;
                g = !f
            }
        }
        return d.pop(), g
    }
    var b = this,
        c = b._,
        d = {}, e = Array.prototype,
        f = Object.prototype,
        g = e.slice,
        h = e.unshift,
        i = f.toString,
        j = f.hasOwnProperty,
        k = e.forEach,
        l = e.map,
        m = e.reduce,
        n = e.reduceRight,
        o = e.filter,
        p = e.every,
        q = e.some,
        r = e.indexOf,
        s = e.lastIndexOf,
        f = Array.isArray,
        t = Object.keys,
        u = Function.prototype.bind,
        v = function(a) {
            return new A(a)
        };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = v), exports._ = v) : typeof define == "function" && define.amd ? define("underscore", [], function() {
        return v
    }) : b._ = v, v.VERSION = "1.2.2";
    var w = v.each = v.forEach = function(a, b, c) {
        if (a != null)
            if (k && a.forEach === k) a.forEach(b, c);
            else
        if (a.length === +a.length) {
            for (var e = 0, f = a.length; e < f; e++)
                if (e in a && b.call(c, a[e], e, a) === d) break
        } else
            for (e in a)
                if (j.call(a, e) && b.call(c, a[e], e, a) === d) break
    };
    v.map = function(a, b, c) {
        var d = [];
        return a == null ? d : l && a.map === l ? a.map(b, c) : (w(a, function(a, e, f) {
            d[d.length] = b.call(c, a, e, f)
        }), d)
    }, v.reduce = v.foldl = v.inject = function(a, b, c, d) {
        var e = c !== void 0;
        a == null && (a = []);
        if (m && a.reduce === m) return d && (b = v.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        w(a, function(a, f, g) {
            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0)
        });
        if (!e) throw new TypeError("Reduce of empty array with no initial value");
        return c
    }, v.reduceRight = v.foldr = function(a, b, c, d) {
        return a == null && (a = []), n && a.reduceRight === n ? (d && (b = v.bind(b, d)), c !== void 0 ? a.reduceRight(b, c) : a.reduceRight(b)) : (a = (v.isArray(a) ? a.slice() : v.toArray(a)).reverse(), v.reduce(a, b, c, d))
    }, v.find = v.detect = function(a, b, c) {
        var d;
        return x(a, function(a, e, f) {
            if (b.call(c, a, e, f)) return d = a, !0
        }), d
    }, v.filter = v.select = function(a, b, c) {
        var d = [];
        return a == null ? d : o && a.filter === o ? a.filter(b, c) : (w(a, function(a, e, f) {
            b.call(c, a, e, f) && (d[d.length] = a)
        }), d)
    }, v.reject = function(a, b, c) {
        var d = [];
        return a == null ? d : (w(a, function(a, e, f) {
            b.call(c, a, e, f) || (d[d.length] = a)
        }), d)
    }, v.every = v.all = function(a, b, c) {
        var e = !0;
        return a == null ? e : p && a.every === p ? a.every(b, c) : (w(a, function(a, f, g) {
            if (!(e = e && b.call(c, a, f, g))) return d
        }), e)
    };
    var x = v.some = v.any = function(a, b, c) {
        var b = b || v.identity,
            e = !1;
        return a == null ? e : q && a.some === q ? a.some(b, c) : (w(a, function(a, f, g) {
            if (e || (e = b.call(c, a, f, g))) return d
        }), !! e)
    };
    v.include = v.contains = function(a, b) {
        var c = !1;
        return a == null ? c : r && a.indexOf === r ? a.indexOf(b) != -1 : c = x(a, function(a) {
            return a === b
        })
    }, v.invoke = function(a, b) {
        var c = g.call(arguments, 2);
        return v.map(a, function(a) {
            return (b.call ? b || a : a[b]).apply(a, c)
        })
    }, v.pluck = function(a, b) {
        return v.map(a, function(a) {
            return a[b]
        })
    }, v.max = function(a, b, c) {
        if (!b && v.isArray(a)) return Math.max.apply(Math, a);
        if (!b && v.isEmpty(a)) return -Infinity;
        var d = {
            computed: -Infinity
        };
        return w(a, function(a, e, f) {
            e = b ? b.call(c, a, e, f) : a, e >= d.computed && (d = {
                value: a,
                computed: e
            })
        }), d.value
    }, v.min = function(a, b, c) {
        if (!b && v.isArray(a)) return Math.min.apply(Math, a);
        if (!b && v.isEmpty(a)) return Infinity;
        var d = {
            computed: Infinity
        };
        return w(a, function(a, e, f) {
            e = b ? b.call(c, a, e, f) : a, e < d.computed && (d = {
                value: a,
                computed: e
            })
        }), d.value
    }, v.shuffle = function(a) {
        var b = [],
            c;
        return w(a, function(a, d) {
            d == 0 ? b[0] = a : (c = Math.floor(Math.random() * (d + 1)), b[d] = b[c], b[c] = a)
        }), b
    }, v.sortBy = function(a, b, c) {
        return v.pluck(v.map(a, function(a, d, e) {
            return {
                value: a,
                criteria: b.call(c, a, d, e)
            }
        }).sort(function(a, b) {
            var c = a.criteria,
                d = b.criteria;
            return c < d ? -1 : c > d ? 1 : 0
        }), "value")
    }, v.groupBy = function(a, b) {
        var c = {}, d = v.isFunction(b) ? b : function(a) {
                return a[b]
            };
        return w(a, function(a, b) {
            var e = d(a, b);
            (c[e] || (c[e] = [])).push(a)
        }), c
    }, v.sortedIndex = function(a, b, c) {
        c || (c = v.identity);
        for (var d = 0, e = a.length; d < e;) {
            var f = d + e >> 1;
            c(a[f]) < c(b) ? d = f + 1 : e = f
        }
        return d
    }, v.toArray = function(a) {
        return a ? a.toArray ? a.toArray() : v.isArray(a) ? g.call(a) : v.isArguments(a) ? g.call(a) : v.values(a) : []
    }, v.size = function(a) {
        return v.toArray(a).length
    }, v.first = v.head = function(a, b, c) {
        return b != null && !c ? g.call(a, 0, b) : a[0]
    }, v.initial = function(a, b, c) {
        return g.call(a, 0, a.length - (b == null || c ? 1 : b))
    }, v.last = function(a, b, c) {
        return b != null && !c ? g.call(a, Math.max(a.length - b, 0)) : a[a.length - 1]
    }, v.rest = v.tail = function(a, b, c) {
        return g.call(a, b == null || c ? 1 : b)
    }, v.compact = function(a) {
        return v.filter(a, function(a) {
            return !!a
        })
    }, v.flatten = function(a, b) {
        return v.reduce(a, function(a, c) {
            return v.isArray(c) ? a.concat(b ? c : v.flatten(c)) : (a[a.length] = c, a)
        }, [])
    }, v.without = function(a) {
        return v.difference(a, g.call(arguments, 1))
    }, v.uniq = v.unique = function(a, b, c) {
        var c = c ? v.map(a, c) : a,
            d = [];
        return v.reduce(c, function(c, e, f) {
            if (0 == f || (b === !0 ? v.last(c) != e : !v.include(c, e))) c[c.length] = e, d[d.length] = a[f];
            return c
        }, []), d
    }, v.union = function() {
        return v.uniq(v.flatten(arguments, !0))
    }, v.intersection = v.intersect = function(a) {
        var b = g.call(arguments, 1);
        return v.filter(v.uniq(a), function(a) {
            return v.every(b, function(b) {
                return v.indexOf(b, a) >= 0
            })
        })
    }, v.difference = function(a, b) {
        return v.filter(a, function(a) {
            return !v.include(b, a)
        })
    }, v.zip = function() {
        for (var a = g.call(arguments), b = v.max(v.pluck(a, "length")), c = Array(b), d = 0; d < b; d++) c[d] = v.pluck(a, "" + d);
        return c
    }, v.indexOf = function(a, b, c) {
        if (a == null) return -1;
        var d;
        if (c) return c = v.sortedIndex(a, b), a[c] === b ? c : -1;
        if (r && a.indexOf === r) return a.indexOf(b);
        for (c = 0, d = a.length; c < d; c++)
            if (a[c] === b) return c;
        return -1
    }, v.lastIndexOf = function(a, b) {
        if (a == null) return -1;
        if (s && a.lastIndexOf === s) return a.lastIndexOf(b);
        for (var c = a.length; c--;)
            if (a[c] === b) return c;
        return -1
    }, v.range = function(a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0);
        for (var c = arguments[2] || 1, d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = Array(d); e < d;) f[e++] = a, a += c;
        return f
    };
    var y = function() {};
    v.bind = function(a, b) {
        var c, d;
        if (a.bind === u && u) return u.apply(a, g.call(arguments, 1));
        if (!v.isFunction(a)) throw new TypeError;
        return d = g.call(arguments, 2), c = function() {
            if (this instanceof c) {
                y.prototype = a.prototype;
                var e = new y,
                    f = a.apply(e, d.concat(g.call(arguments)));
                return Object(f) === f ? f : e
            }
            return a.apply(b, d.concat(g.call(arguments)))
        }
    }, v.bindAll = function(a) {
        var b = g.call(arguments, 1);
        return b.length == 0 && (b = v.functions(a)), w(b, function(b) {
            a[b] = v.bind(a[b], a)
        }), a
    }, v.memoize = function(a, b) {
        var c = {};
        return b || (b = v.identity),
        function() {
            var d = b.apply(this, arguments);
            return j.call(c, d) ? c[d] : c[d] = a.apply(this, arguments)
        }
    }, v.delay = function(a, b) {
        var c = g.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(a, c)
        }, b)
    }, v.defer = function(a) {
        return v.delay.apply(v, [a, 1].concat(g.call(arguments, 1)))
    }, v.throttle = function(a, b) {
        var c, d, e, f, g, h = v.debounce(function() {
                g = f = !1
            }, b);
        return function() {
            c = this, d = arguments;
            var i;
            e || (e = setTimeout(function() {
                e = null, g && a.apply(c, d), h()
            }, b)), f ? g = !0 : a.apply(c, d), h(), f = !0
        }
    }, v.debounce = function(a, b) {
        var c;
        return function() {
            var d = this,
                e = arguments;
            clearTimeout(c), c = setTimeout(function() {
                c = null, a.apply(d, e)
            }, b)
        }
    }, v.once = function(a) {
        var b = !1,
            c;
        return function() {
            return b ? c : (b = !0, c = a.apply(this, arguments))
        }
    }, v.wrap = function(a, b) {
        return function() {
            var c = [a].concat(g.call(arguments));
            return b.apply(this, c)
        }
    }, v.compose = function() {
        var a = g.call(arguments);
        return function() {
            for (var b = g.call(arguments), c = a.length - 1; c >= 0; c--) b = [a[c].apply(this, b)];
            return b[0]
        }
    }, v.after = function(a, b) {
        return a <= 0 ? b() : function() {
            if (--a < 1) return b.apply(this, arguments)
        }
    }, v.keys = t || function(a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var b = [],
            c;
        for (c in a) j.call(a, c) && (b[b.length] = c);
        return b
    }, v.values = function(a) {
        return v.map(a, v.identity)
    }, v.functions = v.methods = function(a) {
        var b = [],
            c;
        for (c in a) v.isFunction(a[c]) && b.push(c);
        return b.sort()
    }, v.extend = function(a) {
        return w(g.call(arguments, 1), function(b) {
            for (var c in b) b[c] !== void 0 && (a[c] = b[c])
        }), a
    }, v.defaults = function(a) {
        return w(g.call(arguments, 1), function(b) {
            for (var c in b) a[c] == null && (a[c] = b[c])
        }), a
    }, v.clone = function(a) {
        return v.isObject(a) ? v.isArray(a) ? a.slice() : v.extend({}, a) : a
    }, v.tap = function(a, b) {
        return b(a), a
    }, v.isEqual = function(b, c) {
        return a(b, c, [])
    }, v.isEmpty = function(a) {
        if (v.isArray(a) || v.isString(a)) return a.length === 0;
        for (var b in a)
            if (j.call(a, b)) return !1;
        return !0
    }, v.isElement = function(a) {
        return !!a && a.nodeType == 1
    }, v.isArray = f || function(a) {
        return i.call(a) == "[object Array]"
    }, v.isObject = function(a) {
        return a === Object(a)
    }, v.isArguments = i.call(arguments) == "[object Arguments]" ? function(a) {
        return i.call(a) == "[object Arguments]"
    } : function(a) {
        return !!a && !! j.call(a, "callee")
    }, v.isFunction = function(a) {
        return i.call(a) == "[object Function]"
    }, v.isString = function(a) {
        return i.call(a) == "[object String]"
    }, v.isNumber = function(a) {
        return i.call(a) == "[object Number]"
    }, v.isNaN = function(a) {
        return a !== a
    }, v.isBoolean = function(a) {
        return a === !0 || a === !1 || i.call(a) == "[object Boolean]"
    }, v.isDate = function(a) {
        return i.call(a) == "[object Date]"
    }, v.isRegExp = function(a) {
        return i.call(a) == "[object RegExp]"
    }, v.isNull = function(a) {
        return a === null
    }, v.isUndefined = function(a) {
        return a === void 0
    }, v.noConflict = function() {
        return b._ = c, this
    }, v.identity = function(a) {
        return a
    }, v.times = function(a, b, c) {
        for (var d = 0; d < a; d++) b.call(c, d)
    }, v.escape = function(a) {
        return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
    }, v.mixin = function(a) {
        w(v.functions(a), function(b) {
            C(b, v[b] = a[b])
        })
    };
    var z = 0;
    v.uniqueId = function(a) {
        var b = z++;
        return a ? a + b : b
    }, v.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    }, v.template = function(a, b) {
        var c = v.templateSettings,
            c = "var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('" + a.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(c.escape, function(a, b) {
                return "',_.escape(" + b.replace(/\\'/g, "'") + "),'"
            }).replace(c.interpolate, function(a, b) {
                return "'," + b.replace(/\\'/g, "'") + ",'"
            }).replace(c.evaluate || null, function(a, b) {
                return "');" + b.replace(/\\'/g, "'").replace(/[\r\n\t]/g, " ") + ";__p.push('"
            }).replace(/\r/g, "\\r").replace(/\n/g, "\\n").replace(/\t/g, "\\t") + "');}return __p.join('');",
            d = new Function("obj", "_", c);
        return b ? d(b, v) : function(a) {
            return d(a, v)
        }
    };
    var A = function(a) {
        this._wrapped = a
    };
    v.prototype = A.prototype;
    var B = function(a, b) {
        return b ? v(a).chain() : a
    }, C = function(a, b) {
            A.prototype[a] = function() {
                var a = g.call(arguments);
                return h.call(a, this._wrapped), B(b.apply(v, a), this._chain)
            }
        };
    v.mixin(v), w("pop,push,reverse,shift,sort,splice,unshift".split(","), function(a) {
        var b = e[a];
        A.prototype[a] = function() {
            return b.apply(this._wrapped, arguments), B(this._wrapped, this._chain)
        }
    }), w(["concat", "join", "slice"], function(a) {
        var b = e[a];
        A.prototype[a] = function() {
            return B(b.apply(this._wrapped, arguments), this._chain)
        }
    }), A.prototype.chain = function() {
        return this._chain = !0, this
    }, A.prototype.value = function() {
        return this._wrapped
    }
}.call(this),
function(a, b) {
    typeof exports != "undefined" ? b(a, exports, require("underscore")) : typeof define == "function" && define.amd ? define("backbone", ["underscore", "jquery", "exports"], function(c, d, e) {
        b(a, e, c, d)
    }) : a.Backbone = b(a, {}, a._, a.jQuery || a.Zepto || a.ender)
}(this, function(a, b, c, d) {
    var e = a.Backbone,
        f = Array.prototype.slice;
    b.VERSION = "0.5.3", b.noConflict = function() {
        return a.Backbone = e, b
    }, b.emulateHTTP = !1, b.emulateJSON = !1, b.Events = {
        bind: function(a, b, c) {
            var d = this._callbacks || (this._callbacks = {}),
                e = d[a] || (d[a] = {}),
                f = e.tail || (e.tail = e.next = {});
            return f.callback = b, f.context = c, e.tail = f.next = {}, this
        },
        unbind: function(a, b) {
            var c, d, e;
            if (!a) this._callbacks = null;
            else if (c = this._callbacks)
                if (!b) c[a] = {};
                else
            if (d = c[a])
                while ((e = d) && (d = d.next)) {
                    if (d.callback !== b) continue;
                    e.next = d.next, d.context = d.callback = null;
                    break
                }
            return this
        },
        trigger: function(a) {
            var b, c, d, e, g, h = ["all", a];
            if (!(c = this._callbacks)) return this;
            while (g = h.pop()) {
                if (!(b = c[g])) continue;
                e = g == "all" ? arguments : f.call(arguments, 1);
                while (b = b.next)(d = b.callback) && d.apply(b.context || this, e)
            }
            return this
        }
    }, b.Model = function(a, b) {
        var d;
        a || (a = {}), b && b.parse && (a = this.parse(a));
        if (d = t(this, "defaults")) a = c.extend({}, d, a);
        this.attributes = {}, this._escapedAttributes = {}, this.cid = c.uniqueId("c"), this.set(a, {
            silent: !0
        }), this._changed = !1, this._previousAttributes = c.clone(this.attributes), b && b.collection && (this.collection = b.collection), this.initialize(a, b)
    }, c.extend(b.Model.prototype, b.Events, {
        _changed: !1,
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return c.clone(this.attributes)
        },
        get: function(a) {
            return this.attributes[a]
        },
        escape: function(a) {
            var b;
            if (b = this._escapedAttributes[a]) return b;
            var d = this.attributes[a];
            return this._escapedAttributes[a] = c.escape(d == null ? "" : "" + d)
        },
        has: function(a) {
            return this.attributes[a] != null
        },
        set: function(a, b, d) {
            var e;
            c.isObject(a) || a == null ? (e = a, d = b) : (e = {}, e[a] = b), d || (d = {});
            if (!e) return this;
            e.attributes && (e = e.attributes);
            if (d.unset)
                for (var f in e) e[f] = void 0;
            var g = this.attributes,
                h = this._escapedAttributes;
            if (!d.silent && this.validate && !this._performValidation(e, d)) return !1;
            this.idAttribute in e && (this.id = e[this.idAttribute]);
            var i = this._changing;
            this._changing = !0;
            for (var f in e) {
                var j = e[f];
                if (!c.isEqual(g[f], j) || d.unset && f in g) d.unset ? delete g[f] : g[f] = j, delete h[f], this._changed = !0, d.silent || this.trigger("change:" + f, this, j, d)
            }
            return i || (!d.silent && this._changed && this.change(d), this._changing = !1), this
        },
        unset: function(a, b) {
            return (b || (b = {})).unset = !0, this.set(a, null, b)
        },
        clear: function(a) {
            return (a || (a = {})).unset = !0, this.set(c.clone(this.attributes), a)
        },
        fetch: function(a) {
            a || (a = {});
            var c = this,
                d = a.success;
            return a.success = function(b, e, f) {
                if (!c.set(c.parse(b, f), a)) return !1;
                d && d(c, b)
            }, a.error = v(a.error, c, a), (this.sync || b.sync).call(this, "read", this, a)
        },
        save: function(a, c) {
            c || (c = {});
            if (a && !this.set(a, c)) return !1;
            var d = this,
                e = c.success;
            c.success = function(a, b, f) {
                if (!d.set(d.parse(a, f), c)) return !1;
                e && e(d, a, f)
            }, c.error = v(c.error, d, c);
            var f = this.isNew() ? "create" : "update";
            return (this.sync || b.sync).call(this, f, this, c)
        },
        destroy: function(a) {
            a || (a = {});
            if (this.isNew()) return this.trigger("destroy", this, this.collection, a);
            var c = this,
                d = a.success;
            return a.success = function(b) {
                c.trigger("destroy", c, c.collection, a), d && d(c, b)
            }, a.error = v(a.error, c, a), (this.sync || b.sync).call(this, "delete", this, a)
        },
        url: function() {
            var a = t(this.collection, "url") || this.urlRoot || u();
            return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id)
        },
        parse: function(a, b) {
            return a
        },
        clone: function() {
            return new this.constructor(this)
        },
        isNew: function() {
            return this.id == null
        },
        change: function(a) {
            this.trigger("change", this, a), this._previousAttributes = c.clone(this.attributes), this._changed = !1
        },
        hasChanged: function(a) {
            return a ? this._previousAttributes[a] != this.attributes[a] : this._changed
        },
        changedAttributes: function(a) {
            if (!this._changed) return !1;
            a || (a = this.attributes);
            var b = !1,
                d = this._previousAttributes;
            for (var e in a) {
                if (c.isEqual(d[e], a[e])) continue;
                (b || (b = {}))[e] = a[e]
            }
            for (var e in d) e in a || ((b || (b = {}))[e] = void 0);
            return b
        },
        previous: function(a) {
            return !a || !this._previousAttributes ? null : this._previousAttributes[a]
        },
        previousAttributes: function() {
            return c.clone(this._previousAttributes)
        },
        _performValidation: function(a, b) {
            var c = this.validate(a, b);
            return c ? (b.error ? b.error(this, c, b) : this.trigger("error", this, c, b), !1) : !0
        }
    }), b.Collection = function(a, b) {
        b || (b = {}), b.comparator && (this.comparator = b.comparator), c.bindAll(this, "_onModelEvent", "_removeReference"), this._reset(), a && this.reset(a, {
            silent: !0
        }), this.initialize.apply(this, arguments)
    }, c.extend(b.Collection.prototype, b.Events, {
        model: b.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(a) {
                return a.toJSON()
            })
        },
        add: function(a, b) {
            if (c.isArray(a))
                for (var d = 0, e = a.length; d < e; d++) b && b.at == +b.at && d && (b.at += 1), this._add(a[d], b);
            else this._add(a, b);
            return this
        },
        remove: function(a, b) {
            if (c.isArray(a))
                for (var d = 0, e = a.length; d < e; d++) this._remove(a[d], b);
            else this._remove(a, b);
            return this
        },
        get: function(a) {
            return a == null ? null : this._byId[a.id != null ? a.id : a]
        },
        getByCid: function(a) {
            return a && this._byCid[a.cid || a]
        },
        at: function(a) {
            return this.models[a]
        },
        sort: function(a) {
            a || (a = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            return this.models = this.sortBy(this.comparator), a.silent || this.trigger("reset", this, a), this
        },
        pluck: function(a) {
            return c.map(this.models, function(b) {
                return b.get(a)
            })
        },
        reset: function(a, b) {
            return a || (a = []), b || (b = {}), this.each(this._removeReference), this._reset(), this.add(a, {
                silent: !0,
                parse: b.parse
            }), b.silent || this.trigger("reset", this, b), this
        },
        fetch: function(a) {
            a || (a = {}), a.parse === undefined && (a.parse = !0);
            var c = this,
                d = a.success;
            return a.success = function(b, e, f) {
                c[a.add ? "add" : "reset"](c.parse(b, f), a), d && d(c, b)
            }, a.error = v(a.error, c, a), (this.sync || b.sync).call(this, "read", this, a)
        },
        create: function(a, b) {
            var c = this;
            b || (b = {}), a = this._prepareModel(a, b);
            if (!a) return !1;
            var d = b.success;
            return b.success = function(a, e, f) {
                c.add(a, b), d && d(a, e, f)
            }, a.save(null, b), a
        },
        parse: function(a, b) {
            return a
        },
        chain: function() {
            return c(this.models).chain()
        },
        _reset: function(a) {
            this.length = 0, this.models = [], this._byId = {}, this._byCid = {}
        },
        _prepareModel: function(a, c) {
            if (a instanceof b.Model) a.collection || (a.collection = this);
            else {
                var d = a;
                a = new this.model(d, {
                    collection: this,
                    parse: c.parse
                }), a.validate && !a._performValidation(a.attributes, c) && (a = !1)
            }
            return a
        },
        _add: function(a, b) {
            b || (b = {}), a = this._prepareModel(a, b);
            if (!a) return !1;
            var c = this.getByCid(a);
            if (c) throw new Error(["Can't add the same model to a set twice", c.id]);
            this._byId[a.id] = a, this._byCid[a.cid] = a;
            var d = b.at != null ? b.at : this.comparator ? this.sortedIndex(a, this.comparator) : this.length;
            return this.models.splice(d, 0, a), a.bind("all", this._onModelEvent), this.length++, b.index = d, b.silent || a.trigger("add", a, this, b), a
        },
        _remove: function(a, b) {
            b || (b = {}), a = this.getByCid(a) || this.get(a);
            if (!a) return null;
            delete this._byId[a.id], delete this._byCid[a.cid];
            var c = this.indexOf(a);
            return this.models.splice(c, 1), this.length--, b.index = c, b.silent || a.trigger("remove", a, this, b), this._removeReference(a), a
        },
        _removeReference: function(a) {
            this == a.collection && delete a.collection, a.unbind("all", this._onModelEvent)
        },
        _onModelEvent: function(a, b, c, d) {
            if ((a == "add" || a == "remove") && c != this) return;
            a == "destroy" && this._remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments)
        }
    });
    var g = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "rest", "last", "without", "indexOf", "lastIndexOf", "isEmpty", "groupBy"];
    c.each(g, function(a) {
        b.Collection.prototype[a] = function() {
            return c[a].apply(c, [this.models].concat(c.toArray(arguments)))
        }
    }), b.Router = function(a) {
        a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments)
    };
    var h = /:\w+/g,
        i = /\*\w+/g,
        j = /[-[\]{}()+?.,\\^$|#\s]/g;
    c.extend(b.Router.prototype, b.Events, {
        initialize: function() {},
        route: function(a, d, e) {
            b.history || (b.history = new b.History), c.isRegExp(a) || (a = this._routeToRegExp(a)), b.history.route(a, c.bind(function(b) {
                var c = this._extractParameters(a, b);
                e && e.apply(this, c), this.trigger.apply(this, ["route:" + d].concat(c))
            }, this))
        },
        navigate: function(a, c) {
            b.history.navigate(a, c)
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            var a = [];
            for (var b in this.routes) a.unshift([b, this.routes[b]]);
            for (var c = 0, d = a.length; c < d; c++) this.route(a[c][0], a[c][1], this[a[c][1]])
        },
        _routeToRegExp: function(a) {
            return a = a.replace(j, "\\$&").replace(h, "([^/]*)").replace(i, "(.*?)"), new RegExp("^" + a + "$")
        },
        _extractParameters: function(a, b) {
            return a.exec(b).slice(1)
        }
    }), b.History = function() {
        this.handlers = [], c.bindAll(this, "checkUrl")
    };
    var k = /^#/,
        l = /msie [\w.]+/,
        m = !1;
    c.extend(b.History.prototype, {
        interval: 50,
        getFragment: function(a, b) {
            if (a == null)
                if (this._hasPushState || b) {
                    a = window.location.pathname;
                    var c = window.location.search;
                    c && (a += c)
                } else a = window.location.hash;
            return a = decodeURIComponent(a.replace(k, "")), a.indexOf(this.options.root) || (a = a.substr(this.options.root.length)), a
        },
        start: function(a) {
            if (m) throw new Error("Backbone.history has already been started");
            this.options = c.extend({}, {
                root: "/"
            }, this.options, a), this._wantsPushState = !! this.options.pushState, this._hasPushState = !! (this.options.pushState && window.history && window.history.pushState);
            var b = this.getFragment(),
                e = document.documentMode,
                f = l.exec(navigator.userAgent.toLowerCase()) && (!e || e <= 7);
            f && (this.iframe = d('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(b)), this._hasPushState ? d(window).bind("popstate", this.checkUrl) : "onhashchange" in window && !f ? d(window).bind("hashchange", this.checkUrl) : setInterval(this.checkUrl, this.interval), this.fragment = b, m = !0;
            var g = window.location,
                h = g.pathname == this.options.root;
            if (this._wantsPushState && !this._hasPushState && !h) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
            this._wantsPushState && this._hasPushState && h && g.hash && (this.fragment = g.hash.replace(k, ""), window.history.replaceState({}, document.title, g.protocol + "//" + g.host + this.options.root + this.fragment));
            if (!this.options.silent) return this.loadUrl()
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            })
        },
        checkUrl: function(a) {
            var b = this.getFragment();
            b == this.fragment && this.iframe && (b = this.getFragment(this.iframe.location.hash));
            if (b == this.fragment || b == decodeURIComponent(this.fragment)) return !1;
            this.iframe && this.navigate(b), this.loadUrl() || this.loadUrl(window.location.hash)
        },
        loadUrl: function(a) {
            var b = this.fragment = this.getFragment(a),
                d = c.any(this.handlers, function(a) {
                    if (a.route.test(b)) return a.callback(b), !0
                });
            return d
        },
        navigate: function(a, b) {
            if (!b || b === !0) b = {
                trigger: b
            };
            var c = (a || "").replace(k, "");
            if (this.fragment == c || this.fragment == decodeURIComponent(c)) return;
            this._hasPushState ? (c.indexOf(this.options.root) != 0 && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.iframe.location.hash) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))), b.trigger && this.loadUrl(a)
        },
        _updateHash: function(a, b, c) {
            c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b
        }
    }), b.View = function(a) {
        this.cid = c.uniqueId("view"), this._configure(a || {}), this._ensureElement(), this.delegateEvents(), this.initialize.apply(this, arguments)
    };
    var n = /^(\S+)\s*(.*)$/,
        o = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
    c.extend(b.View.prototype, b.Events, {
        tagName: "div",
        $: function(a) {
            return a == null ? d(this.el) : d(a, this.el)
        },
        initialize: function() {},
        render: function() {
            return this
        },
        remove: function() {
            return d(this.el).remove(), this
        },
        make: function(a, b, c) {
            var e = document.createElement(a);
            return b && d(e).attr(b), c && d(e).html(c), e
        },
        delegateEvents: function(a) {
            if (!a && !(a = t(this, "events"))) return;
            this.undelegateEvents();
            for (var b in a) {
                var e = this[a[b]];
                if (!e) throw new Error('Event "' + a[b] + '" does not exist');
                var f = b.match(n),
                    g = f[1],
                    h = f[2];
                e = c.bind(e, this), g += ".delegateEvents" + this.cid, h === "" ? d(this.el).bind(g, e) : d(this.el).delegate(h, g, e)
            }
        },
        undelegateEvents: function() {
            d(this.el).unbind(".delegateEvents" + this.cid)
        },
        _configure: function(a) {
            this.options && (a = c.extend({}, this.options, a));
            for (var b = 0, d = o.length; b < d; b++) {
                var e = o[b];
                a[e] && (this[e] = a[e])
            }
            this.options = a
        },
        _ensureElement: function() {
            if (!this.el) {
                var a = this.attributes || {};
                this.id && (a.id = this.id), this.className && (a["class"] = this.className), this.el = this.make(this.tagName, a)
            } else c.isString(this.el) && (this.el = d(this.el).get(0))
        }
    });
    var p = function(a, b) {
        var c = s(this, a, b);
        return c.extend = this.extend, c
    };
    b.Model.extend = b.Collection.extend = b.Router.extend = b.View.extend = p;
    var q = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    b.sync = function(a, e, f) {
        var g = q[a],
            h = {
                type: g,
                dataType: "json"
            };
        return f.url || (h.url = t(e, "url") || u()), !f.data && e && (a == "create" || a == "update") && (h.contentType = "application/json", h.data = JSON.stringify(e.toJSON())), b.emulateJSON && (h.contentType = "application/x-www-form-urlencoded", h.data = h.data ? {
            model: h.data
        } : {}), b.emulateHTTP && (g === "PUT" || g === "DELETE") && (b.emulateJSON && (h.data._method = g), h.type = "POST", h.beforeSend = function(a) {
            a.setRequestHeader("X-HTTP-Method-Override", g)
        }), h.type !== "GET" && !b.emulateJSON && (h.processData = !1), d.ajax(c.extend(h, f))
    };
    var r = function() {}, s = function(a, b, d) {
            var e;
            return b && b.hasOwnProperty("constructor") ? e = b.constructor : e = function() {
                return a.apply(this, arguments)
            }, c.extend(e, a), r.prototype = a.prototype, e.prototype = new r, b && c.extend(e.prototype, b), d && c.extend(e, d), e.prototype.constructor = e, e.__super__ = a.prototype, e
        }, t = function(a, b) {
            return !a || !a[b] ? null : c.isFunction(a[b]) ? a[b]() : a[b]
        }, u = function() {
            throw new Error('A "url" property or function must be specified')
        }, v = function(a, b, c) {
            return function(d, e) {
                var e = d === b ? e : d;
                a ? a(d, e, c) : b.trigger("error", d, e, c)
            }
        };
    return b
}), define("Audiee/Models.Project", ["underscore", "backbone"], function(a, b) {
    var c = b.Model.extend({
        defaults: {
            name: "Untitled",
            created: Date.now(),
            user: "Guest",
            changed: !1
        },
        initialize: function() {
            this.bind("error", function(a, b) {
                alert(b)
            })
        },
        validate: function(a) {
            var b = /^(\w+[\ ]*)+$/;
            if (!b.test(a.name)) return "Project name is invalid."
        }
    });
    return c
}), define("Audiee/Models.Clip", ["underscore", "backbone"], function(a, b) {
    var c = b.Model.extend({
        defaults: {
            name: "untitled",
            color: "#4ecdc4",
            trackPos: 0,
            startTime: 0,
            endTime: 0,
            loop: 0
        },
        initialize: function() {},
        clipLength: function() {
            return this.get("endTime") - this.get("startTime") + this.get("loop") * this.get("buffer").duration
        },
        duplicate: function() {
            var a = this.clone(),
                b = a.get("trackPos") + this.clipLength();
            a.set("trackPos", b), this.collection.addDuplicate(a)
        }
    });
    return c
}), define("Audiee/Collections.Clips", ["underscore", "backbone", "Audiee/Models.Clip"], function(a, b, c) {
    return b.Collection.extend({
        model: c,
        getSnapshot: function(a, b) {
            var c = [],
                d, e, f, g, h, i, j;
            return this.each(function(k) {
                d = k.get("trackPos"), e = d + k.clipLength(), d < b && e > a && (i = k.get("loop"), j = k.get("buffer").duration, f = d < a ? 0 : d - a, g = k.get("startTime"), h = k.get("endTime"), d < a && (i -= Math.floor((g + a - d) / j), g = (g + a - d) % j), e > b && (i += Math.floor((h + b - e) / j), h = (h - (e - b)) % j, h < 0 && (h += j)), c.push({
                    offset: f,
                    startTime: g,
                    endTime: h,
                    loop: i,
                    name: k.get("name"),
                    color: k.get("color"),
                    buffer: k.get("buffer")
                }))
            }), c
        },
        deleteSelection: function(a, b, d) {
            var e = this,
                f = [],
                g, h, i, j, k, l, m, n, o;
            this.each(function(p) {
                if (p.cid !== d) {
                    g = p.get("trackPos"), h = g + p.clipLength();
                    if (g < b && h > a) {
                        k = p.get("loop"), l = p.get("buffer").duration, i = p.get("startTime"), j = p.get("endTime");
                        if (g < a && h > b) {
                            n = (i + a - g) % l, m = k + Math.floor((j + a - h) / l), p.set("loop", m), p.set("endTime", n), o = (i + b - g) % l, m = k - Math.floor((i + b - g) / l);
                            var q = new c({
                                name: p.get("name"),
                                color: p.get("color"),
                                trackPos: b,
                                startTime: o,
                                loop: m,
                                endTime: j,
                                buffer: p.get("buffer")
                            });
                            e.add(q)
                        } else g >= a && h <= b ? f.push(p) : g < a && h <= b ? (n = (i + a - g) % l, m = k + Math.floor((j + a - h) / l), p.set("loop", m), p.set("endTime", n)) : g >= a && h > b && (o = (i + b - g) % l, m = k - Math.floor((i + b - g) / l), p.set("loop", m), p.set("trackPos", b), p.set("startTime", o))
                    }
                }
            }), this.remove(f)
        },
        addDuplicate: function(a) {
            var b = a.get("trackPos"),
                c = b + a.clipLength();
            this.deleteSelection(b, c), this.add(a)
        }
    })
}), define("Audiee/Models.Track", ["underscore", "backbone", "Audiee/Collections.Clips", "Audiee/Models.Clip"], function(a, b, c, d) {
    var e = b.Model.extend({
        defaults: {
            name: "Untitled",
            color: "#00a0b0",
            gain: 1,
            pan: .5,
            muted: !1,
            solo: !1,
            length: 1920
        },
        initialize: function() {
            a.bindAll(this, "initClip", "remove", "resetDuplicates"), this.bind("remove", this.remove), this.bind("change:name", this.resetDuplicates), this.clips = new c, this.initClip(), Audiee.Player.initTrack(this.cid)
        },
        initClip: function() {
            var a = new d({
                name: this.get("file").name,
                endTime: this.get("buffer").duration,
                buffer: this.get("buffer")
            });
            this.clips.add(a)
        },
        remove: function() {
            Audiee.Player.releaseTrack(this.cid), this.destroy()
        },
        getSnapshot: function(a, b) {
            return this.clips.getSnapshot(a, b)
        },
        deleteSelection: function(a, b, c) {
            this.clips.deleteSelection(a, b, c)
        },
        pasteSelection: function(a, b) {
            for (var c = 0, e = b.length; c < e; ++c) {
                var f = new d({
                    startTime: b[c].startTime,
                    endTime: b[c].endTime,
                    trackPos: b[c].offset + a,
                    loop: b[c].loop,
                    name: b[c].name,
                    color: b[c].color,
                    buffer: b[c].buffer
                }),
                    g = f.get("trackPos"),
                    h = g + f.clipLength();
                Audiee.Collections.Tracks.deleteSelection(g, h, this.cid), this.clips.add(f)
            }
        },
        resetDuplicates: function() {
            this.duplicates = undefined
        },
        duplicate: function() {
            var a = this.clone(),
                b = a.get("name"),
                c = b.match(/\(\d+\)$/),
                d;
            a.clips.reset(this.clips.toJSON()), this.duplicates ? this.duplicates.count += 1 : this.duplicates = {
                count: 2
            }, d = this.duplicates.count, c ? b = b.replace(/\(\d+\)$/, " (" + d + ")") : b += " (" + d + ")", a.set("name", b), a.duplicates = this.duplicates, this.collection.add(a), this.collection.decIndexCount()
        }
    });
    return e
}), define("Audiee/Collections.Tracks", ["underscore", "backbone", "Audiee/Models.Track"], function(a, b, c) {
    return b.Collection.extend({
        model: c,
        initialize: function() {
            this.indexCount = 1, a.bindAll(this, "incIndexCount"), this.bind("add", this.incIndexCount)
        },
        getSnapshot: function(a, b, c) {
            return this.getByCid(c).getSnapshot(a, b)
        },
        deleteSelection: function(a, b, c, d) {
            this.getByCid(c).deleteSelection(a, b, d)
        },
        pasteSelection: function(a, b, c) {
            this.getByCid(a).pasteSelection(b, c)
        },
        incIndexCount: function() {
            this.indexCount += 1
        },
        decIndexCount: function() {
            this.indexCount -= 1
        },
        getIndexCount: function() {
            return this.indexCount
        },
        isAnySolo: function() {
            var a = this.filter(function(a) {
                return a.get("solo") === !0
            });
            return a.length > 0
        }
    })
}), define("Audiee/Views.PlaybackControls", ["underscore", "backbone"], function(a, b) {
    return b.View.extend({
        el: $("#playback-controls"),
        events: {
            "click #play": "play",
            "click #stop": "stop",
            "click #follow": "follow"
        },
        initialize: function() {
            a.bindAll(this, "handleKey"), this.render(), this.pressingKey = !1, $(document).on("keydown", this.handleKey).on("keyup", this.handleKey)
        },
        render: function() {
            return this.updateTime(), this
        },
        updateTime: function(a) {
            typeof a == "undefined" && (a = 0);
            var b = Math.floor(a / 60),
                c = a % 60,
                d;
            c += "", d = c.indexOf("."), d !== -1 && (c = c.substring(0, d + 4)), this.el.children("#time-display").val(b + " : " + c)
        },
        play: function() {
            if (Audiee.Collections.Tracks.length <= 0) return;
            var a = $("#play");
            Audiee.Player.play(), a.addClass("playing")
        },
        stop: function() {
            if (Audiee.Collections.Tracks.length <= 0) return;
            var a = $("#play");
            Audiee.Player.stop(), a.removeClass("playing")
        },
        follow: function() {
            Audiee.Display.playbackCursorFollowing = !Audiee.Display.playbackCursorFollowing, $("#follow").toggleClass("following")
        },
        handleKey: function(a) {
            if (!Audiee.Views.Menu.hotkeysEnabled) return;
            switch (a.which) {
                case 32:
                    a.type === "keydown" && !this.pressingKey ? (Audiee.Player.playing ? $("#stop").trigger("click") : $("#play").trigger("click"), this.pressingKey = !0) : a.type === "keyup" && (this.pressingKey = !1)
            }
        }
    })
}), define("Audiee/Views.Editor", ["jquery", "underscore", "backbone"], function(a, b, c) {
    return c.View.extend({
        el: a("#editor-view"),
        events: {
            mousewheel: "zoomHandler",
            scroll: "scrollHandler"
        },
        initialize: function() {
            b.bindAll(this, "render", "changeTitle", "resizeView", "scrollHandler", "zoomHandler", "setClipboard"), this.model.bind("change:name", this.changeTitle), this.moving = !1, a("title").text(this.model.get("name") + " :: Audiee"), a(window).on("resize", this.resizeView), this.resizeView()
        },
        render: function() {
            return this
        },
        changeTitle: function() {
            a("title").text(this.model.get("name") + " :: Audiee")
        },
        resizeView: function() {
            var b = a(this.el),
                c = a(window).height() - b.position().top - parseInt(b.css("margin-top"));
            b.height(c)
        },
        scrollHandler: function() {
            Audiee.Views.Tracks.trigger("Audiee:scroll"), Audiee.Views.Timeline.trigger("Audiee:scroll")
        },
        scrollLeftOffset: function() {
            return a(this.el).scrollLeft()
        },
        scrollTopOffset: function() {
            return a(this.el).scrollTop()
        },
        zoomHandler: function(b) {
            if (b.altKey) {
                b.preventDefault();
                var c = Audiee.Display.px2sec(b.originalEvent.offsetX);
                b.originalEvent.wheelDelta < 0 ? Audiee.Display.zoomOut() : Audiee.Display.zoomIn();
                var d = Audiee.Display.sec2px(c),
                    e = this.scrollLeftOffset() + d - b.originalEvent.offsetX;
                return a(this.el).scrollLeft(e), Audiee.Views.Tracks.trigger("Audiee:zoomChange"), Audiee.Views.Timeline.trigger("Audiee:zoomChange"), !1
            }
        },
        movingOn: function() {
            this.moving = !0
        },
        movingOff: function() {
            this.moving = !1
        },
        isMoving: function() {
            return this.moving
        },
        setActiveTrack: function(a) {
            this.activeTrack = a, a.addClass("active").siblings().removeClass("active")
        },
        getActiveTrack: function() {
            return this.activeTrack
        },
        isActiveTrack: function() {
            return typeof this.activeTrack != "undefined"
        },
        unsetActiveTrack: function() {
            Audiee.Views.Tracks.clearDisplays(), typeof this.activeTrack != "undefined" && (this.activeTrack.removeClass("active"), this.activeTrack = undefined)
        },
        setSelectionFrom: function(a) {
            this.selectionFrom = a
        },
        setCursor: function(a) {
            this.originalCursor = a, this.selectionFrom = a, this.selectionTo = a
        },
        setSelectionTo: function(a, b) {
            typeof b != "undefined" ? this.selectionTo = a : a < this.originalCursor ? this.selectionFrom = a : this.selectionTo = a
        },
        isSelection: function() {
            return this.selectionFrom !== this.selectionTo
        },
        setMultiSelection: function(a) {
            this.multilineTo = a
        },
        getMultiSelection: function() {
            return this.multilineTo
        },
        unsetMultiSelection: function() {
            this.multilineTo = undefined
        },
        isMultiSelection: function() {
            return typeof this.multilineTo != "undefined"
        },
        getCursor: function() {
            return this.selectionFrom
        },
        getSelectionTo: function() {
            return this.selectionTo
        },
        setClipboard: function() {
            var b = {}, c = a(".track"),
                d = this,
                e;
            if (!isNaN(this.selectionFrom) && this.selectionFrom !== this.selectionTo) {
                b.from = this.selectionFrom, b.to = this.selectionTo, b.tracks = {};
                var f = c.index(this.getActiveTrack()),
                    g = f,
                    h;
                this.isMultiSelection() && (g = c.index(this.getMultiSelection()), f > g && (h = f, f = g, g = h)), c.slice(f, ++g).each(function() {
                    e = a(this).data("cid"), b.tracks[e] = Audiee.Collections.Tracks.getSnapshot(d.selectionFrom, d.selectionTo, e)
                }), this.clipboard = b
            }
        },
        getClipboard: function() {
            return this.clipboard
        },
        eraseClipboard: function() {
            this.clipboard = undefined
        },
        pasteClipboard: function() {
            var a = this.getCursor(),
                b = this.getClipboard();
            if (typeof b == "undefined") return;
            for (var c in b.tracks) Audiee.Collections.Tracks.pasteSelection(c, a, b.tracks[c])
        },
        deleteSelection: function() {
            var b = a(".track"),
                c = this,
                d;
            if (!isNaN(this.selectionFrom) && this.selectionFrom !== this.selectionTo) {
                var e = b.index(this.getActiveTrack()),
                    f = e,
                    g;
                this.isMultiSelection() && (f = b.index(this.getMultiSelection()), e > f && (g = e, e = f, f = g)), b.slice(e, ++f).each(function() {
                    d = a(this).data("cid"), Audiee.Collections.Tracks.deleteSelection(c.selectionFrom, c.selectionTo, d)
                })
            }
        },
        splitClip: function() {
            var a = this.getActiveTrack(),
                b = this.getCursor(),
                c;
            typeof a != "undefined" && (c = a.data("cid")), Audiee.Collections.Tracks.getByCid(c).deleteSelection(b, b)
        }
    })
}), define("Audiee/Views.TrackDisplay", ["jquery", "underscore", "backbone"], function(a, b, c) {
    return b.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    }, c.View.extend({
        tagName: "div",
        className: "track-display",
        wrapperName: "display-wrapper",
        wrapperClass: ".display-wrapper",
        maxWidth: 2e4,
        template: b.template('<canvas width="{{ width }}" height="{{ height }}">Your browser does not support HTML5 canvas.</canvas>'),
        initialize: function() {
            b.bindAll(this, "render", "renderDisplay", "renderCursor", "renderSelection", "cursor", "selection", "contextMenu"), this.model.bind("Audiee:zoomChange", this.renderDisplay), a(this.el).on("contextmenu", this.wrapperClass, this.contextMenu).on("mousedown", this.wrapperClass, this.cursor).on("mouseup", this.wrapperClass, this.selection), this.render()
        },
        render: function() {
            var b = a('<div class="' + this.wrapperName + '">'),
                c = a(this.el);
            return c.append(b), this.renderDisplay(), this
        },
        renderDisplay: function() {
            var b = Audiee.Display.sec2px(this.model.get("length")),
                c = this.maxWidth,
                d = 100,
                e = a(this.el),
                f = e.find(this.wrapperClass);
            e.width(b), f.children().detach();
            do f.append(this.template({
                width: b > c ? c : b,
                height: d
            })), b -= c; while (b > 0);
            this.clearDisplay(), this.renderCursor(), this.renderSelection()
        },
        cursor: function(b) {
            var c = a(this.el).parent(".track"),
                d = a(this.wrapperClass, this.el).children("canvas");
            if (!b.shiftKey) {
                var e = d.index(a(b.target)),
                    f = b.offsetX + e * this.maxWidth,
                    g = f % this.maxWidth;
                this.clearDisplay(), Audiee.Views.Editor.setActiveTrack(c), Audiee.Views.Editor.setCursor(Audiee.Display.px2sec(f)), Audiee.Views.Editor.unsetMultiSelection(), this.renderCursor()
            } else this.selection(b);
            a(this.wrapperClass).on("mousemove", this.selection)
        },
        renderCursor: function() {
            if (!Audiee.Views.Editor.isActiveTrack()) return;
            var b = Audiee.Views.Editor.getActiveTrack(),
                c = a(this.wrapperClass, b).children("canvas"),
                d = Audiee.Display.sec2px(Audiee.Views.Editor.getCursor()),
                e = Math.floor(d / this.maxWidth);
            Audiee.Display.drawCursor(c.eq(e)[0], d % this.maxWidth)
        },
        selection: function(b) {
            if (Audiee.Views.Editor.isMoving()) return;
            b.type === "mouseup" && a(this.wrapperClass).off("mousemove");
            var c = a(b.target).parents(".track"),
                d = c.find(this.wrapperClass).children("canvas"),
                e = b.offsetX + d.index(a(b.target)) * this.maxWidth;
            Audiee.Views.Editor.isSelection() && this.clearDisplay();
            if (b.shiftKey) {
                var f = Audiee.Views.Editor.getCursor(),
                    g = Audiee.Views.Editor.getSelectionTo(),
                    h = Audiee.Display.sec2px(f + (g - f) / 2);
                e >= h ? Audiee.Views.Editor.setSelectionTo(Audiee.Display.px2sec(e), !0) : Audiee.Views.Editor.setSelectionFrom(Audiee.Display.px2sec(e))
            } else Audiee.Views.Editor.setSelectionTo(Audiee.Display.px2sec(e));
            Audiee.Views.Editor.isActiveTrack() && Audiee.Views.Editor.getActiveTrack().data("cid") !== c.data("cid") ? Audiee.Views.Editor.setMultiSelection(c) : Audiee.Views.Editor.unsetMultiSelection(), this.renderSelection()
        },
        renderSelection: function() {
            var b = Audiee.Display.sec2px(Audiee.Views.Editor.getCursor()),
                c = Audiee.Display.sec2px(Audiee.Views.Editor.getSelectionTo()),
                d = Math.floor(b / this.maxWidth),
                e = Math.floor(c / this.maxWidth),
                f = a(".track"),
                g = this,
                h, i, j, k;
            if (!isNaN(b) && b !== c) {
                var l = f.index(Audiee.Views.Editor.getActiveTrack()),
                    m = l;
                Audiee.Views.Editor.isMultiSelection() && (m = f.index(Audiee.Views.Editor.getMultiSelection()), l > m && (j = l, l = m, m = j)), c %= this.maxWidth, f.slice(l, ++m).each(function() {
                    k = a(this).find(g.wrapperClass).children("canvas"), h = b % g.maxWidth, i = d !== e ? g.maxWidth - h : c - h;
                    for (var f = d; f <= e; ++f) Audiee.Display.drawSelection(k.eq(f)[0], h, i), h = 0, i = f != e - 1 ? g.maxWidth : c
                })
            }
        },
        clearDisplay: function() {
            var b = Audiee.Display.sec2px(Audiee.Views.Editor.getCursor()),
                c = Audiee.Display.sec2px(Audiee.Views.Editor.getSelectionTo()) + 1,
                d = Math.floor(b / this.maxWidth),
                e = Math.floor(c / this.maxWidth),
                f = a(".track"),
                g = this,
                h, i, j, k;
            if (!isNaN(b)) {
                var l = f.index(Audiee.Views.Editor.getActiveTrack()),
                    m = l;
                Audiee.Views.Editor.isMultiSelection() && (m = f.index(Audiee.Views.Editor.getMultiSelection()), l > m && (j = l, l = m, m = j)), c %= this.maxWidth, f.slice(l, ++m).each(function() {
                    k = a(this).find(g.wrapperClass).children("canvas"), h = b % g.maxWidth, i = d !== e ? g.maxWidth - h : c - h;
                    for (var f = d; f <= e; ++f) Audiee.Display.clearDisplay(k.eq(f)[0], h, i), h = 0, i = f != e - 1 ? g.maxWidth : c
                })
            }
        },
        contextMenu: function(a) {
            a.preventDefault()
        }
    })
}), ! function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.button.defaults, c)
    };
    b.prototype = {
        constructor: b,
        setState: function(a) {
            var b = "disabled",
                c = this.$element,
                d = c.data(),
                e = c.is("input") ? "val" : "html";
            a += "Text", d.resetText || c.data("resetText", c[e]()), c[e](d[a] || this.options[a]), setTimeout(function() {
                a == "loadingText" ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b)
            }, 0)
        },
        toggle: function() {
            var a = this.$element.parent('[data-toggle="buttons-radio"]');
            a && a.find(".active").removeClass("active"), this.$element.toggleClass("active")
        }
    }, a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("button"),
                f = typeof c == "object" && c;
            e || d.data("button", e = new b(this, f)), c == "toggle" ? e.toggle() : c && e.setState(c)
        })
    }, a.fn.button.defaults = {
        loadingText: "loading..."
    }, a.fn.button.Constructor = b, a(function() {
        a("body").on("click.button.data-api", "[data-toggle^=button]", function(b) {
            a(b.target).button("toggle")
        })
    })
}(window.jQuery), define("plugins/button", function() {}), define("Audiee/Views.TrackControls", ["jquery", "underscore", "backbone", "plugins/button"], function(a, b, c) {
    return b.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    }, c.View.extend({
        tagName: "div",
        className: "track-controls",
        template: b.template('<button class="btn mute {{ muted }}" data-toggle="button" title="mute">M</button><button class="btn solo {{ solo }}" data-toggle="button" title="solo">S</button><input type="range" class="volume" value="{{ gain }}" title="volume">'),
        initialize: function() {
            b.bindAll(this, "render", "volumeChange", "solo", "mute"), this.render(), a("input.volume", this.el).on("change", this.volumeChange), a("button.mute", this.el).on("click", this.mute), a("button.solo", this.el).on("click", this.solo)
        },
        render: function() {
            var b = this.model.get("gain") * 100,
                c = this.model.get("muted") ? "active" : "",
                d = this.model.get("solo") ? "active" : "";
            return a(this.el).html(this.template({
                gain: b,
                muted: c,
                solo: d
            })), a(this.el).find(".btn").button(), this
        },
        volumeChange: function() {
            var b = a("input.volume", this.el).val() / 100,
                c = a(this.el).parents(".track").data("cid");
            this.model.set("gain", b), (!Audiee.Collections.Tracks.isAnySolo() || this.model.get("solo")) && Audiee.Player.volumeChange(b, c), a("button.mute", this.el).hasClass("active") && (a("button.mute", this.el).button("toggle"), this.mute())
        },
        mute: function() {
            var a = this.model.get("muted");
            this.model.set("muted", !a), a ? (!Audiee.Collections.Tracks.isAnySolo() || this.model.get("solo")) && Audiee.Player.volumeChange(this.model.get("gain"), this.model.cid) : this.model.get("solo") || Audiee.Player.volumeChange(0, this.model.cid)
        },
        solo: function() {
            this.model.set("solo", !this.model.get("solo"));
            var a = Audiee.Collections.Tracks.filter(function(a) {
                return a.get("solo") === !0
            }),
                c = Audiee.Collections.Tracks.filter(function(a) {
                    return a.get("solo") === !1
                });
            a.length === 0 ? Audiee.Collections.Tracks.each(function(a) {
                a.get("muted") === !1 ? Audiee.Player.volumeChange(a.get("gain"), a.cid) : Audiee.Player.volumeChange(0, a.cid)
            }) : (b.each(a, function(a) {
                Audiee.Player.volumeChange(a.get("gain"), a.cid)
            }), b.each(c, function(a) {
                Audiee.Player.volumeChange(0, a.cid)
            }))
        }
    })
}), define("Audiee/Views.ClipDisplay", ["jquery", "underscore", "backbone"], function(a, b, c) {
    return b.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    }, c.View.extend({
        tagName: "div",
        className: "clip-display",
        template: b.template('<canvas width="{{ width }}" height="{{ height }}">Your browser does not support HTML5 canvas.</canvas>'),
        initialize: function() {
            b.bindAll(this, "render", "getLastCanvas")
        },
        render: function(b) {
            var c = b,
                d = 2e4,
                e = 0,
                f = 100,
                g = Audiee.Display.sec2px(this.model.get("startTime"));
            $el = a(this.el), $el.empty();
            do c > d ? e = d : e = c, $el.append(this.template({
                width: e,
                height: f
            })), Audiee.Display.drawSound(this.getLastCanvas(), this.model.get("buffer"), b, g), c -= d, g += d; while (c > 0);
            return this
        },
        getLastCanvas: function() {
            return a(this.el).find("canvas").last()[0]
        }
    })
}),
function(a, b) {
    function c(b) {
        return !a(b).parents().andSelf().filter(function() {
            return a.curCSS(this, "visibility") === "hidden" || a.expr.filters.hidden(this)
        }).length
    }

    function d(b, d) {
        var e = b.nodeName.toLowerCase();
        if ("area" === e) {
            var f = b.parentNode,
                g = f.name,
                h;
            return !b.href || !g || f.nodeName.toLowerCase() !== "map" ? !1 : (h = a("img[usemap=#" + g + "]")[0], !! h && c(h))
        }
        return (/input|select|textarea|button|object/.test(e) ? !b.disabled : "a" == e ? b.href || d : d) && c(b)
    }
    a.ui = a.ui || {}, a.ui.version || (a.extend(a.ui, {
        version: "1.8.18",
        keyCode: {
            ALT: 18,
            BACKSPACE: 8,
            CAPS_LOCK: 20,
            COMMA: 188,
            COMMAND: 91,
            COMMAND_LEFT: 91,
            COMMAND_RIGHT: 93,
            CONTROL: 17,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            INSERT: 45,
            LEFT: 37,
            MENU: 93,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SHIFT: 16,
            SPACE: 32,
            TAB: 9,
            UP: 38,
            WINDOWS: 91
        }
    }), a.fn.extend({
        propAttr: a.fn.prop || a.fn.attr,
        _focus: a.fn.focus,
        focus: function(b, c) {
            return typeof b == "number" ? this.each(function() {
                var d = this;
                setTimeout(function() {
                    a(d).focus(), c && c.call(d)
                }, b)
            }) : this._focus.apply(this, arguments)
        },
        scrollParent: function() {
            var b;
            return a.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? b = this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(a.curCSS(this, "position", 1)) && /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0) : b = this.parents().filter(function() {
                return /(auto|scroll)/.test(a.curCSS(this, "overflow", 1) + a.curCSS(this, "overflow-y", 1) + a.curCSS(this, "overflow-x", 1))
            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
        },
        zIndex: function(c) {
            if (c !== b) return this.css("zIndex", c);
            if (this.length) {
                var d = a(this[0]),
                    e, f;
                while (d.length && d[0] !== document) {
                    e = d.css("position");
                    if (e === "absolute" || e === "relative" || e === "fixed") {
                        f = parseInt(d.css("zIndex"), 10);
                        if (!isNaN(f) && f !== 0) return f
                    }
                    d = d.parent()
                }
            }
            return 0
        },
        disableSelection: function() {
            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                a.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }), a.each(["Width", "Height"], function(c, d) {
        function e(b, c, d, e) {
            return a.each(f, function() {
                c -= parseFloat(a.curCSS(b, "padding" + this, !0)) || 0, d && (c -= parseFloat(a.curCSS(b, "border" + this + "Width", !0)) || 0), e && (c -= parseFloat(a.curCSS(b, "margin" + this, !0)) || 0)
            }), c
        }
        var f = d === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
            g = d.toLowerCase(),
            h = {
                innerWidth: a.fn.innerWidth,
                innerHeight: a.fn.innerHeight,
                outerWidth: a.fn.outerWidth,
                outerHeight: a.fn.outerHeight
            };
        a.fn["inner" + d] = function(c) {
            return c === b ? h["inner" + d].call(this) : this.each(function() {
                a(this).css(g, e(this, c) + "px")
            })
        }, a.fn["outer" + d] = function(b, c) {
            return typeof b != "number" ? h["outer" + d].call(this, b) : this.each(function() {
                a(this).css(g, e(this, b, !0, c) + "px")
            })
        }
    }), a.extend(a.expr[":"], {
        data: function(b, c, d) {
            return !!a.data(b, d[3])
        },
        focusable: function(b) {
            return d(b, !isNaN(a.attr(b, "tabindex")))
        },
        tabbable: function(b) {
            var c = a.attr(b, "tabindex"),
                e = isNaN(c);
            return (e || c >= 0) && d(b, !e)
        }
    }), a(function() {
        var b = document.body,
            c = b.appendChild(c = document.createElement("div"));
        c.offsetHeight, a.extend(c.style, {
            minHeight: "100px",
            height: "auto",
            padding: 0,
            borderWidth: 0
        }), a.support.minHeight = c.offsetHeight === 100, a.support.selectstart = "onselectstart" in c, b.removeChild(c).style.display = "none"
    }), a.extend(a.ui, {
        plugin: {
            add: function(b, c, d) {
                var e = a.ui[b].prototype;
                for (var f in d) e.plugins[f] = e.plugins[f] || [], e.plugins[f].push([c, d[f]])
            },
            call: function(a, b, c) {
                var d = a.plugins[b];
                if ( !! d && !! a.element[0].parentNode)
                    for (var e = 0; e < d.length; e++) a.options[d[e][0]] && d[e][1].apply(a.element, c)
            }
        },
        contains: function(a, b) {
            return document.compareDocumentPosition ? a.compareDocumentPosition(b) & 16 : a !== b && a.contains(b)
        },
        hasScroll: function(b, c) {
            if (a(b).css("overflow") === "hidden") return !1;
            var d = c && c === "left" ? "scrollLeft" : "scrollTop",
                e = !1;
            return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
        },
        isOverAxis: function(a, b, c) {
            return a > b && a < b + c
        },
        isOver: function(b, c, d, e, f, g) {
            return a.ui.isOverAxis(b, d, f) && a.ui.isOverAxis(c, e, g)
        }
    }))
}(jQuery),
function(a, b) {
    if (a.cleanData) {
        var c = a.cleanData;
        a.cleanData = function(b) {
            for (var d = 0, e;
                (e = b[d]) != null; d++) try {
                a(e).triggerHandler("remove")
            } catch (f) {}
            c(b)
        }
    } else {
        var d = a.fn.remove;
        a.fn.remove = function(b, c) {
            return this.each(function() {
                return c || (!b || a.filter(b, [this]).length) && a("*", this).add([this]).each(function() {
                    try {
                        a(this).triggerHandler("remove")
                    } catch (b) {}
                }), d.call(a(this), b, c)
            })
        }
    }
    a.widget = function(b, c, d) {
        var e = b.split(".")[0],
            f;
        b = b.split(".")[1], f = e + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][f] = function(c) {
            return !!a.data(c, b)
        }, a[e] = a[e] || {}, a[e][b] = function(a, b) {
            arguments.length && this._createWidget(a, b)
        };
        var g = new c;
        g.options = a.extend(!0, {}, g.options), a[e][b].prototype = a.extend(!0, g, {
            namespace: e,
            widgetName: b,
            widgetEventPrefix: a[e][b].prototype.widgetEventPrefix || b,
            widgetBaseClass: f
        }, d), a.widget.bridge(b, a[e][b])
    }, a.widget.bridge = function(c, d) {
        a.fn[c] = function(e) {
            var f = typeof e == "string",
                g = Array.prototype.slice.call(arguments, 1),
                h = this;
            return e = !f && g.length ? a.extend.apply(null, [!0, e].concat(g)) : e, f && e.charAt(0) === "_" ? h : (f ? this.each(function() {
                var d = a.data(this, c),
                    f = d && a.isFunction(d[e]) ? d[e].apply(d, g) : d;
                if (f !== d && f !== b) return h = f, !1
            }) : this.each(function() {
                var b = a.data(this, c);
                b ? b.option(e || {})._init() : a.data(this, c, new d(e, this))
            }), h)
        }
    }, a.Widget = function(a, b) {
        arguments.length && this._createWidget(a, b)
    }, a.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        options: {
            disabled: !1
        },
        _createWidget: function(b, c) {
            a.data(c, this.widgetName, this), this.element = a(c), this.options = a.extend(!0, {}, this.options, this._getCreateOptions(), b);
            var d = this;
            this.element.bind("remove." + this.widgetName, function() {
                d.destroy()
            }), this._create(), this._trigger("create"), this._init()
        },
        _getCreateOptions: function() {
            return a.metadata && a.metadata.get(this.element[0])[this.widgetName]
        },
        _create: function() {},
        _init: function() {},
        destroy: function() {
            this.element.unbind("." + this.widgetName).removeData(this.widgetName), this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled " + "ui-state-disabled")
        },
        widget: function() {
            return this.element
        },
        option: function(c, d) {
            var e = c;
            if (arguments.length === 0) return a.extend({}, this.options);
            if (typeof c == "string") {
                if (d === b) return this.options[c];
                e = {}, e[c] = d
            }
            return this._setOptions(e), this
        },
        _setOptions: function(b) {
            var c = this;
            return a.each(b, function(a, b) {
                c._setOption(a, b)
            }), this
        },
        _setOption: function(a, b) {
            return this.options[a] = b, a === "disabled" && this.widget()[b ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled" + " " + "ui-state-disabled").attr("aria-disabled", b), this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _trigger: function(b, c, d) {
            var e, f, g = this.options[b];
            d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent;
            if (f)
                for (e in f) e in c || (c[e] = f[e]);
            return this.element.trigger(c, d), !(a.isFunction(g) && g.call(this.element[0], c, d) === !1 || c.isDefaultPrevented())
        }
    }
}(jQuery),
function(a, b) {
    var c = !1;
    a(document).mouseup(function(a) {
        c = !1
    }), a.widget("ui.mouse", {
        options: {
            cancel: ":input,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." + this.widgetName, function(a) {
                return b._mouseDown(a)
            }).bind("click." + this.widgetName, function(c) {
                if (!0 === a.data(c.target, b.widgetName + ".preventClickEvent")) return a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1
            }), this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName)
        },
        _mouseDown: function(b) {
            if (!c) {
                this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
                var d = this,
                    e = b.which == 1,
                    f = typeof this.options.cancel == "string" && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
                if (!e || f || !this._mouseCapture(b)) return !0;
                this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    d.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(b) && this._mouseDelayMet(b)) {
                    this._mouseStarted = this._mouseStart(b) !== !1;
                    if (!this._mouseStarted) return b.preventDefault(), !0
                }
                return !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
                    return d._mouseMove(a)
                }, this._mouseUpDelegate = function(a) {
                    return d._mouseUp(a)
                }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0
            }
        },
        _mouseMove: function(b) {
            return !a.browser.msie || document.documentMode >= 9 || !! b.button ? this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted) : this._mouseUp(b)
        },
        _mouseUp: function(b) {
            return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target == this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
        },
        _mouseDistanceMet: function(a) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function(a) {
            return this.mouseDelayMet
        },
        _mouseStart: function(a) {},
        _mouseDrag: function(a) {},
        _mouseStop: function(a) {},
        _mouseCapture: function(a) {
            return !0
        }
    })
}(jQuery),
function(a, b) {
    a.widget("ui.draggable", a.ui.mouse, {
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1
        },
        _create: function() {
            this.options.helper == "original" && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
        },
        destroy: function() {
            if ( !! this.element.data("draggable")) return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy(), this
        },
        _mouseCapture: function(b) {
            var c = this.options;
            return this.helper || c.disabled || a(b.target).is(".ui-resizable-handle") ? !1 : (this.handle = this._getHandle(b), this.handle ? (c.iframeFix && a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
                a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css(a(this).offset()).appendTo("body")
            }), !0) : !1)
        },
        _mouseStart: function(b) {
            var c = this.options;
            return this.helper = this._createHelper(b), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offset = this.positionAbs = this.element.offset(), this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            }, a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), c.containment && this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.helper.addClass("ui-draggable-dragging"), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
        },
        _mouseDrag: function(b, c) {
            this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute");
            if (!c) {
                var d = this._uiHash();
                if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
                this.position = d.position
            }
            if (!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top + "px";
            return a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
        },
        _mouseStop: function(b) {
            var c = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (c = a.ui.ddmanager.drop(this, b)), this.dropped && (c = this.dropped, this.dropped = !1);
            if ((!this.element[0] || !this.element[0].parentNode) && this.options.helper == "original") return !1;
            if (this.options.revert == "invalid" && !c || this.options.revert == "valid" && c || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, c)) {
                var d = this;
                a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                    d._trigger("stop", b) !== !1 && d._clear()
                })
            } else this._trigger("stop", b) !== !1 && this._clear();
            return !1
        },
        _mouseUp: function(b) {
            return this.options.iframeFix === !0 && a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
        },
        _getHandle: function(b) {
            var c = !this.options.handle || !a(this.options.handle, this.element).length ? !0 : !1;
            return a(this.options.handle, this.element).find("*").andSelf().each(function() {
                this == b.target && (c = !0)
            }), c
        },
        _createHelper: function(b) {
            var c = this.options,
                d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : c.helper == "clone" ? this.element.clone().removeAttr("id") : this.element;
            return d.parents("body").length || d.appendTo(c.appendTo == "parent" ? this.element[0].parentNode : c.appendTo), d[0] != this.element[0] && !/(fixed|absolute)/.test(d.css("position")) && d.css("position", "absolute"), d
        },
        _adjustOffsetFromHelper: function(b) {
            typeof b == "string" && (b = b.split(" ")), a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            this.cssPosition == "absolute" && this.scrollParent[0] != document && a.ui.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && a.browser.msie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if (this.cssPosition == "relative") {
                var a = this.element.position();
                return {
                    top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b = this.options;
            b.containment == "parent" && (b.containment = this.helper[0].parentNode);
            if (b.containment == "document" || b.containment == "window") this.containment = [b.containment == "document" ? 0 : a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, b.containment == "document" ? 0 : a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, (b.containment == "document" ? 0 : a(window).scrollLeft()) + a(b.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b.containment == "document" ? 0 : a(window).scrollTop()) + (a(b.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            if (!/^(document|window|parent)$/.test(b.containment) && b.containment.constructor != Array) {
                var c = a(b.containment),
                    d = c[0];
                if (!d) return;
                var e = c.offset(),
                    f = a(d).css("overflow") != "hidden";
                this.containment = [(parseInt(a(d).css("borderLeftWidth"), 10) || 0) + (parseInt(a(d).css("paddingLeft"), 10) || 0), (parseInt(a(d).css("borderTopWidth"), 10) || 0) + (parseInt(a(d).css("paddingTop"), 10) || 0), (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(a(d).css("borderLeftWidth"), 10) || 0) - (parseInt(a(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(a(d).css("borderTopWidth"), 10) || 0) - (parseInt(a(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c
            } else b.containment.constructor == Array && (this.containment = b.containment)
        },
        _convertPositionTo: function(b, c) {
            c || (c = this.position);
            var d = b == "absolute" ? 1 : -1,
                e = this.options,
                f = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                g = /(html|body)/i.test(f[0].tagName);
            return {
                top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : f.scrollTop()) * d),
                left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : f.scrollLeft()) * d)
            }
        },
        _generatePosition: function(b) {
            var c = this.options,
                d = this.cssPosition != "absolute" || this.scrollParent[0] != document && !! a.ui.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                e = /(html|body)/i.test(d[0].tagName),
                f = b.pageX,
                g = b.pageY;
            if (this.originalPosition) {
                var h;
                if (this.containment) {
                    if (this.relative_container) {
                        var i = this.relative_container.offset();
                        h = [this.containment[0] + i.left, this.containment[1] + i.top, this.containment[2] + i.left, this.containment[3] + i.top]
                    } else h = this.containment;
                    b.pageX - this.offset.click.left < h[0] && (f = h[0] + this.offset.click.left), b.pageY - this.offset.click.top < h[1] && (g = h[1] + this.offset.click.top), b.pageX - this.offset.click.left > h[2] && (f = h[2] + this.offset.click.left), b.pageY - this.offset.click.top > h[3] && (g = h[3] + this.offset.click.top)
                }
                if (c.grid) {
                    var j = c.grid[1] ? this.originalPageY + Math.round((g - this.originalPageY) / c.grid[1]) * c.grid[1] : this.originalPageY;
                    g = h ? j - this.offset.click.top < h[1] || j - this.offset.click.top > h[3] ? j - this.offset.click.top < h[1] ? j + c.grid[1] : j - c.grid[1] : j : j;
                    var k = c.grid[0] ? this.originalPageX + Math.round((f - this.originalPageX) / c.grid[0]) * c.grid[0] : this.originalPageX;
                    f = h ? k - this.offset.click.left < h[0] || k - this.offset.click.left > h[2] ? k - this.offset.click.left < h[0] ? k + c.grid[0] : k - c.grid[0] : k : k
                }
            }
            return {
                top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()),
                left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (a.browser.safari && a.browser.version < 526 && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft())
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"), this.helper[0] != this.element[0] && !this.cancelHelperRemoval && this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
        },
        _trigger: function(b, c, d) {
            return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), b == "drag" && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
        },
        plugins: {},
        _uiHash: function(a) {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }), a.extend(a.ui.draggable, {
        version: "1.8.18"
    }), a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = a.extend({}, c, {
                    item: d.element
                });
            d.sortables = [], a(e.connectToSortable).each(function() {
                var c = a.data(this, "sortable");
                c && !c.options.disabled && (d.sortables.push({
                    instance: c,
                    shouldRevert: c.options.revert
                }), c.refreshPositions(), c._trigger("activate", b, f))
            })
        },
        stop: function(b, c) {
            var d = a(this).data("draggable"),
                e = a.extend({}, c, {
                    item: d.element
                });
            a.each(d.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = !0), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, d.options.helper == "original" && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
                e = this,
                f = function(b) {
                    var c = this.offset.click.top,
                        d = this.offset.click.left,
                        e = this.positionAbs.top,
                        f = this.positionAbs.left,
                        g = b.height,
                        h = b.width,
                        i = b.top,
                        j = b.left;
                    return a.ui.isOver(e + c, f + d, i, j, g, h)
                };
            a.each(d.sortables, function(f) {
                this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
                    return c.helper[0]
                }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
            })
        }
    }), a.ui.plugin.add("draggable", "cursor", {
        start: function(b, c) {
            var d = a("body"),
                e = a(this).data("draggable").options;
            d.css("cursor") && (e._cursor = d.css("cursor")), d.css("cursor", e.cursor)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._cursor && a("body").css("cursor", d._cursor)
        }
    }), a.ui.plugin.add("draggable", "opacity", {
        start: function(b, c) {
            var d = a(c.helper),
                e = a(this).data("draggable").options;
            d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._opacity && a(c.helper).css("opacity", d._opacity)
        }
    }), a.ui.plugin.add("draggable", "scroll", {
        start: function(b, c) {
            var d = a(this).data("draggable");
            d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML" && (d.overflowOffset = d.scrollParent.offset())
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = !1;
            if (d.scrollParent[0] != document && d.scrollParent[0].tagName != "HTML") {
                if (!e.axis || e.axis != "x") d.overflowOffset.top + d.scrollParent[0].offsetHeight - b.pageY < e.scrollSensitivity ? d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop + e.scrollSpeed : b.pageY - d.overflowOffset.top < e.scrollSensitivity && (d.scrollParent[0].scrollTop = f = d.scrollParent[0].scrollTop - e.scrollSpeed);
                if (!e.axis || e.axis != "y") d.overflowOffset.left + d.scrollParent[0].offsetWidth - b.pageX < e.scrollSensitivity ? d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft + e.scrollSpeed : b.pageX - d.overflowOffset.left < e.scrollSensitivity && (d.scrollParent[0].scrollLeft = f = d.scrollParent[0].scrollLeft - e.scrollSpeed)
            } else {
                if (!e.axis || e.axis != "x") b.pageY - a(document).scrollTop() < e.scrollSensitivity ? f = a(document).scrollTop(a(document).scrollTop() - e.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < e.scrollSensitivity && (f = a(document).scrollTop(a(document).scrollTop() + e.scrollSpeed));
                if (!e.axis || e.axis != "y") b.pageX - a(document).scrollLeft() < e.scrollSensitivity ? f = a(document).scrollLeft(a(document).scrollLeft() - e.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < e.scrollSensitivity && (f = a(document).scrollLeft(a(document).scrollLeft() + e.scrollSpeed))
            }
            f !== !1 && a.ui.ddmanager && !e.dropBehaviour && a.ui.ddmanager.prepareOffsets(d, b)
        }
    }), a.ui.plugin.add("draggable", "snap", {
        start: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options;
            d.snapElements = [], a(e.snap.constructor != String ? e.snap.items || ":data(draggable)" : e.snap).each(function() {
                var b = a(this),
                    c = b.offset();
                this != d.element[0] && d.snapElements.push({
                    item: this,
                    width: b.outerWidth(),
                    height: b.outerHeight(),
                    top: c.top,
                    left: c.left
                })
            })
        },
        drag: function(b, c) {
            var d = a(this).data("draggable"),
                e = d.options,
                f = e.snapTolerance,
                g = c.offset.left,
                h = g + d.helperProportions.width,
                i = c.offset.top,
                j = i + d.helperProportions.height;
            for (var k = d.snapElements.length - 1; k >= 0; k--) {
                var l = d.snapElements[k].left,
                    m = l + d.snapElements[k].width,
                    n = d.snapElements[k].top,
                    o = n + d.snapElements[k].height;
                if (!(l - f < g && g < m + f && n - f < i && i < o + f || l - f < g && g < m + f && n - f < j && j < o + f || l - f < h && h < m + f && n - f < i && i < o + f || l - f < h && h < m + f && n - f < j && j < o + f)) {
                    d.snapElements[k].snapping && d.options.snap.release && d.options.snap.release.call(d.element, b, a.extend(d._uiHash(), {
                        snapItem: d.snapElements[k].item
                    })), d.snapElements[k].snapping = !1;
                    continue
                }
                if (e.snapMode != "inner") {
                    var p = Math.abs(n - j) <= f,
                        q = Math.abs(o - i) <= f,
                        r = Math.abs(l - h) <= f,
                        s = Math.abs(m - g) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                        top: o,
                        left: 0
                    }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l - d.helperProportions.width
                    }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m
                    }).left - d.margins.left)
                }
                var t = p || q || r || s;
                if (e.snapMode != "outer") {
                    var p = Math.abs(n - i) <= f,
                        q = Math.abs(o - j) <= f,
                        r = Math.abs(l - g) <= f,
                        s = Math.abs(m - h) <= f;
                    p && (c.position.top = d._convertPositionTo("relative", {
                        top: n,
                        left: 0
                    }).top - d.margins.top), q && (c.position.top = d._convertPositionTo("relative", {
                        top: o - d.helperProportions.height,
                        left: 0
                    }).top - d.margins.top), r && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: l
                    }).left - d.margins.left), s && (c.position.left = d._convertPositionTo("relative", {
                        top: 0,
                        left: m - d.helperProportions.width
                    }).left - d.margins.left)
                }!d.snapElements[k].snapping && (p || q || r || s || t) && d.options.snap.snap && d.options.snap.snap.call(d.element, b, a.extend(d._uiHash(), {
                    snapItem: d.snapElements[k].item
                })), d.snapElements[k].snapping = p || q || r || s || t
            }
        }
    }), a.ui.plugin.add("draggable", "stack", {
        start: function(b, c) {
            var d = a(this).data("draggable").options,
                e = a.makeArray(a(d.stack)).sort(function(b, c) {
                    return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
                });
            if ( !! e.length) {
                var f = parseInt(e[0].style.zIndex) || 0;
                a(e).each(function(a) {
                    this.style.zIndex = f + a
                }), this[0].style.zIndex = f + e.length
            }
        }
    }), a.ui.plugin.add("draggable", "zIndex", {
        start: function(b, c) {
            var d = a(c.helper),
                e = a(this).data("draggable").options;
            d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
        },
        stop: function(b, c) {
            var d = a(this).data("draggable").options;
            d._zIndex && a(c.helper).css("zIndex", d._zIndex)
        }
    })
}(jQuery),
function(a, b) {
    a.widget("ui.resizable", a.ui.mouse, {
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 1e3
        },
        _create: function() {
            var b = this,
                c = this.options;
            this.element.addClass("ui-resizable"), a.extend(this, {
                _aspectRatio: !! c.aspectRatio,
                aspectRatio: c.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: c.helper || c.ghost || c.animate ? c.helper || "ui-resizable-helper" : null
            }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })), this.element = this.element.parent().data("resizable", this.element.data("resizable")), this.elementIsWrapper = !0, this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }), this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })), this.originalElement.css({
                margin: this.originalElement.css("margin")
            }), this._proportionallyResize()), this.handles = c.handles || (a(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se");
            if (this.handles.constructor == String) {
                this.handles == "all" && (this.handles = "n,e,s,w,se,sw,ne,nw");
                var d = this.handles.split(",");
                this.handles = {};
                for (var e = 0; e < d.length; e++) {
                    var f = a.trim(d[e]),
                        g = "ui-resizable-" + f,
                        h = a('<div class="ui-resizable-handle ' + g + '"></div>');
                    /sw|se|ne|nw/.test(f) && h.css({
                        zIndex: ++c.zIndex
                    }), "se" == f && h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[f] = ".ui-resizable-" + f, this.element.append(h)
                }
            }
            this._renderAxis = function(b) {
                b = b || this.element;
                for (var c in this.handles) {
                    this.handles[c].constructor == String && (this.handles[c] = a(this.handles[c], this.element).show());
                    if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {
                        var d = a(this.handles[c], this.element),
                            e = 0;
                        e = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth();
                        var f = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join("");
                        b.css(f, e), this._proportionallyResize()
                    }
                    if (!a(this.handles[c]).length) continue
                }
            }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
                if (!b.resizing) {
                    if (this.className) var a = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
                    b.axis = a && a[1] ? a[1] : "se"
                }
            }), c.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").hover(function() {
                c.disabled || (a(this).removeClass("ui-resizable-autohide"), b._handles.show())
            }, function() {
                c.disabled || b.resizing || (a(this).addClass("ui-resizable-autohide"), b._handles.hide())
            })), this._mouseInit()
        },
        destroy: function() {
            this._mouseDestroy();
            var b = function(b) {
                a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            if (this.elementIsWrapper) {
                b(this.element);
                var c = this.element;
                c.after(this.originalElement.css({
                    position: c.css("position"),
                    width: c.outerWidth(),
                    height: c.outerHeight(),
                    top: c.css("top"),
                    left: c.css("left")
                })).remove()
            }
            return this.originalElement.css("resize", this.originalResizeStyle), b(this.originalElement), this
        },
        _mouseCapture: function(b) {
            var c = !1;
            for (var d in this.handles) a(this.handles[d])[0] == b.target && (c = !0);
            return !this.options.disabled && c
        },
        _mouseStart: function(b) {
            var d = this.options,
                e = this.element.position(),
                f = this.element;
            this.resizing = !0, this.documentScroll = {
                top: a(document).scrollTop(),
                left: a(document).scrollLeft()
            }, (f.is(".ui-draggable") || /absolute/.test(f.css("position"))) && f.css({
                position: "absolute",
                top: e.top,
                left: e.left
            }), this._renderProxy();
            var g = c(this.helper.css("left")),
                h = c(this.helper.css("top"));
            d.containment && (g += a(d.containment).scrollLeft() || 0, h += a(d.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
                left: g,
                top: h
            }, this.size = this._helper ? {
                width: f.outerWidth(),
                height: f.outerHeight()
            } : {
                width: f.width(),
                height: f.height()
            }, this.originalSize = this._helper ? {
                width: f.outerWidth(),
                height: f.outerHeight()
            } : {
                width: f.width(),
                height: f.height()
            }, this.originalPosition = {
                left: g,
                top: h
            }, this.sizeDiff = {
                width: f.outerWidth() - f.width(),
                height: f.outerHeight() - f.height()
            }, this.originalMousePosition = {
                left: b.pageX,
                top: b.pageY
            }, this.aspectRatio = typeof d.aspectRatio == "number" ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            var i = a(".ui-resizable-" + this.axis).css("cursor");
            return a("body").css("cursor", i == "auto" ? this.axis + "-resize" : i), f.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
        },
        _mouseDrag: function(b) {
            var c = this.helper,
                d = this.options,
                e = {}, f = this,
                g = this.originalMousePosition,
                h = this.axis,
                i = b.pageX - g.left || 0,
                j = b.pageY - g.top || 0,
                k = this._change[h];
            if (!k) return !1;
            var l = k.apply(this, [b, i, j]),
                m = a.browser.msie && a.browser.version < 7,
                n = this.sizeDiff;
            this._updateVirtualBoundaries(b.shiftKey);
            if (this._aspectRatio || b.shiftKey) l = this._updateRatio(l, b);
            return l = this._respectSize(l, b), this._propagate("resize", b), c.css({
                top: this.position.top + "px",
                left: this.position.left + "px",
                width: this.size.width + "px",
                height: this.size.height + "px"
            }), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), this._updateCache(l), this._trigger("resize", b, this.ui()), !1
        },
        _mouseStop: function(b) {
            this.resizing = !1;
            var c = this.options,
                d = this;
            if (this._helper) {
                var e = this._proportionallyResizeElements,
                    f = e.length && /textarea/i.test(e[0].nodeName),
                    g = f && a.ui.hasScroll(e[0], "left") ? 0 : d.sizeDiff.height,
                    h = f ? 0 : d.sizeDiff.width,
                    i = {
                        width: d.helper.width() - h,
                        height: d.helper.height() - g
                    }, j = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
                    k = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
                c.animate || this.element.css(a.extend(i, {
                    top: k,
                    left: j
                })), d.helper.height(d.size.height), d.helper.width(d.size.width), this._helper && !c.animate && this._proportionallyResize()
            }
            return a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
        },
        _updateVirtualBoundaries: function(a) {
            var b = this.options,
                c, e, f, g, h;
            h = {
                minWidth: d(b.minWidth) ? b.minWidth : 0,
                maxWidth: d(b.maxWidth) ? b.maxWidth : Infinity,
                minHeight: d(b.minHeight) ? b.minHeight : 0,
                maxHeight: d(b.maxHeight) ? b.maxHeight : Infinity
            };
            if (this._aspectRatio || a) c = h.minHeight * this.aspectRatio, f = h.minWidth / this.aspectRatio, e = h.maxHeight * this.aspectRatio, g = h.maxWidth / this.aspectRatio, c > h.minWidth && (h.minWidth = c), f > h.minHeight && (h.minHeight = f), e < h.maxWidth && (h.maxWidth = e), g < h.maxHeight && (h.maxHeight = g);
            this._vBoundaries = h
        },
        _updateCache: function(a) {
            var b = this.options;
            this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width)
        },
        _updateRatio: function(a, b) {
            var c = this.options,
                e = this.position,
                f = this.size,
                g = this.axis;
            return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), g == "sw" && (a.left = e.left + (f.width - a.width), a.top = null), g == "nw" && (a.top = e.top + (f.height - a.height), a.left = e.left + (f.width - a.width)), a
        },
        _respectSize: function(a, b) {
            var c = this.helper,
                e = this._vBoundaries,
                f = this._aspectRatio || b.shiftKey,
                g = this.axis,
                h = d(a.width) && e.maxWidth && e.maxWidth < a.width,
                i = d(a.height) && e.maxHeight && e.maxHeight < a.height,
                j = d(a.width) && e.minWidth && e.minWidth > a.width,
                k = d(a.height) && e.minHeight && e.minHeight > a.height;
            j && (a.width = e.minWidth), k && (a.height = e.minHeight), h && (a.width = e.maxWidth), i && (a.height = e.maxHeight);
            var l = this.originalPosition.left + this.originalSize.width,
                m = this.position.top + this.size.height,
                n = /sw|nw|w/.test(g),
                o = /nw|ne|n/.test(g);
            j && n && (a.left = l - e.minWidth), h && n && (a.left = l - e.maxWidth), k && o && (a.top = m - e.minHeight), i && o && (a.top = m - e.maxHeight);
            var p = !a.width && !a.height;
            return p && !a.left && a.top ? a.top = null : p && !a.top && a.left && (a.left = null), a
        },
        _proportionallyResize: function() {
            var b = this.options;
            if ( !! this._proportionallyResizeElements.length) {
                var c = this.helper || this.element;
                for (var d = 0; d < this._proportionallyResizeElements.length; d++) {
                    var e = this._proportionallyResizeElements[d];
                    if (!this.borderDif) {
                        var f = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")],
                            g = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")];
                        this.borderDif = a.map(f, function(a, b) {
                            var c = parseInt(a, 10) || 0,
                                d = parseInt(g[b], 10) || 0;
                            return c + d
                        })
                    }
                    if (!(!a.browser.msie || !a(c).is(":hidden") && !a(c).parents(":hidden").length)) continue;
                    e.css({
                        height: c.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: c.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function() {
            var b = this.element,
                c = this.options;
            this.elementOffset = b.offset();
            if (this._helper) {
                this.helper = this.helper || a('<div style="overflow:hidden;"></div>');
                var d = a.browser.msie && a.browser.version < 7,
                    e = d ? 1 : 0,
                    f = d ? 2 : -1;
                this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() + f,
                    height: this.element.outerHeight() + f,
                    position: "absolute",
                    left: this.elementOffset.left - e + "px",
                    top: this.elementOffset.top - e + "px",
                    zIndex: ++c.zIndex
                }), this.helper.appendTo("body").disableSelection()
            } else this.helper = this.element
        },
        _change: {
            e: function(a, b, c) {
                return {
                    width: this.originalSize.width + b
                }
            },
            w: function(a, b, c) {
                var d = this.options,
                    e = this.originalSize,
                    f = this.originalPosition;
                return {
                    left: f.left + b,
                    width: e.width - b
                }
            },
            n: function(a, b, c) {
                var d = this.options,
                    e = this.originalSize,
                    f = this.originalPosition;
                return {
                    top: f.top + c,
                    height: e.height - c
                }
            },
            s: function(a, b, c) {
                return {
                    height: this.originalSize.height + c
                }
            },
            se: function(b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
            },
            sw: function(b, c, d) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
            },
            ne: function(b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
            },
            nw: function(b, c, d) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
            }
        },
        _propagate: function(b, c) {
            a.ui.plugin.call(this, b, [c, this.ui()]), b != "resize" && this._trigger(b, c, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }), a.extend(a.ui.resizable, {
        version: "1.8.18"
    }), a.ui.plugin.add("resizable", "alsoResize", {
        start: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = function(b) {
                    a(b).each(function() {
                        var b = a(this);
                        b.data("resizable-alsoresize", {
                            width: parseInt(b.width(), 10),
                            height: parseInt(b.height(), 10),
                            left: parseInt(b.css("left"), 10),
                            top: parseInt(b.css("top"), 10)
                        })
                    })
                };
            typeof e.alsoResize == "object" && !e.alsoResize.parentNode ? e.alsoResize.length ? (e.alsoResize = e.alsoResize[0], f(e.alsoResize)) : a.each(e.alsoResize, function(a) {
                f(a)
            }) : f(e.alsoResize)
        },
        resize: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = d.originalSize,
                g = d.originalPosition,
                h = {
                    height: d.size.height - f.height || 0,
                    width: d.size.width - f.width || 0,
                    top: d.position.top - g.top || 0,
                    left: d.position.left - g.left || 0
                }, i = function(b, d) {
                    a(b).each(function() {
                        var b = a(this),
                            e = a(this).data("resizable-alsoresize"),
                            f = {}, g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        a.each(g, function(a, b) {
                            var c = (e[b] || 0) + (h[b] || 0);
                            c && c >= 0 && (f[b] = c || null)
                        }), b.css(f)
                    })
                };
            typeof e.alsoResize == "object" && !e.alsoResize.nodeType ? a.each(e.alsoResize, function(a, b) {
                i(a, b)
            }) : i(e.alsoResize)
        },
        stop: function(b, c) {
            a(this).removeData("resizable-alsoresize")
        }
    }), a.ui.plugin.add("resizable", "animate", {
        stop: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = d._proportionallyResizeElements,
                g = f.length && /textarea/i.test(f[0].nodeName),
                h = g && a.ui.hasScroll(f[0], "left") ? 0 : d.sizeDiff.height,
                i = g ? 0 : d.sizeDiff.width,
                j = {
                    width: d.size.width - i,
                    height: d.size.height - h
                }, k = parseInt(d.element.css("left"), 10) + (d.position.left - d.originalPosition.left) || null,
                l = parseInt(d.element.css("top"), 10) + (d.position.top - d.originalPosition.top) || null;
            d.element.animate(a.extend(j, l && k ? {
                top: l,
                left: k
            } : {}), {
                duration: e.animateDuration,
                easing: e.animateEasing,
                step: function() {
                    var c = {
                        width: parseInt(d.element.css("width"), 10),
                        height: parseInt(d.element.css("height"), 10),
                        top: parseInt(d.element.css("top"), 10),
                        left: parseInt(d.element.css("left"), 10)
                    };
                    f && f.length && a(f[0]).css({
                        width: c.width,
                        height: c.height
                    }), d._updateCache(c), d._propagate("resize", b)
                }
            })
        }
    }), a.ui.plugin.add("resizable", "containment", {
        start: function(b, d) {
            var e = a(this).data("resizable"),
                f = e.options,
                g = e.element,
                h = f.containment,
                i = h instanceof a ? h.get(0) : /parent/.test(h) ? g.parent().get(0) : h;
            if ( !! i) {
                e.containerElement = a(i);
                if (/document/.test(h) || h == document) e.containerOffset = {
                    left: 0,
                    top: 0
                }, e.containerPosition = {
                    left: 0,
                    top: 0
                }, e.parentData = {
                    element: a(document),
                    left: 0,
                    top: 0,
                    width: a(document).width(),
                    height: a(document).height() || document.body.parentNode.scrollHeight
                };
                else {
                    var j = a(i),
                        k = [];
                    a(["Top", "Right", "Left", "Bottom"]).each(function(a, b) {
                        k[a] = c(j.css("padding" + b))
                    }), e.containerOffset = j.offset(), e.containerPosition = j.position(), e.containerSize = {
                        height: j.innerHeight() - k[3],
                        width: j.innerWidth() - k[1]
                    };
                    var l = e.containerOffset,
                        m = e.containerSize.height,
                        n = e.containerSize.width,
                        o = a.ui.hasScroll(i, "left") ? i.scrollWidth : n,
                        p = a.ui.hasScroll(i) ? i.scrollHeight : m;
                    e.parentData = {
                        element: i,
                        left: l.left,
                        top: l.top,
                        width: o,
                        height: p
                    }
                }
            }
        },
        resize: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = d.containerSize,
                g = d.containerOffset,
                h = d.size,
                i = d.position,
                j = d._aspectRatio || b.shiftKey,
                k = {
                    top: 0,
                    left: 0
                }, l = d.containerElement;
            l[0] != document && /static/.test(l.css("position")) && (k = g), i.left < (d._helper ? g.left : 0) && (d.size.width = d.size.width + (d._helper ? d.position.left - g.left : d.position.left - k.left), j && (d.size.height = d.size.width / e.aspectRatio), d.position.left = e.helper ? g.left : 0), i.top < (d._helper ? g.top : 0) && (d.size.height = d.size.height + (d._helper ? d.position.top - g.top : d.position.top), j && (d.size.width = d.size.height * e.aspectRatio), d.position.top = d._helper ? g.top : 0), d.offset.left = d.parentData.left + d.position.left, d.offset.top = d.parentData.top + d.position.top;
            var m = Math.abs((d._helper ? d.offset.left - k.left : d.offset.left - k.left) + d.sizeDiff.width),
                n = Math.abs((d._helper ? d.offset.top - k.top : d.offset.top - g.top) + d.sizeDiff.height),
                o = d.containerElement.get(0) == d.element.parent().get(0),
                p = /relative|absolute/.test(d.containerElement.css("position"));
            o && p && (m -= d.parentData.left), m + d.size.width >= d.parentData.width && (d.size.width = d.parentData.width - m, j && (d.size.height = d.size.width / d.aspectRatio)), n + d.size.height >= d.parentData.height && (d.size.height = d.parentData.height - n, j && (d.size.width = d.size.height * d.aspectRatio))
        },
        stop: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = d.position,
                g = d.containerOffset,
                h = d.containerPosition,
                i = d.containerElement,
                j = a(d.helper),
                k = j.offset(),
                l = j.outerWidth() - d.sizeDiff.width,
                m = j.outerHeight() - d.sizeDiff.height;
            d._helper && !e.animate && /relative/.test(i.css("position")) && a(this).css({
                left: k.left - h.left - g.left,
                width: l,
                height: m
            }), d._helper && !e.animate && /static/.test(i.css("position")) && a(this).css({
                left: k.left - h.left - g.left,
                width: l,
                height: m
            })
        }
    }), a.ui.plugin.add("resizable", "ghost", {
        start: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = d.size;
            d.ghost = d.originalElement.clone(), d.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: f.height,
                width: f.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass(typeof e.ghost == "string" ? e.ghost : ""), d.ghost.appendTo(d.helper)
        },
        resize: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options;
            d.ghost && d.ghost.css({
                position: "relative",
                height: d.size.height,
                width: d.size.width
            })
        },
        stop: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options;
            d.ghost && d.helper && d.helper.get(0).removeChild(d.ghost.get(0))
        }
    }), a.ui.plugin.add("resizable", "grid", {
        resize: function(b, c) {
            var d = a(this).data("resizable"),
                e = d.options,
                f = d.size,
                g = d.originalSize,
                h = d.originalPosition,
                i = d.axis,
                j = e._aspectRatio || b.shiftKey;
            e.grid = typeof e.grid == "number" ? [e.grid, e.grid] : e.grid;
            var k = Math.round((f.width - g.width) / (e.grid[0] || 1)) * (e.grid[0] || 1),
                l = Math.round((f.height - g.height) / (e.grid[1] || 1)) * (e.grid[1] || 1);
            /^(se|s|e)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l) : /^(ne)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l) : /^(sw)$/.test(i) ? (d.size.width = g.width + k, d.size.height = g.height + l, d.position.left = h.left - k) : (d.size.width = g.width + k, d.size.height = g.height + l, d.position.top = h.top - l, d.position.left = h.left - k)
        }
    });
    var c = function(a) {
        return parseInt(a, 10) || 0
    }, d = function(a) {
            return !isNaN(parseInt(a, 10))
        }
}(jQuery), define("drag_resize", function() {}), ! function(a) {
    function d() {
        a(b).parent().removeClass("open")
    }
    "use strict";
    var b = '[data-toggle="dropdown"]',
        c = function(b) {
            var c = a(b).on("click.dropdown.data-api", this.toggle);
            a("html").on("click.dropdown.data-api", function() {
                c.parent().removeClass("open")
            })
        };
    c.prototype = {
        constructor: c,
        toggle: function(b) {
            var c = a(this),
                e = c.attr("data-target"),
                f, g;
            return e || (e = c.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")), f = a(e), f.length || (f = c.parent()), g = f.hasClass("open"), d(), !g && f.toggleClass("open"), !1
        }
    }, a.fn.dropdown = function(b) {
        return this.each(function() {
            var d = a(this),
                e = d.data("dropdown");
            e || d.data("dropdown", e = new c(this)), typeof b == "string" && e[b].call(d)
        })
    }, a.fn.dropdown.Constructor = c, a(function() {
        a("html").on("click.dropdown.data-api", d), a("body").on("click.dropdown.data-api", b, c.prototype.toggle)
    })
}(window.jQuery), define("plugins/dropdown", function() {}), define("Audiee/Views.Timeline", ["jquery", "underscore", "backbone"], function(a, b, c) {
    return b.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    }, c.View.extend({
        el: a("#time-line"),
        template: b.template('<canvas width="{{ width }}" height="{{ height }}">Your browser does not support HTML5 canvas.</canvas>'),
        initialize: function() {
            b.bindAll(this, "render"), this.bind("Audiee:scroll", this.drawScale), this.bind("Audiee:zoomChange", this.drawScale), a(window).on("resize", this.render), this.render()
        },
        render: function() {
            var b = a(this.el),
                c = b.width(),
                d = b.height();
            return b.html(this.template({
                width: c,
                height: d
            })), this.drawScale(), this
        },
        drawScale: function() {
            var b = a(this.el),
                c = b.children("canvas")[0].getContext("2d"),
                d = b.width(),
                e = b.height(),
                f = 50,
                g = Audiee.Display.getIntervals(f),
                h = Audiee.Display.sec2px(g.interval),
                i = h / g.subdivision,
                j = Audiee.Views.Editor.scrollLeftOffset(),
                k = Audiee.Display.px2sec(j),
                l, m, n, o, p;
            c.fillStyle = "#444", c.font = "0.8em sans-serif", c.clearRect(0, 0, d, e), l = i - j % i;
            for (; l < d; l += i) c.fillRect(l, e, 1, -5);
            l = j > 0 ? h - j % h : 0, k += Audiee.Display.px2sec(l);
            for (; l < d; l += h) n = Math.floor(k / 60), o = Math.floor(k % 60), g.interval < 1 && (p = Math.round(k % 1 * 10) % 10), m = n + ":", m += o < 10 ? "0" + o : o, g.interval < 1 && (m += "," + p + "0"), c.fillRect(l, e, 1, -12), c.fillText(m, l, 13), k += g.interval
        }
    })
}),
function() {
    var a = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"],
        b = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,
        c = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,
        d = typeof location != "undefined" && location.href,
        e = d && location.protocol && location.protocol.replace(/\:/, ""),
        f = d && location.hostname,
        g = d && (location.port || undefined),
        h = [];
    define("text", [], function() {
        var i, j, k;
        return typeof window != "undefined" && window.navigator && window.document ? j = function(a, b) {
            var c = i.createXhr();
            c.open("GET", a, !0), c.onreadystatechange = function(a) {
                c.readyState === 4 && b(c.responseText)
            }, c.send(null)
        } : typeof process != "undefined" && process.versions && !! process.versions.node ? (k = require.nodeRequire("fs"), j = function(a, b) {
            var c = k.readFileSync(a, "utf8");
            c.indexOf("﻿") === 0 && (c = c.substring(1)), b(c)
        }) : typeof Packages != "undefined" && (j = function(a, b) {
            var c = "utf-8",
                d = new java.io.File(a),
                e = java.lang.System.getProperty("line.separator"),
                f = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d), c)),
                g, h, i = "";
            try {
                g = new java.lang.StringBuffer, h = f.readLine(), h && h.length() && h.charAt(0) === 65279 && (h = h.substring(1)), g.append(h);
                while ((h = f.readLine()) !== null) g.append(e), g.append(h);
                i = String(g.toString())
            } finally {
                f.close()
            }
            b(i)
        }), i = {
            version: "1.0.7",
            strip: function(a) {
                if (a) {
                    a = a.replace(b, "");
                    var d = a.match(c);
                    d && (a = d[1])
                } else a = "";
                return a
            },
            jsEscape: function(a) {
                return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r")
            },
            createXhr: function() {
                var b, c, d;
                if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                for (c = 0; c < 3; c++) {
                    d = a[c];
                    try {
                        b = new ActiveXObject(d)
                    } catch (e) {}
                    if (b) {
                        a = [d];
                        break
                    }
                }
                if (!b) throw new Error("createXhr(): XMLHttpRequest not available");
                return b
            },
            get: j,
            parseName: function(a) {
                var b = !1,
                    c = a.indexOf("."),
                    d = a.substring(0, c),
                    e = a.substring(c + 1, a.length);
                return c = e.indexOf("!"), c !== -1 && (b = e.substring(c + 1, e.length), b = b === "strip", e = e.substring(0, c)), {
                    moduleName: d,
                    ext: e,
                    strip: b
                }
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(a, b, c, d) {
                var e = i.xdRegExp.exec(a),
                    f, g, h;
                return e ? (f = e[2], g = e[3], g = g.split(":"), h = g[1], g = g[0], (!f || f === b) && (!g || g === c) && (!h && !g || h === d)) : !0
            },
            finishLoad: function(a, b, c, d, e) {
                c = b ? i.strip(c) : c, e.isBuild && (h[a] = c), d(c)
            },
            load: function(a, b, c, h) {
                if (h.isBuild && !h.inlineText) {
                    c();
                    return
                }
                var j = i.parseName(a),
                    k = j.moduleName + "." + j.ext,
                    l = b.toUrl(k),
                    m = h && h.text && h.text.useXhr || i.useXhr;
                !d || m(l, e, f, g) ? i.get(l, function(b) {
                    i.finishLoad(a, j.strip, b, c, h)
                }) : b([k], function(a) {
                    i.finishLoad(j.moduleName + "." + j.ext, j.strip, a, c, h)
                })
            },
            write: function(a, b, c, d) {
                if (b in h) {
                    var e = i.jsEscape(h[b]);
                    c.asModule(a + "!" + b, "define(function () { return '" + e + "';});\n")
                }
            },
            writeFile: function(a, b, c, d, e) {
                var f = i.parseName(b),
                    g = f.moduleName + "." + f.ext,
                    h = c.toUrl(f.moduleName + "." + f.ext) + ".js";
                i.load(g, c, function(b) {
                    var c = function(a) {
                        return d(h, a)
                    };
                    c.asModule = function(a, b) {
                        return d.asModule(a, h, b)
                    }, i.write(a, g, c, e)
                }, e)
            }
        }, i
    })
}(), define("text!templates/AlertModal.html", [], function() {
    return '<div class="modal" id="alertModal">\r\n    <div class="modal-header">\r\n        <a class="close" data-dismiss="modal">x</a>\r\n        <h3>Whoops</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n    <p>{{ message }}</p>\r\n  </div>\r\n  <div class="modal-footer">\r\n    <a href="#" class="btn" data-dismiss="modal">Close</a>\r\n  </div>\r\n</div>'
}), define("text!templates/EditableName.html", [], function() {
    return '<div class="display">\r\n    <label class="name-content">{{ name }}</label>\r\n</div>\r\n<div class="edit">\r\n    <input type="text" class="name-input" value="{{ name }}" placeholder="Enter new name">\r\n</div>'
}), define("text!templates/ContextMenu.html", [], function() {
    return '<ul class="dropdown-menu context-menu">\r\n    <li><a href="#" id="cm-rename"><i class="icon-pencil"></i> Rename</a></li>\r\n    <li><a href="#" id="cm-duplicate"><i class="icon-plus-sign"></i> Duplicate</a></li>\r\n    <li><a href="#" id="cm-remove"><i class="icon-trash"></i> Delete</a></li>\r\n    <li class="divider"></li>\r\n    <!-- <li><a href="#" id="cm-info"><i class="icon-info-sign"></i> Info</a></li>\r\n    <li class="divider"></li> -->\r\n    <li>\r\n        <span href="#" data-color="#ffed90" class="cm-color"></span>\r\n        <span href="#" data-color="#ffc48c" class="cm-color"></span>\r\n        <span href="#" data-color="#d1f2a5" class="cm-color"></span>\r\n        <span href="#" data-color="#78e7f0" class="cm-color"></span>\r\n        <span href="#" data-color="#f0bbfd" class="cm-color"></span>\r\n\r\n        <span href="#" data-color="#edc951" class="cm-color"></span>\r\n        <span href="#" data-color="#ff6b6b" class="cm-color"></span>\r\n        <span href="#" data-color="#c7f464" class="cm-color"></span>\r\n        <span href="#" data-color="#4ecdc4" class="cm-color"></span>\r\n        <span href="#" data-color="#e787fb" class="cm-color"></span>\r\n\r\n        <span href="#" data-color="#df9c26" class="cm-color"></span>\r\n        <span href="#" data-color="#eb6841" class="cm-color"></span>\r\n        <span href="#" data-color="#aee239" class="cm-color"></span>\r\n        <span href="#" data-color="#00a0b0" class="cm-color"></span>\r\n        <span href="#" data-color="#e538a6" class="cm-color"></span>\r\n\r\n        <span href="#" data-color="#d27c49" class="cm-color"></span>\r\n        <span href="#" data-color="#c44d58" class="cm-color"></span>\r\n        <span href="#" data-color="#8eab4d" class="cm-color"></span>\r\n        <span href="#" data-color="#2085d8" class="cm-color"></span>\r\n        <span href="#" data-color="#f32e5c" class="cm-color"></span>\r\n    </li>\r\n</ul>'
}), define("Audiee/Views.EditableName", ["underscore", "backbone", "text!templates/EditableName.html", "text!templates/ContextMenu.html"], function(a, b, c, d) {
    return a.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    }, b.View.extend({
        template: a.template(c),
        menu: a.template(d),
        initialize: function() {
            a.bindAll(this, "render", "close", "edit", "contextMenu", "keyupHandler"), this.model.bind("change:name", this.render), this.model.bind("change:color", this.render), $(this.el).on("keyup", ".name-input", this.keyupHandler).on("blur", ".name-input", this.close).on("contextmenu", ".display", this.contextMenu), this.render()
        },
        render: function() {
            return $(this.el).html(this.template({
                name: this.model.get("name")
            })), this.options.hasColor && $(this.el).css("background-color", this.model.get("color")), this.input = this.$(".name-input"), this
        },
        edit: function() {
            Audiee.Views.Menu.disableHotkeys(), $(this.el).addClass("editing"), this.input.focus().select()
        },
        keyupHandler: function(a) {
            a.which == 13 ? this.model.set({
                name: this.input.val()
            }) : a.which == 27 && this.close()
        },
        close: function() {
            this.input.val(this.model.get("name")), $(this.el).removeClass("editing"), Audiee.Views.Menu.enableHotkeys()
        },
        contextMenu: function(a) {
            a.preventDefault();
            if (this.options.hasColor && a.which == 3) {
                $("body").append(this.menu);
                var b = $("ul.context-menu"),
                    c = this;
                b.find("span.cm-color").each(function() {
                    $(this).css("background", $(this).data("color"))
                }), b.css({
                    top: a.clientY + "px",
                    left: a.clientX + "px"
                }).on("click", "#cm-rename", function() {
                    c.edit()
                }).on("click", "#cm-duplicate", function() {
                    c.model.duplicate()
                }).on("click", "#cm-remove", function() {
                    c.model.destroy()
                }).on("click", ".cm-color", function(a) {
                    c.model.set("color", a.target.dataset.color)
                }).on("click", "#cm-info", function() {
                    console.log("Info [sT:", c.model.get("startTime"), ", eT:", c.model.get("endTime"), ", l:", c.model.get("loop"), ", tP:", c.model.get("trackPos"), "]")
                }), $(document).on("click", function(a) {
                    b.remove()
                }).on("mousedown", ".clip-name", function(a) {
                    b.remove()
                })
            }
            return !1
        }
    })
}), define("Audiee/Views.Clip", ["jquery", "underscore", "backbone", "Audiee/Views.ClipDisplay", "Audiee/Views.EditableName", "drag_resize"], function(a, b, c, d, e) {
    return b.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g
    }, c.View.extend({
        tagName: "div",
        className: "clip",
        initialize: function() {
            b.bindAll(this, "render", "remove", "soundwaveRender", "positionRender", "updatePosition", "scrollChange", "_clipWidth"), this.model.bind("change:startTime", this.soundwaveRender), this.model.bind("change:endTime", this.soundwaveRender), this.model.bind("change:trackPos", this.positionRender), this.model.bind("destroy", this.remove), this.model.collection.bind("Audiee:zoomChange", this.render), this.model.collection.bind("Audiee:scroll", this.scrollChange), this.editableName = new e({
                model: this.model,
                className: "clip-name",
                hasColor: !0
            }), this.clipDisplay = new d({
                model: this.model
            }), a(this.el).draggable({
                addClasses: !1,
                axis: "x",
                containment: "parent",
                handle: "div.clip-name",
                cursor: "move",
                start: this.startMoving,
                drag: this.scrollChange,
                stop: this.updatePosition
            }).css("position", "absolute")
        },
        render: function() {
            var b = Audiee.Display.sec2px(this.model.get("trackPos")),
                c = this._clipWidth(),
                d = this;
            return a(this.el).children().detach().end().css("left", b + "px").width(c).resizable("destroy").append(this.editableName.el).append('<div class="ui-resizable-handle ui-resizable-w">').append('<div class="ui-resizable-handle ui-resizable-e">').append(this.clipDisplay.render(c).el).resizable({
                handles: {
                    w: ".ui-resizable-w",
                    e: ".ui-resizable-e"
                },
                containment: "parent",
                resize: function(a, b) {
                    var c = d.model.get("buffer").duration,
                        e = d.model.get("loop"),
                        f = d.model.clipLength(),
                        g, h, i;
                    Audiee.Views.Editor.movingOn(), b.originalPosition.left === b.position.left ? (h = (Audiee.Display.px2sec(b.size.width) + d.model.get("startTime")) % c, e += Math.floor((d.model.get("endTime") + Audiee.Display.px2sec(b.size.width) - f) / c)) : (g = Audiee.Display.px2sec(b.position.left) - d.model.get("trackPos"), d.model.get("trackPos") <= .05 ? g > 0 ? (g += d.model.get("startTime"), i = Audiee.Display.px2sec(b.position.left)) : (g = d.model.get("startTime"), i = 0) : (g += d.model.get("startTime"), i = Audiee.Display.px2sec(b.position.left)), g %= c, g = g < 0 ? c + g : g, e -= Math.floor((d.model.get("startTime") + i - d.model.get("trackPos")) / c)), d.model.set("loop", e), typeof i != "undefined" && d.model.set("trackPos", i), typeof g != "undefined" && d.model.set("startTime", g), typeof h != "undefined" && d.model.set("endTime", h)
                },
                stop: function() {
                    var b = d.model.get("trackPos"),
                        c = b + d.model.clipLength(),
                        e = a(d.el).parents(".track").data("cid");
                    Audiee.Views.Editor.movingOff(), Audiee.Collections.Tracks.deleteSelection(b, c, e, d.model.cid), d.soundwaveRender()
                }
            }), this.scrollChange(), this
        },
        remove: function() {
            a(this.el).remove()
        },
        soundwaveRender: function() {
            a(this.el).width(this._clipWidth()), this.clipDisplay.render(this._clipWidth())
        },
        positionRender: function() {
            var b = Audiee.Display.sec2px(this.model.get("trackPos"));
            a(this.el).css("left", b + "px")
        },
        startMoving: function() {
            Audiee.Views.Editor.movingOn()
        },
        updatePosition: function(b) {
            var c = Audiee.Display.px2sec(b.target.offsetLeft),
                d = c + this.model.clipLength(),
                e = a(this.el).parents(".track").data("cid");
            Audiee.Collections.Tracks.deleteSelection(c, d, e, this.model.cid), this.model.set("trackPos", c), Audiee.Views.Editor.movingOff()
        },
        scrollChange: function(b, c) {
            var d = Audiee.Views.Editor.scrollLeftOffset(),
                e = Audiee.Display.px2sec(d),
                f = typeof c != "undefined" ? Audiee.Display.px2sec(c.position.left) : this.model.get("trackPos"),
                g = this._clipWidth(),
                h = e - f;
            e > f && e < f + g ? a(this.editableName.el).css("padding-left", Audiee.Display.sec2px(h)).find(".name-content").text("..." + this.model.get("name")) : a(this.editableName.el).css("padding-left", 0).find(".name-content").text(this.model.get("name"))
        },
        _clipWidth: function() {
            return Audiee.Display.sec2px(this.model.clipLength())
        }
    })
}), define("Audiee/Views.Clips", ["jquery", "underscore", "backbone", "Audiee/Views.Clip"], function(a, b, c, d) {
    return c.View.extend({
        initialize: function() {
            b.bindAll(this, "render", "addAll", "addOne"), this.collection.bind("add", this.addOne)
        },
        render: function() {
            return this.addAll(), this
        },
        addAll: function() {
            this.collection.each(this.addOne)
        },
        addOne: function(b) {
            var c = new d({
                model: b
            });
            a(this.el).append(c.render().el), b.bind("remove", c.remove)
        }
    })
}), define("Audiee/Views.Track", ["underscore", "backbone", "Audiee/Views.EditableName", "Audiee/Views.TrackDisplay", "Audiee/Views.TrackControls", "Audiee/Views.Clips"], function(a, b, c, d, e, f) {
    return b.View.extend({
        tagName: "div",
        className: "track",
        initialize: function() {
            a.bindAll(this, "render", "remove", "zoomChange", "clearDisplay"), this.model.bind("destroy", this.remove), this.model.bind("Audiee:zoomChange", this.zoomChange), this.model.bind("Audiee:clearDisplay", this.clearDisplay)
        },
        render: function() {
            var a = Audiee.Views.Editor.scrollLeftOffset(),
                b = Audiee.Display.sec2px(this.model.get("length")),
                g = $('<div class="track-info">');
            return this.editableName = new c({
                model: this.model,
                className: "track-name",
                hasColor: !0
            }), this.trackDisplay = new d({
                model: this.model
            }), this.trackControls = new e({
                model: this.model
            }), g.append(this.editableName.el).append(this.trackControls.el), $(this.el).empty().width(b).attr("data-cid", this.model.cid).append(g).append(this.trackDisplay.el), g.css("left", a + "px"), (new f({
                collection: this.model.clips,
                el: $(".track-display", this.el)
            })).render(), this
        },
        remove: function() {
            $(this.el).remove()
        },
        zoomChange: function() {
            var a = Audiee.Display.sec2px(this.model.get("length"));
            $(this.el).width(a)
        },
        clearDisplay: function() {
            this.trackDisplay.clearDisplay()
        }
    })
}), define("Audiee/Views.Tracks", ["jquery", "underscore", "backbone", "Audiee/Views.Track"], function(a, b, c, d) {
    return c.View.extend({
        initialize: function() {
            b.bindAll(this, "render", "addAll", "addOne", "zoomChange", "scrollChange"), this.collection.bind("add", this.addOne), this.bind("Audiee:scroll", this.scrollChange), this.bind("Audiee:zoomChange", this.zoomChange)
        },
        render: function() {
            return this.addAll(), a(this.el).append('<div id="playback-position">'), this
        },
        addAll: function() {
            this.collection.each(this.addOne)
        },
        addOne: function(b) {
            var c = new d({
                model: b
            });
            a(this.el).append(c.render().el)
        },
        scrollChange: function() {
            var b = Audiee.Views.Editor.scrollLeftOffset();
            a("div.track-info").css("left", b + "px"), this.collection.each(function(a) {
                a.clips.trigger("Audiee:scroll")
            })
        },
        zoomChange: function() {
            this.collection.each(function(a) {
                a.trigger("Audiee:zoomChange"), a.clips.trigger("Audiee:zoomChange")
            })
        },
        clearDisplays: function() {
            this.collection.each(function(a) {
                a.trigger("Audiee:clearDisplay")
            })
        }
    })
}), define("text!templates/Menu.html", [], function() {
    return '<!-- <li class="dropdown">\r\n    <a href="#" class="dropdown-toggle" data-toggle="dropdown">File <b class="caret"></b></a>\r\n    <ul class="dropdown-menu">\r\n        <li><a href="#" id="m-new">New</a></li>\r\n        <li><a href="#" id="m-open">Open...</a></li>\r\n        <li class="divider"></li>\r\n        <li><a href="#" id="m-save">Save</a></li>\r\n        <li><a href="#" id="m-saveas">Save As...</a></li>\r\n    </ul>\r\n</li> -->\r\n<li class="dropdown">\r\n    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Edit <b class="caret"></b></a>\r\n    <ul class="dropdown-menu">\r\n        <!-- <li><a href="#" id="m-back">Back</a></li>\r\n        <li><a href="#" id="m-forward">Forward</a></li>\r\n        <li class="divider"></li> -->\r\n        <li><a href="#" id="m-cut">Cut <span class="shortcut">X</span></a></li>\r\n        <li><a href="#" id="m-copy">Copy <span class="shortcut">C</span></a></li>\r\n        <li><a href="#" id="m-paste">Paste <span class="shortcut">V</span></a></li>\r\n        <li><a href="#" id="m-split">Split <span class="shortcut">E</span></a></li>\r\n        <li class="divider"></li>\r\n        <li><a href="#" id="m-delete">Delete selection <span class="shortcut">Del</span></a></li>\r\n    </ul>\r\n</li>\r\n<li class="dropdown">\r\n    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Track <b class="caret"></b></a>\r\n    <ul class="dropdown-menu">\r\n        <li><a href="#" id="m-addtrack">Add... <span class="shortcut">N</span></a></li>\r\n        <li><a href="#" id="m-removetrack">Delete <span class="shortcut">Ctrl + Del</span></a></li>\r\n    </ul>\r\n</li>\r\n<li class="dropdown">\r\n    <a href="#" class="dropdown-toggle" data-toggle="dropdown">View <b class="caret"></b></a>\r\n    <ul class="dropdown-menu">\r\n        <li><a href="#" id="m-zoomin">Zoom in <span class="shortcut">+</span></a></li>\r\n        <li><a href="#" id="m-zoomout">Zoom out <span class="shortcut">-</span></a></li>\r\n        <li><a href="#" id="m-zoomzero">Normal <span class="shortcut">0</span></a></li>\r\n        <li class="divider"></li>\r\n        <li><a href="#" id="m-fullscreen">Toggle fullscreen <span class="shortcut">F</span></a></li>\r\n    </ul>\r\n</li>\r\n<li class="dropdown">\r\n    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Help <b class="caret"></b></a>\r\n    <ul class="dropdown-menu">\r\n        <li><a href="#" id="m-about">About Audiee</a></li>\r\n        <li><a href="#" id="m-help">Help</a></li>\r\n    </ul>\r\n</li>'
}), define("text!templates/NewtrackModal.html", [], function() {
    return '<div class="modal" id="newTrackModal">\r\n    <div class="modal-header">\r\n        <a class="close" data-dismiss="modal">x</a>\r\n        <h3>Add new track</h3>\r\n    </div>\r\n    <div class="modal-body">\r\n        <form>\r\n            <fieldset>\r\n            <div class="control-group">\r\n                <label class="control-label" for="file-name">Select the audio file</label>\r\n                <div class="controls">\r\n                    <input type="file" class="input-xlarge" id="file-name" accept="audio/*">\r\n                    <p class="help-block">WAV and MP3 formats are supported.</p>\r\n                </div>\r\n            </div>\r\n            </fieldset>\r\n        </form>\r\n        <div class="progress progress-striped progress-info active hide">\r\n            <div class="bar" style=""></div>\r\n        </div>\r\n    </div>\r\n</div>'
}), define("text!templates/InfoModal.html", [], function() {
    return '<div class="modal" id="infoModal">\r\n  <div class="modal-header">\r\n      <a class="close" data-dismiss="modal">x</a>\r\n      <h3>{{ title }}</h3>\r\n  </div>\r\n  <div class="modal-body">\r\n  {{ content }}\r\n  </div>\r\n  <div class="modal-footer">\r\n    <a href="#" class="btn" data-dismiss="modal">Close</a>\r\n  </div>\r\n</div>'
}), define("text!templates/AboutAudiee.html", [], function() {
    return '<p>This application has been created as bachelor\'s thesis at Brno University of Technology, Faculty of Information Technology.</p>\r\n\r\n<p>This version is more or less experimental and has only limited functionality.</p>\r\n\r\n<h4>Tools making this app cool:</h4>\r\n<ul>\r\n    <li><a href="http://www.w3.org/TR/webaudio/">Web Audio API</a>\r\n    <li><a href="http://twitter.github.com/bootstrap/">Twitter Bootstrap</a>\r\n    <li><a href="http://jquery.com/">jQuery</a>\r\n    <li><a href="http://backbonejs.org/">Backbone.js</a>\r\n    <li><a href="http://requirejs.org/">RequireJS</a>\r\n    <li><a href="http://lesscss.org/">LESS</a>\r\n</ul>\r\n<h4>Contact me:</h4>\r\n<ul>\r\n    <li>honza.myler@gmail.com\r\n    <li><a href="http://twitter.com/janmyler">@janmyler</a>\r\n</ul>\r\n\r\n<img class="audiee-logo" src="apple-touch-icon-114x114-precomposed.png" alt="Audiee logo">'
}), define("text!templates/HelpAudiee.html", [], function() {
    return '<p>For help please watch this short tutorial video.</p>\r\n<iframe width="640" height="360" src="http://www.youtube.com/embed/l67Jk9Vbms8?rel=0" frameborder="0" allowfullscreen></iframe>'
}), ! function(a) {
    function c() {
        var b = this,
            c = setTimeout(function() {
                b.$element.off(a.support.transition.end), d.call(b)
            }, 500);
        this.$element.one(a.support.transition.end, function() {
            clearTimeout(c), d.call(b)
        })
    }

    function d(a) {
        this.$element.hide().trigger("hidden"), e.call(this)
    }

    function e(b) {
        var c = this,
            d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(a.proxy(this.hide, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), e ? this.$backdrop.one(a.support.transition.end, b) : b()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, a.proxy(f, this)) : f.call(this)) : b && b()
    }

    function f() {
        this.$backdrop.remove(), this.$backdrop = null
    }

    function g() {
        var b = this;
        this.isShown && this.options.keyboard ? a(document).on("keyup.dismiss.modal", function(a) {
            a.which == 27 && b.hide()
        }) : this.isShown || a(document).off("keyup.dismiss.modal")
    }
    "use strict";
    var b = function(b, c) {
        this.options = a.extend({}, a.fn.modal.defaults, c), this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this))
    };
    b.prototype = {
        constructor: b,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]()
        },
        show: function() {
            var b = this;
            if (this.isShown) return;
            a("body").addClass("modal-open"), this.isShown = !0, this.$element.trigger("show"), g.call(this), e.call(this, function() {
                var c = a.support.transition && b.$element.hasClass("fade");
                !b.$element.parent().length && b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in"), c ? b.$element.one(a.support.transition.end, function() {
                    b.$element.trigger("shown")
                }) : b.$element.trigger("shown")
            })
        },
        hide: function(b) {
            b && b.preventDefault();
            if (!this.isShown) return;
            var e = this;
            this.isShown = !1, a("body").removeClass("modal-open"), g.call(this), this.$element.trigger("hide").removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? c.call(this) : d.call(this)
        }
    }, a.fn.modal = function(c) {
        return this.each(function() {
            var d = a(this),
                e = d.data("modal"),
                f = typeof c == "object" && c;
            e || d.data("modal", e = new b(this, f)), typeof c == "string" ? e[c]() : e.show()
        })
    }, a.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0
    }, a.fn.modal.Constructor = b, a(function() {
        a("body").on("click.modal.data-api", '[data-toggle="modal"]', function(b) {
            var c = a(this),
                d, e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")),
                f = e.data("modal") ? "toggle" : a.extend({}, e.data(), c.data());
            b.preventDefault(), e.modal(f)
        })
    })
}(window.jQuery), define("plugins/modal", function() {}), define("Audiee/Helpers.Player", ["jquery", "underscore", "backbone", "text!templates/AlertModal.html", "plugins/modal"], function(a, b, c, d) {
    return function() {
        function c() {
            if (typeof webkitAudioContext == "undefined" && typeof AudioContext == "undefined") {
                var c = b.template(d)({
                    message: "Your browser is not supported yet, try using Google Chrome."
                });
                a(c).modal()
            } else this.context = new webkitAudioContext || new AudioContext;
            this.nodes = [], this.gainNodes = {}, this.playing = !1, this.playbackFrom, this.playbackPositionInterval
        }
        return c.prototype.initTrack = function(a) {
            typeof this.gainNodes[a] == "undefined" && (this.gainNodes[a] = this.context.createGainNode(), this.gainNodes[a].connect(this.context.destination))
        }, c.prototype.releaseTrack = function(a) {
            this.gainNodes[a].disconnect(this.context.destination), delete this.gainNodes[a]
        }, c.prototype.play = function() {
            var a = this,
                b = this.context.currentTime;
            this.playbackFrom = b, Audiee.Views.Editor.isActiveTrack() && (this.playbackFrom -= Audiee.Views.Editor.getCursor()), this.playing && this.stop(), Audiee.Collections.Tracks.each(function(c) {
                var d = c.cid,
                    e = a.gainNodes[d];
                c.clips.each(function(c) {
                    var d = c.get("trackPos"),
                        f = c.get("startTime"),
                        g = c.get("endTime"),
                        h = c.get("loop"),
                        i = c.get("buffer").duration,
                        j = !1,
                        k = 0,
                        l, m;
                    if (Audiee.Views.Editor.isActiveTrack()) {
                        k = Audiee.Views.Editor.getCursor();
                        if (d + c.clipLength() <= k) return;
                        d < k && d + c.clipLength() > k && (f = (f + k - d) % i, h -= Math.floor((c.get("startTime") + k - d) / i), d = k, j = !0)
                    }
                    for (var n = 0; n <= h; ++n) l = a.context.createBufferSource(), a.nodes.push(l), l.buffer = c.get("buffer"), l.connect(e), h > 0 ? n === 0 ? (m = f, i -= m) : n === h ? (m = 0, i = g) : (m = 0, i = c.get("buffer").duration) : (m = f, j ? i = g - f : i = c.clipLength()), l.noteGrainOn(b + d - k, m, i), d += i
                })
            }), this.playing = !0, this.playbackPositionInterval = setInterval("Audiee.Player.updatePlaybackPosition(Audiee.Player.playbackFrom)", 50)
        }, c.prototype.stop = function() {
            if (this.playing) {
                for (var a = 0, b = this.nodes.length; a < b; ++a) this.nodes[a].noteOff(0);
                this.playing = !1
            } else Audiee.Views.Editor.unsetActiveTrack(), Audiee.Views.PlaybackControls.updateTime(), Audiee.Display.showPlaybackPosition(0);
            typeof this.playbackPositionInterval != "undefined" && clearInterval(this.playbackPositionInterval), Audiee.Display.hidePlaybackPosition()
        }, c.prototype.updatePlaybackPosition = function(b) {
            if (this.playing && typeof b != "undefined") {
                var c = this.context.currentTime - b;
                c >= Audiee.Collections.Tracks.first().get("length") ? a("#stop").trigger("click") : Audiee.Display.showPlaybackPosition(Audiee.Display.sec2px(c))
            } else Audiee.Display.hidePlaybackPosition()
        }, c.prototype.volumeChange = function(a, b) {
            this.gainNodes[b].gain.value = a
        }, c.prototype.loadFile = function(c, e) {
            var f = new FileReader,
                g = this;
            if (!c.type.match("audio.mp3") && !c.type.match("audio.wav")) throw "Unsupported file format!";
            f.onloadend = function(f) {
                if (f.target.readyState == FileReader.DONE) {
                    a(".progress").children().width("100%");
                    var h = function(b) {
                        a(e).trigger("Audiee:fileLoaded", [b, c])
                    }, i = function() {
                            var e = b.template(d)({
                                message: "Error while loading the file " + c.name + "."
                            }),
                                f = a(e);
                            f.on("hide", function() {
                                f.remove()
                            }).modal(), a("#newTrackModal").modal("hide")
                        };
                    g.context.decodeAudioData(f.target.result, h, i)
                }
            }, f.onprogress = function(b) {
                if (b.lengthComputable) {
                    $progress = a(".progress", "#newTrackModal"), $progress.hasClass("hide") && $progress.fadeIn("fast");
                    var c = Math.floor(b.loaded / b.total * 100);
                    $progress.children().width(c + "%")
                }
            }, f.readAsArrayBuffer(c)
        }, c
    }()
}), define("Audiee/Helpers.Display", ["jquery", "underscore", "backbone", "plugins/modal"], function(a, b, c, d) {
    return function() {
        function b() {
            this.zoomLevel = 1, this.scale = 20, this.subpixels = 5, this.playbackCursorFollowing = !0
        }
        return b.prototype.zoomOut = function() {
            this.zoomLevel * 1.5 < 60 && (this.zoomLevel *= 1.5)
        }, b.prototype.zoomIn = function() {
            this.zoomLevel / 1.5 > .005 && (this.zoomLevel /= 1.5)
        }, b.prototype.zoomZero = function() {
            this.zoomLevel = 1
        }, b.prototype.px2sec = function(a) {
            return a * this.zoomLevel / this.scale
        }, b.prototype.sec2px = function(a) {
            return a / this.zoomLevel * this.scale
        }, b.prototype.getIntervals = function(a) {
            var b = Math.ceil(this.px2sec(a * 100)),
                c;
            return b = b > 9e3 ? 120 : b > 6e3 ? 60 : b > 3e3 ? 30 : b > 1500 ? 20 : b > 800 ? 10 : b > 300 ? 5 : b > 150 ? 2 : b > 60 ? 1 : b > 30 ? .5 : b > 5 ? .2 : .1, c = b == 120 ? 4 : b == 60 ? 4 : b == 30 ? 3 : b == 20 ? 4 : b == 10 ? 4 : b == 5 ? 5 : b == 2 ? 4 : b == 1 ? 4 : b == .5 ? 5 : b == .2 ? 4 : 5, {
                interval: b,
                subdivision: c
            }
        }, b.prototype.getSubinterval = function(a) {}, b.prototype.frameRMS = function(a, b, c) {
            var d = 0;
            for (var e = 0; e < c; ++e) d += a[b + e] * a[b + e];
            return Math.sqrt(d / c)
        }, b.prototype.frameMax = function(a, b, c) {}, b.prototype.clearDisplay = function(a, b, c) {
            var d = a.getContext("2d");
            d.clearRect(b || 0, 0, c || a.width, a.height)
        }, b.prototype.drawSound = function(a, b, c, d) {
            var e = a.getContext("2d"),
                f = b.length / this.sec2px(b.duration) / this.subpixels,
                g = b.getChannelData(0),
                h = undefined,
                j = a.height / 2;
            val = 0, posX = 0, i = d * f * this.subpixels % b.length, b.numberOfChannels > 1 && (h = b.getChannelData(1)), e.fillStyle = "red", e.beginPath(), e.moveTo(posX, j);
            while (posX <= a.width) val = g[Math.floor(i)], i = (i + f) % b.length, e.lineTo(posX, val * j + j), i >= 0 && i <= f && (e.globalCompositeOperation = "destination-over", e.fillRect(posX, 0, 1, 10), e.fillRect(posX, a.height - 10, 1, 10), e.globalCompositeOperation = "source-over"), posX += 1 / this.subpixels;
            e.stroke()
        }, b.prototype.drawCursor = function(a, b) {
            var c = a.getContext("2d");
            b += .5, c.strokeStyle = "#ff8000", c.beginPath(), c.moveTo(b, 0), c.lineTo(b, a.height), c.stroke()
        }, b.prototype.drawSelection = function(a, b, c) {
            var d = a.getContext("2d");
            d.fillStyle = "rgba(0, 0, 0, 0.2)", d.fillRect(b, 0, c, a.height)
        }, b.prototype.showPlaybackPosition = function(b) {
            if (typeof b == "undefined") return;
            var c = a("#playback-position"),
                d = Audiee.Collections.Tracks.length,
                e = a(".track").height(),
                f = Audiee.Views.Editor.el.width(),
                g = Audiee.Views.Editor.el.scrollLeft();
            Audiee.Views.PlaybackControls.updateTime(this.px2sec(b)), b += 120, c.height(d * e).css("left", b + "px").show(), this.playbackCursorFollowing && (b > g + f || b < g) && Audiee.Views.Editor.el.scrollLeft(b - 120)
        }, b.prototype.hidePlaybackPosition = function() {
            a("#playback-position").hide()
        }, b
    }()
}), define("Audiee/Views.Menu", ["underscore", "backbone", "text!templates/Menu.html", "text!templates/NewtrackModal.html", "text!templates/AlertModal.html", "text!templates/InfoModal.html", "text!templates/AboutAudiee.html", "text!templates/HelpAudiee.html", "Audiee/Models.Track", "plugins/modal", "plugins/dropdown"], function(a, b, c, d, e, f, g, h, i) {
    return b.View.extend({
        el: $("#menu-view ul.nav"),
        template: a.template(c),
        events: {
            "click #m-addtrack": "addTrack",
            "click #m-removetrack": "removeTrack",
            "click #m-fullscreen": "toggleFullscreen",
            "click #m-zoomin": "zoomIn",
            "click #m-zoomout": "zoomOut",
            "click #m-zoomzero": "zoomZero",
            "click #m-copy": "copy",
            "click #m-cut": "cut",
            "click #m-paste": "paste",
            "click #m-delete": "delete",
            "click #m-split": "split",
            "click #m-about": "about",
            "click #m-help": "help"
        },
        initialize: function() {
            a.bindAll(this, "render", "_fileSelected", "_fileLoaded", "handleKey"), $(document).on("keyup", this.handleKey), this.enableHotkeys(), this.el.bind("Audiee:fileLoaded", this._fileLoaded), this.render()
        },
        render: function() {
            $(this.el).html(this.template())
        },
        handleKey: function(a) {
            if (!this.hotkeysEnabled) return;
            switch (a.which) {
                case 46:
                    a.ctrlKey ? $("#m-removetrack").trigger("click") : $("#m-delete").trigger("click");
                    break;
                case 78:
                    $("#m-addtrack").trigger("click");
                    break;
                case 107:
                case 191:
                    $("#m-zoomin").trigger("click");
                    break;
                case 109:
                case 187:
                    $("#m-zoomout").trigger("click");
                    break;
                case 48:
                case 96:
                    $("#m-zoomzero").trigger("click");
                    break;
                case 67:
                    $("#m-copy").trigger("click");
                    break;
                case 88:
                    $("#m-cut").trigger("click");
                    break;
                case 86:
                    $("#m-paste").trigger("click");
                    break;
                case 70:
                    $("#m-fullscreen").trigger("click");
                    break;
                case 69:
                    $("#m-split").trigger("click")
            }
        },
        addTrack: function() {
            var b = a.template(d)(),
                c = $(b);
            c.on("change", "#file-name", this._fileSelected).on("hide", function() {
                c.remove()
            }).modal()
        },
        removeTrack: function() {
            var a = Audiee.Views.Editor.getActiveTrack();
            typeof a != "undefined" && Audiee.Collections.Tracks.remove(a.data("cid"))
        },
        _fileSelected: function(b) {
            try {
                Audiee.Player.loadFile(b.target.files[0], this.el)
            } catch (b) {
                var c = a.template(e)({
                    message: b
                }),
                    d = $(c);
                d.on("hide", function() {
                    d.remove()
                }).modal(), $("#newTrackModal").modal("hide")
            }
        },
        _fileLoaded: function(a, b, c) {
            a.stopPropagation(), $("#newTrackModal").modal("hide");
            var d = "Track " + Audiee.Collections.Tracks.getIndexCount();
            track = new i({
                buffer: b,
                file: c,
                name: d
            }), Audiee.Collections.Tracks.add(track)
        },
        zoomIn: function() {
            Audiee.Display.zoomIn(), Audiee.Views.Tracks.trigger("Audiee:zoomChange"), Audiee.Views.Timeline.trigger("Audiee:zoomChange")
        },
        zoomOut: function() {
            Audiee.Display.zoomOut(), Audiee.Views.Tracks.trigger("Audiee:zoomChange"), Audiee.Views.Timeline.trigger("Audiee:zoomChange")
        },
        zoomZero: function() {
            Audiee.Display.zoomZero(), Audiee.Views.Tracks.trigger("Audiee:zoomChange"), Audiee.Views.Timeline.trigger("Audiee:zoomChange")
        },
        toggleFullscreen: function() {
            var a = $("html");
            a.hasClass("fullscreen") ? document.webkitCancelFullScreen() : a[0].webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT), a.toggleClass("fullscreen")
        },
        copy: function() {
            Audiee.Views.Editor.setClipboard()
        },
        cut: function() {
            Audiee.Views.Editor.setClipboard(), this.delete()
        },
        paste: function() {
            Audiee.Views.Editor.pasteClipboard()
        },
        split: function() {
            Audiee.Views.Editor.splitClip()
        },
        "delete": function() {
            Audiee.Views.Editor.deleteSelection()
        },
        enableHotkeys: function() {
            this.hotkeysEnabled = !0
        },
        disableHotkeys: function() {
            this.hotkeysEnabled = !1
        },
        about: function() {
            var b = a.template(f)({
                title: "About Audiee",
                content: g
            }),
                c = $(b);
            c.on("hide", function() {
                c.remove()
            }).modal()
        },
        help: function() {
            var b = a.template(f)({
                title: "Audiee Help",
                content: h
            }),
                c = $(b);
            c.on("hide", function() {
                c.remove()
            }).width(680).css("max-height", "530px").modal()
        }
    })
}), define("app", ["require", "jquery", "underscore", "backbone", "Audiee/Helpers.Player", "Audiee/Helpers.Display", "Audiee/Models.Project", "Audiee/Collections.Tracks", "Audiee/Views.PlaybackControls", "Audiee/Views.EditableName", "Audiee/Views.Editor", "Audiee/Views.Tracks", "Audiee/Views.Menu", "Audiee/Views.Timeline", "text!templates/AlertModal.html", "plugins/modal"], function(a) {
    var b = a("jquery"),
        c = a("underscore"),
        d = a("backbone"),
        e = a("Audiee/Helpers.Player"),
        f = a("Audiee/Helpers.Display"),
        g = a("Audiee/Models.Project"),
        h = a("Audiee/Collections.Tracks"),
        i = a("Audiee/Views.PlaybackControls"),
        j = a("Audiee/Views.EditableName"),
        k = a("Audiee/Views.Editor"),
        l = a("Audiee/Views.Tracks"),
        m = a("Audiee/Views.Menu"),
        n = a("Audiee/Views.Timeline"),
        o = a("text!templates/AlertModal.html");
    a("plugins/modal");
    var p = {
        Collections: {},
        Models: {},
        Views: {}
    };
    p.Display = new f, p.Player = new e;
    var q = function() {
        window.Audiee = p, p.Collections.Tracks = new h, p.Models.Project = new g, p.Views.Editor = new k({
            model: p.Models.Project
        }), p.Views.Timeline = new n, p.Views.Tracks = (new l({
            collection: p.Collections.Tracks,
            el: "#tracks"
        })).render(), new j({
            model: p.Models.Project,
            el: "#project-name",
            hasColor: !1
        }), p.Views.PlaybackControls = new i({
            model: p.Models.Project
        });
        if (typeof webkitAudioContext != "undefined" || typeof AudioContext != "undefined") p.Views.Menu = new m;
        window.onbeforeunload = function(a) {
            return a = a || window.event, a && (a.returnValue = "By leaving this page, all changes will be lost."), "By leaving this page, all changes will be lost."
        }
    };
    return {
        initialize: q
    }
}), require.config({
    paths: {
        jquery: "js/jquery.min",
        drag_resize: "js/jquery-ui-custom.min",
        underscore: "js/underscore-min",
        backbone: "js/backbone-min",
        text: "js/text",
        order: "js/order",
        plugins: "js/bootstrap"
    }
}), require(["app"], function(a) {
    a.initialize()
}), define("main", function() {})