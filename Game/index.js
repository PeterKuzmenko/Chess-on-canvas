let		canvas = document.getElementById('game'),
		undo = document.getElementById('undo'),
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
		changeX = 0,
		changeY = 0,
		changeFigure = 0,
		flagOnCheck 		= false,
		previousFigure = 0,
		colorsForCheck = ["black", "white"],
		changeElement = 0,
		whiteFiguresForPawn = ["♖", "♘", "♗", "♕"],
		blackFiguresForPawn = ["♜", "♞", "♝", "♛"],
		flagForPawn = false,
		arrFigures = 0,
		figureColor = 0,
		type = 0,
		flagOnPossibleAttempts = true,
		flagOnCastlingWhite = true,
		flagOnCastlingBlack = true,
		history = [],
		king = 0,
		flagForCheck = false,
		flagForCheckmate = false;

let arr = [["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""]];

ctx.width = window.innerWidth;
ctx.height = window.innerHeight;
ctx.strokeStyle = "#000";
startGame();

function startGame() {
	drawArray();

	addFigures();
	addFigures();
	drawFigures();
};

function addFigures() {
	for (var i = 0; i < 8; i++) {
		addFigure(i, 1, "pawn", "black", "♟");
		addFigure(i, 6, "pawn", "white", "♙");
	}

	addFigure(7, 7, "elephant", "white", "♖");
	addFigure(0, 7, "elephant", "white", "♖");
	addFigure(7, 0, "elephant", "black", "♜");
	addFigure(0, 0, "elephant", "black", "♜");

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
	} else if(figure == "♚") {
		blackKing.x = x;
		blackKing.y = y;
	}
}

function drawArray() {
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
				if(y-i>=0 && arr[y - i][x] == "") {
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
				if(y+i < 8 && arr[y + i][x] == "") {
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

	if(type == "elephant") {
		forElephant(x, y, type, figureColor);
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
		forElephant(x, y, type, figureColor);
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

		if(figureColor == "white" && flagOnCastlingWhite) {
			if(!arr[7][1] && !arr[7][2]) {
				addToAttempts(1, 7);
			} else if(!arr[7][4] && !arr[7][5] && !arr[7][6]) {
				addToAttempts(5, 7);
			}
		} else if(figureColor == "black" && flagOnCastlingBlack) {
			if(!arr[0][1] && !arr[0][2] && !arr[0][3]) {
				addToAttempts(2, 0);
			} else if(!arr[0][5] && !arr[0][6]) {
				addToAttempts(6, 0);
			}
		}
	}

	return attempts;
}

function forElephant(x, y, type, figureColor) {
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

function forRook(x, y, type, figureColor) {
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

function check(color, ...args) {
	if(!args[0]) {
		if(color == "white") {
			changeElement = colorsForCheck[0];
			colorsForCheck[0] = colorsForCheck[1];
			colorsForCheck[1] = changeElement;
		}

		if(color == "white") {
			king = blackKing;
		} else {
			king = whiteKing;
		}
	} else {
		if(color == "black") {
			changeElement = colorsForCheck[0];
			colorsForCheck[0] = colorsForCheck[1];
			colorsForCheck[1] = changeElement;
		}
	}

	for(let l = 0; l < 8; l++) {
		for (let k = 0; k < 8; k++) {
			if(arr[l][k]) {
				for(let j = 0; j < arr[l][k].attempts.length; j++) {
					if(arr[l][k].figureColor == colorsForCheck[0] && arr[l][k].attempts[j].x == king.x && arr[l][k].attempts[j].y == king.y) {
						flagForCheck = true;
						for(let q = 0; q < 8; q++) {
							for (let s = 0; s < 8; s++) {
								if(arr[q][s] && arr[q][s].figureColor == colorsForCheck[1]) {
									for(let h = arr[q][s].attempts.length - 1; h >= 0; h--) {
										changeX = arr[q][s].attempts[h].x;
										changeY = arr[q][s].attempts[h].y;

										if(arr[q][s].type == "king") {
											king.x = changeX;
											king.y = changeY;
										}

										changeFigure = arr[changeY][changeX];
										arr[changeY][changeX] = arr[q][s];
										arr[q][s] = "";

										for(let d = 0; d < 8; d++) {
											for (let n = 0; n < 8; n++) {
												if(arr[d][n] && arr[d][n].figureColor == colorsForCheck[0]) {
													arr[d][n].attempts = possibleAttempts(n, d, arr[d][n].type, arr[d][n].figureColor);
													for(let p = 0; p < arr[d][n].attempts.length; p++) {
														if(arr[d][n].attempts[p].x == king.x && arr[d][n].attempts[p].y == king.y) {
															flagOnCheck = true;
														}
													}
												}
											}
										}

										arr[q][s] = arr[changeY][changeX];
										arr[changeY][changeX] = changeFigure;

										if(arr[q][s].type == "king") {
											king.x = s;
											king.y = q;
										}

										if(flagOnCheck) {
											arr[q][s].attempts.splice(h, 1);
											flagOnCheck = false;
										}

										for(let d = 0; d < 8; d++) {
											for (let n = 0; n < 8; n++) {
												if(arr[d][n] && arr[d][n].figureColor == colorsForCheck[0]) arr[d][n].attempts = possibleAttempts(n, d, arr[d][n].type, arr[d][n].figureColor);
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
	colorsForCheck = ["black", "white"];
	checkmate(colorOfAttackPlayer, args[0]);
}

function checkmate(color, ...args) {
	if(!args[0]) {
		if(color == "black") {
			color = "white";
		} else {
			color =  "black";
		}
	}

	for(let d = 0; d < 8; d++) {
		for (let n = 0; n < 8; n++) {
			if(flagForCheck && arr[d][n] && arr[d][n].figureColor == color && !arr[d][n].attempts.length) {
				flagForCheckmate = true;
			} else if(flagForCheck && arr[d][n] && arr[d][n].figureColor == color) {
				flagForCheckmate = false;
				flagForCheck = false;
			}
		}
	}
}

function choiceForPawn(color) {
	if(color == "black") {
		arrFigures = blackFiguresForPawn;
	} else {
		arrFigures = whiteFiguresForPawn;
	}

	figureColor = color;

	if(flagForPawn) {
		ctx.fillStyle = "gray";
		ctx.fillRect(2*widthOfCell, 2*widthOfCell, 4*widthOfCell, 4*widthOfCell);

		ctx.fillStyle = color;
		ctx.font = "bold 20px serif";
		ctx.fillText("Pick the figure", 3*widthOfCell-20, 3*widthOfCell);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[0], 4*widthOfCell, 4*widthOfCell);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[1], 3*widthOfCell, 4*widthOfCell);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[2], 3*widthOfCell, 5*widthOfCell);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[3], 4*widthOfCell, 5*widthOfCell);
	}
}

canvas.addEventListener('click', (e) => {
	if(flagForCheckmate) {
		
	} else if(flagForPawn) {
		let figure = 0;
		if((e.y - e.y % widthOfCell) / widthOfCell == 4 && (e.x - e.x % widthOfCell) / widthOfCell == 3) {
			figure = arrFigures[2];
			type = "rook";
		}
		else if((e.y - e.y % widthOfCell) / widthOfCell == 3 && (e.x - e.x % widthOfCell) / widthOfCell == 3) {
			figure = arrFigures[1];
			type = "horse";
		}
		else if((e.y - e.y % widthOfCell) / widthOfCell == 3 && (e.x - e.x % widthOfCell) / widthOfCell == 4) {
			figure = arrFigures[0];
			type = "elephant";
		}
		else if((e.y - e.y % widthOfCell) / widthOfCell == 4 && (e.x - e.x % widthOfCell) / widthOfCell == 4) {
			figure = arrFigures[3];
			type = "queen";
		}

		addFigure(changeX, changeY, type, figureColor, figure);
		flagForPawn = false;
		drawArray();
		drawFigures();
		check(colorOfAttackPlayer, true);
		history.push(JSON.parse(JSON.stringify(arr)));
		if(flagForCheckmate) {
			ctx.fillStyle = "black";
			ctx.font = "bold 60px serif";
			ctx.fillText("Game over", 13, 4*widthOfCell+10);
		}
	} else {
		if(arr[(e.y - e.y % widthOfCell) / widthOfCell][(e.x - e.x % widthOfCell) / widthOfCell] && arr[(e.y - e.y % widthOfCell) / widthOfCell][(e.x - e.x % widthOfCell) / widthOfCell].figureColor == colorOfAttackPlayer) {
			figure = arr[(e.y - e.y % widthOfCell) / widthOfCell][(e.x - e.x % widthOfCell) / widthOfCell];
			x = (e.x - e.x % widthOfCell) / widthOfCell;
			y = (e.y - e.y % widthOfCell) / widthOfCell;

			flag = true;
		} else {
			flag = false;
		}

		if(!figure.attempts) {
			figure = 0;
		}

		if(figure.figureColor != colorOfAttackPlayer) {
			figure = 0;
		}
		
		if(flag) {
			drawArray();
			drawFigures();
			for(let i = 0; i < figure.attempts.length; i++) {
				drawPossibleAttempts(figure.attempts[i].x, figure.attempts[i].y);
			}
		} else {
			if(figure.attempts) {
				for(let i = 0; i < figure.attempts.length; i++) {
					if((e.y - e.y % widthOfCell) / widthOfCell == figure.attempts[i].y && (e.x - e.x % widthOfCell) / widthOfCell == figure.attempts[i].x) {
						history.push(JSON.parse(JSON.stringify(arr)));
						if(figure.type == "pawn") {
							if((e.y - e.y % widthOfCell) / widthOfCell == 0 || (e.y - e.y % widthOfCell) / widthOfCell == 7) {
								flagForPawn = true;
								changeX = (e.x - e.x % widthOfCell) / widthOfCell;
								changeY = (e.y - e.y % widthOfCell) / widthOfCell;
							}
						}

						if(figure.figure == "♔") {
							whiteKing.x = (e.x - e.x % widthOfCell) / widthOfCell;
							whiteKing.y = (e.y - e.y % widthOfCell) / widthOfCell;
						} else if(figure.figure == "♚") {
							blackKing.x = (e.x - e.x % widthOfCell) / widthOfCell;
							blackKing.y = (e.y - e.y % widthOfCell) / widthOfCell;
						}

						if(figure.figure == "♔" && flagOnCastlingWhite) {
							if((e.y - e.y % widthOfCell) / widthOfCell == 7 && (e.x - e.x % widthOfCell) / widthOfCell == 1) {
								addFigure(2, 7, "elephant", "white", "♖");
								arr[7][0] = "";
							} else if((e.y - e.y % widthOfCell) / widthOfCell == 7 && (e.x - e.x % widthOfCell) / widthOfCell == 5) {
								addFigure(4, 7, "elephant", "white", "♖");
								arr[7][7] = "";
							}
						} else if(figure.figure == "♚" && flagOnCastlingBlack) {
							if((e.y - e.y % widthOfCell) / widthOfCell == 0 && (e.x - e.x % widthOfCell) / widthOfCell == 2) {
								addFigure(3, 0, "elephant", "black", "♜");
								arr[0][0] = "";
							} else if((e.y - e.y % widthOfCell) / widthOfCell == 0 && (e.x - e.x % widthOfCell) / widthOfCell == 6) {
								addFigure(5, 0, "elephant", "black", "♜");
								arr[0][7] = "";
							}
						}

						if(figure.figure == "♔" || figure.figure == "♖") {
							flagOnCastlingWhite = false;
						} else if(figure.figure == "♚" || figure.figure == "♜") {
							flagOnCastlingBlack = false;
						}

						arr[(e.y - e.y % widthOfCell) / widthOfCell][(e.x - e.x % widthOfCell) / widthOfCell] = figure;
						arr[y][x] = "";
						
						for(let l = 0; l < 8; l++) {
							for (let k = 0; k < 8; k++) {
								if(arr[l][k]) {
									arr[l][k].attempts = possibleAttempts(k, l, arr[l][k].type, arr[l][k].figureColor);
								}
							}
						}

						check(colorOfAttackPlayer);
						figure = 0;
						flag = true;
						drawArray();
						drawFigures();
						choiceForPawn(colorOfAttackPlayer);
						flagOnPossibleAttempts = true;
						if(flagForCheckmate) {
							ctx.fillStyle = "black";
							ctx.font = "bold 60px serif";
							ctx.fillText("Game over", 13, 4*widthOfCell+10);
						}
						break;
					} else {
						flagOnPossibleAttempts = false;
					}
				}
				if(flagOnPossibleAttempts) {
					if(colorOfAttackPlayer == "white") colorOfAttackPlayer = "black";
					else colorOfAttackPlayer = "white";
				}
			}
		}
	}
});

undo.addEventListener("click", () => {
	arr = history[history.length - 1];
	history.pop(history.length - 1);
	if(colorOfAttackPlayer == "white") colorOfAttackPlayer = "black";
	else colorOfAttackPlayer = "white";
	drawArray();
	drawFigures();
});
