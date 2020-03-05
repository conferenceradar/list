import React from "react";
import { statusColors } from "./utils/colors";

import {
  ButtonGroupWrapper,
  ToggleButton,
  DropdownWrapper,
  IconWrapperLarge,
  SecondaryButtonGroup,
  Spacer,
  Row,
  Column
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
      <Row style={{ marginTop: 24}}>
        <Column>
        <p style={{ marginLeft: 20 }}>Conference Radar helps you keep track of conference cancellations.  </p>
        </Column>
        <Column className="right">
          {!showForm ? (
            <ButtonGroupWrapper className="field has-addons">
              <SecondaryButtonGroup>
                <ToggleButton
                  onClick={() => {
                    onChangeFilter("");
                  }}
                  className={`button`}
                >
                  <span
                    style={{
                      borderBottom: `1px solid`
                    }}
                  >
                    All
                  </span>
                </ToggleButton>

                <ToggleButton
                  onClick={() => {
                    onChangeFilter("cancelled");
                  }}
                  className={`cancelled button`}
                >
                  <span
                    style={{
                      borderBottom: `1px solid ${statusColors.cancelled}`
                    }}
                  >
                    Cancelled
                  </span>
                </ToggleButton>
                <ToggleButton
                  onClick={() => {
                    onChangeFilter("postponed");
                  }}
                  className={`postponed button`}
                >
                  <span
                    style={{
                      borderBottom: `1px solid ${statusColors.postponed}`
                    }}
                  >
                    Postponed
                  </span>
                </ToggleButton>
                <ToggleButton
                  onClick={() => {
                    onChangeFilter("happening");
                  }}
                  className={`happening button`}
                >
                  <span
                    style={{
                      borderBottom: `1px solid ${statusColors.happening}`
                    }}
                  >
                    Still happening
                  </span>
                </ToggleButton>
                <ToggleButton
                  onClick={() => {
                    onChangeFilter("noInfo");
                  }}
                  className={`noInfo button`}
                >
                  <span
                    style={{
                      borderBottom: `1px solid ${statusColors.postponed}`
                    }}
                  >
                    No Info
                  </span>
                </ToggleButton>
              </SecondaryButtonGroup>
            </ButtonGroupWrapper>
          ) : (
            <ButtonGroupWrapper />
          )}
        </Column>
      </Row>
  );
};

export default ButtonGroup;
