// Are They the "Same"?
// https://www.codewars.com/kata/550498447451fbbd7600041c
const comp = (arr1, arr2) =>
  !arr1 || !arr2 || arr1.length !== arr2.length
    ? false
    : arr1.map(x => x * x).sort().toString() === arr2.sort().toString();