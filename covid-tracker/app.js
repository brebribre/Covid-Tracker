const urlIndonesia = "https://disease.sh/v3/covid-19/countries/Indonesia?strict=true";
//https://disease.sh/v3/covid-19/countries/Indonesia?strict=true
$.get(urlIndonesia, function(data) {
  const todayCases = data.todayCases;
  const todayDeaths = data.todayDeaths;
  const todayRecovered = data.todayRecovered;

  const activeCases = data.active;

  const totalCases = data.cases;
  const totalDeaths = data.deaths;
  const totalRecovered = data.recovered;
  $(".total-cases").text(totalCases);
  $(".active-cases").text(activeCases);
  $(".total-deaths").text(totalDeaths);
  $(".total-recovered").text(totalRecovered);

  $(".today-cases").text(todayCases);
  $(".today-deaths").text(todayDeaths);
  $(".today-recovered").text(todayRecovered);

  //PIE chart
  anychart.onDocumentReady(function() {
    // set the data
    var chartData = [{
        x: "Active Cases",
        value: Number(activeCases)
      },
      {
        x: "Total Deaths",
        value: Number(totalDeaths)
      },
      {
        x: "Total Recovered",
        value: Number(totalRecovered)
      }

    ];

    // create the chart
    var chart = anychart.pie();

    // add the data
    chart.data(chartData);
    // set legend position
    chart.legend().position("right");
    // set items layout
    chart.legend().itemsLayout("vertical");

    // display the chart in the container
    chart.container('container');
    chart.draw();

  });
});

//last 30 days
const urlLast30 = "https://disease.sh/v3/covid-19/historical/indonesia?lastdays=30";
$.get(urlLast30, function(data) {
  var dates = [];
  var values = [];
  let last30Length = Object.keys(data.timeline.cases).length;

  Object.keys(data.timeline.cases).map(function(date) {
    dates.push(date);
    values.push(data.timeline.cases[date]);

    return dates, values
  })



//LINE CHART

  //make the data for the line chart
  var lineData = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
  ]

  for (var i = 0; i < 30; i++) {
    lineData[i].push(dates[i]);
    lineData[i].push(values[i]);
  }

  // create a chart
  chart = anychart.area();

  chart.title("Total Cases Reported");
  // create an area series and set the data
  var series = chart.area(lineData);
  chart.xScale().mode('continuous');

  // set the container id
  chart.container("container1");

  // initiate drawing the chart
  chart.draw();

});

//INDONESIA DETAILS
$(".covid-data-detail").append('<tr class="lead center">' +
  '<td class="column-title full">Provinsi</td>' +
  '<td class="column-title data">Positif</td>' +
  '<td class="column-title data">Meninggal</td>' +
  '<td class="column-title data">Sembuh</td>' +
  '</tr>');

const url = "https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/COVID19_Indonesia_per_Provinsi/FeatureServer/0/query?where=1%3D1&outFields=*&outSR=4326&f=json";
$.get(url, function(data) {
  const covidData = JSON.parse(data); //turn data in json format
  var arraylength = covidData.features.length;

  for (var i = 0; i < arraylength - 1; i++) {
    var provinsi = covidData.features[i].attributes.Provinsi;
    var kasusPositif = covidData.features[i].attributes.Kasus_Posi;
    var kasusMeninggal = covidData.features[i].attributes.Kasus_Meni;
    var kasusSembuh = covidData.features[i].attributes.Kasus_Semb;

    if (i % 2 === 0) {
      $(".covid-data-detail").append('<tr class="small lead center">' +
        '<td class="column center">' + provinsi + '</td>' +
        '<td class="column data">' + kasusPositif + '</td>' +
        '<td class="column data">' + kasusMeninggal + '</td>' +
        '<td class="column data">' + kasusSembuh + '</td>' +
        '</tr>');
    } else {
      $(".covid-data-detail").append('<tr class="small lead center gray">' +
        '<td class="column center">' + provinsi + '</td>' +
        '<td class="column data">' + kasusPositif + '</td>' +
        '<td class="column data">' + kasusMeninggal + '</td>' +
        '<td class="column data">' + kasusSembuh + '</td>' +
        '</tr>');
    }
  }
})

//dropdown
$(".dropdown").hide();
$(".province").on("click", function() {
  $(".dropdown").slideToggle();
});
