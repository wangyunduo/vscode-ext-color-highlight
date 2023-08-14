import * as utilPatterns from '../../src/strategies/regexPatterns/utilPatterns.mjs';

const testAngles = ['45.5deg', '-3.14rad', '0.75grad', '0.1turn', 'false'];

const testAlphaValues = [
  '123.45',
  '-0.123',
  '0.456',
  '3.14e-2',
  '-2.5E+5',
  '.789',
  '12',
  '+34',
  '123.45%',
  '-0.123%',
  '0.456%',
  '3.14e-2%',
  '-2.5E+5%',
  '.789%',
  '12%',
  '+34%',
  '32e4%',
  'false',
];

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

testAngles.forEach(str => {
  console.log(`${str}: ${utilPatterns.anglePattern.test(str)}`);
});

testAlphaValues.forEach(str => {
  console.log(`${str}: ${utilPatterns.alphaValuePattern.test(str)}`);
});
