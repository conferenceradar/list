import React from 'react';
import { utils, plugins } from 'griddle-react';
import GoogleMapReact from 'google-map-react';
import settings from '../../../settings';
import MarkerBlip from './MarkerBlip'

const { connect } = utils;

const Map = connect((state, props) => ({
  visibleData: plugins.LocalPlugin.selectors.filteredDataSelector(state),
}))(({ rowIds, Row, visibleData, filter }) => {
  const data = visibleData.toJSON();
  return (
      <GoogleMapReact
        defaultCenter={{ lat: 42.28, lng: -83.74 }}
        defaultZoom={4}
        bootstrapURLKeys={{
          key: settings.mapKey,
        }}
      >
        {visibleData && data.map(r => <MarkerBlip key={r.name + r.city + r.country + r.eventStartDate} griddleKey={r.name} lat={r.latitude} lng={r.longitude} {...r} />)}
      </GoogleMapReact>
  )
});

export default Map;