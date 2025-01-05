"use strict";(()=>{var e={};e.id=1715,e.ids=[1715,2888,660,1614,9213,2118],e.modules={1323:(e,t)=>{Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},34592:(e,t,r)=>{r.a(e,async(e,i)=>{try{r.r(t),r.d(t,{config:()=>x,default:()=>p,getServerSideProps:()=>g,getStaticPaths:()=>u,getStaticProps:()=>h,reportWebVitals:()=>f,routeModule:()=>j,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>w,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>m});var a=r(87093),o=r(35244),n=r(1323),l=r(21106),s=r(2166),d=r(72118),c=e([s,d]);[s,d]=c.then?(await c)():c;let p=(0,n.l)(d,"default"),h=(0,n.l)(d,"getStaticProps"),u=(0,n.l)(d,"getStaticPaths"),g=(0,n.l)(d,"getServerSideProps"),x=(0,n.l)(d,"config"),f=(0,n.l)(d,"reportWebVitals"),m=(0,n.l)(d,"unstable_getStaticProps"),b=(0,n.l)(d,"unstable_getStaticPaths"),v=(0,n.l)(d,"unstable_getStaticParams"),y=(0,n.l)(d,"unstable_getServerProps"),w=(0,n.l)(d,"unstable_getServerSideProps"),j=new a.PagesRouteModule({definition:{kind:o.x.PAGES,page:"/download",pathname:"/download",bundlePath:"",filename:""},components:{App:s.default,Document:l.default},userland:d});i()}catch(e){i(e)}})},21614:(e,t,r)=>{r.a(e,async(e,i)=>{try{r.r(t),r.d(t,{TileViolator:()=>f,default:()=>$});var a=r(20997),o=r(16689),n=r(57518),l=r.n(n),s=r(46555),d=r(94307),c=e([s]);s=(c.then?(await c)():c)[0];let p=l().div`
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
`,u=l().div`
  margin-top: -4px;
  max-width: 655px;
`,g=l()(d.default).attrs({as:"h4"})`
    font-size: 21px;
    line-height: 1.1904761905;
    font-weight: 600;
    letter-spacing: .011em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${({overlay:e})=>e?"":"color: var(--section-accent-color);"}
`,x=l()(d.default)`
    font-size: 19px;
    line-height: 1.4211026316;
    font-weight: 600;
    letter-spacing: .012em;
    font-family: SF Pro Display,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
    ${g} + & {
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
`,j=l().span`
    position: absolute;
    width: 100%;
    height: 100%;
`,P=l().span`
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
`,k=l().div`
  margin-top: -4px;
  max-width: 655px;
  & ${g} {
    color: #fff;
  }
`,A=l().div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    height: 100%;
    align-items: center;
`,F=l().div`
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
`,$=({children:e,headline:t,copy:r,overlay:i,violator:n,overlayCopy:l,...d})=>{let c={};d.color&&(c["data-color-scheme"]="dark");let $=(0,o.useMemo)(()=>(0,s.v4)(),[]);return(0,a.jsxs)(p,{...c,...d,children:[(0,a.jsxs)(h,{children:[(t||r||n)&&(0,a.jsxs)(u,{children:[t&&a.jsx(g,{children:t}),r&&a.jsx(x,{children:r}),n&&a.jsx(f,{children:n})]}),a.jsx(m,{children:e})]}),(i||l)&&(0,a.jsxs)(a.Fragment,{children:[a.jsx(b,{type:"checkbox",id:`tile-overlay-toggle-${$}`}),(0,a.jsxs)(v,{children:[(0,a.jsxs)(y,{for:`tile-overlay-toggle-${$}`,children:[a.jsx(w,{children:a.jsx("svg",{className:"tile-icon-alt",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",children:a.jsx("path",{d:"M18.5,8.51h-7v-7A1.5,1.5,0,0,0,10,0h0A1.5,1.5,0,0,0,8.5,1.5v7h-7a1.5,1.5,0,0,0,0,3h7v7A1.5,1.5,0,0,0,10,20h0a1.5,1.5,0,0,0,1.5-1.5v-7h7a1.5,1.5,0,0,0,0-3Z"})})}),a.jsx(j,{role:"button","aria-expanded":"false","aria-controls":"content-toggle-shortcuts-app",children:a.jsx(P,{children:"Learn more"})})]}),(0,a.jsxs)(S,{children:[a.jsx(k,{children:a.jsx(g,{overlay:!0,children:t})}),(0,a.jsxs)(A,{children:[l&&a.jsx(F,{children:l}),"function"==typeof i?i():i]})]})]})]})]})};i()}catch(e){i(e)}})},39213:(e,t,r)=>{r.a(e,async(e,i)=>{try{r.r(t),r.d(t,{default:()=>g});var a=r(20997);r(16689);var o=r(57518),n=r.n(o),l=r(28706),s=r(94307),d=r(25675),c=r.n(d),p=r(21614),h=r(67689),u=e([l,p]);[l,p]=u.then?(await u)():u;let x=n()(p.default)`
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
`,m=n().div`
  width: 1.75em;
  height: 1.75em;
  border-radius: 2.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border: 2.5px solid;
`,b=n().iframe`
  width: 0;
  height: 0;
  position: fixed;
  top: 100%;
  right: 100%;
  border: 0;
  background: transparent;
  opacity: 0;
`;function g({downloadUrl:e}){return(0,a.jsxs)(a.Fragment,{children:[a.jsx(b,{src:e}),a.jsx(l.Section,{contained:!0,gutterTop:!0,children:a.jsx(l.Row,{align:"center",style:{position:"relative",zIndex:1},children:a.jsx(l.Column,{width:{md:12,lg:12},children:(0,a.jsxs)(l.Stack,{gap:2,align:"center",children:[a.jsx(f,{children:a.jsx(c(),{width:128,height:128,src:"/product-icon.png",alt:"CodeEdit product icon"})}),a.jsx(s.default,{variant:"headline-elevated",children:"Thanks for downloading CodeEdit!"}),(0,a.jsxs)(s.default,{variant:"intro-elevated",color:"tertiary",gutterBottom:!0,children:["Your download will start automatically. If it didn’t,"," ",a.jsx("a",{href:e??`${config.links.githubRepo}/releases/latest`,target:"_blank",children:"download manually"}),"."]})]})})})}),a.jsx(l.Section,{contained:!0,gutterY:!0,children:(0,a.jsxs)(l.Row,{gap:!0,children:[a.jsx(l.Column,{width:{md:12,lg:4},children:a.jsx(x,{children:(0,a.jsxs)(l.Stack,{gap:!0,children:[a.jsx(m,{children:"1"}),a.jsx(s.default,{variant:"eyebrow",children:"Open CodeEdit disk image in Downloads"}),a.jsx(c(),{width:200,height:200,src:"/downloads-folder.png",alt:"Downloads folder",style:{position:"absolute",left:"50%",bottom:-50}})]})})}),a.jsx(l.Column,{width:{md:12,lg:4},children:a.jsx(x,{gap:!0,children:(0,a.jsxs)(l.Stack,{gap:!0,children:[a.jsx(m,{children:"2"}),a.jsx(s.default,{variant:"eyebrow",children:"Drag the CodeEdit icon to Applications"}),a.jsx(c(),{width:256,height:149,src:"/drag-to-applications-folder.png",alt:"Downloads folder",style:{position:"absolute",left:"50%",bottom:0}})]})})}),a.jsx(l.Column,{width:{md:12,lg:4},children:a.jsx(x,{children:(0,a.jsxs)(l.Stack,{gap:!0,children:[a.jsx(m,{children:"3"}),a.jsx(s.default,{variant:"eyebrow",children:"Add to dock, click to launch!"}),a.jsx(c(),{width:400,height:120,src:"/drag-to-dock.png",alt:"Downloads folder",style:{position:"absolute",left:"50%",bottom:0}})]})})})]})})]})}i()}catch(e){i(e)}})},21106:(e,t,r)=>{r.r(t),r.d(t,{default:()=>l});var i=r(20997),a=r(56859),o=r.n(a),n=r(57518);class l extends o(){static async getInitialProps(e){let t=new n.ServerStyleSheet,r=e.renderPage;try{e.renderPage=()=>r({enhanceApp:e=>r=>t.collectStyles(i.jsx(e,{...r}))});let a=await o().getInitialProps(e);return{...a,styles:[(0,i.jsxs)(i.Fragment,{children:[a.styles,t.getStyleElement()]})]}}finally{t.seal()}}render(){return(0,i.jsxs)(a.Html,{children:[(0,i.jsxs)(a.Head,{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),i.jsx("link",{rel:"icon",href:"/favicon.png",type:"image/svg+xml"})]}),(0,i.jsxs)("body",{children:[i.jsx(a.Main,{}),i.jsx(a.NextScript,{})]})]})}}},72118:(e,t,r)=>{r.a(e,async(e,i)=>{try{r.r(t),r.d(t,{default:()=>o.default,getStaticProps:()=>l});var a=r(69037),o=r(39213),n=e([o]);async function l(){let e=await (0,a.fetchWithCache)("latestRelease","https://api.github.com/repos/CodeEditApp/CodeEdit/releases/latest"),t=e.assets?.filter(e=>/^CodeEdit.*\.dmg$/.test(e.name))?.[0];return{props:{versionNumber:e.tag_name,downloadUrl:t.browser_download_url},revalidate:86400}}o=(n.then?(await n)():n)[0],i()}catch(e){i(e)}})},69037:(e,t,r)=>{r.r(t),r.d(t,{fetchGitHubUser:()=>s,fetchWithCache:()=>l,getCachePath:()=>n});var i=r(79996),a=r(71017),o=r.n(a);let n=e=>{let t=`./build/cache/${e}.json`;return o().resolve(process.cwd(),t)},l=async(e,t)=>{let r=n(e);if((0,i.fileExists)(r)){let e=await (0,i.readFile)(r);return await e}{let e=await fetch(t),a=await e.json();return await (0,i.writeFile)(r,a),a}},s=async e=>{let t=`https://api.github.com/users/${e}`;return await l(`github-users/${e}`,t)}},79996:(e,t,r)=>{r.r(t),r.d(t,{fileExists:()=>s,readFile:()=>d,writeFile:()=>l});var i=r(57147),a=r.n(i),o=r(71017),n=r.n(o);let l=async(e,t)=>{let r=JSON.stringify(t);await a().mkdir(n().dirname(e),{recursive:!0},async function(t){await a().writeFile(e,r,e=>{e&&console.error(e)})})},s=e=>a().existsSync(e),d=async e=>new Promise((t,r)=>{a().readFile(e,"utf8",(e,i)=>{e&&r(e),t(JSON.parse(i))})})},35244:(e,t)=>{var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},1381:e=>{e.exports=require("lodash/throttle")},62785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},40968:e=>{e.exports=require("next/head")},580:e=>{e.exports=require("prop-types")},16689:e=>{e.exports=require("react")},66405:e=>{e.exports=require("react-dom")},99101:e=>{e.exports=require("react-feather")},20997:e=>{e.exports=require("react/jsx-runtime")},57518:e=>{e.exports=require("styled-components")},45514:e=>{e.exports=import("@emotion/is-prop-valid")},46555:e=>{e.exports=import("uuid")},57147:e=>{e.exports=require("fs")},71017:e=>{e.exports=require("path")},12781:e=>{e.exports=require("stream")},59796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),i=t.X(0,[1491,5640,6859,2166],()=>r(34592));module.exports=i})();