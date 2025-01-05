import { fetchWithCache } from '@/utils/fetchData';
import getMinimumSystemVersion from '@/utils/getMinimumSystemVersion';

export { default } from '@/components/pages/home';

export async function getStaticProps() {
  const data = await fetchWithCache(
    'latestRelease',
    'https://api.github.com/repos/CodeEditApp/CodeEdit/releases/latest'
  );

  return {
    props: {
      versionNumber: data.tag_name,
      minimumSystemVersion: getMinimumSystemVersion(data.body),
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}
