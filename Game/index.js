let canvas = document.getElementById('game'),
	ctx = canvas.getContext('2d'),
	widthOfCell = 40,
	color = "#FFDEAD",
	flag = true,
	attempts = [],
	figure = 0,
	x = 0,
	y = 0,
	num = 2,
	colorOfAttackPlayer = "white",
	whiteKing = {},
	blackKing = {},
	step = false,
	cloneArr = [];

let arr = [["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""],
			["", "", "", "", "", "", "", ""]];

let figures = ["♙", "♖", "♘", "♗", "♕", "♔", "♟", "♜", "♞", "♝", "♛", "♚"];


ctx.width = window.innerWidth;
ctx.height = window.innerHeight;
ctx.strokeStyle = "#000";

startGame();

function startGame() {
	drawChessboard();

	addFigures();
	addFigures();
	drawFigures();
};

function addFigures() {
	for (var i = 0; i < 8; i++) {
		addFigure(i, 1, "pawn", "black", "♟");
		addFigure(i, 6, "pawn", "white", "♙");
	}

	addFigure(7, 7, "bishop", "white", "♖");
	addFigure(0, 7, "bishop", "white", "♖");
	addFigure(7, 0, "bishop", "black", "♜");
	addFigure(0, 0, "bishop", "black", "♜");

	addFigure(6, 7, "horse", "white", "♘");
	addFigure(1, 7, "horse", "white", "♘");
	addFigure(6, 0, "horse", "black", "♞");
	addFigure(1, 0, "horse", "black", "♞");

	addFigure(5, 7, "rook", "white", "♗");
	addFigure(2, 7, "rook", "white", "♗");
	addFigure(5, 0, "rook", "black", "♝");
	addFigure(2, 0, "rook", "black", "♝");

	addFigure(4, 7, "queen", "white", "♕");
	addFigure(3, 7, "king", "white", "♔");
	addFigure(3, 0, "queen", "black", "♛");
	addFigure(4, 0, "king", "black", "♚");
}

function addFigure(x, y, type, figureColor, figure) {
	arr[y][x] = {
		type: type,
		figureColor: figureColor,
		figure: figure,
		attempts: possibleAttempts(x, y, type, figureColor)
	};
	if(figure == "♔") {
		whiteKing.x = x;
		whiteKing.y = y;
	}
	if(figure == "♚") {
		blackKing.x = x;
		blackKing.y = y;
	}
}

function drawChessboard() {
	for(let i = 0; i < 8; i++) {
		if(color == "#FFDEAD") color = "#8B4513";
		else color = "#FFDEAD";
		for(let y = 0; y < 8; y++) {
			if(color == "#FFDEAD") color = "#8B4513";
			else color = "#FFDEAD";

			ctx.fillStyle = color;
			ctx.fillRect(i*widthOfCell, y*widthOfCell, widthOfCell, widthOfCell);
		}
	}
}

function drawFigures() {
	for(let i = 0; i < 8; i++) {
		for (let k = 0; k < 8; k++) {
			if(arr[i][k] != "") {
				ctx.fillStyle = arr[i][k].figureColor;
				ctx.font = "bold 40px serif";
				ctx.fillText(arr[i][k].figure, k*widthOfCell - 1, (i+1)*widthOfCell-5);
			}
		}		
	}
	
}

function addToAttempts(x, y) {
	attempts.push({
		x: x,
		y: y
	});
}

function possibleAttempts(x, y, type, figureColor) {
	attempts = [];
	if(type =="pawn") {
		if(figureColor == "white") {
			if(y == 6) {
				num = 2;
			}
			for (var i = 1; i <= num; i++) {
				if(arr[y - i][x] == "") {
					addToAttempts(x, y - i);
				} else break;
			}
			if(y-1 >= 0 && x+1 < 8 && arr[y-1][x+1] != "") {
				if(arr[y-1][x+1].figureColor != figureColor) addToAttempts(x+1, y-1);
			} 
			if(y-1 >= 0 && x-1 >= 0 && arr[y-1][x-1] != "") {
				if(arr[y-1][x-1].figureColor != figureColor) addToAttempts(x-1, y-1);
			} 
		} else {
			if(y == 1) {
				num = 2;
			}
			for (var i = 1; i <= num; i++) {
				if(arr[y + i][x] == "") {
					addToAttempts(x, y + i);
				} else break;
			}
			if(y+1 < 8 && x+1 < 8 && arr[y+1][x+1] != "") {
				if(arr[y+1][x+1].figureColor != figureColor) addToAttempts(x+1, y+1);
			} 
			if(y+1 < 8 && x-1 >= 0 && arr[y+1][x-1] != "") {
				if(arr[y+1][x-1].figureColor != figureColor) addToAttempts(x-1, y+1);
			} 
		}
		num = 1;
	}

	if(type == "bishop") {
		forBishop(x, y, type, figureColor);
	} else if(type == "horse") {
		if(y + 2 < 8 && x - 1 >= 0 && arr[y + 2][x - 1].figureColor != figureColor) {
			addToAttempts(x - 1, y + 2);
		}
		if(y + 2 < 8 && x + 1 < 8 && arr[y + 2][x + 1].figureColor != figureColor) {
			addToAttempts(x + 1, y + 2);
		}
		if(y - 2 >= 0 && x - 1 >= 0 && arr[y - 2][x - 1].figureColor != figureColor) {
			addToAttempts(x - 1, y - 2);
		}
		if(y - 2 >= 0 && x + 1 < 8 && arr[y - 2][x + 1].figureColor != figureColor) {
			addToAttempts(x + 1, y - 2);
		}
		if(x + 2 < 8 && y - 1 >= 0 && arr[y - 1][x + 2].figureColor != figureColor) {
			addToAttempts(x + 2, y - 1);
		}
		if(x + 2 < 8 && y + 1 < 8 && arr[y + 1][x + 2].figureColor != figureColor) {
			addToAttempts(x + 2, y + 1);
		}
		if(x - 2 >= 0 && y - 1 >= 0 && arr[y - 1][x - 2].figureColor != figureColor) {
			addToAttempts(x - 2, y - 1);
		}
		if(x - 2 >= 0 && y + 1 < 8 && arr[y + 1][x - 2].figureColor != figureColor) {
			addToAttempts(x - 2, y + 1);
		}
	} else if(type == "rook") {
		forRook(x, y, type, figureColor);
	} else if(type == "queen") {
		forBishop(x, y, type, figureColor);
		forRook(x, y, type, figureColor);
	} else if(type == "king") {
		if(y + 1 < 8 && x - 1 >= 0 && arr[y + 1][x - 1].figureColor != figureColor) {
			addToAttempts(x - 1, y + 1);
		}
		if(y + 1 < 8 && x + 1 < 8 && arr[y + 1][x + 1].figureColor != figureColor) {
			addToAttempts(x + 1, y + 1);
		}
		if(y - 1 >= 0 && x - 1 >= 0 && arr[y - 1][x - 1].figureColor != figureColor) {
			addToAttempts(x - 1, y - 1);
		}
		if(y - 1 >= 0 && x + 1 < 8 && arr[y - 1][x + 1].figureColor != figureColor) {
			addToAttempts(x + 1, y - 1);
		}
		if(x - 1 >= 0 && arr[y][x - 1].figureColor != figureColor) {
			addToAttempts(x - 1, y);
		}
		if(x + 1 < 8 && arr[y][x + 1].figureColor != figureColor) {
			addToAttempts(x + 1, y);
		}
		if(y - 1 >= 0 && arr[y - 1][x].figureColor != figureColor) {
			addToAttempts(x, y - 1);
		}
		if(y + 1 < 8 && arr[y + 1][x].figureColor != figureColor) {
			addToAttempts(x, y + 1);
		}
	}

	return attempts;
}

function forRook(x, y, type, figureColor) {
		for(let i = x + 1; i < 8; i++) {
			if(arr[y][i] == "") {
				addToAttempts(i, y);
			} else {
				if(arr[y][i].figureColor != figureColor) addToAttempts(i, y);
				break;
			} 
		}
		for(let i = x - 1; i >= 0; i--) {
			if(arr[y][i] == "") {
				addToAttempts(i, y);
			} else {
				if(arr[y][i].figureColor != figureColor) addToAttempts(i, y);
				break;
			} 
		}
		for(let i = y + 1; i < 8; i++) {
			if(arr[i][x] == "") {
				addToAttempts(x, i);
			} else {
				if(arr[i][x].figureColor != figureColor) addToAttempts(x, i);
				break;
			} 
		}
		for(let i = y - 1; i >= 0; i--) {
			if(arr[i][x] == "") {
				addToAttempts(x, i);
			} else {
				if(arr[i][x].figureColor != figureColor) addToAttempts(x, i);
				break;
			} 
		}
}

function forBishop(x, y, type, figureColor) {
		for(let i = 1; i < 8; i++) {
			if(x + i < 8 && y + i < 8) {
				if(arr[y + i][x + i] == "") {
					addToAttempts(x + i, y + i);
				} else {
					if(arr[y + i][x + i].figureColor != figureColor) addToAttempts(x + i, y + i);
					break;
				}
			} else {
				break;
			}	
		}
		for(let i = 1; i < 8; i++) {
			if(x + i < 8 && y - i >= 0) {
				if(arr[y - i][x + i] == "") {
					addToAttempts(x + i, y - i);
				} else {
					if(arr[y - i][x + i].figureColor != figureColor) addToAttempts(x + i, y - i);
					break;
				}
			} else {
				break;
			}	
		}
		for(let i = 1; i < 8; i++) {
			if(x - i >= 0 && y + i < 8) {
				if(arr[y + i][x - i] == "") {
					addToAttempts(x - i, y + i);
				} else {
					if(arr[y + i][x - i].figureColor != figureColor) addToAttempts(x - i, y + i);
					break;
				}
			} else {
				break;
			}	
		}
		for(let i = 1; i < 8; i++) {
			if(x - i >= 0 && y - i >= 0) {
				if(arr[y - i][x - i] == "") {
					addToAttempts(x - i, y - i);
				} else {
					if(arr[y - i][x - i].figureColor != figureColor) addToAttempts(x - i, y - i);
					break;
				}
			} else {
				break;
			}	
		}
}

function drawPossibleAttempts(x, y) {
	ctx.fillStyle = "rgba(124,252,0, 0.8)";
	ctx.fillRect(x * widthOfCell, y * widthOfCell, widthOfCell, widthOfCell);
}

function check() {
	for(let l = 0; l < 8; l++) {
		for (let k = 0; k < 8; k++) {
			arr[l][k].attempts = possibleAttempts(k, l, arr[l][k].type, arr[l][k].figureColor);
		}
	}
}

canvas.addEventListener('click', (e) => {
	if(!figure) {
		figure = arr[(e.y - e.y % widthOfCell) / widthOfCell][(e.x - e.x % widthOfCell) / widthOfCell];
		x = (e.x - e.x % widthOfCell) / widthOfCell;
		y = (e.y - e.y % widthOfCell) / widthOfCell;
	}
	if(!figure.attempts) {
		figure = 0;
	}
	if(figure.figureColor != colorOfAttackPlayer) {
		figure = 0;
	}
	if(flag) {
		for(let i = 0; i < figure.attempts.length; i++) {
			drawPossibleAttempts(figure.attempts[i].x, figure.attempts[i].y);
		}
		flag = false;
	} else {
		if(figure == arr[(e.y - e.y % widthOfCell) / widthOfCell][(e.x - e.x % widthOfCell) / widthOfCell]) {
			figure = 0;
			flag = true;
			drawChessboard();
			drawFigures();
		} else {
			if(figure.attempts) {
				if(colorOfAttackPlayer == "white") colorOfAttackPlayer = "black";
				else colorOfAttackPlayer = "white";
				for(let i = 0; i < figure.attempts.length; i++) {
					if((e.y - e.y % widthOfCell) / widthOfCell == figure.attempts[i].y && (e.x - e.x % widthOfCell) / widthOfCell == figure.attempts[i].x) {
						arr[(e.y - e.y % widthOfCell) / widthOfCell][(e.x - e.x % widthOfCell) / widthOfCell] = figure;
						arr[y][x] = "";
						
						for(let l = 0; l < 8; l++) {
							for (let k = 0; k < 8; k++) {
								arr[l][k].attempts = possibleAttempts(k, l, arr[l][k].type, arr[l][k].figureColor);
							}
						}

						figure = 0;
						flag = true;
						drawChessboard();
						drawFigures();
					}
				}
			}
		}
	}
});

/* 
						for(let l = 0; l < 8; l++) {
							for (let k = 0; k < 8; k++) {
								arr[l][k].attempts = possibleAttempts(k, l, arr[l][k].type, arr[l][k].figureColor);

								if(arr[l][k]) {
									for(let j = 0; j < arr[l][k].attempts.length; j++) {
										if(arr[l][k].figureColor == "white" && arr[l][k].attempts[j].x == blackKing.x && arr[l][k].attempts[j].y == blackKing.y) {
											for(let h = 0; h < arr[l][k].attempts.length; h++) {
												for(let a = 0; a < arr[blackKing.y][blackKing.x].attempts.length; a++) {
													if(arr[blackKing.y][blackKing.x].attempts[a].x == arr[l][k].attempts[h].x && arr[blackKing.y][blackKing.x].attempts[a].y == arr[l][k].attempts[h].y) {
														cloneArr = arr[blackKing.y][blackKing.x].attempts.splice(a, 1);
													}
												}
												for(let q = 0; q < 8; q++) {
													for (let s = 0; s < 8; s++) {
														if(arr[q][s]) {
															for(let a = 0; a < arr[q][s].attempts.length; a++) {
																if(arr[q][s].figureColor == "black" && arr[q][s].attempts[a].x == arr[l][k].attempts[h].x && arr[q][s].attempts[a].y == arr[l][k].attempts[h].y) ;
																else {
																	cloneArr = arr[q][s].attempts.slice(a, 1);
																	console.log(arr[q][s].attempts);
																}
																
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
*/