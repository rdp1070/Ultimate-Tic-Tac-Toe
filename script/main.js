	"use strict";

	// global variables
	var canvas,ctx, turn=0, board = [];
	var cursorX;
	var cursorY;
	var boardSize = 500;
	var rectSize = boardSize/9;
	var teamTurn = false;

	/* init() is called when the page loads */
	function init(){
		canvas = document.querySelector("#canvas");
		ctx = canvas.getContext("2d");
		canvas.addEventListener("mousedown", doMousedown);
		canvas.addEventListener("mousemove", doMousemove);
		canvas.addEventListener("mouseup", doMouseup);
		canvas.addEventListener("mouseleave", doMouseleave);
		for (var i=0; i<9; i++){
			// make the new Tile
			var newTile = makeTile(this.boardSize);
			newTile.POS = i;
			var vertPos = Math.floor(i/3); 
			var horzPos = i%3;
			newTile.posY = vertPos * boardSize/3;
			newTile.posX = horzPos * boardSize/3;
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
			//Reset the array that controls the 	
		};
		
		/* board */
		drawBoard(1, 1);
		/* other UI elements */


		 
	} // end function setupUI
	
	function checkCollision(x,y){
		for(var j=0; j < 9; j++){
			var tile = board[j];

			// check if the mouse x and y are inside a tile
			if (x > tile.posX && x < tile.posX + tile.size){
				if (y > tile.posY && y < tile.posY + tile.size){
					console.log("Tile: " + tile.POS + " clicked.");
					if (tile.clicked(x,y, teamTurn) == true){
						teamTurn = !teamTurn;
					};
					
				}
			}	
		}
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
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, boardSize, boardSize);
	
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
			ctx.fillText("Player One's Turn", 10, 50);
		else
			ctx.fillText("Player One's Turn", 10, 50);
	}


	function update(){
		requestAnimationFrame(update);

		drawBoard(1,1);
	}

	window.onload = init;