import React, { useState } from "react";
import "../../../../../../node_modules/react-vis/dist/style.css";
import { XYPlot, LineSeries, HorizontalGridLines, DiscreteColorLegend, XAxis, YAxis, Crosshair, MarkSeries } from "react-vis";
import "./chart.scss";
import { useWindowSize } from "../../../hooks/windowSize";

export interface ChartProps {
  landvalueData: { date: string, value: number }[],
  salesData: { date: string, value: number }[],
}

const Chart = ({ landvalueData, salesData }: ChartProps) => {
    const [ crosshairValues, setCrosshairValues ] = useState([]);

    const getChartdata = (array) => {
      const newArray = array.map(item=>({ 
        x: new Date(item.date), y: item.value 
      }));
      return newArray;
    };

    const size = useWindowSize();
    return (
      <div className='chart'>
        <div className='chart-title'>Sales and Landvalue Trend</div>
        <XYPlot height={size.width<982 ? 260 : 150} width={size.width<982 ? 550 : 340}>
            <HorizontalGridLines />
            <XAxis xType="time"/>
            <YAxis
              tickFormat={v => v>9999999 ? ((v/1000000).toFixed(0))+"M" : v>999999 ? ((v/1000000).toFixed(1))+"M" : v/1000+"k"}
            />
            <LineSeries
              data={getChartdata(landvalueData)}
              onNearestX={(value) => 
                setCrosshairValues([ { x: value.x, y: value.y } ])
              }
            />
            <MarkSeries 
              data={getChartdata(landvalueData)}
              size="2"
              color={"12939a"}
              />
            <MarkSeries 
              data={getChartdata(salesData)}
              size="3"
              color={"#FDB813"}
              />
            <MarkSeries 
              data={[ ...getChartdata(salesData), ...getChartdata(landvalueData) ]}
              color={"transparent"}
              onNearestX={(value) => 
                setCrosshairValues([ { x: value.x, y: value.y } ])
              }
              />
            <div className='chart-legend'>
              <DiscreteColorLegend 
                items={[ {
                  title: "Land value", color: "#12939a", strokeWidth: 5
                } ]}
              />
              <DiscreteColorLegend 
                items={[ {
                  title: "Sell price", color: "#FDB813", strokeWidth: 5
                } ]}
              />
            </div>
            <Crosshair values={crosshairValues}>
              <div className='chartInfo'>
                <div className='chartInfo_text'>{crosshairValues[0]&&crosshairValues[0].y} AUD</div>
              </div>
            </Crosshair>
        </XYPlot>
      </div>
    );
};

export default Chart;