var assert = require("assert");
var kill = require("../index");
var childProcess = require("child_process");
var chalk = require("chalk");

function isSpawnedName(name) {
	var cmd = "ps -A -o command";
	var output = childProcess.execSync(cmd, { encoding: "utf8" });
	var ps = output.split("\n").slice(1).filter(Boolean);
	return ps.find(function (p) { return p.indexOf(name) != -1; });
}

function getProcessesPIDsSync(callback) {
	var cmd = "ps -A -o pid";

	if (process.platform == "win32") {
		cmd = "wmic PROCESS GET ProcessId";
	}

	var output = childProcess.execSync(cmd, { encoding: "utf8" });

	return output.split(/[\n\r]+/).slice(1).filter(Boolean).map(Number);
}

function isSpawnedPID(pid) {
	var pids = getProcessesPIDsSync();
	return pids.indexOf(pid) != -1;
}

function isKilledPID(pid) {
	if (Array.isArray(pid)) {
		return pid.every(isKilledPID);
	}
	return !isSpawnedPID(pid);
}

function killBash(name) {
	if (process.platform != "win32") {
		try {
			var pids = childProcess.execSync("ps -A -o pid,command | grep " + name + " | grep -v grep | awk '{print $1}'", { shell: true, encoding: "utf8" });
			if (pids.length) {
				childProcess.execSync("kill " + pids.split("\n").join(" "), { shell: true, encoding: "utf8" })
			}
		} catch (err) {
		}
	}
}

function killCallback(done, err) {
	if (arguments.length == 1) {
		err = arguments[0];
		done = function () {};
	}
	if (err) { return done(err); }
	done();
}

function splitMessages(parent, callback) {
	parent.stdout.on("data", function (data) {
		data.toString().split("\n").filter(Boolean).forEach(callback);
	});
}

function onMessage(parent, message, callback) {
	splitMessages(parent, function (data) {
		if (data.startsWith(message + "=")) {
			callback.apply(null, data.replace(message + "=", "").split(","));
		} else if (data.startsWith(message)) {
			callback();
		}
	});
}

function waitForNChildren(parent, n, callback) {
	var children = [];
	onMessage(parent, "child-running", function (pid) {
		children.push(pid);
	});
	var interval = setInterval(function () {
		if (children.length == n) {
			clearInterval(interval);
			callback(children);
		}
	}, 50);
}

function inDelta(actual, expected, delta) {
	return (actual > expected - delta && actual < expected + delta);
}

function assertEqualsDelta(actual, expected, delta) {
	var isEqual;
	if (Array.isArray(expected)) {
		isEqual = actual.every(function (v, i) {
			return inDelta(v, expected[i], delta);
		});
	} else {
		isEqual = inDelta(actual, expected, delta);
	}
	if (!isEqual) {
		throw new Error("Expected " + JSON.stringify(actual) + (Array.isArray(expected) ? " every value" : "") + " to be equal " + JSON.stringify(expected) + " in +-" + delta);
	}
}

if (process.platform != "win32" && isSpawnedName("kws-helper")) {
	console.error(chalk.red("Try to kill kws-* processes from the previous run"));
	killBash("kws-helper");
	if (isSpawnedName("kws-helper")) {
		console.error(chalk.red("Error: Can't run tests, kill all kws-* processes manually"));
		process.exit(1);
	}
}

function run(cliArguments, options) {
	if (arguments.length == 1 && typeof(arguments[0]) !== "string") {
		options = arguments[0];
		cliArguments = "";
	}
	cliArguments = cliArguments || "";
	options = options || {};
	options = Object.assign({ cwd: __dirname }, options);
	var cmd = "node kws-helper.js " + cliArguments;

	if (process.platform == "win32") {
		cmd = "node.exe kws-helper.js " + cliArguments;
	}

	var child;
	if (options.shell == true) {
		child = childProcess.spawn(cmd, options);
	} else {
		var splitted = cmd.split(" ");
		child = childProcess.spawn(splitted[0], splitted.slice(1), options);
	}

	child.stderr.on("data", function (data) {
		console.error(data.toString());
		throw new Error("Stderr output from spawned helper");
	});
	return child;
}

if (process.platform == "win32") {
	var defaultOptionsWin = {
		timeout: 100000,
		checkInterval: 500,
		retryInterval: 2000
	};

	var _kill = kill;
	kill = function (pid, callback) {
		var options = {};
		if (arguments.length == 3) {
			options = arguments[1];
			callback = arguments[2];
		}
		options = Object.assign(defaultOptionsWin, options);
		_kill(pid, options, callback);
	};

	kill._normalizeOptions = _kill._normalizeOptions;
}

if (process.platform != "win32") {
	afterEach(function () {
		killBash("kws-helper");
	});

	beforeEach(function () {
		if(isSpawnedName("kws-helper")) {
			throw new Error("Error: Can't run tests, kill all kws-* processes manually");
		}
	});
}

describe("kill", function () {
	it("not detached", function (done) {
		var child = run();
		assert(isSpawnedPID(child.pid));

		onMessage(child, "running", function () {
			kill(child.pid, function (err) {
				if (err) { return done(err); }
				assert(isKilledPID(child.pid));
				done(err);
			});
		});
	});

	it("detached", function (done) {
		// shell: false for Windows
		var child = run({ detached: true, shell: false });
		
		assert(isSpawnedPID(child.pid));

		onMessage(child, "running", function () {
			kill(child.pid, function (err) {
				if (err) { return done(err); }
				assert(isKilledPID(child.pid));
				done();
			});
		});
	});

	it("not inside shell", function (done) {
		var child = run({ shell: false });

		assert(isSpawnedPID(child.pid));

		onMessage(child, "running", function () {
			kill(child.pid, function (err) {
				if (err) { return done(err); }
				assert(isKilledPID(child.pid));
				done();
			});
		});
	});

	it("inside shell", function (done) {
		var child = run({ shell: true });

		assert(isSpawnedPID(child.pid));

		onMessage(child, "running", function () {
			kill(child.pid, function (err) {
				if (err) { return done(err); }
				assert(isKilledPID(child.pid));
				done();
			});
		});
	});

	it("with children", function (done) {
		var child = run("--children 2");
		
		assert(isSpawnedPID(child.pid));

		waitForNChildren(child, 2, function (children) {
			kill(child.pid, function (err) {
				if (err) { return done(err); }
				assert(isKilledPID(child.pid));
				assert(isKilledPID(children));
				done();
			});
		});
	});

	it("children with children", function (done) {
		var child = run("--children 2,1");
		
		assert(isSpawnedPID(child.pid));

		waitForNChildren(child, 4, function (children) {
			kill(child.pid, function (err) {
				if (err) { return done(err); }
				assert(isKilledPID(child.pid));
				assert(isKilledPID(children));
				done();
			});
		});
	});

	it("allow process kill own children on exit", function (done) {
		var child = run("--children 2 --kill-children");
		
		assert(isSpawnedPID(child.pid));

		waitForNChildren(child, 2, function (children) {
			// HACK: hook into debug output of kill()
			var _log = console.log;
			var killOutput = "";
			console.log = function () {
				killOutput += [].join.call(arguments, " ") + "\n";
				if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
				//_log.apply(console, arguments);
			};
			kill(child.pid, { debug: true, retryCount: 0 }, function (err) {
				console.log = _log;
				if (err) { return done(err); }
				assert.equal((killOutput.match(/Send/g) || []).length, 1);
				assert(isKilledPID(child.pid));
				assert(isKilledPID(children));
				done();
			});
		});
	});
});

if (process.platform != "win32") {
	describe(".signal", function () {
		it(".signal=SIGTERM, retries = 0", function (done) {
			var child = run("--delay 1000");
			
			assert(isSpawnedPID(child.pid));

			var signals = [];
			onMessage(child, "signal", function (signal) {
				signals.push(signal);
			});
			onMessage(child, "running", function () {
				kill(child.pid, { signal: "SIGTERM", retryCount: 0 }, function (err) {
					if (err) { return done(err); }
					assert.deepEqual(signals, ["SIGTERM"]);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});

		it(".signal=SIGTERM, retries = 2", function (done) {
			var child = run("--retries 2");
			
			assert(isSpawnedPID(child.pid));

			var signals = [];
			onMessage(child, "signal", function (signal) {
				signals.push(signal);
			});
			onMessage(child, "running", function () {
				kill(child.pid, { signal: "SIGTERM", retryCount: 2 }, function (err) {
					if (err) { return done(err); }
					assert.deepEqual(signals, ["SIGTERM", "SIGTERM", "SIGTERM"]);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});

		it(".signal=[SIGINT,SIGTERM], retries = 2", function (done) {
			var child = run("--retries 2");
			
			assert(isSpawnedPID(child.pid));

			var signals = [];
			onMessage(child, "signal", function (signal) {
				signals.push(signal);
			});
			onMessage(child, "running", function () {
				kill(child.pid, { signal: ["SIGINT", "SIGTERM"], retryCount: 2 }, function (err) {
					if (err) { return done(err); }
					assert.deepEqual(signals, ["SIGINT", "SIGTERM", "SIGTERM"]);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});

		it(".signal=[SIGINT,SIGTERM,SIGTERM], retries = 2", function (done) {
			var child = run("--retries 2");
			
			assert(isSpawnedPID(child.pid));

			var signals = [];
			onMessage(child, "signal", function (signal) {
				signals.push(signal);
			});
			onMessage(child, "running", function () {
				kill(child.pid, { signal: ["SIGINT", "SIGTERM", "SIGTERM"], retryCount: 2 }, function (err) {
					if (err) { return done(err); }
					assert.deepEqual(signals, ["SIGINT", "SIGTERM", "SIGTERM"]);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});

		it(".signal=SIGKILL, retries = 2, should kill on first try", function (done) {
			var child = run("--retries 2");
			
			assert(isSpawnedPID(child.pid));

			var signals = [];
			onMessage(child, "signal", function (signal) {
				signals.push(signal);
			});
			onMessage(child, "running", function () {
				kill(child.pid, { signal: "SIGKILL", retryCount: 2 }, function (err) {
					if (err) { return done(err); }
					assert.deepEqual(signals, []);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});
	});
}

if (process.platform != "win32") {
	describe(".retryCount", function () {
		it("retryCount = 3, retries = 4", function (done) {
			var child = run("--retries 4");
			
			assert(isSpawnedPID(child.pid));

			var retries = 0;
			onMessage(child, "retry", function () {
				retries += 1;
			});
			onMessage(child, "running", function () {
				kill(child.pid, { retryCount: 3}, function (err) {
					assert.equal(retries, 3);
					kill(child.pid, { retryCount: 0}, function (err) {
						if (err) { return done(err); }
						assert(isKilledPID(child.pid));
						done();
					});
				});
			});
		});

		it("retryCount = 3, retries = 3", function (done) {
			var child = run("--retries 3");
			
			assert(isSpawnedPID(child.pid));

			var retries = 0;
			onMessage(child, "retry", function () {
				retries += 1;
			});
			onMessage(child, "running", function () {
				kill(child.pid, { retryCount: 3 }, function (err) {
					if (err) { return done(err); }
					assert.equal(retries, 3);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});
	});
}

describe(".retryInterval", function () {
	it("retryInterval = 1000", function (done) {
		var child = run("--retries 3");
		
		assert(isSpawnedPID(child.pid));

		var lastTryDate;
		var retryInterval = [];
		onMessage(child, "signal", function (signal, date) {
			if (lastTryDate) {
				retryInterval.push(date - lastTryDate);
			}
			lastTryDate = date;
		});
		onMessage(child, "running", function () {
			kill(child.pid, { retryCount: 3, retryInterval: 1000 }, function (err) {
				if (err) { return done(err); }
				assertEqualsDelta(retryInterval, [1000, 1000, 1000], 500);
				assert(isKilledPID(child.pid));
				done();
			});
		});
	});

	it("retryInterval = [1000, 100, 2000]", function (done) {
		var child = run("--retries 3");
		
		assert(isSpawnedPID(child.pid));

		var lastTryDate;
		var retryInterval = [];
		onMessage(child, "signal", function (signal, date) {
			if (lastTryDate) {
				retryInterval.push(date - lastTryDate);
			}
			lastTryDate = date;
		});
		onMessage(child, "running", function () {
			kill(child.pid, { retryCount: 3, retryInterval: [1000, 100, 2000] }, function (err) {
				if (err) { return done(err); }
				assertEqualsDelta(retryInterval, [1000, 100, 2000], 500);
				assert(isKilledPID(child.pid));
				done();
			});
		});
	});
});

if (process.platform != "win32") {
	describe(".timeout", function () {
		it("timeout = 1000, delay = 0", function (done) {
			var child = run();
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				var start = Date.now();
				kill(child.pid, { timeout: 1000 }, function (err) {
					if (err) { return done(err); }
					assertEqualsDelta(Date.now() - start, 0, 500);
					assert(isKilledPID(child.pid));
					done();

				});
			});
		});

		it("timeout = 1000, delay = 2000", function (done) {
			var child = run("--delay 1100");
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				var start = Date.now();
				kill(child.pid, { timeout: 1000 }, function (err) {
					assert(err);
					assertEqualsDelta(Date.now() - start, 1000, 500);
					kill(child.pid, function (err) {
						if (err) { return done(err); }
						assert(isKilledPID(child.pid));
						done();
					});
				});
			});
		});

		it("no retries and checks after timeout", function (done) {
			var child = run("--delay 2000");
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				console.log = function () {
					//_log.apply(console, arguments);
				};
				kill(child.pid, { timeout: 1000, debug: true }, function () {
					console.log = function (text) {
						if (("" + arguments[0]).startsWith("DEBUG")) {
							//_log.apply(console, arguments);
							console.log = _log;
							if (arguments[0].match(/Check|Retry|Send|Kill/)) {
								done(new Error("Output after timeout: \"" + text + "\""));
							}
						} else {
							_log.apply(console, arguments);
						}
					};
					setTimeout(function () {
						console.log = _log;
						kill(child.pid, function (err) {
							if (err) { return done(err); }
							assert(isKilledPID(child.pid));
							done();
						});
					}, 1000);
				});
			});
		});
	});
}

describe(".usePGID", function () {
	if (process.platform == "win32") {
		it("Windows, overwrite .usePGID=false", function (done) {
			var child = run({ detached: true });
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { usePGID: true, debug: true }, function (err) {
					console.log = _log;
					if (err) { return done(err); }
					assert.notEqual(killOutput.indexOf(".usePGID = false"), -1);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});
	}

	if (process.platform != "win32") {
		it("not detached process, overwrite .usePGID=false", function (done) {
			var child = run();
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { usePGID: true, debug: true }, function (err) {
					console.log = _log;
					if (err) { return done(err); }
					assert.notEqual(killOutput.indexOf(".usePGID = false"), -1);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});

		it("detached process, .usePGID=true", function (done) {
			var child = run({ detached: true });
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { usePGID: true, debug: true }, function (err) {
					console.log = _log;
					if (err) { return done(err); }
					assert.equal(killOutput.indexOf(".usePGID = false"), -1);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});
	}
});

if (process.platform != "win32") {
	describe(".checkInterval", function () {
		it(".checkInterval + .retryCount = 0", function (done) {
			var child = run("--delay 1100");
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { debug: true, retryCount: 0, timeout: 3000, checkInterval: 500 }, function (err) {
					console.log = _log;
					if (err) { return done(err); }
					assert.equal((killOutput.match(/Check/g) || []).length, 4);
					assert(isKilledPID(child.pid));
					done();

				});
			});
		});

		it(".checkInterval < .retryInterval", function (done) {
			var child = run("--retries 1");
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { debug: true, retryCount: 1, timeout: 3000, checkInterval: 500, retryInterval: 1999 }, function (err) {
					console.log = _log;
					if (err) { return done(err); }
					assert.equal((killOutput.match(/Check/g) || []).length, 4);
					assert(isKilledPID(child.pid));
					done();
				});
			});
		});

		it(".checkInterval > .retryInterval", function (done) {
			var child = run("--retries 1");
			
			assert(isSpawnedPID(child.pid));

			onMessage(child, "running", function () {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { debug: true, retryCount: 1, timeout: 3000, checkInterval: 1500, retryInterval: 1000 }, function (err) {
					console.log = _log;
					if (err) { return done(err); }
					var checksBeforeRetry = (killOutput.slice(0, killOutput.indexOf("Retry")).match(/Check/g) || []).length;
					assert.equal(checksBeforeRetry, 1);
					assert(isKilledPID(child.pid));
					done();

				});
			});
		});
	});
}

if (process.platform != "win32") {
	describe(".killChildrenImmediately", function () {
		it(".killChildrenImmediately=false", function (done) {
			var child = run("--children 2 --delay 1000");
			
			assert(isSpawnedPID(child.pid));

			waitForNChildren(child, 2, function (children) {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { killChildrenImmediately: false, timeout: 5000, debug: true, retryCount: 0 }, function (err) {
					console.log = _log;
					if (err) { return done(err); }
					var triesBeforeKilled = (killOutput.slice(0, killOutput.indexOf("Killed")).match(/Try to kill parent/g) || []).length;
					assert.equal(triesBeforeKilled, 1);
					assert(isKilledPID(child.pid));
					assert(isKilledPID(children));
					done();
				});
			});
		});

		it(".killChildrenImmediately=true", function (done) {
			var child = run("--children 2 --delay 1000");
			
			assert(isSpawnedPID(child.pid));

			waitForNChildren(child, 2, function (children) {
				// HACK: hook into debug output of kill()
				var _log = console.log;
				var killOutput = "";
				console.log = function () {
					killOutput += [].join.call(arguments, " ") + "\n";
					if (!("" + arguments[0]).startsWith("DEBUG")) { _log.apply(console, arguments); }
					//_log.apply(console, arguments);
				};
				kill(child.pid, { killChildrenImmediately: true, timeout: 5000, debug: true, retryCount: 0 }, function (err) {
					if (err) { return done(err); }
					var triesBeforeKilled = (killOutput.slice(0, killOutput.indexOf("Killed")).match(/Try to kill parent/g) || []).length;
					assert.equal(triesBeforeKilled, 3);
					assert(isKilledPID(child.pid));
					assert(isKilledPID(children));
					done();
				});
			});
		});
	});
}

describe("options priority", function () {
	it(".retryInterval=500", function () {
		var actual = kill._normalizeOptions({
			retryInterval: 500
		});

		var expected = {
			retryInterval: [500, 500, 500],
			retryCount: 3,
			timeout: 2000,
			signal: ["SIGINT", "SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=[100, 200]", function () {
		var actual = kill._normalizeOptions({
			retryInterval: [100, 200]
		});

		var expected = {
			retryInterval: [100, 200],
			retryCount: 2,
			timeout: 100 + 200 + 200,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=100 + .retryCount == .retryInterval.length", function () {
		var actual = kill._normalizeOptions({
			retryInterval: 100,
			retryCount: 2
		});

		var expected = {
			retryInterval: [100, 100],
			retryCount: 2,
			timeout: 100 + 100 + 100,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=[100, 200] + .retryCount > .retryInterval.length", function () {
		var actual = kill._normalizeOptions({
			retryInterval: [100, 200],
			retryCount: 3
		});

		var expected = {
			retryInterval: [100, 200, 200],
			retryCount: 3,
			timeout: 100 + 200 + 200 + 200,
			signal: ["SIGINT", "SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=[100, 200] + .retryCount < .retryInterval.length", function () {
		var actual = kill._normalizeOptions({
			retryInterval: [100, 200],
			retryCount: 1
		});

		var expected = {
			retryInterval: [100, 200],
			retryCount: 2,
			timeout: 100 + 200 + 200,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=500 + .timeout=1500", function () {
		var actual = kill._normalizeOptions({
			retryInterval: 500,
			timeout: 1500
		});

		var expected = {
			retryInterval: [500, 500],
			retryCount: 2,
			timeout: 1500,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=[100, 200], .timeout > sum of .retryInterval", function () {
		var actual = kill._normalizeOptions({
			retryInterval: [100, 200],
			timeout: 400
		});

		var expected = {
			retryInterval: [100, 200],
			retryCount: 2,
			timeout: 400,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=[100, 200], .timeout <= sum of .retryInterval", function () {
		var actual = kill._normalizeOptions({
			retryInterval: [100, 200],
			timeout: 300
		});

		var expected = {
			retryInterval: [100, 200],
			retryCount: 2,
			timeout: 100 + 200 + 200,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=100 + .retryCount + .timeout > all retries + 1", function () {
		var actual = kill._normalizeOptions({
			retryInterval: 100,
			retryCount: 2,
			timeout: 300
		});

		var expected = {
			retryInterval: [100, 100],
			retryCount: 2,
			timeout: 300,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryInterval=100 + .retryCount + .timeout <= all retries + 1", function () {
		var actual = kill._normalizeOptions({
			retryInterval: 100,
			retryCount: 2,
			timeout: 200
		});

		var expected = {
			retryInterval: [100, 100],
			retryCount: 2,
			timeout: 300,
			signal: ["SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryCount=3", function () {
		var actual = kill._normalizeOptions({
			retryCount: 3
		});

		var expected = {
			retryInterval: [500, 500, 500],
			retryCount: 3,
			timeout: 2000,
			signal: ["SIGINT", "SIGINT", "SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".retryCount=0", function () {
		var actual = kill._normalizeOptions({
			retryCount: 0
		});

		var expected = {
			retryInterval: [],
			retryCount: 0,
			timeout: 2000,
			signal: ["SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".timeout=1000 > default retryInterval", function () {
		var actual = kill._normalizeOptions({
			timeout: 1000
		});

		var expected = {
			retryInterval: [500],
			retryCount: 1,
			timeout: 1000,
			signal: ["SIGINT", "SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});

	it(".timeout=1000 <= default retryInterval", function () {
		var actual = kill._normalizeOptions({
			timeout: 500
		});

		var expected = {
			retryInterval: [],
			retryCount: 0,
			timeout: 500,
			signal: ["SIGINT"],
			checkInterval: 50,
			usePGID: true,
			killChildrenImmediately: false
		};

		assert.deepEqual(actual, expected);
	});
});
