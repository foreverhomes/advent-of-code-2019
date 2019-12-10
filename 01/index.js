import { input } from './input';
import { parseTextInputByNewline } from '../util';

function run() {
  const inputs = parseTextInputByNewline(input);
  const part1 = inputs.reduce((total, value) => {
    const moduleFuel = calculateRequiredFuelForMass(parseInt(value));
    return total + moduleFuel;
  }, 0);

  const part2 = inputs.reduce((total, value) => {
    const totalModuleFuel = calculateTotalRequiredFuelForMass(parseInt(value));
    return total + totalModuleFuel;
  }, 0);

  return {
    part1,
    part2,
  }
}

function calculateRequiredFuelForMass(mass) {
  return Math.max((Math.floor(mass / 3) - 2), 0);
}

function calculateTotalRequiredFuelForMass(mass = 0) {
  let additionalFuel = calculateRequiredFuelForMass(mass);
  let totalFuel = additionalFuel;
  do {
    additionalFuel = calculateRequiredFuelForMass(additionalFuel);
    totalFuel += additionalFuel;
  } while (additionalFuel > 0)
  return totalFuel;
}

export default { 
  run,
  calculateRequiredFuelForMass,
  calculateTotalRequiredFuelForMass,
};