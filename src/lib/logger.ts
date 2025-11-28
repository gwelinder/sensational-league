/**
 * Structured Logging System for Sensational League
 * 
 * Provides consistent, contextual logging across the application.
 * Designed to be production-ready and extensible for external log services.
 */

type LogLevel = "debug" | "info" | "warn" | "error";

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  email?: string;
  applicantId?: string;
  flowId?: string;
  segmentId?: string;
  [key: string]: string | number | boolean | undefined;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: LogContext;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const LOG_ICONS: Record<LogLevel, string> = {
  debug: "🔍",
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
};

// Get minimum log level from environment (default: info in production, debug in development)
function getMinLogLevel(): LogLevel {
  const envLevel = process.env.LOG_LEVEL as LogLevel | undefined;
  if (envLevel && LOG_LEVELS[envLevel] !== undefined) {
    return envLevel;
  }
  return process.env.NODE_ENV === "production" ? "info" : "debug";
}

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] >= LOG_LEVELS[getMinLogLevel()];
}

function formatLogEntry(entry: LogEntry): string {
  const { timestamp, level, message, context, error } = entry;
  const icon = LOG_ICONS[level];
  
  let logMessage = `${icon} [${timestamp}] [${level.toUpperCase()}]`;
  
  if (context?.component) {
    logMessage += ` [${context.component}]`;
  }
  
  if (context?.action) {
    logMessage += ` [${context.action}]`;
  }
  
  logMessage += ` ${message}`;
  
  // Add context details
  if (context) {
    const contextDetails = Object.entries(context)
      .filter(([key]) => !["component", "action"].includes(key))
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join(" ");
    
    if (contextDetails) {
      logMessage += ` | ${contextDetails}`;
    }
  }
  
  // Add error details
  if (error) {
    logMessage += ` | error=${error.name}: ${error.message}`;
  }
  
  return logMessage;
}

function createLogEntry(
  level: LogLevel,
  message: string,
  context?: LogContext,
  error?: Error
): LogEntry {
  return {
    timestamp: new Date().toISOString(),
    level,
    message,
    context,
    error: error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : undefined,
  };
}

function logToConsole(entry: LogEntry): void {
  const formattedMessage = formatLogEntry(entry);
  
  switch (entry.level) {
    case "debug":
      console.debug(formattedMessage);
      break;
    case "info":
      console.info(formattedMessage);
      break;
    case "warn":
      console.warn(formattedMessage);
      break;
    case "error":
      console.error(formattedMessage);
      if (entry.error?.stack) {
        console.error(entry.error.stack);
      }
      break;
  }
}

/**
 * Create a logger instance with default context
 */
export function createLogger(defaultContext: LogContext) {
  return {
    debug: (message: string, context?: LogContext) => {
      if (!shouldLog("debug")) return;
      const entry = createLogEntry("debug", message, { ...defaultContext, ...context });
      logToConsole(entry);
    },
    
    info: (message: string, context?: LogContext) => {
      if (!shouldLog("info")) return;
      const entry = createLogEntry("info", message, { ...defaultContext, ...context });
      logToConsole(entry);
    },
    
    warn: (message: string, context?: LogContext, error?: Error) => {
      if (!shouldLog("warn")) return;
      const entry = createLogEntry("warn", message, { ...defaultContext, ...context }, error);
      logToConsole(entry);
    },
    
    error: (message: string, context?: LogContext, error?: Error) => {
      if (!shouldLog("error")) return;
      const entry = createLogEntry("error", message, { ...defaultContext, ...context }, error);
      logToConsole(entry);
    },
  };
}

/**
 * Pre-configured loggers for common components
 */
export const logger = {
  // CDP logging
  cdp: createLogger({ component: "CDP" }),
  
  // Email logging
  email: createLogger({ component: "Email" }),
  
  // SharePoint logging
  sharepoint: createLogger({ component: "SharePoint" }),
  
  // Typeform logging
  typeform: createLogger({ component: "Typeform" }),
  
  // API logging
  api: createLogger({ component: "API" }),
  
  // Auth logging
  auth: createLogger({ component: "Auth" }),
  
  // General application logging
  app: createLogger({ component: "App" }),
};

/**
 * Performance timing helper
 */
export function withTiming<T>(
  fn: () => T | Promise<T>,
  loggerInstance: ReturnType<typeof createLogger>,
  action: string,
  context?: LogContext
): T | Promise<T> {
  const start = performance.now();
  
  const logResult = (success: boolean, error?: Error) => {
    const duration = Math.round(performance.now() - start);
    if (success) {
      loggerInstance.info(`${action} completed`, { ...context, durationMs: duration });
    } else {
      loggerInstance.error(`${action} failed`, { ...context, durationMs: duration }, error);
    }
  };
  
  try {
    const result = fn();
    
    if (result instanceof Promise) {
      return result
        .then((value) => {
          logResult(true);
          return value;
        })
        .catch((error) => {
          logResult(false, error as Error);
          throw error;
        }) as Promise<T>;
    }
    
    logResult(true);
    return result;
  } catch (error) {
    logResult(false, error as Error);
    throw error;
  }
}

export type { LogLevel, LogContext, LogEntry };
