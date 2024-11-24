import log from 'loglevel';

// Set default log level (can be adjusted based on environment)
const defaultLevel = process.env.NODE_ENV === 'production' ? 'warn' : 'debug';
log.setLevel(defaultLevel);

// Utility methods for logging
const logger = {
  debug: (...args) => log.debug(...args),
  info: (...args) => log.info(...args),
  warn: (...args) => log.warn(...args),
  error: (...args) => log.error(...args),
  setLevel: (level) => log.setLevel(level),
  getLevel: () => log.getLevel(),
};

// Example of changing log level dynamically
// logger.setLevel('info');

export default logger;
