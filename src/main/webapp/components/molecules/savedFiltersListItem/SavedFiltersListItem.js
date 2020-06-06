import React from 'react'
import PropTypes from 'prop-types'

import './savedFiltersListItem.scss'
import SavedFilterItem from '../../atoms/savedFilterItem/SavedFilterItem'
import { IconZoneG, IconAreaG, IconPriceG, IconPriceMg, IconLandvalG, IconFsrG, IconPostG, IconPencil, IconTrash } from '../../../assets/icons';

const SavedFiltersListItem = props => {
    const {data} = props
    return (
        <div className='savedFilters-filterItem'>
          <div className='savedFilters-filterHeader' style={{display: 'flex'}}>
            <div onClick={props.onSelect} className='savedFilters-filterTitle'>Filter {props.index}</div>
            <div className='savedFilterEdit'>
                <div onClick={props.onEdit} className='savedFilterEdit-icon'><IconPencil/></div>
                <div onClick={props.onDelete}><IconTrash/></div>
            </div>
          </div>
          <div onClick={props.onSelect} className={'savedFilters-propertiesList'}>
            <SavedFilterItem title={'Zone: '} value={data.propertyZone} icon={<IconZoneG/>} position={'first'}/>
            <SavedFilterItem title={'Area min: '} value={data.propertyAreaMin} icon={<IconAreaG/>} position={'first'}/>
            <SavedFilterItem title={'Area max: '} value={data.propertyAreaMax} icon={<IconAreaG/>} position={'first'}/>
            <SavedFilterItem title={'Price min: '} value={data.propertyPriceMin} icon={<IconPriceG/>} position={'first'}/>
            <SavedFilterItem title={'Price max: '} value={data.propertyPriceMax} icon={<IconPriceG/>} position={'first'}/>
            <SavedFilterItem title={'Price per m2 min: '} value={data.propertyPricePSMMin} icon={<IconPriceMg/>} position={'first'}/>
            <SavedFilterItem title={'Price per m2 max: '} value={data.propertyPricePSMMax} icon={<IconPriceMg/>} position={'first'}/>
            <SavedFilterItem title={'Post code: '} value={data.propertyPostCode} icon={<IconPostG/>} position={'first'}/>
            <SavedFilterItem title={'Price to landvalue min: '} value={data.propertyPriceToLandValueMin} icon={<IconLandvalG/>} position={'first'}/>
            <SavedFilterItem title={'Price to landvalue max: '} value={data.propertyPriceToLandValueMax} icon={<IconLandvalG/>} position={'first'}/>
            <SavedFilterItem title={'Floorspace ratio min: '} value={data.propertyFloorSpaceRatioMin} icon={<IconFsrG/>} position={'first'}/>
            <SavedFilterItem title={'Floorspace ratio max: '} value={data.propertyFloorSpaceRatioMax} icon={<IconFsrG/>} position={'first'}/>
          </div>   
        </div>
    )
}

SavedFiltersListItem.propTypes = {

}

export default SavedFiltersListItem
