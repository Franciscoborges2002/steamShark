const websiteURL = "";

document.addEventListener("DOMContentLoaded", async function () {
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

  //get the values from the chrome localStorage
  const [resultJSONhistory] = await Promise.all([
    getStorageData("historyWebsites"),
  ]);

  let item = resultJSONhistory.data[0];

  //get the space to put the url
  const nameWebsite = document.getElementById("nameScamWebsite");
  nameWebsite.textContent = item.url; //change the text to the name page

  const urlWebsite = document.getElementById("urlScamWebsite");
  urlWebsite.textContent = item.url;

  const redirectWebsite = document.getElementById("redirectScamWebsite");
  redirectWebsite.href = "https://" + item.url;
});

//Link the  element to the function
document
  .getElementById("redirectScamWebsite")
  .addEventListener("click", permitteWebsite);

//If clicked to access the website anyway, add the website to permitted list
async function permitteWebsite() {
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

  //get the values from the chrome localStorage
  const [resultJSONpermitted, resultJSONhistory, resultJSONsettings] =
    await Promise.all([
      getStorageData("permittedWebsites"),
      getStorageData("historyWebsites"),
      getStorageData("settings"),
    ]);

  const lastScamWebsite = getLastScAMWebsite(resultJSONhistory);

  const newPermitted = {
    url: lastScamWebsite,
    timestamp: Date.now(),
    visitDuration: resultJSONsettings.data.howManyTimeIgnoreScamWebsite,
  };

  let permitted = [...resultJSONpermitted.data];
  permitted.push(newPermitted);
  resultJSONpermitted.data = permitted;

  try {
    chrome.storage.local
      .set({ permittedWebsites: JSON.stringify(resultJSONpermitted) })
      .then(() => {
        console.log("🦈steamShark[BG Service]: Permitted Website Saved.");
      });
  } catch (error) {
    console.log(
      `🦈steamShark[BG Service]: Error saving History in storage.\n ${error}`
    );
  }
}

function getLastScAMWebsite(scamWebsite) {
  if (!Array.isArray(scamWebsite.data)) {
    throw new Error("Invalid data format");
  }

  const lastScamEntry = scamWebsite.data.findLast((item) => {
    // Check if the URL doesn't start with http:// or https://
    const url = item.url;
    return !url.match(/^https?:\/\//i);
  });

  return lastScamEntry ? lastScamEntry.url : null;
}
