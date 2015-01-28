function Generator(Difficulty){
	this.Difficulty = Difficulty;
	this.LevelObj = {};
	this.LevelObj.nodes = {};
	this.LevelObj.lines = [];
	this.LevelObj.Time = {};
	this.LevelObj.Turns = 1;
	if (typeof(Difficulty) == "undefined") {
		$log.error("you should declare a Difficulty in initialization");
		delete this;
		return;
	};
	SuperGenrator = this;
}
Generator.prototype.GeneratLevel = function(){
	this.RandNodeGenerator();
	this.generateLines();
	this.EstimateTime();
	this.EstimateTurns();
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
			// $log.info(this.LevelObj.nodes[KeyOfPrevNodes])
			if (KeyOfPrevNodes!= ('node' + i) && this.LevelObj.nodes[KeyOfPrevNodes].X == this.LevelObj.nodes['node' + i].X && this.LevelObj.nodes[KeyOfPrevNodes].Y == this.LevelObj.nodes['node' + i].Y) {
				i++;
			}
		}
	}
}
Generator.prototype.generateLines = function(){
	this.LevelObj.lines = [];
	var MaxLineNums = (this.Difficulty * (this.Difficulty - 1 ))/2;
	var MinLineNums = this.Difficulty - 1;
	var RandLineNum = Math.floor(Math.random() * (MaxLineNums - MinLineNums + 1)) + MinLineNums;
	function RandNodeForLine(){
		return 'node' + (Math.floor(Math.random() * SuperGenrator.Difficulty) + 0);
	}
	function AddNewLine(){
		for (var j = 0; j >= 0; j--) {
			var FirstNode = RandNodeForLine();
			var SecNode = RandNodeForLine();
			var NewLine = FirstNode + '-' + SecNode;
			var ReverseOfLine = SecNode + '-' + FirstNode;
			if (SuperGenrator.LevelObj.lines.indexOf(NewLine) != -1  || SuperGenrator.LevelObj.lines.indexOf(ReverseOfLine) != -1 || NewLine == ReverseOfLine) {
				j++;
				// $log.info(SuperGenrator.LevelObj.lines);
			}else{
				SuperGenrator.LevelObj.lines.push(NewLine);
				// $log.info("pushed");
			}
		};
	}
	for (var i = RandLineNum; i >= 1; i--) {
		AddNewLine();
		// $log.info(i);
	};
	$log.info("done");
	while(1){
		if (this.NoIsolatedNode()) {
			break;
		}else{
			AddNewLine();
		}
	}
}
Generator.prototype.NoIsolatedNode = function(){
	var result = true;
	// $log.info(this.Difficulty);
	for (var j = this.Difficulty - 1; j >= 0; j--) {
		var ResultsForThisNode = [];
		for (var i = this.LevelObj.lines.length - 1; i >= 0; i--) {
			var LineNodes = this.LevelObj.lines[i].split("-");
			if((LineNodes[0] != ("node"+j)) && (LineNodes[1] != ("node"+j))){
				ResultsForThisNode.push(0);
			}
		};
		if (ResultsForThisNode.length == this.LevelObj.lines.length) {
			// $log.info(j)
			result = false;

			break;
		};
	};
	return result;
}
Generator.prototype.EstimateTime = function(){
	this.LevelObj.Time = (this.LevelObj.lines.length * 5) + 5;
}
Generator.prototype.EstimateTurns = function(){
	var NodesLevels = [];
	for (var j = this.Difficulty - 1; j >= 0; j--) {
		var NodeLevelArr = [];
		for (var i = this.LevelObj.lines.length - 1; i >= 0; i--) {
			var LineNodes = this.LevelObj.lines[i].split("-");
			if((LineNodes[0] == ("node"+j)) || (LineNodes[1] == ("node"+j))){
				NodeLevelArr.push(0);
			}
		};
		NodesLevels.push(NodeLevelArr.length);
	}
	var OddLevels = 0;
	for (var i = NodesLevels.length - 1; i >= 0; i--) {
		if (NodesLevels[i] % 2 == 1) {
			OddLevels++;
		};
	};
	this.LevelObj.Turns = ((OddLevels == 0)?0:OddLevels/2);
}
// Generator.prototype.IsConnectedGraph = function(){
	
	// var Stashes = [];
	// for (var i = 0; i <= this.LevelObj.lines.length - 1; i++) {
	// 	Stashes[i] = [];
	// 	Stashes[i].push(this.LevelObj.lines[i].split("-"));
	// };
	// function CombineTwoStaches(StashOne, StashTwo){
	// 	Stashes.remove(StashOne);
	// 	Stashes.remove(StashTwo);
	// 	var Merged = [];
	// 	Merged[0] = StashOne[0].concat(StashTwo[0]).unique();
	// 	Stashes.push(Merged);
	// }
	// for (var i = Stashes.length - 1; i >= 0; i--) {
	// 	Stashes[i]
	// };
// }