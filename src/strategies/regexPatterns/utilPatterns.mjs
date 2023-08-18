/**
 * * number
 *     corresponds to the <number-token> production
 * * https://www.w3.org/TR/css-syntax-3/#number-token-diagram
 *
 */
export const numberPattern = /[+-]?(\d+(\.\d+)?|\.\d+)([eE][-+]?\d+)?/;

/**
 * * Angle values
 *     are <dimension>s denoted by <angle>.
 *     <dimension>: Numbers with Units
 *     The angle unit identifiers are: deg, grad, rad, turn.
 * * <angle> = <number> <angle-units>
 * * <angle-units> = [deg | grad | rad | turn]
 */
const angleUnitsPattern = /(deg|grad|rad|turn)/;
export const anglePattern = new RegExp(
  `(?<angleNumber>${numberPattern.source})(?<angleUnit>${angleUnitsPattern.source})`,
);

/**
 * * percentage
 *     consists of a number immediately followed by a percent sign '%'.
 *     percentage corresponds to the <percentage-token> production
 * * https://www.w3.org/TR/css-syntax-3/#percentage-token-diagram
 */
export const percentagePattern = new RegExp(`${numberPattern.source}%`);

/**
 * * alpha-value
 * * <alpha-value> = <number> | <percentage>
 */
export const alphaValuePattern = new RegExp(`(${numberPattern.source}|${percentagePattern.source})`);
