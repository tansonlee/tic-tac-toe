// cache the DOM
const cell_divs = document.querySelectorAll(".cell");
const restart_div = document.querySelector(".restart");
const status_div = document.querySelector(".status");

const board = new Board();

// restart div X-turn or O-turn class to determine the color of the text (black/white)
// cell div X or O class to determine color of the text (black/white)

function main() {
	// add event event listener to all the cells
	cell_divs.forEach((cell) => {
		cell.addEventListener("click", () => handleClick(cell), { once: true });
	});

	// add event listener to the restart div
	restart_div.addEventListener("click", restartGame);
}

function handleClick(cell) {
	// if the game is active and there isnt an X or O in the cell
	if (board.gameOn && cell.classList.contains("empty")) {
		if (board.xTurn) {
			// add X to the board object, remove empty class, add X class from cell, change the status
			board.addMove("X", cell.dataset.row, cell.dataset.col);

			cell.classList.add("X");
			status_div.classList.remove("X-turn");
			status_div.classList.add("O-turn");
		} else {
			// add O to the board object, remove empty class, add X class from cell, change the status
			board.addMove("O", cell.dataset.row, cell.dataset.col);
			cell.classList.add("O");
			status_div.classList.remove("O-turn");
			status_div.classList.add("X-turn");
		}
		cell.classList.remove("empty");

		// change what the status says based on whos turn
		if (board.xTurn) {
			status_div.innerHTML = "X's turn";
		} else {
			status_div.innerHTML = "O's turn";
		}
		// switch turns
		board.xTurn = !board.xTurn;

		checkWinner();
	}
}

const restartGame = function() {
	resetCells();
	resetStatus();
	board.resetBoard();
};

const resetCells = function() {
	cell_divs.forEach((cell) => {
		cell.classList.remove(...cell.classList);
		cell.addEventListener("click", () => handleClick(cell), { once: true });
		cell.classList.add("cell");
		cell.classList.add("empty");
		cell.innerHTML = "";
	});
};

const resetStatus = function() {
	status_div.innerHTML = "X's turn";
	status_div.classList.remove(...status_div.classList);
	status_div.classList.add("status");
	status_div.classList.add("X-turn");
};

const checkWinner = function() {
	const winner = board.checkWin();

	if (winner) {
		if (winner == "tie") {
			status_div.innerHTML = "It's a TIE";
		} else {
			status_div.innerHTML = `${winner} WINS!`;
		}

		status_div.classList.add("result-win");
		board.gameEnd();
	}
};

main();
