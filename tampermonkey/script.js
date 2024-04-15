// ==UserScript==
// @name         ASteamShark
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Check if a website that you can login through steam is scam or not.
// @author       Francisco Borges
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at     document-end
// ==/UserScript==

//THE SCRIPT IS NOT READY FOR USE YET

window.addEventListener("load", function () {
  "use strict";

  console.log("ASteamShark is working!");

  var url = document.URL; //Get the url of the page
  console.log("ASteamShark: url is " + url);

  let isLegit = true; //Just to test

  //If the page is safe to use
  if (isLegit) {
    const $ = document.querySelector.bind(document);
    setTimeout(() => {
      $("body").insertAdjacentHTML("afterbegin", initLegit());
    }, 1500);
  } else {
    //If the page is a scamming one
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

            .popuptext{
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
        </div>
        </div>
        <style>
            .wrapper{z-index:99999999;top:10vh;left:0;width:100vw;height:100vh;text-align:center;font-size:5rem;background-color:white;}
        </style>
        `;
}
