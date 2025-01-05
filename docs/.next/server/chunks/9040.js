"use strict";exports.id=9040,exports.ids=[9040],exports.modules={99040:(e,a,s)=>{s.a(e,async(e,t)=>{try{s.r(a);var p=s(57147),r=s(90702),l=s(63920),c=e([r]);r=(c.then?(await c)():c)[0],async function(){await l.resolveConfig("./.prettierrc.js");let e=await (0,r.globby)(["pages/*.tsx","pages/*.jsx","pages/*.js","data/**/*.mdx","data/**/*.md","!data/*.mdx","!pages/_*.tsx","!pages/_*.js","!pages/_*.jsx","!pages/api","!pages/404.tsx","!pages/sparkle/**/*.js"]),a=`
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${e.map(e=>{let a=e.replace("pages","").replace("data","").replace(".tsx","").replace(".ts","").replace(".jsx","").replace(".js","").replace(".md","").replace(".mdx","");return`
              <url>
                  <loc>https://codeedit.app${"/index"===a?"":a}</loc>
              </url>
            `}).join("")}
    </urlset>
    `;(0,p.writeFileSync)("public/sitemap.xml",a)}(),t()}catch(e){t(e)}})}};