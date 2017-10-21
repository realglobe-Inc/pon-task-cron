/**
 * Test case for define.
 * Runs with mocha.
 */
'use strict'

const define = require('../lib/define.js')
const ponContext = require('pon-context')
const asleep = require('asleep')
const {ok} = require('assert')

describe('define', function () {
  this.timeout(4000)

  before(async () => {

  })

  after(async () => {

  })

  it('Define', async () => {
    const ctx = ponContext()

    const task = define('* * * * *', () => console.log('tick!'), {})
    ok(task)

    const {cancel} = await Promise.resolve(task(ctx))

    await asleep(300)

    cancel()
  })
})

/* global describe, before, after, it */
