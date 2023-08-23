const colorHsla = /(hsla?\([\d]{1,3},\s*[\d]{1,3}%,\s*[\d]{1,3}%(,\s*\d?\.?\d+)?\))/gi;

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 *
 * ! unused methods
 * * replaced by findFn(text) in function.js
 */
export async function findHsla(text) {
  let match = colorHsla.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = colorHsla.lastIndex;
    const color = match[0];

    result.push({
      start,
      end,
      color,
    });

    match = colorHsla.exec(text);
  }

  return result;
}
