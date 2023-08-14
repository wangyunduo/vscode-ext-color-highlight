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

import { numberPattern, anglePattern, percentagePattern, alphaValuePattern } from './utilPatterns.mjs';

const huePattern = new RegExp(`(${numberPattern.source}|${anglePattern.source})`);

const hwbPattern = new RegExp(
  `hwb\\(\\s*(${huePattern.source}|none)\\s+(${percentagePattern.source}|none )\\s*(${percentagePattern.source}|none)\\s*(\\/\\s*(${alphaValuePattern.source}|none))?\\s*\\)`,
  'gi',
);

export default hwbPattern;
