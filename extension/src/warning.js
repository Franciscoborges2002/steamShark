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

//get the a tag
let element = document.getElementById("redirectScamWebsite");

//Link the  element to the function
element.addEventListener("click", permitteWebsite);

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
  const [resultJSONpermitted] = await Promise.all([
    getStorageData("permittedWebsites"),
  ]);

  
}