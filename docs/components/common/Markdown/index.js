import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/cjs/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/cjs/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/cjs/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import swift from 'react-syntax-highlighter/dist/cjs/languages/prism/swift';

import { useSite } from '@/components/common/Site';
import darkSyntaxTheme from '@/data/syntax-dark';
import lightSyntaxTheme from '@/data/syntax-light';

import remarkAlerts from './remarkAlerts';

import * as Styled from './Markdown.styles';
import remarkGithub from './remarkGithub';

SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('scss', scss);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('markdown', markdown);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('swift', swift);

const Markdown = ({
  children,
  className,
  style,
  components = {},
  remarkPlugins = [],
  rehypePlugins = [],
}) => {
  const { colorScheme } = useSite();
  const syntaxTheme = useMemo(
    () => (colorScheme === 'dark' ? darkSyntaxTheme : lightSyntaxTheme),
    [colorScheme]
  );

  const CodeSandboxTransformer = {
    name: 'CodeSandbox',
    // shouldTransform can also be async
    shouldTransform(url) {
      const { host, pathname } = new URL(url);

      return (
        ['codesandbox.io', 'www.codesandbox.io'].includes(host) &&
        pathname.includes('/s/')
      );
    },
    // getHTML can also be async
    getHTML(url) {
      const iframeUrl = url.replace('/s/', '/embed/');

      return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
    },
  };

  const MarkdownComponents = {
    code({ node, inline, className, ...props }) {
      const hasLang = /language-(\w+)/.exec(className || '');
      const hasMeta = node?.data?.meta;

      const applyHighlights = (applyHighlights) => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node.data.meta?.replace(/\s/g, '');
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)[1]
            : '0';
          const highlightLines = rangeParser(strlineNumbers);
          const highlight = highlightLines;
          const data = highlight.includes(applyHighlights) ? 'highlight' : null;
          return { data };
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeblock"
          wrapLines={hasMeta}
          useInlineStyles
          lineProps={applyHighlights}
        >
          {props.children}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props} />
      );
    },
  };

  return (
    <div>
    <Styled.MarkdownWrap className={className} style={style}>
      <ReactMarkdown
        components={{ ...MarkdownComponents, ...components }}
        remarkPlugins={[
          remarkGfm,
          remarkAlerts,
          [
            remarkGithub,
            { defaultOrg: 'CodeEditApp', defaultRepo: 'CodeEdit' },
          ],
          // [remarkEmbedder, { transformers: [CodeSandboxTransformer] }],
          ...remarkPlugins,
        ]}
        rehypePlugins={[rehypeRaw, ...rehypePlugins]}
      >
        {children}
      </ReactMarkdown>
    </Styled.MarkdownWrap>
    </div>
  );
};

export default Markdown;
