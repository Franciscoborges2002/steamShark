async function verifyWebsite() {
  console.log("🦈steamShark started!"); //Just to register what ASteamShark did on console

  var url = window.location.href; //Get the url of the page
  console.log("🦈steamShark: url is " + url);
  //const scamWebsites = require("../utils/scam.json");

  // Get scam websites, from github repo
  /* fetch(
    "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/scam.json"
  )
    .then((response) => response.json())
    .then((data) => {
      //Make some changes in the url to match the links that we save in the github
      let urlVerify = url
        .replace("http://", "")
        .replace("https://", "")
        .replace("/", "");

      //Verify if its in the list of scam websites
      if (data.data.includes(urlVerify)) {
        console.log("The website is in the scam list.");
        injectScamHTML(url + " is in the scam list!");
        isLegit = false;
      } /*else {
            console.log("The website is not in the scam list.");
          }
    })
    .catch((error) => {
      isLegit = "error";
      console.error("Error fetching data:" + error);
    }); */

  let urlVerify;
  let isLegit = true;
  let dataScam, dataTrust;

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/scam.json"
    );
    dataScam = await response.json();

    // Assuming 'url' is defined somewhere in your scope
    urlVerify = url
      .replace("http://", "")
      .replace("https://", "")
      .replace("/", "");

    /*else {
            console.log("The website is not in the scam list.");
          }*/
  } catch (error) {
    console.error("Error fetching data:", error);
    isLegit = "error";
  }

  // Verify if it's in the list of scam websites
  if (dataScam.data.includes(urlVerify)) {
    console.log("The website is in the scam list.");
    injectScamHTML(url + " is in the scam list!");
    isLegit = false;
  }

  // Get legit websites, from github repo
  /* fetch(
    "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/trust.json"
  )
    .then((response) => response.json())
    .then((data) => {
      //Make some changes in the url to match the links that we save in the github
      var urlObject = new URL(url); //Make an url Object

      var domain = urlObject.origin + "/"; //Get the origin of the url and add "/"

      const isTrustworthy = data.data.some((item) => item.url === domain); //Iterate throught the data from the json to see if the url is in the list

      //Verify if its in the list of scam websites
      if (isTrustworthy) {
        console.log("The website is in the trust list.");
        injectTrustHTML(url + " is in trust list!");
      } /*else {
            console.log("The website is not in the scam list.");
          }
    })
    .catch((error) => {
      isLegit = "error";
      console.error("Error fetching data:" + error);
    }); */

  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/trust.json"
    );
    dataTrust = await response.json();
    /*else {
            console.log("The website is not in the trust list.");
          }*/
  } catch (error) {
    console.error("Error fetching data:", error);
    isLegit = "error";
  }

  // Assuming 'url' is defined somewhere in your scope
  var urlObject = new URL(url); // Make an URL object
  var domain = urlObject.origin + "/"; // Get the origin of the url and add "/"

  const isTrustworthy = dataTrust.data.some((item) => item.url === domain); // Iterate through the data from the JSON to see if the URL is in the list

  // Verify if it's in the list of trustworthy websites
  if (isTrustworthy) {
    console.log("The website is in the trust list.");
    injectTrustHTML(url + " is in trust list!");
  }

  console.log(isLegit); // Example usage
}

verifyWebsite();

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
