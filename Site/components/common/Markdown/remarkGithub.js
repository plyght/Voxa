import { visit } from 'unist-util-visit';
import { u } from 'unist-builder';

const isInsideLink = (node, ancestors) => {
  return ancestors.some((ancestor) => ancestor.type === 'link');
};

const remarkGithub = (options) => {
  const { defaultOrg, defaultRepo } = options ?? {};
  const issueRegex = /#(\d+)/g;
  const fullUrlRegex =
    /https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/(issues|pull)\/(\d+)/g;
  const compareUrlRegex =
    /https:\/\/github\.com\/([\w-]+)\/([\w-]+)\/compare\/([\w.-]+)\.\.\.([\w.-]+)/g;
  const usernameRegex = /@([\w-]+)/g; // Regex to match @username

  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (!isInsideLink(node, [])) {
        const children = [];
        let lastIndex = 0;
        let match;

        function addText(text, start, end) {
          if (start < end) children.push(u('text', text.slice(start, end)));
        }

        // TODO: Handle my-org/my-repo#123 and my-repo#123

        // Handle issue numbers
        while ((match = issueRegex.exec(node.value)) !== null) {
          const [fullMatch, issueNumber] = match;
          addText(node.value, lastIndex, match.index);
          children.push(
            u(
              'link',
              {
                url: `https://github.com/${defaultOrg}/${defaultRepo}/issues/${issueNumber}`,
              },
              [u('text', `#${issueNumber}`)]
            )
          );
          lastIndex = match.index + fullMatch.length;
        }

        // Handle full GitHub URLs
        while ((match = fullUrlRegex.exec(node.value)) !== null) {
          const [fullMatch, org, repo, type, number] = match;
          addText(node.value, lastIndex, match.index);
          const linkText = `${org === defaultOrg ? '' : `${org}/`}${
            org === defaultOrg && repo === defaultRepo ? '' : repo
          }#${number}`;
          children.push(
            u(
              'link',
              { url: `https://github.com/${org}/${repo}/${type}/${number}` },
              [u('text', linkText)]
            )
          );
          lastIndex = match.index + fullMatch.length;
        }

        // Handle GitHub compare URLs
        while ((match = compareUrlRegex.exec(node.value)) !== null) {
          const [fullMatch, org, repo, tag1, tag2] = match;
          addText(node.value, lastIndex, match.index);
          children.push(
            u(
              'link',
              {
                url: `https://github.com/${org}/${repo}/compare/${tag1}...${tag2}`,
              },
              [u('text', `${tag1}...${tag2}`)]
            )
          );
          lastIndex = match.index + fullMatch.length;
        }

        // Handle GitHub usernames
        while ((match = usernameRegex.exec(node.value)) !== null) {
          const [fullMatch, usernameOrOrg] = match;
          addText(node.value, lastIndex, match.index);
          children.push(
            u('link', { url: `https://github.com/${usernameOrOrg}` }, [
              u('text', fullMatch),
            ])
          );
          lastIndex = match.index + fullMatch.length;
        }

        addText(node.value, lastIndex, node.value.length);

        if (
          children.length > 1 ||
          (children.length === 1 && children[0].type !== 'text')
        ) {
          parent.children.splice(index, 1, ...children);
        }
      }
    });
  };
};

export default remarkGithub;
