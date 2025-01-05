"use strict";exports.id=8328,exports.ids=[8328,3260,9963,2193,1614,2847,4308],exports.modules={53260:(e,i,t)=>{t.r(i),t.d(i,{default:()=>a});var r,o=t(16689);function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var t=arguments[i];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}let a=function(e){return o.createElement("svg",n({xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},e),r||(r=o.createElement("path",{d:"M12 .956C5.903.956.96 5.9.96 11.996c0 5.178 3.564 9.523 8.373 10.716V15.37H7.056v-3.374h2.277v-1.453c0-3.758 1.7-5.5 5.39-5.5.7 0 1.906.137 2.4.274v3.059l-.23-.018a19.006 19.006 0 0 0-1.046-.023c-1.81 0-2.51.685-2.51 2.468v1.193h3.607l-.62 3.374h-2.986v7.586c5.466-.66 9.702-5.315 9.702-10.96C23.04 5.9 18.097.956 12 .956"})))}},49963:(e,i,t)=>{t.r(i),t.d(i,{default:()=>n});var r=t(57518),o=t.n(r);let n=o().a`
  cursor: ${({disabled:e})=>e?"default":"pointer"};
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  font-size: 17px;
  line-height: 1.17648;
  font-weight: 400;
  letter-spacing: -.022em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  min-width: 28px;
  padding: 4px;
  border-radius: 18px;
  color: var(${({disabled:e})=>e?"--glyph-gray-tertiary":"--color-fill-blue"});
  border: 0;
  outline: 0;
  transition: 200ms;

  &:hover {
    opacity: 0.66;
  }

  &:active {
    opacity: 0.33;
  }

  ${({compact:e})=>e?`
    font-size: 12px;
    line-height: 1.33337;
    font-weight: 400;
    letter-spacing: -.01em;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    min-width: 23px;
    padding: 0;
    border-radius: 12px;
  `:""}
`},22193:(e,i,t)=>{t.r(i),t.d(i,{Menu:()=>m,MenuDivider:()=>f,MenuItem:()=>b});var r=t(20997),o=t(16689),n=t.n(o),a=t(42932);t(23841);var l=t(66405),s=t.n(l),d=t(57518),c=t.n(d),p=t(67689);let h=c().div`
  min-width: 160px;
  display: flex;
  flex-direction: column;
  z-index: 9996;
  max-height: 400px;

  @media ${p.mediaQueries.sm} {
    position: fixed;
    inset: auto auto 0 0 !important;
    transform: none !important;
    display: block;
    /* height: calc(100% - 6rem); */
    max-height: calc(100vh - 10rem - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    width: 100vw;
    box-sizing: border-box;
    z-index: 9999;
    &:before {
      background-color: #00000052;
      content: "";
      display: block;
      height: 100vh;
      left: 0;
      position: fixed;
      top: 0;
      transition: opacity .4s cubic-bezier(.19,1,.22,1);
      width: 100vw;
      z-index: -1;
      pointer-events: none;
    }
  }
`,x=c().div`
  overflow-y: auto;
  width: 100%;
  background: var(--background-tertiary-color);
  border: 1px solid var(--separator-color);;
  padding: 5px;
  border-radius: 10px;
  align-items: stretch;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  @media ${p.mediaQueries.sm} {
    border: 0;
    max-height: calc(100vh - 10rem - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    border-radius: 10px 10px 0 0;
  }
`,u=c().button`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  padding: 6px 10px;
  border-radius: 5px;
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
  text-align: left;
  box-sizing: border-box;
  &:hover, &:focus {
    background: var(--fill-gray-quaternary);
  }
  &:active {
    background: var(--fill-gray-tertiary);
  }
  @media ${p.mediaQueries.sm} {
    padding: 14px 15px;
    border-top: 1px solid --var(--separator-color);
    font-size: 14px;
    &:has(svg) {
      flex-direction: row-reverse;
      justify-content: space-between;      
    }
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`,g=c().div`
  display: none;
  position: sticky;
  bottom: 0;
  padding-bottom: 5px;
  margin-top: -5px;
  transform: translateY(5px);
  background: var(--background-tertiary-color);
  ${u} {
    justify-content: center;
  }
  @media ${p.mediaQueries.sm} {
    display: block;
  }
`,f=c().hr`
  margin: 5px;
  border: 0;
  border-top: 1px solid var(--separator-color);;
  border-left: 1px solid var(--separator-color);;
`,m=({trigger:e,children:i,placement:t="bottom-end",...l})=>{let[d,c]=(0,o.useState)(!1),[p,m]=(0,o.useState)(null),[b,v]=(0,o.useState)(null),{styles:y,attributes:w}=(0,a.usePopper)(p,b,{placement:t,strategy:"fixed",modifiers:[{name:"offset",options:{offset:[0,5]}}]}),k=e(),j=n().cloneElement(k,{ref:m,onClick:()=>c(!0),style:{...k.props.style,...d?{pointerEvents:"none"}:{}}});(0,o.useEffect)(()=>{let e=e=>{b&&!b.contains(e.target)&&c(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[b]);let S=n().Children.map(i,e=>n().isValidElement(e)?n().cloneElement(e,{onCloseMenu:()=>c(!1)}):e),C=r.jsx(h,{ref:v,style:y.popper,...w.popper,...l,children:(0,r.jsxs)(x,{children:[S,(0,r.jsxs)(g,{children:[r.jsx(f,{}),r.jsx(u,{onClick:()=>c(!1),children:"Cancel"})]})]})});return(0,r.jsxs)(r.Fragment,{children:[j,d?s().createPortal(C,document.body):null]})},b=({icon:e,onClick:i,children:t,onCloseMenu:o})=>(0,r.jsxs)(u,{onClick:e=>{i?.(e),o()},children:[e&&r.jsx(e,{}),t]})},21614:(e,i,t)=>{t.a(e,async(e,r)=>{try{t.r(i),t.d(i,{TileViolator:()=>f,default:()=>F});var o=t(20997),n=t(16689),a=t(57518),l=t.n(a),s=t(46555),d=t(94307),c=e([s]);s=(c.then?(await c)():c)[0];let p=l().div`
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
`,h=l().div`
  padding: 40px;
`,x=l().div`
  margin-top: -4px;
  max-width: 655px;
`,u=l()(d.default).attrs({as:"h4"})`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: .011em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${({overlay:e})=>e?"":"color: var(--section-accent-color);"}
`,g=l()(d.default)`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${u} + & {
      margin-top: 0.3em;
    }
`,f=l().div`
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

`,m=l().div`

`,b=l().input`
  display: none;
`,v=l().div`
    z-index: 10;
`,y=l().label`
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
`,w=l().span`
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
`,k=l().span`
    position: absolute;
    width: 100%;
    height: 100%;
`,j=l().span`
    position: absolute;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
`,S=l().div`
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
`,C=l().div`
  margin-top: -4px;
  max-width: 655px;
  & ${u} {
    color: #fff;
  }
`,z=l().div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    align-items: center;
`,$=l().div`
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
`,F=({children:e,headline:i,copy:t,overlay:r,violator:a,overlayCopy:l,...d})=>{let c={};d.color&&(c["data-color-scheme"]="dark");let F=(0,n.useMemo)(()=>(0,s.v4)(),[]);return(0,o.jsxs)(p,{...c,...d,children:[(0,o.jsxs)(h,{children:[(i||t||a)&&(0,o.jsxs)(x,{children:[i&&o.jsx(u,{children:i}),t&&o.jsx(g,{children:t}),a&&o.jsx(f,{children:a})]}),o.jsx(m,{children:e})]}),(r||l)&&(0,o.jsxs)(o.Fragment,{children:[o.jsx(b,{type:"checkbox",id:`tile-overlay-toggle-${F}`}),(0,o.jsxs)(v,{children:[(0,o.jsxs)(y,{for:`tile-overlay-toggle-${F}`,children:[o.jsx(w,{children:o.jsx("svg",{className:"tile-icon-alt",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:o.jsx("path",{d:"M18.5,8.51h-7v-7A1.5,1.5,0,0,0,10,0h0A1.5,1.5,0,0,0,8.5,1.5v7h-7a1.5,1.5,0,0,0,0,3h7v7A1.5,1.5,0,0,0,10,20h0a1.5,1.5,0,0,0,1.5-1.5v-7h7a1.5,1.5,0,0,0,0-3Z"})})}),o.jsx(k,{role:"button","aria-expanded":"false","aria-controls":"content-toggle-shortcuts-app",children:o.jsx(j,{children:"Learn more"})})]}),(0,o.jsxs)(S,{children:[o.jsx(C,{children:o.jsx(u,{overlay:!0,children:i})}),(0,o.jsxs)(z,{children:[l&&o.jsx($,{children:l}),"function"==typeof r?r():r]})]})]})]})]})};r()}catch(e){r(e)}})},88328:(e,i,t)=>{t.a(e,async(e,r)=>{try{t.r(i),t.d(i,{default:()=>z});var o=t(20997),n=t(16689),a=t.n(n),l=t(57518),s=t.n(l),d=t(28706),c=t(21614),p=t(94307),h=t(91972),x=t(49963),u=t(22193),g=t(61190),f=t(99101),m=t(10535),b=t(53260),v=t(2847),y=t(4308),w=e([d,c,g]);[d,c,g]=w.then?(await w)():w;let k=s()(c.default)`
  border-radius: 18px;
  & > div {
    padding: 30px;
  }
`,j=s().a`
  color: inherit;
  position: relative;
  &:after {
    content: '\\00a0#';
    font-weight: 400;
    opacity: 0;
  }
  &:hover {
    opacity: 0.75;
    &:after {
      opacity: 0.33;
    }
  }
`,S=s()(g.default)`
  img {
    width: 100%;
  }
`,C=(e,i)=>{var t=`CodeEdit Release ${e}`,r="mailto:?subject=";r+=encodeURIComponent(t)+"&body="+encodeURIComponent(i),window.open(r)},z=({release:e,latest:i})=>{var t;let r=e.assets?.filter(e=>/^CodeEdit.*\.dmg$/.test(e.name))?.[0];console.log("release");let n=(0,y.default)(e.body),l=n?v[n.split(".")[0]]:null;return(0,o.jsxs)(a().Fragment,{children:[o.jsx(d.SectionDivider,{contained:!0}),o.jsx(d.Section,{contained:!0,gutterTop:!0,gutterBottom:!0,id:e.name,children:(0,o.jsxs)(d.Row,{gap:5,children:[o.jsx(d.Column,{width:{sm:12,lg:4},children:(0,o.jsxs)(d.Stack,{gap:2,style:{position:"sticky",top:96},children:[o.jsx(k,{children:(0,o.jsxs)(d.Stack,{gap:!0,children:[(0,o.jsxs)(d.Stack,{align:"start",gap:1,children:[i&&o.jsx(c.TileViolator,{children:"Latest"}),o.jsx(p.default,{variant:"eyebrow-super",as:"h3",children:o.jsx(j,{href:`#${e.name}`,children:e.name})}),(0,o.jsxs)(p.default,{as:"span",variant:"body-reduced",color:"tertiary",children:["Released on ",(t=e.published_at,new Date(t).toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric"}))]})]}),(0,o.jsxs)(d.Stack,{direction:"horizontal",align:"center",distribute:"space-between",style:{width:"100%"},children:[r&&o.jsx(h.default,{href:r.browser_download_url,children:"Download"}),(0,o.jsxs)(u.Menu,{trigger:()=>o.jsx(x.default,{children:o.jsx(f.Share,{})}),children:[o.jsx(u.MenuItem,{icon:f.Link,onClick:()=>{navigator.clipboard.writeText("").then(function(e){console.log("Copying to clipboard was successful!",e)},function(e){console.log("Could not copy text: ",e)})},children:"Copy Link"}),o.jsx(u.MenuDivider,{}),o.jsx(u.MenuItem,{icon:b.default,onClick:()=>window.open("https://www.facebook.com/sharer/sharer.php?u="),children:"Share on Facebook"}),o.jsx(u.MenuItem,{icon:m.default,onClick:()=>window.open("https://x.com/intent/tweet?url="),children:"Post on X"}),o.jsx(u.MenuItem,{icon:f.Mail,onClick:()=>C(e.name,""),children:"Send in Email"})]})]})]})}),n&&(0,o.jsxs)(p.default,{variant:"caption",color:"tertiary",style:{margin:"0 30px"},children:["Requires macOS ",l," (",n,") or newer"]})]})}),o.jsx(d.Column,{width:{sm:12,lg:8},children:o.jsx(S,{children:e.body})})]})})]})};r()}catch(e){r(e)}})},4308:(e,i,t)=>{t.r(i),t.d(i,{default:()=>r});let r=function(e){let i=e.match(/minimumSystemVersion=(\d+\.\d+)/);return i?i[1]:null}},2847:e=>{e.exports=JSON.parse('{"11":"Big Sur","12":"Monterey","13":"Ventura","14":"Sonoma","15":"Sequoia","10.0":"Cheetah","10.1":"Puma","10.2":"Jaguar","10.3":"Panther","10.4":"Tiger","10.5":"Leopard","10.6":"Snow Leopard","10.7":"Lion","10.8":"Mountain Lion","10.9":"Mavericks","10.10":"Yosemite","10.11":"El Capitan","10.12":"Sierra","10.13":"High Sierra","10.14":"Mojave","10.15":"Catalina"}')}};