import React, { useState, useEffect, SyntheticEvent } from "react";
import { useSelector } from "react-redux";

import "./savedFiltersListItem.scss";
import SavedFilterItem from "../../atoms/savedFilterItem/SavedFilterItem";
import {
  IconZoneG,
  IconAreaG,
  IconPriceG,
  IconPriceMg,
  IconLandvalG,
  IconFsrG,
  IconPostG,
  IconPencil,
  IconTrash,
  IconBellOff,
  IconBell7,
  IconBell1,
  IconBell30,
  IconLandOnly,
  IconFence,
} from "../../../assets/icons";
import variables from "../../../styles/_variables.module.scss";

export interface SavedFiltersListItemProps {
  onSelect: (e: SyntheticEvent) => void;
  onChangeFrequency: (e: SyntheticEvent) => void;
  onEdit: (e: SyntheticEvent) => void;
  onDelete: (e: SyntheticEvent) => void;
  data: {
    title: string,
    frequency: string,
    propertyZone: string,
    propertyAreaMin: string,
    propertyAreaMax: string,
    streetFrontageMin: string,
    streetFrontageMax: string,
    propertyPriceMin: string,
    propertyPriceMax: string,
    propertyPricePSMMin: string,
    propertyPricePSMMax: string,
    propertyPostCode: string,
    propertyPriceToLandValueMin: string,
    propertyPriceToLandValueMax: string,
    propertyFloorSpaceRatioMin: string,
    propertyFloorSpaceRatioMax: string,
    landOnly: string,
  };
}

const SavedFiltersListItem = ({
  onSelect,
  onChangeFrequency,
  onEdit,
  onDelete,
  data,
}: SavedFiltersListItemProps) => {
  const { notifications } = useSelector((state) => state);
  const [frequency, setFrequency] = useState(data.frequency);

  useEffect(() => {
    const item = notifications.filter((item) => item.id === data.id);
    setFrequency(item[0].frequency);
  });

  const notificationIcon =
    frequency == "DAILY" ? (
      <IconBell1 />
    ) : frequency == "WEEKLY" ? (
      <IconBell7 />
    ) : frequency == "MONTHLY" ? (
      <IconBell30 />
    ) : (
      <IconBellOff />
    );

  return (
    <div className="savedFilters-filterItem" onClick={onSelect}>
      <div className="savedFilters-filterHeader" style={{ display: "flex" }}>
        <div onClick={onSelect} className="savedFilters-filterTitle">
          {data.title ? data.title : "Untitled"}
        </div>
        <div className="savedFilterEdit">
          <div onClick={onChangeFrequency} className="savedFilterEdit-icon">
            {notificationIcon}
          </div>
          <div onClick={onEdit} className="savedFilterEdit-icon">
            <IconPencil />
          </div>
          <div onClick={onDelete}>
            <IconTrash />
          </div>
        </div>
      </div>
      <div onClick={onSelect} className={"savedFilters-propertiesList"}>
        <SavedFilterItem
          title={"Zone: "}
          value={data.propertyZone}
          icon={<IconZoneG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Area min: "}
          value={data.propertyAreaMin}
          icon={<IconAreaG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Area max: "}
          value={data.propertyAreaMax}
          icon={<IconAreaG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Street Frontage min: "}
          value={data.streetFrontageMin}
          icon={<IconFence color={variables.green} />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Street Frontage max: "}
          value={data.streetFrontageMax}
          icon={<IconFence color={variables.green} />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Price min: "}
          value={data.propertyPriceMin}
          icon={<IconPriceG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Price max: "}
          value={data.propertyPriceMax}
          icon={<IconPriceG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Price per m2 min: "}
          value={data.propertyPricePSMMin}
          icon={<IconPriceMg />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Price per m2 max: "}
          value={data.propertyPricePSMMax}
          icon={<IconPriceMg />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Post code: "}
          value={data.propertyPostCode}
          icon={<IconPostG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Price to landvalue min: "}
          value={data.propertyPriceToLandValueMin}
          icon={<IconLandvalG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Price to landvalue max: "}
          value={data.propertyPriceToLandValueMax}
          icon={<IconLandvalG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Floorspace ratio min: "}
          value={data.propertyFloorSpaceRatioMin}
          icon={<IconFsrG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Floorspace ratio max: "}
          value={data.propertyFloorSpaceRatioMax}
          icon={<IconFsrG />}
          position={"first"}
        />
        <SavedFilterItem
          title={"Land only: "}
          value={data.landOnly && data.landOnly.toString()}
          icon={<IconLandOnly color={variables.green} />}
          position={"first"}
        />
      </div>
    </div>
  );
};

export default SavedFiltersListItem;
