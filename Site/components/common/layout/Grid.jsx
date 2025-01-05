import styled from "styled-components";
import getResponsivePropStyles from '@/styles/getResponsivePropStyles';
import getSpacing from '../../../styles/spacing';

const Grid = styled.div`
  display: grid;
  ${({ columns }) => getResponsivePropStyles(columns, (val) => `grid-template-columns: repeat(${val}, 1fr);`)}
  ${({ rowHeight }) => getResponsivePropStyles(rowHeight, (val) => `grid-auto-rows: ${getSpacing(val)};`)}
  ${({ gap }) => getResponsivePropStyles(gap, (val) => `gap: ${getSpacing(val)};`)}
`;

export default Grid;
