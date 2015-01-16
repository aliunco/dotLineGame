function Game(){
	this.Structure = new GameStructure();
	this.ScoreSys = new ScoreHandler();
	this.TimeSys = new Timer();
	this.LevelSys = new LevelStructure();
	this.Menu = new MenuHandler();
	this.Turn = new TurnHandler();
	SuperGame = this;
}
Game.prototype.startGame = function(){
	this.LevelSys.getJson();
}