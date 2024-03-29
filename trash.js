// let blockedSites = [];

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   chrome.storage.sync.get("blockedSites", (data) => {
//     blockedSites = data.blockedSites || []; // Initialize with an empty array if data is undefined
//     if (changeInfo.status === "complete" && tab.url) {
//       console.log("blockedSites: ", blockedSites);
//       blockedSites.forEach((site) => {
//         if (tab.url.includes(site)) {
//           chrome.tabs.sendMessage(tabId, {
//             type: "REDIRECT",
//             goTo: "https://leetcode.com/problemset/",
//           });
//         }
//       });
//     }
//   });
// });

// chrome.runtime.onMessage.addListener((message, sender, response) => {
//   if (message.type === "BLOCK_SITES") {
//     const { sites } = message;
//     chrome.storage.sync.set({ blockedSites: sites }, () => {
//       console.log("Blocked sites: ", sites);
//     });
//   }
// });

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   /////////////////////////////

// chrome.runtime.onMessage.addListener((message, sender, response) => {
//     const { type, url, goTo } = message;

// if (type === "ALERT") {
// alert("You are distracted. We will remind you in 5 minutes.");
// Start a timer for 5 minutes (300,000 milliseconds)
// setTimeout(() => {
//   // Send a message to the background script to inform that the time is up
//   // chrome.runtime.sendMessage({ type: "TIME_UP" });
//   alert("5 minutes are up!");
// }, 2000); // 5 minutes in milliseconds
// }
//  else if (type === "REDIRECT") {
//   // Redirect to the given URL
//   console.log("Redirecting to: ", goTo);
//   alert("padh le mc")
//   window.location.href = goTo;
// }
//   });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   //////////////////////////////  /////////////////////////////                                                                  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   ////////////////////////////// 


// let blockedInstagramItems = [];

// const defaultOptions = {
//   blockReels: true,
//   blockExplore: true,
//   blockStories: false,
//   blockPosts: false,
//   blockSuggestedFollowers: true,
//   blockForYouFeed: false,
// };

// const labelsArray = Object.keys(defaultOptions);

// const selectors = {
//   main: "[role=main]",
//   storyFeed: "div[role='menu']",
//   posts: "article",
//   postsLoader: "[data-visualcompletion='loading-state']",
//   suggestedFollowers: "a[href*='/explore/people/']",
//   nav: {
//     direct: "a[href*='/direct/inbox/']",
//     activity: "a[href*='/accounts/activity']",
//     explore: "a[href='/explore/']",
//     reels: "a[href*='/reels/']",
//   },
// };

// const urls = {
//   base: "/",
//   stories: "/stories",
//   reels: "/reels",
//   explore: "/explore",
// };

// document.addEventListener("DOMContentLoaded", async () => {
//   //   const reelsButton = document.querySelector(selectors.nav.reels);
//   //   console.log("Reels button found: ", reelsButton);

//   //   if (reelsButton) {
//   //     console.log("Reels button removed");
//   //     reelsButton?.remove();
//   //   }

//   await chrome.storage.sync.get("blockedInstagramItems", (data) => {
//     blockedInstagramItems = data.blockedInstagramItems || [];
//   });

//   console.log("Blocked Instagram items: ", blockedInstagramItems);


//   blockedInstagramItems.forEach((item) => {
    
//   })
// });


// const reelsSelector = "a[href*='/reels/']";

// // Callback function for the MutationObserver
// function handleMutation(mutationsList, observer) {
//   for (const mutation of mutationsList) {
//     if (mutation.type === 'childList') {
//       // Check if added nodes contain the element targeted by the reels selector
//       const addedNodes = Array.from(mutation.addedNodes);
//       const reelsButton = addedNodes.find(node => node.matches && node.matches(reelsSelector));
//       console.log("Reels button: ", reelsButton);
//       if (reelsButton) {
//         console.log("Reels button found. Removing...");
//         reelsButton.remove();
//       }
//     }
//   }
// }

// // Create a MutationObserver instance
// const observer = new MutationObserver(handleMutation);

// // Start observing the document for changes
// observer.observe(document, { childList: true, subtree: true });




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
    // search: "#",
    profile: "a[href*='/accounts/']",
    notifications: "a[href='/accounts/activity']",
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
  
      if(blockedItems.includes("homeFeed") && blockedItems.includes("stories")) {
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
  
      if(blockedItems.includes("homeFeed")) {
        const feed = body?.querySelector(selectors.posts);
        feed?.remove();
        const postsLoader = body?.querySelector(selectors.postsLoader);
        postsLoader?.remove();
      }
  
      if(blockedItems.includes("inbox")) {
        const directLink = body?.querySelector(selectors.inbox);
        directLink?.remove();
      }
  
      if(blockedItems.includes("search")) {
        const search = body?.querySelector(selectors.search);
        search?.remove();
      }
  
      if(blockedItems.includes("notifications")) {
        const notificationsLink = body?.querySelector(selectors.notifications);
        notificationsLink?.remove();
      }
  
      if(blockedItems.includes("profile")) {
        const profileLink = body?.querySelector(selectors.profile);
        profileLink?.remove();
      }
  
      if(blockedItems.includes("suggestedFollowers")) {
        // Remove suggested followers
        const suggestedFollowersLink = body?.querySelector(selectors.suggestedFollowers);
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
  