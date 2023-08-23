import { ColorTranslator } from 'colortranslator';
import {
  rgbLegacyNumberPattern,
  rgbLegacyPercentagePattern,
  rgbLvl4NumberPattern,
  rgbLvl4PercentagePattern,
  hwbPattern,
  hslLvl4Pattern,
  hslLegacyPattern,
} from '../strategies/regexPatterns/colorPatterns.mjs';

/**
 * * As of August 16, 2023,
 *   it is not possible to programmatically access the theme colors
 *   https://github.com/microsoft/vscode/issues/32813#
 * * Code for getting customized editor background:
 *   ```
 *   const customizationEditorBackground = vscode.workspace.getConfiguration()
 *     .get('workbench.colorCustomizations')['editor.background'];
 *   ```
 * * In order to stably display readable text on colored backgrounds
 *   with alpha values other than 1 (i.e. transparent backgrounds),
 *   it is necessary to specify a background color for such colors.
 *   The default value is #ffffff, i.e. white.
 * @param  {string} markerBackground
 * @param  {string} color
 * @return {string}
 */
export function getTextBackgroundColor(markerBackground, color) {
  if (markerBackground === 'none') {
    return color;
  }

  const topColor = getColor(color, 'top color');

  if (topColor !== undefined) {
    return textBackgroundColor(markerBackground, topColor, color);
  }

  return color;
}

/**
 * getTextColor
 * * Returns the higher contrast between white and black,
 *   depending on the `color` given.
 * * Uses the definitions of relative luminance and contrast ratio from
 *   WCAG 2.0: https://www.w3.org/TR/WCAG20
 *
 * ! Note that named colors are already parsed as rgb strings
 *   in the words strategy, so the `color` string here does not contain named colors.
 * * The `color` string can contain colors in four formats: rgb, hex, hsl, and hwb.
 * @param {string} color
 * @return {string} `white`('#FFF') or `black`('#000') color
 */
export function getTextColor(color) {
  const white = '#FFF';
  const black = '#000';
  const grey = '#888';

  const parsedColor = getColor(color, 'text color');

  if (parsedColor === undefined) return grey;

  // The color with the maximum contrast ratio to our input color is guaranteed
  // to either be white or black, so we just check both and pick whichever has
  // a higher contrast ratio.

  let luminance = relativeLuminance(parsedColor.R, parsedColor.G, parsedColor.B);

  // This is equivalent to `relativeLuminance(255, 255, 255)` (by definition).
  let luminanceWhite = 1.0;
  // This is equivalent to `relativeLuminance(0, 0, 0)` (by definition).
  let luminanceBlack = 0.0;

  let contrastWhite = contrastRatio(luminance, luminanceWhite);
  let contrastBlack = contrastRatio(luminance, luminanceBlack);
  if (contrastWhite > contrastBlack) {
    return white;
  } else {
    return black;
  }
}

// Note: the rest of this module contains unexported helper functions.

/**
 * get color from `color` string
 *
 * @param {string} color
 * @param {string} errorInfo
 * @returns {ColorTranslator} parsed color | undefined
 */
function getColor(color, errorInfo = 'none') {
  const functionsToTry = [getRgbColor, getHslColor, getHWBColor];

  for (const func of functionsToTry) {
    const result = func(color);
    if (result !== undefined) {
      return result;
    }
  }

  try {
    /**
     * * use npm package colortranslator to translate color
     * * support color keyword, #RGB, #RGBA #RRGGBB, #RRGGBBAA, rgb(), hsl()
     * ! not supported (as of Aug 20, 2023)
     *   * hwb()
     *   * scientific notation
     *   * `none` expression
     */
    return new ColorTranslator(color);
  } catch (error) {
    console.log(`${errorInfo}: cannot get color from ${color}`);
    return undefined;
  }
}

/**
 * get rgb color from `color` string
 *
 * @param {string} color
 * @returns {ColorTranslator}
 */
function getRgbColor(color) {
  let rgbNumberMatch = rgbLegacyNumberPattern.exec(color);
  if (!rgbNumberMatch) rgbNumberMatch = rgbLvl4NumberPattern.exec(color);

  let rgbPercentageMatch = rgbLegacyPercentagePattern.exec(color);
  if (!rgbPercentageMatch) rgbPercentageMatch = rgbLvl4PercentagePattern.exec(color);

  if (rgbNumberMatch) {
    return new ColorTranslator({
      r: getRGBNumber(rgbNumberMatch.groups.r),
      g: getRGBNumber(rgbNumberMatch.groups.g),
      b: getRGBNumber(rgbNumberMatch.groups.b),
      a: getAlphaValue(rgbNumberMatch.groups.a),
    });
  } else if (rgbPercentageMatch) {
    return new ColorTranslator({
      r: getPercentage(rgbPercentageMatch.groups.r) * 255,
      g: getPercentage(rgbPercentageMatch.groups.g) * 255,
      b: getPercentage(rgbPercentageMatch.groups.b) * 255,
      a: getAlphaValue(rgbPercentageMatch.groups.a),
    });
  }

  return undefined;
}

/**
 * get hwb color from `color` string
 *
 * @param {string} color
 * @returns {ColorTranslator}
 */
function getHWBColor(color) {
  /**
   * ! should not use 'g'(global) flag
   * * refer to https://stackoverflow.com/questions/1520800/why-does-a-regexp-with-global-flag-give-wrong-results
   */
  const hwbPatternSingle = new RegExp(hwbPattern, 'i');
  const hwbMatch = hwbPatternSingle.exec(color);
  if (hwbMatch) {
    const hwbColor = {};
    hwbColor.h = getHue(hwbMatch);
    /**
     * Custom hwb color parser: `hwbToRgb()`
     * using w, b in [0,1]
     */
    hwbColor.w = getPercentage(hwbMatch.groups.w);
    hwbColor.b = getPercentage(hwbMatch.groups.b);
    hwbColor.a = getAlphaValue(hwbMatch.groups.a);
    // console.log(hwbColor);

    return hwbToRgb(hwbColor);
  } else {
    return undefined;
  }
}

/**
 * get hsl color from `color` string
 *
 * @param {string} color
 * @returns {ColorTranslator}
 */
function getHslColor(color) {
  const hslLvl4PatternSingle = new RegExp(hslLvl4Pattern, 'i');
  const hslLegacyPatternSingle = new RegExp(hslLegacyPattern, 'i');
  let hslMatch = hslLvl4PatternSingle.exec(color);
  if (!hslMatch) hslMatch = hslLegacyPatternSingle.exec(color);

  if (hslMatch) {
    return new ColorTranslator({
      h: getHue(hslMatch),
      s: getPercentage(hslMatch.groups.s) * 100,
      l: getPercentage(hslMatch.groups.l) * 100,
      a: getAlphaValue(hslMatch.groups.a),
    });
  } else {
    return undefined;
  }
}

/**
 *
 * @param {RegExpExecArray} colorMatch
 */
function getHue(colorMatch) {
  if (colorMatch.groups.angleNumber !== undefined) {
    return Number(colorMatch.groups.angleNumber) + colorMatch.groups.angleUnit;
  } else {
    return Number(colorMatch.groups.h);
  }
}

function getAlphaValue(alpha) {
  if (alpha === undefined) return 1;

  if (alpha.trim().toLowerCase() === 'none') {
    return 0;
  } else {
    let value = 0;

    if (alpha.trim().endsWith('%')) {
      value = Number(alpha.replace('%', '')) / 100;
    } else value = Number(alpha);

    // * alpha greater than 1 is truncated to 1
    if (value > 1) return 1;
    if (value < 0) return 0;

    return value;
  }
}

/**
 * @param {string} value - percentage in string
 * @return {number} percentage [0, 1]
 */
function getPercentage(percentage) {
  if (percentage.trim().toLowerCase() === 'none') {
    return 0;
  } else {
    let value = Number(percentage.replace('%', ''));
    // * value greater than 100% is truncated to 100%
    if (value > 100) return 1;
    if (value < 0) return 0;

    return value / 100;
  }
}

/**
 * @param {string} value - percentage in string
 * @return {number} rgb number value [0, 255]
 */
function getRGBNumber(number) {
  if (number.trim().toLowerCase() === 'none') {
    return 0;
  } else {
    let value = Number(number);
    if (value > 255) value = 255;
    if (value < 0) value = 0;

    return value;
  }
}

/**
 * * refer to https://www.w3.org/TR/css-color-4/#hwb-to-rgb
 *   It returns an array of three numbers representing
 *   the red, green, and blue channels of the colors,
 * * normalized to the range [0, 1].
 * * here multiply by 255
 *
 * @param {{
 *  h: string | number;
 *  w: number;
 *  b: number;
 *  a: number;
 * }} hwbColor
 * @returns {ColorTranslator} RGB 0..255
 */
function hwbToRgb(hwbColor) {
  // * `w+b` greater than 100% scales proportionally
  if (hwbColor.w + hwbColor.b >= 1) {
    let gray = (hwbColor.w / (hwbColor.w + hwbColor.b)) * 255;
    return new ColorTranslator({ r: gray, g: gray, b: gray, a: hwbColor.a });
  }

  let hsla = new ColorTranslator({ h: hwbColor.h, s: 100, l: 50, a: hwbColor.a });

  hsla.setR(hwbToRgbProps(hsla.R, hwbColor));
  hsla.setG(hwbToRgbProps(hsla.G, hwbColor));
  hsla.setB(hwbToRgbProps(hsla.B, hwbColor));

  // console.log(hsla.HEXA);
  return hsla;
}

function hwbToRgbProps(valueInRgb, hwbColor) {
  return valueInRgb * (1 - hwbColor.w - hwbColor.b) + hwbColor.w * 255;
}

/**
 * * Blends only if the `topColor` has transparency,
 *   otherwise returns the `color` string as is.
 *
 * @param {string} markerBackground
 * @param {ColorTranslator} topColor
 * @param {string} color
 * @returns {string} - text background color string
 */
function textBackgroundColor(markerBackground, topColor, color) {
  if (topColor.A < 1) {
    try {
      const bottomColor = new ColorTranslator(markerBackground);
      return blendTwoColors(bottomColor, topColor).RGBA;
    } catch {
      console.log('Unparsable markerBackground: ', markerBackground);
      return color;
    }
  } else return color;
}

/**
 *
 * @param {ColorTranslator} bottomColor
 * @param {ColorTranslator} topColor
 * @returns {ColorTranslator}
 */
function blendTwoColors(bottomColor, topColor) {
  try {
    const blendedColor = new ColorTranslator({
      r: topColor.R,
      g: topColor.G,
      b: topColor.B,
      a: topColor.A + (1 - topColor.A) * bottomColor.A,
    });

    if (blendedColor.A === 0) {
      return blendedColor;
    }

    blendedColor.setR(blendTwoColorProps(bottomColor.R, bottomColor.A, topColor.R, topColor.A, blendedColor.A));
    blendedColor.setG(blendTwoColorProps(bottomColor.G, bottomColor.A, topColor.G, topColor.A, blendedColor.A));
    blendedColor.setB(blendTwoColorProps(bottomColor.B, bottomColor.A, topColor.B, topColor.A, blendedColor.A));

    return blendedColor;
  } catch (error) {
    console.log('Error in blendTwoColors()');
    console.log(error);
  }
}

function blendTwoColorProps(bottomRGB, bottomAlpha, topRGB, topAlpha, blendedAlpha) {
  return (topRGB * topAlpha + bottomRGB * bottomAlpha * (1 - topAlpha)) / blendedAlpha;
}

/**
 * Compute the contrast ratio between two relative luminances, using the
 * algorithm from WCAG 2.0: <https://www.w3.org/TR/WCAG20/#contrast-ratiodef>
 *
 * Note that the order of the arguments does not matter. In other words, if `a`
 * and `b` are valid inputs, then `contrastRatio(a, b) === contrastRatio(b, a)`.
 *
 * @param l1 number  The relative luminance of the first color -- a number
 *                   between 0.0 and 1.0 (inclusive), which should be produced
 *                   by the `relativeLuminance` function.
 * @param l2 number  The relative luminance of the second color -- a number
 *                   between 0.0 and 1.0 (inclusive), which is expected to have
 *                   been produced by the `relativeLuminance` function.
 *
 * @returns  number  The contrast ratio between the input colors. Assuming the
 *                   inputs were in the correct range, this will be a number
 *                   between 1.0 and 21.0 (inclusive).
 */
function contrastRatio(l1, l2) {
  // Note: the denominator of the contrast ratio must be the darker (e.g. lower
  // relative luminance) color.
  if (l2 < l1) {
    return (0.05 + l1) / (0.05 + l2);
  } else {
    return (0.05 + l2) / (0.05 + l1);
  }
}

/**
 * Compute the relative luminance of a color, using the algorithm from WCAG 2.0
 * <https://www.w3.org/TR/WCAG20/#relativeluminancedef>.
 *
 * All three color components used as input should be integers between 0 and 255
 * inclusive, and are assumed to be in the sRGB color space -- typical for
 * source code constants, especially ones using CSS syntax, as sRGB is the
 * default color space on the web.
 *
 * (Note: it's overwhelmingly likely that even if the true color space of the
 * color is *not* sRGB, that it still has an sRGB-style gamma curve, if not a
 * fully sRGB-compatible one, in which case the result of this function will
 * still be reasonable)
 *
 * @param r8 number  The red component, as an 8-bit integer
 * @param g8 number  The green component, as an 8-bit integer
 * @param b8 number  The blue component, as an 8-bit integer
 *
 * @returns  number  The relative luminance of the color, a number between 0.0
 *                   and 1.0 (inclusive).
 */
function relativeLuminance(r8, g8, b8) {
  const bigR = srgb8ToLinear(r8);
  const bigG = srgb8ToLinear(g8);
  const bigB = srgb8ToLinear(b8);
  return 0.2126 * bigR + 0.7152 * bigG + 0.0722 * bigB;
}

/**
 * Convert an 8-bit color component from sRGB space (the default web color
 * space) into the linear RGB color space.
 *
 * This is a helper function for `relativeLuminance`, and at the moment isn't
 * needed except as part of calling that function.
 *
 * @param c8 number  An 8-bit integer color channel in the sRGB color space. In
 *                   other words, a number between 0 and 255 (inclusive).
 *                   Anything outside this range will be clamped and truncated.
 *
 * @returns  number  The value of the channel in a linear RGB color space -- a
 *                   number between 0.0 and 1.0, inclusive.
 */
const srgb8ToLinear = (function () {
  // There are only 256 possible different input values (0 <= input <= 255),
  // so we just use a lookup table, which to avoid repeating the (somewhat
  // costly) computation 3 times for each input.
  const srgbLookupTable = new Float64Array(256);
  for (let i = 0; i < 256; ++i) {
    const c = i / 255.0;
    srgbLookupTable[i] = c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }

  return function srgb8ToLinear(c8) {
    // Input should be an integer between 0 and 255 already, but clamp if
    // for some reason it is not.
    const index = Math.min(Math.max(c8, 0), 255) & 0xff;
    return srgbLookupTable[index];
  };
})();
