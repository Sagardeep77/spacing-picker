/**
 * Checks if a margin value is valid according to CSS margin syntax.
 * Accepts units, numbers, and keywords (auto, inherit, initial, unset).
 * @param value - The margin value to validate.
 * @returns True if valid, false otherwise.
 */
export function isValidMargin(value: string): boolean {
  const unitPattern = '-?\\d+(\\.\\d+)?(px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc|ex|ch|q)';
  const keywordPattern = 'auto|inherit|initial|unset';
  const singleValue = `(${keywordPattern}|${unitPattern})`;
  const fullPattern = new RegExp(`^${singleValue}(\\s+${singleValue}){0,3}$`);
  return fullPattern.test(value.trim());
}

/**
 * Checks if a padding value is valid according to CSS padding syntax.
 * Accepts units, numbers, and global keywords (inherit, initial, unset).
 * @param value - The padding value to validate.
 * @returns True if valid, false otherwise.
 */
export function isValidPadding(value: string): boolean {
  const unitPattern = '-?\\d+(\\.\\d+)?(px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc|ex|ch|q)';
  const globalKeywordPattern = 'inherit|initial|unset';
  const singleValue = `(${globalKeywordPattern}|${unitPattern})`;
  const fullPattern = new RegExp(`^${singleValue}(\\s+${singleValue}){0,3}$`);
  return fullPattern.test(value.trim());
}

export function parseListAttributes (value:string):string[] {
  try {
    if (value.startsWith("[")) return JSON.parse(value);
    return value.split(",").map((s) => s.trim());
  } catch (err) {
    console.warn("Invalid list format:", value);
    return [];
  }
}