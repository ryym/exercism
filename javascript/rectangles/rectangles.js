// Count rectangles in an ASCII diagram.
// Scan the diagram line by line from top to bottom, tracking horizontal sides
// that share the same column positions (start, end). As long as vertical sides
// ("|" or "+") continue at both endpoints, the sides stay in one group.
// When the vertical continuity breaks, the group is closed and the number of
// rectangles formed by N sides in the group is C(N,2).
export function count(inputs) {
  const state = {
    // Horizontal side groups currently being tracked.
    // Key: "start-end" column positions. Value: { side, count }.
    activeSides: {},
    // Groups whose vertical continuity has ended. Used to tally rectangles.
    closedGroups: [],
  };

  for (let line of inputs) {
    for (let side of getActiveSides(state)) {
      if (!verticalSidesContinue(line, side)) {
        closeSideGroup(state, side);
      }
    }
    for (let side of findHorizontalSides(line)) {
      addSide(state, side);
    }
  }
  // Close all remaining active groups after the last line.
  for (let side of getActiveSides(state)) {
    closeSideGroup(state, side);
  }

  let nRects = 0;
  for (let group of state.closedGroups) {
    nRects += countCombinations(group.count);
  }
  return nRects;
}

const getActiveSides = (state) => {
  return Object.values(state.activeSides).map((e) => e.side);
};

const closeSideGroup = (state, side) => {
  const group = state.activeSides[side.key];
  delete state.activeSides[side.key];
  if (group.count >= 2) {
    state.closedGroups.push({ count: group.count });
  }
};

const addSide = (state, side) => {
  if (side.key in state.activeSides) {
    state.activeSides[side.key].count += 1;
  } else {
    state.activeSides[side.key] = { side, count: 1 };
  }
};

const newSide = (start, end) => {
  return {
    start,
    end,
    key: `${start}-${end}`,
  };
};

const findHorizontalSides = (line) => {
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

const verticalSidesContinue = (line, side) => {
  const start = line[side.start];
  const end = line[side.end];
  return (start === "+" || start === "|") && (end === "+" || end === "|");
};

// When N horizontal sides share the same column span with vertical continuity,
// the number of rectangles equals choosing 2 from N: C(N,2).
const countCombinations = (n) => {
  return (n * (n - 1)) / 2;
};
