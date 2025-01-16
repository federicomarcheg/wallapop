const pino = require('pino');
const { createLogger, format, transports } = require('winston');



const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message}) => {
            return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
        })
    ),

    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
    ],
   
   
    transport: {
        target: 'pino-pretty',
    },
});

module.exports = logger;
