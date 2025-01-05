"use strict";exports.id=1211,exports.ids=[1211,1614],exports.modules={21614:(e,i,t)=>{t.a(e,async(e,r)=>{try{t.r(i),t.d(i,{TileViolator:()=>f,default:()=>z});var a=t(20997),o=t(16689),l=t(57518),s=t.n(l),n=t(46555),d=t(94307),c=e([n]);n=(c.then?(await c)():c)[0];let h=s().div`
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
`,g=s().div`
  padding: 40px;
`,x=s().div`
  margin-top: -4px;
  max-width: 655px;
`,p=s()(d.default).attrs({as:"h4"})`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: .011em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${({overlay:e})=>e?"":"color: var(--section-accent-color);"}
`,u=s()(d.default)`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${p} + & {
      margin-top: 0.3em;
    }
`,f=s().div`
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

`,b=s().input`
  display: none;
`,v=s().div`
    z-index: 10;
`,y=s().label`
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
`,j=s().span`
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
  ${b}:checked ~ ${v} & {
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
`,I=s().div`
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
  
  ${b}:checked ~ ${v} & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
`,F=s().div`
  margin-top: -4px;
  max-width: 655px;
  & ${p} {
    color: #fff;
  }
`,G=s().div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    align-items: center;
`,S=s().div`
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

    ${b}:checked ~ ${v} & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: .66s; 
    }
`,z=({children:e,headline:i,copy:t,overlay:r,violator:l,overlayCopy:s,...d})=>{let c={};d.color&&(c["data-color-scheme"]="dark");let z=(0,o.useMemo)(()=>(0,n.v4)(),[]);return(0,a.jsxs)(h,{...c,...d,children:[(0,a.jsxs)(g,{children:[(i||t||l)&&(0,a.jsxs)(x,{children:[i&&a.jsx(p,{children:i}),t&&a.jsx(u,{children:t}),l&&a.jsx(f,{children:l})]}),a.jsx(m,{children:e})]}),(r||s)&&(0,a.jsxs)(a.Fragment,{children:[a.jsx(b,{type:"checkbox",id:`tile-overlay-toggle-${z}`}),(0,a.jsxs)(v,{children:[(0,a.jsxs)(y,{for:`tile-overlay-toggle-${z}`,children:[a.jsx(j,{children:a.jsx("svg",{className:"tile-icon-alt",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:a.jsx("path",{d:"M18.5,8.51h-7v-7A1.5,1.5,0,0,0,10,0h0A1.5,1.5,0,0,0,8.5,1.5v7h-7a1.5,1.5,0,0,0,0,3h7v7A1.5,1.5,0,0,0,10,20h0a1.5,1.5,0,0,0,1.5-1.5v-7h7a1.5,1.5,0,0,0,0-3Z"})})}),a.jsx(w,{role:"button","aria-expanded":"false","aria-controls":"content-toggle-shortcuts-app",children:a.jsx(k,{children:"Learn more"})})]}),(0,a.jsxs)(I,{children:[a.jsx(F,{children:a.jsx(p,{overlay:!0,children:i})}),(0,a.jsxs)(G,{children:[s&&a.jsx(S,{children:s}),"function"==typeof r?r():r]})]})]})]})]})};r()}catch(e){r(e)}})},41211:(e,i,t)=>{t.a(e,async(e,r)=>{try{t.r(i),t.d(i,{default:()=>d});var a=t(20997),o=t(21614),l=t(94307),s=t(28706),n=e([o,s]);function d(){return(0,a.jsxs)(a.Fragment,{children:[a.jsx(s.Section,{contained:!0,gutterY:!0,children:a.jsx(s.Row,{align:"center",children:a.jsx(s.Column,{width:{md:12,lg:8},children:(0,a.jsxs)(s.Stack,{gap:!0,children:[a.jsx(l.default,{variant:"headline-super",as:"h1",children:"Grid"}),a.jsx(l.default,{variant:"intro",color:"secondary",children:"A grid system based on the CSS grid display property."})]})})})}),a.jsx(s.Section,{contained:!0,gutterBottom:!0,children:(0,a.jsxs)(s.Grid,{columns:{xs:1,sm:2,lg:3},rowHeight:{sm:"16px",lg:"32px"},gap:2,children:[a.jsx(s.GridItem,{as:o.default,height:8}),a.jsx(s.GridItem,{as:o.default,height:6}),a.jsx(s.GridItem,{as:o.default,height:8}),a.jsx(s.GridItem,{as:o.default,height:11}),a.jsx(s.GridItem,{as:o.default,height:12}),a.jsx(s.GridItem,{as:o.default,height:12}),a.jsx(s.GridItem,{as:o.default,height:{sm:5,lg:3}}),a.jsx(s.GridItem,{as:o.default,width:{xs:1,sm:2,lg:3},height:10}),a.jsx(s.GridItem,{as:o.default,width:{xs:1,lg:2},height:6}),a.jsx(s.GridItem,{as:o.default,height:{sm:14,lg:13}}),a.jsx(s.GridItem,{as:o.default,height:7}),a.jsx(s.GridItem,{as:o.default,height:7}),a.jsx(s.GridItem,{as:o.default,width:{xs:1,sm:2,lg:3},height:10})]})}),(0,a.jsxs)(s.Section,{gutterBottom:3,children:[(0,a.jsxs)(s.Container,{children:[a.jsx(l.default,{variant:"headline-reduced",children:"Offsets"}),a.jsx(l.default,{variant:"body",gutterTop:!0,gutterBottom:!0,children:"Offset a column."})]}),(0,a.jsxs)(s.Grid,{columns:{xs:4,sm:6,lg:8,xl:12},gap:3,children:[a.jsx(s.GridItem,{as:o.default,width:{xs:4,sm:6,lg:8,xl:12},style:{height:300}}),a.jsx(s.GridItem,{as:o.default,width:{xs:4,sm:3,lg:4,xl:4},style:{height:300}}),a.jsx(s.GridItem,{as:o.default,width:{xs:4,sm:3,lg:4,xl:8},style:{height:300}})]})]})]})}[o,s]=n.then?(await n)():n,r()}catch(e){r(e)}})}};