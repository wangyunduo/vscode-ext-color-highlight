/**
 * * css hwb() function
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
 *
 * * The syntax of the hwb() function is:
 *   hwb() = hwb( [<hue> | none] [<percentage> | none]
 *           [<percentage> | none] [ / [<alpha-value> | none] ]? )
 *
 *   <hue> = <number> | <angle>
 *
 */

import { huePattern, percentagePattern, alphaValuePattern } from './utilPatterns.mjs';

const hwbPattern = new RegExp(
  `hwb\\(\\s*(?<h>${huePattern.source}|none)\\s+(?<w>${percentagePattern.source}|none )\\s*(?<b>${percentagePattern.source}|none)\\s*(\\/\\s*(?<a>${alphaValuePattern.source}|none))?\\s*\\)`,
  'gi',
);

export default hwbPattern;
