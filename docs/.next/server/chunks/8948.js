"use strict";exports.id=8948,exports.ids=[8948,1226],exports.modules={31226:(t,e,a)=>{a.a(t,async(t,i)=>{try{a.r(e),a.d(e,{default:()=>h});var s=a(20997),n=a(57518),d=a.n(n),r=a(61190),o=a(40968),l=a.n(o),c=t([r]);r=(c.then?(await c)():c)[0];let p=d()(r.default)`
  img:first-child {
    display: none;
  }
  padding: 10px;
  img {
    width: 100%;
  }
  p,
  ul,
  ol,
  li {
    font-size: 14px;
  }

  h2 {
    font-size: 24px;
  }
  & img,
  & video,
  & iframe {
    margin-bottom: 10px;
  }

  & > * {
    max-width: 100%;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`,h=({release:t})=>t?(0,s.jsxs)(s.Fragment,{children:[s.jsx(l(),{children:s.jsx("meta",{name:"robots",content:"noindex"})}),s.jsx(p,{children:t.body})]}):s.jsx("div",{children:"No Release Found"});i()}catch(t){i(t)}})},28948:(t,e,a)=>{a.a(t,async(t,i)=>{try{a.r(e),a.d(e,{default:()=>s.default,getStaticPaths:()=>o,getStaticProps:()=>r});var s=a(31226),n=a(69037),d=t([s]);async function r({params:t}){let{tag:e}=t;return{props:{release:(await (0,n.fetchWithCache)("releases","https://api.github.com/repos/CodeEditApp/CodeEdit/releases")).find(t=>t.tag_name===e)||null}}}async function o(){return{paths:(await (0,n.fetchWithCache)("releases","https://api.github.com/repos/CodeEditApp/CodeEdit/releases")).map(t=>({params:{tag:t.tag_name}})),fallback:!1}}s=(d.then?(await d)():d)[0],i()}catch(t){i(t)}})}};