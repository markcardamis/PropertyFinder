import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {useDispatch, useSelector} from 'react-redux'

import PopupContainer from '../../molecules/popupContainer/PopupContainer'
import './layerSelectModal.scss'
import { toggleLayer, closeLayersModal } from '../../../store/actions/layersAction'
import { useWindowSize } from '../../../modules/windowSize'

const LayerSelectModal = props => {
    const dispatch = useDispatch();
    const layers = useSelector(state=>state.layers)
    const node = useRef();
    const windowSize = useWindowSize()

    useEffect(() => {
        document.addEventListener("mousedown", handleClick);
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      }, []);

    const handleClick = e => {
        if (node.current.contains(e.target)) {
          return;
        }
        dispatch(closeLayersModal())
      }

    return (
        <div ref={node}>
            <PopupContainer 
                style={{left: 12, top: windowSize.width < 982 ? 120 : 80, width: windowSize.width < 982 ? 'auto' : 170, zIndex: 3}}>
                <div 
                    className={`layerName ${layers.landZoning ? 'active' : ''}`} 
                    onClick={()=>dispatch(toggleLayer('landZoning'))}
                    >
                        Land zoning
                    </div>
                <div
                    className={`layerName ${layers.floorSpaceRatio ? 'active' : ''}`}  
                    onClick={()=>dispatch(toggleLayer('floorSpaceRatio'))}
                    >
                        Floor space ratio
                    </div>
                <div 
                    className={`layerName ${layers.heightOfBuilding ? 'active' : ''}`} 
                    onClick={()=>dispatch(toggleLayer('heightOfBuilding'))}
                    >
                        Height of building
                    </div>
                <div 
                    className={`layerName ${layers.heritage ? 'active' : ''}`} 
                    onClick={()=>dispatch(toggleLayer('heritage'))}
                    >
                        Heritage
                    </div>
            </PopupContainer>
        </div>
    )
}

LayerSelectModal.propTypes = {

}

export default LayerSelectModal
