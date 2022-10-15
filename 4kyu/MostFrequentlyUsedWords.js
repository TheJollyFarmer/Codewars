// Most Frequently Used Words in a Text
// https://www.codewars.com/kata/51e056fe544cf36c410000fb
function topThreeWords(text) {
  const matches = {};
  const arr = text.toLowerCase().match(/[a-z']+/g);

  if (!arr || arr.includes("'")) return [];

  arr.forEach(match => matches[match] = (matches[match] || 0) + 1);

  return Object.keys(matches)
    .sort((a, b) => matches[b] - matches[a])
    .slice(0, 3);
}