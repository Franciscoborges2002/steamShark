function verifyWebsite() {
  console.log("ASteamShark started!"); //Just to register what ASteamShark did on console

  var url = window.location.href; //Get the url of the page
  console.log("ASteamShark: url is " + url);
  //const scamWebsites = require("../utils/scam.json");

  // Get scam websites, from github repo
  fetch(
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
        isLegit = false;
      } /*else {
            console.log("The website is not in the scam list.");
          }*/
    })
    .catch((error) => {
      isLegit = "error";
      console.error("Error fetching data:" + error);
    });

  // Get legit websites, from github repo
  fetch(
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
      } /*else {
            console.log("The website is not in the scam list.");
          }*/
    })
    .catch((error) => {
      isLegit = "error";
      console.error("Error fetching data:" + error);
    });
}

verifyWebsite();
