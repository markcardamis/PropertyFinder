import React from 'react'
import PropTypes from 'prop-types'
import './searchModal.scss'
import { IconMenu, IconMenu2 } from '../../../assets/icons'
import SearchItem from '../../molecules/searchItem/SearchItem'
import {data} from './data'

const SearchModal = props => {

    const renderResults = () => {
        return data.map((item,index)=>{
            return <SearchItem
                    key={index}
                    id={item.id}
                    area={item.area}
                    zone={item.zone}
                    address={item.address}
                    postCode={item.postCode}
                    bathrooms={item.bathrooms}
                    bedrooms={item.bedrooms}
                    carspaces={item.carspaces}
                    zone={item.zone}
                    price={item.price}
                    pricePSM={item.pricePSM}
                    landValue={item.landValue}
                    priceToLandValue={item.priceToLandValue}
                    floorSpaceRatio={item.floorSpaceRatio}
                    summaryDescription={item.summary_description}
                    img={item.listing_photo}
                    listingUrl={item.listing_url}
                    />
        })
    }
    return (
        <div className='searchModal'>
            <div className='searchModalHeader'>
                {data&&data.length} Properties
                <div className='searchModalIcons'>
                    <IconMenu2/>
                    <div className='searchModalIconDevider'/>
                    <IconMenu/>
                </div>
            </div>
            <div className='searchModalContainer'>{renderResults()}</div>
        </div>
    )
}

SearchModal.propTypes = {

}

export default SearchModal
