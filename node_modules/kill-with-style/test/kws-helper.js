#!/usr/bin/env node

var program = require("commander");
var childProcess = require("child_process");

program
	.option("--child", "Is child")
	.option("--die [delay]", "Die after delay")
	.option("--children [n]", "Spawn children")
	.option("--log", "Log to text/log.txt")
	.option("--detached", "Detach children")
	.option("--retries [n]", "Retries needed to kill process")
	.option("--delay [n]", "Delay exit by ms")
	.option("--kill-children", "Kill own children")

program.parse(process.argv);

if (program.die) {
	setTimeout(function () {}, program.die);
} else {
	setInterval(function () {}, 60 * 1000);
}

var children = [];
if (program.children) {
	var nestedChildren = program.children.indexOf(",") != -1;
	var n = 0;
	var subN = 0;
	if (nestedChildren) {
		n = +program.children.slice(0, program.children.indexOf(","));
		subN = program.children.slice(program.children.indexOf(",") + 1);
	} else {
		n = +program.children;
	}

	for (var i = 0; i < n; i++) {
		(function () {
			var cmd = "node kws-helper.js";

			if (process.platform == "win32") {
				cmd = "node.exe kws-helper.js";
			}

			if (subN) {
				cmd += " --children " + subN;
			}
			if (program.log) {
				cmd += " --log";
			}
			if (program.delay) {
				cmd += " --delay " + program.delay;
			}
			if (program.detached) {
				cmd += " --detached";
			}

			var splitted = cmd.split(" ");
			child = childProcess.spawn(splitted[0], splitted.slice(1), {
				cwd: __dirname,
				detached: program.detached
			});

			child.on("error", function (err) {
				console.error(err);
				process.exit(1);
			});
			child.stderr.on("data", function (data) {
				// console.log("stderr(pid=" + child.pid + "): " + data.toString());
				process.exit(1);
			});
			child.stdout.on("data", function (data) {
				data = data.toString();
				var pids = (data.match(/(?:running|child-running)=(\d+)/g) || []).map(function (l) {
					return l.split("=")[1];
				});
				pids.forEach(function (pid) {
					console.log("child-running=" + pid);
				});
				// console.log("stdout(pid=" + child.pid + "): " + data);
			});
			children.push(child);
		})();
	}
	console.log("spawned-children");
}

console.log("running=" + process.pid);

var firstTry = true;
function onSignal(signal) {
	return function () {
		console.log("signal=" + signal + "," + Date.now());
		if (!firstTry) {
			console.log("retry");
		}
		firstTry = false;
		if (program.retries) {
			program.retries -= 1;
			return;
		}
		if (program.log) {
			var message = "Killed " + (program.child ? "child" : "parent") + " pid=" + process.pid + " with signal=" + signal + "\n";
			require("fs").appendFileSync(__dirname + "/log.txt", message, "utf8");
		}
		if (program.killChildren) {
			children.forEach(function (c) {
				process.kill(c.pid);
			});
		}
		if (program.delay) {
			setTimeout(function () {
				console.log("die");
				process.exit();
			}, program.delay);
		} else {
			console.log("die");
			process.exit();
		}
	};
}

process.on("SIGINT", onSignal("SIGINT"));
process.on("SIGTERM", onSignal("SIGTERM"));
