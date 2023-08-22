import namedColor from '../../lib/named-color';

const preparedRePart = Object.keys(namedColor)
  .map(color => `\\b${color}\\b`)
  .join('|');

const namedColorPattern = new RegExp('.?(' + preparedRePart + ')(?!-)', 'g');

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function findNamedColor(text) {
  let match = namedColorPattern.exec(text);
  let result = [];

  while (match !== null) {
    const firstChar = match[0][0];
    const matchedColor = match[1];
    const start = match.index + (match[0].length - matchedColor.length);
    const end = namedColorPattern.lastIndex;

    if (firstChar.length && /[-\\$@#]/.test(firstChar)) {
      match = namedColorPattern.exec(text);
      continue;
    }

    const color =
      'rgb(' + namedColor[matchedColor].r + ' ' + namedColor[matchedColor].g + ' ' + namedColor[matchedColor].b + ')';

    result.push({
      start,
      end,
      color,
    });

    match = namedColorPattern.exec(text);
  }

  return result;
}
