import styled from 'styled-components';
import Typography from '@/components/common/Typography';
import { Row, Column, Section, Stack } from '@/components/common/layout';

const Box = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 1rem;
  margin-bottom: 0;
  background: #007fff;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;
  color: #fff;
  padding: 1rem;
`;

export default function DevPage() {
  return (
    <>
      <Section contained gutterY>
        <Row align="center">
          <Column width={{ md: 12, lg: 8 }}>
            <Stack gap>
              <Typography variant="headline-super" as="h1">
                Layout
              </Typography>
              <Typography variant="intro" color="secondary">
                A layout system based on the flex display property.
              </Typography>
            </Stack>
          </Column>
        </Row>
      </Section>
      <Section contained gutterBottom>
        <Row gap>
          <Column>
            <Typography variant="headline-reduced">Responsive</Typography>
          </Column>
        </Row>
        <Row gutterTop>
          <Column>
            <Typography variant="body" gutterBottom>
              All props can take values to make the layout completely
              responsive.
            </Typography>
          </Column>
        </Row>
        <Row gap={5} gutterTop>
          <Column width={{ sm: 12, md: 3, lg: 2, xl: 1 }}>
            <Box />
          </Column>
          <Column width={{ sm: 6, md: 6, lg: 8, xl: 10 }}>
            <Box />
          </Column>
          <Column width={{ sm: 6, md: 3, lg: 2, xl: 1 }}>
            <Box />
          </Column>
        </Row>
        <Row gap={5} gutterTop>
          <Column width={{ sm: 12, md: 3, lg: 2, xl: 1 }}>
            <Box />
          </Column>
          <Column width={{ sm: 12, md: 9, lg: 10, xl: 11 }}>
            <Box />
          </Column>
        </Row>
        <Row gap={5} gutterTop>
          <Column width={{ sm: 10, md: 6, lg: 8, xl: 10 }}>
            <Box />
          </Column>
          <Column width={{ sm: 2, md: 6, lg: 4, xl: 2 }}>
            <Box />
          </Column>
        </Row>
      </Section>
      <Section contained gutterBottom>
        <Row gap>
          <Column>
            <Typography variant="headline-reduced">Fluid</Typography>
          </Column>
        </Row>
        <Row gutterTop>
          <Column>
            <Typography variant="body" gutterBottom>
              Percent based widths allow fluid resizing of columns and rows.
            </Typography>
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={12}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={1}>
            <Box />
          </Column>
          <Column width={11}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={2}>
            <Box />
          </Column>
          <Column width={10}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={3}>
            <Box />
          </Column>
          <Column width={9}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={4}>
            <Box />
          </Column>
          <Column width={8}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={5}>
            <Box />
          </Column>
          <Column width={7}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={6}>
            <Box />
          </Column>
          <Column width={6}>
            <Box />
          </Column>
        </Row>
      </Section>

      <Section contained gutterBottom>
        <Row gap>
          <Column>
            <Typography variant="headline-reduced">Offsets</Typography>
          </Column>
        </Row>
        <Row gutterTop>
          <Column>
            <Typography variant="body" gutterBottom>
              Offset a column.
            </Typography>
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={1} offset={11}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={2} offset={10}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={3} offset={9}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={4} offset={8}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={5} offset={7}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={6} offset={6}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={7} offset={5}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={8} offset={4}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={9} offset={3}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={10} offset={2}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column width={11} offset={1}>
            <Box />
          </Column>
        </Row>
      </Section>

      <Section contained gutterBottom>
        <Row gap>
          <Column>
            <Typography variant="headline-reduced">Auto Width</Typography>
          </Column>
        </Row>
        <Row gutterTop>
          <Column>
            <Typography variant="body" gutterBottom>
              Add any number of auto sizing columns to a row. Let the grid
              figure it out.
            </Typography>
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column>
            <Box />
          </Column>
          <Column>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop>
          <Column>
            <Box />
          </Column>
          <Column>
            <Box />
          </Column>
          <Column>
            <Box />
          </Column>
        </Row>
      </Section>

      <Section contained>
        <Row gap>
          <Column>
            <Typography variant="headline-reduced">Align</Typography>
          </Column>
        </Row>
        <Row gutterTop>
          <Column>
            <Typography variant="body" gutterBottom>
              Add props to align elements to the start or end of a row as well
              as the top, bottom, or center of a column
            </Typography>
          </Column>
        </Row>
        <Row gap gutterTop align="start">
          <Column width={6}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop align="center">
          <Column width={6}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop align="end">
          <Column width={6}>
            <Box />
          </Column>
        </Row>
      </Section>

      <Section contained gutterBottom>
        <Row gap>
          <Column>
            <Typography variant="headline-reduced">Distribute</Typography>
          </Column>
        </Row>
        <Row gutterTop>
          <Column>
            <Typography variant="body" gutterBottom>
              Add props to align elements to the start or end of a row as well
              as the top, bottom, or center of a column
            </Typography>
          </Column>
        </Row>
        <Row gap gutterTop distribute="around">
          <Column width={2}>
            <Box />
          </Column>
          <Column width={2}>
            <Box />
          </Column>
          <Column width={2}>
            <Box />
          </Column>
        </Row>
        <Row gap gutterTop distribute="between">
          <Column width={2}>
            <Box />
          </Column>
          <Column width={2}>
            <Box />
          </Column>
          <Column width={2}>
            <Box />
          </Column>
        </Row>
      </Section>
    </>
  );
}
