import Image from 'next/image';
import XSvg from '@/assets/x-icon.svg';
import GitHubSvg from '@/assets/github-icon.svg';
import { Globe } from 'react-feather';
import styled from 'styled-components';

const AboutAuthorWrap = styled.div`
  .component-content {
    border-top: 1px solid var(--separator-color);
    padding-top: 52px;
    .author-container {
      display: flex;
      gap: 1.1579em;
      margin-top: 1.4211em;
    }
    img.author-image {
      width: 96px;
      height: 96px;
      border-radius: 50%;
    }
    .author-info {
      font-size: 14px;
      line-height: 1.42859;
      font-weight: 500;
      letter-spacing: -0.016em;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
      box-sizing: border-box;
      word-wrap: break-word;
      display: inline-block;
      vertical-align: top;
    }
    .author-info-title {
      font-size: 19px;
      line-height: 1.21053;
      font-weight: 700;
      letter-spacing: 0.012em;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
      margin-bottom: 3px;
    }
    .author-info-name {
      margin-bottom: 3px;
    }
    .author-info-location {
      margin-top: -2px;
      margin-bottom: 3px;
      opacity: 0.65;
    }
    .author-info-bio {
      margin-bottom: 3px;
    }
    .author-social {
      margin-top: 12px;
      .author-social-link {
        margin-right: 16px;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  @media only screen and (max-width: 734px) {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
`;

const AboutAuthor = ({ author }) => {
  if (!author) return;

  // If the author's url does not start with http(s) then append https
  if (!author.blog.startsWith('http')) {
    author.blog = `https://${author.blog}`;
  }
  
  return (
    <AboutAuthorWrap className="about-author component">
      <div className="component-content">
        <h2 className="about-author-headline">About the Author</h2>
        <div className="author-container">
          <Image
            className="author-image"
            width="128"
            height="128"
            src={author.avatar_url}
            alt={`${author.name} user image`}
          />
          <div className="author-info">
            <p className="author-info-title">{author.name}</p>
            <p className="author-info-text">{author.location}</p>
            <p className="author-info-text">{author.bio}</p>
            <div className="author-social">
              <a
                className="author-social-link"
                href={author.blog}
                target="_blank"
              >
                <Globe />
              </a>
              <a
                className="author-social-link"
                href={`https://github.com/${author.login}`}
                target="_blank"
              >
                <GitHubSvg />
              </a>
              <a
                className="author-social-link"
                href={`https://x.com/${author.twitter_username}`}
                target="_blank"
              >
                <XSvg />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AboutAuthorWrap>
  );
};

export default AboutAuthor
