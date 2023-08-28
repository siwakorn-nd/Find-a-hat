const create = require('prompt-sync')();
const clear = require('clear-screen');

const hat = '👑';
const hole = '🚽';
const fieldCharacter = '🟪';
const pathCharacter = '👩';

class Field {
    constructor(rows, columns) {
        this._field = this.createMap(rows, columns);
        this.placeHat();
        this.placeHoles();
    }

    get field() {
        return this._field;
    }

    createMap(rows, columns) {
        let map = [];
        
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < columns; j++) {
                row.push(fieldCharacter);
            }
            map.push(row);
        }
        return map;
    }

    placeHat() {
        const rows = this._field.length;
        const columns = this._field[0].length;

        do {
            this._hatRow = Math.floor(Math.random() * rows);
            this._hatColumn = Math.floor(Math.random() * columns);
        } while (this._field[this._hatRow][this._hatColumn] !== fieldCharacter);

        this._field[this._hatRow][this._hatColumn] = hat;
    }

    placeHoles() {
        const rows = this._field.length;
        const columns = this._field[0].length;

        const totalCells = rows * columns;
        const numHoles = Math.floor(totalCells * 0.1); // 15% of the cells as holes

        for (let i = 0; i < numHoles; i++) {
            let randomRow, randomColumn;
            do {
                randomRow = Math.floor(Math.random() * rows);
                randomColumn = Math.floor(Math.random() * columns);
            } while (this._field[randomRow][randomColumn] !== fieldCharacter);

            this._field[randomRow][randomColumn] = hole;
        }
    }

    checkWin(row, column) {
        return row === this._hatRow && column === this._hatColumn;
    }
}
class Player {
    constructor(field) {
        this._field = field;
        this._positionX = 0;
        this._positionY = 0;
        this._field.field[this._positionY][this._positionX] = pathCharacter;
    }

    get positionX() {
        return this._positionX;
    }

    get positionY() {
        return this._positionY;
    }

    move(dx, dy) {
        const newX = this._positionX + dx;
        const newY = this._positionY + dy;

        if (
            newX >= 0 && newX < this._field.field[0].length &&
            newY >= 0 && newY < this._field.field.length &&
            this._field.field[newY][newX] !== hole
        ) {
            this._field.field[this._positionY][this._positionX] = fieldCharacter;
            this._positionX = newX;
            this._positionY = newY;
            this._field.field[this._positionY][this._positionX] = pathCharacter;
            
            if (this._field.checkWin(newY, newX)) {
                console.log("Congratulations! You found the hat. You win!");
                this.playAgain();
            }
        } else {
            console.log("Oops! You hit a border or a hole. Game over!");
            this.playAgain();
        }
    }

    playAgain() {
        const input = create('Do you want to play again? (y/n): ');
        if (input.toLowerCase() === 'y') {
            const rows = this._field.field.length;
            const columns = this._field.field[0].length;
            this._field = new Field(rows, columns);
            this._positionX = 0;
            this._positionY = 0;
            this._field.field[this._positionY][this._positionX] = pathCharacter;
            clear();
            console.log(this._field.field.map(row => row.join('')).join('\n'));
            this.play();
        } else {
            process.exit(0);
        }
    }

    play() {
        while (true) {
            clear();
            console.log(this._field.field.map(row => row.join('')).join('\n'));
            const input = create('Enter your move (w/a/s/d): (w = up, s = down, a = left , d = right) ');
            
            if (input === 'w') {
                this.move(0, -1);
            } else if (input === 'a') {
                this.move(-1, 0);
            } else if (input === 's') {
                this.move(0, 1);
            } else if (input === 'd') {
                this.move(1, 0);
            }
        }
    }
}

const rows = 10;
const columns = 10;
const field = new Field(rows, columns);
const mapping = new Player(field);

// Print the initial field
console.log(mapping._field.field.map(row => row.join('')).join('\n'));
mapping.play();
