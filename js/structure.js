function GameStructure(){
	var mouse = new MouseListener(plate);

	node1 = new NewNode(nodePlaces[2][2][0], nodePlaces[2][2][1], plate, "node1");
	node2 = new NewNode(nodePlaces[8][8][0], nodePlaces[8][8][1], plate, "node2");

	var mouseclick = function(mouseClickAct){
		var target = mouseClickAct.target || mouseClickAct.srcElement;
		if(target.className.indexOf("nodeStyle") != -1){
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
			var Xpos = mouseMovePlace.pageX - plate.offsetParent.offsetLeft - 15;
			var YPos = mouseMovePlace.pageY - plate.offsetParent.offsetTop - 15;
			lines[prevNode].changeEndOfLine(Xpos, YPos);
			var target = mouseMovePlace.target || mouseMovePlace.srcElement; 
			if (target.className.indexOf("nodeStyle") != -1 && target.getAttribute("objNAme") != prevNode && (passedNodes.indexOf(target.getAttribute("objNAme")) == -1) ) {
				var nodeName = target.getAttribute("objNAme");
				var nodeXPos = target.offsetLeft + 10;
				var nodeYPos = target.offsetTop + 5;
				lines[nodeName] = new newLine(nodeXPos, nodeYPos, plate);
				lines[prevNode].changeEndOfLine(nodeXPos, nodeYPos);
				prevNode = nodeName;
				eval(nodeName).selected();
				passedNodes.push(prevNode);	
			};
		};
	}
	var mouseupFunc = function(mouseUpPlace){
		for (var lineKey in lines) {
			eval(lineKey).resetNode();
			lines[lineKey].deleteLine();
			delete lines[lineKey];
		};
		passedNodes = [];
	}
	mouse.addToMouseDownFunc(mouseclick);
	mouse.addToMouseMoveFunc(mousemovefunc);
	mouse.addToMouseUpFunc(mouseupFunc);
	mouse.MouseListenersOn();
}
var structure = new GameStructure();