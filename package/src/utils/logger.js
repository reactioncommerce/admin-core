/* eslint-disable no-console */
/*
 * configure bunyan logging module for reaction client
 * See: https://github.com/trentm/node-bunyan#levels
 * client we'll cofigure WARN as default
 */
const levels = ["FATAL", "ERROR", "WARN", "INFO", "DEBUG", "TRACE"];

// set stdout log level
let level = process.env.REACTION_LOG_LEVEL || "WARN";

level = level.toUpperCase();

if (!levels.includes(level)) {
  level = "WARN";
}

const Logger = console.log;

export default Logger;
