'use strict'

const pon = require('pon')
const ponTaskCron = require('pon-task-cron')

;(async () => {
  let run = pon({
    // Define job with crone time
    'job:01': ponTaskCron('42 * * * *', () => {
      console.log('Hey! A hour passed')
    }),

    // Specifying by date
    'job:02': ponTaskCron(new Date('2020/01/12'), () => { /* ... */ })
  })

  run('job:*')
}).catch((err) => console.error(err))
