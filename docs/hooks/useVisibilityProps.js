import { useSite } from '@/components/common/Site';

const useVisibilityProps = (props) => {
  const {
    windowDimensions: { breakpoint },
  } = useSite();
  const { show, hide } = props;

  if (Object.hasOwnProperty.call(props, 'hide')) {
    if (hide === true) {
      return false;
    }
    if (typeof hide === 'string') {
      if (hide === breakpoint) {
        return false;
      }
    }
    if (Array.isArray(hide)) {
      if (hide.includes(breakpoint)) {
        return false;
      }
    } else if (typeof hide === 'object') {
      if (hide[breakpoint]) {
        return false;
      }
    }
  }

  if (Object.hasOwnProperty.call(props, 'show')) {
    if (!show) {
      return false;
    }
    if (typeof show === 'string') {
      if (show !== breakpoint) {
        return false;
      }
    }
    if (Array.isArray(show)) {
      if (!show.includes(breakpoint)) {
        return false;
      }
    } else if (typeof show === 'object') {
      if (!show[breakpoint]) {
        return false;
      }
    }
  }

  return true;
};

export default useVisibilityProps;
