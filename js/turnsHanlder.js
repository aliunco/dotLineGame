function TurnHandler(){
	this.TurnContainer = document.getElementsByClassName("YourTurn")[0];
	this.Newturn = document.createElement("span");
	this.Newturn.className = "YourTurn PopAnimated";
}
TurnHandler.prototype.SetTurn = function(){
	this.AddNewTurnNum();
}
TurnHandler.prototype.ReduceTheTurn = function(){
	UserTurns--;
	this.AddNewTurnNum();
}
TurnHandler.prototype.AddNewTurnNum = function(){
	if (this.TurnContainer.getElementsByClassName("YourTurn").length > 0) {
		var prevTurn = this.TurnContainer.getElementsByClassName("YourTurn")[0];
		prevTurn.parentElement.removeChild(prevTurn);
	}
	this.Newturn.innerHTML = UserTurns;
	this.TurnContainer.appendChild(this.Newturn);
}