function GameStructure(){
	var mouse = new MouseListener(plate);

	node1 = new NewNode(nodePlaces[2][2][0], nodePlaces[2][2][1], plate, "node1");
	node2 = new NewNode(nodePlaces[8][8][0], nodePlaces[8][8][1], plate, "node2");
	node3 = new NewNode(nodePlaces[2][7][0], nodePlaces[2][7][1], plate, "node3");
	node4 = new NewNode(nodePlaces[5][9][0], nodePlaces[5][9][1], plate, "node4");

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
			prevLinesName.push(prevNode);
		}
	}
	var mousemovefunc = function(mouseMovePlace){
		if (mousedown == true && (!isEmptyObject(lines))) {
			var XPos = mouseMovePlace.pageX - plate.offsetParent.offsetLeft - 15;
			var YPos = mouseMovePlace.pageY - plate.offsetParent.offsetTop - 15;
			lines[prevLinesName[prevLinesName.length - 1]].changeEndOfLine(XPos, YPos);
			var target = mouseMovePlace.target || mouseMovePlace.srcElement; 
			if (target.className.indexOf("nodeStyle") != -1 && target.getAttribute("objNAme") != prevNode) {
				var nodeName = target.getAttribute("objNAme");
				if ( prevLinesName.indexOf((prevNode+nodeName).toString()) == -1 && prevLinesName.indexOf((nodeName+prevNode).toString())== -1 ) {
					var nodeXPos = target.offsetLeft + 10;
					var nodeYPos = target.offsetTop + 5;
					lines[prevLinesName[prevLinesName.length - 1]].changeEndOfLine(nodeXPos, nodeYPos);
					eval(nodeName).selected();
					passedNodes.push(nodeName);
					lines[prevNode+nodeName] = new newLine(nodeXPos, nodeYPos, plate);
					prevLinesName.push(prevNode+nodeName);
					prevNode = nodeName;
				}
			}
		};
	}
	var mouseupFunc = function(mouseUpPlace){
		ClearThePlate();
	}
	mouse.addToMouseDownFunc(mouseclick);
	mouse.addToMouseMoveFunc(mousemovefunc);
	mouse.addToMouseUpFunc(mouseupFunc);
	mouse.MouseListenersOn();
}
var structure = new GameStructure(); 