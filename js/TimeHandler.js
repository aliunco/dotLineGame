function Timer(InitHSTime){
	this.InitHSecs = InitHSTime;
	this.returnMin = "";
	this.returnSec = "";
	this.returnHSec = "";
	this.ActionOnEndTime = "";
	this.MinContainer = document.getElementsByClassName("Min")[0];
	this.SecContainer = document.getElementsByClassName("Sec")[0];
	this.HSecContainer = document.getElementsByClassName('HSec')[0];
	SuperTimer = this;
    this.counter;
}
Timer.prototype.count = function(){
    this.counter = setInterval(function(){
        if (SuperTimer.InitHSecs <= 0)
        {
        	if (typeof(this.ActionOnEndTime) != "undefined" && typeof(this.ActionOnEndTime) == "function") {
        		this.ActionOnEndTime();
        	};
            clearInterval(SuperTimer.counter);
            return;
        }
        SuperTimer.InitHSecs--;
        SuperTimer.returnHSec = (SuperTimer.InitHSecs%100);
        SuperTimer.returnMin = Math.floor((Math.floor(SuperTimer.InitHSecs/100))/60);
        SuperTimer.returnSec = Math.floor(SuperTimer.InitHSecs/100);
        if (SuperTimer.returnMin < 10) {
        	SuperTimer.MinContainer.innerHTML = "0"+SuperTimer.returnMin;
        }else{
        	SuperTimer.MinContainer.innerHTML = SuperTimer.returnMin;
        }
        if (SuperTimer.returnSec < 10) {
        	SuperTimer.SecContainer.innerHTML = "0"+SuperTimer.returnSec;
        }else{
        	SuperTimer.SecContainer.innerHTML = SuperTimer.returnSec;
        }
        if (SuperTimer.returnHSec < 10) {
        	SuperTimer.HSecContainer.innerHTML = "0"+SuperTimer.returnHSec;
        }else{
        	SuperTimer.HSecContainer.innerHTML = SuperTimer.returnHSec;
        }
    }, 10);
}
Timer.prototype.StopTheTimer = function(){
    clearInterval(SuperTimer.counter);
}