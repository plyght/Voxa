import React from "react";
import styled, { keyframes } from "styled-components";

const ribbonDrop = keyframes`
  0% {
      transform: translateY(-100%);
  }
  100% {
      transform: translateY(0);
  }
`;
const RibbonWrap = styled.div`
  --ribbon-background-color: #0071e3;
  --ribbon-text-color: #fff;
  --ribbon-link-color: #fff;
  --ribbon-focus-color: rgba(255,255,255,0.6);
  overflow: hidden;
  ${({ onClick }) => onClick ? `cursor: pointer;` : ``}
`;
const RibbonDrop = styled.div`
  animation: ${ribbonDrop} 0.8s cubic-bezier(0.42, 0, 0.58, 1) forwards;
`;
const RibbonContentWrapper = styled.div`
  background-color: var(--ribbon-background-color);
  padding-top: 0.94118em;
  padding-bottom: 0.94118em;
  text-align: center;
`;
const RibbonContent = styled.div`
  color: var(--ribbon-text-color);
  font-size: 14px;
  line-height: 1.42859;
  font-weight: 400;
  letter-spacing: -.016em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`;

function Ribbon({ children, onClick, ...props }) {
  return (
    <RibbonWrap onClick={onClick} {...props}>
      <RibbonDrop>
        <RibbonContentWrapper>
          <RibbonContent>
            {children}
          </RibbonContent>
        </RibbonContentWrapper>
      </RibbonDrop>
    </RibbonWrap>
  )
}

export default Ribbon;
