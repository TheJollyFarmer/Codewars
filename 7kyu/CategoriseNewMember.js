// Categorise New Member
// https://www.codewars.com/kata/5502c9e7b3216ec63c0001aa
const openOrSenior = data => data.map(([age, handicap]) => (age >= 55 && handicap > 7 ? "Senior" : "Open"))