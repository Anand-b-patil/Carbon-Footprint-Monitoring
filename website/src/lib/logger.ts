export const LogTags = {
  AUTH: "AUTH",
};

export const Logger = {
  d: (tag: string, msg?: unknown) => {
    // debug
    console.debug(`[DEBUG] [${tag}]`, msg);
  },
  e: (tag: string, msg?: unknown) => {
    // error
    console.error(`[ERROR] [${tag}]`, msg);
  },
  i: (tag: string, msg?: unknown) => {
    // info
    console.info(`[INFO] [${tag}]`, msg);
  },
  getStackTraceString: (err: unknown) => {
    if (err instanceof Error && err.stack) return err.stack;
    return String(err);
  },
};
