const { readFileSync } = require('fs');
const input = readFileSync('./input.txt').toString();

const reports = input.split('\n');

const countBits = (reports) => {
  const reportLength = reports[0].length
  const initialBits = Array.from({length: reportLength}, () => ({ '1': 0, '0': 0 }))
  return reports.reduce((bits, report) => {
    report.split('').forEach((x, i) => {
      if (x === '1') {
        bits[i]['1'] += 1;
      } else {
        bits[i]['0'] += 1;
      }
    })
    return bits
  }, initialBits)
}

const calculateGammaRate = (bits) => {
  const gamma = bits.reduce((accumulator, bit) => {

    const mostCommonBit = bit['0'] > bit['1'] ? '0' : '1'
    return accumulator.concat(mostCommonBit);
  }, '');
  
  return parseInt(gamma, 2)
}

const calculateEpsilonRate = (bits) => {
  const gamma = bits.reduce((accumulator, bit) => {

    const lessCommonBit = bit['0'] < bit['1'] ? '0' : '1'
    return accumulator.concat(lessCommonBit);
  }, '');
  
  return parseInt(gamma, 2)
}

const calculateOxygenLevel = (reports, i) => {
  if (reports.length === 1) return reports[0];
  if (i >= reports[0].length) return;
  
  const reportLength = reports[0].length
  const bits = Array.from({length: reportLength}, (_, i) => ({ '1': 0, '0': 0 }))
  reports.forEach(x => {
    x.split('').forEach((b, i) => {
      if (b === '1') {
        bits[i]['1'] += 1;
      } else if (b === '0') {
        bits[i]['0'] += 1;
      }
    })
  })

  const more = bits[i]['0'] <= bits[i]['1'] ? '1' : '0'
  const filtered = reports.filter(x => x[i] === more)

  return calculateOxygenLevel(filtered, i + 1)
}

const calculateCO2Level = (reports, i) => {
  if (reports.length === 1) return reports[0];
  if (i >= reports[0].length) return;

  const reportLength = reports[0].length
  const bits = Array.from({length: reportLength}, (_, i) => ({ '1': 0, '0': 0 }))
  reports.forEach(x => {
    x.split('').forEach((b, i) => {
      if (b === '1') {
        bits[i]['1'] += 1;
      } else if (b === '0') {
        bits[i]['0'] += 1;
      }
    })
  })

  const more = bits[i]['0'] <= bits[i]['1'] ? '1' : '0'
  const filtered = reports.filter(x => x[i] !== more)

  return calculateCO2Level(filtered, i + 1)
}

const calculatedBits = countBits(reports);

const o = parseInt(calculateOxygenLevel(reports, 0), 2)
const co = parseInt(calculateCO2Level(reports, 0), 2)

console.log('gamma rate\t', calculateGammaRate(calculatedBits));
console.log('epsilon rate\t', calculateEpsilonRate(calculatedBits));
console.log('oxygen leve\t', o)
console.log('CO2 leve\t', co)
console.log(co * o)

