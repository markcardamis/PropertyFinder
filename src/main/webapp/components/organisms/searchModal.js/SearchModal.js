import React from 'react'
import PropTypes from 'prop-types'
import './searchModal.scss'
import SearchItem from '../../molecules/searchItem/SearchItem'
import {points} from '../../../../../../contsants_temp'
import FilterButtonGroup from '../../molecules/filterButtonGroup/FilterButtonGroup'
import { useSelector, useDispatch } from 'react-redux'
import {showSearchModal, closeSearchModal} from '../../../store/actions/searchModalAction'

const SearchModal = props => {
    const searchModal = useSelector(state=>state.searchModal)
    const properties = useSelector(state=>state.mapMarker)
    const dispatch = useDispatch()

    const toggleFilter = () => {

    }
    const toggleSearch = () => {
        searchModal ? dispatch(closeSearchModal()) : dispatch(showSearchModal());
    }

    const renderResults = () => {
        return properties.map((item,index)=>{
            return <SearchItem
                        key={index}
                        marker={item}
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
                        isActive={item.isActive}
                    />
        })
    }
    return (
        <div className='searchModalContainer'>
            <div className='searchModal'>
                {console.log(properties)}
                <div className='searchModalHeader'>
                    {properties&&properties.length} Properties
                </div>
                    <div className='searchListContainer'>{renderResults()}</div>
            </div>
        </div>
    )
}

SearchModal.propTypes = {

}

export default SearchModal
