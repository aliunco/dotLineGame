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
function ClearThePlate(){
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
// ------------ node griding --------------
var nodePlaces = [];
for (var i = 1; i <= 10; i++) {
	nodePlaces[i] = [];
};
for (var j = 1 ; j <= 10; j++) {
	for (var i = 1; i <= 10; i++) {
		nodePlaces[i][j] = [40*i, 40 * j];
	};
};