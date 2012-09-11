//graphRender(String (type of graph: logGraph, dotPattern),new Array(arrays containing results to graph),String (title of graph),String (id of div do render graph to));
//graphRender(String (type of graph: logGraph, dotPattern),String (arrays containing results to graph),String (title of graph),String (id of div do render graph to));
//ues first method for logGraph and second for dotPattern graph
//logGraph = logarithmic time graph
//dotPattern = graph comparing average time for each
var frameToDrawTo = "canvas";
var genericLength = length; //pulled from experiments.js . Define as integer to remove experiments.js from requirements for this page.
//console.log(genericLength);
var logGraphBArr = new Array(3);
for ( i = 0; i < logGraphBArr.length; i++) {
	logGraphBArr[i] = new Array();
}

var logGraphRArr = new Array(3);
for ( i = 0; i < logGraphRArr.length; i++) {
	logGraphRArr[i] = new Array();
}

var logResults = new Array(2);
for ( i = 0; i < logResults.length; i++) {
	logResults[i] = new Array();
}


var equiVariArr = new Array(4);
for ( i = 0; i < equiVariArr.length; i++) {
	equiVariArr[i] = new Array();
}

var equiVariResults = new Array(4);
for ( i = 0; i < equiVariResults.length; i++) {
	equiVariResults[i] = new Array();
}

var diffDistArr = new Array(3);
for ( i = 0; i < diffDistArr.length; i++) {
	diffDistArr[i] = new Array();
}
var diffDistResults = new Array(3);
for ( i = 0; i < diffDistResults.length; i++) {
	diffDistResults[i] = new Array();
}

var equaLongArr = new Array(3);
for ( i = 0; i < equaLongArr.length; i++) {
	equaLongArr[i] = new Array();
}

var equaLongResults = new Array(3);
for ( i = 0; i < equaLongResults.length; i++) {
	equaLongResults[i] = new Array();
}

//"logGraphBArr","logGraphRArr","equiVariArr","diffDistArr","equaLongArr"
//equiVari is a 4 * quantity of input array
//(or however many different types of ball and distance you're rendering for each experiment)
//rest are 3 * quanity of input
//refresh window every second by re-calling the graph render.

var logChart;
var verticalChart;
var undrawn = true;

$(document).ready(function() {
	logDat('canvas','logGraph', new Array('Distance versus time for two inputs', 'Distance from point / Ball width (px)', 'Time taken (ms)', new Array(new Array('Device One', '#0000FF', 'logResults[0]'), new Array('Device Two', '#FF0000', 'logResults[1]'))));
});

//-----------------------------------------TEST SECTION-----------------------------------------------

//-----------------------------------------GRAPH CODE-------------------------------------------------
function barChart(title, array, nameArray, drawDestination) {
	var drawer = drawDestination;
	if (drawDestination == null || drawDestination == "") {
		drawer = frameToDrawTo;
	}
	var arr = eval(array);
	var namen = eval(nameArray);
	var titleString = title;
	//equiVari diffDist equaLong
	var nameOfArray;
	var resultsArr;
	arr = getAverage(arr);
	//getAverage takes an array argument with x subarrays containing numbers, and returns an array with x numbers
	////console.log(array);
	if (nameArray == null || nameArray.length == 0) {
		if (array == "equiVariArr") {
			nameOfArray = ['Big Blue', 'Medium Green', 'Big Red', 'Small Yellow'];
		}

		if (array == "diffDistArr") {
			nameOfArray = ['Medium Blue', 'Medium Green', 'Medium Red'];
		}

		if (array == "equaLongArr") {
			nameOfArray = ['Small Blue', 'Medium Green', 'Big Red'];
		}
	} else {
		nameOfArray = namen;
	}

	////console.log(arr);
	$(function() {
		$(document).ready(function() {

			verticalChart = new Highcharts.Chart({
				chart : {
					renderTo : drawer,
					type : 'bar'
				},
				title : {
					text : titleString
				},

				xAxis : {
					categories : nameOfArray,
					title : {
						text : null
					}
				},
				legend : {
					enabled : false
				},
				yAxis : {
					min : 0,
					title : {
						text : 'average Time taken to press button (ms)',
						align : 'high'
					},
					labels : {
						overflow : 'justify'
					}
				},
				tooltip : {
					formatter : function() {
						return '' + this.y + ' ms';
					}
				},
				plotOptions : {
					bar : {
						dataLabels : {
							enabled : true
						}
					}
				},
				credits : {
					enabled : false
				},
				series : [{
					data : arr
				}]
			});
		});
	});
}

//----LOG GRAPHING----

function logDat(drawDestination,type, params) {
	document.getElementById(drawDestination).setAttribute("type", type);
	var title = params[0];
	var xTitle = params[1];
	var yTitle = params[2];
	var stringedSeries = '[';
	for ( i = 0; i < params[3].length; i++) {
		//name, color, data.
		stringedSeries += "{name: '" + params[3][i][0] + "', ";
		stringedSeries += "color: '" + params[3][i][1] + "', ";
		stringedSeries += "data: " + params[3][i][2] + "} ";
		//console.log(eval(params[3][i]));
		if (i < params[3].length - 1) {
			stringedSeries += ",";
		}
	}
	
	stringedSeries += "]";
	//console.log(stringedSeries);
	var toll = eval(stringedSeries);
	var reDraw = drawDestination;
	$(function() {
		$(document).ready(function() {
			logChart = new Highcharts.Chart({
				chart : {
					renderTo : drawDestination,
					type : 'scatter',
					zoomType : 'xy'
				},
				title : {
					text : title
				},
				subtitle : {
					text : ''
				},
				xAxis : {
					title : {
						enabled : true,
						text : xTitle
					},
					startOnTick : true,
					endOnTick : true,
					showLastLabel : true
				},
				yAxis : {
					title : {
						text : yTitle
					},
					max : 2000
				},
				tooltip : {
					formatter : function() {
						return '' + this.x + ' px, ' + this.y + ' ms';
					}
				},
				legend : {
					layout : 'vertical',
					align : 'right',
					verticalAlign : 'top',
					x : 0,
					y : 0,
					floating : true,
					backgroundColor : '#FFFFFF',
					borderWidth : 1
				},
				plotOptions : {
					scatter : {
						animation : false,
						marker : {
							radius : 5,
							states : {
								hover : {
									enabled : true,
									lineColor : 'rgb(100,100,100)'
								}
							}
						},
						states : {
							hover : {
								marker : {
									enabled : false
								}
							}
						}
					}
				},
				series : toll
			});
		});

	});
}

//-----------------------------------------GRAPHING---------------------------------------------------
function getAverage(array) {
	var tempArr = eval(array);
	var resultsArr = new Array(tempArr.length);

	for (var i = 0; i < tempArr.length; i++) {
		var average = 0;
		for (var j = 0; j < tempArr[i].length; j++) {
			average += parseInt(tempArr[i][j]);
		}
		if (isNaN(parseFloat(Math.floor(average / tempArr[i].length)))) {
			resultsArr[i] = 0;
		} else {
			resultsArr[i] = Math.floor(average / tempArr[i].length);
		}
	}
	return (resultsArr);
}

function graphRender(type, arrayName, title, drawDestination) {
	var drawer = drawDestination;
	if (drawDestination == "" || drawDestination == null) {
		drawer = frameToDrawTo;
	}
	document.getElementById(drawer).setAttribute("type", type);
	document.getElementById(drawer).setAttribute("array", arrayName);
	if (type == "dotPattern") {
		barChart(title, arrayName, null, drawer);
	}
}

//-----------------------------------------FUNCTIONS THAT WRITE MESSAGE INPUT TO ARRAYS------------------------------
function logGraphB(message) {
	var arrayInfo = message.split(":");
	//splits message based on colon seperators
	//	logGraphBArr[arrayInfo[1]].push(arrayInfo[1]+":"+arrayInfo[2]); //writes to array from array message was seperated in to, writes variable as "time:length"
	//graphRender("logGraph", "logGraphBArr"); //type of graph to draw and name of array to pull from
	if (arrayInfo[0] == 0) {
		var widthOfBall = 15;
	}
	if (arrayInfo[0] == 1) {
		var widthOfBall = 25;
	}
	if (arrayInfo[0] == 2) {
		var widthOfBall = 45;
	}
	//x co-ordinate calculated by dividing length from point to ball over the width. Y is straight up time.

	var x = Math.round(parseFloat(arrayInfo[2]) / widthOfBall * Math.pow(10, 2)) / Math.pow(10, 2);
	var y = Math.floor(parseInt(arrayInfo[1]));

	logResults[0].push(new Array(x, y));
	if (document.getElementById("canvas").getAttribute("type") == 'logGraph') {
		logChart.series[0].addPoint(new Array(x, y));
		logDat('canvas','logGraph', new Array('Distance versus time for two inputs', 'Distance from point / Ball width (px)', 'Time taken (ms)', new Array(new Array('Device One', '#0000FF', 'logResults[0]'), new Array('Device Two', '#FF0000', 'logResults[1]'))));		
	}
}

function logGraphR(message) {
	var arrayInfo = message.split(":");
	if (arrayInfo[0] == 0) {
		var widthOfBall = 15;
	}
	if (arrayInfo[0] == 1) {
		var widthOfBall = 25;
	}
	if (arrayInfo[0] == 2) {
		var widthOfBall = 45;
	}

	var x = Math.round(parseFloat(arrayInfo[2]) / widthOfBall * Math.pow(10, 2)) / Math.pow(10, 2);
	var y = Math.floor(parseInt(arrayInfo[1]));
	logResults[1].push(new Array(x, y));
//console.log("pushed");
	if (document.getElementById("canvas").getAttribute("type") == 'logGraph') {
		//	graphRender('logGraph',new Array(logResults[0],logResults[1]),'Distance versus time for two inputs',frameToDrawTo);
		logChart.series[1].addPoint(new Array(x, y));
		logDat('canvas','logGraph', new Array('Distance versus time for two inputs', 'Distance from point / Ball width (px)', 'Time taken (ms)', new Array(new Array('Device One', '#0000FF', 'logResults[0]'), new Array('Device Two', '#FF0000', 'logResults[1]'))));
	}
}

function equiVari(message) {
	var arrayInfo = message.split(":");
	
	if (arrayInfo[0] == 0) {
		var widthOfBall = 45;
		var dist = genericLength / 4;
	}
	if (arrayInfo[0] == 1) {
		var widthOfBall = 25;
		var dist = genericLength / 3;
	}
	if (arrayInfo[0] == 2) {
		var widthOfBall = 45;
		var dist = (genericLength / 3) *2;
	}
	if (arrayInfo[0] == 3){
		var widthOfBall = 15;
		var dist = genericLength;
	}
	
	var x = Math.round(parseFloat(dist) / widthOfBall * Math.pow(10, 2)) / Math.pow(10, 2);
	var y = Math.floor(parseInt(arrayInfo[1]));
	
	equiVariArr[arrayInfo[0]].push(arrayInfo[1]);
	equiVariResults[arrayInfo[0]].push(new Array(x,y));
	
	if (document.getElementById('canvas').getAttribute('array') == "equiVariArr") {
		var AverageArr = getAverage(equiVariArr);
		verticalChart.series[0].setData(AverageArr, true);
	}
	
	if (document.getElementById('canvas').getAttribute('type') == "equiVariScatter") {
		logChart.series[arrayInfo[0]].addPoint(new Array(x,y));
		logDat('canvas','equiVariScatter', new Array('Distance versus time for four inputs', 'Distance from point / Ball width (px)', 'Time taken (ms)', new Array(new Array('Big Blue', '#0000FF', 'equiVariResults[0]'), new Array('Medium Green', '#00FF00', 'equiVariResults[1]'), new Array('Big Red', '#FF0000', 'equiVariResults[2]'), new Array('Small Yellow', '#FFFF00', 'equiVariResults[3]'))));
	}
}

function diffDist(message) {
	var arrayInfo = message.split(":");
	
	if (arrayInfo[0] == 0) {
		var widthOfBall = 25;
		var dist = genericLength / 3;
	}
	
	if (arrayInfo[0] == 1) {
		var widthOfBall = 25;
		var dist = (genericLength / 3) * 2;
	}
	
	if (arrayInfo[0] == 2) {
		var widthOfBall = 25;
		var dist = genericLength;
	}
	
	var x = Math.round(parseFloat(dist) / widthOfBall * Math.pow(10, 2)) / Math.pow(10, 2);
	var y = Math.floor(parseInt(arrayInfo[1]));

	
	diffDistArr[arrayInfo[0]].push(arrayInfo[1]);
	diffDistResults[arrayInfo[0]].push(new Array(x,y));
	
	if (document.getElementById('canvas').getAttribute('array') == "diffDistArr") {
		var AverageArr = getAverage(diffDistArr);
		verticalChart.series[0].setData(AverageArr, true);
	}
	
	if (document.getElementById('canvas').getAttribute('type') == "diffDistScatter") {
		logChart.series[arrayInfo[0]].addPoint(new Array(x,y));
		logDat('canvas','diffDistScatter', new Array('Distance versus time for three inputs', 'Distance from point / Ball width (px)', 'Time taken (ms)', new Array(new Array('Medium Blue', '#0000FF', 'diffDistResults[0]'), new Array('Medium Green', '#00FF00', 'diffDistResults[1]'), new Array('Medium Red', '#FF0000', 'diffDistResults[2]'))));
	}
}

function equaLong(message) {
	var arrayInfo = message.split(":");
	
	if (arrayInfo[0] == 0) {
		var widthOfBall = 15;
		var dist = genericLength;
	}
	
	if (arrayInfo[0] == 1) {
		var widthOfBall = 25;
		var dist = genericLength;
	}
	
	if (arrayInfo[0] == 2) {
		var widthOfBall = 45;
		var dist = genericLength;
	}
	
	var x = Math.round(parseFloat(dist) / widthOfBall * Math.pow(10, 2)) / Math.pow(10, 2);
	var y = Math.floor(parseInt(arrayInfo[1]));

	equaLongResults[arrayInfo[0]].push(new Array(x,y));
	equaLongArr[arrayInfo[0]].push(arrayInfo[1]);
	if (document.getElementById('canvas').getAttribute('array') == "equaLongArr") {
		var AverageArr = getAverage(equaLongArr);
		verticalChart.series[0].setData(AverageArr, true);
	}
	if (document.getElementById('canvas').getAttribute('type') == "equaLongScatter") {
		logChart.series[arrayInfo[0]].addPoint(new Array(x,y));
		onclick = logDat('canvas','equaLongScatter', new Array('Distance versus time for three inputs', 'Distance from point / Ball width (px)', 'Time taken (ms)', new Array(new Array('Small Blue', '#0000FF', 'equaLongResults[0]'), new Array('Medium Green', '#00FF00', 'equaLongResults[1]'), new Array('Big Red', '#FF0000', 'equaLongResults[2]'))));
	}
}

//-----------------------------------------WEBSOCKETS AND PUBNUB ENABLING------------------------------

if (window.WebSocket) {
	webSocketsOn();
} else {
	webSocketsOff();
}

function webSocketsOn() {
	if (window.MozWebSocket) {
		window.WebSocket = window.MozWebSocket;
	}
	//console.log("Websockets enabled. Connecting.");
}

function webSocketsOff() {
	//console.log("These are not the websockets you are looking for.");
}

(function() {

	// LISTEN FOR MESSAGES
	PUBNUB.subscribe({
		channel : "logGraphB",
		restore : false,
		callback : function(message) {
			logGraphB(message);
		},
		disconnect : function() {
			//console.log("Connection to logGraphB lost. Reconnecting.");
		},
		reconnect : function() {
			//console.log("Reconnected to logGraphB");
		},
	});
	PUBNUB.subscribe({
		channel : "logGraphR",
		restore : false,
		callback : function(message) {
			logGraphR(message);
		},
		disconnect : function() {
			//console.log("Connection to logGraphR lost. Reconnecting.");
		},
		reconnect : function() {
			//console.log("Reconnected to logGraphR");
		},
	});
	PUBNUB.subscribe({
		channel : "equiVari",
		restore : false,
		callback : function(message) {
			equiVari(message);
		},
		disconnect : function() {
			//console.log("Connection to equiVari lost. Reconnecting.");
		},
		reconnect : function() {
			//console.log("Reconnected to equiVari");
		},
	});
	PUBNUB.subscribe({
		channel : "diffDist",
		restore : false,
		callback : function(message) {
			diffDist(message);
		},
		disconnect : function() {
			//console.log("Connection to diffDist lost. Reconnecting.");
		},
		reconnect : function() {
			//console.log("Reconnected to diffDist");
		},
	});
	PUBNUB.subscribe({
		channel : "equiSize",
		restore : false,
		callback : function(message) {
			equaLong(message);
		},
		disconnect : function() {
			//console.log("Connection to equaLong lost. Reconnecting.");
		},
		reconnect : function() {
			//console.log("Reconnected to equaLong");
		},
	});

})();
