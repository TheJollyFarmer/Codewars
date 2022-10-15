// Next Perfect Square
// https://www.codewars.com/kata/56269eb78ad2e4ced1000013
const findNextSquare = sq => Math.sqrt(sq) % 1 === 0 ? (Math.sqrt(sq) + 1) ** 2 : -1;