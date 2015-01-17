function MenuHandler(){
	this.MenuContainer = document.getElementsByClassName("MenuContainer")[0];
	this.MenuOpenedOrNot = false;
	SuperMenu = this;
	document.addEventListener("keydown", function (event) {
		if (event.which == 27) {
			if (!SuperMenu.MenuOpenedOrNot) {
				SuperMenu.MenuOpenedOrNot = true;
				SuperMenu.OpenTheMenu();
			}else{
				SuperMenu.MenuOpenedOrNot = false;
				SuperMenu.CloseTheMenu();
			}
		}
	});
}
MenuHandler.prototype.OpenTheMenu = function(){
	this.MenuContainer.style.display = "block";
}
MenuHandler.prototype.CloseTheMenu = function(){
	this.MenuContainer.style.display = "none";
}
MenuHandler.prototype.MenuMessage = function(){
	
}