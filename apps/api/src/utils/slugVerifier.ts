/**
 * Verifies if a string is a valid slug
 * @param slug The string to verify
 * @param options Configuration options
 * @returns {boolean} True if the slug is valid
 */
export function verifySlug(
  slug: string,
  options: {
    allowUnderscores?: boolean;
    allowUppercase?: boolean;
    maxLength?: number;
    minLength?: number;
  } = {}
): boolean {
  const {
    allowUnderscores = true,
    allowUppercase = true,
    maxLength = 50,
    minLength = 3,
  } = options;

  // Basic length checks
  if (slug.length < minLength || slug.length > maxLength) {
    return false;
  }

  // Determine the regex pattern based on options
  let pattern: string;
  if (allowUnderscores && allowUppercase) {
    pattern = "^[a-zA-Z0-9_-]+$";
  } else if (allowUnderscores) {
    pattern = "^[a-z0-9-]+$";
  } else if (allowUppercase) {
    pattern = "^[a-zA-Z0-9-]+$";
  } else {
    pattern = "^[a-z0-9-]+$";
  }

  const regex = new RegExp(pattern);

  // Check against the pattern
  if (!regex.test(slug)) {
    return false;
  }

  // Additional checks
  if (slug.startsWith("-") || slug.endsWith("-")) {
    return false;
  }

  if (allowUnderscores && (slug.startsWith("_") || slug.endsWith("_"))) {
    return false;
  }

  // Check for consecutive special characters
  if (slug.includes("--") || (allowUnderscores && slug.includes("__"))) {
    return false;
  }

  return true;
}
