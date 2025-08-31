// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

// import {themes as prismThemes} from 'prism-react-renderer';
const {themes: prismThemes} = require('prism-react-renderer');
// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Refract',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/refract_logo.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://sammex45.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/Refract/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
   organizationName: 'sammex45', // Usually your GitHub org/user name.
  projectName: 'Refract', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Technical-writing-mentorship-program/Refract/blob/main/Refract.md/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'Refract',
        logo: {
          alt: 'My Site Logo',
          src: 'img/refract_logo.svg',
        },
        items: [
          {
  type: 'docSidebar',
  sidebarId: 'tutorialSidebar',
  position: 'left',
  label: 'Intro',
},

          {to: '/docs/category/guides', label: 'Guide', position: 'left'},
          {
            href: 'https://linkedin.com/Technical-writing-mentorship-program/Refract/blob/main/Refract.md',
            label: 'Linkedin',
            position: 'right',
          },
          {
            href: 'https://github.com/Technical-writing-mentorship-program/Refract/blob/main/Refract.md',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: '/docs/intro',
              },
              {
                label: 'Guides',
                to: 'docs/category/guides',
              },
              {
                label: 'Changelog',
                to: '/docs/category/Changelog',
              },
              {
                label: 'Resources',
                to: '/docs/category/Resources',
              },
              {
                label: 'API Reference',
                to: '/docs/category/api---reference',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Slack',
                href: 'https://slack.com/docusaurus',
              },
              {
                label: 'Telegram',
                href: 'https://telegram.com/docusaurus',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                to: '/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/facebook/docusaurus',
              },
              {
                label: 'Facebook',
                href: 'https://github.com/facebook/docusaurus',
              },
              {
                label: 'Linkedin',
                href: 'https://Linkedin.com/x/docusaurus',
              },
              {
                label: 'X',
                href: 'https://x.com/x/docusaurus',
              },
            ],
          },
        ],
copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};




module.exports = {
  // ...
  onBrokenLinks: 'ignore',
  onBrokenMarkdownLinks: 'Ignore',
};

module.exports = config;