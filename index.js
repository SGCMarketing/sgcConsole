// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// index.js
// Console logging functions
//
// Created 27th Nov 2019
// Andy Chadbourne, SGC Marketing Ltd
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Global variables
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
global.loggingLevel = -1
global.functionNames = []

// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Local variables
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
var lastFunctionName = ''

class Log {
    constructor() {
        this.spacesPerTab = 4
        this.numberOfCharactersInLine = 86
        this.loggingEnabled = false
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    errorToConsoleAndClose(error) {
        //
        if (this.loggingEnabled !== 'true') {
            throw { code: 1, message: error.message }
        }

        var spaces = ''
        if (loggingLevel > -1) {
            spaces = ' '.repeat(loggingLevel * this.spacesPerTab + this.spacesPerTab)
        }
        console.log(_formatMessage(spaces + `THROW :(${error.message}`, functionNames[loggingLevel]))
        console.log(_formatMessage(spaces + `:(${error.stack}`, functionNames[loggingLevel]))
        this.closeFunction()

        throw { code: 1, message: error.message }
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    messageToConsole(message) {
        //
        if (this.loggingEnabled !== 'true') {
            return
        }

        var spaces = ''
        if (loggingLevel > -1) {
            spaces = ' '.repeat(loggingLevel * this.spacesPerTab + this.spacesPerTab)
        }
        console.log(_formatMessage(spaces + message, functionNames[loggingLevel]))
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    messageToConsoleAndClose(message) {
        //
        if (this.loggingEnabled !== 'true') {
            return
        }

        var spaces = ''
        if (loggingLevel > -1) {
            spaces = ' '.repeat(loggingLevel * this.spacesPerTab + this.spacesPerTab)
        }
        console.log(_formatMessage(spaces + message, functionNames[loggingLevel]))
        this.closeFunction()
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    closeFunctionFull() {
        //
        if (this.loggingEnabled !== 'true') {
            return
        }

        var ctr = loggingLevel
        while (ctr > -1) {
            this.closeFunction()
            ctr--
        }
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    closeFunction() {
        //
        if (this.loggingEnabled !== 'true') {
            return
        }

        var spaces = ''
        if (loggingLevel > 0) {
            spaces = ' '.repeat(loggingLevel * this.spacesPerTab)
        }

        console.log(_formatMessage(spaces + '}', functionNames[loggingLevel], false))
        loggingLevel--
        functionNames.pop()
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    openFunction(message, callingFunction) {
        //
        if (this.loggingEnabled !== 'true') {
            return
        }

        functionNames.push(callingFunction)
        loggingLevel++

        lastFunctionName = ''

        var spaces = ''
        if (loggingLevel > 0) {
            spaces = ' '.repeat(loggingLevel * this.spacesPerTab)
        }
        console.log(_formatMessage(spaces + message + ' {', functionNames[loggingLevel], true))
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    lineBreakToConsole() {
        //
        if (this.loggingEnabled !== 'true') {
            return
        }

        // Character codes set colour to yellow and then reset
        console.log('\x1b[33m' + '-'.repeat(this.numberOfCharactersInLine) + '-\x1b[0m')
    }

    // --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    newlineToConsole(numberOfLines) {
        //
        if (this.loggingEnabled !== 'true') {
            return
        }

        if (typeof numberOfLines === 'undefined' || numberOfLines <= 0) {
            numberOfLines = 1
        }

        for (var ctr = 0; ctr < numberOfLines; ctr++) {
            console.log('')
        }
    }
}

module.exports = new Log()

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
