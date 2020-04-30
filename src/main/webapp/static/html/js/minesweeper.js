"use strict";
document.addEventListener('DOMContentLoaded', function() {

    document.addEventListener('contextmenu', e => {
        e.preventDefault();
    });

    const scoreDiv = document.querySelector('#score');
    const timerDiv = document.querySelector('#timer');
    const mainDiv = document.querySelector('#main');

    let myGrid;
    let cellMemory = [];
    let myFlags;
    let timerSeconds = 0;
    let countMyTime;

    /*
            INTRO - przycisk startowy
    */
    const FIELD_WIDTH = 10;
    const FIELD_HEIGHT = 10;
    const BOMB_COUNT = 10;

    const startBtn = document.createElement('button');
    startBtn.innerText = "Rozpocznij grę";
    const flagDisplay = document.createElement('h1');
    const timerDisplay = document.createElement('h2');
    startGame();

    /*
            TWORZENIE POLA MINOWEGO
     */

    const Field = function (row, col) {
        this.row = row;
        this.col = col;
        this.checked = false;
        this.bomb = false;
    };

    const Grid = function (rows, cols) {
        this.cellGrid = [];
        if (rows > 9 && cols > 9) {
            for (let i = 0; i < rows; i++) {
                this.cellGrid[i] = [];
                for (let j = 0; j < cols; j++) {
                    this.cellGrid[i][j] = new Field(i, j);
                }
            }
        }
    };

    Grid.prototype.addBombs = function (number) {
        if (number > 0 && number < (this.cellGrid.length * this.cellGrid[0].length)) {
            let bombsToPlant = number;
            while (bombsToPlant > 0) {
                let randomRow = getRandom(this.cellGrid.length - 1);
                let randomCol = getRandom(this.cellGrid[0].length - 1);
                if (!this.cellGrid[randomRow][randomCol].bomb) {
                    this.cellGrid[randomRow][randomCol].bomb = true;
                    bombsToPlant--;
                }
            }
        }
    };

    Grid.prototype.drawGrid = function () {
        clearMain();
        const table = document.createElement('table');
        const tBody = document.createElement('tbody');

        for (let i = 0; i < this.cellGrid.length; i++) {
            const myRow = document.createElement('tr');
            cellMemory = [];
            for (let j = 0; j < this.cellGrid[i].length; j++) {
                const myCell = document.createElement('td');
                myCell.dataset.row = i.toString();
                myCell.dataset.col = j.toString();
                myCell.dataset.checked = this.cellGrid[i][j].checked;
                myCell.addEventListener('click', cellClicked);
                myCell.addEventListener('contextmenu', cellClickedRight);
                cellMemory.push(myCell);
                myRow.appendChild(myCell);
            }
            tBody.appendChild(myRow);
        }
        table.appendChild(tBody);
        mainDiv.appendChild(table);
    };

    Grid.prototype.check = function (row, col) {
        if (row >= 0 && row < this.cellGrid.length && col >= 0 && col < this.cellGrid[0].length) {
            if (this.cellGrid[row][col].bomb) {
                return 1;
            }
            return 0;
        }
        return 0;
    };

    Grid.prototype.checkNeighbours = function (row, col) {
        let neighbouringMines = 0;
        neighbouringMines += this.check((row - 1), (col - 1)) +
            this.check((row - 1), col) +
            this.check((row - 1), (col + 1)) +
            this.check(row, (col - 1)) +
            this.check(row, (col + 1)) +
            this.check((row + 1), (col - 1)) +
            this.check((row + 1), col) +
            this.check((row + 1), (col + 1));
        return neighbouringMines;
    };

    Grid.prototype.stepOn = function (row, col, button) {
        row = parseInt(row);
        col = parseInt(col);
        if (this.check(row, col)) {
            // BOOOOOOOOOOOOM!!!!!!!!!!!!!!!!!!!!!!!!!
            button.classList.add('exploded');
            cellMemory.forEach(function (item) {
                item.removeEventListener('click', cellClicked);
                item.removeEventListener('contextmenu', cellClickedRight);
            });
            flagDisplay.innerText = "Booooooooom!";
            clearInterval(countMyTime);
            return 'X';
        } else {
            button.dataset.checked = "true";
            this.cellGrid[row][col].checked = true;
            button.classList.add('checked');
            if (this.checkNeighbours(row, col) === 0) {
                // const neighbouringCell = document.querySelector('[data-row = "' + (row - 1) + '"][data-col = "'+(col - 1)+'"]');
                return this.checkNeighbours(row, col);
            }
            return this.checkNeighbours(row, col);
        }
    };

    /*
            FUNKCJE
     */
    function startGame() {
        clearAll();
        mainDiv.appendChild(startBtn);
        startBtn.addEventListener('click', function (e) {
            e.preventDefault();
            setField(FIELD_WIDTH, FIELD_HEIGHT, BOMB_COUNT);
            myFlags = BOMB_COUNT;
            const newGameBtn = document.createElement('button');
            newGameBtn.classList.add('newGame');
            newGameBtn.addEventListener('click', startGame);
            newGameBtn.innerText = "Nowa gra";
            clearScore();
            clearInterval(countMyTime);
            scoreDiv.appendChild(newGameBtn);
            scoreDiv.appendChild(flagDisplay);
            timerDiv.appendChild(timerDisplay);
            setCounter();
            setTimer();
        });
    }

    function setField(rows, cols, bombs) {
        myGrid = new Grid(rows, cols);
        myGrid.addBombs(bombs);
        myGrid.drawGrid();
    }

    function clearMain() {
        while (mainDiv.firstChild) {
            mainDiv.removeChild(mainDiv.firstChild);
        }
    }

    function clearScore() {
        while (scoreDiv.firstChild) {
            scoreDiv.removeChild(scoreDiv.firstChild);
        }
    }

    function clearTimer() {
        while (timerDiv.firstChild) {
            timerDiv.removeChild(timerDiv.firstChild);
        }
    }

    function clearAll() {
        clearScore();
        clearMain();
        clearTimer();
        clearInterval(countMyTime);
        timerSeconds = 0;
    }

    function getRandom(limit) {
        return Math.ceil(Math.random() * limit);
    }

    function cellClicked(e) {
        let myCell = e.target;
        if (myCell.classList.contains('flagged')) {
            // do nothing
            return;
        }
        myCell.innerText = myGrid.stepOn(myCell.dataset.row, myCell.dataset.col, myCell);
        leadingZeros(myCell);
        // if (myCell.innerText === "0") {
        //     const NCell = document.querySelector('[data-row = "' + (myCell.dataset.row - 1) + '"][data-col = "' + (myCell.dataset.col) + '"]');
        //     NCell.innerText = myGrid.stepOn(NCell.dataset.row, NCell.dataset.col, NCell);
        //     // console.log(NCell);
        //     // console.log('myCell.dataset.row - ' + myCell.dataset.row + ' // myCell.dataset.col - ' + myCell.dataset.col);
        // }
    }

    function leadingZeros(myCell) {
        let row = parseInt(myCell.dataset.row);
        let col = parseInt(myCell.dataset.col);
        if (myCell.innerText === "0" && myCell.dataset.row > 0) {
            const NCell = document.querySelector('[data-row = "' + (row - 1) + '"][data-col = "' + (col) + '"]');
            if (NCell.innerText.length === 0) {
                leadingZerosIterate(NCell);
            }
        }
        if (myCell.innerText === "0" && myCell.dataset.row > 0 && myCell.dataset.col < (myGrid.cellGrid[0].length - 1)) {
            const NECell = document.querySelector('[data-row = "' + (row - 1) + '"][data-col = "' + (col + 1) + '"]');
            if (NECell.innerText.length === 0) {
                leadingZerosIterate(NECell);
            }
        }
        if (myCell.innerText === "0" && myCell.dataset.col < (myGrid.cellGrid[0].length - 1)) {
            const ECell = document.querySelector('[data-row = "' + (row) + '"][data-col = "' + (col + 1) + '"]');
            if (ECell.innerText.length === 0) {
                leadingZerosIterate(ECell);
            }
        }
        if (myCell.innerText === "0" && myCell.dataset.row < (myGrid.cellGrid.length - 1) && myCell.dataset.col < (myGrid.cellGrid[0].length - 1)) {
            const SECell = document.querySelector('[data-row = "' + (row + 1) + '"][data-col = "' + (col + 1) + '"]');
            if (SECell.innerText.length === 0) {
                leadingZerosIterate(SECell);
            }
        }
        if (myCell.innerText === "0" && myCell.dataset.row < (myGrid.cellGrid.length - 1)) {
            const SCell = document.querySelector('[data-row = "' + (row + 1) + '"][data-col = "' + (col) + '"]');
            if (SCell.innerText.length === 0) {
                leadingZerosIterate(SCell);
            }
        }
        if (myCell.innerText === "0" && myCell.dataset.row < (myGrid.cellGrid.length - 1) && myCell.dataset.col > 0) {
            const SWCell = document.querySelector('[data-row = "' + (row + 1) + '"][data-col = "' + (col - 1) + '"]');
            if (SWCell.innerText.length === 0) {
                leadingZerosIterate(SWCell);
            }
        }
        if (myCell.innerText === "0" && myCell.dataset.col > 0) {
            const WCell = document.querySelector('[data-row = "' + (row) + '"][data-col = "' + (col - 1) + '"]');
            if (WCell.innerText.length === 0) {
                leadingZerosIterate(WCell);
            }
        }
        if (myCell.innerText === "0" && myCell.dataset.row > 0 && myCell.dataset.col > 0) {
            const NWCell = document.querySelector('[data-row = "' + (row - 1) + '"][data-col = "' + (col - 1) + '"]');
            if (NWCell.innerText.length === 0) {
                leadingZerosIterate(NWCell);
            }
        }
    }

    function leadingZerosIterate(myCell) {
        myCell.innerText = myGrid.stepOn(myCell.dataset.row, myCell.dataset.col, myCell);
        if (myCell.innerText === "0" && myCell.dataset.row > 0) {
            leadingZeros(myCell);
        }
    }

    function cellClickedRight(e) {
        let myCell = e.target;
        if (myCell.innerText.length === 1) {
            console.log('do nothing');
            return;
        }
        if (myCell.classList.contains('flagged')) {
            myCell.classList.remove('flagged');
            flagIncrease();
            return;
        }
        if (myFlags > 0) {
            myCell.classList.add('flagged');
            flagDecrease();
        }
    }

    function setTimer() {
        countMyTime = setInterval(function () {
            timerSeconds++;
            printTimer();
        }, 1000);
    }

    function printTimer() {
        timerDisplay.innerText = timerSeconds + ' s';
    }

    function setCounter() {
        flagDisplay.innerText = "Dostępne flagi: " + myFlags;
    }

    function flagIncrease() {
        myFlags++;
        setCounter();
    }

    function flagDecrease() {
        myFlags--;
        setCounter();
        if (myFlags === 0) {
            checkWygrana();
        }
    }

    function checkWygrana() {
        console.log('checkwygrana');
        let epicWin = true;
        console.log(cellMemory);
        cellMemory.forEach(function (item) {
            console.log(myGrid.cellGrid[item.dataset.row][item.dataset.col].bomb);
            if (item.classList.contains('flagged')) {
                //&& !myGrid.cellGrid[item.dataset.row][item.dataset.col].bomb) {
                // nothing

                epicWin = false;
            }
        });
        if (epicWin) {
            flagDisplay.innerText = "ZWYCIĘSTWO!!";
            clearInterval(countMyTime);
            cellMemory.forEach(function (item) {
                item.removeEventListener('click', cellClicked);
                item.removeEventListener('contextmenu', cellClickedRight);
            });
        }
    }
});
