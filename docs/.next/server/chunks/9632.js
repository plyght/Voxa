"use strict";exports.id=9632,exports.ids=[9632],exports.modules={49632:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>m});var i=a(20997);a(16689);var n=a(57518),s=a.n(n),d=a(28706),l=a(94307),o=a(91972),c=a(22193),u=a(99101),h=a(11163),f=a(88328),x=e([d,f]);[d,f]=x.then?(await x)():x;let p=s()(d.Section)`
  text-align: center;
`,g=s()(l.default)`
  width: 75%;
  margin-left: auto;
  margin-right: auto;
`,j=s().span`
  position: relative;
  -webkit-text-fill-color: #0000;
  background: linear-gradient(120deg, #a972ff, #2997ff 50%, #43b9b9);
  -webkit-background-clip: text;
  background-clip: text;
  color: #2997ff;
  [data-color-scheme='dark'] & {
    text-shadow: 0 0 0.75em #2997ff;
  }
`;function m({releases:e}){let t=(0,h.useRouter)();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(p,{contained:!0,gutterY:12,children:[(0,i.jsxs)(l.default,{variant:"headline-elevated",as:"h1",children:["What’s ",i.jsx(j,{children:"New"})]}),(0,i.jsxs)(g,{variant:"intro-elevated",gutter:!0,children:["Learn about the latest features available for CodeEdit. For detailed information on updates in the latest released versions, visit the"," ",i.jsx("a",{href:"https://www.github.com/CodeEditApp/CodeEdit/releases",children:"CodeEdit Release Notes"}),"."]}),i.jsx(c.Menu,{placement:"bottom",trigger:()=>(0,i.jsxs)(o.default,{children:["Jump to version",i.jsx(u.ChevronDown,{})]}),children:e.map(e=>i.jsx(c.MenuItem,{onClick:()=>{t.replace(`#${e.name}`)},children:e.name},`jump-to-${e.id}`))})]}),e.map((e,t)=>i.jsx(f.default,{release:e,latest:0===t},e.id))]})}r()}catch(e){r(e)}})}};