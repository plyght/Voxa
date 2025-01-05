import styled from "styled-components";
import RestrictedContainer from "./Container"
import getSpacing from '@/styles/spacing';
import getResponsivePropStyles from '@/styles/getResponsivePropStyles';
import useVisibilityProps from "@/hooks/useVisibilityProps";
import { mediaQueries } from "@/styles/breakpoints";

const SectionWrap = styled.section`
  --section-accent-color: ${({ accentColor }) => `var(--${accentColor})`};
  ${({ gutter, gutterTop, gutterY }) => getResponsivePropStyles((gutterTop ?? gutterY ?? gutter ?? 8), (val) => `
    padding-top: ${getSpacing(val)};
  `)}
  ${({ gutter, gutterBottom, gutterY }) => getResponsivePropStyles((gutterBottom ?? gutterY ?? gutter ?? 8), (val) => `
    padding-bottom: ${getSpacing(val)};
  `)}
  @media ${mediaQueries.sm} {
    ${({ gutter, gutterTop, gutterY }) => getResponsivePropStyles((gutterTop ?? gutterY ?? gutter ?? 8), (val) => `
      padding-top: ${getSpacing(val/2)};
    `)}
    ${({ gutter, gutterBottom, gutterY }) => getResponsivePropStyles((gutterBottom ?? gutterY ?? gutter ?? 8), (val) => `
      padding-bottom: ${getSpacing(val/2)};
    `)}
  }
`;

const FullWidthContainer = styled.div`
  ${({ gutter, gutterLeft, gutterX }) => getResponsivePropStyles((gutterLeft ?? gutterX ?? gutter ?? 3), (val) => `
    padding-left: ${getSpacing(val)};
  `)}
  ${({ gutter, gutterRight, gutterX }) => getResponsivePropStyles((gutterRight ?? gutterX ?? gutter ?? 3), (val) => `
    padding-right: ${getSpacing(val)};
  `)}
  @media ${mediaQueries.sm} {
    ${({ gutter, gutterLeft, gutterX }) => getResponsivePropStyles((gutterLeft ?? gutterX ?? gutter ?? 3), (val) => `
      padding-left: ${getSpacing(val/2)};
    `)}
    ${({ gutter, gutterRight, gutterX }) => getResponsivePropStyles((gutterRight ?? gutterX ?? gutter ?? 3), (val) => `
      padding-right: ${getSpacing(val/2)};
    `)}
  }
`;

export default function Section (props) {
  let { children, className, contained, gutter, gutterTop, gutterBottom, gutterLeft, gutterRight, gutterX = true, gutterY, accentColor = "azure", ...rest } = props;
  const Container = contained ? RestrictedContainer : FullWidthContainer;
  const isVisible = useVisibilityProps(props);

  if (!isVisible) return null;
  
  const defaultGutterX = 3;
  const defaultGutterY = 8;

  if (gutterLeft === true) gutterLeft = defaultGutterX;
  if (gutterRight === true) gutterRight = defaultGutterX;
  if (gutterX === true) gutterX = defaultGutterX;
  if (gutter === true) gutterX = defaultGutterX;

  if (gutterLeft === false) gutterLeft = 0;
  if (gutterRight === false) gutterRight = 0;
  if (gutterX === false) gutterX = 0;
  if (gutter === false) gutterX = 0;

  if (gutterTop === true) gutterTop = defaultGutterY;
  if (gutterBottom === true) gutterBottom = defaultGutterY;
  if (gutterY === true) gutterY = defaultGutterY;
  if (gutter === true) gutterY = defaultGutterY

  if (gutterTop === false) gutterTop = 0;
  if (gutterBottom === false) gutterBottom = 0;
  if (gutterY === false) gutterY = 0;
  if (gutter === false) gutterY = 0

  return (
    <SectionWrap
      className={className}
      gutter={[gutterY, gutterX]}
      gutterTop={gutterTop}
      gutterBottom={gutterBottom}
      gutterX={gutterX}
      gutterY={gutterY}
      accentColor={accentColor}
      {...rest}
    >
      <Container gutter={gutterX} $width={contained}>
        {children}
      </Container>
    </SectionWrap>
  );
}
