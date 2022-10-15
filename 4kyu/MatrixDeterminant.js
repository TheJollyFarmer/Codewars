// Matrix Determinant
// https://www.codewars.com/kata/52a382ee44408cea2500074c
const determinant = mtx =>
  mtx.length === 1
    ? mtx[0][0]
    : mtx[0].reduce((det, val, idx) =>
        det + (-1) ** (idx + 2) * val *
        determinant(mtx.slice(1).map(row => row.filter((_, jdx) => idx !== jdx))),
      0);