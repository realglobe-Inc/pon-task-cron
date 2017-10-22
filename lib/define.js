/**
 * Define task
 * @function define
 * @param {string|Date} when - When to invoke job
 * @param {function|string} job - Job function or executable file
 * @param {Object} [options={}] - Optional settings
 * @returns {function} Defined task
 */
'use strict'

const {scheduleJob} = require('node-schedule')
const path = require('path')
const asleep = require('asleep')
const {spawn} = require('child_process')

/** @lends define */
function define (when, job, options = {}) {
  const {
    env = {},
    unref = false
  } = options

  if (typeof job === 'string') {
    const script = path.resolve(job)
    job = (ctx) => new Promise((resolve, reject) => {
      const spawned = spawn(script, [], {
        env: Object.assign({}, process.env, env),
        stdio: 'inherit'
      })
      spawned.on('close', (code) => resolve(code))
      spawned.on('error', (err) => reject(err))
    })
  }

  async function task (ctx) {
    const {logger} = ctx

    logger.notice(`Crone started for "${when}"`)
    const scheduled = scheduleJob(when, async () => {
      logger.debug(`Job started`)
      await job(ctx)
      logger.debug(`Job finished`)
    })

    process.setMaxListeners(process.getMaxListeners() + 1)
    process.addListener('beforeExit', () => {
      cancel()
    })

    const timer = unref ? -1 : setInterval(() => 10) // Keep process
    const cancel = () => {
      logger.notice('...crone task finished')
      scheduled.cancel()
      clearInterval(timer)
    }
    return {cancel}
  }

  return Object.assign(task,
    // Define sub tasks here
    {}
  )
}

module.exports = define
