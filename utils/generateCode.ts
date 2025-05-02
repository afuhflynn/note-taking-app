/**
 * Generates a six-digit verification code.
 * This function creates a random number between 100000 and 999999,
 * ensuring a six-digit code, and converts it to a string.
 *
 * @returns {string} A six-digit verification code as a string.
 *
 * @example
 * const code = generateVerificationCode();
 * console.log(code); // e.g., "123456"
 */
export function generateVerificationCode(): string {
  // Generate a random number between 100000 and 999999 and convert it to a string
  return Math.floor(100000 + Math.random() * 900000).toString();
}
