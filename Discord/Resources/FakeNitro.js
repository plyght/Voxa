//
//  FakeNitro.js
//  Discord
//
//  Created by Stossy11 on 06/01/2025.
//

let z;
let isEnabled = false;  // Flag to control the script's execution

function loader() {
    if (!isEnabled) {
        return;  // If the script is disabled, do nothing
    }

    window.webpackChunkdiscord_app.push([
        [Math.random()], {},
        e => {
            window.wpRequire = e;
        }
    ]);
    
    let e = () => Object.keys(wpRequire.c).map((e => wpRequire.c[e].exports)).filter((e => e)),
        t = t => {
            for (const n of e()) {
                if (n.default && t(n.default)) return n.default;
                if (n.Z && t(n.Z)) return n.Z;
                if (t(n)) return n;
            }
        },
        n = t => {
            let n = [];
            for (const s of e()) s.default && t(s.default) ? n.push(s.default) : t(s) && n.push(s);
            return n;
        },
        s = (...e) => t((t => e.every((e => void 0 !== t[e])))),
        a = (...e) => n((t => e.every((e => void 0 !== t[e])))),
        r = e => new Promise((t => setTimeout(t, e)));

    if (!s("getCurrentUser").getCurrentUser()) {
        return;
    } else {
        clearInterval(z);
    }

    s("getCurrentUser").getCurrentUser().premiumType = 2;
    let i = s("sendMessage");
    i.__sendMessage = i.__sendMessage || i._sendMessage;
    
    i._sendMessage = async function(e, t, n) {
        // Handle emoji replacements
        if (t?.validNonShortcutEmojis?.length > 0) {
            t.validNonShortcutEmojis.forEach((emoji) => {
                const emojiRegex = new RegExp(`<(a|):${emoji.originalName || emoji.name}:${emoji.id}>`, 'g');
                // Construct the URL with size=48
                const emojiUrl = emoji.animated ?
                    `https://cdn.discordapp.com/emojis/${emoji.id}.gif?size=48` :
                    `https://cdn.discordapp.com/emojis/${emoji.id}.png?size=48`;
                // Replace the emoji with its name wrapped in a Markdown-style link
                t.content = t.content.replace(emojiRegex, `[${emoji.name}](${emojiUrl})`);
            });
        }

        // Handle stickers
        if (n?.stickerIds?.length > 0) {
            n.stickerIds.forEach((stickerId) => {
                t.content = t.content + " https://media.discordapp.net/stickers/" + stickerId + ".webp?size=160";
            });
            n = {
                ...n,
                stickerIds: undefined
            };
        }

        // Handle message length splitting
        if (t.content.length > 2000) {
            let a = t.content.split(/([\S\s]{1,2000})/g);
            
            // Handle code block splitting
            if (a[1].match(/```/g)?.length % 2 !== 0 && a[3].length <= 1980) {
                let e = a[1];
                a[1] = e.substring(0, 1997) + "```";
                let t = a[1].match(/```[^\n ]+/g);
                t = t[t.length % 2 === 0 ? t.length - 2 : t.length - 1].replace("```", "");
                let n = "```";
                a[3].match(/```/g)?.length >= 1 && a[3].match(/```/g)?.length % 2 !== 0 && (n = "");
                a[3] = "```" + t + "\n" + e.substring(1997, 2000) + a[3] + n;
            }

            // Send split messages
            let l = s("getCachedChannelJsonForGuild").getChannel(e).rateLimitPerUser;
            await i.__sendMessage.bind(i)(e, {
                ...t,
                content: a[1]
            }, n);

            let o = false;
            while (!o) {
                await r(l);
                let s = i.__sendMessage.bind(i)(e, {
                    ...t,
                    content: a[3]
                }, n).catch((e) => {
                    l = 1000 * e.body.retry_after;
                    o = false;
                });
                if (s = await s, s?.ok) return await s;
            }
        }

        return await i.__sendMessage.bind(i)(e, t, n);
    };
}

z = setInterval(loader, 1);
                                   
function enableFNitro() {
    isEnabled = true;
}

function disableFNitro() {
    isEnabled = false;
}
