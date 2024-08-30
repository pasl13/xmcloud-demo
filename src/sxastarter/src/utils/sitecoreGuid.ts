class SitecoreGuidUtils {
  /**
   * Formats a raw UUID (32 characters without hyphens) into the {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} format with uppercase letters.
   * @param uuid - The raw string representing the UUID (32 characters long).
   * @returns The formatted UUID or an empty string if invalid.
   */
  static convertRawToGuid(uuid: string): string {
    if (uuid && uuid.length !== 32) {
      return '';
    }

    // Format the raw UUID string into the standard GUID format with hyphens and uppercase letters.
    const formattedUUID = `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(
      12,
      16
    )}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;

    return `{${formattedUUID.toUpperCase()}}`;
  }

  /**
   * Converts a hyphenated UUID into the {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} format with uppercase letters.
   * @param uuid - The hyphenated UUID string.
   * @returns The formatted UUID with curly braces and uppercase letters, or an empty string if invalid.
   */
  static convertRawHyphenatedToGuid(uuid: string | undefined): string {
    if (!uuid) {
      return '';
    }

    // Regular expression pattern to validate the hyphenated UUID format.
    const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    // Test if the provided UUID matches the expected pattern.
    if (!uuidPattern.test(uuid)) {
      return '';
    }

    // Return the hyphenated UUID in uppercase with curly braces.
    return `{${uuid.toUpperCase()}}`;
  }
}

export default SitecoreGuidUtils;
