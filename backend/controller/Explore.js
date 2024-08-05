const explore = (req, res) => {
  const exploredata = [
    {
      id: 1,
      bigPandya: "/bigPandya.png",
      title: "Aryan valvi",
      pandya: "/img1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/profile.png",
      des: "mobile design...",
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
      liked: false,
    },
    {
      bigPandya: "/bigPandya2.png",

      id: 2,
      title: "Armin",
      pandya: "/armin-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img2 1.png",
      des: "shop...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya3.png",

      id: 3,
      title: "Dariba",
      pandya: "/darina-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img3 1.png",
      des: "web design...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "./bigPandya.png",
      id: 4,
      title: "Aryan valvi",
      pandya: "/img1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/profile.png",
      des: "mobile design...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya2.png",

      id: 5,
      title: "Armin",
      pandya: "/armin-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img2 1.png",
      des: "shop...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya3.png",

      id: 6,
      title: "Dariba",
      pandya: "/darina-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img3 1.png",
      des: "web design...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya2.png",

      id: 7,
      title: "Armin",
      pandya: "/armin-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img2 1.png",
      des: "shop...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya3.png",

      id: 8,
      title: "Dariba",
      pandya: "/darina-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img3 1.png",
      des: "web design...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya2.png",

      id: 9,
      title: "Armin",
      pandya: "/armin-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img2 1.png",
      des: "shop...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya3.png",
      id: 10,
      title: "Dariba",
      pandya: "/darina-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img3 1.png",
      des: "web design...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
    {
      bigPandya: "/bigPandya2.png",

      id: 11,
      title: "Armin",
      pandya: "/armin-gand 1.png",
      save: "/save.svg",
      like: "/like.svg",
      view: "/views.svg",
      profile: "/img2 1.png",
      des: "shop...",
      liked: false,
      bigDes: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`,
    },
  ];
  res.json(exploredata);
};

module.exports = explore;
