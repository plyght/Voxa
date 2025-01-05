import Tile from '@/components/common/Tile';
import Typography from '@/components/common/Typography';
import {
  Grid,
  GridItem,
  Row,
  Column,
  Section,
  Stack,
  Container,
} from '@/components/common/layout';

export default function GridPage() {
  return (
    <>
      <Section contained gutterY>
        <Row align="center">
          <Column width={{ md: 12, lg: 8 }}>
            <Stack gap>
              <Typography variant="headline-super" as="h1">
                Grid
              </Typography>
              <Typography variant="intro" color="secondary">
                A grid system based on the CSS grid display property.
              </Typography>
            </Stack>
          </Column>
        </Row>
      </Section>
      <Section contained gutterBottom>
        <Grid
          columns={{ xs: 1, sm: 2, lg: 3 }}
          rowHeight={{ sm: '16px', lg: '32px' }}
          gap={2}
        >
          <GridItem as={Tile} height={8} />
          <GridItem as={Tile} height={6} />
          <GridItem as={Tile} height={8} />
          <GridItem as={Tile} height={11} />
          <GridItem as={Tile} height={12} />
          <GridItem as={Tile} height={12} />
          <GridItem as={Tile} height={{ sm: 5, lg: 3 }} />
          <GridItem as={Tile} width={{ xs: 1, sm: 2, lg: 3 }} height={10} />
          <GridItem as={Tile} width={{ xs: 1, lg: 2 }} height={6} />
          <GridItem as={Tile} height={{ sm: 14, lg: 13 }} />
          <GridItem as={Tile} height={7} />
          <GridItem as={Tile} height={7} />
          <GridItem as={Tile} width={{ xs: 1, sm: 2, lg: 3 }} height={10} />
        </Grid>
      </Section>
      <Section gutterBottom={3}>
        <Container>
          <Typography variant="headline-reduced">Offsets</Typography>
          <Typography variant="body" gutterTop gutterBottom>
            Offset a column.
          </Typography>
        </Container>
        <Grid columns={{ xs: 4, sm: 6, lg: 8, xl: 12 }} gap={3}>
          <GridItem
            as={Tile}
            width={{ xs: 4, sm: 6, lg: 8, xl: 12 }}
            style={{ height: 300 }}
          />
          <GridItem
            as={Tile}
            width={{ xs: 4, sm: 3, lg: 4, xl: 4 }}
            style={{ height: 300 }}
          />
          <GridItem
            as={Tile}
            width={{ xs: 4, sm: 3, lg: 4, xl: 8 }}
            style={{ height: 300 }}
          />
        </Grid>
      </Section>
    </>
  );
}
