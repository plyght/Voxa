"use strict";exports.id=2193,exports.ids=[2193],exports.modules={22193:(e,r,o)=>{o.r(r),o.d(r,{Menu:()=>h,MenuDivider:()=>g,MenuItem:()=>v});var t=o(20997),i=o(16689),n=o.n(i),a=o(42932);o(23841);var s=o(66405),d=o.n(s),l=o(57518),p=o.n(l),c=o(67689);let x=p().div`
  min-width: 160px;
  display: flex;
  flex-direction: column;
  z-index: 9996;
  max-height: 400px;

  @media ${c.mediaQueries.sm} {
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
`,m=p().div`
  overflow-y: auto;
  width: 100%;
  background: var(--background-tertiary-color);
  border: 1px solid var(--separator-color);;
  padding: 5px;
  border-radius: 10px;
  align-items: stretch;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  box-sizing: border-box;

  @media ${c.mediaQueries.sm} {
    border: 0;
    max-height: calc(100vh - 10rem - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    border-radius: 10px 10px 0 0;
  }
`,u=p().button`
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
  @media ${c.mediaQueries.sm} {
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
`,b=p().div`
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
  @media ${c.mediaQueries.sm} {
    display: block;
  }
`,g=p().hr`
  margin: 5px;
  border: 0;
  border-top: 1px solid var(--separator-color);;
  border-left: 1px solid var(--separator-color);;
`,h=({trigger:e,children:r,placement:o="bottom-end",...s})=>{let[l,p]=(0,i.useState)(!1),[c,h]=(0,i.useState)(null),[v,f]=(0,i.useState)(null),{styles:y,attributes:k}=(0,a.usePopper)(c,v,{placement:o,strategy:"fixed",modifiers:[{name:"offset",options:{offset:[0,5]}}]}),w=e(),j=n().cloneElement(w,{ref:h,onClick:()=>p(!0),style:{...w.props.style,...l?{pointerEvents:"none"}:{}}});(0,i.useEffect)(()=>{let e=e=>{v&&!v.contains(e.target)&&p(!1)};return document.addEventListener("mousedown",e),()=>document.removeEventListener("mousedown",e)},[v]);let z=n().Children.map(r,e=>n().isValidElement(e)?n().cloneElement(e,{onCloseMenu:()=>p(!1)}):e),E=t.jsx(x,{ref:f,style:y.popper,...k.popper,...s,children:(0,t.jsxs)(m,{children:[z,(0,t.jsxs)(b,{children:[t.jsx(g,{}),t.jsx(u,{onClick:()=>p(!1),children:"Cancel"})]})]})});return(0,t.jsxs)(t.Fragment,{children:[j,l?d().createPortal(E,document.body):null]})},v=({icon:e,onClick:r,children:o,onCloseMenu:i})=>(0,t.jsxs)(u,{onClick:e=>{r?.(e),i()},children:[e&&t.jsx(e,{}),o]})}};