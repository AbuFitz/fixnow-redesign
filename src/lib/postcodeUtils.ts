import { LOCATIONS } from "./constants";

/**
 * Validates a UK postcode format
 */
export const isValidPostcodeFormat = (postcode: string): boolean => {
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  
  // UK postcode regex pattern
  const postcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i;
  
  return postcodeRegex.test(cleanPostcode);
};

/**
 * Extracts the outward code (area code) from a postcode
 * E.g., "HP2 7DE" -> "HP2"
 */
export const getOutwardCode = (postcode: string): string => {
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  const match = cleanPostcode.match(/^([A-Z]{1,2}\d{1,2}[A-Z]?)/);
  return match ? match[1] : "";
};

/**
 * Checks if a postcode is within our coverage area
 */
export const isCoveredPostcode = (postcode: string): boolean => {
  const outwardCode = getOutwardCode(postcode);
  
  if (!outwardCode) return false;
  
  // Check if the outward code matches any of our covered locations
  return LOCATIONS.some((location) =>
    location.postcodes.some((code) => outwardCode.startsWith(code))
  );
};

/**
 * Gets the location name for a covered postcode
 */
export const getLocationForPostcode = (postcode: string): string | null => {
  const outwardCode = getOutwardCode(postcode);
  
  if (!outwardCode) return null;
  
  const location = LOCATIONS.find((loc) =>
    loc.postcodes.some((code) => outwardCode.startsWith(code))
  );
  
  return location ? location.name : null;
};

/**
 * Formats a postcode to standard UK format
 * E.g., "hp27de" -> "HP2 7DE"
 */
export const formatPostcode = (postcode: string): string => {
  const clean = postcode.replace(/\s/g, "").toUpperCase();
  
  if (clean.length < 5) return clean;
  
  // Insert space before the last 3 characters
  return clean.slice(0, -3) + " " + clean.slice(-3);
};
