import React, { useState } from "react";
import "../../../../../../node_modules/react-vis/dist/style.css";
import { XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair, MarkSeries } from "react-vis";
import "./chart.scss";
import PropTypes from "prop-types";
import { useWindowSize } from "../../../modules/windowSize";

const Chart = (props) => {
    const [ crosshairValues, setCrosshairValues ] = useState([]);
    const { property_sales, land_values } = props.chartData;

    const getChartdata = (array) => {
      const getTimestamp = (date) => {
        const myDate = date.split("-");
        const newDate = new Date( myDate[0], myDate[1] - 1, myDate[2]);
        return newDate.getTime();
      };
      const newArray = array.map(item=>({ 
        x: getTimestamp(item.date), y: item.value 
      }));
      return newArray;
    };

    const size = useWindowSize();
    return (
      <div className='chart'>
        <div className='chart-title'>Sales and Landvalue Trend</div>
        <XYPlot height={size.width<982 ? 260 : 150} width={size.width<982 ? 550 : 340}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis
              tickFormat={(d)=>new Date(d).getFullYear()}
            />
            <YAxis
              tickFormat={v => v>9999999 ? ((v/1000000).toFixed(0))+"M" : v>999999 ? ((v/1000000).toFixed(1))+"M" : v/1000+"k"}
            />
            <LineSeries
              data={getChartdata(land_values)}
              onNearestXY={(value) => 
                  setCrosshairValues([ { x: value.x, y: value.y } ])
              }
            />
            <MarkSeries 
              data={getChartdata(property_sales)}
              color={"FDB813"}
              // onNearestXY={(value) => 
              //     setCrosshairValues([ { x: value.x, y: value.y } ])
              // }
              />
            <Crosshair values={crosshairValues}>
              <div className='chartInfo'>
                <div className='chartInfo_text'>{crosshairValues[0]&&crosshairValues[0].y} AUD</div>
              </div>
            </Crosshair>
        </XYPlot>
      </div>
    );
};

Chart.propTypes = {
  chartData: PropTypes.object
};

export default Chart;