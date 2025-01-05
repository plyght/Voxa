"use strict";exports.id=5594,exports.ids=[5594,3473,6575],exports.modules={93473:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>g});var r=i(20997),o=i(25675),n=i.n(o),s=i(57518),l=i.n(s),d=i(85590),m=e([d]);d=(m.then?(await m)():m)[0];let p=l().div`
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
`,c=l().div`
  display: block;
  aspect-ratio: 1204/736;
`,u=l().div`
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
`,g=e=>{let{colorScheme:t="light"}=(0,d.useSite)();return(0,r.jsxs)(p,{...e,children:[r.jsx(c,{children:r.jsx(n(),{src:`/m1_laptop_hw_${t}_large_2x.jpg`,alt:"hardware image",width:"1204",height:"736"})}),r.jsx(u,{children:r.jsx(n(),{src:`/screen_macos_desktop_${t}_large_2x.jpg`,alt:"image",width:"984",height:"636"})})]})};a()}catch(e){a(e)}})},6575:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>_});var r=i(20997),o=i(57518),n=i.n(o),s=i(25675),l=i.n(s),d=i(93473),m=i(85590),p=i(67689),c=e([d,m]);[d,m]=c.then?(await c)():c,o.keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;let u=o.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,g=o.keyframes`
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
`,h=n().div`
  position: relative;
  animation: ${g} 500ms 750ms cubic-bezier(0.0, 0.0, 0.2, 1);
  animation-fill-mode: both;
  transform-origin: bottom center;
  margin-top: 6%;
  img {
    position: relative;
    width: 100%;
    height: auto;
  }
`,x=n().div`
  position: relative;
  max-width: 988px;
  margin: 0 auto;
  z-index: 1;
  @media ${p.mediaQueries.md} {
    width: 82%;
  }
`,f=n().div`
  backdrop-filter: blur(15px);
  position: absolute;
  top: 2.5%;
  right: 3%;
  bottom: 8%;
  left: 3%;
  border-radius: 1%;

`,k=o.css`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;

  @media ${p.mediaQueries.md} {
    width: 20vw;
    height: 20vw;
    filter: blur(10vw);
  }

  border-radius: 50%;
  background: #4F95FF;
  transform-origin: bottom center;
`,w=n().div`
  ${k}
  animation: ${u} 5000ms linear infinite;
  filter: blur(100px);
  &:before {
    content: "";
    display: block;
    ${k};
    background: #B120BD;
    top: 50%;
    left: auto;
    right: 50%;
  }
  &:after {
    content: "";
    display: block;
    ${k};
    background: #44CEE3;
    top: 50%;
    left: 50%;
  },
`,b=n()(w)`
  && {
    top: 0px;
    left: 100px;
    animationDuration: 4000ms;
  }
`,y=n()(w)`
  && {
    top: -100px;
    left: calc(50% - 100px);
    animation-duration: 6000ms;
    animation-direction: reverse;
  }
`,v=n()(w)`
  && {
    top: 0px;
    left: auto;
    right: 100px;
    animation-duration: 5000ms;
  }
`,j=n()(d.default)`
  margin-top: -45%;
  margin-left: -112px;
  margin-right: -112px;
  @media ${p.mediaQueries.md} {
    margin-top: -37%;
    margin-left: 0;
    margin-right: 0;
  }
`,_=({percentage:e})=>{let{colorScheme:t="light",breakpoint:i}=(0,m.useSite)(),a=(Math.min(Math.max(e-("xs"===i?.2:0),1),1.2)-1)*5;return(0,r.jsxs)(h,{children:[r.jsx(b,{}),r.jsx(y,{}),r.jsx(v,{}),(0,r.jsxs)(x,{style:{transform:`translateY(${12.5*a}%) scale(${1+(1-a)*.1})`},children:[r.jsx(f,{}),r.jsx(l(),{width:987.275,height:580.75,src:`/codeedit-window-${t}.png`,alt:"CodeEdit screenshot"})]}),r.jsx(j,{style:{opacity:a,transform:`translateY(-${15*a}%)  scale(${1+-((1-a)*.1)})`}})]})};a()}catch(e){a(e)}})},25594:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>f});var r=i(20997),o=i(25675),n=i.n(o),s=i(57518),l=i.n(s),d=i(55236),m=i(94307),p=i(28706),c=i(91972),u=i(6575),g=i(11163),h=e([p,u]);[p,u]=h.then?(await h)():h;let x=l().div`
  width: 128px;
  margin-left: auto;
  margin-right: auto;
`,f=({versionNumber:e,minimumSystemVersion:t})=>{let i=(0,g.useRouter)();return r.jsx(d.Parallax,{style:{overflow:"visible"},renderLayer:a=>(0,r.jsxs)(p.Section,{contained:!0,gutterTop:!0,children:[r.jsx(p.Row,{align:"center",style:{position:"relative",zIndex:1},children:r.jsx(p.Column,{width:{md:12,lg:12},children:(0,r.jsxs)(p.Stack,{gap:2,align:"center",children:[r.jsx(x,{children:r.jsx(n(),{width:128,height:128,src:"/product-icon.png",alt:"CodeEdit product icon"})}),r.jsx(m.default,{variant:"headline-elevated",children:"A modern Discord client for macOS, built with SwiftUI. Fully Open Source."}),r.jsx(m.default,{variant:"intro-elevated",color:"tertiary",gutterBottom:!0,children:"Voxa is a sleek, lightweight, and native macOS Discord client built using SwiftUI. Designed for speed, efficiency, and a modern user experience, it brings the best of Discord to your Mac in a fully optimized package."}),r.jsx(c.default,{size:"lg",onClick:()=>i.push("/download"),children:"Download"}),(0,r.jsxs)(m.default,{variant:"body-reduced",color:"tertiary",children:[e," | macOS ",t?`${t.split(".")[0]}+`:""]})]})})}),r.jsx(p.Row,{align:"center",children:r.jsx(p.Column,{children:r.jsx(u.default,{percentage:a})})})]})})};a()}catch(e){a(e)}})}};