function getMinimumSystemVersion(str) {
  const regex = /minimumSystemVersion=(\d+\.\d+)/;
  const match = str.match(regex);

  return match ? match[1] : null;
}

export default getMinimumSystemVersion;
