function MouseListener(elem, mouseDownFun, mouseUpFun, mouseMoveFun){
	this.MouseXPos = "";
	this.MouseYPos = "";
	this.MousePushed = false;
	this.elem = elem;
	Super = this;
	this.MouseFuncs = {
		"mousedown": mouseDownFun,
		"mouseup": mouseUpFun,
		"mousemove": mouseMoveFun
	}
	if (typeof(this.elem) == 'undefined') {
		$log.error("you've not defined any object for mouse listening");
	};
}
MouseListener.prototype.MouseListenersOn = function(){
	for (var FuncKey in this.MouseFuncs) {
		if (typeof(this.MouseFuncs[FuncKey]) != 'undefined' && typeof(this.MouseFuncs[FuncKey]) == "function" && FuncKey != "mouseups") {
			this.elem.addEventListener(FuncKey, this.MouseFuncs[FuncKey]);
		}
	}
	document.addEventListener("mouseup", this.MouseFuncs['mouseup']);
}
MouseListener.prototype.MouseListenersOff = function(){
	for (var FuncKey in this.MouseFuncs) {
		if (typeof(this.MouseFuncs[FuncKey]) != 'undefined' && typeof(this.MouseFuncs[FuncKey]) == "function" && FuncKey != "mouseups") {
			this.elem.removeEventListener(FuncKey, this.MouseFuncs[FuncKey]);
		}
	}
	document.removeEventListener("mouseup", this.MouseFuncs['mouseup']);
}
MouseListener.prototype.MouseListenersRestart = function(){
	this.MouseListenersOff();
	this.MouseListenersOn();
	mousedown = false;
}
MouseListener.prototype.addToMouseDownFunc = function(NewFunc){
	this.MouseFuncs['mousedown'] = function(mouseObj){
		$log.info("Mouse starts!");
		Super.MousePushed = true;
		// $log.info(mouseObj);
		mousedown = true;
		if (typeof(NewFunc) != "undefined" && typeof(NewFunc) == "function") {
			NewFunc(mouseObj);	
		};		
	}
}
MouseListener.prototype.addToMouseUpFunc = function(NewFunc){
	this.MouseFuncs['mouseup'] = function(mouseObj){
		if (Super.MousePushed == true) {
			$log.info("Mouse stops!");
			mousedown = false;
			Super.MousePushed = false;
		};
		if (typeof(NewFunc) != "undefined" && typeof(NewFunc) == "function") {
			NewFunc(mouseObj);	
		};	
	}
}
MouseListener.prototype.addToMouseMoveFunc = function(NewFunc){
	this.MouseFuncs['mousemove'] = function(mouseObj){
		Super.MouseXPos = mouseObj.clientX;
		Super.MouseYPos = mouseObj.clientY;
		if (typeof(NewFunc) != "undefined" && typeof(NewFunc) == "function") {
			NewFunc(mouseObj);	
		};
	}
}