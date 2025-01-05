import { mediaQueries } from './breakpoints';

const getMediaQueryStyle = (size, val, getStyle) =>
  Object.keys(val).includes(size)
    ? size === 'lg'
      ? getStyle(val[size])
      : `
    @media ${mediaQueries[size]} {
      ${getStyle(val[size])}
    }
  `
    : ``;

const getResponsivePropStyles = (val, getStyle) =>
  val
    ? typeof val === 'object'
      ? `
        ${getMediaQueryStyle('xl', val, getStyle)}
        ${getMediaQueryStyle('lg', val, getStyle)}
        ${getMediaQueryStyle('md', val, getStyle)}
        ${getMediaQueryStyle('sm', val, getStyle)}
        ${getMediaQueryStyle('xs', val, getStyle)}
      `
      : getStyle(val)
    : ``;

export default getResponsivePropStyles;
