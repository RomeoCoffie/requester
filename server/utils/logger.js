const fs = require('fs');
const path = require('path');

class Logger {
  constructor() {
    this.logDir = path.join(__dirname, '../logs');
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir);
    }
  }

  _writeLog(level, ...args) {
    const timestamp = new Date().toISOString();
    const message = args.map(arg => 
      typeof arg === 'object' ? JSON.stringify(arg) : arg
    ).join(' ');
    
    const logEntry = `[${timestamp}] ${level}: ${message}\n`;
    
    // Write to console
    console.log(logEntry);
    
    // Write to file
    const logFile = path.join(this.logDir, `${new Date().toISOString().split('T')[0]}.log`);
    fs.appendFileSync(logFile, logEntry);
  }

  info(...args) {
    this._writeLog('INFO', ...args);
  }

  error(...args) {
    this._writeLog('ERROR', ...args);
  }

  warn(...args) {
    this._writeLog('WARN', ...args);
  }

  debug(...args) {
    this._writeLog('DEBUG', ...args);
  }
}

module.exports = new Logger(); 