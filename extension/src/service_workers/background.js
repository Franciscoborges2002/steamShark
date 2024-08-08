/* chrome.webNavigation.onCompleted.addListener(
  (details) => {
    chrome.tabs.sendMessage(details.tabId, { message: "checkUrl" });
    console.log("backpack.tf acessado");
  },
  { url: [{ schemes: ["http", "https"], hostSuffix: "backpack.tf" }] }
);
 */
//fetch data
chrome.runtime.onInstalled.addListener(() => {
  fetchDataAndStore();
});

// messages between extension and service worker
self.addEventListener('message', (event) => {
    if (event.data === 'fetchData') {
      fetchDataAndStore().then(() => {
        // Optionally, send a response back to the main extension
        console.log("data fetched")
        self.clients.matchAll().then(clients => {
          clients.forEach(client => client.postMessage({ message: 'Data fetched and stored.' }));
        });
      }).catch(error => {
        console.error('Failed to fetch and store data:', error);
        // Optionally, notify the main extension of the failure
        self.clients.matchAll().then(clients => {
          clients.forEach(client => client.postMessage({ message: 'Failed to fetch and store data.' }));
        });
      });
    }
  });
  

async function fetchDataAndStore() {
  const urls = [
    "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/scam.json",
    "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/trust.json",
  ];

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Enrich data with last checkup timestamp
      const enrichedData = { ...data, lastCheckup: new Date().toISOString() };

      // Store data in Chrome local storage
      if (url.includes("scam")) {
        chrome.storage.local.set(
          { "scamWebsites": JSON.stringify(enrichedData) },
          () => {
            console.log(`Data from ${url} stored successfully.`);
          }
        );
      }else{
        chrome.storage.local.set(
            { "trustWebsites": JSON.stringify(enrichedData) },
            () => {
              console.log(`Data from ${url} stored successfully.`);
            }
          );
      }
    } catch (error) {
      console.error(`Failed to fetch data from ${url}:`, error);
    }
  }
}

//Redirect to warning page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "redirectWarningPage") {
      // Assuming the extension ID is known and static, replace 'YOUR_EXTENSION_ID' with the actual ID
      const extensionId = 'kklbgdgiockjcadlcgajdafpiabcneig';
      const warningPageUrl = `chrome-extension://${extensionId}/src/warning.html`;
      
      // Update the tab's URL to navigate to the warning page
      chrome.tabs.update(sender.tab.id, {url: warningPageUrl});
      sendResponse("Redirected")
    }
  });