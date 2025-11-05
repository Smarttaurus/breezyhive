/**
 * Location utility functions for privacy-aware location display
 */

/**
 * Get approximate location from full address/postcode for public display
 * This ensures privacy by showing only area-level location, not exact address
 *
 * @param fullLocation - Full location string (may contain full address/postcode)
 * @param country - Country code (GB, US, CA, AU, etc.)
 * @returns Approximate location string (e.g., "DA10" instead of "DA10 0PP")
 */
export function getApproximateLocation(
  fullLocation: string | null | undefined,
  country: string = 'GB'
): string {
  if (!fullLocation) {
    return 'Location not specified'
  }

  const clean = fullLocation.trim()

  // Route to country-specific handlers
  switch (country.toUpperCase()) {
    case 'GB':
    case 'UK':
      return getUKApproximateLocation(clean)
    case 'US':
      return getUSApproximateLocation(clean)
    case 'CA':
      return getCanadaApproximateLocation(clean)
    case 'AU':
      return getAustraliaApproximateLocation(clean)
    default:
      // For other countries, try to extract just city/area
      return getGenericApproximateLocation(clean)
  }
}

/**
 * UK: Show outward code only (e.g., "DA10" from "DA10 0PP")
 * UK postcodes have two parts: outward code (area) and inward code (specific location)
 */
function getUKApproximateLocation(location: string): string {
  // UK postcode pattern: 1-2 letters, 1-2 digits, optional letter, space, digit, 2 letters
  // We want to extract only the outward code (before the space)
  const postcodeRegex = /\b([A-Z]{1,2}\d{1,2}[A-Z]?)\s*\d[A-Z]{2}\b/i
  const match = location.match(postcodeRegex)

  if (match && match[1]) {
    return match[1].toUpperCase() // Returns "DA10" not "DA10 0PP"
  }

  // Fallback: try to get city name if no postcode found
  const lines = location.split('\n').filter(line => line.trim())
  if (lines.length >= 2) {
    return lines[1] // City is usually on line 1
  }

  return location
}

/**
 * US: Show ZIP-3 (first 3 digits) for privacy
 * E.g., "902" from "90210"
 */
function getUSApproximateLocation(location: string): string {
  // US ZIP code pattern: 5 digits, optionally followed by -4 digits
  const zipRegex = /\b(\d{3})\d{2}(?:-\d{4})?\b/
  const match = location.match(zipRegex)

  if (match && match[1]) {
    return match[1] // Returns first 3 digits
  }

  // Fallback: try to get city name
  const lines = location.split('\n').filter(line => line.trim())
  if (lines.length >= 2) {
    return lines[1]
  }

  return location
}

/**
 * Canada: Show FSA (Forward Sortation Area - first 3 characters)
 * E.g., "M5H" from "M5H 2N2"
 */
function getCanadaApproximateLocation(location: string): string {
  // Canadian postal code: Letter-Digit-Letter space Digit-Letter-Digit
  const postalCodeRegex = /\b([A-Z]\d[A-Z])\s*\d[A-Z]\d\b/i
  const match = location.match(postalCodeRegex)

  if (match && match[1]) {
    return match[1].toUpperCase() // Returns "M5H" not "M5H 2N2"
  }

  // Fallback: try to get city name
  const lines = location.split('\n').filter(line => line.trim())
  if (lines.length >= 2) {
    return lines[1]
  }

  return location
}

/**
 * Australia: Show full postcode (4 digits - already area-level)
 * Australian postcodes are already area-level, so we can show them fully
 */
function getAustraliaApproximateLocation(location: string): string {
  // Australian postcode: 4 digits
  const postcodeRegex = /\b(\d{4})\b/
  const match = location.match(postcodeRegex)

  if (match && match[1]) {
    return match[1]
  }

  // Fallback: try to get city name
  const lines = location.split('\n').filter(line => line.trim())
  if (lines.length >= 2) {
    return lines[1]
  }

  return location
}

/**
 * Generic: For countries without specific handling, show city name
 */
function getGenericApproximateLocation(location: string): string {
  // Try to extract city from multi-line format
  const lines = location.split('\n').filter(line => line.trim())

  if (lines.length >= 2) {
    return lines[1] // City is usually on line 1
  }

  // If single line, try to get first part before comma
  const parts = location.split(',')
  if (parts.length > 1) {
    return parts[0].trim()
  }

  return location
}

/**
 * Extract country code from multi-line location format
 * Expected format:
 * Line 0: Street Address
 * Line 1: City
 * Line 2: County/State
 * Line 3: Postcode/ZIP
 * Line 4: Country
 */
export function extractCountryFromLocation(location: string | null | undefined): string {
  if (!location) return 'GB'

  const lines = location.split('\n').filter(line => line.trim())
  if (lines.length >= 5) {
    return lines[4].trim()
  }

  return 'GB' // Default to UK
}
