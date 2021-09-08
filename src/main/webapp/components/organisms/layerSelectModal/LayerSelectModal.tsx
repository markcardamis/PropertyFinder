import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import PopupContainer from "../../molecules/popupContainer/PopupContainer";
import "./layerSelectModal.scss";
import { toggleLayer, closeLayersModal } from "../../../store/actions/layersAction";
import { useWindowSize } from "../../../hooks/windowSize";
import { map } from "../../organisms/map/MapGL";

const LayerSelectModal = () => {
    const dispatch = useDispatch();
    const layers = useSelector(state=>state.layers);
    const node = useRef();
    const windowSize = useWindowSize();

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
          document.removeEventListener("click", handleClick);
        };
      }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          return;
        }
        dispatch(closeLayersModal());
      };

    const toggleLayers = (layerName, layer) => {
        dispatch(toggleLayer(layer));
        map.setLayoutProperty(layerName, "visibility", layers[layer] ? "none" : "visible");
    };

    return (
        <div ref={node}>
            <PopupContainer 
                style={{ left: 12, top: windowSize.width < 982 ? 120 : 80, width: windowSize.width < 982 ? "auto" : 170, zIndex: 3 }}
                tipStyle={{ right: "45%", boxShadow: "3px 10px 0px 2px rgba(0, 0, 0, 0.03)" }}
                >
                <div 
                    className={`layerName ${layers.landZoning ? "active" : ""}`} 
                    onClick={()=>toggleLayers("nswlandzoning", "landZoning")}
                    >
                        Land zoning
                </div>
                <div
                    className={`layerName ${layers.floorSpaceRatio ? "active" : ""}`}
                    onClick={()=>toggleLayers("nswfloorspaceratio", "floorSpaceRatio")}
                    >
                        Floor space ratio
                </div>
                <div 
                    className={`layerName ${layers.heightOfBuilding ? "active" : ""}`} 
                    onClick={()=>toggleLayers("nswheightofbuilding", "heightOfBuilding")}
                    >
                        Height of building
                </div>
                <div 
                    className={`layerName ${layers.lotsize ? "active" : ""}`} 
                    onClick={()=>toggleLayers("nswlotsize", "lotsize")}
                    >
                        Lot Size
                </div>
                <div 
                    className={`layerName ${layers.heritage ? "active" : ""}`} 
                    onClick={()=>toggleLayers("nswheritage", "heritage")}
                    >
                        Heritage
                </div>
                <div 
                    className={`layerName ${layers.mobileInternet ? "active" : ""}`} 
                    onClick={()=>toggleLayers("mobile-internet", "mobileInternet")}
                    >
                        Mobile Internet
                </div>
            </PopupContainer>
        </div>
    );
};

export default LayerSelectModal;
