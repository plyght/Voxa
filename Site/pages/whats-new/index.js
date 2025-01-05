export { default } from '@/components/pages/whats-new';
import { fetchWithCache } from '@/utils/fetchData';

export async function getStaticProps() {
  const data = await fetchWithCache(
    'releases',
    'https://api.github.com/repos/CodeEditApp/CodeEdit/releases'
  );

  return {
    props: {
      releases: data,
    },
  };
}
