
//plot
var margin = {t: 5, r: 5, b: 5, l: 5}; //this is an object
var widthMap = d3.select('#plot2').node().clientWidth - margin.r - margin.l,
    heightMap = d3.select('#plot2').node().clientHeight - margin.t - margin.b;

// Append svg to div
var plot2 = d3.select('#plot2') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', widthMap + margin.r + margin.l)
    .attr('height', heightMap + margin.t + margin.b);

var projection = d3.geoMercator()
//      .scale(widthMap / 2 / Math.PI)
      //.scale(100)
      .translate([widthMap / 2, heightMap / 2])

var path = d3.geoPath().projection(null);

var FGMperCountry = d3.map();

var queue = d3.queue()
    .defer(d3.json, "data/0-14data.json")
	.defer(d3.json, "data/15-49data.json")
    .defer(d3.json, "data/africa2.json")
    .await(dataloaded);


function dataloaded(error,data1,data2,africa) {
	
	draw("young");
	
	d3.selectAll(".btnBarChart").on("click",function(){
        var year = this.getAttribute("id");
		console.log(year);

        draw(year)
    });

function draw(year){
	if (year == "young"){
		var data10 = data1;
	}
	if (year == "old"){
		var data10 = data2;
	}
	
	console.log(data10);
	
	africa.transform.translate = [widthMap/2-350,780];
	
	var tooltip = {
    element: null,
    init: function() {
        this.element = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);
    },
    show: function(t) {
        this.element.html(t).transition().duration(200).style("left", d3.event.pageX + 20 + "px").style("top", d3.event.pageY - 20 + "px").style("opacity", .9);
    },
    move: function() {
        this.element.transition().duration(30).ease("linear").style("left", d3.event.pageX + 20 + "px").style("top", d3.event.pageY - 20 + "px").style("opacity", .9);
    },
    hide: function() {
        this.element.transition().duration(500).style("opacity", 0)
    }};

	tooltip.init();
	
	var afmap =  plot2.selectAll(".country")
        .data(topojson.feature(africa,africa.objects.countries).features);
	
    afmap //geometry for the states
        .enter()
        .append("path")
        .attr("class","country")
        .attr("d", path)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
        .style("fill", function(d) {
            var mapID = d.properties.admin;
			
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
	
		.on("mouseover", function (d, i) {
			var nameCountry = d.properties.admin;
	  		console.log(nameCountry);
	  		var something = data10[nameCountry].prevalence;

		 	try{
				var something = data10[nameCountry].prevalence + "%";
		 	}
		 	catch(error){
			 	var something = 'No data available';
		 	}
      		tooltip.show("<b>" + nameCountry  + "</b>" + "<br>" + "Prevalence: " + something);    
  		})
//		.on("mousemove", function (d, i) {   
//      		tooltip.move();
//      	})
      	.on("mouseout", function (d, i) {
      		tooltip.hide();
  		});
	
	console.log("made it?");
	
	
	afmap.exit()
            .transition()
            .duration(500)
            .attr("y",heightMap)
            .style("opacity",0)
            .remove();
	
	afmap
		.transition()
		.duration(500)
        .style("stroke", "#fff")
        .style("stroke-width", "1")
		.style("fill", function(d) {
            var mapID = d.properties.admin;
			
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
        });
	
	afmap
		.on("mouseover", function (d, i) {
			var nameCountry = d.properties.admin;
	  		console.log(nameCountry);
	  		var something = data10[nameCountry].prevalence;

		 	try{
				var something = data10[nameCountry].prevalence + "%";
		 	}
		 	catch(error){
			 	var something = 'No data available';
		 	}
      		tooltip.show("<b>" + nameCountry  + "</b>" + "<br>" + "Prevalence: " + something);    
  		})
//		.on("mousemove", function (d, i) {   
//      		tooltip.move();
//      	})
      	.on("mouseout", function (d, i) {
      		tooltip.hide();
  		});
	
	
	
//		.on("mouseover",function(d){
//			var nameCountry = d.properties.admin;
//	  		console.log(nameCountry);
//	  		var something = data10[nameCountry].prevalence;
//
//		 	try{
//				var something = data10[nameCountry].prevalence + "%";
//		 	}
//		 	catch(error){
//			 	var something = 'No data available';
//		 	}
//      		d3.select('#content .mapInfo #mapCountryText')
//		 		.text(d.properties.admin + ":");
////				.on("mousemove", )
//			d3.select('#content .mapInfo #mapDataText')
//		 		.text(something);
//		
//		
////			var pixelArea = geoGenerator.area(d);
////      		var bounds = geoGenerator.bounds(d);
////      		var centroid = geoGenerator.centroid(d);
////      		var measure = geoGenerator.measure(d);
////			console.log(centroid);
////			console.log(bounds);
////			console.log(pixelArea);
////			console.log(measure);
////		
////			d3.select('#content .centroid')
//////        		.style('display', 'inline')
////				.attr("cx", "200")
////				.attr("cy", "200");
//////        		.attr('transform', `translate(${centroid})`);
//    	
//		});

}

}
