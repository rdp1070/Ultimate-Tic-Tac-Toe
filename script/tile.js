"use strict"
// make the tile and return it yo!
function makeTile( boardSize){
	var tile;
	return tile = {

		// Static Variables
		POS: 0, // position 1-9 in the grid
		
		// Variables
		posX: 0,
		posY: 0,
		mark: -1, // false = team 1, true = team 2, -1 is no mark.
		playable: true, // wether or not a player can play here. 
		tiles : [], // if it's an outer tile, it contains 9 other tiles in an array
		size : boardSize/3, // size is dependant on wether it's inner or outer
		
		// clicked
		// * go through the mini tiles and check if the minis were clicked.
		clicked: function(x,y,team){
			for(var j=0; j < 9; j++){
				var mini = this.tiles[j];

				// check if the mouse x and y are inside a mini
				if (x > mini.posX && x < mini.posX + mini.size){
					if (y > mini.posY && y < mini.posY + mini.size){
						console.log("Mini:"+ mini.POS+" clicked.");
						if (mini.playable == true){
							console.log("Mini:"+ mini.POS+" is playable.");
							mini.clicked(team);
							return true;
						}	
						else 
							return false;
					}
				}	
			}
		},

		generateMinis: function(x, y){
			for (var i=0; i<9; i++){
				var newTile = makeMiniTile(this.size);
				newTile.POS = i;
				var vertPos = Math.floor(i/3); 
				var horzPos = i%3;
				newTile.posY = (vertPos * this.size/3) + y;
				newTile.posX = (horzPos * this.size/3) + x;
				this.tiles[i]= newTile;
			}
		},



		drawMinis: function(_ctx){
			// draw the mini boxes
			for(var j=0; j < 9; j++){
				// draw tiles 0- 8
				this.tiles[j].drawTile(_ctx);
			}
		},

		drawTile: function(_ctx){
			var ctx = _ctx;

			// draw the symbol
			ctx.save();
			if (this.mark == -1){  }
			else if (this.mark == 0){  ctx.fillStyle = "pink"; ctx.fillRect(this.posX, this.posY, this.size, this.size); }
			else if (this.mark == 1){  ctx.fillStyle = "black"; ctx.fillRect(this.posX, this.posY, this.size, this.size);}

			// draw the big black rect
			ctx.beginPath();
			ctx.strokeStyle = "black";
			ctx.lineWidth = 5;
			ctx.rect(this.posX, this.posY, this.size, this.size);
			ctx.stroke();

			// grey it out if it's unplayable
			if ( this.playable == false ) {
				ctx.globalAlpha = 0.2;
				ctx.fillStyle = "grey";
				ctx.fillRect(this.posX, this.posY, this.size, this.size);
			}

			ctx.restore();
			
		}
	}
}