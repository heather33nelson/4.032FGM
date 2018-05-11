var data = {
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

var chartWidth       = 500,
    barHeight        = 18,
    groupHeight      = barHeight * data.series.length,
    gapBetweenGroups = 10,
    spaceForLabels   = 150,
    spaceForLegend   = 150;

// Zip the series data together (first values, second values, etc.)
var zippedData = [];
for (var i=0; i<data.labels.length; i++) {
  for (var j=0; j<data.series.length; j++) {
    zippedData.push(data.series[j].values[i]);
  }
}

// Color scale
//var color = d3.scale.scaleOrdinal(d3.schemeCategory10);
var chartHeight = barHeight * zippedData.length + gapBetweenGroups * data.labels.length;

var x = d3.scaleLinear()
    .domain([0, d3.max(zippedData)])
    .range([0, chartWidth]);

var y = d3.scaleLinear()
    .range([chartHeight + gapBetweenGroups, 0]);

var yAxis = d3.axisBottom(x).tickFormat(function(d){ return d.x;});

//var yAxis = d3.svg.axis()
//    .scale(y)
//    .tickFormat('')
//    .tickSize(0)
//    .orient("left");

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
		console.log(i % data.series.length);
		if (i % data.series.length == 1){
			var barcolor = "black";
		}
		if(i % data.series.length == 0){
			var barcolor = "gray";
		}
		return barcolor; 
	})
//	.attr('fill',"black")
    .attr("class", "bar")
    .attr("width", x)
    .attr("height", barHeight - 1);
//	.attr("border-radius","10");

// Add text label in bar
bar.append("text")
    .attr("x", function(d) { return x(d) - 3; })
    .attr("y", barHeight / 2)
    .attr("fill", "red")
    .attr("dy", ".35em")
    .text(function(d) { 
		if (d > 2){
			return d + "%"; 
		}
		else{
			return "";
		}
	});
//	.style("text-family","Roboto Thin")

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
        return ""});

chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + spaceForLabels + ", " + -gapBetweenGroups/2 + ")")
      .call(yAxis);

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
			var legendcolor = "black";
		}
		if(i % data.series.length == 0){
			var legendcolor = "gray";
		}
		return legendcolor; 
	})
//    .style('stroke', function (d, i) { return color(i); });

legend.append('text')
    .attr('class', 'legend')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d.label; });