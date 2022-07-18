const gameFiled = document.createElement("div");
gameFiled.className = "gameField";
let gameFiledAsHtml = "";

makeGameField();
document.body.append(gameFiled);

type NumToNumObj = {
  [key: number]: number;
};

class chansesData {
  private chansesByRow: NumToNumObj = {};
  private chansesByColumn: NumToNumObj = {};
  private chansesByBlock: NumToNumObj = {};
  private fillChansesStructure() {
    for (let i = 0; i < 9; i++) {
      [this.chansesByRow, this.chansesByColumn, this.chansesByBlock].forEach(
        (item) => {
          item[i] = 9;
        }
      );
    }
  }
  constructor() {
    this.fillChansesStructure();
  }
}

let testData = new chansesData();

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
