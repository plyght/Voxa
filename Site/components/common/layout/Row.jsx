import React from 'react'
import styled from "styled-components";
import getSpacing from '@/styles/spacing';
import getResponsivePropStyles from '@/styles/getResponsivePropStyles';

const RowWrap = styled.div`
  display: flex;
  box-sizing: border-box;
  display: flex;
  flex: 0 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ gap, gutter, gutterTop, gutterBottom }) => gap ? getResponsivePropStyles(gap, (val) => {
    const spacing = getSpacing(val);
    return `
      margin-left: calc(-${spacing}/2);
      margin-right: calc(-${spacing}/2);
      gap: ${spacing} 0;
      ${gutter || gutterTop ? `margin-top: ${spacing};` : ``}
      ${gutter || gutterBottom ? `margin-bottom: ${spacing};` : ``}
    `
  }) : `
    ${gutter || gutterTop ? `margin-top: ${getSpacing(gutterTop ?? gutter)};` : ``}
    ${gutter || gutterBottom ? `margin-bottom: ${getSpacing(gutterBottom ?? gutter)};` : ``}
  `}
  ${({ align }) => getResponsivePropStyles(
    align, 
    (val) => `
      justify-content: ${val === "center" ? `` : `flex-`}${val};
      ${val === "center" ? `text-align: center;` : ``}
      ${val === "end" ? `text-align: end;` : ``}
    `
  )}
  ${({ distribute }) => getResponsivePropStyles(
    distribute, 
    (val) => `justify-content: space-${val};`
  )}
`;

const Row = ({ children, gap, ...props }) => {
  const itemCount = React.Children.count(children);
  const childrenWithProps = React.Children.map(children, child =>
    React.cloneElement(child, { $gap: gap, $itemCount: itemCount })
  );

  return (
    <RowWrap gap={gap} {...props}>{childrenWithProps}</RowWrap>
  )
}

export default Row;
