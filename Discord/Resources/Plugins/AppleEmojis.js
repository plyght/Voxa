// ==VoxaPlugin==
// @name: Apple Emojis
// @author: DevilBro
// @description: Replaces Discord's Emojis with Apple's Emojis.
// @url: https://github.com/mwittrien/BetterDiscordAddons/tree/master/Themes/EmojiReplace
// ==/VoxaPlugin==

const emojiStyle = document.createElement('style');
emojiStyle.textContent = `@import url(https://mwittrien.github.io/BetterDiscordAddons/Themes/EmojiReplace/base/Apple.css)`;
document.head.appendChild(emojiStyle);
