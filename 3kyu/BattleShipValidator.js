// Battleship Validator
// https://www.codewars.com/kata/52bb6539a4cf1b12d90005b7
function validateBattlefield(field) {
  const isValid = (x, y) => field[y] ? field[y][x] === 1 : false;

  for (let y = 0; y < field.length; y++) {
    for (let x = 0; x < field.length; x++) {
      if (!hasMatch(x, y) && isValid(x, y)) {
        let lenX = 1;
        let lenY = 1;

        matches.push(getKey(x, y));

        if (isValid(x - 1, y - 1) || isValid(x - 1, y + 1)) return false;

        while (isValid(x + lenX, y)) {
          if (isValid(x + lenX, y - 1) || isValid(x + lenX, y + 1)) return false;

          matches.push(getKey(x + lenX, y));
          lenX++;
        }

        if (isValid(x - 1, y - 1) || isValid(x + 1, y - 1)) return false;

        while (isValid(x, y + lenY)) {
          if (isValid(x - 1, y + lenY) || isValid(x + 1, y + lenY)) return false;

          matches.push(getKey(x, y + lenY));
          lenY++;
        }

        if (lenX > 1 && lenY > 1) return false;

        if (lenX > 1) {
          if (
            isValid(x - 1, y - 1) ||
            isValid(x - 1, y + 1) ||
            isValid(x - lenX, y - 1) ||
            isValid(x + lenX, y + 1)
          ) return false;
        } else {
          if (
            isValid(x - 1, y - 1) ||
            isValid(x - 1, y + 1) ||
            isValid(x - lenX, y - 1) ||
            isValid(x + lenX, y + 1)
          ) return false;
        }

        Object.values(ships).forEach(ship => isShip(ship, lenX, lenY) ? ship.count++ : "")
      }
    }
  }

  return (
    ships.battleship.count === ships.battleship.expected &&
    ships.cruisers.count === ships.cruisers.expected &&
    ships.destroyers.count === ships.destroyers.expected &&
    ships.submarines.count === ships.submarines.expected
  );
}

const hasMatch = (x, y) => matches.includes(getKey(x, y))
const isShip = (ship, x, y) => ship.length === (x > y ? x : y)
const getKey = (x, y) => `(${x},${y})`;
const ships = {
  battleship: {
    count: 0,
    expected: 1,
    length: 4
  },
  cruisers: {
    count: 0,
    expected: 2,
    length: 3
  },
  destroyers: {
    count: 0,
    expected: 3,
    length: 2
  },
  submarines: {
    count: 0,
    expected: 4,
    length: 1
  }
};
const matches = [];