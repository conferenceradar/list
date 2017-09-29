import React, { Component } from 'react';

import Griddle, {
  plugins,
  RowDefinition,
  ColumnDefinition,
} from 'griddle-react';

import UpdatePlugin from '../UpdatePlugin';
import Name from './Name';
import Empty from './Empty';
import Location from './Location';
import Layout from './Layout';
import NoResults from '../NoResults';
import Filter from './Filter';
import { sortMethod, locationSortMethod } from '../../utils/sort';
import EventDate from './EventDate';
import CfpDate from './CfpDate';
import FavoriteColumn from './FavoriteColumn';

import enhanceWithRowData from '../../utils/withRowData';

export default class VirtualScrollTable extends Component {
  render() {
    const { data } = this.props;
console.log('data', data[0]['key'])
    return (
      <Griddle
        data={data}
        plugins={[
          UpdatePlugin,
          plugins.LocalPlugin,
          plugins.PositionPlugin({ tableHeight: 799, rowHeight: 92 })
        ]}
        pageProperties={{
          pageSize: 1000000
        }}
        styleConfig={{
          classNames: {
            Table: 'table'
          }
        }}
        components={{
          Filter: Filter,
          SettingsToggle: Empty,
          Pagination: Empty,
          Layout: Layout,
          NoResults
        }}
      >
        <RowDefinition>
          <ColumnDefinition
            id='name'
            title="Name"
            order={1}
            customComponent={enhanceWithRowData(Name)}
            sortMethod={sortMethod}
          />
          <ColumnDefinition
            id='city'
            title="Location"
            order={2}
            customComponent={enhanceWithRowData(Location)}
            sortMethod={locationSortMethod}
          />
          <ColumnDefinition
            id='eventStartDate'
            title='Event Date'
            order={3}
            customComponent={enhanceWithRowData(EventDate)}
            sortMethod={sortMethod}
          />
          <ColumnDefinition
            id='cfpEndDate'
            title='CFP Date'
            order={4}
            customComponent={enhanceWithRowData(CfpDate)}
            sortMethod={sortMethod}
          />
          { data.length > 0 && data[0]['key'] !== undefined &&
            <ColumnDefinition
              id='key'
              title=' '
              customComponent={FavoriteColumn}
              order={5}
            />
          }
        </RowDefinition>
      </Griddle>
    )
  }
}