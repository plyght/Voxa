import Head from 'next/head';
import styled from 'styled-components';
import config from '@/data/config';
import { Section } from '@/components/common/layout';
import Markdown from '@/components/common/Markdown';
import ArticleHeader from './ArticleHeader';
import ShareSheet from './ShareSheet';
import AboutAuthor from './AboutAuthor';

const Article = styled.article`
  overflow: hidden;
  padding: 64px 0;

  .component {
    margin-left: auto;
    margin-right: auto;
    max-width: 980px;
  }

  .component-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 653px;

    @media only screen and (max-width: 1068px) {
      max-width: 576px;
    }
  }

  @media only screen and (max-width: 734px) {
    .pagebody + .sharesheet,
    .about-author,
    .article-header {
      margin-left: auto;
      margin-right: auto;
      width: 87.5%;
    }
  }
`;

const BlogPost = ({ frontmatter, markdownBody, author }) => {
  const title = `${frontmatter.title ?? frontmatter.headline} | ${
    config.title
  } Blog`;
  const description = frontmatter.description ?? frontmatter.subhead;

  return (
    <Section gutter={false}>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={frontmatter.image ?? `${config.host}}/social-preview.jpg`}
        />
        {!!frontmatter.draft && (
          <meta name="robots" content="noindex,nofollow" />
        )}
        <meta
          name="twitter:creator"
          content={frontmatter.authorTwitter ?? config.twitter}
        />
      </Head>
      <Article>
        <ArticleHeader frontmatter={frontmatter} author={author} />
        <Markdown className="pagebody component">{markdownBody}</Markdown>
        <ShareSheet />
        {author && <AboutAuthor author={author} />}
      </Article>
    </Section>
  );
};

export default BlogPost;
