import './App.css';
import ReactEcharts from "echarts-for-react";

import React, {Component} from 'react';

const data = require("./data2");
const style = {
    height: "90vh",
    width: "100%"
};

const processedData = data.reduce((result, item) => {
    let year = item.date.substring(0, 4);
    if (year in result) {
        return Object.assign(result, {[year]: parseFloat(result[year]) + parseFloat(item.amount)})
    } else {
        return Object.assign(result, {[year]: parseFloat(item.amount)})
    }
}, {});


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
            data: Object.keys(processedData),
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            data: Object.values(processedData),
        }
    ],
    series: [
        {
            name: 'Amount',
            type: 'bar',
            barWidth: '60%',
            data: Object.values(processedData),
        }
    ]
};


class YearWiseBarCharts extends Component {
    render() {
        return (
            <ReactEcharts option={option} style={style} className="pie-chart"/>
        );
    }
}

export default YearWiseBarCharts;