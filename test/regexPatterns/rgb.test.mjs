import {
  rgbLvl4PercentagePattern,
  rgbLvl4NumberPattern,
  rgbLegacyPercentagePattern,
  rgbLegacyNumberPattern,
} from '../../src/strategies/regexPatterns/colorPatterns.mjs';

const validLvl4Rgb = [
  /**
   * * The first and second "none" should be followed by at least one space.
   * * Percentages can be followed by no space.
   */
  'rgb(none none none)',
  'rgb(none none none/none)',
  'rgb(50%none none)',
  'rgb(none 50%none)',
  'rgb(none 50%none/0.2)',
  'rgb(none none 50%)',
  'rgb(50%none 50%)',
  'rgb(50%50%50%)',
  'rgb(50%50%50%/10%)',
  'rgb(50%50%50%/0.1)',
  'rgb( 50% 50% 50% / 10% )',
  'rgb(0 0 100)',
  'rgb(0 0 100/1)',
  'rgb(none 100 none/0.5)',
  'rgba(none 100 none/0.5)',
];

const inValidLvl4Rgb = [
  'rgb(nonenone none)',
  'rgb(none nonenone)',
  'rgb(none50%none)',
  'rgb(none none50%)',
  'rgb(50%none50%)',
  'rgb ( 50% 50% 50% / 10% )',
  'rgb(none 100none/0.5)',
  'rgba(none 100none/0.5)',
];

const validLegacyRgb = [
  'rgb(0%,0%,100%)',
  'rgb( 0% , 0% , 100% )',
  'rgb(0%, 0%, 100%, 1)',
  'rgb(0%,0%,100%,1)',
  'rgb( 0 , 0 , 255 )',
  'rgba( 0 , 0 , 255 )',
  'rgba(0%, 0%, 100%, 0.9)',
  'rgba(0%, 0%, 100%, 60%)',
];

const invalidLegacyRgb = [
  'rgb( 0% , 0% , 100%,)',
  'rgb(0, 0%, 100%, 1)',
  'rgb( 0 , 0 , 255,)',
  'rgb( none, 0, 0)',
  'rgb( 50% 50% 50% / 10% )',
];

function lvl4RgbTest(str) {
  let result = rgbLvl4PercentagePattern.test(str);
  if (!result) result = rgbLvl4NumberPattern.test(str);

  return result;
}

function legacyRgbTest(str) {
  let result = rgbLegacyPercentagePattern.test(str);
  if (!result) result = rgbLegacyNumberPattern.test(str);

  return result;
}

console.log('valid CSS Color Module Level 4 RGB:');
validLvl4Rgb.forEach(str => {
  const result = lvl4RgbTest(str);
  console.log(`${result ? '✅' : '❌'} ${str} should be true: ${result}`);
});

console.log('\ninvalid CSS Color Module Level 4 RGB:');
inValidLvl4Rgb.forEach(str => {
  const result = lvl4RgbTest(str);
  console.log(`${result ? '❌' : '✅'} ${str} should be false: ${result}`);
});

console.log('\nvalid CSS legacy RGB color:');
validLegacyRgb.forEach(str => {
  const result = legacyRgbTest(str);
  console.log(`${result ? '✅' : '❌'} ${str} should be true: ${result}`);
});

console.log('\ninvalid CSS legacy RGB color:');
invalidLegacyRgb.forEach(str => {
  const result = legacyRgbTest(str);
  console.log(`${result ? '❌' : '✅'} ${str} should be false: ${result}`);
});
