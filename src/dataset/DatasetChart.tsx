import React, { useRef, useLayoutEffect } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

const DatasetChart: React.FC<{chartId: string, data: {label: string, nullRows: number, distinctRows: number, duplicateRows: number}[]}> = (props) => {
    const {data, chartId} = props;
    const chartRef = useRef(null);

    useLayoutEffect(() => {
        let chart = am4core.create(chartId, am4charts.XYChart);
        chart.data = data;

        chart.legend = new am4charts.Legend();
        chart.legend.position = "right";

        let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "label";
        categoryAxis.renderer.grid.template.opacity = 0;

        let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.renderer.grid.template.opacity = 0;
        valueAxis.renderer.ticks.template.strokeOpacity = 0.5;
        valueAxis.renderer.ticks.template.stroke = am4core.color("#495C43");
        valueAxis.renderer.ticks.template.length = 10;
        valueAxis.renderer.line.strokeOpacity = 0.5;
        valueAxis.renderer.baseGrid.disabled = true;
        valueAxis.renderer.minGridDistance = 100;

        function createSeries(field, name) {
            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "label";
            series.stacked = true;
            series.name = name;
            series.showTooltipOn = 'hover';
            series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
            
            let labelBullet = series.bullets.push(new am4charts.LabelBullet());
            labelBullet.locationX = 0.5;
            labelBullet.label.text = "{valueX}";
            labelBullet.label.fill = am4core.color("#fff");
            labelBullet.tooltipText = "{name}: [bold]{valueX}[/]";
        }

        createSeries('nullRows', 'Null Rows');
        createSeries('duplicateRows', 'Duplicate Rows');
        createSeries('distinctRows', 'Distinct Rows');

        chartRef.current = chart;
        return () => {
            chart.dispose();
        };
    });


    return <div id={chartId} style={{ width: "100%", height: "250px" }}></div>
}

export default DatasetChart