const gameFiled = document.createElement("div");
gameFiled.className = "gameField";
let gameFiledAsHtml = "";

type StrToStrArr = {
  [key: string]: string[];
};

type Coordinates = {
  row: number;
  column: number;
  block: number;
};

type ChainElement = {
  coordinates: Coordinates;
  previousElementIndex: string | null;
  nextElementIndex: string | null;
  chanseInterval: number;
  absoluteChanse: number;
};

const elementsByRow: StrToStrArr = {};
const elementsByColumn: StrToStrArr = {};
const elementsByBlock: StrToStrArr = {};
let firstElementIndex = "00";
let lastElementIndex = "88";

const elementsChain: {
  [key: string]: ChainElement;
} = {};

makeGameField();
fillBaseChansesStructure();
fillElementsInChansesStructures();
fillElementsChain();
fillElementsChanseIntervals();
fillAbsoluteChanses();

for (let i = 0; i < 50; i++) {
  console.log(getRandomNumber());
}

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
      elementsChain[currentElementIndex] = {
        previousElementIndex: previousElementIndex,
        nextElementIndex: null,
        coordinates: {
          row,
          column,
          block: identifyBlock(row, column),
        },
        absoluteChanse: 0,
        chanseInterval: 0,
      };
      if (previousElementIndex) {
        elementsChain[previousElementIndex].nextElementIndex =
          currentElementIndex;
      }
      previousElementIndex = currentElementIndex;
    }
  }
}

function fillElementsChanseIntervals() {
  for (let elementIndex in elementsChain) {
    const crd = elementsChain[elementIndex].coordinates;
    elementsChain[elementIndex].chanseInterval = calcChanseInterval(crd);
  }
}

function calcChanseInterval(crd: Coordinates) {
  return (
    elementsByRow[crd.row].length *
    elementsByColumn[crd.column].length *
    elementsByBlock[crd.block].length
  );
}

function getSecondElementFromStart() {
  return elementsChain[
    elementsChain[firstElementIndex].nextElementIndex as string
  ];
}

function fillAbsoluteChanses() {
  let currentElement: ChainElement | null = getSecondElementFromStart();
  while (currentElement) {
    if (!currentElement.previousElementIndex) {
      continue;
    }

    let previousElement = elementsChain[currentElement.previousElementIndex];

    currentElement.absoluteChanse =
      previousElement.absoluteChanse + previousElement.chanseInterval;

    if (!currentElement.nextElementIndex) {
      break;
    }
    currentElement = elementsChain[currentElement.nextElementIndex];
  }
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

function getWholeChansesInterval() {
  return (
    elementsChain[lastElementIndex].absoluteChanse +
    elementsChain[lastElementIndex].chanseInterval
  );
}

function getRandomNumber() {
  const totlaChanse = getWholeChansesInterval();
  return Math.random() * totlaChanse;
}
