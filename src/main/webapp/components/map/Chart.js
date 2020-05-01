import React, { Component } from 'react';
import '../../../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair} from 'react-vis';

class Chart extends Component {
    constructor(props) {
      super(props);
      this.state = {
        crosshairValues: []
      };
    }

    getYear = (array) => {
        return array.map(item => {
            return item.slice(0, 4);
        });
    }

  render() {
    const {baseDate, landValue} = this.props.data;
    const {crosshairValues} = this.state;
    const data = [
      {x: 0, y: landValue[0]},
      {x: 1, y: landValue[1]},
      {x: 2, y: landValue[2]},
      {x: 3, y: landValue[3]},
      {x: 4, y: landValue[4]},
    ];
    const dates = this.getYear(baseDate);
    return (
      <div className='chart'>
        <XYPlot height={130} width={220}>
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis tickFormat={v => dates[v]}/>
            <YAxis tickFormat={v => v>999999 ? (v/1000000).toFixed(1)+'M' : v/1000+'k'}/>
            <LineSeries
              data={data}
              onNearestX={(value) => 
                  this.setState({crosshairValues: [{x: value.x, y: value.y}]})
              }
            /> 
            <Crosshair values={crosshairValues}>
              <div className='chartInfo'>
                <div className='chartInfo_text'>{crosshairValues[0]&&crosshairValues[0].y} AUD</div>
              </div>
            </Crosshair>
        </XYPlot>
      </div>
    );
  }
}

export default Chart;