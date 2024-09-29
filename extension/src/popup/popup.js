// popup.js
/* document.addEventListener("DOMContentLoaded", () => {
  const openPanelBtn = document.getElementById("openPanelBtn");

  openPanelBtn.addEventListener("click", () => {
    // Open the side panel
    console.log(chrome.windows.WINDOW_ID_CURRENT);
    //

    // Send a test message to the side panel
    //
    
    //get the current tabs and do a query for the active one
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      //get the first value of the query because that one is the active
      var currTab = tabs[0];
      // Sanity check
      if (currTab) {
        let idCurrTab = currTab.id;
        chrome.sidePanel.open({ windowId: idCurrTab });
        chrome.runtime.sendMessage({ action: "openSidePanel", idCurrTab });
      }
    });
  });
}); */
