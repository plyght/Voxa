"use strict";exports.id=4e3,exports.ids=[4e3],exports.modules={64e3:(r,o,e)=>{e.r(o),e.d(o,{default:()=>b});var n=e(20997);e(16689);var i=e(57518),t=e.n(i);let s=i.keyframes`
  0% {
      transform: translateY(-100%);
  }
  100% {
      transform: translateY(0);
  }
`,a=t().div`
  --ribbon-background-color: #0071e3;
  --ribbon-text-color: #fff;
  --ribbon-link-color: #fff;
  --ribbon-focus-color: rgba(255,255,255,0.6);
  overflow: hidden;
  ${({onClick:r})=>r?"cursor: pointer;":""}
`,l=t().div`
  animation: ${s} 0.8s cubic-bezier(0.42, 0, 0.58, 1) forwards;
`,c=t().div`
  background-color: var(--ribbon-background-color);
  padding-top: 0.94118em;
  padding-bottom: 0.94118em;
  text-align: center;
`,d=t().div`
  color: var(--ribbon-text-color);
  font-size: 14px;
  line-height: 1.42859;
  font-weight: 400;
  letter-spacing: -.016em;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
`,b=function({children:r,onClick:o,...e}){return n.jsx(a,{onClick:o,...e,children:n.jsx(l,{children:n.jsx(c,{children:n.jsx(d,{children:r})})})})}}};