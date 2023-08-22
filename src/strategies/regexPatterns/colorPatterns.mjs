import { huePattern, percentagePattern, alphaValuePattern, numberPattern } from './utilPatterns.mjs';

/**
 * * Regular pattern for CSS Color Module Level 4 - `hwb()` function
 * ```
 *   hwb() = hwb( [<hue> | none] [<percentage> | none]
 *                [<percentage> | none] [ / [<alpha-value> | none] ]? )
 * ```
 * * https://www.w3.org/TR/css-color-4/#funcdef-hwb
 * * Matches only spaces, not commas.
 *   "There is no Web compatibility issue with hwb,
 *    which is new in this level of the specification,
 *    and so hwb() does not support a legacy color syntax that
 *    separates all of its arguments with commas.
 * !  Using commas inside hwb() is an error."
 *
 * * Accepts arguments more than 100%.
 *   "Values outside of these ranges are not invalid,
 * !  but are clamped to the ranges defined here
 *    at computed-value time."
 */
export const hwbPattern = new RegExp(
  `hwb\\(\\s*(?<h>${huePattern.source}|none)\\s+(?<w>${percentagePattern.source}|none )\\s*(?<b>${percentagePattern.source}|none)\\s*(\\/\\s*(?<a>${alphaValuePattern.source}|none))?\\s*\\)`,
  'i',
);

/**
 * * Regular pattern for CSS Color Module Level 4 - `hsl()` function
 * ```
 *   hsl() = hsl( [<hue> | none] [<percentage> | none] [<percentage> | none]
 *                [ / [<alpha-value> | none] ]? )
 * ```
 * * Legacy color syntax `hsla()` also exists,
 *   with an identical grammar and behavior to `hsl()`.
 *
 * * https://www.w3.org/TR/css-color-4/#funcdef-hsl
 */
export const hslLvl4Pattern = new RegExp(
  `hsla?\\(\\s*(?<h>${huePattern.source}|none)\\s+(?<s>${percentagePattern.source}|none )\\s*(?<l>${percentagePattern.source}|none)\\s*(\\/\\s*(?<a>${alphaValuePattern.source}|none))?\\s*\\)`,
  'i',
);

/**
 * * Regular pattern for CSS legacy color syntax - `hsl()` function
 * ```
 *   hsl() = hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )
 * ```
 * * Legacy color syntax `hsla()` also exists,
 *   with an identical grammar and behavior to `hsl()`.
 *
 * https://www.w3.org/TR/css-color-4/#the-hsl-notation
 */
export const hslLegacyPattern = new RegExp(
  `hsla?\\(\\s*(?<h>${huePattern.source})\\s*,\\s*(?<s>${percentagePattern.source})\\s*,\\s*(?<l>${percentagePattern.source})\\s*(,\\s*(?<a>${alphaValuePattern.source}))?\\s*\\)`,
  'i',
);

/**
 * * Regular pattern for CSS Color Module Level 4 - `rgb()` function - percentage mode
 * ```
 *   rgb() = rgb( [<percentage> | none]{3} [ / [<alpha-value> | none] ]? )
 * ```
 * * Legacy color syntax `rgba()` also exists,
 *   with an identical grammar and behavior to `rgb()`.
 *
 * * https://www.w3.org/TR/css-color-4/#funcdef-rgb
 *
 * * The first and second "none" should be followed by at least one space.
 * * Percentages can be followed by no space.
 */
export const rgbLvl4PercentagePattern = new RegExp(
  `rgba?\\(\\s*(?<r>${percentagePattern.source}|none )\\s*` +
    `(?<g>${percentagePattern.source}|none )\\s*` +
    `(?<b>${percentagePattern.source}|none)\\s*` +
    `(\\/\\s*(?<a>${alphaValuePattern.source}|none))?\\s*\\)`,
  'i',
);

/**
 * * Regular pattern for CSS Color Module Level 4 - `rgb()` function - number mode
 * ```
 *   rgb() = rgb( [<number> | none]{3} [ / [<alpha-value> | none] ]? )
 * ```
 * * Legacy color syntax `rgba()` also exists,
 *   with an identical grammar and behavior to `rgb()`.
 *
 * * https://www.w3.org/TR/css-color-4/#funcdef-rgb
 *
 * * The first and second "none" should be followed by at least one space.
 */
export const rgbLvl4NumberPattern = new RegExp(
  `rgba?\\(\\s*(?<r>${numberPattern.source}|none)\\s+` +
    `(?<g>${numberPattern.source}|none)\\s+` +
    `(?<b>${numberPattern.source}|none)\\s*` +
    `(\\/\\s*(?<a>${alphaValuePattern.source}|none))?\\s*\\)`,
  'i',
);

/**
 * * Regular pattern for CSS legacy color syntax - `rgb()` function - percentage mode
 * ```
 *   rgb() = rgb( <percentage>#{3} , <alpha-value>? )
 * ```
 * * Legacy color syntax `rgba()` also exists,
 *   with an identical grammar and behavior to `rgb()`.
 *
 * https://www.w3.org/TR/css-color-4/#rgb-functions
 */
export const rgbLegacyPercentagePattern = new RegExp(
  `rgba?\\(\\s*(?<r>${percentagePattern.source})\\s*,\\s*` +
    `(?<g>${percentagePattern.source})\\s*,\\s*` +
    `(?<b>${percentagePattern.source})\\s*` +
    `(,\\s*(?<a>${alphaValuePattern.source}))?\\s*\\)`,
  'i',
);

/**
 * * Regular pattern for CSS legacy color syntax - `rgb()` function - number mode
 * ```
 *   rgb() = rgb( <number>#{3} , <alpha-value>? )
 * ```
 * * Legacy color syntax `rgba()` also exists,
 *   with an identical grammar and behavior to `rgb()`.
 *
 * https://www.w3.org/TR/css-color-4/#rgb-functions
 */
export const rgbLegacyNumberPattern = new RegExp(
  `rgba?\\(\\s*(?<r>${numberPattern.source})\\s*,\\s*` +
    `(?<g>${numberPattern.source})\\s*,\\s*` +
    `(?<b>${numberPattern.source})\\s*` +
    `(,\\s*(?<a>${alphaValuePattern.source}))?\\s*\\)`,
  'i',
);

const colorPatterns = [
  rgbLegacyNumberPattern,
  rgbLegacyPercentagePattern,
  rgbLvl4NumberPattern,
  rgbLvl4PercentagePattern,
  hslLegacyPattern,
  hslLvl4Pattern,
  hwbPattern,
];

export default colorPatterns;
