export const LogTags = {
  AUTH: "AUTH",
  LOGIN: "LOGIN",
  SIGNUP: "SIGNUP",
  ANALYTICS: "ANALYTICS",
  EMISSIONS: "EMISSIONS",
  FACTORS: "FACTORS",
  FACILITIES: "FACILITIES",
  INGEST: "INGEST",
  REPORTS: "REPORTS",
  TENANTS: "TENANTS",
  API: "API",
  ERROR: "ERROR"
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
  w: (tag: string, msg?: unknown) => {
    // warning
    console.warn(`[WARN] [${tag}]`, msg);
  },
  getStackTraceString: (err: unknown) => {
    if (err instanceof Error && err.stack) return err.stack;
    return String(err);
  },
  maskToken: (token: string) => {
    if (!token || token.length < 10) return '***';
    return token.slice(0, 6) + '...' + token.slice(-4);
  },
  maskEmail: (email: string) => {
    if (!email || !email.includes('@')) return '***';
    const [local, domain] = email.split('@');
    const maskedLocal = local.length > 2 ? local.slice(0, 2) + '***' : '***';
    return `${maskedLocal}@${domain}`;
  }
};
