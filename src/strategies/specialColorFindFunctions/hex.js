/**
 * match[]
 * 0: .#RRGGBB, .#RGB, .#RRGGBBAA, .#RGBA
 * 1: #RRGGBB, #RGB, #RRGGBBAA, #RGBA
 * 2: RRGGBB, RGB, RRGGBBAA, RGBA
 * 3: AA
 * 4: A
 */
const hexPattern = /.?((?:\#|\b0x)([a-f0-9]{6}([a-f0-9]{2})?|[a-f0-9]{3}([a-f0-9]{1})?))\b/gi;

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
function findHex(text, useARGB) {
  let match = hexPattern.exec(text);
  let result = [];

  while (match !== null) {
    const firstChar = match[0][0];
    const matchedColor = match[1];
    const start = match.index + (match[0].length - matchedColor.length);
    const end = hexPattern.lastIndex;

    // Check the symbol before the color match, and try to avoid coloring in the
    // contexts that are not relevant
    // https://github.com/sergiirocks/vscode-ext-color-highlight/issues/25
    if (firstChar.length && /\w/.test(firstChar)) {
      match = hexPattern.exec(text);
      continue;
    }

    try {
      // '#' + match[2] === match[1]
      const color = hexToRgb(match[2], useARGB);

      result.push({
        start,
        end,
        color,
      });
    } catch (e) {}

    match = hexPattern.exec(text);
  }

  return result;
}

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function findHexARGB(text) {
  return findHex(text, true);
}

/**
 * @export
 * @param {string} text
 * @returns {{
 *  start: number,
 *  end: number,
 *  color: string
 * }}
 */
export async function findHexRGBA(text) {
  return findHex(text, false);
}

/**
 * * convert hex color string to rgb color string
 * * https://www.w3.org/TR/css-color-4/#hex-notation
 * @param {string} string - accepts RGB, RGBA, RRGGBB, RRGGBBAA without leading '#', '0x'
 * @param {boolean} argb - if true, treats RGBA, RRGGBBAA as ARGB, AARRGGBB
 * @returns rgb color string in rgb(r g b / a) format
 */
function hexToRgb(string, argb) {
  let rgbColor = string;
  if (string.length < 6) {
    // convert RGB, RGBA to RRGGBB, RRGGBBAA
    rgbColor = '';
    for (const char of string) {
      rgbColor += char + char;
    }
  }

  // convert ARGB to RGBA
  if (argb && rgbColor.length === 8) {
    rgbColor = rgbColor.substring(2, 8) + rgbColor.substring(0, 2);
  }
  // console.log(string, rgbaColor);

  // convert RRGGBB / RRGGBBAA to rgb(r g b / a)
  const r = parseInt(rgbColor.substring(0, 2), 16);
  const g = parseInt(rgbColor.substring(2, 4), 16);
  const b = parseInt(rgbColor.substring(4, 6), 16);
  let a = 1;

  if (rgbColor.length === 8) a = parseInt(rgbColor.substring(6, 8), 16) / 0xff;
  return `rgb(${r} ${g} ${b} / ${a})`;
}
