import React from 'react';
import PropTypes from 'prop-types';

const enhanceWithFavorites = (OriginalComponent) => class extends React.Component {
  static contextTypes = {
    favorites: PropTypes.object
  };

  render() {
    const { favorites } = this.context;

    return <OriginalComponent {...this.props} favorites={favorites} />
  }
}

export default enhanceWithFavorites;
