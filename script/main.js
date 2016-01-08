	"use strict";

	// global variables
	var canvas,ctx, turn=0, board = [];
	var cursorX;
	var cursorY;
	var boardSize = 500;
	var boardPos = {x: 0, y: 50};
	var rectSize = boardSize/9;
	var playerOneTurn = true;
	var winner = -1; 
	var team1Wins = 0;
	var team2Wins = 0;
	var colorScheme = 
	{
		background: "#FFDD4A",
		color1: "#094074",
		color2: "#3C6997",
		color3: "#5ADBFF",
		color4: "#FE9000"
	};
	var display_tutorial = true;

	/* init() is called when the page loads */
	function init(){
		canvas = document.querySelector("#canvas");
		ctx = canvas.getContext("2d");
		canvas.addEventListener("mousedown", doMousedown);
		canvas.addEventListener("mousemove", doMousemove);
		canvas.addEventListener("mouseup", doMouseup);
		canvas.addEventListener("mouseleave", doMouseleave);
		window.addEventListener("keypress", doKeypress);
		canvas.height = boardSize + boardPos.y;
		canvas.width = boardSize + boardPos.x;

		winner = -1;

		for (var i=0; i<9; i++){
			// make the new Tile
			var newTile = makeTile(boardSize);
			newTile.POS = i;
			var vertPos = Math.floor(i/3); 
			var horzPos = i%3;
			newTile.posY = (vertPos * boardSize/3) + boardPos.y;
			newTile.posX = (horzPos * boardSize/3) + boardPos.x;
			// make the mini tiles inside the tiles
			newTile.generateMinis( newTile.posX, newTile.posY);
			// add the tile onto the board
			board[i]= newTile;
		}

		setupUI();
		update();
	}

	/* Hook up UI widgets to canvas */
	function setupUI(){
		/* clear button */ 
		
		// The below event handlers are pointing at anonymous functions
		
		/* save button */
		document.querySelector("#newGameButton").onclick = function(e){
			//Reset the array that controls the game.
			console.log("pressed new game");
			init();
		};

	
		/* board */
		drawBoard(boardPos.x ,boardPos.y);
		/* other UI elements */


		 
	} // end function setupUI
	

	// checkCollision(x,y)
	// * takes in the mouse X and Y and checks the big tiles
	// * if it is clicked pass down the x and y to the clicked function
	function checkCollision(x,y){
		for(var j=0; j < 9; j++){
			var tile = board[j];

			// check if the mouse x and y are inside a tile
			if (x > tile.posX && x < tile.posX + tile.size){
				if (y > tile.posY && y < tile.posY + tile.size){
					// post the position of the Tile on the console
					console.log("Tile: " + tile.POS + " clicked.");
					if (tile.playable == true){		
						// if the clicked function returns the mini number that was clicked
						// this allows you to set which one 
						var nextMove = tile.clicked(x,y, playerOneTurn);
						if (nextMove || nextMove == 0){
							playerOneTurn = !playerOneTurn;
							board[nextMove].checkTileWin();
							setPlayable(nextMove);
						};
					}
				}
			}	
		}
	}

	// setPlayable()
	// * a function that takes in an index and set's every other tile to 
	// * unplayable. 
	function setPlayable(index){
		// if the tile has a mark, set all of the tiles to playable. 
		if (board[index].mark != -1){
			for (var i = 0; i < 9; i++) {
				if (board[i].mark == -1){
					board[i].playable = true;
				} else{
					board[i].playable = false;
				}
			};
		} // end if
		// otherwise set the appropriate tile to playable.
		else {
			for (var i = 0; i < 9; i++) {
				if (i != index){
					board[i].playable = false;	
				} else {
					board[i].playable = true;
				}
			};
		}
	} // end of setPlayable()

	// gameOver()
	// Set all the tiles to unplayable 
	function gameOver(){
		for (var i=0; i < 9; i++){
			board[i].playable = false;
		}
	}// end of gameOver()

	// checkWin()
	// * check all the tiles in the board to see if the player wins the game.
	function checkWin(){

		// Make sure all the tiles in the win sequence are the same
		// and make sure that they aren't blank
		// The win states are 
		// 036 012 048 
		if (board[0].mark == board[3].mark && board[3].mark== board[6].mark && board[6].mark != -1){
			drawWin(board[0].mark);
			winner = board[0].mark;
			gameOver();
		}
		else if (board[0].mark == board[1].mark && board[1].mark== board[2].mark && board[2].mark != -1){
			drawWin(board[0].mark);
			winner = board[0].mark;
			gameOver();
		}
		else if (board[0].mark == board[4].mark && board[4].mark== board[8].mark && board[8].mark != -1){
			drawWin(board[0].mark);
			winner = board[0].mark;
			gameOver();
		}
		// 147
		else if (board[1].mark == board[4].mark && board[4].mark== board[7].mark && board[7].mark != -1){
			drawWin(board[1].mark);
			winner = board[1].mark;
			gameOver();
		} 
		// 246 258 
		else if (board[2].mark == board[4].mark && board[4].mark== board[6].mark && board[6].mark != -1){
			drawWin(board[2].mark);
			winner = board[2].mark;
			gameOver();
		}
		else if (board[2].mark == board[5].mark && board[5].mark== board[8].mark && board[8].mark != -1){
			drawWin(board[2].mark);
			winner = board[2].mark;
			gameOver();
		}
		// 345
		else if (board[3].mark == board[4].mark && board[4].mark== board[5].mark && board[5].mark != -1){
			drawWin(board[3].mark);
			winner = board[3].mark;
			gameOver();
		}
		// 678
		else if (board[6].mark == board[7].mark && board[7].mark== board[8].mark && board[8].mark != -1){
			drawWin(board[6].mark);
			winner = board[6].mark;
			gameOver();
		}
		// Check all of the cases for the tiles
	}

	//
	// EVENT STUFF
	//
	function getMouse(e){
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		return mouse;
	}

	function doKeypress(e){
		// if you hit r restart the game
		if (e.keyCode == 114){
			init();
		}
		if (e.keyCode == 47){
			display_tutorial = !display_tutorial;
		}
	}

	function doMouseup(e){
		var mouse = getMouse(e);
		console.log(mouse.x + "," + mouse.y );
		if (display_tutorial == false){
			checkCollision(mouse.x,mouse.y);
		}
	}// end function doMouseup(e)
	
	function doMousedown(e){
		
	}// end function doMousedown(e)

	function doMousemove(e){
		var rect = canvas.getBoundingClientRect();
   		return {
      		x: e.clientX - rect.left,
      		y: e.clientY - rect.top
 		};
		console.log(cursorX, cursorY);
	}// end function doMousemove(e)
	

	function doMouseleave(e){
		// YOUR COOL MOUSELEAVE CODE GOES HERE
		//
		//
		//
	}// end function doMouseleave(e)



	//
	// CANVAS DRAWING CODE
	//
	function drawBoard(x,y){
		
		ctx.fillStyle = colorScheme.color2;
		ctx.fillRect(0, 0, boardSize, boardSize);

		//draw the background of the board
		ctx.strokeStyle = colorScheme.color3;
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, boardSize, boardSize);
	
		for(var i=0; i < 9; i++){
			// draw tiles 1- 9
			board[i].drawMinis(ctx);
		}

		for(var j=0; j < 9; j++){
			// draw tiles 1- 9
			board[j].drawTile(ctx);
		}
			
	}

	// drawBar()
	// * Draw the top bar with the Turn and commands
	function drawBar(){
		ctx.fillStyle = colorScheme.color3;
		ctx.font = "30px Arial";

		if (playerOneTurn == true){
			ctx.fillText("O's Turn", 10, 40);
		}
		else {
			ctx.fillText("X's Turn", 10, 40);
		}

		ctx.fillText("[R]estart", 150, 40);
		ctx.fillText("(?)Help", 280, 40);
	}


	// drawWin()
	// * Draw who won the game on top of everything
	function drawWin(mark){
		ctx.font = "50px Arial";
		if (mark == 1) {
			ctx.fillText("O's Win!", boardSize/2, boardSize/2);
			ctx.font = "10px Arial";
			ctx.fillText("Hold [R] to restart.", boardSize/2, boardSize/2 + 20);
		}
		else {
			ctx.fillText("X's Win!", boardSize/2, boardSize/2);
			ctx.font = "10px Arial";
			ctx.fillText("Hold [R] to restart.", boardSize/2, boardSize/2 + 20);
		}
	}

	// drawTutorial
	// * Draw the overlay that is the tutorial on top of the game
	function drawTutorial(x,y){
		ctx.save();
		ctx.font = "30px Arial";
		ctx.fillStyle = "white";
		ctx.globalAlpha= .9;
		ctx.fillRect(x, y, boardSize, boardSize);
		
		ctx.save();
		ctx.globalAlpha = 1;
		ctx.fillStyle = "black";
		ctx.fillText("Instructions:", x + 70, y+ 50);
		ctx.font = "22px Arial";
		ctx.fillText("Take turns placing your shape.", x + 70, y+ 100);
		ctx.fillText("Where you place inside the tile,", x + 70, y+ 140);
		ctx.fillText("determines the next place in the big game.", x + 70, y+ 160);
		ctx.fillText("If made to play on an already won tile", x + 70, y+ 200);
		ctx.fillText("the player gets to place anywhere!", x + 70, y+ 220);
		ctx.restore();

		ctx.restore();
	}

	function update(){
		requestAnimationFrame(update);

		drawBoard(boardPos.x ,boardPos.y);
		drawBar();
		if (display_tutorial == true){
			drawTutorial(boardPos.x, boardPos.y);
		}
		for(var j=0; j < 9; j++){
			var tile = board[j];
			tile.checkTileWin();
		}
		checkWin();
	}

	window.onload = init;