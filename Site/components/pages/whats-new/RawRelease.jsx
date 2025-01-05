import styled from 'styled-components';
import Markdown from '@/components/common/Markdown';
import Head from 'next/head';

const StyledMarkdown = styled(Markdown)`
  img:first-child {
    display: none;
  }
  padding: 10px;
  img {
    width: 100%;
  }
  p,
  ul,
  ol,
  li {
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }
  & img,
  & video,
  & iframe {
    margin-bottom: 10px;
  }

  & > * {
    max-width: 100%;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const RawRelease = ({ release }) => {
  if (!release) return <div>No Release Found</div>;
  
  return (
    <>
      <Head>
        <meta name="robots" content="noindex"></meta>
      </Head>
      <StyledMarkdown>{release.body}</StyledMarkdown>
    </>
  );
};

export default RawRelease
