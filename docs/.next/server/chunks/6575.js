"use strict";exports.id=6575,exports.ids=[6575,3473],exports.modules={93473:(t,e,i)=>{i.a(t,async(t,a)=>{try{i.r(e),i.d(e,{default:()=>u});var r=i(20997),o=i(25675),s=i.n(o),n=i(57518),m=i.n(n),l=i(85590),p=t([l]);l=(p.then?(await p)():p)[0];let d=m().div`
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
`,c=m().div`
  display: block;
  aspect-ratio: 1204/736;
`,g=m().div`
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
`,u=t=>{let{colorScheme:e="light"}=(0,l.useSite)();return(0,r.jsxs)(d,{...t,children:[r.jsx(c,{children:r.jsx(s(),{src:`/m1_laptop_hw_${e}_large_2x.jpg`,alt:"hardware image",width:"1204",height:"736"})}),r.jsx(g,{children:r.jsx(s(),{src:`/screen_macos_desktop_${e}_large_2x.jpg`,alt:"image",width:"984",height:"636"})})]})};a()}catch(t){a(t)}})},6575:(t,e,i)=>{i.a(t,async(t,a)=>{try{i.r(e),i.d(e,{default:()=>j});var r=i(20997),o=i(57518),s=i.n(o),n=i(25675),m=i.n(n),l=i(93473),p=i(85590),d=i(67689),c=t([l,p]);[l,p]=c.then?(await c)():c,o.keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;let g=o.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,u=o.keyframes`
  from {
    opacity: 0;
    transform: scale(0.75);
    filter: blur(32px);
  }
  to {
    opacity: 1;
    transform: scale(1);
    filter: blur(0);
  }
`,h=s().div`
  position: relative;
  animation: ${u} 500ms 750ms cubic-bezier(0.0, 0.0, 0.2, 1);
  animation-fill-mode: both;
  transform-origin: bottom center;
  margin-top: 6%;
  img {
    position: relative;
    width: 100%;
    height: auto;
  }
`,x=s().div`
  position: relative;
  max-width: 988px;
  margin: 0 auto;
  z-index: 1;
  @media ${d.mediaQueries.md} {
    width: 82%;
  }
`,k=s().div`
  backdrop-filter: blur(15px);
  position: absolute;
  top: 2.5%;
  right: 3%;
  bottom: 8%;
  left: 3%;
  border-radius: 1%;

`,f=o.css`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;

  @media ${d.mediaQueries.md} {
    width: 20vw;
    height: 20vw;
    filter: blur(10vw);
  }

  border-radius: 50%;
  background: #4F95FF;
  transform-origin: bottom center;
`,b=s().div`
  ${f}
  animation: ${g} 5000ms linear infinite;
  filter: blur(100px);
  &:before {
    content: "";
    display: block;
    ${f};
    background: #B120BD;
    top: 50%;
    left: auto;
    right: 50%;
  }
  &:after {
    content: "";
    display: block;
    ${f};
    background: #44CEE3;
    top: 50%;
    left: 50%;
  },
`,w=s()(b)`
  && {
    top: 0px;
    left: 100px;
    animationDuration: 4000ms;
  }
`,_=s()(b)`
  && {
    top: -100px;
    left: calc(50% - 100px);
    animation-duration: 6000ms;
    animation-direction: reverse;
  }
`,y=s()(b)`
  && {
    top: 0px;
    left: auto;
    right: 100px;
    animation-duration: 5000ms;
  }
`,v=s()(l.default)`
  margin-top: -45%;
  margin-left: -112px;
  margin-right: -112px;
  @media ${d.mediaQueries.md} {
    margin-top: -37%;
    margin-left: 0;
    margin-right: 0;
  }
`,j=({percentage:t})=>{let{colorScheme:e="light",breakpoint:i}=(0,p.useSite)(),a=(Math.min(Math.max(t-("xs"===i?.2:0),1),1.2)-1)*5;return(0,r.jsxs)(h,{children:[r.jsx(w,{}),r.jsx(_,{}),r.jsx(y,{}),(0,r.jsxs)(x,{style:{transform:`translateY(${12.5*a}%) scale(${1+(1-a)*.1})`},children:[r.jsx(k,{}),r.jsx(m(),{width:987.275,height:580.75,src:`/codeedit-window-${e}.png`,alt:"CodeEdit screenshot"})]}),r.jsx(v,{style:{opacity:a,transform:`translateY(-${15*a}%)  scale(${1+-((1-a)*.1)})`}})]})};a()}catch(t){a(t)}})}};