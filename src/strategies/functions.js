import { hwbPattern, hslLvl4Pattern } from './regexPatterns/colorPatterns.mjs';

const colorFunctions =
  /((rgb|hsl)a?\(\s*[\d]{1,3}%?\s*(?<commaOrSpace>\s|,)\s*[\d]{1,3}%?\s*\k<commaOrSpace>\s*[\d]{1,3}%?(\s*(\k<commaOrSpace>|\/)\s*\d?\.?\d+%?)?\s*\))/gi;

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function findFn(text) {
  let match = colorFunctions.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = colorFunctions.lastIndex;
    const color = match[0];

    result.push({
      start,
      end,
      color,
    });

    match = colorFunctions.exec(text);
  }

  return result;
}

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
  return [text => find('hwb', text), text => find('hsl', text)];
}

/**
 * @exports
 * @param {string} patternName
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function find(patternName, text) {
  let regExp;
  switch (patternName) {
    case 'hsl': {
      regExp = new RegExp(hslLvl4Pattern, 'gi');
      break;
    }
    case 'hwb': {
      regExp = new RegExp(hwbPattern, 'gi');
      break;
    }
  }

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
