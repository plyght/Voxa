"use strict";exports.id=6005,exports.ids=[6005,3260],exports.modules={53260:(e,i,o)=>{o.r(i),o.d(i,{default:()=>s});var t,n=o(16689);function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var i=1;i<arguments.length;i++){var o=arguments[i];for(var t in o)Object.prototype.hasOwnProperty.call(o,t)&&(e[t]=o[t])}return e}).apply(this,arguments)}let s=function(e){return n.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},e),t||(t=n.createElement("path",{d:"M12 .956C5.903.956.96 5.9.96 11.996c0 5.178 3.564 9.523 8.373 10.716V15.37H7.056v-3.374h2.277v-1.453c0-3.758 1.7-5.5 5.39-5.5.7 0 1.906.137 2.4.274v3.059l-.23-.018a19.006 19.006 0 0 0-1.046-.023c-1.81 0-2.51.685-2.51 2.468v1.193h3.607l-.62 3.374h-2.986v7.586c5.466-.66 9.702-5.315 9.702-10.96C23.04 5.9 18.097.956 12 .956"})))}},36005:(e,i,o)=>{o.r(i),o.d(i,{default:()=>p});var t=o(20997),n=o(16689),a=o(10535),s=o(53260),l=o(99101),c=o(57518),r=o.n(c);let h=r().div`
  &.component {
    margin-top: 32px;
    margin-bottom: 40px;
  }

  button {
    background: none;
    border: 0;
    box-sizing: content-box;
    color: inherit;
    cursor: pointer;
    font: inherit;
    line-height: inherit;
    overflow: visible;
    vertical-align: inherit;
  }

  .sharesheet-options {
    display: inline-flex;
    justify-content: flex-start;
    height: 71px;
  }

  .sharesheet-options,
  .headersplitview .sharesheet-options {
    height: 42px;
    overflow: visible;
  }

   .social-option {
    position: relative;
    z-index: 2;
    list-style: none;
    opacity: 1;
    display: block;
    opacity: 0.5;
    transition: opacity 0.3s cubic-bezier(0.4, 0, 0.25, 1) 0ms;
    &:hover {
      opacity: 1;
    }
  }

  .sharesheet-options .social-option {
    margin-top: 12px;
  }

   .social-option:first-child .social-icon {
    margin-left: -8px;
  }

   .social-option .social-icon {
    font-size: 24px;
    line-height: 24px;
    width: 24px;
    height: 24px;
    padding: 6px;
    margin-top: -6px;
    margin-bottom: -6px;
    svg {
      width: 18px;
      height: 18px;
    }
  }

  .social-option:first-child .social-icon {
    margin-left: -8px;
  }

  .sharesheet-options .social-option:first-child .social-icon {
    margin-left: -8px;
  }

  .sharesheet-options-open,
  .sharesheet-options-close {
    line-height: 1em;
    padding: 0;
  }

  .sharesheet-options-close,
  .sharesheet-options-open {
    display: none;
  }

  .sharesheet-link-container {
    display: inline-block;
    vertical-align: middle;
    margin: 0;
    overflow: hidden;
  }

  .sharesheet-link-container {
    position: absolute;
    left: 0;
    width: 100%;
    height: 1px;
    opacity: 0.01;
    background-color: #f5f5f7;
    white-space: normal;
    text-align: left;
    top: 100%;
    z-index: -1;
  }
`,p=()=>{let e=(0,n.useRef)();return t.jsx(h,{className:"sharesheet component",children:t.jsx("div",{className:"component-content",children:(0,t.jsxs)("div",{className:"sharesheet-content tooltip-wrapper",children:[(0,t.jsxs)("ul",{className:"sharesheet-options",children:[t.jsx("li",{className:"social-option",children:t.jsx("button",{className:"icon icon-facebook social-icon",title:"Share via Facebook","aria-label":"Share this article via Facebook (opens in new window)",onClick:()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`),children:t.jsx(s.default,{})})}),t.jsx("li",{className:"social-option",children:t.jsx("button",{className:"icon icon-twitter social-icon",title:"Share via Twitter","aria-label":"Share this article via Twitter (opens in new window)",onClick:()=>window.open(`https://x.com/intent/tweet?url=${window.location.href}`),children:t.jsx(a.default,{})})}),t.jsx("li",{className:"social-option",children:t.jsx("button",{className:"icon icon-mail social-icon",title:"Share via mail","aria-label":"Share this article via Mail (opens in new window)",onClick:()=>{var e=window.location.href,i="mailto:?subject=";i+=encodeURIComponent("CodeEdit Blog Post")+"&body="+encodeURIComponent(e),window.open(i)},children:t.jsx(l.Mail,{})})}),t.jsx("li",{className:"social-option",children:t.jsx("button",{className:"icon icon-link social-icon",title:"Share via link","aria-label":"Share via link",onClick:function(){navigator.clipboard.writeText(window.location.href).then(function(e){console.log("Copying to clipboard was successful!",e)},function(e){console.log("Could not copy text: ",e)})},children:t.jsx(l.Link,{})})})]}),t.jsx("div",{className:"sharesheet-link-container","aria-hidden":"true",children:(0,t.jsxs)("div",{className:"sharesheet-link-content",children:[t.jsx("input",{ref:e,className:"link-text",value:"",tabindex:"-1",readonly:"","aria-hidden":"true",disabled:"disabled"}),t.jsx("button",{className:"icon icon-close sharesheet-link-close",title:"close","aria-label":"close link",tabindex:"-1","aria-hidden":"true",role:"button"})]})})]})})})}}};