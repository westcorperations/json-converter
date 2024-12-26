import winston from "winston";

// Create a custom format to include stack trace and location in the logs
const customFormat = winston.format.printf(
  ({ timestamp, level, message, stack }) => {
    return stack
      ? `${timestamp} ${level}: ${message}\n${stack}` // If it's an error, log the stack trace
      : `${timestamp} ${level}: ${message}`; // If not an error, just log the message
  }
);

// Create a logger instance with file and console transports
const logger = winston.createLogger({
  level: "error", // log level
  format: winston.format.combine(
    winston.format.timestamp(), // Adds timestamp to each log
    customFormat // Custom log format
  ),
  transports: [
    // Log to a file (logs will be saved to logs/app.log)
    new winston.transports.File({ filename: "logs/app.log" }),
    // Log to console (for development)
    // new winston.transports.Console({ format: winston.format.simple() }),
  ],
});

export default logger;
