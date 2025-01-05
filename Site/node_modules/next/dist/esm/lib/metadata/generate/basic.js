import React from "react";
import { Meta, MetaFilter, MultiMeta } from "./meta";
import { ViewportMetaKeys } from "../constants";
// convert viewport object to string for viewport meta tag
function resolveViewportLayout(viewport) {
    let resolved = null;
    if (viewport && typeof viewport === "object") {
        resolved = "";
        for(const viewportKey_ in ViewportMetaKeys){
            const viewportKey = viewportKey_;
            if (viewportKey in viewport) {
                let value = viewport[viewportKey];
                if (typeof value === "boolean") value = value ? "yes" : "no";
                if (resolved) resolved += ", ";
                resolved += `${ViewportMetaKeys[viewportKey]}=${value}`;
            }
        }
    }
    return resolved;
}
export function ViewportMeta({ viewport }) {
    return MetaFilter([
        Meta({
            name: "viewport",
            content: resolveViewportLayout(viewport)
        }),
        ...viewport.themeColor ? viewport.themeColor.map((themeColor)=>Meta({
                name: "theme-color",
                content: themeColor.color,
                media: themeColor.media
            })) : [],
        Meta({
            name: "color-scheme",
            content: viewport.colorScheme
        })
    ]);
}
export function BasicMeta({ metadata }) {
    var _metadata_keywords, _metadata_robots, _metadata_robots1;
    return MetaFilter([
        /*#__PURE__*/ React.createElement("meta", {
            charSet: "utf-8"
        }),
        metadata.title !== null && metadata.title.absolute ? /*#__PURE__*/ React.createElement("title", null, metadata.title.absolute) : null,
        Meta({
            name: "description",
            content: metadata.description
        }),
        Meta({
            name: "application-name",
            content: metadata.applicationName
        }),
        ...metadata.authors ? metadata.authors.map((author)=>[
                author.url ? /*#__PURE__*/ React.createElement("link", {
                    rel: "author",
                    href: author.url.toString()
                }) : null,
                Meta({
                    name: "author",
                    content: author.name
                })
            ]) : [],
        metadata.manifest ? /*#__PURE__*/ React.createElement("link", {
            rel: "manifest",
            href: metadata.manifest.toString()
        }) : null,
        Meta({
            name: "generator",
            content: metadata.generator
        }),
        Meta({
            name: "keywords",
            content: (_metadata_keywords = metadata.keywords) == null ? void 0 : _metadata_keywords.join(",")
        }),
        Meta({
            name: "referrer",
            content: metadata.referrer
        }),
        Meta({
            name: "creator",
            content: metadata.creator
        }),
        Meta({
            name: "publisher",
            content: metadata.publisher
        }),
        Meta({
            name: "robots",
            content: (_metadata_robots = metadata.robots) == null ? void 0 : _metadata_robots.basic
        }),
        Meta({
            name: "googlebot",
            content: (_metadata_robots1 = metadata.robots) == null ? void 0 : _metadata_robots1.googleBot
        }),
        Meta({
            name: "abstract",
            content: metadata.abstract
        }),
        ...metadata.archives ? metadata.archives.map((archive)=>/*#__PURE__*/ React.createElement("link", {
                rel: "archives",
                href: archive
            })) : [],
        ...metadata.assets ? metadata.assets.map((asset)=>/*#__PURE__*/ React.createElement("link", {
                rel: "assets",
                href: asset
            })) : [],
        ...metadata.bookmarks ? metadata.bookmarks.map((bookmark)=>/*#__PURE__*/ React.createElement("link", {
                rel: "bookmarks",
                href: bookmark
            })) : [],
        Meta({
            name: "category",
            content: metadata.category
        }),
        Meta({
            name: "classification",
            content: metadata.classification
        }),
        ...metadata.other ? Object.entries(metadata.other).map(([name, content])=>{
            if (Array.isArray(content)) {
                return content.map((contentItem)=>Meta({
                        name,
                        content: contentItem
                    }));
            } else {
                return Meta({
                    name,
                    content
                });
            }
        }) : []
    ]);
}
export function ItunesMeta({ itunes }) {
    if (!itunes) return null;
    const { appId, appArgument } = itunes;
    let content = `app-id=${appId}`;
    if (appArgument) {
        content += `, app-argument=${appArgument}`;
    }
    return /*#__PURE__*/ React.createElement("meta", {
        name: "apple-itunes-app",
        content: content
    });
}
const formatDetectionKeys = [
    "telephone",
    "date",
    "address",
    "email",
    "url"
];
export function FormatDetectionMeta({ formatDetection }) {
    if (!formatDetection) return null;
    let content = "";
    for (const key of formatDetectionKeys){
        if (key in formatDetection) {
            if (content) content += ", ";
            content += `${key}=no`;
        }
    }
    return /*#__PURE__*/ React.createElement("meta", {
        name: "format-detection",
        content: content
    });
}
export function AppleWebAppMeta({ appleWebApp }) {
    if (!appleWebApp) return null;
    const { capable, title, startupImage, statusBarStyle } = appleWebApp;
    return MetaFilter([
        capable ? Meta({
            name: "apple-mobile-web-app-capable",
            content: "yes"
        }) : null,
        Meta({
            name: "apple-mobile-web-app-title",
            content: title
        }),
        startupImage ? startupImage.map((image)=>/*#__PURE__*/ React.createElement("link", {
                href: image.url,
                media: image.media,
                rel: "apple-touch-startup-image"
            })) : null,
        statusBarStyle ? Meta({
            name: "apple-mobile-web-app-status-bar-style",
            content: statusBarStyle
        }) : null
    ]);
}
export function VerificationMeta({ verification }) {
    if (!verification) return null;
    return MetaFilter([
        MultiMeta({
            namePrefix: "google-site-verification",
            contents: verification.google
        }),
        MultiMeta({
            namePrefix: "y_key",
            contents: verification.yahoo
        }),
        MultiMeta({
            namePrefix: "yandex-verification",
            contents: verification.yandex
        }),
        MultiMeta({
            namePrefix: "me",
            contents: verification.me
        }),
        ...verification.other ? Object.entries(verification.other).map(([key, value])=>MultiMeta({
                namePrefix: key,
                contents: value
            })) : []
    ]);
}

//# sourceMappingURL=basic.js.map