// Detect Pangram
// https://www.codewars.com/kata/545cedaa9943f7fe7b000048
const isPangram = (string) => new Set(string.toLowerCase().match(/[a-z]/g)).size === 26;