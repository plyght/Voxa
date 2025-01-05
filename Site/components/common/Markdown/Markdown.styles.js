import styled from 'styled-components';

// Utility classes
// - wide
// - full-width
// - centered
// - aspect-ratio-[1:1|5:4|4:3|7:5|3:2|16:9|2:1|5:2|3:1] (and reverse)

export const MarkdownWrap = styled.div`
  & > *:first-child {
    margin-top: 0;
  }

  .centered {
    text-align: center;
  }

  .rounded-corners {
    border-radius: 15px;
  }

  &,
  & p,
  & figure {
    & > * {
      margin-left: auto;
      margin-right: auto;
      max-width: 653px;

      @media only screen and (max-width: 1068px) {
        max-width: 576px;
      }

      @media only screen and (max-width: 734px) {
        max-width: 87.5%;
      }
    }

    & > .wide {
      max-width: 100%;
    }

    & > .full-width {
      width: 100vw;
      max-width: 100vw;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  p {
    font-size: 19px;
    line-height: 1.4211;
    font-weight: 400;
    letter-spacing: 0.012em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
      'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    margin-bottom: 1.4211em;
  }

  img,
  video,
  iframe {
    display: block;
    margin-top: 44px;
    margin-bottom: 44px;

    &.crop-top {
      object-position: top;
    }

    &.crop-right {
      object-position: right;
    }

    &.crop-bottom {
      object-position: bottom;
    }

    &.crop-left {
      object-position: left;
    }

    &.ratio-1-1 {
      object-fit: cover;
      aspect-ratio: 1/1;
    }

    &.ratio-5-4 {
      object-fit: cover;
      aspect-ratio: 5/4;
    }
    &.ratio-4-3 {
      object-fit: cover;
      aspect-ratio: 4/3;
    }
    &.ratio-7-5 {
      object-fit: cover;
      aspect-ratio: 7/5;
    }
    &.ratio-3-2 {
      object-fit: cover;
      aspect-ratio: 3/2;
    }
    &.ratio-16-9 {
      object-fit: cover;
      aspect-ratio: 16/9;
    }
    &.ratio-2-1 {
      object-fit: cover;
      aspect-ratio: 2/1;
    }
    &.ratio-21-9 {
      object-fit: cover;
      aspect-ratio: 21/9;
    }
    &.ratio-5-2 {
      object-fit: cover;
      aspect-ratio: 5/2;
    }
    &.ratio-3-1 {
      object-fit: cover;
      aspect-ratio: 3/1;
    }

    &.ratio-4-5 {
      object-fit: cover;
      aspect-ratio: 4/5;
    }
    &.ratio-3-4 {
      object-fit: cover;
      aspect-ratio: 3/4;
    }
    &.ratio-5-7 {
      object-fit: cover;
      aspect-ratio: 5/7;
    }
    &.ratio-2-3 {
      object-fit: cover;
      aspect-ratio: 2/3;
    }
    &.ratio-9-16 {
      object-fit: cover;
      aspect-ratio: 9/16;
    }
    &.ratio-1-2 {
      object-fit: cover;
      aspect-ratio: 1/2;
    }
    &.ratio-2-5 {
      object-fit: cover;
      aspect-ratio: 2/5;
    }
    &.ratio-1-3 {
      object-fit: cover;
      aspect-ratio: 1/3;
    }
  }

  *:not(pre):not(.codeblock) > code {
    background: var(--fill-gray-quaternary);
    padding: 0.2em 0.4em;
    margin: 0;
    border-radius: 0.25em;
    white-space: break-spaces;
    font-size: 85%;
  }

  pre {
    /* width: 653px; */
    margin-top: 28px;
    margin-bottom: 28px;
    /* margin: 28px auto; */
    font-size: 15px;
    line-height: 25px;
    font-weight: 400;

    & > code {
      display: block;
      color: var(--color-syntax-plain-text);
      background: var(--color-syntax-background);
      font-family: 'SF Mono', SFMono-Regular, ui-monospace, Menlo, monospace;
      direction: ltr;
      text-align: left;
      white-space: pre;
      word-spacing: normal;
      word-break: normal;
      line-height: 1.666;
      tab-size: 4;
      hyphens: none;
      padding: 0.5333em 0.9333em;
      margin: 0.5em 0px;
      overflow: auto;
      border-radius: 15px;
    }

    & > .codeblock {
      border-radius: 15px;
    }
  }

  p,
  li,
  th,
  td,
  code,
  figcaption {
    & > a {
      &:hover {
        text-decoration: underline;
      }
    }
  }

  table {
    margin-top: 44px;
    margin-bottom: 44px;
    border-spacing: 0;
    overflow-x: auto;
    width: 100%;
    th,
    td {
      padding: 0.75em 0;
      border-bottom: 1px solid var(--separator-secondary-color);
      font-size: 17px;
      line-height: 25px;
    }
    th {
      border-bottom: 1.5px solid var(--label-tertiary-color);
    }
  }

  figure {
    max-width: 100%;
    margin-top: 44px;
    margin-bottom: 44px;

    img,
    video,
    iframe {
      margin-top: 0;
      margin-bottom: 0;
    }

    figcaption {
      display: block;
      max-width: 653px;
      position: relative;
      color: #6e6e73;
      margin-top: 16px;
      font-size: 12px;
      line-height: 1.33337;
      font-weight: 600;
      letter-spacing: -0.01em;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text',
        'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

      @media only screen and (max-width: 1068px) {
        max-width: 576px;
      }

      @media only screen and (max-width: 734px) {
        max-width: 87.5%;
      }
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 1.25em;
    margin-bottom: 20px;
    line-height: 1.125;
  }

  hr {
    margin-top: 44px;
    margin-bottom: 44px;
    display: block;
    border: 0;
    border-top: 1px solid var(--separator-color);
  }

  h1 {
    font-size: 48px;
  }

  h2 {
    font-size: 32px;
  }

  h3 {
    font-size: 24px;
  }

  h4 {
    font-size: 19px;
  }

  ul,
  ol {
    padding-left: 2em;
    box-sizing: border-box;
    font-size: 19px;
    margin-bottom: 1.4211em;
    li {
      margin-top: 0.5em;
      & > ul,
      & > ol {
        margin-bottom: 0;
      }
    }
  }

  blockquote {
    &:not(.alert) {
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
        'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
      position: relative;

      &:not(.wide):not(.full-width) {
        padding-left: calc(1em + 4px);
        font-size: 19px;
        line-height: 1.4211;
        font-weight: 400;
        letter-spacing: 0.012em;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display',
          'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
        margin-bottom: 1.4211em;
        color: var(--label-tertiary-color);
        &:before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 0.125em;
          bottom: 0.125em;
          border-left: 4px solid var(--separator-color);
        }
      }

      p {
        margin-bottom: 0.7895em;
      }

      footer {
        font-size: 14px;
        line-height: 1.28577;
        font-weight: 600;
        letter-spacing: -0.016em;
        font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text',
          'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
      }

      &.wide,
      &.full-width {
        margin-top: 72px;
        margin-bottom: 72px;

        @media only screen and (max-width: 1068px) {
          padding: 1em;
        }

        &,
        & p {
          text-align: center;
          text-wrap: balance;
          font-size: 40px;
          @media only screen and (max-width: 1068px) {
            font-size: 36px;
          }

          @media only screen and (max-width: 734px) {
            font-size: 27px;
          }

          line-height: 1.1;
          font-weight: 700;
          letter-spacing: 0em;
        }

        &:not(:has(p)):before,
        &:not(:has(p)):after,
        & p:first-child:before,
        & p:last-of-type:after {
          display: inline-block;
          width: 2em;
        }

        &:not(:has(p)):before,
        & p:first-child:before {
          margin-left: -2em;
          text-align: right;
          content: '“';
        }

        &:not(:has(p)):after,
        & p:last-of-type:after {
          margin-right: -2em;
          text-align: left;
          content: '”';
        }
      }

      &.full-width {
        padding: 2em;
        background: var(--background-secondary-color);
        box-sizing: border-box;
      }
    }

    &.alert {
      width: 656px;
      max-width: 100%;
      margin: 28px auto;
      break-inside: avoid;
      border-radius: var(--aside-border-radius, 15px);
      border-style: var(--aside-border-style, solid);
      border-width: var(--aside-border-width, 1px 1px 1px 1px);
      padding: 0.9411764706rem;
      box-sizing: border-box;
      text-align: start;
      p {
        margin-top: 0.4em;
        margin-bottom: 0;
        width: auto;

        &:first-child {
          margin: 0;
        }
        &.alert-label {
          font-size: 1rem;
          line-height: 1.5294417647;
          font-weight: 600;
          letter-spacing: -0.021em;
          margin-top: -0.25em;
        }
      }
      &.note {
        background-color: var(--color-alert-note-background);
        border-color: var(--color-alert-note-border);
        box-shadow:
          0 0 1px 0 var(--color-alert-note-border) inset,
          0 0 1px 0 var(--color-alert-note-border);
        p.alert-label {
          color: var(--color-alert-note);
        }
      }
      &.tip {
        background-color: var(--color-alert-tip-background);
        border-color: var(--color-alert-tip-border);
        box-shadow:
          0 0 1px 0 var(--color-alert-tip-border) inset,
          0 0 1px 0 var(--color-alert-tip-border);
        p.alert-label {
          color: var(--color-alert-tip);
        }
      }
      &.important {
        background-color: var(--color-alert-important-background);
        border-color: var(--color-alert-important-border);
        box-shadow:
          0 0 1px 0 var(--color-alert-important-border) inset,
          0 0 1px 0 var(--color-alert-important-border);
        p.alert-label {
          color: var(--color-alert-important);
        }
      }
      &.warning {
        background-color: var(--color-alert-warning-background);
        border-color: var(--color-alert-warning-border);
        box-shadow:
          0 0 1px 0 var(--color-alert-warning-border) inset,
          0 0 1px 0 var(--color-alert-warning-border);
        p.alert-label {
          color: var(--color-alert-warning);
        }
      }
      &.caution {
        background-color: var(--color-alert-caution-background);
        border-color: var(--color-alert-caution-border);
        box-shadow:
          0 0 1px 0 var(--color-alert-caution-border) inset,
          0 0 1px 0 var(--color-alert-caution-border);
        p.alert-label {
          color: var(--color-alert-caution);
        }
      }
    }
  }

  iframe[src^="https://www.youtube.com/"]
  {
    display: block;
    width: 100%;
    height: auto;
    aspect-ratio: 16/9;
  }

  section.footnotes {
    ol {
      padding-left: 1.5em;
      li::marker,
      li p {
        font-size: 0.7895em;
        width: auto;
        margin: 0;
      }
    }
  }

  @media only screen and (max-width: 1068px) {
    font-size: 17px;
    line-height: 1.47059;
    font-weight: 400;
    letter-spacing: -0.022em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text',
      'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
  }

  @media only screen and (max-width: 1068px) {
    &,
    p,
    li,
    th,
    td,
    & blockquote:not(.wide):not(.full-width) {
      font-size: 17px;
      line-height: 1.47059;
      font-weight: 400;
      letter-spacing: -0.022em;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text',
        'SF Pro Icons', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
    }
    th,
    td {
      font-size: 15px;
    }
    pre {
      font-size: 13px;
    }
  }
`;
