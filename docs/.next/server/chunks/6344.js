"use strict";exports.id=6344,exports.ids=[6344,1614],exports.modules={21614:(e,t,a)=>{a.a(e,async(e,o)=>{try{a.r(t),a.d(t,{TileViolator:()=>b,default:()=>G});var i=a(20997),r=a(16689),n=a(57518),s=a.n(n),l=a(46555),d=a(94307),c=e([l]);l=(c.then?(await c)():c)[0];let p=s().div`
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
`,h=s().div`
  padding: 40px;
`,u=s().div`
  margin-top: -4px;
  max-width: 655px;
`,g=s()(d.default).attrs({as:"h4"})`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: .011em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${({overlay:e})=>e?"":"color: var(--section-accent-color);"}
`,x=s()(d.default)`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${g} + & {
      margin-top: 0.3em;
    }
`,b=s().div`
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

`,f=s().div`

`,y=s().input`
  display: none;
`,m=s().div`
    z-index: 10;
`,v=s().label`
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
`,w=s().span`
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
  ${y}:checked ~ ${m} & {
    color: var(--tile-overlay-background-color);
    background-color: #fff;
    transform: rotate(45deg);
    transition-delay: 0s;
  }
`,k=s().span`
    position: absolute;
    width: 100%;
    height: 100%;
`,j=s().span`
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
  
  ${y}:checked ~ ${m} & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
`,A=s().div`
  margin-top: -4px;
  max-width: 655px;
  & ${g} {
    color: #fff;
  }
`,T=s().div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    align-items: center;
`,z=s().div`
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

    ${y}:checked ~ ${m} & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: .66s; 
    }
`,G=({children:e,headline:t,copy:a,overlay:o,violator:n,overlayCopy:s,...d})=>{let c={};d.color&&(c["data-color-scheme"]="dark");let G=(0,r.useMemo)(()=>(0,l.v4)(),[]);return(0,i.jsxs)(p,{...c,...d,children:[(0,i.jsxs)(h,{children:[(t||a||n)&&(0,i.jsxs)(u,{children:[t&&i.jsx(g,{children:t}),a&&i.jsx(x,{children:a}),n&&i.jsx(b,{children:n})]}),i.jsx(f,{children:e})]}),(o||s)&&(0,i.jsxs)(i.Fragment,{children:[i.jsx(y,{type:"checkbox",id:`tile-overlay-toggle-${G}`}),(0,i.jsxs)(m,{children:[(0,i.jsxs)(v,{for:`tile-overlay-toggle-${G}`,children:[i.jsx(w,{children:i.jsx("svg",{className:"tile-icon-alt",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:i.jsx("path",{d:"M18.5,8.51h-7v-7A1.5,1.5,0,0,0,10,0h0A1.5,1.5,0,0,0,8.5,1.5v7h-7a1.5,1.5,0,0,0,0,3h7v7A1.5,1.5,0,0,0,10,20h0a1.5,1.5,0,0,0,1.5-1.5v-7h7a1.5,1.5,0,0,0,0-3Z"})})}),i.jsx(k,{role:"button","aria-expanded":"false","aria-controls":"content-toggle-shortcuts-app",children:i.jsx(j,{children:"Learn more"})})]}),(0,i.jsxs)(S,{children:[i.jsx(A,{children:i.jsx(g,{overlay:!0,children:t})}),(0,i.jsxs)(T,{children:[s&&i.jsx(z,{children:s}),"function"==typeof o?o():o]})]})]})]})]})};o()}catch(e){o(e)}})},56344:(e,t,a)=>{a.a(e,async(e,o)=>{try{a.r(t),a.d(t,{default:()=>b});var i=a(20997),r=a(57518),n=a.n(r);a(99101);var s=a(21614),l=a(94307),d=a(28706),c=a(52519);a(25675);var p=e([s,d]);[s,d]=p.then?(await p)():p;let h=n()(d.Row)`
  margin-top: ${(0,c.default)(16)};
  margin-bottom: ${(0,c.default)(10)};
`,u=n().header`
  padding: 0 ${(0,c.default)(5)};
`,g=n()(d.Stack)`
  margin-top: ${(0,c.default)(8)};
`,x=n().div`
  aspect-ratio: 1391/702;
  position: relative;
  margin: 0 -40px -40px -40px;
  background: url(/window-dark-cropped.png) top left no-repeat;
  background-size: 1391px 702px;
`,b=()=>(0,i.jsxs)(d.Section,{contained:"lg",gutterTop:!0,gutterBottom:20,style:{background:"var(--fill-tertiary-alt)"},children:[i.jsx(h,{children:i.jsx(d.Column,{width:7,children:(0,i.jsxs)(u,{children:[i.jsx(l.default,{variant:"headline-elevated",children:"Designed to help your\xa0work\xa0flow."}),i.jsx(l.default,{variant:"intro-elevated",gutterTop:!0,children:"The world’s fastest editor has a completely reimagined design, making CodeEdit more immersive and customizable than ever. And with a streamlined user interface, you’ve got new tools for keeping track of what’s important — and for clearing some headspace when you need it most."})]})})}),(0,i.jsxs)(g,{gap:4,style:{"--section-accent-color":"var(--tomato)"},children:[i.jsx(u,{children:i.jsx(l.default,{variant:"headline",style:{color:"var(--section-accent-color)"},children:"Navigator"})}),(0,i.jsxs)(d.Grid,{columns:{xs:4,md:6,lg:8,xl:12},gap:!0,children:[i.jsx(d.GridItem,{as:s.default,width:{xs:4,md:6,lg:8,xl:12},headline:"Compact tab bar",copy:"The compact tab bar option takes up less space on the page and takes on the color of the site you’re on, extending the web page to the edge of the window. Tabs have been combined with the Smart Search field, giving you access to powerful Safari features with the click of a tab.",overlayCopy:"The future of Mac isn’t just bright — it’s intelligent. Shortcuts build on the capabilities of the Automator app. Now you can modernize and convert your existing Automator workflows into shortcuts.",violator:"Coming Soon",children:i.jsx(x,{})}),i.jsx(d.GridItem,{as:s.default,width:6,headline:"Tab Groups",copy:"Save and organize your tabs in the way that works best for you. Name your Tab Groups, edit them, and switch between them as you go from one interest to the next. You can even drag your groups into an email and the links effortlessly appear as an easy‑to‑share list."}),i.jsx(d.GridItem,{as:s.default,width:6,headline:"Access Tab Groups anywhere",copy:"Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."})]})]}),(0,i.jsxs)(g,{gap:4,children:[i.jsx(u,{children:i.jsx(l.default,{variant:"headline",style:{color:"var(--section-accent-color)"},children:"Inspector"})}),(0,i.jsxs)(d.Grid,{columns:{xs:4,md:6,lg:8,xl:12},gap:!0,children:[i.jsx(d.GridItem,{as:s.default,width:{xs:4,md:6,lg:8,xl:12},headline:"Compact tab bar",copy:"The compact tab bar option takes up less space on the page and takes on the color of the site you’re on, extending the web page to the edge of the window. Tabs have been combined with the Smart Search field, giving you access to powerful Safari features with the click of a tab.",overlayCopy:"The future of Mac isn’t just bright — it’s intelligent. Shortcuts build on the capabilities of the Automator app. Now you can modernize and convert your existing Automator workflows into shortcuts.",violator:"Coming Soon",children:i.jsx(x,{})}),i.jsx(d.GridItem,{as:s.default,width:4,headline:"Tab Groups",copy:"Save and organize your tabs in the way that works best for you. Name your Tab Groups, edit them, and switch between them as you go from one interest to the next. You can even drag your groups into an email and the links effortlessly appear as an easy‑to‑share list.",color:"blue",gradient:!0}),i.jsx(d.GridItem,{as:s.default,width:4,headline:"Access Tab Groups anywhere",copy:"Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."}),i.jsx(d.GridItem,{as:s.default,width:4,headline:"Access Tab Groups anywhere",copy:"Tab Groups seamlessly sync across your Apple devices, so you can easily pick back up whenever and wherever you want."})]})]})]});o()}catch(e){o(e)}})}};