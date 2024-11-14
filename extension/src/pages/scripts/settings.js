//Function to set the values from the saved settings
async function setSelectValueFromSettings() {
  //wrap everything in a try catch
  try {
    const getStorageData = (key) =>
      new Promise((resolve, reject) => {
        chrome.storage.local.get([key], (result) => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
          } else {
            resolve(JSON.parse(result[key]));
          }
        });
      });

    const [retulstJSONSettings] = await Promise.all([
      getStorageData("settings"),
    ]);

    //check if storage settings exist
    if (retulstJSONSettings) {
      //Put the showPopUpInRepeatedTrustedWebsite in popup options
      document.getElementById("showPopUpInRepeatedTrustedWebsite").value =
        retulstJSONSettings.data.showPopUpInRepeatedTrustedWebsite;

      //Put the redirectToWarningPage in scam website options
      document.getElementById("redirectToWarningPage").checked =
        retulstJSONSettings.data.redirectToWarningPage;

      //Put the redirectToWarningPage in scam website options
      document.getElementById(
        "howManyTimeRegisterRepeatedWebsiteInHistory"
      ).value = Math.round(
        retulstJSONSettings.data.howManyTimeRegisterRepeatedWebsiteInHistory /
          1000
      );

      document.getElementById("howManyTimeIgnoreScamWebsite").value =
        Math.round(
          retulstJSONSettings.data.howManyTimeIgnoreScamWebsite / 60000
        );

      document.getElementById("howManyRegisterInHistory").value =
        retulstJSONSettings.data.howManyRegisterInHistory;

      document.getElementById("whereToLocatePopup").value =
        retulstJSONSettings.data.whereToLocatePopup;

      console.log(retulstJSONSettings.data);

      document.getElementById("howManyTimeShowPopup").value =
        retulstJSONSettings.data.howManyTimeShowPopup / 1000;
    } else {
      console.warn("🦈steamShark[Options]: Settings not found in storage.");
    }
  } catch (error) {
    console.error(
      "🦈steamShark[Options]: Error setting select value!\n",
      error
    );
  }
}

//function to add the function
window.addEventListener("load", setSelectValueFromSettings());

/* Add the tooltip */
const infoIcon = document.getElementById("infoIcon");
const tooltip = document.getElementById("tooltip");

infoIcon.addEventListener("mouseenter", function () {
  tooltip.style.display = "block";
});

infoIcon.addEventListener("mouseleave", function () {
  tooltip.style.display = "none";
});
/* END OF Add the tooltip */

//Function to save the button
document.getElementById("saveBtn").addEventListener("click", async function () {
  try {
    const showPopUpInRepeatedTrustedWebsite =
      document.getElementById("showPopUpInRepeatedTrustedWebsite").value ===
      "true"; //get the value and pass it to boolean

    const redirectToWarningPage = document.getElementById(
      "redirectToWarningPage"
    ).checked; //get the value and pass it to boolean

    const howManyTimeRegisterRepeatedWebsiteInHistory =
      document.getElementById("howManyTimeRegisterRepeatedWebsiteInHistory")
        .value * 1000;

    const howManyRegisterInHistory = document.getElementById(
      "howManyRegisterInHistory"
    ).value;

    const howManyTimeIgnoreScamWebsite =
      document.getElementById("howManyTimeIgnoreScamWebsite").value * 60000;

    const whereToLocatePopup =
      document.getElementById("whereToLocatePopup").value;

    const howManyTimeShowPopup =
      document.getElementById("howManyTimeShowPopup").value * 1000;
    console.log(howManyTimeShowPopup);

    //create the new object, with the settings
    let settings = {
      description: "A list with the settings to use in the project!",
      data: {
        howManyTimeIgnoreScamWebsite: howManyTimeIgnoreScamWebsite, // How many time to ignore a scam website, default 5 minutes
        howManyRegisterInHistory: howManyRegisterInHistory, // How many items to register
        howManyTimeRegisterRepeatedWebsiteInHistory:
          howManyTimeRegisterRepeatedWebsiteInHistory, // From which time to time to register a website that was already visited in history, default 5 mins
        showPopUpInRepeatedTrustedWebsite: showPopUpInRepeatedTrustedWebsite, //Show pop up in a trusted website when visited in less time than of howManyTimeRegisterRepeatedWebsiteInHistory, Default true
        redirectToWarningPage: redirectToWarningPage, //Redirect to the warning page, if false makes appear a popup instaed of redirect to warning page, Default: true
        howManyTimeShowPopup: howManyTimeShowPopup, // How many time to show the popup
        whereToLocatePopup: whereToLocatePopup, // Where to locate the popup
      },
    };

    try {
      chrome.storage.local
        .set({ settings: JSON.stringify(settings) })
        .then(() => {
          console.log("🦈steamShark[BG Service]: History Storage Saved.");
          injectPopup(true);
        });
    } catch (error) {
      injectPopup(false);
      console.log(
        `🦈steamShark[BG Service]: Error saving History in storage.\n ${error}`
      );
    }
  } catch (error) {
    console.error(
      `🦈steamShark[Options]: Error saving settings to localStorage: ${error}`
    );
  }
});

document
  .getElementById("reloadBtn")
  .addEventListener("click", async function () {
    try {
      //Make call to background js to fetch data
      chrome.runtime.sendMessage({ action: "fetchData" });
    } catch (error) {
      console.error(
        `🦈steamShark[Options]: Error saving settings to localStorage: ${error}`
      );
    }
  });

function injectPopup(succeded) {
  const body = document.querySelector("body");
  const newDiv = document.createElement("div");
  const closeButton = document.createElement("button"); //button to make it disappear

  if (succeded) {
    //Add the text
    newDiv.innerHTML = "<h5>🦈steamShark Settings saved!</h5>";
    newDiv.style.backgroundColor = "rgba(11,156,49,0.85)";
  } else {
    //Add the text
    newDiv.innerHTML = "<h5>🦈steamShark Error saving the settings</h5>";
    newDiv.style.backgroundColor = "rgba(255,3,3,0.85)";
  }

  // Assign a unique ID to the div
  newDiv.id = "trustPopup";

  //Add propreties to the butotn
  closeButton.textContent = "X";
  closeButton.style.width = "50px";
  closeButton.style.height = "50px";
  closeButton.style.backgroundColor = "white";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "5px";
  closeButton.style.cursor = "pointer";
  closeButton.style.fontWeight = "bolder";
  closeButton.addEventListener("click", function () {
    newDiv.remove(); // Remove the popup when the button is clicked
  });

  newDiv.appendChild(closeButton); // Append the button to the newDiv

  //Div style
  newDiv.style.position = "fixed"; // Added this line
  newDiv.style.top = "4rem";
  newDiv.style.right = "1rem";
  newDiv.style.zIndex = "9999"; // Increased z-index
  newDiv.style.padding = "1rem"; // Add padding around the content
  newDiv.style.display = "flex";
  newDiv.style.flexDirection = "row";
  newDiv.style.gap = "1.5rem";
  newDiv.style.justifyContent = "space-between";
  newDiv.style.borderRadius = "0.75rem";
  newDiv.style.width = "300px";
  newDiv.style.fontSize = "x-large";
  newDiv.style.color = "white";

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
