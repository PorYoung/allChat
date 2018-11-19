/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "ff6ae792da55e574c974";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		2: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./build/src/component/allChat/allChat.js",3,4]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/src/component/allChat/allChat.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(_, $) {\n\n__webpack_require__(\"./node_modules/_bootstrap@4.1.3@bootstrap/dist/css/bootstrap.min.css\");\n\n__webpack_require__(\"./node_modules/_bootstrap@4.1.3@bootstrap/dist/js/bootstrap.min.js\");\n\n__webpack_require__(\"./build/src/lib/font-awesome-4.7.0/css/font-awesome.min.css\");\n\n__webpack_require__(\"./build/src/lib/csrfAjax.js\");\n\n__webpack_require__(\"./build/src/component/allChat/allChat.less\");\n\n// var $ = require('jquery');\nvar config = {\n  userinfo: {},\n  socket: {\n    room: 'default',\n    onlineCount: 0,\n    max: 999,\n    id: null\n  }\n};\nvar socketClient = __webpack_require__(\"./node_modules/_socket.io-client@2.1.1@socket.io-client/lib/index.js\");\nvar allChat = socketClient('http://10.129.13.253:7001/allChat', {\n  query: {\n    room: config.socket.room\n  },\n\n  transports: ['websocket']\n});\n\n//修改模板冲突\n_.templateSettings = {\n  evaluate: /\\<\\{(.+?)\\}\\>/g,\n  interpolate: /\\<\\{=(.+?)\\}\\>/g\n};\n\n//定义函数：私发事件，将占位符添加到输入框\n//安全问题：需要对各id做合法性判断\n// <\\/input>\nvar privateMessageReg = new RegExp(/<input id=\\\"privatePlaceHolder\\\".*(data-userid).*(data-username).*(data-socketid)(([\\s\\S])*?)>/);\nvar sendPrivateMessage = function sendPrivateMessage() {\n  var ele = $(this);\n  var socketid = ele.data('socketid');\n  var userid = ele.data('userid');\n  var username = ele.data('username');\n  if ($('#privatePlaceHolder')[0]) {\n    $('#privatePlaceHolder').remove();\n  }\n  var html = $(\"#inputText\").html();\n  $(\"#inputText\").html('').focus().html(('<input id=\"privatePlaceHolder\" data-userid=\"' + userid + '\" data-username=\"' + username + '\" data-socketid=\"' + socketid + '\" value=\"To ' + username + ' [ID:' + userid + ']:\" disabled>').concat(html));\n};\n\n//定义函数：显示通知框\nvar showNotification = function showNotification(text) {\n  $('#notification').html(text).show('fast');\n  setTimeout(function () {\n    $('#notification').html('').hide('fast');\n  }, 3000);\n};\n\n//定义行数：显示系统提示\nvar infoBoxCompiled = function infoBoxCompiled(info) {\n  var boxStyle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'mini';\n\n  var infoBox = '';\n  if (boxStyle == 'mini') {\n    infoBox = '<div class=\"message-info-mini\"><div class=\"content\"><{= info.content }></div></div>';\n  } else if (boxStyle == 'Warning') {\n    infoBox = '<div class=\"message-info WarningInfo\" id=\"first\"><div class=\"message-info-arrow\"></div><div class=\"titleContainer\"><h3><{= info.type }></h3></div><div class=\"mainContainer\"><p><{= info.content }></p></div></div>';\n  } else {\n    infoBox = '<div class=\"message-info\" id=\"first\"><div class=\"message-info-arrow\"></div><div class=\"titleContainer\"><h3><{= info.type }></h3></div><div class=\"mainContainer\"><p><{= info.content }></p></div></div>';\n  }\n  var compiled = _.template(infoBox);\n  compiled = compiled({\n    info: info\n  });\n  $(\"#listPanel\").append(compiled);\n};\n\n//定义函数：使用消息模板\nvar messageBoxCompiled = function messageBoxCompiled(msg) {\n  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : \"left\";\n  var insertTo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : \"append\";\n\n  /*  var messageBox = !!msg.type && msg.type == \"image\" ? '<div class=\"message-list message-list-left\"><img src=\"<{= msg.avatar }>\" class=\"avatar\"/><em class=\"list-group-item-heading\"><{= msg.from.username }></em> <div class=\"list-group-item\"> <i style=\"position: absolute\" class=\"fa fa-menu-left\"></i><p class=\"list-group-item-text\"><img src=\"<{= msg.mediaId }>\" data-imgurl=\"<{= msg.mediaId }>\" class=\"weixinServerImage weixinServerImageActive\"></p></div></div>' : '<div class=\"message-list message-list-left\"><img src=\"<{= msg.avatar }>\" class=\"avatar\"/><em class=\"list-group-item-heading\"><{= msg.from.username }></em> <div class=\"list-group-item\"> <i style=\"position: absolute\" class=\"fa fa-menu-left\"></i> <p class=\"list-group-item-text\"><{= msg.content }></p></div></div>' */\n  var messageBox = '<div class=\"message-list message-list-left\"><div class=\"list-group-header\" title=\"<{= msg.from.userid }>\"><img src=\"<{= msg.from.avatar }>\" class=\"avatar\"/><em class=\"list-group-item-heading\"><{= msg.from.username }></em> </div> <div class=\"list-group-item\"> <i style=\"position: absolute\" class=\"fa fa-menu-left\"></i> <p class=\"list-group-item-text\"><{= msg.content }></p></div></div>';\n  if (msg.to) {\n    var messageBox = '<div class=\"message-list message-list-left\"><div class=\"list-group-header\" title=\"<{= msg.from.userid }>\"><img src=\"<{= msg.from.avatar }>\" class=\"avatar\"/><em class=\"list-group-item-heading\"><{= msg.from.username }></em> </div> <div class=\"list-group-item\"> <i style=\"position: absolute\" class=\"fa fa-menu-left\"></i> <p class=\"list-group-item-text\"><input class=\"privateMessageTip\" value=\"To <{= msg.to.username }> [ID:<{= msg.to.userid }>]:\" disabled><br><{= msg.content }></p></div></div>';\n  }\n  // <input id=\"privatePlaceHolder\" data-userid=\"${userid}\" data-username=\"${username}\" data-socketid=\"${socketid}\" value=\"To ${username} [ID:${userid}]:\" disabled></input>\n  if (position === \"right\") {\n    //右\n    messageBox = messageBox.replace(/left/g, \"right\").replace(/(<img.+\\/>)(<em.+<\\/em>)/, \"$2$1\");\n  }\n  var compiled = _.template(messageBox);\n  compiled = compiled({\n    msg: msg\n  });\n  if (insertTo == 'prepend') {\n    $(\"#listPanel\").prepend(compiled);\n  } else {\n    $(\"#listPanel\").append(compiled);\n  }\n};\n\n//消息页面滚动\nvar scrollToBottom = function scrollToBottom() {\n  var scrollHeight = $(\"#listPanel\")[0].scrollHeight - $(\"#listPanel\")[0].clientHeight;\n  $(\"#listPanel\").animate({\n    scrollTop: scrollHeight\n  }, 300);\n};\n\n//parse socket message recieved\nvar getPayloadFromMsg = function getPayloadFromMsg(msg) {\n  return msg.data.payload;\n};\n\nvar roomOnlineUserBoxTemplate = function roomOnlineUserBoxTemplate(userinfo) {\n  var userDetailBox = '\\n    <div class=\"user-content-userid\">\\n      <span class=\"fa fa-user-circle-o\" title=\"UserID\"></span><i>' + userinfo.userid + '</i>\\n    </div>\\n    <div class=\"user-content-ipAdress\">\\n      <span class=\"fa fa-map-marker\" title=\"IP Address\"></span><i>' + userinfo.ipAddress + '</i>\\n    </div>';\n  if (userinfo.userid != config.userinfo.userid) {\n    // onclick=\"sendPrivateMessage();\"\n    userDetailBox = userDetailBox.concat('\\n    <div class=\"sendPrivateMessageBtn\" id=\"sendPrivateMessageBtn-' + userinfo.userid + '\" data-username=\"' + userinfo.username + '\" data-userid=\"' + userinfo.userid + '\" data-socketid=\"' + userinfo.socketid + '\"} >\\n      <span class=\"fa fa-commenting-o\" title=\"\\u53D1\\u79C1\\u4FE1\"></span><i>\\u53D1\\u79C1\\u4FE1</i>\\n    </div>');\n  }\n  var userBox = '<div class=\"card user-list-item\" data-socktid=\"' + userinfo.socketid + '\" data-userid=\"' + userinfo.userid + '\">\\n    <div class=\"card-header user-list-header\" id=\"user-' + userinfo.userid + '-btn\">\\n      <img src=\"' + userinfo.avatar + '\" class=\"user-list-avatar\">\\n      <button class=\"btn btn-link user-list-username\" data-toggle=\"collapse\" data-target=\"#user-' + userinfo.userid + '-content\" aria-expanded=\"true\" aria-controls=\"user-' + userinfo.userid + '-content\">\\n          ' + userinfo.username + '\\n      </button>\\n    </div>\\n    <div id=\"user-' + userinfo.userid + '-content\" class=\"user-list-content collapse ' + (userinfo.show ? 'show' : '') + '\" aria-labelledby=\"user-' + userinfo.userid + '-btn\" data-parent=\"' + (userinfo.collapseParent || '') + '\">\\n        <div class=\"card-body\" id=\"user-' + userinfo.userid + '-list\">\\n            ' + userDetailBox + '\\n        </div>\\n    </div>\\n  </div>';\n  return userBox;\n};\n//手风琴一级菜单模板\nvar roomCardBoxCompiled = function roomCardBoxCompiled(cardinfo) {\n  var users = cardinfo.onlineUsers;\n  var onlineUserBoxs = [];\n  users.forEach(function (user) {\n    onlineUserBoxs.push(roomOnlineUserBoxTemplate(user));\n  });\n  var cardBox = '<div class=\"card\" id=\"room-' + cardinfo.room + '\">\\n    <div class=\"card-header\" id=\"room-' + cardinfo.room + '-btn\">\\n        <h5 class=\"mb-0\">\\n            <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#room-' + cardinfo.room + '-content\" aria-expanded=\"true\"\\n                aria-controls=\"room-' + cardinfo.room + '-content\">\\n                ' + cardinfo.room + '\\n            </button>\\n            <i class=\"card-tips room-online-count\" data-room=\"' + cardinfo.room + '\">' + cardinfo.onlineCount + '</i>\\n             / \\n            <i class=\"card-tips room-online-max\" data-room=\"' + cardinfo.room + '\">' + cardinfo.max + '</i>\\n        </h5>\\n    </div>\\n\\n    <div id=\"room-' + cardinfo.room + '-content\" class=\"collapse ' + (cardinfo.show ? 'show' : '') + '\" aria-labelledby=\"room-' + cardinfo.room + '-btn\" data-parent=\"' + (cardinfo.collapseParent || '') + '\">\\n        <div class=\"card-body\" id=\"room-' + cardinfo.room + '-list\">\\n            ' + onlineUserBoxs.join('') + '\\n        </div>\\n    </div>\\n  </div>';\n  var compiled = _.template(cardBox);\n  compiled = compiled({\n    cardinfo: cardinfo\n  });\n  if ($('#room-' + cardinfo.room)[0]) {\n    $('#room-' + cardinfo.room).replaceWith(compiled);\n  } else {\n    $(\"#accordion\").append(compiled);\n  }\n  //绑定发送私信事件\n  $('.sendPrivateMessageBtn').off().on('click', sendPrivateMessage);\n};\n//二级菜单模板-在线用户列表\nvar roomOnlineUserBoxCompiled = function roomOnlineUserBoxCompiled(userinfo) {\n  var userBox = roomOnlineUserBoxTemplate(userinfo);\n  var compiled = _.template(userBox);\n  compiled = compiled({\n    userinfo: userinfo\n  });\n  if ($('.user-list-item[data-userid=\"' + userinfo.userid + '\"]')[0]) {\n    $('.user-list-item[data-userid=\"' + userinfo.userid + '\"]').replaceWith(compiled);\n  } else {\n    $('#room-' + userinfo.room + '-list').append(compiled);\n  }\n  //绑定事件\n  $('.sendPrivateMessageBtn[id=\"sendPrivateMessageBtn-' + userinfo.userid + '\"]').off().on('click', sendPrivateMessage);\n};\n\n//get user info\n$.get('/allChat/getUserinfo?room=' + config.socket.room, function (data) {\n  if (data && data != -1) {\n    //定义函数：加载消息\n    var loadMessage = function loadMessage(page, callback) {\n      $.get(\"/allChat/getMessage\", {\n        \"page\": page\n      }, function (data) {\n        if (data == \"-1\") {\n          loadMessageFlag = 2;\n        } else {\n          data.forEach(function (msg) {\n            if (msg.from.userid == config.userinfo.userid) {\n              messageBoxCompiled(msg, 'right', 'prepend');\n            } else {\n              messageBoxCompiled(msg, 'left', 'prepend');\n            }\n          });\n          /*  var compiled = _.template($(\"#message-template\").html());\r\n           $(\"#listPanel\").prepend(compiled({\r\n             data\r\n           })); */\n          loadMessageFlag = 1;\n        }\n        callback && callback();\n      });\n    };\n    //初始化读取第page=0页\n\n\n    Object.assign(config.userinfo, data);\n    //get history message\n    //读取allChat消息\n    //0未加载 1加载完成 2无更多消息\n    var loadMessageFlag = 0;var page = 0;\n    loadMessage(page, function () {\n      loadMessageFlag = 0;\n      scrollToBottom();\n    });\n    //定义函数：touch事件\n    var myTouchEvent = function myTouchEvent() {\n      var swip_time = 300,\n          swip_dis = 30,\n          point_start,\n          point_end,\n          time_start,\n          time_end,\n\n      //1 上 2 右 3 下 4左\n      result;\n      if (\"ontouchstart\" in window) {\n        var startEvt = \"touchstart\",\n            moveEvt = \"touchmove\",\n            endEvt = \"touchend\";\n      } else {\n        var startEvt = \"mousedown\",\n            moveEvt = \"mousemove\",\n            endEvt = \"mouseup\";\n      }\n      var getPos = function getPos(e) {\n        var touches = e.touches;\n        if (touches && touches[0]) {\n          return {\n            x: touches[0].clientX,\n            y: touches[0].clientY\n          };\n        }\n        return {\n          x: e.clientX,\n          y: e.clientY\n        };\n      };\n      var getDistance = function getDistance(p1, p2) {\n        return parseInt(Math.sqrt(Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p1.y - p2.y), 2)));\n      };\n      var getDirection = function getDirection(p1, p2) {\n        var angle = Math.atan2(p1.y - p2.y, p2.x - p1.x) * 180 / Math.PI;\n        if (angle <= 45 && angle >= -45) return \"right\";\n        if (angle >= 45 && angle <= 135) return \"up\";\n        if (angle >= 135 || angle <= -135) return \"left\";\n        if (angle <= -45 && angle >= -135) return \"down\";\n      };\n      var startEvtHandle = function startEvtHandle(e) {\n        var pos = getPos(e);\n        var touches = e.touches;\n        if (!touches || touches.length == 1) {\n          point_start = getPos(e);\n          time_start = new Date().getTime();\n        }\n        //显示刷新图标\n        $(\"#notification\").css({\n          height: 0,\n          overflow: \"hidden\"\n        }).html(\"<i class='fa fa-spinner fa-pulse fa-2x fa-fw'></i><span class='sr-only'>释放加载更多</span>\").show();\n        point_end = pos;\n      };\n      var transformYPre = 0;\n      var moveEvtHandle = function moveEvtHandle(e) {\n        point_end = getPos(e);\n        var y = point_end.y - point_start.y;\n        if (y > 0 && y > 80) {\n          y = 80;\n        } else if (y < 0) {\n          y = 0;\n        }\n        transformYPre += y - transformYPre;\n        $(\"#listPanel\").css({\n          transition: \"all 1s\",\n          transform: \"translate3d(0,\" + transformYPre + \"px,0)\"\n        });\n        $(\"#notification\").css({\n          transition: \"all 1s\",\n          height: transformYPre + \"px\",\n          lineHeight: transformYPre + \"px\"\n        });\n        e.preventDefault();\n      };\n      var endEvtHandle = function endEvtHandle(e) {\n        time_end = new Date().getTime();\n        var dis = getDistance(point_start, point_end);\n        var time = time_end - time_start;\n        //构成滑动事件\n        if (dis >= swip_dis && time >= swip_time) {\n          var dir = getDirection(point_start, point_end),\n              disY = point_end.y - point_start.y,\n              disX = point_end.x - point_start.x;\n          if (disY >= 80 && dir == \"down\") {\n            result = 3;\n            //下拉行为有效\n            loadMessage(++page);\n            console.log('加载中');\n            //加载完成后释放 等待30s\n            var timer = setInterval(function () {\n              if (loadMessageFlag) {\n                $(\"#listPanel\").css({\n                  transition: \"all 1s\",\n                  transform: \"translate3d(0,0,0)\"\n                });\n                //显示加载成功\n                if (loadMessageFlag == 1) $(\"#notification\").html(\"<i class='fa fa-check-circle-o fa-2x fa-fw' style='color: #00EE00'></i><span class='sr-only'>Success</span>\");else if (loadMessageFlag == 2) $(\"#notification\").html(\"没有更多消息了=_=\");\n                loadMessageFlag = 0;\n                setTimeout(function () {\n                  $(\"#notification\").css({\n                    height: \"30px\",\n                    lineHeight: \"30px\"\n                  }).html(\"\").hide();\n                  clearInterval(timer);\n                }, 300);\n              }\n            });\n            //30s后停止\n            setTimeout(function () {\n              clearInterval(timer);\n              //显示加载失败\n              $(\"#notification\").html(\"<i class='fa fa-remove fa-4x fa-fw' style='color: #00EE00'></i><span class='sr-only'>Failed</span>\");\n              loadMessageFlag = false;\n              setTimeout(function () {\n                $(\"#notification\").css({\n                  height: \"30px\",\n                  lineHeight: \"30px\"\n                }).html(\"\").hide();\n              }, 300);\n            }, 31000);\n          } else if (disX >= 80 && dir == \"right\") {\n            result = 2;\n          } else if (disX < -30 && dir == \"left\") {\n            result = 4;\n          } else if (disY < -30 && dir == \"up\") {\n            $(\"#listPanel\").scrollTop(parseInt(Math.abs(point_end.y - point_start.y)));\n            result = 1;\n          }\n        } else {\n          $(\"#listPanel\").css({\n            transition: \"all 1s\",\n            transform: \"translate3d(0,0,0)\"\n          }).animate({\n            scrollTop: '30px'\n          }, 300);\n          $(\"#notification\").css({\n            height: \"30px\",\n            lineHeight: \"30px\"\n          }).html(\"\").hide();\n        }\n      };\n\n      $(\"#listPanel\").on(startEvt, function (e) {\n        if ($(this).scrollTop() <= 0) {\n          startEvtHandle(e);\n          $(this).on(moveEvt, moveEvtHandle);\n          $(this).on(endEvt, function (e) {\n            endEvtHandle(e);\n            $(this).off(moveEvt).off(endEvt);\n          });\n        }\n      });\n    };\n    myTouchEvent();\n    //remove the loading anime\n    setTimeout(function () {\n      $(\"#loadingWrap\").animate({\n        opacity: 0\n      }, 1000);\n      setTimeout(function () {\n        $(\"#loadingWrap\").css({\n          display: 'none'\n        });\n      }, 1100);\n    }, 1000);\n\n    //socket.io\n    allChat.on(\"connect\", function () {\n      config.socket.id = allChat.id;\n      var sid = allChat.id;\n      console.log('#connected', sid, allChat);\n      // 监听自身 id 以实现 p2p 通讯\n      allChat.on(sid, function (msg) {\n        console.log('#receive,', msg);\n        switch (msg.data.action) {\n          case 'deny':\n            {\n              console.warn('你被强制下线');\n              showNotification('你被强制下线');\n              infoBoxCompiled(getPayloadFromMsg(msg), 'Warning');\n              scrollToBottom();\n              allChat.close();\n              break;\n            }\n          case 'welcome':\n            {\n              showNotification('welcome: ' + config.userinfo.username + '\\uFF0C\\u4E0B\\u62C9\\u52A0\\u8F7D\\u66F4\\u591A\\u5386\\u53F2\\u6D88\\u606F');\n              infoBoxCompiled(getPayloadFromMsg(msg), 'Welcome');\n              scrollToBottom();\n              break;\n            }\n          case 'warning':\n            {\n              infoBoxCompiled(getPayloadFromMsg(msg), 'Warning');\n              scrollToBottom();\n              break;\n            }\n          case 'private_message':\n            {\n              console.log('private:', msg);\n              messageBoxCompiled(getPayloadFromMsg(msg));\n              scrollToBottom();\n              break;\n            }\n        }\n      });\n    });\n\n    // 接收在线用户列表信息\n    allChat.on('online', function (msg) {\n      console.log('#online,', msg);\n      switch (msg.action) {\n        //update user list in room\n        case 'update':\n          {\n            //push self into onlineUsers\n            /* msg.onlineUsers.unshift({\r\n              userid: config.userinfo.userid,\r\n              username: config.userinfo.username,\r\n              socketid: config.socket.id,\r\n              avatar: config.userinfo.avatar,\r\n              room: config.socket.room,\r\n              ipAddress: config.userinfo.ipAddress,\r\n            }); */\n            roomCardBoxCompiled({\n              onlineUsers: msg.onlineUsers,\n              room: config.socket.room,\n              onlineCount: msg.onlineUsers.length,\n              max: msg.max,\n              show: true\n            });\n            config.socket.onlineCount = msg.onlineUsers.length;\n            config.socket.max = msg.max;\n            break;\n          };\n        //new use join\n        case 'join':\n          {\n            roomOnlineUserBoxCompiled(msg.userinfo);\n            config.socket.onlineCount++;\n            //更新room在线人数\n            $('.room-online-count[data-room=\"' + msg.userinfo.room + '\"]').html(config.socket.onlineCount);\n            //通知\n            infoBoxCompiled({\n              type: 'welcome',\n              content: '\\u7528\\u6237 ' + msg.userinfo.username + ' [ID:' + msg.userinfo.userid + ']\\u52A0\\u5165\\u4E86\\u804A\\u5929\\u5BA4.'\n            });\n            scrollToBottom();\n            break;\n          };\n        case 'leave':\n          {\n            var userinfo = msg.userinfo;\n            var userNode = $('.user-list-item[data-userid=\"' + userinfo.userid + '\"]');\n            // let parentNodeId = `#room-${msg.userinfo.room}-list`;\n            //移除用户\n            userNode.remove();\n            /* //将离线用户放在列表最后\r\n            if (userNode.parents(parentNodeId).nextAll().length > 0) {\r\n              userNode.parents(parentNodeId).next().after(userNode.parents(parentNodeId).prop('outerHTML'));\r\n              userNode.parents(parentNodeId).remove();\r\n            }\r\n            //设置离线用户背景\r\n            userNode.css({\r\n              'background-color': '#eee'\r\n            }); */\n            config.socket.onlineCount--;\n            //更新room在线人数\n            $('.room-online-count[data-room=\"' + msg.userinfo.room + '\"]').html(config.socket.onlineCount);\n            //通知\n            infoBoxCompiled({\n              type: 'leave',\n              content: '\\u7528\\u6237 ' + msg.userinfo.username + ' [ID:' + msg.userinfo.userid + ']\\u79BB\\u5F00\\u4E86.'\n            });\n            scrollToBottom();\n            break;\n          };\n      }\n    });\n\n    //room message\n    allChat.on(\"room_message\", function (msg) {\n      msg = getPayloadFromMsg(msg);\n      messageBoxCompiled(msg);\n      scrollToBottom();\n    });\n\n    //send room message\n    $(\"#sendBtn\").click(function () {\n      // let hasPrivate = $('#inputText').html().match(privateMessageReg);\n      var msg = {};\n      // console.log(hasPrivate);\n      var hasPrivate = $('#privatePlaceHolder')[0];\n      if (hasPrivate) {\n        var ele = $('#privatePlaceHolder');\n        var toSocketid = ele.data('socketid');\n        var toUserid = ele.data('userid');\n        var toUsername = ele.data('username');\n        ele.remove();\n        //内容为空则返回\n        if (!$(\"#inputText\").html()) return;\n        msg = {\n          from: config.userinfo.userid,\n          to: toUserid,\n          toType: 'private',\n          room: config.socket.room,\n          content: $(\"#inputText\").html()\n        };\n        allChat.emit(\"private_message\", msg);\n        msg.from = {\n          userid: config.userinfo.userid,\n          username: config.userinfo.username,\n          avatar: config.userinfo.avatar\n        };\n        msg.to = {\n          userid: toUserid,\n          username: toUsername\n        };\n      } else {\n        msg = {\n          from: config.userinfo.userid,\n          toType: 'room',\n          room: config.socket.room,\n          content: $(\"#inputText\").html()\n        };\n        //内容为空则返回\n        if (!msg.content) return;\n        allChat.emit(\"room_message\", msg);\n        msg.from = {\n          userid: config.userinfo.userid,\n          username: config.userinfo.username,\n          avatar: config.userinfo.avatar\n        };\n      }\n      $(\"#inputText\").html(\"\");\n      messageBoxCompiled(msg, \"right\");\n      var scrollHeight = $(\"#listPanel\")[0].scrollHeight - $(\"#listPanel\")[0].clientHeight;\n      $(\"#listPanel\").animate({\n        scrollTop: scrollHeight\n      }, 300);\n      var minHeight = parseInt($(\"#inputText\").css(\"minHeight\"));\n      if ($(this)[0].clientHeight !== minHeight) {\n        $(\"#sendBtn\").css(\"height\", minHeight);\n        $(\"#emojiBtn\").css(\"height\", minHeight);\n        $(\"#listPanel\").css(\"height\", \"calc(100vh - 40px - \" + minHeight + \"px)\");\n      }\n      scrollToBottom();\n    });\n\n    // 系统事件\n    allChat.on('disconnect', function (msg) {\n      console.log('#disconnect', msg);\n    });\n\n    allChat.on('disconnecting', function () {\n      console.log('#disconnecting');\n    });\n\n    allChat.on('error', function () {\n      console.log('#error');\n    });\n\n    //系统通知\n    allChat.on('notification', function (msg) {\n      console.log('#notification', msg);\n      showNotification(msg.data.payload.content);\n    });\n\n    //系统提示\n    allChat.on('info', function (msg) {\n      console.log('#info', msg);\n      msg = getPayloadFromMsg(msg);\n      infoBoxCompiled(msg, 'SystemInfo');\n      scrollToBottom();\n    });\n  } else {\n    alert('Server Error!');\n  }\n});\n\n$('body').on({\n  'click': function click(e) {\n    var target = e.target;\n    if (target == $('#plusBtn')[0]) {\n      var bottom = $(\"#inputBox\").height();\n      $('#plusPanel').css({\n        display: 'flex',\n        opacity: '0',\n        bottom: 0\n      }).addClass('plusPanelShow').animate({\n        bottom: bottom\n      }, 300);\n    } else {\n      $('#plusPanel').removeClass('plusPanelShow').css({\n        display: 'none',\n        bottom: 0\n      });\n    }\n  }\n});\n\n$('#chooseImage').on('change', function () {\n  var file = new FormData();\n  var data = $('#chooseImage')[0].files[0];\n  file.append('file', data);\n  var onprogress = function onprogress(evt) {\n    var loaded = evt.loaded; //已经上传大小情况 \n    var tot = evt.total; //附件总大小 \n    var per = Math.floor(100 * loaded / tot); //已经上传的百分比 \n    // $('#c-r-s-panel-guests-addnew-avatar').prev().children('i').css({\n    //   height: per + '%'\n    // })\n    console.info('upload:', per);\n  };\n  var url = '/allChat/uploadImage?userid=' + config.userinfo.userid;\n\n  $.ajax({\n    url: url,\n    type: 'POST',\n    contentType: false,\n    processData: false,\n    data: file,\n    xhr: function xhr() {\n      var xhr = $.ajaxSettings.xhr();\n      if (onprogress && xhr.upload) {\n        xhr.upload.addEventListener(\"progress\", onprogress, false);\n        return xhr;\n      }\n    },\n    success: function success(res) {\n      if (res && res != '-1') {\n        //upload success\n        var imageurl = res;\n        var content = '<img class=\"imageContent\" src=\"' + imageurl + '\">';\n        var msg = {\n          from: config.userinfo.userid,\n          content: content\n        };\n        allChat.emit(\"room_message\", msg);\n        msg.from = {\n          userid: config.userinfo.userid,\n          username: config.userinfo.username,\n          avatar: config.userinfo.avatar\n        };\n        messageBoxCompiled(msg, \"right\");\n        var scrollHeight = $(\"#listPanel\")[0].scrollHeight - $(\"#listPanel\")[0].clientHeight;\n        $(\"#listPanel\").animate({\n          scrollTop: scrollHeight\n        }, 300);\n        scrollToBottom();\n      } else {\n        console.log(fail);\n      }\n    }\n  });\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(\"./node_modules/_underscore@1.9.1@underscore/underscore.js\"), __webpack_require__(\"./node_modules/_jquery@3.3.1@jquery/dist/jquery.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9idWlsZC9zcmMvY29tcG9uZW50L2FsbENoYXQvYWxsQ2hhdC5qcz85ZDFiIl0sIm5hbWVzIjpbImNvbmZpZyIsInVzZXJpbmZvIiwic29ja2V0Iiwicm9vbSIsIm9ubGluZUNvdW50IiwibWF4IiwiaWQiLCJzb2NrZXRDbGllbnQiLCJyZXF1aXJlIiwiYWxsQ2hhdCIsInF1ZXJ5IiwidHJhbnNwb3J0cyIsIl8iLCJ0ZW1wbGF0ZVNldHRpbmdzIiwiZXZhbHVhdGUiLCJpbnRlcnBvbGF0ZSIsInByaXZhdGVNZXNzYWdlUmVnIiwiUmVnRXhwIiwic2VuZFByaXZhdGVNZXNzYWdlIiwiZWxlIiwiJCIsInNvY2tldGlkIiwiZGF0YSIsInVzZXJpZCIsInVzZXJuYW1lIiwicmVtb3ZlIiwiaHRtbCIsImZvY3VzIiwiY29uY2F0Iiwic2hvd05vdGlmaWNhdGlvbiIsInRleHQiLCJzaG93Iiwic2V0VGltZW91dCIsImhpZGUiLCJpbmZvQm94Q29tcGlsZWQiLCJpbmZvIiwiYm94U3R5bGUiLCJpbmZvQm94IiwiY29tcGlsZWQiLCJ0ZW1wbGF0ZSIsImFwcGVuZCIsIm1lc3NhZ2VCb3hDb21waWxlZCIsIm1zZyIsInBvc2l0aW9uIiwiaW5zZXJ0VG8iLCJtZXNzYWdlQm94IiwidG8iLCJyZXBsYWNlIiwicHJlcGVuZCIsInNjcm9sbFRvQm90dG9tIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImdldFBheWxvYWRGcm9tTXNnIiwicGF5bG9hZCIsInJvb21PbmxpbmVVc2VyQm94VGVtcGxhdGUiLCJ1c2VyRGV0YWlsQm94IiwiaXBBZGRyZXNzIiwidXNlckJveCIsImF2YXRhciIsImNvbGxhcHNlUGFyZW50Iiwicm9vbUNhcmRCb3hDb21waWxlZCIsImNhcmRpbmZvIiwidXNlcnMiLCJvbmxpbmVVc2VycyIsIm9ubGluZVVzZXJCb3hzIiwiZm9yRWFjaCIsInVzZXIiLCJwdXNoIiwiY2FyZEJveCIsImpvaW4iLCJyZXBsYWNlV2l0aCIsIm9mZiIsIm9uIiwicm9vbU9ubGluZVVzZXJCb3hDb21waWxlZCIsImdldCIsImxvYWRNZXNzYWdlIiwicGFnZSIsImNhbGxiYWNrIiwibG9hZE1lc3NhZ2VGbGFnIiwiZnJvbSIsIk9iamVjdCIsImFzc2lnbiIsIm15VG91Y2hFdmVudCIsInN3aXBfdGltZSIsInN3aXBfZGlzIiwicG9pbnRfc3RhcnQiLCJwb2ludF9lbmQiLCJ0aW1lX3N0YXJ0IiwidGltZV9lbmQiLCJyZXN1bHQiLCJ3aW5kb3ciLCJzdGFydEV2dCIsIm1vdmVFdnQiLCJlbmRFdnQiLCJnZXRQb3MiLCJlIiwidG91Y2hlcyIsIngiLCJjbGllbnRYIiwieSIsImNsaWVudFkiLCJnZXREaXN0YW5jZSIsInAxIiwicDIiLCJwYXJzZUludCIsIk1hdGgiLCJzcXJ0IiwicG93IiwiYWJzIiwiZ2V0RGlyZWN0aW9uIiwiYW5nbGUiLCJhdGFuMiIsIlBJIiwic3RhcnRFdnRIYW5kbGUiLCJwb3MiLCJsZW5ndGgiLCJEYXRlIiwiZ2V0VGltZSIsImNzcyIsImhlaWdodCIsIm92ZXJmbG93IiwidHJhbnNmb3JtWVByZSIsIm1vdmVFdnRIYW5kbGUiLCJ0cmFuc2l0aW9uIiwidHJhbnNmb3JtIiwibGluZUhlaWdodCIsInByZXZlbnREZWZhdWx0IiwiZW5kRXZ0SGFuZGxlIiwiZGlzIiwidGltZSIsImRpciIsImRpc1kiLCJkaXNYIiwiY29uc29sZSIsImxvZyIsInRpbWVyIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwib3BhY2l0eSIsImRpc3BsYXkiLCJzaWQiLCJhY3Rpb24iLCJ3YXJuIiwiY2xvc2UiLCJ0eXBlIiwiY29udGVudCIsInVzZXJOb2RlIiwiY2xpY2siLCJoYXNQcml2YXRlIiwidG9Tb2NrZXRpZCIsInRvVXNlcmlkIiwidG9Vc2VybmFtZSIsInRvVHlwZSIsImVtaXQiLCJtaW5IZWlnaHQiLCJhbGVydCIsInRhcmdldCIsImJvdHRvbSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJmaWxlIiwiRm9ybURhdGEiLCJmaWxlcyIsIm9ucHJvZ3Jlc3MiLCJldnQiLCJsb2FkZWQiLCJ0b3QiLCJ0b3RhbCIsInBlciIsImZsb29yIiwidXJsIiwiYWpheCIsImNvbnRlbnRUeXBlIiwicHJvY2Vzc0RhdGEiLCJ4aHIiLCJhamF4U2V0dGluZ3MiLCJ1cGxvYWQiLCJhZGRFdmVudExpc3RlbmVyIiwic3VjY2VzcyIsInJlcyIsImltYWdldXJsIiwiZmFpbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUNBLElBQU1BLFNBQVM7QUFDYkMsWUFBVSxFQURHO0FBRWJDLFVBQVE7QUFDTkMsVUFBTSxTQURBO0FBRU5DLGlCQUFhLENBRlA7QUFHTkMsU0FBSyxHQUhDO0FBSU5DLFFBQUk7QUFKRTtBQUZLLENBQWY7QUFTQSxJQUFNQyxlQUFlLG1CQUFBQyxDQUFRLHNFQUFSLENBQXJCO0FBQ0EsSUFBTUMsVUFBVUYsYUFBYSxtQ0FBYixFQUFrRDtBQUNoRUcsU0FBTztBQUNMUCxVQUFNSCxPQUFPRSxNQUFQLENBQWNDO0FBRGYsR0FEeUQ7O0FBS2hFUSxjQUFZLENBQUMsV0FBRDtBQUxvRCxDQUFsRCxDQUFoQjs7QUFRQTtBQUNBQyxFQUFFQyxnQkFBRixHQUFxQjtBQUNuQkMsWUFBVSxnQkFEUztBQUVuQkMsZUFBYTtBQUZNLENBQXJCOztBQUtBO0FBQ0E7QUFDQTtBQUNBLElBQU1DLG9CQUFvQixJQUFJQyxNQUFKLENBQVcsZ0dBQVgsQ0FBMUI7QUFDQSxJQUFNQyxxQkFBcUIsU0FBckJBLGtCQUFxQixHQUFZO0FBQ3JDLE1BQUlDLE1BQU1DLEVBQUUsSUFBRixDQUFWO0FBQ0EsTUFBSUMsV0FBV0YsSUFBSUcsSUFBSixDQUFTLFVBQVQsQ0FBZjtBQUNBLE1BQUlDLFNBQVNKLElBQUlHLElBQUosQ0FBUyxRQUFULENBQWI7QUFDQSxNQUFJRSxXQUFXTCxJQUFJRyxJQUFKLENBQVMsVUFBVCxDQUFmO0FBQ0EsTUFBSUYsRUFBRSxxQkFB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QUFKLENBQVdDLGdCQUFYLENBQTRCLFVBQTVCLEVBQXdDZCxVQUF4QyxFQUFvRCxLQUFwRDtBQUNBLGVBQU9XLEdBQVA7QUFDRDtBQUNGLEtBWkk7QUFhTEksYUFBUyxpQkFBVUMsR0FBVixFQUFlO0FBQ3RCLFVBQUlBLE9BQU9BLE9BQU8sSUFBbEIsRUFBd0I7QUFDdEI7QUFDQSxZQUFJQyxXQUFXRCxHQUFmO0FBQ0EsWUFBSWxDLDhDQUE0Q21DLFFBQTVDLE9BQUo7QUFDQSxZQUFJNUksTUFBTTtBQUNSdUMsZ0JBQU1qRixPQUFPQyxRQUFQLENBQWdCc0IsTUFEZDtBQUVSNEgsbUJBQVNBO0FBRkQsU0FBVjtBQUlBMUksZ0JBQVFrSixJQUFSLENBQWEsY0FBYixFQUE2QmpILEdBQTdCO0FBQ0FBLFlBQUl1QyxJQUFKLEdBQVc7QUFDVDFELGtCQUFRdkIsT0FBT0MsUUFBUCxDQUFnQnNCLE1BRGY7QUFFVEMsb0JBQVV4QixPQUFPQyxRQUFQLENBQWdCdUIsUUFGakI7QUFHVG9DLGtCQUFRNUQsT0FBT0MsUUFBUCxDQUFnQjJEO0FBSGYsU0FBWDtBQUtBbkIsMkJBQW1CQyxHQUFuQixFQUF3QixPQUF4QjtBQUNBLFlBQUlRLGVBQWU5QixFQUFFLFlBQUYsRUFBZ0IsQ0FBaEIsRUFBbUI4QixZQUFuQixHQUFrQzlCLEVBQUUsWUFBRixFQUFnQixDQUFoQixFQUFtQitCLFlBQXhFO0FBQ0EvQixVQUFFLFlBQUYsRUFBZ0JnQyxPQUFoQixDQUF3QjtBQUN0QkMscUJBQVdIO0FBRFcsU0FBeEIsRUFFRyxHQUZIO0FBR0FEO0FBQ0QsT0FwQkQsTUFvQk87QUFDTHNGLGdCQUFRQyxHQUFSLENBQVkrQyxJQUFaO0FBQ0Q7QUFDRjtBQXJDSSxHQUFQO0FBdUNELENBdERELEUiLCJmaWxlIjoiLi9idWlsZC9zcmMvY29tcG9uZW50L2FsbENoYXQvYWxsQ2hhdC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXAubWluLmpzJztcclxuaW1wb3J0ICcuLi8uLi9saWIvZm9udC1hd2Vzb21lLTQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcyc7XHJcbmltcG9ydCAnLi4vLi4vbGliL2NzcmZBamF4JztcclxuaW1wb3J0ICcuL2FsbENoYXQubGVzcyc7XHJcbi8vIHZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICB1c2VyaW5mbzoge30sXHJcbiAgc29ja2V0OiB7XHJcbiAgICByb29tOiAnZGVmYXVsdCcsXHJcbiAgICBvbmxpbmVDb3VudDogMCxcclxuICAgIG1heDogOTk5LFxyXG4gICAgaWQ6IG51bGwsXHJcbiAgfSxcclxufTtcclxuY29uc3Qgc29ja2V0Q2xpZW50ID0gcmVxdWlyZSgnc29ja2V0LmlvLWNsaWVudCcpO1xyXG5jb25zdCBhbGxDaGF0ID0gc29ja2V0Q2xpZW50KCdodHRwOi8vMTAuMTI5LjEzLjI1Mzo3MDAxL2FsbENoYXQnLCB7XHJcbiAgcXVlcnk6IHtcclxuICAgIHJvb206IGNvbmZpZy5zb2NrZXQucm9vbSxcclxuICB9LFxyXG5cclxuICB0cmFuc3BvcnRzOiBbJ3dlYnNvY2tldCddLFxyXG59KTtcclxuXHJcbi8v5L+u5pS55qih5p2/5Yay56qBXHJcbl8udGVtcGxhdGVTZXR0aW5ncyA9IHtcclxuICBldmFsdWF0ZTogL1xcPFxceyguKz8pXFx9XFw+L2csXHJcbiAgaW50ZXJwb2xhdGU6IC9cXDxcXHs9KC4rPylcXH1cXD4vZ1xyXG59O1xyXG5cclxuLy/lrprkuYnlh73mlbDvvJrnp4Hlj5Hkuovku7bvvIzlsIbljaDkvY3nrKbmt7vliqDliLDovpPlhaXmoYZcclxuLy/lronlhajpl67popjvvJrpnIDopoHlr7nlkIRpZOWBmuWQiOazleaAp+WIpOaWrVxyXG4vLyA8XFwvaW5wdXQ+XHJcbmNvbnN0IHByaXZhdGVNZXNzYWdlUmVnID0gbmV3IFJlZ0V4cCgvPGlucHV0IGlkPVxcXCJwcml2YXRlUGxhY2VIb2xkZXJcXFwiLiooZGF0YS11c2VyaWQpLiooZGF0YS11c2VybmFtZSkuKihkYXRhLXNvY2tldGlkKSgoW1xcc1xcU10pKj8pPi8pO1xyXG5jb25zdCBzZW5kUHJpdmF0ZU1lc3NhZ2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGVsZSA9ICQodGhpcyk7XHJcbiAgbGV0IHNvY2tldGlkID0gZWxlLmRhdGEoJ3NvY2tldGlkJyk7XHJcbiAgbGV0IHVzZXJpZCA9IGVsZS5kYXRhKCd1c2VyaWQnKTtcclxuICBsZXQgdXNlcm5hbWUgPSBlbGUuZGF0YSgndXNlcm5hbWUnKTtcclxuICBpZiAoJCgnI3ByaXZhdGVQbGFjZUhvbGRlcicpWzBdKSB7XHJcbiAgICAkKCcjcHJpdmF0ZVBsYWNlSG9sZGVyJykucmVtb3ZlKCk7XHJcbiAgfVxyXG4gIGxldCBodG1sID0gJChcIiNpbnB1dFRleHRcIikuaHRtbCgpO1xyXG4gICQoXCIjaW5wdXRUZXh0XCIpLmh0bWwoJycpLmZvY3VzKCkuaHRtbChgPGlucHV0IGlkPVwicHJpdmF0ZVBsYWNlSG9sZGVyXCIgZGF0YS11c2VyaWQ9XCIke3VzZXJpZH1cIiBkYXRhLXVzZXJuYW1lPVwiJHt1c2VybmFtZX1cIiBkYXRhLXNvY2tldGlkPVwiJHtzb2NrZXRpZH1cIiB2YWx1ZT1cIlRvICR7dXNlcm5hbWV9IFtJRDoke3VzZXJpZH1dOlwiIGRpc2FibGVkPmAuY29uY2F0KGh0bWwpKTtcclxufVxyXG5cclxuLy/lrprkuYnlh73mlbDvvJrmmL7npLrpgJrnn6XmoYZcclxudmFyIHNob3dOb3RpZmljYXRpb24gPSBmdW5jdGlvbiBzaG93Tm90aWZpY2F0aW9uKHRleHQpIHtcclxuICAkKCcjbm90aWZpY2F0aW9uJykuaHRtbCh0ZXh0KS5zaG93KCdmYXN0Jyk7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjbm90aWZpY2F0aW9uJykuaHRtbCgnJykuaGlkZSgnZmFzdCcpO1xyXG4gIH0sIDMwMDApO1xyXG59XHJcblxyXG4vL+WumuS5ieihjOaVsO+8muaYvuekuuezu+e7n+aPkOekulxyXG5jb25zdCBpbmZvQm94Q29tcGlsZWQgPSAoaW5mbywgYm94U3R5bGUgPSAnbWluaScpID0+IHtcclxuICBsZXQgaW5mb0JveCA9ICcnO1xyXG4gIGlmIChib3hTdHlsZSA9PSAnbWluaScpIHtcclxuICAgIGluZm9Cb3ggPSBgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtaW5mby1taW5pXCI+PGRpdiBjbGFzcz1cImNvbnRlbnRcIj48ez0gaW5mby5jb250ZW50IH0+PC9kaXY+PC9kaXY+YDtcclxuICB9IGVsc2UgaWYgKGJveFN0eWxlID09ICdXYXJuaW5nJykge1xyXG4gICAgaW5mb0JveCA9IGA8ZGl2IGNsYXNzPVwibWVzc2FnZS1pbmZvIFdhcm5pbmdJbmZvXCIgaWQ9XCJmaXJzdFwiPjxkaXYgY2xhc3M9XCJtZXNzYWdlLWluZm8tYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidGl0bGVDb250YWluZXJcIj48aDM+PHs9IGluZm8udHlwZSB9PjwvaDM+PC9kaXY+PGRpdiBjbGFzcz1cIm1haW5Db250YWluZXJcIj48cD48ez0gaW5mby5jb250ZW50IH0+PC9wPjwvZGl2PjwvZGl2PmA7XHJcbiAgfSBlbHNlIHtcclxuICAgIGluZm9Cb3ggPSBgPGRpdiBjbGFzcz1cIm1lc3NhZ2UtaW5mb1wiIGlkPVwiZmlyc3RcIj48ZGl2IGNsYXNzPVwibWVzc2FnZS1pbmZvLWFycm93XCI+PC9kaXY+PGRpdiBjbGFzcz1cInRpdGxlQ29udGFpbmVyXCI+PGgzPjx7PSBpbmZvLnR5cGUgfT48L2gzPjwvZGl2PjxkaXYgY2xhc3M9XCJtYWluQ29udGFpbmVyXCI+PHA+PHs9IGluZm8uY29udGVudCB9PjwvcD48L2Rpdj48L2Rpdj5gO1xyXG4gIH1cclxuICBsZXQgY29tcGlsZWQgPSBfLnRlbXBsYXRlKGluZm9Cb3gpO1xyXG4gIGNvbXBpbGVkID0gY29tcGlsZWQoe1xyXG4gICAgaW5mbyxcclxuICB9KTtcclxuICAkKFwiI2xpc3RQYW5lbFwiKS5hcHBlbmQoY29tcGlsZWQpO1xyXG59O1xyXG5cclxuLy/lrprkuYnlh73mlbDvvJrkvb/nlKjmtojmga/mqKHmnb9cclxudmFyIG1lc3NhZ2VCb3hDb21waWxlZCA9IGZ1bmN0aW9uIG1lc3NhZ2VCb3hDb21waWxlZChtc2csIHBvc2l0aW9uID0gXCJsZWZ0XCIsIGluc2VydFRvID0gXCJhcHBlbmRcIikge1xyXG4gIC8qICB2YXIgbWVzc2FnZUJveCA9ICEhbXNnLnR5cGUgJiYgbXNnLnR5cGUgPT0gXCJpbWFnZVwiID8gJzxkaXYgY2xhc3M9XCJtZXNzYWdlLWxpc3QgbWVzc2FnZS1saXN0LWxlZnRcIj48aW1nIHNyYz1cIjx7PSBtc2cuYXZhdGFyIH0+XCIgY2xhc3M9XCJhdmF0YXJcIi8+PGVtIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtLWhlYWRpbmdcIj48ez0gbXNnLmZyb20udXNlcm5hbWUgfT48L2VtPiA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+IDxpIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlXCIgY2xhc3M9XCJmYSBmYS1tZW51LWxlZnRcIj48L2k+PHAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFwiPjxpbWcgc3JjPVwiPHs9IG1zZy5tZWRpYUlkIH0+XCIgZGF0YS1pbWd1cmw9XCI8ez0gbXNnLm1lZGlhSWQgfT5cIiBjbGFzcz1cIndlaXhpblNlcnZlckltYWdlIHdlaXhpblNlcnZlckltYWdlQWN0aXZlXCI+PC9wPjwvZGl2PjwvZGl2PicgOiAnPGRpdiBjbGFzcz1cIm1lc3NhZ2UtbGlzdCBtZXNzYWdlLWxpc3QtbGVmdFwiPjxpbWcgc3JjPVwiPHs9IG1zZy5hdmF0YXIgfT5cIiBjbGFzcz1cImF2YXRhclwiLz48ZW0gY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1wiPjx7PSBtc2cuZnJvbS51c2VybmFtZSB9PjwvZW0+IDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj4gPGkgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGVcIiBjbGFzcz1cImZhIGZhLW1lbnUtbGVmdFwiPjwvaT4gPHAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFwiPjx7PSBtc2cuY29udGVudCB9PjwvcD48L2Rpdj48L2Rpdj4nICovXHJcbiAgdmFyIG1lc3NhZ2VCb3ggPSAnPGRpdiBjbGFzcz1cIm1lc3NhZ2UtbGlzdCBtZXNzYWdlLWxpc3QtbGVmdFwiPjxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwLWhlYWRlclwiIHRpdGxlPVwiPHs9IG1zZy5mcm9tLnVzZXJpZCB9PlwiPjxpbWcgc3JjPVwiPHs9IG1zZy5mcm9tLmF2YXRhciB9PlwiIGNsYXNzPVwiYXZhdGFyXCIvPjxlbSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nXCI+PHs9IG1zZy5mcm9tLnVzZXJuYW1lIH0+PC9lbT4gPC9kaXY+IDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj4gPGkgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGVcIiBjbGFzcz1cImZhIGZhLW1lbnUtbGVmdFwiPjwvaT4gPHAgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0tdGV4dFwiPjx7PSBtc2cuY29udGVudCB9PjwvcD48L2Rpdj48L2Rpdj4nO1xyXG4gIGlmIChtc2cudG8pIHtcclxuICAgIHZhciBtZXNzYWdlQm94ID0gJzxkaXYgY2xhc3M9XCJtZXNzYWdlLWxpc3QgbWVzc2FnZS1saXN0LWxlZnRcIj48ZGl2IGNsYXNzPVwibGlzdC1ncm91cC1oZWFkZXJcIiB0aXRsZT1cIjx7PSBtc2cuZnJvbS51c2VyaWQgfT5cIj48aW1nIHNyYz1cIjx7PSBtc2cuZnJvbS5hdmF0YXIgfT5cIiBjbGFzcz1cImF2YXRhclwiLz48ZW0gY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1wiPjx7PSBtc2cuZnJvbS51c2VybmFtZSB9PjwvZW0+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibGlzdC1ncm91cC1pdGVtXCI+IDxpIHN0eWxlPVwicG9zaXRpb246IGFic29sdXRlXCIgY2xhc3M9XCJmYSBmYS1tZW51LWxlZnRcIj48L2k+IDxwIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtLXRleHRcIj48aW5wdXQgY2xhc3M9XCJwcml2YXRlTWVzc2FnZVRpcFwiIHZhbHVlPVwiVG8gPHs9IG1zZy50by51c2VybmFtZSB9PiBbSUQ6PHs9IG1zZy50by51c2VyaWQgfT5dOlwiIGRpc2FibGVkPjxicj48ez0gbXNnLmNvbnRlbnQgfT48L3A+PC9kaXY+PC9kaXY+JztcclxuICB9XHJcbiAgLy8gPGlucHV0IGlkPVwicHJpdmF0ZVBsYWNlSG9sZGVyXCIgZGF0YS11c2VyaWQ9XCIke3VzZXJpZH1cIiBkYXRhLXVzZXJuYW1lPVwiJHt1c2VybmFtZX1cIiBkYXRhLXNvY2tldGlkPVwiJHtzb2NrZXRpZH1cIiB2YWx1ZT1cIlRvICR7dXNlcm5hbWV9IFtJRDoke3VzZXJpZH1dOlwiIGRpc2FibGVkPjwvaW5wdXQ+XHJcbiAgaWYgKHBvc2l0aW9uID09PSBcInJpZ2h0XCIpIHtcclxuICAgIC8v5Y+zXHJcbiAgICBtZXNzYWdlQm94ID0gbWVzc2FnZUJveC5yZXBsYWNlKC9sZWZ0L2csIFwicmlnaHRcIikucmVwbGFjZSgvKDxpbWcuK1xcLz4pKDxlbS4rPFxcL2VtPikvLCBcIiQyJDFcIik7XHJcbiAgfVxyXG4gIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUobWVzc2FnZUJveCk7XHJcbiAgY29tcGlsZWQgPSBjb21waWxlZCh7XHJcbiAgICBtc2csXHJcbiAgfSk7XHJcbiAgaWYgKGluc2VydFRvID09ICdwcmVwZW5kJykge1xyXG4gICAgJChcIiNsaXN0UGFuZWxcIikucHJlcGVuZChjb21waWxlZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgICQoXCIjbGlzdFBhbmVsXCIpLmFwcGVuZChjb21waWxlZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy/mtojmga/pobXpnaLmu5rliqhcclxuY29uc3Qgc2Nyb2xsVG9Cb3R0b20gPSAoKSA9PiB7XHJcbiAgbGV0IHNjcm9sbEhlaWdodCA9ICQoXCIjbGlzdFBhbmVsXCIpWzBdLnNjcm9sbEhlaWdodCAtICQoXCIjbGlzdFBhbmVsXCIpWzBdLmNsaWVudEhlaWdodDtcclxuICAkKFwiI2xpc3RQYW5lbFwiKS5hbmltYXRlKHtcclxuICAgIHNjcm9sbFRvcDogc2Nyb2xsSGVpZ2h0XHJcbiAgfSwgMzAwKTtcclxufTtcclxuXHJcbi8vcGFyc2Ugc29ja2V0IG1lc3NhZ2UgcmVjaWV2ZWRcclxudmFyIGdldFBheWxvYWRGcm9tTXNnID0gKG1zZykgPT4ge1xyXG4gIHJldHVybiBtc2cuZGF0YS5wYXlsb2FkO1xyXG59O1xyXG5cclxuY29uc3Qgcm9vbU9ubGluZVVzZXJCb3hUZW1wbGF0ZSA9ICh1c2VyaW5mbykgPT4ge1xyXG4gIGxldCB1c2VyRGV0YWlsQm94ID0gYFxyXG4gICAgPGRpdiBjbGFzcz1cInVzZXItY29udGVudC11c2VyaWRcIj5cclxuICAgICAgPHNwYW4gY2xhc3M9XCJmYSBmYS11c2VyLWNpcmNsZS1vXCIgdGl0bGU9XCJVc2VySURcIj48L3NwYW4+PGk+JHt1c2VyaW5mby51c2VyaWR9PC9pPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwidXNlci1jb250ZW50LWlwQWRyZXNzXCI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiZmEgZmEtbWFwLW1hcmtlclwiIHRpdGxlPVwiSVAgQWRkcmVzc1wiPjwvc3Bhbj48aT4ke3VzZXJpbmZvLmlwQWRkcmVzc308L2k+XHJcbiAgICA8L2Rpdj5gXHJcbiAgaWYgKHVzZXJpbmZvLnVzZXJpZCAhPSBjb25maWcudXNlcmluZm8udXNlcmlkKSB7XHJcbiAgICAvLyBvbmNsaWNrPVwic2VuZFByaXZhdGVNZXNzYWdlKCk7XCJcclxuICAgIHVzZXJEZXRhaWxCb3ggPSB1c2VyRGV0YWlsQm94LmNvbmNhdChgXHJcbiAgICA8ZGl2IGNsYXNzPVwic2VuZFByaXZhdGVNZXNzYWdlQnRuXCIgaWQ9XCJzZW5kUHJpdmF0ZU1lc3NhZ2VCdG4tJHt1c2VyaW5mby51c2VyaWR9XCIgZGF0YS11c2VybmFtZT1cIiR7dXNlcmluZm8udXNlcm5hbWV9XCIgZGF0YS11c2VyaWQ9XCIke3VzZXJpbmZvLnVzZXJpZH1cIiBkYXRhLXNvY2tldGlkPVwiJHt1c2VyaW5mby5zb2NrZXRpZH1cIn0gPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImZhIGZhLWNvbW1lbnRpbmctb1wiIHRpdGxlPVwi5Y+R56eB5L+hXCI+PC9zcGFuPjxpPuWPkeengeS/oTwvaT5cclxuICAgIDwvZGl2PmApO1xyXG4gIH1cclxuICBsZXQgdXNlckJveCA9XHJcbiAgICBgPGRpdiBjbGFzcz1cImNhcmQgdXNlci1saXN0LWl0ZW1cIiBkYXRhLXNvY2t0aWQ9XCIke3VzZXJpbmZvLnNvY2tldGlkfVwiIGRhdGEtdXNlcmlkPVwiJHt1c2VyaW5mby51c2VyaWR9XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXIgdXNlci1saXN0LWhlYWRlclwiIGlkPVwidXNlci0ke3VzZXJpbmZvLnVzZXJpZH0tYnRuXCI+XHJcbiAgICAgIDxpbWcgc3JjPVwiJHt1c2VyaW5mby5hdmF0YXJ9XCIgY2xhc3M9XCJ1c2VyLWxpc3QtYXZhdGFyXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWxpbmsgdXNlci1saXN0LXVzZXJuYW1lXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI3VzZXItJHt1c2VyaW5mby51c2VyaWR9LWNvbnRlbnRcIiBhcmlhLWV4cGFuZGVkPVwidHJ1ZVwiIGFyaWEtY29udHJvbHM9XCJ1c2VyLSR7dXNlcmluZm8udXNlcmlkfS1jb250ZW50XCI+XHJcbiAgICAgICAgICAke3VzZXJpbmZvLnVzZXJuYW1lfVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBpZD1cInVzZXItJHt1c2VyaW5mby51c2VyaWR9LWNvbnRlbnRcIiBjbGFzcz1cInVzZXItbGlzdC1jb250ZW50IGNvbGxhcHNlICR7dXNlcmluZm8uc2hvdz8nc2hvdyc6Jyd9XCIgYXJpYS1sYWJlbGxlZGJ5PVwidXNlci0ke3VzZXJpbmZvLnVzZXJpZH0tYnRuXCIgZGF0YS1wYXJlbnQ9XCIke3VzZXJpbmZvLmNvbGxhcHNlUGFyZW50fHwnJ31cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCIgaWQ9XCJ1c2VyLSR7dXNlcmluZm8udXNlcmlkfS1saXN0XCI+XHJcbiAgICAgICAgICAgICR7dXNlckRldGFpbEJveH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PmBcclxuICByZXR1cm4gdXNlckJveDtcclxufVxyXG4vL+aJi+mjjueQtOS4gOe6p+iPnOWNleaooeadv1xyXG5jb25zdCByb29tQ2FyZEJveENvbXBpbGVkID0gKGNhcmRpbmZvKSA9PiB7XHJcbiAgbGV0IHVzZXJzID0gY2FyZGluZm8ub25saW5lVXNlcnM7XHJcbiAgbGV0IG9ubGluZVVzZXJCb3hzID0gW107XHJcbiAgdXNlcnMuZm9yRWFjaCgodXNlcikgPT4ge1xyXG4gICAgb25saW5lVXNlckJveHMucHVzaChyb29tT25saW5lVXNlckJveFRlbXBsYXRlKHVzZXIpKTtcclxuICB9KTtcclxuICBsZXQgY2FyZEJveCA9XHJcbiAgICBgPGRpdiBjbGFzcz1cImNhcmRcIiBpZD1cInJvb20tJHtjYXJkaW5mby5yb29tfVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCIgaWQ9XCJyb29tLSR7Y2FyZGluZm8ucm9vbX0tYnRuXCI+XHJcbiAgICAgICAgPGg1IGNsYXNzPVwibWItMFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI3Jvb20tJHtjYXJkaW5mby5yb29tfS1jb250ZW50XCIgYXJpYS1leHBhbmRlZD1cInRydWVcIlxyXG4gICAgICAgICAgICAgICAgYXJpYS1jb250cm9scz1cInJvb20tJHtjYXJkaW5mby5yb29tfS1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAke2NhcmRpbmZvLnJvb219XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8aSBjbGFzcz1cImNhcmQtdGlwcyByb29tLW9ubGluZS1jb3VudFwiIGRhdGEtcm9vbT1cIiR7Y2FyZGluZm8ucm9vbX1cIj4ke2NhcmRpbmZvLm9ubGluZUNvdW50fTwvaT5cclxuICAgICAgICAgICAgIC8gXHJcbiAgICAgICAgICAgIDxpIGNsYXNzPVwiY2FyZC10aXBzIHJvb20tb25saW5lLW1heFwiIGRhdGEtcm9vbT1cIiR7Y2FyZGluZm8ucm9vbX1cIj4ke2NhcmRpbmZvLm1heH08L2k+XHJcbiAgICAgICAgPC9oNT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9XCJyb29tLSR7Y2FyZGluZm8ucm9vbX0tY29udGVudFwiIGNsYXNzPVwiY29sbGFwc2UgJHtjYXJkaW5mby5zaG93PydzaG93JzonJ31cIiBhcmlhLWxhYmVsbGVkYnk9XCJyb29tLSR7Y2FyZGluZm8ucm9vbX0tYnRuXCIgZGF0YS1wYXJlbnQ9XCIke2NhcmRpbmZvLmNvbGxhcHNlUGFyZW50fHwnJ31cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1ib2R5XCIgaWQ9XCJyb29tLSR7Y2FyZGluZm8ucm9vbX0tbGlzdFwiPlxyXG4gICAgICAgICAgICAke29ubGluZVVzZXJCb3hzLmpvaW4oJycpfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+YDtcclxuICBsZXQgY29tcGlsZWQgPSBfLnRlbXBsYXRlKGNhcmRCb3gpO1xyXG4gIGNvbXBpbGVkID0gY29tcGlsZWQoe1xyXG4gICAgY2FyZGluZm8sXHJcbiAgfSk7XHJcbiAgaWYgKCQoYCNyb29tLSR7Y2FyZGluZm8ucm9vbX1gKVswXSkge1xyXG4gICAgJChgI3Jvb20tJHtjYXJkaW5mby5yb29tfWApLnJlcGxhY2VXaXRoKGNvbXBpbGVkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJChcIiNhY2NvcmRpb25cIikuYXBwZW5kKGNvbXBpbGVkKTtcclxuICB9XHJcbiAgLy/nu5Hlrprlj5HpgIHnp4Hkv6Hkuovku7ZcclxuICAkKCcuc2VuZFByaXZhdGVNZXNzYWdlQnRuJykub2ZmKCkub24oJ2NsaWNrJywgc2VuZFByaXZhdGVNZXNzYWdlKTtcclxufTtcclxuLy/kuoznuqfoj5zljZXmqKHmnb8t5Zyo57q/55So5oi35YiX6KGoXHJcbmNvbnN0IHJvb21PbmxpbmVVc2VyQm94Q29tcGlsZWQgPSAodXNlcmluZm8pID0+IHtcclxuICBsZXQgdXNlckJveCA9IHJvb21PbmxpbmVVc2VyQm94VGVtcGxhdGUodXNlcmluZm8pO1xyXG4gIGxldCBjb21waWxlZCA9IF8udGVtcGxhdGUodXNlckJveCk7XHJcbiAgY29tcGlsZWQgPSBjb21waWxlZCh7XHJcbiAgICB1c2VyaW5mbyxcclxuICB9KTtcclxuICBpZiAoJChgLnVzZXItbGlzdC1pdGVtW2RhdGEtdXNlcmlkPVwiJHt1c2VyaW5mby51c2VyaWR9XCJdYClbMF0pIHtcclxuICAgICQoYC51c2VyLWxpc3QtaXRlbVtkYXRhLXVzZXJpZD1cIiR7dXNlcmluZm8udXNlcmlkfVwiXWApLnJlcGxhY2VXaXRoKGNvbXBpbGVkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgJChgI3Jvb20tJHt1c2VyaW5mby5yb29tfS1saXN0YCkuYXBwZW5kKGNvbXBpbGVkKTtcclxuICB9XHJcbiAgLy/nu5Hlrprkuovku7ZcclxuICAkKGAuc2VuZFByaXZhdGVNZXNzYWdlQnRuW2lkPVwic2VuZFByaXZhdGVNZXNzYWdlQnRuLSR7dXNlcmluZm8udXNlcmlkfVwiXWApLm9mZigpLm9uKCdjbGljaycsIHNlbmRQcml2YXRlTWVzc2FnZSk7XHJcbn1cclxuXHJcbi8vZ2V0IHVzZXIgaW5mb1xyXG4kLmdldCgnL2FsbENoYXQvZ2V0VXNlcmluZm8/cm9vbT0nICsgY29uZmlnLnNvY2tldC5yb29tLCAoZGF0YSkgPT4ge1xyXG4gIGlmIChkYXRhICYmIGRhdGEgIT0gLTEpIHtcclxuICAgIE9iamVjdC5hc3NpZ24oY29uZmlnLnVzZXJpbmZvLCBkYXRhKTtcclxuICAgIC8vZ2V0IGhpc3RvcnkgbWVzc2FnZVxyXG4gICAgLy/or7vlj5ZhbGxDaGF05raI5oGvXHJcbiAgICAvLzDmnKrliqDovb0gMeWKoOi9veWujOaIkCAy5peg5pu05aSa5raI5oGvXHJcbiAgICB2YXIgbG9hZE1lc3NhZ2VGbGFnID0gMDtcclxuICAgIC8v5a6a5LmJ5Ye95pWw77ya5Yqg6L295raI5oGvXHJcbiAgICBmdW5jdGlvbiBsb2FkTWVzc2FnZShwYWdlLCBjYWxsYmFjaykge1xyXG4gICAgICAkLmdldChcIi9hbGxDaGF0L2dldE1lc3NhZ2VcIiwge1xyXG4gICAgICAgIFwicGFnZVwiOiBwYWdlLFxyXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhID09IFwiLTFcIikge1xyXG4gICAgICAgICAgbG9hZE1lc3NhZ2VGbGFnID0gMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZGF0YS5mb3JFYWNoKChtc2cpID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5mcm9tLnVzZXJpZCA9PSBjb25maWcudXNlcmluZm8udXNlcmlkKSB7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZUJveENvbXBpbGVkKG1zZywgJ3JpZ2h0JywgJ3ByZXBlbmQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICBtZXNzYWdlQm94Q29tcGlsZWQobXNnLCAnbGVmdCcsICdwcmVwZW5kJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0pXHJcbiAgICAgICAgICAvKiAgdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgkKFwiI21lc3NhZ2UtdGVtcGxhdGVcIikuaHRtbCgpKTtcclxuICAgICAgICAgICAkKFwiI2xpc3RQYW5lbFwiKS5wcmVwZW5kKGNvbXBpbGVkKHtcclxuICAgICAgICAgICAgIGRhdGFcclxuICAgICAgICAgICB9KSk7ICovXHJcbiAgICAgICAgICBsb2FkTWVzc2FnZUZsYWcgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbor7vlj5bnrKxwYWdlPTDpobVcclxuICAgIHZhciBwYWdlID0gMDtcclxuICAgIGxvYWRNZXNzYWdlKHBhZ2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbG9hZE1lc3NhZ2VGbGFnID0gMDtcclxuICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgIH0pO1xyXG4gICAgLy/lrprkuYnlh73mlbDvvJp0b3VjaOS6i+S7tlxyXG4gICAgdmFyIG15VG91Y2hFdmVudCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIHN3aXBfdGltZSA9IDMwMCxcclxuICAgICAgICBzd2lwX2RpcyA9IDMwLFxyXG4gICAgICAgIHBvaW50X3N0YXJ0LFxyXG4gICAgICAgIHBvaW50X2VuZCxcclxuICAgICAgICB0aW1lX3N0YXJ0LFxyXG4gICAgICAgIHRpbWVfZW5kLFxyXG4gICAgICAgIC8vMSDkuIogMiDlj7MgMyDkuIsgNOW3plxyXG4gICAgICAgIHJlc3VsdDtcclxuICAgICAgaWYgKFwib250b3VjaHN0YXJ0XCIgaW4gd2luZG93KSB7XHJcbiAgICAgICAgdmFyIHN0YXJ0RXZ0ID0gXCJ0b3VjaHN0YXJ0XCIsXHJcbiAgICAgICAgICBtb3ZlRXZ0ID0gXCJ0b3VjaG1vdmVcIixcclxuICAgICAgICAgIGVuZEV2dCA9IFwidG91Y2hlbmRcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2YXIgc3RhcnRFdnQgPSBcIm1vdXNlZG93blwiLFxyXG4gICAgICAgICAgbW92ZUV2dCA9IFwibW91c2Vtb3ZlXCIsXHJcbiAgICAgICAgICBlbmRFdnQgPSBcIm1vdXNldXBcIjtcclxuICAgICAgfVxyXG4gICAgICB2YXIgZ2V0UG9zID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB2YXIgdG91Y2hlcyA9IGUudG91Y2hlcztcclxuICAgICAgICBpZiAodG91Y2hlcyAmJiB0b3VjaGVzWzBdKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB4OiB0b3VjaGVzWzBdLmNsaWVudFgsXHJcbiAgICAgICAgICAgIHk6IHRvdWNoZXNbMF0uY2xpZW50WVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIHg6IGUuY2xpZW50WCxcclxuICAgICAgICAgIHk6IGUuY2xpZW50WVxyXG4gICAgICAgIH07XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGdldERpc3RhbmNlID0gZnVuY3Rpb24gKHAxLCBwMikge1xyXG4gICAgICAgIHJldHVybiBwYXJzZUludChNYXRoLnNxcnQoTWF0aC5wb3coTWF0aC5hYnMocDEueCAtIHAyLngpLCAyKSArIE1hdGgucG93KE1hdGguYWJzKHAxLnkgLSBwMi55KSwgMikpKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgZ2V0RGlyZWN0aW9uID0gZnVuY3Rpb24gKHAxLCBwMikge1xyXG4gICAgICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIocDEueSAtIHAyLnksIHAyLnggLSBwMS54KSAqIDE4MCAvIE1hdGguUEk7XHJcbiAgICAgICAgaWYgKGFuZ2xlIDw9IDQ1ICYmIGFuZ2xlID49IC00NSkgcmV0dXJuIFwicmlnaHRcIjtcclxuICAgICAgICBpZiAoYW5nbGUgPj0gNDUgJiYgYW5nbGUgPD0gMTM1KSByZXR1cm4gXCJ1cFwiO1xyXG4gICAgICAgIGlmIChhbmdsZSA+PSAxMzUgfHwgYW5nbGUgPD0gLTEzNSkgcmV0dXJuIFwibGVmdFwiO1xyXG4gICAgICAgIGlmIChhbmdsZSA8PSAtNDUgJiYgYW5nbGUgPj0gLTEzNSkgcmV0dXJuIFwiZG93blwiO1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBzdGFydEV2dEhhbmRsZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIHBvcyA9IGdldFBvcyhlKTtcclxuICAgICAgICB2YXIgdG91Y2hlcyA9IGUudG91Y2hlcztcclxuICAgICAgICBpZiAoIXRvdWNoZXMgfHwgdG91Y2hlcy5sZW5ndGggPT0gMSkge1xyXG4gICAgICAgICAgcG9pbnRfc3RhcnQgPSBnZXRQb3MoZSk7XHJcbiAgICAgICAgICB0aW1lX3N0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8v5pi+56S65Yi35paw5Zu+5qCHXHJcbiAgICAgICAgJChcIiNub3RpZmljYXRpb25cIikuY3NzKHtcclxuICAgICAgICAgIGhlaWdodDogMCxcclxuICAgICAgICAgIG92ZXJmbG93OiBcImhpZGRlblwiXHJcbiAgICAgICAgfSkuaHRtbChcIjxpIGNsYXNzPSdmYSBmYS1zcGlubmVyIGZhLXB1bHNlIGZhLTJ4IGZhLWZ3Jz48L2k+PHNwYW4gY2xhc3M9J3NyLW9ubHknPumHiuaUvuWKoOi9veabtOWkmjwvc3Bhbj5cIikuc2hvdygpO1xyXG4gICAgICAgIHBvaW50X2VuZCA9IHBvcztcclxuICAgICAgfVxyXG4gICAgICB2YXIgdHJhbnNmb3JtWVByZSA9IDA7XHJcbiAgICAgIHZhciBtb3ZlRXZ0SGFuZGxlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBwb2ludF9lbmQgPSBnZXRQb3MoZSk7XHJcbiAgICAgICAgdmFyIHkgPSBwb2ludF9lbmQueSAtIHBvaW50X3N0YXJ0Lnk7XHJcbiAgICAgICAgaWYgKHkgPiAwICYmIHkgPiA4MCkge1xyXG4gICAgICAgICAgeSA9IDgwO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoeSA8IDApIHtcclxuICAgICAgICAgIHkgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0cmFuc2Zvcm1ZUHJlICs9IHkgLSB0cmFuc2Zvcm1ZUHJlO1xyXG4gICAgICAgICQoXCIjbGlzdFBhbmVsXCIpLmNzcyh7XHJcbiAgICAgICAgICB0cmFuc2l0aW9uOiBcImFsbCAxc1wiLFxyXG4gICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsXCIgKyB0cmFuc2Zvcm1ZUHJlICsgXCJweCwwKVwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAkKFwiI25vdGlmaWNhdGlvblwiKS5jc3Moe1xyXG4gICAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMXNcIixcclxuICAgICAgICAgIGhlaWdodDogdHJhbnNmb3JtWVByZSArIFwicHhcIixcclxuICAgICAgICAgIGxpbmVIZWlnaHQ6IHRyYW5zZm9ybVlQcmUgKyBcInB4XCJcclxuICAgICAgICB9KVxyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgICB2YXIgZW5kRXZ0SGFuZGxlID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICB0aW1lX2VuZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHZhciBkaXMgPSBnZXREaXN0YW5jZShwb2ludF9zdGFydCwgcG9pbnRfZW5kKTtcclxuICAgICAgICB2YXIgdGltZSA9IHRpbWVfZW5kIC0gdGltZV9zdGFydDtcclxuICAgICAgICAvL+aehOaIkOa7keWKqOS6i+S7tlxyXG4gICAgICAgIGlmIChkaXMgPj0gc3dpcF9kaXMgJiYgdGltZSA+PSBzd2lwX3RpbWUpIHtcclxuICAgICAgICAgIHZhciBkaXIgPSBnZXREaXJlY3Rpb24ocG9pbnRfc3RhcnQsIHBvaW50X2VuZCksXHJcbiAgICAgICAgICAgIGRpc1kgPSBwb2ludF9lbmQueSAtIHBvaW50X3N0YXJ0LnksXHJcbiAgICAgICAgICAgIGRpc1ggPSBwb2ludF9lbmQueCAtIHBvaW50X3N0YXJ0Lng7XHJcbiAgICAgICAgICBpZiAoZGlzWSA+PSA4MCAmJiBkaXIgPT0gXCJkb3duXCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gMztcclxuICAgICAgICAgICAgLy/kuIvmi4nooYzkuLrmnInmlYhcclxuICAgICAgICAgICAgbG9hZE1lc3NhZ2UoKytwYWdlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ+WKoOi9veS4rScpO1xyXG4gICAgICAgICAgICAvL+WKoOi9veWujOaIkOWQjumHiuaUviDnrYnlvoUzMHNcclxuICAgICAgICAgICAgdmFyIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgIGlmIChsb2FkTWVzc2FnZUZsYWcpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjbGlzdFBhbmVsXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IFwiYWxsIDFzXCIsXHJcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIlxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC8v5pi+56S65Yqg6L295oiQ5YqfXHJcbiAgICAgICAgICAgICAgICBpZiAobG9hZE1lc3NhZ2VGbGFnID09IDEpICQoXCIjbm90aWZpY2F0aW9uXCIpLmh0bWwoXCI8aSBjbGFzcz0nZmEgZmEtY2hlY2stY2lyY2xlLW8gZmEtMnggZmEtZncnIHN0eWxlPSdjb2xvcjogIzAwRUUwMCc+PC9pPjxzcGFuIGNsYXNzPSdzci1vbmx5Jz5TdWNjZXNzPC9zcGFuPlwiKTtcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxvYWRNZXNzYWdlRmxhZyA9PSAyKSAkKFwiI25vdGlmaWNhdGlvblwiKS5odG1sKFwi5rKh5pyJ5pu05aSa5raI5oGv5LqGPV89XCIpO1xyXG4gICAgICAgICAgICAgICAgbG9hZE1lc3NhZ2VGbGFnID0gMDtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAkKFwiI25vdGlmaWNhdGlvblwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIzMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgbGluZUhlaWdodDogXCIzMHB4XCJcclxuICAgICAgICAgICAgICAgICAgfSkuaHRtbChcIlwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG4gICAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAvLzMwc+WQjuWBnOatolxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAvL+aYvuekuuWKoOi9veWksei0pVxyXG4gICAgICAgICAgICAgICQoXCIjbm90aWZpY2F0aW9uXCIpLmh0bWwoXCI8aSBjbGFzcz0nZmEgZmEtcmVtb3ZlIGZhLTR4IGZhLWZ3JyBzdHlsZT0nY29sb3I6ICMwMEVFMDAnPjwvaT48c3BhbiBjbGFzcz0nc3Itb25seSc+RmFpbGVkPC9zcGFuPlwiKTtcclxuICAgICAgICAgICAgICBsb2FkTWVzc2FnZUZsYWcgPSBmYWxzZTtcclxuICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjbm90aWZpY2F0aW9uXCIpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgIGhlaWdodDogXCIzMHB4XCIsXHJcbiAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IFwiMzBweFwiXHJcbiAgICAgICAgICAgICAgICB9KS5odG1sKFwiXCIpLmhpZGUoKTtcclxuICAgICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgICB9LCAzMTAwMCk7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc1ggPj0gODAgJiYgZGlyID09IFwicmlnaHRcIikge1xyXG4gICAgICAgICAgICByZXN1bHQgPSAyO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChkaXNYIDwgLTMwICYmIGRpciA9PSBcImxlZnRcIikge1xyXG4gICAgICAgICAgICByZXN1bHQgPSA0O1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChkaXNZIDwgLTMwICYmIGRpciA9PSBcInVwXCIpIHtcclxuICAgICAgICAgICAgJChcIiNsaXN0UGFuZWxcIikuc2Nyb2xsVG9wKHBhcnNlSW50KE1hdGguYWJzKHBvaW50X2VuZC55IC0gcG9pbnRfc3RhcnQueSkpKTtcclxuICAgICAgICAgICAgcmVzdWx0ID0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgJChcIiNsaXN0UGFuZWxcIikuY3NzKHtcclxuICAgICAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMXNcIixcclxuICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiXHJcbiAgICAgICAgICB9KS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAnMzBweCdcclxuICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAkKFwiI25vdGlmaWNhdGlvblwiKS5jc3Moe1xyXG4gICAgICAgICAgICBoZWlnaHQ6IFwiMzBweFwiLFxyXG4gICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjMwcHhcIlxyXG4gICAgICAgICAgfSkuaHRtbChcIlwiKS5oaWRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAkKFwiI2xpc3RQYW5lbFwiKS5vbihzdGFydEV2dCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5zY3JvbGxUb3AoKSA8PSAwKSB7XHJcbiAgICAgICAgICBzdGFydEV2dEhhbmRsZShlKTtcclxuICAgICAgICAgICQodGhpcykub24obW92ZUV2dCwgbW92ZUV2dEhhbmRsZSk7XHJcbiAgICAgICAgICAkKHRoaXMpLm9uKGVuZEV2dCwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgZW5kRXZ0SGFuZGxlKGUpO1xyXG4gICAgICAgICAgICAkKHRoaXMpLm9mZihtb3ZlRXZ0KS5vZmYoZW5kRXZ0KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgIH1cclxuICAgIG15VG91Y2hFdmVudCgpO1xyXG4gICAgLy9yZW1vdmUgdGhlIGxvYWRpbmcgYW5pbWVcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAkKFwiI2xvYWRpbmdXcmFwXCIpLmFuaW1hdGUoe1xyXG4gICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICQoXCIjbG9hZGluZ1dyYXBcIikuY3NzKHtcclxuICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9LCAxMTAwKTtcclxuICAgIH0sIDEwMDApXHJcblxyXG4gICAgLy9zb2NrZXQuaW9cclxuICAgIGFsbENoYXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcclxuICAgICAgY29uZmlnLnNvY2tldC5pZCA9IGFsbENoYXQuaWQ7XHJcbiAgICAgIGNvbnN0IHNpZCA9IGFsbENoYXQuaWQ7XHJcbiAgICAgIGNvbnNvbGUubG9nKCcjY29ubmVjdGVkJywgc2lkLCBhbGxDaGF0KTtcclxuICAgICAgLy8g55uR5ZCs6Ieq6LqrIGlkIOS7peWunueOsCBwMnAg6YCa6K6vXHJcbiAgICAgIGFsbENoYXQub24oc2lkLCBtc2cgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCcjcmVjZWl2ZSwnLCBtc2cpO1xyXG4gICAgICAgIHN3aXRjaCAobXNnLmRhdGEuYWN0aW9uKSB7XHJcbiAgICAgICAgICBjYXNlICdkZW55JzpcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUud2Fybign5L2g6KKr5by65Yi25LiL57q/Jyk7XHJcbiAgICAgICAgICAgICAgc2hvd05vdGlmaWNhdGlvbign5L2g6KKr5by65Yi25LiL57q/Jyk7XHJcbiAgICAgICAgICAgICAgaW5mb0JveENvbXBpbGVkKGdldFBheWxvYWRGcm9tTXNnKG1zZyksICdXYXJuaW5nJyk7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgICAgICAgICBhbGxDaGF0LmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIGNhc2UgJ3dlbGNvbWUnOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgc2hvd05vdGlmaWNhdGlvbihgd2VsY29tZTogJHtjb25maWcudXNlcmluZm8udXNlcm5hbWV977yM5LiL5ouJ5Yqg6L295pu05aSa5Y6G5Y+y5raI5oGvYCk7XHJcbiAgICAgICAgICAgICAgaW5mb0JveENvbXBpbGVkKGdldFBheWxvYWRGcm9tTXNnKG1zZyksICdXZWxjb21lJyk7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgY2FzZSAnd2FybmluZyc6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBpbmZvQm94Q29tcGlsZWQoZ2V0UGF5bG9hZEZyb21Nc2cobXNnKSwgJ1dhcm5pbmcnKTtcclxuICAgICAgICAgICAgICBzY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBjYXNlICdwcml2YXRlX21lc3NhZ2UnOlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByaXZhdGU6JywgbXNnKTtcclxuICAgICAgICAgICAgICBtZXNzYWdlQm94Q29tcGlsZWQoZ2V0UGF5bG9hZEZyb21Nc2cobXNnKSk7XHJcbiAgICAgICAgICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDmjqXmlLblnKjnur/nlKjmiLfliJfooajkv6Hmga9cclxuICAgIGFsbENoYXQub24oJ29ubGluZScsIG1zZyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCcjb25saW5lLCcsIG1zZyk7XHJcbiAgICAgIHN3aXRjaCAobXNnLmFjdGlvbikge1xyXG4gICAgICAgIC8vdXBkYXRlIHVzZXIgbGlzdCBpbiByb29tXHJcbiAgICAgICAgY2FzZSAndXBkYXRlJzpcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy9wdXNoIHNlbGYgaW50byBvbmxpbmVVc2Vyc1xyXG4gICAgICAgICAgICAvKiBtc2cub25saW5lVXNlcnMudW5zaGlmdCh7XHJcbiAgICAgICAgICAgICAgdXNlcmlkOiBjb25maWcudXNlcmluZm8udXNlcmlkLFxyXG4gICAgICAgICAgICAgIHVzZXJuYW1lOiBjb25maWcudXNlcmluZm8udXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgc29ja2V0aWQ6IGNvbmZpZy5zb2NrZXQuaWQsXHJcbiAgICAgICAgICAgICAgYXZhdGFyOiBjb25maWcudXNlcmluZm8uYXZhdGFyLFxyXG4gICAgICAgICAgICAgIHJvb206IGNvbmZpZy5zb2NrZXQucm9vbSxcclxuICAgICAgICAgICAgICBpcEFkZHJlc3M6IGNvbmZpZy51c2VyaW5mby5pcEFkZHJlc3MsXHJcbiAgICAgICAgICAgIH0pOyAqL1xyXG4gICAgICAgICAgICByb29tQ2FyZEJveENvbXBpbGVkKHtcclxuICAgICAgICAgICAgICBvbmxpbmVVc2VyczogbXNnLm9ubGluZVVzZXJzLFxyXG4gICAgICAgICAgICAgIHJvb206IGNvbmZpZy5zb2NrZXQucm9vbSxcclxuICAgICAgICAgICAgICBvbmxpbmVDb3VudDogbXNnLm9ubGluZVVzZXJzLmxlbmd0aCxcclxuICAgICAgICAgICAgICBtYXg6IG1zZy5tYXgsXHJcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgY29uZmlnLnNvY2tldC5vbmxpbmVDb3VudCA9IG1zZy5vbmxpbmVVc2Vycy5sZW5ndGg7XHJcbiAgICAgICAgICAgIGNvbmZpZy5zb2NrZXQubWF4ID0gbXNnLm1heDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgLy9uZXcgdXNlIGpvaW5cclxuICAgICAgICBjYXNlICdqb2luJzpcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcm9vbU9ubGluZVVzZXJCb3hDb21waWxlZChtc2cudXNlcmluZm8pO1xyXG4gICAgICAgICAgICBjb25maWcuc29ja2V0Lm9ubGluZUNvdW50Kys7XHJcbiAgICAgICAgICAgIC8v5pu05pawcm9vbeWcqOe6v+S6uuaVsFxyXG4gICAgICAgICAgICAkKGAucm9vbS1vbmxpbmUtY291bnRbZGF0YS1yb29tPVwiJHttc2cudXNlcmluZm8ucm9vbX1cIl1gKS5odG1sKGNvbmZpZy5zb2NrZXQub25saW5lQ291bnQpO1xyXG4gICAgICAgICAgICAvL+mAmuefpVxyXG4gICAgICAgICAgICBpbmZvQm94Q29tcGlsZWQoe1xyXG4gICAgICAgICAgICAgIHR5cGU6ICd3ZWxjb21lJyxcclxuICAgICAgICAgICAgICBjb250ZW50OiBg55So5oi3ICR7bXNnLnVzZXJpbmZvLnVzZXJuYW1lfSBbSUQ6JHttc2cudXNlcmluZm8udXNlcmlkfV3liqDlhaXkuobogYrlpKnlrqQuYCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgICBjYXNlICdsZWF2ZSc6XHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCB1c2VyaW5mbyA9IG1zZy51c2VyaW5mbztcclxuICAgICAgICAgICAgbGV0IHVzZXJOb2RlID0gJChgLnVzZXItbGlzdC1pdGVtW2RhdGEtdXNlcmlkPVwiJHt1c2VyaW5mby51c2VyaWR9XCJdYCk7XHJcbiAgICAgICAgICAgIC8vIGxldCBwYXJlbnROb2RlSWQgPSBgI3Jvb20tJHttc2cudXNlcmluZm8ucm9vbX0tbGlzdGA7XHJcbiAgICAgICAgICAgIC8v56e76Zmk55So5oi3XHJcbiAgICAgICAgICAgIHVzZXJOb2RlLnJlbW92ZSgpXHJcbiAgICAgICAgICAgIC8qIC8v5bCG56a757q/55So5oi35pS+5Zyo5YiX6KGo5pyA5ZCOXHJcbiAgICAgICAgICAgIGlmICh1c2VyTm9kZS5wYXJlbnRzKHBhcmVudE5vZGVJZCkubmV4dEFsbCgpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICB1c2VyTm9kZS5wYXJlbnRzKHBhcmVudE5vZGVJZCkubmV4dCgpLmFmdGVyKHVzZXJOb2RlLnBhcmVudHMocGFyZW50Tm9kZUlkKS5wcm9wKCdvdXRlckhUTUwnKSk7XHJcbiAgICAgICAgICAgICAgdXNlck5vZGUucGFyZW50cyhwYXJlbnROb2RlSWQpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8v6K6+572u56a757q/55So5oi36IOM5pmvXHJcbiAgICAgICAgICAgIHVzZXJOb2RlLmNzcyh7XHJcbiAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnI2VlZSdcclxuICAgICAgICAgICAgfSk7ICovXHJcbiAgICAgICAgICAgIGNvbmZpZy5zb2NrZXQub25saW5lQ291bnQtLTtcclxuICAgICAgICAgICAgLy/mm7TmlrByb29t5Zyo57q/5Lq65pWwXHJcbiAgICAgICAgICAgICQoYC5yb29tLW9ubGluZS1jb3VudFtkYXRhLXJvb209XCIke21zZy51c2VyaW5mby5yb29tfVwiXWApLmh0bWwoY29uZmlnLnNvY2tldC5vbmxpbmVDb3VudCk7XHJcbiAgICAgICAgICAgIC8v6YCa55+lXHJcbiAgICAgICAgICAgIGluZm9Cb3hDb21waWxlZCh7XHJcbiAgICAgICAgICAgICAgdHlwZTogJ2xlYXZlJyxcclxuICAgICAgICAgICAgICBjb250ZW50OiBg55So5oi3ICR7bXNnLnVzZXJpbmZvLnVzZXJuYW1lfSBbSUQ6JHttc2cudXNlcmluZm8udXNlcmlkfV3nprvlvIDkuoYuYCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9yb29tIG1lc3NhZ2VcclxuICAgIGFsbENoYXQub24oXCJyb29tX21lc3NhZ2VcIiwgKG1zZykgPT4ge1xyXG4gICAgICBtc2cgPSBnZXRQYXlsb2FkRnJvbU1zZyhtc2cpO1xyXG4gICAgICBtZXNzYWdlQm94Q29tcGlsZWQobXNnKTtcclxuICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy9zZW5kIHJvb20gbWVzc2FnZVxyXG4gICAgJChcIiNzZW5kQnRuXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gbGV0IGhhc1ByaXZhdGUgPSAkKCcjaW5wdXRUZXh0JykuaHRtbCgpLm1hdGNoKHByaXZhdGVNZXNzYWdlUmVnKTtcclxuICAgICAgbGV0IG1zZyA9IHt9O1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhoYXNQcml2YXRlKTtcclxuICAgICAgbGV0IGhhc1ByaXZhdGUgPSAkKCcjcHJpdmF0ZVBsYWNlSG9sZGVyJylbMF07XHJcbiAgICAgIGlmIChoYXNQcml2YXRlKSB7XHJcbiAgICAgICAgbGV0IGVsZSA9ICQoJyNwcml2YXRlUGxhY2VIb2xkZXInKTtcclxuICAgICAgICBsZXQgdG9Tb2NrZXRpZCA9IGVsZS5kYXRhKCdzb2NrZXRpZCcpO1xyXG4gICAgICAgIGxldCB0b1VzZXJpZCA9IGVsZS5kYXRhKCd1c2VyaWQnKTtcclxuICAgICAgICBsZXQgdG9Vc2VybmFtZSA9IGVsZS5kYXRhKCd1c2VybmFtZScpO1xyXG4gICAgICAgIGVsZS5yZW1vdmUoKTtcclxuICAgICAgICAvL+WGheWuueS4uuepuuWImei/lOWbnlxyXG4gICAgICAgIGlmICghJChcIiNpbnB1dFRleHRcIikuaHRtbCgpKSByZXR1cm47XHJcbiAgICAgICAgbXNnID0ge1xyXG4gICAgICAgICAgZnJvbTogY29uZmlnLnVzZXJpbmZvLnVzZXJpZCxcclxuICAgICAgICAgIHRvOiB0b1VzZXJpZCxcclxuICAgICAgICAgIHRvVHlwZTogJ3ByaXZhdGUnLFxyXG4gICAgICAgICAgcm9vbTogY29uZmlnLnNvY2tldC5yb29tLFxyXG4gICAgICAgICAgY29udGVudDogJChcIiNpbnB1dFRleHRcIikuaHRtbCgpLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYWxsQ2hhdC5lbWl0KFwicHJpdmF0ZV9tZXNzYWdlXCIsIG1zZyk7XHJcbiAgICAgICAgbXNnLmZyb20gPSB7XHJcbiAgICAgICAgICB1c2VyaWQ6IGNvbmZpZy51c2VyaW5mby51c2VyaWQsXHJcbiAgICAgICAgICB1c2VybmFtZTogY29uZmlnLnVzZXJpbmZvLnVzZXJuYW1lLFxyXG4gICAgICAgICAgYXZhdGFyOiBjb25maWcudXNlcmluZm8uYXZhdGFyLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbXNnLnRvID0ge1xyXG4gICAgICAgICAgdXNlcmlkOiB0b1VzZXJpZCxcclxuICAgICAgICAgIHVzZXJuYW1lOiB0b1VzZXJuYW1lLFxyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBtc2cgPSB7XHJcbiAgICAgICAgICBmcm9tOiBjb25maWcudXNlcmluZm8udXNlcmlkLFxyXG4gICAgICAgICAgdG9UeXBlOiAncm9vbScsXHJcbiAgICAgICAgICByb29tOiBjb25maWcuc29ja2V0LnJvb20sXHJcbiAgICAgICAgICBjb250ZW50OiAkKFwiI2lucHV0VGV4dFwiKS5odG1sKCksXHJcbiAgICAgICAgfTtcclxuICAgICAgICAvL+WGheWuueS4uuepuuWImei/lOWbnlxyXG4gICAgICAgIGlmICghbXNnLmNvbnRlbnQpIHJldHVybjtcclxuICAgICAgICBhbGxDaGF0LmVtaXQoXCJyb29tX21lc3NhZ2VcIiwgbXNnKTtcclxuICAgICAgICBtc2cuZnJvbSA9IHtcclxuICAgICAgICAgIHVzZXJpZDogY29uZmlnLnVzZXJpbmZvLnVzZXJpZCxcclxuICAgICAgICAgIHVzZXJuYW1lOiBjb25maWcudXNlcmluZm8udXNlcm5hbWUsXHJcbiAgICAgICAgICBhdmF0YXI6IGNvbmZpZy51c2VyaW5mby5hdmF0YXIsXHJcbiAgICAgICAgfTtcclxuICAgICAgfVxyXG4gICAgICAkKFwiI2lucHV0VGV4dFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICBtZXNzYWdlQm94Q29tcGlsZWQobXNnLCBcInJpZ2h0XCIpO1xyXG4gICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gJChcIiNsaXN0UGFuZWxcIilbMF0uc2Nyb2xsSGVpZ2h0IC0gJChcIiNsaXN0UGFuZWxcIilbMF0uY2xpZW50SGVpZ2h0O1xyXG4gICAgICAkKFwiI2xpc3RQYW5lbFwiKS5hbmltYXRlKHtcclxuICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbEhlaWdodFxyXG4gICAgICB9LCAzMDApO1xyXG4gICAgICB2YXIgbWluSGVpZ2h0ID0gcGFyc2VJbnQoJChcIiNpbnB1dFRleHRcIikuY3NzKFwibWluSGVpZ2h0XCIpKTtcclxuICAgICAgaWYgKCQodGhpcylbMF0uY2xpZW50SGVpZ2h0ICE9PSBtaW5IZWlnaHQpIHtcclxuICAgICAgICAkKFwiI3NlbmRCdG5cIikuY3NzKFwiaGVpZ2h0XCIsIG1pbkhlaWdodCk7XHJcbiAgICAgICAgJChcIiNlbW9qaUJ0blwiKS5jc3MoXCJoZWlnaHRcIiwgbWluSGVpZ2h0KTtcclxuICAgICAgICAkKFwiI2xpc3RQYW5lbFwiKS5jc3MoXCJoZWlnaHRcIiwgXCJjYWxjKDEwMHZoIC0gNDBweCAtIFwiICsgbWluSGVpZ2h0ICsgXCJweClcIilcclxuICAgICAgfVxyXG4gICAgICBzY3JvbGxUb0JvdHRvbSgpXHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOezu+e7n+S6i+S7tlxyXG4gICAgYWxsQ2hhdC5vbignZGlzY29ubmVjdCcsIG1zZyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCcjZGlzY29ubmVjdCcsIG1zZyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhbGxDaGF0Lm9uKCdkaXNjb25uZWN0aW5nJywgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnI2Rpc2Nvbm5lY3RpbmcnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGFsbENoYXQub24oJ2Vycm9yJywgKCkgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnI2Vycm9yJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvL+ezu+e7n+mAmuefpVxyXG4gICAgYWxsQ2hhdC5vbignbm90aWZpY2F0aW9uJywgKG1zZykgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnI25vdGlmaWNhdGlvbicsIG1zZyk7XHJcbiAgICAgIHNob3dOb3RpZmljYXRpb24obXNnLmRhdGEucGF5bG9hZC5jb250ZW50KTtcclxuICAgIH0pXHJcblxyXG4gICAgLy/ns7vnu5/mj5DnpLpcclxuICAgIGFsbENoYXQub24oJ2luZm8nLCAobXNnKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCcjaW5mbycsIG1zZyk7XHJcbiAgICAgIG1zZyA9IGdldFBheWxvYWRGcm9tTXNnKG1zZyk7XHJcbiAgICAgIGluZm9Cb3hDb21waWxlZChtc2csICdTeXN0ZW1JbmZvJyk7XHJcbiAgICAgIHNjcm9sbFRvQm90dG9tKCk7XHJcbiAgICB9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydCgnU2VydmVyIEVycm9yIScpO1xyXG4gIH1cclxufSlcclxuXHJcbiQoJ2JvZHknKS5vbih7XHJcbiAgJ2NsaWNrJzogZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcclxuICAgIGlmICh0YXJnZXQgPT0gJCgnI3BsdXNCdG4nKVswXSkge1xyXG4gICAgICBsZXQgYm90dG9tID0gJChcIiNpbnB1dEJveFwiKS5oZWlnaHQoKVxyXG4gICAgICAkKCcjcGx1c1BhbmVsJykuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiAnZmxleCcsXHJcbiAgICAgICAgb3BhY2l0eTogJzAnLFxyXG4gICAgICAgIGJvdHRvbTogMFxyXG4gICAgICB9KS5hZGRDbGFzcygncGx1c1BhbmVsU2hvdycpLmFuaW1hdGUoe1xyXG4gICAgICAgIGJvdHRvbTogYm90dG9tXHJcbiAgICAgIH0sIDMwMCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAkKCcjcGx1c1BhbmVsJykucmVtb3ZlQ2xhc3MoJ3BsdXNQYW5lbFNob3cnKS5jc3Moe1xyXG4gICAgICAgIGRpc3BsYXk6ICdub25lJyxcclxuICAgICAgICBib3R0b206IDBcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KVxyXG5cclxuJCgnI2Nob29zZUltYWdlJykub24oJ2NoYW5nZScsICgpID0+IHtcclxuICBsZXQgZmlsZSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gIGxldCBkYXRhID0gJCgnI2Nob29zZUltYWdlJylbMF0uZmlsZXNbMF07XHJcbiAgZmlsZS5hcHBlbmQoJ2ZpbGUnLCBkYXRhKTtcclxuICBsZXQgb25wcm9ncmVzcyA9IChldnQpID0+IHtcclxuICAgIGxldCBsb2FkZWQgPSBldnQubG9hZGVkOyAvL+W3sue7j+S4iuS8oOWkp+Wwj+aDheWGtSBcclxuICAgIGxldCB0b3QgPSBldnQudG90YWw7IC8v6ZmE5Lu25oC75aSn5bCPIFxyXG4gICAgbGV0IHBlciA9IE1hdGguZmxvb3IoMTAwICogbG9hZGVkIC8gdG90KTsgLy/lt7Lnu4/kuIrkvKDnmoTnmb7liIbmr5QgXHJcbiAgICAvLyAkKCcjYy1yLXMtcGFuZWwtZ3Vlc3RzLWFkZG5ldy1hdmF0YXInKS5wcmV2KCkuY2hpbGRyZW4oJ2knKS5jc3Moe1xyXG4gICAgLy8gICBoZWlnaHQ6IHBlciArICclJ1xyXG4gICAgLy8gfSlcclxuICAgIGNvbnNvbGUuaW5mbygndXBsb2FkOicsIHBlcik7XHJcbiAgfVxyXG4gIGxldCB1cmwgPSBgL2FsbENoYXQvdXBsb2FkSW1hZ2U/dXNlcmlkPSR7Y29uZmlnLnVzZXJpbmZvLnVzZXJpZH1gO1xyXG5cclxuICAkLmFqYXgoe1xyXG4gICAgdXJsOiB1cmwsXHJcbiAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICBjb250ZW50VHlwZTogZmFsc2UsXHJcbiAgICBwcm9jZXNzRGF0YTogZmFsc2UsXHJcbiAgICBkYXRhOiBmaWxlLFxyXG4gICAgeGhyOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCB4aHIgPSAkLmFqYXhTZXR0aW5ncy54aHIoKTtcclxuICAgICAgaWYgKG9ucHJvZ3Jlc3MgJiYgeGhyLnVwbG9hZCkge1xyXG4gICAgICAgIHhoci51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcihcInByb2dyZXNzXCIsIG9ucHJvZ3Jlc3MsIGZhbHNlKTtcclxuICAgICAgICByZXR1cm4geGhyO1xyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgc3VjY2VzczogZnVuY3Rpb24gKHJlcykge1xyXG4gICAgICBpZiAocmVzICYmIHJlcyAhPSAnLTEnKSB7XHJcbiAgICAgICAgLy91cGxvYWQgc3VjY2Vzc1xyXG4gICAgICAgIGxldCBpbWFnZXVybCA9IHJlcztcclxuICAgICAgICBsZXQgY29udGVudCA9IGA8aW1nIGNsYXNzPVwiaW1hZ2VDb250ZW50XCIgc3JjPVwiJHtpbWFnZXVybH1cIj5gO1xyXG4gICAgICAgIHZhciBtc2cgPSB7XHJcbiAgICAgICAgICBmcm9tOiBjb25maWcudXNlcmluZm8udXNlcmlkLFxyXG4gICAgICAgICAgY29udGVudDogY29udGVudCxcclxuICAgICAgICB9O1xyXG4gICAgICAgIGFsbENoYXQuZW1pdChcInJvb21fbWVzc2FnZVwiLCBtc2cpO1xyXG4gICAgICAgIG1zZy5mcm9tID0ge1xyXG4gICAgICAgICAgdXNlcmlkOiBjb25maWcudXNlcmluZm8udXNlcmlkLFxyXG4gICAgICAgICAgdXNlcm5hbWU6IGNvbmZpZy51c2VyaW5mby51c2VybmFtZSxcclxuICAgICAgICAgIGF2YXRhcjogY29uZmlnLnVzZXJpbmZvLmF2YXRhcixcclxuICAgICAgICB9O1xyXG4gICAgICAgIG1lc3NhZ2VCb3hDb21waWxlZChtc2csIFwicmlnaHRcIik7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9ICQoXCIjbGlzdFBhbmVsXCIpWzBdLnNjcm9sbEhlaWdodCAtICQoXCIjbGlzdFBhbmVsXCIpWzBdLmNsaWVudEhlaWdodDtcclxuICAgICAgICAkKFwiI2xpc3RQYW5lbFwiKS5hbmltYXRlKHtcclxuICAgICAgICAgIHNjcm9sbFRvcDogc2Nyb2xsSGVpZ2h0XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICBzY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGZhaWwpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxufSkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./build/src/component/allChat/allChat.js\n");

/***/ }),

/***/ "./build/src/component/allChat/allChat.less":
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9idWlsZC9zcmMvY29tcG9uZW50L2FsbENoYXQvYWxsQ2hhdC5sZXNzPzAwZjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiLi9idWlsZC9zcmMvY29tcG9uZW50L2FsbENoYXQvYWxsQ2hhdC5sZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./build/src/component/allChat/allChat.less\n");

/***/ }),

/***/ 0:
/***/ (function(module, exports) {

eval("/* (ignored) *///# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd3MgKGlnbm9yZWQpP2Y4MDYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoiMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIChpZ25vcmVkKSAqLyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///0\n");

/***/ })

/******/ });