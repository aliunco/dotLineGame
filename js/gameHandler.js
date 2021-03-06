function Game(){
	this.Structure = new GameStructure();
	this.ScoreSys = new ScoreHandler();
	this.LevelSys = new LevelStructure();
	this.Menu = new MenuHandler();
	this.Turn = new TurnHandler();
	SuperGame = this;
	this.GameConfig();
}
Game.prototype.GameConfig = function(){
	this.Structure.TurnPassed  = function(){
		SuperGame.Turn.ReduceTheTurn();
		if (UserTurns == 0) {
			SuperGame.Menu.OpenTheMenu();
			mouse.MouseListenersOff();
		}
	}
	this.Structure.FuncAfterLoose  = function(){
		SuperGame.Menu.OpenTheMenu();
		mouse.MouseListenersOff();
	}
	this.Structure.FuncAfterWin  = function(){
		SuperGame.ScoreSys.addScore(20);
		var changeLevel = setInterval(function(){  
			SuperGame.LevelSys.NextLevel();
			mouse.MouseListenersOn();
			clearInterval(changeLevel);
		}, 2000);
	}
}
Game.prototype.startGame = function(){
	this.LevelSys.getJson();

}
Game.prototype.FailToResetGame = function(){

}