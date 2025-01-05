(()=>{var e={};e.id=9195,e.ids=[9195,2888,660],e.modules={1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,s){return s in t?t[s]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,s)):"function"==typeof t&&"default"===s?t:void 0}}})},87230:(e,t,s)=>{"use strict";s.a(e,async(e,o)=>{try{s.r(t),s.d(t,{config:()=>h,default:()=>m,getServerSideProps:()=>d,getStaticPaths:()=>g,getStaticProps:()=>u,reportWebVitals:()=>x,routeModule:()=>v,unstable_getServerProps:()=>f,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>w,unstable_getStaticPaths:()=>y,unstable_getStaticProps:()=>b});var i=s(87093),r=s(35244),n=s(1323),a=s(21106),p=s(2166),c=s(89819),l=e([p,c]);[p,c]=l.then?(await l)():l;let m=(0,n.l)(c,"default"),u=(0,n.l)(c,"getStaticProps"),g=(0,n.l)(c,"getStaticPaths"),d=(0,n.l)(c,"getServerSideProps"),h=(0,n.l)(c,"config"),x=(0,n.l)(c,"reportWebVitals"),b=(0,n.l)(c,"unstable_getStaticProps"),y=(0,n.l)(c,"unstable_getStaticPaths"),w=(0,n.l)(c,"unstable_getStaticParams"),f=(0,n.l)(c,"unstable_getServerProps"),j=(0,n.l)(c,"unstable_getServerSideProps"),v=new i.PagesRouteModule({definition:{kind:r.x.PAGES,page:"/blog",pathname:"/blog",bundlePath:"",filename:""},components:{App:p.default,Document:a.default},userland:c});o()}catch(e){o(e)}})},55718:(e,t,s)=>{"use strict";s.a(e,async(e,o)=>{try{s.r(t),s.d(t,{default:()=>h});var i=s(20997),r=s(28706),n=s(94307),a=s(67689),p=s(25675),c=s.n(p),l=s(41664),m=s.n(l),u=s(57518),g=s.n(u),d=e([r]);r=(d.then?(await d)():d)[0];let x=g().ul`
  align-items: stretch;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  margin: 0;
`,b=g().li`
  position: relative;
  list-style: none;

  &.item-1up,
  &.item-hero,
  &.item-hero-reversed,
  &.item-hero-secondary,
  &.item-hero-highlight,
  &.item-hero-highlight-secondary,
  &.item-portrait,
  &.item-portrait-secondary,
  &.item-super-hero,
  &.item-super-hero-secondary {
    flex-basis: 100%;
  }

  &:first-child {
    &.item,
    &.item-1up,
    &.item-hero,
    &.item-hero-reversed,
    &.item-hero-secondary,
    &.item-hero-highlight,
    &.item-hero-highlight-secondary,
    &.item-super-hero,
    &.item-super-hero-secondary,
    &.item-portrait,
    &.item-portrait-secondary {
      & ~ .tile-item {
        margin-top: 36px;
        @media ${a.mediaQueries.md} {
          margin-top: 22px;
        }
      }
    }
  }
`,y=g()(m())`
  --tile-background-color: var(--background-tertiary-color);
  --tile-color: var(--label-primary-color);
  background-color: var(--tile-background-color);
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  z-index: 0;
  position: relative;

  height: 100%;

  cursor: pointer;

  &.tile-1up {
    width: 100%;
    @media ${a.mediaQueries.sm} {
      flex-direction: column;
    }
  }

  &.tile-1up.tile-quick-read {
    padding: 58px;
    align-items: center;
    box-sizing: border-box;
    display: flex;
  }
  &.tile-hero {
    flex-direction: row;
    width: 100%;
  }
  &.tile-hero-reversed {
    flex-direction: row-reverse;
    width: 100%;
  }
  &.tile-hero-secondary {
    flex-direction: row;
    width: 100%;
  }
  &.tile-hero-highlight {
    display: block;
    justify-content: flex-end;
    position: relative;
  }
  &.tile-hero-highlight-secondary {
    @media only screen and (min-width: 1069px) {
      display: block;
      justify-content: flex-end;
      position: relative;
    }
  }
  &.tile-super-hero {
    flex-direction: column;
    width: 100%;
  }
  &.tile-super-hero-secondary {
    flex-direction: column;
    width: 100%;
  }
  &.tile-portrait {
    flex-direction: row;
    width: 100%;
  }
  &.tile-portrait-secondary {
    flex-direction: row;
    width: 100%;
  }
  &.tile-2up {
    flex-direction: column;
    width: 472px;
    @media ${a.mediaQueries.md} {
      width: 333px;
    }
    @media ${a.mediaQueries.sm} {
      width: 100%;
    }
  }
  &.tile-3up {
    flex-direction: column;
    width: 303px;
    @media ${a.mediaQueries.md} {
      width: 333px;
    }
    @media ${a.mediaQueries.sm} {
      width: 100%;
    }
  }
`,w=g().div`
  position: relative;
  z-index: 0;
  flex-grow: 0;
  flex-shrink: 0;
  overflow: hidden;

  .tile-1up & {
    width: 100%;
    height: auto;
    min-height: 362px;
    flex-basis: 643px;
    flex-shrink: 1;
    @media ${a.mediaQueries.md} {
      width: 100%;
      height: auto;
      min-height: 255px;
      flex-basis: 453px;
      flex-shrink: 1;
    }
    @media ${a.mediaQueries.sm} {
      flex-basis: auto;
      min-height: 0;
      aspect-ratio: 16/9;
    }
  }

  .tile-2up & {
    width: 100%;
    height: 266px;
    min-height: auto;
    flex-basis: auto;
    flex-shrink: 1;
    @media ${a.mediaQueries.md} {
      width: 100%;
      height: 187px;
      min-height: auto;
      flex-basis: auto;
      flex-shrink: 1;
    }
  }

  .tile-3up & {
    width: 100%;
    height: 170px;
    min-height: auto;
    flex-basis: auto;
    flex-shrink: 1;
  }
`,f=g()(c())`
  /* background-image: url(${({src:e})=>e});
  background-size: cover;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0; */
  transition: transform 400ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  width: 100%;
  height: 100%;
  object-fit: cover;

  .tile:hover & {
    transform: scale(1.03);
  }
`,j=g().div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  flex-grow: 1;

  .tile-1up & {
    padding: 32px;
    justify-content: space-between;
    flex-basis: 0;
    @media ${a.mediaQueries.md} {
      padding: 24px;
    }
    @media ${a.mediaQueries.sm} {
      padding: 24px;
    }
  }

  .tile-2up & {
    padding: 32px;
    justify-content: space-between;
    flex-basis: auto;
    @media ${a.mediaQueries.md} {
      padding: 24px;
    }
    @media ${a.mediaQueries.sm} {
      padding: 19px;
    }
  }

  .tile-3up & {
    padding: 24px;
    justify-content: space-between;
    flex-basis: auto;
    @media ${a.mediaQueries.sm} {
      padding: 19px;
    }
  }
`,v=g().div``,_=g().div`
  color: var(--label-tertiary-color);
  font-size: 12px;
  line-height: 1.33337;
  font-weight: 700;
  letter-spacing: -0.01em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  text-transform: uppercase;
  margin-bottom: 8px;

  .tile-1up & {
    margin-bottom: 8px;
    @media ${a.mediaQueries.md} {
      margin-bottom: 8px;
    }
  }
  .tile-2up & {
    margin-bottom: 8px;
    @media ${a.mediaQueries.md} {
      margin-bottom: 8px;
    }
  }
  .tile-3up & {
    margin-bottom: 8px;
  }
`,k=g().div`
  color: var(--label-primary-color);
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  overflow: hidden;

  .tile-1up & {
    font-size: 32px;
    line-height: 1.125;
    font-weight: 700;
    letter-spacing: 0.004em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    @media ${a.mediaQueries.md} {
      font-size: 21px;
      line-height: 1.19048;
      font-weight: 700;
      letter-spacing: 0.011em;
      font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
    }
    @media ${a.mediaQueries.sm} {
      font-size: 24px;
    }
  }

  .tile-2up & {
    font-size: 24px;
    line-height: 1.16667;
    font-weight: 700;
    letter-spacing: 0.009em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
    @media ${a.mediaQueries.md} {
      font-size: 19px;
      line-height: 1.21053;
      font-weight: 700;
      letter-spacing: 0.012em;
      font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue',
        'Helvetica', 'Arial', sans-serif;
    }
  }

  .tile-3up & {
    font-size: 19px;
    line-height: 1.21053;
    font-weight: 700;
    letter-spacing: 0.012em;
    font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
      'Arial', sans-serif;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    overflow: hidden;
  }
`,S=g().div`
  color: var(--label-tertiary-color);
  font-size: 14px;
  line-height: 1.28577;
  font-weight: 600;
  letter-spacing: -0.016em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .tile-quick-read.tile-1up & {
    margin-top: 16px;
    @media ${a.mediaQueries.md} {
      margin-top: 12px;
    }
  }
  .tile-1up & {
    margin-top: 12px;
    @media ${a.mediaQueries.md} {
      margin-top: 12px;
    }
  }
  .tile-2up & {
    margin-top: 12px;
    @media ${a.mediaQueries.md} {
      margin-top: 8px;
    }
  }
  .tile-3up & {
    margin-top: 8px;
  }
`,P=g().div`
  display: flex;
  justify-content: center;
`,q=g().button`
  border-radius: 30px;
  display: inline-block;
  transition:
    background-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    border-color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms,
    color 300ms cubic-bezier(0.4, 0, 0.25, 1) 0ms;
  font-size: 17px;
  line-height: 1.23536;
  font-weight: 600;
  letter-spacing: -0.022em;
  font-family: 'SF Pro Text', 'SF Pro Icons', 'Helvetica Neue', 'Helvetica',
    'Arial', sans-serif;
  border: 2px solid var(--label-primary-color);
  padding: 10px 24px 9px;
  border-color: var(--label-primary-color);
  color: var(--label-primary-color);
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: var(--fill);
    border-color: var(--label-primary-color);
    background-color: var(--label-primary-color);
  }
`,A=[1,2,2,2,2,3,3,3,3,3,3],F=e=>`${A[e]??3}up`;function h({posts:e}){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(r.Section,{contained:!0,gutterY:!0,variant:"secondary",children:[i.jsx(n.default,{variant:"section-head",as:"h2",children:"Latest News"}),i.jsx(x,{children:e.map((e,t)=>{let s=F(t);return i.jsx(b,{className:`tile-item item item-${s}`,children:i.jsx(H,{post:e,impositionLayout:s})},e.date+e.slug)})})]}),e.length>11&&i.jsx(r.Section,{contained:!0,gutterBottom:!0,children:i.jsx(P,{children:i.jsx(m(),{href:"/blog/archive/",children:i.jsx(q,{children:"View Archive"})})})})]})}let H=({post:e,impositionLayout:t})=>{var s;return(0,i.jsxs)(y,{href:e.url,className:`tile tile-${t}`,children:[i.jsx(w,{children:i.jsx(f,{width:"643",height:"362",src:e.image,alt:"Post Image"})}),(0,i.jsxs)(j,{children:[(0,i.jsxs)(v,{children:[i.jsx(_,{children:e.category}),i.jsx(k,{children:e.title})]}),e.date&&i.jsx(S,{children:(s=e.date,new Date(s).toLocaleDateString("en-us",{year:"numeric",month:"long",day:"numeric",timeZone:"UTC"}))})]})]})};o()}catch(e){o(e)}})},21106:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>a});var o=s(20997),i=s(56859),r=s.n(i),n=s(57518);class a extends r(){static async getInitialProps(e){let t=new n.ServerStyleSheet,s=e.renderPage;try{e.renderPage=()=>s({enhanceApp:e=>s=>t.collectStyles(o.jsx(e,{...s}))});let i=await r().getInitialProps(e);return{...i,styles:[(0,o.jsxs)(o.Fragment,{children:[i.styles,t.getStyleElement()]})]}}finally{t.seal()}}render(){return(0,o.jsxs)(i.Html,{children:[(0,o.jsxs)(i.Head,{children:[o.jsx("meta",{charSet:"utf-8"}),o.jsx("meta",{name:"apple-mobile-web-app-capable",content:"yes"}),o.jsx("link",{rel:"icon",href:"/favicon.png",type:"image/svg+xml"})]}),(0,o.jsxs)("body",{children:[o.jsx(i.Main,{}),o.jsx(i.NextScript,{})]})]})}}},89819:(e,t,s)=>{"use strict";s.a(e,async(e,o)=>{try{s.r(t),s.d(t,{default:()=>r.default,getStaticProps:()=>a});var i=s(77570),r=s(55718),n=e([r]);async function a(){let e=await Promise.resolve().then(s.t.bind(s,56513,19)),t=await (0,i.default)();return{props:{siteTitle:e.title,posts:t}}}r=(n.then?(await n)():n)[0],o()}catch(e){o(e)}})},69037:(e,t,s)=>{"use strict";s.r(t),s.d(t,{fetchGitHubUser:()=>p,fetchWithCache:()=>a,getCachePath:()=>n});var o=s(79996),i=s(71017),r=s.n(i);let n=e=>{let t=`./build/cache/${e}.json`;return r().resolve(process.cwd(),t)},a=async(e,t)=>{let s=n(e);if((0,o.fileExists)(s)){let e=await (0,o.readFile)(s);return await e}{let e=await fetch(t),i=await e.json();return await (0,o.writeFile)(s,i),i}},p=async e=>{let t=`https://api.github.com/users/${e}`;return await a(`github-users/${e}`,t)}},79996:(e,t,s)=>{"use strict";s.r(t),s.d(t,{fileExists:()=>p,readFile:()=>c,writeFile:()=>a});var o=s(57147),i=s.n(o),r=s(71017),n=s.n(r);let a=async(e,t)=>{let s=JSON.stringify(t);await i().mkdir(n().dirname(e),{recursive:!0},async function(t){await i().writeFile(e,s,e=>{e&&console.error(e)})})},p=e=>i().existsSync(e),c=async e=>new Promise((t,s)=>{i().readFile(e,"utf8",(e,o)=>{e&&s(e),t(JSON.parse(o))})})},77570:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>c});var o=s(98076),i=s.n(o),r=s(54230),n=s.n(r),a=s(69037);let p=e=>new Date(e).toISOString(),c=async()=>{let e=n().sync("data/blog/**/*.md");return(await Promise.all(e.map(async e=>{let t=e.slice(4,-3),o=await s(27583)(`./${e}`),r=i()(o.default).data,n=r.author?await (0,a.fetchGitHubUser)(r.author):null,c=e.split("/"),l=c[c.length-1];return{...r,date:p(r.date),slug:l,url:t,path:e,author:n}}))).filter(({draft:e})=>!e).sort((e,t)=>new Date(e.date)<new Date(t.date)?1:-1)}},35244:(e,t)=>{"use strict";var s;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return s}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(s||(s={}))},27583:(e,t,s)=>{var o={"./CNAME":[91813,7,1813],"./assets/discord-icon.svg":[72933,9],"./assets/facebook-icon.svg":[53260,9,3260],"./assets/github-icon.svg":[93091,9],"./assets/twitter-icon.svg":[43470,9,3470],"./assets/x-icon.svg":[10535,9],"./bun.lockb":[95034,7,5034],"./components/common/Button":[91972,9],"./components/common/Button.jsx":[91972,9],"./components/common/ColorSchemeToggle":[5464,9],"./components/common/ColorSchemeToggle.jsx":[5464,9],"./components/common/Footer":[86443,9],"./components/common/Footer.jsx":[86443,9],"./components/common/Header":[59996,9],"./components/common/Header.jsx":[59996,9],"./components/common/IconButton":[49963,9,9963],"./components/common/IconButton.jsx":[49963,9,9963],"./components/common/Markdown":[61190,9,1190],"./components/common/Markdown/":[61190,9,1190],"./components/common/Markdown/Markdown.styles":[86981,9,6981],"./components/common/Markdown/Markdown.styles.js":[86981,9,6981],"./components/common/Markdown/index":[61190,9,1190],"./components/common/Markdown/index.js":[61190,9,1190],"./components/common/Markdown/remarkAlerts":[4567,9,4567],"./components/common/Markdown/remarkAlerts.js":[4567,9,4567],"./components/common/Markdown/remarkGithub":[94263,9,4263],"./components/common/Markdown/remarkGithub.js":[94263,9,4263],"./components/common/Menu":[22193,9,2193],"./components/common/Menu.jsx":[22193,9,2193],"./components/common/Ribbon":[64e3,9,4e3],"./components/common/Ribbon.jsx":[64e3,9,4e3],"./components/common/Site":[85590,9],"./components/common/Site.jsx":[85590,9],"./components/common/SocialSection":[14676,9],"./components/common/SocialSection.jsx":[14676,9],"./components/common/Tile":[21614,9,1614],"./components/common/Tile.jsx":[21614,9,1614],"./components/common/Typography":[94307,9],"./components/common/Typography.jsx":[94307,9],"./components/common/layout":[28706,9],"./components/common/layout/":[28706,9],"./components/common/layout/Column":[81224,9],"./components/common/layout/Column.jsx":[81224,9],"./components/common/layout/Container":[44769,9],"./components/common/layout/Container.jsx":[44769,9],"./components/common/layout/Grid":[89023,9],"./components/common/layout/Grid.jsx":[89023,9],"./components/common/layout/GridItem":[39728,9],"./components/common/layout/GridItem.jsx":[39728,9],"./components/common/layout/Row":[25604,9],"./components/common/layout/Row.jsx":[25604,9],"./components/common/layout/Section":[76465,9],"./components/common/layout/Section.jsx":[76465,9],"./components/common/layout/SectionDivider":[24332,9],"./components/common/layout/SectionDivider.jsx":[24332,9],"./components/common/layout/Stack":[94441,9],"./components/common/layout/Stack.jsx":[94441,9],"./components/common/layout/index":[28706,9],"./components/common/layout/index.js":[28706,9],"./components/pages/blog":[55718,9],"./components/pages/blog/":[55718,9],"./components/pages/blog/index":[55718,9],"./components/pages/blog/index.js":[55718,9],"./components/pages/blog/post":[32473,9,1190,2473],"./components/pages/blog/post/":[32473,9,1190,2473],"./components/pages/blog/post/AboutAuthor":[45080,9,5080],"./components/pages/blog/post/AboutAuthor.jsx":[45080,9,5080],"./components/pages/blog/post/ArticleHeader":[14140,9,4140],"./components/pages/blog/post/ArticleHeader.jsx":[14140,9,4140],"./components/pages/blog/post/ShareSheet":[36005,9,6005],"./components/pages/blog/post/ShareSheet.jsx":[36005,9,6005],"./components/pages/blog/post/index":[32473,9,1190,2473],"./components/pages/blog/post/index.js":[32473,9,1190,2473],"./components/pages/dev/grid":[41211,9,1211],"./components/pages/dev/grid.js":[41211,9,1211],"./components/pages/dev/layout":[73900,9,3900],"./components/pages/dev/layout.js":[73900,9,3900],"./components/pages/dev/typography":[99268,9,9268],"./components/pages/dev/typography.js":[99268,9,9268],"./components/pages/developer":[79251,9,9251],"./components/pages/developer/":[79251,9,9251],"./components/pages/developer/index":[79251,9,9251],"./components/pages/developer/index.js":[79251,9,9251],"./components/pages/download":[39213,9,9213],"./components/pages/download/":[39213,9,9213],"./components/pages/download/index":[39213,9,9213],"./components/pages/download/index.js":[39213,9,9213],"./components/pages/extensions":[38139,9,8139],"./components/pages/extensions/":[38139,9,8139],"./components/pages/extensions/index":[38139,9,8139],"./components/pages/extensions/index.js":[38139,9,8139],"./components/pages/home":[12098,9,2098],"./components/pages/home/":[12098,9,2098],"./components/pages/home/HardwareLockup":[93473,9,3473],"./components/pages/home/HardwareLockup.jsx":[93473,9,3473],"./components/pages/home/HeroImage":[6575,9,6575],"./components/pages/home/HeroImage.jsx":[6575,9,6575],"./components/pages/home/index":[12098,9,2098],"./components/pages/home/index.js":[12098,9,2098],"./components/pages/home/sections/CtaSection":[88587,9,8587],"./components/pages/home/sections/CtaSection.jsx":[88587,9,8587],"./components/pages/home/sections/FeaturesSection":[52325,9,2325],"./components/pages/home/sections/FeaturesSection.jsx":[52325,9,2325],"./components/pages/home/sections/HeroSection":[25594,9,5594],"./components/pages/home/sections/HeroSection.jsx":[25594,9,5594],"./components/pages/home/sections/IntroFeaturesSection":[84007,9,4007],"./components/pages/home/sections/IntroFeaturesSection.jsx":[84007,9,4007],"./components/pages/home/sections/MoreFeaturesSection":[14192,9,4192],"./components/pages/home/sections/MoreFeaturesSection.jsx":[14192,9,4192],"./components/pages/home/sections/SampleStorySection":[56344,9,6344],"./components/pages/home/sections/SampleStorySection.jsx":[56344,9,6344],"./components/pages/home/sections/WhyUsSection":[56279,9,6279],"./components/pages/home/sections/WhyUsSection.jsx":[56279,9,6279],"./components/pages/legal/license":[29947,9,9947],"./components/pages/legal/license/":[29947,9,9947],"./components/pages/legal/license/index":[29947,9,9947],"./components/pages/legal/license/index.js":[29947,9,9947],"./components/pages/legal/privacy":[29248,9,9248],"./components/pages/legal/privacy/":[29248,9,9248],"./components/pages/legal/privacy/index":[29248,9,9248],"./components/pages/legal/privacy/index.js":[29248,9,9248],"./components/pages/legal/tos":[47310,9,7310],"./components/pages/legal/tos/":[47310,9,7310],"./components/pages/legal/tos/index":[47310,9,7310],"./components/pages/legal/tos/index.js":[47310,9,7310],"./components/pages/resources":[77990,9,7990],"./components/pages/resources/":[77990,9,7990],"./components/pages/resources/index":[77990,9,7990],"./components/pages/resources/index.js":[77990,9,7990],"./components/pages/whats-new":[49632,9,1190,8328,9632],"./components/pages/whats-new/":[49632,9,1190,8328,9632],"./components/pages/whats-new/RawRelease":[31226,9,1190,1226],"./components/pages/whats-new/RawRelease.jsx":[31226,9,1190,1226],"./components/pages/whats-new/Release":[88328,9,1190,8328],"./components/pages/whats-new/Release.jsx":[88328,9,1190,8328],"./components/pages/whats-new/index":[49632,9,1190,8328,9632],"./components/pages/whats-new/index.js":[49632,9,1190,8328,9632],"./data/blog/2024/01/why-were-building-codeedit.md":[60142,9,142],"./data/blog/2024/02/generic-fuzzy-search-algorithm.md":[65953,9,5953],"./data/blog/2025/01/2024-year-in-review.md":[32728,9,2728],"./data/blog/demo.md":[99919,9,9919],"./data/blog/starter-post.md":[74533,9,4533],"./data/config":[56513,3],"./data/config.json":[56513,3],"./data/macOS-versions":[2847,3,2847],"./data/macOS-versions.json":[2847,3,2847],"./data/syntax-dark":[98131,9,8131],"./data/syntax-dark.js":[98131,9,8131],"./data/syntax-light":[90072,9,72],"./data/syntax-light.js":[90072,9,72],"./hooks/useColorScheme":[92325,9],"./hooks/useColorScheme.js":[92325,9],"./hooks/useMediaQuery":[92221,9,2221],"./hooks/useMediaQuery.js":[92221,9,2221],"./hooks/useVisibilityProps":[85585,9],"./hooks/useVisibilityProps.js":[85585,9],"./hooks/useWindowDimensions":[61479,9],"./hooks/useWindowDimensions.js":[61479,9],"./jsconfig":[1001,3,1001],"./jsconfig.json":[1001,3,1001],"./next.config":[89803,7,9803],"./next.config.js":[89803,7,9803],"./package":[4147,3,4147],"./package-lock":[59959,3,9959],"./package-lock.json":[59959,3,9959],"./package.json":[4147,3,4147],"./pages":[84081,9,2098,4081],"./pages/":[84081,9,2098,4081],"./pages/_app":[2166,9],"./pages/_app.js":[2166,9],"./pages/_document":[21106,9],"./pages/_document.js":[21106,9],"./pages/api/hello":[61704,9,1704],"./pages/api/hello.js":[61704,9,1704],"./pages/blog":[89819,9],"./pages/blog/":[89819,9],"./pages/blog/[...slug]":[65898,9,1190,2473,5898],"./pages/blog/[...slug].js":[65898,9,1190,2473,5898],"./pages/blog/index":[89819,9],"./pages/blog/index.js":[89819,9],"./pages/dev/grid":[19302,9,9302],"./pages/dev/grid.js":[19302,9,9302],"./pages/dev/layout":[58241,9,3900,8241],"./pages/dev/layout.js":[58241,9,3900,8241],"./pages/dev/typography":[31651,9,1651],"./pages/dev/typography.js":[31651,9,1651],"./pages/developer":[33736,9,3736],"./pages/developer.js":[33736,9,3736],"./pages/download":[72118,9,2118],"./pages/download.js":[72118,9,2118],"./pages/extensions":[20274,9,274],"./pages/extensions.js":[20274,9,274],"./pages/index":[84081,9,2098,4081],"./pages/index.js":[84081,9,2098,4081],"./pages/legal/license":[97394,9,7394],"./pages/legal/license.js":[97394,9,7394],"./pages/legal/privacy":[26305,9,6305],"./pages/legal/privacy.js":[26305,9,6305],"./pages/legal/tos":[22320,9,2320],"./pages/legal/tos.js":[22320,9,2320],"./pages/resources":[54012,9,4012],"./pages/resources.js":[54012,9,4012],"./pages/sparkle/[tag]":[28948,9,1190,8948],"./pages/sparkle/[tag].js":[28948,9,1190,8948],"./pages/whats-new":[75253,9,1190,8328,5253],"./pages/whats-new/":[75253,9,1190,8328,5253],"./pages/whats-new/index":[75253,9,1190,8328,5253],"./pages/whats-new/index.js":[75253,9,1190,8328,5253],"./pages/whats-new/raw/[tag]":[22081,9,1190,2081],"./pages/whats-new/raw/[tag].js":[22081,9,1190,2081],"./public/applications-folder.png":[77489,9,7489],"./public/codeedit-window-dark.png":[51090,9,3376],"./public/codeedit-window-light.png":[51239,9,1239],"./public/downloads-folder.png":[8180,9,8180],"./public/drag-to-applications-folder.png":[72024,9,2024],"./public/drag-to-dock.png":[22261,9,2261],"./public/favicon.ico":[55235,9,5235],"./public/favicon.png":[14542,9,4542],"./public/favicon.svg":[37666,9,7666],"./public/icon-dark.png":[40910,9,910],"./public/icon-light.png":[8037,9,8037],"./public/m1_laptop_hw_dark_large.jpg":[66286,9,6286],"./public/m1_laptop_hw_dark_large_2x.jpg":[41139,9,1139],"./public/m1_laptop_hw_dark_large_2x.png":[20736,9,736],"./public/m1_laptop_hw_dark_medium.jpg":[10876,9,876],"./public/m1_laptop_hw_dark_medium_2x.jpg":[22541,9,2541],"./public/m1_laptop_hw_dark_small.jpg":[38837,9,738],"./public/m1_laptop_hw_dark_small_2x.jpg":[124,9,124],"./public/m1_laptop_hw_light_large.jpg":[43868,9,3868],"./public/m1_laptop_hw_light_large_2x.jpg":[15842,9,5842],"./public/m1_laptop_hw_light_large_2x.png":[22776,9,2776],"./public/m1_laptop_hw_light_medium.jpg":[66498,9,6498],"./public/m1_laptop_hw_light_medium_2x.jpg":[53451,9,3451],"./public/m1_laptop_hw_light_small.jpg":[18319,9,8319],"./public/m1_laptop_hw_light_small_2x.jpg":[83213,9,3213],"./public/m1_laptop_hw_mask_large.png":[82074,9,2074],"./public/m1_laptop_hw_mask_large_2x.png":[2878,9,2878],"./public/m1_laptop_hw_shape_mask_large.png":[33265,9,3265],"./public/m1_laptop_hw_shape_mask_large_2x.png":[30423,9,423],"./public/product-icon.png":[63685,9,3685],"./public/screen_macos_desktop_dark_large_2x.jpg":[77910,9,7910],"./public/screen_macos_desktop_light_large_2x.jpg":[80110,9,110],"./public/screen_processing_large.jpg":[86826,9,6826],"./public/screen_processing_medium_2x.jpg":[51277,9,1277],"./public/screen_processing_small.jpg":[84769,9,4769],"./public/sitemap.xml":[35437,7,5437],"./public/social-preview.jpg":[98175,9,8175],"./public/vercel.svg":[64089,9,4089],"./public/window-dark-cropped.png":[1432,9,1432],"./scripts/generate-sitemap":[99040,9,9040],"./scripts/generate-sitemap.mjs":[99040,9,9040],"./styles/breakpoints":[67689,9],"./styles/breakpoints.js":[67689,9],"./styles/getResponsivePropStyles":[56134,9],"./styles/getResponsivePropStyles.js":[56134,9],"./styles/getTypographyStyles":[81797,9],"./styles/getTypographyStyles.js":[81797,9],"./styles/globals.css":[86764,7],"./styles/spacing":[52519,9],"./styles/spacing.js":[52519,9],"./styles/theme":[94062,9],"./styles/theme.js":[94062,9],"./utils/fetchData":[69037,9],"./utils/fetchData.js":[69037,9],"./utils/file":[79996,9],"./utils/file.js":[79996,9],"./utils/getAllPosts":[77570,9],"./utils/getAllPosts.js":[77570,9],"./utils/getMinimumSystemVersion":[4308,9,4308],"./utils/getMinimumSystemVersion.js":[4308,9,4308]};function i(e){if(!s.o(o,e))return Promise.resolve().then(()=>{var t=Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t});var t=o[e],i=t[0];return Promise.all(t.slice(2).map(s.e)).then(()=>s.t(i,16|t[1]))}i.keys=()=>Object.keys(o),i.id=27583,e.exports=i},23841:e=>{"use strict";e.exports=require("@popperjs/core")},24628:e=>{"use strict";e.exports=require("@webassemblyjs/ast")},25474:e=>{"use strict";e.exports=require("@webassemblyjs/wasm-edit")},69582:e=>{"use strict";e.exports=require("@webassemblyjs/wasm-parser")},89631:e=>{"use strict";e.exports=require("acorn")},86617:e=>{"use strict";e.exports=require("acorn-import-assertions")},10798:e=>{"use strict";e.exports=require("browserslist")},8469:e=>{"use strict";e.exports=require("chrome-trace-event")},42275:e=>{"use strict";e.exports=require("enhanced-resolve")},64987:e=>{"use strict";e.exports=require("enhanced-resolve/lib/CachedInputFileSystem")},52190:e=>{"use strict";e.exports=require("es-module-lexer")},81640:e=>{"use strict";e.exports=require("esrecurse")},71239:e=>{"use strict";e.exports=require("events")},54230:e=>{"use strict";e.exports=require("glob")},28340:e=>{"use strict";e.exports=require("glob-to-regexp")},85740:e=>{"use strict";e.exports=require("graceful-fs")},98076:e=>{"use strict";e.exports=require("gray-matter")},68515:e=>{"use strict";e.exports=require("json-parse-even-better-errors")},72249:e=>{"use strict";e.exports=require("loader-runner")},1381:e=>{"use strict";e.exports=require("lodash/throttle")},59514:e=>{"use strict";e.exports=require("mime-types")},68558:e=>{"use strict";e.exports=require("neo-async")},62785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},40968:e=>{"use strict";e.exports=require("next/head")},63920:e=>{"use strict";e.exports=require("prettier")},580:e=>{"use strict";e.exports=require("prop-types")},16689:e=>{"use strict";e.exports=require("react")},66405:e=>{"use strict";e.exports=require("react-dom")},99101:e=>{"use strict";e.exports=require("react-feather")},55236:e=>{"use strict";e.exports=require("react-parallax")},42932:e=>{"use strict";e.exports=require("react-popper")},90727:e=>{"use strict";e.exports=require("react-syntax-highlighter")},71067:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/bash")},14913:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/javascript")},26617:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/json")},1391:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/jsx")},56318:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/markdown")},75370:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/scss")},23797:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/swift")},52417:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/tsx")},79626:e=>{"use strict";e.exports=require("react-syntax-highlighter/dist/cjs/languages/prism/typescript")},20997:e=>{"use strict";e.exports=require("react/jsx-runtime")},33410:e=>{"use strict";e.exports=require("schema-utils")},52349:e=>{"use strict";e.exports=require("schema-utils/dist/ValidationError")},57518:e=>{"use strict";e.exports=require("styled-components")},34828:e=>{"use strict";e.exports=require("tapable")},57166:e=>{"use strict";e.exports=require("terser-webpack-plugin")},28981:e=>{"use strict";e.exports=require("watchpack")},45514:e=>{"use strict";e.exports=import("@emotion/is-prop-valid")},90702:e=>{"use strict";e.exports=import("globby")},23135:e=>{"use strict";e.exports=import("react-markdown")},91871:e=>{"use strict";e.exports=import("rehype-raw")},66809:e=>{"use strict";e.exports=import("remark-gfm")},45236:e=>{"use strict";e.exports=import("unist-builder")},56016:e=>{"use strict";e.exports=import("unist-util-visit")},46555:e=>{"use strict";e.exports=import("uuid")},39491:e=>{"use strict";e.exports=require("assert")},14300:e=>{"use strict";e.exports=require("buffer")},6113:e=>{"use strict";e.exports=require("crypto")},57147:e=>{"use strict";e.exports=require("fs")},13685:e=>{"use strict";e.exports=require("http")},95687:e=>{"use strict";e.exports=require("https")},31405:e=>{"use strict";e.exports=require("inspector")},98188:e=>{"use strict";e.exports=require("module")},71017:e=>{"use strict";e.exports=require("path")},63477:e=>{"use strict";e.exports=require("querystring")},12781:e=>{"use strict";e.exports=require("stream")},57310:e=>{"use strict";e.exports=require("url")},73837:e=>{"use strict";e.exports=require("util")},26144:e=>{"use strict";e.exports=require("vm")},59796:e=>{"use strict";e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var s=e=>t(t.s=e),o=t.X(0,[1491,5640,6859,2166],()=>s(87230));module.exports=o})();