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
	passedNodes = [];	
	DrewLines = [];
}
function clearPrevLine(){
	if (typeof(lines) != "undefined") {
		lines[Object.keys(lines)[Object.keys(lines).length - 1]].deleteLine();
		delete lines[Object.keys(lines)[Object.keys(lines).length - 1]];
	}
}
// ------------ node griding --------------
var nodePlaces = [];
for (var i = 1; i <= 10; i++) {
	nodePlaces[i] = [];
};
for (var j = 1 ; j <= 10; j++) {
	for (var i = 1; i <= 10; i++) {
		nodePlaces[i][j] = [45*i, 40 * j];
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
// --------------- erase cookie -------------------
function EraseCookie(CookieName) {
    document.cookie = CookieName + "=; expires=Thu, 18 Dec 1 12:00:00 UTC"
}
// ---------------------- load cookie ------------------------
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return null;
}
// ------------------ save cookie ---------------------------
function setCookie(cname, cvalue, exdays) {
    document.cookie = cname + "=" + cvalue + "; expires=" + exdays + ';';
}
// ------------------ remove item in array ---------------
Object.defineProperty(Array.prototype, "remove", {
    enumerable: false,
    value: function (item) {
        var removeCounter = 0;

        for (var index = 0; index < this.length; index++) {
            if (this[index] === item) {
                this.splice(index, 1);
                removeCounter++;
                index--;
            }
        }
        return removeCounter;
    }
});
// ------------------ de duplicate in array objects -------------
// Array.prototype.unique = function() {
//     var a = this.concat();
//     for(var i=0; i<a.length; ++i) {
//         for(var j=i+1; j<a.length; ++j) {
//             if(a[i] === a[j])
//                 a.splice(j--, 1);
//         }
//     }
//     return a;
// };
function CheckHasSameValues(ArrayOne, ArrayTwo){
    var TempArr = ArrayOne.concat(ArrayTwo);
    return TempArr.HasDuplicate()
}
// --------------- check if an array has duplicated value ------------
// Array.prototype.HasDuplicate = function() {
//     var a = this.concat();
//     var result = false;
//     for(var i=0; i<a.length; ++i) {
//         for(var j=i+1; j<a.length; ++j) {
//             if(a[i] === a[j]){
//                 result = true;
//             }
//         }
//     }
//     return result;
// };
// -------------- check file existance of file ----------------
function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}