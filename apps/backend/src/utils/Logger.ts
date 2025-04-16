export class Logger {
  private formatMessage(level: string, message: string, data?: any): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${data ? JSON.stringify(data) : ""}`;
  }

  info(message: string, data?: any) {
    console.info(this.formatMessage("info", message, data));
  }

  warn(message: string, data?: any) {
    console.warn(this.formatMessage("warn", message, data));
  }

  log(message: string, data?: any) {
    console.log(this.formatMessage("log", message, data));
  }

  error(message: string, error?: any) {
    console.error(this.formatMessage("error", message, error));
  }
}
