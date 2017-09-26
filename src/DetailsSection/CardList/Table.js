import React, { Component } from 'react';
import PropTypes from 'prop-types';
// HOC for overriding Table component to just render the default TableBody component
// We could use this entirely if we wanted and connect and map over visible rows but 
// Using this + tableBody to take advantange of code that Griddle LocalPlugin already has
const CustomTableComponent = OriginalComponent => class CustomTableComponent extends Component {
  static contextTypes = {
    components: PropTypes.object
  }

  render() {
    return <this.context.components.TableBody />
  }
}

export default CustomTableComponent;