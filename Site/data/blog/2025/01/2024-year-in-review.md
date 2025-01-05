---
title: "Our Year in Review, and What’s Ahead"
headline: "Our Year in Review, and What’s Ahead"
subhead: As 2024 comes to a close, we wanted to take a moment to reflect on what we achieved in this last year. Our community has continued to drive the development of CodeEdit. We're especially excited to share what we worked on, and what's coming for CodeEdit!
description: As 2024 comes to a close, we wanted to take a moment to reflect on what we achieved in this last year.
date: 2025-01-01
category: roundup
author: thecoolwinter
image: https://github.com/user-attachments/assets/108dadf2-2bdb-4954-b7ba-086c2be8abfd
---

<video class="full-width ratio-21-9" playsinline muted loop autoplay>
  <source src="https://github.com/user-attachments/assets/cdcc7311-3b04-4f5a-98c4-4b47ac9b4324" type="video/mp4">
</video>

## 🐙 Source Control

This year one of our focuses was improving how developers use Git with CodeEdit. Our goal was to make Git easy. We felt editors can often miss the mark when it comes to the user experience and clarity that source control requires. So, as we built out our source control features we were grateful to our wonderful community as we looked for shared opinions and design guidance.

The heart of CodeEdit's source control features is the source control navigator pane. This pane was [seriously](https://github.com/CodeEditApp/CodeEdit/pull/1534) [upgraded](https://github.com/CodeEditApp/CodeEdit/pull/1471) this year, introducing new interfaces for initializing repositories, managing commits and messages, viewing history, local and remote branches, and more.

<figure>
  <video class="wide ratio-16-9" playsinline muted loop controls poster="https://github.com/user-attachments/assets/fdf9e6b5-f060-40b1-bcb9-d166d3644de2">
    <source src="https://github.com/user-attachments/assets/a5462167-f084-4fab-8229-38c5e5855d54" type="video/mp4">
  </video>
  <figcaption>Source control upgrades.</figcaption>
</figure>

## 📋 Tasks

We’re constantly working to make CodeEdit a tool that will adapt to any developer’s workflow. This year saw the introduction of the [Activity Viewer](https://github.com/CodeEditApp/CodeEdit/pull/1769), a way for developers to set up and run Tasks in their workspace. Tasks are shell commands that run in your workspace. Tasks can do anything you do in a terminal, such as starting a development server, or sending off a test run.

To configure tasks, we added workspace specific settings and will continue to expand them to allow developers to override settings for specific workspaces. Once tasks are configured, they send their output to a new Utility Area pane.

<figure>
  <video class="wide ratio-16-9" playsinline muted loop controls preload="metadata" poster="https://github.com/user-attachments/assets/b40e2aee-59ae-4fd8-a8ce-7d05a94a9105">
    <source src="https://github.com/user-attachments/assets/e316ad80-6e8b-4249-86dd-f79fb6b043ee" type="video/mp4">
  </video>
  <figcaption>Tasks & Activity Viewer demo, building an Next application.</figcaption>
</figure>

As we continue developing Tasks and the Activity Viewer, we see lots of potential for this feature to make day-to-day development with CodeEdit smoother and faster. We're excited to see where it'll go this next year, and look forward to seeing how developers like you use it.

## 🎨 Themes

Everyone loves themes, so they got some upgrades this year. We improved how default themes are bundled with CodeEdit. Now, default themes will be updated as new updates are released. It's also less confusing which themes are built-in or user-installed and it's easier to create a new theme from an existing one.

The theme list got improvements as well, adding [fuzzy](https://www.codeedit.app/blog/2024/02/generic-fuzzy-search-algorithm) [searching](https://github.com/CodeEditApp/CodeEdit/pull/1584) to the themes list so everything is easier to find, and improving the design so you never need to modify a [JSON file](https://code.visualstudio.com/api/extension-guides/color-theme#create-a-new-color-theme) to make your editor look just right.

<figure>
  <video class="wide ratio-16-9" playsinline muted loop controls preload="metadata"  poster="https://github.com/user-attachments/assets/86809f72-6d21-4397-856b-bedf7099a525">
    <source src="https://github.com/user-attachments/assets/19311db2-a880-41f5-a9f6-a1076dab2e2c" type="video/mp4">
  </video>
  <figcaption>Themes search, starting a new theme.</figcaption>
</figure>

## 📝 Source Editor

After introducing our custom ground-up [text view](https://github.com/CodeEditApp/CodeEditTextView) package at the end of last year, we continued to improve stability and accessibility. Support for non-latin characters, the macOS Sequoia system cursor, and fixes for many more [UX papercuts](https://en.wikipedia.org/wiki/Paper_cut_bug) were fixed and released in that package.

This year saw bounds of progress making CodeEdit more capable using our [open-source](https://github.com/CodeEditApp/CodeEditSourceEditor) source editor component. A shortcut (⌘/) to [comment code](https://github.com/CodeEditApp/CodeEditSourceEditor/pull/241), [indenting and unindenting lines](https://github.com/CodeEditApp/CodeEditSourceEditor/pull/266), and [tag](https://github.com/CodeEditApp/CodeEditSourceEditor/pull/247) [autocomplete](https://github.com/CodeEditApp/CodeEditSourceEditor/pull/250) powered by tree-sitter were all added by our wonderful contributors this past year. These features have made a huge difference in elevating the editing experience in CodeEdit this year.

<figure>
  <video class="wide ratio-16-9" playsinline muted loop controls preload="metadata" poster="https://github.com/user-attachments/assets/6999ceda-94a3-4261-9122-c1b6c39c798d">
    <source src="https://github.com/user-attachments/assets/34ee2ca0-c12d-43f5-b755-c69c882c086d" type="video/mp4">
  </video>
  <figcaption>Indenting lines, making use of tag autocomplete in the editor.</figcaption>
</figure>

## 🧪 What's Next?

As we wrap up this year, we look ahead toward 2025 and what we hope to accomplish. We'll continue to lean on our community as we learn and build out an application we can all use and love. Here's what we'll be focusing on this coming year.

### Language Server Protocol integration

Supporting language servers will unlock a whole new level of functionality for CodeEdit. Features like autocomplete, upgraded syntax highlighting, symbol searching, snippets, and diagnostics, are all unlocked by supporting LSP. With LSP integration, we’re opening the door to a smarter and more capable coding experience.

### Extension architecture

Extensions are essential for a code editor. We know they're highly anticipated and can make or break an editor's success. We'll be working hard to get extensions right, ensuring CodeEdit gets the full power of good customization behind it.

### Solidifying the core

We'll continue to solidify the core experience you have while writing code. Our mission is to create the best macOS-native editor, and we're not going to settle for less than perfection. We'll be looking to shore up our support for features you expect from a top-of-the-line editor, such as a minimap and more shell integrations. On top of that, performance enhancements in latency and memory utilization remain a top priority so you can code without your editor draining your battery.

These ambitious plans will only be possible with the continued support of our incredible community. Help us bring these features to life by [contributing](https://github.com/CodeEditApp/CodeEdit/blob/main/CONTRIBUTING.md) today! Jump into our [GitHub](https://github.com/CodeEditApp/CodeEdit), join the conversation on [Discord](https://discord.gg/vChUXVf9Em), or become a [sponsor](https://github.com/sponsors/CodeEditApp) to help shape the future of CodeEdit.

## 💌 A Note of Gratitude

We want to extend a heartfelt thank you to every member of our community. Whether you contributed code, reported bugs, shared feedback, or simply used CodeEdit, you’ve played a vital role in our journey. Your passion and dedication inspire us to keep building and improving.

We'd also like to take the time to give a special shout out to our contributors! Everyone who took the time and effort to contribute towards our ambitious goal, whether the contribution was large or small, we want to say thank you.

As 2024 comes to a close, we’re excited to continue this journey with you. We're honored and proud of everything we accomplished this year. Here's to another great next year! 🎉

Happy New Year,<br>The CodeEdit Team
