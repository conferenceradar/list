import React from 'react';
import UpdatePlugin from '../UpdatePlugin';

import Griddle, { plugins } from 'griddle-react';
import CustomRowComponent from './RowComponent';
import CustomTableComponent from './Table';
import CustomTableBody from './TableBody';
import Layout from './Layout';
import PageDropdown from './PageDropdown';

export default ({data}) => (
  <Griddle
    data={data}
    pageProperties={{
      pageSize: 5
    }}
    plugins={[UpdatePlugin, plugins.LocalPlugin]}
    components={{
      Row: CustomRowComponent,
      TableContainer: CustomTableComponent,
      TableBody: CustomTableBody,
      SettingsToggle: (props) => null,
      Layout,
      PageDropdown,
    }}
    styleConfig={{
      classNames: {
        NextButton: 'button',
        PreviousButton: 'button',
        Filter: 'input'
      }
    }}
  /> 
)