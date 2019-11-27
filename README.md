sgcConsole logs commands to the console in a structured way such that it is easy to debug code. Sections (or functions) are used to create a console log that looks like an executed piece of 'sudo code'.

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

Once installed, sgcConsole needs to be included within your project as follows:

```js
const sgcConsole = require('sgcconsole')
```

Typically, you will want to start with opening a 'function' and then issue one or more messages before closing it:

```js
// Start a new function and log a message
sgcConsole.openFunction(`testFunction()`, `index`)
sgcConsole.messageToConsole(`This is a test message.`)
sgcConsole.closeFunction()
```

## Sub-functions

Functions can be cascaded by simply opening a new function before closing the previous function.

```js
const sgcConsole = require('sgcconsole')

const testValue = 123

// Start a new function
sgcConsole.lineBreakToConsole()
sgcConsole.openFunction(`testFunction()`, `index`)

sgcConsole.messageToConsole(`We might log a value, like '${testValue}'.`)
sgcConsole.messageToConsole(`:)This is a good message.`)
sgcConsole.messageToConsole(`:(This is a bad message.`)

// Start a sub-function and close with a message
sgcConsole.newlineToConsole()
sgcConsole.openFunction(`subFunction()`, `index`)
sgcConsole.messageToConsoleAndClose(`Nothing to see here.`)

// Close the function
sgcConsole.closeFunction()
sgcConsole.lineBreakToConsole()
```

## Smiley's

If you wish to show messages in green or red so that they stand-out, simply place a :) (smiley face) for green text or :( (sad face) for red text:

```js
sgcConsole.openFunction(`testFunction()`, `index`)
sgcConsole.messageToConsole(`:)This is a good message.`)
sgcConsole.messageToConsole(`:(This is a bad message.`)
sgcConsole.closeFunction()
```

## Line breaks

To help separate sections of code, you can include a line break, which will insert a fixed number of characters in a yellow line to the screen:

```js
sgcConsole.lineBreakToConsole()
sgcConsole.openFunction(`testFunction()`, `index`)
sgcConsole.messageToConsole(`This is a test message.`)
sgcConsole.closeFunction()
sgcConsole.lineBreakToConsole()
```

## New line

You can additionally add one or more blank lines by using the newlineToConsole call, which takes the number of lines you wish to insert as a parameter. If no parameter is specified then it defaults to 1.

```js
sgcConsole.newlineToConsole()
sgcConsole.lineBreakToConsole()
sgcConsole.openFunction(`testFunction()`, `index`)
sgcConsole.messageToConsole(`This is a test message.`)
sgcConsole.closeFunction()
sgcConsole.lineBreakToConsole()
sgcConsole.newlineToConsole(10)
```

## Support

This package is under active development as we use it in our own products. If you experience any difficulties, please email hello@sgcmarketing.co.uk and we'll get back to you as soon as possible.
