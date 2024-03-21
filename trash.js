
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
