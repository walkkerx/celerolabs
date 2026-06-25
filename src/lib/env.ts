// ─── Environment Validation Module ───────────────────────────────────────────
// Validates critical environment variables at startup.
// In production: logs CRITICAL warnings for misconfigurations.
// In development: logs a brief info message that validation is skipped.

const COMMON_PASSWORDS = [
  "admin",
  "password",
  "xcelero2026",
  "administrator",
  "root",
  "letmein",
  "welcome",
  "123456",
  "qwerty",
  "abc123",
];

const SECRET_PLACEHOLDERS = [
  "change-in-production",
  "your-random",
  "secret-key",
  "example",
  "placeholder",
  "todo",
  "replace-me",
];

// ─── Individual Validators ──────────────────────────────────────────────────

/**
 * Validates password strength.
 * Criteria: length >= 12, uppercase, lowercase, number, special char, not a common password.
 */
export function isStrongPassword(password: string): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (password.length < 12) {
    issues.push(`Password is only ${password.length} characters (minimum: 12)`);
  }

  if (!/[A-Z]/.test(password)) {
    issues.push("Missing uppercase letter");
  }

  if (!/[a-z]/.test(password)) {
    issues.push("Missing lowercase letter");
  }

  if (!/[0-9]/.test(password)) {
    issues.push("Missing number");
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    issues.push("Missing special character");
  }

  const lowerPassword = password.toLowerCase();
  for (const common of COMMON_PASSWORDS) {
    if (lowerPassword === common || lowerPassword.includes(common)) {
      issues.push(`Password contains or matches a common password: "${common}"`);
      break;
    }
  }

  if (
    password.includes("change-in-production") ||
    password.includes("your-secure")
  ) {
    issues.push("Password contains a placeholder string");
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Validates secret strength.
 * Criteria: length >= 32, not a placeholder string.
 */
export function isStrongSecret(secret: string): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (secret.length < 32) {
    issues.push(
      `Secret is only ${secret.length} characters (minimum: 32)`
    );
  }

  const lowerSecret = secret.toLowerCase();
  for (const placeholder of SECRET_PLACEHOLDERS) {
    if (lowerSecret.includes(placeholder)) {
      issues.push(
        `Secret contains placeholder string: "${placeholder}"`
      );
      break;
    }
  }

  return { valid: issues.length === 0, issues };
}

/**
 * Checks whether a database URL points to PostgreSQL.
 */
export function isPostgresUrl(url: string): boolean {
  return (
    url.includes("postgresql://") || url.includes("postgres://")
  );
}

// ─── Production Environment Validation ───────────────────────────────────────

/**
 * Validates all critical environment variables.
 * Only runs checks when NODE_ENV=production.
 * Does NOT throw or crash the app — logs CRITICAL warnings instead.
 */
export function validateProductionEnv(): void {
  const nodeEnv = process.env.NODE_ENV;

  if (nodeEnv !== "production") {
    console.info(
      "[env] Skipping production environment validation (NODE_ENV=%s)",
      nodeEnv || "undefined"
    );
    return;
  }

  console.info("[env] Running production environment validation...");

  // ── DATABASE_URL ──
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error(
      "[env] CRITICAL: DATABASE_URL is not set. The application will not be able to connect to a database."
    );
  } else if (databaseUrl.includes("file:")) {
    console.error(
      "[env] CRITICAL: DATABASE_URL points to SQLite (file:). SQLite is NOT suitable for production. Use PostgreSQL (postgresql:// or postgres://). Current URL starts with: %s",
      databaseUrl.substring(0, 20) + "..."
    );
  } else if (!isPostgresUrl(databaseUrl)) {
    console.error(
      "[env] CRITICAL: DATABASE_URL does not point to PostgreSQL. Production requires PostgreSQL (postgresql:// or postgres://). Current URL starts with: %s",
      databaseUrl.substring(0, 20) + "..."
    );
  } else {
    console.info("[env] DATABASE_URL: OK (PostgreSQL detected)");
  }

  // ── ADMIN_PASSWORD ──
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error(
      "[env] CRITICAL: ADMIN_PASSWORD is not set. Admin login will be non-functional."
    );
  } else {
    // Production requires 16+ chars (stricter than isStrongPassword's 12)
    const passwordIssues: string[] = [];

    if (adminPassword.length < 16) {
      passwordIssues.push(
        `Password is only ${adminPassword.length} characters (production minimum: 16)`
      );
    }

    if (!/[A-Z]/.test(adminPassword)) {
      passwordIssues.push("Missing uppercase letter");
    }

    if (!/[a-z]/.test(adminPassword)) {
      passwordIssues.push("Missing lowercase letter");
    }

    if (!/[0-9]/.test(adminPassword)) {
      passwordIssues.push("Missing number");
    }

    if (!/[^A-Za-z0-9]/.test(adminPassword)) {
      passwordIssues.push("Missing special character");
    }

    const lowerPassword = adminPassword.toLowerCase();
    for (const common of COMMON_PASSWORDS) {
      if (lowerPassword === common || lowerPassword.includes(common)) {
        passwordIssues.push(
          `Password contains or matches a common password: "${common}"`
        );
        break;
      }
    }

    if (
      adminPassword.includes("change-in-production") ||
      adminPassword.includes("your-secure")
    ) {
      passwordIssues.push("Password contains a placeholder string");
    }

    if (passwordIssues.length > 0) {
      console.error(
        "[env] CRITICAL: ADMIN_PASSWORD is weak. Issues: %s",
        passwordIssues.join("; ")
      );
    } else {
      console.info("[env] ADMIN_PASSWORD: OK (meets strength requirements)");
    }
  }

  // ── ADMIN_SECRET ──
  const adminSecret = process.env.ADMIN_SECRET;
  if (!adminSecret) {
    console.error(
      "[env] CRITICAL: ADMIN_SECRET is not set. Admin token generation will fail."
    );
  } else {
    const secretCheck = isStrongSecret(adminSecret);
    if (!secretCheck.valid) {
      console.error(
        "[env] CRITICAL: ADMIN_SECRET is weak. Issues: %s",
        secretCheck.issues.join("; ")
      );
    } else {
      console.info("[env] ADMIN_SECRET: OK (meets strength requirements)");
    }
  }

  // ── NODE_ENV ──
  if (nodeEnv !== "production") {
    // This branch is unreachable due to the early return, but kept for completeness
    console.error(
      "[env] CRITICAL: NODE_ENV is not set to 'production'. Current value: %s",
      nodeEnv || "undefined"
    );
  } else {
    console.info("[env] NODE_ENV: OK (production)");
  }

  console.info("[env] Production environment validation complete.");
}
