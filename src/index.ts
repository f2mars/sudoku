const gameFiled = document.createElement("div");
gameFiled.className = "gameField";
let gameFiledAsHtml = "";

type StrToStrObj = {
  [key: string]: string[];
};

const elementsByRow: StrToStrObj = {};
const elementsByColumn: StrToStrObj = {};
const elementsByBlock: StrToStrObj = {};
let firstElementIndex = "00";
let lastElementIndex = "88";

const elemetsChain: {
  [key: string]: {
    previousElementIndex: string | null;
    nextElementIndex?: string | null;
  };
} = {};

makeGameField();
fillBaseChansesStructure();
fillElementsInChansesStructures();
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

function fillBaseChansesStructure() {
  for (let i = 0; i < 9; i++) {
    [elementsByRow, elementsByColumn, elementsByBlock].forEach(
      (obj) => (obj[i] = [])
    );
  }
}

function fillElementsInChansesStructures() {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const currentElementIndex = `${row}${column}`;
      [
        elementsByRow[row],
        elementsByColumn[column],
        elementsByBlock[identifyBlock(row, column)],
      ].forEach((obj) => {
        obj.push(currentElementIndex);
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
    elementsByRow[row].length *
    elementsByColumn[column].length *
    elementsByBlock[block].length
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
