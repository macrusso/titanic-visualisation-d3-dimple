import modifyData from './modifiers.js';

d3.csv('train.csv', function (data) {
  // Setup
  const width = 600;
  const height = 400;

  const passengersByGender = dimple.newSvg('#passengersByGender', width, height);
  const passengersByEmbarked = dimple.newSvg('#passengersByEmbarked', width, height);

  const buttonLabels = ['All', 'Survived', 'Died'];

  // Drawing
  function createChart(filter, type, tagId) {
    let newChart = null;
    let filteredData = data;

    if (type === 'Sex') {
      newChart = passengersByGender.selectAll('*').remove();
    } else if (type === 'Embarked') {
      newChart = passengersByEmbarked.selectAll('*').remove();
    }

    if (filter === "All") {
      d3.select(`#${tagId}`)
        .text("All Passengers");
      filteredData = data;
    }

    if (filter === "Survived") {
      d3.select(`#${tagId}`)
        .text("Survived");
      filteredData = dimple.filterData(data, "Survived", '1');
    }

    if (filter === "Died") {
      d3.select(`#${tagId}`)
        .text("Died");
      filteredData = dimple.filterData(data, "Survived", '0');
    }

    newChart = updateChart(filteredData, type)
    newChart.draw();

  }

  function updateChart(data, type) {
    let modifiedData = null;;
    let chart = null;

    if (type === 'Sex') {
      chart = new dimple.chart(passengersByGender, data);
    } else if (type === 'Embarked') {
      modifiedData = modifyData(data, 'Embarked');
      chart = new dimple.chart(passengersByEmbarked, modifiedData);
    }

    chart.setBounds(20, 20, 460, 360);
    chart.addPctAxis("p", "Count");
    chart.addSeries(type, dimple.plot.pie);
    chart.addLegend(500, 20, 90, 300, "left");

    return chart;
  }

  // Charts init
  createChart('All', 'Embarked', 'passengersByEmbarkedSpan');
  createChart('All', 'Sex', 'passengersByGenderSpan');


  // Buttons
  const embarkedButtons = d3.select("#passengersByEmbarkedButtons")
    .append("div")
    .selectAll("div")
    .data(buttonLabels)
    .enter()
    .append("div")
    .attr("class", "waves-effect waves-light blue lighten-1 btn")
    .text(function (d) {
      return d;
    });

  embarkedButtons.on("click", function (d) {
    return createChart(d, 'Embarked', 'passengersByEmbarkedSpan')
  });

  const genderButtons = d3.select("#passengersByGenderButtons")
    .append("div")
    .selectAll("div")
    .data(buttonLabels)
    .enter()
    .append("div")
    .attr("class", "waves-effect waves-light blue lighten-1 btn")
    .text(function (d) {
      return d;
    });

  genderButtons.on("click", function (d) {
    return createChart(d, 'Sex', 'passengersByGenderSpan')
  });

});