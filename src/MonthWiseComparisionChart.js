import './App.css';
import ReactEcharts from "echarts-for-react";
import * as _ from 'lodash';

import React, {Component} from 'react';

const data = require("./data2");

const style = {
    height: "90vh",
    width: "100%"
};
const years = ["2012", "2013", "2014", "2015", "2016", "2017", "2018"];
const months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12"
];
const chartType = "pie";

/**
 *
 * @returns {[]}
 * In the format of
 ['Years', '2015', '2016', '2017'],
 ['01', 43.3, 85.8, 93.7],
 ['02', 83.1, 73.4, 55.1],
 ['03', 86.4, 65.2, 82.5],
 ...
 ['12', 72.4, 53.9, 39.1]
 */
function transform() {
    let groupedByYearAndMonth = _(data.filter(datum => years.includes(datum.date.substring(0, 4))))
        .groupBy(x => x.date.substring(0, 7))
        .map((value, key) => {
            return {
                [key]: _.reduce(
                    value,
                    (result, current) => parseFloat(result) + parseFloat(current.amount),
                    0
                )
            };
        })
        .value();

    let sumOfAmountGroupedByYearAndMonth = {};
    groupedByYearAndMonth.forEach(r => {
        Object.assign(sumOfAmountGroupedByYearAndMonth, {[Object.keys(r)]: _.sum(Object.values(r))});
    });

    years.forEach(year => {
        months.forEach(month => {
            let completeDate = year + "-" + month;
            if (!(completeDate in sumOfAmountGroupedByYearAndMonth)) {
                Object.assign(sumOfAmountGroupedByYearAndMonth, {[completeDate]: 0})
            }
        });
    });

    let formattedDataForChart = [];
    formattedDataForChart.push(["Years", ...years]);

    months.forEach(month => {
        let temp = [month];
        years.forEach(year => {
            let completeDate = year + "-" + month;
            temp.push(sumOfAmountGroupedByYearAndMonth[completeDate]);
        });
        formattedDataForChart.push(temp);
    });

    return formattedDataForChart;
}

function copy(object, times) {
    let res = [];
    for (let i = 0; i < times; i++) {
        if (object.type === 'pie') {
            let newObj = Object.assign({}, object);
            Object.assign(newObj, {
                center: [(((i % 3) + 1) * 25).toString() + "%", ((Math.floor(i / 3) + 1) * 30).toString() + "%"],
                radius: 60,
            });
            res.push(newObj);
        } else {
            res.push(object);
        }
    }
    return res;
}


class MonthWiseComparisionChart extends Component {

    render() {
        let formattedDataForChart = transform();

        const option = {
            legend: {},
            tooltip: {},
            dataset: {
                source: [
                    ...formattedDataForChart
                ]
            },
            series: copy({type: chartType}, years.length)
        };

        if (option.series[0].type === 'bar' || option.series[0].type === 'line') {
            Object.assign(option, {
                xAxis: {type: 'category'},
                yAxis: {},
            })
        }

        return (
            <ReactEcharts option={option} style={style} className="comparision-chart"/>
        );
    }
}

export default MonthWiseComparisionChart;