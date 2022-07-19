const gameFiled = document.createElement("div");
gameFiled.className = "gameField";
let gameFiledAsHtml = "";

type StrToNumObj = {
  [key: string]: number;
};

const chanseByRow: StrToNumObj = {};
const chanseByColumn: StrToNumObj = {};
const chanseByBlock: StrToNumObj = {};
let firstElementIndex = "00";
let lastElementIndex = "88";

const elemetsChain: {
  [key: string]: {
    previousElementIndex: string | null;
    nextElementIndex?: string | null;
  };
} = {};

makeGameField();
fillChanses();
fillElementsChain();

document.body.append(gameFiled);

// --------------- FUNCTIONS -----------------

function makeGameField() {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const coordinates = `${row}${column}`;
      gameFiledAsHtml += `<div class="cell${chooseAdditionClasses(
        row,
        column
      )}" id="${coordinates}"></div>`;
    }
  }
  gameFiled.innerHTML = gameFiledAsHtml;
}

function fillChanses() {
  for (let row = 0; row < 9; row++) {
    chanseByRow[row] = 9;
    chanseByColumn[row] = 9;
    chanseByBlock[row] = 9;
  }
}

function fillElementsChain() {
  let previousElementIndex = null;
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const currentElementIndex = `${row}${column}`;
      elemetsChain[currentElementIndex] = {
        previousElementIndex: previousElementIndex,
      };
      if (previousElementIndex) {
        elemetsChain[previousElementIndex].nextElementIndex =
          currentElementIndex;
      }
      previousElementIndex = currentElementIndex;
    }
  }
  elemetsChain[lastElementIndex].nextElementIndex = null;
}

function identifyBlock(row: number, column: number) {
  const blocki: number = Math.floor(row / 3);
  const blockj: number = Math.floor(column / 3);
  return 3 * blocki + blockj;
}

function chooseAdditionClasses(row: number, column: number) {
  let additionalClasses = row === 2 || row === 5 ? " borderBottom" : "";
  additionalClasses += column === 2 || column === 5 ? " borderRight" : "";
  return additionalClasses;
}
