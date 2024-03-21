document.addEventListener("DOMContentLoaded", function() {
    const blockForm = document.getElementById("blockForm");

    blockForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        const blockedSites = []; // Array to store the blocked sites

        // Get all checked checkboxes
        const checkboxes = document.querySelectorAll('input[name="site"]:checked');
        checkboxes.forEach(function(checkbox) {
            blockedSites.push(checkbox.value); // Add the value of checked checkbox to the array
        });

        // Send a message to the service worker with the list of blocked sites
        chrome.runtime.sendMessage({ type: "BLOCK_SITES", sites: blockedSites });

        // Reset the form
        blockForm.reset();
    });
});
