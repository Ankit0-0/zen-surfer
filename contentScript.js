chrome.runtime.onMessage.addListener((message, sender, response) => {
  const { type, url, goTo } = message;
  if (type === "ALERT") {
    alert("You are distracted. We will remind you in 5 minutes.");
    // Start a timer for 5 minutes (300,000 milliseconds)
    // setTimeout(() => {
    //   // Send a message to the background script to inform that the time is up
    //   // chrome.runtime.sendMessage({ type: "TIME_UP" });
    //   alert("5 minutes are up!");
    // }, 2000); // 5 minutes in milliseconds
  }
  //  else if (type === "REDIRECT") {
  //   // Redirect to the given URL
  //   console.log("Redirecting to: ", goTo);
  //   alert("padh le mc")
  //   window.location.href = goTo;
  // }
});

