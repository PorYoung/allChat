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
/******/ 	var hotCurrentHash = "027d9b31d7a8058f5259";
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
eval("/* WEBPACK VAR INJECTION */(function(_) {\n\n__webpack_require__(\"./node_modules/_bootstrap@4.1.3@bootstrap/dist/css/bootstrap.min.css\");\n\n__webpack_require__(\"./node_modules/_bootstrap@4.1.3@bootstrap/dist/js/bootstrap.min.js\");\n\n__webpack_require__(\"./build/src/lib/font-awesome-4.7.0/css/font-awesome.min.css\");\n\n__webpack_require__(\"./build/src/lib/csrfAjax.js\");\n\n__webpack_require__(\"./build/src/component/allChat/allChat.less\");\n\nvar $ = __webpack_require__(\"./node_modules/_jquery@3.3.1@jquery/dist/jquery.js\");\nvar config = {\n  userinfo: {},\n  socket: {\n    room: 'default',\n    id: null\n  }\n};\nvar socketClient = __webpack_require__(\"./node_modules/_socket.io-client@2.1.1@socket.io-client/lib/index.js\");\nvar allChat = socketClient('http://127.0.0.1:7001/allChat', {\n  query: {\n    room: config.socket.room\n  },\n\n  transports: ['websocket']\n});\n\n//修改模板冲突\n_.templateSettings = {\n  evaluate: /\\<\\{(.+?)\\}\\>/g,\n  interpolate: /\\<\\{=(.+?)\\}\\>/g\n};\n\n//定义函数：显示通知框\nvar showNotification = function showNotification(text) {\n  $('#notification').html(text).show('fast');\n  setTimeout(function () {\n    $('#notification').html('').hide('fast');\n  }, 3000);\n};\n\n//定义行数：显示系统提示\nvar infoBoxCompiled = function infoBoxCompiled(info) {\n  var infoBox = '<div class=\"message-info\" id=\"first\"><div class=\"message-info-arrow\"></div><div class=\"titleContainer\"><h3><{= info.type }></h3></div><div class=\"mainContainer\"><p><{= info.content }></p></div></div>';\n  var compiled = _.template(infoBox);\n  return compiled({\n    info: info\n  });\n};\n\n//定义函数：使用消息模板\nvar messageBoxCompiled = function messageBoxCompiled(msg, position) {\n  position = position ? position : \"left\";\n  /*  var messageBox = !!msg.type && msg.type == \"image\" ? '<div class=\"message-list message-list-left\"><img src=\"<{= msg.avatar }>\" class=\"avatar\"/><em class=\"list-group-item-heading\"><{= msg.from.username }></em> <div class=\"list-group-item\"> <i style=\"position: absolute\" class=\"fa fa-menu-left\"></i><p class=\"list-group-item-text\"><img src=\"<{= msg.mediaId }>\" data-imgurl=\"<{= msg.mediaId }>\" class=\"weixinServerImage weixinServerImageActive\"></p></div></div>' : '<div class=\"message-list message-list-left\"><img src=\"<{= msg.avatar }>\" class=\"avatar\"/><em class=\"list-group-item-heading\"><{= msg.from.username }></em> <div class=\"list-group-item\"> <i style=\"position: absolute\" class=\"fa fa-menu-left\"></i> <p class=\"list-group-item-text\"><{= msg.content }></p></div></div>' */\n  var messageBox = '<div class=\"message-list message-list-left\"><div class=\"list-group-header\"><img src=\"<{= msg.from.avatar }>\" class=\"avatar\"/><em class=\"list-group-item-heading\"><{= msg.from.username }></em> </div> <div class=\"list-group-item\"> <i style=\"position: absolute\" class=\"fa fa-menu-left\"></i> <p class=\"list-group-item-text\"><{= msg.content }></p></div></div>';\n  if (position === \"right\") {\n    //右\n    messageBox = messageBox.replace(/left/g, \"right\").replace(/(<img.+\\/>)(<em.+<\\/em>)/, \"$2$1\");\n  }\n  var compiled = _.template(messageBox);\n  return compiled({\n    msg: msg\n  });\n};\n\n//消息页面滚动\nvar scrollToBottom = function scrollToBottom() {\n  var scrollHeight = $(\"#listPanel\")[0].scrollHeight - $(\"#listPanel\")[0].clientHeight;\n  $(\"#listPanel\").animate({\n    scrollTop: scrollHeight\n  }, 300);\n};\n\n//parse socket message recieved\nvar getPayloadFromMsg = function getPayloadFromMsg(msg) {\n  return msg.data.payload;\n};\n\n//手风琴一级菜单模板\nvar roomCardBoxCompiled = function roomCardBoxCompiled(cardinfo) {\n  var users = cardinfo.onlineUsers;\n  var onlineUserBoxs = [];\n  users.forEach(function (user) {\n    onlineUserBoxs.push('<div class=\"card user-list-item\" data-socktid=\"' + user.socketid + '\">\\n        <div class=\"card-header user-list-header\" id=\"room-' + cardinfo.room + '-user-btn\">\\n          <img src=\"' + user.avatar + '\" class=\"user-list-avatar\">\\n          <i class=\"user-list-username\">' + user.username + '</i>\\n        </div>\\n      </div>');\n  });\n  var cardBox = '<div class=\"card\">\\n    <div class=\"card-header\" id=\"room-' + cardinfo.room + '-btn\">\\n        <h5 class=\"mb-0\">\\n            <button class=\"btn btn-link\" data-toggle=\"collapse\" data-target=\"#room-' + cardinfo.room + '\" aria-expanded=\"true\"\\n                aria-controls=\"collapseOne\">\\n                ' + cardinfo.room + '\\n            </button>\\n            <i class=\"card-tips\">' + cardinfo.onlineCount + '/' + cardinfo.max + '</i>\\n        </h5>\\n    </div>\\n\\n    <div id=\"room-' + cardinfo.room + '\" class=\"collapse ' + (cardinfo.show ? 'show' : '') + '\" aria-labelledby=\"headingOne\" data-parent=\"' + (cardinfo.collapseParent || '') + '\">\\n        <div class=\"card-body\" id=\"room-' + cardinfo.room + '-content\">\\n            ' + onlineUserBoxs + '\\n        </div>\\n    </div>\\n  </div>';\n  var compiled = _.template(cardBox);\n  return compiled({\n    cardinfo: cardinfo\n  });\n};\n//二级菜单模板-z在线用户列表\n// const roomOnlineUserBoxCompiled\n\n\n//get user info\n$.get('/allChat/getUserinfo', function (data) {\n  if (data && data != -1) {\n    //定义函数：加载消息\n    var loadMessage = function loadMessage(page, callback) {\n      $.get(\"/allChat/getMessage\", {\n        \"page\": page\n      }, function (data) {\n        if (data == \"-1\") {\n          loadMessageFlag = 2;\n        } else {\n          var compiled = _.template($(\"#message-template\").html());\n          $(\"#listPanel\").prepend(compiled({\n            data: data\n          }));\n          loadMessageFlag = 1;\n        }\n        callback && callback();\n      });\n    };\n    //初始化读取第page=0页\n\n\n    Object.assign(config.userinfo, data);\n\n    //get history message\n    //读取allChat消息\n    //0未加载 1加载完成 2无更多消息\n    var loadMessageFlag = 0;var page = 0;\n    loadMessage(page, function () {\n      loadMessageFlag = 0;\n      scrollToBottom();\n    });\n\n    //定义函数：touch事件\n    var myTouchEvent = function myTouchEvent() {\n      var swip_time = 300,\n          swip_dis = 30,\n          point_start,\n          point_end,\n          time_start,\n          time_end,\n\n      //1 上 2 右 3 下 4左\n      result;\n      if (\"ontouchstart\" in window) {\n        var startEvt = \"touchstart\",\n            moveEvt = \"touchmove\",\n            endEvt = \"touchend\";\n      } else {\n        var startEvt = \"mousedown\",\n            moveEvt = \"mousemove\",\n            endEvt = \"mouseup\";\n      }\n      var getPos = function getPos(e) {\n        var touches = e.touches;\n        if (touches && touches[0]) {\n          return {\n            x: touches[0].clientX,\n            y: touches[0].clientY\n          };\n        }\n        return {\n          x: e.clientX,\n          y: e.clientY\n        };\n      };\n      var getDistance = function getDistance(p1, p2) {\n        return parseInt(Math.sqrt(Math.pow(Math.abs(p1.x - p2.x), 2) + Math.pow(Math.abs(p1.y - p2.y), 2)));\n      };\n      var getDirection = function getDirection(p1, p2) {\n        var angle = Math.atan2(p1.y - p2.y, p2.x - p1.x) * 180 / Math.PI;\n        if (angle <= 45 && angle >= -45) return \"right\";\n        if (angle >= 45 && angle <= 135) return \"up\";\n        if (angle >= 135 || angle <= -135) return \"left\";\n        if (angle <= -45 && angle >= -135) return \"down\";\n      };\n      var startEvtHandle = function startEvtHandle(e) {\n        var pos = getPos(e);\n        var touches = e.touches;\n        if (!touches || touches.length == 1) {\n          point_start = getPos(e);\n          time_start = new Date().getTime();\n        }\n        //显示刷新图标\n        $(\"#notification\").css({\n          height: 0,\n          overflow: \"hidden\"\n        }).html(\"<i class='fa fa-spinner fa-pulse fa-2x fa-fw'></i><span class='sr-only'>释放加载更多</span>\").show();\n        point_end = pos;\n      };\n      var transformYPre = 0;\n      var moveEvtHandle = function moveEvtHandle(e) {\n        point_end = getPos(e);\n        var y = point_end.y - point_start.y;\n        if (y > 0 && y > 80) {\n          y = 80;\n        } else if (y < 0) {\n          y = 0;\n        }\n        transformYPre += y - transformYPre;\n        $(\"#listPanel\").css({\n          transition: \"all 1s\",\n          transform: \"translate3d(0,\" + transformYPre + \"px,0)\"\n        });\n        $(\"#notification\").css({\n          transition: \"all 1s\",\n          height: transformYPre + \"px\",\n          lineHeight: transformYPre + \"px\"\n        });\n        e.preventDefault();\n      };\n      var endEvtHandle = function endEvtHandle(e) {\n        time_end = new Date().getTime();\n        var dis = getDistance(point_start, point_end);\n        var time = time_end - time_start;\n        //构成滑动事件\n        if (dis >= swip_dis && time >= swip_time) {\n          var dir = getDirection(point_start, point_end),\n              disY = point_end.y - point_start.y,\n              disX = point_end.x - point_start.x;\n          if (disY >= 80 && dir == \"down\") {\n            result = 3;\n            //下拉行为有效\n            // loadMessage(++page);\n            console.log('加载中');\n            //加载完成后释放 等待30s\n            var timer = setInterval(function () {\n              if (loadMessageFlag) {\n                $(\"#listPanel\").css({\n                  transition: \"all 1s\",\n                  transform: \"translate3d(0,0,0)\"\n                });\n                //显示加载成功\n                if (loadMessageFlag == 1) $(\"#notification\").html(\"<i class='fa fa-check-circle-o fa-2x fa-fw' style='color: #00EE00'></i><span class='sr-only'>Success</span>\");else if (loadMessageFlag == 2) $(\"#notification\").html(\"没有更多消息了=_=\");\n                loadMessageFlag = 0;\n                setTimeout(function () {\n                  $(\"#notification\").css({\n                    height: \"30px\",\n                    lineHeight: \"30px\"\n                  }).html(\"\").hide();\n                  clearInterval(timer);\n                }, 300);\n              }\n            });\n            //30s后停止\n            setTimeout(function () {\n              clearInterval(timer);\n              //显示加载失败\n              $(\"#notification\").html(\"<i class='fa fa-remove fa-4x fa-fw' style='color: #00EE00'></i><span class='sr-only'>Failed</span>\");\n              loadMessageFlag = false;\n              setTimeout(function () {\n                $(\"#notification\").css({\n                  height: \"30px\",\n                  lineHeight: \"30px\"\n                }).html(\"\").hide();\n              }, 300);\n            }, 31000);\n          } else if (disX >= 80 && dir == \"right\") {\n            result = 2;\n          } else if (disX < -30 && dir == \"left\") {\n            result = 4;\n          } else if (disY < -30 && dir == \"up\") {\n            $(\"#listPanel\").scrollTop(parseInt(Math.abs(point_end.y - point_start.y)));\n            result = 1;\n          }\n        } else {\n          $(\"#listPanel\").css({\n            transition: \"all 1s\",\n            transform: \"translate3d(0,0,0)\"\n          }).animate({\n            scrollTop: '30px'\n          }, 300);\n          $(\"#notification\").css({\n            height: \"30px\",\n            lineHeight: \"30px\"\n          }).html(\"\").hide();\n        }\n      };\n\n      $(\"#listPanel\").on(startEvt, function (e) {\n        if ($(this).scrollTop() <= 0) {\n          startEvtHandle(e);\n          $(this).on(moveEvt, moveEvtHandle);\n          $(this).on(endEvt, function (e) {\n            endEvtHandle(e);\n            $(this).off(moveEvt).off(endEvt);\n          });\n        }\n      });\n    };\n    myTouchEvent();\n    //remove the loading anime\n    setTimeout(function () {\n      $(\"#loadingWrap\").animate({\n        opacity: 0\n      }, 1000);\n      setTimeout(function () {\n        $(\"#loadingWrap\").css({\n          display: 'none'\n        });\n      }, 1100);\n    }, 1000);\n\n    //socket.io\n    allChat.on(\"connect\", function () {\n      config.socket.id = allChat.id;\n      var sid = allChat.id;\n      console.log('#connected', sid, allChat);\n      // 监听自身 id 以实现 p2p 通讯\n      allChat.on(sid, function (msg) {\n        console.log('#receive,', msg);\n        switch (msg.data.action) {\n          case 'deny':\n            {\n              console.warn('你被强制下线');\n              showNotification('你被强制下线');\n              allChat.close();\n              break;\n            }\n        }\n      });\n    });\n\n    // 接收在线用户列表信息\n    allChat.on('online', function (msg) {\n      console.log('#online,', msg);\n      switch (msg.action) {\n        //update user list in room\n        case 'update':\n          {\n            //push self into onlineUsers\n            msg.onlineUsers.unshift({\n              userid: config.userinfo.userid,\n              username: config.userinfo.username,\n              socketid: config.socket.id,\n              avatar: config.userinfo.avatar\n            });\n            $(\"#accordion\").append(roomCardBoxCompiled({\n              onlineUsers: msg.onlineUsers,\n              room: config.socket.room,\n              onlineCount: msg.onlineUsers.length + 1,\n              max: msg.max,\n              show: true\n            }));\n            break;\n          }\n      }\n    });\n\n    //room message\n    allChat.on(\"room_message\", function (msg) {\n      msg = getPayloadFromMsg(msg);\n      $(\"#listPanel\").append(messageBoxCompiled(msg));\n      scrollToBottom();\n    });\n\n    //send room message\n    $(\"#sendBtn\").click(function () {\n      var msg = {\n        from: config.userinfo.userid,\n        // to: config.socket.room,\n        toType: 'room',\n        room: config.socket.room,\n        content: $(\"#inputText\").html()\n      };\n      //内容为空则返回\n      if (!msg.content) return;\n      allChat.emit(\"room_message\", msg);\n      $(\"#inputText\").html(\"\");\n      msg.from = {\n        userid: config.userinfo.userid,\n        username: config.userinfo.username,\n        avatar: config.userinfo.avatar\n      };\n      $(\"#listPanel\").append(messageBoxCompiled(msg, \"right\"));\n      var scrollHeight = $(\"#listPanel\")[0].scrollHeight - $(\"#listPanel\")[0].clientHeight;\n      $(\"#listPanel\").animate({\n        scrollTop: scrollHeight\n      }, 300);\n      var minHeight = parseInt($(\"#inputText\").css(\"minHeight\"));\n      if ($(this)[0].clientHeight !== minHeight) {\n        $(\"#sendBtn\").css(\"height\", minHeight);\n        $(\"#emojiBtn\").css(\"height\", minHeight);\n        $(\"#listPanel\").css(\"height\", \"calc(100vh - 40px - \" + minHeight + \"px)\");\n      }\n      scrollToBottom();\n    });\n\n    // 系统事件\n    allChat.on('disconnect', function (msg) {\n      console.log('#disconnect', msg);\n    });\n\n    allChat.on('disconnecting', function () {\n      console.log('#disconnecting');\n    });\n\n    allChat.on('error', function () {\n      console.log('#error');\n    });\n\n    //系统通知\n    allChat.on('notification', function (msg) {\n      console.log('#notification', msg);\n      showNotification(msg.data.payload.content);\n    });\n\n    //系统提示\n    allChat.on('info', function (msg) {\n      console.log('#info', msg);\n      msg = getPayloadFromMsg(msg);\n      $(\"#listPanel\").append(infoBoxCompiled(msg));\n      scrollToBottom();\n    });\n  } else {\n    alert('Server Error!');\n  }\n});\n\n$('body').on({\n  'click': function click(e) {\n    var target = e.target;\n    if (target == $('#plusBtn')[0]) {\n      var bottom = $(\"#inputBox\").height();\n      $('#plusPanel').css({\n        display: 'flex',\n        opacity: '0',\n        bottom: 0\n      }).addClass('plusPanelShow').animate({\n        bottom: bottom\n      }, 300);\n    } else {\n      $('#plusPanel').removeClass('plusPanelShow').css({\n        display: 'none',\n        bottom: 0\n      });\n    }\n  }\n});\n\n$('#chooseImage').on('change', function () {\n  var file = new FormData();\n  var data = $('#chooseImage')[0].files[0];\n  file.append('file', data);\n  var onprogress = function onprogress(evt) {\n    var loaded = evt.loaded; //已经上传大小情况 \n    var tot = evt.total; //附件总大小 \n    var per = Math.floor(100 * loaded / tot); //已经上传的百分比 \n    // $('#c-r-s-panel-guests-addnew-avatar').prev().children('i').css({\n    //   height: per + '%'\n    // })\n    console.info('upload:', per);\n  };\n  var url = '/allChat/uploadImage?userid=' + config.userinfo.userid;\n\n  $.ajax({\n    url: url,\n    type: 'POST',\n    contentType: false,\n    processData: false,\n    data: file,\n    xhr: function xhr() {\n      var xhr = $.ajaxSettings.xhr();\n      if (onprogress && xhr.upload) {\n        xhr.upload.addEventListener(\"progress\", onprogress, false);\n        return xhr;\n      }\n    },\n    success: function success(res) {\n      if (res && res != '-1') {\n        //upload success\n        var imageurl = res;\n        var content = '<img class=\"imageContent\" src=\"' + imageurl + '\">';\n        var msg = {\n          from: config.userinfo.userid,\n          to: config.socket.room,\n          content: content\n        };\n        allChat.emit(\"room_message\", msg);\n        msg.from = {\n          userid: config.userinfo.userid,\n          username: config.userinfo.username,\n          avatar: config.userinfo.avatar\n        };\n        $(\"#listPanel\").append(messageBoxCompiled(msg, \"right\"));\n        var scrollHeight = $(\"#listPanel\")[0].scrollHeight - $(\"#listPanel\")[0].clientHeight;\n        $(\"#listPanel\").animate({\n          scrollTop: scrollHeight\n        }, 300);\n        scrollToBottom();\n      } else {\n        console.log(fail);\n      }\n    }\n  });\n});\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(\"./node_modules/_underscore@1.9.1@underscore/underscore.js\")))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9idWlsZC9zcmMvY29tcG9uZW50L2FsbENoYXQvYWxsQ2hhdC5qcz85ZDFiIl0sIm5hbWVzIjpbIiQiLCJyZXF1aXJlIiwiY29uZmlnIiwidXNlcmluZm8iLCJzb2NrZXQiLCJyb29tIiwiaWQiLCJzb2NrZXRDbGllbnQiLCJhbGxDaGF0IiwicXVlcnkiLCJ0cmFuc3BvcnRzIiwiXyIsInRlbXBsYXRlU2V0dGluZ3MiLCJldmFsdWF0ZSIsImludGVycG9sYXRlIiwic2hvd05vdGlmaWNhdGlvbiIsInRleHQiLCJodG1sIiwic2hvdyIsInNldFRpbWVvdXQiLCJoaWRlIiwiaW5mb0JveENvbXBpbGVkIiwiaW5mbyIsImluZm9Cb3giLCJjb21waWxlZCIsInRlbXBsYXRlIiwibWVzc2FnZUJveENvbXBpbGVkIiwibXNnIiwicG9zaXRpb24iLCJtZXNzYWdlQm94IiwicmVwbGFjZSIsInNjcm9sbFRvQm90dG9tIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsImdldFBheWxvYWRGcm9tTXNnIiwiZGF0YSIsInBheWxvYWQiLCJyb29tQ2FyZEJveENvbXBpbGVkIiwiY2FyZGluZm8iLCJ1c2VycyIsIm9ubGluZVVzZXJzIiwib25saW5lVXNlckJveHMiLCJmb3JFYWNoIiwidXNlciIsInB1c2giLCJzb2NrZXRpZCIsImF2YXRhciIsInVzZXJuYW1lIiwiY2FyZEJveCIsIm9ubGluZUNvdW50IiwibWF4IiwiY29sbGFwc2VQYXJlbnQiLCJnZXQiLCJsb2FkTWVzc2FnZSIsInBhZ2UiLCJjYWxsYmFjayIsImxvYWRNZXNzYWdlRmxhZyIsInByZXBlbmQiLCJPYmplY3QiLCJhc3NpZ24iLCJteVRvdWNoRXZlbnQiLCJzd2lwX3RpbWUiLCJzd2lwX2RpcyIsInBvaW50X3N0YXJ0IiwicG9pbnRfZW5kIiwidGltZV9zdGFydCIsInRpbWVfZW5kIiwicmVzdWx0Iiwid2luZG93Iiwic3RhcnRFdnQiLCJtb3ZlRXZ0IiwiZW5kRXZ0IiwiZ2V0UG9zIiwiZSIsInRvdWNoZXMiLCJ4IiwiY2xpZW50WCIsInkiLCJjbGllbnRZIiwiZ2V0RGlzdGFuY2UiLCJwMSIsInAyIiwicGFyc2VJbnQiLCJNYXRoIiwic3FydCIsInBvdyIsImFicyIsImdldERpcmVjdGlvbiIsImFuZ2xlIiwiYXRhbjIiLCJQSSIsInN0YXJ0RXZ0SGFuZGxlIiwicG9zIiwibGVuZ3RoIiwiRGF0ZSIsImdldFRpbWUiLCJjc3MiLCJoZWlnaHQiLCJvdmVyZmxvdyIsInRyYW5zZm9ybVlQcmUiLCJtb3ZlRXZ0SGFuZGxlIiwidHJhbnNpdGlvbiIsInRyYW5zZm9ybSIsImxpbmVIZWlnaHQiLCJwcmV2ZW50RGVmYXVsdCIsImVuZEV2dEhhbmRsZSIsImRpcyIsInRpbWUiLCJkaXIiLCJkaXNZIiwiZGlzWCIsImNvbnNvbGUiLCJsb2ciLCJ0aW1lciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIm9uIiwib2ZmIiwib3BhY2l0eSIsImRpc3BsYXkiLCJzaWQiLCJhY3Rpb24iLCJ3YXJuIiwiY2xvc2UiLCJ1bnNoaWZ0IiwidXNlcmlkIiwiYXBwZW5kIiwiY2xpY2siLCJmcm9tIiwidG9UeXBlIiwiY29udGVudCIsImVtaXQiLCJtaW5IZWlnaHQiLCJhbGVydCIsInRhcmdldCIsImJvdHRvbSIsImFkZENsYXNzIiwicmVtb3ZlQ2xhc3MiLCJmaWxlIiwiRm9ybURhdGEiLCJmaWxlcyIsIm9ucHJvZ3Jlc3MiLCJldnQiLCJsb2FkZWQiLCJ0b3QiLCJ0b3RhbCIsInBlciIsImZsb29yIiwidXJsIiwiYWpheCIsInR5cGUiLCJjb250ZW50VHlwZSIsInByb2Nlc3NEYXRhIiwieGhyIiwiYWpheFNldHRpbmdzIiwidXBsb2FkIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN1Y2Nlc3MiLCJyZXMiLCJpbWFnZXVybCIsInRvIiwiZmFpbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQSxJQUFJQSxJ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IjpbImltcG9ydCAnYm9vdHN0cmFwL2Rpc3QvY3NzL2Jvb3RzdHJhcC5taW4uY3NzJztcclxuaW1wb3J0ICdib290c3RyYXAvZGlzdC9qcy9ib290c3RyYXAubWluLmpzJztcclxuaW1wb3J0ICcuLi8uLi9saWIvZm9udC1hd2Vzb21lLTQuNy4wL2Nzcy9mb250LWF3ZXNvbWUubWluLmNzcyc7XHJcbmltcG9ydCAnLi4vLi4vbGliL2NzcmZBamF4JztcclxuaW1wb3J0ICcuL2FsbENoYXQubGVzcyc7XHJcbnZhciAkID0gcmVxdWlyZSgnanF1ZXJ5Jyk7XHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICB1c2VyaW5mbzoge30sXHJcbiAgc29ja2V0OiB7XHJcbiAgICByb29tOiAnZGVmYXVsdCcsXHJcbiAgICBpZDogbnVsbCxcclxuICB9LFxyXG59O1xyXG5jb25zdCBzb2NrZXRDbGllbnQgPSByZXF1aXJlKCdzb2NrZXQuaW8tY2xpZW50Jyk7XHJcbmNvbnN0IGFsbENoYXQgPSBzb2NrZXRDbGllbnQoJ2h0dHA6Ly8xMjcuMC4wLjE6NzAwMS9hbGxDaGF0Jywge1xyXG4gIHF1ZXJ5OiB7XHJcbiAgICByb29tOiBjb25maWcuc29ja2V0LnJvb20sXHJcbiAgfSxcclxuXHJcbiAgdHJhbnNwb3J0czogWyd3ZWJzb2NrZXQnXSxcclxufSk7XHJcblxyXG4vL+S/ruaUueaooeadv+WGsueqgVxyXG5fLnRlbXBsYXRlU2V0dGluZ3MgPSB7XHJcbiAgZXZhbHVhdGU6IC9cXDxcXHsoLis/KVxcfVxcPi9nLFxyXG4gIGludGVycG9sYXRlOiAvXFw8XFx7PSguKz8pXFx9XFw+L2dcclxufTtcclxuXHJcbi8v5a6a5LmJ5Ye95pWw77ya5pi+56S66YCa55+l5qGGXHJcbnZhciBzaG93Tm90aWZpY2F0aW9uID0gZnVuY3Rpb24gc2hvd05vdGlmaWNhdGlvbih0ZXh0KSB7XHJcbiAgJCgnI25vdGlmaWNhdGlvbicpLmh0bWwodGV4dCkuc2hvdygnZmFzdCcpO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI25vdGlmaWNhdGlvbicpLmh0bWwoJycpLmhpZGUoJ2Zhc3QnKTtcclxuICB9LCAzMDAwKTtcclxufVxyXG5cclxuLy/lrprkuYnooYzmlbDvvJrmmL7npLrns7vnu5/mj5DnpLpcclxuY29uc3QgaW5mb0JveENvbXBpbGVkID0gKGluZm8pID0+IHtcclxuICBsZXQgaW5mb0JveCA9IGA8ZGl2IGNsYXNzPVwibWVzc2FnZS1pbmZvXCIgaWQ9XCJmaXJzdFwiPjxkaXYgY2xhc3M9XCJtZXNzYWdlLWluZm8tYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidGl0bGVDb250YWluZXJcIj48aDM+PHs9IGluZm8udHlwZSB9PjwvaDM+PC9kaXY+PGRpdiBjbGFzcz1cIm1haW5Db250YWluZXJcIj48cD48ez0gaW5mby5jb250ZW50IH0+PC9wPjwvZGl2PjwvZGl2PmA7XHJcbiAgbGV0IGNvbXBpbGVkID0gXy50ZW1wbGF0ZShpbmZvQm94KTtcclxuICByZXR1cm4gY29tcGlsZWQoe1xyXG4gICAgaW5mb1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy/lrprkuYnlh73mlbDvvJrkvb/nlKjmtojmga/mqKHmnb9cclxudmFyIG1lc3NhZ2VCb3hDb21waWxlZCA9IGZ1bmN0aW9uIG1lc3NhZ2VCb3hDb21waWxlZChtc2csIHBvc2l0aW9uKSB7XHJcbiAgcG9zaXRpb24gPSBwb3NpdGlvbiA/IHBvc2l0aW9uIDogXCJsZWZ0XCI7XHJcbiAgLyogIHZhciBtZXNzYWdlQm94ID0gISFtc2cudHlwZSAmJiBtc2cudHlwZSA9PSBcImltYWdlXCIgPyAnPGRpdiBjbGFzcz1cIm1lc3NhZ2UtbGlzdCBtZXNzYWdlLWxpc3QtbGVmdFwiPjxpbWcgc3JjPVwiPHs9IG1zZy5hdmF0YXIgfT5cIiBjbGFzcz1cImF2YXRhclwiLz48ZW0gY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0taGVhZGluZ1wiPjx7PSBtc2cuZnJvbS51c2VybmFtZSB9PjwvZW0+IDxkaXYgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW1cIj4gPGkgc3R5bGU9XCJwb3NpdGlvbjogYWJzb2x1dGVcIiBjbGFzcz1cImZhIGZhLW1lbnUtbGVmdFwiPjwvaT48cCBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbS10ZXh0XCI+PGltZyBzcmM9XCI8ez0gbXNnLm1lZGlhSWQgfT5cIiBkYXRhLWltZ3VybD1cIjx7PSBtc2cubWVkaWFJZCB9PlwiIGNsYXNzPVwid2VpeGluU2VydmVySW1hZ2Ugd2VpeGluU2VydmVySW1hZ2VBY3RpdmVcIj48L3A+PC9kaXY+PC9kaXY+JyA6ICc8ZGl2IGNsYXNzPVwibWVzc2FnZS1saXN0IG1lc3NhZ2UtbGlzdC1sZWZ0XCI+PGltZyBzcmM9XCI8ez0gbXNnLmF2YXRhciB9PlwiIGNsYXNzPVwiYXZhdGFyXCIvPjxlbSBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbS1oZWFkaW5nXCI+PHs9IG1zZy5mcm9tLnVzZXJuYW1lIH0+PC9lbT4gPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPiA8aSBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZVwiIGNsYXNzPVwiZmEgZmEtbWVudS1sZWZ0XCI+PC9pPiA8cCBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbS10ZXh0XCI+PHs9IG1zZy5jb250ZW50IH0+PC9wPjwvZGl2PjwvZGl2PicgKi9cclxuICB2YXIgbWVzc2FnZUJveCA9ICc8ZGl2IGNsYXNzPVwibWVzc2FnZS1saXN0IG1lc3NhZ2UtbGlzdC1sZWZ0XCI+PGRpdiBjbGFzcz1cImxpc3QtZ3JvdXAtaGVhZGVyXCI+PGltZyBzcmM9XCI8ez0gbXNnLmZyb20uYXZhdGFyIH0+XCIgY2xhc3M9XCJhdmF0YXJcIi8+PGVtIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtLWhlYWRpbmdcIj48ez0gbXNnLmZyb20udXNlcm5hbWUgfT48L2VtPiA8L2Rpdj4gPGRpdiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbVwiPiA8aSBzdHlsZT1cInBvc2l0aW9uOiBhYnNvbHV0ZVwiIGNsYXNzPVwiZmEgZmEtbWVudS1sZWZ0XCI+PC9pPiA8cCBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbS10ZXh0XCI+PHs9IG1zZy5jb250ZW50IH0+PC9wPjwvZGl2PjwvZGl2Pic7XHJcbiAgaWYgKHBvc2l0aW9uID09PSBcInJpZ2h0XCIpIHtcclxuICAgIC8v5Y+zXHJcbiAgICBtZXNzYWdlQm94ID0gbWVzc2FnZUJveC5yZXBsYWNlKC9sZWZ0L2csIFwicmlnaHRcIikucmVwbGFjZSgvKDxpbWcuK1xcLz4pKDxlbS4rPFxcL2VtPikvLCBcIiQyJDFcIik7XHJcbiAgfVxyXG4gIHZhciBjb21waWxlZCA9IF8udGVtcGxhdGUobWVzc2FnZUJveCk7XHJcbiAgcmV0dXJuIGNvbXBpbGVkKHtcclxuICAgIG1zZ1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy/mtojmga/pobXpnaLmu5rliqhcclxuY29uc3Qgc2Nyb2xsVG9Cb3R0b20gPSAoKSA9PiB7XHJcbiAgbGV0IHNjcm9sbEhlaWdodCA9ICQoXCIjbGlzdFBhbmVsXCIpWzBdLnNjcm9sbEhlaWdodCAtICQoXCIjbGlzdFBhbmVsXCIpWzBdLmNsaWVudEhlaWdodDtcclxuICAkKFwiI2xpc3RQYW5lbFwiKS5hbmltYXRlKHtcclxuICAgIHNjcm9sbFRvcDogc2Nyb2xsSGVpZ2h0XHJcbiAgfSwgMzAwKTtcclxufTtcclxuXHJcbi8vcGFyc2Ugc29ja2V0IG1lc3NhZ2UgcmVjaWV2ZWRcclxudmFyIGdldFBheWxvYWRGcm9tTXNnID0gKG1zZykgPT4ge1xyXG4gIHJldHVybiBtc2cuZGF0YS5wYXlsb2FkO1xyXG59O1xyXG5cclxuLy/miYvpo47nkLTkuIDnuqfoj5zljZXmqKHmnb9cclxuY29uc3Qgcm9vbUNhcmRCb3hDb21waWxlZCA9IChjYXJkaW5mbykgPT4ge1xyXG4gIGxldCB1c2VycyA9IGNhcmRpbmZvLm9ubGluZVVzZXJzO1xyXG4gIGxldCBvbmxpbmVVc2VyQm94cyA9IFtdO1xyXG4gIHVzZXJzLmZvckVhY2goKHVzZXIpID0+IHtcclxuICAgIG9ubGluZVVzZXJCb3hzLnB1c2goXHJcbiAgICAgIGA8ZGl2IGNsYXNzPVwiY2FyZCB1c2VyLWxpc3QtaXRlbVwiIGRhdGEtc29ja3RpZD1cIiR7dXNlci5zb2NrZXRpZH1cIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXIgdXNlci1saXN0LWhlYWRlclwiIGlkPVwicm9vbS0ke2NhcmRpbmZvLnJvb219LXVzZXItYnRuXCI+XHJcbiAgICAgICAgICA8aW1nIHNyYz1cIiR7dXNlci5hdmF0YXJ9XCIgY2xhc3M9XCJ1c2VyLWxpc3QtYXZhdGFyXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cInVzZXItbGlzdC11c2VybmFtZVwiPiR7dXNlci51c2VybmFtZX08L2k+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PmApO1xyXG4gIH0pO1xyXG4gIGxldCBjYXJkQm94ID1cclxuICAgIGA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtaGVhZGVyXCIgaWQ9XCJyb29tLSR7Y2FyZGluZm8ucm9vbX0tYnRuXCI+XHJcbiAgICAgICAgPGg1IGNsYXNzPVwibWItMFwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiIGRhdGEtdGFyZ2V0PVwiI3Jvb20tJHtjYXJkaW5mby5yb29tfVwiIGFyaWEtZXhwYW5kZWQ9XCJ0cnVlXCJcclxuICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJjb2xsYXBzZU9uZVwiPlxyXG4gICAgICAgICAgICAgICAgJHtjYXJkaW5mby5yb29tfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJjYXJkLXRpcHNcIj4ke2NhcmRpbmZvLm9ubGluZUNvdW50fS8ke2NhcmRpbmZvLm1heH08L2k+XHJcbiAgICAgICAgPC9oNT5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgaWQ9XCJyb29tLSR7Y2FyZGluZm8ucm9vbX1cIiBjbGFzcz1cImNvbGxhcHNlICR7Y2FyZGluZm8uc2hvdz8nc2hvdyc6Jyd9XCIgYXJpYS1sYWJlbGxlZGJ5PVwiaGVhZGluZ09uZVwiIGRhdGEtcGFyZW50PVwiJHtjYXJkaW5mby5jb2xsYXBzZVBhcmVudHx8Jyd9XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtYm9keVwiIGlkPVwicm9vbS0ke2NhcmRpbmZvLnJvb219LWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgJHtvbmxpbmVVc2VyQm94c31cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PmA7XHJcbiAgbGV0IGNvbXBpbGVkID0gXy50ZW1wbGF0ZShjYXJkQm94KTtcclxuICByZXR1cm4gY29tcGlsZWQoe1xyXG4gICAgY2FyZGluZm9cclxuICB9KTtcclxufTtcclxuLy/kuoznuqfoj5zljZXmqKHmnb8teuWcqOe6v+eUqOaIt+WIl+ihqFxyXG4vLyBjb25zdCByb29tT25saW5lVXNlckJveENvbXBpbGVkXHJcblxyXG5cclxuLy9nZXQgdXNlciBpbmZvXHJcbiQuZ2V0KCcvYWxsQ2hhdC9nZXRVc2VyaW5mbycsIChkYXRhKSA9PiB7XHJcbiAgaWYgKGRhdGEgJiYgZGF0YSAhPSAtMSkge1xyXG4gICAgT2JqZWN0LmFzc2lnbihjb25maWcudXNlcmluZm8sIGRhdGEpO1xyXG5cclxuICAgIC8vZ2V0IGhpc3RvcnkgbWVzc2FnZVxyXG4gICAgLy/or7vlj5ZhbGxDaGF05raI5oGvXHJcbiAgICAvLzDmnKrliqDovb0gMeWKoOi9veWujOaIkCAy5peg5pu05aSa5raI5oGvXHJcbiAgICB2YXIgbG9hZE1lc3NhZ2VGbGFnID0gMDtcclxuICAgIC8v5a6a5LmJ5Ye95pWw77ya5Yqg6L295raI5oGvXHJcbiAgICBmdW5jdGlvbiBsb2FkTWVzc2FnZShwYWdlLCBjYWxsYmFjaykge1xyXG4gICAgICAkLmdldChcIi9hbGxDaGF0L2dldE1lc3NhZ2VcIiwge1xyXG4gICAgICAgIFwicGFnZVwiOiBwYWdlLFxyXG4gICAgICB9LCBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGlmIChkYXRhID09IFwiLTFcIikge1xyXG4gICAgICAgICAgbG9hZE1lc3NhZ2VGbGFnID0gMjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmFyIGNvbXBpbGVkID0gXy50ZW1wbGF0ZSgkKFwiI21lc3NhZ2UtdGVtcGxhdGVcIikuaHRtbCgpKTtcclxuICAgICAgICAgICQoXCIjbGlzdFBhbmVsXCIpLnByZXBlbmQoY29tcGlsZWQoe1xyXG4gICAgICAgICAgICBkYXRhXHJcbiAgICAgICAgICB9KSk7XHJcbiAgICAgICAgICBsb2FkTWVzc2FnZUZsYWcgPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgLy/liJ3lp4vljJbor7vlj5bnrKxwYWdlPTDpobVcclxuICAgIHZhciBwYWdlID0gMDtcclxuICAgIGxvYWRNZXNzYWdlKHBhZ2UsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgbG9hZE1lc3NhZ2VGbGFnID0gMDtcclxuICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8v5a6a5LmJ5Ye95pWw77yadG91Y2jkuovku7ZcclxuICAgIHZhciBteVRvdWNoRXZlbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBzd2lwX3RpbWUgPSAzMDAsXHJcbiAgICAgICAgc3dpcF9kaXMgPSAzMCxcclxuICAgICAgICBwb2ludF9zdGFydCxcclxuICAgICAgICBwb2ludF9lbmQsXHJcbiAgICAgICAgdGltZV9zdGFydCxcclxuICAgICAgICB0aW1lX2VuZCxcclxuICAgICAgICAvLzEg5LiKIDIg5Y+zIDMg5LiLIDTlt6ZcclxuICAgICAgICByZXN1bHQ7XHJcbiAgICAgIGlmIChcIm9udG91Y2hzdGFydFwiIGluIHdpbmRvdykge1xyXG4gICAgICAgIHZhciBzdGFydEV2dCA9IFwidG91Y2hzdGFydFwiLFxyXG4gICAgICAgICAgbW92ZUV2dCA9IFwidG91Y2htb3ZlXCIsXHJcbiAgICAgICAgICBlbmRFdnQgPSBcInRvdWNoZW5kXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmFyIHN0YXJ0RXZ0ID0gXCJtb3VzZWRvd25cIixcclxuICAgICAgICAgIG1vdmVFdnQgPSBcIm1vdXNlbW92ZVwiLFxyXG4gICAgICAgICAgZW5kRXZ0ID0gXCJtb3VzZXVwXCI7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGdldFBvcyA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBlLnRvdWNoZXM7XHJcbiAgICAgICAgaWYgKHRvdWNoZXMgJiYgdG91Y2hlc1swXSkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgeDogdG91Y2hlc1swXS5jbGllbnRYLFxyXG4gICAgICAgICAgICB5OiB0b3VjaGVzWzBdLmNsaWVudFlcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICB4OiBlLmNsaWVudFgsXHJcbiAgICAgICAgICB5OiBlLmNsaWVudFlcclxuICAgICAgICB9O1xyXG4gICAgICB9XHJcbiAgICAgIHZhciBnZXREaXN0YW5jZSA9IGZ1bmN0aW9uIChwMSwgcDIpIHtcclxuICAgICAgICByZXR1cm4gcGFyc2VJbnQoTWF0aC5zcXJ0KE1hdGgucG93KE1hdGguYWJzKHAxLnggLSBwMi54KSwgMikgKyBNYXRoLnBvdyhNYXRoLmFicyhwMS55IC0gcDIueSksIDIpKSk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGdldERpcmVjdGlvbiA9IGZ1bmN0aW9uIChwMSwgcDIpIHtcclxuICAgICAgICB2YXIgYW5nbGUgPSBNYXRoLmF0YW4yKHAxLnkgLSBwMi55LCBwMi54IC0gcDEueCkgKiAxODAgLyBNYXRoLlBJO1xyXG4gICAgICAgIGlmIChhbmdsZSA8PSA0NSAmJiBhbmdsZSA+PSAtNDUpIHJldHVybiBcInJpZ2h0XCI7XHJcbiAgICAgICAgaWYgKGFuZ2xlID49IDQ1ICYmIGFuZ2xlIDw9IDEzNSkgcmV0dXJuIFwidXBcIjtcclxuICAgICAgICBpZiAoYW5nbGUgPj0gMTM1IHx8IGFuZ2xlIDw9IC0xMzUpIHJldHVybiBcImxlZnRcIjtcclxuICAgICAgICBpZiAoYW5nbGUgPD0gLTQ1ICYmIGFuZ2xlID49IC0xMzUpIHJldHVybiBcImRvd25cIjtcclxuICAgICAgfVxyXG4gICAgICB2YXIgc3RhcnRFdnRIYW5kbGUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIHZhciBwb3MgPSBnZXRQb3MoZSk7XHJcbiAgICAgICAgdmFyIHRvdWNoZXMgPSBlLnRvdWNoZXM7XHJcbiAgICAgICAgaWYgKCF0b3VjaGVzIHx8IHRvdWNoZXMubGVuZ3RoID09IDEpIHtcclxuICAgICAgICAgIHBvaW50X3N0YXJ0ID0gZ2V0UG9zKGUpO1xyXG4gICAgICAgICAgdGltZV9zdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvL+aYvuekuuWIt+aWsOWbvuagh1xyXG4gICAgICAgICQoXCIjbm90aWZpY2F0aW9uXCIpLmNzcyh7XHJcbiAgICAgICAgICBoZWlnaHQ6IDAsXHJcbiAgICAgICAgICBvdmVyZmxvdzogXCJoaWRkZW5cIlxyXG4gICAgICAgIH0pLmh0bWwoXCI8aSBjbGFzcz0nZmEgZmEtc3Bpbm5lciBmYS1wdWxzZSBmYS0yeCBmYS1mdyc+PC9pPjxzcGFuIGNsYXNzPSdzci1vbmx5Jz7ph4rmlL7liqDovb3mm7TlpJo8L3NwYW4+XCIpLnNob3coKTtcclxuICAgICAgICBwb2ludF9lbmQgPSBwb3M7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIHRyYW5zZm9ybVlQcmUgPSAwO1xyXG4gICAgICB2YXIgbW92ZUV2dEhhbmRsZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgcG9pbnRfZW5kID0gZ2V0UG9zKGUpO1xyXG4gICAgICAgIHZhciB5ID0gcG9pbnRfZW5kLnkgLSBwb2ludF9zdGFydC55O1xyXG4gICAgICAgIGlmICh5ID4gMCAmJiB5ID4gODApIHtcclxuICAgICAgICAgIHkgPSA4MDtcclxuICAgICAgICB9IGVsc2UgaWYgKHkgPCAwKSB7XHJcbiAgICAgICAgICB5ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdHJhbnNmb3JtWVByZSArPSB5IC0gdHJhbnNmb3JtWVByZTtcclxuICAgICAgICAkKFwiI2xpc3RQYW5lbFwiKS5jc3Moe1xyXG4gICAgICAgICAgdHJhbnNpdGlvbjogXCJhbGwgMXNcIixcclxuICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgwLFwiICsgdHJhbnNmb3JtWVByZSArIFwicHgsMClcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJChcIiNub3RpZmljYXRpb25cIikuY3NzKHtcclxuICAgICAgICAgIHRyYW5zaXRpb246IFwiYWxsIDFzXCIsXHJcbiAgICAgICAgICBoZWlnaHQ6IHRyYW5zZm9ybVlQcmUgKyBcInB4XCIsXHJcbiAgICAgICAgICBsaW5lSGVpZ2h0OiB0cmFuc2Zvcm1ZUHJlICsgXCJweFwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgICAgdmFyIGVuZEV2dEhhbmRsZSA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgdGltZV9lbmQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgICAgICB2YXIgZGlzID0gZ2V0RGlzdGFuY2UocG9pbnRfc3RhcnQsIHBvaW50X2VuZCk7XHJcbiAgICAgICAgdmFyIHRpbWUgPSB0aW1lX2VuZCAtIHRpbWVfc3RhcnQ7XHJcbiAgICAgICAgLy/mnoTmiJDmu5Hliqjkuovku7ZcclxuICAgICAgICBpZiAoZGlzID49IHN3aXBfZGlzICYmIHRpbWUgPj0gc3dpcF90aW1lKSB7XHJcbiAgICAgICAgICB2YXIgZGlyID0gZ2V0RGlyZWN0aW9uKHBvaW50X3N0YXJ0LCBwb2ludF9lbmQpLFxyXG4gICAgICAgICAgICBkaXNZID0gcG9pbnRfZW5kLnkgLSBwb2ludF9zdGFydC55LFxyXG4gICAgICAgICAgICBkaXNYID0gcG9pbnRfZW5kLnggLSBwb2ludF9zdGFydC54O1xyXG4gICAgICAgICAgaWYgKGRpc1kgPj0gODAgJiYgZGlyID09IFwiZG93blwiKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IDM7XHJcbiAgICAgICAgICAgIC8v5LiL5ouJ6KGM5Li65pyJ5pWIXHJcbiAgICAgICAgICAgIC8vIGxvYWRNZXNzYWdlKCsrcGFnZSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCfliqDovb3kuK0nKTtcclxuICAgICAgICAgICAgLy/liqDovb3lrozmiJDlkI7ph4rmlL4g562J5b6FMzBzXHJcbiAgICAgICAgICAgIHZhciB0aW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICBpZiAobG9hZE1lc3NhZ2VGbGFnKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI2xpc3RQYW5lbFwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiBcImFsbCAxc1wiLFxyXG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoMCwwLDApXCJcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAvL+aYvuekuuWKoOi9veaIkOWKn1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvYWRNZXNzYWdlRmxhZyA9PSAxKSAkKFwiI25vdGlmaWNhdGlvblwiKS5odG1sKFwiPGkgY2xhc3M9J2ZhIGZhLWNoZWNrLWNpcmNsZS1vIGZhLTJ4IGZhLWZ3JyBzdHlsZT0nY29sb3I6ICMwMEVFMDAnPjwvaT48c3BhbiBjbGFzcz0nc3Itb25seSc+U3VjY2Vzczwvc3Bhbj5cIik7XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChsb2FkTWVzc2FnZUZsYWcgPT0gMikgJChcIiNub3RpZmljYXRpb25cIikuaHRtbChcIuayoeacieabtOWkmua2iOaBr+S6hj1fPVwiKTtcclxuICAgICAgICAgICAgICAgIGxvYWRNZXNzYWdlRmxhZyA9IDA7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgJChcIiNub3RpZmljYXRpb25cIikuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMzBweFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIGxpbmVIZWlnaHQ6IFwiMzBweFwiXHJcbiAgICAgICAgICAgICAgICAgIH0pLmh0bWwoXCJcIikuaGlkZSgpO1xyXG4gICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRpbWVyKTtcclxuICAgICAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgLy8zMHPlkI7lgZzmraJcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcbiAgICAgICAgICAgICAgLy/mmL7npLrliqDovb3lpLHotKVcclxuICAgICAgICAgICAgICAkKFwiI25vdGlmaWNhdGlvblwiKS5odG1sKFwiPGkgY2xhc3M9J2ZhIGZhLXJlbW92ZSBmYS00eCBmYS1mdycgc3R5bGU9J2NvbG9yOiAjMDBFRTAwJz48L2k+PHNwYW4gY2xhc3M9J3NyLW9ubHknPkZhaWxlZDwvc3Bhbj5cIik7XHJcbiAgICAgICAgICAgICAgbG9hZE1lc3NhZ2VGbGFnID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAkKFwiI25vdGlmaWNhdGlvblwiKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICBoZWlnaHQ6IFwiMzBweFwiLFxyXG4gICAgICAgICAgICAgICAgICBsaW5lSGVpZ2h0OiBcIjMwcHhcIlxyXG4gICAgICAgICAgICAgICAgfSkuaHRtbChcIlwiKS5oaWRlKCk7XHJcbiAgICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICAgICAgfSwgMzEwMDApO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChkaXNYID49IDgwICYmIGRpciA9PSBcInJpZ2h0XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gMjtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGlzWCA8IC0zMCAmJiBkaXIgPT0gXCJsZWZ0XCIpIHtcclxuICAgICAgICAgICAgcmVzdWx0ID0gNDtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGlzWSA8IC0zMCAmJiBkaXIgPT0gXCJ1cFwiKSB7XHJcbiAgICAgICAgICAgICQoXCIjbGlzdFBhbmVsXCIpLnNjcm9sbFRvcChwYXJzZUludChNYXRoLmFicyhwb2ludF9lbmQueSAtIHBvaW50X3N0YXJ0LnkpKSk7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICQoXCIjbGlzdFBhbmVsXCIpLmNzcyh7XHJcbiAgICAgICAgICAgIHRyYW5zaXRpb246IFwiYWxsIDFzXCIsXHJcbiAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIlxyXG4gICAgICAgICAgfSkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJzMwcHgnXHJcbiAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgICAgJChcIiNub3RpZmljYXRpb25cIikuY3NzKHtcclxuICAgICAgICAgICAgaGVpZ2h0OiBcIjMwcHhcIixcclxuICAgICAgICAgICAgbGluZUhlaWdodDogXCIzMHB4XCJcclxuICAgICAgICAgIH0pLmh0bWwoXCJcIikuaGlkZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgJChcIiNsaXN0UGFuZWxcIikub24oc3RhcnRFdnQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKCQodGhpcykuc2Nyb2xsVG9wKCkgPD0gMCkge1xyXG4gICAgICAgICAgc3RhcnRFdnRIYW5kbGUoZSk7XHJcbiAgICAgICAgICAkKHRoaXMpLm9uKG1vdmVFdnQsIG1vdmVFdnRIYW5kbGUpO1xyXG4gICAgICAgICAgJCh0aGlzKS5vbihlbmRFdnQsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGVuZEV2dEhhbmRsZShlKTtcclxuICAgICAgICAgICAgJCh0aGlzKS5vZmYobW92ZUV2dCkub2ZmKGVuZEV2dCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBteVRvdWNoRXZlbnQoKTtcclxuICAgIC8vcmVtb3ZlIHRoZSBsb2FkaW5nIGFuaW1lXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgJChcIiNsb2FkaW5nV3JhcFwiKS5hbmltYXRlKHtcclxuICAgICAgICBvcGFjaXR5OiAwXHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAkKFwiI2xvYWRpbmdXcmFwXCIpLmNzcyh7XHJcbiAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcclxuICAgICAgICB9KTtcclxuICAgICAgfSwgMTEwMCk7XHJcbiAgICB9LCAxMDAwKVxyXG5cclxuICAgIC8vc29ja2V0LmlvXHJcbiAgICBhbGxDaGF0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XHJcbiAgICAgIGNvbmZpZy5zb2NrZXQuaWQgPSBhbGxDaGF0LmlkO1xyXG4gICAgICBjb25zdCBzaWQgPSBhbGxDaGF0LmlkO1xyXG4gICAgICBjb25zb2xlLmxvZygnI2Nvbm5lY3RlZCcsIHNpZCwgYWxsQ2hhdCk7XHJcbiAgICAgIC8vIOebkeWQrOiHqui6qyBpZCDku6Xlrp7njrAgcDJwIOmAmuiur1xyXG4gICAgICBhbGxDaGF0Lm9uKHNpZCwgbXNnID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZygnI3JlY2VpdmUsJywgbXNnKTtcclxuICAgICAgICBzd2l0Y2ggKG1zZy5kYXRhLmFjdGlvbikge1xyXG4gICAgICAgICAgY2FzZSAnZGVueSc6XHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ+S9oOiiq+W8uuWItuS4i+e6vycpO1xyXG4gICAgICAgICAgICAgIHNob3dOb3RpZmljYXRpb24oJ+S9oOiiq+W8uuWItuS4i+e6vycpO1xyXG4gICAgICAgICAgICAgIGFsbENoYXQuY2xvc2UoKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDmjqXmlLblnKjnur/nlKjmiLfliJfooajkv6Hmga9cclxuICAgIGFsbENoYXQub24oJ29ubGluZScsIG1zZyA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCcjb25saW5lLCcsIG1zZyk7XHJcbiAgICAgIHN3aXRjaCAobXNnLmFjdGlvbikge1xyXG4gICAgICAgIC8vdXBkYXRlIHVzZXIgbGlzdCBpbiByb29tXHJcbiAgICAgICAgY2FzZSAndXBkYXRlJzpcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgLy9wdXNoIHNlbGYgaW50byBvbmxpbmVVc2Vyc1xyXG4gICAgICAgICAgICBtc2cub25saW5lVXNlcnMudW5zaGlmdCh7XHJcbiAgICAgICAgICAgICAgdXNlcmlkOiBjb25maWcudXNlcmluZm8udXNlcmlkLFxyXG4gICAgICAgICAgICAgIHVzZXJuYW1lOiBjb25maWcudXNlcmluZm8udXNlcm5hbWUsXHJcbiAgICAgICAgICAgICAgc29ja2V0aWQ6IGNvbmZpZy5zb2NrZXQuaWQsXHJcbiAgICAgICAgICAgICAgYXZhdGFyOiBjb25maWcudXNlcmluZm8uYXZhdGFyLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJChcIiNhY2NvcmRpb25cIikuYXBwZW5kKHJvb21DYXJkQm94Q29tcGlsZWQoe1xyXG4gICAgICAgICAgICAgIG9ubGluZVVzZXJzOiBtc2cub25saW5lVXNlcnMsXHJcbiAgICAgICAgICAgICAgcm9vbTogY29uZmlnLnNvY2tldC5yb29tLFxyXG4gICAgICAgICAgICAgIG9ubGluZUNvdW50OiBtc2cub25saW5lVXNlcnMubGVuZ3RoICsgMSxcclxuICAgICAgICAgICAgICBtYXg6IG1zZy5tYXgsXHJcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcclxuICAgICAgICAgICAgfSkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9yb29tIG1lc3NhZ2VcclxuICAgIGFsbENoYXQub24oXCJyb29tX21lc3NhZ2VcIiwgKG1zZykgPT4ge1xyXG4gICAgICBtc2cgPSBnZXRQYXlsb2FkRnJvbU1zZyhtc2cpO1xyXG4gICAgICAkKFwiI2xpc3RQYW5lbFwiKS5hcHBlbmQobWVzc2FnZUJveENvbXBpbGVkKG1zZykpO1xyXG4gICAgICBzY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgfSlcclxuXHJcbiAgICAvL3NlbmQgcm9vbSBtZXNzYWdlXHJcbiAgICAkKFwiI3NlbmRCdG5cIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgbXNnID0ge1xyXG4gICAgICAgIGZyb206IGNvbmZpZy51c2VyaW5mby51c2VyaWQsXHJcbiAgICAgICAgLy8gdG86IGNvbmZpZy5zb2NrZXQucm9vbSxcclxuICAgICAgICB0b1R5cGU6ICdyb29tJyxcclxuICAgICAgICByb29tOiBjb25maWcuc29ja2V0LnJvb20sXHJcbiAgICAgICAgY29udGVudDogJChcIiNpbnB1dFRleHRcIikuaHRtbCgpLFxyXG4gICAgICB9O1xyXG4gICAgICAvL+WGheWuueS4uuepuuWImei/lOWbnlxyXG4gICAgICBpZiAoIW1zZy5jb250ZW50KSByZXR1cm47XHJcbiAgICAgIGFsbENoYXQuZW1pdChcInJvb21fbWVzc2FnZVwiLCBtc2cpO1xyXG4gICAgICAkKFwiI2lucHV0VGV4dFwiKS5odG1sKFwiXCIpO1xyXG4gICAgICBtc2cuZnJvbSA9IHtcclxuICAgICAgICB1c2VyaWQ6IGNvbmZpZy51c2VyaW5mby51c2VyaWQsXHJcbiAgICAgICAgdXNlcm5hbWU6IGNvbmZpZy51c2VyaW5mby51c2VybmFtZSxcclxuICAgICAgICBhdmF0YXI6IGNvbmZpZy51c2VyaW5mby5hdmF0YXIsXHJcbiAgICAgIH07XHJcbiAgICAgICQoXCIjbGlzdFBhbmVsXCIpLmFwcGVuZChtZXNzYWdlQm94Q29tcGlsZWQobXNnLCBcInJpZ2h0XCIpKTtcclxuICAgICAgdmFyIHNjcm9sbEhlaWdodCA9ICQoXCIjbGlzdFBhbmVsXCIpWzBdLnNjcm9sbEhlaWdodCAtICQoXCIjbGlzdFBhbmVsXCIpWzBdLmNsaWVudEhlaWdodDtcclxuICAgICAgJChcIiNsaXN0UGFuZWxcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgc2Nyb2xsVG9wOiBzY3JvbGxIZWlnaHRcclxuICAgICAgfSwgMzAwKTtcclxuICAgICAgdmFyIG1pbkhlaWdodCA9IHBhcnNlSW50KCQoXCIjaW5wdXRUZXh0XCIpLmNzcyhcIm1pbkhlaWdodFwiKSk7XHJcbiAgICAgIGlmICgkKHRoaXMpWzBdLmNsaWVudEhlaWdodCAhPT0gbWluSGVpZ2h0KSB7XHJcbiAgICAgICAgJChcIiNzZW5kQnRuXCIpLmNzcyhcImhlaWdodFwiLCBtaW5IZWlnaHQpO1xyXG4gICAgICAgICQoXCIjZW1vamlCdG5cIikuY3NzKFwiaGVpZ2h0XCIsIG1pbkhlaWdodCk7XHJcbiAgICAgICAgJChcIiNsaXN0UGFuZWxcIikuY3NzKFwiaGVpZ2h0XCIsIFwiY2FsYygxMDB2aCAtIDQwcHggLSBcIiArIG1pbkhlaWdodCArIFwicHgpXCIpXHJcbiAgICAgIH1cclxuICAgICAgc2Nyb2xsVG9Cb3R0b20oKVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyDns7vnu5/kuovku7ZcclxuICAgIGFsbENoYXQub24oJ2Rpc2Nvbm5lY3QnLCBtc2cgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnI2Rpc2Nvbm5lY3QnLCBtc2cpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYWxsQ2hhdC5vbignZGlzY29ubmVjdGluZycsICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJyNkaXNjb25uZWN0aW5nJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBhbGxDaGF0Lm9uKCdlcnJvcicsICgpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJyNlcnJvcicpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy/ns7vnu5/pgJrnn6VcclxuICAgIGFsbENoYXQub24oJ25vdGlmaWNhdGlvbicsIChtc2cpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJyNub3RpZmljYXRpb24nLCBtc2cpO1xyXG4gICAgICBzaG93Tm90aWZpY2F0aW9uKG1zZy5kYXRhLnBheWxvYWQuY29udGVudCk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8v57O757uf5o+Q56S6XHJcbiAgICBhbGxDaGF0Lm9uKCdpbmZvJywgKG1zZykgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnI2luZm8nLCBtc2cpO1xyXG4gICAgICBtc2cgPSBnZXRQYXlsb2FkRnJvbU1zZyhtc2cpO1xyXG4gICAgICAkKFwiI2xpc3RQYW5lbFwiKS5hcHBlbmQoaW5mb0JveENvbXBpbGVkKG1zZykpO1xyXG4gICAgICBzY3JvbGxUb0JvdHRvbSgpO1xyXG4gICAgfSlcclxuICB9IGVsc2Uge1xyXG4gICAgYWxlcnQoJ1NlcnZlciBFcnJvciEnKTtcclxuICB9XHJcbn0pXHJcblxyXG4kKCdib2R5Jykub24oe1xyXG4gICdjbGljayc6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICBpZiAodGFyZ2V0ID09ICQoJyNwbHVzQnRuJylbMF0pIHtcclxuICAgICAgbGV0IGJvdHRvbSA9ICQoXCIjaW5wdXRCb3hcIikuaGVpZ2h0KClcclxuICAgICAgJCgnI3BsdXNQYW5lbCcpLmNzcyh7XHJcbiAgICAgICAgZGlzcGxheTogJ2ZsZXgnLFxyXG4gICAgICAgIG9wYWNpdHk6ICcwJyxcclxuICAgICAgICBib3R0b206IDBcclxuICAgICAgfSkuYWRkQ2xhc3MoJ3BsdXNQYW5lbFNob3cnKS5hbmltYXRlKHtcclxuICAgICAgICBib3R0b206IGJvdHRvbVxyXG4gICAgICB9LCAzMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgJCgnI3BsdXNQYW5lbCcpLnJlbW92ZUNsYXNzKCdwbHVzUGFuZWxTaG93JykuY3NzKHtcclxuICAgICAgICBkaXNwbGF5OiAnbm9uZScsXHJcbiAgICAgICAgYm90dG9tOiAwXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSlcclxuXHJcbiQoJyNjaG9vc2VJbWFnZScpLm9uKCdjaGFuZ2UnLCAoKSA9PiB7XHJcbiAgbGV0IGZpbGUgPSBuZXcgRm9ybURhdGEoKTtcclxuICBsZXQgZGF0YSA9ICQoJyNjaG9vc2VJbWFnZScpWzBdLmZpbGVzWzBdO1xyXG4gIGZpbGUuYXBwZW5kKCdmaWxlJywgZGF0YSk7XHJcbiAgbGV0IG9ucHJvZ3Jlc3MgPSAoZXZ0KSA9PiB7XHJcbiAgICBsZXQgbG9hZGVkID0gZXZ0LmxvYWRlZDsgLy/lt7Lnu4/kuIrkvKDlpKflsI/mg4XlhrUgXHJcbiAgICBsZXQgdG90ID0gZXZ0LnRvdGFsOyAvL+mZhOS7tuaAu+Wkp+WwjyBcclxuICAgIGxldCBwZXIgPSBNYXRoLmZsb29yKDEwMCAqIGxvYWRlZCAvIHRvdCk7IC8v5bey57uP5LiK5Lyg55qE55m+5YiG5q+UIFxyXG4gICAgLy8gJCgnI2Mtci1zLXBhbmVsLWd1ZXN0cy1hZGRuZXctYXZhdGFyJykucHJldigpLmNoaWxkcmVuKCdpJykuY3NzKHtcclxuICAgIC8vICAgaGVpZ2h0OiBwZXIgKyAnJSdcclxuICAgIC8vIH0pXHJcbiAgICBjb25zb2xlLmluZm8oJ3VwbG9hZDonLCBwZXIpO1xyXG4gIH1cclxuICBsZXQgdXJsID0gYC9hbGxDaGF0L3VwbG9hZEltYWdlP3VzZXJpZD0ke2NvbmZpZy51c2VyaW5mby51c2VyaWR9YDtcclxuXHJcbiAgJC5hamF4KHtcclxuICAgIHVybDogdXJsLFxyXG4gICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgY29udGVudFR5cGU6IGZhbHNlLFxyXG4gICAgcHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG4gICAgZGF0YTogZmlsZSxcclxuICAgIHhocjogZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgeGhyID0gJC5hamF4U2V0dGluZ3MueGhyKCk7XHJcbiAgICAgIGlmIChvbnByb2dyZXNzICYmIHhoci51cGxvYWQpIHtcclxuICAgICAgICB4aHIudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoXCJwcm9ncmVzc1wiLCBvbnByb2dyZXNzLCBmYWxzZSk7XHJcbiAgICAgICAgcmV0dXJuIHhocjtcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChyZXMpIHtcclxuICAgICAgaWYgKHJlcyAmJiByZXMgIT0gJy0xJykge1xyXG4gICAgICAgIC8vdXBsb2FkIHN1Y2Nlc3NcclxuICAgICAgICBsZXQgaW1hZ2V1cmwgPSByZXM7XHJcbiAgICAgICAgbGV0IGNvbnRlbnQgPSBgPGltZyBjbGFzcz1cImltYWdlQ29udGVudFwiIHNyYz1cIiR7aW1hZ2V1cmx9XCI+YDtcclxuICAgICAgICB2YXIgbXNnID0ge1xyXG4gICAgICAgICAgZnJvbTogY29uZmlnLnVzZXJpbmZvLnVzZXJpZCxcclxuICAgICAgICAgIHRvOiBjb25maWcuc29ja2V0LnJvb20sXHJcbiAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgYWxsQ2hhdC5lbWl0KFwicm9vbV9tZXNzYWdlXCIsIG1zZyk7XHJcbiAgICAgICAgbXNnLmZyb20gPSB7XHJcbiAgICAgICAgICB1c2VyaWQ6IGNvbmZpZy51c2VyaW5mby51c2VyaWQsXHJcbiAgICAgICAgICB1c2VybmFtZTogY29uZmlnLnVzZXJpbmZvLnVzZXJuYW1lLFxyXG4gICAgICAgICAgYXZhdGFyOiBjb25maWcudXNlcmluZm8uYXZhdGFyLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgJChcIiNsaXN0UGFuZWxcIikuYXBwZW5kKG1lc3NhZ2VCb3hDb21waWxlZChtc2csIFwicmlnaHRcIikpO1xyXG4gICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSAkKFwiI2xpc3RQYW5lbFwiKVswXS5zY3JvbGxIZWlnaHQgLSAkKFwiI2xpc3RQYW5lbFwiKVswXS5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgJChcIiNsaXN0UGFuZWxcIikuYW5pbWF0ZSh7XHJcbiAgICAgICAgICBzY3JvbGxUb3A6IHNjcm9sbEhlaWdodFxyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgc2Nyb2xsVG9Cb3R0b20oKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhmYWlsKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbn0pIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./build/src/component/allChat/allChat.js\n");

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