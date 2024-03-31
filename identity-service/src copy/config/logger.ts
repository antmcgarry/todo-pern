import winston from 'winston';
import 'dotenv/config';

// Transports
const transportDefinitions = {
  // Normal file logger
  file: {
    level: 'info',
    filename: 'app.log',
    dirname: './logs/',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
  },
  // Logging to console
  console: {
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// timezone function winston calls to get timezone
const timezoned = () =>
  new Date().toLocaleString('en-US', {
    timeZone: process.env.TIME_ZONE,
  });

// logger object with above defined options
const logger = winston.createLogger({
  transports: [
    new winston.transports.File(transportDefinitions.file),
    new winston.transports.Console(transportDefinitions.console),
  ],
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.timestamp({
      format: timezoned,
    }),
    winston.format.printf((logObject) => {
      return `[${logObject.timestamp}] ${logObject.level}: ${logObject.message.trim()}`;
    })
  ),
  exitOnError: false,
});

export const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

export default logger;
