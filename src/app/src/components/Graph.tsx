// Import modules
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

const data1 = [{
    "Offer Type": "Type a",
    "Number of offers": 1
  }, {
    "Offer Type": "Type b",
    "Number of offers": 2
  }, {
    "Offer Type": "Type c",
    "Number of offers": 3
  }, {
    "Offer Type": "Type d",
    "Number of offers": 1
  }, {
    "Offer Type": "Type e",
    "Number of offers": 1
  }];

const data2 = [{
    "Month": "Jan",
    "usage": 501
  }, {
    "Month": "Feb",
    "usage": 301
  }, {
    "Month": "Mar",
    "usage": 201
  }, {
    "Month": "Apr",
    "usage": 165
  }, {
    "Month": "May",
    "usage": 139
  }, {
    "Month": "Jun",
    "usage": 128
  }, {
    "Month": "Jul",
    "usage": 501
  }, {
    "Month": "Aug",
    "usage": 301
  }, {
    "Month": "Sep",
    "usage": 201
  }, {
    "Month": "Oct",
    "usage": 165
  }, {
    "Month": "Nov",
    "usage": 139
  }, {
    "Month": "Dec",
    "usage": 128
  }];


const Graph = () => {
        // Create chart instance
    const chart = am4core.create("piediv", am4charts.PieChart);

    // Add data
    chart.data = data1;

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "Number of offers";
    pieSeries.dataFields.category = "Offer Type";


    const chart2 = am4core.create("bardiv", am4charts.XYChart);

    chart2.data = data2

    const categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Month";
    categoryAxis.title.text = "Month";

    const valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Usage";

    const series = chart2.series.push(new am4charts.ColumnSeries());
    series.name = "Usage";
    series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
    series.columns.template.fill = am4core.color("#424B5A"); // fill
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;
    series.columns.template.width = am4core.percent(60);
    series.dataFields.valueY = "usage";
    series.dataFields.categoryX = "Month";
    return (
      <div style={{ margin: '5% 10%' }}>
        <div className="piediv" />
        <div className="bardiv" />
      </div>
    );
  };
  
  export default Graph;
