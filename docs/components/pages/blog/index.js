import { Section } from '@/components/common/layout';
import Typography from '@/components/common/Typography';
import { mediaQueries } from '@/styles/breakpoints';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const Tiles = styled.ul`
  align-items: stretch;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0;
`;
const TileItem = styled.li`
  position: relative;
  list-style: none;

  &.item-1up,
  &.item-hero,
  &.item-hero-reversed,
  &.item-hero-secondary,
  &.item-hero-highlight,
  &.item-hero-highlight-secondary,
  &.item-portrait,
  &.item-portrait-secondary,
  &.item-super-hero,
  &.item-super-hero-secondary {
    flex-basis: 100%;
  }

  &:first-child {
    &.item,
    &.item-1up,
    &.item-hero,
    &.item-hero-reversed,
    &.item-hero-secondary,
    &.item-hero-highlight,
    &.item-hero-highlight-secondary,
    &.item-super-hero,
    &.item-super-hero-secondary,
    &.item-portrait,
    &.item-portrait-secondary {
      & ~ .tile-item {
        margin-top: 36px;
        @media ${mediaQueries.md} {
          margin-top: 22px;
        }
      }
    }
  }
`;
const TileWrap = styled(Link)`
  --tile-background-color: var(--background-tertiary-color);
  --tile-color: var(--label-primary-color);
  background-color: var(--tile-background-color);
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  z-index: 0;
  position: relative;

  height: 100%;

  cursor: pointer;

  &.tile-1up {
    width: 100%;
    @media ${mediaQueries.sm} {
      flex-direction: column;
    }
  }

  &.tile-1up.tile-quick-read {
    padding: 58px;
    align-items: center;
    box-sizing: border-box;
    display: flex;
  }
  &.tile-hero {
    flex-direction: row;
    width: 100%;
  }
  &.tile-hero-reversed {
    flex-direction: row-reverse;
    width: 100%;
  }
  &.tile-hero-secondary {
    flex-direction: row;
    width: 100%;
  }
  &.tile-hero-highlight {
    display: block;
    justify-content: flex-end;
    position: relative;
  }
  &.tile-hero-highlight-secondary {
    @media only screen and (min-width: 1069px) {
      display: block;
      justify-content: flex-end;
      position: relative;
    }
  }
  &.tile-super-hero {
    flex-direction: column;
    width: 100%;
  }
  &.tile-super-hero-secondary {
    flex-direction: column;
    width: 100%;
  }
  &.tile-portrait {
    flex-direction: row;
    width: 100%;
  }
  &.tile-portrait-secondary {
    flex-direction: row;
    width: 100%;
  }
  &.tile-2up {
    flex-direction: column;
    width: 472px;
    @media ${mediaQueries.md} {
      width: 333px;
    }
    @media ${mediaQueries.sm} {
      width: 100%;
    }
  }
  &.tile-3up {
    flex-direction: column;
    width: 303px;
    @media ${mediaQueries.md} {
      width: 333px;
    }
    @media ${mediaQueries.sm} {
      width: 100%;
    }
  }
`;
const TileMedia = styled.div`
  position: relative;
  z-index: 0;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;

  .tile-1up & {
    width: 100%;
    height: auto;
    min-height: 362px;
    flex-basis: 643px;
    flex-shrink: 1;
    @media ${mediaQueries.md} {
      width: 100%;
      height: auto;
      min-height: 255px;
      flex-basis: 453px;
      flex-shrink: 1;
    }
    @media ${mediaQueries.sm} {
      flex-basis: auto;
      min-height: 0;
      aspect-ratio: 16/9;
    }
  }

  .tile-2up & {
    width: 100%;
    height: 266px;
    min-height: auto;
    flex-basis: auto;
    flex-shrink: 1;
    @media ${mediaQueries.md} {
      width: 100%;
      height: 187px;
      min-height: auto;
      flex-basis: auto;
      flex-shrink: 1;
    }
  }

  .tile-3up & {
    width: 100%;
    height: 170px;
    min-height: auto;
    flex-basis: auto;
    flex-shrink: 1;
  }
`;
const TileImage = styled(Image)`
  /* background-image: url(${({ src }) => src});
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  width: 100%;
  height: 100%;
  object-fit: cover;

  .tile:hover & {
    transform: scale(1.03);
  }
`;
const TileDescription = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;

  .tile-1up & {
    padding: 32px;
    justify-content: space-between;
    flex-basis: 0;
    @media ${mediaQueries.md} {
      padding: 24px;
    }
    @media ${mediaQueries.sm} {
      padding: 24px;
    }
  }

  .tile-2up & {
    padding: 32px;
    justify-content: space-between;
    flex-basis: auto;
    @media ${mediaQueries.md} {
      padding: 24px;
    }
    @media ${mediaQueries.sm} {
      padding: 19px;
    }
  }

  .tile-3up & {
    padding: 24px;
    justify-content: space-between;
    flex-basis: auto;
    @media ${mediaQueries.sm} {
      padding: 19px;
    }
  }
`;
const TileHead = styled.div``;
const TileCategory = styled.div`
  color: var(--label-tertiary-color);
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  text-transform: uppercase;
  margin-bottom: 8px;

  .tile-1up & {
    margin-bottom: 8px;
    @media ${mediaQueries.md} {
      margin-bottom: 8px;
    }
  }
  .tile-2up & {
    margin-bottom: 8px;
    @media ${mediaQueries.md} {
      margin-bottom: 8px;
    }
  }
  .tile-3up & {
    margin-bottom: 8px;
  }
`;

const TileHeadline = styled.div`
  color: var(--label-primary-color);
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;

  .tile-1up & {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 700;
    letter-spacing: 0.004em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    @media ${mediaQueries.md} {
      font-size: 21px;
      line-height: 1.19048;
      font-weight: 700;
      letter-spacing: 0.011em;
      font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
    }
    @media ${mediaQueries.sm} {
      font-size: 24px;
    }
  }

  .tile-2up & {
    font-size: 24px;
    line-height: 1.16667;
    font-weight: 700;
    letter-spacing: 0.009em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    @media ${mediaQueries.md} {
      font-size: 19px;
      line-height: 1.21053;
      font-weight: 700;
      letter-spacing: 0.012em;
      font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
    }
  }

  .tile-3up & {
    font-size: 19px;
    line-height: 1.21053;
    font-weight: 700;
    letter-spacing: 0.012em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }
`;
const TileTimestamp = styled.div`
  color: var(--label-tertiary-color);
  font-size: 14px;
  line-height: 1.28577;
  font-weight: 600;
  letter-spacing: -0.016em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .tile-quick-read.tile-1up & {
    margin-top: 16px;
    @media ${mediaQueries.md} {
      margin-top: 12px;
    }
  }
  .tile-1up & {
    margin-top: 12px;
    @media ${mediaQueries.md} {
      margin-top: 12px;
    }
  }
  .tile-2up & {
    margin-top: 12px;
    @media ${mediaQueries.md} {
      margin-top: 8px;
    }
  }
  .tile-3up & {
    margin-top: 8px;
  }
`;
const CtaWrap = styled.div`
  display: flex;
  justify-content: center;
`;
const CtaButton = styled.button`
  border-radius: 30px;
  display: inline-block;
  transition:
    background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  font-size: 17px;
  line-height: 1.23536;
  font-weight: 600;
  letter-spacing: -0.022em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  border: 2px solid var(--label-primary-color);
  padding: 10px 24px 9px;
  border-color: var(--label-primary-color);
  color: var(--label-primary-color);
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: var(--fill);
    border-color: var(--label-primary-color);
    background-color: var(--label-primary-color);
  }
`;

const tileLayout = [1, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3];

const getTileImpositionLayout = (idx) => `${tileLayout[idx] ?? 3}up`;

function formatDate(str) {
  const date = new Date(str);
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function BlogPage({ posts }) {
  return (
    <>
      <Section contained gutterY variant="secondary">
        <Typography variant="section-head" as="h2">
          Latest News
        </Typography>
        <Tiles>
          {posts.map((post, idx) => {
            const tileImpositionLayout = getTileImpositionLayout(idx);

            return (
              <TileItem
                key={post.date + post.slug}
                className={`tile-item item item-${tileImpositionLayout}`}
              >
                <Tile post={post} impositionLayout={tileImpositionLayout} />
              </TileItem>
            );
          })}
        </Tiles>
      </Section>
      {posts.length > 11 && (
        <Section contained gutterBottom>
          <CtaWrap>
            <Link href="/blog/archive/">
              <CtaButton>View Archive</CtaButton>
            </Link>
          </CtaWrap>
        </Section>
      )}
    </>
  );
}

const Tile = ({ post, impositionLayout }) => {
  return (
    <TileWrap href={post.url} className={`tile tile-${impositionLayout}`}>
      <TileMedia>
        <TileImage width="643" height="362" src={post.image} alt="Post Image" />
      </TileMedia>
      <TileDescription>
        <TileHead>
          <TileCategory>{post.category}</TileCategory>
          <TileHeadline>{post.title}</TileHeadline>
        </TileHead>
        {post.date && <TileTimestamp>{formatDate(post.date)}</TileTimestamp>}
      </TileDescription>
    </TileWrap>
  );
};
