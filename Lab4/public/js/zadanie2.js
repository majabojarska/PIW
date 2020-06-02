/*
Quadrant numbers:
      |
   1  |  0
      |
-------------
      |
   2  |  3
      |
*/

// N - Side length
// S - Barrel positions
// T - Occupied seats positions
function solution(N, S, T) {
  const barrelsPerQuadrant = getItemCountPerQuadrant(N, S);
  const dwarfsPerQuadrant = getItemCountPerQuadrant(N, T);
  const totalFieldsPerQuadrant = Array.from(
    { length: 4 },
    () => (N / 2) * (N / 2)
  );

  const seatsPerQuadrant = subtractArraysElementWise(
    totalFieldsPerQuadrant,
    barrelsPerQuadrant
  );

  const maxDwarfsPerQuadrant = [
    Math.min(seatsPerQuadrant[0], seatsPerQuadrant[2]),
    Math.min(seatsPerQuadrant[0], seatsPerQuadrant[2]),
    Math.min(seatsPerQuadrant[1], seatsPerQuadrant[3]),
    Math.min(seatsPerQuadrant[1], seatsPerQuadrant[3]),
  ];

  for (let quadrantNum = 0; quadrantNum < 4; quadrantNum++) {
    maxDwarfsPerQuadrant[quadrantNum] -= dwarfsPerQuadrant[quadrantNum];
    if (maxDwarfsPerQuadrant[quadrantNum] < 0) {
      return -1;
    }
  }

  const maxNewDwarfs = maxDwarfsPerQuadrant.reduce((a, b) => {
    return a + b;
  });
  return maxNewDwarfs;
}

function getItemCountPerQuadrant(raftLength, itemPositions = undefined) {
  const itemCountPerQuadrant = Array.from({ length: 4 }, () => 0);
  if (itemPositions !== undefined && itemPositions.length > 0) {
    itemPositions.split(" ").forEach((position) => {
      currentQuadrantNum = getQuadrantNum(raftLength, position);
      itemCountPerQuadrant[currentQuadrantNum]++;
    });
  }
  return itemCountPerQuadrant;
}

function getQuadrantNum(raftLength, position) {
  const quadrantLength = raftLength / 2; // Assuming indexing from 0
  const row = parseInt(position[0]) - 1;
  const letterNumberingOffset = "A".charCodeAt(0);
  const col =
    raftLength - 1 - (position[1].charCodeAt(0) - letterNumberingOffset);

  quadrantZeroBoundary = quadrantLength - 1;

  if (row <= quadrantZeroBoundary) {
    if (col <= quadrantZeroBoundary) {
      // Quadrant 0
      return 0;
    } else {
      // Quadrant 1
      return 1;
    }
  } else {
    if (col <= quadrantZeroBoundary) {
      // Quadrant 3
      return 3;
    } else {
      // Quadrant 2
      return 2;
    }
  }
}

function subtractArraysElementWise(minuend, subtrahend) {
  if (minuend.length !== subtrahend.length) {
    throw "Arrays must have the same length";
  }
  return minuend.map((e, i) => e - subtrahend[i]);
}
