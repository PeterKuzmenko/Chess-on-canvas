let		canvas = document.getElementById('game'),
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
		countHistory = 0;
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
	ctx.fillStyle = "#8B4513";
	ctx.fillRect(0, 0, 380, 380);
	ctx.fillStyle = "#e6bb7c";
	ctx.fillRect(28, 28, 324, 324);
<<<<<<< HEAD
	for(let i = 8; i >= 1; i--) {
		ctx.fillStyle = "#e6bb7c";
		ctx.font = "bold 30px serif";
		ctx.fillText(i.toString(), 5, widthOfCell*9 - i*widthOfCell+20);
=======
	for(let i = 1; i <= 8; i++) {
		ctx.fillStyle = "#e6bb7c";
		ctx.font = "bold 30px serif";
		ctx.fillText(i.toString(), 5, i*widthOfCell+20);
>>>>>>> d44bbcbbf2edd0a8fd8bbaa631384e90e1014c98
	}
	for(let i = 0; i < 8; i++) {
		ctx.fillStyle = "#e6bb7c";
		ctx.font = "bold 30px serif";
		ctx.fillText(String.fromCharCode(65 + i), i*widthOfCell+widthOfCell, widthOfCell*9+17);
	}
	for(let i = 8; i >= 1; i--) {
		ctx.fillStyle = "#e6bb7c";
		ctx.font = "bold 30px serif";
<<<<<<< HEAD
		ctx.fillText(i.toString(), widthOfCell*9, widthOfCell*9 - i*widthOfCell+20);
	}
	for(let i = 0; i < 8; i++) {
		ctx.fillStyle = "#e6bb7c";
		ctx.font = "bold 30px serif";
		ctx.fillText(String.fromCharCode(65 + i), i*widthOfCell+widthOfCell, 25);
=======
		ctx.fillText(String.fromCharCode(73 - i), i*widthOfCell, 25);
	}
	for(let i = 8; i >= 1; i--) {
		ctx.fillStyle = "#e6bb7c";
		ctx.font = "bold 30px serif";
		ctx.fillText(i.toString(), widthOfCell*9, widthOfCell*9 - i*widthOfCell+20);
>>>>>>> d44bbcbbf2edd0a8fd8bbaa631384e90e1014c98
	}
	drawArray();

	addFigures();
	addFigures();
	drawFigures();
	history.push(JSON.parse(JSON.stringify(arr)));
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

	addFigure(3, 7, "queen", "white", "♕");
	addFigure(4, 7, "king", "white", "♔");
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
<<<<<<< HEAD
		if(color == "#8B4513") color = "#e6bb7c";
		else color = "#8B4513";
		for(let y = 0; y < 8; y++) {
			if(color == "#8B4513") color = "#e6bb7c";
			else color = "#8B4513";
=======
		if(color == "#e6bb7c") color = "#8B4513";
		else color = "#e6bb7c";
		for(let y = 0; y < 8; y++) {
			if(color == "#e6bb7c") color = "#8B4513";
			else color = "#e6bb7c";
>>>>>>> d44bbcbbf2edd0a8fd8bbaa631384e90e1014c98

			ctx.fillStyle = color;
			ctx.fillRect(i*widthOfCell + 30, y*widthOfCell + 30, widthOfCell, widthOfCell);
		}
	}
}

function drawFigures() {
	for(let i = 0; i < 8; i++) {
		for (let k = 0; k < 8; k++) {
			if(arr[i][k] != "") {
				ctx.fillStyle = arr[i][k].figureColor;
				ctx.font = "bold 40px serif";
				ctx.fillText(arr[i][k].figure, k*widthOfCell + 29, (i+1)*widthOfCell + 25);
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
	ctx.fillRect(x * widthOfCell + 30, y * widthOfCell + 30, widthOfCell, widthOfCell);
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
		ctx.fillRect(2*widthOfCell + 30, 2*widthOfCell + 30, 4*widthOfCell, 4*widthOfCell);

		ctx.fillStyle = color;
		ctx.font = "bold 20px serif";
		ctx.fillText("Pick the figure", 3*widthOfCell-20 + 30, 3*widthOfCell + 30);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[0], 4*widthOfCell + 30, 4*widthOfCell + 30);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[1], 3*widthOfCell + 30, 4*widthOfCell + 30);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[2], 3*widthOfCell + 30, 5*widthOfCell + 30);

		ctx.fillStyle = color;
		ctx.font = "bold 40px serif";
		ctx.fillText(arrFigures[3], 4*widthOfCell + 30, 5*widthOfCell + 30);
	}
}

canvas.addEventListener('click', (e) => {
	let ex = e.layerX - 30;
	let ey = e.layerY - 30;
	if(flagForCheckmate) {
		
	} else if(flagForPawn) {
		let figure = 0;
		if((ey - ey % widthOfCell) / widthOfCell == 4 && (ex - ex % widthOfCell) / widthOfCell == 3) {
			figure = arrFigures[2];
			type = "rook";
		}
		else if((ey - ey % widthOfCell) / widthOfCell == 3 && (ex - ex % widthOfCell) / widthOfCell == 3) {
			figure = arrFigures[1];
			type = "horse";
		}
		else if((ey - ey % widthOfCell) / widthOfCell == 3 && (ex - ex % widthOfCell) / widthOfCell == 4) {
			figure = arrFigures[0];
			type = "elephant";
		}
		else if((ey - ey % widthOfCell) / widthOfCell == 4 && (ex - ex % widthOfCell) / widthOfCell == 4) {
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
		if(arr[(ey - ey % widthOfCell) / widthOfCell][(ex - ex % widthOfCell) / widthOfCell] && arr[(ey - ey % widthOfCell) / widthOfCell][(ex - ex % widthOfCell) / widthOfCell].figureColor == colorOfAttackPlayer) {
			figure = arr[(ey - ey % widthOfCell) / widthOfCell][(ex - ex % widthOfCell) / widthOfCell];
			x = (ex - ex % widthOfCell) / widthOfCell;
			y = (ey - ey % widthOfCell) / widthOfCell;

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
					if((ey - ey % widthOfCell) / widthOfCell == figure.attempts[i].y && (ex - ex % widthOfCell) / widthOfCell == figure.attempts[i].x) {
						if(figure.type == "pawn") {
							if((ey - ey % widthOfCell) / widthOfCell == 0 || (ey - ey % widthOfCell) / widthOfCell == 7) {
								flagForPawn = true;
								changeX = (ex - ex % widthOfCell) / widthOfCell;
								changeY = (ey - ey % widthOfCell) / widthOfCell;
							}
						}

						if(figure.figure == "♔") {
							whiteKing.x = (ex - ex % widthOfCell) / widthOfCell;
							whiteKing.y = (ey - ey % widthOfCell) / widthOfCell;
						} else if(figure.figure == "♚") {
							blackKing.x = (ex - ex % widthOfCell) / widthOfCell;
							blackKing.y = (ey - ey % widthOfCell) / widthOfCell;
						}

						if(figure.figure == "♔" && flagOnCastlingWhite) {
							if((ey - ey % widthOfCell) / widthOfCell == 7 && (ex - ex % widthOfCell) / widthOfCell == 1) {
								addFigure(2, 7, "elephant", "white", "♖");
								arr[7][0] = "";
							} else if((ey - ey % widthOfCell) / widthOfCell == 7 && (ex - ex % widthOfCell) / widthOfCell == 5) {
								addFigure(4, 7, "elephant", "white", "♖");
								arr[7][7] = "";
							}
						} else if(figure.figure == "♚" && flagOnCastlingBlack) {
							if((ey - ey % widthOfCell) / widthOfCell == 0 && (ex - ex % widthOfCell) / widthOfCell == 2) {
								addFigure(3, 0, "elephant", "black", "♜");
								arr[0][0] = "";
							} else if((ey - ey % widthOfCell) / widthOfCell == 0 && (ex - ex % widthOfCell) / widthOfCell == 6) {
								addFigure(5, 0, "elephant", "black", "♜");
								arr[0][7] = "";
							}
						}

						if(figure.figure == "♔" || figure.figure == "♖") {
							flagOnCastlingWhite = false;
						} else if(figure.figure == "♚" || figure.figure == "♜") {
							flagOnCastlingBlack = false;
						}

						arr[(ey - ey % widthOfCell) / widthOfCell][(ex - ex % widthOfCell) / widthOfCell] = figure;
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
						history.push(JSON.parse(JSON.stringify(arr)));
						countHistory = history.length;
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

function undo() {
<<<<<<< HEAD
	if(history[countHistory - 2]) {
		console.log(history, countHistory);
		arr = history[countHistory - 2];
=======
	if(countHistory) {
		console.log(countHistory);
		arr = history[countHistory - 1];
>>>>>>> d44bbcbbf2edd0a8fd8bbaa631384e90e1014c98
		countHistory--;
		if(colorOfAttackPlayer == "white") colorOfAttackPlayer = "black";
		else colorOfAttackPlayer = "white";
		drawArray();
		drawFigures();
	}
};

function forward() {
	if(countHistory + 1) {
		arr = history[countHistory + 1];
		countHistory++;
		if(colorOfAttackPlayer == "white") colorOfAttackPlayer = "black";
		else colorOfAttackPlayer = "white";
		drawArray();
		drawFigures();
	}
}

function restart() {
	if(confirm("are you sure?")) {
		arr = [["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""],
					["", "", "", "", "", "", "", ""]]
		startGame();
		colorOfAttackPlayer = "white";
	}
<<<<<<< HEAD
}
=======
}
>>>>>>> d44bbcbbf2edd0a8fd8bbaa631384e90e1014c98
