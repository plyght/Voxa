import { mediaQueries } from './breakpoints';

const getTypographyStyles = (variant) => {
  switch (variant) {
    case 'headline-standalone':
      return `
          font-size: 96px;
          line-height: 1.04167;
          font-weight: 600;
          letter-spacing: -.015em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:80px;
            line-height: 1.05;
            font-weight: 600;
            letter-spacing: -.015em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:48px;
            line-height: 1.08349;
            font-weight: 600;
            letter-spacing: -.003em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'headline-super':
      return `
          font-size: 80px;
          line-height: 1.05;
          font-weight: 600;
          letter-spacing: -.015em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:64px;
            line-height: 1.0625;
            font-weight: 600;
            letter-spacing: -.009em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:48px;
            line-height: 1.08349;
            font-weight: 600;
            letter-spacing: -.003em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'headline-elevated':
      return `
          font-size: 64px;
          line-height: 1.0625;
          font-weight: 600;
          letter-spacing: -.009em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:48px;
            line-height: 1.08349;
            font-weight: 600;
            letter-spacing: -.003em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:40px;
            line-height: 1.1;
            font-weight: 600;
            letter-spacing: 0em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'headline':
      return `
          font-size: 48px;
          line-height: 1.08349;
          font-weight: 600;
          letter-spacing: -.003em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:40px;
            line-height: 1.1;
            font-weight: 600;
            letter-spacing: 0em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:32px;
            line-height: 1.125;
            font-weight: 600;
            letter-spacing: .004em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'headline-reduced':
      return `
          font-size: 40px;
          line-height: 1.1;
          font-weight: 600;
          letter-spacing: 0em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:32px;
            line-height: 1.125;
            font-weight: 600;
            letter-spacing: .004em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:28px;
            line-height: 1.14286;
            font-weight: 600;
            letter-spacing: .007em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'eyebrow-super':
      return `
          font-size: 32px;
          line-height: 1.125;
          font-weight: 600;
          letter-spacing: .004em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:28px;
            line-height: 1.14286;
            font-weight: 600;
            letter-spacing: .007em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:24px;
            line-height: 1.16667;
            font-weight: 600;
            letter-spacing: .009em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'eyebrow-elevated':
      return `
          font-size: 28px;
          line-height: 1.14286;
          font-weight: 600;
          letter-spacing: .007em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:24px;
            line-height: 1.16667;
            font-weight: 600;
            letter-spacing: .009em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:21px;
            line-height: 1.19048;
            font-weight: 600;
            letter-spacing: .011em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'eyebrow':
      return `
          font-size: 24px;
          line-height: 1.16667;
          font-weight: 600;
          letter-spacing: .009em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:21px;
            line-height: 1.19048;
            font-weight: 600;
            letter-spacing: .011em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'eyebrow-reduced':
      return `
          font-size: 21px;
          line-height: 1.19048;
          font-weight: 600;
          letter-spacing: .011em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.sm} {
            font-size:19px;
            line-height: 1.21053;
            font-weight: 600;
            letter-spacing: .012em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'intro-elevated':
      return `
          font-size: 24px;
          line-height: 1.33341;
          font-weight: 400;
          letter-spacing: .009em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:21px;
            line-height: 1.381;
            font-weight: 400;
            letter-spacing: .011em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'intro':
      return `
          font-size: 21px;
          line-height: 1.381;
          font-weight: 400;
          letter-spacing: .011em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.sm} {
            font-size: 19px;
            line-height: 1.4211;
            font-weight: 400;
            letter-spacing: .012em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'section-head':
      return `
          font-size: 32px;
          line-height: 1.125;
          font-weight: 700;
          letter-spacing: .004em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          margin-bottom: 24px;
          @media ${mediaQueries.md} {
            font-size: 28px;
            line-height: 1.14286;
            font-weight: 700;
            letter-spacing: .007em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
      `;
    case 'quote':
      return `
          font-size: 40px;
          line-height: 1.2;
          font-weight: 400;
          letter-spacing: 0em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:32px;
            line-height: 1.25;
            font-weight: 400;
            letter-spacing: .004em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:28px;
            line-height: 1.28583;
            font-weight: 400;
            letter-spacing: .007em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'quote-reduced':
      return `
          font-size: 32px;
          line-height: 1.25;
          font-weight: 400;
          letter-spacing: .004em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:28px;
            line-height: 1.28583;
            font-weight: 400;
            letter-spacing: .007em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:24px;
            line-height: 1.33341;
            font-weight: 400;
            letter-spacing: .009em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'callout':
      return `
          font-size: 32px;
          line-height: 1.125;
          font-weight: 600;
          letter-spacing: .004em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:28px;
            line-height: 1.14286;
            font-weight: 600;
            letter-spacing: .007em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:24px;
            line-height: 1.16667;
            font-weight: 600;
            letter-spacing: .009em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'manifesto':
      return `
          font-size: 32px;
          line-height: 1.25;
          font-weight: 600;
          letter-spacing: .004em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:28px;
            line-height: 1.28583;
            font-weight: 600;
            letter-spacing: .007em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
          @media ${mediaQueries.sm} {
            font-size:24px;
            line-height: 1.33341;
            font-weight: 600;
            letter-spacing: .009em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'label':
      return `
          font-size: 24px;
          line-height: 1.16667;
          font-weight: 600;
          letter-spacing: .009em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          @media ${mediaQueries.md} {
            font-size:21px;
            line-height: 1.19048;
            font-weight: 600;
            letter-spacing: .011em;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
          }
        `;
    case 'tout':
      return `
          font-size: 19px;
          line-height: 1.21053;
          font-weight: 600;
          letter-spacing: .012em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'body':
      return `
          font-size: 17px;
          line-height: 1.47059;
          font-weight: 400;
          letter-spacing: -.022em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'body-tight':
      return `
          font-size: 17px;
          line-height: 1.23536;
          font-weight: 400;
          letter-spacing: -.022em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'body-reduced':
      return `
          font-size: 14px;
          line-height: 1.42859;
          font-weight: 400;
          letter-spacing: -.016em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'body-reduced-tight':
      return `
          font-size: 14px;
          line-height: 1.28577;
          font-weight: 400;
          letter-spacing: -.016em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'caption':
      return `
          font-size: 12px;
          line-height: 1.33337;
          font-weight: 400;
          letter-spacing: -.01em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'sosumi':
      return `
          font-size: 12px;
          line-height: 1.33337;
          font-weight: 400;
          letter-spacing: -.01em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'headline-body':
      return `
          font-size: 17px;
          line-height: 1.47059;
          font-weight: 600;
          letter-spacing: -.022em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    case 'headline-body-reduced':
      return `
          font-size: 14px;
          line-height: 1.42859;
          font-weight: 600;
          letter-spacing: -.016em;
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
    default:
      return ``;
  }
};

export default getTypographyStyles;
