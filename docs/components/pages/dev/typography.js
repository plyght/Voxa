import { Section } from '@/components/common/layout';
import Typography from '@/components/common/Typography';

const typographyVariants = [
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
];

export default function DevPage() {
  const message = 'The quick brown fox jumped over the lazy dog.';

  return (
    <>
      {typographyVariants.map((variant, i) => (
        <Section contained gutterTop={i === 0} gutterBottom key={variant}>
          <pre style={{ marginBottom: 12, opacity: 0.5 }}>{variant}</pre>
          <Typography variant={variant}>{message}</Typography>
        </Section>
      ))}
    </>
  );
}
