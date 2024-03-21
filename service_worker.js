chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log("Tab updated: ", tab);
  if (changeInfo.status === "complete" && tab.url) {
    if (tab.url.includes("twitter.com")) {
      console.log("Twitter detected!");
      chrome.tabs.sendMessage(tabId, {
        type: "ALERT",
        url: changeInfo.url,
      });
    }
    if (tab.url.includes("instagram.com")) {
      console.log("instagram detected!");
      chrome.tabs.sendMessage(tabId, {
        type: "ALERT",
        url: changeInfo.url,
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.type === "BLOCK_SITES") {
    const blockedSites = message.sites;

    chrome.storage.sync.set({ blockedSites: blockedSites }, () => {
      console.log("Blocked sites: ", blockedSites);
    });
  }
});



// chrome.runtime.onMessage.addListener((message, sender, response) => {
//   if (message.type === "TIME_UP") {
//     // Trigger a popup to inform the user that the time is up
//     chrome.windows.create({
//       url: "popup.html",
//       type: "popup",
//       width: 400,
//       height: 200,
//       top: 100,
//       left: 100,
//     });
//   }
// });
