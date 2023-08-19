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
  const hwbPatternGlobal = new RegExp(hwbPattern, 'gi');
  let match = hwbPatternGlobal.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = hwbPatternGlobal.lastIndex;
    const color = match[0];

    result.push({
      start,
      end,
      color,
    });

    match = hwbPatternGlobal.exec(text);
  }

  return result;
}
