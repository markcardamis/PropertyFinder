import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "rc-slider/assets/index.css";
import "rc-dropdown/assets/index.css";

import { ZONES } from "../../../shared/constants/zones";
import "./parcelSearch.scss";
import { FilterLine, ZoneSelect, PostCode } from "./components";
import DeviderLine from "../../atoms/deviderLine/DeviderLine";
import ButtonFilled from "../../atoms/buttonFilled/ButtonFilled";
import {
  IconArea,
  IconFsr,
  IconPrice,
  IconZone,
  IconPost,
  IconBuildingHeight,
  IconLandOnly,
  IconNearBy,
  IconFence,
} from "../../../assets/icons";
import {
  setParcelFilter,
  resetParcelFilter,
} from "../../../store/actions/parcelSearchAction/setParcelFilter";
import { applyParcelSearch } from "../../../store/actions/parcelSearchAction/parcelSearchAction";
import { closeFilter } from "../../../store/actions/filterModalAction";
import { CheckboxFilterLine } from "../../molecules/checkboxFilterLine/CheckboxFilterLine";
import variables from "../../../styles/_variables.module.scss";
import ButtonOutlined from "../../atoms/buttonOutlined/ButtonOutlined";
import { map } from "../../organisms/map/MapGL";

export interface Parcel {
  zone: number;
  area: number;
  postCode: number;
  buildingHeight: number;
  floorspaceRatio: number;
  landValue: number;
  landOnly: boolean;
  nearbyDA: boolean;
  streetFrontage: number;
}

const ParcelSearch = () => {
  const { parcelSearch, viewport } = useSelector(state => state)
  const { latitude, longitude } = viewport;
  const {
    zone,
    area,
    postCode,
    buildingHeight,
    floorspaceRatio,
    landValue,
    landOnly,
    nearbyDA,
    streetFrontage,
  } = parcelSearch;

  const dispatch = useDispatch();

  const onSelect = ({ key }) => {
    dispatch(setParcelFilter({ ...parcelSearch, zone: key }));
    let zoneColor = ZONES.filter((item) => {
      return item.name === key;
    });
    setZoneColor(zoneColor[0].color);
  };
  const [zoneColor, setZoneColor] = useState(null);

  const handleSubmit = async () => {
    await dispatch(applyParcelSearch());
    map.current.flyTo({ center: [longitude, latitude], zoom: 16 });
    dispatch(closeFilter());
  };

  const handleResetFilter = () => {
    dispatch(resetParcelFilter());
    // remove parcels
    map.current.setFilter("nsw-property-highlighted", ["in", "propid", ""]);
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
          showValidation={false}
          onChange={(event) =>
            dispatch(setParcelFilter({ ...parcelSearch, postCode: event.target.value }))
          }
        />
        <DeviderLine />

        <FilterLine
          title22={"Area"}
          icon={<IconArea />}
          value={area}
          step={100}
          showCurrency={false}
          onChange={(val) => dispatch(setParcelFilter({ ...parcelSearch, area: val }))}
          min={0}
          max={20000}
          labelMin={"0"}
          labelMax={"20 000+"}
        />

        <FilterLine
          title22={"Building Height"}
          icon={<IconBuildingHeight />}
          value={buildingHeight}
          step={1}
          showCurrency={false}
          onChange={(val) =>
            dispatch(setParcelFilter({ ...parcelSearch, buildingHeight: val }))
          }
          min={0}
          max={100}
          labelMin={"0"}
          labelMax={"100+"}
        />

        <FilterLine
          title22={"Floor Space Ratio"}
          icon={<IconFsr />}
          value={floorspaceRatio}
          step={0.1}
          showCurrency={false}
          onChange={(val) =>
            dispatch(setParcelFilter({ ...parcelSearch, floorspaceRatio: val }))
          }
          min={0}
          max={2}
          labelMin={"0.0"}
          labelMax={"2.0+"}
        />
        <DeviderLine />

        <FilterLine
          title22={"Land Value"}
          icon={<IconPrice />}
          value={landValue}
          step={10000}
          showCurrency={true}
          onChange={(val) =>
            dispatch(setParcelFilter({ ...parcelSearch, landValue: val }))
          }
          min={100000}
          max={5000000}
          labelMin={"$100k"}
          labelMax={"$5M"}
        />

        <FilterLine
          title22={"Street Frontage"}
          icon={<IconFence />}
          value={streetFrontage}
          step={0.1}
          showCurrency={false}
          onChange={(val) =>
            dispatch(setParcelFilter({ ...parcelSearch, streetFrontage: val }))
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
              dispatch(setParcelFilter({ ...parcelSearch, landOnly: !landOnly }))
            }
            style={{ paddingRight: "5px" }}
          />
          <CheckboxFilterLine
            title="Include nearby DA"
            icon={<IconNearBy color={variables.darkGrey} />}
            value={nearbyDA}
            onClick={() =>
              dispatch(setParcelFilter({ ...parcelSearch, nearbyDA: !nearbyDA }))
            }
            style={{ paddingLeft: "5px" }}
          />
        </div>
      </div>

      <div className="filterBtnContainer">
        <ButtonOutlined
          title={"Reset filter"}
          onClick={handleResetFilter}
          style={{ width: "22%" }}
          titleStyle={{ color: variables.green }}
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

export default ParcelSearch;
