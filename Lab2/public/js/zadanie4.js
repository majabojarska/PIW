let animalListItems;
let animalImage;

window.addEventListener("load", () => {
  var animalNameList = document.getElementById("animal_name_list");
  var imageContainer = document.getElementById("img_container");
  imageContainer.style.height = String(animalNameList.offsetHeight - 32) + "px";
  animalImage = document.getElementById("animal");

  var birdListItem = document.getElementById("bird");
  var cowListItem = document.getElementById("cow");
  var craneListItem = document.getElementById("crane");
  var dogListItem = document.getElementById("dog");
  var gatorListItem = document.getElementById("gator");
  var pigListItem = document.getElementById("pig");
  var reindeerListItem = document.getElementById("reindeer");
  var snakeListItem = document.getElementById("snake");
  var turkeyListItem = document.getElementById("turkey");
  var walrusListItem = document.getElementById("walrus");

  animalListItems = [
    birdListItem,
    cowListItem,
    craneListItem,
    dogListItem,
    gatorListItem,
    pigListItem,
    reindeerListItem,
    snakeListItem,
    turkeyListItem,
    walrusListItem,
  ];

  initListeners();
});

function initListeners() {
  animalListItems.forEach((animalListItem) => {
    animalListItem.addEventListener("mouseover", () => {
      animalListItem.getElementsByTagName("img")[0].src =
        "img/animals/" + animalListItem.id + "over.gif";
      animalListItem.style.backgroundColor = "black";
      animalImage.src="img/animals/"+animalListItem.id + ".gif";
    });
    animalListItem.addEventListener("mouseout", () => {
      animalListItem.getElementsByTagName("img")[0].src =
        "img/animals/" + animalListItem.id + "out.gif";
      animalListItem.style.backgroundColor = "white";
    });
  });
}
