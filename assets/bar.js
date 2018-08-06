import modifyData from './modifiers.js';

d3.csv('train.csv', function (data) {
  // Setup
  const width = 600;
  const height = 400;

  const survivorsByClass = dimple.newSvg('#survivorsByClass', width, height);
  const survivorsByAge = dimple.newSvg('#survivorsByAge', width, height);

  const buttonLabels = ['All', 'Male', 'Female'];

  // Drawing
  function createChart(filter, type, tagId) {
    let newChart = null;
    let filteredData = data;

    if (type === 'Class') {
      newChart = survivorsByClass.selectAll('*').remove();
    } else if (type === 'Age') {
      newChart = survivorsByAge.selectAll('*').remove();
    }

    if (filter === "All") {
      d3.select(`#${tagId}`)
        .text("All Passengers");
      filteredData = data;
    }

    if (filter === "Male") {
      d3.select(`#${tagId}`)
        .text("Male");
      filteredData = dimple.filterData(data, "Sex", 'male');
    }

    if (filter === "Female") {
      d3.select(`#${tagId}`)
        .text("Female");
      filteredData = dimple.filterData(data, "Sex", 'female');
    }

    newChart = updateChart(filteredData, type)
    newChart.draw();

  }

  function updateChart(updateData, type) {
    let modifiedData = modifyData(updateData, 'Survived');
    let chart = null;

    if (type === 'Class') {
      chart = new dimple.chart(survivorsByClass, modifiedData);
    } else if (type === 'Age') {
      modifiedData = modifyData(updateData, 'Age');
      chart = new dimple.chart(survivorsByAge, modifiedData);
    }

    chart.setBounds(60, 30, 510, 305);
    const x = chart.addCategoryAxis('x', type);
    x.addOrderRule(
      type === 'Class' ? [1, 2, 3] : ['0-16', '17-29', '30-45', '46-59', '60-80', 'N/A',]
    )
    chart.addMeasureAxis('y', 'Count');
    chart.addSeries('Survived', dimple.plot.bar);
    chart.addLegend(60, 10, 510, 20, "right");

    return chart;
  }

  // Charts init
  createChart('All', 'Class', 'survivorsByClassSpan');
  createChart('All', 'Age', 'survivorsByAgeSpan');


  // Buttons
  const classButtons = d3.select("#survivorsByClassButtons")
    .append("div")
    .selectAll("div")
    .data(buttonLabels)
    .enter()
    .append("div")
    .attr("class", "waves-effect waves-light blue lighten-1 btn")
    .text(function (d) {
      return d;
    });

  classButtons.on("click", function (d) {
    return createChart(d, 'Class', 'survivorsByClassSpan')
  });

  const ageButtons = d3.select("#survivorsByAgeButtons")
    .append("div")
    .selectAll("div")
    .data(buttonLabels)
    .enter()
    .append("div")
    .attr("class", "waves-effect waves-light blue lighten-1 btn")
    .text(function (d) {
      return d;
    });

  ageButtons.on("click", function (d) {
    return createChart(d, 'Age', 'survivorsByAgeSpan')
  });

});
