import crypto from "node:crypto";

/**
 * @function generateToken () => string
 *@description A function that generates a 30 bits random string.
 * @returns string (e.g d55323172edb8c7f60b555fdaa0414c8c3455e7fc354e6c0b49c0f3b468c)
 * @example const new_accessToken = generateToken(); // string
 * console.log(new_accessToken) // d55323172edb8c7f60b555fdaa0414c8c3455e7fc354e6c0b49c0f3b468c
 */

export const generateToken = (): string => {
  const token = crypto.randomBytes(30).toString("hex");
  return token;
};
