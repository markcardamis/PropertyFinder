import React from 'react'
import PropTypes from 'prop-types'
import PropImg from '../../atoms/propImg/PropImg'
import PropListItem from '../../molecules/propListItem/PropListItem'
import PropListItem2 from '../../molecules/propListItem2/PropListItem2'
import { DEFAULT_HOUSE_IMAGE, ADDRESS, AREA, ZONE, PRICE, PRICE_TO_LAND_VALUE, PRICE_PER_M2, LAND_VALUE, DESCRIPTION, BATHROOMS, BEDROOMS, CAR_SPACES, MINIMUM_LOT_SIZE, FLOOR_SPACE_RATIO } from '../../../shared/constants';
import {IconAreaG, IconAddressG, IconZoneG, IconPriceG, IconPriceLandG, IconLandvalG, IconPriceMg, IconClose, IconBathG, IconBedG, IconCarG, IconLotG, IconFsrG} from '../../../assets/icons'
import variables from '../../../styles/_variables.scss';
import ButtonSquare from '../../atoms/buttonSquare/ButtonSquare';
import DeviderLine from '../../atoms/deviderLine/DeviderLine';
import ButtonProperty from '../../atoms/buttonProperty/ButtonProperty';
import './searchItem.scss'

const SearchItem = props => {
    const {id, area, zone, address, bathrooms, bedrooms, carspaces, price, landValue, pricePSM, floorSpaceRatio, priceToLandValue, minimumLotSize, summaryDescription, listingURL} = props
    return (
        <div className='searchItem'>
           <PropImg width={'40%'} height={283} img={props.img} />
           <div className='searchItemInfo'>
                <PropListItem icon={address ? <IconAddressG/> : <IconAddressG color={variables.lightGrey}/>} title={ADDRESS} value11={`ID: ${id}`}/>
                <div className='propertyInformation-address'>{address}</div>
                <PropListItem2 
                    icon1={area ? <IconAreaG/> : <IconAreaG color={variables.lightGrey}/>} title1={AREA} value1={area}
                    icon2={zone ? <IconZoneG/> : <IconZoneG color={variables.lightGrey}/>} title2={ZONE} value2={zone}
                    />
                <PropListItem2 
                    icon1={bathrooms ? <IconBathG/> : <IconBathG color={variables.lightGrey}/>} 
                    title1={BATHROOMS} value1={bathrooms}
                    icon2={bedrooms ? <IconBedG/> : <IconBedG color={variables.lightGrey}/>} 
                    title2={BEDROOMS} value2={bedrooms}
                    />
                 <PropListItem2 
                    icon1={carspaces ? <IconCarG/> : <IconCarG color={variables.lightGrey}/>}
                    title1={CAR_SPACES} value1={carspaces}
                    icon2={floorSpaceRatio ? <IconFsrG/> : <IconFsrG color={variables.lightGrey}/>} 
                    title2={FLOOR_SPACE_RATIO} value2={floorSpaceRatio}
                    />
                <DeviderLine/>
                <PropListItem icon={price ? <IconPriceG/> : <IconPriceG color={variables.lightGrey}/>} title={PRICE} value14={price}/>
                <PropListItem2 
                    icon1={priceToLandValue ? <IconPriceLandG/> : <IconPriceLandG color={variables.lightGrey}/>} 
                    title1={PRICE_TO_LAND_VALUE} value1={priceToLandValue&&`${priceToLandValue}%`}
                    icon2={minimumLotSize ? <IconLotG/> : <IconLotG color={variables.lightGrey}/>} 
                    title2={MINIMUM_LOT_SIZE} value2={minimumLotSize}
                    />
                <PropListItem2 
                    icon1={pricePSM ? <IconPriceMg/> : <IconPriceMg color={variables.lightGrey}/>} 
                    title1={PRICE_PER_M2} value1={pricePSM}
                    icon2={landValue ? <IconLandvalG/> : <IconLandvalG color={variables.lightGrey}/>} 
                    title2={LAND_VALUE} value2={landValue}
                    />
                <div className='propertyInformation-margin10'/>
                <PropListItem title={DESCRIPTION} value14={' '}/>
                <div className='propertyInformation-descr'>{summaryDescription}</div>
                <ButtonProperty title={'GO TO PROPERTY'} url={listingURL}/>
            </div>
        </div>
    )
}

SearchItem.propTypes = {

}

export default SearchItem
