import { findHexRGBA } from './specialColorFindFunctions/hex';
import { findNamedColor } from './specialColorFindFunctions/namedColor';
import colorPatterns from './regexPatterns/colorPatterns.mjs';

export function sortStringsDesc(arr) {
  return arr.sort((a, b) => {
    if (b < a) {
      return -1;
    } else if (b > a) {
      return 1;
    } else {
      return 0;
    }
  });
}

export function getColorFinders() {
  return colorPatterns.map(pattern => text => find(pattern, text));
}

export function findColors(text) {
  return [findHexRGBA(text), findNamedColor(text), ...colorPatterns.map(pattern => find(pattern, text))];
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
async function find(pattern, text) {
  const regExp = new RegExp(pattern, 'gi');
  let match = regExp.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = regExp.lastIndex;
    const color = match[0];

    result.push({
      start,
      end,
      color,
    });

    match = regExp.exec(text);
  }

  return result;
}
