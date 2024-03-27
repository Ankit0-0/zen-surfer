let blockedInstagramItems = [];

const defaultOptions = {
  blockReels: true,
  blockExplore: true,
  blockStories: false,
  blockPosts: false,
  blockSuggestedFollowers: true,
  blockForYouFeed: false,
};

const labelsArray = Object.keys(defaultOptions);

const selectors = {
  main: "[role=main]",
  storyFeed: "div[role='menu']",
  posts: "article",
  postsLoader: "[data-visualcompletion='loading-state']",
  suggestedFollowers: "a[href*='/explore/people/']",
  nav: {
    direct: "a[href*='/direct/inbox/']",
    activity: "a[href*='/accounts/activity']",
    explore: "a[href='/explore/']",
    reels: "a[href*='/reels/']",
  },
};

const urls = {
  base: "/",
  stories: "/stories",
  reels: "/reels",
  explore: "/explore",
};

document.addEventListener("DOMContentLoaded", async () => {
  //   const reelsButton = document.querySelector(selectors.nav.reels);
  //   console.log("Reels button found: ", reelsButton);

  //   if (reelsButton) {
  //     console.log("Reels button removed");
  //     reelsButton?.remove();
  //   }

  await chrome.storage.sync.get("blockedInstagramItems", (data) => {
    blockedInstagramItems = data.blockedInstagramItems || [];
  });

  console.log("Blocked Instagram items: ", blockedInstagramItems);


  blockedInstagramItems.forEach((item) => {
    
  })
});
