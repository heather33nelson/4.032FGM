
//plot
var margin = {t: 40, r: 5, b: 40, l: 5}; //this is an object
var width = d3.select('#plot1').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot1').node().clientHeight - margin.t - margin.b;

// Append svg to div
var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);

//create groups to put the content inside them
var plotMedal = plot1.append('g').attr('transform', 'translate(' + margin.l +',' + margin.t + ')').attr('class', 'medals');
var plotText = plot1.append('g').attr('transform', 'translate(' + margin.l + ',' + margin.t + ')').attr('class', 'text');

var blue = "#66b2c5";
var yellow = "#ffb400";
var red = "#c63232";
var green = "#72a746";
var maxR = 70;


// calculate position of medals
var scaleX = d3.scaleBand().rangeRound([maxR/20,(width-(maxR/20))]).domain([1,2,3,4,5]).padding(0.5);
var scaleR = d3.scaleSqrt().range([5,maxR]);


var data;
// queue data files, parse them and use them
d3.json("data/0-14data.json", function(error,json){
	if (error) return console.warn(error);
    data = json;
	
	var Array = []; // This will be the resulting array
	for(var key in data) {
  		var entry = data[key]; // This will be each of the three graded things
  		entry.id = key; // e.g. "id": "assessment1"
  		Array.push(entry)
	}
	console.log(Array);
	
	var thisData = Array;
//	var text = plotText.(".countries")
//            .data(thisData);


	draw();
	

    function draw(){
		
		
		var textCountries = plotText.selectAll(".countries")
            .data(thisData);
				
		textCountries.enter()
            .append("text")
            .attr("class","textcountries")
            .text(function(d){return d.id})
            .attr("text-anchor","left")
			.style("font-family", "HelveticaNeue")
			.style("font-size", 14)
			.attr("x", 0)
            .style("opacity",0)
//            .attr("y",0)
//            .transition()
//            .duration(500)
            .style("opacity",1)
            .attr("y",function(d){return d.num*75 + 4});
		
		
		var circlesPoorest = plotMedal.selectAll(".medals")
			.data(thisData);
		var circlesSecond = plotMedal.selectAll(".medals")
			.data(thisData);
		var circlesMiddle = plotMedal.selectAll(".medals")
			.data(thisData);
		var circlesFourth = plotMedal.selectAll(".medals")
			.data(thisData);
		var circlesRichest = plotMedal.selectAll(".medals")
			.data(thisData);
		
		circlesPoorest
			.enter()
			.append("circle")
			.attr("class","medals")
			.attr("cy",function(d) {return d.num*75})
			.attr("r",function(d) {return scaleR(d.poorest)/10})
			.style("fill","#939393")
			.attr("cx",0)
            .style("opacity",0)
			.on("mouseover",handleMouseOverPoorest)
			.on("mouseout",handleMouseLeave)
            .transition()
            .duration(1000)
            .style("opacity",1)
            .attr("cx",200);
		
		circlesSecond
			.enter()
			.append("circle")
			.attr("class","medals")
			.attr("cy",function(d) {return d.num*75})
			.attr("r",function(d) {return scaleR(d.second)/10})
			.style("fill","#939393")
			.attr("cx",0)
            .style("opacity",0)
			.on("mouseover",handleMouseOverSecond)
			.on("mouseout",handleMouseLeave)
            .transition()
            .duration(1000)
            .style("opacity",1)
            .attr("cx",300);
		
		circlesMiddle
			.enter()
			.append("circle")
			.attr("class","medals")
			.attr("cy",function(d) {return d.num*75})
			.attr("r",function(d) {return scaleR(d.middle)/10})
			.style("fill","#939393")
			.attr("cx",0)
            .style("opacity",0)
			.on("mouseover",handleMouseOverMiddle)
			.on("mouseout",handleMouseLeave)
            .transition()
            .duration(1000)
            .style("opacity",1)
            .attr("cx",400);
		circlesFourth
			.enter()
			.append("circle")
			.attr("class","medals")
			.attr("cy",function(d) {return d.num*75})
			.attr("r",function(d) {return scaleR(d.fourth)/10})
			.style("fill","#939393")
			.attr("cx",0)
            .style("opacity",0)
			.on("mouseover",handleMouseOverFourth)
			.on("mouseout",handleMouseLeave)
            .transition()
            .duration(1000)
            .style("opacity",1)
            .attr("cx",500);
		circlesRichest
			.enter()
			.append("circle")
			.attr("class","medals")
			.attr("cy",function(d) {return d.num*75})
			.attr("r",function(d) {return scaleR(d.richest)/10})
			.style("fill","#939393")
			.attr("cx",0)
            .style("opacity",0)
			.on("mouseover",handleMouseOverRichest)
			.on("mouseout",handleMouseLeave)
            .transition()
            .duration(1000)
            .style("opacity",1)
            .attr("cx",600)

    }
	
	function handleMouseOverPoorest(d){
		plotMedal
			.append("circle")
			.attr("class", "circlesMouse")
			.attr("r",20)
			.style("fill","red")
			.attr("cx", 230)
            .style("opacity",0)
            .attr("cy",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("cy",d.num*75 - 10);
		plotText
            .append("text")
            .attr("class","textMouse")
			.text(d.poorest + "%")
            .attr("text-anchor","middle")
			.attr("x", 230)
            .style("opacity",0)
            .attr("y",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("y",d.num*75 - 5);
	}
	
	function handleMouseOverSecond(d){
		plotMedal
			.append("circle")
			.attr("class", "circlesMouse")
			.attr("r",20)
			.style("fill","red")
			.attr("cx", 330)
            .style("opacity",0)
            .attr("cy",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("cy",d.num*75 - 10);
		plotText
            .append("text")
            .attr("class","textMouse")
			.text(d.second + "%")
            .attr("text-anchor","middle")
			.attr("x", 330)
            .style("opacity",0)
            .attr("y",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("y",d.num*75 - 5);
	}
	
	function handleMouseOverMiddle(d){
		plotMedal
			.append("circle")
			.attr("class", "circlesMouse")
			.attr("r",20)
			.style("fill","red")
			.attr("cx", 430)
            .style("opacity",0)
            .attr("cy",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("cy",d.num*75 - 10);
		plotText
            .append("text")
            .attr("class","textMouse")
			.text(d.middle + "%")
            .attr("text-anchor","middle")
			.attr("x", 430)
            .style("opacity",0)
            .attr("y",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("y",d.num*75 - 5);
	}
	
	function handleMouseOverFourth(d){
		plotMedal
			.append("circle")
			.attr("class", "circlesMouse")
			.attr("r",20)
			.style("fill","red")
			.attr("cx", 530)
            .style("opacity",0)
            .attr("cy",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("cy",d.num*75 - 10);
		plotText
            .append("text")
            .attr("class","textMouse")
			.text(d.fourth + "%")
            .attr("text-anchor","middle")
			.attr("x", 530)
            .style("opacity",0)
            .attr("y",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("y",d.num*75 - 5);
	}
	
	function handleMouseOverRichest(d){
		plotMedal
			.append("circle")
			.attr("class", "circlesMouse")
			.attr("r",20)
			.style("fill","red")
			.attr("cx", 630)
            .style("opacity",0)
            .attr("cy",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("cy",d.num*75 - 10);
		plotText
            .append("text")
            .attr("class","textMouse")
			.text(d.richest + "%")
            .attr("text-anchor","middle")
			.attr("x", 630)
            .style("opacity",0)
            .attr("y",0)
            .transition()
            .duration(500)
            .style("opacity",1)
            .attr("y",d.num*75 - 5);
	}
	
	function handleMouseLeave(){
		plotText.select(".textMouse").remove();
		plotMedal.select(".circlesMouse").remove();
	}
	

//	
//        //exit
//        text.exit()
//            .transition()
//            .duration(500)
//            .attr("y",height)
//            .style("opacity",0)
//            .remove();
//
//        //update
//        text
//            .transition()
//            .duration(500)
//            .attr("x",function(d){return scaleX(d.rank)});
	
});

