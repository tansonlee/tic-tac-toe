let board;
const cell_divs = document.querySelectorAll(".cell");
let xTurn = true;

function setup() {
	createCanvas(600, 600);
	textAlign(CENTER, CENTER);
	board = new Board(5);
}

function draw() {
	background(173, 216, 230);
	textSize(60);
	text("TIC TAC TOE", width / 2, 60);

	board.show();
}

for (let cell of cell_divs) {
	const data = cell.dataset;
	cell.addEventListener("click", () => handleClick(cell), { once: true });
}

function handleClick(cell) {
	if (xTurn) {
		board.addMove("X", cell.dataset.row, cell.dataset.col);
		cell.classList.remove("empty");
	} else {
		board.addMove("O", cell.dataset.row, cell.dataset.col);
		cell.classList.remove("empty");
	}
	xTurn = !xTurn;

	let winner = board.checkWin();
	if (winner) {
		console.log(winner);
	}
}
