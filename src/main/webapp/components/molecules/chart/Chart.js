import React, { useState } from 'react';
import '../../../../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair, MarkSeries} from 'react-vis';
import './chart.scss';
import {useWindowSize} from '../../../modules/windowSize';

const Chart = (props) => {
    const [crosshairValues, setCrosshairValues] = useState([])

    const getYear = (array) => {
        return array.map(item => {
            return item.slice(0, 4);
        });
    }

    const {baseDate, landValue} = props.chartData;
    const data = [
      {x: 0, y: landValue[0]!== null ? landValue[0] : Math.min(landValue)},
      {x: 1, y: landValue[1]!== null ? landValue[1] : Math.min(landValue)},
      {x: 2, y: landValue[2]!== null ? landValue[2] : Math.min(landValue)},
      {x: 3, y: landValue[3]!== null ? landValue[3] : Math.min(landValue)},
      {x: 4, y: landValue[4]!== null ? landValue[4] : Math.min(landValue)},
      {x: 5, y: landValue[5]!== null ? landValue[5] : Math.min(landValue)}
    ];
    const salesData = [
      {x: 0, y: props.salesData[0].purchasePrice},
      {x: 1, y: props.salesData[1].purchasePrice}
    ]
    const dates = getYear(baseDate);
    const size = useWindowSize();
    return (
      <div className='chart'>
        {console.log(getYear(baseDate))}
        <div className='chart-title'>Sales and Landvalue Trend</div>
        <XYPlot height={size.width<982 ? 260 : 110} width={size.width<982 ? 600 : 340}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis tickFormat={v => dates[v]}/>
            <YAxis tickFormat={v => v>9999999 ? ((v/1000000).toFixed(0))+'M' : v>999999 ? ((v/1000000).toFixed(1))+'M' : v/1000+'k'}/>
            <LineSeries
              data={data}
              onNearestX={(value) => 
                  setCrosshairValues([{x: value.x, y: value.y}])
              }
            />
            {/* <LineSeries
              data={salesData}
              color={'FDB813'}
              // onNearestX={(value) => 
              //     setCrosshairValues([{x: value.x, y: value.y}])
              //}
            />  */}
            <MarkSeries 
              data={salesData}
              color={'FDB813'}/>
            <Crosshair values={crosshairValues}>
              <div className='chartInfo'>
                <div className='chartInfo_text'>{crosshairValues[0]&&crosshairValues[0].y} AUD</div>
              </div>
            </Crosshair>
        </XYPlot>
      </div>
    );
}

export default Chart;