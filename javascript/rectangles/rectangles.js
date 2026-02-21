export function count(inputs) {
  const state = {
    sides: {
      // "3-5": {
      //   entity: { start: 3, end: 5, key: "3-5" },
      //   nSides: 3,
      // },
    },
    rects: [
      // { top: "3-5", nSides: 3 },
    ],
  };

  for (let line of inputs) {
    for (let side of getSides(state)) {
      if (!isContinuousRect(line, side)) {
        removeSide(state, side);
      }
    }
    for (let side of findSides(line)) {
      addSide(state, side);
    }
  }
  for (let side of getSides(state)) {
    removeSide(state, side);
  }

  let nRects = 0;
  for (let rect of state.rects) {
    nRects += countPossibleRects(rect.nSides);
  }
  return nRects;
}

const getSides = (state) => {
  return Object.values(state.sides).map((e) => e.entity);
};

const removeSide = (state, side) => {
  const sideState = state.sides[side.key];
  delete state.sides[side.key];
  if (sideState.nSides >= 2) {
    state.rects.push({
      top: side.key,
      nSides: sideState.nSides,
    });
  }
};

const addSide = (state, side) => {
  if (side.key in state.sides) {
    state.sides[side.key].nSides += 1;
  } else {
    state.sides[side.key] = { entity: side, nSides: 1 };
  }
};

const newSide = (start, end) => {
  return {
    start,
    end,
    key: `${start}-${end}`,
  };
};

const findSides = (line) => {
  let starts = [];
  const sides = [];
  for (let i = 0; i < line.length; i++) {
    switch (line[i]) {
      case "+": {
        for (let start of starts) {
          sides.push(newSide(start, i));
        }
        starts.push(i);
        break;
      }
      case "-": {
        break;
      }
      default: {
        starts = [];
      }
    }
  }
  return sides;
};

const isContinuousRect = (line, side) => {
  const start = line[side.start];
  const end = line[side.end];
  return (start === "+" || start === "|") && (end === "+" || end === "|");
};

const countPossibleRects = (nSides) => {
  // When the number of sides is N, the number of possible rectangles is equal to
  // the number of combinations of choosing two from the N sides.
  return (nSides * (nSides - 1)) / 2;
};
