"use strict";exports.id=5080,exports.ids=[5080],exports.modules={45080:(t,a,e)=>{e.r(a),e.d(a,{default:()=>p});var i=e(20997),o=e(25675),r=e.n(o),s=e(10535),n=e(93091),l=e(99101),h=e(57518),c=e.n(h);let m=c().div`
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
`,p=({author:t})=>{if(t)return t.blog.startsWith("http")||(t.blog=`https://${t.blog}`),i.jsx(m,{className:"about-author component",children:(0,i.jsxs)("div",{className:"component-content",children:[i.jsx("h2",{className:"about-author-headline",children:"About the Author"}),(0,i.jsxs)("div",{className:"author-container",children:[i.jsx(r(),{className:"author-image",width:"128",height:"128",src:t.avatar_url,alt:`${t.name} user image`}),(0,i.jsxs)("div",{className:"author-info",children:[i.jsx("p",{className:"author-info-title",children:t.name}),i.jsx("p",{className:"author-info-text",children:t.location}),i.jsx("p",{className:"author-info-text",children:t.bio}),(0,i.jsxs)("div",{className:"author-social",children:[i.jsx("a",{className:"author-social-link",href:t.blog,target:"_blank",children:i.jsx(l.Globe,{})}),i.jsx("a",{className:"author-social-link",href:`https://github.com/${t.login}`,target:"_blank",children:i.jsx(n.default,{})}),i.jsx("a",{className:"author-social-link",href:`https://x.com/${t.twitter_username}`,target:"_blank",children:i.jsx(s.default,{})})]})]})]})]})})}}};