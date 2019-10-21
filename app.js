'use strict';

/**
 * Initialize building function for the table.
 */
const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Initialize function for reading an HTML data for
 * getting row position in the table and cell position
 * in the row.
 */
const readHtmlData = (that) => that.innerHTML.split('/');
const compose = (f, g) => x => f(g(x));
const row = (arr) => parseInt(arr[0]);
const cell = (arr) => parseInt(arr[1]);
const getRow = compose(row, readHtmlData);
const getCell = compose(cell, readHtmlData);

const processArr = (arr, condition) => {
  let p = arr.length;
  while (p--) {
    condition(p)
  }
};

/**
 * Initialize building function for the table.
 */
const initTable = (rn) => {
  document.write('<table border="1">');
  for (let i=1; i <= rn; i++) {
    document.writeln("<tr>");
    for (let j=1; j <= rn; j++) {
      const randomNumberOfColour = getRandomIntInclusive(1, 2);
      if (randomNumberOfColour === 1) {
        document.write("<td class='green'>" + i + "/" + j + "<\/td>");
      } else {
        document.write("<td>" + i + "/" + j + "<\/td>");
      }
    }
    document.writeln("<\/tr>");
  }
  document.write ("<\/table> ");
};

/**
 * Initialize constant with a minimal
 * and a maximal number of cells.
 */
const MIN_CELLS = 3;
const MAX_CELLS = 10;

/**
 * Initialize constant with the CSS class.
 */
const GREEN = "green";

(function f() {
  const randomNumber = getRandomIntInclusive(MIN_CELLS, MAX_CELLS);
  initTable(randomNumber);

  const cells = document.getElementsByTagName("td");
  processArr(cells, (p) => {
    cells[p].onclick = function() {
      // changing color for the current cell
      this.classList.toggle(GREEN);

      // getting data about position of the cell
      const selectedCell = getCell(this);

      // calculating data of nearby cells
      const topCell = p - randomNumber;
      const bottomCell = p + randomNumber;
      const leftCell = p - 1;
      const rightCell = p + 1;

      // changing color of the top cell, if present
      topCell >= 0 && cells[topCell].classList.toggle(GREEN);

      // changing color of the bottom cell, if present
      bottomCell < cells.length && cells[bottomCell].classList.toggle(GREEN);

      // changing color of the left cell, if present in the row
      if (leftCell >= 0) {
        getCell(cells[leftCell]) > 0 &&
        getCell(cells[leftCell]) < selectedCell &&
        cells[leftCell].classList.toggle(GREEN);
      }

      // changing color of the right cell, if present in the row
      if (rightCell < cells.length) {
        getCell(cells[rightCell]) <= randomNumber &&
        getCell(cells[rightCell]) > selectedCell &&
        cells[rightCell].classList.toggle(GREEN);
      }

      // counting of filled cells
      let countOfFilledCells = 0;
      processArr(cells, (p) => cells[p].classList.contains(GREEN) && countOfFilledCells++);

      if (countOfFilledCells === cells.length || countOfFilledCells === 0) {
        alert('Hurray 👍');
        processArr(cells, (p) => {
          const randomNumberOfColour = getRandomIntInclusive(1, 2);
          cells[p].classList.remove(GREEN);
          if (randomNumberOfColour === 1) {
            cells[p].classList.toggle(GREEN);
          }
        })
      }

    };
  })
}());
