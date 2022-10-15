// Memoized Fibonacci
// https://www.codewars.com/kata/529adbf7533b761c560004e5
function fibonacci(n) {
  const cache = {0:0, 1:1};

  const fibLookup = n => {
    if (n in cache) return cache[n];
    else return cache[n] = fibLookup(n - 1) + fibLookup(n - 2);
  }

  return fibLookup(n);
}