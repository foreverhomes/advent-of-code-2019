import { parseTextInputByComma } from '../util';
import { rawInput } from './input-file';

const OP_ADD = 1;
const OP_MULTIPLY = 2;
const OP_HALT = 99;

const defaultHandlers = {
  [OP_ADD]: (memory = [], [noun, verb, address] = []) => {
    return memory.map((item, idx) => {
    return idx === address ? memory[noun] + memory[verb] : item;
  })},
  [OP_MULTIPLY]: (memory = [], [noun, verb, address] = []) => memory.map((item, idx) => {
    return idx === address ? memory[noun] * memory[verb] : item;
  })
};

function run() {
  const input = parseTextInputByComma(rawInput);
  const answer1 = runProgram(input, 4, undefined, 12, 2);
  const answer2 = solveForOutput(input, 19690720);
  return { answer1, answer2 };
}

function runProgram(intCode = [], instructionLength = 4, handlers = defaultHandlers, ...params) {
  let opCode, instructionParams;
  let instructionPtr = 0;
  let memory = intCode.slice();
  if (Array.isArray(params) && params.length > 0) {
    params.forEach((param, idx) => {
      memory[idx + 1] = param;
    });
  }
  while (opCode !== OP_HALT) {
    opCode = memory[instructionPtr];
    instructionParams = Array(instructionLength - 1).fill(instructionPtr).map((_, idx) => {
      return memory[instructionPtr + idx + 1]
    });
    if (handlers[opCode]) {
      memory = [...handlers[opCode](memory, instructionParams)]
    } else {
      break;
    }
    instructionPtr += instructionLength;
  }
  return memory;
}

function solveForOutput(input = [], expectedOutput) {
  for (let i = 0; i < 100; i++) {
    for (let j = 0; j < 100; j++) {
      const memory = runProgram(input, undefined, undefined, i, j);
      if (memory[0] === expectedOutput) {
        return [i, j];
      }
    }
  }
  return null;
}

export default {
  run,
  runProgram
};