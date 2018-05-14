var dataYoung = {
  labels: [
    'Benin', 'Burkina Faso', 'Central African Republic',
    'Chad', "Cote d'Ivoire", 'Egypt', "Eritrea", "Ethiopia", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Mali", "Mauritania", "Nigeria", "Senegal", "Sudan", "Togo", "United Republic of Tanzania", "Uganda"
  ],
  series: [
    {
      label: 'urban',
      values: [0, 7, 1, 9, 8, 10, 25, 7, 51, 0.3, 40, 21, 2, 80, 35, 21, 8, 28, 0.2, 0.1, 1]
    },
    {
      label: 'rural',
      values: [0, 15, 2, 10, 13, 16, 37, 17, 60, 1, 48, 35, 3, 76, 68, 29, 18, 33, 0.3, 0.4, 1]
    },
   ]
};

var dataOld = {
  labels: [
    'Benin', 'Burkina Faso', 'Central African Republic',
    'Chad', "Cote d'Ivoire", 'Egypt', "Eritrea", "Ethiopia", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Kenya", "Mali", "Mauritania", "Nigeria", "Senegal", "Sudan", "Togo", "United Republic of Tanzania", "Uganda"
  ],
  series: [
    {
      label: 'urban',
      values: [5, 69, 18, 40, 31, 77, 80, 54, 72, 3, 96, 40, 14, 85, 55, 23, 19, 86, 3, 5, 1]
    },
    {
      label: 'rural',
      values: [13, 78, 29, 38, 44, 93, 85, 68, 79, 5, 98, 50, 26, 82, 79, 16, 28, 87, 6, 13, 1]
    },
   ]
};

//var queue = d3.queue()
//    .defer(d3.json, "data/0-14data.json")
//	.defer(d3.json, "data/15-49data.json")
//    .await(dataloaded);
//
//function dataloaded(error,data1,data2,) {
//	
//	draw("young_bar");
//	
//	d3.selectAll(".btnBarChart_bar").on("click",function(){
//        var year = this.getAttribute("id");
//		console.log(year);
//
//        draw(year)
//    });
//
//function draw(year){
//	if (year == "young_bar"){
//		var dataB = data1;
//	}
//	if (year == "old_bar"){
//		var dataB = data2;
//	}

draw("young_bar");
document.getElementById("young_bar").style.backgroundColor = "#B22025";
	
d3.selectAll(".btnBarChart_bar").on("click",function(){
	document.getElementById("young_bar").style.backgroundColor = "#939393";
	document.getElementById("old_bar").style.backgroundColor = "#939393";
	d3.select(".chart").selectAll("g").remove()
	var year = this.getAttribute("id");
	console.log(year);
	document.getElementById(year).style.backgroundColor = "#B22025";
	draw(year);
});

function draw(year){

if (year == "young_bar"){
	var data = dataYoung;
}
if (year == "old_bar"){
	var data = dataOld;
}
	

var chartWidth       = 600,
    barHeight        = 18,
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 200,
    spaceForLegend   = 100;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}

console.log(zippedData);

// Color scale
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scaleLinear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scaleLinear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.axisBottom(x).tickFormat(function(d){ return d.x;});

// Specify the chart area and dimensions
var chart = d3.select(".chart")
    .attr("width", spaceForLabels + chartWidth + spaceForLegend)
    .attr("height", chartHeight);

// Create bars
var bar = chart.selectAll("g")
    .data(zippedData)
    .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + spaceForLabels + "," + (i * barHeight + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) + ")";
    });

// Create rectangles of the correct width
bar.append("rect")
    .attr("fill", function(d,i) { 
		if (i % data.series.length == 1){
			var barcolor = "#BABABA";
		}
		if(i % data.series.length == 0){
			var barcolor = "#8e8e8e";
		}
		return barcolor; 
	})
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1)
	.attr("rx","5")
	.attr("ry","5");

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
//    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { 
		if (d > 2){
			return d + "%"; 
		}
		else{
			return "";
		}
	})
	.attr("font-family","Roboto Light")
	.attr("color","white");

// Draw labels
bar.append("text")
    .attr("class", "label")
    .attr("x", function(d) { return - 10; })
    .attr("y", groupHeight / 2)
    .attr("dy", ".35em")
    .text(function(d,i) {
      if (i % data.series.length === 0)
        return data.labels[Math.floor(i/data.series.length)];
      else
        return ""
	})
	.attr("font-family","Roboto Thin")
	.attr("color","white");

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);
	
//chart.selectAll(".bar").exit()
//	.transition()
//    .duration(500)
//    .attr("y",0)
//    .style("opacity",0)
//    .remove();
//	
//chart.transition()
//	.duration(500);

//	.attr("fill", function(d,i) { 
//		if (i % data.series.length == 1){
//			var barcolor = "#BABABA";
//		}
//		if(i % data.series.length == 0){
//			var barcolor = "#8e8e8e";
//		}
//		return barcolor; 
//	})
//	.attr("x", function(d) { return x(d) - 3; })
//	.text(function(d,i) {
//      if (i % data.series.length === 0)
//        return data.labels[Math.floor(i/data.series.length)];
//      else
//        return ""
//	});

// Draw legend
var legendRectSize = 18,
    legendSpacing  = 4;

var legend = chart.selectAll('.legend')
    .data(data.series)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
        var height = legendRectSize + legendSpacing;
        var offset = -gapBetweenGroups/2;
        var horz = spaceForLabels + chartWidth + 40 - legendRectSize;
        var vert = i * height - offset;
        return 'translate(' + horz + ',' + vert + ')';
    });

legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
//	.style('fill',"black")
//	.style('stroke', "gray");
    .style('fill', function (d, i) { 
		if (i % data.series.length == 1){
			var legendcolor = "#BABABA";
		}
		if(i % data.series.length == 0){
			var legendcolor = "#8e8e8e";
		}
		return legendcolor; 
	})
	.attr("rx","5")
	.attr("ry","5");

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });
	
	
}
	
//	
//}
//}