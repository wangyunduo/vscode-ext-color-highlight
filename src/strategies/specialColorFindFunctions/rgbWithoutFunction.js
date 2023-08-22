import { noRgbPatterns } from '../regexPatterns/colorPatterns.mjs';

export function getRgbNoFnFinders() {
  return noRgbPatterns.map(pattern => text => findRgbNoFn(pattern, text));
}

/**
 * @param {RegExp} pattern
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
async function findRgbNoFn(pattern, text) {
  const regExp = new RegExp(pattern, 'gi');
  let match = regExp.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = regExp.lastIndex;
    const color = 'rgb(' + match[0] + ')';

    result.push({
      start,
      end,
      color,
    });

    match = regExp.exec(text);
  }

  return result;
}
