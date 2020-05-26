const board = new Board();
const cell_divs = document.querySelectorAll(".cell");
const restart_div = document.querySelector(".restart");
const status_div = document.querySelector(".status");
let xTurn = true;
let active = true;

for (let cell of cell_divs) {
	const data = cell.dataset;
	cell.addEventListener("click", () => handleClick(cell), { once: true });
}

restart_div.addEventListener("click", restartGame);

function handleClick(cell) {
	if (active && cell.innerHTML == "") {
		if (xTurn) {
			board.addMove("X", cell.dataset.row, cell.dataset.col);
			cell.classList.remove("empty");
			cell.classList.add("X");
			status_div.classList.remove("X-turn");
			status_div.classList.add("O-turn");
		} else {
			board.addMove("O", cell.dataset.row, cell.dataset.col);
			cell.classList.remove("empty");
			cell.classList.add("O");
			status_div.classList.remove("O-turn");
			status_div.classList.add("X-turn");
		}
		xTurn = !xTurn;

		if (xTurn) {
			status_div.innerHTML = "X's turn";
		} else {
			status_div.innerHTML = "O's turn";
		}

		let winner = board.checkWin();
		if (winner) {
			status_div.innerHTML = `${winner} WINS!`;
			status_div.classList.add("result-win");
		}
	}
}

function restartGame() {
	active = true;
	for (let cell of cell_divs) {
		cell.classList.remove(...cell.classList);
		cell.addEventListener("click", () => handleClick(cell), { once: true });
		cell.classList.add("cell");
		cell.classList.add("empty");

		cell.innerHTML = "";
	}
	board.reset();
	xTurn = true;
	status_div.innerHTML = "X's turn";
	status_div.classList.remove(...status_div.classList);
	status_div.classList.add("status");
	status_div.classList.add("X-turn");
}
