document.addEventListener('DOMContentLoaded', function() {

    const scoreDiv = document.querySelector('#score');
    const mainDiv = document.querySelector('#main');
    var myGrid;

    /*
            INTRO - przycisk startowy
    */

    const startBtn = document.createElement('button');
    startBtn.innerText = "Rozpocznij grę";
    mainDiv.appendChild(startBtn);

    startBtn.addEventListener('click', function (e) {
        e.preventDefault();
        clearMain();
        setField(10, 10, 20);
    });

    /*
            TWORZENIE POLA MINOWEGO
     */



    const Field = function(row, col) {
        this.row = row;
        this.col = col;
        this.bomb = false;
    };

    const Grid = function(rows, cols) {
        this.cellGrid = [];
        if(rows > 9 && cols > 9) {
            for (let i = 0; i < rows; i++) {
                this.cellGrid[i] = [];
                for (let j = 0; j < cols; j++) {
                    this.cellGrid[i][j] = new Field(i,j);
                }
            }
        }
    };

    Grid.prototype.addBombs = function(number){
        if(number > 0 && number < (this.cellGrid.length * this.cellGrid[0].length)){
            let bombsToPlant = number;
            while(bombsToPlant > 0) {
                randomRow = getRandom(this.cellGrid.length - 1);
                randomCol = getRandom(this.cellGrid[0].length - 1);
                if(!this.cellGrid[randomRow][randomCol].bomb) {
                    this.cellGrid[randomRow][randomCol].bomb = true;
                    bombsToPlant--;
                }
            }
        }
    };

    Grid.prototype.drawGrid = function() {
        clearMain();
        const table = document.createElement('table');
        const tBody = document.createElement('tbody');

        for (let i = 0; i < this.cellGrid.length; i++) {
            const myRow = document.createElement('tr');
            for (let j = 0; j < this.cellGrid[i].length; j++) {
                const myCell = document.createElement('td');
                myCell.dataset.row = i;
                myCell.dataset.col = j;
                myCell.addEventListener('click', function cellClicked(e) {
                    this.innerText = myGrid.stepOn(e.target.dataset.row, e.target.dataset.col, this);
                });
                myRow.appendChild(myCell);
            }
            tBody.appendChild(myRow);
        }
        table.appendChild(tBody);
        mainDiv.appendChild(table);
    };


    Grid.prototype.check = function(row, col) {
        if(row >= 0 && row < this.cellGrid.length && col >= 0 && col < this.cellGrid[0].length) {
            if(this.cellGrid[row][col].bomb) {
                return 1;
            }
            return 0;
        }
        return 0;
    };

    Grid.prototype.checkNeighbours = function(row, col) {
        let neighbouringMines = 0;
        neighbouringMines +=    this.check((row - 1), (col - 1)) +
                                this.check((row - 1), col) +
                                this.check((row - 1), (col + 1)) +
                                this.check(row, (col - 1)) +
                                this.check(row, (col + 1)) +
                                this.check((row + 1), (col - 1)) +
                                this.check((row + 1), col) +
                                this.check((row + 1), (col + 1));
        return neighbouringMines;
    };




    Grid.prototype.stepOn = function(row, col, button) {
        row = parseInt(row);
        col = parseInt(col);
        if(this.check(row, col)) {
            // finish();
            button.classList.add('exploded');
            return 'X';
        } else {
            return this.checkNeighbours(row, col);
        }
    };

    function setField(rows, cols, bombs){
        myGrid = new Grid(rows, cols);
        myGrid.addBombs(bombs);
        myGrid.drawGrid();
    }

    /*
            RYSOWANIE INTERFEJSU
     */



    function clearMain() {
        while (mainDiv.firstChild) {
            mainDiv.removeChild(mainDiv.firstChild);
        }
    }


    function getRandom(limit) {
        return Math.ceil(Math.random() * limit);
    }



});