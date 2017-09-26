import React, { Component } from 'react';

import debounce from 'lodash.debounce';
import { FilterInput } from './styles';

export default class Filter extends Component {
  constructor(props) {
    super(props);

    // TODO: Don't do this
    this.setFilterDebounced = debounce(this.props.setFilter, 300);
  }

  setFilter = (e) => {
    this.setFilterDebounced(e.target.value);
  }

  render() {
    return (
      <FilterInput
        type="text"
        name="filter"
        className="input"
        placeholder="Filter"
        onChange={this.setFilter}
      />
    )
  }
}