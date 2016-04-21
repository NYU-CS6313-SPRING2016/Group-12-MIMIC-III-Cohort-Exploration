queue()
    .defer(d3.json, "/api/data")
    .await(makeGraphs);

function makeGraphs(error, apiData) {
	
//Start Transformations
	var dataSet = apiData;
	/*var dateFormat = d3.time.format("%m/%d/%Y");
	dataSet.forEach(function(d) {
		d.date_posted = dateFormat.parse(d.date_posted);
				d.date_posted.setDate(1);
		d.total_donations = +d.total_donations;
	});*/

	//Create a Crossfilter instance
	var ndx = crossfilter(dataSet);

	//Define Dimensions
	var patientid = ndx.dimension(function(d) { return d.id; });
	var patientsex = ndx.dimension(function(d) { return d.sex; });
	var lengthofstay = ndx.dimension(function(d) { return d.los; });
	var patientage = ndx.dimension(function(d) { return d.age; });
	var morttype = ndx.dimension(function(d) { return d.mort; });
	var admisstype  = ndx.dimension(function(d) { return d.admiss; });

	//Calculate metrics
	var recordsById = patientid.group(); 
	var recordsBySex = patientsex.group(); 
	var recordsByLos = lengthofstay.group();
	var recordsByAge = patientage.group();
	var recordsByMort = morttype.group();
	var recordsByAdmissType = admisstype.group();

	var all = ndx.groupAll();

	//Calculate Groups
	var groupBySex = recordsBySex.reduceCount(function(d) {
		return d.sex;
	});

	var groupByAdmissType = recordsByAdmissType.reduceCount(function(d) {
		return d.admiss;
	})

	/*var totalDonationsFundingStatus = fundingStatus.group().reduceSum(function(d) {
		return d.funding_status;
	});



	var netTotalDonations = ndx.groupAll().reduceSum(function(d) {return d.total_donations;});*/

	//Define threshold values for data
	/*var minAge = patientage.bottom(1);
	var maxAge = patientage.top(1);

console.log(minAge);
console.log(maxAge);

    //Charts
	var losChart = dc.lineChart("#los-chart");
	var ageGroupChart = dc.rowChart("#age-chart");
	var mortHospChart = dc.pieChart("#mort-hosp-chart");*/
	var mortChart = dc.rowChart("#mort-chart");
	/*var povertyLevelChart = dc.rowChart("#poverty-chart");*/
	var totalRecords = dc.numberDisplay("#total-records");
	/*var netDonations = dc.numberDisplay("#net-donations");*/
	var admissTypeChart = dc.barChart("#admiss-type-chart");

  	selectField = dc.selectMenu('#menuselect')
        .dimension(patientsex)
        .group(recordsBySex); 

    dc.dataCount("#row-selection")
        .dimension(ndx)
        .group(all);


	totalRecords
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(all);

	/*netDonations
		.formatNumber(d3.format("d"))
		.valueAccessor(function(d){return d; })
		.group(netTotalDonations)
		.formatNumber(d3.format(".3s"));

	losChart
		//.width(600)
		.height(220)
		.margins({top: 10, right: 50, bottom: 30, left: 50})
		.dimension(lengthofstay)
		.group(recordsById)
		.renderArea(true)
		.transitionDuration(500)
		.x(d3.scale.linear().domain([minAge, maxAge]))
		.elasticY(true)
		.renderHorizontalGridLines(true)
    	.renderVerticalGridLines(true)
		.xAxisLabel("ID")
		.yAxisLabel("Age")
		.yAxis().ticks(6);

	/*resourceTypeChart
        //.width(300)
        .height(220)
        .dimension(resourceType)
        .group(projectsByResourceType)
        .elasticX(true)
        .xAxis().ticks(5);

	povertyLevelChart
		//.width(300)
		.height(220)
        .dimension(povertyLevel)
        .group(projectsByPovertyLevel)
        .xAxis().ticks(4);

	ageGroupChart
		//.width(300)
		.height(220)
        .dimension(gradeLevel)
        .group(projectsByGrade)
        .xAxis().ticks(4);

    mortChart
        .height(220)
        //.width(350)
        .radius(90)
        .innerRadius(40)
        .transitionDuration(1000)
        .dimension(morttype)
    	.group(recordsByMort);*/

  
    mortChart
        .height(220)
        //.width(350)
        .transitionDuration(1000)
        .dimension(morttype)
    	.group(recordsByMort)
    	.xAxis().ticks(4);


    admissTypeChart
    	//.width(800)
        .height(220)
        .transitionDuration(1000)
        .dimension(lengthofstay)
        .group(groupByAdmissType)
        .margins({top: 10, right: 50, bottom: 30, left: 50})
        .centerBar(false)
        .gap(5)
        .elasticY(true)
        .x(d3.scale.ordinal().domain(admisstype))
        .xUnits(dc.units.ordinal)
		.colors(d3.scale.ordinal().range(['#1f78b4', '#b2df8a', '#cab2d6', '#bc80bd']))
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .ordering(function(d){return d.value;})
        .yAxis().tickFormat(d3.format("s"));

    dc.renderAll();

};