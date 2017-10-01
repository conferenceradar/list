import React from 'react';
import { withRouter } from 'react-router';

import App from './App';

export default withRouter((props) => {
  const { match: { params: {title, list }}} = props;

  return <App {...props} isShared={true} title={title} list={list} />
})