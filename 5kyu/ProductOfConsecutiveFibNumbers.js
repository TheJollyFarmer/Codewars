// Product of Consecutive Fibonacci Numbers
// https://www.codewars.com/kata/5541f58a944b85ce6d00006a
function productFib(prod) {
  let [a, b] = [0, 1];

  while(a * b < prod) [a, b] = [b, a + b];

  return [a, b, a * b === prod];
}