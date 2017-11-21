const schedule     = require('node-schedule');
const checkUpdates = require('./lib/checkUpdates'); 
const config       = require('./config').worker; 

const j = schedule.scheduleJob(config.interval, async () => {
  await checkUpdates(); 
});