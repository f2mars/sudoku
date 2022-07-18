const gameFiled = document.createElement("div");
gameFiled.className = "gameField";
let gameFiledAsHtml = "";

makeGameField();
document.body.append(gameFiled);

function makeGameField() {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      const coordiraties = `${row}${column}`;
      gameFiledAsHtml += `<div class="cell${chooseAdditionClasses(
        row,
        column
      )}" id="${coordiraties}"></div>`;
    }
  }
  gameFiled.innerHTML = gameFiledAsHtml;
}

function identifyBlock(row: number, column: number) {
  const blocki: number = Math.trunc(row / 3);
  const blockj: number = Math.trunc(column / 3);
  return 3 * blocki + blockj;
}

function chooseAdditionClasses(row: number, column: number) {
  let additionalClasses = row === 2 || row === 5 ? " borderBottom" : "";
  additionalClasses += column === 2 || column === 5 ? " borderRight" : "";
  return additionalClasses;
}
