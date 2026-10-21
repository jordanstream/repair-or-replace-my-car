/**
 * Preserve what a person is typing in a controlled numeric field.
 * Zero is blank only before the field has been edited; an explicit "0" stays visible.
 * The calculator's numeric state and validation remain independent of display text.
 */
export function displayEditableNumber(value: number, draft?: string): number | string {
  return draft ?? (value === 0 ? "" : value);
}
