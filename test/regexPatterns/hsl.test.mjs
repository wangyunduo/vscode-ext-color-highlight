import { hslLvl4Pattern, hslLegacyPattern } from '../../src/strategies/regexPatterns/colorPatterns.mjs';

const validLvl4Hsl = [
  'hsl(240 none none)',
  'hsl(266.667grad 100%50%)',
  'hsl(4.18667rad 100%none/1)',
  'hsl(0.667turn 100%50%/1)',
  'hsl(    240deg    100%    50%    /    1    )       ',
  'hsl(none 0% none)',
  'hsl(0.667turn 100%none/none)',
  'hsl(0.667turn none 50%/none)',
  'hsl(0.667turn 0%none/-1000)',
  'hsl(200deg 75% 25% / 75%)',
  'hsl(180 0%-1000000% / 0.5)',
  'hsl(180 0%0% / 0.5)',
  'hsl(120 50% 20% / 0.5)',
  'hsla(100 50% 50%)',
  'hsla(100 50% 50% / 0.5)',
];

const inValidLvl4Hsl = [
  // should be `hsl(240 none none)`
  'hsl(240 nonenone)',
  // should be `hsl(240 none none / 1)`
  'hsl (240 none none / 1)',
  // should be `hsl(240deg none none / 1)`
  'hsl(240 deg none none / 1)',
  // should be `hsl(0.667turn none 50%/none)`
  'hsl(0.667turn none50%/none)',
  // * hue does not support arithmetic expressions
  'hsl(2/3turn 0%none/none)',
  // ! hue cannot be a percentage
  'hsl(100% none 50% / none)',
  // * saturation and lightness should be percentages
  'hsl(200deg 0.75 0.25 / 75%)',
  // * Comma-separated syntax are no longer supported by hsl
  'hsl(100, 50%, 50%)',
];

const validLegacyHsl = [
  'hsl( 180 , 100% , 50% , 0.5 )',
  'hsl(180,100%,50%,0.5)',
  'hsl( 180 , 100% , 50% )',
  'hsl(180,100%,50%)',
  'hsla( 180 , 100% , 50% , 0.5 )',
  'hsla(180,100%,50%,0.5)',
  'hsla( 180 , 100% , 50% )',
  'hsla(180,100%,50%)',
];

const invalidLegacyHsl = ['hsl( 180  100%  50% / 0.5 )', 'hsl(180, 100%, 50%, none)'];

console.log('valid CSS Color Module Level 4 HSL:');
validLvl4Hsl.forEach(str => {
  const result = hslLvl4Pattern.test(str);
  console.log(`${result ? '✅' : '❌'} ${str} should be true: ${result}`);
});

console.log('\ninvalid CSS Color Module Level 4 HSL:');
inValidLvl4Hsl.forEach(str => {
  const result = hslLvl4Pattern.test(str);
  console.log(`${result ? '❌' : '✅'} ${str} should be false: ${result}`);
});

console.log('\nvalid CSS legacy HSL color:');
validLegacyHsl.forEach(str => {
  const result = hslLegacyPattern.test(str);
  console.log(`${result ? '✅' : '❌'} ${str} should be true: ${result}`);
});

console.log('\ninvalid CSS legacy HSL color:');
invalidLegacyHsl.forEach(str => {
  const result = hslLegacyPattern.test(str);
  console.log(`${result ? '❌' : '✅'} ${str} should be false: ${result}`);
});
