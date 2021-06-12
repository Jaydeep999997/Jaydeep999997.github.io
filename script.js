let imageContainer = [
  {
    previewImage:
      "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cat.jpeg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "cooking couple shoot portofilio(1).jpg",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "bali-kelingking-beach-plastic-removal-drive.key",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    title: "NextByk Investor Pitch 2021.ppt",
  },
  {
    previewImage:
      "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    title: "interns-performance-report-june-2021.key",
  },
];

// Pointer which tracks of current image which we are displaying

let imagePointer = 0;

// Initialize the image pointer to the first image and change the style accordingly using IIFE

(function () {
  const previewLocation = document.querySelector("#preview img");
  previewLocation.setAttribute("src", imageContainer[0]["previewImage"]);
  const captionLocation = document.querySelector("#preview figcaption");
  captionLocation.innerText = imageContainer[0]["title"];
  const container = document.querySelector("#img0");
  container.style.backgroundColor = "#045af7";
  const imageTextPos = document.querySelector("#img0 p");
  imageTextPos.style.color = "white";
  const imagePos = document.querySelector("#img0 img");
  imagePos.style.border = `0.17rem solid rgb(51, 237, 243)`;
})();

// Create a description and add truncation class in it.

function createDescription(className, string) {
  let target = document.createElement("span");
  target.classList.add(`${className}`);
  target.innerText = string;

  return target;
}

// Add Event Listener for all the images

for (let imageID = 0; imageID < imageContainer.length; imageID++) {
  let where = `#img${imageID}`;
  const container = document.querySelector(where);
  const imagePos = document.querySelector(`${where} img`);
  imagePos.setAttribute("src", imageContainer[imageID]["previewImage"]);
  const imageInfo = document.querySelector(`${where} p`);

  let half = imageContainer[imageID]["title"].length / 2;
  imageInfo.appendChild(
    createDescription(
      "truncate_left",
      imageContainer[imageID]["title"].slice(0, half)
    )
  );
  imageInfo.appendChild(
    createDescription(
      "truncate_right",
      imageContainer[imageID]["title"].slice(half)
    )
  );

  console.log(imageInfo);
  container.addEventListener("click", function () {
    let allOther = document.querySelectorAll("#menu .img");
    let cnt = 0;
    allOther.forEach((item) => {
      item.style.backgroundColor = "";
      let target = `#img${cnt}`;
      let textColor = document.querySelector(`${target} p`);
      textColor.style.color = "black";
      let imageTarget = document.querySelector(`#img${cnt} img`);
      imageTarget.style.border = "0.17rem solid rgb(61, 2, 12)";
      cnt++;
    });
    container.style.backgroundColor = "#045af7";
    imageInfo.style.color = "white";
    let imagePos = document.querySelector(`${where} img`);
    imagePos.style.border = `0.17rem solid rgb(51, 237, 243)`;
    let previewLocation = document.querySelector("#preview img");
    previewLocation.setAttribute(
      "src",
      imageContainer[imageID]["previewImage"]
    );
    let captionLocation = document.querySelector("#preview figcaption");
    captionLocation.innerText = imageContainer[imageID]["title"];
    imagePointer = imageID;
  });
  imagePointer = 0;
}

// Which actions to take upon up down key press

function upDownEvent(e) {
  e = e || window.event;
  let newImagePointer = imagePointer; // Index of new image which we display
  if (e.keyCode == "38") {
    // up
    newImagePointer = Math.max(0, newImagePointer - 1);
  } else if (e.keyCode == "40") {
    // down
    newImagePointer = Math.min(imageContainer.length - 1, newImagePointer + 1);
  }

  // In case we are on the first image and pressed up or we are on the last image and pressed down
  if (newImagePointer == imagePointer) {
    return;
  }

  // Reset the old image property and add new image property

  const oldContainer = document.querySelector(`#img${imagePointer}`);
  const newContainer = document.querySelector(`#img${newImagePointer}`);
  const oldMenu = document.querySelector(`#img${imagePointer} p`);
  const newMenu = document.querySelector(`#img${newImagePointer} p`);
  const oldImagePos = document.querySelector(`#img${imagePointer} img`);
  const newImagePos = document.querySelector(`#img${newImagePointer} img`);

  oldMenu.style.color = "black";
  oldContainer.style.backgroundColor = "";
  oldImagePos.style.border = "0.17rem solid rgb(61, 2, 12)";

  const previewLocation = document.querySelector("#preview img");
  previewLocation.setAttribute(
    "src",
    imageContainer[newImagePointer]["previewImage"]
  );
  const captionLocation = document.querySelector("#preview figcaption");
  captionLocation.innerText = imageContainer[newImagePointer]["title"];
  newContainer.style.backgroundColor = "#045af7";
  newMenu.style.color = "white";
  newImagePos.style.border = "0.17rem solid rgb(51, 237, 243)";

  imagePointer = newImagePointer;
}

// What to do when Up Down Key is pressed

document.onkeydown = upDownEvent;
