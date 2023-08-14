import hwbPattern from '../../src/strategies/regexPatterns/hwbPattern.mjs';

const testStrings = [
  'hwb(120 50% 20% / 0.5)',
  'hwb(200deg 0.75 0.25 / 75%)',
  'hwb(none 0% none)',
  'hwb(100% none 50% / none)',
  'hwb(abc)',
];

testStrings.forEach(str => {
  console.log(`${str}: ${hwbPattern.test(str)}`);
});
