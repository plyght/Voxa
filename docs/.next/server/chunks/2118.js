"use strict";exports.id=2118,exports.ids=[2118,1614,9213],exports.modules={21614:(e,t,i)=>{i.a(e,async(e,r)=>{try{i.r(t),i.d(t,{TileViolator:()=>f,default:()=>C});var a=i(20997),o=i(16689),n=i(57518),l=i.n(n),d=i(46555),s=i(94307),c=e([d]);d=(c.then?(await c)():c)[0];let p=l().div`
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
`,g=l().div`
  margin-top: -4px;
  max-width: 655px;
`,x=l()(s.default).attrs({as:"h4"})`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: .011em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${({overlay:e})=>e?"":"color: var(--section-accent-color);"}
`,u=l()(s.default)`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${x} + & {
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

`,b=l().div`

`,m=l().input`
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
  ${m}:checked ~ ${v} & {
    color: var(--tile-overlay-background-color);
    background-color: #fff;
    transform: rotate(45deg);
    transition-delay: 0s;
  }
`,j=l().span`
    position: absolute;
    width: 100%;
    height: 100%;
`,k=l().span`
    position: absolute;
    clip: rect(1px,1px,1px,1px);
    -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
`,$=l().div`
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
  
  ${m}:checked ~ ${v} & {
    opacity: 1;
    visibility: visible;
    transition-delay: 0s;
  }
`,F=l().div`
  margin-top: -4px;
  max-width: 655px;
  & ${x} {
    color: #fff;
  }
`,z=l().div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    align-items: center;
`,S=l().div`
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

    ${m}:checked ~ ${v} & {
      opacity: 1;
      transform: translateY(0);
      transition-delay: .66s; 
    }
`,C=({children:e,headline:t,copy:i,overlay:r,violator:n,overlayCopy:l,...s})=>{let c={};s.color&&(c["data-color-scheme"]="dark");let C=(0,o.useMemo)(()=>(0,d.v4)(),[]);return(0,a.jsxs)(p,{...c,...s,children:[(0,a.jsxs)(h,{children:[(t||i||n)&&(0,a.jsxs)(g,{children:[t&&a.jsx(x,{children:t}),i&&a.jsx(u,{children:i}),n&&a.jsx(f,{children:n})]}),a.jsx(b,{children:e})]}),(r||l)&&(0,a.jsxs)(a.Fragment,{children:[a.jsx(m,{type:"checkbox",id:`tile-overlay-toggle-${C}`}),(0,a.jsxs)(v,{children:[(0,a.jsxs)(y,{for:`tile-overlay-toggle-${C}`,children:[a.jsx(w,{children:a.jsx("svg",{className:"tile-icon-alt",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:a.jsx("path",{d:"M18.5,8.51h-7v-7A1.5,1.5,0,0,0,10,0h0A1.5,1.5,0,0,0,8.5,1.5v7h-7a1.5,1.5,0,0,0,0,3h7v7A1.5,1.5,0,0,0,10,20h0a1.5,1.5,0,0,0,1.5-1.5v-7h7a1.5,1.5,0,0,0,0-3Z"})})}),a.jsx(j,{role:"button","aria-expanded":"false","aria-controls":"content-toggle-shortcuts-app",children:a.jsx(k,{children:"Learn more"})})]}),(0,a.jsxs)($,{children:[a.jsx(F,{children:a.jsx(x,{overlay:!0,children:t})}),(0,a.jsxs)(z,{children:[l&&a.jsx(S,{children:l}),"function"==typeof r?r():r]})]})]})]})]})};r()}catch(e){r(e)}})},39213:(e,t,i)=>{i.a(e,async(e,r)=>{try{i.r(t),i.d(t,{default:()=>x});var a=i(20997);i(16689);var o=i(57518),n=i.n(o),l=i(28706),d=i(94307),s=i(25675),c=i.n(s),p=i(21614),h=i(67689),g=e([l,p]);[l,p]=g.then?(await g)():g;let u=n()(p.default)`
  overflow: hidden;
  aspect-ratio: 1/1;
  img {
    transform: translateX(-50%);
  }
  @media ${h.mediaQueries.md} {
    aspect-ratio: 16/7;
  }
  @media ${h.mediaQueries.sm} {
    aspect-ratio: 1/1;
    img {
      transform: translateX(-50%) translateY(-10%) scale(1.25);
    }
  }
  @media ${h.mediaQueries.xs} {
    aspect-ratio: 1/1;
    img {
      transform: translateX(-50%) translateY(10%) scale(0.9);
    }
  }
`,f=n().div`
  width: 128px;
  margin-left: auto;
  margin-right: auto;
`,b=n().div`
  width: 1.75em;
  height: 1.75em;
  border-radius: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 2.5px solid;
`,m=n().iframe`
  width: 0;
  height: 0;
  position: fixed;
  top: 100%;
  right: 100%;
  border: 0;
  background: transparent;
  opacity: 0;
`;function x({downloadUrl:e}){return(0,a.jsxs)(a.Fragment,{children:[a.jsx(m,{src:e}),a.jsx(l.Section,{contained:!0,gutterTop:!0,children:a.jsx(l.Row,{align:"center",style:{position:"relative",zIndex:1},children:a.jsx(l.Column,{width:{md:12,lg:12},children:(0,a.jsxs)(l.Stack,{gap:2,align:"center",children:[a.jsx(f,{children:a.jsx(c(),{width:128,height:128,src:"/product-icon.png",alt:"CodeEdit product icon"})}),a.jsx(d.default,{variant:"headline-elevated",children:"Thanks for downloading CodeEdit!"}),(0,a.jsxs)(d.default,{variant:"intro-elevated",color:"tertiary",gutterBottom:!0,children:["Your download will start automatically. If it didn’t,"," ",a.jsx("a",{href:e??`${config.links.githubRepo}/releases/latest`,target:"_blank",children:"download manually"}),"."]})]})})})}),a.jsx(l.Section,{contained:!0,gutterY:!0,children:(0,a.jsxs)(l.Row,{gap:!0,children:[a.jsx(l.Column,{width:{md:12,lg:4},children:a.jsx(u,{children:(0,a.jsxs)(l.Stack,{gap:!0,children:[a.jsx(b,{children:"1"}),a.jsx(d.default,{variant:"eyebrow",children:"Open CodeEdit disk image in Downloads"}),a.jsx(c(),{width:200,height:200,src:"/downloads-folder.png",alt:"Downloads folder",style:{position:"absolute",left:"50%",bottom:-50}})]})})}),a.jsx(l.Column,{width:{md:12,lg:4},children:a.jsx(u,{gap:!0,children:(0,a.jsxs)(l.Stack,{gap:!0,children:[a.jsx(b,{children:"2"}),a.jsx(d.default,{variant:"eyebrow",children:"Drag the CodeEdit icon to Applications"}),a.jsx(c(),{width:256,height:149,src:"/drag-to-applications-folder.png",alt:"Downloads folder",style:{position:"absolute",left:"50%",bottom:0}})]})})}),a.jsx(l.Column,{width:{md:12,lg:4},children:a.jsx(u,{children:(0,a.jsxs)(l.Stack,{gap:!0,children:[a.jsx(b,{children:"3"}),a.jsx(d.default,{variant:"eyebrow",children:"Add to dock, click to launch!"}),a.jsx(c(),{width:400,height:120,src:"/drag-to-dock.png",alt:"Downloads folder",style:{position:"absolute",left:"50%",bottom:0}})]})})})]})})]})}r()}catch(e){r(e)}})},72118:(e,t,i)=>{i.a(e,async(e,r)=>{try{i.r(t),i.d(t,{default:()=>o.default,getStaticProps:()=>l});var a=i(69037),o=i(39213),n=e([o]);async function l(){let e=await (0,a.fetchWithCache)("latestRelease","https://api.github.com/repos/CodeEditApp/CodeEdit/releases/latest"),t=e.assets?.filter(e=>/^CodeEdit.*\.dmg$/.test(e.name))?.[0];return{props:{versionNumber:e.tag_name,downloadUrl:t.browser_download_url},revalidate:86400}}o=(n.then?(await n)():n)[0],r()}catch(e){r(e)}})}};