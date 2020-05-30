class Board {
	constructor() {
		this.board = [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ];
		this.winPossibilities = [
			[ [ 0, 0 ], [ 0, 1 ], [ 0, 2 ] ],
			[ [ 1, 0 ], [ 1, 1 ], [ 1, 2 ] ],
			[ [ 2, 0 ], [ 2, 1 ], [ 2, 2 ] ],
			[ [ 0, 0 ], [ 1, 0 ], [ 2, 0 ] ],
			[ [ 0, 1 ], [ 1, 1 ], [ 2, 1 ] ],
			[ [ 0, 2 ], [ 1, 2 ], [ 2, 2 ] ],
			[ [ 0, 0 ], [ 1, 1 ], [ 2, 2 ] ],
			[ [ 0, 2 ], [ 1, 1 ], [ 2, 0 ] ]
		];
		this.gameOn = true;
		this.xTurn = true;
	}

	addMove(move, row, col) {
		this.board[row][col] = move;
		this.selectDivAt(row, col).innerHTML = move;
	}

	checkWin() {
		// check for all the win possibilities
		for (let possibility of this.winPossibilities) {
			// if the board space isnt blank and equals two others that are in line
			if (
				this.board[possibility[0][0]][possibility[0][1]] != "" &&
				this.board[possibility[0][0]][possibility[0][1]] == this.board[possibility[1][0]][possibility[1][1]] &&
				this.board[possibility[0][0]][possibility[0][1]] == this.board[possibility[2][0]][possibility[2][1]]
			) {
				// add the won class to the three cells
				const row1 = possibility[0][0].toString();
				const col1 = possibility[0][1].toString();
				const div1 = this.selectDivAt(row1, col1);
				div1.classList.add("won");

				const row2 = possibility[1][0].toString();
				const col2 = possibility[1][1].toString();
				const div2 = this.selectDivAt(row2, col2);
				div2.classList.add("won");

				const row3 = possibility[2][0].toString();
				const col3 = possibility[2][1].toString();
				const div3 = this.selectDivAt(row3, col3);
				div3.classList.add("won");

				return this.board[possibility[0][0]][possibility[0][1]];
			}
		}

		// check for a tie
		if (!(this.board[0].includes("") || this.board[1].includes("") || this.board[2].includes(""))) {
			return "tie";
		}

		// otherwise not tie or win yet
		return null;
	}

	selectDivAt(x, y) {
		// returns the cell div element at an x, y location
		const selector = `[data-row='${x}']`;
		const row = document.querySelectorAll(selector);
		for (let r of row) {
			if (r.dataset.col == y) {
				return r;
			}
		}
	}

	gameEnd() {
		this.gameOn = false;
		for (let cell of cell_divs) {
			cell.classList.remove("empty");
		}
	}

	resetBoard() {
		this.board = [ [ "", "", "" ], [ "", "", "" ], [ "", "", "" ] ];
		this.xTurn = true;
		this.gameOn = true;
	}
}
