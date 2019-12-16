import React from 'react'; 

export const onlyNumber = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined;
export const maxValue = max => value => value && value > max ? `Must be not greater then ${max}` : undefined;


export const renderField = ({ input, label, type, placeholder, style, meta: { touched, error} }) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input {...input} type={type} placeholder={placeholder? placeholder : ''} style={style ? style : undefined}/>
      {touched && (error && <p>{error}</p>)}
    </div>
  </div>
);