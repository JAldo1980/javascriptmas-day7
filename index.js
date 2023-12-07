// Hi! I thought I'd add some commentary to my build.
// I planned this build on paper and sketched a few things out - I also wrote a basic structure of how I would code this app -m should be fun

// This array will store the objects created by the createObject function
const objectArr = [];

// Here I construct the object utilising the this keyword...
function ConstructObject(item, description, id, star) {
  this.item = item;
  this.description = description;
  this.link = link;
  this.price = price;
  this.id = id;
  this.star = star;
}

// Here I will create the object with a function

function createObject() {
  const newObject = new ConstructObject(
    item,
    itemDescription,
    itemLink,
    itemPrice,
    itemId,
    star
  );
  getRandomId();
  let item = document.getElementById("item-input").value;
  let itemDescription = document.getElementById("description-input").value;
  let itemLink = document.getElementById("link-input").value;
  let itemPrice = document.getElementById("price-input").value;
  let itemId = newId.join(" ");
  let star = false;
  objectArr.push(newObject);
}

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
