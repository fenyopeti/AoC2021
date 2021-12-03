const { readFileSync } = require('fs');
const input = readFileSync('./input.txt').toString();

const initialPosition = { horizontalPosition: 0, depth: 0, aim: 0 };

const commands = input
  .split('\n')
  .map(commandString => {
    const [ direction, param ] = commandString.split(' ');
    return { direction, value: Number(param) };
  });

const moveSubmarine = (submarine, { direction, value }) => {
  switch(direction) {
    case 'forward':
      submarine.horizontalPosition += value
      submarine.depth += submarine.aim * value
    break;
    case 'up':
      submarine.aim -= value
    break;
    case 'down':
      submarine.aim += value
    break;
  }

  return submarine;
}

const finalPosition = commands.reduce(moveSubmarine, initialPosition)

console.log(finalPosition.depth * finalPosition.horizontalPosition === 1176514794)
