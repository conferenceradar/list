import React, { Component } from 'react';
import CardList from './CardList';
import VirtualScrollTable from './Table';
import { isMobileish } from '../utils/layoutUtils';

export default class extends Component {
  render() {
    const { data } = this.props;

    const ListComponent = isMobileish() ?
      CardList :
      VirtualScrollTable;

      return <ListComponent data={data} />;
  }
}