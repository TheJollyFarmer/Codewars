// Odd or Even
// https://www.codewars.com/kata/5949481f86420f59480000e7
const oddOrEven = array => array.reduce((acc, x) => acc + x, 0) % 2 === 0 ? "even" : "odd";