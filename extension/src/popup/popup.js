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

document.addEventListener("DOMContentLoaded", () => {
  const contentDiv = document.querySelector(".content");
  const extensionId = chrome.runtime.id;

  //Create items
  const outtterDiv = document.createElement("div"); //Outter div
  const ulItem = document.createElement("ul"); //Main undordered lsit
  const ilSettings = document.createElement("li"); //List item for Settings
  const ilHistory = document.createElement("li"); //List item for History
  const aSettings = document.createElement("a");
  const aHistory = document.createElement("a");

  //Create Settings Link
  aSettings.href = `chrome-extension://${extensionId}/src/pages/settings.html`;
  aSettings.target = "_blank";
  aSettings.textContent = "Settings";
  //Create History Link
  aHistory.href = `chrome-extension://${extensionId}/src/pages/history.html`;
  aHistory.target = "_blank";
  aHistory.textContent = "History";

  //Append a items to il's
  ilSettings.appendChild(aSettings);
  ilHistory.appendChild(aHistory);

  //Append both il's to main ul
  ulItem.appendChild(ilSettings);
  ulItem.appendChild(ilHistory);

  //Append ul to an outter div
  outtterDiv.appendChild(ulItem);

  //Add html to the page
  contentDiv.insertAdjacentHTML("beforeend", outtterDiv.innerHTML);
});
