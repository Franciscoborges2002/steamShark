/*
 * Description: When app is installed run the initial functions
 */
chrome.runtime.onInstalled.addListener(() => {
  fetchDataAndStore();
  createHistory();
  createSettings();
  createPermitted();
});

/*
 * Description: Function to create the initial permitted list of the extension in storage.local
 */
function createPermitted() {
  let permittedWebsites = {
    description: "A list the permitted websites!",
    data: [],
  };
  try {
    chrome.storage.local
      .set({ permittedWebsites: JSON.stringify(permittedWebsites) })
      .then(() => {
        console.log(
          "🦈steamShark[BG Service]: permitted Websites Storage Created."
        );
      });
  } catch (error) {
    console.log(
      `🦈steamShark[BG Service]: Error adding permitted Websites in storage.\n ${error}`
    );
  }
}

/*
 * Description: Function to create the initial settings of the extension in storage.local
 */
function createSettings() {
  let settings = {
    description: "A list with the settings to use in the project!",
    data: {
      howManyTimeIgnoreScamWebsite: 300000, // How many time to ignore a scam website, default 5 minutes
      howManyRegisterInHistory: 50, //How many items to register in history
      howManyTimeRegisterRepeatedWebsiteInHistory: 60000, // From which time to time to register a website that was already visited in history, default 60 seconds
      showPopUpInRepeatedTrustedWebsite: true, //Show pop up in a trusted website when visited in less time than of howManyTimeRegisterRepeatedWebsiteInHistory, Default true
      whereToLocatePopup: "tr", //Where to locate the popup, default tr - Top Right. bl - Bottom left
      howManyTimeShowPopup: 10000, // How many time to show the popup, default 10 seconds
      redirectToWarningPage: true, //Redirect to the warning page, if false makes appear a popup instaed of redirect to warning page, Default: true
    },
  };
  try {
    chrome.storage.local
      .set({ settings: JSON.stringify(settings) })
      .then(() => {
        console.log("🦈steamShark[BG Service]: Settings Storage Created.");
      });
  } catch (error) {
    console.log(
      `🦈steamShark[BG Service]: Error adding Settings in storage.\n ${error}`
    );
  }
}

/*
 * Description: Function to create the history in storage.local
 */
function createHistory() {
  let history = {
    description: "The history of websites user searched",
    data: [],
  };

  try {
    chrome.storage.local
      .set({ historyWebsites: JSON.stringify(history) })
      .then(() => {
        console.log(`🦈steamShark[BG Service]: History Storage Created.`);
      });
  } catch (error) {
    console.log(
      `🦈steamShark[BG Service]: Error adding History in storage.\n ${error}`
    );
  }
}

/*
 * Description: Function to fetch data from the github repo
 */
async function fetchDataAndStore() {
  const urls = [
    "https://raw.githubusercontent.com/Franciscoborges2002/steamShark/main/utils/scam.json",
    "https://raw.githubusercontent.com/Franciscoborges2002/steamShark/main/utils/trust.json",
  ];

  let resultJSONTrust;

  await chrome.storage.local.get(["trustWebsites"], (result) => {
    // Parse the retrieved data
    resultJSONTrust = JSON.parse(result.trustWebsites);
  });

  for (const url of urls) {
    try {
      const response = await fetch(url);
      const data = await response.json();

      // Enrich data with last checkup timestamp
      const enrichedData = { ...data, lastCheckup: new Date().toISOString() };

      // Store data in Chrome local storage
      if (url.includes("scam")) {
        chrome.storage.local.set(
          { scamWebsites: JSON.stringify(enrichedData) },
          () => {
            console.log(
              `🦈steamShark[BG Service]: Data from ${url} stored successfully.`
            );
          }
        );
      } else {
        chrome.storage.local.set(
          { trustWebsites: JSON.stringify(enrichedData) },
          () => {
            console.log(
              `🦈steamShark[BG Service]: Data from ${url} stored successfully.`
            );
          }
        );
      }
    } catch (error) {
      console.error(
        `🦈steamShark[BG Service]: Failed to fetch data from ${url}:`,
        error
      );
    }
  }
  /* const urls = [
    "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/scam.json",
    "https://raw.githubusercontent.com/Franciscoborges2002/ASteamShark/main/utils/trust.json",
  ]; */
}

/*
 * Description: Message handler
 */
chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  /*
   * Description: redirect the user to the scam alert page in extension
   */
  if (request.action === "redirectWarningPage") {
    // Get the extension id
    const extensionId = chrome.runtime.id;
    const warningPageUrl = `chrome-extension://${extensionId}/src/warning.html`;

    // Update the tab's URL to navigate to the warning page
    chrome.tabs.update(sender.tab.id, { url: warningPageUrl });
    sendResponse("Redirected");
  }

  /*
   * Description: Register the website in the history of the extension storage
   */
  if (request.action === "registerHistoryStorage") {
    console.log("🦈steamShark[BG Service]: Registering to history!");
    //Parse into a URL object
    const parsedUrl = new URL(sender.url);
    //Get only the hostname of the url
    let domain = parsedUrl.hostname;

    // Remove subdomain if present
    if (domain.includes(".")) {
      domain = domain.split(".").slice(-2).join(".");
    }

    //If the website is trusted, put the https://
    if (request.trusted) {
      //Insert https:// and / in the domain, the domain needs to be identical to the trusted list ones
      domain = "https://" + domain + "/";
    }

    //Get values from the localStorage
    let resultHistory, settings;
    const currentTime = new Date(); //Get the current data to save

    try {
      //Get the items that are inside the storage
      await chrome.storage.local.get(["historyWebsites"]).then((result) => {
        // Parse the retrieved data
        resultHistory = JSON.parse(result.historyWebsites);
      });

      //Get the items that are inside the storage
      await chrome.storage.local.get(["settings"]).then((result) => {
        // Parse the retrieved data
        settings = JSON.parse(result.settings);
      });
    } catch (error) {
      console.log(
        "🦈steamShark[BG Service]: Error while getting the localStorage.\nError: " +
          error
      );
      return sendResponse(
        "🦈steamShark[BG Service]: Error while getting the localStorage!"
      );
    }

    //There is nothing on the list create a new one and save it
    if (resultHistory === undefined) {
      console.log(`🦈steamShark[BG Service]: There is no history, creating.`);
      let history = {
        description: "The history of websites user searched",
        data: [
          {
            url: domain,
            visited: currentTime,
          },
        ],
      };

      //Wrap the save function
      try {
        chrome.storage.local
          .set({ historyWebsites: JSON.stringify(history) })
          .then(() => {
            console.log(`🦈steamShark[BG Service]: History Storage Created.`);
          });
      } catch (error) {
        console.log(
          "🦈steamShark[BG Service]: Error while saving into the localStorage.\nError: " +
            error
        );
        return sendResponse(
          "🦈steamShark[BG Service]: Error while saving into the localStorage!"
        );
      }
    } else {
      //If there are already some history
      console.log(`🦈steamShark[BG Service]: Adding Website to the list.`);

      if (resultHistory.data.length === 0) {
        //If it is the first time we are adding to the history list
        resultHistory.data.unshift({
          url: domain,
          visited: currentTime,
        });
      } else if (
        resultHistory.data.length > 0 &&
        resultHistory.data[0].url === domain &&
        currentTime.getTime() -
          new Date(resultHistory.data[0].visited).getTime() <
          settings.data.howManyTimeRegisterRepeatedWebsiteInHistory
      ) {
        //If theres at least on item if the last url is the same as we trying to add, and the time is higher than the time that is in the settings,
        // dont add the website to the history

        console.log(
          `🦈steamShark[BG Service]: Skipping ${domain} as it was recently visited.`
        );
        return sendResponse({
          message: `🦈steamShark[BG Service]: Skipping ${domain} as it was recently visited! Website was already registered less than ${
            settings.data.howManyTimeRegisterRepeatedWebsiteInHistory * 1000
          } minutes ago!`,
        });
      } else if (
        resultHistory.data.length >= settings.data.howManyRegisterInHistory
      ) {
        //If the list is bigger than the max amount of register, remove the last item

        resultHistory.data = resultHistory.data.slice(-1);

        console.log(resultHistory);

        resultHistory.data.unshift({
          url: domain,
          visited: currentTime,
        });

        console.log(resultHistory);
      } else {
        //Just add the website to the list
        resultHistory.data.unshift({
          url: domain,
          visited: currentTime,
        });
      }

      console.log(resultHistory);

      try {
        chrome.storage.local.set(
          { historyWebsites: JSON.stringify(resultHistory) },
          () => {
            console.log(
              `🦈steamShark[BG Service]: ${domain} stored successfully.`
            );
          }
        );
      } catch (error) {
        console.log(
          "🦈steamShark[BG Service]: Error while saving into the localStorage.\nError: " +
            error
        );
        return sendResponse({
          message:
            "🦈steamShark[BG Service]: Error while saving into the localStorage!",
        });
      }
    }

    return sendResponse({
      message:
        "🦈steamShark[BG Service]: Website Registered to storage history!",
    });
  }

  /*
   * Description: refetch the data from the github, will happen from hour to hour
   */
  if (request.action === "fetchData") {
    fetchDataAndStore()
      .then(() => {
        // Optionally, send a response back to the main extension
        console.log("🦈steamShark[BG Service]: Data fetched!");
        /* self.clients.matchAll().then((clients) => {
          clients.forEach((client) =>
            client.postMessage({ message: "Data fetched and stored." })
          );
        }); */
        sendResponse("🦈steamShark[BG Service]: Data fetched and stored!");
      })
      .catch((error) => {
        console.error(
          "🦈steamShark[BG Service]: Failed to fetch and store data:",
          error
        );
        // Optionally, notify the main extension of the failure
        /* self.clients.matchAll().then((clients) => {
          clients.forEach((client) =>
            client.postMessage({ message: "Failed to fetch and store data." })
          );
        }); */
        sendResponse(
          "🦈steamShark[BG Service]: Failed to fetch and store data!"
        );
      });
  }
});
