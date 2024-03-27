let blockedSites = [];
let redirectionUrl = "";

let blockedInstagramItems = [];
 
// Function to update checkboxes and input field based on blocked sites and redirection URL
const updateUI = () => {
  // Update checkboxes
  const sitesCheckboxes = document.querySelectorAll('input[name="site"]');
  sitesCheckboxes.forEach((checkbox) => {
    checkbox.checked = blockedSites.includes(checkbox.value);
  });

  // Update input field with redirection URL
  const redirectionUrlInput = document.getElementById("redirectionUrl");
  redirectionUrlInput.value = redirectionUrl;

  const instaCheckBoxes = document.querySelectorAll('input[name="instaItem"]')

  instaCheckBoxes.forEach((checkbox) => {
    checkbox.checked = blockedInstagramItems.includes(checkbox.value);
  })
};

const handleBlockedSites = () => {
  const blockForm = document.getElementById("blockForm");

  blockForm.addEventListener("submit",  (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Get the redirection URL from the input field
    redirectionUrl = document.getElementById("redirectionUrl").value.trim();

    // Check if the redirection URL is empty
    if (redirectionUrl === "") {
      alert("Please enter a distraction redirection URL.");
      return;
    }

    // Get all checked checkboxes
    let sitesToBeBlocked = [];
    const checkboxes = document.querySelectorAll('input[name="site"]:checked');
    checkboxes.forEach((checkbox) => {
      sitesToBeBlocked.push(checkbox.value); // Add the value of checked checkbox to the array
    });

    // Send a message to the service worker with the list of blocked sites and the redirection URL
    chrome.runtime.sendMessage({
      type: "BLOCK_SITES",
      sites: sitesToBeBlocked,
      redirectionUrl: redirectionUrl,
    });

    const blockButton = document.getElementById("blockSitesButton");

    blockButton.innerText = "✔️"; // Change button text to tick sign
    setTimeout(() => {
      blockButton.innerText = "update"; // Change button text back to "Block"
    }, 1000); // 1000 milliseconds = 1 second

    // Reset the form
    // blockForm.reset();
  });

  // get blocked sites and redirection URL from Chrome Storage
  chrome.storage.sync.get(["blockedSites", "redirectionUrl"], (data) => { 
    blockedSites = data.blockedSites || [];
    redirectionUrl = data.redirectionUrl || "";
    console.log("Blocked sites: ", blockedSites);
    console.log("Redirection URL: ", redirectionUrl);
    // After retrieving the blocked sites and redirection URL, update the checkboxes and input field
    updateUI();
  });
};

const handleInstagramItems = () => {
  const instagramForm = document.getElementById("instagramForm")
  
  instagramForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    
    // Get all checked checkboxes
    let itemsToBeBlocked = [];
    const checkboxes = document.querySelectorAll(
      'input[name="instaItem"]:checked'
      );
      checkboxes.forEach((checkbox) => {
        itemsToBeBlocked.push(checkbox.value); // Add the value of checked checkbox to the array
      });
      
    chrome.runtime.sendMessage({
      type: "BLOCK_INSTAGRAM_ITEMS",
      items: itemsToBeBlocked,
    });

    const blockButton = document.getElementById("blockInstaButton");

    blockButton.innerText = "✔️"; // Change button text to tick sign
    setTimeout(() => {
      blockButton.innerText = "update"; // Change button text back to "Block"
    }, 1000); // 1000 milliseconds = 1 second
    // Reset the form
    // instagramForm.reset();

  });

  

  chrome.storage.sync.get("blockedInstagramItems", (data) => {
    blockedInstagramItems = data.blockedInstagramItems || [];
    console.log("Blocked Instagram items: ", blockedInstagramItems);
  })

  updateUI()
};


document.addEventListener("DOMContentLoaded", () => {
  handleInstagramItems()
  handleBlockedSites();
});
