let blockedSites = [];
let redirectUrl = "https://www.google.com/";
// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check if the URL change is complete and not due to a frame creation
  if (
    1
    // changeInfo.url 
    // changeInfo.status === "complete" &&
    // tab.url === changeInfo.url
  ) {
    // Check if the tab URL matches any blocked site
    checkBlockedSites(tabId, changeInfo.url);
  }
});

// Listen for web navigation before a page loads
// chrome.webNavigation.onBeforeNavigate.addListener((details) => {
//   // Check if the URL about to be loaded matches any blocked site
//   checkBlockedSites(details.tabId, details.url);
// });

// Function to check if the URL matches any blocked site and send a redirect message
const checkBlockedSites = (tabId, url) => {
  chrome.storage.sync.get("blockedSites", (data) => {
    blockedSites = data.blockedSites || []; // Initialize with an empty array if data is undefined
    
    // Get the redirection URL from Chrome storage
    chrome.storage.sync.get("redirectionUrl", (data) => {
      redirectUrl =
        data.redirectionUrl != null
          ? data.redirectionUrl
          : "https://www.google.com/";
    });

    if (blockedSites.some((site) => url.includes(site))) {
      console.log("Redirecting");
      chrome.tabs.update(tabId, { url: redirectUrl });
    }
  });
};

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.type === "BLOCK_SITES") {
    const { sites, redirectionUrl } = message;
    // Update the list of blocked sites in Chrome storage
    chrome.storage.sync.set({ blockedSites: sites }, () => {
      console.log("Blocked sites: ", sites);
    });

    // Update the redirection URL in Chrome storage
    chrome.storage.sync.set({ redirectionUrl }, () => {
      console.log("Redirection URL: ", redirectionUrl);
    });
  }
});