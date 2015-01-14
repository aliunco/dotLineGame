function LevelStructure(){
	this.currentLevel = levelDefault;
	this.LoadLastSave();
	this.levesAdress = "json/"
	LevelSuper = this;
}
LevelStructure.prototype.getJson = function(){
	var ImportingJson = function(data){
		LevelJson = data;
		LevelSuper.ImportNodesInPlate();
	}
	loadJSON(this.levesAdress + 'level' + this.currentLevel + '.json', ImportingJson);
	this.SaveTheGame();
}
LevelStructure.prototype.ImportNodesInPlate = function(){
	for(var Thisnode in LevelJson.nodes){
		window[Thisnode] = new NewNode(nodePlaces[LevelJson.nodes[Thisnode].X][LevelJson.nodes[Thisnode].Y][0], nodePlaces[LevelJson.nodes[Thisnode].X][LevelJson.nodes[Thisnode].Y][1], plate, Thisnode);
	}
}
LevelStructure.prototype.ClearNodes = function(){
	for (var Thisnode in LevelJson.nodes) {
		window[Thisnode].deleteNode();
	}
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
LevelStructure.prototype.NextLevel = function(){
	this.currentLevel++;
	this.getJson();
}