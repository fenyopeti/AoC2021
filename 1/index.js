const { readFileSync } = require('fs');
const input = readFileSync('./input.txt').toString();
const depthMeasurements = input.split('\n').map(Number);

const measurementWindow = depthMeasurements.reduce((measurementWindows, x, i, array) => {
  if (array[i - 1] === undefined || array[i + 1] === undefined) return measurementWindows;

  const currentWindow = array[i] + array[i - 1] + array[i + 1];
  measurementWindows.push(currentWindow);
  return measurementWindows;
}, [])


const results = [];
measurementWindow.reduce((previous, current, index) => {
  let res = 'N/A'
  if (previous === undefined) {
    res = 'N/A'
  } else if (current === previous) {
    res = 'no change'
  } else if (current > previous) {
    res = 'increased'
  } else if (current < previous) {
    res = 'decreased'
  }

  results.push({ value: current, res });
  return current
}, undefined)

console.log(results.filter(x => x.res === 'increased').length === 1516)
// console.log(input);