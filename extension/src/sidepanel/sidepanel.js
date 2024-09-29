document.addEventListener("DOMContentLoaded", () => {
  console.log("Side panel loaded");

  // Listen for messages from the service worker
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updatePanel") {
      document.body.innerHTML += `<p>Received message: ${request.message}</p>`;
      sendResponse({ success: true });
    }
    return true;
  });
});
