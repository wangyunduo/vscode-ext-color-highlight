import hwbPattern from './regexPatterns/hwbPattern.mjs';

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function findHwb(text) {
  let match = hwbPattern.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = hwbPattern.lastIndex;
    const color = match[0];

    result.push({
      start,
      end,
      color,
    });

    match = hwbPattern.exec(text);
  }

  return result;
}
