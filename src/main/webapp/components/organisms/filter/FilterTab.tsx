import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "rc-slider/assets/index.css";
import "rc-dropdown/assets/index.css";

import { ZONES } from "../../../shared/constants/zones";
import "./filter.scss";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import {
  IconArea,
  IconFsr,
  IconLandval,
  IconPrice,
  IconPriceM,
  IconZone,
  IconPost,
  IconLandOnly,
  IconNearBy,
  IconFence,
} from "../../../assets/icons";
import { getFilter, resetFilter } from "../../../store/actions/filterAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { showSearchArea } from "../../../store/actions/searchAreaBtnAction";
import { FilterLine } from "./FilterLine";
import { PostCode } from "./PostCode";
import { ZoneSelect } from "./ZoneSelect";
import { CheckboxFilterLine } from "../../molecules/checkboxFilterLine/CheckboxFilterLine";
import variables from "../../../styles/_variables.module.scss";

export interface FilterTabProps {
  onSubmit: () => void;
  onSaveFilter: () => void;
}

const FilterTab = ({ onSubmit, onSaveFilter }: FilterTabProps) => {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state);
  const {
    zone,
    postCode,
    area,
    floorspaceRatio,
    price,
    priceM2,
    priceLandvalue,
    streetFrontage,
    landOnly,
    nearbyDA,
  } = filter;

  const [zoneColor, setZoneColor] = useState(null);
  const [showValidation, setShowValidation] = useState(false);

  const handleSubmit = async () => {
    if (postCode.length !== 4 && postCode.length !== 0) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
      await dispatch(getFilter(filter));
      onSubmit();
      dispatch(closeFilter());
      dispatch(showSearchArea());
    }
  };

  const onSelect = ({ key }) => {
    dispatch(getFilter({ ...filter, zone: key }));
    const zoneColor = ZONES.filter((item) => item.name === key);
    setZoneColor(zoneColor[0].color);
  };

  const handleSaveFilter = async () => {
    if (postCode.length !== 4 && postCode.length !== 0) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
      await dispatch(getFilter(filter));
      onSaveFilter();
    }
  };

  return (
    <div className="filterTab">
      <div className="filterInputContainer">
        <ZoneSelect
          zone={zone}
          zoneColor={zoneColor}
          title22={"Zone"}
          icon={<IconZone />}
          onSelect={onSelect}
        />
        <PostCode
          title22={"Post Code"}
          icon={<IconPost />}
          value={postCode}
          showValidation={showValidation}
          onChange={(event) =>
            dispatch(getFilter({ ...filter, postCode: event.target.value }))
          }
        />
        <DeviderLine />
        <FilterLine
          title22={"Area"}
          icon={<IconArea />}
          value={area}
          step={100}
          showCurrency={false}
          onChange={(val) => dispatch(getFilter({ ...filter, area: val }))}
          min={0}
          max={20000}
          labelMin={"0"}
          labelMax={"20 000+"}
        />
        <FilterLine
          title22={"Floor Space Ratio"}
          icon={<IconFsr />}
          value={floorspaceRatio}
          step={0.1}
          showCurrency={false}
          onChange={(val) =>
            dispatch(getFilter({ ...filter, floorspaceRatio: val }))
          }
          min={0}
          max={2}
          labelMin={"0.0"}
          labelMax={"2.0+"}
        />
        <DeviderLine />
        <FilterLine
          title22={"Price"}
          icon={<IconPrice />}
          value={price}
          step={10000}
          showCurrency={true}
          onChange={(val) => dispatch(getFilter({ ...filter, price: val }))}
          min={100000}
          max={5000000}
          labelMin={"$100k"}
          labelMax={"$5M"}
        />
        <FilterLine
          title22={"Price per m²"}
          icon={<IconPriceM />}
          value={priceM2}
          step={10}
          showCurrency={true}
          onChange={(val) => dispatch(getFilter({ ...filter, priceM2: val }))}
          min={1}
          max={10000}
          labelMin={"$1"}
          labelMax={"$10 000+"}
        />
        <FilterLine
          title22={"Price to Land Value"}
          icon={<IconLandval />}
          value={priceLandvalue}
          step={0.1}
          showCurrency={false}
          onChange={(val) =>
            dispatch(getFilter({ ...filter, priceLandvalue: val }))
          }
          min={0}
          max={10}
          labelMin={"0.0"}
          labelMax={"10.0"}
        />
        <FilterLine
          title22={"Street Frontage"}
          icon={<IconFence />}
          value={streetFrontage}
          step={0.1}
          showCurrency={false}
          onChange={(val) =>
            dispatch(getFilter({ ...filter, streetFrontage: val }))
          }
          min={0}
          max={50}
          labelMin={"0.0"}
          labelMax={"50.0+"}
        />

        <div className="checkboxLine">
          <CheckboxFilterLine
            title="Land Only"
            icon={<IconLandOnly />}
            value={landOnly}
            onClick={() =>
              dispatch(getFilter({ ...filter, landOnly: !landOnly }))
            }
            style={{ paddingRight: "5px" }}
          />
          <CheckboxFilterLine
            title="Include nearby DA"
            icon={<IconNearBy color={variables.darkGrey} />}
            value={nearbyDA}
            onClick={() =>
              dispatch(getFilter({ ...filter, nearbyDA: !nearbyDA }))
            }
            style={{ paddingLeft: "5px" }}
          />
        </div>
      </div>
      <div className="filterBtnContainer">
        <ButtonOutlined
          title={"Reset filter"}
          onClick={() => dispatch(resetFilter())}
          style={{ width: "22%" }}
          titleStyle={{ color: variables.green }}
        />
        <ButtonOutlined
          title={"Save preferences"}
          onClick={handleSaveFilter}
          style={{ width: "22%" }}
        />
        <ButtonFilled
          title={"Search"}
          onClick={handleSubmit}
          style={{ width: "53%" }}
        />
      </div>
    </div>
  );
};

export default FilterTab;
