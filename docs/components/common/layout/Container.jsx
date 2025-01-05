import { mediaQueries } from '@/styles/breakpoints';
import styled from 'styled-components'

const gutter = 22;
const smallGutter = 16;

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: ${({ $width }) => $width === 'lg' ? 1440-(gutter*2) : 980}px;
  width: calc(100% - max(${gutter}px, env(safe-area-inset-left)) - max(${gutter}px, env(safe-area-inset-right)));
  padding: 0 ${gutter}px;
  padding-left: calc(max(${gutter}px, env(safe-area-inset-left)));
  padding-right: calc(max(${gutter}px, env(safe-area-inset-right)));
  position: relative;
  @media ${mediaQueries.md} {
    margin-left: auto;
    margin-right: auto;
    width: 692px;
  }
  @media ${mediaQueries.sm} {
    max-width: 366px;
    width: calc(100% - ${smallGutter}px * 2);
    padding: 0 ${smallGutter}px;
    padding-left: calc(max(${smallGutter}px, env(safe-area-inset-left)));
    padding-right: calc(max(${smallGutter}px, env(safe-area-inset-right)));
  }
`;

export default Container;
