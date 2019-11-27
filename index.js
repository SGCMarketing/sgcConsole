// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// index.js
// Console logging functions
//
// Created 27th Nov 2019
// Andy Chadbourne, SGC Marketing Ltd
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Exports
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
module.exports.closeFunction = closeFunction
module.exports.lineBreakToConsole = lineBreakToConsole
module.exports.messageToConsole = messageToConsole
module.exports.messageToConsoleAndClose = messageToConsoleAndClose
module.exports.newlineToConsole = newlineToConsole
module.exports.openFunction = openFunction
module.exports.closeFunctionFull = closeFunctionFull
module.exports.errorToConsoleAndClose = errorToConsoleAndClose

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Global variables
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
global.loggingLevel = -1
global.functionNames = []

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local variables
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var lastFunctionName = ''

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local constants
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const spacesPerTab = 4

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  errorToConsoleAndClose(errorMessage)
//      errorMessage: The error message to be displayed
//
// Same as messageToConsole, but performs a closeFunction() at the end and throws an error.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function errorToConsoleAndClose(error) {
    //

    var spaces = ''
    if (loggingLevel > -1) {
        spaces = ' '.repeat(loggingLevel * spacesPerTab + spacesPerTab)
    }
    console.log(_formatMessage(spaces + `THROW :(${error.message}`, functionNames[loggingLevel]))
    console.log(_formatMessage(spaces + `:(${error.stack}`, functionNames[loggingLevel]))
    closeFunction()

    throw { code: 1, message: error.message }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  messageToConsole(message, callingFunction)
//      message: THe message to be displayed
//      authorisationSummary: The user that is currently authorised via the provided token
//      callingFunction: String defining the file/function that made the call
//
// Log a message to the console.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function messageToConsole(message) {
    //
    var spaces = ''
    if (loggingLevel > -1) {
        spaces = ' '.repeat(loggingLevel * spacesPerTab + spacesPerTab)
    }
    console.log(_formatMessage(spaces + message, functionNames[loggingLevel]))
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  messageToConsoleAndClose(message, callingFunction)
//      message: THe message to be displayed
//      authorisationSummary: The user that is currently authorised via the provided token
//      callingFunction: String defining the file/function that made the call
//
// Same as messageToConsole, but performs a closeFunction() at the end,.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function messageToConsoleAndClose(message) {
    //
    var spaces = ''
    if (loggingLevel > -1) {
        spaces = ' '.repeat(loggingLevel * spacesPerTab + spacesPerTab)
    }
    console.log(_formatMessage(spaces + message, functionNames[loggingLevel]))
    closeFunction()
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  closeFunction()
//
// Close the function.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function closeFunctionFull() {
    //
    var ctr = loggingLevel
    while (ctr > -1) {
        closeFunction()
        ctr--
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  closeFunction()
//
// Close the function.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function closeFunction() {
    //
    var spaces = ''
    if (loggingLevel > 0) {
        spaces = ' '.repeat(loggingLevel * spacesPerTab)
    }

    console.log(_formatMessage(spaces + '}', functionNames[loggingLevel], false))
    loggingLevel--
    functionNames.pop()
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  functionToConsole(message, callingFunction)
//      message: THe message to be displayed
//      authorisationSummary: The user that is currently authorised via the provided token
//      callingFunction: String defining the file/function that made the call
//
// Log a message to the console and indent the rest of the messages until a closeFunction() is performed.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function openFunction(message, callingFunction) {
    //
    functionNames.push(callingFunction)
    loggingLevel++

    lastFunctionName = ''

    var spaces = ''
    if (loggingLevel > 0) {
        spaces = ' '.repeat(loggingLevel * spacesPerTab)
    }
    console.log(_formatMessage(spaces + message + ' {', functionNames[loggingLevel], true))
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//  lineBreakToConsole()
//
// Write a line to the console
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function lineBreakToConsole() {
    //
    const numberOfCharactersInLine = 86
    // Character codes set colour to yellow and then reset
    console.log('\x1b[33m' + '-'.repeat(numberOfCharactersInLine) + '-\x1b[0m')
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// newlineToConsole (numberOfLines)
//      numberOfLines: Number of lines to output
//      callback: The function to call on completion
//
// Write a blank line to the console.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function newlineToConsole(numberOfLines) {
    //
    if (typeof numberOfLines === 'undefined' || numberOfLines <= 0) {
        numberOfLines = 1
    }

    for (var ctr = 0; ctr < numberOfLines; ctr++) {
        console.log('')
    }
}

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// _formatMessage(message, callingFile)
//      message: The message to be displayed
//      callingFile: String defining the file/function that made the call
//
// Format the message prior to display.
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function _formatMessage(message, callingFile, isFunction) {
    //
    const functionMessageLength = 14

    callingFile = '\x1b[35m' + `${' '.repeat(functionMessageLength)} ${callingFile}`.slice(-functionMessageLength) + '\x1b[0m'

    if (isFunction === true || message.replace(/\./g, ' ').trim() === '}') {
        // Colour openFunctions
        message = `\x1b[36m${message}\x1b[0m`
    } else if (message.indexOf(':(') > 0 || message.indexOf('error') > 0 || message.indexOf('Error') > 0 || message.indexOf('Failed') > 0 || message.indexOf('failed') > 0) {
        // Remove face
        message = message.replace(':(', '')
        // Colour error messages
        message = `\x1b[31m${message}\x1b[0m`
    } else if (message.indexOf(':)') !== -1) {
        // Remove face
        message = message.replace(':)', '')
        // Colour success messages
        message = `\x1b[32m${message}\x1b[0m`
    } else {
        // Colour standard text
        message = `\x1b[2m${message}\x1b[0m`
    }

    // Do we need to show callingFile again?
    if (lastFunctionName !== '' && callingFile === lastFunctionName) {
        callingFile = ' '.repeat(functionMessageLength - 4) + '... '
    } else {
        lastFunctionName = callingFile
    }

    return `${callingFile}: ${message}`
}
