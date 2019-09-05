import React from 'react';
import './App.css';
import ReactEcharts from "echarts-for-react";
import YearWiseBarCharts from "./YearWiseBarCharts";
import MonthWiseComparisionChart from "./MonthWiseComparisionChart";

const data = require("./data");
const style = {
    height: "90vh",
    width: "100%"
};

const option = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: data.map(i => i.name),
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            data: data.map(i => i.value)
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: data
        }
    ]
};
const App = () => (
    <div>
        <ReactEcharts option={option} style={style} className="pie-chart"/>
        <hr/>
        <YearWiseBarCharts className="bar-chart"/>
        <hr/>
        <MonthWiseComparisionChart className="comp-chart"/>
    </div>
);


export default App;