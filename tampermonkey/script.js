// ==UserScript==
// @name         ASteamShark
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Check if a website that you can login through steam is scam or not.
// @author       Francisco Borges
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-end
// ==/UserScript==

//THE SCRIPT IS NOT READY FOR USE YET

window.addEventListener("load", function () {
  "use strict";

  console.log("ASteamShark is working!");

  var url = document.URL; //Get the url of the page
  console.log("ASteamShark: url is " + url);

  let isLegit = "nothing"; //Just to test

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

        const $ = document.querySelector.bind(document);
        setTimeout(() => {
          $("body").insertAdjacentHTML("afterbegin", initScam());
        }, 1500);
      } /*else {
            console.log("The website is not in the scam list.");
          }*/
    })
    .catch((error) => {
      isLegit = "error";
      console.error("Error fetching data:", error);
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

        const $ = document.querySelector.bind(document);
        setTimeout(() => {
          $("body").insertAdjacentHTML("afterbegin", initLegit());
        }, 1500);
      } /*else {
            console.log("The website is not in the scam list.");
          }*/
    })
    .catch((error) => {
      isLegit = "error";
      console.error("Error fetching data:", error);
    });

  console.log("e legit: " + isLegit);

  //If the url provided, was not encountered in the lists
  if (isLegit === "nothing") {
    console.log("ASteamShark, nothing encountered in lists.");
    return;
  }

  //If there was an error making the requests to fetch
  if (isLegit === "error") {
  }

  //If the page is safe to use
  if (isLegit) {
  } else {
    //If the page is a scamming one}
  }

  //get the list of trustworthy steam websites
  //console.log("ASteamShark: " + trust.json);

  /*const $ = document.querySelector.bind(document);
        setTimeout(() => {
            $('body').insertAdjacentHTML('afterbegin', init_css() );
        },1500);*/
});

//Function to put a sticker saying that the page is trust worthy
function initLegit() {
  return `
            <div class="popup">
                <span class="popuptext" id="myPopup">ASteamShark: This website is Legit!</span>
                <button onclick="closePopup()">X</button>
            </div>
            <style>
                .popup{
                    z-index:99999999;
                    position:fixed;
                    margin: 20px;
                    top:2vh;
                    right:0;
                    width:30%;
                    background-color: rgba(11,156,49,0.4);
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                }
  
                .popup .popuptext{
                    font-size:1rem;
                    color:white;
                }
  
                /* Toggle this class - hide and show the popup */
                .popup .show {
                    visibility: visible;
                    /*-webkit-animation: fadeIn 1s;*/
                    /*animation: fadeIn 1s;*/
                }
  
                /* Add animation (fade in the popup) */
                @-webkit-keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
  
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
  
                button{
                    cursor: pointer;
                }
            </style>
  
            <script>
            // When the user clicks on div, open the popup
            function closePopup() {
              var popup = document.getElementById("myPopup");
              popup.classList.toggle("show");
  
              // Hide the popup after 10 seconds
            setTimeout(function() {
                popup.classList.remove("show");
            }, 1000); // 10000 milliseconds = 10 seconds
             }
            </script>
            `;
}

//Function to init the css of the page if was one of the scamming websites
function initScam() {
  return `
  <div class="wrapper">
  <div class="textPart">
      <h1 class="header">Website name is a scam!</h1>

      <p>This website was found in <a href="https://github.com/Franciscoborges2002/ASteamShark"
              target="_blank">ASteamShark</a> scam list, we highly advise you to dont login to this website with your
          steam.</p>

      <div class="actions">
          <p class="textActions">Actions:</p>
          <button class="danger">Go to website</button>
          <button class="safety">Close Website</button>
      </div>

      <div class="helpPart">
          <p class="textActions">You think this website is not a scam:</p>
          <button class="contribution">Sugest to the list</button>
      </div>

  </div>
  <footer class="footer">
      <!-- Footer content goes here -->
      <a href="https://github.com/Franciscoborges2002/ASteamShark" target="_blank">ASteamShark</a> scam webpage.
  </footer>
</div>
<style>
  * {
      margin: 0px;
      padding: 0px;
  }

  .wrapper {
      z-index: 10;
      width: 100%;
      height: 100%;
      background-color: rgba(217, 30, 24, 0.6);
      backdrop-filter: blur(6px);
      /* Add blur effect */
      display: flex;
      flex-direction: column;
  }

  .textPart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1 0 auto;
  }

  h1 {
      font-size: 2rem;
  }

  .actions,
  .helpPart {
      margin-top: 30px;
      text-align: center;
  }

  .textActions {
      font-size: 1.5rem;
  }

  .safety {
      background-color: #04AA6D;
      /* Green */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      -webkit-transition-duration: 0.4s;
      /* Safari */
      transition-duration: 0.4s;
  }

  .safety:hover {
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }

  .danger {
      background-color: #C41E3A;
      /* red */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      -webkit-transition-duration: 0.4s;
      /* Safari */
      transition-duration: 0.4s;
  }

  .danger:hover {
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }

  .contribution {
      background-color: #6082B6;
      /* gray */
      border: none;
      color: white;
      padding: 15px 32px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      -webkit-transition-duration: 0.4s;
      /* Safari */
      transition-duration: 0.4s;
  }

  .contribution:hover {
      box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
  }

  .footer {
      flex-shrink: 0;
      /* This prevents the footer from shrinking */
      /* Add your footer styling here */
  }
</style>
<script>

</script>
            `;
}
