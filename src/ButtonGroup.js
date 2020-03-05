import React from "react";
import { statusColors } from "./utils/colors";
import DateRange from "react-daterange-picker";
import "react-daterange-picker/dist/css/react-calendar.css";
import {
  ButtonGroupWrapper,
  ToggleButton,
  DropdownWrapper,
  IconWrapperLarge,
  SecondaryButtonGroup,
  Spacer,
  Row,
  Column,
  DateFilterWrapper
} from "./styles";

import moment from 'moment';

export default class ButtonGroup extends React.Component {
  state = { showDates: false };
  render() {
    const {
      onChangeData,
      onChangeFilter,
      selectedDropdownItem,
      selectedTab,
      toggleForm,
      isMobile,
      items,
      toggleShare,
      showShare,
      showForm,
      startDate,
      endDate,
      setDates
    } = this.props;
    return (
      <Row style={{ marginTop: 24 }}>
        <Column>
          <p style={{ marginLeft: 20 }}>
            Conference Radar helps you keep track of conference cancellations.{" "}
          </p>
        </Column>
        <Column className="right">
          {!showForm ? (
            <ButtonGroupWrapper className="field has-addons">
              <DateFilterWrapper>
                <ToggleButton
                  onClick={() => {
                    this.setState(previous => ({
                      showDates: !previous.showDates
                    }));
                  }}
                  className={`button`}
                >
                  <span
                    style={{
                      width: 200
                    }}
                  >
                    {!!startDate ? 
                      `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}` :
                      "Filter by Date"
                    }
                  </span>
                </ToggleButton>

                {this.state.showDates && (
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "#FFF",
                      marginTop: 40,
                      marginLeft: -24,
                      zIndex: 9999
                    }}
                  >
                    <DateRange
                      onSelect={values => {
                        setDates && setDates(values.start.toISOString(), values.end.toISOString());
                        this.setState({ showDates: false })
                      }}
                    />
                  </div>
                )}
              </DateFilterWrapper>
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
  }
}
