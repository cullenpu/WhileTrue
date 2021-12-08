// Import modules
import * as React from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_patterns from '@amcharts/amcharts4/themes/patterns';
import { Text } from '@chakra-ui/layout';

import { Offer, ContentCard } from './typings';

am4core.useTheme(am4themes_patterns);

const Graph = (props: { offers: Offer[]; content: ContentCard[] }) => {
  const { offers, content } = props;

  const map = new Map<string, number>();

  for (let i = 0; i < offers.length; i += 1) {
    const k = offers[i].type;
    const val = map.get(k);
    if (map.has(k)) {
      if (val) {
        map.set(k, val + 1);
      }
    } else {
      map.set(k, 1);
    }
  }

  const clean: { type: string; occurance: number }[] = [];
  map.forEach((value: number, key: string) => {
    clean.push({ type: key, occurance: value });
  });

  // Create chart instance
  const chart = am4core.create('piediv', am4charts.PieChart);

  // Add data
  chart.data = clean;

  // Add and configure Series
  const pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = 'occurance';
  pieSeries.dataFields.category = 'type';

  const date = new Map<string, number>();

  for (let i = 0; i < content.length; i += 1) {
    const k = content[i].time.split('-')[1];
    const val = date.get(k);
    if (date.has(k)) {
      if (val) {
        date.set(k, val + 1);
      }
    } else {
      date.set(k, 1);
    }
  }

  console.log('date', date);

  const data2: { month: string; usage: number }[] = [
    {
      month: '1',
      usage: 10,
    },
    {
      month: '2',
      usage: 15,
    },
    {
      month: '3',
      usage: 3,
    },
    {
      month: '4',
      usage: 0,
    },
    {
      month: '5',
      usage: 1,
    },
    {
      month: '6',
      usage: 7,
    },
    {
      month: '7',
      usage: 8,
    },
    {
      month: '8',
      usage: 10,
    },
    {
      month: '9',
      usage: 12,
    },
    {
      month: '10',
      usage: 8,
    },
    {
      month: '11',
      usage: 9,
    },
    {
      month: '12',
      usage: 0,
    },
  ];
  date.forEach((value: number, key: string) => {
    data2.push({ month: key, usage: value });
  });

  console.log('data2', data2);

  const chart2 = am4core.create('bardiv', am4charts.XYChart);

  chart2.data = data2;

  const categoryAxis = chart2.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = 'month';
  categoryAxis.title.text = 'Month';

  const valueAxis = chart2.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = 'Usage';

  const series = chart2.series.push(new am4charts.ColumnSeries());
  series.name = 'Usage';
  series.columns.template.tooltipText = 'Series: {name}\nMonth: {categoryX}\nAmount: {valueY}';
  series.columns.template.fill = am4core.color('#424B5A'); // fill
  categoryAxis.renderer.cellStartLocation = 0.2;
  categoryAxis.renderer.cellEndLocation = 0.8;
  series.columns.template.width = am4core.percent(60);
  series.dataFields.valueY = 'usage';
  series.dataFields.categoryX = 'month';
  return (
    <div style={{ margin: '5% 10%' }}>
      <Text fontSize="3xl">Types of Offers</Text>
      <div className="piediv" />
      <Text fontSize="3xl" style={{ marginTop: '5%' }}>
        Usage of Saved Content
      </Text>
      <div className="bardiv" />
    </div>
  );
};

export default Graph;
