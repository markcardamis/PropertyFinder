import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./imageLazy.scss";
import { DEFAULT_HOUSE_IMAGE as placeHolder } from "../../../shared/constants";

const ImageLazy = ({ src, shadow }) => {
  const [ imageSrc, setImageSrc ] = useState(placeHolder);
  const [ imageRef, setImageRef ] = useState();

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRef && imageSrc === placeHolder) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: "75%",
          }
        );
        observer.observe(imageRef);
      } else {
        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      if (observer && observer.unobserve) {
        observer.unobserve(imageRef);
      }
    };
  });

  return <button className={`btnLazyImg ${shadow ? "darken" : ""}`}>
            <div className="lazyImgWrap">
              <img ref={setImageRef} src={imageSrc} className={`lazyImg ${shadow ? "darken" : ""}`}/>
            </div>
          </button>;
};

ImageLazy.propTypes = {
  src: PropTypes.string,
  shadow: PropTypes.bool
};

export default ImageLazy;