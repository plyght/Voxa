const spacingFactor = 8;

const getSpacingValue = (s) => {
  // if a number, it is a spacing unit so multiply it by the spacingFactor and append "px"
  if (typeof s === 'number') {
    return `${s * spacingFactor}px`;
  }

  // if true, use main content spacing
  if (typeof s === 'boolean' && s) {
    return `${3 * spacingFactor}px`;
  }

  // Most likely a string and is a px, em, rem unit already
  return s;
};

const getSpacing = (t, r, b, l) => {
  // single value
  if (
    (r === undefined || r === null || r === false) &&
    (b === undefined || b === null || b === false) &&
    (l === undefined || l === null || l === false)
  ) {
    return getSpacingValue(t);
  }

  // x, y pair
  if (
    (b === undefined || b === null || b === false) &&
    (l === undefined || l === null || l === false)
  ) {
    return `${getSpacingValue(t)} ${getSpacingValue(r)}`;
  }

  // top, left/right, bottom shorthand
  if (l === undefined || l === null || l === false) {
    return `${getSpacingValue(t)} ${getSpacingValue(r)}`;
  }

  // top, right, bottom, left
  return `${getSpacingValue(t)} ${getSpacingValue(r)} ${getSpacingValue(
    b
  )} ${getSpacingValue(l)}`;
};

export default getSpacing;
