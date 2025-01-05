"use strict";exports.id=2473,exports.ids=[2473,3260,5080,4140,6005],exports.modules={53260:(e,t,i)=>{i.r(t),i.d(t,{default:()=>s});var a,o=i(16689);function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e}).apply(this,arguments)}let s=function(e){return o.createElement("svg",n({xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 24 24"},e),a||(a=o.createElement("path",{d:"M12 .956C5.903.956.96 5.9.96 11.996c0 5.178 3.564 9.523 8.373 10.716V15.37H7.056v-3.374h2.277v-1.453c0-3.758 1.7-5.5 5.39-5.5.7 0 1.906.137 2.4.274v3.059l-.23-.018a19.006 19.006 0 0 0-1.046-.023c-1.81 0-2.51.685-2.51 2.468v1.193h3.607l-.62 3.374h-2.986v7.586c5.466-.66 9.702-5.315 9.702-10.96C23.04 5.9 18.097.956 12 .956"})))}},45080:(e,t,i)=>{i.r(t),i.d(t,{default:()=>d});var a=i(20997),o=i(25675),n=i.n(o),s=i(10535),r=i(93091),l=i(99101),c=i(57518),h=i.n(c);let p=h().div`
  .component-content {
    border-top: 1px solid var(--separator-color);
    padding-top: 52px;
    .author-container {
      display: flex;
      gap: 1.1579em;
      margin-top: 1.4211em;
    }
    img.author-image {
      width: 96px;
      height: 96px;
      border-radius: 50%;
    }
    .author-info {
      font-size: 14px;
      line-height: 1.42859;
      font-weight: 500;
      letter-spacing: -0.016em;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
      box-sizing: border-box;
      word-wrap: break-word;
      display: inline-block;
      vertical-align: top;
    }
    .author-info-title {
      font-size: 19px;
      line-height: 1.21053;
      font-weight: 700;
      letter-spacing: 0.012em;
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
      margin-bottom: 3px;
    }
    .author-info-name {
      margin-bottom: 3px;
    }
    .author-info-location {
      margin-top: -2px;
      margin-bottom: 3px;
      opacity: 0.65;
    }
    .author-info-bio {
      margin-bottom: 3px;
    }
    .author-social {
      margin-top: 12px;
      .author-social-link {
        margin-right: 16px;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }

  @media only screen and (max-width: 734px) {
    margin-left: auto;
    margin-right: auto;
    width: 87.5%;
  }
`,d=({author:e})=>{if(e)return e.blog.startsWith("http")||(e.blog=`https://${e.blog}`),a.jsx(p,{className:"about-author component",children:(0,a.jsxs)("div",{className:"component-content",children:[a.jsx("h2",{className:"about-author-headline",children:"About the Author"}),(0,a.jsxs)("div",{className:"author-container",children:[a.jsx(n(),{className:"author-image",width:"128",height:"128",src:e.avatar_url,alt:`${e.name} user image`}),(0,a.jsxs)("div",{className:"author-info",children:[a.jsx("p",{className:"author-info-title",children:e.name}),a.jsx("p",{className:"author-info-text",children:e.location}),a.jsx("p",{className:"author-info-text",children:e.bio}),(0,a.jsxs)("div",{className:"author-social",children:[a.jsx("a",{className:"author-social-link",href:e.blog,target:"_blank",children:a.jsx(l.Globe,{})}),a.jsx("a",{className:"author-social-link",href:`https://github.com/${e.login}`,target:"_blank",children:a.jsx(r.default,{})}),a.jsx("a",{className:"author-social-link",href:`https://x.com/${e.twitter_username}`,target:"_blank",children:a.jsx(s.default,{})})]})]})]})]})})}},14140:(e,t,i)=>{i.r(t),i.d(t,{default:()=>p});var a=i(20997),o=i(25675),n=i.n(o),s=i(36005),r=i(57518),l=i.n(r),c=i(56513);let h=l().div`
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
`,p=({frontmatter:e,author:t})=>(0,a.jsxs)(h,{className:"article-header",children:[a.jsx("div",{className:"category component",children:a.jsx("div",{className:"component-content",children:(0,a.jsxs)("div",{className:"category-eyebrow",children:[a.jsx("span",{className:"category-eyebrow__category",children:c.categories[e.category??"updates"]?.title??c.categories.updates.title}),a.jsx("span",{className:"category-eyebrow__date",children:new Date(e.date).toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"})})]})})}),a.jsx("div",{className:"pagetitle component",children:a.jsx("div",{className:"component-content",children:a.jsx("h1",{className:"hero-headline",children:e.headline??e.title})})}),a.jsx("div",{className:"article-subhead component",children:a.jsx("div",{className:"component-content",children:e.subhead})}),t&&a.jsx("div",{className:"author component",children:a.jsx("div",{className:"component-content",children:(0,a.jsxs)("div",{className:"author-content",children:[a.jsx(n(),{width:"24",height:"24",className:"author-image",src:t.avatar_url,alt:`${t.name} user image`}),a.jsx("span",{className:"author-text",children:t.name})]})})}),a.jsx(s.default,{})]})},36005:(e,t,i)=>{i.r(t),i.d(t,{default:()=>p});var a=i(20997),o=i(16689),n=i(10535),s=i(53260),r=i(99101),l=i(57518),c=i.n(l);let h=c().div`
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
`,p=()=>{let e=(0,o.useRef)();return a.jsx(h,{className:"sharesheet component",children:a.jsx("div",{className:"component-content",children:(0,a.jsxs)("div",{className:"sharesheet-content tooltip-wrapper",children:[(0,a.jsxs)("ul",{className:"sharesheet-options",children:[a.jsx("li",{className:"social-option",children:a.jsx("button",{className:"icon icon-facebook social-icon",title:"Share via Facebook","aria-label":"Share this article via Facebook (opens in new window)",onClick:()=>window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`),children:a.jsx(s.default,{})})}),a.jsx("li",{className:"social-option",children:a.jsx("button",{className:"icon icon-twitter social-icon",title:"Share via Twitter","aria-label":"Share this article via Twitter (opens in new window)",onClick:()=>window.open(`https://x.com/intent/tweet?url=${window.location.href}`),children:a.jsx(n.default,{})})}),a.jsx("li",{className:"social-option",children:a.jsx("button",{className:"icon icon-mail social-icon",title:"Share via mail","aria-label":"Share this article via Mail (opens in new window)",onClick:()=>{var e=window.location.href,t="mailto:?subject=";t+=encodeURIComponent("CodeEdit Blog Post")+"&body="+encodeURIComponent(e),window.open(t)},children:a.jsx(r.Mail,{})})}),a.jsx("li",{className:"social-option",children:a.jsx("button",{className:"icon icon-link social-icon",title:"Share via link","aria-label":"Share via link",onClick:function(){navigator.clipboard.writeText(window.location.href).then(function(e){console.log("Copying to clipboard was successful!",e)},function(e){console.log("Could not copy text: ",e)})},children:a.jsx(r.Link,{})})})]}),a.jsx("div",{className:"sharesheet-link-container","aria-hidden":"true",children:(0,a.jsxs)("div",{className:"sharesheet-link-content",children:[a.jsx("input",{ref:e,className:"link-text",value:"",tabindex:"-1",readonly:"","aria-hidden":"true",disabled:"disabled"}),a.jsx("button",{className:"icon icon-close sharesheet-link-close",title:"close","aria-label":"close link",tabindex:"-1","aria-hidden":"true",role:"button"})]})})]})})})}},32473:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.r(t),i.d(t,{default:()=>f});var o=i(20997),n=i(40968),s=i.n(n),r=i(57518),l=i.n(r),c=i(56513),h=i(28706),p=i(61190),d=i(14140),m=i(36005),x=i(45080),g=e([h,p]);[h,p]=g.then?(await g)():g;let u=l().article`
  overflow: hidden;
  padding: 64px 0;

  .component {
    margin-left: auto;
    margin-right: auto;
    max-width: 980px;
  }

  .component-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 653px;

    @media only screen and (max-width: 1068px) {
      max-width: 576px;
    }
  }

  @media only screen and (max-width: 734px) {
    .pagebody + .sharesheet,
    .about-author,
    .article-header {
      margin-left: auto;
      margin-right: auto;
      width: 87.5%;
    }
  }
`,f=({frontmatter:e,markdownBody:t,author:i})=>{let a=`${e.title??e.headline} | ${c.title} Blog`,n=e.description??e.subhead;return(0,o.jsxs)(h.Section,{gutter:!1,children:[(0,o.jsxs)(s(),{children:[o.jsx("title",{children:a}),o.jsx("meta",{property:"og:title",content:a}),o.jsx("meta",{name:"description",content:n}),o.jsx("meta",{property:"og:description",content:n}),o.jsx("meta",{property:"og:image",content:e.image??`${c.host}}/social-preview.jpg`}),!!e.draft&&o.jsx("meta",{name:"robots",content:"noindex,nofollow"}),o.jsx("meta",{name:"twitter:creator",content:e.authorTwitter??c.twitter})]}),(0,o.jsxs)(u,{children:[o.jsx(d.default,{frontmatter:e,author:i}),o.jsx(p.default,{className:"pagebody component",children:t}),o.jsx(m.default,{}),i&&o.jsx(x.default,{author:i})]})]})};a()}catch(e){a(e)}})}};