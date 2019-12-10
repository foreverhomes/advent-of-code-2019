import { wires as wiresInput } from './wires';

function run() {
  return getWireIntersections(wiresInput); 
}

function getWireIntersections(wires = []) {
  const pointsMap = {
    '0.0': 1,
  };
  const intersectionMaps = [];
  const allIntersections = wires.reduce((intersections, wire) =>  [...intersections, ...mapWirePath(wire.split(','), pointsMap, intersectionMaps)], []);
  const closestIntersection = getClosestIntersectionToOriginDistance(allIntersections);
  const shortestIntersection = getShortestIntersectionFromOriginDistance(intersectionMaps);
  return { closestIntersection, shortestIntersection };
}

function getClosestIntersectionToOriginDistance(points = [], origin = '0.0') {
  const [oX, oY] = origin.split('.').map(p => parseInt(p));
  let minManhattanDistance;
  points.forEach(point => {
    const [x, y] = point.split('.').map(p => parseInt(p));
    const xDistance = Math.abs(oX + x);
    const yDistance = Math.abs(oY + y);
    const mDistance = xDistance + yDistance;
    if (!minManhattanDistance || mDistance < minManhattanDistance) {
      minManhattanDistance = mDistance;
    }
  });

  return minManhattanDistance;
}

function getShortestIntersectionFromOriginDistance(points = []) {
  let shortestDistance;
  points.forEach(({ distanceTotal }) => {
    if (!shortestDistance) {
      shortestDistance = distanceTotal;
    } else if (distanceTotal < shortestDistance) {
      shortestDistance = distanceTotal;
    }
  });

  return shortestDistance;
}

function mapWirePath(wireLines = [], points, intersectionMaps) {
  const intersections = [];
  let x = 0;
  let y = 0;
  let distanceTotal = 0;
  const previousPoints = {
    ...points
  };
  wireLines.forEach(line => {
    const direction = line.substring(0, 1);
    const value = parseInt(line.substring(1));
    let target, point;
    if (direction === 'U') {
      target = y + value;
      for (let i = y + 1; i <= target; i++) {
        y = i;
        distanceTotal += 1;
        point = makePoint(x,y);
        if (previousPoints[point]) {
          intersections.push(point)
          intersectionMaps.push({ point, distanceTotal: distanceTotal + points[point] }); 
        } else {
          points[point] = distanceTotal;
        }
      }
    } else if (direction === 'D') {
      target = y - value;
      for (let i = y - 1; i >= target; i--) {
        y = i;
        distanceTotal += 1;
        point = makePoint(x,y);
        if (previousPoints[point]) {
          intersections.push(point)
          intersectionMaps.push({ point, distanceTotal: distanceTotal + points[point] }); 
        } else {
          points[point] = distanceTotal;
        }
      }
    } else if (direction === 'L') {
      target = x - value;
      for (let i = x - 1; i >= target; i--) {
        x = i;
        distanceTotal += 1;
        point = makePoint(x,y);
        if (previousPoints[point]) {
          intersections.push(point)
          intersectionMaps.push({ point, distanceTotal: distanceTotal + points[point] }); 
        } else {
          points[point] = distanceTotal;
        }
      }
    } else if (direction === 'R') {
      target = x + value;
      for (let i = x + 1; i <= target; i++) {
        x = i;
        distanceTotal += 1;
        point = makePoint(x,y);
        if (previousPoints[point]) {
          intersections.push(point)
          intersectionMaps.push({ point, distanceTotal: distanceTotal + points[point] }); 
        } else {
          points[point] = distanceTotal;
        }
      }
    } else {
      throw new Error('invalid direction');
    }    
  })
  return intersections;
}

function makePoint(x, y) {
  const point = `${x}.${y}`;
  return point;
}

export default {
  run, 
  getWireIntersections,
  mapWirePath,
  getClosestIntersectionToOriginDistance,
  getShortestIntersectionFromOriginDistance
}