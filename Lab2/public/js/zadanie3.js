window.addEventListener("load", () => {
  imgToChange = document.getElementById("image_to_change");
  anchorToListen = document.getElementById("anchor_to_listen");

  anchorToListen.addEventListener("mouseover", () => {
    imgToChange.src = "img/mjro.png";
    console.log("mouseover");
  });
  anchorToListen.addEventListener("mouseout", () => {
    imgToChange.src = "img/win.png";
    console.log("mouseout");
  });
});
