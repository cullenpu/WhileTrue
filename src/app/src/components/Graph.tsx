// Import modules
import * as React from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

// import { getData } from '../api/data';
import { Offer } from './typings';

// const data1 = [{
//     "type": "Type a",
//     "occurance": 1
//   }, {
//     "type": "Type b",
//     "occurance": 2
//   }, {
//     "type": "Type c",
//     "occurance": 3
//   }, {
//     "type": "Type d",
//     "occurance": 1
//   }, {
//     "type": "Type e",
//     "occurance": 1
//   }];

const data2 = [{
    "Month": "Jan",
    "saved offer": 501
  }, {
    "Month": "Feb",
    "saved offer": 301
  }, {
    "Month": "Mar",
    "saved offer": 201
  }, {
    "Month": "Apr",
    "saved offer": 165
  }, {
    "Month": "May",
    "saved offer": 139
  }, {
    "Month": "Jun",
    "saved offer": 128
  }, {
    "Month": "Jul",
    "saved offer": 501
  }, {
    "Month": "Aug",
    "saved offer": 301
  }, {
    "Month": "Sep",
    "saved offer": 201
  }, {
    "Month": "Oct",
    "saved offer": 165
  }, {
    "Month": "Nov",
    "saved offer": 139
  }, {
    "Month": "Dec",
    "saved offer": 128
  }];


const Graph = (props: { offers: Offer[] }) => {
    const { offers } = props;
    const map = new Map<string, number>();
    
    for (let i = 0; i < offers.length; i+=1){
        const k = offers[i].type;
        const val = map.get(k);
        if (map.has(k)){
            if (val){
                map.set(k, val + 1)
            }           
        } else{
            map.set(k, 1)
        }
    };
    console.log('map', map);

    const clean: { type: string; occurance: number; }[] = [];
    map.forEach((value: number, key: string) => {
        clean.push({"type": key, "occurance": value});
    });

    console.log('clean', clean);
  
    // const [offers, setOffers] = React.useState([]);

    // const getDataFromApi = async () => {
    //     try {
    //       setOffers(await getData('offers'));
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };

    // React.useEffect(() => {
    //     getDataFromApi();
    // }, []);
    
    // getDataFromApi();
    // const offers = getData('offers');

    // console.log("clean", clean);

    // Create chart instance
    const chart = am4core.create("piediv", am4charts.PieChart);

    // Add data
    chart.data = clean;

    // Add and configure Series
    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "occurance";
    pieSeries.dataFields.category = "type";


    const chart2 = am4core.create("bardiv", am4charts.XYChart);

    chart2.data = data2

    const categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "Month";
    categoryAxis.title.text = "Month";

    const valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = "Usage";

    const series = chart2.series.push(new am4charts.ColumnSeries());
    series.name = "Saved Offer";
    series.columns.template.tooltipText = "Series: {name}\nMonth: {categoryX}\nAmount: {valueY}";
    series.columns.template.fill = am4core.color("#424B5A"); // fill
    categoryAxis.renderer.cellStartLocation = 0.2;
    categoryAxis.renderer.cellEndLocation = 0.8;
    series.columns.template.width = am4core.percent(60);
    series.dataFields.valueY = "saved offer";
    series.dataFields.categoryX = "Month";
    return (
      <div style={{ margin: '5% 10%' }}>
        <div className="piediv" />
        <div className="bardiv" />
      </div>
    );
  };
  
  export default Graph;
