function GameStructure(){
	mouse = new MouseListener(plate); 
	this.FuncAfterWin = "";
	this.FuncAfterLoose = "";
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
		if (mousedown == true && (!isEmptyObject(lines)) && (typeof(lines[prevNode]) != "undefined")) {
			if(SuperStruture.checkSolution() != true){
				if (!SuperStruture.isFail()) {
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
					if (typeof(SuperStruture.FuncAfterLoose) != "undefined" && typeof(SuperStruture.FuncAfterLoose) == "function") {
						SuperStruture.FuncAfterLoose();
					}
					mouse.MouseListenersOff();
				}				
			}else{
				SuperStruture.ShineTheSolution();
				mouse.MouseListenersOff();
				if (typeof(SuperStruture.FuncAfterWin) != "undefined" && typeof(SuperStruture.FuncAfterWin) == "function") {
					SuperStruture.FuncAfterWin();
				}
			}
		}
	}
	var mouseupFunc = function(mouseUpPlace){
		if (typeof(LevelJson) != "undefined" && draginig == true) {
			draginig = false;
			if (!SuperStruture.checkSolution()) {
				clearPrevLine();
			}
			for (var i = passedNodes.length - 1; i >= 0; i--) {
				var thisNodeIsIncluded = false;
				for (var j = DrewLines.length - 1; j >= 0; j--) {
					if(DrewLines[j].indexOf(passedNodes[i]) > -1){
						thisNodeIsIncluded = true;
					}
				}
				if (thisNodeIsIncluded == false) {
					window[passedNodes[i]].resetNode();
					passedNodes.remove(passedNodes[i]);
				};
			};
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
	if (DrewLines.length == LevelJson.lines.length) {
		for (var i = MustHaveLines.length - 1; i >= 0; i--) {
			var LineNodes = MustHaveLines[i].split("-");
			if ((DrewLines.indexOf((LineNodes[0]+LineNodes[1]).toString()) == -1) && (DrewLines.indexOf((LineNodes[1]+LineNodes[0]).toString()) == -1)) {
				resultOfSolution = false;
				break;
			}
		};
	}else{
		resultOfSolution = false;
	}
	return resultOfSolution;
}
GameStructure.prototype.isFail = function(){
	var result = false;
	if (DrewLines.length >= LevelJson.lines.length && (!this.checkSolution())) {
		result = true;
	}
	return result;
}
GameStructure.prototype.ShineTheSolution = function(){
	DrewLines
	for (var i = DrewLines.length - 1; i >= 0; i--) {
		lines[DrewLines[i]].addClass('GoldBackGround');
	};
	for (var i = passedNodes.length - 1; i >= 0; i--) {
		window[passedNodes[i]].addClass('GoldBackGround');
	};
}
GameStructure.prototype.StartForNewLevel = function(){
	mouse.MouseListenersOn();
}
var structure = new GameStructure(); 