const requiredVars = [
    "NEXT_PUBLIC_API_URL",
    "BASE_URL",
    "EXTERNAL_API_URL",
];

/**
 * Returns a list of missing environment variables from the required list.
 * This is a lightweight helper so the `requiredVars` constant is used and
 * doesn't trigger unused-variable lint warnings. Call this from a dev/debug
 * page or server startup code if desired.
 */
export function getMissingEnvVars(): string[] {
    return requiredVars.filter((k) => !process.env[k]);
}

export { requiredVars };

