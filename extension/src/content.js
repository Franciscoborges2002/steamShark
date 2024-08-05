let resultJSONScam, resultJSONTrust; // Define resultJSON in the outer scope

//Get scam Websites from storage local
chrome.storage.local.get(["scamWebsites"], (result) => {
  // Parse the retrieved data
  resultJSONScam = JSON.parse(result.scamWebsites);

  const currentTime = new Date();
  const lastCheckupTime = new Date(resultJSONScam.lastCheckup);
  const hoursSinceLastCheckup = Math.abs(currentTime - lastCheckupTime) / 60; //1000 * 60 * 60

  if (hoursSinceLastCheckup > 1) {
    // Send a message to the service worker to fetch and store new data
    console.log("Fetching data!");
    chrome.runtime.sendMessage({ message: "fetchData" });
  } else {
    console.log("Less than 1 min has passed since the last checkup.");
  }
});

//Get trust Websites from storage local
chrome.storage.local.get(["trustWebsites"], (result) => {
  // Parse the retrieved data
  resultJSONTrust = JSON.parse(result.trustWebsites);

  const currentTime = new Date();
  const lastCheckupTime = new Date(resultJSONTrust.lastCheckup);
  const hoursSinceLastCheckup = Math.abs(currentTime - lastCheckupTime) / 60; //1000 * 60 * 60

  if (hoursSinceLastCheckup > 1) {
    // Send a message to the service worker to fetch and store new data
    console.log("Fetching data!");
    chrome.runtime.sendMessage({ message: "fetchData" });
  } else {
    console.log("Less than 1 min has passed since the last checkup.");
  }
});

//Main function
async function verifyWebsite() {
  console.log("🦈steamShark started!"); //Just to register what ASteamShark did on console

  var url = window.location.href; //Get the url of the page
  console.log("🦈steamShark: url is " + url);
  //const scamWebsites = require("../utils/scam.json");

  let urlVerify;
  let isLegit = true;

  // Remove the http and https for scam website list
  urlVerify = url
    .replace("http://", "")
    .replace("https://", "")
    .replace("/", "");

  // Verify if it's in the list of scam websites
  if (resultJSONScam.data.includes(urlVerify)) {
    console.log("The website is in the scam list.");
    //injectScamHTML(url + " is in the scam list!");
    isLegit = false;

    /* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      chrome.runtime.sendMessage({ action: "redirectWarningPage" });
    }); */
    //Send a message to service worker to redirect to scam website page
    const response = await chrome.runtime.sendMessage({ action: "redirectWarningPage" });
    // do something with response here, not outside the function
    console.log(response);
  }

  var urlObject = new URL(url); // Make an URL object
  var domain = urlObject.origin + "/"; // Get the origin of the url and add "/"

  const isTrustworthy = resultJSONTrust.data.some(
    (item) => item.url === domain
  ); // Iterate through the data from the JSON to see if the URL is in the list

  // Verify if it's in the list of trustworthy websites
  if (isTrustworthy) {
    console.log("The website is in the trust list.");
    injectTrustHTML(url + " is in trust list!");
  }

  console.log(isLegit); // Example usage
}

// Access resultJSON.data outside the callback function
setTimeout(() => {
  console.log(resultJSONScam.data); // This will log the data once it's available
  verifyWebsite();
}, 1000); // Adjust the timeout as needed

/*
 * Function to inject the html into the page.
 */
function injectTrustHTML(textAdd) {
  console.log("injecting");
  let body = document.querySelector("body");
  let newDiv = document.createElement("div");
  let closeButton = document.createElement("button"); //button to make it disappear

  //The text to add to the div
  textAdd = new URL(textAdd).hostname;

  // Assign a unique ID to the div
  newDiv.id = "trustPopup";
  //Add the text
  newDiv.innerHTML = `<h5>🦈 ${textAdd} is trusted!</h5>`;

  //Add propreties to the butotn
  closeButton.textContent = "X";
  closeButton.addEventListener("click", function () {
    newDiv.remove(); // Remove the popup when the button is clicked
  });

  newDiv.appendChild(closeButton); // Append the button to the newDiv

  //Div style
  newDiv.style.position = "fixed"; // Added this line
  newDiv.style.top = "4rem";
  newDiv.style.right = "1rem";
  newDiv.style.zIndex = "9999"; // Increased z-index
  newDiv.style.backgroundColor = "rgba(11,156,49,0.85)";
  newDiv.style.padding = "1rem"; // Add padding around the content
  newDiv.style.display = "flex";
  newDiv.style.flexDirection = "row";
  newDiv.style.gap = "1.5rem";
  newDiv.style.justifyContent = "space-between";
  newDiv.style.borderRadius = "0.75rem";

  //button style
  //closeButton.style.color = "white";

  body.insertAdjacentElement("beforebegin", newDiv);

  // Schedule the div to be removed after 10 seconds
  setTimeout(function () {
    let popupToRemove = document.getElementById("trustPopup");
    if (popupToRemove) {
      popupToRemove.remove();
    }
  }, 10000); // 10000 milliseconds = 10 seconds
}

/*
 * Function to inject the html into the page.
 */
function injectScamHTML(textAdd) {
  let body = document.querySelector("body");
  let newDiv = document.createElement("div");
  newDiv.innerHTML = `<p></p><h3>${textAdd}</h3>
                      <button>X</button>
  `;

  newDiv.style.backgroundColor = "rgba(230,0,0,0.4)";
  newDiv.style.padding = "10px";
  newDiv.style.display = "flex";
  newDiv.style.flexDirection = "row";
  newDiv.style.justifyContent = "space-between";
  newDiv.style.paddingRight = "30px";

  body.insertAdjacentElement("beforebegin", newDiv);
}
