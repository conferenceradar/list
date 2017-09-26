import { utils, plugins } from 'griddle-react';
const { connect } = utils;

const enhanceWithRowData = connect((state, props) => ({
  rowData: plugins.LocalPlugin.selectors.rowDataSelector(state, props)
}));

debugger;
export default enhanceWithRowData;