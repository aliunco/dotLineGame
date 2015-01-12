// ------------ convert radian to degree -------
function rad2deg(angle) {
  return angle * 57.29577951308232; // angle / Math.PI * 180
}
// ------------- check whether the obj is empty or not ---------
function isEmptyObject(obj) {
  for(var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}
// ---------------- reset the plate but not clearing the nodes of currect level ----------
function ResetLevelsPlate(){
	for (var lineKey in lines) {
		lines[lineKey].deleteLine();
		delete lines[lineKey];
	};
	for (var nodesKey in passedNodes) {
		eval(passedNodes[nodesKey]).resetNode();	
	};
	prevLinesName = [];
	passedNodes = [];	
}
function ClearThePlate(){
	ResetLevelsPlate();
	
}
// ------------ node griding --------------
var nodePlaces = [];
for (var i = 1; i <= 10; i++) {
	nodePlaces[i] = [];
};
for (var j = 1 ; j <= 10; j++) {
	for (var i = 1; i <= 10; i++) {
		nodePlaces[i][j] = [40*i, 40 * j];
	};
}
// ------------- Load Json file for level structures --------------
function loadJSON(url, callback) {   
    var xobj = new XMLHttpRequest();
	xobj.overrideMimeType("application/json");
	xobj.open('GET', url, true);
	xobj.setRequestHeader("Cache-Control", "no-cache");
	xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            callback(JSON.parse(xobj.responseText));
          }
    };
    xobj.send(null);  
}