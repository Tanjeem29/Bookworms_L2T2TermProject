# kill-code

Command line utility for terminating disconnected vscode instances.

## Installation

```
$ npm install -g kill-code
```

## Usage

Run `kill-code` in an interactive terminal, and it will allow you to select a fork to terminate.

```
$ kill-code

Select a vscode-server fork to terminate:

  1000: node my-process.js

This will kill all these processes:
    node my-process.js
Are you sure you want to proceed? ([Y]es / [N]o)
yes
Done
```
