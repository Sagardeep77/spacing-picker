
export function isValidMargin(value : string) {
  const unitPattern = '-?\\d+(\\.\\d+)?(px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc|ex|ch|q)';
  const keywordPattern = 'auto|inherit|initial|unset';
  const singleValue = `(${keywordPattern}|${unitPattern})`;
  const fullPattern = new RegExp(`^${singleValue}(\\s+${singleValue}){0,3}$`);
  return fullPattern.test(value.trim());
}

export function isValidPadding(value : string) {
  const unitPattern = '-?\\d+(\\.\\d+)?(px|em|rem|%|vh|vw|vmin|vmax|cm|mm|in|pt|pc|ex|ch|q)';
  const globalKeywordPattern = 'inherit|initial|unset';
  const singleValue = `(${globalKeywordPattern}|${unitPattern})`;
  const fullPattern = new RegExp(`^${singleValue}(\\s+${singleValue}){0,3}$`);
  return fullPattern.test(value.trim());
}
