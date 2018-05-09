
//plot
var margin = {t: 5, r: 5, b: 5, l: 5}; //this is an object
var width = d3.select('#plot2').node().clientWidth - margin.r - margin.l,
    height = d3.select('#plot2').node().clientHeight - margin.t - margin.b;

// Append svg to div
var plot2 = d3.select('#plot2') // if we select a html id #name, if we select a class .name
    .append('svg')
    .attr('width', width + margin.r + margin.l)
    .attr('height', height + margin.t + margin.b);


var path = d3.geoPath();

var FGMperCountry = d3.map();

var queue = d3.queue()
    .defer(d3.json, "data/0-14data.json")
    .defer(d3.json, "data/africa2.json")
    .await(draw);

function draw(error,data10,africa) {
	
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
	
    plot2.selectAll(".country")
        .data(topojson.feature(africa,africa.objects.countries).features) //geometry for the states
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
  		})
	
	
	
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