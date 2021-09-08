import React, { ReactNode } from "react";
import "./filter.scss";
import PropListTitle from "../../atoms/propListTitle/PropListTitle";
import Slider from "../../atoms/slider/Slider";

export interface FilterLineProps {
    value: [number, number];
    onChange: () => void;
    min: number;
    max: number;
    step: number;
    labelMin: string;
    labelMax: string;
    showCurrency: boolean;
    icon: ReactNode;
    title22: string;
}

export const FilterLine = ({ title22, icon, value, onChange, max, min, labelMax, labelMin, step, showCurrency }: FilterLineProps) => {
    return <div className='filterLine'>
                <PropListTitle title22={title22} icon={icon} />
                <Slider
                    value={value}
                    onChange={onChange}
                    min={min}
                    max={max}
                    step={step}
                    labelMin={labelMin}
                    labelMax={labelMax}
                    showCurrency={showCurrency}
                    style={{ width: "50%" }}
                    />
            </div>;
};