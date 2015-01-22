function Generator(Difficulty){
	this.Difficulty = Difficulty;
	this.LevelObj = {};
	this.LevelObj.nodes = {};
	this.LevelObj.lines = {};
	this.LevelObj.Time = {};
	this.LevelObj.Turns = 1;
	if (typeof(Difficulty) == "undefined") {
		$log.error("you should declare a Difficulty in initialization");
		delete this;
		return;
	};
}
Generator.prototype.RandNodeGenerator = function(){
	var DiffPrecent = this.Difficulty;
	if (DiffPrecent < 3) {
		DiffPrecent = 3;
	}
	for (var i = DiffPrecent; i >= 1; i--) {
		this.LevelObj.nodes['node' + i] = {};
		this.LevelObj.nodes['node' + i].X = Math.floor(Math.random() * 10) + 1;
		this.LevelObj.nodes['node' + i].Y = Math.floor(Math.random() * 10) + 1;
		for (var KeyOfPrevNodes in this.LevelObj.nodes) {
			$log.info(this.LevelObj.nodes[KeyOfPrevNodes])
			if (KeyOfPrevNodes!= ('node' + i) && this.LevelObj.nodes[KeyOfPrevNodes].X == this.LevelObj.nodes['node' + i].X && this.LevelObj.nodes[KeyOfPrevNodes].Y == this.LevelObj.nodes['node' + i].Y) {
				i++;
			}
		};
	};
}