import { useMemo } from "react";
import styled from "styled-components";
import { v4 as uuidV4 } from "uuid";
import Typography from './Typography';

const TileWrap = styled.div`
    --tile-background-color: var(--background-tertiary-color);
    --tile-overlay-background-color: var(--section-accent-color ,#86868b);
    --tile-overlay-copy-max-width: 550px;

    position: relative;
    /* padding: 22px; */
    background-color: var(--background-tertiary-color);
    /* border-radius: 18px; */
    border-radius: 30px;
    overflow: hidden;

    ${({ color }) => color === 'blue' ? `
      background-image: radial-gradient(circle at 90% 0%,#239AF2 0%,#3F4CC8 100%);
      // background: linear-gradient(114.88deg,#3cd0ff,#0b0050),linear-gradient(107.56deg,#000e16,#0c21e0 48.44%,#05d2ff);
    ` : ``}
    ${({ color }) => color === 'deep-purple' ? `
      background: linear-gradient(to bottom right,#0D1387,#867AF6);
    ` : ``}
    ${({ color }) => color === 'purple' ? `
      background: #dd41b7;
      background: linear-gradient(137deg,#dd41b7,#5717a6);
    ` : ``}
    ${({ color }) => color === 'pink' ? `
      background: #dd41b7;
      background-image: radial-gradient(circle at 0% -25%,#FF7948 0%,#FF8355 0,#DA2C84 42%,#3E13A4 110%);
    ` : ``}

    &[data-color-scheme="dark"] {
      color: white;
    }

    ol+*, p+*, ul+* {
      margin-top: 0.8em;
    }
`;

const TileContent = styled.div`
  padding: 40px;
`;
const TileHeader = styled.div`
  margin-top: -4px;
  max-width: 655px;
`;
const TileHeadline = styled(Typography).attrs({ as: "h4" })`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: .011em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${({ overlay }) => overlay ? `` : `color: var(--section-accent-color);`}
`;
const TileCopy = styled(Typography)`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${TileHeadline} + & {
      margin-top: 0.3em;
    }
`;
export const TileViolator = styled.div`
  box-sizing: border-box;
  white-space: nowrap;
  display: inline-block;
  background: transparent;
  border: 1px solid #bf4800;
  color: #bf4800;
  font-size: 17px;
  line-height: 1.1764805882;
  font-weight: 400;
  letter-spacing: -0.022em;
  font-family: SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
  border-radius: 18px;
  padding: 7px 18px;

  // reduced
  font-size: 12px;
  line-height: 1.3333733333;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
  border-radius: 12px;
  padding: 3px 11px;

  // tile violator
  background: transparent;
  /* border-color: #6e6e73;
  color: #6e6e73; */

`;
const TileBody = styled.div`

`;
const OverlayCheckbox = styled.input`
  display: none;
`;
const Overlay = styled.div`
    z-index: 10;
`;
const OverlayToggle = styled.label`
  -webkit-tap-highlight-color: transparent;
  z-index: 3;
  width: 44px;
  height: 44px;
  bottom: 24px;
  right: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`;
const TileButton = styled.span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-color 100ms linear;
  z-index: 2;
  background-color: #86868b;
  color: var(--tile-background-color);
  opacity: .92;
  transition: background-color .66s cubic-bezier(0.66,0,0.01,1) .66s,color .66s cubic-bezier(0.66,0,0.01,1) .66s,transform .66s cubic-bezier(0.66,0,0.2,1),opacity 100ms linear;
  background-color: #6e6e73; //dark
  will-change: transform;
  svg {
    fill: currentColor;
    width: 50%;
    height: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  ${OverlayCheckbox}:checked ~ ${Overlay} & {
    color: var(--tile-overlay-background-color);
    background-color: #fff;
    transform: rotate(45deg);
    transition-delay: 0s;
  }
`;
const TileButtonText = styled.span`
    position: absolute;
    width: 100%;
    height: 100%;
`;
const VisuallyHidden = styled.span`
    position: absolute;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
`;

const OverlayContent = styled.div`
  background-color: var(--tile-overlay-background-color);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: var(--tile-padding-top) var(--tile-padding-right) var(--tile-padding-bottom) var(--tile-padding-left);
  padding: 40px;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity .66s cubic-bezier(0.66,0,0.01,1) .66s,visibility 0s linear 1.32s;
  border-radius: 30px;
  
  ${OverlayCheckbox}:checked ~ ${Overlay} & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
`;
const OverlayHeader = styled.div`
  margin-top: -4px;
  max-width: 655px;
  & ${TileHeadline} {
    color: #fff;
  }
`;
const OverlayBody = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    align-items: center;
`;
const OverlayCopy = styled.div`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;

    color: #fff;

    max-width: var(--tile-overlay-copy-max-width);
    opacity: 0;
    transform: translateY(-20px);
    transition: all .66s cubic-bezier(0.66,0,0.2,1);

    ${OverlayCheckbox}:checked ~ ${Overlay} & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: .66s; 
    }
`;

const Tile = ({ children, headline, copy, overlay, violator, overlayCopy, ...props }) => {
  const conditionalProps = {};
  if (props.color) conditionalProps["data-color-scheme"] = "dark"

  const id = useMemo(() => uuidV4(), []);

  return (
    <TileWrap {...conditionalProps} {...props}>
      <TileContent>
        {(headline || copy || violator) && (
          <TileHeader>
            {headline && <TileHeadline>{headline}</TileHeadline>}
            {copy && <TileCopy>{copy}</TileCopy>}
            {violator && <TileViolator>{violator}</TileViolator>}
          </TileHeader>
        )}
        <TileBody>
          {children}
        </TileBody>
      </TileContent>
      {(overlay || overlayCopy) && (
        <>
          <OverlayCheckbox type="checkbox" id={`tile-overlay-toggle-${id}`} />
          <Overlay>
            <OverlayToggle for={`tile-overlay-toggle-${id}`}>
              <TileButton>
                <svg className="tile-icon-alt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M18.5,8.51h-7v-7A1.5,1.5,0,0,0,10,0h0A1.5,1.5,0,0,0,8.5,1.5v7h-7a1.5,1.5,0,0,0,0,3h7v7A1.5,1.5,0,0,0,10,20h0a1.5,1.5,0,0,0,1.5-1.5v-7h7a1.5,1.5,0,0,0,0-3Z"></path>
                </svg>
              </TileButton>
              <TileButtonText role="button" aria-expanded="false" aria-controls="content-toggle-shortcuts-app">
                <VisuallyHidden>Learn more</VisuallyHidden>
              </TileButtonText>
            </OverlayToggle>

            <OverlayContent>
            <OverlayHeader>
              <TileHeadline overlay>{headline}</TileHeadline>
            </OverlayHeader>
            <OverlayBody>
              {overlayCopy && <OverlayCopy>{overlayCopy}</OverlayCopy>}
              {typeof overlay === "function" ? overlay() : overlay}
            </OverlayBody>
            </OverlayContent>
          </Overlay>
        </>
      )}
    </TileWrap>
  );
}

export default Tile;
