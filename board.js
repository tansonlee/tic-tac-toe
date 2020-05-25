class Board {
	constructor() {
		//this.board = [ [ "O", "O", "X" ], [ "X", "O", "X" ], [ "O", "O", "X" ] ];
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
	}

	show() {
		strokeWeight(4);
		// line(100 + 400 / 3, 150, 100 + 400 / 3, 550);
		// line(100 + 800 / 3, 150, 100 + 800 / 3, 550);
		// line(100, 150 + 400 / 3, 500, 150 + 400 / 3);
		// line(100, 150 + 800 / 3, 500, 150 + 800 / 3);

		// textAlign(CENTER, CENTER);
		// textSize(100);

		// for (let i = 0; i < this.board.length; i++) {
		// 	for (let j = 0; j < this.board[0].length; j++) {
		// 		text(this.board[j][i], i * 133 + 168, j * 133 + 220);
		// 	}
		// }
	}

	addMove(move, row, col) {
		this.board[row][col] = move;

		this.selectDivAt(row, col).innerHTML = move;
	}

	checkWin() {
		for (let possibility of this.winPossibilities) {
			if (
				this.board[possibility[0][0]][possibility[0][1]] != "" &&
				this.board[possibility[0][0]][possibility[0][1]] == this.board[possibility[1][0]][possibility[1][1]] &&
				this.board[possibility[0][0]][possibility[0][1]] == this.board[possibility[2][0]][possibility[2][1]]
			) {
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
		return null;
	}

	selectDivAt(x, y) {
		const selector = `[data-row='${x}']`;
		const row = document.querySelectorAll(selector);
		for (let r of row) {
			if (r.dataset.col == y) {
				return r;
			}
		}
	}
}
