// Sum of Pairs
// https://www.codewars.com/kata/54d81488b981293527000c8f
function sumPairs(ints, sum) {
  const checked = new Set();

  for (let i = 0; i < ints.length; i++) {
    let diff = sum - ints[i];

    if (checked.has(diff)) return [diff, ints[i]];
    else checked.add(ints[i]);
  }

  return undefined;
}