import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Column, Row, Section, Stack } from '@/components/common/layout';
import Typography from '@/components/common/Typography';
import Image from 'next/image';
import Tile from '@/components/common/Tile';
import { mediaQueries } from '@/styles/breakpoints';

const StepTile = styled(Tile)`
  overflow: hidden;
  aspect-ratio: 1/1;
  img {
    transform: translateX(-50%);
  }
  @media ${mediaQueries.md} {
    aspect-ratio: 16/7;
  }
  @media ${mediaQueries.sm} {
    aspect-ratio: 1/1;
    img {
      transform: translateX(-50%) translateY(-10%) scale(1.25);
    }
  }
  @media ${mediaQueries.xs} {
    aspect-ratio: 1/1;
    img {
      transform: translateX(-50%) translateY(10%) scale(0.9);
    }
  }
`;
const ProductIconWrap = styled.div`
  width: 128px;
  margin-left: auto;
  margin-right: auto;
`;
const StepNumber = styled.div`
  width: 1.75em;
  height: 1.75em;
  border-radius: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 2.5px solid;
`;
const Download = styled.iframe`
  width: 0;
  height: 0;
  position: fixed;
  top: 100%;
  right: 100%;
  border: 0;
  background: transparent;
  opacity: 0;
`;

export default function DownloadPage({ downloadUrl }) {
  return (
    <>
      <Download src={downloadUrl} />
      <Section contained gutterTop>
        <Row align="center" style={{ position: 'relative', zIndex: 1 }}>
          <Column width={{ md: 12, lg: 12 }}>
            <Stack gap={2} align="center">
              <ProductIconWrap>
                <Image
                  width={128}
                  height={128}
                  src="/product-icon.png"
                  alt="CodeEdit product icon"
                />
              </ProductIconWrap>
              <Typography variant="headline-elevated">
                Thanks for downloading CodeEdit!
              </Typography>
              <Typography
                variant="intro-elevated"
                color="tertiary"
                gutterBottom
              >
                Your download will start automatically. If it didn&rsquo;t,{' '}
                <a
                  href={
                    downloadUrl ?? `${config.links.githubRepo}/releases/latest`
                  }
                  target="_blank"
                >
                  download manually
                </a>
                .
              </Typography>
            </Stack>
          </Column>
        </Row>
      </Section>
      <Section contained gutterY>
        <Row gap>
          <Column width={{ md: 12, lg: 4 }}>
            <StepTile>
              <Stack gap>
                <StepNumber>1</StepNumber>
                <Typography variant="eyebrow">
                  Open CodeEdit disk image in Downloads
                </Typography>
                <Image
                  width={200}
                  height={200}
                  src="/downloads-folder.png"
                  alt="Downloads folder"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: -50,
                  }}
                />
              </Stack>
            </StepTile>
          </Column>
          <Column width={{ md: 12, lg: 4 }}>
            <StepTile gap>
              <Stack gap>
                <StepNumber>2</StepNumber>
                <Typography variant="eyebrow">
                  Drag the CodeEdit icon to Applications
                </Typography>
                <Image
                  width={256}
                  height={149}
                  src="/drag-to-applications-folder.png"
                  alt="Downloads folder"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                  }}
                />
              </Stack>
            </StepTile>
          </Column>
          <Column width={{ md: 12, lg: 4 }}>
            <StepTile>
              <Stack gap>
                <StepNumber>3</StepNumber>
                <Typography variant="eyebrow">
                  Add to dock, click to launch!
                </Typography>
                <Image
                  width={400}
                  height={120}
                  src="/drag-to-dock.png"
                  alt="Downloads folder"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    bottom: 0,
                  }}
                />
              </Stack>
            </StepTile>
          </Column>
        </Row>
      </Section>
    </>
  );
}
