function ScoreHandler(){
	this.AddingScoreContainer = document.createElement("div");
	this.ScoreContainer  = document.getElementsByClassName("scoreContainer")[0];
	this.ScoreNum  = document.getElementsByClassName("ScoreOfUSer")[0];
	this.Score = 0;
}
ScoreHandler.prototype.ResetScore = function(){
	this.Score = 0;
	this.ScoreNum.innerHTML = this.Score;
}
ScoreHandler.prototype.addScore = function(AddingAmount){
	var ScoreNumHtml = this.ScoreNum;
	var ScoreVal = this.Score;
	var Amount = AddingAmount;
	var addingAction = setInterval(function(){
		if (AddingAmount > 0) {
			AddingAmount--;
			ScoreVal += 1;
			ScoreNumHtml.innerHTML = ScoreVal;	
		}else{
			clearInterval(addingAction);
		}
	}, 30);
	this.Score += Amount;
	if (this.ScoreContainer.getElementsByClassName("addingScore").length > 0) {
		var prevAddingScore = this.ScoreContainer.getElementsByClassName("addingScore")[0];
		prevAddingScore.parentElement.removeChild(prevAddingScore);
	}
	var newAddingScore = document.createElement("div");
	newAddingScore.className = "addingScore moveUpAnimate";
	newAddingScore.innerHTML = "+"+AddingAmount;
	this.ScoreContainer.appendChild(newAddingScore);
}
ScoreHandler.prototype.reduceScore = function(ReducingAmount){
	this.Score -=ReducingAmount;
	this.ScoreNum.innerHTML = this.Score;
	if (this.ScoreContainer.getElementsByClassName("reducingScore").length > 0) {
		var prevAddingScore = this.ScoreContainer.getElementsByClassName("reducingScore")[0];
		prevAddingScore.parentElement.removeChild(prevAddingScore);
	}
	var newAddingScore = document.createElement("div");
	newAddingScore.className = "reducingScore moveUpAnimate";
	newAddingScore.innerHTML = "-"+ReducingAmount;
	this.ScoreContainer.appendChild(newAddingScore);
}