import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.title}
      </Typography>
      <Slider
        value={props.value}
        onChange={props.onChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={props.min}
        max={props.max}
        step={props.step}
        // valueLabelFormat = {}
        marks={[{value: props.min, label: props.labelMin},{value: props.max, label: props.labelMax}]}
      />
    </div>
  );
}