import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FilterModal from "../components/organisms/filterModal/FilterModal";
import Layout from "../components/organisms/layout/Layout";
import MapGL from "../components/organisms/map/MapGL";
import PropertyInformation from "../components/organisms/propertyInformation/PropertyInformation";
import SaveModal from "../components/organisms/saveModal/SaveModal";
import SearchModal from "../components/organisms/searchModal/SearchModal";
import { closeFilter } from "../store/actions/filterModalAction";
import { closeProperty } from "../store/actions/propertyModalAction";
import { closeSaveModal, saveNotification } from "../store/actions/saveModalAction";


const Home = () => {
  const dispatch = useDispatch();
  const filterModal = useSelector(state=>state.filterModal);
  const propertyModal = useSelector(state=>state.propertyModal.isHidden);
  const showSave = useSelector(state=>state.saveModal.showModal);
  const searchModal = useSelector(state=>state.searchModal);

  const handleCloseFilter = () => {
    dispatch(closeFilter());
  }; 

  const handleClosePropertyInfo = () => {
    dispatch(closeProperty());
};


  const handleSaveNotification = (name, frequency) => {
    dispatch(saveNotification(name, frequency));
  };

    return (
      <Layout>
          {filterModal && <FilterModal handleCloseFilter={handleCloseFilter}/>}
          {showSave&&<SaveModal onCloseClick={()=>dispatch(closeSaveModal())} onSaveClick={handleSaveNotification}/>}
          {!filterModal && propertyModal && <PropertyInformation handleClosePropertyInfo={handleClosePropertyInfo}/>}
          {searchModal&&<SearchModal onCloseClick={()=>dispatch(closeSearchModal())}/>}
          <MapGL/>
      </Layout>
    );
};

export default Home;

