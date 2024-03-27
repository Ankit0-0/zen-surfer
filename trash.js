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
