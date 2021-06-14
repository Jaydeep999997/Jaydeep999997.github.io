// List of images to display along with title

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

// Pointer which tracks of current image which we are displaying (-1 => nothing is displayed initially)
let imagePointer = -1;

// Set thumbnail and title for image with id = 'imageID'
function setThumbnail(imageID) {
  // const container = document.querySelector(`#img${imageID}`);
  const imagePos = document.querySelector(`#img${imageID} img`);
  document
    .querySelector(`#img${imageID} img`)
    .setAttribute("src", imageContainer[imageID]["previewImage"]);
  document.querySelector(`#img${imageID} p`).innerText =
    imageContainer[imageID]["title"];
}

// Switching between two images 'prevID' => 'currID'
function switchImage(prevID, currID) {
  if (prevID !== -1) {
    // Initially prevID = -1
    let prevDiv = document.querySelector(`#img${prevID}`);
    prevDiv.classList.remove("highlight");
  }
  let currDiv = document.querySelector(`#img${currID}`);
  currDiv.classList.add("highlight");
  document
    .querySelector("#preview img")
    .setAttribute("src", imageContainer[currID]["previewImage"]);
  document.querySelector("#preview figcaption").innerText =
    imageContainer[currID]["title"];
  imagePointer = currID;
}

// Add event listener for 'click' event
function switchEventListener(imageID) {
  const container = document.querySelector(`#img${imageID}`);
  container.addEventListener("click", function () {
    if (imageID == imagePointer) {
      return;
    }
    switchImage(imagePointer, imageID);
  });
}

// Create a new container having img and p fields
function getNewElement(imageID) {
  let container = document.createElement("div");
  container.classList.add("img");
  container.setAttribute("id", `img${imageID}`);
  container.appendChild(document.createElement("img"));
  container.appendChild(document.createElement("p"));
  return container;
}

// Initialize thumbnails of every image
for (let imageID = 0; imageID < imageContainer.length; imageID++) {
  document.querySelector("#menu").appendChild(getNewElement(imageID));
  setThumbnail(imageID);
  switchEventListener(imageID);
}

// Set initial image as the first one
switchImage(-1, 0);

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
  switchImage(imagePointer, newImagePointer);
}

// Truncation Part depending on width requirement and width availability
function setText(item, title) {
  let maxLength = Math.floor(
    (title.length * item.clientWidth) / item.scrollWidth
  );
  maxLength = Math.min(maxLength, title.length);
  if (item.scrollWidth > item.clientWidth) {
    // Don't have enough space for the content to fit
    maxLength -= 3;
  }
  let newTitle = "";
  let lLength = maxLength / 2;
  newTitle += title.substr(0, lLength);
  if (item.scrollWidth > item.clientWidth) {
    newTitle += "...";
  }
  let rLength = maxLength - lLength;
  newTitle += title.substr(title.length - rLength, rLength);
  item.innerText = newTitle;
}

// Call setText for every thumbnail
function truncate() {
  let thumbnails = document.querySelectorAll(".img");
  console.log(thumbnails);
  thumbnails.forEach((item, Index) =>
    setText(item.querySelector("p"), imageContainer[Index]["title"])
  );
}

document.onkeydown = upDownEvent;

// Initially set the thumbnail title
truncate();

// On every window resize set the title appropriately after performing truncation
window.addEventListener("resize", truncate);
