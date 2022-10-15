// Playing With Digits
// https://www.codewars.com/kata/5552101f47fc5178b1000050
function digPow(n, p){
  let sum = 0;
  let digits = n.toString();

  for (let i = 0; i < digits.length; i++) {
    sum += Math.pow(digits[i], p + i);
  }

  return sum % n === 0 ? sum / n : -1;
}