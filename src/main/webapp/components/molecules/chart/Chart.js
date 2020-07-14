// import React, { Component } from 'react';
// import '../../../../../../node_modules/react-vis/dist/style.css';
// import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair} from 'react-vis';
// import './chart.scss';
// import {useWindowSize} from '../../../modules/windowSize';

// class Chart extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         crosshairValues: []
//       };
//     }

//     getYear = (array) => {
//         return array.map(item => {
//             return item.slice(0, 4);
//         });
//     }

//   render() {
//     const {baseDate, landValue} = this.props.chartData;
//     const {crosshairValues} = this.state;
//     const data = [
//       {x: 0, y: landValue[0]},
//       {x: 1, y: landValue[1]},
//       {x: 2, y: landValue[2]},
//       {x: 3, y: landValue[3]},
//       {x: 4, y: landValue[4]},
//       {x: 5, y: landValue[5]}
//     ];
//     const dates = this.getYear(baseDate);
//     const size = useWindowSize();
//     return (
//       <div className='chart'>
//         <div className='chart-title'>Landvalue Trend</div>
//         <XYPlot height={size.width<680 ? size.height/4 : 110} width={size.width<680 ? size.width : 295}>
//             <HorizontalGridLines />
//             <VerticalGridLines />
//             <XAxis tickFormat={v => dates[v]}/>
//             <YAxis tickFormat={v => v>9999999 ? ((v/1000000).toFixed(0))+'M' : v>999999 ? ((v/1000000).toFixed(1))+'M' : v/1000+'k'}/>
//             <LineSeries
//               data={data}
//               onNearestX={(value) => 
//                   this.setState({crosshairValues: [{x: value.x, y: value.y}]})
//               }
//             /> 
//             <Crosshair values={crosshairValues}>
//               <div className='chartInfo'>
//                 <div className='chartInfo_text'>{crosshairValues[0]&&crosshairValues[0].y} AUD</div>
//               </div>
//             </Crosshair>
//         </XYPlot>
//       </div>
//     );
//   }
// }

// export default Chart;

import React, { Component, useState } from 'react';
import '../../../../../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries, HorizontalGridLines, VerticalGridLines, XAxis, YAxis, Crosshair} from 'react-vis';
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
      {x: 0, y: landValue[0]},
      {x: 1, y: landValue[1]},
      {x: 2, y: landValue[2]},
      {x: 3, y: landValue[3]},
      {x: 4, y: landValue[4]},
      {x: 5, y: landValue[5]}
    ];
    const dates = ()=>getYear(baseDate);
    const size = useWindowSize();
    return (
      <div className='chart'>
        <div className='chart-title'>Landvalue Trend</div>
        <XYPlot height={size.width<982 ? 160 : 110} width={size.width<982 ? 350 : 295}>
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