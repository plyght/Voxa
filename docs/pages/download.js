import { fetchWithCache } from '@/utils/fetchData';

export { default } from '@/components/pages/download';

export async function getStaticProps() {
  const data = await fetchWithCache(
    'latestRelease',
    'https://api.github.com/repos/CodeEditApp/CodeEdit/releases/latest'
  );
  const appAsset = data.assets?.filter((asset) =>
    /^CodeEdit.*\.dmg$/.test(asset.name)
  )?.[0];

  return {
    props: {
      versionNumber: data.tag_name,
      downloadUrl: appAsset.browser_download_url,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
}
