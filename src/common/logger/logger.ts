import * as winston from "winston";
import { ILogger } from "./logger.interface";

export class LoggerConfig {}

export class Logger implements ILogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "info",
      transports: [new winston.transports.Console()],
    });
  }

  public debug(message: string, ...args: any[]): void {
    this.log("debug", message, args);
  }

  public info(message: string, ...args: any[]): void {
    this.log("info", message, args);
  }

  public warn(message: string, ...args: any[]): void {
    this.log("warn", message, args);
  }

  public error(message: string, ...args: any[]): void {
    this.log("error", message, args);
  }

  private log(level: string, message: string, args: any[]): void {
    this.logger.log(level, message, args);
  }
}
