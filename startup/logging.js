const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
  process.on('uncaughtException', (ex) => {
    winston.error(ex.message, ex);
    process.exit(1);
  });
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  })
  
  winston.add(new winston.transports.File({filename: 'logfile.log'}));
  winston.add(new winston.transports.MongoDB({
    db:'mongodb://localhost/vidly',
    level: 'info'
  }));
}