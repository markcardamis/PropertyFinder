import React from "react";

import "./propImg.scss";

export interface PropImgProps {
    img: string,
    height?: number,
    width?: number,
}

const PropImg = ({ img, height, width }: PropImgProps) => {
    return (
            <img src={img} className='propImg' style={{ height: height || 130, width: width || "100%" }}/>
    );
};

export default PropImg;
