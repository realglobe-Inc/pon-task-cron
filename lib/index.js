/**
 * Cron task for pon
 * @module pon-task-cron
 * @version 1.0.4
 */

'use strict'

const define = require('./define')

let lib = define.bind(this)

Object.assign(lib, define, {
  define
})

module.exports = lib
