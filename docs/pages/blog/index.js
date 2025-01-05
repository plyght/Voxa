import getAllPosts from '@/utils/getAllPosts';

export { default } from '@/components/pages/blog';

export async function getStaticProps() {
  const config = await import(`../../data/config.json`);

  const posts = await getAllPosts();

  return {
    props: {
      siteTitle: config.title,
      posts,
    },
  };
}
