sgcConsole logs commands to the console in a structured way such that it is easy to debug code. Sections (or functions) are used to create a console log that looks like an executed piece of 'sudo code'.

From version 1.0.10, sgcConsole is now implemented as a class, requiring initialisation using the `new` keyword.

Note that in order for the colours to work, you must have a console/terminal that supports colours. By default both bash and zsh do. Developed and tested on a Mac, but should work fine on Windows and Unix.

[![Build Status](https://api.travis-ci.org/tj/sgcconsole.js.svg?branch=master)](http://travis-ci.org/tj/sgcconsole.js)
[![NPM Version](http://img.shields.io/npm/v/sgcconsole.svg?style=flat)](https://www.npmjs.org/package/sgcconsole)
[![NPM Downloads](https://img.shields.io/npm/dm/sgcconsole.svg?style=flat)](https://npmcharts.com/compare/sgcconsole?minimal=true)
[![Install Size](https://packagephobia.now.sh/badge?p=sgcconsole)](https://packagephobia.now.sh/result?p=sgcconsole)

## Installation

This is a [Node.js](https://nodejs.org/en/) package that can be installed from the CLI using the [`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```bash
npm install sgcconsole
```

## Using sgcCode

Once installed, sgcConsole needs to be included within your project as follows. Note that logging is disabled on creation and so the `.loggingEnabled` option needs to be set immediately following the first reference.

```js
const Log = require('sgcconsole')
Log.loggingEnabled = true
```

sgcConsole is implemented using a singleton model, meaning that the object is shared across a project - requiring sgcConsole in subject files will not therefore need the `.loggingEnabled` option setting.

Typically, you will want to start with opening a 'function' and then issue one or more messages before closing it:

```js
// Start a new function and log a message
Log.openFunction(`testFunction()`, `index`)
Log.messageToConsole(`This is a test message.`)
Log.closeFunction()
```

This produces the following output:

![Example 1](https://github.com/SGCMarketing/sgcConsole/raw/master/screenshots/example1.png 'Example 1')

## Turning logging on/off

sgcConsole takes advantage of the environment variable `LOGGING_ENABLED` to determine if output should be made to the console. In order for any logging to occur, this environment variable must be present and set to `true`.

## Sub-functions

Functions can be cascaded by simply opening a new function before closing the previous function.

```js
const testValue = 123

// Start a new function
Log.lineBreakToConsole()
Log.openFunction(`testFunction()`, `index`)

Log.messageToConsole(`We might log a value, like '${testValue}'.`)
Log.messageToConsole(`:)This is a good message.`)
Log.messageToConsole(`:(This is a bad message.`)

// Start a sub-function and close with a message
Log.newlineToConsole()
Log.openFunction(`subFunction()`, `index`)
Log.messageToConsoleAndClose(`Nothing to see here.`)

// Close the function
Log.closeFunction()
Log.lineBreakToConsole()
```

This produces the following output:

![Example 2](https://github.com/SGCMarketing/sgcConsole/raw/master/screenshots/example2.png 'Example 2')

## Smiley's

If you wish to show messages in green or red so that they stand-out, simply place a :) (smiley face) for green text or :( (sad face) for red text:

```js
Log.openFunction(`testFunction()`, `index`)
Log.messageToConsole(`:)This is a good message.`)
Log.messageToConsole(`:(This is a bad message.`)
Log.closeFunction()
```

## Line breaks

To help separate sections of code, you can include a line break, which will insert a fixed number of characters in a yellow line to the screen:

```js
Log.lineBreakToConsole()
Log.openFunction(`testFunction()`, `index`)
Log.messageToConsole(`This is a test message.`)
Log.closeFunction()
Log.lineBreakToConsole()
```

## New line

You can additionally add one or more blank lines by using the newlineToConsole call, which takes the number of lines you wish to insert as a parameter. If no parameter is specified then it defaults to 1.

```js
Log.newlineToConsole()
Log.lineBreakToConsole()
Log.openFunction(`testFunction()`, `index`)
Log.messageToConsole(`This is a test message.`)
Log.closeFunction()
Log.lineBreakToConsole()
Log.newlineToConsole(10)
```

## Support

This package is under active development as we use it in our own products. If you experience any difficulties, please email hello@sgcmarketing.co.uk and we'll get back to you as soon as possible.
