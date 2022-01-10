// 「アジャイル・ソフトウェア開発の奥義」に出てきたケーススタディを参考に、
// 少しだけロジックを簡略化したバージョン。あの本だともっとシンプルだが、
// こちらは割と面倒なバリデーションを求められるのでフレームの概念は
// どうしても必要な気がする。特に投球数の正しさを判定するのに。

class Bowling {
  constructor(rolls) {
    this.rolls = rolls;
  }
  score() {
    const frames = buildFrames(this.rolls);
    return frames.reduce((t, f) => t + f.score, 0);
  }
}

const buildFrames = (rolls) => {
  const frames = [];
  for (let roll = 0; roll < rolls.length; ) {
    const frame = buildFrameAt(roll, rolls, frames);
    frames.push(frame);
    roll += frame.rollCount;
  }
  assertFramesAreValid(frames);
  return frames;
};

const buildFrameAt = (roll, rolls, builtFrames) => {
  const pins = rolls[roll];
  const nextPins1 = rolls[roll + 1] || 0;
  const nextPins2 = rolls[roll + 2] || 0;
  const isFillBall = builtFrames.length >= 10;
  const isStrike = pins === 10;
  if (isStrike) {
    const score = isFillBall ? 0 : pins + nextPins1 + nextPins2;
    return buildFrame({
      score,
      firstRoll: pins,
      secondRoll: 0,
      rollCount: 1,
    });
  } else {
    const total = pins + nextPins1;
    const isSpare = total === 10;
    const score = isFillBall ? 0 : isSpare ? total + nextPins2 : total;
    const rollCount = rolls[roll + 1] === undefined ? 1 : 2;
    return buildFrame({
      score,
      firstRoll: pins,
      secondRoll: nextPins1,
      rollCount,
    });
  }
};

const buildFrame = ({ score, firstRoll, secondRoll, rollCount }) => {
  if ([firstRoll, secondRoll].some((p) => p < 0 || 10 < p)) {
    throw new Error("Pins must have a value from 0 to 10");
  }
  if (firstRoll + secondRoll > 10) {
    throw new Error("Pin count exceeds pins on the lane");
  }
  const type = firstRoll === 10 ? "Strike" : firstRoll + secondRoll === 10 ? "Spare" : "Open";
  return { type, score, firstRoll, secondRoll, rollCount };
};

const assertFramesAreValid = (frames) => {
  if (frames.length < 10) {
    throw new Error("Score cannot be taken until the end of the game");
  }

  const tenFrame = frames[9];
  const fillBalls = frames.slice(10).reduce((t, f) => t + f.rollCount, 0);
  const correctFillBalls = { Open: 0, Spare: 1, Strike: 2 }[tenFrame.type];

  if (fillBalls < correctFillBalls) {
    throw new Error("Score cannot be taken until the end of the game");
  }
  if (fillBalls > correctFillBalls) {
    throw new Error("Should not be able to roll after game is over");
  }
};

module.exports = Bowling;
