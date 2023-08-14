const colorHwb = /((hwb)\(\d+\s+(100|0*\d{1,2})%\s+(100|0*\d{1,2})%(\s*\/\s*0?\.?\d+)?\))/gi;

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
  let match = colorHwb.exec(text);
  let result = [];

  while (match !== null) {
    const start = match.index;
    const end = colorHwb.lastIndex;
    const color = match[0];

    result.push({
      start,
      end,
      color,
    });

    match = colorHwb.exec(text);
  }

  return result;
}
