"use strict"
// make the tile and return it yo!
function makeMiniTile( tileSize){
	var tile;
	return tile = {

		// Static Variables
		POS: 0, // position 1-9 in the grid
		
		// Variables
		posX: 0,
		posY: 0,
		mark: -1, // 0 = team 1, 1 = team 2, -1 is no mark.
		playable: true, // wether or not a player can play here. 
		size : tileSize/3, // size is dependant on wether it's inner or outer
		
		// clicked
		// * takes a team in and assigns a mark of the appropriate kind
		clicked: function(team){
			this.mark = team;
			this.playable = false;
			return this.POS;
		},		

		drawTile: function(_ctx){
			var ctx = _ctx;

			// clear
			ctx.fillStyle = "white";
			ctx.fillRect(this.posX, this.posY, this.size, this.size);

			// draw the symbole
			ctx.save();
			if (this.mark == -1){  }
			else if (this.mark == true){ 
				ctx.beginPath();
				ctx.arc(this.posX + this.size/2, this.posY +this.size/2, this.size/3, 0, 2 * Math.PI); 
				 ctx.lineWidth = 3;
				ctx.stroke();
			}
			else if (this.mark == false){  ctx.beginPath();

			    ctx.moveTo(this.posX, this.posY);
			    ctx.lineTo(this.posX + this.size, this.posY + this.size);

			    ctx.moveTo(this.posX + this.size, this.posY);
			    ctx.lineTo(this.posX, this.posY + this.size);
			    ctx.lineWidth = 3;
			    ctx.stroke();
			}

			// draw the box
			ctx.beginPath();
			ctx.strokeStyle = "grey";	
			ctx.lineWidth = 1;
			ctx.rect(this.posX, this.posY, this.size, this.size);
			ctx.stroke();

			ctx.restore();
			
		}
	}
}