import React, { Component } from 'react';
import { utils, plugins } from 'griddle-react';
import GoogleMapReact from 'google-map-react';
import settings from '../../../settings';
import MarkerBlip from './MarkerBlip'

const { connect } = utils;

const getCenter = (successCallback, failCallback) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(successCallback, failCallback);
  }
}

const enhance = connect((state, props) => ({
  visibleData: plugins.LocalPlugin.selectors.filteredDataSelector(state),
}));

class Map extends Component {
  state = {
    loading: true,
    currentPosition: null,
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      const successCallback = (position) => {
        this.setState({
          currentPosition: {
            lat: position.coords.latitude,
            lng: position.coords.longitude 
          },
          loading: false
        });
      }

      const failCallback = () => {
        this.setState({
          currentPosition: {
            lat: 42.28,
            lng: -83.74
          },
          loading: false
        });
      }

      getCenter(successCallback, failCallback)
    } else {
      this.setState({
        currentPosition: {
          lat: 42.28,
          lng: -83.74
        },
        loading: false
      });
    }
  }

  render() {
    const { visibleData } = this.props;

    const data = visibleData.toJSON();
    return this.state.loading === false ?
      (
        <GoogleMapReact
          defaultCenter={this.state.currentPosition}
          defaultZoom={4}
          bootstrapURLKeys={{
            key: settings.mapKey,
          }}
        >
          {visibleData && data.map(r => <MarkerBlip key={r.name + r.city + r.country + r.eventStartDate} griddleKey={r.name} lat={r.latitude} lng={r.longitude} {...r} />)}
        </GoogleMapReact>
      ) :
      (<span />);
  }
}

export default enhance(Map);