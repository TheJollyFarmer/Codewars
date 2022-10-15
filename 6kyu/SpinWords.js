// Spin Words
// https://www.codewars.com/kata/5264d2b162488dc400000001
const spinWords = str => str.replace(/\w{5,}/g, match => match.split("").reverse().join(""));