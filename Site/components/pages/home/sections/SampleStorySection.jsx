import styled from 'styled-components';
import { Sliders } from 'react-feather';
import Tile from '@/components/common/Tile';
import Typography from '@/components/common/Typography';
import { Grid, GridItem, Section, Stack, Row, Column } from '@/components/common/layout';
import getSpacing from '../../../../styles/spacing';
import Image from 'next/image';

const SectionIntro = styled(Row)`
  margin-top: ${getSpacing(16)};
  margin-bottom: ${getSpacing(10)};
`;
const SectionHeader = styled.header`
  padding: 0 ${getSpacing(5)};
`;
const SectionFeature = styled(Stack)`
  margin-top: ${getSpacing(8)};
`;
const ImageWrap = styled.div`
  aspect-ratio: 1391/702;
  position: relative;
  margin: 0 -40px -40px -40px;
  background: url(/window-dark-cropped.png) top left no-repeat;
  background-size: 1391px 702px;
`;

const WhyUsSection = () => {
  return (
    <Section contained="lg" gutterTop gutterBottom={20} style={{ background: 'var(--fill-tertiary-alt)' }}>
      <SectionIntro>
        <Column width={7}>
          <SectionHeader>
            <Typography variant="headline-elevated">
              Designed to help your&nbsp;work&nbsp;flow.
            </Typography>
            <Typography variant="intro-elevated" gutterTop>
              The world’s fastest editor has a completely reimagined design, making CodeEdit more immersive and customizable than ever. And with a streamlined user interface, you’ve got new tools for keeping track of what’s important — and for clearing some headspace when you need it most.
            </Typography>
          </SectionHeader>
        </Column>
      </SectionIntro>
      <SectionFeature gap={4} style={{ '--section-accent-color': 'var(--tomato)'}}>
        <SectionHeader>
          <Typography variant="headline" style={{ color: 'var(--section-accent-color)' }}>Navigator</Typography>
        </SectionHeader>
        <Grid columns={{ xs: 4, md: 6, lg: 8, xl: 12 }} gap>
          <GridItem
            as={Tile}
            width={{ xs: 4, md: 6, lg: 8, xl: 12 }}
            headline="Compact tab bar"
            copy="The compact tab bar option takes up less space on the page and takes on the color of the site you’re on, extending the web page to the edge of the window. Tabs have been combined with the Smart Search field, giving you access to powerful Safari features with the click of a tab."
            overlayCopy="The future of Mac isn’t just bright — it’s intelligent. Shortcuts build on the capabilities of the Automator app. Now you can modernize and convert your existing Automator workflows into shortcuts."
            violator="Coming Soon"
          >
            <ImageWrap />
          </GridItem>
          <GridItem 
            as={Tile} 
            width={6}
            headline="Tab Groups"
            copy="Save and organize your tabs in the way that works best for you. Name your Tab Groups, edit them, and switch between them as you go from one interest to the next. You can even drag your groups into an email and the links effortlessly appear as an easy‑to‑share list."
          />
          <GridItem 
            as={Tile} 
            width={6}
            headline="Access Tab Groups anywhere"
            copy="Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."
          />
        </Grid>        
      </SectionFeature>
      <SectionFeature gap={4}>
        <SectionHeader>
          <Typography variant="headline" style={{ color: 'var(--section-accent-color)' }}>Inspector</Typography>
        </SectionHeader>
        <Grid columns={{ xs: 4, md: 6, lg: 8, xl: 12 }} gap>
          <GridItem
            as={Tile}
            width={{ xs: 4, md: 6, lg: 8, xl: 12 }}
            headline="Compact tab bar"
            copy="The compact tab bar option takes up less space on the page and takes on the color of the site you’re on, extending the web page to the edge of the window. Tabs have been combined with the Smart Search field, giving you access to powerful Safari features with the click of a tab."
            overlayCopy="The future of Mac isn’t just bright — it’s intelligent. Shortcuts build on the capabilities of the Automator app. Now you can modernize and convert your existing Automator workflows into shortcuts."
            violator="Coming Soon"
          >
            <ImageWrap />
          </GridItem>
          <GridItem 
            as={Tile} 
            width={4}
            headline="Tab Groups"
            copy="Save and organize your tabs in the way that works best for you. Name your Tab Groups, edit them, and switch between them as you go from one interest to the next. You can even drag your groups into an email and the links effortlessly appear as an easy‑to‑share list."
            color="blue"
            gradient
          />
          <GridItem 
            as={Tile} 
            width={4}
            headline="Access Tab Groups anywhere"
            copy="Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."
          />
          <GridItem 
            as={Tile} 
            width={4}
            headline="Access Tab Groups anywhere"
            copy="Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."
          />
        </Grid>        
      </SectionFeature>
      
    </Section>
  );
}

export default WhyUsSection;
