// Hi! I thought I'd add some commentary to my build.
// I planned this build on paper and sketched a few things out - I also wrote a basic structure of how I would code this app -m should be fun

// The below area is where I will declare global / universal variables

const body = document.querySelector("body");
const darkLightToggle = document.getElementById("dark-light-toggle");

// MAIN OBJECT ARRAY
// This array will store the objects created by the createObject function
const objectArr = [];

// CONSTRUCT OBJECT FUNCTION
// Here I construct the object utilising the this keyword...
function ConstructObject(item, description, link, price, id, star) {
  this.item = item;
  this.description = description;
  this.link = link;
  this.price = price;
  this.id = id;
  this.star = star;
}

// CREATE OBJECT FUNCTION
// Here I will create the object with a function
function createObject() {
  getRandomId();
  let item = document.getElementById("item-input").value;
  let description = document.getElementById("description-input").value;
  let link = document.getElementById("link-input").value;
  let price = document.getElementById("price-input").value;
  let itemId = newId.join(" ");
  let star = false;

  // Validation: Check if item and description are empty
  if (!item.trim() || !description.trim()) {
    alert("Please add an item or description!");
    return; // Abort the function if inputs are empty
  }

  //   CONSTRUCT the new object
  const newObject = new ConstructObject(
    item,
    description,
    link,
    price,
    itemId,
    star
  );

  objectArr.push(newObject);
  clearInputValues();
}

// The next step for me is to render the HTML of the individual objects to the DOM

// RENDER OBJECT HTML FUNCTION
const outputSection = document.getElementById("output-section");
function renderObjectHTML() {
  outputSection.innerHTML = ``;

  objectArr.forEach((item) => {
    // I need to check if both link and price are provided...!
    const hasLinkAndPrice = item.link && item.price;

    outputSection.innerHTML += `
            <div class="card-container" id="${item.id}">
              <div class="outer-object-card">
                <div class="item-box">
                  <h3>${item.item}</h3>
                  <p>${item.description}</p>
                  ${hasLinkAndPrice ? `<p>Price: ${item.price}</p>` : ""}
                  ${
                    hasLinkAndPrice
                      ? `<p><a href="${item.link}" target="_blank">View product here!</a></p>`
                      : ""
                  }
                </div>
              </div>
              <div class="item-ui">
                <div class="star-icon">${item.star ? "★" : "✩"}</div>
                <div class="delete-btn">❌</div>
              </div>
            </div>`;
  });

  changeStarState();
  deleteItem();
}

// ADD ITEM TO LIST BUTTON
const addBtn = document.getElementById("add-btn");
addBtn.addEventListener("click", renderObject);

// Now I need to be able to bring all of the data together and render the list for user interaction

// RENDER LIST / OBJECT FUNCTION
function renderObject() {
  createObject();
  renderObjectHTML();
  console.log("object array:", objectArr);
}

// In order to filter the object/item that the user 'favourites' ill need to create a function that changes the star's state / icon

// CHANGE STAR STATE FUNCTION
const starIcons = document.querySelector(".star-icon");
function changeStarState() {
  const starIcons = document.querySelectorAll(".star-icon");
  starIcons.forEach((starIcon) => {
    starIcon.addEventListener("click", (e) => {
      // With this bit, I need to access the parent object card...
      const outerObjectCard = e.target.closest(".card-container");

      // now i need to see if the the parent card exists!
      if (outerObjectCard) {
        // If true, I then find the object in objectArr based on its ID..
        const targetObject = objectArr.find(
          (obj) => obj.id === outerObjectCard.id
        );

        // Finally, I toggle the star property!
        // FYI - i've been praticing this for months (just look at my github!)...i found it very hard at first don't worry if you're new like me and still find this tough - it is tough and I still find it a challenge!
        if (targetObject) {
          targetObject.star = !targetObject.star;

          // This bit is important..remeber to re-render the object list to update the star icon!
          renderObjectHTML();
        }
      }
    });
  });
}

// DARK / LIGHT MODE FUNCTION
// I wanted to create the option of toggling light and dark mode to improve the UX

darkLightToggle.addEventListener("click", toggle);
function toggle() {
  if (darkLightToggle.textContent === "🌙") {
    darkLightToggle.textContent = "☀️";
    body.classList.toggle("toggle-state");
  } else if (darkLightToggle.textContent === "☀️") {
    darkLightToggle.textContent = "🌙";
    body.classList.toggle("toggle-state");
  }
}

// CLEAR function
// I need a function to clear all the input values to ensure that the user has a clean set of input fields to work with

function clearInputValues() {
  let itemValue = document.getElementById("item-input");
  itemValue.value = "";
  let itemDescriptionValue = document.getElementById("description-input");
  itemDescriptionValue.value = "";
  let itemLinkValue = document.getElementById("link-input");
  itemLinkValue.value = "";
  let itemPriceValue = document.getElementById("price-input");
  itemPriceValue.value = "";
}

// RANDOM ID FUNCTION
// now I need to create a random ID to help me create a unique identifier for the individual object created. This will help me identify for deletion.

let randomChar = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  "!",
  "@",
  "£",
  "$",
  "%",
  "^",
  "&",
  "*",
  "J",
  "P",
  "M",
  "D",
  "R",
  "S",
  "A",
];

let newId = [];

// create random ID Function

function getRandomId() {
  for (let i = 0; i < 6; i++) {
    let randomnNumber = Math.floor(Math.random() * randomChar.length);
    let randomId = randomChar[randomnNumber];
    newId.push(randomId);
  }
}

// I know need to add the filter functionality - with this I can loop through the objectArray and find the 'stars' with a value of TRUE...
const filterItemsBtn = document.getElementById("filter-btn");
filterItemsBtn.addEventListener("click", filterItems);
// FILTER FUNCTION
function filterItems() {
  const cardContainer = document.querySelectorAll(".card-container");
  cardContainer.forEach((item) => {
    const itemIdent = item.id;
    const itemMatched = objectArr.find((item) => item.id === itemIdent);

    if (itemMatched) {
      if (itemMatched.star === false) {
        item.classList.toggle("hide");
      }
    }
  });
}

// Finally, I need to create a way of deleting the object if there is no longer a desire to include it in the list. The object ID will be critical will be here.

// DELETE FUNCTION

function deleteItem() {
  const targetObjectId = this.closest(".card-container").id;
  const matchedIndex = objectArr.findIndex(
    (item) => item.id === targetObjectId
  );

  if (matchedIndex !== -1) {
    // Remove the item from the array
    objectArr.splice(matchedIndex, 1);

    // Remove the item from the DOM
    this.closest(".card-container").remove();
  }
}

// I now need to attach event listeners to delete buttons using event delegation - had to research this!!
outputSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    //   the below triggers the delete function on the specific target id, as i understand it...
    deleteItem.call(e.target);
  }
});
