
//plot
var margin = {t: 5, r: 25, b: 20, l: 25}; //this is an object
var width = d3.select('#plot1').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot1').node().clientHeight - margin.t - margin.b;

// Append svg to div
var plot1 = d3.select('#plot1') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);


// function to draw the map
var path = d3.geoPath();

// prepare map (array) of data values
var FGMperCountry = d3.map();

// queue data files, parse them and use them
var queue = d3.queue()
    .defer(d3.json, "data/0-14data.json")
    .defer(d3.json, "africa2.json")
    .await(draw);

function draw(error,data10,africa) {
	
//	var projection = d3.geoMercator()
//      			.scale(400)
//      			.translate([200, 280])
//      			.center([0, 5]);
//
//			var geoGenerator = d3.geoPath()
//      			.projection(projection);
	
    plot1.selectAll(".country")
        .data(topojson.feature(africa,africa.objects.countries).features) //geometry for the states
        .enter()
        .append("path")
        .attr("class","country")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function(d) {
            var mapID = d.properties.admin;
            var color = "#f7f7f7"; //default color for those without information
			
			try{
				var prevalence = data10[mapID].prevalence;
			}
			catch(error){
				var prevalence = 100;
			}
			
			if (prevalence != 100){
				var number = 180 - 2.5*prevalence;
				var color = "rgb(" + number + "," + number + "," + number + ")";
			}
			if (prevalence == 100){
			  	var color = "#d0d0d0"
			}

            return color
        })
//		.attr("d", geoGenerator)
		.on("mouseover",function(d){
			var nameCountry = d.properties.admin;
	  		console.log(nameCountry);
	  		var something = data10[nameCountry].prevalence;

		 	try{
				var something = data10[nameCountry].prevalence + "%";
		 	}
		 	catch(error){
			 	var something = 'No data available';
		 	}
      		d3.select('#content .mapInfo #mapCountryText')
		 		.text(d.properties.admin + ":");
//				.on("mousemove", )
			d3.select('#content .mapInfo #mapDataText')
		 		.text(something);
		
		
//			var pixelArea = geoGenerator.area(d);
//      		var bounds = geoGenerator.bounds(d);
//      		var centroid = geoGenerator.centroid(d);
//      		var measure = geoGenerator.measure(d);
//			console.log(centroid);
//			console.log(bounds);
//			console.log(pixelArea);
//			console.log(measure);
//		
//			d3.select('#content .centroid')
////        		.style('display', 'inline')
//				.attr("cx", "200")
//				.attr("cy", "200");
////        		.attr('transform', `translate(${centroid})`);
    	
		});


}
