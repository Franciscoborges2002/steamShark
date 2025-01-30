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

  const [resultJSONTrust, resultJSONScam, resultJSONhistory] =
    await Promise.all([
      getStorageData("trustWebsites"),
      getStorageData("scamWebsites"),
      getStorageData("historyWebsites"),
    ]);

  const historyList = document.getElementById("historyList");

  // Clear existing items
  historyList.innerHTML = "";

  console.log(resultJSONhistory.data);

  if (resultJSONhistory.data.length === 0) {
    //If there is no item to be displayed
    console.log("none to display");
    const paragraph = document.createElement("p");
    paragraph.textContent = "No history to display!";
    paragraph.style.fontSize = "x-large";
    historyList.classList.add("historyListNoContent");
    historyList.appendChild(paragraph);
  } else {
    //If there are items to be displayed
    // Add each item to the list
    resultJSONhistory.data.forEach((item) => {
      let itemName;

      //create the main object for the card
      const divCardItemList = document.createElement("div");
      divCardItemList.classList.add("itemCard");

      //create the left div
      const leftDiv = document.createElement("div");
      leftDiv.classList.add("itemCardDivLeft");
      const rightDiv = document.createElement("div");
      rightDiv.classList.add("itemCardDivRight");

      //create the square to be on the left
      const divTrust = document.createElement("div");
      divTrust.classList.add("trustSquare");

      //Create the icons and give the needed atributes
      let imgClock = document.createElement("img");
      imgClock.src = "../../public/icons/clock.svg";
      imgClock.classList.add("icon");

      let imgCalendar = document.createElement("img");
      imgCalendar.src = "../../public/icons/calendar.svg";
      imgCalendar.classList.add("icon");

      //If the items is in the trusted list
      if (containsTrusted(item.url, resultJSONTrust)) {
        //make the itemName object and give the neede atributes
        itemName = document.createElement("a");
        itemName.target = "_blank";
        itemName.textContent = `${item.url}`;
        itemName.href = item.url;
        itemName.classList.add("outsideLink");

        //itemVisited.classList.add("visited");

        divTrust.classList.add("trusted");

        //give the needed atributes to the devTrust element
      }

      //If the items is in the scam list
      if (containsScam(item.url, resultJSONScam)) {
        itemName = document.createElement("p");
        itemName.textContent = `${item.url}`;

        divTrust.classList.add("notTrusted");
      }

      //make the elemts to the date and hours
      let itemVisitedDate = document.createElement("p");
      let itemVisitedHour = document.createElement("p");

      //Get the a date object from the date stored in the item
      const dateObject = new Date(item.visited);

      itemVisitedDate.textContent =
        dateObject.getFullYear() +
        "/" +
        String(dateObject.getMonth() + 1).padStart(2, "0") +
        "/" +
        String(dateObject.getDate()).padStart(2, "0");

      //Give
      itemVisitedHour.textContent =
        String(dateObject.getHours()).padStart(2, "0") +
        ":" +
        String(dateObject.getMinutes()).padStart(2, "0") +
        ":" +
        String(dateObject.getSeconds()).padStart(2, "0");

      //give style to the main component
      historyList.classList.add("historyListWithContent");

      //append elements to left div
      leftDiv.appendChild(divTrust);
      leftDiv.appendChild(itemName);

      //append elements to right div
      rightDiv.appendChild(imgCalendar);
      rightDiv.appendChild(itemVisitedDate);
      rightDiv.appendChild(imgClock);
      rightDiv.appendChild(itemVisitedHour);

      divCardItemList.appendChild(leftDiv);
      divCardItemList.appendChild(rightDiv);

      //append the elements
      historyList.appendChild(divCardItemList);
    });
  }
});

/*
Funtion to return a boolean if the website is in the scam list
*/
function containsScam(url, allList) {
  if (!Array.isArray(allList?.data)) {
    throw new Error("allList.data is not an array");
  }
  return allList.data.includes(url);
}

/*
Funtion to return a boolean if the website is in the trusted list
*/
function containsTrusted(url, allList) {
  console.log(url);
  if (!Array.isArray(allList?.data)) {
    throw new Error("allList.data is not an array");
  }
  return allList.data.filter((item) => item.url === url).length > 0;
}

document
  .getElementById("cleanHistory")
  .addEventListener("click", async function () {
    let history = {
      description: "The history of websites user searched",
      data: [],
    };

    try {
      chrome.storage.local
        .set({ historyWebsites: JSON.stringify(history) })
        .then(() => {
          console.log(`🦈steamShark[BG Service]: History Storage cleared.`);
          location.reload();
        });
    } catch (error) {
      console.log(
        `🦈steamShark[BG Service]: Error clearing History in storage.\n ${error}`
      );
    }
  });
