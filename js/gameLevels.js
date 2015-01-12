// node1 = new NewNode(nodePlaces[2][2][0], nodePlaces[2][2][1], plate, "node1");
function LevelStructure(){
	this.currentNodes = levelDefault;
	this.levesAdress = "json/"
	LevelSuper = this;
}
LevelStructure.prototype.getJson = function(){
	var ImportingJson = function(data){
		LevelJson = data;
		LevelSuper.ImportNodesInPlate();
	}
	loadJSON(this.levesAdress + 'level' + this.currentNodes + '.json', ImportingJson);
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