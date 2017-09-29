import React, { Component } from 'react'
import withFavorites from '../../utils/withFavorites';
import withRowData from '../../utils/withRowData';
import moment from 'moment';
import { IconWrapper } from '../../styles';
class FavoriteColumn extends Component {
  state = { isSelected: undefined }

  render() {
    debugger;
    console.log('dates', this.props.rowData.eventStartDate, moment().toISOString(), this.props.rowData.eventStartDate > moment().toISOString() )
    if (this.props.rowData.eventStartDate < moment().toISOString()) {
      return <span />;
    }

    const { favorites, value } = this.props;
    const isFavorite = favorites.getFavorites().indexOf(this.props.value) >= 0;
    return this.state.isSelected || isFavorite
      ? (
          <button
            className='button is-small is-outlined is-danger'
            onClick={
              () => {
                favorites.removeItemFromFavorites(value);
                this.setState({ isSelected: false })
              }}
          >
          <IconWrapper className="icon">
            <i className="fa fa-trash-o fa-1" aria-hidden="true"></i>
          </IconWrapper>

          Remove
          </button>
        )
      : (
          <button
            className='button is-small is-outlined is-primary'
            onClick={
              () => {
                favorites.addItemToFavorites(value)
                this.setState({ isSelected: true })
              }}
          >
          <IconWrapper className="icon">
            <i className="fa fa-star-o fa-1" aria-hidden="true"></i>
          </IconWrapper>
          Add
          </button>
      );

  }
}

// TODO: hehe import or make compose
export default withRowData(withFavorites(FavoriteColumn));

