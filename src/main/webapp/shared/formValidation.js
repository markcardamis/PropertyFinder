import React from 'react'; 

export const onlyNumber = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const minValue = min => value => value && value < min ? `Must be at least ${min}` : undefined;
export const maxValue = max => value => value && value > max ? `Must be not greater then ${max}` : undefined;

export const minValue0 = minValue(0);
export const maxValue1000000 = maxValue(1000000);
export const maxValue50000000 = maxValue(50000000);
export const maxValue9999 = maxValue(9999);
export const maxValue999 = maxValue(999.90);
export const maxValue99 = maxValue(99);

export const renderField = ({ input, label, type, placeholder, style, meta: { touched, error} }) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input {...input} type={type} placeholder={placeholder? placeholder : ''} style={style ? style : undefined}/>
      {touched && (error && <p>{error}</p>)}
    </div>
  </div>
);