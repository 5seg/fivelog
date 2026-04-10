type Level = "debug" | "log" | "info" | "warn" | "error";

const LEVELS: Record<Level, number> = {
  debug: 0,
  log: 1,
  info: 2,
  warn: 3,
  error: 4,
};

const c = {
  grayBright: "\x1b[38m",
  gray: "\x1b[90m", // gray
  white: "\x1b[37m", // white
  cyan: "\x1b[36m", // cyan
  yellow: "\x1b[33m", // yellow
  red: "\x1b[31m", // red
  reset: "\x1b[0m",
};

const PREFIX_BY_LEVEL: Record<Level, string> = {
  debug: `${c.gray} ⚙ ${c.reset}`,
  log: `${c.gray} › ${c.reset}`,
  info: `${c.cyan} i ${c.reset}`,
  warn: `${c.yellow} ⚠ ${c.reset}`,
  error: `${c.red} x ${c.reset}`,
};

export function createLogger(minLevel: Level = "debug") {
  function write(level: Level, ...args: unknown[]) {
    if (LEVELS[level] < LEVELS[minLevel]) return;
    // const prefix = `${color}[${timestamp()}] [${level.toUpperCase().padEnd(5)}]${RESET}`;
    const prefix = PREFIX_BY_LEVEL[level];
    console[level === "log" ? "log" : level](prefix, ...args);
  }

  return {
    debug: (...args: unknown[]) => write("debug", ...args),
    log: (...args: unknown[]) => write("log", ...args),
    info: (...args: unknown[]) => write("info", ...args),
    warn: (...args: unknown[]) => write("warn", ...args),
    error: (...args: unknown[]) => write("error", ...args),
    setLevel: (level: Level) => {
      minLevel = level;
    },
  };
}

export const logger = createLogger();
export default logger;
