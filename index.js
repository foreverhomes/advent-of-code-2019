import express from 'express'
import { parseTextInputByComma } from './util';
const app = express()
const port = 4000

import Day1 from './01';
import Day2 from './02';
import Day3 from './03';

app.get('/01', (_, res) => {
  const for12 = Day1.calculateRequiredFuelForMass(12);
  const for14 = Day1.calculateRequiredFuelForMass(14);
  const for1969 = Day1.calculateRequiredFuelForMass(1969);
  const for100756 = Day1.calculateRequiredFuelForMass(100756);
  const additional1 = Day1.calculateTotalRequiredFuelForMass(1969)
  const additional2 = Day1.calculateTotalRequiredFuelForMass(100756)
  const answers = Day1.run();
  res.send(`Oh hi: ${for12}, ${for14}, ${for1969}, ${for100756}, ${additional1}, ${additional2} and answers are ${answers.part1}, ${answers.part2}`);
});

app.get('/02', (_, res) => {
  const testInput = parseTextInputByComma(`1,9,10,3,2,3,11,0,99,30,40,50`)
  const testInput3 =parseTextInputByComma(`2,4,4,5,99,0`);
  const testInput2 =parseTextInputByComma(`1,1,1,4,99,5,6,0,99`);
  const testOutput1 = Day2.runProgram(testInput).join(',');
  const testOutput2 = Day2.runProgram(testInput2).join(',');
  const testOutput3 = Day2.runProgram(testInput3).join(',');
  const answers = Day2.run();
  res.send(`<html><body><p>Test output:</p> <p>${testOutput1}</p><p>${testOutput2}</p><p>${testOutput3}</p><h3>Answer 1:</h3><p>${answers.answer1[0]}</p><h3>Answer 2:</h3><p>${answers.answer2.toString()}</p></body></html>`);
})

app.get('/03', (_, res) => {
  const testIntersections1 = Day3.getWireIntersections(['R8,U5,L5,D3', 'U7,R6,D4,L4']);
  console.assert(testIntersections1.closestIntersection === 6);
  console.assert(testIntersections1.shortestIntersection === 30)
  const testIntersections2 = Day3.getWireIntersections([
    'R75,D30,R83,U83,L12,D49,R71,U7,L72',
    'U62,R66,U55,R34,D71,R55,D58,R83',
  ]);
  console.assert(testIntersections2.closestIntersection === 159)
  console.assert(testIntersections2.shortestIntersection === 610)
  const testIntersections3 = Day3.getWireIntersections([
    'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51',
    'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7',
  ]);
  console.assert(testIntersections3.closestIntersection === 135)
  console.assert(testIntersections3.shortestIntersection === 410)
  const answer = Day3.run();
  res.send(`<html><body>
    <h3>Test output:</h3>
    <p>${testIntersections1.closestIntersection} : ${testIntersections1.shortestIntersection}</p>
    <p>${testIntersections2.closestIntersection} : ${testIntersections2.shortestIntersection}</p>
    <p>${testIntersections3.closestIntersection} : ${testIntersections3.shortestIntersection}</p>
    <h3>Closest intersection:</h3>
    <p>${answer.closestIntersection}</p>
    <h3>Answer 2:</h3>
    <p>${answer.shortestIntersection}</p>
    </body></html>`);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))