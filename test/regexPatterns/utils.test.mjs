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

testAngles.forEach(str => {
  console.log(`${str}: ${utilPatterns.anglePattern.test(str)}`);
});

testAlphaValues.forEach(str => {
  console.log(`${str}: ${utilPatterns.alphaValuePattern.test(str)}`);
});
