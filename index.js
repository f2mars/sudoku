const gameFiled = document.querySelector('.gameField');

let gameFiledAsHtml = '';
const rows = [];
const columns = [];
const blocks = [];

let chanses = {
    byRow: {
    },
    byColumn: {
    },
    byBlock: {
    },
    elements: {
    },
    firstElementKey: '00',
    lastElementKey: '88',
    constructor: function() {
        let currentElement = this.elements[this.firstElementKey];
        while (currentElement) {
            currentElement.chanseInterval = this.getChanseInterval(currentElement.coordiraties);
            currentElement.absoluteChanse = this.getAbsoluteChanse(currentElement);
            currentElement = this.elements[currentElement.nextElementKey];
        }
    },
    getChanseInterval: function({row, column, block}) {
        return this.byRow[row] * this.byColumn[column] * this.byBlock[block];
    },
    getAbsoluteChanse: function(currentElement) {
        return currentElement.previousElementKey ?  this.elements[currentElement.previousElementKey].absoluteChanse + this.elements[currentElement.previousElementKey].chanseInterval : 0;
    }
}

generateBaseStructure();
makeGameField();
chanses.constructor();

function generateBaseStructure() {
    for (let i = 0; i < 9; i++) {
        [rows, columns, blocks].forEach((item) => item.push([]));
        [chanses.byRow, chanses.byColumn, chanses.byBlock].forEach((item) => {
            item[i] = 9;
        })
    }
}

function makeGameField() {
    let previousElement = null;
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const coordiraties = `${i}${j}`;
            gameFiledAsHtml += `<div class="cell${chooseAdditionClasses(i, j)}" id="${coordiraties}"></div>`;
            rows[i].push(coordiraties);
            columns[j].push(coordiraties);
            blocks[identifyBlock(i, j)].push(coordiraties);

            chanses.elements[coordiraties] = {
                coordiraties: {
                    row: i,
                    column: j,
                    block: identifyBlock(i, j)
                },
                previousElementKey: previousElement,
                nextElementKey: undefined,
                chanseInterval: undefined,
                absoluteChanse: undefined
            }

            if (chanses.elements[coordiraties].previousElementKey) {
                chanses.elements[chanses.elements[coordiraties].previousElementKey].nextElementKey = coordiraties;
            }

            previousElement = coordiraties;
        }
    }
    gameFiled.insertAdjacentHTML('beforeend', gameFiledAsHtml);
}

function identifyBlock(i, j) {
    const blocki = Math.trunc(i / 3);
    const blockj = Math.trunc(j / 3);
    return 3 * blocki + blockj;
}

function chooseAdditionClasses(i, j) {
    let additionalClasses = i === 2 || i === 5 ? " borderBottom" : "";
    additionalClasses += j === 2 || j === 5 ? " borderRight" : "";
    return additionalClasses;
}
