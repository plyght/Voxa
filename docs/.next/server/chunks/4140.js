"use strict";exports.id=4140,exports.ids=[4140,3260,6005],exports.modules={53260:(e,t,i)=>{i.r(t),i.d(t,{default:()=>s});var o,n=i(16689);function a(){return(a=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(e[o]=i[o])}return e}).apply(this,arguments)}let s=function(e){return n.createElement("svg",a({xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},e),o||(o=n.createElement("path",{d:"M12 .956C5.903.956.96 5.9.96 11.996c0 5.178 3.564 9.523 8.373 10.716V15.37H7.056v-3.374h2.277v-1.453c0-3.758 1.7-5.5 5.39-5.5.7 0 1.906.137 2.4.274v3.059l-.23-.018a19.006 19.006 0 0 0-1.046-.023c-1.81 0-2.51.685-2.51 2.468v1.193h3.607l-.62 3.374h-2.986v7.586c5.466-.66 9.702-5.315 9.702-10.96C23.04 5.9 18.097.956 12 .956"})))}},14140:(e,t,i)=>{i.r(t),i.d(t,{default:()=>p});var o=i(20997),n=i(25675),a=i.n(n),s=i(36005),l=i(57518),r=i.n(l),c=i(56513);let h=r().div`
  .category.component {
    margin-top: 0;
    margin-bottom: 20px;
  }

  .category-eyebrow__category {
    text-transform: uppercase;
  }

  .category-eyebrow__category,
  .category-eyebrow__date {
    display: block;
  }

  .category-eyebrow {
    font-size: 12px;
    line-height: 1.33337;
    font-weight: 700;
    letter-spacing: -0.01em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }

  .category-eyebrow__date {
    margin-top: 4px;
  }

  .category-eyebrow__date {
    font-size: 14px;
    line-height: 1.28577;
    font-weight: 600;
    letter-spacing: -0.016em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }

  .pagetitle.component {
    margin-top: 0;
    margin-bottom: 0;
  }

  .pagetitle .hero-headline {
    font-size: 48px;
    line-height: 1.08349;
    font-weight: 700;
    letter-spacing: -0.003em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;

    @media only screen and (max-width: 1068px) {
      font-size: 40px;
      line-height: 1.1;
      letter-spacing: 0em;
    }

    @media only screen and (max-width: 734px) {
      font-size: 32px;
      line-height: 1.125;
      letter-spacing: 0.004em;;
    }
  }

  .article-subhead.component {
    font-size: 24px;
    line-height: 1.16667;
    font-weight: 500;
    letter-spacing: 0.009em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    margin-top: 20px;
    margin-bottom: 0;

    @media only screen and (max-width: 1068px) {
      font-size: 21px;
      line-height: 1.19048;
      letter-spacing: .011em;
    }
  }

  .author.component {
    margin-top: 20px;
    margin-bottom: 0;
  }

  .author-content {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .author-image {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .author-text {
    font-size: 14px;
    line-height: 1.28577;
    font-weight: 600;
    letter-spacing: -0.016em;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
  }

  @media only screen and (max-width: 734px) {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
`,p=({frontmatter:e,author:t})=>(0,o.jsxs)(h,{className:"article-header",children:[o.jsx("div",{className:"category component",children:o.jsx("div",{className:"component-content",children:(0,o.jsxs)("div",{className:"category-eyebrow",children:[o.jsx("span",{className:"category-eyebrow__category",children:c.categories[e.category??"updates"]?.title??c.categories.updates.title}),o.jsx("span",{className:"category-eyebrow__date",children:new Date(e.date).toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"})})]})})}),o.jsx("div",{className:"pagetitle component",children:o.jsx("div",{className:"component-content",children:o.jsx("h1",{className:"hero-headline",children:e.headline??e.title})})}),o.jsx("div",{className:"article-subhead component",children:o.jsx("div",{className:"component-content",children:e.subhead})}),t&&o.jsx("div",{className:"author component",children:o.jsx("div",{className:"component-content",children:(0,o.jsxs)("div",{className:"author-content",children:[o.jsx(a(),{width:"24",height:"24",className:"author-image",src:t.avatar_url,alt:`${t.name} user image`}),o.jsx("span",{className:"author-text",children:t.name})]})})}),o.jsx(s.default,{})]})},36005:(e,t,i)=>{i.r(t),i.d(t,{default:()=>p});var o=i(20997),n=i(16689),a=i(10535),s=i(53260),l=i(99101),r=i(57518),c=i.n(r);let h=c().div`
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
`,p=()=>{let e=(0,n.useRef)();return o.jsx(h,{className:"sharesheet component",children:o.jsx("div",{className:"component-content",children:(0,o.jsxs)("div",{className:"sharesheet-content tooltip-wrapper",children:[(0,o.jsxs)("ul",{className:"sharesheet-options",children:[o.jsx("li",{className:"social-option",children:o.jsx("button",{className:"icon icon-facebook social-icon",title:"Share via Facebook","aria-label":"Share this article via Facebook (opens in new window)",onClick:()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`),children:o.jsx(s.default,{})})}),o.jsx("li",{className:"social-option",children:o.jsx("button",{className:"icon icon-twitter social-icon",title:"Share via Twitter","aria-label":"Share this article via Twitter (opens in new window)",onClick:()=>window.open(`https://x.com/intent/tweet?url=${window.location.href}`),children:o.jsx(a.default,{})})}),o.jsx("li",{className:"social-option",children:o.jsx("button",{className:"icon icon-mail social-icon",title:"Share via mail","aria-label":"Share this article via Mail (opens in new window)",onClick:()=>{var e=window.location.href,t="mailto:?subject=";t+=encodeURIComponent("CodeEdit Blog Post")+"&body="+encodeURIComponent(e),window.open(t)},children:o.jsx(l.Mail,{})})}),o.jsx("li",{className:"social-option",children:o.jsx("button",{className:"icon icon-link social-icon",title:"Share via link","aria-label":"Share via link",onClick:function(){navigator.clipboard.writeText(window.location.href).then(function(e){console.log("Copying to clipboard was successful!",e)},function(e){console.log("Could not copy text: ",e)})},children:o.jsx(l.Link,{})})})]}),o.jsx("div",{className:"sharesheet-link-container","aria-hidden":"true",children:(0,o.jsxs)("div",{className:"sharesheet-link-content",children:[o.jsx("input",{ref:e,className:"link-text",value:"",tabindex:"-1",readonly:"","aria-hidden":"true",disabled:"disabled"}),o.jsx("button",{className:"icon icon-close sharesheet-link-close",title:"close","aria-label":"close link",tabindex:"-1","aria-hidden":"true",role:"button"})]})})]})})})}}};