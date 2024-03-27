let blockedSites = [];
let redirectUrl = "https://www.google.com/";

let blockedInstagramItems = [];
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
    
    if(blockedSites.length === 0) return; // Exit if the blocked sites array is empty

    // Get the redirection URL from Chrome storage
    chrome.storage.sync.get("redirectionUrl", (data) => {
      redirectUrl =
        data.redirectionUrl != null
          ? data.redirectionUrl
          : "https://www.google.com/";
    });

    const blockedSitesRegex = new RegExp(blockedSites.join('|'), 'i'); // Create a regex pattern from the blocked sites array  

    if (blockedSitesRegex.test(url)) {  // Check if the URL matches any blocked site
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
  else if(message.type === "BLOCK_INSTAGRAM_ITEMS") {
    const {items} = message;

    console.log("Items to be blocked: ", items);
    chrome.storage.sync.set({ blockedInstagramItems: items }, () => {
      console.log("Blocked Instagram items: ", blockedInstagramItems);
    })
  }
});