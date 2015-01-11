var newLine = function(X, Y, plate){
	this.ThisLine = document.createElement('div');
	this.ThisLine.className = 'lineForLineCreator';
	this.plate = plate;
	this.startLineX = '';
	this.startLineY = '';
	this.setStartOfline(X, Y);
}
newLine.prototype.setStartOfline = function(X, Y){
	if (typeof(X) != "undefined" || typeof(Y) != "undefined") {
	    this.ThisLine.style.top = Y + "px";
		this.ThisLine.style.left = X + "px";
		this.startLineX = X;
		this.startLineY = Y;
		this.plate.appendChild(this.ThisLine);
	}else {
	    $log.error("you should define X and Y for start of the line");
	}
}
newLine.prototype.changeEndOfLine = function(X, Y){
	if (typeof(X) != "undefined" || typeof(Y) != "undefined") {
		var LineInPow = Math.pow(Math.abs(X - this.startLineX), 2) + Math.pow(Math.abs(Y - this.startLineY), 2);
		var Dist = Math.sqrt(LineInPow);
		this.ThisLine.style.width = Dist + "px";
		var angle = Math.atan2(Math.abs(Y - this.startLineY), Math.abs(X - this.startLineX));
		angle = rad2deg(angle);
		if(X < this.startLineX && Y > this.startLineY) {
			angle = 180 - angle;
		}
		if(X < this.startLineX && Y < this.startLineY){
			angle = 180 + angle;
		}
		if (X > this.startLineX && Y < this.startLineY) {
			angle = 360 - angle;
		}
		if(X == this.startLineX){
			if (Y < this.startLineY) {
				angle = 270;
			}else{
				angle = 90;
			}
		}
		if (Y == this.startLineY) {
			if (X < this.startLineX) {
				angle = 180;
			}else{
				angle = 0;
			}
		};
		this.ThisLine.style.webkitTransform = 'rotate('+angle+'deg)'; 
	    this.ThisLine.style.mozTransform    = 'rotate('+angle+'deg)'; 
	    this.ThisLine.style.msTransform     = 'rotate('+angle+'deg)'; 
	    this.ThisLine.style.oTransform      = 'rotate('+angle+'deg)'; 
	    this.ThisLine.style.transform       = 'rotate('+angle+'deg)'; 
	}else {
	    $log.error("you should define X and Y for start of the line");
	}
}
newLine.prototype.deleteLine = function(){
	this.ThisLine.parentElement.removeChild(this.ThisLine);
	delete this;
}