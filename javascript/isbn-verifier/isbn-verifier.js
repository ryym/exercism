/**
 * @param {string} isbn
 * @returns {boolean}
 */
export const isValid = (isbn) => {
  const digits = isbn.replace(/-/g, "").split("");
  if (digits.length !== 10) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const n = 10 - i;
    const d = i === 9 && digits[i] === "X" ? 10 : Number(digits[i]);
    sum += n * d;
  }

  return !Number.isNaN(sum) && sum % 11 === 0;
};
