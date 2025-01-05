export { default } from '@/components/pages/whats-new/RawRelease'
import { fetchWithCache } from '@/utils/fetchData';

export async function getStaticProps({ params }) {
  const { tag } = params;
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/CodeEditApp/CodeEdit/releases'
  );

  return {
    props: {
      release: data.find((release) => release.tag_name === tag) || null,
    },
  };
}

export async function getStaticPaths() {
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/CodeEditApp/CodeEdit/releases'
  );
  const paths = data.map((release) => ({ params: { tag: release.tag_name } }));

  return {
    paths,
    fallback: false,
  };
}
