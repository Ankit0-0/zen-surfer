const selectors = {
  feed: "[role=main]",
  stories: "div[role='menu']",
  posts: "article",
  postsLoader: "[data-visualcompletion='loading-state']",
  suggestedFollowers: "a[href*='/explore/people/']",
  activity: "a[href*='/accounts/activity']",
  explore: "a[href='/explore/']",
  reels: "a[href*='/reels/']",
  inbox: "a[href='/direct/inbox/']",
  search: "svg[aria-label='Search']",
  notifications: "svg[aria-label='Notifications']",
  profile: "a[href*='/photosi14']",
};

const urls = {
  base: "/",
  stories: "/stories",
  reels: "/reels",
  explore: "/explore",
};

let blockedItems = [];

async function main() {
  const mutationObserver = new MutationObserver(onMutation);

  chrome.storage.sync.get("blockedInstagramItems", (result) => {
    blockedItems = result.blockedInstagramItems || [];
    console.log("Blocked Instagram items: ", blockedItems);
  });

  function onMutation() {
    // console.log("Mutation detected");
    const body = document.body;

    if (blockedItems.includes("homeFeed") && blockedItems.includes("stories")) {
      const feed = body?.querySelector(selectors.feed);
      feed?.remove();
    }

    if (blockedItems.includes("reels")) {
      const reelsLink = body?.querySelector(selectors.reels);
      reelsLink?.remove();
    }

    if (blockedItems.includes("explore")) {
      const exploreLink = body?.querySelector(selectors.explore);
      exploreLink?.remove();
    }

    if (blockedItems.includes("stories")) {
      const stories = body?.querySelector(selectors.stories);
      stories?.remove();
    }

    if (blockedItems.includes("homeFeed")) {
      const feed = body?.querySelector(selectors.posts);
      feed?.remove();
      const postsLoader = body?.querySelector(selectors.postsLoader);
      postsLoader?.remove();
    }

    if (blockedItems.includes("inbox")) {
      const directLink = body?.querySelector(selectors.inbox);
      directLink?.remove();
    }

    // if (blockedItems.includes("search")) {
    //   const search = body?.querySelector(selectors.search).closest('a')
    //   search?.remove();
    // }

    // if (blockedItems.includes("notifications")) {
    //   const notificationsLink = body?.querySelector(selectors.notifications).closest('a');
    //   notificationsLink?.remove();
    // }

    if (blockedItems.includes("profile")) {
      const profileLink = body?.querySelector(selectors.profile);
      profileLink?.remove();
    }

    if (blockedItems.includes("suggestedFollowers")) {
      // Remove suggested followers
      const suggestedFollowersLink = body?.querySelector(
        selectors.suggestedFollowers
      );
      const suggestedFollowersTitle = suggestedFollowersLink?.closest("div");
      const suggestedFollowers = suggestedFollowersTitle?.nextElementSibling;
      suggestedFollowersTitle?.remove();
      suggestedFollowers?.remove();
    }
  }

  // Start observing the DOM for changes
  mutationObserver.observe(document, {
    subtree: true,
    childList: true,
  });

  onMutation([{ addedNodes: [document.documentElement] }]);
}

main();
