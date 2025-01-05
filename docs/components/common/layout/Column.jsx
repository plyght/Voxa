import styled from "styled-components";
import getResponsivePropStyles from "@/styles/getResponsivePropStyles";
import getSpacing from "@/styles/spacing";

const Column = styled.div`
  box-sizing: border-box;
  flex: 0 0 auto;
  ${({ $gap }) => getResponsivePropStyles($gap, (val) => `
    padding-left: calc(${getSpacing(val)}/2);
    padding-right: calc(${getSpacing(val)}/2);
`)}
  ${({ width }) => width ? getResponsivePropStyles(width, (val) => `
    flex-basis: ${Number(val ?? 1)/12*100}%;
    max-width: ${Number(val ?? 1)/12*100}%;
  `) : `
    flex: 1;
    max-width: 100%;
  `}
  ${({ offset }) => getResponsivePropStyles(offset, (val) => `
    margin-left: ${Number(val ?? 1)/12*100}%;
  `)}
`;

export default Column;
