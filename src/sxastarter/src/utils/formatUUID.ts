/**
 * Formats a UUID into the {xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} format.
 * @param uuid - The string representing the UUID.
 * @returns The formatted UUID.
 */
export function formatUUID(uuid: string): string {
  if (uuid?.length !== 32) {
    return '';
  }

  const formattedUUID = `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(
    12,
    16
  )}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
  return `{${formattedUUID.toUpperCase()}}`;
}
