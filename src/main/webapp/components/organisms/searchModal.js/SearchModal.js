import React from 'react'
import PropTypes from 'prop-types'
import './searchModal.scss'
import { IconMenu, IconMenu2 } from '../../../assets/icons'
import SearchItem from '../../molecules/searchItem/SearchItem'
import {points} from '../../../../../../contsants_temp'
import FilterButtonGroup from '../../molecules/filterButtonGroup/FilterButtonGroup'
import { useSelector, useDispatch } from 'react-redux'
import {showSearchModal, closeSearchModal} from '../../../store/actions/searchModalAction'

const SearchModal = props => {
    const searchModal = useSelector(state=>state.searchModal)
    const dispatch = useDispatch()

    const toggleFilter = () => {

    }
    const toggleSearch = () => {
        searchModal ? dispatch(closeSearchModal()) : dispatch(showSearchModal());
    }

    const renderResults = () => {
        return points.map((item,index)=>{
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
                        isActive={item.isActive}
                    />
        })
    }
    return (
        <div className='searchModalContainer'>
            <div className='searchModal'>
                <div className='searchModalHeader'>
                    {points&&points.length} Properties
                    {/* <div className='searchModalIcons'>
                        <IconMenu2/>
                        <div className='searchModalIconDevider'/>
                        <IconMenu/>
                    </div> */}
                </div>
                    <div className='searchListContainer'>{renderResults()}</div>
            </div>
            <div className='searchModalBtn'>
                <FilterButtonGroup onMenuClick={toggleSearch} onFilterClick = {toggleFilter}/>
            </div>
        </div>
    )
}

SearchModal.propTypes = {

}

export default SearchModal
