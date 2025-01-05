export const breakpoints = {
  xs: 500,
  sm: 767,
  md: 1068,
  lg: 1440,
  xl: 9999,
};

export const getBreakpoint = (width) => {
  const { xs, sm, md, lg } = breakpoints;

  if (width <= xs) {
    return 'xs';
  }
  if (width > xs && width <= sm) {
    return 'sm';
  }
  if (width > sm && width <= md) {
    return 'md';
  }
  if (width > md && width <= lg) {
    return 'lg';
  }
  if (width > lg) {
    return 'xl';
  }
};

export const mediaQueries = {
  // small phones
  xs: `only screen and (max-width: ${breakpoints.xs}px)`,
  // most phones
  sm: `only screen and (max-width: ${breakpoints.sm}px)`,
  // tablets
  md: `only screen and (max-width: ${breakpoints.md}px)`,
  // large tablets and small desktops
  lg: `only screen and (max-width: ${breakpoints.lg}px)`,
  // large desktops
  xl: `only screen and (min-width: ${breakpoints.lg + 1}px)`,
};

////////////////////////////////////
// ... xs | sm | md | lg | xl ... //
// ============================== //
// min  xs : 0 - Infinity         //
// ...------------------------... //
// only xs : 0 - 499              //
// ...----|                       //
// max  xs : 0 - 499              //
// ...----|                       //
// min  sm : 500 - Infinity       //
//        |-------------------... //
// only sm : 500 - 733            //
//        |----|                  //
// max  sm : 0 - 734              //
// ...---------|                  //
// min  md : 734 - Infinity       //
//             |--------------... //
// only md : 734 - 1068           //
//             |----|             //
// max  md : 0 - 1068             //
// ...--------------|             //
// min  lg : 0 - 1440             //
// ...-------------------|        //
// only lg : 0 - 1440             //
//                  |----|        //
// max  lg : 0 - 1440             //
// ...-------------------|        //
// min  xl : 1441 - Infinity      //
//                       |----... //
// only xl : 1441 - Infinity      //
//                       |----... //
// max  xl : 0 - Infinity         //
// ...------------------------... //
////////////////////////////////////
