import React from 'react'
import PropTypes from 'prop-types'
import './searchModal.scss'
import { IconMenu, IconMenu2 } from '../../../assets/icons'
import SearchItem from '../../molecules/searchItem/SearchItem'

const property = [{"id":4022947,"price":"Expressions of Interest","listingURL":"https://www.domain.com.au/50-52-marsh-parade-casula-nsw-2170-2016257126","listingPhoto":"https://bucket-api.domain.com.au/v1/bucket/image/2016257126_1_1_200513_123857-w1920-h1080","address":"50-52 MARSH PARADE CASULA 2170","unitNumber":"","houseNumber":"50-52","streetName":"Marsh Parade","suburbName":"","postCode":"2170","area":1506,"bathrooms":2.0,"bedrooms":7.0,"carspaces":4,"latitude":-33.9469452,"longitude":150.911163,"summaryDescription":"community first real estate are proud to offer 50 & 52 marsh parade casula to the market. situated in one of the most convenient pockets of casula, only 650m to casula station and 3km from the liverpool cbd, this da approved developmen...","zone":null,"floorSpaceRatio":null,"minimumLotSize":null,"landValue":null,"pricePSM":null,"priceToLandValue":null}]

const SearchModal = props => {

    const renderResults = () => {
        return property.map((item,index)=>{
            return <SearchItem
                    key={index}
                    id={item.id}
                    area={item.area}
                    zone={item.zone}
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
                    summaryDescription={item.summaryDescription}
                    img={item.listingPhoto}
                    listingUrl={item.listingURL}
                    />
        })
    }
    return (
        <div className='searchModal'>
            <div className='searchModalHeader'>
                +450000 Properties
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
