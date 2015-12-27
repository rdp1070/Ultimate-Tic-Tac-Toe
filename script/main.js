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

	/* init() is called when the page loads */
	function init(){
		canvas = document.querySelector("#canvas");
		ctx = canvas.getContext("2d");
		canvas.addEventListener("mousedown", doMousedown);
		canvas.addEventListener("mousemove", doMousemove);
		canvas.addEventListener("mouseup", doMouseup);
		canvas.addEventListener("mouseleave", doMouseleave);
		canvas.height = boardSize + boardPos.y;
		canvas.width = boardSize + boardPos.x;

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
		if (board[index].mark != -1){
			for (var i = 0; i < 9; i++) {
				if (board[i].mark == -1){
					board[i].playable = true;
				}
			};
		}
		else {
			for (var i = 0; i < 9; i++) {
				if (i != index){
					board[i].playable = false;	
				} else {
					board[i].playable = true;
				}
			};
		}
	}

	// checkWin()
	// * check all the tiles in the board to see if the player wins the game.
	function checkWin(){

		// Make sure all the tiles in the win sequence are the same
		// and make sure that they aren't blank
		// The win states are 
		// 036 012 048 
		if (board[0].mark == board[3].mark && board[3].mark== board[6].mark && board[6].mark != -1){
			console.log("WIN!")
		}
		else if (board[0].mark == board[1].mark && board[1].mark== board[2].mark && board[2].mark != -1){
			console.log("WIN!")
		}
		else if (board[0].mark == board[4].mark && board[4].mark== board[8].mark && board[8].mark != -1){
			console.log("WIN!")
		}
		// 147
		else if (board[1].mark == board[4].mark && board[4].mark== board[7].mark && board[7].mark != -1){
			console.log("WIN!")
		} 
		// 246 258 
		else if (board[2].mark == board[4].mark && board[4].mark== board[6].mark && board[6].mark != -1){
			console.log("WIN!")
		}
		else if (board[2].mark == board[5].mark && board[5].mark== board[8].mark && board[8].mark != -1){
			console.log("WIN!")
		}
		// 345
		else if (board[3].mark == board[4].mark && board[4].mark== board[5].mark && board[5].mark != -1){
			console.log("WIN!")
		}
		// 678
		else if (board[6].mark == board[7].mark && board[7].mark== board[8].mark && board[8].mark != -1){
			console.log("WIN!")
		}
		// Check all of the cases for the tiles
	}

	//
	// MOUSE STUFF
	//
	function getMouse(e){
		var mouse = {}
		mouse.x = e.pageX - e.target.offsetLeft;
		mouse.y = e.pageY - e.target.offsetTop;
		return mouse;
	}

	function doMouseup(e){
			var mouse = getMouse(e);
			console.log(mouse.x + "," + mouse.y );
			checkCollision(mouse.x,mouse.y);
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
		
		//draw the background of the board
		ctx.strokeStyle = "black";
		ctx.fillStyle = "pink";
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

	function drawTurn(){
		ctx.fillStyle = "black";
		ctx.font = "30px Arial";

		if (playerOneTurn == true)	
			ctx.fillText("O's Turn", 10, 50);
		else
			ctx.fillText("X's Turn", 10, 50);
	}


	function update(){
		requestAnimationFrame(update);

		drawBoard();
		drawTurn();

		for(var j=0; j < 9; j++){
			var tile = board[j];
			tile.checkTileWin();
		}
		checkWin();
	}

	window.onload = init;