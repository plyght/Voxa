import { Sliders } from 'react-feather';
import Tile from '@/components/common/Tile';
import Typography from '@/components/common/Typography';
import { Grid, GridItem, Section, Stack } from '@/components/common/layout';

const WhyUsSection = () => {
  return (
    <Section contained gutterBottom>
      <Stack style={{ textAlign: 'center', marginBottom: 48 }}>
        <Typography variant="headline-reduced">Why CodeEdit?</Typography>
        <Typography variant="intro" gutterTop>
          This is a description of the why CodeEdit section.
        </Typography>
      </Stack>
      <Grid columns={{ xs: 1, md: 2, lg: 3 }} gap>
        <GridItem
          as={Tile}
          color="blue"
          gradient
          width={{ xs: 1, md: 2, lg: 3 }}
          data-color-scheme="dark"
        >
          <Stack gap={2}>
            <Sliders />
            <Typography variant="eyebrow">Feature Title 1</Typography>
            <Typography variant="body">
              This is a description for this feature.
            </Typography>
          </Stack>
        </GridItem>
        <GridItem as={Tile}>
          <Stack gap={2}>
            <Sliders />
            <Typography variant="eyebrow">Feature Title 2</Typography>
            <Typography variant="body">
              This is a description for this feature.
            </Typography>
          </Stack>
        </GridItem>
        <GridItem as={Tile} height={{ md: 2, lg: 1 }}>
          <Stack gap={2}>
            <Sliders />
            <Typography variant="eyebrow">Feature Title 3</Typography>
            <Typography variant="body">
              This is a description for this feature.
            </Typography>
          </Stack>
        </GridItem>
        <GridItem as={Tile}>
          <Stack gap={2}>
            <Sliders />
            <Typography variant="eyebrow">Feature Title 4</Typography>
            <Typography variant="body">
              This is a description for this feature.
            </Typography>
          </Stack>
        </GridItem>
      </Grid>
    </Section>
  );
}

export default WhyUsSection;
