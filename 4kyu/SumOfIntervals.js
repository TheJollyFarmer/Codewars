// Sum of Intervals
// https://www.codewars.com/kata/52b7ed099cdc285c300001cd
function sumIntervals(intervals){
  intervals.sort((a, b) => a[0] - b[0]);

  let x = intervals[0][0], res = 0;

  for (let i = 0; i < intervals.length; i++){
    if (intervals[i][1] >= x){
      res += intervals[i][1] - (intervals[i][0] > x ? intervals[i][0] : x);
      x = intervals[i][1];
    }
  }

  return res;
}