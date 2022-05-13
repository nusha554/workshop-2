
const endGameData = [
  {
    name: "space-stone",
    avengers: ["captain-america", "iron-man"],
  },
  {
    name: "mind-stone",
    avengers: ["ant-man", "captain-america"],
  },
  {
    name: "reality-stone",
    avengers: ["rocket-raccoon", "thor"],
  },
  {
    name: "power-stone",
    avengers: ["war-machine", "nebula"],
  },
  {
    name: "time-stone",
    avengers: [{ name: "hulk" }],
  },
  {
    name: "soul-stone",
    avengers: ["black-widow", "hawkeye"],
  },
];

const matchData = {
  selectedName: "",
  selectedAvengers: [],
};

function areEqual(array1, array2) {
  if (array1.length === array2.length) {
    return array1.every((element) => {
      if (array2.includes(element)) {
        return true;
      }

      return false;
    });
  }
  return false;
}


function searchForMatch() {
  let avengerList = [];
  endGameData.forEach((data) => {
    if (data.name === matchData.selectedName) {
      //typeof data.avengers[0].name === "undefined"
      if (!data.avengers[0].name) {
        avengerList = data.avengers;
      } else {
        avengerList.push(data.avengers[0].name); //For hulk situation
      }
      if (areEqual(avengerList, matchData.selectedAvengers)) {
        document.getElementById(data.name).remove();
        removedSuccessfully = true;
      }
    }
  });
}

function onStoneClicked(stoneName) {
  if (clickedStone) {
    alert("One stone at a time. Please try again.");
    reset();
    return;
  }
  clickedStone = true;
  document.getElementById(stoneName).style.background = "#a7eb15";
  matchData.selectedName = stoneName;
}

function onAvengerClicked(avengerName) {
  matchData.selectedAvengers.push(avengerName);
  document.getElementById(avengerName).style.background = "#77a2b5";
}

function onGloveClicked() {
  stones.length > 0 ? searchForMatch() : alert("You got them all!");
  removedSuccessfully ?  alert("Nice!") : alert("Try Again!");
  reset();
}

function reset() {
  let selectedStone = document.getElementById(matchData.selectedName);
  if (selectedStone) {
    selectedStone.style.background = "";
  }
  matchData.selectedAvengers.map((item) => {
    document.getElementById(item).style.background = "";
  });
  matchData.selectedAvengers = [];
  matchData.selectedName = "";
  clickedStone = false;
  removedSuccessfully = false;
}


const stones = document.querySelectorAll(".stone");
const avengers = document.querySelectorAll(".avenger");
const glove = document.querySelector(".infinity_glove");
let clickedStone = false;
let removedSuccessfully = false;



stones.forEach((stone) =>
  stone.addEventListener("click", ({ target }) => {
    onStoneClicked(target.id);
  })
);

avengers.forEach((avenger) =>
  avenger.addEventListener("click", ({ target }) => {
    onAvengerClicked(target.id);
  })
);

glove.addEventListener("click", () => {
  onGloveClicked();
});
