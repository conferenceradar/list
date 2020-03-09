import React from "react";
import { plugins, utils } from "griddle-react";
import { CardWrapper } from "./styles";
import DateDisplay from "./DateDisplay";
import { statusColors } from "../../utils/colors";
const { connect } = utils;

const CustomRowComponent = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
}))(({ rowData }) => (
  <CardWrapper className="box">
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <h1>{rowData.name}</h1>
      <span
        style={{
          fontWeight: "800",
          borderBottom: "3px solid",
          borderColor: statusColors[rowData.status]
        }}
      >
        {rowData.status}
      </span>
    </div>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <ul>
        <li>
          {rowData.city} {rowData.stateProvince}
        </li>
        <li>{rowData.country}</li>
      </ul>
      <DateDisplay
        start={rowData.eventStartDate}
        end={rowData.eventEndDate}
        title="Event Date"
      />
    </div>
    <a href={rowData.url}>{rowData.url}</a>
    {rowData.statusUrl && (
      <div style={{ marginTop: 16 }}>
        <a href={rowData.statusUrl}>Conference status information</a>
      </div>
    )}
  </CardWrapper>
));

export default CustomRowComponent;
