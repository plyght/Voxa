import Image from 'next/image';
import styled from 'styled-components';
import { useSite } from '@/components/common/Site';

const HardwareLockupWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  aspect-ratio: 1204/736;
  width: auto;
  @supports ((-webkit-mask-image:url("")) or (mask-image:url(""))) {
    mask-size: contain;
    /* mask-position: center; */
    mask-repeat: no-repeat;
    mask-image: url(/m1_laptop_hw_shape_mask_large.png);
  }
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 1.5dppx) {
    @supports ((-webkit-mask-image:url("")) or (mask-image:url(""))) {
        mask-image: url(/m1_laptop_hw_shape_mask_large_2x.png);
    }
  }
`
const HardwareImage = styled.div`
  display: block;
  aspect-ratio: 1204/736;
`
const HardwareLockupMedia = styled.div`
  display: block;
  aspect-ratio: 984/636;
  position: absolute;
  top: 2.3%;
  left: 9.3%;
  right: 9.3%;
  @supports ((-webkit-mask-image:url("")) or (mask-image:url(""))) {
    mask-size: contain;
    /* mask-position: center; */
    mask-repeat: no-repeat;
    mask-image: url(/m1_laptop_hw_mask_large.png);
  }
  @media (-webkit-min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (min-resolution: 1.5dppx) {
    @supports ((-webkit-mask-image:url("")) or (mask-image:url(""))) {
        mask-image: url(/m1_laptop_hw_mask_large_2x.png);
    }
  }
`

const HardwareLockup = (props) => {
  const { colorScheme = "light" } = useSite();

  return (
    <HardwareLockupWrap {...props}>
      <HardwareImage>
        <Image src={`/m1_laptop_hw_${colorScheme}_large_2x.jpg`} alt="hardware image" width="1204" height="736" />
      </HardwareImage>
      <HardwareLockupMedia>
        <Image src={`/screen_macos_desktop_${colorScheme}_large_2x.jpg`} alt="image" width="984" height="636" />
      </HardwareLockupMedia>
    </HardwareLockupWrap>
  )
}

export default HardwareLockup;

