function LevelStructure(){
	this.currentLevel = levelDefault;
	this.LoadLastSave();
	this.levesAdress = "json/"
	LevelSuper = this;
}
LevelStructure.prototype.getJson = function(){
	var ImportingJson = function(data){
		LevelJson = data;
		UserTurns = LevelJson.Turns;
		LevelSuper.ImportNodesInPlate();
		LevelSuper.ImportingPreviewLines();
		LevelSuper.SaveTheGame();
		LevelSuper.SetTurns();
		LevelsTime = LevelJson.Time.M * 6000 + LevelJson.Time.S * 100 + LevelJson.Time.HS;
	}
	if (UrlExists(this.levesAdress + 'level' + this.currentLevel + '.json')) {
		loadJSON(this.levesAdress + 'level' + this.currentLevel + '.json', ImportingJson);
	}else{
		var LevelGenerate = new Generator(this.currentLevel);
		LevelGenerate.GeneratLevel();
		var CheckLive = setInterval(function(){
			if (LevelGenerate.InProgress == false) {
				clearInterval(CheckLive);
				ImportingJson(LevelGenerate.LevelObj);
			};
		},200)
	}
}
LevelStructure.prototype.ImportNodesInPlate = function(){
	for(var Thisnode in LevelJson.nodes){
		window[Thisnode] = new NewNode(nodePlaces[LevelJson.nodes[Thisnode].X][LevelJson.nodes[Thisnode].Y][0], nodePlaces[LevelJson.nodes[Thisnode].X][LevelJson.nodes[Thisnode].Y][1], plate, Thisnode);
	}
}
LevelStructure.prototype.SetTurns = function(){
	ThisUserTurns = new TurnHandler();
	ThisUserTurns.SetTurn();
}
LevelStructure.prototype.ClearNodes = function(){
	for (var Thisnode in LevelJson.nodes) {
		window[Thisnode].deleteNode();
		delete window[Thisnode];
	}
}
LevelStructure.prototype.ClearLines = function(){
	for (var ThisLine in lines) {
		$log.info(lines[ThisLine])

		lines[ThisLine].deleteLine();
		delete lines[ThisLine];
	};
}
LevelStructure.prototype.ImportingPreviewLines = function(){
	for (var i = LevelJson.lines.length - 1; i >= 0; i--) {
		var StartNode = LevelJson.lines[i].split("-")[0];
		var EndNode = LevelJson.lines[i].split("-")[1];
		var ThisSampleLine = new newLine(window[StartNode].NodeX + 10, window[StartNode].NodeY + 5, plate);
		ThisSampleLine.changeEndOfLine(window[EndNode].NodeX + 10, window[EndNode].NodeY + 5, plate);
		ThisSampleLine.addClass("PreviewLines");
	};
}
LevelStructure.prototype.LoadLastSave = function(){
	if ( typeof(parseInt(getCookie("levelMap"))) == "number" && getCookie("levelMap") ) {
		this.currentLevel = parseInt(getCookie("levelMap"));
	}else{	
		EraseCookie("levelMap");
		this.currentLevel = 1;
	}
}
LevelStructure.prototype.SaveTheGame = function(){
	setCookie("levelMap", this.currentLevel, new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 30 * 6));
}
LevelStructure.prototype.LevelClearance = function(){
	this.ClearNodes();
	this.ClearLines();
	passedNodes = [];
	DrewLines = [];
	for (var i = document.getElementsByClassName("PreviewLines").length - 1; i >= 0; i--) {
		document.getElementsByClassName("PreviewLines")[i].parentElement.removeChild(document.getElementsByClassName("PreviewLines")[i]);
	}
}
LevelStructure.prototype.ResetLevel = function(){
	this.LevelClearance();
	this.getJson();
}
LevelStructure.prototype.NextLevel = function(){
	this.currentLevel++;
	this.LevelClearance();
	this.getJson();
}