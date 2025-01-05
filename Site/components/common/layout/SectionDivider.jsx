import Section from "./Section"
import styled from 'styled-components';

const Divider = styled.hr`
  margin: 0;
  border: 0;
  border-bottom: 1px solid var(--separator-color);
`;

const SectionDivider = (props) => {
  return (
    <Section {...props}>
      <Divider />
    </Section>
  );
}

export default SectionDivider;
