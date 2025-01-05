"use strict";exports.id=5253,exports.ids=[5253,9632],exports.modules={49632:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>x});var i=a(20997);a(16689);var s=a(57518),n=a.n(s),d=a(28706),o=a(94307),l=a(91972),c=a(22193),h=a(99101),u=a(11163),p=a(88328),f=e([d,p]);[d,p]=f.then?(await f)():f;let m=n()(d.Section)`
  text-align: center;
`,g=n()(o.default)`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`,v=n().span`
  position: relative;
  -webkit-text-fill-color: #0000;
  background: linear-gradient(120deg, #a972ff, #2997ff 50%, #43b9b9);
  -webkit-background-clip: text;
  background-clip: text;
  color: #2997ff;
  [data-color-scheme='dark'] & {
    text-shadow: 0 0 0.75em #2997ff;
  }
`;function x({releases:e}){let t=(0,u.useRouter)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(m,{contained:!0,gutterY:12,children:[(0,i.jsxs)(o.default,{variant:"headline-elevated",as:"h1",children:["What’s ",i.jsx(v,{children:"New"})]}),(0,i.jsxs)(g,{variant:"intro-elevated",gutter:!0,children:["Learn about the latest features available for CodeEdit. For detailed information on updates in the latest released versions, visit the"," ",i.jsx("a",{href:"https://www.github.com/CodeEditApp/CodeEdit/releases",children:"CodeEdit Release Notes"}),"."]}),i.jsx(c.Menu,{placement:"bottom",trigger:()=>(0,i.jsxs)(l.default,{children:["Jump to version",i.jsx(h.ChevronDown,{})]}),children:e.map(e=>i.jsx(c.MenuItem,{onClick:()=>{t.replace(`#${e.name}`)},children:e.name},`jump-to-${e.id}`))})]}),e.map((e,t)=>i.jsx(p.default,{release:e,latest:0===t},e.id))]})}r()}catch(e){r(e)}})},75253:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>i.default,getStaticProps:()=>d});var i=a(49632),s=a(69037),n=e([i]);async function d(){return{props:{releases:await (0,s.fetchWithCache)("releases","https://api.github.com/repos/CodeEditApp/CodeEdit/releases")}}}i=(n.then?(await n)():n)[0],r()}catch(e){r(e)}})}};