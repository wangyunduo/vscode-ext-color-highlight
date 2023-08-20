import { hwbPattern } from '../../src/strategies/regexPatterns/colorPatterns.mjs';

const validHwb = [
  'hwb(240 none none)',
  'hwb(266.667grad 0%0%)',
  'hwb(4.18667rad 0%none/1)',
  'hwb(0.667turn 0%0%/1)',
  'hwb(    240deg    none    none    /    1    )       ',
  'hwb(none 0% none)',
  'hwb(0.667turn 0%none/none)',
  'hwb(0.667turn none 0%/none)',
  'hwb(0.667turn 0%none/-1000)',
  'hwb(200deg 75% 25% / 75%)',
  'hwb(180 0%-1000000% / 0.5)',
  'hwb(180 0%0% / 0.5)',
  'hwb(120 50% 20% / 0.5)',
];

const inValidHwb = [
  // should be `hwb(240 none none)`
  'hwb(240 nonenone)',
  // should be `hwb(240 none none / 1)`
  'hwb (240 none none / 1)',
  // should be `hwb(240deg none none / 1)`
  'hwb(240 deg none none / 1)',
  // should be `hwb(0.667turn none 0%/none)`
  'hwb(0.667turn none0%/none)',
  // * hue does not support arithmetic expressions
  'hwb(2/3turn 0%none/none)',
  // ! hue cannot be a percentage
  'hwb(100% none 50% / none)',
  // * whiteness and blackness should be percentages
  'hwb(200deg 0.75 0.25 / 75%)',
  /**
   * * Legacy syntax are no longer supported by hwb
   *     Comma-separated or hwba() function.
   */
  'hwb(100, 50%, 50%)',
  'hwba(100 50% 50%)',
  'hwba(100 50% 50% / 0.5)',
];

validHwb.forEach(str => {
  const result = hwbPattern.test(str);
  console.log(`${result ? '✅' : '❌'} ${str} should be true: ${result}`);
});

inValidHwb.forEach(str => {
  const result = hwbPattern.test(str);
  console.log(`${result ? '❌' : '✅'} ${str} should be false: ${result}`);
});
