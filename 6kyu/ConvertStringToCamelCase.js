// Convert String to Camel Case
// https://www.codewars.com/kata/517abf86da9663f1d2000003
const toCamelCase = str => str.replace(/([-_][A-Za-z])/g, group => group.slice(-1).toUpperCase());