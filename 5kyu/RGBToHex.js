// RGB to Hex
// https://www.codewars.com/kata/513e08acc600c94f01000001
const rgb = (r, g, b) => [r, g, b].map(val => {
  let x = val;

  if (x < 0) x = 0;
  else if (x > 255) x = 255;

  let hex = x.toString(16).toUpperCase();

  return hex.length === 1 ? "0" + hex : hex;
}).join("");