import Image from "next/image";
import ShareSheet from "./ShareSheet";
import styled from "styled-components";
import config from '@/data/config';

const ArticleHeaderWrap = styled.div`
  .category.component {
    margin-top: 0;
    margin-bottom: 20px;
  }

  .category-eyebrow__category {
    text-transform: uppercase;
  }

  .category-eyebrow__category,
  .category-eyebrow__date {
    display: block;
  }

  .category-eyebrow {
    font-size: 12px;
    line-height: 1.33337;
    font-weight: 700;
    letter-spacing: -0.01em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }

  .category-eyebrow__date {
    margin-top: 4px;
  }

  .category-eyebrow__date {
    font-size: 14px;
    line-height: 1.28577;
    font-weight: 600;
    letter-spacing: -0.016em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }

  .pagetitle.component {
    margin-top: 0;
    margin-bottom: 0;
  }

  .pagetitle .hero-headline {
    font-size: 48px;
    line-height: 1.08349;
    font-weight: 700;
    letter-spacing: -0.003em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;

    @media only screen and (max-width: 1068px) {
      font-size: 40px;
      line-height: 1.1;
      letter-spacing: 0em;
    }

    @media only screen and (max-width: 734px) {
      font-size: 32px;
      line-height: 1.125;
      letter-spacing: 0.004em;;
    }
  }

  .article-subhead.component {
    font-size: 24px;
    line-height: 1.16667;
    font-weight: 500;
    letter-spacing: 0.009em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    margin-top: 20px;
    margin-bottom: 0;

    @media only screen and (max-width: 1068px) {
      font-size: 21px;
      line-height: 1.19048;
      letter-spacing: .011em;
    }
  }

  .author.component {
    margin-top: 20px;
    margin-bottom: 0;
  }

  .author-content {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .author-image {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .author-text {
    font-size: 14px;
    line-height: 1.28577;
    font-weight: 600;
    letter-spacing: -0.016em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }

  @media only screen and (max-width: 734px) {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
`;


function formatDate(fullDate) {
  const date = new Date(fullDate);
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

const ArticleHeader = ({ frontmatter, author }) => {
  return (
    <ArticleHeaderWrap className="article-header">
      <div className="category component">
        <div className="component-content">
          <div className="category-eyebrow">
            <span className="category-eyebrow__category">
              {config.categories[frontmatter.category ?? "updates"]?.title ?? config.categories.updates.title}
            </span>
            <span className="category-eyebrow__date">
              {formatDate(frontmatter.date)}
            </span>
          </div>
        </div>
      </div>
      <div className="pagetitle component">
        <div className="component-content">
          <h1 className="hero-headline">
            {frontmatter.headline ?? frontmatter.title}
          </h1>
        </div>
      </div>
      <div className="article-subhead component">
        <div className="component-content">{frontmatter.subhead}</div>
      </div>
      {author && (
        <div className="author component">
          <div className="component-content">
            <div className="author-content">
              <Image
                width="24"
                height="24"
                className="author-image"
                src={author.avatar_url}
                alt={`${author.name} user image`}
              />
              <span className="author-text">{author.name}</span>
            </div>
          </div>
        </div>
      )}
      <ShareSheet />
    </ArticleHeaderWrap>
  );
};

export default ArticleHeader;
