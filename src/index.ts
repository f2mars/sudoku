const gameFiled = document.createElement("div");
gameFiled.className = "gameField";
let gameFiledAsHtml = "";

type ChansesByMicroStructure = {
  [key: string]: {
    chanse: number;
    elements: string[];
  };
};

const chanseByRow: ChansesByMicroStructure = {};
const chanseByColumn: ChansesByMicroStructure = {};
const chanseByBlock: ChansesByMicroStructure = {};
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
fillElementsInChanses();
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
    [chanseByRow, chanseByColumn, chanseByBlock].forEach((obj) => {
      obj[row] = {
        chanse: 9,
        elements: [],
      };
    });
  }
}

function fillElementsInChanses() {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const currentElementIndex = `${row}${column}`;
      [
        chanseByRow[row],
        chanseByColumn[column],
        chanseByBlock[identifyBlock(row, column)],
      ].forEach((obj) => {
        obj.elements.push(currentElementIndex);
      });
    }
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

function calcChanseInterval(row: number, column: number, block: number) {
  return (
    chanseByRow[row].chanse *
    chanseByColumn[column].chanse *
    chanseByBlock[block].chanse
  );
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
