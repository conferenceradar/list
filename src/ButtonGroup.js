import React from "react";
import { statusColors } from "./utils/colors";

import {
  ButtonGroupWrapper,
  ToggleButton,
  DropdownWrapper,
  IconWrapperLarge,
  SecondaryButtonGroup
} from "./styles";

const ButtonGroup = ({
  onChangeData,
  onChangeFilter,
  selectedDropdownItem,
  selectedTab,
  toggleForm,
  isMobile,
  items,
  toggleShare,
  showShare,
  showForm
}) => {
  return (
    <ButtonGroupWrapper className="field has-addons">
      <div className="control">
        <DropdownWrapper
          className={`button select ${selectedTab === "main" && "is-primary"}`}
          onClick={() => onChangeFilter("")}
        >
          <select
            className="select"
            onChange={e => {
              onChangeData(e.target.value);
            }}
            defaultValue={selectedDropdownItem}
          >
            {items.map(item => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </DropdownWrapper>
      </div>
      {!isMobile && (
        <SecondaryButtonGroup className="field has-addons">
          <ToggleButton
            onClick={toggleForm}
            className={`button ${showForm ? "is-primary" : ""}`}
          >
            Add Event
          </ToggleButton>
        </SecondaryButtonGroup>
      )}

      <SecondaryButtonGroup>
        <ToggleButton
          onClick={() => {
            onChangeFilter("cancelled");
          }}
          className={`cancelled button ${showForm ? "is-primary" : ""}`}
        >
          <span style={{ borderBottom: `1px solid ${statusColors.cancelled}` }}>
            Cancelled
          </span>
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            onChangeFilter("postponed");
          }}
          className={`postponed button ${showForm ? "is-primary" : ""}`}
        >
          <span style={{ borderBottom: `1px solid ${statusColors.postponed}` }}>
          Postponed
          </span>
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            onChangeFilter("happening");
          }}
          className={`happening button ${showForm ? "is-primary" : ""}`}
        >
          <span style={{ borderBottom: `1px solid ${statusColors.happening}` }}>
            Still happening
          </span>
        </ToggleButton>
        <ToggleButton
          onClick={() => {
            onChangeFilter("noInfo");
          }}
          className={`noInfo button ${showForm ? "is-primary" : ""}`}
        >
          <span style={{ borderBottom: `1px solid ${statusColors.postponed}` }}>
          No Info
          </span>
        </ToggleButton>
      </SecondaryButtonGroup>
    </ButtonGroupWrapper>
  );
};

export default ButtonGroup;
