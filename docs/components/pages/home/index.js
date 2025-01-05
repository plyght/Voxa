import Ribbon from '@/components/common/Ribbon';
import { SectionDivider } from '@/components/common/layout';

import HeroSection from './sections/HeroSection';
import SocialSection from '../../common/SocialSection';
import IntroFeaturesSection from './sections/IntroFeaturesSection';
import WhyUsSection from './sections/WhyUsSection';
import MoreFeaturesSection from './sections/MoreFeaturesSection';
import FeaturesSection from './sections/FeaturesSection';
import CtaSection from './sections/CtaSection';

import SampleStorySection from './sections/SampleStorySection';
import config from '@/data/config';
import Head from 'next/head';

export default function HomePage(props) {
  return (
    <>
      <Ribbon onClick={() => window.open(config.links.githubProject)}>
        CodeEdit is currently in development. Check out the roadmap.
      </Ribbon>
      <HeroSection {...props} />
      <IntroFeaturesSection />
      {/* <SampleStorySection /> */}
      {/* <SampleStorySection /> */}
      {/* <WhyUsSection />
      <FeaturesSection />
      <MoreFeaturesSection />
      <SectionDivider contained /> */}
      {/* <SocialSection /> */}
      {/* <CtaSection /> */}
    </>
  );
}
