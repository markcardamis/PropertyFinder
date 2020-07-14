import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'
import './searchModal.scss'
import SearchItem from '../../molecules/searchItem/SearchItem'
import {points} from '../../../../../../contsants_temp'
import FilterButtonGroup from '../../molecules/filterButtonGroup/FilterButtonGroup'
import { useSelector, useDispatch } from 'react-redux'
import {showSearchModal, closeSearchModal} from '../../../store/actions/searchModalAction'
import { IconClose, IconCloseMobile } from '../../../assets/icons'

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
                    />
        })
    }
    return (
        <Fade>
            <div className='searchModalContainer'>
                <div className='searchModal'>
                    <div className='searchModalHeader'>
                        {properties&&properties.length} Properties
                        <div className='searchHeaderClose' onClick={()=>dispatch({type: 'CLOSE_SEARCH_MODAL'})}>
                           <IconCloseMobile size={0.8}/>
                        </div>
                    </div>
                        <div className='searchListContainer'>{renderResults()}</div>
                </div>
            </div>
        </Fade>
    )
}

SearchModal.propTypes = {

}

export default SearchModal
