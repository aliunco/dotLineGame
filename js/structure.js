function GameStructure(){
	mouse = new MouseListener(plate); 
	SuperStruture = this;
	var mouseclick = function(mouseClickAct){
		var target = mouseClickAct.target || mouseClickAct.srcElement;
		if(target.className.indexOf("nodeStyle") != -1){
			draginig = true;
			var nodeName = target.getAttribute("objNAme");
			var XPos = target.offsetLeft + 10;
			var YPos = target.offsetTop + 5;
			lines[nodeName] = new newLine(XPos, YPos, plate);
			eval(nodeName).selected();
			prevNode = nodeName;
			passedNodes.push(prevNode);
		}
	}
	var mousemovefunc = function(mouseMovePlace){
		if (mousedown == true && (!isEmptyObject(lines))) {
			if(SuperStruture.checkSolution() != true){
				var XPos = mouseMovePlace.pageX - plate.offsetParent.offsetLeft - 15;
				var YPos = mouseMovePlace.pageY - plate.offsetParent.offsetTop - 15;
				lines[prevNode].changeEndOfLine(XPos, YPos);
				var target = mouseMovePlace.target || mouseMovePlace.srcElement; 
				if (target.className.indexOf("nodeStyle") != -1 && target.getAttribute("objNAme") != prevNode) {
					var nodeName = target.getAttribute("objNAme");
					if ( DrewLines.indexOf((prevNode+nodeName).toString()) == -1 && DrewLines.indexOf((nodeName+prevNode).toString())== -1 ) {
						var nodeXPos = target.offsetLeft + 10;
						var nodeYPos = target.offsetTop + 5;
						lines[prevNode].changeEndOfLine(nodeXPos, nodeYPos);
						lines[prevNode+nodeName] = lines[prevNode];
						delete lines[prevNode];
						eval(nodeName).selected();
						passedNodes.push(nodeName);
						lines[nodeName] = new newLine(nodeXPos, nodeYPos, plate);
						DrewLines.push(prevNode+nodeName);
						prevNode = nodeName;
					}
				}
			}else{
				$log.error("fuck you");
				mouse.MouseListenersOff();
			}
		}
	}
	var mouseupFunc = function(mouseUpPlace){
		if (typeof(LevelJson) != "undefined" && draginig == true) {
			draginig = false;
			if (DrewLines.length == LevelJson.lines.length) {
				if (this.checkSolution) {

				}else{
					
				}
			}else{
				$log.info(lines);
				clearPrevLine();
			}
		}
	}
	mouse.addToMouseDownFunc(mouseclick);
	mouse.addToMouseMoveFunc(mousemovefunc);
	mouse.addToMouseUpFunc(mouseupFunc);
	mouse.MouseListenersOn();
}

GameStructure.prototype.checkSolution = function(){
	var MustHaveLines = LevelJson.lines;
	var resultOfSolution = true;
	for (var i = MustHaveLines.length - 1; i >= 0; i--) {
		var LineNodes = MustHaveLines[i].split("-");
		if ((DrewLines.indexOf((LineNodes[0]+LineNodes[1]).toString()) == -1) && (DrewLines.indexOf((LineNodes[1]+LineNodes[0]).toString()) == -1)) {
			resultOfSolution = false;
			break;
		}
	};
	return resultOfSolution;
}
GameStructure.prototype.StartForNewLevel = function(){
	mouse.MouseListenersOn();
}
var structure = new GameStructure(); 