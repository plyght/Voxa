import matter from 'gray-matter';
import glob from 'glob';
import { fetchGitHubUser } from '@/utils/fetchData';

const getDate = (str) => new Date(str).toISOString();

const getAllPosts = async () => {
  const paths = glob.sync('data/blog/**/*.md');

  let posts = await Promise.all(
    paths.map(async (path) => {
      // Remove "data" from beginning of string and ".md" from end for URL
      const url = path.slice(4, -3);
      // retrieving the Markdown file associated to the slug
      // and reading its data
      const content = await import(`../${path}`);
      const data = matter(content.default);
      const frontmatter = data.data;
      // fetching authors user data from GitHub
      const author = frontmatter.author
        ? await fetchGitHubUser(frontmatter.author)
        : null;
      // extracting slug from path
      const pathComponents = path.split('/');
      const slug = pathComponents[pathComponents.length - 1];

      return {
        ...frontmatter,
        date: getDate(frontmatter.date),
        slug,
        url,
        path,
        author,
      };
    })
  );

  posts = posts
    .filter(({ draft }) => !draft)
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  return posts;
};

export default getAllPosts;
