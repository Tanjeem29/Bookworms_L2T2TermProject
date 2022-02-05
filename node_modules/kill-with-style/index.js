var childProcess = require("child_process");

var async = require("async");
var chalk = require("chalk");
var cy = chalk.cyan;
var r = chalk.red;
var gr = chalk.green;

function debug(message) {
	var d = new Date();
	console.log("DEBUG "
		+ ("" + d.getHours()).padStart(2, "0")
		+ ":" + ("" + d.getMinutes()).padStart(2, "0")
		+ ":" + ("" + d.getSeconds()).padStart(2, "0")
		+ "." + ("" + d.getMilliseconds()).padStart(3, "0")
		+ " " +message);
}

function shallowCopy(obj) {
	var copy = {};
	for (var key in obj) {
		copy[key] = obj[key];
	}
	return copy;
}

function fillLast(arr, n) {
	for (var i = arr.length; i < n; i++) {
		arr.push(arr[arr.length - 1]);
	}
	return arr;
}

function normalizeOptions(options) {
	var defaultRetryInterval = 500;
	var defaultRetryCount = 3;
	var defaultTimeout = 2000;

	options = shallowCopy(options);
	if (typeof(options.signal) == "string") {
		options.signal = [options.signal];
	}

	if (options.retryInterval) { // + retryCount + timeout
		if (Array.isArray(options.retryInterval)) {
			options.retryCount = Math.max(options.retryCount || 0, options.retryInterval.length);
		} else {
			options.retryInterval = [options.retryInterval];
			if (!options.hasOwnProperty("retryCount")) {
				options.timeout = options.timeout || defaultTimeout;
				options.retryCount = Math.floor((options.timeout - 1) / options.retryInterval[0]);
			}
		}
		options.retryInterval = fillLast(options.retryInterval, options.retryCount);
		var retryIntervalsSum = options.retryInterval.reduce(function(a, b) { return a + b; }, 0);
		if (!options.timeout || options.timeout <= retryIntervalsSum) {
			var lastInterval = options.retryInterval[options.retryInterval.length - 1];
			options.timeout = retryIntervalsSum + lastInterval;
		}

	} else if (options.retryCount != undefined) { // + timeout
		options.timeout = options.timeout || defaultTimeout;
		if (options.retryCount == 0) {
			options.retryInterval = [];
		} else {
			options.retryInterval = Math.floor(options.timeout / (options.retryCount + 1));
			options.retryInterval = fillLast([options.retryInterval], options.retryCount);
		}

	} else if (options.timeout) {
		if (options.timeout <= defaultRetryInterval) {
			options.retryInterval = [];
			options.retryCount = 0;
		} else {
			options.retryInterval = [defaultRetryInterval];
			options.retryCount = Math.floor((options.timeout - 1) / options.retryInterval[0]);
		}
	} else {
		options.timeout = defaultTimeout;
		options.retryInterval = [defaultRetryInterval];
		options.retryCount = defaultRetryCount;
	}

	options.checkInterval = options.checkInterval || 50;
	options.signal = fillLast(options.signal || ["SIGINT"], options.retryCount + 1);
	options.usePGID = options.usePGID || true;
	options.killChildrenImmediately = options.killChildrenImmediately || false;
	return options;
}

function getProcessesList(callback) {
	var cmd = "ps -A -o ppid,pgid,pid";
	var fields = ["ppid", "pgid", "pid"];

	if (process.platform == "win32") {
		cmd = "wmic PROCESS GET ParentProcessId,ProcessId";
		fields = ["ppid", "pid"];
	}

	childProcess.exec(cmd, { encoding: "utf8" }, function (err, output) {
		if (err) { return callback(err); }

		var ps = output.split("\n").slice(1).filter(Boolean).map(function (line) {
			var entry = {};
			line.split(/\s+/).filter(Boolean).forEach(function (field, i) {
				if (+field == field) {
					field = +field;
				}
				entry[fields[i]] = field;
			})
			return entry;
		});

		callback(null, ps);
	});
}

function getProcessChildren(parentPID, options, callback) {
	var usePGID = options.usePGID;

	if (usePGID && process.platform == "win32") {
		if (options.debug) {
			debug("Can't use PGID on Windows " + r(".usePGID = false") + " for getting children");
		}
		usePGID = false;
	}

	var execStart = Date.now();
	getProcessesList(function (err, ps) {
		if (err) { return callback(err); }

		if (options.debug) {
			debug("getProcessesList exec() took " + cy((Date.now() - execStart) + "ms"));
		}

		var parentEntryIndex = ps.findIndex(function (entry) { return entry.pid == parentPID; });
		if (parentEntryIndex != -1) {
			var parentEntry = ps[parentEntryIndex];
			ps.splice(parentEntryIndex, 1);
		}

		if (usePGID && (!parentEntry || parentEntry.pgid != parentPID)) {
			if (options.debug && usePGID) {
				if (!parentEntry) {
					debug("Parent " + cy("pid=" + parentPID) + " is dead " + r(".usePGID = false") + " for getting children");
				}
				if (parentEntry && parentEntry.pgid != parentPID) {
					debug("Parent " + cy("pid=" + parentPID) + " pid !== pgid " + r(".usePGID = false") + " for getting children");
				}
			}
			usePGID = false;
		}

		var children = {};
		ps.sort(function (a, b) { return a.pid - b.pid; }).forEach(function (entry) {
			if (entry.ppid == parentPID || children[entry.ppid]) {
				children[entry.pid] = entry;
			}
			if (usePGID && entry.pgid == parentPID) {
				children[entry.pid] = entry;
			}
		});
		callback(null, Object.keys(children).map(Number));
	});
}

function checkDead(pid, callback) {
	getProcessesList(function (err, ps) {
		if (err) { return callback(err); }

		var isDead = !ps.find(function (entry) { return entry.pid == pid;});
		callback(null, isDead);
	});
}

function sendSignal(pid, signal) {
	try {
		process.kill(pid, signal);
	} catch (err) {}
}

function tryKillParent(pid, timeoutDate, options, callback) {
	var tryIndex = 0;
	setTimeout(function retry() {
		if (timeoutDate <= Date.now()) { return; }

		var index = tryIndex;
		var retryStart = Date.now();
		var signal = options.signal[index];


		if (options.debug && index > 0) {
			debug("Retry to kill " + cy("pid=" + pid));
		}

		if (options.debug) {
			debug("Send " + cy("signal=" + signal) + " to " + cy("pid=" + pid));
		}

		sendSignal(pid, signal);
		tryIndex += 1;
		setTimeout(function check() {
			if (timeoutDate <= Date.now()) { return; }

			var checkStart = Date.now();
			if (options.debug) { debug("Check " + cy("pid=" + pid)); }
			checkDead(pid, function (err, isDead) {
				if (options.debug) {
					debug("checkDead exec() took " + cy((Date.now() - checkStart) + "ms"));
					debug(cy("pid=" + pid) + " " + (isDead ? cy("is dead") : r("is alive")));
				}

				if (err) { return callback(err); }

				if (timeoutDate <= Date.now()) { return; }
				
				if (isDead) {
					if (options.debug) {
						debug("Killed " + gr("pid=" + pid));
					}

					return callback();
				}

				var nextCheck = Math.max(Date.now(), checkStart + options.checkInterval);
				if (index < options.retryCount) {
					var nextRetry = retryStart + options.retryInterval[index];
					if (nextCheck < nextRetry) {
						setTimeout(check, nextCheck - Date.now());
					} else {
						setTimeout(retry, Math.max(0, nextRetry - Date.now()));
					}
				} else {
					if (nextCheck < timeoutDate) {
						setTimeout(check, nextCheck - Date.now());
					}
				}
			});
		}, Math.min(options.checkInterval, options.retryInterval));
	}, 0);
}

function kill(pid, options, callback) {
	if (arguments.length == 2) {
		callback = arguments[1];
		options = {}
	}

	options = normalizeOptions(options);
	callback = callback || function () {};

	if (options.debug) {
		debug("kill(" + cy(pid) + ", " + JSON.stringify(options)) + ")";
	}

	var timeoutDate = Date.now() + options.timeout;

	/*
		.usePGID = true, parent is detached pid == pgid
		Parents children got by PGID may contain sub-children
		After parent is killed getting children of children may result in duplicate PIDs
		Filter by pidsScheduled to prevent trying to kill the same process twice.
	*/
	var pidsScheduled = [];
	function tryKillParentWithChildren(pid, callback) {
		pidsScheduled.push(pid);

		if (options.debug) {
			debug("Get children for " + cy("pid=" + pid));
		}

		getProcessChildren(pid, options, function (err, children) {
			if (err) { return callback(err); }

			children = children.filter(function (c) { return pidsScheduled.indexOf(c) == -1; });

			if (options.debug) {
				debug("Try to kill parent " + cy("pid=" + pid) + (children.length ? " with children " + cy(children.join(", ")) : ""));
			}


			if (options.killChildrenImmediately) {
				async.parallel([
					tryKillParent.bind(null, pid, timeoutDate, options),
					tryKillChildren.bind(null, children)
				], callback);
			} else {
				tryKillParent(pid, timeoutDate, options, function (err) {
					if (err) { return callback(err); }
					tryKillChildren(children, callback);
				});
			}
		});
	}

	function tryKillChildren(children, callback) {
		if (options.debug) {
			var checkStart = Date.now();
			debug("Try to kill children of " + cy("pid=" + pid));
		}

		async.each(children, function (pid, callback) {
			if (options.debug) { debug("Check " + cy("pid=" + pid)); }
			checkDead(pid, function (err, isDead) {
				if (err) { return callback(err); }
				
				if (options.debug) {
					debug("checkDead exec() took " + cy((Date.now() - checkStart) + "ms"));
					debug(cy("pid=" + pid) + " " + (isDead ? cy("is dead") : r("is alive")));
				}

				if (isDead) {
					callback();
				} else {
					tryKillParentWithChildren(pid, callback);
				}
			});
		}, callback);
	}

	var timeoutTimeout = setTimeout(function () {
		if (options.debug) {
			debug(r("Timedout") + " killing " + cy("pid=" + pid));
		}

		callback(new Error("Timeout. Can't kill process with pid = " + pid));
	}, options.timeout);

	tryKillParentWithChildren(pid, function () {
		clearTimeout(timeoutTimeout);
		callback.apply(null, arguments);
	});
}

kill._normalizeOptions = normalizeOptions;

module.exports = kill;
