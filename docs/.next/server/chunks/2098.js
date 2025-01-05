"use strict";exports.id=2098,exports.ids=[2098,4e3,1614,3473,6575,8587,2325,5594,4007,4192,6344,6279],exports.modules={64e3:(e,t,i)=>{i.r(t),i.d(t,{default:()=>h});var a=i(20997);i(16689);var r=i(57518),o=i.n(r);let n=r.keyframes`
  0% {
      transform: translateY(-100%);
  }
  100% {
      transform: translateY(0);
  }
`,s=o().div`
  --ribbon-background-color: #0071e3;
  --ribbon-text-color: #fff;
  --ribbon-link-color: #fff;
  --ribbon-focus-color: rgba(255,255,255,0.6);
  overflow: hidden;
  ${({onClick:e})=>e?"cursor: pointer;":""}
`,l=o().div`
  animation: ${n} 0.8s cubic-bezier(0.42, 0, 0.58, 1) forwards;
`,d=o().div`
  background-color: var(--ribbon-background-color);
  padding-top: 0.94118em;
  padding-bottom: 0.94118em;
  text-align: center;
`,c=o().div`
  color: var(--ribbon-text-color);
  font-size: 14px;
  line-height: 1.42859;
  font-weight: 400;
  letter-spacing: -.016em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`,h=function({children:e,onClick:t,...i}){return a.jsx(s,{onClick:t,...i,children:a.jsx(l,{children:a.jsx(d,{children:a.jsx(c,{children:e})})})})}},21614:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{TileViolator:()=>g,default:()=>z});var r=i(20997),o=i(16689),n=i(57518),s=i.n(n),l=i(46555),d=i(94307),c=e([l]);l=(c.then?(await c)():c)[0];let h=s().div`
    --tile-background-color: var(--background-tertiary-color);
    --tile-overlay-background-color: var(--section-accent-color ,#86868b);
    --tile-overlay-copy-max-width: 550px;

    position: relative;
    /* padding: 22px; */
    background-color: var(--background-tertiary-color);
    /* border-radius: 18px; */
    border-radius: 30px;
    overflow: hidden;

    ${({color:e})=>"blue"===e?`
      background-image: radial-gradient(circle at 90% 0%,#239AF2 0%,#3F4CC8 100%);
      // background: linear-gradient(114.88deg,#3cd0ff,#0b0050),linear-gradient(107.56deg,#000e16,#0c21e0 48.44%,#05d2ff);
    `:""}
    ${({color:e})=>"deep-purple"===e?`
      background: linear-gradient(to bottom right,#0D1387,#867AF6);
    `:""}
    ${({color:e})=>"purple"===e?`
      background: #dd41b7;
      background: linear-gradient(137deg,#dd41b7,#5717a6);
    `:""}
    ${({color:e})=>"pink"===e?`
      background: #dd41b7;
      background-image: radial-gradient(circle at 0% -25%,#FF7948 0%,#FF8355 0,#DA2C84 42%,#3E13A4 110%);
    `:""}

    &[data-color-scheme="dark"] {
      color: white;
    }

    ol+*, p+*, ul+* {
      margin-top: 0.8em;
    }
`,u=s().div`
  padding: 40px;
`,p=s().div`
  margin-top: -4px;
  max-width: 655px;
`,x=s()(d.default).attrs({as:"h4"})`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: .011em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${({overlay:e})=>e?"":"color: var(--section-accent-color);"}
`,f=s()(d.default)`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${x} + & {
      margin-top: 0.3em;
    }
`,g=s().div`
  box-sizing: border-box;
  white-space: nowrap;
  display: inline-block;
  background: transparent;
  border: 1px solid #bf4800;
  color: #bf4800;
  font-size: 17px;
  line-height: 1.1764805882;
  font-weight: 400;
  letter-spacing: -0.022em;
  font-family: SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
  border-radius: 18px;
  padding: 7px 18px;

  // reduced
  font-size: 12px;
  line-height: 1.3333733333;
  font-weight: 400;
  letter-spacing: -0.01em;
  font-family: SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
  border-radius: 12px;
  padding: 3px 11px;

  // tile violator
  background: transparent;
  /* border-color: #6e6e73;
  color: #6e6e73; */

`,m=s().div`

`,y=s().input`
  display: none;
`,b=s().div`
    z-index: 10;
`,j=s().label`
  -webkit-tap-highlight-color: transparent;
  z-index: 3;
  width: 44px;
  height: 44px;
  bottom: 24px;
  right: 24px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
`,v=s().span`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: background-color 100ms linear;
  z-index: 2;
  background-color: #86868b;
  color: var(--tile-background-color);
  opacity: .92;
  transition: background-color .66s cubic-bezier(0.66,0,0.01,1) .66s,color .66s cubic-bezier(0.66,0,0.01,1) .66s,transform .66s cubic-bezier(0.66,0,0.2,1),opacity 100ms linear;
  background-color: #6e6e73; //dark
  will-change: transform;
  svg {
    fill: currentColor;
    width: 50%;
    height: 50%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  ${y}:checked ~ ${b} & {
    color: var(--tile-overlay-background-color);
    background-color: #fff;
    transform: rotate(45deg);
    transition-delay: 0s;
  }
`,w=s().span`
    position: absolute;
    width: 100%;
    height: 100%;
`,k=s().span`
    position: absolute;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
`,S=s().div`
  background-color: var(--tile-overlay-background-color);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  padding: var(--tile-padding-top) var(--tile-padding-right) var(--tile-padding-bottom) var(--tile-padding-left);
  padding: 40px;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity .66s cubic-bezier(0.66,0,0.01,1) .66s,visibility 0s linear 1.32s;
  border-radius: 30px;
  
  ${y}:checked ~ ${b} & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
`,T=s().div`
  margin-top: -4px;
  max-width: 655px;
  & ${x} {
    color: #fff;
  }
`,G=s().div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    align-items: center;
`,F=s().div`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;

    color: #fff;

    max-width: var(--tile-overlay-copy-max-width);
    opacity: 0;
    transform: translateY(-20px);
    transition: all .66s cubic-bezier(0.66,0,0.2,1);

    ${y}:checked ~ ${b} & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: .66s; 
    }
`,z=({children:e,headline:t,copy:i,overlay:a,violator:n,overlayCopy:s,...d})=>{let c={};d.color&&(c["data-color-scheme"]="dark");let z=(0,o.useMemo)(()=>(0,l.v4)(),[]);return(0,r.jsxs)(h,{...c,...d,children:[(0,r.jsxs)(u,{children:[(t||i||n)&&(0,r.jsxs)(p,{children:[t&&r.jsx(x,{children:t}),i&&r.jsx(f,{children:i}),n&&r.jsx(g,{children:n})]}),r.jsx(m,{children:e})]}),(a||s)&&(0,r.jsxs)(r.Fragment,{children:[r.jsx(y,{type:"checkbox",id:`tile-overlay-toggle-${z}`}),(0,r.jsxs)(b,{children:[(0,r.jsxs)(j,{for:`tile-overlay-toggle-${z}`,children:[r.jsx(v,{children:r.jsx("svg",{className:"tile-icon-alt",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:r.jsx("path",{d:"M18.5,8.51h-7v-7A1.5,1.5,0,0,0,10,0h0A1.5,1.5,0,0,0,8.5,1.5v7h-7a1.5,1.5,0,0,0,0,3h7v7A1.5,1.5,0,0,0,10,20h0a1.5,1.5,0,0,0,1.5-1.5v-7h7a1.5,1.5,0,0,0,0-3Z"})})}),r.jsx(w,{role:"button","aria-expanded":"false","aria-controls":"content-toggle-shortcuts-app",children:r.jsx(k,{children:"Learn more"})})]}),(0,r.jsxs)(S,{children:[r.jsx(T,{children:r.jsx(x,{overlay:!0,children:t})}),(0,r.jsxs)(G,{children:[s&&r.jsx(F,{children:s}),"function"==typeof a?a():a]})]})]})]})]})};a()}catch(e){a(e)}})},93473:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>x});var r=i(20997),o=i(25675),n=i.n(o),s=i(57518),l=i.n(s),d=i(85590),c=e([d]);d=(c.then?(await c)():c)[0];let h=l().div`
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
`,u=l().div`
  display: block;
  aspect-ratio: 1204/736;
`,p=l().div`
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
`,x=e=>{let{colorScheme:t="light"}=(0,d.useSite)();return(0,r.jsxs)(h,{...e,children:[r.jsx(u,{children:r.jsx(n(),{src:`/m1_laptop_hw_${t}_large_2x.jpg`,alt:"hardware image",width:"1204",height:"736"})}),r.jsx(p,{children:r.jsx(n(),{src:`/screen_macos_desktop_${t}_large_2x.jpg`,alt:"image",width:"984",height:"636"})})]})};a()}catch(e){a(e)}})},6575:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>S});var r=i(20997),o=i(57518),n=i.n(o),s=i(25675),l=i.n(s),d=i(93473),c=i(85590),h=i(67689),u=e([d,c]);[d,c]=u.then?(await u)():u,o.keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;let p=o.keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,x=o.keyframes`
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
`,f=n().div`
  position: relative;
  animation: ${x} 500ms 750ms cubic-bezier(0.0, 0.0, 0.2, 1);
  animation-fill-mode: both;
  transform-origin: bottom center;
  margin-top: 6%;
  img {
    position: relative;
    width: 100%;
    height: auto;
  }
`,g=n().div`
  position: relative;
  max-width: 988px;
  margin: 0 auto;
  z-index: 1;
  @media ${h.mediaQueries.md} {
    width: 82%;
  }
`,m=n().div`
  backdrop-filter: blur(15px);
  position: absolute;
  top: 2.5%;
  right: 3%;
  bottom: 8%;
  left: 3%;
  border-radius: 1%;

`,y=o.css`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;

  @media ${h.mediaQueries.md} {
    width: 20vw;
    height: 20vw;
    filter: blur(10vw);
  }

  border-radius: 50%;
  background: #4F95FF;
  transform-origin: bottom center;
`,b=n().div`
  ${y}
  animation: ${p} 5000ms linear infinite;
  filter: blur(100px);
  &:before {
    content: "";
    display: block;
    ${y};
    background: #B120BD;
    top: 50%;
    left: auto;
    right: 50%;
  }
  &:after {
    content: "";
    display: block;
    ${y};
    background: #44CEE3;
    top: 50%;
    left: 50%;
  },
`,j=n()(b)`
  && {
    top: 0px;
    left: 100px;
    animationDuration: 4000ms;
  }
`,v=n()(b)`
  && {
    top: -100px;
    left: calc(50% - 100px);
    animation-duration: 6000ms;
    animation-direction: reverse;
  }
`,w=n()(b)`
  && {
    top: 0px;
    left: auto;
    right: 100px;
    animation-duration: 5000ms;
  }
`,k=n()(d.default)`
  margin-top: -45%;
  margin-left: -112px;
  margin-right: -112px;
  @media ${h.mediaQueries.md} {
    margin-top: -37%;
    margin-left: 0;
    margin-right: 0;
  }
`,S=({percentage:e})=>{let{colorScheme:t="light",breakpoint:i}=(0,c.useSite)(),a=(Math.min(Math.max(e-("xs"===i?.2:0),1),1.2)-1)*5;return(0,r.jsxs)(f,{children:[r.jsx(j,{}),r.jsx(v,{}),r.jsx(w,{}),(0,r.jsxs)(g,{style:{transform:`translateY(${12.5*a}%) scale(${1+(1-a)*.1})`},children:[r.jsx(m,{}),r.jsx(l(),{width:987.275,height:580.75,src:`/codeedit-window-${t}.png`,alt:"CodeEdit screenshot"})]}),r.jsx(k,{style:{opacity:a,transform:`translateY(-${15*a}%)  scale(${1+-((1-a)*.1)})`}})]})};a()}catch(e){a(e)}})},12098:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>m});var r=i(20997),o=i(64e3),n=i(28706),s=i(25594),l=i(14676),d=i(84007),c=i(56279),h=i(14192),u=i(52325),p=i(88587),x=i(56344),f=i(56513);i(40968);var g=e([n,s,l,d,c,h,u,p,x]);function m(e){return(0,r.jsxs)(r.Fragment,{children:[r.jsx(o.default,{onClick:()=>window.open(f.links.githubProject),children:"CodeEdit is currently in development. Check out the roadmap."}),r.jsx(s.default,{...e}),r.jsx(d.default,{})]})}[n,s,l,d,c,h,u,p,x]=g.then?(await g)():g,a()}catch(e){a(e)}})},88587:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>p});var r=i(20997),o=i(57518),n=i.n(o),s=i(25675),l=i.n(s),d=i(94307),c=i(28706),h=i(99101),u=e([c]);c=(u.then?(await u)():u)[0];let x=n()(c.Section)`
  background-color: #f5f5f7;
  /* color: #1d1d1f; */
  background-color: var(--background-tertiary-color);
  /* color: var(--glyph-gray-tertiary); */
  a {
    color: var(--glyph-blue);
    :hover {
      text-decoration: underline;
    }
  }
`;function p(){return r.jsx(x,{contained:!0,gutterTop:!0,children:(0,r.jsxs)(c.Stack,{gap:!0,align:"center",children:[r.jsx(l(),{width:104,height:104,src:"/product-icon.png",alt:"CodeEdit product icon"}),(0,r.jsxs)(c.Stack,{align:"center",gap:1,children:[r.jsx(d.default,{variant:"eyebrow-super",children:"Get started"}),r.jsx(d.default,{variant:"body",children:"Download CodeEdit and see for yourself!"}),(0,r.jsxs)(d.default,{variant:"body",as:"a",href:"#",children:["Download CodeEdit ",r.jsx(h.ArrowDownCircle,{size:"1em",style:{verticalAlign:"middle"}})]})]})]})})}a()}catch(e){a(e)}})},52325:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>c});var r=i(20997),o=i(99101),n=i(21614),s=i(94307),l=i(28706),d=e([n,l]);[n,l]=d.then?(await d)():d;let c=()=>(0,r.jsxs)(l.Section,{contained:!0,gutterBottom:!0,children:[(0,r.jsxs)(l.Stack,{style:{textAlign:"center",marginBottom:48},children:[r.jsx(s.default,{variant:"headline-reduced",children:"Features"}),r.jsx(s.default,{variant:"intro",gutterTop:!0,children:"This is a description of the features section."})]}),(0,r.jsxs)(l.Grid,{columns:{xs:1,md:2,lg:3},gap:!0,children:[r.jsx(l.GridItem,{as:n.default,width:{xs:1,md:2,lg:3},color:"purple",gradient:!0,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 1"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,width:{xs:1,lg:2},children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 2"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,height:{xs:1,lg:2},children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 4"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 2"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 3"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})})]})]});a()}catch(e){a(e)}})},25594:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>m});var r=i(20997),o=i(25675),n=i.n(o),s=i(57518),l=i.n(s),d=i(55236),c=i(94307),h=i(28706),u=i(91972),p=i(6575),x=i(11163),f=e([h,p]);[h,p]=f.then?(await f)():f;let g=l().div`
  width: 128px;
  margin-left: auto;
  margin-right: auto;
`,m=({versionNumber:e,minimumSystemVersion:t})=>{let i=(0,x.useRouter)();return r.jsx(d.Parallax,{style:{overflow:"visible"},renderLayer:a=>(0,r.jsxs)(h.Section,{contained:!0,gutterTop:!0,children:[r.jsx(h.Row,{align:"center",style:{position:"relative",zIndex:1},children:r.jsx(h.Column,{width:{md:12,lg:12},children:(0,r.jsxs)(h.Stack,{gap:2,align:"center",children:[r.jsx(g,{children:r.jsx(n(),{width:128,height:128,src:"/product-icon.png",alt:"CodeEdit product icon"})}),r.jsx(c.default,{variant:"headline-elevated",children:"A modern Discord client for macOS, built with SwiftUI. Fully Open Source."}),r.jsx(c.default,{variant:"intro-elevated",color:"tertiary",gutterBottom:!0,children:"Voxa is a sleek, lightweight, and native macOS Discord client built using SwiftUI. Designed for speed, efficiency, and a modern user experience, it brings the best of Discord to your Mac in a fully optimized package."}),r.jsx(u.default,{size:"lg",onClick:()=>i.push("/download"),children:"Download"}),(0,r.jsxs)(c.default,{variant:"body-reduced",color:"tertiary",children:[e," | macOS ",t?`${t.split(".")[0]}+`:""]})]})})}),r.jsx(h.Row,{align:"center",children:r.jsx(h.Column,{children:r.jsx(p.default,{percentage:a})})})]})})};a()}catch(e){a(e)}})},84007:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>u});var r=i(20997),o=i(16689),n=i(99101),s=i(21614),l=i(94307),d=i(28706),c=i(85590),h=e([s,d,c]);[s,d,c]=h.then?(await h)():h;let u=()=>{let{breakpoint:e}=(0,c.useSite)(),t=(0,o.useMemo)(()=>"xs"===e?24:40,[e]);return r.jsx(d.Section,{contained:!0,gutterBottom:20,variant:"secondary",children:(0,r.jsxs)(d.Grid,{columns:{xs:1,lg:2},gap:{xs:6,lg:12},children:[r.jsx(d.GridItem,{as:s.default,width:{xs:1,lg:2},children:(0,r.jsxs)(d.Stack,{direction:"xs"===e?"vertical":"horizontal",gap:3.5,children:[r.jsx("div",{children:r.jsx(n.Info,{size:28})}),r.jsx(l.default,{variant:"intro",children:"CodeEdit is not meant to replace Xcode but rather supplement it for projects not intended for Apple platforms. We believe every type of developer deserves a great experience and excellent performance."})]})}),r.jsx(d.GridItem,{children:(0,r.jsxs)(d.Stack,{children:[r.jsx(n.Zap,{size:t}),r.jsx(l.default,{variant:"intro",gutterTop:!0,children:"macOS Native"}),r.jsx(l.default,{variant:"intro",style:{opacity:.5},children:"Harness the full power of your Mac, something only possible with our completely native architecture developed in Swift."})]})}),r.jsx(d.GridItem,{children:(0,r.jsxs)(d.Stack,{children:[r.jsx(n.Feather,{size:t}),r.jsx(l.default,{variant:"intro",gutterTop:!0,children:"Lightweight Yet Powerful"}),r.jsx(l.default,{variant:"intro",style:{opacity:.5},children:"Designed to be lean with limitless potential."})]})}),r.jsx(d.GridItem,{children:(0,r.jsxs)(d.Stack,{children:[r.jsx(n.GitHub,{size:t}),r.jsx(l.default,{variant:"intro",gutterTop:!0,children:"Completely Open Source"}),r.jsx(l.default,{variant:"intro",style:{opacity:.5},children:"CodeEdit is developed for you by developers like you. Don't like something? Want a new feature? Just create an issue or submit a PR."})]})}),r.jsx(d.GridItem,{children:(0,r.jsxs)(d.Stack,{children:[r.jsx(n.Sliders,{size:t}),r.jsx(l.default,{variant:"intro",gutterTop:!0,children:"Extensible & customizable"}),r.jsx(l.default,{variant:"intro",style:{opacity:.5},children:"We aren't going to guess. Make CodeEdit your own, tailored to your needs."})]})}),r.jsx(d.GridItem,{children:(0,r.jsxs)(d.Stack,{children:[r.jsx(n.Layout,{size:t}),r.jsx(l.default,{variant:"intro",gutterTop:!0,children:"Familiar & Intuitive User Interface"}),r.jsx(l.default,{variant:"intro",style:{opacity:.5},children:"Our user interface is designed to be familiar for ease-of-use and productivity."})]})}),r.jsx(d.GridItem,{children:(0,r.jsxs)(d.Stack,{children:[r.jsx(n.Tool,{size:t}),r.jsx(l.default,{variant:"intro",gutterTop:!0,children:"Better tools to get the job done"}),r.jsx(l.default,{variant:"intro",style:{opacity:.5},children:"Feel connected to the code you are writing with tools to keep you on track."})]})})]})})};a()}catch(e){a(e)}})},14192:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>c});var r=i(20997),o=i(99101),n=i(21614),s=i(94307),l=i(28706),d=e([n,l]);[n,l]=d.then?(await d)():d;let c=()=>(0,r.jsxs)(l.Section,{contained:!0,gutterBottom:!0,children:[(0,r.jsxs)(l.Stack,{style:{textAlign:"center",marginBottom:48},children:[r.jsx(s.default,{variant:"headline-reduced",children:"More Features"}),r.jsx(s.default,{variant:"intro",gutterTop:!0,children:"This is a description of the features section."})]}),(0,r.jsxs)(l.Grid,{columns:{xs:1,md:2,lg:3},gap:!0,children:[r.jsx(l.GridItem,{as:n.default,width:{xs:1,md:2,lg:3},color:"pink",gradient:!0,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 1"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,height:{xs:1,lg:2},children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 4"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 2"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 3"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,width:{xs:1,lg:2},children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 2"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})})]})]});a()}catch(e){a(e)}})},56344:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>g});var r=i(20997),o=i(57518),n=i.n(o);i(99101);var s=i(21614),l=i(94307),d=i(28706),c=i(52519);i(25675);var h=e([s,d]);[s,d]=h.then?(await h)():h;let u=n()(d.Row)`
  margin-top: ${(0,c.default)(16)};
  margin-bottom: ${(0,c.default)(10)};
`,p=n().header`
  padding: 0 ${(0,c.default)(5)};
`,x=n()(d.Stack)`
  margin-top: ${(0,c.default)(8)};
`,f=n().div`
  aspect-ratio: 1391/702;
  position: relative;
  margin: 0 -40px -40px -40px;
  background: url(/window-dark-cropped.png) top left no-repeat;
  background-size: 1391px 702px;
`,g=()=>(0,r.jsxs)(d.Section,{contained:"lg",gutterTop:!0,gutterBottom:20,style:{background:"var(--fill-tertiary-alt)"},children:[r.jsx(u,{children:r.jsx(d.Column,{width:7,children:(0,r.jsxs)(p,{children:[r.jsx(l.default,{variant:"headline-elevated",children:"Designed to help your\xa0work\xa0flow."}),r.jsx(l.default,{variant:"intro-elevated",gutterTop:!0,children:"The world’s fastest editor has a completely reimagined design, making CodeEdit more immersive and customizable than ever. And with a streamlined user interface, you’ve got new tools for keeping track of what’s important — and for clearing some headspace when you need it most."})]})})}),(0,r.jsxs)(x,{gap:4,style:{"--section-accent-color":"var(--tomato)"},children:[r.jsx(p,{children:r.jsx(l.default,{variant:"headline",style:{color:"var(--section-accent-color)"},children:"Navigator"})}),(0,r.jsxs)(d.Grid,{columns:{xs:4,md:6,lg:8,xl:12},gap:!0,children:[r.jsx(d.GridItem,{as:s.default,width:{xs:4,md:6,lg:8,xl:12},headline:"Compact tab bar",copy:"The compact tab bar option takes up less space on the page and takes on the color of the site you’re on, extending the web page to the edge of the window. Tabs have been combined with the Smart Search field, giving you access to powerful Safari features with the click of a tab.",overlayCopy:"The future of Mac isn’t just bright — it’s intelligent. Shortcuts build on the capabilities of the Automator app. Now you can modernize and convert your existing Automator workflows into shortcuts.",violator:"Coming Soon",children:r.jsx(f,{})}),r.jsx(d.GridItem,{as:s.default,width:6,headline:"Tab Groups",copy:"Save and organize your tabs in the way that works best for you. Name your Tab Groups, edit them, and switch between them as you go from one interest to the next. You can even drag your groups into an email and the links effortlessly appear as an easy‑to‑share list."}),r.jsx(d.GridItem,{as:s.default,width:6,headline:"Access Tab Groups anywhere",copy:"Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."})]})]}),(0,r.jsxs)(x,{gap:4,children:[r.jsx(p,{children:r.jsx(l.default,{variant:"headline",style:{color:"var(--section-accent-color)"},children:"Inspector"})}),(0,r.jsxs)(d.Grid,{columns:{xs:4,md:6,lg:8,xl:12},gap:!0,children:[r.jsx(d.GridItem,{as:s.default,width:{xs:4,md:6,lg:8,xl:12},headline:"Compact tab bar",copy:"The compact tab bar option takes up less space on the page and takes on the color of the site you’re on, extending the web page to the edge of the window. Tabs have been combined with the Smart Search field, giving you access to powerful Safari features with the click of a tab.",overlayCopy:"The future of Mac isn’t just bright — it’s intelligent. Shortcuts build on the capabilities of the Automator app. Now you can modernize and convert your existing Automator workflows into shortcuts.",violator:"Coming Soon",children:r.jsx(f,{})}),r.jsx(d.GridItem,{as:s.default,width:4,headline:"Tab Groups",copy:"Save and organize your tabs in the way that works best for you. Name your Tab Groups, edit them, and switch between them as you go from one interest to the next. You can even drag your groups into an email and the links effortlessly appear as an easy‑to‑share list.",color:"blue",gradient:!0}),r.jsx(d.GridItem,{as:s.default,width:4,headline:"Access Tab Groups anywhere",copy:"Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."}),r.jsx(d.GridItem,{as:s.default,width:4,headline:"Access Tab Groups anywhere",copy:"Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."})]})]})]});a()}catch(e){a(e)}})},56279:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>c});var r=i(20997),o=i(99101),n=i(21614),s=i(94307),l=i(28706),d=e([n,l]);[n,l]=d.then?(await d)():d;let c=()=>(0,r.jsxs)(l.Section,{contained:!0,gutterBottom:!0,children:[(0,r.jsxs)(l.Stack,{style:{textAlign:"center",marginBottom:48},children:[r.jsx(s.default,{variant:"headline-reduced",children:"Why CodeEdit?"}),r.jsx(s.default,{variant:"intro",gutterTop:!0,children:"This is a description of the why CodeEdit section."})]}),(0,r.jsxs)(l.Grid,{columns:{xs:1,md:2,lg:3},gap:!0,children:[r.jsx(l.GridItem,{as:n.default,color:"blue",gradient:!0,width:{xs:1,md:2,lg:3},"data-color-scheme":"dark",children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 1"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 2"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,height:{md:2,lg:1},children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 3"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})}),r.jsx(l.GridItem,{as:n.default,children:(0,r.jsxs)(l.Stack,{gap:2,children:[r.jsx(o.Sliders,{}),r.jsx(s.default,{variant:"eyebrow",children:"Feature Title 4"}),r.jsx(s.default,{variant:"body",children:"This is a description for this feature."})]})})]})]});a()}catch(e){a(e)}})}};