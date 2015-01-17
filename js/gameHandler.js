function Game(){
	this.Structure = new GameStructure();
	this.ScoreSys = new ScoreHandler();
	this.TimeSys = new Timer();
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
		SuperGame.LevelSys.NextLevel();
		mouse.MouseListenersOn();
	}
}
Game.prototype.startGame = function(){
	this.LevelSys.getJson();
}
Game.prototype.FailToResetGame = function(){

}