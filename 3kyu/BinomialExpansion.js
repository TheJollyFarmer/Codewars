// Binomial Expansion
// https://www.codewars.com/kata/540d0fdd3b6532e5c3000b5b
function expand(expr) {
  let result = "";
  let [_, a, x, b, n] = expr.match(/\((-?\d*)([a-z])([-+]\d+)\)\^(\d+)/);

  a = a ? a === "-" ? -1 : Number(a) : 1;
  b = Number(b);
  n = Number(n);

  for (let i = n; i >= 0; i--) {
    let k = n - i;
    let c = Math.round((a ** i) * (b ** k) * getCoefficient(n, i));

    if (Math.abs(c) === 1 && i > 0) c = c > 0 ? '+' : '-';
    else c = c > 0 ? `+${c}` : c;

    if (c) result += c;
    if (i > 0 && c) result += x;
    if (i > 1 && c) result += `^${i}`;
  }

  return result[0] === "+" ? result.substr(1) : result;
}

const getCoefficient = (n, k) => {
  if (k === 0 || k === n) return 1;

  let c = 1;

  for (let i = 1; i <= k; i++) c *= (n + 1 - i) / i;

  return c;
}