function NewNode(X, Y, plate, nodeName){
	this.NodeX = X;
	this.NodeY = Y;
	this.nodeName = nodeName;
	this.plate = plate;
	this.ThisNode = document.createElement("div");
	this.ThisNode.style.top = Y + "px";
	this.ThisNode.style.left = X + "px";
	this.createNode();
}
NewNode.prototype.createNode = function(){
	this.ThisNode.className = "nodeStyle";
	this.plate.appendChild(this.ThisNode);
	this.ThisNode.setAttribute("objName", this.nodeName);
	this.ThisNode.addEventListener("mouseover", this.nearToSelected);
	this.ThisNode.addEventListener("mouseout", this.NodeNotSelectedReset);
}
NewNode.prototype.NodeNotSelectedReset = function(ThisAlterNode){
	try{
		this.ThisNode.className = this.ThisNode.className.replace(' nearToBeSelected','');
	}
	catch(err){
		this.className = this.className.replace(' nearToBeSelected','');
	}
}
NewNode.prototype.resetNode = function(ThisAlterNode){
	try{
		this.ThisNode.className = this.ThisNode.className.replace(' nearToBeSelected','');
		this.ThisNode.className = this.ThisNode.className.replace(' Selected','');
	}
	catch(err){
		this.className = this.className.replace(' nearToBeSelected','');
		this.className = this.className.replace(' Selected','');
	}
}
NewNode.prototype.nearToSelected = function(ThisAlterNode){
	try{
		this.ThisNode.className += " nearToBeSelected";
	}catch(err){
		this.className += " nearToBeSelected";
	}
}
NewNode.prototype.selected = function(ThisAlterNode){
	try{
		this.ThisNode.className += " Selected";
	}catch(err){
		this.className += " Selected";
	}
}
NewNode.prototype.deleteNode = function(){
	try{
		this.ThisNode.parentElement.removeChild(this.ThisNode);
		delete this;
	}catch(err){
		this.parentElement.removeChild(this);
	}
}
NewNode.prototype.addClass = function(ThisClassName){
	this.ThisNode.className += " " + ThisClassName;
}
NewNode.prototype.removeClass = function(ThisClassName){
	this.ThisNode.className = this.ThisNode.className.replace(ThisClassName, "").trim();
}