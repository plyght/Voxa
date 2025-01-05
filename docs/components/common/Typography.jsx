import PropTypes from 'prop-types';
import styled from 'styled-components';
import getTypographyStyles from '@/styles/getTypographyStyles';

const TypographyWrap = styled.p`
  ${({ variant }) => getTypographyStyles(variant)}
  ${({ gutter, gutterTop }) => gutter || gutterTop ? `
    margin-top: 1em;
  ` : ``}
  ${({ gutter, gutterBottom }) => gutter || gutterBottom ? `
    margin-bottom: 1em;
  ` : ``}
  ${({ color = "primary" }) => color ? `
    color: var(--label-${color}-color);
  ` : ``}
`;

const secondaryVariants = ['body', 'body-tight', 'body-reduced', 'body-reduced-tight'];

function Typography({ children, variant = "body", color, as, ...props }) {
  let elementType = 'p';

  let variantColor = secondaryVariants.includes(variant) ? 'secondary' : undefined;

  return (
    <TypographyWrap variant={variant} color={color ?? variantColor} as={as ?? elementType} {...props}>
      {children}
    </TypographyWrap>
  );
}

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'headline-standalone',
    'headline-super',
    'headline-elevated',
    'headline',
    'headline-reduced',
    'eyebrow-super',
    'eyebrow-elevated',
    'eyebrow',
    'eyebrow-reduced',
    'intro-elevated',
    'intro',
    'section-head',
    'quote',
    'quote-reduced',
    'callout',
    'manifesto',
    'label',
    'tout',
    'body',
    'body-tight',
    'body-reduced',
    'body-reduced-tight',
    'caption',
    'sosumi',
    'headline-body',
    'headline-body-reduced',
  ]),
};

export default Typography;
